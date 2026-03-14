import { Lock, Unlock } from 'lucide-react';
import { motion } from 'motion/react';

interface App {
  name: string;
  icon: string;
  color: string;
}

interface AppCardProps {
  app: App;
  isUnlocked: boolean;
  delay?: number;
}

export function AppCard({ app, isUnlocked, delay = 0 }: AppCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay }}
      className={`relative rounded-2xl p-4 shadow-md transition-all ${
        isUnlocked
          ? 'border-2 border-lime-500/50 bg-gray-900 shadow-lime-500/20'
          : 'border border-gray-800 bg-gray-900/50'
      }`}
    >
      {/* App Icon */}
      <div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center text-2xl mb-3 mx-auto shadow-lg ${
          isUnlocked ? '' : 'opacity-30 grayscale'
        }`}
      >
        {app.icon}
      </div>

      {/* App Name */}
      <p
        className={`text-sm font-bold text-center ${
          isUnlocked ? 'text-white' : 'text-gray-600'
        }`}
      >
        {app.name}
      </p>

      {/* Lock/Unlock Badge */}
      <div
        className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-lg ${
          isUnlocked
            ? 'bg-lime-400 shadow-lime-500/30'
            : 'bg-gray-700'
        }`}
      >
        {isUnlocked ? (
          <Unlock className="w-4 h-4 text-gray-900" />
        ) : (
          <Lock className="w-4 h-4 text-gray-400" />
        )}
      </div>

      {/* Locked Overlay */}
      {!isUnlocked && (
        <div className="absolute inset-0 rounded-2xl bg-gray-950/30 backdrop-blur-[1px] pointer-events-none" />
      )}
    </motion.div>
  );
}