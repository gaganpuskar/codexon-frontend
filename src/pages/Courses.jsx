import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, ShieldCheck, Loader2, Terminal, CheckCircle, Award } from 'lucide-react';

// CORE BACKGROUND ENGINE
import Background from '../components/Background';

// 🚨 PORT 5002 NODE CONSTANT LINKAGE
const BACKEND_URL = 'http://localhost:5002/api';

export default function Courses() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [myEnrollments, setMyEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAuthConfig = () => ({ headers: { Authorization: `Bearer ${user?.token}` } });

  const fetchCatalogAndEnrollments = async () => {
    try {
      // 1. Fetch live courses catalog array
      const res = await axios.get(`${BACKEND_URL}/courses`);
      setCourses(res.data);

      // 2. If valid student token is active, fetch registered student endpoints logs
      if (user) {
        const enrolledRes = await axios.get(`${BACKEND_URL}/courses/my-enrollments`, getAuthConfig());
        setMyEnrollments(enrolledRes.data || []);
      }
    } catch (err) {
      console.error("Pipeline dynamic catalog logging error parsing:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogAndEnrollments();
  }, [user]);

  const handleEnrollSubmit = async (course) => {
    if (!user) return alert("Security authorization context failed. Please sign in to initialize application pipeline!");
    
    try {
      // Direct post mapping request stream
      await axios.post(`${BACKEND_URL}/courses/enroll`, {
        courseId: course._id,
        courseTitle: course.title
      }, getAuthConfig());

      alert(`🎉 Course registered successfully for ${course.title}!`);
      fetchCatalogAndEnrollments(); // Re-index arrays live
    } catch (err) {
      alert(err.response?.data?.message || "Enrollment processing configuration sync crash.");
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-[var(--text)] font-sans p-8 antialiased relative transition-colors duration-400">
      
      {/* GLOBAL GLASS BACKGROUND MESH */}
      <Background />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Dynamic Matrix Header Segment */}
        <div className="text-center mt-12 mb-16">
          <div className="portfolio-glass inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest text-[#22d3ee] mb-4">
            <Terminal size={12} /> Knowledge Matrix Hub
          </div>
          <h1 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#7c5cff] to-[#22d3ee]">
            Available Specialization Cohorts
          </h1>
          <p className="text-[var(--muted)] text-sm max-w-xl mx-auto mt-3 leading-relaxed">
            Select an operational tracking workspace to link your profile tags with live industry engineering environments.
          </p>
        </div>

        {/* 🚨 PREMIUM FREE CERTIFIED TRACK: STANDALONE INTEL MESH BANNER */}
        <div className="portfolio-glass p-6 md:p-8 rounded-3xl mb-12 border border-amber-500/20 bg-gradient-to-r from-amber-500/5 via-transparent to-transparent flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg animate-fadeIn relative overflow-hidden">
          <div className="space-y-2">
            <span className="bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/20">
              Free Certified Track
            </span>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-[var(--text)]">
              HTML5 Architecture & Interactive Certification Exam
            </h2>
            <p className="text-xs text-[var(--muted)] max-w-xl leading-relaxed">
              Access curated English text nodes, stream AI-generated cinematic lectures, complete a strict 10-question compliance test, and immediately unlock a secure cryptographic excellence certificate document token.
            </p>
          </div>
          <button 
            onClick={() => user ? navigate('/course/html') : alert("Please log in to launch this certified training stream.")}
            className="w-full md:w-auto shrink-0 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition transform hover:-translate-y-0.5"
          >
            Launch Course Space <Award size={14} />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24 text-[var(--muted)] text-xs font-mono uppercase tracking-widest gap-2">
            <Loader2 className="animate-spin text-[#7c5cff]" size={16} /> Connecting structural registers catalog...
          </div>
        ) : (
          <>
            {/* CORE COURSES DATA MATRIX */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {courses.map((course) => {
                const isEnrolled = myEnrollments.some(e => e.courseId === course._id);

                return (
                  <div key={course._id} className="portfolio-glass p-6 rounded-3xl transition-all duration-300 hover:border-[#7c5cff] flex flex-col justify-between shadow-sm dark:shadow-none">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-transparent flex items-center justify-center border border-[var(--border)] text-[#22d3ee] mb-6">
                        <BookOpen size={20} />
                      </div>
                      <h3 className="text-lg font-black text-[var(--text)] mb-3 tracking-tight">{course.title}</h3>
                      <p className="text-xs text-[var(--muted)] leading-relaxed mb-6">{course.description || course.desc}</p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-[var(--border)]">
                      <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
                        <span><Clock size={12} className="inline mr-1 text-[#7c5cff]" /> {course.duration || 'N/A Duration'}</span>
                        <span className="text-[#22d3ee]"><ShieldCheck size={12} className="inline mr-1" /> {course.level || 'Pro Track'}</span>
                      </div>
                      
                      {isEnrolled ? (
                        <div className="w-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-emerald-500/20">
                          <CheckCircle size={14} /> Active Workspace
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleEnrollSubmit(course)}
                          className="w-full bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5 shadow-lg shadow-indigo-600/10"
                        >
                          Initialize Syllabus <ArrowRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 🎯 STUDENT LOCAL SYNC ENROLLED MONITORS GRID */}
            {user && (
              <div className="border-t border-[var(--border)] pt-12 animate-fadeIn">
                <div className="mb-6">
                  <h2 className="text-xs font-black text-[var(--text)] uppercase tracking-widest opacity-80">
                    Your Enrolled Skill Streams
                  </h2>
                  <p className="text-[var(--muted)] text-[11px] mt-0.5">Live local records arrays synchronized instantly with authorization tokens</p>
                </div>

                {myEnrollments.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {myEnrollments.map((enr) => (
                      <div key={enr._id} className="portfolio-glass p-5 rounded-2xl flex items-center justify-between border-l-4 border-l-[#22d3ee]">
                        <div>
                          <h4 className="font-bold text-sm text-[var(--text)] tracking-tight">{enr.courseTitle}</h4>
                          <span className="text-[10px] text-[var(--muted)] font-mono">Profile node clearance: Enabled</span>
                        </div>
                        <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] px-2.5 py-1 rounded-md border border-emerald-500/20 uppercase tracking-widest font-black">
                          Synced ✓
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 portfolio-glass border-dashed rounded-3xl text-[var(--muted)] text-xs font-mono uppercase tracking-widest bg-white/5">
                    No active software profiles streams mapped inside current storage tokens.
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}