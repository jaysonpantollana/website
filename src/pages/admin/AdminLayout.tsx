import React from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Terminal } from 'lucide-react';

const AdminLayout = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated && window.location.hash !== '#/admin/login') {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-tech-bg flex flex-col font-sans selection:bg-tech-accent selection:text-white">
      {isAuthenticated && (
        <header className="bg-tech-text text-tech-surface px-6 py-4 flex justify-between items-center border-b border-tech-accent">
          <div className="font-display font-bold tracking-widest flex items-center gap-2">
            <Terminal size={18} className="text-tech-accent" />
            SYS.ADMIN_PANEL
          </div>
          <div className="flex gap-6 text-xs font-mono uppercase tracking-wider">
            <button onClick={() => navigate('/')} className="text-tech-border hover:text-tech-accent transition-colors">
              [ RETURN_FRONTEND ]
            </button>
            <button onClick={logout} className="text-red-400 hover:text-red-300 transition-colors">
              [ TERMINATE_SESSION ]
            </button>
          </div>
        </header>
      )}
      <main className="flex-grow p-6 md:p-12 bg-tech-dots">
        <Outlet context={{ isAuthenticated }} />
      </main>
    </div>
  );
};

export default AdminLayout;
