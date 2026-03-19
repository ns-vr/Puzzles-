import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WashingMachine, Clock, AlertCircle, CheckCircle2, Zap } from 'lucide-react';

export const LaundryTracker = () => {
  const [machines, setMachines] = useState([
    { id: 'W01', type: 'washer', status: 'in-use', time: 12, house: 'North Hall' },
    { id: 'W02', type: 'washer', status: 'available', time: 0, house: 'North Hall' },
    { id: 'W03', type: 'washer', status: 'broken', time: 0, house: 'North Hall' },
    { id: 'D01', type: 'dryer', status: 'in-use', time: 24, house: 'North Hall' },
    { id: 'D02', type: 'dryer', status: 'available', time: 0, house: 'North Hall' },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-display font-bold">Laundry Tracker</h2>
          <p className="text-white/40">Real-time status of North Hall laundry room.</p>
        </div>
        <div className="glass-card py-2 px-4 flex items-center gap-2 border-primary/20">
          <Zap className="text-primary w-4 h-4" />
          <span className="text-xs font-bold">Avg. Wait: 8 mins</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {machines.map((m) => (
          <motion.div
            key={m.id}
            whileHover={{ y: -5 }}
            className={`glass-card relative overflow-hidden ${
              m.status === 'available' ? 'border-green-500/20' : 
              m.status === 'broken' ? 'border-red-500/20' : 'border-primary/20'
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-xl glass ${
                m.status === 'available' ? 'text-green-500' : 
                m.status === 'broken' ? 'text-red-500' : 'text-primary'
              }`}>
                <WashingMachine size={24} />
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-white/40 block uppercase tracking-widest">{m.id}</span>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${
                  m.status === 'available' ? 'text-green-500' : 
                  m.status === 'broken' ? 'text-red-500' : 'text-primary'
                }`}>
                  {m.status}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {m.status === 'in-use' ? (
                <>
                  <div className="flex items-center gap-2 text-white/60">
                    <Clock size={14} />
                    <span className="text-sm font-medium">{m.time} mins remaining</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: '100%' }}
                      animate={{ width: '30%' }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                      className="h-full bg-primary" 
                    />
                  </div>
                </>
              ) : m.status === 'available' ? (
                <div className="flex items-center gap-2 text-green-500/60">
                  <CheckCircle2 size={14} />
                  <span className="text-sm font-medium">Ready for your load</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-500/60">
                  <AlertCircle size={14} />
                  <span className="text-sm font-medium">Maintenance required</span>
                </div>
              )}
            </div>

            {m.status === 'in-use' && (
              <button className="w-full mt-6 py-2 glass border-white/5 hover:bg-white/10 rounded-lg text-xs font-bold uppercase tracking-widest transition-all">
                Notify Me
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
