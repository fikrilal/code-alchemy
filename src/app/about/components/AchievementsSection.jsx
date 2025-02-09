"use client";

import { motion } from "framer-motion";
import achievements from "@/data/achievements";

export default function AchievementsSection({
  containerVariants,
  childVariants,
}) {
  return (
    <motion.section
      className="container mx-auto px-6 lg:px-12 py-12 lg:py-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-slate-200 mb-2 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12"
        variants={childVariants}
      >
        Achievements
      </motion.h2>
      <div className="space-y-8">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            className={`pt-8 border-t border-slate-900 ${
              index === 0 ? "border-t-0 pt-0" : ""
            }`}
            variants={childVariants}
          >
            <div className="mb-2">
              <h3 className="text-xl font-medium text-slate-200 mb-2 leading-[1.5]">
                {achievement.title}
              </h3>
              <div className="flex flex-row justify-between items-center text-sm">
                <p className="text-base text-slate-400">
                  {achievement.organization}
                </p>
                <p className="text-slate-500 whitespace-nowrap">
                  {achievement.date}
                </p>
              </div>
            </div>
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
  );
}
