import React from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, Globe, Cpu, Smartphone, Layout, BarChart, 
  Cloud, ArrowRight, ShieldCheck, Smile, Award, Star, 
  Mail, Phone, MapPin, Send
} from 'lucide-react';
import { Link } from 'react-router-dom';

// CORE MODULE INTERFACES
import Background from '../components/Background';
import Counter from '../components/Counter';
import { useTypingEffect } from '../hooks/useTypingEffect';

export default function Home() {
  
  const dynamicText = useTypingEffect([
    "Drive Growth",
    "Transform Business",
    "Shape the Future",
    "Fuel Innovation"
  ]);

  const services = [
    { icon: <Globe className="text-[#22d3ee]" />, title: "Website Development", desc: "Modern, responsive and SEO-friendly websites that convert visitors into customers." },
    { icon: <Smartphone className="text-[#7c5cff]" />, title: "Mobile App Development", desc: "Cross-platform mobile apps for Android & iOS that deliver exceptional user experiences." },
    { icon: <Terminal className="text-[#22d3ee]" />, title: "MERN Stack Development", desc: "Full-stack web applications using MongoDB, Express.js, React and Node.js." },
    { icon: <Cpu className="text-orange-400" />, title: "Java Development", desc: "Enterprise-grade Java applications that are secure, scalable and high-performing." },
    { icon: <Cpu className="text-emerald-400" />, title: "AI Solutions & Automation", desc: "AI chatbots, automation and intelligent solutions to streamline your business." },
    { icon: <Layout className="text-[#ff5c8a]" />, title: "UI/UX Design", desc: "Beautiful, user-friendly designs that create memorable experiences for your users." },
    { icon: <BarChart className="text-yellow-400" />, title: "Digital Marketing & SEO", desc: "Drive traffic, generate leads and grow your brand with result-driven SEO and marketing." },
    { icon: <Cloud className="text-blue-400" />, title: "Cloud & DevOps", desc: "Deploy, manage and scale your applications with modern cloud solutions." }
  ];

  return (
    <div className="bg-transparent min-h-screen overflow-x-hidden relative transition-colors duration-400">
      
      {/* GLOW BACKGROUND MESH SYSTEM */}
      <Background />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 max-w-7xl mx-auto pt-12 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <div>
            <div className="portfolio-glass inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6">
              <Star size={12} className="fill-[#22d3ee] text-[#22d3ee]" /> We turn ideas into digital solutions
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6 min-h-[120px] md:min-h-[180px]">
              We Build Digital <br />
              Solutions That <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] font-sans">
                {dynamicText}
              </span>
              <span className="animate-pulse text-[#22d3ee] font-normal">|</span>
            </h1>

            <p className="text-[var(--muted)] text-sm md:text-base max-w-md mb-8 leading-relaxed">
              CODEXON HUB provides end-to-end IT services to help startups and businesses create, scale, and succeed in the digital world.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/courses" className="bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] hover:opacity-90 px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 text-white transition transform hover:-translate-y-0.5">
                Get Started <ArrowRight size={16} />
              </Link>
              <button className="portfolio-glass px-6 py-3 rounded-full font-bold text-sm transition transform hover:-translate-y-0.5">
                View Our Work →
              </button>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] rounded-full blur-3xl opacity-15"></div>
            <img 
              src="/hero.png" 
              alt="Digital Solution Mockup" 
              className="rounded-3xl border border-[var(--border)]  max-h-[430px] object-cover relative z-10"
            />
          </div>
        </div>
      </section>

      {/* 2. SERVICES GRID SECTION */}
      <section className="py-20 px-6 bg-transparent border-t border-[var(--border)] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs text-[#22d3ee] font-bold uppercase tracking-widest mb-2">Our Services</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Complete Solutions for Your Business</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, idx) => (
              <motion.div 
                whileHover={{ y: -5 }}
                className="portfolio-glass p-6 rounded-2xl flex flex-col justify-between group transition duration-300"
                key={idx}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-transparent flex items-center justify-center border border-[var(--border)] group-hover:scale-105 transition mb-5">
                    {svc.icon}
                  </div>
                  <h3 className="text-base font-bold mb-2">{svc.title}</h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed mb-6">{svc.desc}</p>
                </div>
                <button className="text-xs font-bold text-[#7c5cff] hover:text-[#22d3ee] flex items-center gap-1 mt-auto self-start">
                  Learn More <ArrowRight size={12} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US & METRICS COUNTERS */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div>
            <p className="text-xs text-[#22d3ee] font-bold uppercase tracking-widest mb-2">Why Choose Us</p>
            <h2 className="text-3xl font-black tracking-tight mb-4">We're More Than Just Developers</h2>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-6">
              We are your technology partner, committed to your success with quality, innovation and dedication.
            </p>
            <button className="text-xs font-bold portfolio-glass px-4 py-2.5 rounded-xl transition">
              Know More About Us <ArrowRight size={12} />
            </button>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: <ShieldCheck className="text-[#22d3ee]" />, val: "50", suffix: "+", label: "Projects Completed" },
              { icon: <Smile className="text-[#7c5cff]" />, val: "30", suffix: "+", label: "Happy Clients" },
              { icon: <Award className="text-yellow-400" />, val: "99", suffix: "%", label: "Satisfaction rate" },
              { icon: <Star className="text-[#ff5c8a]" />, val: "3", suffix: "+", label: "Years Experience" }
            ].map((metric, idx) => (
              <div key={idx} className="portfolio-glass p-6 rounded-2xl text-center transition">
                <div className="w-10 h-10 mx-auto rounded-lg bg-transparent flex items-center justify-center mb-3 border border-[var(--border)]">
                  {metric.icon}
                </div>
                <h3 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] mb-1">
                  <Counter target={metric.val} suffix={metric.suffix} />
                </h3>
                <p className="text-[10px] text-[var(--muted)] font-bold tracking-wider uppercase">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CONTACT INTEGRATED MATRIX */}
      <section className="py-20 px-6 bg-transparent border-t border-[var(--border)] relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-3xl font-black tracking-tight">Contact Us</h2>
              <p className="text-[var(--muted)] text-sm mt-2">Have a project in mind? Let's talk business parameters.</p>
            </div>
            
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg portfolio-glass flex items-center justify-center text-[#7c5cff]"><Phone size={16}/></div>
                <span className="font-medium">+91 12345 67890</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg portfolio-glass flex items-center justify-center text-[#7c5cff]"><Mail size={16}/></div>
                <span className="font-medium">hello@codexonhub.in</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg portfolio-glass flex items-center justify-center text-[#7c5cff]"><MapPin size={16}/></div>
                <span className="font-medium">Uttar Pradesh, India</span>
              </div>
            </div>
          </div>

          <form className="lg:col-span-3 portfolio-glass p-8 rounded-3xl space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" required className="w-full bg-transparent border border-[var(--border)] rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-[#22d3ee] transition text-[var(--text)]" />
              <input type="email" placeholder="Your Email" required className="w-full bg-transparent border border-[var(--border)] rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-[#22d3ee] transition text-[var(--text)]" />
            </div>
            <input type="text" placeholder="Your Phone Number" className="w-full bg-transparent border border-[var(--border)] rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-[#22d3ee] transition text-[var(--text)]" />
            <textarea rows="4" placeholder="Your Operational Message" required className="w-full bg-transparent border border border-[var(--border)] rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-[#22d3ee] transition resize-none text-[var(--text)]"></textarea>
            
            <button type="submit" className="w-full bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition text-white shadow-lg">
              Send Message Payload <Send size={12} />
            </button>
          </form>

        </div>
      </section>

      {/* 5. BRAND FOOTER LAYER */}
      <footer className="border-t border-[var(--border)] py-10 px-6 text-center text-xs text-[var(--muted)] relative z-10">
        <p>© 2026 CODEXON HUB. All rights reserved. Designed with ❤️ by CODEXON HUB.</p>
      </footer>

    </div>
  );
}