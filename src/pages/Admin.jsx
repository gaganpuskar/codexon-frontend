import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'; 
import { AuthContext } from '../context/AuthContext';
import { 
  Plus, Trash2, Edit3, BookOpen, Briefcase, RefreshCw, 
  FileText, Check, X, ExternalLink, GraduationCap, ShieldAlert, UserCheck, Award 
} from 'lucide-react';

// CORE PLATFORM IMPORTS
import Background from '../components/Background';

// 🚨 PORT 5002 MASTER LINKED BINDING
const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

export default function Admin() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([]);
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [courseEnrollments, setCourseEnrollments] = useState([]); 

  const [courseForm, setCourseForm] = useState({ title: '', description: '', duration: '', price: '', techStack: '' });
  const [internshipForm, setInternshipForm] = useState({ title: '', company: '', description: '', duration: '', stipend: '', skillsRequired: '' });
  const [editId, setEditId] = useState(null);

  const getAuthConfig = () => ({ headers: { Authorization: `Bearer ${user?.token}` } });

  const fetchData = async () => {
    try {
      const resC = await axios.get(`${BACKEND_URL}/courses`);
      const resI = await axios.get(`${BACKEND_URL}/internships`);
      const resA = await axios.get(`${BACKEND_URL}/admin/applications`, getAuthConfig());
      
      // Fetch dynamic enrollment payloads containing scores & certificate variables
      const resE = await axios.get(`${BACKEND_URL}/courses/admin/enrollments`, getAuthConfig());
      
      setCourses(resC.data); 
      setInternships(resI.data); 
      setApplications(resA.data || []);
      setCourseEnrollments(resE.data || []); 
    } catch (err) { 
      console.error("Cluster orchestration pull failed logs:", err); 
    }
  };

  useEffect(() => { 
    if (user) fetchData(); 
  }, [user]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative">
        <Background />
        <div className="portfolio-glass p-8 rounded-3xl max-w-md text-center relative z-10">
          <ShieldAlert className="text-[#ff5c8a] mx-auto mb-4" size={48} />
          <h2 className="text-xl font-black mb-2 text-[var(--text)]">Access Denied</h2>
          <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
            Security context tokens mismatch. Clear admin credentials mandatory.
          </p>
        </div>
      </div>
    );
  }

  const updateStatus = async (id, statusValue) => {
    try {
      await axios.put(`${BACKEND_URL}/admin/applications/${id}`, { status: statusValue }, getAuthConfig());
      fetchData();
    } catch (err) { alert(err.message); }
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    const payload = { 
      title: courseForm.title,
      description: courseForm.description, 
      duration: courseForm.duration,
      price: courseForm.price,
      techStack: typeof courseForm.techStack === 'string' ? courseForm.techStack.split(',').map(s => s.trim()) : courseForm.techStack 
    };
    try {
      if (editId) { 
        await axios.put(`${BACKEND_URL}/courses/${editId}`, payload, getAuthConfig()); 
        alert("Course metrics updated.");
      } else { 
        await axios.post(`${BACKEND_URL}/courses`, payload, getAuthConfig()); 
        alert("New course record successfully mapped.");
      }
      setCourseForm({ title: '', description: '', duration: '', price: '', techStack: '' }); 
      setEditId(null); 
      fetchData();
    } catch (err) { alert(err.response?.data?.message || err.message); }
  };

  const deleteCourse = async (id) => {
    if (confirm("Delete permanently?")) { 
      await axios.delete(`${BACKEND_URL}/courses/${id}`, getAuthConfig()); 
      fetchData(); 
    }
  };

  const handleInternshipSubmit = async (e) => {
    e.preventDefault();
    const payload = { 
      ...internshipForm, 
      skillsRequired: typeof internshipForm.skillsRequired === 'string' ? internshipForm.skillsRequired.split(',').map(s => s.trim()) : internshipForm.skillsRequired 
    };
    try {
      if (editId) { 
        await axios.put(`${BACKEND_URL}/internships/${editId}`, payload, getAuthConfig()); 
        alert("Internship metrics updated.");
      } else { 
        await axios.post(`${BACKEND_URL}/internships`, payload, getAuthConfig()); 
        alert("New vacancy deployed.");
      }
      setInternshipForm({ title: '', company: '', description: '', duration: '', stipend: '', skillsRequired: '' }); 
      setEditId(null); 
      fetchData();
    } catch (err) { alert(err.message); }
  };

  const deleteInternship = async (id) => {
    if (confirm("Delete permanently?")) { 
      await axios.delete(`${BACKEND_URL}/internships/${id}`, getAuthConfig()); 
      fetchData(); 
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-[var(--text)] font-sans p-8 antialiased relative transition-colors duration-400">
      <Background />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Operational bar */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-6 mb-8 mt-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#7c5cff] to-[#22d3ee]">
              PUSHKAR ADMIN GATEWAY
            </h1>
          </div>
          <button onClick={fetchData} className="portfolio-glass p-2.5 rounded-xl text-[#22d3ee] transition">
            <RefreshCw size={16} />
          </button>
        </div>

        {/* Action tab controls suite */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button onClick={() => { setActiveTab('courses'); setEditId(null); }} className={`px-5 py-3 rounded-xl font-bold flex items-center gap-2 text-sm uppercase transition ${activeTab === 'courses' ? 'bg-[#7c5cff] text-white' : 'portfolio-glass text-[var(--muted)]'}`}><BookOpen size={16} /> Courses ({courses.length})</button>
          <button onClick={() => { setActiveTab('internships'); setEditId(null); }} className={`px-5 py-3 rounded-xl font-bold flex items-center gap-2 text-sm uppercase transition ${activeTab === 'internships' ? 'bg-[#22d3ee] text-white' : 'portfolio-glass text-[var(--muted)]'}`}><Briefcase size={16} /> Internships ({internships.length})</button>
          <button onClick={() => { setActiveTab('applications'); setEditId(null); }} className={`px-5 py-3 rounded-xl font-bold flex items-center gap-2 text-sm uppercase transition ${activeTab === 'applications' ? 'bg-emerald-600 text-white' : 'portfolio-glass text-[var(--muted)]'}`}><FileText size={16} /> Student Applications ({applications.length})</button>
          <button onClick={() => { setActiveTab('enrollments'); setEditId(null); }} className={`px-5 py-3 rounded-xl font-bold flex items-center gap-2 text-sm uppercase transition ${activeTab === 'enrollments' ? 'bg-amber-600 text-white' : 'portfolio-glass text-[var(--muted)]'}`}><UserCheck size={16} /> Course Enrollments ({courseEnrollments.length})</button>
        </div>

        {activeTab === 'courses' || activeTab === 'internships' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side Form block */}
            <div className="lg:col-span-1 portfolio-glass p-6 rounded-2xl h-fit">
              <h2 className="text-lg font-bold mb-4 text-[#22d3ee] flex items-center gap-1.5">
                <Plus size={18} /> {editId ? 'UPDATE ENTRY' : 'CREATE ENTRY'}
              </h2>
              
              {activeTab === 'courses' ? (
                <form onSubmit={handleCourseSubmit} className="flex flex-col gap-4 text-sm">
                  <input type="text" placeholder="Course Title" value={courseForm.title} onChange={e => setCourseForm({...courseForm, title: e.target.value})} className="w-full bg-transparent border border-[var(--border)] rounded-xl p-3 text-[var(--text)] outline-none focus:border-[#7c5cff] transition" required />
                  <textarea placeholder="Description" value={courseForm.description} onChange={e => setCourseForm({...courseForm, description: e.target.value})} className="w-full bg-transparent border border-[var(--border)] rounded-xl p-3 text-[var(--text)] outline-none focus:border-[#7c5cff] transition h-24 resize-none" required />
                  <input type="text" placeholder="Duration" value={courseForm.duration} onChange={e => setCourseForm({...courseForm, duration: e.target.value})} className="w-full bg-transparent border border-[var(--border)] rounded-xl p-3 text-[var(--text)] outline-none focus:border-[#7c5cff] transition" required />
                  <input type="number" placeholder="Price" value={courseForm.price} onChange={e => setCourseForm({...courseForm, price: e.target.value})} className="w-full bg-transparent border border-[var(--border)] rounded-xl p-3 text-[var(--text)] outline-none focus:border-[#7c5cff] transition" required />
                  <input type="text" placeholder="Tech Stack (comma separated)" value={courseForm.techStack} onChange={e => setCourseForm({...courseForm, techStack: e.target.value})} className="w-full bg-transparent border border-[var(--border)] rounded-xl p-3 text-[var(--text)] outline-none focus:border-[#7c5cff] transition" />
                  <button type="submit" className="w-full bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] text-white font-bold py-3 rounded-xl uppercase shadow-lg mt-2">{editId ? 'Save Changes' : 'Deploy Course'}</button>
                </form>
              ) : (
                <form onSubmit={handleInternshipSubmit} className="flex flex-col gap-4 text-sm">
                  <input type="text" placeholder="Role Title" value={internshipForm.title} onChange={e => setInternshipForm({...internshipForm, title: e.target.value})} className="w-full bg-transparent border border-[var(--border)] rounded-xl p-3 text-[var(--text)] outline-none focus:border-[#22d3ee] transition" required />
                  <input type="text" placeholder="Company Name" value={internshipForm.company} onChange={e => setInternshipForm({...internshipForm, company: e.target.value})} className="w-full bg-transparent border border-[var(--border)] rounded-xl p-3 text-[var(--text)] outline-none focus:border-[#22d3ee] transition" />
                  <textarea placeholder="Job Description" value={internshipForm.description} onChange={e => setInternshipForm({...internshipForm, description: e.target.value})} className="w-full bg-transparent border border-[var(--border)] rounded-xl p-3 text-[var(--text)] outline-none focus:border-[#22d3ee] transition h-24 resize-none" required />
                  <input type="text" placeholder="Duration" value={internshipForm.duration} onChange={e => setInternshipForm({...internshipForm, duration: e.target.value})} className="w-full bg-transparent border border-[var(--border)] rounded-xl p-3 text-[var(--text)] outline-none focus:border-[#22d3ee] transition" required />
                  <input type="text" placeholder="Stipend" value={internshipForm.stipend} onChange={e => setInternshipForm({...internshipForm, stipend: e.target.value})} className="w-full bg-transparent border border-[var(--border)] rounded-xl p-3 text-[var(--text)] outline-none focus:border-[#22d3ee] transition" />
                  <input type="text" placeholder="Skills Required" value={internshipForm.skillsRequired} onChange={e => setInternshipForm({...internshipForm, skillsRequired: e.target.value})} className="w-full bg-transparent border border-[var(--border)] rounded-xl p-3 text-[var(--text)] outline-none focus:border-[#22d3ee] transition" />
                  <button type="submit" className="w-full bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] text-white font-bold py-3 rounded-xl uppercase shadow-lg mt-2">{editId ? 'Save Changes' : 'Deploy Vacancy'}</button>
                </form>
              )}
            </div>

            {/* Right side Entity view */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {activeTab === 'courses' ? courses.map(course => (
                <div key={course._id} className="portfolio-glass rounded-2xl p-5 flex items-start justify-between shadow-sm">
                  <div className="flex-1">
                    <h3 className="text-base font-black text-[var(--text)]">{course.title}</h3>
                    <p className="text-[var(--muted)] text-xs mt-1 line-clamp-2 leading-relaxed">{course.description}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button onClick={() => { setEditId(course._id); setCourseForm({ title: course.title, description: course.description, duration: course.duration, price: course.price, techStack: Array.isArray(course.techStack) ? course.techStack.join(', ') : course.techStack }); }} className="text-[var(--muted)] hover:text-[#22d3ee] p-2 portfolio-glass rounded-xl border border-[var(--border)]"><Edit3 size={14} /></button>
                    <button onClick={() => deleteCourse(course._id)} className="text-[var(--muted)] hover:text-red-500 p-2 portfolio-glass rounded-xl border border-[var(--border)]"><Trash2 size={14} /></button>
                  </div>
                </div>
              )) : internships.map(intern => (
                <div key={intern._id} className="portfolio-glass rounded-2xl p-5 flex items-start justify-between shadow-sm">
                  <div className="flex-1">
                    <h3 className="text-base font-black text-[var(--text)]">{intern.title} <span className="text-xs text-[#7c5cff] font-bold">@ {intern.company}</span></h3>
                    <p className="text-[var(--muted)] text-xs mt-1 line-clamp-2 leading-relaxed">{intern.description}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button onClick={() => { setEditId(intern._id); setInternshipForm({ title: intern.title, company: intern.company, description: intern.description, duration: intern.duration, stipend: intern.stipend, skillsRequired: Array.isArray(intern.skillsRequired) ? intern.skillsRequired.join(', ') : intern.skillsRequired }); }} className="text-[var(--muted)] hover:text-[#22d3ee] p-2 portfolio-glass rounded-xl border border-[var(--border)]"><Edit3 size={14} /></button>
                    <button onClick={() => deleteInternship(intern._id)} className="text-[var(--muted)] hover:text-red-500 p-2 portfolio-glass rounded-xl border border-[var(--border)]"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'applications' ? (
          /* Student Internship Applications logs view */
          <div className="portfolio-glass rounded-2xl overflow-hidden text-sm shadow-sm relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--bg)] text-[var(--muted)] text-xs uppercase border-b border-[var(--border)] font-black opacity-90">
                    <th className="p-4 pl-6">Student Profile & Academic Data</th>
                    <th className="p-4">Applied Designation</th>
                    <th className="p-4">Resume File</th>
                    <th className="p-4">State</th>
                    <th className="p-4 text-right pr-6">Actions Workflow</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app._id} className="border-b border-[var(--border)] hover:bg-white/5 transition">
                      <td className="p-4 pl-6">
                        <span className="font-bold block text-[var(--text)] text-base">{app.studentName}</span>
                        <span className="text-[var(--muted)] text-xs font-mono block mb-1">{app.studentEmail}</span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#22d3ee] font-medium bg-[#22d3ee]/10 px-2 py-0.5 border border-[#22d3ee]/10 rounded-md">
                          <GraduationCap size={12} /> {app.collegeName || 'N/A'} ({app.studentClass || 'N/A'})
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-[var(--text)]">{app.internshipTitle}</td>
                      <td className="p-4">
                        <a href={app.resumeLink} target="_blank" rel="noreferrer" className="text-[#22d3ee] hover:underline inline-flex items-center gap-1 text-xs font-semibold">
                          <ExternalLink size={12} /> View Document
                        </a>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${app.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : app.status === 'Rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="p-4 text-right pr-6">
                        <div className="flex gap-2 justify-end items-center">
                          {app.status === 'Pending' ? (
                            <>
                              <button onClick={() => updateStatus(app._id, 'Accepted')} className="bg-emerald-600/10 border border-emerald-500/20 text-emerald-500 p-2 rounded-xl hover:bg-emerald-600 hover:text-white transition"><Check size={14} /></button>
                              <button onClick={() => updateStatus(app._id, 'Rejected')} className="bg-red-500/10 border border-red-500/20 text-red-500 p-2 rounded-xl hover:bg-red-600 hover:text-white transition"><X size={14} /></button>
                            </>
                          ) : ( 
                            <span className="text-[var(--muted)] text-[10px] font-black uppercase tracking-widest pr-2 opacity-60">Locked</span> 
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
          /* 🚨 UPGRADED LIVE COURSE ENROLLMENTS TABLE: TRACKS SCORES AND CERTIFICATES LIVE */
          <div className="portfolio-glass rounded-2xl overflow-hidden text-sm shadow-sm relative z-10 animate-fadeIn">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--bg)] text-[var(--muted)] text-xs uppercase border-b border-[var(--border)] font-black opacity-90">
                    <th className="p-4 pl-6">Student Information</th>
                    <th className="p-4">Enrolled Course Track Node</th>
                    <th className="p-4 text-center">Quiz Metrics Score</th>
                    <th className="p-4 text-center">Certificate Issue State</th>
                    <th className="p-4 text-right pr-6">Database Status</th>
                  </tr>
                </thead>
                <tbody>
                  {courseEnrollments.map((enr) => (
                    <tr key={enr._id} className="border-b border-[var(--border)] hover:bg-white/5 transition">
                      <td className="p-4 pl-6">
                        <span className="font-bold block text-[var(--text)] text-base">{enr.studentName}</span>
                        <span className="text-[var(--muted)] text-xs font-mono block">{enr.studentEmail}</span>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7c5cff] to-[#22d3ee]">
                          <BookOpen size={14} className="text-[#22d3ee]" /> {enr.courseTitle}
                        </span>
                      </td>
                      {/* 🚨 DYNAMIC PERFORMANCE METRICS INJECTION */}
                      <td className="p-4 text-center font-mono text-xs font-bold">
                        {enr.quizScore !== undefined ? (
                          <span className={enr.quizScore >= 70 ? "text-emerald-400" : "text-amber-500"}>
                            {enr.quizScore}%
                          </span>
                        ) : (
                          <span className="text-[var(--muted)] opacity-60">0%</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {enr.isCertified ? (
                          <span className="inline-flex items-center gap-1 text-[10px] uppercase font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                            <Award size={11}/> Graduated
                          </span>
                        ) : (
                          <span className="text-[10px] uppercase font-black text-[var(--muted)] opacity-50">
                            In Progress
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right pr-6">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                          {enr.status || 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {courseEnrollments.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-12 text-[var(--muted)] font-mono text-xs uppercase tracking-widest">
                        No student registrations tracked inside core ledger nodes yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}