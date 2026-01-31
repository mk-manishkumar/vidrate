"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaMoon, FaSun } from "react-icons/fa";

type DayNightModeProps = {
  isDarkMode?: boolean;
  setIsDarkMode?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DayNightMode({ isDarkMode, setIsDarkMode }: DayNightModeProps) {
  // Fallback to internal state if not provided
  const [internalDarkMode, setInternalDarkMode] = useState(true);

  const darkMode = isDarkMode ?? internalDarkMode;
  const toggleMode = setIsDarkMode ?? setInternalDarkMode;

  useEffect(() => {
    if (isDarkMode === undefined) document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode, isDarkMode]);

  return (
    <motion.button onClick={() => toggleMode((prev) => !prev)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative p-3 rounded-xl transition-all duration-300 group cursor-pointer" style={{ backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)', border: darkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.08)', }} aria-label="Toggle theme mode">
      {/* Glow Effect */}
      <motion.div className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: darkMode ? 'radial-gradient(circle at center, rgba(245, 158, 11, 0.3) 0%, transparent 70%)' : 'radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 70%)', }} />

      {/* Icon Container */}
      <div className="relative z-10 w-6 h-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {darkMode ? (
            <motion.div key="sun" initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
              <FaSun className="text-2xl transition-colors duration-300" style={{ color: '#f59e0b', filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))', }} />
            </motion.div>
          ) : (
            <motion.div key="moon" initial={{ rotate: 90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
              <FaMoon className="text-2xl transition-colors duration-300" style={{ color: '#3b82f6', filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))', }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tooltip */}
      <motion.div initial={{ opacity: 0, y: 10 }} whileHover={{ opacity: 1, y: 0 }} className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium pointer-events-none" style={{ backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.8)', color: darkMode ? '#ffffff' : '#ffffff', backdropFilter: 'blur(12px)', }}>
        {darkMode ? 'Switch to Light' : 'Switch to Dark'}
      </motion.div>
    </motion.button>
  );
}