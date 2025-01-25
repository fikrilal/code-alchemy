"use client";

import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

export default function Carousel({ images }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

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
      className="w-full bg-white py-8 flex items-center justify-center overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Marquee gradient={false} speed={100} className="w-full">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="h-[280px] sm:h-[300px] md:h-[450px] lg:h-[560px] mx-2 sm:mx-3 lg:mx-4 flex-none"
            variants={childVariants}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="h-full w-full object-contain rounded-xl"
            />
          </motion.div>
        ))}
      </Marquee>
    </motion.section>
  );
}
