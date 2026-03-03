
import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ModuleCardProps {
  title: string;
  path: string;
  color: string;
  iconName: string;
  index: number;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, path, color, iconName, index }) => {
  const navigate = useNavigate();
  const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={() => navigate(path)}
      className="group relative cursor-pointer"
    >
      {/* Decorative Orbs */}
      <div 
        className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
        style={{ backgroundColor: color }}
      />
      
      <div className="glass-card shimmer-effect rounded-[2rem] p-8 h-full flex flex-col justify-between relative z-10 overflow-hidden">
        {/* Inner Glass Border */}
        <div className="absolute inset-0 border border-white/20 rounded-[2rem] pointer-events-none" />
        
        <div>
          <div className="flex justify-between items-start mb-6">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
              style={{ backgroundColor: color }}
            >
              <IconComponent size={28} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Módulo</span>
          </div>
          
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight group-hover:text-slate-900 transition-colors">
            {title}
          </h3>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                <img src={`https://picsum.photos/seed/${title}${i}/40`} alt="user" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <Icons.ArrowRight className="text-slate-300 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" size={20} />
        </div>
      </div>
    </motion.div>
  );
};

export default ModuleCard;
