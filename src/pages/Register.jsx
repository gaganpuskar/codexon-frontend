import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, ShieldCheck, Terminal, ArrowRight, AlertTriangle, Phone, GraduationCap, Building2, CalendarDays } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

export default function Register() {
  const navigate = useNavigate();

  // 🆕 EXPANDED REGISTRATION PAYLOAD STATES BLOCK
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    college: '',
    degree: '',
    semester: ''
  });
  const [otp, setOtp] = useState('');

  // View Layout Flow Toggle Parameters
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // -----------------------------------------------------------------
  // WORKFLOW STEP 1: INITIALIZE HANDSHAKE MATRIX & DISPATCH OTP VIA SMTP
  // -----------------------------------------------------------------
  const handleSendOtpPipeline = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/send-otp`, { 
        email: formData.email 
      });

      if (response.status === 200) {
        setIsOtpSent(true);
        alert("Verification sequence initiated! Please verify your official Gmail inbox or spam directory folder.");
      }
    } catch (err) {
      console.error("OTP routing channel breakdown execution log:", err);
      setErrorMessage(err.response?.data?.message || "Failed to dispatch OTP verification packet. Check server connection parameters.");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------------------------------------
  // WORKFLOW STEP 2: COMPLETE CRYPTOGRAPHIC HANDSHAKE & AUTOLOGIN
  // -----------------------------------------------------------------
  const handleVerifyAndRegisterCommit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    // Packing all structured profile variables to match updated mongoose validation rules
    const targetPayloadData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      mobile: formData.mobile,
      college: formData.college,
      degree: formData.degree,
      semester: formData.semester,
      otp: otp
    };

    try {
      const commitResponse = await axios.post(`${BACKEND_URL}/auth/verify-otp`, targetPayloadData);

      if (commitResponse.status === 201 && commitResponse.data.token) {
        // 🚀 SUCCESS: Save token parameter schemas instantly to browser localStorage
        localStorage.setItem('token', commitResponse.data.token);
        localStorage.setItem('user', JSON.stringify({
          name: commitResponse.data.name,
          email: commitResponse.data.email,
          role: commitResponse.data.role
        }));

        alert("Account integrity authentication verified! Welcome to Codexon Hub.");
        
        // Direct seamless pipeline entry straight to dashboard node
        navigate('/dashboard');
      }
    } catch (err) {
      console.error("Ledger storage write access failure trace logs:", err);
      setErrorMessage(err.response?.data?.message || "Verification validation logic failed. Cryptographic code mismatched.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center p-6 antialiased font-sans">
      <div className="w-full max-w-lg bg-[#090d16] border border-slate-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden my-10">
        
        {/* Subtle Decorative Background Accent Shimmer */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand System Title Header Banner */}
        <div className="text-center mb-8 relative z-10">
          <div className="flex justify-center items-center gap-2 text-xl font-black tracking-tight text-white mb-2">
            <Terminal className="text-cyan-400" size={22} />
            CODEXON <span className="text-indigo-500 font-medium text-base">HUB</span>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
            Student Registration Hub Node
          </p>
        </div>

        {/* Runtime Operational Error Logs Window Panel Overlay */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-start gap-2 animate-fadeIn">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <span className="leading-relaxed font-semibold">{errorMessage}</span>
          </div>
        )}

        {/* CONTROL PIPELINE STATE FLOW ROUTER INTERFACE */}
        {!isOtpSent ? (
          /* ========================================================= */
          /* STAGE QUADRANT A: CAPTURE PRIMARY DATA CREDENTIALS PACKETS */
          /* ========================================================= */
          <form onSubmit={handleSendOtpPipeline} className="flex flex-col gap-4 text-sm relative z-10">
            
            <div>
              <label className="text-slate-500 text-[10px] font-black uppercase tracking-wider block mb-1.5">
                Full Student Name Signature
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 text-slate-600" size={16} />
                <input 
                  type="text" 
                  placeholder="e.g., Gagan Puskar" 
                  value={formData.name} 
                  onChange={e => setFormData({ ...formData, name: e.target.value })} 
                  className="w-full bg-[#030712] border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 outline-none transition text-xs" 
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-500 text-[10px] font-black uppercase tracking-wider block mb-1.5">
                  Gmail Target Endpoint
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 text-slate-600" size={16} />
                  <input 
                    type="email" 
                    placeholder="student@gmail.com" 
                    value={formData.email} 
                    onChange={e => setFormData({ ...formData, email: e.target.value })} 
                    className="w-full bg-[#030712] border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 outline-none transition text-xs" 
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-500 text-[10px] font-black uppercase tracking-wider block mb-1.5">
                  Mobile Identity Parameter
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 text-slate-600" size={16} />
                  <input 
                    type="text" 
                    placeholder="e.g., 9876543210" 
                    maxLength={10}
                    value={formData.mobile} 
                    onChange={e => setFormData({ ...formData, mobile: e.target.value })} 
                    className="w-full bg-[#030712] border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 outline-none transition text-xs" 
                    required 
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-slate-500 text-[10px] font-black uppercase tracking-wider block mb-1.5">
                Official College / Institution Entity
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-3.5 text-slate-600" size={16} />
                <input 
                  type="text" 
                  placeholder="e.g., Dr. A.P.J. Abdul Kalam Technical University" 
                  value={formData.college} 
                  onChange={e => setFormData({ ...formData, college: e.target.value })} 
                  className="w-full bg-[#030712] border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 outline-none transition text-xs" 
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-500 text-[10px] font-black uppercase tracking-wider block mb-1.5">
                  Degree Course Track
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3.5 top-3.5 text-slate-600" size={16} />
                  <input 
                    type="text" 
                    placeholder="e.g., B.Tech CS" 
                    value={formData.degree} 
                    onChange={e => setFormData({ ...formData, degree: e.target.value })} 
                    className="w-full bg-[#030712] border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 outline-none transition text-xs" 
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-500 text-[10px] font-black uppercase tracking-wider block mb-1.5">
                  Current Operational Semester
                </label>
                <div className="relative">
                  <CalendarDays className="absolute left-3.5 top-3.5 text-slate-600" size={16} />
                  <select 
                    value={formData.semester} 
                    onChange={e => setFormData({ ...formData, semester: e.target.value })} 
                    className="w-full bg-[#030712] border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-white focus:border-indigo-500 outline-none transition text-xs appearance-none cursor-pointer"
                    required
                  >
                    <option value="" disabled className="text-slate-600">Select Semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                      <option key={sem} value={`${sem}th Sem`} className="bg-[#090d16] text-white">
                        {sem}th Semester
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="text-slate-500 text-[10px] font-black uppercase tracking-wider block mb-1.5">
                Platform Access Pass Token (Password)
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 text-slate-600" size={16} />
                <input 
                  type="password" 
                  placeholder="••••••••••••" 
                  value={formData.password} 
                  onChange={e => setFormData({ ...formData, password: e.target.value })} 
                  className="w-full bg-[#030712] border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 outline-none transition text-xs" 
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition mt-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/10 group"
            >
              {loading ? "Constructing Security Packets..." : "Generate Verification OTP"}
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition" />
            </button>
            
          </form>
        ) : (
          /* ========================================================= */
          /* STAGE QUADRANT B: INJECT SMTP OTP TOKEN SECURE INTERACTION */
          /* ========================================================= */
          <form onSubmit={handleVerifyAndRegisterCommit} className="flex flex-col gap-5 text-sm relative z-10 animate-fadeIn">
            
            <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-4 text-xs text-slate-400 text-center leading-relaxed">
              Security validation matrix handshake initialized for: <br />
              <span className="text-indigo-400 font-bold font-mono text-xs">{formData.email}</span>
            </div>

            <div>
              <label className="text-slate-500 text-[11px] font-black uppercase tracking-wider block mb-2 text-center">
                Enter Core OTP Security Token Packet
              </label>
              <div className="relative">
                <ShieldCheck className="absolute left-3.5 top-3.5 text-slate-600" size={16} />
                <input 
                  type="text" 
                  placeholder="──────" 
                  value={otp} 
                  onChange={e => setOtp(e.target.value)} 
                  className="w-full bg-[#030712] border border-slate-800 rounded-xl py-3.5 text-center font-mono tracking-[8px] text-lg text-cyan-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 outline-none transition" 
                  maxLength={6} 
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-600/10"
            >
              {loading ? "Validating Cryptographic Stream..." : "Verify & Commit Registration"}
            </button>

            <button 
              type="button" 
              onClick={() => { setIsOtpSent(false); setOtp(''); }} 
              className="text-xs text-slate-500 hover:text-white uppercase tracking-wider text-center font-bold mt-2 transition"
            >
              ← Reconfigure Entry Credentials
            </button>

          </form>
        )}

        {/* Global Structural Redirection Link */}
        <div className="mt-8 pt-5 border-t border-slate-900/50 text-center text-xs text-slate-500 relative z-10">
          Already verified in core storage?{" "}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 hover:underline font-bold transition ml-1">
            Sign In Quadrant
          </Link>
        </div>

      </div>
    </div>
  );
}