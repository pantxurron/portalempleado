
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { User, AppConfig } from './types';
import { INITIAL_CONFIG } from './constants';
import Header from './components/Header';
import Login from './components/Login';
import ModuleGrid from './components/ModuleGrid';
import ExpenseManager from './components/ExpenseManager';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [config, setConfig] = useState<AppConfig>(INITIAL_CONFIG);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('marianistas_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsInitialized(true);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('marianistas_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('marianistas_user');
  };

  if (!isInitialized) return null;

  return (
    <Router>
      <div className="min-h-screen bg-[#f8fafc]">
        {user && <Header user={user} onLogout={handleLogout} />}
        
        <Routes>
          <Route 
            path="/login" 
            element={!user ? <Login onLogin={handleLogin} config={config} /> : <Navigate to="/" />} 
          />
          
          <Route 
            path="/" 
            element={user ? <ModuleGrid user={user} /> : <Navigate to="/login" />} 
          />

          <Route 
            path="/expenses" 
            element={user ? <ExpenseManager user={user} /> : <Navigate to="/login" />} 
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
