import { useState, useEffect } from 'react';
import { UserView } from './components/user-view';
import { GuardianView } from './components/guardian-view';
import { Toaster, toast } from 'sonner';

export default function App() {
  const [mode, setMode] = useState<'user' | 'guardian'>('user');
  const [timeLeft, setTimeLeft] = useState(0); // minutes
  const [unlockedApps, setUnlockedApps] = useState<string[]>([]);
  const [dailyPassword, setDailyPassword] = useState('');
  const [timeGranted, setTimeGranted] = useState(0);
  const [hasRequest, setHasRequest] = useState(false);
  const [isInJail, setIsInJail] = useState(false);
  const [jailTimeLeft, setJailTimeLeft] = useState(0); // minutes in jail

  // Generate daily password
  useEffect(() => {
    const generatePassword = () => {
      const adjectives = ['VIBE', 'CHILL', 'CALM', 'MOON', 'STAR', 'COOL'];
      const numbers = Math.floor(Math.random() * 100);
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      return `${adj}${numbers}`;
    };
    setDailyPassword(generatePassword());
  }, []);

  // Simulate time countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setUnlockedApps([]);
            toast.error('Time\'s up! Apps locked again 🔒', {
              description: 'Ask your Time Keeper for more time',
            });
            return 0;
          }
          return prev - 1;
        });
      }, 60000); // Every minute

      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  // Simulate jail time countdown
  useEffect(() => {
    if (isInJail && jailTimeLeft > 0) {
      const interval = setInterval(() => {
        setJailTimeLeft((prev) => {
          if (prev <= 1) {
            setIsInJail(false);
            toast.success('Jail time is over! You are free to request access again 🎉', {
              description: 'Ask your Time Keeper for more time',
            });
            return 0;
          }
          return prev - 1;
        });
      }, 60000); // Every minute

      return () => clearInterval(interval);
    }
  }, [isInJail, jailTimeLeft]);

  const handleUnlockApps = () => {
    const newTime = 30; // Grant 30 minutes
    setTimeLeft(newTime);
    setTimeGranted(newTime);
    setUnlockedApps([
      'Instagram',
      'TikTok',
      'Twitter',
      'YouTube',
      'Snapchat',
      'Reddit',
    ]);
    setHasRequest(false);
    toast.success('Apps unlocked! 🎉', {
      description: `${newTime} minutes granted`,
    });
  };

  const handleRequestAccess = () => {
    if (!hasRequest) {
      toast.info('Request sent! 📬', {
        description: 'Your Time Keeper has been notified',
      });
      setHasRequest(true);
    } else {
      toast.warning('You have already sent a request! 🛑', {
        description: 'Wait for your Time Keeper to respond',
      });
    }
  };

  const handleDenyAccess = () => {
    const jailTime = 10; // Deny access and put in jail for 10 minutes
    setJailTimeLeft(jailTime);
    setIsInJail(true);
    toast.error('Access denied! 🚫', {
      description: `You are in jail for ${jailTime} minutes`,
    });
    setHasRequest(false);
  };

  return (
    <>
      <div className="size-full">
        {mode === 'user' ? (
          <UserView
            onSwitchMode={() => setMode('guardian')}
            timeLeft={timeLeft}
            onRequestAccess={handleRequestAccess}
            unlockedApps={unlockedApps}
            isInJail={isInJail}
            jailTimeLeft={jailTimeLeft}
            hasRequest={hasRequest}
          />
        ) : (
          <GuardianView
            onSwitchMode={() => setMode('user')}
            onUnlockApps={handleUnlockApps}
            dailyPassword={dailyPassword}
            timeGranted={timeGranted}
            onDenyAccess={handleDenyAccess}
            hasRequest={hasRequest}
          />
        )}
      </div>
      <Toaster position="top-center" richColors />
    </>
  );
}