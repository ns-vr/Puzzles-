import { Home, Users, Gamepad2, Music, UserCircle, Bot, Search, WashingMachine, Map as MapIcon, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { PuzzleLogo } from './PuzzleLogo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'community', icon: Users, label: 'Community' },
    { id: 'gaming', icon: Gamepad2, label: 'Gaming Servers' },
    { id: 'music', icon: Music, label: 'Music Jam' },
    { id: 'circles', icon: UserCircle, label: 'Friend Circles' },
    { id: 'ai', icon: Bot, label: 'AI Assistant' },
    { id: 'study', icon: Search, label: 'Study Finder' },
    { id: 'laundry', icon: WashingMachine, label: 'Laundry Tracker' },
    { id: 'mood', icon: MapIcon, label: 'MoodMap' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="w-64 glass h-screen flex flex-col p-4 border-r border-white/10">
      <div className="flex items-center gap-3 mb-10 px-2">
        <PuzzleLogo />
        <h1 className="text-2xl font-display font-bold tracking-tighter text-white">
          PUZZLES
        </h1>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-primary text-white neon-glow' 
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : 'text-white/60 group-hover:text-white'}`} />
            <span className="font-medium">{item.label}</span>
            {activeTab === item.id && (
              <motion.div
                layoutId="active-nav"
                className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
              />
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto p-4 glass-card bg-white/5 border-white/5">
        <p className="text-xs text-white/40 mb-1 uppercase tracking-widest font-bold">Campus Status</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-white/80">All systems online</span>
        </div>
      </div>
    </div>
  );
};
