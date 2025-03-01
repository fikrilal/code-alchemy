"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import workDetails from "@/data/workDetails";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CaseStudy() {
  const { slug } = useParams();
  const router = useRouter();
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
    <>
      <Navbar />
      <main className="bg-neutral-950 min-h-screen pt-10">
        <motion.section
          className="flex flex-col items-start transition-colors duration-300 px-4 sm:px-6 lg:px-8 xl:px-0 py-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-6xl w-full mx-auto space-y-12">
            {/* Back Button */}
            <motion.div variants={childVariants} className="inline-block">
              <button
                onClick={() => router.back()}
                className={`
                  relative
                  overflow-hidden
                  p-3
                  w-auto max-w-fit
                  inline-flex items-center justify-center
                  group
                  text-slate-200
                  hover:text-slate-900 dark:hover:text-slate-900
                  border border-slate-300 dark:border-slate-700
                  rounded-full
                  bg-transparent
                  transform-gpu
                  transition
                  duration-500
                  ease-out
                  hover:scale-105
                  hover:shadow-md
                  focus:outline-none
                  focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600
                  active:scale-95
                `}
              >
                {/* Overlay effect */}
                <span
                  className="
                  absolute inset-0
                  bg-slate-100 dark:bg-slate-100
                  rounded-full
                  transform origin-left scale-x-0
                  transition-transform duration-500 ease-out
                  group-hover:scale-x-100
                "
                ></span>

                {/* Arrow icon */}
                <span className="relative z-10">
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
              </button>
            </motion.div>

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
                  <h3 className="text-lg font-semibold text-slate-200">
                    Timeline
                  </h3>
                  <p className="text-slate-400 pt-2">{project.timeframe}</p>
                </motion.div>
                <motion.div variants={childVariants}>
                  <h3 className="text-lg font-semibold text-slate-200">
                    Tech Stack
                  </h3>
                  {Object.entries(project.techStack).map(
                    ([category, items]) => (
                      <div key={category} className="mt-2">
                        <p className="text-slate-400 capitalize">{category}:</p>
                        <p className="text-slate-400 pt-2">
                          {items.join(", ")}
                        </p>
                      </div>
                    )
                  )}
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
                  <h2 className="text-3xl font-semibold text-slate-200">
                    Results
                  </h2>
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
      </main>
      <Footer />
    </>
  );
}
