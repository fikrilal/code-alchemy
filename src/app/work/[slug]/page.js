"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import workDetails from "@/data/workDetails";
import Button from "@/components/Button";

export default function CaseStudy() {
  const { slug } = useParams();
  const project = workDetails.find((work) => work.slug === slug);

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

  return (
    <motion.section
      className="flex flex-col items-start min-h-screen transition-colors duration-300 px-4 sm:px-6 lg:px-8 xl:px-0 py-24"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-6xl w-full mx-auto space-y-12">
        {/* Title and Description */}
        <div className="space-y-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-slate-100"
            variants={childVariants}
          >
            {project.title}
          </motion.h1>
          <motion.p
            className="text-lg text-slate-400 max-w-2xl"
            variants={childVariants}
          >
            {project.shortDescription}
          </motion.p>
        </div>

        {/* Hero Image */}
        <motion.div
          className="w-full relative"
          style={{ aspectRatio: "15/9" }}
          variants={childVariants}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </motion.div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="md:col-span-1 space-y-6 text-white">
            <motion.div variants={childVariants}>
              <h3 className="text-lg font-semibold text-slate-200">Timeline</h3>
              <p className="text-slate-400 pt-2">{project.timeframe}</p>
            </motion.div>
            <motion.div variants={childVariants}>
              <h3 className="text-lg font-semibold text-slate-200">
                Tech Stack
              </h3>
              {Object.entries(project.techStack).map(([category, items]) => (
                <div key={category} className="mt-2">
                  <p className="text-slate-400 capitalize">{category}:</p>
                  <p className="text-slate-400 pt-2">{items.join(", ")}</p>
                </div>
              ))}
            </motion.div>
            <motion.div variants={childVariants}>
              <Button>Visit website</Button>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-10 text-white">
            <motion.section variants={childVariants}>
              <h2 className="text-3xl font-semibold text-slate-200">
                Overview
              </h2>
              <p className="lg:text-lg text-slate-400 pt-4">
                {project.overview}
              </p>
            </motion.section>

            <motion.section variants={childVariants}>
              <h2 className="text-3xl font-semibold text-slate-200">
                Features
              </h2>
              <ul className="list-none lg:text-lg space-y-2 text-slate-400 pt-4">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </motion.section>

            <motion.section variants={childVariants}>
              <h2 className="text-3xl font-semibold text-slate-200">Results</h2>
              <ul className="list-none lg:text-lg space-y-2 text-slate-400 pt-4">
                {project.results?.map((result, index) => (
                  <li key={index}>{result}</li>
                ))}
              </ul>
            </motion.section>

            {/* Project Images Grid */}
            <motion.div variants={childVariants} className="space-y-8">
              {project.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative w-full aspect-[15/9]"
                  variants={childVariants}
                >
                  <Image
                    src={image}
                    alt={`${project.title} Image ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
