"use client";

import { motion } from "framer-motion";
import blogPosts from "@/data/blogPost";

export default function BlogSection() {
  const headingContainerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Variants for each blog card
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-gray-50 py-16 sm:py-16 lg:py-32">
      <motion.div
        className="container mx-auto text-center max-w-7xl px-4 sm:px-6 lg:px-8"
        variants={headingContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Section Title */}
        <div className="mb-2 sm:mb-16 lg:mb-20">
          <span className="inline-flex items-center px-8 py-2 text-sm font-medium border border-gray-300 rounded-full">
            <img
              src="/icons/writing-thoughts.svg"
              alt="Writing & Thoughts Icon"
              className="w-5 h-5 mr-2"
            />
            Writing & Thoughts
          </span>
          <h2 className="mt-4 sm:mt-6 lg:mt-8 text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 px-8">
            Stories, Code, and Everything In Between
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 max-w-2xl mx-auto leading-[1.6] sm:!leading-[1.8]">
            A space where I share my journey, insights, and lessons learned.
            From coding tips to design musings, it’s all about growth,
            creativity, and a little bit of fun along the way.
          </p>
        </div>
      </motion.div>

      {/* Blog List (no container-level whileInView here) */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 lg:space-y-16">
        {blogPosts.map((blog, index) => (
          <motion.div
            key={index}
            className="flex flex-col md:flex-row items-stretch border-b border-gray-200 pb-8 sm:pb-10 lg:pb-16"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }} // triggers at 10% visible
          >
            {/* Image with 16:9 Aspect Ratio */}
            <motion.div
              className="relative h-48 sm:h-60 md:h-72 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 mb-6 md:mb-0 md:mr-12"
              style={{ aspectRatio: "16 / 9" }}
            />

            {/* Blog Content */}
            <div className="flex flex-col justify-between flex-1 text-left">
              <a href={blog.link} className="hover:underline">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-900">
                  {blog.title}
                </h3>
              </a>
              <p className="mt-2 sm:mt-2 lg:mt-4 text-slate-700 text-sm sm:text-base leading-[1.6]">
                {blog.description}
              </p>
              <p className="text-gray-500 text-sm mt-6 md:mt-auto text-left">
                {blog.date}
              </p>
            </div>
          </motion.div>
        ))}

        {/* View All Button */}
        <div className="mt-10 text-center text-right">
          <a
            href="#"
            className="inline-flex items-center text-sm font-medium text-gray-800 hover:text-brand-primary transition"
          >
            View All [22]
            <span className="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 6.75L21 12m0 0-3.75 5.25M21 12H3"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
