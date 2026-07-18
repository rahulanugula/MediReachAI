import { useState } from 'react';
import {
  MessageSquare,
  Mic,
  MicOff,
  Monitor,
  PhoneOff,
  Video,
  VideoOff,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const PATIENT = {
  id: '#4928',
  name: 'Emily Davis',
  risk: 'Medium - Viral Infection',
  spo2: '96%',
  temp: '101.4 F',
};

const INITIAL_MESSAGES = [
  { from: 'patient', text: 'Good evening Doctor, I have been having headaches since morning.' },
  { from: 'doctor', text: 'I see. Any fever or nausea along with the headache?' },
  { from: 'patient', text: 'Mild fever, around 100 F. No nausea.' },
];

export default function Telemedicine() {
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [callEnded, setCallEnded] = useState(false);
  const [showPrescription, setShowPrescription] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [prescription, setPrescription] = useState('');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [draft, setDraft] = useState('');

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { from: 'doctor', text }]);
    setDraft('');
  };

  if (callEnded) {
    return (
      <div className="flex h-full min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.10),_transparent_25%),linear-gradient(180deg,_#eff6ff_0%,_#dbeafe_100%)] p-8">
        <div className="w-full max-w-xl rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-[0_30px_80px_rgba(30,41,59,0.14)]">
          <div className="mx-auto mb-5 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <PhoneOff size={30} />
          </div>
          <h2 className="text-3xl font-black text-slate-900">Consultation Ended</h2>
          <p className="mt-3 text-slate-500">
            Consultation {PATIENT.id} has been closed and the session summary has been saved.
          </p>
          <button
            onClick={() => setCallEnded(false)}
            className="mt-6 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Rejoin Consultation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.10),_transparent_24%),linear-gradient(180deg,_#eff6ff_0%,_#dbeafe_100%)] px-4 py-5 sm:px-6 lg:px-7 xl:px-8">
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-5">
          <div className="flex items-center gap-3 text-slate-900">
            <Video size={24} className="text-indigo-500" />
            <h1 className="text-3xl font-black tracking-tight">Tele-Consultation</h1>
          </div>
          <p className="mt-2 text-sm text-slate-500">WebRTC powered virtual consultations and prescription sharing.</p>
        </header>

        <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-slate-950 shadow-[0_35px_90px_rgba(15,23,42,0.20)]">
          <div className="grid min-h-[720px] grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px]">
            <section className="relative flex min-h-[500px] flex-col bg-[#090f1d]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.18),_transparent_22%),linear-gradient(180deg,_rgba(9,15,29,0.96)_0%,_rgba(7,12,24,1)_100%)]" />

              {!cameraOn && (
                <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                  <div className="text-center">
                    <VideoOff size={46} className="mx-auto mb-3 opacity-60" />
                    <p className="text-sm">Camera is turned off</p>
                  </div>
                </div>
              )}

              {cameraOn && (
                <div className="absolute inset-0 opacity-[0.14] bg-[linear-gradient(0deg,transparent_24%,rgba(148,163,184,0.12)_25%,rgba(148,163,184,0.12)_26%,transparent_27%,transparent_74%,rgba(148,163,184,0.12)_75%,rgba(148,163,184,0.12)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(148,163,184,0.12)_25%,rgba(148,163,184,0.12)_26%,transparent_27%,transparent_74%,rgba(148,163,184,0.12)_75%,rgba(148,163,184,0.12)_76%,transparent_77%,transparent)] bg-[length:72px_72px]" />
              )}

              <div className="relative z-10 flex flex-1 flex-col justify-between p-6">
                <div className="flex justify-end">
                  <div className="relative h-40 w-32 overflow-hidden rounded-2xl border-2 border-indigo-500/60 bg-slate-800 shadow-xl shadow-indigo-500/20 sm:h-44 sm:w-36">
                    <img
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80"
                      alt="Doctor preview"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-1 text-[11px] font-bold text-white">
                      You
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 pb-4">
                  <button
                    onClick={() => setMicOn((value) => !value)}
                    className={`flex h-14 w-14 items-center justify-center rounded-full border text-white transition ${
                      micOn ? 'border-slate-700 bg-slate-800 hover:bg-slate-700' : 'border-rose-500/50 bg-rose-600 hover:bg-rose-700'
                    }`}
                    title={micOn ? 'Mute microphone' : 'Unmute microphone'}
                  >
                    {micOn ? <Mic size={20} /> : <MicOff size={20} />}
                  </button>

                  <button
                    onClick={() => setCameraOn((value) => !value)}
                    className={`flex h-14 w-14 items-center justify-center rounded-full border text-white transition ${
                      cameraOn ? 'border-slate-700 bg-slate-800 hover:bg-slate-700' : 'border-slate-700 bg-slate-700 hover:bg-slate-600'
                    }`}
                    title={cameraOn ? 'Turn camera off' : 'Turn camera on'}
                  >
                    {cameraOn ? <Video size={20} /> : <VideoOff size={20} />}
                  </button>

                  <button
                    onClick={() => setCallEnded(true)}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-600/30 transition hover:bg-red-700"
                    title="End call"
                  >
                    <PhoneOff size={24} />
                  </button>

                  <button
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-white transition hover:bg-slate-700"
                    title="Share screen"
                  >
                    <Monitor size={20} />
                  </button>

                  <button
                    onClick={() => setShowChat(true)}
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-white transition hover:bg-slate-700"
                    title="Open chat"
                  >
                    <MessageSquare size={20} />
                  </button>
                </div>
              </div>
            </section>

            <aside className="flex flex-col border-t border-slate-800 bg-[#1a2237] text-white xl:border-l xl:border-t-0">
              <div className="border-b border-white/8 px-5 py-5">
                <h2 className="text-2xl font-bold">Patient Details</h2>
                <p className="mt-1 text-sm text-indigo-200">Consultation {PATIENT.id}</p>
              </div>

              <div className="flex flex-1 flex-col px-5 py-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Name</p>
                  <p className="mt-2 text-2xl font-bold text-white">{PATIENT.name}</p>
                </div>

                <div className="mt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">AI Predicted Risk</p>
                  <p className="mt-2 text-lg font-bold text-amber-300">{PATIENT.risk}</p>
                </div>

                <div className="mt-6 rounded-2xl bg-white/8 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">Recorded Vitals</p>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-slate-400">SpO2</p>
                      <p className="mt-1 font-semibold text-white">{PATIENT.spo2}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Temp</p>
                      <p className="mt-1 font-semibold text-amber-300">{PATIENT.temp}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1" />

                <button
                  onClick={() => setShowPrescription(true)}
                  className="mt-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-900/35 transition hover:from-indigo-500 hover:to-violet-500"
                >
                  Write Prescription
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPrescription && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={(event) => event.target === event.currentTarget && setShowPrescription(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Write Prescription</h3>
                  <p className="mt-1 text-sm text-slate-500">Patient: {PATIENT.name} | Consultation {PATIENT.id}</p>
                </div>
                <button onClick={() => setShowPrescription(false)} className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                  <X size={18} />
                </button>
              </div>

              <textarea
                rows={8}
                value={prescription}
                onChange={(event) => setPrescription(event.target.value)}
                placeholder="Tab. Paracetamol 500mg - 1-0-1 for 5 days&#10;Hydration and rest&#10;Review if fever persists beyond 48 hours"
                className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => setShowPrescription(false)}
                  className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowPrescription(false)}
                  className="flex-1 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Save & Send
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end bg-black/25 backdrop-blur-[2px]"
            onClick={(event) => event.target === event.currentTarget && setShowChat(false)}
          >
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              className="flex h-full w-full max-w-sm flex-col border-l border-slate-200 bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Consultation Chat</p>
                  <p className="text-xs text-slate-400">{PATIENT.name} | {PATIENT.id}</p>
                </div>
                <button onClick={() => setShowChat(false)} className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                {messages.map((message, index) => (
                  <div key={`${message.from}-${index}`} className={`flex ${message.from === 'doctor' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        message.from === 'doctor'
                          ? 'rounded-br-sm bg-indigo-600 text-white'
                          : 'rounded-bl-sm bg-slate-100 text-slate-700'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 p-4">
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                  <input
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!draft.trim()}
                    className="rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Send
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

