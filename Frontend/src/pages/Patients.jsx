import { useState, useEffect } from 'react';
import { Users, Search, Filter, Plus, FileText, QrCode, X, Loader2, Trash2, Heart, Shield, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

const STATUS_CLASSES = {
  Synced: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  Offline: 'bg-slate-100 text-slate-600 border-slate-200',
  Pending: 'bg-amber-50 text-amber-600 border-amber-200',
};

const STATUS_DOT_CLASSES = {
  Synced: 'bg-emerald-500',
  Offline: 'bg-slate-400',
  Pending: 'bg-amber-500 animate-pulse',
};

const EMPTY_FORM = {
  name: '', age: '', gender: 'Male', phone: '',
  bloodGroup: 'A+', primaryRisk: '', address: '',
};

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchPatients = async (q = '') => {
    try {
      const params = q ? { search: q } : {};
      const { data } = await api.get('/patients', { params });
      setPatients(data);
    } catch (e) {
      console.error('Failed to load patients:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // debounced search
  useEffect(() => {
    const t = setTimeout(() => fetchPatients(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const handleField = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.age) {
      setError('Name and age are required.');
      return;
    }
    setSaving(true);
    try {
      const { data } = await api.post('/patients', { ...form, age: parseInt(form.age, 10) });
      setPatients((prev) => [data, ...prev]);
      setShowModal(false);
      setForm(EMPTY_FORM);
    } catch (error) {
      console.error('Failed to save patient:', error);
      setError('Could not save patient. Is the backend running on port 8080?');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this patient from the registry?')) return;
    await api.delete(`/patients/${id}`);
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.06),_transparent_32%),linear-gradient(180deg,_#f8fafc_0%,_#f1f5f9_100%)] p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Header toolbar */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-md">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Medical Records</p>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Patient Registry</h1>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <Database size={13} className="text-emerald-500" />
                {patients.length} total synced database profiles
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center text-sm transition active:scale-95 gap-2"
          >
            <Plus size={16} /> Register Patient
          </button>
        </header>

        {/* Database grid & table */}
        <div className="bg-white rounded-3xl border border-slate-200/60 overflow-hidden shadow-xl shadow-slate-100/50 flex flex-col">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 bg-slate-50/50">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by patient moniker or MRN code..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-2xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2.5 bg-white border border-slate-200/80 text-slate-650 font-bold rounded-2xl hover:bg-slate-50 flex items-center text-xs transition">
                <Filter size={14} className="mr-2" /> Filters
              </button>
              <button className="px-4 py-2.5 bg-white border border-slate-200/80 text-slate-650 font-bold rounded-2xl hover:bg-slate-50 flex items-center text-xs transition">
                <QrCode size={14} className="mr-2" /> Scan QR Link
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
                <Loader2 className="animate-spin text-blue-500" size={28} />
                <span className="text-sm font-semibold">Syncing MediReach database...</span>
              </div>
            ) : (
              <table className="w-full text-left text-sm text-slate-650">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[10px] uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-bold">Patient Moniker</th>
                    <th className="px-6 py-4 font-bold">Biometrics</th>
                    <th className="px-6 py-4 font-bold">Latest Visit</th>
                    <th className="px-6 py-4 font-bold">Primary Risk Factor</th>
                    <th className="px-6 py-4 font-bold">Database Node</th>
                    <th className="px-6 py-4 font-bold text-right rounded-r-xl">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {patients.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-20 text-center text-slate-400">
                        No medical records located. Let&apos;s register a patient today.
                      </td>
                    </tr>
                  ) : (
                    patients.map((p, i) => (
                      <motion.tr
                        key={p.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hover:bg-slate-50/50 transition"
                      >
                        <td className="px-6 py-4 flex items-center">
                          <div className="w-10 h-10 rounded-xl overflow-hidden mr-3.5 flex-shrink-0 bg-blue-50 text-blue-600 font-bold flex items-center justify-center border border-blue-100">
                            {p.name.split(' ').map(n=>n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{p.name}</p>
                            <p className="text-[10px] font-mono text-slate-400 mt-0.5">{p.mrn}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs font-semibold text-slate-800">{p.age} y/o | {p.gender}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Blood: {p.bloodGroup || 'A+'}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs text-slate-550 font-medium">{p.lastVisit || 'Today'}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200/50 font-medium">{p.primaryRisk || 'General Admission'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${STATUS_CLASSES[p.status] || STATUS_CLASSES.Pending}`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${STATUS_DOT_CLASSES[p.status] || STATUS_DOT_CLASSES.Pending}`} />
                            {p.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button title="View Records" className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-xl transition">
                              <FileText size={15} />
                            </button>
                            <button title="Delete" onClick={() => handleDelete(p.id)} className="text-rose-450 hover:text-rose-600 p-2 hover:bg-rose-50 rounded-xl transition">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Modern register Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl p-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Register Patient Record</h2>
                  <p className="text-xs text-slate-400 mt-1">This record seeds local and cloud nodes automatically.</p>
                </div>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700 transition">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Full Name *</label>
                    <input name="name" value={form.name} onChange={handleField} placeholder="e.g. Priya Singh"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-bold">Age *</label>
                    <input type="number" name="age" value={form.age} onChange={handleField} min="0" max="150"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Gender</label>
                    <select name="gender" value={form.gender} onChange={handleField}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Contact Phone</label>
                    <input name="phone" value={form.phone} onChange={handleField} placeholder="+91 98765 00000"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Blood Type</label>
                    <select name="bloodGroup" value={form.bloodGroup} onChange={handleField}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                      {BLOOD_GROUPS.map((bg) => <option key={bg}>{bg}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Clinical Risk / Primary Diagnosis</label>
                    <input name="primaryRisk" value={form.primaryRisk} onChange={handleField} placeholder="e.g. Hypertension, Cardiovascular risks"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-bold">Residential Address</label>
                    <input name="address" value={form.address} onChange={handleField} placeholder="Street, City"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                </div>

                {error && <p className="text-rose-500 text-xs bg-rose-50 border border-rose-100 rounded-2xl px-3.5 py-3 font-semibold">{error}</p>}

                <div className="flex gap-4 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setShowModal(false)}
                    className="flex-1 py-3 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition text-sm">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold rounded-2xl transition text-sm flex items-center justify-center">
                    {saving ? <><Loader2 className="animate-spin mr-2" size={16} /> Syncing...</> : 'Confirm Registration'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
