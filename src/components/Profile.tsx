import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Award, Zap, Heart, Settings, LogOut, Sparkles, ArrowLeft, Loader2 } from 'lucide-react';
import { auth } from '../firebase';
import { getSocialMatch } from '../services/gemini';

interface ProfileProps {
  profile: any;
  currentUserProfile?: any;
  onBack?: () => void;
}

export const Profile = ({ profile, currentUserProfile, onBack }: ProfileProps) => {
  const [matching, setMatching] = useState(false);
  const [matchResult, setMatchResult] = useState<{ percentage: number; reason: string } | null>(null);

  const isOwnProfile = !currentUserProfile || profile.uid === currentUserProfile.uid;

  const handleMatch = async () => {
    if (!currentUserProfile || matching) return;
    setMatching(true);
    try {
      const result = await getSocialMatch(currentUserProfile, profile);
      setMatchResult(result);
    } catch (error) {
      console.error('Matching error:', error);
    } finally {
      setMatching(false);
    }
  };

  const handleStartConversation = () => {
    // This would typically navigate to a chat or AI assistant
    // For now, we'll just show a console log or we could pass a prop to App.tsx
    console.log('Starting conversation with', profile.displayName);
    // If we had a global state or prop for navigation, we'd use it here
    alert(`Starting a new Friend Circle chat with ${profile.displayName}! This feature is coming in the next update.`);
  };

  const badges = [
    { id: '1', name: 'Early Adopter', icon: Zap, color: 'text-accent' },
    { id: '2', name: 'Social Butterfly', icon: Heart, color: 'text-primary' },
    { id: '3', name: 'Study Guru', icon: Award, color: 'text-secondary' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {onBack && (
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-4 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Circles</span>
        </button>
      )}

      <div className="glass-card p-10 flex flex-col md:flex-row items-center gap-8 border-primary/20 relative overflow-hidden">
        {!isOwnProfile && (
          <div className="absolute top-0 right-0 p-4">
            <div className="glass px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary border-primary/20">
              Student Profile
            </div>
          </div>
        )}

        <div className="relative">
          <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-primary/20 neon-glow">
            <img 
              src={profile?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.uid}`} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-xl flex items-center justify-center border-4 border-bg-dark">
            <Zap size={16} className="text-white fill-current" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl font-display font-bold mb-2">{profile?.displayName}</h2>
          <p className="text-white/40 mb-4">{profile?.email}</p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {profile?.interests?.map((interest: string) => (
              <span key={interest} className="px-3 py-1 glass rounded-full text-[10px] font-bold uppercase tracking-widest text-white/60">
                {interest}
              </span>
            ))}
            {!profile?.interests?.length && (
              <span className="text-xs italic text-white/20">No interests added yet</span>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          {isOwnProfile ? (
            <>
              <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all">
                <Settings size={20} />
              </button>
              <button 
                onClick={() => auth.signOut()}
                className="w-12 h-12 glass border-red-500/20 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500/10 transition-all"
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <button 
              onClick={handleMatch}
              disabled={matching}
              className="btn-primary flex items-center gap-2 px-8 relative group overflow-hidden"
            >
              <motion.div 
                className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
              />
              {matching ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
              <span className="relative z-10">Initiate Social Match</span>
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {matchResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card border-primary/40 bg-primary/5 p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-white/5"
                  />
                  <motion.circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * matchResult.percentage) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-primary"
                  />
                </svg>
                <span className="absolute text-2xl font-black font-display">{matchResult.percentage}%</span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold mb-1 flex items-center gap-2 justify-center md:justify-start">
                  <Sparkles className="text-primary" size={20} />
                  AI Compatibility Report
                </h3>
                <p className="text-primary font-bold text-sm mb-2">
                  {matchResult.percentage > 80 
                    ? "You're a fantastic match!" 
                    : matchResult.percentage >= 60 
                    ? "Good synergy detected!" 
                    : "Potential for growth here!"}
                </p>
                <p className="text-white/80 leading-relaxed italic">"{matchResult.reason}"</p>
              </div>
              <button 
                onClick={handleStartConversation}
                className="glass-card py-3 px-6 border-white/10 hover:border-primary/50 transition-all text-xs font-bold uppercase tracking-widest"
              >
                Start Conversation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Award className="text-primary" />
            Achievements
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {badges.map((badge) => (
              <div key={badge.id} className="flex flex-col items-center gap-2 p-4 glass bg-white/5 rounded-2xl border-white/5">
                <badge.icon className={`w-8 h-8 ${badge.color}`} />
                <span className="text-[8px] font-bold uppercase tracking-widest text-center">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Zap className="text-accent" />
            Stats
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/60">Puzzle Points</span>
                <span className="font-bold text-accent">{profile?.points || 0}</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="w-[40%] h-full bg-accent" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 glass bg-white/5 rounded-xl">
                <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Communities</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="p-4 glass bg-white/5 rounded-xl">
                <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Sessions</p>
                <p className="text-2xl font-bold">48</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
