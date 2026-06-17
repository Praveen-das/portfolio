import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioStore } from "../stores/usePortfolioStore";
import "./LoadingScreen.css";

import { PRELOAD_IMAGES } from "../lib/constants";

const LoadingScreen = () => {
  const { progress, setProgress, setIsLoading } = usePortfolioStore();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const totalAssets = PRELOAD_IMAGES.length + 1; // +1 for fonts

    const updateProgress = () => {
      loadedCount++;
      const newProgress = Math.round((loadedCount / totalAssets) * 100);
      setProgress(newProgress);
    };

    // Preload Images
    PRELOAD_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = updateProgress;
      img.onerror = updateProgress;
    });

    // Wait for fonts
    document.fonts.ready.then(() => {
      updateProgress();
    });

    // Minimum display time for smoothness
    const timer = setTimeout(() => {
      if (loadedCount < totalAssets) {
        // Force complete if taking too long
        setProgress(100);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [setProgress]);

  // Smooth counter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev < progress) return prev + 1;
        return prev;
      });
    }, 10);

    if (counter >= 100) {
      setTimeout(() => setIsLoading(false), 500);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [progress, counter, setIsLoading]);

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100%", 
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      <div className="loading-content">
        <div className="loading-top">
          <motion.div 
            className="loading-brand display-font"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            PRAVEEN
          </motion.div>
          <motion.div 
            className="loading-status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            INITIALIZING EXPERIENCE
          </motion.div>
        </div>

        <div className="loading-center">
          <motion.div 
            className="loading-counter display-font"
            key={counter}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1 }}
          >
            {counter}%
          </motion.div>
        </div>

        <div className="loading-bottom">
          <div className="progress-bar-container">
            <motion.div 
              className="progress-bar-fill"
              initial={{ width: "0%" }}
              animate={{ width: `${counter}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className="loading-details">
            <span>© 2024 PORTFOLIO</span>
            <span>SYSTEM READY</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
