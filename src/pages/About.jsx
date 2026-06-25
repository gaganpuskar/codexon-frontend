import React from 'react';
import { Terminal, Target, Layers, Cpu, Rocket } from 'lucide-react';
import Background from '../components/Background';

export default function About() {
  const values = [
    { icon: <Terminal className="text-cyan-500 dark:text-cyan-400" size={20} />, title: "CODE.", desc: "Deploying production-grade architectures using clean, optimized stack frameworks." },
    { icon: <Layers className="text-indigo-500 dark:text-indigo-400" size={20} />, title: "LEARN.", desc: "Bridging structural gaps between institutional academia and core production environments." },
    { icon: <Cpu className="text-purple-500 dark:text-purple-400" size={20} />, title: "BUILD.", desc: "Architecting real-time enterprise systems, cloud automation scripts, and database clusters." },
    { icon: <Rocket className="text-emerald-500 dark:text-emerald-400" size={20} />, title: "GROW.", desc: "Accelerating junior engineer pipelines into highly clear professional career tracks." }
  ];

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-white p-8 antialiased relative">
      <Background />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Introduction Header */}
        <div className="text-center mt-12 mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-black bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 backdrop-blur-sm">
            <Terminal size={12} /> System Identity Ledger
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-slate-900 dark:text-white">
            Architecting the Future of Technical Engineering
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Welcome to <span className="text-indigo-600 dark:text-cyan-400 font-bold">CODEXON HUB</span>. We are a specialized global development mesh engineering stable cloud applications, technical cohorts, and dynamic internship alignment structures.
          </p>
        </div>

        {/* Vision Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-center">
          <div className="lg:col-span-7 bg-white/40 dark:bg-[#090d16]/70 border border-slate-200/80 dark:border-slate-900 rounded-3xl p-8 backdrop-blur-md hover:border-indigo-500 dark:hover:border-slate-800 transition duration-300 shadow-sm dark:shadow-none">
            <div className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 p-3 rounded-2xl w-fit mb-6">
              <Target size={22} />
            </div>
            <h2 className="text-2xl font-black mb-4 tracking-tight text-slate-900 dark:text-white">Our Operational Matrix</h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-4">
              CODEXON HUB functions as a hybrid software development lab and technology training incubator. We recognized a massive synchronization failure in the industry: fresh engineers graduate with abstract theories but lack the raw workspace muscle to ship live features inside production environments.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              Through our secure, direct cloud dashboards pipelines, students don't just solve isolated puzzles—they are directly embedded into development cycles, work under strict code review architectures, and obtain automated cryptographically verified clearance status protocols.
            </p>
          </div>
          
          <div className="lg:col-span-5 bg-white/20 dark:bg-[#090d16]/30 border border-slate-200/60 dark:border-slate-900 rounded-3xl p-8 text-center flex flex-col justify-center items-center h-full min-h-[300px] group hover:border-indigo-500 transition duration-500 relative overflow-hidden backdrop-blur-sm shadow-sm dark:shadow-none">
            <span className="text-6xl font-black text-slate-300 dark:text-slate-800 tracking-tighter mb-2 group-hover:text-indigo-500/30 transition duration-500">2026</span>
            <span className="text-xs uppercase font-black text-slate-400 dark:text-slate-500 tracking-widest">Global Node Established</span>
          </div>
        </div>

        {/* Framework Pillars Grid */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Our Execution Framework</h2>
            <div className="w-12 h-1 bg-indigo-500 mx-auto mt-2 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white/40 dark:bg-[#090d16]/70 border border-slate-200/80 dark:border-slate-900 rounded-2xl p-6 hover:border-indigo-500 dark:hover:border-slate-800 transition group duration-300 backdrop-blur-md shadow-sm dark:shadow-none">
                <div className="bg-slate-50/50 dark:bg-[#030712] border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl w-fit mb-4 group-hover:scale-110 transition duration-300">
                  {v.icon}
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Founder Spot */}
        <div className="bg-white/40 dark:bg-[#090d16]/70 border border-slate-200/80 dark:border-slate-900 rounded-3xl p-8 lg:p-12 text-center max-w-3xl mx-auto mb-16 backdrop-blur-md shadow-sm dark:shadow-none">
          <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 to-indigo-500 rounded-full mx-auto mb-6 p-0.5 shadow-xl flex items-center justify-center font-black text-xl tracking-tight text-white">
            GP
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">Gagan Pushkar</h3>
          <p className="text-xs text-indigo-600 dark:text-cyan-400 font-bold uppercase tracking-wider mt-1">Managing Partner & Principal System Architect</p>
          <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed max-w-xl mx-auto mt-6 italic">
            "CODEXON HUB was engineered out of pure necessity. Our ultimate mandate is to remove friction from tech stacks exploration. We ensure that every candidate exiting our tracking logs is completely production-ready, autonomous, and capable of driving end-to-end full-stack architectures."
          </p>
        </div>

      </div>
    </div>
  );
}