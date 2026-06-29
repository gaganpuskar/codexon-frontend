import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { 
  BookOpen, Video, Award, CheckCircle, ArrowRight, 
  RefreshCw, FileText, Check, X, ShieldCheck, Loader2, Terminal, HelpCircle, Code, Layers, Info
} from 'lucide-react';
import Background from '../components/Background';

const BACKEND_URL = 'http://localhost:5002/api';

export default function HtmlCourse() {
  const { user } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState('blog'); 
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [passingPercentage] = useState(70);
  const [checkingCert, setCheckingCert] = useState(true);
  const [activeSubSection, setActiveSubSection] = useState('intro');

  // Dynamic 10 Questions Array Matrix
  const quizQuestions = [
    { id: 1, q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Transfer Markup Language", "Hyper Text Marking Language"], correct: 0 },
    { id: 2, q: "Which element is the root element of an HTML document?", options: ["<body>", "<head>", "<html>", "<root>"], correct: 2 },
    { id: 3, q: "Which HTML tag is used to define the largest heading?", options: ["<h6>", "<h1>", "<heading>", "<head>"], correct: 1 },
    { id: 4, q: "What is the correct HTML tag for producing a line break?", options: ["<break>", "<lb>", "<p>", "<br>"], correct: 3 },
    { id: 5, q: "Which attribute is used inside the anchor tag (<a>) to specify the URL of the page?", options: ["src", "href", "link", "href-link"], correct: 1 },
    { id: 6, q: "Which attribute is used to specify the path of an image inside the <img> tag?", options: ["alt", "href", "src", "path"], correct: 2 },
    { id: 7, q: "Which tag is used to create an Unordered List (bulleted points)?", options: ["<ol>", "<ul>", "<li>", "<list>"], correct: 1 },
    { id: 8, q: "Which tag is used to define an individual row inside an HTML table?", options: ["<td>", "<th>", "<row>", "<tr>"], correct: 3 },
    { id: 9, q: "Which of the following elements is a standard inline element?", options: ["<div>", "<span>", "<p>", "<h1>"], correct: 1 },
    { id: 10, q: "Which semantic HTML5 element is used to logically represent the footer of a page or section?", options: ["<footer>", "<bottom>", "<div class='footer'>", "<end>"], correct: 0 }
  ];

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
        const htmlTrack = res.data?.find(e => e.courseTitle.includes("HTML5"));
        if (htmlTrack && htmlTrack.isCertified) {
          setScore(htmlTrack.quizScore);
          setQuizSubmitted(true);
          setCurrentStep('certificate'); 
        }
      } catch (err) {
        console.error("Verification buffer fetch error:", err);
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
      return alert("🚨 Please solve all 10 evaluation nodes before submitting your response payload!");
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
        courseId: "660a1234567890abcdef1234", 
        courseTitle: "HTML5 Core Architecture & Certification",
        quizScore: finalScorePercent,
        isCertified: passed
      }, { headers: { Authorization: `Bearer ${user?.token}` } });

      if (passed) {
        setCurrentStep('certificate');
      } else {
        alert(`⚠️ Validation Failed: Your score is ${finalScorePercent}%. Minimum ${passingPercentage}% required.`);
      }
    } catch (err) {
      console.error("Database persistence write failed:", err);
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
    <div className="min-h-screen bg-transparent text-[var(--text)] font-sans p-4 md:p-8 antialiased relative transition-colors duration-400">
      <Background />

      <div className="max-w-7xl mx-auto relative z-10 mt-4">
        
        {/* Navigation Pipeline Steps */}
        <div className="portfolio-glass p-3 rounded-2xl flex justify-around items-center text-xs font-bold uppercase tracking-wider mb-8 text-[var(--muted)] shadow-md">
          <button onClick={() => setCurrentStep('blog')} className={`flex items-center gap-1.5 transition ${currentStep === 'blog' ? 'text-[#22d3ee]' : 'hover:text-[var(--text)]'}`}><FileText size={14}/> 1. Encyclopedia Guide</button>
          <button onClick={() => setCurrentStep('video')} className={`flex items-center gap-1.5 transition ${currentStep === 'video' ? 'text-[#7c5cff]' : 'hover:text-[var(--text)]'}`}><Video size={14}/> 2. AI Video Lecture</button>
          <button onClick={() => setCurrentStep('quiz')} className={`flex items-center gap-1.5 transition ${currentStep === 'quiz' ? 'text-amber-500' : 'hover:text-[var(--text)]'}`}><ShieldCheck size={14}/> 3. Certification Quiz</button>
          <button onClick={() => score >= passingPercentage && setCurrentStep('certificate')} className={`flex items-center gap-1.5 transition ${currentStep === 'certificate' ? 'text-emerald-500' : ''}`} disabled={score < passingPercentage}><Award size={14}/> 4. Certificate</button>
        </div>

        {/* STEP 1: COMPREHENSIVE TEXT STUDY BLOG SYSTEM */}
        {currentStep === 'blog' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start animate-fadeIn">
            
            {/* Left Column Sidebar Mini Navigation Sub-Index Menu */}
            <div className="lg:col-span-1 portfolio-glass p-4 rounded-2xl space-y-1 sticky top-6 text-xs font-bold uppercase tracking-wide text-[var(--muted)] shadow-sm">
              <span className="px-3 py-2 text-[10px] text-[#7c5cff] font-black tracking-widest block opacity-70">Course Blueprint</span>
              <button onClick={() => setActiveSubSection('intro')} className={`w-full text-left px-3 py-2.5 rounded-xl transition ${activeSubSection === 'intro' ? 'bg-[#7c5cff]/10 text-[#7c5cff] border border-[#7c5cff]/20' : 'hover:bg-white/5'}`}>01. Foundations & History</button>
              <button onClick={() => setActiveSubSection('structure')} className={`w-full text-left px-3 py-2.5 rounded-xl transition ${activeSubSection === 'structure' ? 'bg-[#7c5cff]/10 text-[#7c5cff] border border-[#7c5cff]/20' : 'hover:bg-white/5'}`}>02. Client Logic & DOM Trees</button>
              <button onClick={() => setActiveSubSection('elements')} className={`w-full text-left px-3 py-2.5 rounded-xl transition ${activeSubSection === 'elements' ? 'bg-[#7c5cff]/10 text-[#7c5cff] border border-[#7c5cff]/20' : 'hover:bg-white/5'}`}>03. Elements, Media & Lists</button>
              <button onClick={() => setActiveSubSection('tablesforms')} className={`w-full text-left px-3 py-2.5 rounded-xl transition ${activeSubSection === 'tablesforms' ? 'bg-[#7c5cff]/10 text-[#7c5cff] border border-[#7c5cff]/20' : 'hover:bg-white/5'}`}>04. Advanced Forms & Tables</button>
              <button onClick={() => setActiveSubSection('semantic')} className={`w-full text-left px-3 py-2.5 rounded-xl transition ${activeSubSection === 'semantic' ? 'bg-[#7c5cff]/10 text-[#7c5cff] border border-[#7c5cff]/20' : 'hover:bg-white/5'}`}>05. HTML5 Semantics & Globals</button>
              <button onClick={() => setActiveSubSection('advanced')} className={`w-full text-left px-3 py-2.5 rounded-xl transition ${activeSubSection === 'advanced' ? 'bg-[#7c5cff]/10 text-[#7c5cff] border border-[#7c5cff]/20' : 'hover:bg-white/5'}`}>06. SEO, Projects & Roadmap</button>
            </div>

            {/* Right Main Text Viewer Dashboard Panel */}
            <div className="lg:col-span-3 portfolio-glass p-6 md:p-8 rounded-3xl space-y-8 min-h-[70vh]">
              
              {/* SECTION 1 */}
              {activeSubSection === 'intro' && (
                <div className="space-y-6 animate-fadeIn text-sm text-[var(--muted)] leading-relaxed">
                  <div className="border-b border-[var(--border)] pb-4">
                    <h2 className="text-2xl font-black tracking-tight text-[var(--text)]">1. Introduction to HTML & Chronological History</h2>
                    <p className="text-xs text-[#22d3ee] mt-1">Deep architectural context of markup languages.</p>
                  </div>
                  
                  <h3 className="text-base font-black text-[var(--text)]">What is HTML?</h3>
                  <p>
                    <strong>HTML (Hyper Text Markup Language)</strong> is not a programming language; it is a standardized markup structural paradigm. It is used to encapsulate data blocks, define component positioning parameters, and render text layouts over global digital protocols. It provides instructions to consumer engines (web browsers) on how raw file streams should be visualised.
                  </p>

                  <div className="portfolio-glass p-5 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent space-y-2">
                    <h4 className="text-xs font-black text-amber-500 uppercase tracking-widest flex items-center gap-1"><Info size={14}/> The Modern Web Trinity Model</h4>
                    <p className="text-xs">To establish production-grade enterprise layouts, three separate compilation matrices must combine inside clients:</p>
                    <ul className="list-disc pl-5 text-xs space-y-2 mt-2">
                      <li><strong className="text-[var(--text)]">HTML (The Bone Skeleton):</strong> Declares native component positions, elements hierarchy, forms, structures, and content anchors.</li>
                      <li><strong className="text-[#7c5cff]">CSS (The Aesthetic Surface):</strong> Formulates margins, structural flex grids, animations, transformations, styling sheets, and device responsiveness hooks.</li>
                      <li><strong className="text-[#22d3ee]">JavaScript (The Neural Mechanism):</strong> Connects conditional event listeners, processes API state payloads, and mutates DOM objects dynamically.</li>
                    </ul>
                  </div>

                  <h3 className="text-base font-black text-[var(--text)] pt-3">Chronological Engineering Evolution</h3>
                  <p>
                    HTML was architected by researcher **Tim Berners-Lee** in 1991 to solve decentralized document sharing. The standard matured over successive milestones to create today's cohesive runtime landscape:
                  </p>
                  
                  <div className="overflow-hidden border border-[var(--border)] rounded-xl text-xs">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[var(--bg)] font-bold text-[var(--text)] border-b border-[var(--border)]">
                          <th className="p-3">Specification Layer</th>
                          <th className="p-3">Release Period</th>
                          <th className="p-3">Primary Technical Breakthroughs</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[var(--border)]">
                          <td className="p-3 font-mono">HTML 1.0 / 2.0</td>
                          <td className="p-3">1991 - 1995</td>
                          <td className="p-3">Primitive text paragraphs, line breaks, and raw hypertext anchors.</td>
                        </tr>
                        <tr className="border-b border-[var(--border)]">
                          <td className="p-3 font-mono">HTML 3.2 / 4.01</td>
                          <td className="p-3">1997 - 1999</td>
                          <td className="p-3">Integration of tables grids, style sheet frameworks, and generic division containers.</td>
                        </tr>
                        <tr className="border-b border-[var(--border)]">
                          <td className="p-3 font-mono">XHTML 1.0</td>
                          <td className="p-3">2000</td>
                          <td className="p-3">Strict XML data structural compliance rules. Capitalized letters threw syntax parse errors.</td>
                        </tr>
                        <tr className="bg-emerald-500/5 text-[var(--text)]">
                          <td className="p-3 font-mono font-bold text-emerald-400">HTML5 (Current Node)</td>
                          <td className="p-3">2014 - Present</td>
                          <td className="p-3 font-medium">Native media hooks (audio/video), semantic nodes, web storage API, and canvas layouts.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SECTION 2 */}
              {activeSubSection === 'structure' && (
                <div className="space-y-6 animate-fadeIn text-sm text-[var(--muted)] leading-relaxed">
                  <div className="border-b border-[var(--border)] pb-4">
                    <h2 className="text-2xl font-black tracking-tight text-[var(--text)]">2. Client Network Resolution & The Document Object Model</h2>
                    <p className="text-xs text-[#22d3ee] mt-1">Understanding compilation mechanics and root structural blocks.</p>
                  </div>

                  <h3 className="text-base font-black text-[var(--text)]">How Client Browsers Resolve Web Document Pipelines</h3>
                  <p>
                    When a client initiates a request toward an asset domain (e.g., <code>www.codexon.com</code>), the request hits DNS systems, addresses the remote target host, and returns data blocks back through a stream execution path:
                  </p>
                  
                  <div className="p-4 rounded-xl font-mono text-xs text-amber-500 border border-[var(--border)] bg-[var(--bg)]/40 space-y-2">
                    <div>[Client Request Link] ──&gt; [Server Processing Node]</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│</div>
                    <div>[Visual Painted Screen] &lt;── [DOM Object Parsing] &lt;── [Streams Raw Text Data (.html)]</div>
                  </div>

                  <h3 className="text-base font-black text-[var(--text)] mt-4">The Standard Root Skeleton Infrastructure</h3>
                  <p>Every pristine HTML document requires strict initialization markers. Bypassing these components triggers browser engine fallback modes, degrading compilation performance:</p>
                  
                  <div className="bg-[var(--bg)] border border-[var(--border)] p-4 rounded-xl font-mono text-xs text-cyan-400 shadow-inner">
{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enterprise Structural Node Layout</title>
</head>
<body>
    <h1>Deep Architecture Core Execution Header</h1>
    <p>Data payload layer stream.</p>
</body>
</html>`}
                  </div>

                  <h3 className="text-base font-black text-[var(--text)] mt-4">Granular Breakdown of Global Declarations:</h3>
                  <ul className="space-y-3 pl-4 list-decimal text-xs">
                    <li><strong><code>&lt;!DOCTYPE html&gt;</code>:</strong> Explicitly announces to client engines that the oncoming asset packet uses modern **HTML5 structural constraints**. Bypasses historical quirks-mode matching variables.</li>
                    <li><strong><code>&lt;html lang="en"&gt;</code>:</strong> The definitive parent block container mapping out the global document scope. The lang parameter tells accessibility screen reader modules how to enunciate text.</li>
                    <li><strong><code>&lt;head&gt;</code>:</strong> The operational sandbox housing metadata configurations. Content inside this tag remains completely invisible to terminal viewpoints but configures search scrapers and parsing dependencies.</li>
                    <li><strong><code>&lt;meta charset="UTF-8"&gt;</code>:</strong> Encodes document character arrays against standard UTF-8 parameters, mitigating encoding distortions for multilingual characters.</li>
                    <li><strong><code>&lt;meta name="viewport" content="width=device-width"&gt;</code>:</strong> Coordinates viewport scale factors to ensure layout grids scale uniformly on mobile, desktop, and tablet displays.</li>
                    <li><strong><code>&lt;body&gt;</code>:</strong> The primary visible presentation matrix. Any element declared inside this tag compiles into real graphics on the client view port.</li>
                  </ul>
                </div>
              )}

              {/* SECTION 3 */}
              {activeSubSection === 'elements' && (
                <div className="space-y-6 animate-fadeIn text-sm text-[var(--muted)] leading-relaxed">
                  <div className="border-b border-[var(--border)] pb-4">
                    <h2 className="text-2xl font-black tracking-tight text-[var(--text)]">3. Typographic Hierarchies, Media Objects & Document Lists Arrays</h2>
                    <p className="text-xs text-[#22d3ee] mt-1">Differentiating tag variations, structural typography, and hypertext bindings.</p>
                  </div>

                  <h3 className="text-base font-black text-[var(--text)]">Anatomy of an HTML Element</h3>
                  <p>An HTML element is the unified object created by combining an opening tag, custom contextual attributes, a core string payload, and a matching terminal closing tag.</p>
                  
                  <div className="bg-[var(--bg)]/60 border border-[var(--border)] p-4 rounded-xl font-mono text-xs text-indigo-400">
                    {`<p class="paragraph-text"> The content body data layer string payload </p>\n └─┬─┘ └───────┬──────┘  └───────────────────┬───────────────────┘ └──┬──┘\nOpening  Attribute Name        Inner Content Block Text          Closing`}
                  </div>

                  <h3 className="text-base font-black text-[var(--text)] mt-4">Heading Proportions and Typography Blocks</h3>
                  <p>HTML provides 6 levels of structured heading nodes running sequentially from <code>&lt;h1&gt;</code> down to <code>&lt;h6&gt;</code>. These should **never** be used to control simple text sizes; they declare semantic page hierarchy parameters:</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="portfolio-glass p-4 rounded-xl space-y-2">
                      <span className="text-xs font-black text-[var(--text)] block uppercase tracking-wider">Semantic Text Formatting Tags</span>
                      <ul className="text-xs font-mono space-y-1.5 opacity-90">
                        <li><code>&lt;b&gt;Text&lt;/b&gt;</code>: Visual bold layout without structural value.</li>
                        <li><code>&lt;strong&gt;Text&lt;/strong&gt;</code>: Indicates high logical importance for screen reader engines.</li>
                        <li><code>&lt;i&gt;Text&lt;/i&gt;</code>: Renders basic italic styling slope changes.</li>
                        <li><code>&lt;em&gt;Text&lt;/em&gt;</code>: Places systematic conversational emphasis on text strings.</li>
                        <li><code>&lt;u&gt;Text&lt;/u&gt;</code>: Visual underline formatting.</li>
                        <li><code>&lt;s&gt;Text&lt;/s&gt;</code>: Strikethrough effect representing obsolete metrics.</li>
                      </ul>
                    </div>
                    <div className="portfolio-glass p-4 rounded-xl space-y-2">
                      <span className="text-xs font-black text-[var(--text)] block uppercase tracking-wider">Hypertext & Media Integration Elements</span>
                      <p className="text-xs">Hyperlink routing runs via anchor containers, while image parsing consumes self-closing asset components:</p>
                      <div className="space-y-2 pt-1 font-mono text-[11px]">
                        <div className="bg-[var(--bg)] p-2 rounded border">
                          {`<a href="https://google.com" target="_blank">Anchor Text Link</a>`}
                        </div>
                        <div className="bg-[var(--bg)] p-2 rounded border text-cyan-400">
                          {`<img src="path/asset.jpg" alt="Description Text Required for High Accessibility" width="400" />`}
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-base font-black text-[var(--text)] mt-4">Document List Architecture Mapping</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
                    <div className="portfolio-glass p-5 rounded-2xl space-y-2 border-l-2 border-l-[#7c5cff]">
                      <span className="font-bold text-[var(--text)] block">Ordered List Matrices (<code>&lt;ol&gt;</code>)</span>
                      <p className="text-[var(--muted)] font-sans text-xs">Compiles sequential indexed step lists (1, 2, 3) automatically:</p>
{`<ol type="1">
  <li>Fetch Repository</li>
  <li>Compile Script</li>
</ol>`}
                    </div>
                    <div className="portfolio-glass p-5 rounded-2xl space-y-2 border-l-2 border-l-[#22d3ee]">
                      <span className="font-bold text-[var(--text)] block">Unordered List Matrices (<code>&lt;ul&gt;</code>)</span>
                      <p className="text-[var(--muted)] font-sans text-xs">Compiles bullet-pointed layout blocks uniformly:</p>
{`<ul>
  <li>Core Node Framework</li>
  <li>Edge Service Layer</li>
</ul>`}
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 4 */}
              {activeSubSection === 'tablesforms' && (
                <div className="space-y-6 animate-fadeIn text-sm text-[var(--muted)] leading-relaxed">
                  <div className="border-b border-[var(--border)] pb-4">
                    <h2 className="text-2xl font-black tracking-tight text-[var(--text)]">4. Tabular Matrices & Interactive Input Forms Framework</h2>
                    <p className="text-xs text-[#22d3ee] mt-1">Constructing organized database tracking tables and form components.</p>
                  </div>

                  <h3 className="text-base font-black text-[var(--text)]">Data Grids Structural Mapping (Tables)</h3>
                  <p>Web data grids use hierarchical rows. A modern table combines structural components like header zones, body nodes, and optional summary cells to group rows cleanly:</p>
                  
                  <div className="bg-[var(--bg)] border border-[var(--border)] p-4 rounded-xl font-mono text-xs text-amber-500 shadow-inner">
{`<table>
  <thead>
    <tr>
      <th>System Identifier</th>
      <th>Network Allocation Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Node_660X</td>
      <td>Active Operational State</td>
    </tr>
  </tbody>
</table>`}
                  </div>
                  <p className="text-xs">
                    <code>&lt;table&gt;</code> opens the grid container. <code>&lt;tr&gt;</code> defines a row block. <code>&lt;th&gt;</code> injects bold header parameters, and <code>&lt;td&gt;</code> houses structural data field payloads.
                  </p>

                  <h3 className="text-base font-black text-[var(--text)] mt-4">Interactive Input Form Lifecycles</h3>
                  <p>
                    The <code>&lt;form&gt;</code> component captures client text, boolean fields, or files to build a request array before shipping data to an API endpoint. Changing the input's <code>type</code> parameter controls browser formatting rules and validates entry strings automatically:
                  </p>

                  <div className="bg-[var(--bg)]/40 p-4 rounded-xl border font-mono text-xs text-cyan-400 space-y-3">
{`<form action="/api/v1/auth" method="POST">
  <label for="usrName">Account User Identifier</label>
  <input type="text" id="usrName" name="username" placeholder="Enter identifier" required />

  <label for="usrPass">Secure Gateway Password</label>
  <input type="password" id="usrPass" name="password" required />

  <button type="submit">Commit Authorization Stream</button>
</form>`}
                  </div>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text)] pt-2">Granular Input Type Index Guide:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="p-4 border rounded-xl space-y-1">
                      <code>type="text"</code> / <code>type="password"</code>
                      <p className="text-[var(--muted)] text-[11px]">Renders single-line text data fields. Assigning the password parameter auto-masks characters behind security shields.</p>
                    </div>
                    <div className="p-4 border rounded-xl space-y-1">
                      <code>type="email"</code> / <code>type="number"</code>
                      <p className="text-[var(--muted)] text-[11px]">Enforces client-side validation rules. Rejects inputs that fail matching address syntaxes or run outside specified range limits.</p>
                    </div>
                    <div className="p-4 border rounded-xl space-y-1">
                      <code>type="date"</code> / <code>type="file"</code>
                      <p className="text-[var(--muted)] text-[11px]">Launches responsive calendar pickers or mounts local machine files directly into boundary buffers.</p>
                    </div>
                    <div className="p-4 border rounded-xl space-y-1">
                      <code>type="checkbox"</code> / <code>type="radio"</code>
                      <p className="text-[var(--muted)] text-[11px]">Checkbox structures collect multi-option selections, while radio buttons force singular choices using matching group names.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 5 */}
              {activeSubSection === 'semantic' && (
                <div className="space-y-6 animate-fadeIn text-sm text-[var(--muted)] leading-relaxed">
                  <div className="border-b border-[var(--border)] pb-4">
                    <h2 className="text-2xl font-black tracking-tight text-[var(--text)]">5. HTML5 Semantic Architectures & Element Display Models</h2>
                    <p className="text-xs text-[#22d3ee] mt-1">Replacing non-descriptive layout frames with standardized semantic markup components.</p>
                  </div>

                  <h3 className="text-base font-black text-[var(--text)]">The Core Semantic Framework Movement</h3>
                  <p>
                    Legacy web configurations relied completely on generic layouts (<code>&lt;div class="navigation"&gt;</code>). This added unnecessary noise for system parsers. Modern semantic elements describe their structural purpose directly, ensuring clean page crawling for bots and assistive software:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 border rounded-xl space-y-2 bg-[var(--bg)]/20">
                      <span className="font-bold text-[var(--text)] block uppercase tracking-wider text-[#7c5cff]">HTML5 Structural Semantic Trees</span>
                      <ul className="space-y-1.5 list-disc pl-4 text-[var(--muted)]">
                        <li><code>&lt;header&gt;</code>: Houses introductory components, site branding assets, and title metrics.</li>
                        <li><code>&lt;nav&gt;</code>: Declares navigation links and page routing menus.</li>
                        <li><code>&lt;section&gt;</code>: Isolates specific thematic content blocks across distinct page templates.</li>
                        <li><code>&lt;article&gt;</code>: Encapsulates self-contained text compositions designed for independent syndication.</li>
                        <li><code>&lt;aside&gt;</code>: Groups sidebar elements or tangential context metrics away from central text nodes.</li>
                        <li><code>&lt;footer&gt;</code>: Anchors corporate disclaimers, privacy terms, and social link headers.</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-xl space-y-2 bg-[var(--bg)]/20">
                      <span className="font-bold text-[var(--text)] block uppercase tracking-wider text-[#22d3ee]">Element Display Categories Framework</span>
                      <p><strong>Block-Level Elements:</strong> Span the complete container dimension, forcing subsequent nodes down onto a clean new row line.</p>
                      <code className="text-[11px] block text-[#7c5cff] font-mono">Examples: &lt;div&gt;, &lt;p&gt;, &lt;h1&gt; to &lt;h6&gt;, &lt;ul&gt;, &lt;section&gt;</code>
                      <p className="mt-2"><strong>Inline Elements:</strong> Consume only the strict width of their current text payload, sitting horizontally within common text blocks.</p>
                      <code className="text-[11px] block text-[#22d3ee] font-mono">Examples: &lt;span&gt;, &lt;a&gt;, &lt;img&gt;, &lt;strong&gt;, &lt;em&gt;</code>
                    </div>
                  </div>

                  <h3 className="text-base font-black text-[var(--text)] mt-4">Global Structural Attributes Mapping</h3>
                  <p>Attributes apply extra configuration options to any element node. Common global identifiers include:</p>
                  <ul className="list-disc pl-5 text-xs space-y-1.5">
                    <li><strong><code>id</code>:</strong> Assigns an absolute unique identifier string to a single element. Duplicate IDs within a DOM tree break core query calls.</li>
                    <li><strong><code>class</code>:</strong> Groups multiple elements under a common identifier hook for global layout styles or target array selectors.</li>
                    <li><strong><code>style</code>:</strong> Injects inline CSS adjustments directly onto an element, overriding external stylesheets.</li>
                  </ul>

                  <h3 className="text-base font-black text-[var(--text)] mt-4">HTML Character Entity Configurations</h3>
                  <p>To print mathematical symbols, currency signs, or reserved characters without breaking source markup configurations, pass character entities:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs text-center text-cyan-400">
                    <div className="p-2 border rounded-xl bg-[var(--bg)]/40"><code>&amp;nbsp;</code><span className="block text-[10px] text-[var(--muted)] mt-0.5">Non-breaking Space</span></div>
                    <div className="p-2 border rounded-xl bg-[var(--bg)]/40"><code>&amp;copy;</code><span className="block text-[10px] text-[var(--muted)] mt-0.5">© Copyright Icon</span></div>
                    <div className="p-2 border rounded-xl bg-[var(--bg)]/40"><code>&amp;lt;</code><span className="block text-[10px] text-[var(--muted)] mt-0.5">&lt; Less Than Sign</span></div>
                    <div className="p-2 border rounded-xl bg-[var(--bg)]/40"><code>&amp;gt;</code><span className="block text-[10px] text-[var(--muted)] mt-0.5">&gt; Greater Than Sign</span></div>
                  </div>
                </div>
              )}

              {/* SECTION 6 */}
              {activeSubSection === 'advanced' && (
                <div className="space-y-6 animate-fadeIn text-sm text-[var(--muted)] leading-relaxed">
                  <div className="border-b border-[var(--border)] pb-4">
                    <h2 className="text-2xl font-black tracking-tight text-[var(--text)]">6. High-Performance SEO Architecture, Project Roadmaps & Technical FAQS</h2>
                    <p className="text-xs text-[#22d3ee] mt-1">Strategies for production-level markup auditing, page indexing, and career blueprints.</p>
                  </div>

                  <h3 className="text-base font-black text-[var(--text)]">Maximizing Page Indexing (SEO Meta Architecture)</h3>
                  <p>
                    Search engine scrapers process head metadata blocks to parse page descriptions and rank positions. A clean meta structure accurately describes app intent before heavy scripts initialize:
                  </p>
                  
                  <div className="bg-[var(--bg)] p-4 border rounded-xl font-mono text-xs text-[#22d3ee]">
{`<title>Codexon Full Stack Engineering Portal</title>
<meta name="description" content="Access specialized training pipelines, stream lectures, and claim digital certificates." />
<meta name="robots" content="index, follow" />`}
                  </div>

                  <h3 className="text-base font-black text-[var(--text)] mt-4">Professional Graduation Project Frameworks</h3>
                  <p className="text-xs">Apply your markup knowledge across distinct project profiles to build a production-ready repository portfolio:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
                    <div className="p-4 border rounded-xl bg-[var(--bg)]/20">
                      <span className="font-bold block text-[var(--text)]">1. Core Resume Sheet</span>
                      <p className="text-[var(--muted)] text-[11px] mt-1">Uses nested address headers, blockquotes, structural definition arrays, and text print layouts.</p>
                    </div>
                    <div className="p-4 border rounded-xl bg-[var(--bg)]/20">
                      <span className="font-bold block text-[#7c5cff]">2. Restaurant Grid Catalog</span>
                      <p className="text-[var(--muted)] text-[11px] mt-1">Implements clean multi-media data streams, menu list alignments, and item order forms.</p>
                    </div>
                    <div className="p-4 border rounded-xl bg-[var(--bg)]/20">
                      <span className="font-bold block text-[#22d3ee]">3. Admin System wireframe</span>
                      <p className="text-[var(--muted)] text-[11px] mt-1">Integrates dense tabular records grids, multi-step input configurations, and semantic site maps.</p>
                    </div>
                  </div>

                  <h3 className="text-base font-black text-[var(--text)] mt-4 flex items-center gap-1.5"><HelpCircle size={18} className="text-[#7c5cff]" /> Core Technical Interview FAQs</h3>
                  <div className="space-y-4 text-xs">
                    <div className="portfolio-glass p-4 rounded-xl">
                      <span className="font-bold text-[var(--text)] block">Q. What differentiates legacy HTML documents from standard HTML5 pipelines?</span>
                      <p className="mt-1 opacity-90">HTML5 native capabilities drop dependencies on bloated external plugins for multimedia playback. It introduces semantic layout containers, localized client database APIs, and canvas nodes for drawing interface graphics.</p>
                    </div>
                    <div className="portfolio-glass p-4 rounded-xl">
                      <span className="font-bold text-[var(--text)] block">Q. How do client engines parse and prioritize Div division structures versus Span hooks?</span>
                      <p className="mt-1 opacity-90">Div operates as an assertive block container that spans the entire available width. Span functions inside a row, wrapping narrow segments of text inline to modify target styles without breaking text blocks into new lines.</p>
                    </div>
                  </div>

                  <div className="portfolio-glass p-5 rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 to-transparent space-y-1">
                    <span className="text-xs font-black text-emerald-400 uppercase tracking-widest block">Complete Core Path Roadmap Progression</span>
                    <p className="text-xs font-mono">HTML Architecture Foundations ──&gt; Advanced Media Form lifecycles ──&gt; Semantic Optimization & SEO ──&gt; Unlocking CSS3 Responsive Engineering Layouts</p>
                  </div>
                </div>
              )}

              {/* Bottom Multi-step action link bar */}
              <div className="flex justify-between items-center pt-6 border-t border-[var(--border)] mt-8">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--muted)]">Codexon HTML Enterprise Encyclopedia Module</span>
                <button onClick={() => setCurrentStep('video')} className="bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] text-white font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transform hover:-translate-y-0.5 transition shadow-lg shadow-indigo-600/10">
                  Proceed to AI Video Lecture <ArrowRight size={14}/>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* STEP 2: YOUTUBE EMBED PLAYER SYSTEM */}
        {currentStep === 'video' && (
          <div className="portfolio-glass p-8 rounded-3xl space-y-6 text-center animate-fadeIn">
            <h2 className="text-2xl font-black text-left">Module 02: Technical AI Video Lecture</h2>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl">
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="HTML5 Core Engineering Video Lecture Node"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="flex justify-between items-center pt-4">
              <button onClick={() => setCurrentStep('blog')} className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] hover:text-[var(--text)] transition">← Previous Guide</button>
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
                <h2 className="text-xl font-black">HTML5 Architecture Test Ledger</h2>
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
            <div className="portfolio-glass p-12 rounded-3xl border-2 border-emerald-500/30 bg-gradient-to-b from-emerald-500/5 to-transparent relative overflow-hidden max-w-2xl mx-auto shadow-2xl">
              <div className="absolute top-0 right-0 bg-emerald-500 text-white font-mono text-[9px] font-black tracking-widest uppercase px-8 py-1.5 rotate-45 translate-x-6 translate-y-3 shadow-md">
                Verified
              </div>

              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                <Award size={32} />
              </div>

              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#22d3ee]">Codexon Technological Ledger Certification</span>
              <h1 className="text-3xl font-serif tracking-wide text-[var(--text)] mt-4 mb-1 italic">Certificate of Excellence</h1>
              <p className="text-xs text-[var(--muted)]">This framework node validates the validation clearance parameters for</p>
              
              <h2 className="text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#22d3ee] my-6 font-mono underline decoration-wavy decoration-[#7c5cff]/30">
                {user?.name || "Verified Student Quadrant"}
              </h2>

              <p className="text-xs text-[var(--muted)] max-w-md mx-auto leading-relaxed">
                For successfully scoring <span className="text-emerald-400 font-bold font-mono">{score}%</span> on the internal <span className="text-[var(--text)] font-semibold">HTML5 Core Structural Engineering Exam Grid</span>. Authenticated ledger sequence successfully saved to network buffers.
              </p>

              <div className="flex justify-between items-center pt-10 text-[9px] font-mono text-[var(--muted)] border-t border-[var(--border)] mt-8">
                <div>DATE: {new Date().toLocaleDateString('en-IN')}</div>
                <div className="font-bold text-[#22d3ee]">SIGNATURE: CODEXON LABS LOGS</div>
                <div>ID: 660A123_WEB_NODE</div>
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