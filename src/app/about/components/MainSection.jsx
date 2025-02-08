"use client";

import { motion } from "framer-motion";
import skills from "@/data/skill";
import ExperienceSection from "./ExperienceSection";
import AchievementsSection from "./AchievementsSection";
import QuoteSection from "./QuoteSection";

export default function MainSection() {
  // Container variants: controls stagger and a parent fade-in if desired
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // Stagger each child (p, heading, etc.) by 0.15s
        staggerChildren: 0.15,
      },
    },
  };

  // Child variants: each element fades in from below
  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* Top Section */}
      <motion.section
        className="text-left mb-8 container mx-auto px-6 lg:px-12 pt-28 sm:pt-28 lg:pt-40"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.p
          className="flex items-center text-sm text-green-500 mb-2"
          variants={childVariants}
        >
          <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
          Available for freelance work
        </motion.p>
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-slate-900"
          variants={childVariants}
        >
          About Me
        </motion.h1>
      </motion.section>

      {/* Main Section (About) */}
      <motion.section
        className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between container mx-auto py-8 lg:py-20 px-6 lg:px-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left Section */}
        <motion.div
          className="w-full lg:w-1/2 mb-8 lg:mb-0 flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left"
          variants={childVariants}
        >
          {/* Avatar */}
          <motion.img
            src="/images/avatar.jpg"
            alt="Your Avatar"
            className="w-32 h-32 rounded-full mb-4 lg:mb-0 lg:mr-6"
            variants={childVariants}
          />

          {/* Info Section */}
          <motion.div
            className="flex flex-col items-center lg:items-start"
            variants={childVariants}
          >
            {/* Social Icons */}
            <div className="flex space-x-4 mb-2 sm:mb-4 md:mb-6 lg:mb-4">
              {skills.map((skill, index) => (
                <a
                  key={index}
                  href={skill.link}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-80 transition-transform transform hover:scale-110"
                >
                  <img src={skill.icon} alt={skill.name} className="w-6 h-6" />
                </a>
              ))}
            </div>

            {/* Email and Bio */}
            <p className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-slate-900">
              fikrildev@gmail.com
            </p>
            <p className="px-8 lg:px-0 mt-2 sm:mt-2 lg:mt-3 text-base md:text-lg text-slate-700 max-w-sm leading-[1.6] sm:!leading-[1.6]">
              Mobile Engineer by day, Warhammer 40K enthusiast by night.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="w-full lg:w-1/2 text-left lg:text-left"
          variants={childVariants}
        >
          <p className="text-base md:text-lg text-slate-800 font-medium mb-4 leading-[1.6] sm:!leading-[1.8]">
            Hi, I’m Fikril—a mobile engineer and UX enthusiast based in Jakarta,
            Indonesia. My journey in tech started with a curiosity for how
            things work, and over the years, it’s turned into a passion for
            building apps that people love to use.
          </p>
          <p className="text-base md:text-lg text-slate-800 font-medium mb-4 leading-[1.6] sm:!leading-[1.8]">
            I specialize in creating seamless mobile experiences with Flutter,
            Kotlin, and Jetpack Compose, blending technical precision with
            thoughtful design. Whether it’s coding complex features or crafting
            intuitive interfaces, I’m all about solving problems and making
            ideas come to life.
          </p>
          <p className="text-base md:text-lg text-slate-800 font-medium mb-4 leading-[1.6] sm:!leading-[1.8]">
            When I’m not coding, you’ll probably find me diving into the
            grimdark universe of Warhammer 40K, listening to my favorite bands
            (Starset and Linkin Park, anyone?), or brainstorming the next big
            idea over a cup of coffee.
          </p>
          <p className="text-base md:text-lg text-slate-900 font-bold mb-4 leading-[1.6] sm:!leading-[1.8]">
            Let’s build something amazing together—because to me, every project
            is a story worth telling!
          </p>
        </motion.div>
      </motion.section>

      {/* Experience Section */}
      <ExperienceSection
        containerVariants={containerVariants}
        childVariants={childVariants}
      />

      {/* Achievements Section */}
      <AchievementsSection
        containerVariants={containerVariants}
        childVariants={childVariants}
      />

      {/* Quote Section */}
      <QuoteSection
        containerVariants={containerVariants}
        childVariants={childVariants}
      />
    </>
  );
}
