import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { 
  Briefcase, 
  Calendar, 
  DollarSign, 
  ArrowUpRight, 
  ExternalLink, 
  GraduationCap, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  Download 
} from 'lucide-react';

// CORE PLATFORM IMPORTS
import Background from '../components/Background';

// 🚨 MASTER RUNNING BACKEND NODE ROUTE LOCK
const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

export default function Internships() {
  const { user } = useContext(AuthContext);
  const [internships, setInternships] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Application Interactive Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [appForm, setAppForm] = useState({ collegeName: '', studentClass: '', resumeLink: '' });

  const getAuthConfig = () => ({ headers: { Authorization: `Bearer ${user?.token}` } });

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/internships`);
      setInternships(res.data);
      
      if (user) {
        const myRes = await axios.get(`${BACKEND_URL}/intern/dashboard`, getAuthConfig());
        if (Array.isArray(myRes.data)) {
          setMyApplications(myRes.data);
        } else {
          setMyApplications([]);
        }
      }
    } catch (err) { 
      console.error("Cluster synchronization tracking error logging:", err); 
      setMyApplications([]);
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, [user]);

  // ========================================================================
  // 📥 👑 CLIENT-SIDE HIGH DEFINITION DYNAMIC HTML-TO-PDF GENERATOR ENGINE
  // ========================================================================
  const handleDownloadPDF = async (appId, studentName) => {
    try {
      // 1. Backend template corridor se custom brand layout markup pull karna
      const response = await axios.get(`${BACKEND_URL}/internships/admin/applications/${appId}/offer-letter`);
      const htmlContent = response.data;

      // 2. Creating an isolated tracking virtual DOM block element
      const workerElement = document.createElement('div');
      workerElement.innerHTML = htmlContent;
      document.body.appendChild(workerElement);

      // 3. Exact scale metrics match rules parameters definition (A4 Bounds matching layout sizes)
      const opt = {
        margin:       0,
        filename:     `Codexon_OfferLetter_${studentName.replace(/\s+/g, '_')}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, letterRendering: true, logging: false },
        jsPDF:        { unit: 'px', format: [800, 1120], orientation: 'portrait' }
      };

      // 4. Execution conversion workflow mapping loops
      if (window.html2pdf) {
        window.html2pdf().from(workerElement).set(opt).save().then(() => {
          document.body.removeChild(workerElement); // Freeing context operational memory structures
        });
      } else {
        alert("PDF Canvas Compilation Script is loading. Please give system a clean refresh reload step.");
      }

    } catch (err) {
      console.error("PDF integration tracking matrix path trace loop crash:", err);
      alert("Error processing clean document conversion layout package: " + err.message);
    }
  };

  const handleApplyClick = (intern) => {
    if (!user) return alert("Security context token absent. Please sign in to activate pipeline!");
    setSelectedIntern(intern);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      internshipId: selectedIntern._id,
      internshipTitle: selectedIntern.title,
      studentName: user.name,
      studentEmail: user.email,
      collegeName: appForm.collegeName,
      studentClass: appForm.studentClass,
      resumeLink: appForm.resumeLink
    };

    try {
      await axios.post(`${BACKEND_URL}/intern/apply`, payload, getAuthConfig());
      alert("Application committed to operational validation queues successfully!");
      setIsModalOpen(false);
      setAppForm({ collegeName: '', studentClass: '', resumeLink: '' });
      fetchData();
    } catch (err) { 
      alert(err.response?.data?.message || err.message); 
    }
  };

  return (
    <div className="bg-transparent text-[var(--text)] font-sans selection:bg-indigo-500/30 overflow-x-hidden relative transition-colors duration-400 p-8 antialiased">
      
      {/* GLOBAL DYNAMIC GRADIENT BLOB ENGINE */}
      <Background />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Dashboard Header Quadrant */}
        <div className="mb-12 mt-4">
          <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] tracking-tight">
            Open Placement Pipelines
          </h1>
          <p className="text-[var(--muted)] mt-2 text-sm max-w-xl leading-relaxed">
            Review active vacancies, upload institutional data metrics, and track approval states instantly.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20 text-[var(--muted)] text-xs font-mono uppercase tracking-widest gap-2">
            <Loader2 className="animate-spin text-[#7c5cff]" size={16} /> Syncing network datasets...
          </div>
        ) : (
          <>
            {/* INTERNSHIP CARD POSTINGS INDEX GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
              {internships.map((intern) => {
                const applicationsArray = Array.isArray(myApplications) ? myApplications : [];
                const currentApp = applicationsArray.find(app => app.internshipId === intern._id);
                const hasApplied = !!currentApp;

                return (
                  <div key={intern._id} className="portfolio-glass rounded-3xl p-6 flex flex-col justify-between hover:border-[#7c5cff] transition duration-300 relative overflow-hidden shadow-sm dark:shadow-none">
                    
                    {hasApplied && currentApp.status === 'Accepted' && (
                      <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 text-[10px] uppercase tracking-widest font-black px-4 py-1.5 border-b border-l border-[var(--border)] rounded-bl-xl">
                        Selection Confirmed ✓
                      </div>
                    )}

                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-black tracking-tight text-[var(--text)]">{intern.title}</h3>
                          <span className="text-xs text-[#7c5cff] dark:text-[#22d3ee] font-bold tracking-wide uppercase">{intern.company}</span>
                        </div>
                        <div className="portfolio-glass text-[#22d3ee] p-2.5 rounded-2xl shrink-0">
                          <Briefcase size={18} />
                        </div>
                      </div>
                      <p className="text-[var(--muted)] text-xs line-clamp-3 mb-6 leading-relaxed">{intern.description}</p>
                    </div>

                    <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs">
                      <div className="flex gap-5 font-semibold text-[var(--muted)]">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-[#7c5cff]" />
                          <span>{intern.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#22d3ee]">💰</span>
                          <span>{intern.stipend}</span>
                        </div>
                      </div>

                      {hasApplied ? (
                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border ${
                          currentApp.status === 'Accepted' 
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                            : currentApp.status === 'Rejected' 
                            ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                        }`}>
                          {currentApp.status === 'Accepted' ? 'Application Accepted' : currentApp.status === 'Rejected' ? 'Application Rejected' : 'Verification Pending'}
                        </span>
                      ) : (
                        <button 
                          onClick={() => handleApplyClick(intern)} 
                          className="bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] text-white font-bold px-4 py-2.5 rounded-xl flex items-center gap-1 transition text-[11px] uppercase tracking-wider shadow-lg transform hover:-translate-y-0.5"
                        >
                          Apply Now <ArrowUpRight size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* LIVE APPLICATIONS TRACKING MONITOR LEDGER */}
            {user && (
              <div className="border-t border-[var(--border)] pt-10">
                <div className="mb-6">
                  <h2 className="text-xs font-black text-[var(--text)] uppercase tracking-widest opacity-80">
                    Your Realtime Application Matrix Logs
                  </h2>
                  <p className="text-[var(--muted)] text-[11px] mt-0.5">Strict sync state connection with cloud database clusters</p>
                </div>

                {Array.isArray(myApplications) && myApplications.length > 0 ? (
                  <div className="portfolio-glass rounded-3xl overflow-hidden shadow-sm dark:shadow-none relative z-10">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="bg-[var(--bg)] text-[var(--muted)] text-[11px] border-b border-[var(--border)] font-black uppercase tracking-wider opacity-90">
                            <th className="p-4 pl-6">Applied Quadrant Role</th>
                            <th className="p-4">Academic Telemetry Profile</th>
                            <th className="p-4">Resume Asset</th>
                            <th className="p-4 text-right pr-6">Operational Clearance Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {myApplications.map((app) => (
                            <tr key={app._id} className="border-b border-[var(--border)] hover:bg-white/5 dark:hover:bg-white/5 transition duration-200">
                              <td className="p-4 pl-6">
                                <span className="font-bold text-[var(--text)] block text-sm">{app.internshipTitle}</span>
                                <span className="text-[10px] text-[var(--muted)] font-mono tracking-tighter">ID: {app._id}</span>
                              </td>
                              <td className="p-4">
                                <div className="flex flex-col gap-0.5 text-xs text-[var(--muted)]">
                                  <span className="font-semibold text-[var(--text)] flex items-center gap-1">
                                    <GraduationCap size={13} className="text-[#7c5cff]" /> {app.collegeName}
                                  </span>
                                  <span className="flex items-center gap-1 text-[11px] pl-4">
                                    Year: {app.studentClass}
                                  </span>
                                </div>
                              </td>
                              <td className="p-4">
                                <a 
                                  href={app.resumeLink} 
                                  target="_blank" 
                                  rel="noreferrer" 
                                  className="text-[#22d3ee] hover:text-[#7c5cff] flex items-center gap-1 text-xs hover:underline font-semibold"
                                >
                                  <ExternalLink size={12} /> View Document
                                </a>
                              </td>
                              <td className="p-4 text-right pr-6">
                                <div className="flex items-center justify-end gap-3">
                                  
                                  {/* DYNAMIC STATUS DISPLAY MODIFIER BLOCK */}
                                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border ${
                                    app.status === 'Accepted' 
                                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                                      : app.status === 'Rejected' 
                                      ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                                  }`}>
                                    {app.status === 'Accepted' ? (
                                      <>
                                        <CheckCircle2 size={12} className="text-emerald-500 dark:text-emerald-400 animate-pulse" />
                                        <span>Cleared & Accepted 🎉</span>
                                      </>
                                    ) : app.status === 'Rejected' ? (
                                      <>
                                        <XCircle size={12} className="text-red-500" />
                                        <span>Rejected</span>
                                      </>
                                    ) : (
                                      <>
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                                        <span>Pending Sync ⏳</span>
                                      </>
                                    )}
                                  </span>

                                  {/* 📥 🆕 HIGH DENSITY PDF GENERATION DYNAMIC TRIGGER ACTION NODE */}
                                  {app.status === 'Accepted' && (
                                    <button
                                      onClick={() => handleDownloadPDF(app._id, app.studentName)}
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-black uppercase tracking-wider hover:border-emerald-400 hover:text-white transition shadow-lg transition-transform duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                                    >
                                      <Download size={12} /> PDF Offer Letter
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 border border-dashed border-[var(--border)] rounded-3xl text-[var(--muted)] text-xs font-mono uppercase tracking-widest bg-white/5">
                    No applications submitted yet by this user quadrant.
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* DATA SUBMISSION DIALOG MODAL LAYERING */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="portfolio-glass w-full max-w-md p-6 rounded-3xl shadow-2xl relative overflow-hidden bg-[var(--bg)]">
              
              <h3 className="text-lg font-black text-[var(--text)] mb-0.5 tracking-tight">Apply for Position</h3>
              <p className="text-xs font-bold uppercase tracking-wider mb-6 text-[#22d3ee]">
                {selectedIntern?.title} <span className="text-[var(--muted)]">@</span> {selectedIntern?.company}
              </p>
              
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 text-sm relative z-10">
                <div>
                  <label className="text-[var(--muted)] text-xs uppercase font-black tracking-wide mb-2 block">
                    College / Institutional Identity Signature
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3.5 top-3.5 text-[var(--muted)]" size={15} />
                    <input 
                      type="text" 
                      placeholder="e.g., Dr. A.P.J. Abdul Kalam Technical University" 
                      value={appForm.collegeName} 
                      onChange={e => setAppForm({ ...appForm, collegeName: e.target.value })} 
                      className="w-full bg-transparent border border-[var(--border)] rounded-xl py-3 pl-10 pr-4 text-[var(--text)] placeholder-[var(--muted)] outline-none focus:border-[#22d3ee] transition" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[var(--muted)] text-xs uppercase font-black tracking-wide mb-2 block">
                    Class / Year / Current Semester Node
                  </label>
                  <div className="relative">
                    <Layers className="absolute left-3.5 top-3.5 text-[var(--muted)]" size={15} />
                    <input 
                      type="text" 
                      placeholder="e.g., B.Tech 7th Semester" 
                      value={appForm.studentClass} 
                      onChange={e => setAppForm({ ...appForm, studentClass: e.target.value })} 
                      className="w-full bg-transparent border border-[var(--border)] rounded-xl py-3 pl-10 pr-4 text-[var(--text)] placeholder-[var(--muted)] outline-none focus:border-[#22d3ee] transition" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[var(--muted)] text-xs uppercase font-black tracking-wide mb-2 block">
                    Resume Shareable Drive URL Link
                  </label>
                  <div className="relative">
                    <ExternalLink className="absolute left-3.5 top-3.5 text-[var(--muted)]" size={15} />
                    <input 
                      type="url" 
                      placeholder="https://drive.google.com/..." 
                      value={appForm.resumeLink} 
                      onChange={e => setAppForm({ ...appForm, resumeLink: e.target.value })} 
                      className="w-full bg-transparent border border-[var(--border)] rounded-xl py-3 pl-10 pr-4 text-[var(--text)] placeholder-[var(--muted)] outline-none focus:border-[#22d3ee] transition" 
                      required 
                    />
                  </div>
                </div>

                <div className="flex gap-3 text-xs font-bold uppercase mt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)} 
                    className="flex-1 portfolio-glass text-[var(--muted)] py-3.5 rounded-xl hover:bg-white/5 transition uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] text-white py-3.5 rounded-xl transition uppercase tracking-wider shadow-lg"
                  >
                    Submit Payload
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}