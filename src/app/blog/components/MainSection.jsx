"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function BlogMainSection({ posts }) {
  // Container variants (controls the stagger of child elements)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Child variants (each child fades in from below)
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const featuredPost = posts.find((post) => post.highlight);

  return (
    <motion.section
      className="max-w-auto mx-auto sm:px-6 lg:px-8 pb-8 lg:pb-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Header Section */}
      <motion.div
        className="max-w-3xl mx-auto text-center mb-16 lg:mb-20"
        variants={childVariants}
      >
        <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
          Insights &amp; Updates
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-slate-1000 mb-6">
          Insights &amp; Updates
        </h1>
        <p className="text-base sm:text-lg lg:text-lg text-slate-700 max-w-2xl mx-auto leading-[1.6] sm:!leading-[1.8]">
          A space where I share my journey, insights, and lessons learned. From
          coding tips to design musings, it’s all about growth, creativity, and
          a little bit of fun along the way.
        </p>
      </motion.div>

      {/* Featured Post */}
      {featuredPost && (
        <motion.article className="group relative" variants={childVariants}>
          <Link href={`/blog/${featuredPost.slug}`} className="block">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
              {/* Image Container with Fixed Aspect Ratio */}
              <motion.div
                className="relative overflow-hidden rounded-2xl"
                variants={childVariants}
              >
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "56.25%" }} // 16:9 ratio
                >
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="absolute inset-0 object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>

              {/* Content Container */}
              <motion.div className="flex flex-col" variants={childVariants}>
                <div className="space-y-2">
                  <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs sm:text-sm font-medium">
                    Case Study
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 leading-tight pt-2 sm:pt-3 md:pt-4 lg:pt-4 hover:underline">
                    {featuredPost.title}
                  </h2>
                  <p className="text-md sm:text-base md:text-lg text-slate-600 pt-1 sm:pt-2 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="inline-flex items-center text-brand-primary font-medium hover:text-slate-900 pt-4 sm:pt-6 lg:pt-8 transition-colors">
                    Read Full Story
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </div>
          </Link>
        </motion.article>
      )}
    </motion.section>
  );
}
