
import { UserRole, AppConfig, Module } from './types';

export const DOMAIN_RESTRICTION = '@marianistasalboraya.es';

export const INITIAL_CONFIG: AppConfig = {
  loginTitle: 'JustificaMarians',
  loginSubtitle: 'Portal de Gestión de Gastos y Justificantes',
  backgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000',
  logoUrl: 'https://marianistasalboraya.es/wp-content/uploads/2020/06/logo-marianistas-alboraya.png'
};

export const APP_MODULES: Module[] = [
  {
    id: 'expenses',
    title: 'Mis Gastos',
    path: '/expenses',
    color: '#4db6ac', // Teal
    icon: 'Receipt',
    visible: true,
    roles: [UserRole.EMPLOYEE, UserRole.ADMIN]
  },
  {
    id: 'projects',
    title: 'Proyectos',
    path: '/projects',
    color: '#9ccc65', // Verde
    icon: 'Briefcase',
    visible: true,
    roles: [UserRole.ADMIN]
  },
  {
    id: 'reports',
    title: 'Informes',
    path: '/reports',
    color: '#01579b', // Azul
    icon: 'BarChart3',
    visible: true,
    roles: [UserRole.ADMIN]
  },
  {
    id: 'admin',
    title: 'Configuración',
    path: '/admin',
    color: '#9575cd', // Púrpura
    icon: 'Settings',
    visible: true,
    roles: [UserRole.ADMIN]
  }
];
