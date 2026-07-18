import { useState, useEffect } from 'react';
import { ClipboardList, Download, FileText, FlaskConical, Loader2, Pill, Plus, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

const TYPE_ICONS = {
  'Lab Report': FlaskConical,
  'Prescription': Pill,
  'Discharge Summary': ClipboardList,
};
const STATUS_STYLES = {
  Final: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  Draft: 'bg-slate-100 text-slate-600',
};
const REPORT_TYPES = ['Lab Report', 'Prescription', 'Discharge Summary'];

const EMPTY_FORM = { patientId: '', patientName: '', mrn: '', type: 'Lab Report', doctor: '', status: 'Pending' };

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.get('/reports'), api.get('/patients')])
      .then(([reportsResponse, patientsResponse]) => {
        setReports(reportsResponse.data);
        setPatients(patientsResponse.data);
      })
      .catch((e) => console.error('Reports fetch error:', e))
      .finally(() => setLoading(false));
  }, []);

  const handleField = (e) => {
    const { name, value } = e.target;

    if (name === 'patientId') {
      const selectedPatient = patients.find((patient) => String(patient.id) === value);
      setForm((prev) => ({
        ...prev,
        patientId: value,
        patientName: selectedPatient?.name ?? '',
        mrn: selectedPatient?.mrn ?? '',
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.patientName.trim() || !form.doctor.trim()) {
      setError('Patient name and doctor are required.');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        patientName: form.patientName,
        mrn: form.mrn,
        type: form.type,
        doctor: form.doctor,
        status: form.status,
      };
      const { data } = await api.post('/reports', payload);
      setReports((prev) => [data, ...prev]);
      setShowModal(false);
      setForm(EMPTY_FORM);
    } catch (error) {
      console.error('Failed to create report:', error);
      setError('Failed to create report. Is the backend running?');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this report?')) return;
    await api.delete(`/reports/${id}`);
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  const fmtDate = (iso) => {
    if (!iso) return '-';
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center">
            <FileText className="mr-3 text-violet-600" size={30} />
            Medical Reports
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            {reports.length} records | Lab reports, prescriptions, discharge summaries
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2.5 rounded-xl font-semibold shadow-md shadow-violet-500/20 flex items-center text-sm transition"
        >
          <Plus className="mr-2" size={18} /> New Report
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-40 text-slate-400">
              <Loader2 className="animate-spin mr-2" size={20} /> Loading reports...
            </div>
          ) : (
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-white sticky top-0 border-b border-slate-200 z-10">
                <tr>
                  <th className="px-6 py-3 font-semibold text-slate-700">Report Type</th>
                  <th className="px-6 py-3 font-semibold text-slate-700">Patient</th>
                  <th className="px-6 py-3 font-semibold text-slate-700">Ordered By</th>
                  <th className="px-6 py-3 font-semibold text-slate-700">Date</th>
                  <th className="px-6 py-3 font-semibold text-slate-700">Status</th>
                  <th className="px-6 py-3 font-semibold text-slate-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-slate-400">No reports found.</td>
                  </tr>
                ) : (
                  reports.map((r, i) => (
                    <motion.tr
                      key={r.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="border-b border-slate-100 hover:bg-slate-50 transition"
                    >
                      <td className="px-6 py-4 font-medium text-slate-800">
                        {(() => {
                          const TypeIcon = TYPE_ICONS[r.type] || FileText;
                          return <TypeIcon size={16} className="mr-2 inline text-violet-500" />;
                        })()}
                        {r.type}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-800">{r.patientName}</p>
                        <p className="text-xs text-slate-400">{r.mrn}</p>
                      </td>
                      <td className="px-6 py-4">{r.doctor}</td>
                      <td className="px-6 py-4 text-slate-500">{fmtDate(r.createdAt)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[r.status] || 'bg-slate-100 text-slate-600'}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-1">
                        <button title="Download" className="text-violet-500 hover:text-violet-700 p-2 hover:bg-violet-50 rounded-lg transition">
                          <Download size={15} />
                        </button>
                        <button title="Delete" onClick={() => handleDelete(r.id)} className="text-rose-400 hover:text-rose-600 p-2 hover:bg-rose-50 rounded-lg transition">
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Create Report Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-slate-800">New Medical Report</h2>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700">
                  <X size={22} />
                </button>
              </div>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Linked Patient</label>
                  <select
                    name="patientId"
                    value={form.patientId}
                    onChange={handleField}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                  >
                    <option value="">Select from registry</option>
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name} ({patient.mrn})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Patient Name *</label>
                  <input name="patientName" value={form.patientName} onChange={handleField}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">MRN</label>
                  <input name="mrn" value={form.mrn} onChange={handleField} placeholder="MRN-1001"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Report Type</label>
                  <select name="type" value={form.type} onChange={handleField}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400">
                    {REPORT_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Ordered By *</label>
                  <input name="doctor" value={form.doctor} onChange={handleField} placeholder="Dr. Rahul"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Status</label>
                  <select name="status" value={form.status} onChange={handleField}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400">
                    <option>Pending</option>
                    <option>Final</option>
                    <option>Draft</option>
                  </select>
                </div>
                {error && <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => setShowModal(false)}
                    className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 text-sm transition">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving}
                    className="flex-1 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-semibold rounded-xl text-sm transition flex items-center justify-center">
                    {saving ? <><Loader2 className="animate-spin mr-2" size={16} /> Saving...</> : 'Create Report'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



