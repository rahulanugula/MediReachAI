import { AlertTriangle, Map, Navigation, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Hospitals = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center">
            <Map className="mr-3 text-emerald-600" size={32} />
            Hospital Resource Finder
          </h1>
          <p className="text-slate-500 mt-1">Geospatial mapping of nearby facilities, live bed counts, and routing.</p>
        </div>
        <div className="bg-white rounded-lg p-1.5 shadow-sm border border-slate-200 flex">
          <button className="px-4 py-1.5 text-sm font-bold bg-emerald-50 text-emerald-700 rounded-md">Map View</button>
          <button className="px-4 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-700">List View</button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        <div className="w-96 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <h2 className="font-bold text-slate-800">Nearby Facilities (3)</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {[
              { name: 'City Central Hospital', dist: '1.2 km', beds: 14, type: 'Multi-Specialty', tag: 'bg-emerald-100 text-emerald-700' },
              { name: 'Sunrise Trauma Center', dist: '3.4 km', beds: 2, type: 'Trauma & ER', tag: 'bg-orange-100 text-orange-700' },
              { name: 'Green Valley Clinic', dist: '5.1 km', beds: 0, type: 'General', tag: 'bg-rose-100 text-rose-700' }
            ].map((h, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="border border-slate-200 rounded-xl p-4 hover:border-emerald-300 hover:shadow-md transition cursor-pointer bg-white">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-800 leading-tight">{h.name}</h3>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">{h.dist}</span>
                </div>
                <p className="text-xs text-slate-500 mb-3">{h.type}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${h.tag}`}>ICU Beds: {h.beds}</span>
                  <div className="flex space-x-2 text-slate-400">
                    <Phone size={16} className="hover:text-emerald-500 transition" />
                    <Navigation size={16} className="hover:text-emerald-500 transition" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-slate-200 rounded-2xl border border-slate-300 relative overflow-hidden shadow-inner flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/osm-intl/13/2347/3142.png')] bg-cover bg-center opacity-80 filter contrast-125"></div>
          
          {/* Mock Map Markers */}
          <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="bg-emerald-500 text-white p-2 rounded-full shadow-lg shadow-emerald-500/50 mb-1 z-10"><Map size={20} /></div>
            <div className="bg-white px-2 py-1 rounded shadow text-xs font-bold text-slate-800 z-10">City Central</div>
          </div>

          <div className="absolute bottom-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="bg-orange-500 text-white p-2 rounded-full shadow-lg shadow-orange-500/50 mb-1 z-10"><AlertTriangle size={20} /></div>
            <div className="bg-white px-2 py-1 rounded shadow text-xs font-bold text-slate-800 z-10">Sunrise Trauma</div>
          </div>
          
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg border border-slate-200 pb-2">
            <p className="text-xs font-bold text-slate-500 mb-2 uppercase">Map Legend</p>
            <div className="space-y-2 text-sm text-slate-700">
              <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></span> Beds Available</div>
              <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span> Critical</div>
              <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-rose-500 mr-2"></span> Full Capacity</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hospitals;

