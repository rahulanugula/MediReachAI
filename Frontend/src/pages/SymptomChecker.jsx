import { useState } from 'react';
import {
  Activity,
  Beaker,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Heart,
  Droplets,
  Thermometer,
  Shield,
  Printer,
  Copy,
  Share2,
  Download,
  Stethoscope,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiApi } from '../api';

export default function SymptomChecker() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  // form state
  const [form, setForm] = useState({
    age: '45',
    gender: 'Male',
    oxygen: '97',
    temp: '98.6',
    pulse: '72',
    bp: '120/80',
    symptoms: 'Fever, Headache',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnalyzing(true);
    setResult(null);
    setError(null);

    const payload = {
      symptoms: form.symptoms.split(',').map((s) => s.trim()).filter(Boolean),
      blood_pressure: form.bp,
      oxygen_level: parseInt(form.oxygen, 10),
      pulse_rate: parseInt(form.pulse, 10),
      temperature: parseFloat(form.temp),
    };

    try {
      const { data } = await aiApi.post('/symptom-checker', payload);
      setResult({
        disease: data.possible_disease,
        confidence: data.confidence_percentage,
        triage: data.risk_level,
        department: data.suggested_department,
        firstAid: data.first_aid,
        tests: data.recommended_tests || [],
      });
    } catch (err) {
      console.error('AI service error:', err);
      setError('Could not reach the AI service. Make sure the FastAPI server is running on port 8000.');
    } finally {
      setAnalyzing(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = `AI Diagnosis: ${result.disease} (${result.confidence}% Confidence)
triage: ${result.triage}
suggested department: ${result.department}
first aid: ${result.firstAid}
tests: ${result.tests.join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const printReport = () => {
    window.print();
  };

  const resetForm = () => {
    setResult(null);
    setError(null);
  };

  const triageStyles = {
    High: 'bg-rose-50 text-rose-600 border-rose-200 shadow-rose-100/50',
    Medium: 'bg-amber-50 text-amber-600 border-amber-250 shadow-amber-100/50',
    Low: 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-emerald-100/50',
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.06),_transparent_32%),linear-gradient(180deg,_#f8fafc_0%,_#f1f5f9_100%)] p-6 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Header */}
        <header className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shadow-md">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Decision Support Engine</p>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">AI Symptom Checker</h1>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">
          {/* Vitals Form Column */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/60 p-6 shadow-xl shadow-slate-100/30">
            <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="text-blue-500" size={18} />
                Patient Vitals & History
              </h2>
              <span className="text-xs text-slate-400">Offline-capable scoring</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5Packed">Age (Years)</label>
                  <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Gender</label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">SpO2 Level (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="oxygen"
                      value={form.oxygen}
                      onChange={handleChange}
                      min="70"
                      max="100"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                    />
                    <Sparkles className="absolute left-3.5 top-3.5 text-blue-500" size={14} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Temperature (°F)</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="temp"
                      value={form.temp}
                      onChange={handleChange}
                      step="0.1"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                    />
                    <Thermometer className="absolute left-3.5 top-3.5 text-amber-500" size={14} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Pulse Rate (BPM)</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="pulse"
                      value={form.pulse}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                    />
                    <Heart className="absolute left-3.5 top-3.5 text-rose-500 animate-pulse" size={14} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Blood Pressure</label>
                <div className="relative">
                  <input
                    type="text"
                    name="bp"
                    value={form.bp}
                    onChange={handleChange}
                    placeholder="120/80"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                  />
                  <Droplets className="absolute left-3.5 top-3.5 text-red-500" size={14} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-bold">Symptoms (comma separated)</label>
                <textarea
                  rows={4}
                  name="symptoms"
                  value={form.symptoms}
                  onChange={handleChange}
                  placeholder="e.g. Fever, Chest pain, Cough"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={analyzing}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-2xl shadow-xl shadow-blue-500/20 transition active:scale-[0.98] flex items-center justify-center text-sm"
              >
                {analyzing ? (
                  <>
                    <svg className="animate-spin mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Executing Clinical Models...
                  </>
                ) : (
                  <>
                    <Beaker className="mr-2" size={16} />
                    Run AI Diagnosis
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Diagnostic Report Column */}
          <div className="bg-slate-950 rounded-3xl border border-slate-800/80 p-6 shadow-2xl relative overflow-hidden flex flex-col min-h-[450px]">
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-5 border-b border-slate-800 pb-3 relative z-10">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Diagnostic Summary</h2>
              {result && (
                <button onClick={resetForm} className="text-slate-400 hover:text-white transition flex items-center text-xs font-bold">
                  <RotateCcw size={12} className="mr-1" /> Reset
                </button>
              )}
            </div>

            <div className="flex-1 flex flex-col justify-center relative z-10">
              <AnimatePresence mode="wait">
                {!result && !error && !analyzing && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-slate-500 py-10"
                  >
                    <Activity size={50} className="mx-auto mb-4 opacity-20 text-indigo-500" />
                    <p className="text-sm font-semibold text-slate-400">Awaiting Telemetry</p>
                    <p className="text-xs text-slate-500 mt-1 max-w-[250px] mx-auto">Fill in the vitals and click AI Diagnosis to launch analysis.</p>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10"
                  >
                    <AlertTriangle size={36} className="mx-auto mb-3 text-rose-500" />
                    <p className="text-rose-400 text-sm leading-relaxed font-semibold">{error}</p>
                  </motion.div>
                )}

                {result && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center border-b border-slate-800/80 pb-5">
                      <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 text-blue-400 rounded-full mb-3 ring-4 ring-blue-500/5">
                        <Stethoscope size={28} />
                      </div>
                      <h3 className="text-2xl font-black text-white tracking-tight">{result.disease}</h3>
                      <p className="text-xs text-slate-500 mt-1.5 flex items-center justify-center gap-1.5">
                        Prediction Confidence Index
                      </p>

                      {/* Confidence Index Gauges */}
                      <div className="mt-3 flex items-center justify-center gap-3">
                        <div className="h-2 w-44 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${result.confidence}%` }} />
                        </div>
                        <span className="font-extrabold text-blue-400 text-sm">{result.confidence}%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-3.5">
                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider mb-1.5">Triage Priority</p>
                        <p className={`font-bold flex items-center text-xs px-2.5 py-1 rounded-full border justify-center ${
                          triageStyles[result.triage] || 'border-slate-800 text-white'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
                          {result.triage} Risk
                        </p>
                      </div>
                      <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-3.5">
                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider mb-1.5">Referral Department</p>
                        <p className="text-white font-bold text-xs truncate text-center">{result.department}</p>
                      </div>
                    </div>

                    <div className="bg-blue-950/20 border border-blue-800/25 rounded-2xl p-4">
                      <p className="text-[10px] text-blue-400 uppercase font-bold tracking-wider mb-1.5 flex items-center">
                        <CheckCircle2 size={13} className="mr-1.5" />
                        First Aid & Homecare
                      </p>
                      <p className="text-slate-300 text-xs leading-relaxed font-semibold">{result.firstAid}</p>
                    </div>

                    {result.tests.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-[10px] text-slate-450 uppercase font-bold tracking-wider">Suggested Laboratory Tests</p>
                        <div className="flex flex-wrap gap-2">
                          {result.tests.map((test) => (
                            <span key={test} className="bg-slate-900 border border-slate-850 text-slate-350 text-[10px] font-bold px-3 py-1 rounded-full">
                              {test}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Report action controls */}
                    <div className="flex items-center gap-2 border-t border-slate-800/80 pt-4 mt-2">
                      <button onClick={copyToClipboard} className="flex-1 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800/60 py-2 rounded-xl transition text-[11px] font-bold flex items-center justify-center gap-1.5">
                        <Copy size={13} />
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                      <button onClick={printReport} className="flex-1 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800/60 py-2 rounded-xl transition text-[11px] font-bold flex items-center justify-center gap-1.5">
                        <Printer size={13} />
                        Print
                      </button>
                      <button className="flex-1 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800/60 py-2 rounded-xl transition text-[11px] font-bold flex items-center justify-center gap-1.5">
                        <Share2 size={13} />
                        Share
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Disclaimer notice */}
            <div className="mt-8 border-t border-slate-900 pt-3 relative z-10 flex gap-2 text-[10px] text-slate-500 leading-normal">
              <Info className="text-slate-650 flex-shrink-0" size={13} />
              <span>Disclaimer: MediReach AI supports clinical prioritization decisions. Always consult a general practitioner or cardiologist for physical symptoms.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
