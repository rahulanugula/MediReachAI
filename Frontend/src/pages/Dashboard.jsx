import { useEffect, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Heart,
  TrendingUp,
  Users,
  Video,
  MapPin,
  Clock,
  Sun,
  Plus,
  Phone,
  ChevronsRight,
  Shield,
  CheckCircle,
  Truck,
  Building
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Dashboard() {
  const [patientStats, setPatientStats] = useState({ total: 8, synced: 6, offline: 2, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // live update time
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    api.get('/patients/stats')
      .then(({ data }) => {
        setPatientStats({
          total: data.total || 8,
          synced: data.synced || 0,
          offline: data.offline || 0,
          pending: data.pending || 0,
        });
      })
      .catch(() => {
        setPatientStats({ total: 8, synced: 6, offline: 2, pending: 0 });
      })
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    {
      title: 'Active Patients',
      value: patientStats.total,
      change: `${patientStats.synced} synced`,
      up: true,
      desc: 'Active medical registry cases',
      icon: Users,
      color: 'from-blue-500 to-indigo-500',
      shadow: 'shadow-blue-500/10'
    },
    {
      title: 'Triage Alerts',
      value: patientStats.offline,
      change: patientStats.pending ? `${patientStats.pending} pending` : 'Registry watch',
      up: false,
      desc: 'Records needing network follow-up',
      icon: AlertTriangle,
      color: 'from-rose-500 to-red-600',
      shadow: 'shadow-rose-500/10'
    },
    {
      title: 'Consultations',
      value: '18',
      change: 'Active WebRTC',
      up: true,
      desc: 'Teleconsultations scheduled today',
      icon: Video,
      color: 'from-violet-500 to-purple-600',
      shadow: 'shadow-violet-500/10'
    },
    {
      title: 'AI Diagnostic Acc',
      value: '97.4%',
      change: 'Optimal',
      up: true,
      desc: 'Overall engine verification rate',
      icon: Activity,
      color: 'from-emerald-500 to-teal-600',
      shadow: 'shadow-emerald-500/10'
    }
  ];

  const queue = [
    { name: 'Sarah Connor', triage: 'Critical', age: 44, statusColor: 'bg-rose-100 text-rose-700 border-rose-200', issue: 'Heart rhythm arrhythmia risk' },
    { name: 'John Smith', triage: 'High Risk', age: 52, statusColor: 'bg-amber-100 text-amber-700 border-amber-200', issue: 'Severe asthma / SpO2 at 89%' },
    { name: 'Emily Davis', triage: 'Moderate', age: 29, statusColor: 'bg-indigo-100 text-indigo-700 border-indigo-200', issue: 'Viral fever and cough' },
    { name: 'Michael Brown', triage: 'Routine', age: 67, statusColor: 'bg-slate-100 text-slate-700 border-slate-200', issue: 'Chronic rheumatoid arthritis' }
  ];

  const quickActions = [
    { name: 'Register Patient', desc: 'Add new clinical record', path: '/patients', icon: Plus, bg: 'hover:bg-blue-50 hover:border-blue-200' },
    { name: 'Symptom Engine', desc: 'Run vitals prediction', path: '/ai-symptom-checker', icon: Activity, bg: 'hover:bg-emerald-50 hover:border-emerald-200' },
    { name: 'SOS Dispatcher', desc: 'Deploy nearest ambulance', path: '/emergency', icon: AlertTriangle, bg: 'hover:bg-rose-50 hover:border-rose-200' },
    { name: 'Consult Lobby', desc: 'Initialize telemedicine', path: '/telemedicine', icon: Video, bg: 'hover:bg-violet-50 hover:border-violet-200' }
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.06),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#f1f5f9_100%)] p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Welcome Section */}
        <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between bg-white border border-slate-200/60 rounded-3xl p-6 shadow-md shadow-slate-100/50">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-650 font-bold text-white text-2xl shadow-lg">
              RA
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">MediReach Suite Center</p>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Welcome Back, Dr. Rahul</h1>
              <p className="text-sm text-slate-500 mt-0.5">MediReach command nodes are synced. All systems operational.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4 lg:border-t-0 lg:pt-0">
            {/* Clock */}
            <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-2 border border-slate-200/60">
              <Clock className="text-indigo-600" size={16} />
              <span className="text-sm font-bold text-slate-700">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
            {/* Weather */}
            <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-2 border border-slate-200/60">
              <Sun className="text-amber-500" size={16} />
              <span className="text-sm font-medium text-slate-700">Delhi: 31 deg C, Sunny</span>
            </div>
          </div>
        </section>

        {/* Quick Actions grid */}
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Link
                key={idx}
                to={action.path}
                className={`bg-white border border-slate-200/60 rounded-2xl p-4 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between ${action.bg}`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-600 mb-4">
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">{action.name}</h3>
                  <p className="text-[11px] text-slate-400 mt-1">{action.desc}</p>
                </div>
              </Link>
            );
          })}
        </section>

        {/* KPIs Grid */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-3xl border border-slate-200/60 bg-white p-5 shadow-lg ${stat.shadow}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{stat.title}</span>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-md`}>
                    <Icon size={18} />
                  </div>
                </div>
                <div className="mt-4">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h2>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{stat.desc}</span>
                    <span className={`px-2 py-0.5 rounded-full font-bold ${
                      stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-rose-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          
          {/* Left Block: Patient Queue and SVG Chart Analytics */}
          <div className="space-y-8">
            
            {/* SVG Charts Card */}
            <div className="rounded-3xl border border-slate-200/60 bg-white p-6 shadow-md shadow-slate-100/50">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-950">Patient Admission Trends</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Real-time daily patient registry volume vs triage severity logs</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs text-slate-600">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500" /> Registry Volume
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-600">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" /> Severe Emergencies
                  </span>
                </div>
              </div>

              {/* Responsive SVG Chart */}
              <div className="h-56 w-full mt-4">
                <svg className="h-full w-full" viewBox="0 0 600 220" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chart-grad-blue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="chart-grad-rose" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="600" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="90" x2="600" y2="90" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="150" x2="600" y2="150" stroke="#f1f5f9" strokeWidth="1" />

                  {/* Blue Area Line (Registry Count) */}
                  <path
                    d="M 0 160 Q 100 120 200 130 T 400 60 T 600 80 L 600 220 L 0 220 Z"
                    fill="url(#chart-grad-blue)"
                  />
                  <path
                    d="M 0 160 Q 100 120 200 130 T 400 60 T 600 80"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Red Line Area (Critical SOS) */}
                  <path
                    d="M 0 190 Q 100 180 200 160 T 400 130 T 600 142 L 600 220 L 0 220 Z"
                    fill="url(#chart-grad-rose)"
                  />
                  <path
                    d="M 0 190 Q 100 180 200 160 T 400 130 T 600 142"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                    strokeLinecap="round"
                  />

                  {/* Horizontal Labels */}
                  <text x="5" y="215" fill="#94a3b8" fontSize="10" className="font-semibold select-none">Monday</text>
                  <text x="145" y="215" fill="#94a3b8" fontSize="10" className="font-semibold select-none">Wednesday</text>
                  <text x="290" y="215" fill="#94a3b8" fontSize="10" className="font-semibold select-none">Friday</text>
                  <text x="440" y="215" fill="#94a3b8" fontSize="10" className="font-semibold select-none">Sunday</text>
                  <text x="560" y="215" fill="#94a3b8" fontSize="10" className="font-semibold select-none">Now</text>
                </svg>
              </div>
            </div>

            {/* Patient Queue Cards */}
            <div className="rounded-3xl border border-slate-200/60 bg-white p-6 shadow-md shadow-slate-100/50">
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Hospital Emergency Triage Queue</h2>
                  <p className="text-xs text-slate-500">Live urgent cases flagged by AI and wearable telemetry loops</p>
                </div>
                <div className="rounded-full bg-rose-50 border border-rose-100 px-3 py-1 text-xs font-bold text-rose-600 flex items-center gap-1.5">
                  <Activity size={12} className="animate-pulse" /> 4 Critical Cases
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-left text-sm text-slate-500">
                  <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="px-4 py-3 rounded-l-xl font-bold">Patient Name</th>
                      <th className="px-4 py-3 font-bold">Triage Severity</th>
                      <th className="px-4 py-3 font-bold">Telemetry Issue</th>
                      <th className="px-4 py-3 rounded-r-xl font-bold text-right">Intervention</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {queue.map((patient, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition">
                        <td className="px-4 py-4 font-bold text-slate-800">{patient.name} <span className="text-xs font-medium text-slate-400">({patient.age}y/o)</span></td>
                        <td className="px-4 py-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${patient.statusColor}`}>
                            {patient.triage}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-xs font-medium text-slate-600">{patient.issue}</td>
                        <td className="px-4 py-4 text-right">
                          <Link to="/emergency" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center justify-end gap-1">
                            Review SOS <ChevronsRight size={12} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Block: Live Resource Occupancy and Ambulance ETA map list */}
          <aside className="space-y-6">
            
            {/* Hospital Occupancy widget */}
            <div className="rounded-3xl border border-slate-200/60 bg-white p-5 shadow-sm space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Resource Occupancy</h3>
                <p className="text-xs text-slate-400">Delhi node bed & oxygen capacity stats</p>
              </div>

              <div className="space-y-3.5 mt-2">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                    <span className="flex items-center gap-1.5"><Building size={14} className="text-blue-500" /> ICU Beds Vacant</span>
                    <span>14 / 80 Available</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '82.5%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                    <span className="flex items-center gap-1.5"><Activity size={14} className="text-emerald-500" /> Ventilator Lobbies</span>
                    <span>6 / 20 Available</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '70%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                    <span className="flex items-center gap-1.5"><Heart size={14} className="text-rose-500" /> Blood Supply (O-)</span>
                    <span>45 Liters left</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '35%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Ambulance Dispatch Tracking Widget */}
            <div className="rounded-3xl bg-slate-900 p-5 text-white shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold">Ambulance Tracker</h3>
                  <p className="text-[10px] text-blue-300">Live coordinates of dispatches</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/25 text-teal-400">
                  <Truck size={16} className="animate-pulse" />
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'NODE-042', status: 'En Route', eta: '3 min', location: 'Delhi Sector-7' },
                  { id: 'NODE-111', status: 'Assigned', eta: '9 min', location: 'Noida Highway' },
                ].map((amb, idx) => (
                  <div key={idx} className="rounded-xl border border-white/5 bg-white/5 p-3.5 text-xs flex justify-between items-center">
                    <div>
                      <p className="font-bold flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-teal-400" /> {amb.id}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                        <MapPin size={10} /> {amb.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-teal-400">ETA {amb.eta}</p>
                      <p className="text-[9px] text-slate-400 uppercase mt-0.5">{amb.status}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/emergency"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2.5 text-xs font-bold transition-all text-slate-200"
              >
                Launch Command Center Map
              </Link>
            </div>

            {/* AI Diagnostics System Health Parameters */}
            <div className="rounded-3xl border border-slate-200/60 bg-white p-5 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-800">AI Clinical Orchestration</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs bg-slate-50 border border-slate-100 rounded-lg p-2.5">
                  <span className="font-medium text-slate-600">Symptom Random Forest</span>
                  <span className="font-bold text-emerald-600">97.8% (Online)</span>
                </div>
                <div className="flex items-center justify-between text-xs bg-slate-50 border border-slate-100 rounded-lg p-2.5">
                  <span className="font-medium text-slate-600">XGBoost Emergency Severity</span>
                  <span className="font-bold text-emerald-600">96.3% (Online)</span>
                </div>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
