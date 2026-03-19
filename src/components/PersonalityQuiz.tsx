import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Heart, Brain, Coffee, Music, Gamepad2 } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface QuizProps {
  uid: string;
  onComplete: (personality: any) => void;
}

export const PersonalityQuiz = ({ uid, onComplete }: QuizProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});

  const questions = [
    {
      id: 'vibe',
      question: "How do you spend your Friday nights?",
      options: [
        { label: 'Gaming with the squad', icon: Gamepad2, value: 'gamer' },
        { label: 'Vibing to music', icon: Music, value: 'music' },
        { label: 'Deep conversations', icon: Brain, value: 'thinker' },
        { label: 'Exploring campus', icon: Zap, value: 'explorer' }
      ]
    },
    {
      id: 'study',
      question: "What's your ideal study environment?",
      options: [
        { label: 'Dead silent library', value: 'silent' },
        { label: 'Cozy cafe with lo-fi', value: 'cafe' },
        { label: 'Group study session', value: 'social' },
        { label: 'Late night dorm grind', value: 'nightowl' }
      ]
    },
    {
      id: 'music',
      question: "Which genre fuels your soul?",
      options: [
        { label: 'Indie / Alt', value: 'indie' },
        { label: 'Hip Hop / R&B', value: 'hiphop' },
        { label: 'Electronic / Techno', value: 'electronic' },
        { label: 'Classical / Jazz', value: 'classical' }
      ]
    }
  ];

  const handleAnswer = async (value: string) => {
    const newAnswers = { ...answers, [questions[step].id]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      await updateDoc(doc(db, 'users', uid), {
        personality: newAnswers,
        points: 50 // Reward for completing quiz
      });
      onComplete(newAnswers);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-dark/80 backdrop-blur-md p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass-card max-w-xl w-full border-primary/20 p-10 text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
            <Heart className="animate-pulse" />
          </div>
        </div>
        
        <h2 className="text-3xl font-display font-bold mb-2">Personality Sync</h2>
        <p className="text-white/40 mb-8">Help PUZZLES find your perfect matches.</p>

        <div className="mb-8">
          <div className="flex gap-2 justify-center mb-6">
            {questions.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step ? 'w-8 bg-primary' : i < step ? 'w-4 bg-primary/40' : 'w-4 bg-white/10'
                }`} 
              />
            ))}
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3 className="text-xl font-bold mb-6">{questions[step].question}</h3>
              <div className="grid grid-cols-2 gap-4">
                {questions[step].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className="glass-card border-white/5 hover:border-primary/50 hover:bg-primary/5 p-4 text-sm font-medium transition-all"
                  >
                    {opt.icon && <opt.icon className="mx-auto mb-2 text-primary" size={20} />}
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
