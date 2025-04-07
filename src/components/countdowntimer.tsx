'use client';

import { useEffect, useState } from 'react';

export default function CountdownTimer() {
  const launchDate = new Date('2025-04-14T09:00:00Z'); // GMT time

  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeRemaining> | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  function getTimeRemaining() {
    const total = launchDate.getTime() - new Date().getTime();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return { total, days, hours, minutes, seconds };
  }

  useEffect(() => {
    setHasMounted(true); // avoid hydration mismatch

    const interval = setInterval(() => {
      const remaining = getTimeRemaining();
      setTimeLeft(remaining);

      if (remaining.total <= 0) {
        setIsVisible(false);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!hasMounted || !isVisible || timeLeft === null) return null;

  return (
    <section className="text-center py-10 text-white">
      <h1 className="text-4xl sm:text-5xl font-bold text-white- tracking-widest">LUMEN DEI</h1>
      <p className="uppercase text-sm sm:text-base text-white/80 mt-2 mb-6 tracking-wider">
        Official Launch Countdown
      </p>
      <div className="flex justify-center space-x-4 sm:space-x-6 font-bold text-4xl sm:text-5xl text-white">
        <TimeBlock label="Days" value={timeLeft.days} />
        <TimeBlock label="Hours" value={timeLeft.hours} />
        <TimeBlock label="Minutes" value={timeLeft.minutes} />
        <TimeBlock label="Seconds" value={timeLeft.seconds} />
      </div>
    </section>
  );
}

function TimeBlock({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="leading-none">{value.toString().padStart(2, '0')}</div>
      <div className="text-xs sm:text-sm uppercase tracking-wider mt-1 text-white/80">{label}</div>
    </div>
  );
}
