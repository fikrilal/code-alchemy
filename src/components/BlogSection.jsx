"use client";

import { motion } from "framer-motion";
import Button from "./Button";
import blogPosts from "@/data/blogPost";

// Helper to add ordinal suffix to day
function getOrdinal(n) {
  if (n > 3 && n < 21) return n + "th";
  switch (n % 10) {
    case 1:
      return n + "st";
    case 2:
      return n + "nd";
    case 3:
      return n + "rd";
    default:
      return n + "th";
  }
}

// Format date as "Month, DayWithOrdinal Year" e.g., "February, 8th 2025"
function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}, ${getOrdinal(day)} ${year}`;
}

export default function BlogSection() {
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
      className="flex flex-col items-start min-h-screen transition-colors duration-300"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Header */}
      <div className="max-w-6xl w-full mx-auto pt-24 sm:pt-24 lg:pt-60  px-4 px-4 sm:px-6 lg:px-8 xl:px-0">
        <div className="flex justify-between items-center">
          <motion.h2
            className="text-3xl md:text-5xl font-semibold text-slate-100 leading-[1.2] sm:!leading-tight max-w-2xl"
            variants={childVariants}
          >
            Stories, Code, and Everything In Between
          </motion.h2>
          {/* Hide button on mobile (below md) */}
          <motion.div variants={childVariants} className="hidden md:block">
            <Button>View all posts</Button>
          </motion.div>
        </div>
        <motion.p
          className="mt-3 sm:mt-4 lg:mt-5 text-base md:text-lg text-slate-500 max-w-2xl leading-[1.6] sm:!leading-[1.8]"
          variants={childVariants}
        >
          A space where I share my journey, insights, and lessons learned. From
          coding tips to design musings, it’s all about growth, creativity, and
          a little bit of fun along the way.
        </motion.p>
      </div>

      {/* Blog Content Rows */}
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 lg:px-8 mt-8 sm:mt-10 lg:mt-16">
        {blogPosts.slice(0, 3).map((blog, index) => (
          <motion.div
            key={blog.id}
            variants={childVariants}
            className={`flex flex-col md:flex-row items-stretch ${
              index === 0 ? "" : "border-t border-slate-1000"
            } py-12`}
          >
            {/* Blog Image Container */}
            <div className="w-full md:w-1/3">
              {/* This container forces a 16:9 aspect ratio */}
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <img
                  src={blog.imageUrl}
                  alt="Blog Post Thumbnail"
                  className="absolute inset-0 w-full h-full object-cover rounded-md"
                />
              </div>
            </div>

            {/* Blog Details */}
            <div className="w-full md:w-2/3 md:pl-6 mt-4 md:mt-0 flex flex-col justify-between">
              <div>
                <span className="text-sm text-slate-400">
                  {formatDate(blog.date)}
                </span>
                <h3 className="text-xl font-semibold text-slate-100 mt-2">
                  {blog.title}
                </h3>
                <p className="mt-2 text-slate-400">{blog.description}</p>
              </div>
              <a
                href="#"
                className="font-medium inline-flex items-center text-blue-500 hover:text-slate-900 transition-colors text-sm group self-start mt-4 md:mt-0"
              >
                Learn more
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
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
