"use client";

import { motion } from "framer-motion";

export default function SelectedWork() {
  const projects = [
    {
      title: "eDamkar",
      description:
        "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.",
      link: "#",
      borderStyles: "border-b lg:border-b border-gray-200",
    },
    {
      title: "ePKK",
      description:
        "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.",
      link: "#",
      borderStyles: "border-b lg:border-b lg:border-l border-gray-200",
    },
    {
      title: "Ngawi Smart City",
      description:
        "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.",
      link: "#",
      borderStyles: "border-b lg:border-none border-gray-200",
    },
    {
      title: "Lofo - leftover food",
      description:
        "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.",
      link: "#",
      borderStyles: "lg:border-l border-gray-200",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants = {
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
    <motion.section
      className="bg-gray-50 pt-24 p-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto text-center">
        {/* Section Title */}
        <motion.div className="mb-2 sm:mb-6 lg:mb-10" variants={childVariants}>
          <span className="inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-full">
            <img
              src="/icons/selected-work.svg"
              alt="Selected Work Icon"
              className="w-5 h-5 mr-2"
            />
            Selected Work
          </span>

          <h2 className="mt-4 sm:mt-6 lg:mt-8 text-2xl md:text-4xl font-semibold text-gray-800">
            Some Stuff I’ve Built
          </h2>
          <p className="mt-3 sm:mt-4 lg:mt-5 text-base md:text-lg text-slate-700 max-w-2xl mx-auto leading-[1.6] sm:!leading-[1.8] px-4">
            Here’s a peek at the projects where I turned ideas into something
            cool. From apps to designs, it’s all about making things that work
            and look awesome.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
          // If you'd like to stagger children inside this grid,
          // you can reuse containerVariants or just rely on the parent above.
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`py-8 sm:py-8 lg:py-8 lg:px-8 bg-white transition text-left ${project.borderStyles}`}
              variants={childVariants}
            >
              <div className="bg-gray-100 h-80 rounded-md mb-4 sm:mb-4 lg:mb-6"></div>
              <div className="flex items-center justify-between group">
                <h3 className="text-2xl md:text-3xl font-medium text-gray-800">
                  {project.title}
                </h3>
                <a
                  href={project.link}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium bg-white-100 shadow-sm border border-gray-300 rounded-lg transition-all duration-300 hover:bg-brand-primary/10 hover:border-brand-primary hover:text-brand-primary"
                >
                  View Work{" "}
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
              <p className="mt-3 text-slate-700 text-md">
                {project.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
