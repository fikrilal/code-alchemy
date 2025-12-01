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
  scale: 1.01,
  translateY: -2,
  transition: { duration: 0.25, ease: "easeOut" },
};

export default function SelectedWork({
  workItems,
  heading = "Selected Work",
  description = "A look at the products I’ve helped ship — real users, real constraints, and the kind of mobile work I like to take end to end.",
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
            className="text-3xl md:text-5xl font-semibold text-slate-100 leading-[1.2] sm:!leading-tight max-w-4xl"
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
          className="mt-3 sm:mt-4 lg:mt-5 text-base md:text-lg text-slate-200 max-w-2xl leading-[1.6] sm:!leading-[1.8]"
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

      <div className="max-w-6xl w-full mx-auto mt-8 sm:mt-16 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
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
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
              <Image
                src={project.thumbnail}
                alt={`${project.title} screenshot`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 900px"
                quality={100}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                priority={false}
              />
            </div>
            <div className="flex items-center justify-between gap-3 pt-3">
              <h3 className="text-base font-normal text-slate-100 truncate uppercase tracking-[0.15em] font-mono">
                {formatTitle(project.title)}
              </h3>
              <span className="text-sm text-slate-300 whitespace-nowrap">
                {project.category ?? "Case Study"}
              </span>
            </div>
          </MotionElement>
        ))}
      </div>
    </MotionElement>
  );
}
