import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock, Terminal } from 'lucide-react';

// 🚨 FORCED STRICT BINDING ON OPERATIONAL PORT 5002
const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';
export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Direct post method request hit to active port 5002
      const res = await axios.post(`${BACKEND_URL}/auth/login`, formData);
      
      // Global commit to memory states data
      login(res.data);
      
      alert("Authentication Handshake successful!");
      
      // Role redirection router manager
      if (res.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/internships');
      }
    } catch (err) {
      console.error("Authentication process trace error:", err);
      // 🚨 DYNAMIC ERROR OUTPUT: Shows exactly what the server says (e.g., Wrong Password / No User)
      alert(err.response?.data?.message || "Invalid authentication database response mapping layer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#090d16] border border-slate-900 rounded-2xl p-8 shadow-2xl">
        
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 text-xl font-black tracking-tight text-white mb-2">
            <Terminal className="text-indigo-400" size={24} />
            CODEXON <span className="text-cyan-500 font-medium text-base">HUB</span>
          </div>
          <p className="text-slate-400 text-xs uppercase tracking-widest">Master Authorization gateway</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 text-sm">
          <div>
            <label className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-2">Gmail Address Identifier</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-600" size={16} />
              <input type="email" placeholder="admin@pushkar.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#030712] border border-slate-800 rounded-xl p-3 pl-10 text-white focus:border-indigo-500 outline-none" required />
            </div>
          </div>

          <div>
            <label className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-2">Secure Pipeline Token (Password)</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-600" size={16} />
              <input type="password" placeholder="••••••••" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-[#030712] border border-slate-800 rounded-xl p-3 pl-10 text-white focus:border-indigo-500 outline-none" required />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl uppercase tracking-wider transition mt-2 disabled:opacity-50">
            {loading ? "Authorizing Security..." : "Execute Workspace Login"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-900/50 text-center text-xs text-slate-500">
          New profile segment entity?{" "}
          <Link to="/register" className="text-cyan-400 hover:underline font-bold">Register Account</Link>
        </div>

      </div>
    </div>
  );
}