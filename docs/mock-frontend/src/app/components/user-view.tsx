import { Lock, Clock, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { AppCard } from './app-card';
import { motion } from 'motion/react';

interface UserViewProps {
  onSwitchMode: () => void;
  timeLeft: number;
  onRequestAccess: () => void;
  unlockedApps: string[];
  isInJail: boolean;
  jailTimeLeft: number;
  hasRequest: boolean;
}

export function UserView({ onSwitchMode, timeLeft, onRequestAccess, unlockedApps, isInJail, jailTimeLeft, hasRequest }: UserViewProps) {
  const lockedApps = [
    { name: 'Instagram', icon: '📸', color: 'from-pink-500 to-purple-600' },
    { name: 'TikTok', icon: '🎵', color: 'from-cyan-400 to-blue-600' },
    { name: 'Twitter', icon: '🐦', color: 'from-blue-400 to-blue-600' },
    { name: 'YouTube', icon: '▶️', color: 'from-red-500 to-red-600' },
    { name: 'Snapchat', icon: '👻', color: 'from-yellow-400 to-yellow-500' },
    { name: 'Reddit', icon: '🔴', color: 'from-orange-500 to-orange-600' },
  ];

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-violet-950">
      {/* Header */}
      <div className="bg-gray-900/50 border-b border-gray-800 backdrop-blur-sm">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              className="w-10 h-10 bg-gradient-to-br from-lime-400 to-green-500 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-lime-500/30"
            >
              🔐
            </motion.div>
            <div>
              <h1 className="font-bold text-lg text-white">LockMeIn</h1>
              <p className="text-xs text-gray-400">user mode</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onSwitchMode}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            Guardian Mode
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Time Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-900 rounded-3xl p-6 shadow-xl border border-gray-800"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-5 h-5" />
              <span className="font-medium">Time Remaining</span>
            </div>
            {timeLeft <= 15 && timeLeft > 0 && (
              <span className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full font-medium border border-red-500/30">
                running out!
              </span>
            )}
          </div>
          <div className="text-5xl font-bold text-yellow-400">
            {formatTime(timeLeft)}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {timeLeft > 0 ? 'make it count ✨' : 'all locked up for today 🔒'}
          </p>
        </motion.div>

        {/* Request Access */}
        {timeLeft === 0 && !isInJail && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-gray-900 rounded-3xl p-6 border border-gray-800"
          >
            <div className="flex items-center gap-3 mb-3">
              <MessageCircle className="w-6 h-6 text-lime-400" />
              <h3 className="font-bold text-lg text-white">Need more time?</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Ask your Time Keeper to unlock your apps
            </p>
            <Button
              onClick={onRequestAccess}
              disabled={hasRequest}
              className="w-full bg-lime-400 text-gray-900 hover:bg-lime-500 font-bold h-12 rounded-2xl shadow-lg shadow-lime-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {hasRequest ? 'Request Pending... ⏳' : 'Request Access 🙏'}
            </Button>
          </motion.div>
        )}

        {/* Jail Warning */}
        {isInJail && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-red-900/30 rounded-3xl p-6 border-2 border-red-500/50 shadow-xl shadow-red-500/20"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">👮</div>
              <h3 className="font-bold text-2xl text-red-400 mb-2">You're in jail!</h3>
              <p className="text-sm text-gray-400 mb-4">
                Your Time Keeper denied your request. Time to reflect on your choices.
              </p>
              <div className="bg-gray-900 rounded-2xl p-4 border border-red-500/30">
                <div className="text-3xl font-bold text-red-400">{formatTime(jailTimeLeft)}</div>
                <p className="text-xs text-gray-500 mt-1">time left in jail</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Locked Apps */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-gray-400" />
            <h2 className="font-bold text-white">Locked Apps</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {lockedApps.map((app, index) => (
              <AppCard
                key={app.name}
                app={app}
                isUnlocked={unlockedApps.includes(app.name)}
                delay={index * 0.05}
              />
            ))}
          </div>
        </div>

        {/* Bottom Tips */}
        <div className="bg-indigo-900/30 rounded-2xl p-4 border border-indigo-800/50">
          <p className="text-sm text-indigo-200">
            <span className="font-bold">pro tip:</span> the tiktoks will still be there later.
            go touch grass 🌱
          </p>
        </div>
      </div>
    </div>
  );
}