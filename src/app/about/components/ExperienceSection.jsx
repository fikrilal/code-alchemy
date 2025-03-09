"use client";

import { motion } from "framer-motion";
import experiences from "@/data/experience";

export default function ExperienceSection({
  containerVariants,
  childVariants,
}) {
  return (
    <motion.section
      className="container mx-auto py-12 lg:py-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-slate-200 mb-2 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12"
        variants={childVariants}
      >
        Experience
      </motion.h2>
      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            className={`pt-8 border-t border-slate-900 ${
              index === 0 ? "border-t-0 pt-0" : ""
            }`}
            variants={childVariants}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-medium text-slate-200">
                  {experience.title}
                </h3>
                <div className="pt-2 flex flex-wrap items-center gap-2 text-slate-400">
                  <span>{experience.organization}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-500">{experience.location}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 text-xs rounded-full bg-slate-800/40 text-slate-400 border border-slate-700/50">
                    {experience.workType}
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-500 whitespace-nowrap">
                {experience.date}
              </p>
            </div>
            {experience.description && (
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                {experience.description}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
