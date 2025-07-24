import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../public/logo1.png";

const AnimatedIntro = () => {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      setShowIntro(true);

      const timer = setTimeout(() => {
        setShowIntro(false);
        localStorage.setItem("hasVisited", "true"); // mark as seen
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-[9999]"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-6xl font-bold text-primary text-center"
          >
            Welcome to
            <img src={logo} alt="" />
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedIntro;
