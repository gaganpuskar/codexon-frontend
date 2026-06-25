import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Terminal, Sun, Moon, LogOut, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // 🔮 DARK / LIGHT MODE STATE CONTROLLER
  const [darkMode, setDarkMode] = useState(() => {
    // Initial verification via storage signatures cache
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true; // Default fallbacks strictly set to Dark Mode
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Synchronizes DOM tree elements layers whenever state triggers change parameters
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLogoutAction = () => {
    logout();
    alert("Session invalidated. Logged out successfully from CODEXON HUB.");
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#030712]/80 border-b border-slate-200 dark:border-slate-900/60 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* CODEXON BRAND LOGO COMPONENT */}
        <Link to="/" className="flex items-center gap-2 text-xl font-black tracking-tight text-slate-900 dark:text-white">
          <Terminal className="text-cyan-500 dark:text-cyan-400" size={22} />
          CODEXON <span className="text-indigo-600 dark:text-indigo-500 font-medium text-base">HUB</span>
        </Link>

        {/* MIDDLE NAV LINKS QUADRANT */}
        <div className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Link to="/" className="hover:text-indigo-600 dark:hover:text-cyan-400 transition">Home</Link>
          <Link to="/courses" className="hover:text-indigo-600 dark:hover:text-cyan-400 transition">Courses</Link>
          <Link to="/internships" className="hover:text-indigo-600 dark:hover:text-cyan-400 transition">Internships</Link>
          <Link to="/about" className="hover:text-indigo-600 dark:hover:text-cyan-400 transition">About</Link>
        </div>

        {/* RIGHT CONTROLS UTILITIES (AUTH + THEME SWITCHER) */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* 🚨 THEME TOGGLE INTERACTIVE SWITCH SWITCHER */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 transition shadow-sm dark:shadow-lg"
            title={darkMode ? "Switch to Operational Light Matrix" : "Activate Cinematic Dark Space"}
          >
            {darkMode ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-indigo-500" />}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase tracking-widest bg-indigo-500/5 dark:bg-indigo-500/10 border border-slate-200 dark:border-indigo-500/20 px-3 py-1.5 rounded-xl text-indigo-600 dark:text-indigo-400">
                👤 {user.name}
              </span>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-xs font-black uppercase tracking-wider bg-indigo-600 dark:bg-cyan-600 hover:bg-indigo-700 dark:hover:bg-cyan-700 px-3 py-1.5 rounded-xl text-white transition">
                  Gateway
                </Link>
              )}
              <button 
                onClick={handleLogoutAction} 
                className="p-2.5 bg-red-500/5 dark:bg-red-600/10 border border-slate-200 dark:border-red-500/20 text-red-500 dark:text-red-400 hover:bg-red-600 hover:text-white rounded-xl transition"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-xs font-black uppercase tracking-wider bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl text-white transition shadow-md shadow-indigo-600/10">
              Sign In
            </Link>
          )}
        </div>

        {/* MOBILE INTERACTION GATE */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-slate-100 dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 rounded-lg text-slate-500 dark:text-slate-400">
            {darkMode ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-indigo-500" />}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600 dark:text-slate-400 p-1">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* MOBILE EXPANDED LINKS DRAW PANEL */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#030712] border-t border-slate-200 dark:border-slate-900 px-6 py-4 flex flex-col gap-4 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 animate-fadeIn">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-600 dark:hover:text-white py-1">Home</Link>
          <Link to="/courses" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-600 dark:hover:text-white py-1">Courses</Link>
          <Link to="/internships" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-600 dark:hover:text-white py-1">Internships</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-600 dark:hover:text-white py-1">About</Link>
          <hr className="border-slate-200 dark:border-slate-900" />
          {user ? (
            <button onClick={() => { setMobileMenuOpen(false); handleLogoutAction(); }} className="w-full bg-red-600/10 border border-red-500/20 text-red-500 dark:text-red-400 py-2.5 rounded-xl font-bold">Logout Session</button>
          ) : (
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full bg-indigo-600 text-white text-center py-2.5 rounded-xl font-bold">Sign In</Link>
          )}
        </div>
      )}
    </nav>
  );
}