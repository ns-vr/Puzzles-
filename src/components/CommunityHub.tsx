import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Music, Users, Plus, MessageSquare, Play, Zap } from 'lucide-react';

export const CommunityHub = ({ user }: { user: any }) => {
  const [activeCategory, setActiveCategory] = useState<'gaming' | 'music' | 'social'>('gaming');
  const [communities, setCommunities] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'communities'), where('category', '==', activeCategory));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCommunities(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, [activeCategory]);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    await addDoc(collection(db, 'communities'), {
      name: newName,
      category: activeCategory,
      createdBy: user.uid,
      createdAt: serverTimestamp(),
      members: [user.uid]
    });
    setNewName('');
    setIsCreating(false);
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div className="flex gap-4">
          {[
            { id: 'gaming', icon: Gamepad2, label: 'Gaming' },
            { id: 'music', icon: Music, label: 'Music' },
            { id: 'social', icon: Users, label: 'Social' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${
                activeCategory === cat.id ? 'bg-primary text-white neon-glow' : 'glass text-white/60 hover:text-white'
              }`}
            >
              <cat.icon size={18} />
              <span className="font-bold text-sm uppercase tracking-widest">{cat.label}</span>
            </button>
          ))}
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-all"
        >
          <Plus size={20} />
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {communities.map((comm) => (
            <motion.div
              key={comm.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card hover:border-primary/30 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  {activeCategory === 'gaming' ? <Gamepad2 /> : activeCategory === 'music' ? <Music /> : <Users />}
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-bg-dark bg-white/10" />
                  ))}
                  <div className="w-6 h-6 rounded-full border-2 border-bg-dark bg-primary flex items-center justify-center text-[8px] font-bold">
                    +{comm.members?.length || 0}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{comm.name}</h3>
              <p className="text-sm text-white/40 mb-6 line-clamp-2">
                Join the ultimate {activeCategory} community on campus. Host sessions and make friends!
              </p>
              <div className="flex gap-2">
                <button className="flex-1 glass py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  <MessageSquare size={14} /> Chat
                </button>
                <button className="flex-1 bg-primary py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2">
                  <Play size={14} /> Join
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-dark/80 backdrop-blur-sm p-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card max-w-md w-full p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Create {activeCategory} Server</h3>
            <input 
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Server Name"
              className="w-full glass bg-white/5 border-white/10 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:border-primary"
            />
            <div className="flex gap-4">
              <button onClick={() => setIsCreating(false)} className="flex-1 glass py-3 rounded-xl font-bold">Cancel</button>
              <button onClick={handleCreate} className="flex-1 bg-primary py-3 rounded-xl font-bold neon-glow">Create</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
