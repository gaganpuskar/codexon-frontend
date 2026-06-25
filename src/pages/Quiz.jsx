import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Award, XCircle } from 'lucide-react';
import axios from 'axios';

// 🚀 LIVE ENVIRONMENT VARIABLE FALLBACK CONFIGURATION
const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

export default function Quiz() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = { headers: { Authorization: `Bearer ${user?.token}` } };
    // Updated to dynamic BACKEND_URL variable
    axios.get(`${BACKEND_URL}/quizzes/course/${courseId}`, config)
      .then(res => setQuiz(res.data))
      .catch(err => console.error(err));
  }, [courseId]);

  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const orderedAnswers = quiz.questions.map((_, idx) => answers[idx] || "");
      // Updated to dynamic BACKEND_URL variable
      const res = await axios.post(`${BACKEND_URL}/quizzes/${quiz._id}/submit`, { answers: orderedAnswers }, config);
      setEvaluation(res.data);
      setSubmitted(true);
    } catch (err) {
      alert('Submission failed.');
    }
  };

  if (!quiz) return <div className="text-center text-slate-400 mt-20">Loading assessment module...</div>;

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md w-full text-center">
          {evaluation?.result?.passed ? (
            <>
              <Award className="mx-auto text-yellow-400 mb-4 animate-bounce" size={64} />
              <h2 className="text-3xl font-black text-white mb-2">Passed!</h2>
              <p className="text-emerald-400 text-sm font-semibold mb-4">Score: {evaluation.result.percentage}%</p>
              <button onClick={() => navigate('/')} className="w-full bg-indigo-600 py-3 rounded-xl font-bold text-white">Dashboard</button>
            </>
          ) : (
            <>
              <XCircle className="mx-auto text-red-500 mb-4" size={64} />
              <h2 className="text-3xl font-black text-white mb-2">Failed</h2>
              <button onClick={() => window.location.reload()} className="w-full bg-slate-800 py-3 rounded-xl font-bold text-slate-300">Retry</button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-6 text-white">
      <h2 className="text-3xl font-black mb-8">Quiz Assessment</h2>
      {quiz.questions.map((q, qIdx) => (
        <div key={q._id} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl mb-6">
          <p className="font-semibold mb-4">{qIdx + 1}. {q.questionText}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {q.options.map((opt) => (
              <button key={opt} onClick={() => setAnswers({ ...answers, [qIdx]: opt })} className={`p-3.5 rounded-xl border text-sm text-left transition ${answers[qIdx] === opt ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleSubmit} className="mt-8 w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-xl shadow-indigo-600/20">
        Submit Exam
      </button>
    </div>
  );
}