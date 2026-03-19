import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';
import { Smile, Frown, Zap, Coffee, Map as MapIcon } from 'lucide-react';

export const MoodMap = ({ user }: { user: any }) => {
  const [moods, setMoods] = useState<any[]>([]);
  const [myMood, setMyMood] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'mood_logs'), orderBy('timestamp', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMoods(snapshot.docs.map(doc => doc.data()));
    });
    return unsubscribe;
  }, []);

  const handleMood = async (mood: string) => {
    setMyMood(mood);
    await addDoc(collection(db, 'mood_logs'), {
      uid: user.uid,
      mood,
      timestamp: serverTimestamp()
    });
  };

  const moodCounts = moods.reduce((acc: any, curr: any) => {
    acc[curr.mood] = (acc[curr.mood] || 0) + 1;
    return acc;
  }, {});

  const moodOptions = [
    { id: 'happy', icon: Smile, label: 'Happy', color: 'text-green-400' },
    { id: 'stressed', icon: Frown, label: 'Stressed', color: 'text-red-400' },
    { id: 'motivated', icon: Zap, label: 'Motivated', color: 'text-primary' },
    { id: 'tired', icon: Coffee, label: 'Tired', color: 'text-accent' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-display font-bold mb-4">How are you feeling today?</h2>
        <p className="text-white/40">Your mood helps us understand the campus vibe.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {moodOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleMood(opt.id)}
            disabled={!!myMood}
            className={`glass-card flex flex-col items-center gap-4 p-8 transition-all ${
              myMood === opt.id ? 'border-primary bg-primary/10 scale-105' : 'hover:border-white/20'
            } ${myMood && myMood !== opt.id ? 'opacity-40' : ''}`}
          >
            <opt.icon className={`w-12 h-12 ${opt.color}`} />
            <span className="font-bold uppercase tracking-widest text-xs">{opt.label}</span>
          </button>
        ))}
      </div>

      <div className="glass-card p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <MapIcon className="text-primary" />
          Campus Vibe Heatmap
        </h3>
        
        <div className="grid grid-cols-4 gap-8 h-64 items-end">
          {moodOptions.map((opt) => {
            const count = moodCounts[opt.id] || 0;
            const percentage = moods.length ? (count / moods.length) * 100 : 0;
            return (
              <div key={opt.id} className="flex flex-col items-center gap-4 h-full justify-end">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${percentage}%` }}
                  className={`w-full rounded-t-xl bg-gradient-to-t from-white/5 to-primary/40 relative group`}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    {Math.round(percentage)}%
                  </div>
                </motion.div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">{opt.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
