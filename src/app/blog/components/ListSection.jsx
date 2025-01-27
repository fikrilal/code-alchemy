"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import blogPosts from "@/data/blogPost";

export default function BlogListSection() {
  // Container variants for staggering each card
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Each card’s fade-up effect
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <motion.section
      className="bg-white text-gray-900 py-10 sm:py-12 lg:py-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="container mx-auto px-0 lg:px-8"
        variants={cardVariants}
      >
        {/* Grid of blog posts */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          // This is our container for the cards themselves,
          // enabling the stagger effect
          variants={containerVariants}
        >
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              className="flex flex-col"
              variants={cardVariants}
            >
              {/* Post image */}
              <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="absolute inset-0 object-cover rounded-lg"
                />
              </div>

              {/* Post content */}
              <div className="py-4 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm sm:text-sm md:text-md lg:text-md text-green-600 tracking-wide">
                    {post.category}
                  </span>
                  {/* <div className="flex items-center">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden">
                      <Image
                        src={post.authorAvatar}
                        alt={post.authorName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="ml-2 text-sm sm:text-sm md:text-md lg:text-md text-gray-600">
                      {post.authorName}
                    </p>
                  </div> */}
                </div>
                <h3 className="text-lg sm:text-xl lg:font-xl font-semibold mb-2 line-clamp-2 hover:underline">
                  {post.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
