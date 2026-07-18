import { AlertTriangle, MapPin, Phone, Radio, Activity, Clock, Heart, Users, ShieldAlert, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function EmergencyTriage() {
  const [secondsLeft, setSecondsLeft] = useState(134);

  // live Countdown for ETA
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 134));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const incidents = [
    { type: 'Cardiac Arrest', loc: 'Downtown Market', id: 'NODE-042', eta: '2 min', status: 'En Route', desc: 'Chest pain, irregular BPM pulse detected' },
    { type: 'Severe Asthma Stroke', loc: 'Highway 4 Intersection', id: 'NODE-092', eta: '5 min', status: 'Dispatched', desc: 'SpO2 level drop to 84%' },
    { type: 'Road Accident Trauma', loc: 'Sector 7 Residential', id: 'NODE-118', eta: '7 min', status: 'Dispatched', desc: 'Fracture & blood loss' }
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(239,68,68,0.06),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#f1f5f9_100%)] p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Header Ribbon */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 shadow-md">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-rose-600">Disaster Command Center</p>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Emergency Dispatch & Triage</h1>
            </div>
          </div>

          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-red-500/20 flex items-center justify-center transition active:scale-95 text-sm gap-2">
            <Radio className="animate-pulse" size={16} /> Broadcast Disaster Alert
          </button>
        </header>

        {/* Live status alert banner */}
        <div className="bg-rose-500 text-white rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center gap-4 border border-rose-600 shadow-md shadow-rose-950/10">
          <ShieldAlert size={26} className="animate-bounce flex-shrink-0" />
          <div className="text-center sm:text-left flex-1">
            <h4 className="text-sm font-extrabold">Active Red Alert Broadcast</h4>
            <p className="text-xs text-rose-100 mt-0.5">High priority telemetry sync active across Noida and Delhi Hub networks.</p>
          </div>
          <span className="rounded-full bg-white/20 border border-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-wider">
            3 Active Dispatches
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 items-start">
          
          {/* Incidents Queue Panel */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-800 text-sm">Priority SOS Queue</h3>
                <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-100">
                  Critical
                </span>
              </div>

              <div className="space-y-3">
                {incidents.map((incident, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl relative overflow-hidden group hover:bg-white hover:shadow-md transition cursor-pointer"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-red-500" />
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-slate-800">{incident.type}</h4>
                      <span className="font-mono text-[9px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-105">
                        {incident.id}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                      <MapPin size={11} /> {incident.loc}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1 font-medium">{incident.desc}</p>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-200/20 pt-2.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-rose-500">{incident.status}</span>
                      <span className="text-xs font-black text-slate-800">ETA {incident.eta}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Emergency Contacts Panel */}
            <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-lg space-y-4">
              <h3 className="text-sm font-bold">Quick Dispatch Directory</h3>
              <div className="space-y-2">
                {[
                  { name: 'Dr. Vikram (Trauma)', phone: '+91 99999 12345' },
                  { name: 'Noida Ambulance Center', phone: '0120-4567890' },
                  { name: 'Emergency Cardiac Unit', phone: '+91 88888 77777' }
                ].map((c, i) => (
                  <div key={i} className="flex justify-between items-center text-xs p-2.5 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition">
                    <span className="font-medium text-slate-350">{c.name}</span>
                    <a href={`tel:${c.phone}`} className="font-bold text-teal-400 flex items-center gap-1 hover:underline">
                      <Phone size={10} /> Call
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Incident Telemetry Detail View */}
          <div className="space-y-6">
            
            {/* Center Console Map Dashboard */}
            <div className="rounded-3xl border border-slate-200/60 bg-white p-6 shadow-xl shadow-slate-100/50">
              
              {/* Telemetry Header */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5 mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                    <Activity size={20} className="animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Incident #8492 — Active Triage Dispatch</h2>
                    <p className="text-xs text-slate-400 mt-0.5">En route to Downtown Market • Smartwatch Sync Node active</p>
                  </div>
                </div>
                
                <div className="text-center sm:text-right">
                  <p className="text-3xl font-black text-rose-500 tracking-tight">{formatTime(secondsLeft)}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Real-Time Dispatch ETA</p>
                </div>
              </div>

              {/* Paramedic & Patients Vital Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                
                {/* Vitals Telemetry */}
                <div className="bg-slate-950 text-white rounded-2xl p-4 relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-28 h-28 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
                  <p className="text-[9px] font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1">
                    <Cpu size={12} className="text-rose-500 animate-pulse" /> Smartwatch Telemetry Feed (Live)
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                      <p className="text-[10px] text-slate-400 font-medium">BPM / Heart Pulse</p>
                      <h4 className="text-xl font-black text-rose-400 mt-1 flex items-end gap-1">
                        145 <span className="text-[11px] font-normal text-slate-400">BPM</span>
                      </h4>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                      <p className="text-[10px] text-slate-400 font-medium">Blood Oxygen Level</p>
                      <h4 className="text-xl font-black text-blue-400 mt-1 flex items-end gap-1">
                        88% <span className="text-[11px] font-normal text-slate-400">SpO2</span>
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Paramedic Driver contact details */}
                <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col justify-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Assigned Responder</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                      <Phone size={14} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Paramedic: Raj Kumar</h4>
                      <p className="text-xs text-slate-500 mt-0.5">+91 98765 43210 (Node-042)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ECG Heatbeat Graphical representation */}
              <div className="bg-slate-950 rounded-2xl p-4 mb-6 border border-slate-800/80">
                <p className="text-[9px] font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5Packed">
                  <Heart size={10} className="text-rose-500" /> Patient Simulated ECG Loop
                </p>
                <div className="h-16 w-full opacity-70">
                  <svg className="h-full w-full" viewBox="0 0 400 60" preserveAspectRatio="none">
                    <path
                      d="M 0 30 L 80 30 L 90 10 L 95 50 L 100 30 L 105 30 L 115 15 L 120 40 L 125 30 L 250 30 L 260 5 L 265 55 L 270 30 L 275 30 L 280 20 L 285 38 L 290 30 L 400 30"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-slate-900 hover:bg-slate-850 text-white font-bold py-3 rounded-2xl transition text-sm">
                  View Full Medical History
                </button>
                <button className="flex-1 border-2 border-slate-200 text-slate-700 font-bold py-3 rounded-2xl hover:bg-slate-50 transition text-sm">
                  Prepare ICU Bed & Ventilator
                </button>
              </div>
            </div>

            {/* Noida Regional Bed Occupancy stats map preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Delhi General ICU Beds', pct: '88% Full', val: '64/70', color: 'bg-rose-500' },
                { label: 'O2 Concentrator stock', pct: '92% Filled', val: '400L', color: 'bg-emerald-500' },
                { label: 'Trauma Ward Vacancies', pct: '2 Available', val: '2/12', color: 'bg-blue-500' },
              ].map((ward, idx) => (
                <div key={idx} className="bg-white border border-slate-200/60 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{ward.label}</span>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">{ward.val}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{ward.pct}</p>
                    </div>
                    <div className="h-6 w-1 rounded-full overflow-hidden bg-slate-100">
                      <div className={`h-full ${ward.color}`} style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
