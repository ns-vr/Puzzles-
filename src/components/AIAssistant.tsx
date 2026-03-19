import { useState, useEffect, useRef } from 'react';
import { Send, Bot, Sparkles, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { campusAssistant } from '../services/gemini';

export const AIAssistant = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    { role: 'ai', content: "Hello! I'm your PUZZLES AI Assistant. How can I help you with campus life today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await campusAssistant(userMsg);
      setMessages(prev => [...prev, { role: 'ai', content: response || 'Sorry, I encountered an error.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', content: 'I am having trouble connecting right now.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center neon-glow">
          <Bot className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">PUZZLES Assistant</h2>
          <p className="text-sm text-white/40">Powered by Gemini 3.1 Pro</p>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 mb-6 pr-4 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'glass-card border-white/10 rounded-tl-none'
              }`}>
                <div className="flex items-center gap-2 mb-1 opacity-60 text-[10px] uppercase tracking-widest font-bold">
                  {msg.role === 'user' ? <User size={10} /> : <Bot size={10} />}
                  {msg.role === 'user' ? 'You' : 'PUZZLES AI'}
                </div>
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="glass-card border-white/10 rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
              <Sparkles className="animate-spin text-primary w-4 h-4" />
              <span className="text-sm text-white/60">Thinking...</span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about study rooms, laundry, or events..."
          className="w-full glass bg-white/5 border-white/10 rounded-2xl px-6 py-4 pr-16 focus:outline-none focus:border-primary/50 transition-all"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
        >
          <Send className="text-white w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
