"use client";

import { motion } from "framer-motion";
import Button from "./Button";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="
        flex flex-col items-start
    
        transition-colors duration-300
      "
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Center a max-width container, but keep text left-aligned */}
      <div className="max-w-6xl w-full mx-auto pt-20 sm:pt-24 lg:pt-52 pb-24 sm:pb-24 lg:pb-40 px-4 sm:px-6 lg:px-8">
        {/* Role */}
        <motion.p
          className="text-sm font-mono text-slate-300 tracking-wide uppercase mb-4 mt-16"
          variants={childVariants}
        >
          MOBILE ENGINEER • UX DESIGNER
        </motion.p>

        {/* Title */}
        <motion.h1
          className="
            text-4xl md:text-6xl font-semibold text-slate-100
            leading-[1.2] sm:!leading-tight max-w-4xl
          "
          variants={childVariants}
        >
          Hi, I’m Fikril—a Mobile Engineer based in Jakarta, Indonesia
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="
            mt-3 sm:mt-4 lg:mt-5
            text-base sm:text-base md:text-xl text-slate-500
            max-w-4xl leading-[1.6] sm:!leading-[1.8]
          "
          variants={childVariants}
        >
          I love building apps and crafting designs that people actually enjoy
          using. Whether it’s coding something cool or tweaking pixels to
          perfection, I’m all about turning ideas into reality.
        </motion.p>

        {/* Call-to-Actions */}
        <motion.div
          className="
            mt-4 sm:mt-8 lg:mt-10 flex flex-col md:flex-row gap-4
            pb-4 w-full justify-start
          "
          variants={childVariants}
        >
          <Button
            onClick={() =>
              (window.location.href = "mailto:fikrildev@gmail.com")
            }
          >
            Contact Me
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
