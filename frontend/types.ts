
export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE'
}

export enum PaymentMethod {
  PERSONAL = 'PERSONAL',
  COMPANY_CARD = 'COMPANY_CARD'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  photoURL?: string;
}

export interface ExpenseJustification {
  id: string;
  userId: string;
  userName: string;
  date: string;
  amount: number;
  vendor: string;
  category: string;
  project: string;
  paymentMethod: PaymentMethod;
  imageUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: number;
}

export interface AppConfig {
  loginTitle: string;
  loginSubtitle: string;
  backgroundImage: string;
  logoUrl: string;
}

export interface Module {
  id: string;
  title: string;
  path: string;
  color: string;
  icon: string;
  visible: boolean;
  roles: UserRole[];
}
