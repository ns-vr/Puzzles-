import { useState, useEffect } from 'react';
import { auth, db, googleProvider } from './firebase';
import { signInWithPopup, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { Sidebar } from './components/Sidebar';
import { AIAssistant } from './components/AIAssistant';
import { CommunityHub } from './components/CommunityHub';
import { MoodMap } from './components/MoodMap';
import { PersonalityQuiz } from './components/PersonalityQuiz';
import { StudyFinder } from './components/StudyFinder';
import { LaundryTracker } from './components/LaundryTracker';
import { Profile } from './components/Profile';
import { FriendCircles } from './components/FriendCircles';
import { motion, AnimatePresence } from 'framer-motion';
import { PuzzleLogo } from './components/PuzzleLogo';
import { Sparkles, Zap, Users, Map as MapIcon, WashingMachine, Search, Gamepad2, Music } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [viewingUser, setViewingUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const docRef = doc(db, 'users', u.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          const newProfile = {
            uid: u.uid,
            displayName: u.displayName,
            email: u.email,
            photoURL: u.photoURL,
            interests: [],
            points: 0,
            badges: [],
            house: 'Unassigned',
            personality: null
          };
          await setDoc(docRef, newProfile);
          setProfile(newProfile);
          setShowQuiz(true);
        } else {
          const data = docSnap.data();
          setProfile(data);
          if (!data.personality) setShowQuiz(true);
        }
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectUser = (u: any) => {
    setViewingUser(u);
    setActiveTab('view-profile');
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-bg-dark">
        <PuzzleLogo />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-bg-dark p-6 overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full"
              initial={{ x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
              animate={{ 
                y: [null, Math.random() * 100 + '%'],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: Math.random() * 10 + 5, repeat: Infinity }}
            />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="z-10 text-center"
        >
          <div className="flex justify-center mb-8">
            <PuzzleLogo />
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-4 bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">
            PUZZLES
          </h1>
          <p className="text-xl text-white/60 mb-12 max-w-md mx-auto">
            Every student is a piece. <span className="text-primary font-bold">PUZZLES</span> brings them together.
          </p>
          <button 
            onClick={handleLogin}
            className="btn-primary flex items-center gap-3 mx-auto text-lg"
          >
            <Zap className="w-5 h-5 fill-current" />
            Connect with Campus Email
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-bg-dark overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto p-8 relative">
        {showQuiz && (
          <PersonalityQuiz 
            uid={user.uid} 
            onComplete={(p) => {
              setProfile((prev: any) => ({ ...prev, personality: p }));
              setShowQuiz(false);
            }} 
          />
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {activeTab === 'home' && <Dashboard profile={profile} />}
            {activeTab === 'ai' && <AIAssistant />}
            {activeTab === 'community' && <CommunityHub user={user} />}
            {activeTab === 'gaming' && <CommunityHub user={user} />}
            {activeTab === 'music' && <CommunityHub user={user} />}
            {activeTab === 'circles' && <FriendCircles currentUser={user} onSelectUser={handleSelectUser} />}
            {activeTab === 'study' && <StudyFinder />}
            {activeTab === 'laundry' && <LaundryTracker />}
            {activeTab === 'mood' && <MoodMap user={user} />}
            {activeTab === 'profile' && <Profile profile={profile} />}
            {activeTab === 'view-profile' && (
              <Profile 
                profile={viewingUser} 
                currentUserProfile={profile} 
                onBack={() => setActiveTab('circles')} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

const Dashboard = ({ profile }: { profile: any }) => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-display font-bold mb-2">
            Welcome back, <span className="text-primary">{profile?.displayName?.split(' ')[0]}</span>
          </h2>
          <p className="text-white/40">You have <span className="text-accent font-bold">{profile?.points || 0}</span> Puzzle Points today.</p>
        </div>
        <div className="flex gap-4">
          <div className="glass-card py-2 px-4 flex items-center gap-2">
            <Sparkles className="text-accent w-4 h-4" />
            <span className="text-sm font-bold">87% Match with Alex</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card col-span-full bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Zap className="text-primary w-5 h-5" />
              AI Recommendations
            </h3>
            <div className="space-y-3">
              <div className="p-3 glass bg-white/5 rounded-xl flex items-center justify-between">
                <span>Join "Indie Rock" Music Jam</span>
                <button className="text-xs font-bold text-primary uppercase tracking-widest">Join</button>
              </div>
              <div className="p-3 glass bg-white/5 rounded-xl flex items-center justify-between">
                <span>Quiet spot at Level 4 Library</span>
                <button className="text-xs font-bold text-accent uppercase tracking-widest">View</button>
              </div>
            </div>
          </div>

          <div className="glass-card">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Gamepad2 className="text-accent w-5 h-5" />
              Active Servers
            </h3>
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/5 rounded-lg border border-white/10" />
                  <div className="flex-1">
                    <p className="text-sm font-bold">Valorant Night</p>
                    <p className="text-[10px] text-white/40">8/10 Players</p>
                  </div>
                  <button className="w-8 h-8 glass rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                    <Zap size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <WashingMachine className="text-primary w-5 h-5" />
              Laundry Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Washer 04</span>
                <span className="text-xs text-green-500 font-bold">Available</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Washer 07</span>
                <span className="text-xs text-primary font-bold">12m left</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <MapIcon className="text-secondary w-5 h-5" />
              Campus Mood
            </h3>
            <div className="h-32 flex items-end gap-2 px-2">
              {[40, 70, 45, 90, 30].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: h + '%' }}
                  className="flex-1 bg-gradient-to-t from-secondary to-primary rounded-t-sm"
                />
              ))}
            </div>
            <p className="text-center text-[10px] mt-4 text-white/40 uppercase tracking-widest">Mostly Motivated</p>
          </div>

          <div className="glass-card border-accent/20">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Search className="text-accent w-5 h-5" />
              Study Spots
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Main Library</span>
                <span className="text-accent">85% Full</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlaceholderSection = ({ title, icon: Icon }: { title: string; icon: any }) => (
  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
    <div className="w-20 h-20 glass-card flex items-center justify-center border-primary/20 neon-glow">
      <Icon className="w-10 h-10 text-primary" />
    </div>
    <h2 className="text-3xl font-display font-bold">{title}</h2>
    <p className="text-white/40 max-w-md">
      This section is currently being calibrated for your campus. 
      Check back soon for the full experience!
    </p>
  </div>
);
