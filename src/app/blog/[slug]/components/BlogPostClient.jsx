"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function BlogPostClient({ post, formattedDate }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <main className="bg-neutral-950 min-h-screen pt-10">
      <motion.article
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-16 sm:pt-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Button */}
        <motion.div variants={childVariants} className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-slate-400 hover:text-slate-200 transition-colors group"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 transition-transform duration-300 group-hover:-translate-x-1"
            >
              <path
                d="M15 10H5M5 10L10 5M5 10L10 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to blog
          </Link>
        </motion.div>

        {/* Post Header */}
        <motion.header variants={childVariants} className="mb-8">
          <div className="text-sm text-slate-400 mb-2">
            {formattedDate} • {post.readTime || "5 min read"}
          </div>
          <motion.h1
            variants={childVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100 mb-4"
          >
            {post.title}
          </motion.h1>
          <motion.p
            variants={childVariants}
            className="text-base sm:text-base md:text-lg lg:text-xl text-slate-300 mb-6"
          >
            {post.description}
          </motion.p>

          {/* Author info if available */}
          {post.author && (
            <motion.div variants={childVariants} className="flex items-center">
              {post.authorImage && (
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="text-slate-300">{post.author}</div>
            </motion.div>
          )}
        </motion.header>

        {post.coverImage && (
          <motion.div
            variants={childVariants}
            className="relative w-full mb-10 rounded-lg overflow-hidden"
          >
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1200} // optional
              height={675} // optional
              className="object-cover w-full h-auto rounded-lg"
              priority
            />
          </motion.div>
        )}

        {/* Post Content */}
        <motion.div
          variants={childVariants}
          className="prose prose-lg md:prose-xl prose-invert mx-auto"
        >
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </motion.div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <motion.div
            variants={childVariants}
            className="mt-10 pt-6 border-t border-slate-800"
          >
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <motion.span
                  key={tag}
                  className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(51, 65, 85, 1)",
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.article>
    </main>
  );
}
