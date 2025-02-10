"use client";

import { motion } from "framer-motion";
import Button from "./Button";

export default function SelectedWork() {
  // Parent container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  // Child reveal animation
  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Card hover variants (for the entire card)
  const cardVariants = {
    initial: { scale: 1, boxShadow: "none" },
    hover: {
      scale: 1.02,
      boxShadow: "0px 8px 24px rgba(0,0,0,0.15)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.section
      className="flex flex-col items-start min-h-screen transition-colors duration-300  px-4 sm:px-6 lg:px-8 xl:px-0"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Header */}
      <div className="max-w-6xl w-full mx-auto pt-24 sm:pt-24 lg:pt-60">
        <div className="flex justify-between items-center">
          <motion.h2
            className="text-3xl md:text-5xl font-semibold text-slate-200 leading-[1.2] sm:!leading-tight max-w-4xl"
            variants={childVariants}
          >
            Some Stuff I’ve Built
          </motion.h2>
          {/* Hide button on mobile (below md) */}
          <motion.div variants={childVariants} className="hidden md:block">
            <Button>View all projects</Button>
          </motion.div>
        </div>
        <motion.p
          className="mt-3 sm:mt-4 lg:mt-5 text-base md:text-lg text-slate-500 max-w-2xl leading-[1.6] sm:!leading-[1.8]"
          variants={childVariants}
        >
          Here’s a peek at the projects where I turned ideas into something
          cool. From apps to designs, it’s all about making things that work and
          look awesome.
        </motion.p>
      </div>

      {/* Projects Section */}
      <div className="max-w-6xl w-full mx-auto mt-12 sm:mt-16 lg:mt-24">
        {/* Main Project Card */}
        {/* <motion.div
          className="p-6 rounded-3xl mb-8 border border-slate-900 group"
          variants={{ ...childVariants, ...cardVariants }}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl xl:text-2xl font-semibold text-slate-200">
              Main Project Title
            </h3>
            <span className="inline-flex items-center transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:rotate-45">
              <img src="/icons/ic_arrow.svg" alt="Arrow" className="w-4 h-4" />
            </span>
          </div>
          <p className="text-sm text-slate-400 mb-8">
            A short description for the main project that spans the full width.
          </p>
          <div className="mt-4 w-full aspect-[16/10] overflow-hidden rounded-3xl">
            <img
              src="/images/dummy-image.jpg"
              alt="Main Project screenshot"
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
        </motion.div> */}

        {/* Two Smaller Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Project Card 1 */}
          <motion.div
            className="rounded-3xl overflow-hidden flex flex-col border border-slate-900 group"
            variants={{ ...childVariants, ...cardVariants }}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="p-6 flex-none">
              <div className="flex justify-between items-center">
                <h3 className="text-xl xl:text-2xl font-semibold text-slate-200">
                  Project Title A
                </h3>
                <span className="inline-flex items-center transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:rotate-45">
                  <img
                    src="/icons/ic_arrow.svg"
                    alt="Arrow"
                    className="w-4 h-4"
                  />
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-2">
                Short description for project A.
              </p>
            </div>
            <div className="relative flex-1 p-4">
              <img
                src="/images/dummy-image.jpg"
                alt="Project A screenshot"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          </motion.div>

          {/* Project Card 2 */}
          <motion.div
            className="rounded-3xl overflow-hidden flex flex-col border border-slate-900 group"
            variants={{ ...childVariants, ...cardVariants }}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="p-6 flex-none">
              <div className="flex justify-between items-center">
                <h3 className="text-xl xl:text-2xl font-semibold text-slate-200">
                  Project Title B
                </h3>
                <span className="inline-flex items-center transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:rotate-45">
                  <img
                    src="/icons/ic_arrow.svg"
                    alt="Arrow"
                    className="w-4 h-4"
                  />
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-2">
                Short description for project B.
              </p>
            </div>
            <div className="relative flex-1 p-4">
              <img
                src="/images/dummy-image.jpg"
                alt="Project B screenshot"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Two Smaller Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Project Card 1 */}
          <motion.div
            className="rounded-3xl overflow-hidden flex flex-col border border-slate-900 group"
            variants={{ ...childVariants, ...cardVariants }}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="p-6 flex-none">
              <div className="flex justify-between items-center">
                <h3 className="text-xl xl:text-2xl font-semibold text-slate-200">
                  Project Title A
                </h3>
                <span className="inline-flex items-center transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:rotate-45">
                  <img
                    src="/icons/ic_arrow.svg"
                    alt="Arrow"
                    className="w-4 h-4"
                  />
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-2">
                Short description for project A.
              </p>
            </div>
            <div className="relative flex-1 p-4">
              <img
                src="/images/dummy-image.jpg"
                alt="Project A screenshot"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          </motion.div>

          {/* Project Card 2 */}
          <motion.div
            className="rounded-3xl overflow-hidden flex flex-col border border-slate-900 group"
            variants={{ ...childVariants, ...cardVariants }}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="p-6 flex-none">
              <div className="flex justify-between items-center">
                <h3 className="text-xl xl:text-2xl font-semibold text-slate-200">
                  Project Title B
                </h3>
                <span className="inline-flex items-center transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:rotate-45">
                  <img
                    src="/icons/ic_arrow.svg"
                    alt="Arrow"
                    className="w-4 h-4"
                  />
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-2">
                Short description for project B.
              </p>
            </div>
            <div className="relative flex-1 p-4">
              <img
                src="/images/dummy-image.jpg"
                alt="Project B screenshot"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
