import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, User, BookOpen, Award, Briefcase, 
  Layers, LogOut, CheckCircle2, Clock, Zap 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [student, setStudent] = useState({ name: 'Developer', email: '' });

  // Load authorized student metadata token from memory ledger
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setStudent(JSON.parse(storedUser));
    } else {
      // Security Check Guard: Redirect if unauthorized matrix access
      navigate('/login');
    }
  }, [navigate]);

  // Handle Session Log Out
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col font-sans selection:bg-[#7c5cff]/30">
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7c5cff]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#22d3ee]/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* 1. TOP HEADER NAVIGATION BAR */}
      <nav className="w-full border-b border-[#1e293b] bg-[#030712]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#7c5cff]/10 border border-[#7c5cff]/20 flex items-center justify-center">
            <Terminal className="text-[#22d3ee]" size={18} />
          </div>
          <div>
            <span className="font-black text-sm tracking-tight block">CODEXON HUB</span>
            <span className="text-[10px] text-[#64748b] uppercase tracking-wider block font-bold">Student Console v1.0</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-bold text-slate-200">{student.name}</span>
            <span className="text-[10px] text-[#64748b]">{student.email || 'student@codexonhub.in'}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition group"
            title="Log Out Session"
          >
            <LogOut size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </nav>

      {/* 2. MAIN LAYOUT CONTROLLER WRAPPER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-8 relative z-10">
        
        {/* Welcome Identity Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl border border-[#1e293b] portfolio-glass flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22d3ee]/10 border border-[#22d3ee]/20 text-[#22d3ee] text-[10px] font-bold uppercase tracking-wider">
              <Zap size={10} /> Operational Workspace Active
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">Welcome Back, {student.name}!</h1>
            <p className="text-xs text-[#94a3b8] max-w-xl">Initialize your integrated development workflows, track assigned code matrices, and claim validation credentials below.</p>
          </div>
          <div className="flex items-center gap-3 bg-[#0f172a] border border-[#1e293b] p-4 rounded-2xl self-start md:self-auto">
            <div className="w-10 h-10 rounded-xl bg-[#7c5cff]/10 border border-[#7c5cff]/20 flex items-center justify-center text-[#7c5cff]">
              <Award size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] block">Current Rank</span>
              <span className="text-xs font-black text-white block">Frontend Trainee Node</span>
            </div>
          </div>
        </motion.div>

        {/* 3. PERFORMANCE STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-[#0f172a]/40 border border-[#1e293b] p-5 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#22d3ee]/10 flex items-center justify-center text-[#22d3ee]"><BookOpen size={18} /></div>
            <div>
              <h3 className="text-xs font-bold text-[#64748b] uppercase tracking-wider">Enrolled Track</h3>
              <p className="text-sm font-black mt-0.5">Frontend Architecture</p>
            </div>
          </div>
          <div className="bg-[#0f172a]/40 border border-[#1e293b] p-5 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#7c5cff]/10 flex items-center justify-center text-[#7c5cff]"><Clock size={18} /></div>
            <div>
              <h3 className="text-xs font-bold text-[#64748b] uppercase tracking-wider">Timeline Status</h3>
              <p className="text-sm font-black mt-0.5">Active (Weeks 1-4)</p>
            </div>
          </div>
          <div className="bg-[#0f172a]/40 border border-[#1e293b] p-5 rounded-2xl flex items-center gap-4 sm:col-span-2 lg:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400"><Layers size={18} /></div>
            <div>
              <h3 className="text-xs font-bold text-[#64748b] uppercase tracking-wider">Live Production Code Build</h3>
              <p className="text-sm font-black mt-0.5">2 Repositories Managed</p>
            </div>
          </div>
        </div>

        {/* 4. WORKSPACE CORE GRID CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Block: Assignment & Training Streams */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-base font-black tracking-tight flex items-center gap-2 text-slate-200">
              <Briefcase size={16} className="text-[#7c5cff]" /> Production Training Assignments
            </h2>
            
            {/* Task Row 1 */}
            <div className="bg-[#0b0f19] border border-[#1e293b] p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#7c5cff]/40 transition group">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#7c5cff] bg-[#7c5cff]/10 border border-[#7c5cff]/20 px-2 py-0.5 rounded-md uppercase tracking-wide">Module 01</span>
                <h4 className="text-sm font-bold text-white group-hover:text-[#22d3ee] transition-colors mt-1">Component Optimization & Token Routing</h4>
                <p className="text-xs text-[#64748b]">Build fully responsive corporate structures using complex Tailwind UI layouts and state management properties.</p>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold self-start sm:self-auto bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
                <CheckCircle2 size={14} /> Completed
              </div>
            </div>

            {/* Task Row 2 */}
            <div className="bg-[#0b0f19] border border-[#1e293b] p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#22d3ee]/40 transition group">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#22d3ee] bg-[#22d3ee]/10 border border-[#22d3ee]/20 px-2 py-0.5 rounded-md uppercase tracking-wide">Module 02</span>
                <h4 className="text-sm font-bold text-white group-hover:text-[#22d3ee] transition-colors mt-1">Nodemailer Backend Pipelines Connection</h4>
                <p className="text-xs text-[#64748b]">Integrate real data transfer nodes between Express servers and client UI interfaces via REST API methods.</p>
              </div>
              <div className="flex items-center gap-2 text-[#22d3ee] text-xs font-bold self-start sm:self-auto bg-[#22d3ee]/10 border border-[#22d3ee]/20 px-3 py-1.5 rounded-xl">
                <Clock size={14} /> In Review
              </div>
            </div>
          </div>

          {/* Right Block: Corporate Identity Hub Status */}
          <div className="space-y-4">
            <h2 className="text-base font-black tracking-tight flex items-center gap-2 text-slate-200">
              <User size={16} className="text-[#22d3ee]" /> Identity Authorization Records
            </h2>
            <div className="bg-[#0b0f19] border border-[#1e293b] p-6 rounded-2xl space-y-5">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#64748b]">Verification Token</span>
                  <span className="font-bold text-emerald-400">Authorized ✔</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#64748b]">Corporate Offer Letter</span>
                  <span className="font-bold text-[#7c5cff]">Issued</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#64748b]">Performance Review</span>
                  <span className="font-bold text-[#22d3ee]">Processing</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-[#1e293b]/60">
                <button className="w-full bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] text-white font-bold text-xs py-3 rounded-xl tracking-wider uppercase shadow-lg shadow-[#7c5cff]/10 hover:opacity-90 transition">
                  Download Certificate Hub Node
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}