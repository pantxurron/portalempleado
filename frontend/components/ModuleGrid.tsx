
import React from 'react';
import { motion } from 'framer-motion';
import { User, UserRole } from '../types';
import { APP_MODULES } from '../constants';
import ModuleCard from './ModuleCard';

interface ModuleGridProps {
  user: User;
}

const ModuleGrid: React.FC<ModuleGridProps> = ({ user }) => {
  const visibleModules = APP_MODULES.filter(m => 
    m.visible && m.roles.includes(user.role)
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">
          Bienvenido, {user.name.split(' ')[0]}
        </h1>
        <p className="text-slate-500 text-lg">Selecciona una herramienta para comenzar.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleModules.map((module, index) => (
          <ModuleCard 
            key={module.id}
            title={module.title}
            path={module.path}
            color={module.color}
            iconName={module.icon}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ModuleGrid;
