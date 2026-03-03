
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Receipt, TrendingUp, Clock, CheckCircle2, AlertCircle, Filter, Search } from 'lucide-react';
import { User, ExpenseJustification, PaymentMethod } from '../types';
import { firebaseService } from '../services/firebase';
import ExpenseForm from './ExpenseForm';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [expenses, setExpenses] = useState<ExpenseJustification[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    setIsLoading(true);
    const data = await firebaseService.getExpenses();
    setExpenses(data);
    setIsLoading(false);
  };

  const totalJustified = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const pendingCount = expenses.filter(e => e.status === 'pending').length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Hola, {user.name.split(' ')[0]} 👋</h1>
          <p className="text-slate-500">Aquí tienes el resumen de tus gastos y justificantes.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-teal-500 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-teal-100 hover:bg-teal-600 transition-all flex items-center gap-2 transform hover:-translate-y-1"
        >
          <Plus size={20} />
          Nuevo Justificante
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6"
        >
          <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
            <TrendingUp size={32} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Justificado</p>
            <p className="text-3xl font-bold text-slate-900">{totalJustified.toFixed(2)}€</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6"
        >
          <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
            <Clock size={32} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Pendientes</p>
            <p className="text-3xl font-bold text-slate-900">{pendingCount}</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6"
        >
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <Receipt size={32} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Tickets Subidos</p>
            <p className="text-3xl font-bold text-slate-900">{expenses.length}</p>
          </div>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-slate-800">Últimos Justificantes</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Fecha</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Establecimiento</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Proyecto</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Pago</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Importe</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-slate-400">Cargando datos...</td>
                </tr>
              ) : expenses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                        <Receipt size={32} />
                      </div>
                      <p className="text-slate-500 font-medium">No hay justificantes registrados todavía.</p>
                      <button 
                        onClick={() => setShowForm(true)}
                        className="text-teal-600 font-bold hover:underline"
                      >
                        Sube tu primer ticket ahora
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5 text-sm text-slate-600">{expense.date}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white transition-colors">
                          <Receipt size={16} />
                        </div>
                        <span className="font-semibold text-slate-800">{expense.vendor}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                        {expense.project}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        {expense.paymentMethod === PaymentMethod.COMPANY_CARD ? (
                          <><CreditCard size={14} className="text-blue-500" /> Empresa</>
                        ) : (
                          <><UserIcon size={14} className="text-teal-500" /> Personal</>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-5 font-bold text-slate-900">{expense.amount.toFixed(2)}€</td>
                    <td className="px-8 py-5">
                      <div className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${
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

export default Dashboard;
