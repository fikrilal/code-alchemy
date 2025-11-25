"use client";

import { motion } from "framer-motion";

import skills from "@/data/skill";

import ExperienceSection from "./ExperienceSection";
import AchievementsSection from "./AchievementsSection";
import QuoteSection from "./QuoteSection";
import ChainOfThought from "./ChainOfThought";

import type { Variants } from "framer-motion";

export default function MainSection() {
  // Container variants: controls stagger and a parent fade-in if desired
  const containerVariants: Variants = {
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
  const childVariants: Variants = {
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0">
      {/* Top Section */}
      <motion.section
        className="text-left mb-8 container mx-auto pt-28 sm:pt-28 lg:pt-40"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-slate-50 mt-2 lg:mt-4"
          variants={childVariants}
        >
          About Me
        </motion.h1>
      </motion.section>

      {/* Main Section (About) */}
      <motion.section
        className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between container mx-auto py-8 lg:py-20 lg:space-x-8"
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
            src="/images/avatar.png"
            alt="Ahmad Fikril Al Muzakki"
            className="w-32 h-32 rounded-full mb-4 lg:mb-0 lg:mr-6"
            variants={childVariants}
          />

          {/* Info Section */}
          <motion.div
            className="flex flex-col items-center lg:items-start"
            variants={childVariants}
          >
            <ChainOfThought />
          </motion.div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="w-full lg:w-1/2 text-left lg:text-left"
          variants={childVariants}
        >
          <p className="text-base md:text-lg text-slate-200 font-normal mb-4 leading-[1.6] sm:!leading-[1.8]">
            Hi, I’m Fikril — a mobile engineer based in Bandung, Indonesia.
          </p>
          <p className="text-base md:text-lg text-slate-200 font-normal mb-4 leading-[1.6] sm:!leading-[1.8]">
            Most of my work sits in the mobile space, especially Flutter. I’m
            usually involved early: taking a rough idea like “we need an app”
            and turning it into something concrete — project structure,
            architecture, patterns, and eventually a build people can actually
            download and use.
          </p>
          <p className="text-base md:text-lg text-slate-200 font-normal mb-4 leading-[1.6] sm:!leading-[1.8]">
            I’m comfortable owning the end-to-end 0 → 1 phase: defining how a
            Flutter app is structured, how data flows, how state is managed, how
            we ship, and then driving the first release into production. Over
            time, I like turning those decisions into standards the rest of the
            team can follow.
          </p>
          <p className="text-base md:text-lg text-slate-200 font-normal mb-4 leading-[1.6] sm:!leading-[1.8]">
            I care a lot about code that’s easy to change later, not just code
            that works today. Clean boundaries, predictable behavior, and a sane
            developer experience matter to me as much as UI polish. I’m not
            trying to be a full-time designer, but I do think good engineering
            and good UX are tightly connected.
          </p>
          <p className="text-base md:text-lg text-slate-200 font-normal mb-4 leading-[1.6] sm:!leading-[1.8]">
            When I’m not in an editor, you’ll probably find me somewhere inside
            the grimdark universe of Warhammer 40K, looping Starset or Linkin
            Park, or staring at a notebook and coffee cup trying to untangle the
            next idea.
          </p>
          <p className="text-base md:text-lg text-slate-200 font-semibold mb-4 leading-[1.6] sm:!leading-[1.8]">
            Still figuring things out, still learning — but moving with
            intention.
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
    </div>
  );
}
