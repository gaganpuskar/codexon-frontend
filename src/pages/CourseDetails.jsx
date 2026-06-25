import { useState } from 'react';
import { PlayCircle, ShieldCheck, Download, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CourseDetails() {
  const [activeModule, setActiveModule] = useState(0);

  const curriculum = [
    { title: "Module 01: Core Platform Engineering Foundations", duration: "4.5 hrs", topics: ["Node Runtime Virtualization Engine", "Asynchronous Event Loop Parameters"] },
    { title: "Module 02: Advanced Schema Design & Sharding", duration: "6.2 hrs", topics: ["Mongoose Complex Discriminators", "Aggregation Pipeline Optimization"] }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 text-white grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[85vh]">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <span className="text-xs bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 rounded-full text-cyan-400 font-bold uppercase tracking-widest">Advanced Track</span>
          <h1 className="text-4xl font-black mt-3 mb-4">Full Stack MERN Developer Mastery</h1>
          <p className="text-slate-400 text-sm">Master Node.js, Express, React, and MongoDB architecture.</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">Course Syllabus Matrix</h3>
          <div className="space-y-3">
            {curriculum.map((mod, idx) => (
              <div key={idx} className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden">
                <button onClick={() => setActiveModule(activeModule === idx ? -1 : idx)} className="w-full flex justify-between items-center p-5 text-sm font-semibold hover:bg-slate-900/60 transition">
                  <span>{mod.title}</span>
                </button>
                {activeModule === idx && (
                  <div className="p-5 bg-slate-950/40 space-y-2 text-xs text-slate-400 border-t border-slate-900">
                    {mod.topics.map((topic, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                        {topic}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl h-fit flex flex-col space-y-6">
        <div>
          <p className="text-slate-500 text-xs font-bold uppercase">Price</p>
          <span className="text-4xl font-black text-cyan-400">₹499</span>
        </div>
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl text-sm transition">
          Initialize Purchase
        </button>
      </div>
    </div>
  );
}