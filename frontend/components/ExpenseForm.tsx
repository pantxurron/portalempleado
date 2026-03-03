
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, Check, X, CreditCard, User as UserIcon, Loader2, Receipt } from 'lucide-react';
import { PaymentMethod, User } from '../types';
import { scanTicket } from '../services/gemini';
import { firebaseService } from '../services/firebase';

interface ExpenseFormProps {
  user: User;
  onSuccess: () => void;
  onCancel: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ user, onSuccess, onCancel }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    vendor: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    category: '',
    project: '',
    paymentMethod: PaymentMethod.PERSONAL
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    if (!image) return;
    setIsScanning(true);
    try {
      const result = await scanTicket(image);
      setFormData(prev => ({
        ...prev,
        vendor: result.vendor || prev.vendor,
        amount: result.amount || prev.amount,
        date: result.date || prev.date,
        category: result.category || prev.category
      }));
    } catch (error) {
      alert('No se pudo analizar el ticket automáticamente. Por favor, completa los datos manualmente.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    try {
      await firebaseService.saveExpense({
        userId: user.id,
        userName: user.name,
        imageUrl: image,
        status: 'pending',
        ...formData
      });
      onSuccess();
    } catch (error) {
      alert('Error al guardar el justificante.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-w-5xl w-full mx-auto flex flex-col md:flex-row max-h-[90vh]"
    >
      {/* Left: Image Section */}
      <div className="md:w-1/2 bg-slate-50 p-8 flex flex-col items-center justify-center border-r border-slate-100 relative min-h-[300px]">
        {image ? (
          <div className="relative w-full h-full flex flex-col items-center">
            <div className="relative w-full h-full max-h-[500px] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <img src={image} alt="Ticket" className="w-full h-full object-contain bg-white" />
              <button 
                onClick={() => setImage(null)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-red-500 p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {!isScanning && (
              <motion.button 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleScan}
                className="mt-6 bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-xl flex items-center gap-3 hover:bg-slate-800 transition-all transform hover:scale-105 font-bold"
              >
                <Sparkles size={20} className="text-teal-400" />
                Escanear con IA
              </motion.button>
            )}
          </div>
        ) : (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-full border-4 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-6 cursor-pointer hover:border-teal-400 hover:bg-teal-50/30 transition-all group p-12"
          >
            <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-slate-300 group-hover:text-teal-500 group-hover:scale-110 transition-all">
              <Camera size={40} />
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-slate-700 mb-1">Sube tu ticket</p>
              <p className="text-sm text-slate-400">Haz una foto o arrastra el archivo aquí</p>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              className="hidden" 
              accept="image/*" 
            />
          </div>
        )}

        {isScanning && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center z-20 p-8 text-center">
            <div className="relative mb-6">
              <Loader2 className="w-16 h-16 text-teal-500 animate-spin" />
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-teal-400 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Analizando ticket...</h3>
            <p className="text-slate-500 text-sm max-w-[240px]">Nuestra IA está extrayendo el importe, la fecha y el establecimiento.</p>
          </div>
        )}
      </div>

      {/* Right: Form Section */}
      <div className="md:w-1/2 p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Detalles del Gasto</h2>
            <p className="text-slate-400 text-sm">Completa la información del justificante.</p>
          </div>
          <button onClick={onCancel} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Establecimiento</label>
              <div className="relative">
                <Receipt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="text" 
                  value={formData.vendor}
                  onChange={e => setFormData({...formData, vendor: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-teal-500 outline-none transition-all font-medium"
                  placeholder="Ej: Restaurante El Faro"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Importe (€)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={formData.amount}
                  onChange={e => setFormData({...formData, amount: parseFloat(e.target.value)})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-teal-500 outline-none transition-all font-bold text-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Fecha</label>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-teal-500 outline-none transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Proyecto / Actividad</label>
              <select 
                value={formData.project}
                onChange={e => setFormData({...formData, project: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-teal-500 outline-none transition-all font-medium appearance-none"
                required
              >
                <option value="">Selecciona un proyecto</option>
                <option value="Excursión 1º ESO - Bioparc">Excursión 1º ESO - Bioparc</option>
                <option value="Material Escolar - Primaria">Material Escolar - Primaria</option>
                <option value="Mantenimiento Instalaciones">Mantenimiento Instalaciones</option>
                <option value="Evento Graduación 2024">Evento Graduación 2024</option>
                <option value="Gastos Representación">Gastos Representación</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Método de Pago</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, paymentMethod: PaymentMethod.PERSONAL})}
                  className={`flex items-center justify-center gap-3 py-4 rounded-2xl border-2 transition-all ${formData.paymentMethod === PaymentMethod.PERSONAL ? 'bg-teal-50 border-teal-500 text-teal-700 font-bold' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}
                >
                  <UserIcon size={20} />
                  Personal
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, paymentMethod: PaymentMethod.COMPANY_CARD})}
                  className={`flex items-center justify-center gap-3 py-4 rounded-2xl border-2 transition-all ${formData.paymentMethod === PaymentMethod.COMPANY_CARD ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}
                >
                  <CreditCard size={20} />
                  Empresa
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 flex gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-5 rounded-2xl border border-slate-200 text-slate-500 font-bold hover:bg-slate-50 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!image || isScanning}
              className="flex-[2] py-5 rounded-2xl bg-slate-900 text-white font-bold shadow-xl hover:bg-slate-800 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              <Check size={22} />
              Guardar Justificante
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ExpenseForm;
