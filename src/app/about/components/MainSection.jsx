"use client";

import { motion } from "framer-motion";
import skills from "@/data/skill";
import achievements from "@/data/achievements";
import experiences from "@/data/experience";

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
            <p className="px-8 lg:px-0 mt-2 sm:mt-4 lg:mt-4 text-base md:text-lg text-slate-700 max-w-sm leading-[1.6] sm:!leading-[1.6]">
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
      <motion.section
        className="container mx-auto px-6 lg:px-12 py-12 lg:py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2
          className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-slate-900 mb-2 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12"
          variants={childVariants}
        >
          Experience
        </motion.h2>
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              className={`pt-8 border-t border-slate-200 ${
                index === 0 ? "border-t-0 pt-0" : ""
              }`}
              variants={childVariants}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium text-slate-900">
                    {experience.title}
                  </h3>
                  <p className="pt-2 text-slate-600">
                    {experience.organization}
                  </p>
                </div>
                <p className="text-sm text-slate-500">{experience.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Achievements Section */}
      <motion.section
        className="container mx-auto px-6 lg:px-12 py-12 lg:py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2
          className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-slate-900 mb-2 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12"
          variants={childVariants}
        >
          Achievements
        </motion.h2>
        <div className="space-y-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className={`pt-8 border-t border-slate-200 ${
                index === 0 ? "border-t-0 pt-0" : ""
              }`}
              variants={childVariants}
            >
              <div className="mb-2">
                {/* Title */}
                <h3 className="text-xl font-medium text-slate-900 mb-2 leading-[1.5]">
                  {achievement.title}
                </h3>

                {/* Organization and Date */}
                <div className="flex flex-row justify-between items-center text-sm">
                  <p className="text-base text-slate-600">
                    {achievement.organization}
                  </p>
                  <p className="text-slate-500 whitespace-nowrap">
                    {achievement.date}
                  </p>
                </div>
              </div>

              {/* Credential Link */}
              <a
                href={achievement.credentialLink}
                className="font-medium inline-flex items-center text-brand-primary hover:text-slate-900 transition-colors text-sm group"
              >
                Credential
                <span className="ml-1 transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-hover:rotate-45">
                  <svg
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.64121 9.85889L9.35872 3.14138M9.35872 3.14138L9.35872 8.09113M9.35872 3.14138L4.40898 3.14138"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Quote Section */}
      <motion.section
        className="container mx-auto px-6 lg:px-12 py-12 lg:py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="relative max-w-3xl mx-auto group"
          variants={childVariants}
        >
          <div className="absolute -left-6 top-0 h-full w-1 bg-green-500 rounded-full opacity-20 transition-opacity group-hover:opacity-40"></div>

          <div className="pl-8">
            <blockquote className="text-2xl md:text-3xl leading-[1.6] md:leading-[1.5] font-medium text-slate-800 italic relative">
              <span className="absolute -left-8 -top-4 text-7xl text-green-500 opacity-25 select-none">
                “
              </span>
              <p className="relative z-10">
                In code as in life—build with purpose, design with care, and
                always leave room for creativity.
              </p>
              <span className="absolute -right-4 -bottom-8 text-7xl text-green-500 opacity-25 select-none transform rotate-180">
                “
              </span>
            </blockquote>
          </div>

          <div className="mt-6 h-px bg-gradient-to-r from-green-500/20 via-green-500/40 to-green-500/20 transition-all group-hover:via-green-500/60"></div>
        </motion.div>
      </motion.section>
    </>
  );
}
