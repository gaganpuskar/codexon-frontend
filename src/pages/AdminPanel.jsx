import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Terminal, Users, GraduationCap, Phone, ShieldCheck } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

export default function AdminPanel() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/auth/students`);
        if (res.data.success) setStudents(res.data.data);
      } catch (err) {
        console.error("Error loading students matrix:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Console */}
        <div className="flex items-center justify-between border-b border-slate-900 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Terminal size={20} />
            </div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tight">CODEXON CONTROL CENTER</h1>
              <p className="text-xs text-slate-500 font-bold">Live Student Core Matrix Ledger</p>
            </div>
          </div>
          <div className="bg-indigo-600/10 border border-indigo-600/20 px-4 py-2 rounded-xl text-xs font-bold text-indigo-400 flex items-center gap-2">
            <Users size={14} /> Total Enrolled: {students.length}
          </div>
        </div>

        {/* Live Database Data Table */}
        {loading ? (
          <div className="text-center text-slate-500 text-xs py-10 font-mono">Syncing Cluster Streams...</div>
        ) : (
          <div className="bg-[#090d16] border border-slate-900 rounded-3xl overflow-hidden shadow-2xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#030712] border-b border-slate-900 text-slate-500 font-black uppercase tracking-wider">
                  <th className="p-4">Student Name</th>
                  <th className="p-4">Contact & Email</th>
                  <th className="p-4">College Entity</th>
                  <th className="p-4">Degree Track</th>
                  <th className="p-4">Status Node</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-slate-900/30 transition">
                    <td className="p-4 font-bold text-white text-sm">{student.name}</td>
                    <td className="p-4 space-y-0.5">
                      <div className="text-slate-300 font-medium">{student.email}</div>
                      <div className="text-slate-500 flex items-center gap-1 font-mono text-[11px]"><Phone size={10}/> {student.mobile}</div>
                    </td>
                    <td className="p-4 text-slate-400 font-semibold">{student.college}</td>
                    <td className="p-4 space-y-0.5">
                      <div className="text-cyan-400 font-bold flex items-center gap-1"><GraduationCap size={12}/> {student.degree}</div>
                      <div className="text-slate-500 text-[10px] uppercase font-bold">{student.semester}</div>
                    </td>
                    <td className="p-4">
                      <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-lg font-bold text-[10px] uppercase tracking-wide flex items-center gap-1 w-fit">
                        <ShieldCheck size={12}/> Live
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}