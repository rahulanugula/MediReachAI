import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import SymptomChecker from './pages/SymptomChecker';
import EmergencyTriage from './pages/Emergency';
import Patients from './pages/Patients';
import Reports from './pages/Reports';
import Telemedicine from './pages/Telemedicine';
import Hospitals from './pages/Hospitals';
import Settings from './pages/Settings';
import './App.css';

const AppRouter = window.location.protocol === 'file:' ? HashRouter : BrowserRouter;

function App() {
  return (
    <AppRouter>
      <div className="flex min-h-screen bg-slate-100/50 text-slate-900 overflow-hidden">
        <Sidebar aria-label="MediReach Sidebar" />
        <main className="min-w-0 flex-1 h-screen overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ai-symptom-checker" element={<SymptomChecker />} />
            <Route path="/emergency" element={<EmergencyTriage />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/telemedicine" element={<Telemedicine />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/settings" element={<Settings />} />
            <Route
              path="*"
              element={
                <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                  <div className="mb-4 rounded-full bg-amber-100 p-4 text-amber-600">
                    <ShieldAlert size={36} />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-slate-800">Page Not Found</h2>
                  <p className="text-slate-500">The page you&apos;re looking for doesn&apos;t exist yet.</p>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </AppRouter>
  );
}

export default App;
