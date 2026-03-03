
import { ExpenseJustification } from '../types';

const STORAGE_KEY = 'marianistas_expenses_v1';

export const firebaseService = {
  async saveExpense(expense: Omit<ExpenseJustification, 'id' | 'createdAt'>): Promise<ExpenseJustification> {
    const newExpense: ExpenseJustification = {
      ...expense,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
    };
    
    const existing = await this.getExpenses();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([newExpense, ...existing]));
    
    return newExpense;
  },

  async getExpenses(): Promise<ExpenseJustification[]> {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  async deleteExpense(id: string): Promise<void> {
    const existing = await this.getExpenses();
    const filtered = existing.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
