"use client";

import { motion } from "framer-motion";

const IconCards = ({ childVariants }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* X Icon */}
      <motion.a
        href="https://x.com/fikrilal"
        target="_blank"
        rel="noreferrer"
        aria-label="X"
        className="bg-slate-1100 p-6 rounded-2xl border border-slate-900 flex items-center justify-center aspect-square"
        variants={childVariants}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <img
          src="/icons/icons8-x.svg"
          alt="X"
          className="w-10 h-10" // increased size for better visibility
        />
      </motion.a>

      {/* GitHub Icon */}
      <motion.a
        href="https://github.com/fikrilal"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="bg-slate-1100 p-6 rounded-2xl border border-slate-900 flex items-center justify-center aspect-square"
        variants={childVariants}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <img
          src="/icons/github.svg"
          alt="GitHub"
          className="w-10 h-10" // increased size for better visibility
        />
      </motion.a>

      {/* LinkedIn Icon */}
      <motion.a
        href="https://linkedin.com/in/fikrilal"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        className="bg-slate-1100 p-6 rounded-2xl border border-slate-900 flex items-center justify-center aspect-square"
        variants={childVariants}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <img
          src="/icons/linkedin.svg"
          alt="LinkedIn"
          className="w-10 h-10" // increased size for better visibility
        />
      </motion.a>
    </div>
  );
};

export default IconCards;
