"use client";

import { motion } from "framer-motion";

export default function Footer() {
  // Container variants control staggering (the delay between each child anim).
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  // Child variants define how each piece of content enters
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.footer
      className="text-gray-400  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 lg:px-4 pt-20 sm:pt-24 lg:pt-32"
      // Fire the animation when the footer enters the viewport
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="bg-[#0E1012] mx-auto px-6 md:px-24 py-12 sm:py-16 lg:py-24 text-center rounded-xl w-full"
        // This <div> becomes the parent container for staggering children
        variants={containerVariants}
      >
        {/* Name */}
        <motion.h2
          className="text-2xl md:text-4xl font-semibold text-slate-200"
          variants={childVariants}
        >
          Ahmad Fikril Al Muzakki
        </motion.h2>

        {/* Message */}
        <motion.p
          className="mt-2 sm:mt-2 lg:mt-4 text-sm md:text-base max-w-2xl text-slate-400 mx-auto !leading-relaxed"
          variants={childVariants}
        >
          Thanks for stopping by! Let’s connect and create something amazing
          together! Feel free to reach out about coding, design, or just say hi.
        </motion.p>

        {/* Social Icons */}
        <motion.div
          className="mt-6 flex justify-center space-x-4"
          variants={childVariants}
        >
          <a
            href="https://github.com/fikrilal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icons/github.svg"
              alt="GitHub"
              className="w-6 h-6 md:w-8 md:h-8 hover:opacity-80 transition"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/fikrilal/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icons/linkedin.svg"
              alt="LinkedIn"
              className="w-6 h-6 md:w-8 md:h-8 hover:opacity-80 transition"
            />
          </a>
          <a href="mailto:fikrildev@gmail.com">
            <img
              src="/icons/email.svg"
              alt="Email"
              className="w-6 h-6 md:w-8 md:h-8 hover:opacity-80 transition"
            />
          </a>
          <a
            href="https://medium.com/@fikrilal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icons/medium.svg"
              alt="Medium"
              className="w-6 h-6 md:w-8 md:h-8 hover:opacity-80 transition"
            />
          </a>
          <a
            href="https://www.instagram.com/fikril.al/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icons/instagram.svg"
              alt="Instagram"
              className="w-6 h-6 md:w-8 md:h-8 hover:opacity-80 transition"
            />
          </a>
        </motion.div>

        {/* Copyright */}
        <motion.p
          className="mt-8 text-xs md:text-sm font-mono text-gray-500"
          variants={childVariants}
        >
          © 2025 FIKRIL AL. ALL RIGHTS RESERVED.
        </motion.p>
      </motion.div>
    </motion.footer>
  );
}
