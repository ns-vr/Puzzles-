import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Sparkles, Zap, Heart, MessageSquare } from 'lucide-react';

export const FriendCircles = ({ currentUser, onSelectUser }: { currentUser: any, onSelectUser: (user: any) => void }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch other users (excluding current user)
    const q = query(
      collection(db, 'users'),
      where('uid', '!=', currentUser.uid),
      limit(20)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    
    return unsubscribe;
  }, [currentUser.uid]);

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-display font-bold">Friend Circles</h2>
        <p className="text-white/40">Discover students with similar vibes and interests.</p>
      </header>

      {loading ? (
        <div className="flex justify-center p-20">
          <Zap className="animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {users.map((u) => (
              <motion.div
                key={u.uid}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card hover:border-primary/30 group cursor-pointer"
                onClick={() => onSelectUser(u)}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-primary/50 transition-colors">
                    <img 
                      src={u.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.uid}`} 
                      alt={u.displayName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{u.displayName}</h3>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-bold">{u.house || 'No House'}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {u.interests?.slice(0, 3).map((interest: string) => (
                    <span key={interest} className="px-2 py-1 glass rounded-full text-[8px] font-bold uppercase tracking-widest text-white/40">
                      {interest}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 glass py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                    <User size={12} /> Profile
                  </button>
                  <button className="flex-1 bg-primary/20 text-primary py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
                    <Sparkles size={12} /> Match
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
