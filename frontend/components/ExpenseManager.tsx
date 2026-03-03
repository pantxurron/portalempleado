
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Receipt, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  ArrowLeft, 
  Filter,
  CreditCard,
  User as UserIcon 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { User, ExpenseJustification, PaymentMethod } from '../types';
import { firebaseService } from '../services/firebase';
import ExpenseForm from './ExpenseForm';

interface ExpenseManagerProps {
  user: User;
}

const ExpenseManager: React.FC<ExpenseManagerProps> = ({ user }) => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<ExpenseJustification[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    setIsLoading(true);
    const data = await firebaseService.getExpenses();
    // Filtrar por usuario si no es admin
    const userExpenses = data.filter(e => e.userId === user.id);
    setExpenses(userExpenses);
    setIsLoading(false);
  };

  const totalJustified = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const pendingCount = expenses.filter(e => e.status === 'pending').length;

  const filteredExpenses = expenses.filter(e => 
    e.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Navigation & Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400 hover:text-slate-600"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Mis Gastos</h1>
          <p className="text-slate-500 text-sm">Gestiona y justifica tus tickets de actividad.</p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-[2rem] flex items-center gap-6"
        >
          <div className="w-16 h-16 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-600">
            <TrendingUp size={32} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Justificado</p>
            <p className="text-3xl font-bold text-slate-900">{totalJustified.toFixed(2)}€</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 rounded-[2rem] flex items-center gap-6"
        >
          <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-600">
            <Clock size={32} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pendientes</p>
            <p className="text-3xl font-bold text-slate-900">{pendingCount}</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 rounded-[2rem] flex items-center gap-6"
        >
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600">
            <Receipt size={32} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tickets Totales</p>
            <p className="text-3xl font-bold text-slate-900">{expenses.length}</p>
          </div>
        </motion.div>
      </div>

      {/* Main List Card */}
      <div className="glass-card rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por establecimiento o proyecto..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              />
            </div>
            <button className="p-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors border border-slate-200">
              <Filter size={20} />
            </button>
          </div>
          
          <button 
            onClick={() => setShowForm(true)}
            className="bg-teal-500 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-teal-100 hover:bg-teal-600 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
          >
            <Plus size={20} />
            Nuevo Justificante
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/30">
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fecha</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Establecimiento</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Proyecto / Actividad</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pago</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Importe</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-slate-400">Cargando justificantes...</td>
                </tr>
              ) : filteredExpenses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4 max-w-xs mx-auto">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                        <Receipt size={40} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">Sin resultados</h3>
                      <p className="text-slate-500 text-sm">No hemos encontrado ningún justificante que coincida con tu búsqueda.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6 text-sm text-slate-500 font-medium">{expense.date}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-teal-500 transition-colors shadow-sm">
                          <Receipt size={18} />
                        </div>
                        <span className="font-bold text-slate-800">{expense.vendor}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-[11px] font-bold uppercase tracking-wider">
                        {expense.project}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                        {expense.paymentMethod === PaymentMethod.COMPANY_CARD ? (
                          <span className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                            <CreditCard size={14} /> Tarjeta Empresa
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-teal-600 bg-teal-50 px-3 py-1 rounded-lg">
                            <UserIcon size={14} /> Personal
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className="text-lg font-bold text-slate-900">{expense.amount.toFixed(2)}€</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] ${
                        expense.status === 'approved' ? 'text-green-600' : 
                        expense.status === 'rejected' ? 'text-red-600' : 'text-orange-600'
                      }`}>
                        {expense.status === 'approved' && <CheckCircle2 size={14} />}
                        {expense.status === 'rejected' && <AlertCircle size={14} />}
                        {expense.status === 'pending' && <Clock size={14} />}
                        {expense.status === 'approved' ? 'Aprobado' : 
                         expense.status === 'rejected' ? 'Rechazado' : 'Pendiente'}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <ExpenseForm 
              user={user} 
              onSuccess={() => {
                setShowForm(false);
                loadExpenses();
              }} 
              onCancel={() => setShowForm(false)} 
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpenseManager;
