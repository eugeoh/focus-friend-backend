import { Shield, Key, Clock, TrendingDown, Award, Bell, CheckCircle, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { useState } from 'react';

interface GuardianViewProps {
  onSwitchMode: () => void;
  onUnlockApps: () => void;
  dailyPassword: string;
  timeGranted: number;
  onDenyAccess: () => void;
  hasRequest: boolean;
}

export function GuardianView({
  onSwitchMode,
  onUnlockApps,
  dailyPassword,
  timeGranted,
  onDenyAccess,
  hasRequest,
}: GuardianViewProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = () => {
    setUnlocked(true);
    onUnlockApps();
    setTimeout(() => setUnlocked(false), 2000);
  };

  const stats = [
    { label: 'Streak', value: '12 days', icon: Award, color: 'text-yellow-400' },
    { label: 'Time Saved', value: '4.5 hrs', icon: Clock, color: 'text-lime-400' },
    { label: 'Screen Time', value: '-32%', icon: TrendingDown, color: 'text-green-400' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-violet-950">
      {/* Header */}
      <div className="bg-gray-900/50 border-b border-gray-800 backdrop-blur-sm">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-yellow-500/30"
            >
              🔑
            </motion.div>
            <div>
              <h1 className="font-bold text-lg text-white">Time Keeper</h1>
              <p className="text-xs text-gray-400">guardian mode</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onSwitchMode}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            User Mode
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Welcome Card */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-6 shadow-xl shadow-yellow-500/20"
        >
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-gray-900" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Hey Time Keeper!</h2>
              <p className="text-sm text-gray-800">being a good influence ✨</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 rounded-2xl p-4 border border-gray-800 text-center"
            >
              <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
              <div className="font-bold text-lg text-white">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Access Request Notification */}
        {hasRequest && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-orange-900/30 rounded-3xl p-6 border-2 border-orange-500/50 shadow-xl shadow-orange-500/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-6 h-6 text-orange-400" />
              <h3 className="font-bold text-lg text-white">Access Request</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              They say they need it... do they tho? 🤔
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleUnlock}
                className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-bold h-12 rounded-2xl shadow-lg shadow-lime-500/20"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Approve
              </Button>
              <Button
                onClick={onDenyAccess}
                className="bg-red-500 hover:bg-red-600 text-white font-bold h-12 rounded-2xl shadow-lg shadow-red-500/20"
              >
                <XCircle className="w-5 h-5 mr-2" />
                Send to Jail
              </Button>
            </div>
          </motion.div>
        )}

        {/* Unlock Section */}
        <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Key className="w-5 h-5 text-lime-400" />
            <h3 className="font-bold text-white">Grant Access</h3>
          </div>

          {/* Button Unlock */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400 mb-3">
                They say they need it... do they tho? 🤔
              </p>
              <Button
                onClick={handleUnlock}
                disabled={unlocked}
                className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 h-14 text-base font-bold rounded-2xl shadow-lg shadow-lime-500/20"
              >
                {unlocked ? (
                  <span className="flex items-center gap-2">
                    ✅ Unlocked!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    🔓 Unlock Apps
                  </span>
                )}
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-gray-900 px-2 text-gray-500">or</span>
              </div>
            </div>

            {/* Daily Password */}
            <div>
              <p className="text-sm text-gray-400 mb-2">
                Share today's password
              </p>
              <div className="relative">
                <div
                  className="bg-gray-800 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-750 transition-colors border border-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <div className="text-2xl font-mono font-bold tracking-wider text-lime-400">
                    {showPassword ? dailyPassword : '••••••'}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {showPassword ? 'tap to hide' : 'tap to reveal'}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Changes daily at midnight 🌙
              </p>
            </div>
          </div>
        </div>

        {/* Time Granted */}
        {timeGranted > 0 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-lime-500/10 rounded-2xl p-4 border border-lime-500/30"
          >
            <p className="text-sm text-lime-400 text-center">
              <span className="font-bold">✨ {timeGranted} minutes</span> granted
              today
            </p>
          </motion.div>
        )}

        {/* Guardian Tips */}
        <div className="bg-yellow-500/10 rounded-2xl p-4 border border-yellow-500/30">
          <p className="text-sm text-yellow-300">
            <span className="font-bold">keeper wisdom:</span> make them work for it.
            build character or whatever the boomers say 👴
          </p>
        </div>
      </div>
    </div>
  );
}