import { useState } from 'react';
import { User, Shield, Bell, Eye, Globe, Brain, HelpCircle, HardDrive, Lock, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [theme, setTheme] = useState('light');
  const [aiConfidence, setAiConfidence] = useState(85);
  const [notifications, setNotifications] = useState({
    emergency: true,
    telemed: true,
    weeklyReports: false,
    aiAlerts: true
  });

  const [profile, setProfile] = useState({
    name: 'Dr. Rahul',
    role: 'Chief Administrator & MD',
    email: 'rahul.anugula@medireach.ai',
    phone: '+91 98765 00001',
    hospital: 'MediReach Central Command, Delhi'
  });

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { id: 'profile', label: 'Doctor Profile', icon: User },
    { id: 'security', label: 'Security & Access', icon: Shield },
    { id: 'notifications', label: 'Alert Settings', icon: Bell },
    { id: 'ai', label: 'AI Preferences', icon: Brain },
    { id: 'devices', label: 'Connected Devices', icon: HardDrive }
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.08),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#f1f5f9_100%)] p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shadow-md">
              <Lock size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Configuration</p>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Control Panel Settings</h1>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[250px_1fr]">
          {/* Settings Sidebar */}
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/60'
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Settings Content Area */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-100/50">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Medical Administrator Profile</h2>
                  <p className="text-sm text-slate-500">Manage your clinician credentials and workplace metadata.</p>
                </div>

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white text-3xl shadow-lg">
                    {profile.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div>
                    <button className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition">
                      Change Photo
                    </button>
                    <p className="mt-2 text-xs text-slate-400">Accepted formats: JPG, PNG. Max size 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Designation</label>
                    <input
                      type="text"
                      value={profile.role}
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Contact Phone</label>
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Hospital Affiliation</label>
                    <input
                      type="text"
                      value={profile.hospital}
                      onChange={(e) => setProfile({ ...profile, hospital: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 flex justify-end gap-3">
                  <button className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                    Reset Changes
                  </button>
                  <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700">
                    Save Clinician Info
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Security Credentials</h2>
                  <p className="text-sm text-slate-500">Configure multi-factor authentication, cryptographic tokens, and API secret keys.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Biometric Login / Fingerprint</h4>
                      <p className="text-xs text-slate-400 mt-1">Enable biometric authentication for swift tablet logins in ambulance units.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Two-Factor Authentication (2FA)</h4>
                      <p className="text-xs text-slate-400 mt-1">Enforce OTP codes sent via email or SMS on every web login.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Local Data Encryption</h4>
                      <p className="text-xs text-slate-400 mt-1">Encrypt offline patient lists stored within browser storage using AES-GCM.</p>
                    </div>
                    <span className="rounded-full bg-emerald-50 text-emerald-600 px-3 py-1 text-xs font-bold">Active (AES-256)</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Alert Routing Parameters</h2>
                  <p className="text-sm text-slate-500">Choose which situations trigger real-time desktop, audio, or SMS alerts.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Critical Patient SOS Alerts</h4>
                      <p className="text-xs text-slate-400 mt-1">Receive high-volume sound triggers for ambulance dispatches.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={notifications.emergency} onChange={() => handleNotificationChange('emergency')} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Teleconsultation Invitations</h4>
                      <p className="text-xs text-slate-400 mt-1">Trigger banner popups when patients log into critical WebRTC lobbies.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={notifications.telemed} onChange={() => handleNotificationChange('telemed')} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">AI Diagnostic Anomalies</h4>
                      <p className="text-xs text-slate-400 mt-1">Flag vital checker predictions that fall below target confidence percentages.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={notifications.aiAlerts} onChange={() => handleNotificationChange('aiAlerts')} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'ai' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-900">AI Engine Orchestration</h2>
                  <p className="text-sm text-slate-500">Fine-tune confidence filters and matching models for clinical summaries.</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between text-sm font-bold text-slate-700 mb-2">
                      <span>Minimum Prediction Confidence Threshold</span>
                      <span className="text-blue-600">{aiConfidence}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="99"
                      value={aiConfidence}
                      onChange={(e) => setAiConfidence(parseInt(e.target.value, 10))}
                      className="w-full accent-blue-600 h-2 bg-slate-150 rounded-lg appearance-none cursor-pointer"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">Diagnoses below this accuracy score will require mandatory physical inspection.</p>
                  </div>

                  <div className="border-t border-slate-100 pt-5">
                    <h3 className="text-sm font-bold text-slate-800 mb-3">Model Routing Profiles</h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-blue-500/20 bg-blue-50/20 p-3.5 flex gap-3 text-left">
                        <div className="text-blue-600"><Cpu size={20} /></div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">Random Forest Triage</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">Optimized for low-bandwidth cellular devices.</p>
                        </div>
                      </div>
                      <div className="rounded-xl border border-slate-200 p-3.5 flex gap-3 text-left">
                        <div className="text-slate-400"><Cpu size={20} /></div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">Transformer-XL RAG</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">Requires broadband backend server connection.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'devices' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Clinical IoT Devices</h2>
                  <p className="text-sm text-slate-500">Monitor external medical hubs, smartwatches, and local sync routers.</p>
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'SOS Smartwatch Sync Module', model: 'Apple Watch Series 9 BLE', status: 'Connected', signal: 'Good' },
                    { name: 'Local Offline Router Hub', model: 'TP-Link Deca M4 Offline Node', status: 'Connected', signal: 'Good' },
                    { name: 'Portable ECG Patch', model: 'AliveCor BioECG v3', status: 'Searching...', signal: 'None' }
                  ].map((dev, idx) => (
                    <div key={idx} className="flex items-center justify-between border border-slate-100 rounded-2xl p-4 bg-slate-50/50">
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">{dev.name}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Hardware: {dev.model}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        dev.status === 'Connected' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600 animate-pulse'
                      }`}>{dev.status}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
