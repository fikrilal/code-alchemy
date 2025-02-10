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
                <p className="pt-2 text-slate-400">{experience.organization}</p>
              </div>
              <p className="text-sm text-slate-500">{experience.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
