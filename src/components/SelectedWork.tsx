import Image from "next/image";
import Link from "next/link";

import MotionElement from "@/components/animations/Motion";
import Button from "@/components/ui/Button";

import type { WorkSummary } from "@/lib/work";

type SelectedWorkProps = {
  workItems: WorkSummary[];
  heading?: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
  limit?: number;
};

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

export default function SelectedWork({
  workItems,
  heading = "Some Stuff I’ve Cooked",
  description = "Here’s a peek at the projects where I turned ideas into something cool. From apps to designs, it’s all about making things that work and look awesome.",
  ctaHref = "/work",
  ctaLabel = "View all work",
  limit,
}: SelectedWorkProps) {
  const list = Array.isArray(workItems) ? workItems : [];
  const items = typeof limit === "number" ? list.slice(0, limit) : list;
  const showCta = Boolean(ctaHref && ctaLabel);

  const formatTitle = (value: string) => {
    const parts = value.split(/\s[–—-]\s/);
    if (parts.length > 1) return parts[0];
    return value;
  };

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
            {heading}
          </MotionElement>
          {showCta && (
            <MotionElement
              as="div"
              variants={childVariants}
              className="hidden md:block"
            >
              <Button as="a" href={ctaHref}>
                {ctaLabel}
              </Button>
            </MotionElement>
          )}
        </div>
        <MotionElement
          as="p"
          className="mt-3 sm:mt-4 lg:mt-5 text-base md:text-lg text-slate-500 max-w-2xl leading-[1.6] sm:!leading-[1.8]"
          variants={childVariants}
        >
          {description}
        </MotionElement>
        {showCta && (
          <MotionElement
            as="div"
            variants={childVariants}
            className="mt-6 md:hidden"
          >
            <Button as="a" href={ctaHref} className="w-full justify-center">
              {ctaLabel}
            </Button>
          </MotionElement>
        )}
      </div>

      <div className="max-w-6xl w-full mx-auto mt-8 sm:mt-16 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((project) => (
          <MotionElement
            key={project.slug}
            as="div"
            className="group relative flex flex-col gap-3"
            variants={childVariants}
            whileHover={cardHover}
          >
            <Link
              href={`/work/${project.slug}`}
              className="absolute inset-0 z-10"
            >
              <span className="sr-only">View {project.title} details</span>
            </Link>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-900">
                <Image
                  src={project.thumbnail}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0 text-slate-100">
                <h3 className="text-lg font-semibold text-slate-100 truncate tracking-wide uppercase">
                  {formatTitle(project.title)}
                </h3>
              </div>
              <span className="text-sm text-slate-400 whitespace-nowrap">
                {project.category ?? "Case Study"}
              </span>
            </div>
          </MotionElement>
        ))}
      </div>
    </MotionElement>
  );
}
