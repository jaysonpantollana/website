import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Terminal, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (email.toLowerCase() === 'jaysonpantollanaj3@gmail.com' && password === 'jaysonrobot123') {
      login();
      navigate('/admin');
    } else {
      setError('ERR: INVALID_CREDENTIALS');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-tech-surface p-8 rounded-sm shadow-sm border border-tech-border">
      <div className="flex flex-col items-center justify-center mb-8">
        <Terminal size={32} className="text-tech-accent mb-4" />
        <h1 className="text-2xl font-display font-bold text-tech-text tracking-tight uppercase">SYS.AUTH_REQUIRED</h1>
      </div>
      
      {error && (
        <div className="mb-6 p-3 bg-red-900/20 border border-red-500/50 rounded-sm">
          <p className="text-red-400 text-xs font-mono">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-tech-muted mb-2 uppercase">Identity</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-tech-bg border border-tech-border rounded-sm focus:outline-none focus:border-tech-accent text-tech-text font-mono text-sm transition-colors"
            placeholder="admin@system.local"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-tech-muted mb-2 uppercase">Passkey</label>
          <div className="relative">
            <input 
              type={showPassword ? 'text' : 'password'} 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-4 pr-12 py-3 bg-tech-bg border border-tech-border rounded-sm focus:outline-none focus:border-tech-accent text-tech-text font-mono text-sm transition-colors"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-tech-muted hover:text-tech-accent transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <button 
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-tech-text text-tech-surface rounded-sm font-mono text-sm font-bold uppercase tracking-wider hover:bg-tech-accent transition-colors disabled:opacity-50"
        >
          {loading ? 'AUTHENTICATING...' : '[ INITIATE_LOGIN ]'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
