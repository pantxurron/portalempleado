
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, ShieldCheck, Sparkles } from 'lucide-react';
import { User, UserRole, AppConfig } from '../types';
import { DOMAIN_RESTRICTION } from '../constants';

interface LoginProps {
  onLogin: (user: User) => void;
  config: AppConfig;
}

const Login: React.FC<LoginProps> = ({ onLogin, config }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setError(null);

    // Simulate Google Auth
    setTimeout(() => {
      const mockEmail = `empleado${DOMAIN_RESTRICTION}`;
      
      if (!mockEmail.endsWith(DOMAIN_RESTRICTION)) {
        setError(`Solo se permiten correos del dominio ${DOMAIN_RESTRICTION}`);
        setIsLoading(false);
        return;
      }

      const mockUser: User = {
        id: '123',
        name: 'Usuario Demo',
        email: mockEmail,
        role: UserRole.EMPLOYEE,
        photoURL: 'https://picsum.photos/seed/user/200'
      };

      onLogin(mockUser);
      setIsLoading(false);
    }, 1500);
  };

  const handleDemoLogin = (role: UserRole) => {
    setIsDemoLoading(true);
    setError(null);

    // Instant login for preview purposes
    setTimeout(() => {
      const mockUser: User = {
        id: role === UserRole.ADMIN ? 'admin-999' : 'demo-888',
        name: role === UserRole.ADMIN ? 'Admin de Pruebas' : 'Empleado de Pruebas',
        email: role === UserRole.ADMIN ? `admin${DOMAIN_RESTRICTION}` : `demo${DOMAIN_RESTRICTION}`,
        role: role,
        photoURL: `https://picsum.photos/seed/${role}/200`
      };

      onLogin(mockUser);
      setIsDemoLoading(false);
    }, 800);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${config.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 pt-16 relative">
          {/* Floating Logo */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-full p-2 shadow-xl flex items-center justify-center overflow-hidden border-4 border-white">
            <img 
              src={config.logoUrl} 
              alt="Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Logo';
              }}
            />
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
              {config.loginTitle}
            </h1>
            <p className="text-slate-500 text-sm tracking-wide">
              {config.loginSubtitle}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading || isDemoLoading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-4 px-6 rounded-2xl transition-all shadow-sm hover:shadow-md disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
              ) : (
                <>
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                  Acceder con Google
                </>
              )}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest">
                <span className="bg-white px-4 text-slate-400">O prueba la App</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleDemoLogin(UserRole.EMPLOYEE)}
                disabled={isLoading || isDemoLoading}
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-teal-100 bg-teal-50/30 hover:bg-teal-50 text-teal-700 transition-all group"
              >
                <Sparkles size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-wider">Modo Empleado</span>
              </button>
              <button
                onClick={() => handleDemoLogin(UserRole.ADMIN)}
                disabled={isLoading || isDemoLoading}
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-blue-100 bg-blue-50/30 hover:bg-blue-50 text-blue-700 transition-all group"
              >
                <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-wider">Modo Admin</span>
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] leading-relaxed">
              Acceso restringido a personal de<br/>
              <span className="font-bold text-slate-500">@marianistasalboraya.es</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
