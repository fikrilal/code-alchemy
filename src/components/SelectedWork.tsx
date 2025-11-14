import Image from "next/image";
import Link from "next/link";

import MotionElement from "@/components/animations/Motion";
import Button from "@/components/ui/Button";

import type { WorkSummary } from "@/lib/work";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
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

const cardHover = {
  scale: 1.02,
  boxShadow: "0px 8px 24px rgba(0,0,0,0.15)",
  transition: { duration: 0.3 },
};

export default function SelectedWork({ workItems }: { workItems: WorkSummary[] }) {
  return (
    <MotionElement
      as="section"
      className="flex flex-col items-start min-h-screen transition-colors duration-300 px-4 sm:px-6 lg:px-8 xl:px-0"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-6xl w-full mx-auto pt-24 sm:pt-24 lg:pt-60">
        <div className="flex justify-between items-center">
          <MotionElement
            as="h2"
            className="text-3xl md:text-5xl font-semibold text-slate-200 leading-[1.2] sm:!leading-tight max-w-4xl"
            variants={childVariants}
          >
            Some Stuff I’ve Cooked
          </MotionElement>
          <MotionElement as="div" variants={childVariants} className="hidden md:block">
            <Button>View all projects</Button>
          </MotionElement>
        </div>
        <MotionElement
          as="p"
          className="mt-3 sm:mt-4 lg:mt-5 text-base md:text-lg text-slate-500 max-w-2xl leading-[1.6] sm:!leading-[1.8]"
          variants={childVariants}
        >
          Here’s a peek at the projects where I turned ideas into something cool. From apps to designs, it’s all about
          making things that work and look awesome.
        </MotionElement>
      </div>

      <div className="max-w-6xl w-full mx-auto mt-12 sm:mt-16 lg:mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
        {workItems.map((project) => (
          <MotionElement
            key={project.slug}
            as="div"
            className="rounded-2xl overflow-hidden flex flex-col border border-slate-900 group relative"
            variants={childVariants}
            whileHover={cardHover}
          >
            <Link href={`/work/${project.slug}`} className="absolute inset-0 z-10">
              <span className="sr-only">View {project.title} details</span>
            </Link>
            <div className="p-6 flex-none relative">
              <div className="flex justify-between items-center">
                <h3 className="text-xl xl:text-2xl font-semibold text-slate-200">{project.title}</h3>
                <span className="inline-flex items-center transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:rotate-45 ml-2">
                  <Image src="/icons/ic_arrow.svg" alt="Arrow" width={20} height={20} className="w-4 h-4" />
                </span>
              </div>
              <p className="text-slate-400 mt-2">{project.shortDescription}</p>
            </div>
            <div className="relative p-4">
              <div className="relative aspect-[14/9] rounded-xl overflow-hidden">
                <Image
                  src={project.thumbnail}
                  alt={`${project.title} screenshot`}
                  width={1998}
                  height={1124}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </MotionElement>
        ))}
      </div>
    </MotionElement>
  );
}
