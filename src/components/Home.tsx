"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import axios from "axios";
import DayNightMode from "@/components/DayNightMode";
import DisplayWatchTime from "@/components/DisplayWatchTime";

// ========== Convert ISO 8601 to HH:MM:SS ==========
const isoDurationToHHMMSS = (isoDuration: string | null) => {
  if (!isoDuration) return null;

  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return null;

  const hours = match[1] ? parseInt(match[1].replace("H", ""), 10) : 0;
  const minutes = match[2] ? parseInt(match[2].replace("M", ""), 10) : 0;
  const seconds = match[3] ? parseInt(match[3].replace("S", ""), 10) : 0;

  const pad = (num: number) => String(num).padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

type VideoDetails = {
  title: string;
  thumbnail: string;
  duration: string;
};

export default function Home() {
  const [link, setLink] = useState("");
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  // ========== SUBMIT HANDLER ==========
  const handleSubmit = async (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    if (!link.trim() || isSubmitting) return;

    setError("");
    setVideoDetails(null);
    setIsSubmitting(true);

    try {
      const response = await axios.get("/api/video-fetching", {
        params: { url: link },
      });

      setVideoDetails({
        title: response.data.title,
        thumbnail: response.data.thumbnail,
        duration: response.data.duration,
      });

      setLink("");
    } catch (error: any) {
      if (error.response) setError(error.response.data?.error || "Failed to fetch video details.");
      else if (error.request) setError("No response from server. Please try again.");
      else setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden transition-colors duration-700" style={{ backgroundColor: isDarkMode ? '#0a0a0a' : '#fafafa', }}>
      {/* Animated Background Gradient Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: isDarkMode ? 0.4 : 0.3 }} transition={{ duration: 1.2 }} className="absolute inset-0" style={{
          background: isDarkMode
            ? 'radial-gradient(circle at 20% 30%, rgba(220, 38, 38, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 30%, rgba(220, 38, 38, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.06) 0%, transparent 50%)',
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 15s ease infinite',
        }} />

        {/* Floating orbs */}
        <motion.div animate={{ y: [0, -30, 0], x: [0, 20, 0], }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: isDarkMode ? 'radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%)', }} />

        <motion.div animate={{ y: [0, 30, 0], x: [0, -20, 0], }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: isDarkMode ? 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)', }} />
      </div>

      {/* =========== HEADER =========== */}
      <motion.header initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 px-8 md:px-16 py-6 flex justify-between items-center backdrop-blur-sm" style={{ borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)', }}>
        <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3">
          <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
            <i className="fa-brands fa-youtube text-3xl md:text-4xl text-cinematic-red" style={{ filter: 'drop-shadow(0 0 20px rgba(220, 38, 38, 0.4))', }} />
          </motion.div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)', color: isDarkMode ? '#ffffff' : '#0a0a0a' }}>
            Vidrate
          </h1>
        </motion.div>

        <DayNightMode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </motion.header>

      {/* =========== MAIN CONTENT =========== */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-12 md:py-20 relative z-10">
        <div className="w-full max-w-5xl mx-auto">
          {/* Hero Section */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-12 md:mb-16">
            <motion.h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight" style={{ fontFamily: 'var(--font-display)', color: isDarkMode ? '#ffffff' : '#0a0a0a', letterSpacing: '-0.02em', }}>
              Calculate Your
              <br />
              <span className="relative inline-block" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', }}>
                Watch Time
              </span>
            </motion.h2>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-base md:text-xl max-w-2xl mx-auto" style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)', fontFamily: 'var(--font-display)', fontWeight: 400, }}>
              Discover how long it takes to watch any YouTube video at different playback speeds
            </motion.p>
          </motion.div>

          {/* Input Section */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-stretch max-w-3xl mx-auto">
              <motion.input whileFocus={{ scale: 1.01 }} type="search" placeholder="Paste YouTube URL here..." value={link} onChange={(e) => setLink(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)} className="flex-1 px-6 py-4 md:py-5 text-base md:text-lg rounded-2xl outline-none border-2 transition-all duration-300 font-medium" style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)', borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)', color: isDarkMode ? '#ffffff' : '#0a0a0a', fontFamily: 'var(--font-display)' }} />

              <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(220, 38, 38, 0.4)' }} whileTap={{ scale: 0.98 }} onClick={handleSubmit} disabled={isSubmitting} className="px-8 md:px-12 py-4 md:py-5 text-base md:text-lg font-semibold rounded-2xl transition-all duration-300 relative overflow-hidden" style={{ backgroundColor: '#dc2626', color: '#ffffff', fontFamily: 'var(--font-display)', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
                <span className="relative z-10">
                  {isSubmitting ? 'Loading...' : 'Analyze'}
                </span>
                <motion.div className="absolute inset-0 bg-linear-to-r from-cinematic-red to-cinematic-red-hover" initial={{ x: '-100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
              </motion.button>
            </div>

            {/* Error Message */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-4 text-center">
                  <p className="text-cinematic-red text-sm md:text-base font-medium">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Video Details */}
          <AnimatePresence mode="wait">
            {videoDetails && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="max-w-4xl mx-auto">
                {/* Video Card */}
                <motion.div className="rounded-3xl overflow-hidden mb-8 md:mb-12 relative" style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)', border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)', boxShadow: isDarkMode ? '0 20px 60px -15px rgba(0, 0, 0, 0.5)' : '0 20px 60px -15px rgba(0, 0, 0, 0.1)' }}>
                  <div className="grid md:grid-cols-5 gap-6 md:gap-8 p-6 md:p-8">
                    {/* Thumbnail */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="md:col-span-2">
                      <div className="relative rounded-xl overflow-hidden aspect-video">
                        <img src={videoDetails.thumbnail} alt={videoDetails.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                      </div>
                    </motion.div>

                    {/* Details */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="md:col-span-3 flex flex-col justify-center">
                      <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 line-clamp-2" style={{ fontFamily: 'var(--font-display)', color: isDarkMode ? '#ffffff' : '#0a0a0a', }}>
                        {videoDetails.title}
                      </h3>

                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="px-4 py-2 rounded-full text-sm md:text-base font-mono font-bold" style={{ backgroundColor: isDarkMode ? 'rgba(220, 38, 38, 0.15)' : 'rgba(220, 38, 38, 0.1)', color: '#dc2626', fontFamily: 'var(--font-mono)', }}>
                          {isoDurationToHHMMSS(videoDetails.duration)}
                        </div>
                        <span className="text-sm md:text-base" style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)', }}>
                          Original Duration
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* WatchTime Component */}
                <DisplayWatchTime duration={videoDetails.duration} isDarkMode={isDarkMode} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* =========== FOOTER =========== */}
      <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="relative z-10 px-4 md:px-8 py-6 md:py-8 backdrop-blur-sm" style={{ borderTop: isDarkMode ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)', }}>
        <p className="text-center text-sm md:text-base" style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)', fontFamily: 'var(--font-display)', }}>
          Crafted with{" "}
          <span className="text-cinematic-red">❤</span>{" "}
          by{" "}
          <a href="https://manishmk.netlify.app" target="_blank" rel="noopener noreferrer" className="font-semibold transition-colors duration-300 hover:text-cinematic-red" style={{ color: isDarkMode ? '#06b6d4' : '#0369a1', }}>
            Manish Kumar
          </a>
          {" "}· © 2026
        </p>
      </motion.footer>
    </div>
  );
}