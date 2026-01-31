"use client";

import { useMemo } from "react";
import { motion } from "motion/react";

// Converts ISO 8601 duration (e.g., PT36M54S) to seconds
const parseISODurationToSeconds = (isoDuration: string) => {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  if (!match) return 0;

  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);

  return hours * 3600 + minutes * 60 + seconds;
};

// Format seconds into "Xh Ym Zs"
const timeFormat = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return "Invalid time";

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  return `${h > 0 ? h + "h " : ""}${m}m ${s}s`;
};

type DisplayWatchTimeProps = {
  duration: string;
  isDarkMode: boolean;
};

export default function DisplayWatchTime({ duration, isDarkMode }: DisplayWatchTimeProps) {
  const speedTimes = useMemo(() => {
    const totalSeconds = parseISODurationToSeconds(duration);
    if (!totalSeconds) return [];

    const speeds = [0.25, 0.5, 0.75, 1.25, 1.5, 1.75, 2, 3];

    return speeds.map((speed) => ({ speed, time: timeFormat(totalSeconds / speed), }));
  }, [duration]);

  if (!duration) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
      {/* Section Header */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="mb-6 md:mb-8">
        <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: isDarkMode ? '#ffffff' : '#0a0a0a', letterSpacing: '-0.01em', }}>
          Playback Speeds
        </h3>
        <p className="text-sm md:text-base" style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)', fontFamily: 'var(--font-display)', }}>
          Choose your preferred speed to optimize your viewing time
        </p>
      </motion.div>

      {/* Speed Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {speedTimes.map(({ speed, time }, index) => (
          <motion.div key={speed} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 + index * 0.05, ease: [0.22, 1, 0.36, 1], }} whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }, }} className="group relative rounded-2xl overflow-hidden cursor-pointer" style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)', border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)', boxShadow: isDarkMode ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.05)', }}>
            {/* Hover Gradient Overlay */}
            <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: isDarkMode ? 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)' : 'linear-gradient(135deg, rgba(220, 38, 38, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)', }} />

            {/* Glow Effect */}
            <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" style={{ background: 'radial-gradient(circle at center, rgba(220, 38, 38, 0.2) 0%, transparent 70%)', }} />

            {/* Content */}
            <div className="relative z-10 p-5 md:p-6 flex flex-col items-center justify-center text-center h-full">
              {/* Speed Badge */}
              <motion.div className="mb-3 md:mb-4 px-4 py-1.5 rounded-full font-bold text-sm md:text-base transition-all duration-300" style={{backgroundColor: isDarkMode ? 'rgba(220, 38, 38, 0.15)' : 'rgba(220, 38, 38, 0.1)', color: '#dc2626', fontFamily: 'var(--font-mono)', border: isDarkMode ? '1px solid rgba(220, 38, 38, 0.3)' : '1px solid rgba(220, 38, 38, 0.2)',}}>
                {speed}×
              </motion.div>

              {/* Time Display */}
              <motion.div className="text-xl md:text-2xl font-bold mb-1" style={{fontFamily: 'var(--font-mono)', color: isDarkMode ? '#ffffff' : '#0a0a0a',}}>
                {time}
              </motion.div>

              {/* Label */}
              <motion.div className="text-xs md:text-sm font-medium opacity-60" style={{fontFamily: 'var(--font-display)', color: isDarkMode ? '#ffffff' : '#0a0a0a',}}>
                watch time
              </motion.div>

              {/* Animated Corner Accent */}
              <motion.div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{background: 'linear-gradient(135deg, transparent 0%, rgba(220, 38, 38, 0.2) 100%)', borderBottomLeftRadius: '100%',}}/>
            </div>

            {/* Bottom Border Accent */}
            <motion.div className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{background: 'linear-gradient(90deg, #dc2626 0%, #06b6d4 100%)',}}/>
          </motion.div>
        ))}
      </div>

      {/* Helper Text */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.2 }} className="mt-8 text-center">
        <p className="text-xs md:text-sm" style={{color: isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)', fontFamily: 'var(--font-display)',}}>
          Times are calculated based on the original video duration
        </p>
      </motion.div>
    </motion.div>
  );
}