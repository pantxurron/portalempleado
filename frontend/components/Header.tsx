
import React from 'react';
import { LogOut, User as UserIcon, Home } from 'lucide-react';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-3 flex items-center justify-between">
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => navigate('/')}
      >
        <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-200 group-hover:scale-110 transition-transform">
          <Home size={20} />
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-800">JustificaMarians</span>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-semibold text-slate-900">{user.name}</span>
            <span className="text-xs text-slate-500 uppercase tracking-widest">{user.role}</span>
          </div>
          
          <div className="relative group">
            <button className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-teal-500 transition-all">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <UserIcon size={20} className="text-slate-600" />
              )}
            </button>
            
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 z-50">
              <button 
                onClick={() => navigate('/admin')}
                className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                Configuración
              </button>
              <hr className="my-1 border-slate-100" />
              <button 
                onClick={onLogout}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut size={16} />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
