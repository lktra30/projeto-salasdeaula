'use client';

import { useEffect, useState } from 'react';
import { isCacheValid } from '@/lib/cache';

export function CacheStatus() {
  const [isValid, setIsValid] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const updateStatus = () => {
      const valid = isCacheValid();
      setIsValid(valid);
      
      if (valid && typeof window !== 'undefined') {
        const cached = localStorage.getItem('salas-vox2you-cache');
        if (cached) {
          const data = JSON.parse(cached);
          const elapsed = Date.now() - data.timestamp;
          const remaining = (15 * 60 * 1000) - elapsed; // 15 min em ms
          const minutes = Math.floor(remaining / (60 * 1000));
          const seconds = Math.floor((remaining % (60 * 1000)) / 1000);
          setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        }
      } else {
        setTimeLeft('');
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 1000);

    return () => clearInterval(interval);
  }, [isHydrated]);

  if (!isHydrated || !isValid) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gradient-to-r from-yellow-500 to-cyan-500 text-white px-3 py-2 rounded-lg text-xs font-medium shadow-lg">
      Cache: {timeLeft}
    </div>
  );
}