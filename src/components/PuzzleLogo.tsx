import { motion } from 'framer-motion';

export const PuzzleLogo = () => {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <motion.div
        className="absolute w-6 h-6 bg-primary rounded-sm"
        animate={{ 
          x: [-10, 0, -10],
          y: [-10, 0, -10],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-6 h-6 bg-secondary rounded-sm"
        animate={{ 
          x: [10, 0, 10],
          y: [-10, 0, -10],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-6 h-6 bg-accent rounded-sm"
        animate={{ 
          x: [-10, 0, -10],
          y: [10, 0, 10],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-6 h-6 bg-white rounded-sm"
        animate={{ 
          x: [10, 0, 10],
          y: [10, 0, 10],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};
