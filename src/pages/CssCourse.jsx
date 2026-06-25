import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { 
  BookOpen, Video, Award, CheckCircle, ArrowRight, 
  RefreshCw, FileText, Check, X, ShieldCheck, Loader2 
} from 'lucide-react';
import Background from '../components/Background';

const BACKEND_URL = 'http://localhost:5002/api';

export default function CssCourse() {
  const { user } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState('blog'); // blog -> video -> quiz -> certificate
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [passingPercentage] = useState(70);
  const [checkingCert, setCheckingCert] = useState(true);

  // Dynamic 10 Advanced CSS Questions Array Matrix
  const quizQuestions = [
    { id: 1, q: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], correct: 1 },
    { id: 2, q: "Which CSS property is used to change the background color of an element?", options: ["color", "bgcolor", "background-color", "surface-color"], correct: 2 },
    { id: 3, q: "Inside the CSS Box Model, which layer surrounds the padding directly?", options: ["Margin", "Border", "Content", "Outline"], correct: 1 },
    { id: 4, q: "How do you activate a flexible box layout structure using CSS?", options: ["display: block;", "display: grid;", "display: flexbox;", "display: flex;"], correct: 3 },
    { id: 5, q: "Which property is used in Flexbox to align items horizontally along the main axis?", options: ["align-items", "justify-content", "align-content", "text-align"], correct: 1 },
    { id: 6, q: "What is the default position state value for all standard HTML elements?", options: ["absolute", "relative", "static", "fixed"], correct: 2 },
    { id: 7, q: "Which CSS property controls the text size metrics?", options: ["text-style", "font-size", "text-size", "font-weight"], correct: 1 },
    { id: 8, q: "How do you select an element with the specific id 'pushkar' inside CSS stylesheets?", options: [".pushkar", "#pushkar", "pushkar", "*pushkar"], correct: 1 },
    { id: 9, q: "Which CSS rule is used to introduce responsive layouts via breakpoints?", options: ["@media", "@import", "@responsive", "@keyframes"], correct: 0 },
    { id: 10, q: "Which CSS3 property adds drop shadow effects to block elements?", options: ["text-shadow", "box-shadow", "element-shadow", "border-shadow"], correct: 1 }
  ];

  // Fetch certificate state node log on mount
  useEffect(() => {
    const checkExistingCertification = async () => {
      if (!user) {
        setCheckingCert(false);
        return;
      }
      try {
        const res = await axios.get(`${BACKEND_URL}/courses/my-enrollments`, {
          headers: { Authorization: `Bearer ${user?.token}` }
        });
        const cssTrack = res.data?.find(e => e.courseTitle.includes("CSS3"));
        if (cssTrack && cssTrack.isCertified) {
          setScore(cssTrack.quizScore);
          setQuizSubmitted(true);
          setCurrentStep('certificate'); 
        }
      } catch (err) {
        console.error("CSS certificate state verification failed:", err);
      } finally {
        setCheckingCert(false);
      }
    };
    checkExistingCertification();
  }, [user]);

  const handleOptionSelect = (qId, optionIdx) => {
    if (quizSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qId]: optionIdx });
  };

  const evaluateQuizScore = async () => {
    if (Object.keys(selectedAnswers).length < 10) {
      return alert("🚨 Please solve all 10 evaluation nodes before submitting your answers!");
    }

    let correctCount = 0;
    quizQuestions.forEach((item) => {
      if (selectedAnswers[item.id] === item.correct) {
        correctCount += 1;
      }
    });

    const finalScorePercent = (correctCount / 10) * 100;
    setScore(finalScorePercent);
    setQuizSubmitted(true);

    const passed = finalScorePercent >= passingPercentage;

    try {
      await axios.post(`${BACKEND_URL}/courses/enroll`, {
        courseId: "660b9876543210fedcba4321", // Unique course target id entity for CSS
        courseTitle: "CSS3 Advanced Architecture & Certification",
        quizScore: finalScorePercent,
        isCertified: passed
      }, { headers: { Authorization: `Bearer ${user?.token}` } });

      if (passed) {
        setCurrentStep('certificate');
      } else {
        alert(`⚠️ Validation Failed: Your score is ${finalScorePercent}%. Minimum ${passingPercentage}% threshold is mandatory.`);
      }
    } catch (err) {
      console.error("Database persistence write collapsed:", err);
    }
  };

  const restartQuizMatrix = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setScore(0);
    setCurrentStep('quiz');
  };

  if (checkingCert) {
    return (
      <div className="min-h-screen flex justify-center items-center text-[var(--muted)] font-mono text-xs uppercase tracking-widest gap-2 relative">
        <Background />
        <Loader2 className="animate-spin text-[#22d3ee]" size={16} /> Verifying Secure Graduation Records...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-[var(--text)] font-sans p-6 md:p-12 antialiased relative transition-colors duration-400">
      <Background />

      <div className="max-w-4xl mx-auto relative z-10 mt-6">
        
        {/* Navigation Pipeline Steps */}
        <div className="portfolio-glass p-3 rounded-2xl flex justify-around items-center text-xs font-bold uppercase tracking-wider mb-8 text-[var(--muted)]">
          <button onClick={() => setCurrentStep('blog')} className={`flex items-center gap-1.5 ${currentStep === 'blog' ? 'text-[#22d3ee]' : ''}`}><FileText size={14}/> 1. Study Blog</button>
          <button onClick={() => setCurrentStep('video')} className={`flex items-center gap-1.5 ${currentStep === 'video' ? 'text-[#7c5cff]' : ''}`}><Video size={14}/> 2. AI Lecture</button>
          <button onClick={() => setCurrentStep('quiz')} className={`flex items-center gap-1.5 ${currentStep === 'quiz' ? 'text-amber-500' : ''}`}><ShieldCheck size={14}/> 3. Certification Quiz</button>
          <button onClick={() => score >= passingPercentage && setCurrentStep('certificate')} className={`flex items-center gap-1.5 ${currentStep === 'certificate' ? 'text-emerald-500' : ''}`} disabled={score < passingPercentage}><Award size={14}/> 4. Certificate</button>
        </div>

        {/* STEP 1: STUDY MATERIAL BLOG VIEW (ENGLISH) */}
        {currentStep === 'blog' && (
          <div className="portfolio-glass p-8 rounded-3xl space-y-6 animate-fadeIn">
            <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#7c5cff] to-[#22d3ee]">Module 01: CSS3 Styling & Box Model Mechanics</h1>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              CSS3 (Cascading Style Sheets) brings life, aesthetics, and layouts to standard raw HTML structures. It governs pixel alignments, colors, spacing parameters, typography rendering states, and fluid interface logic across multi-platform networks.
            </p>
            <div className="bg-[var(--bg)] border border-[var(--border)] p-4 rounded-xl font-mono text-xs text-indigo-400">
              {`.portfolio-glass {\n  display: flex;\n  justify-content: center;\n  border: 1px solid var(--border);\n  backdrop-filter: blur(12px);\n  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);\n}`}
            </div>
            <h3 className="text-lg font-bold pt-2">Key Core Architectural Layouts:</h3>
            <ul className="list-disc pl-5 text-xs text-[var(--muted)] space-y-2">
              <li><strong>The CSS Box Model:</strong> Every element translates into a box node containing structural Content, inner Padding, outer Border, and boundary Margin segments.</li>
              <li><strong>Flexbox Engine:</strong> Activating `display: flex;` unlocks horizontal/vertical alignments, dimensional distributions, and adaptive wraps without complex position overrides.</li>
            </ul>
            <button onClick={() => setCurrentStep('video')} className="bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 mt-4 ml-auto">
              Proceed to AI Lecture <ArrowRight size={14}/>
            </button>
          </div>
        )}

        {/* STEP 2: YOUTUBE EMBED PLAYER SYSTEM */}
        {currentStep === 'video' && (
          <div className="portfolio-glass p-8 rounded-3xl space-y-6 text-center animate-fadeIn">
            <h2 className="text-2xl font-black text-left">Module 02: CSS3 Advanced AI Video Lecture</h2>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl">
              {/* 🚨 REPLACE 'dQw4w9WgXcQ' WITH YOUR ACTUAL CSS YOUTUBE VIDEO CODE */}
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="CSS3 Core Layouts Engineering Video Lecture Node"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="flex justify-between items-center pt-4">
              <button onClick={() => setCurrentStep('blog')} className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">← Previous</button>
              <button onClick={() => setCurrentStep('quiz')} className="bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2">
                Launch Certification Quiz <ArrowRight size={14}/>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DYNAMIC 10 QUIZ QUESTIONS GRID */}
        {currentStep === 'quiz' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="portfolio-glass p-6 rounded-2xl flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black">CSS3 Architectural Test Ledger</h2>
                <p className="text-xs text-[var(--muted)] mt-1">A minimum 70% passing threshold is mandatory to qualify for certification tracking.</p>
              </div>
              {quizSubmitted && <button onClick={restartQuizMatrix} className="portfolio-glass px-4 py-2 text-xs rounded-xl flex items-center gap-1.5"><RefreshCw size={12}/> Retry Matrix</button>}
            </div>

            <div className="space-y-4">
              {quizQuestions.map((qItem, idx) => (
                <div key={qItem.id} className="portfolio-glass p-6 rounded-2xl space-y-3">
                  <h4 className="text-sm font-black"><span className="text-[#22d3ee] font-mono mr-1">Q{idx+1}.</span> {qItem.q}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {qItem.options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[qItem.id] === oIdx;
                      const isCorrectAnswer = qItem.correct === oIdx;
                      
                      let optionStyle = "border-[var(--border)] bg-transparent hover:bg-white/5";
                      if (isSelected) optionStyle = "border-[#7c5cff] bg-[#7c5cff]/10 text-[var(--text)]";
                      if (quizSubmitted) {
                        if (isCorrectAnswer) optionStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-400";
                        else if (isSelected && !isCorrectAnswer) optionStyle = "border-red-500 bg-red-500/10 text-red-400";
                      }

                      return (
                        <button 
                          key={oIdx}
                          onClick={() => handleOptionSelect(qItem.id, oIdx)}
                          className={`text-left text-xs p-3.5 rounded-xl border font-medium transition flex items-center justify-between ${optionStyle}`}
                          disabled={quizSubmitted}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && isCorrectAnswer && <Check size={14} className="text-emerald-500"/>}
                          {quizSubmitted && isSelected && !isCorrectAnswer && <X size={14} className="text-red-500"/>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {!quizSubmitted && (
              <button onClick={evaluateQuizScore} className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg mt-4">
                Submit Exam Response Payload
              </button>
            )}
          </div>
        )}

        {/* STEP 4: CERTIFICATE GENERATOR */}
        {currentStep === 'certificate' && (
          <div className="space-y-6 animate-fadeIn text-center">
            <div className="portfolio-glass p-12 rounded-3xl border-2 border-indigo-500/30 bg-gradient-to-b from-indigo-500/5 to-transparent relative overflow-hidden max-w-2xl mx-auto shadow-2xl">
              <div className="absolute top-0 right-0 bg-indigo-500 text-white font-mono text-[9px] font-black tracking-widest uppercase px-8 py-1.5 rotate-45 translate-x-6 translate-y-3 shadow-md">
                Verified
              </div>

              <div className="w-16 h-16 mx-auto rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6">
                <Award size={32} className="text-indigo-400" />
              </div>

              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#22d3ee]">Codexon Technological Ledger Certification</span>
              <h1 className="text-3xl font-serif tracking-wide text-[var(--text)] mt-4 mb-1 italic">Certificate of Excellence</h1>
              <p className="text-xs text-[var(--muted)]">This framework node validates the validation clearance parameters for</p>
              
              <h2 className="text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-[#22d3ee] my-6 font-mono underline decoration-wavy decoration-[#7c5cff]/30">
                {user?.name || "Verified Student Quadrant"}
              </h2>

              <p className="text-xs text-[var(--muted)] max-w-md mx-auto leading-relaxed">
                For successfully scoring <span className="text-indigo-400 font-bold font-mono">{score}%</span> on the internal <span className="text-[var(--text)] font-semibold">CSS3 Advanced Layouts & Presentation Engineering Exam Grid</span>. Authenticated ledger sequence successfully saved to network buffers.
              </p>

              <div className="flex justify-between items-center pt-10 text-[9px] font-mono text-[var(--muted)] border-t border-[var(--border)] mt-8">
                <div>DATE: {new Date().toLocaleDateString('en-IN')}</div>
                <div className="font-bold text-[#22d3ee]">SIGNATURE: CODEXON LABS LOGS</div>
                <div>ID: 990B321_CSS_NODE</div>
              </div>
            </div>

            <button onClick={() => window.print()} className="bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-md transform hover:-translate-y-0.5 mx-auto block">
              🖨️ Print / Download PDF Document
            </button>
          </div>
        )}

      </div>
    </div>
  );
}