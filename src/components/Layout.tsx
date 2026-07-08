import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Settings, X, Terminal, LogOut, Eye, EyeOff } from 'lucide-react';
import { mockSeller } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { isAuthenticated, logout, login } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdminClick = () => {
    if (isAuthenticated) {
      navigate('/admin');
    } else {
      setIsModalOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (email.toLowerCase() === 'jaysonpantollanaj3@gmail.com' && password === 'jaysonrobot123') {
      login();
      setIsModalOpen(false);
      navigate('/admin');
    } else {
      setError('ERR: INVALID_CREDENTIALS');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-tech-bg text-tech-text selection:bg-tech-accent selection:text-white">
      <header className="bg-tech-surface/95 backdrop-blur-sm border-b border-tech-border py-4 px-6 sticky top-0 z-[100]">
        <div className="max-w-full mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-xl font-display font-bold tracking-tight text-tech-text group">
            <Terminal size={24} className="text-tech-accent group-hover:animate-pulse" />
            {mockSeller.name}
          </Link>
          <nav className="flex gap-4 items-center">
            <Link to="/" className="text-sm font-mono font-medium text-tech-muted hover:text-tech-accent transition-colors">
              HOME
            </Link>
            <Link to="/products" className="text-sm font-mono font-medium text-tech-muted hover:text-tech-accent transition-colors">
              PRODUCTS
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-tech-surface border-t border-tech-border py-8 px-6 mt-12 relative">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-sm text-tech-muted font-mono">
          <p>SYS.COPYRIGHT © {new Date().getFullYear()} {mockSeller.name}.</p>
        </div>
      </footer>

      {/* Floating Admin Button */}
      <button 
        onClick={handleAdminClick}
        className="fixed bottom-6 right-6 p-3 bg-tech-surface text-tech-muted hover:text-tech-accent shadow-sm border border-tech-border z-40 group transition-all rounded-sm"
        title={isAuthenticated ? "Go to Admin Dashboard" : "Admin Login"}
      >
        <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
      </button>

      {/* Admin Login Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-tech-text/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-tech-surface border border-tech-border max-w-sm w-full p-8 relative animate-in fade-in zoom-in duration-200 rounded-sm">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-4 right-4 text-tech-muted hover:text-tech-accent transition-colors"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-display font-bold text-tech-text mb-6">SYS.ADMIN_AUTH</h2>
            {error && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-500/50 rounded-sm">
                <p className="text-red-400 text-xs font-mono">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-tech-muted mb-1">USER_EMAIL</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-tech-border rounded-sm focus:outline-none focus:ring-1 focus:ring-tech-accent font-mono text-sm bg-tech-bg"
                  placeholder="admin@system.local"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-tech-muted mb-1">SECURITY_KEY</label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-4 pr-10 py-2 border border-tech-border rounded-sm focus:outline-none focus:ring-1 focus:ring-tech-accent font-mono text-sm bg-tech-bg"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-tech-muted hover:text-tech-accent transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-tech-text text-tech-surface font-mono text-sm hover:bg-tech-accent transition-colors mt-6 rounded-sm disabled:opacity-50"
              >
                {loading ? 'AUTHENTICATING...' : 'INITIALIZE_SESSION'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
