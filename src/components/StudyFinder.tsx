import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';
import { Search, MapPin, Users, Volume2 } from 'lucide-react';

export const StudyFinder = () => {
  const [spots, setSpots] = useState<any[]>([
    { id: '1', name: 'Main Library L4', occupancy: 85, noise: 'quiet', lat: 40, lng: 30 },
    { id: '2', name: 'Science Hub', occupancy: 40, noise: 'moderate', lat: 60, lng: 70 },
    { id: '3', name: 'Student Lounge', occupancy: 95, noise: 'loud', lat: 20, lng: 50 },
    { id: '4', name: 'Engineering Hall', occupancy: 20, noise: 'quiet', lat: 80, lng: 20 }
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-display font-bold">Study Finder</h2>
          <p className="text-white/40">Find the perfect spot for your grind.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-white/40">
            <div className="w-3 h-3 rounded-full bg-primary/40" /> Busy
          </div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-white/40">
            <div className="w-3 h-3 rounded-full bg-accent/40" /> Quiet
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card h-[500px] relative overflow-hidden p-0 border-white/5">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 border-2 border-white/5 grid grid-cols-6 grid-rows-6">
              {[...Array(36)].map((_, i) => (
                <div key={i} className="border border-white/5" />
              ))}
            </div>
          </div>

          {/* Heatmap Points */}
          {spots.map((spot) => (
            <motion.div
              key={spot.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute cursor-pointer group"
              style={{ top: `${spot.lat}%`, left: `${spot.lng}%` }}
            >
              <div className={`w-16 h-16 rounded-full blur-xl animate-pulse ${
                spot.occupancy > 70 ? 'bg-primary/40' : 'bg-accent/40'
              }`} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 glass border-white/40 rounded-full flex items-center justify-center">
                <div className={`w-1.5 h-1.5 rounded-full ${spot.occupancy > 70 ? 'bg-primary' : 'bg-accent'}`} />
              </div>
              
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="glass-card p-3 whitespace-nowrap border-white/20">
                  <p className="text-xs font-bold">{spot.name}</p>
                  <p className="text-[10px] text-white/60">{spot.occupancy}% Occupied</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Top Recommendations</h3>
          {spots.sort((a, b) => a.occupancy - b.occupancy).map((spot) => (
            <div key={spot.id} className="glass-card hover:border-accent/40 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold">{spot.name}</h4>
                <div className={`px-2 py-1 rounded text-[8px] font-bold uppercase tracking-widest ${
                  spot.noise === 'quiet' ? 'bg-accent/20 text-accent' : 'bg-white/5 text-white/40'
                }`}>
                  {spot.noise}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] text-white/60">
                  <span>Occupancy</span>
                  <span>{spot.occupancy}%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${spot.occupancy}%` }}
                    className={`h-full ${spot.occupancy > 70 ? 'bg-primary' : 'bg-accent'}`} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
