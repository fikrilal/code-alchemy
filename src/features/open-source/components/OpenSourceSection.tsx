import Image from "next/image";

import Button from "@/components/ui/Button";
import MotionElement from "@/components/ui/MotionElement";
import type { FeaturedOpenSourceRepoCard } from "@/features/open-source/data/featured-repos";

type OpenSourceSectionProps = {
  repos: FeaturedOpenSourceRepoCard[];
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const cardHover = {
  scale: 1.01,
  translateY: -2,
  transition: { duration: 0.25, ease: "easeOut" as const },
};

export default function OpenSourceSection({
  repos,
}: OpenSourceSectionProps) {
  return (
    <MotionElement
      as="section"
      className="flex flex-col items-start px-4 pt-32 pb-24 sm:px-6 sm:pt-36 sm:pb-28 lg:px-8 lg:pt-40 lg:pb-32 xl:px-0 transition-colors duration-300"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-6xl w-full mx-auto">
        <div className="flex justify-between items-center">
          <MotionElement
            as="h2"
            className="text-3xl md:text-5xl font-semibold text-slate-100 leading-[1.2] sm:leading-tight! max-w-4xl"
            variants={childVariants}
          >
            Open Source
          </MotionElement>
          <MotionElement
            as="div"
            variants={childVariants}
            className="hidden md:block"
          >
            <Button
              as="a"
              href="https://github.com/fikrilal"
              target="_blank"
              rel="noopener noreferrer"
            >
              View GitHub
            </Button>
          </MotionElement>
        </div>
        <MotionElement
          as="p"
          className="mt-3 sm:mt-4 lg:mt-5 text-base md:text-lg text-slate-200 max-w-2xl leading-[1.6] sm:leading-[1.8]!"
          variants={childVariants}
        >
          The side of my brain that hates solving the same problem twice:
          reusable systems, opinionated guardrails, and tools built to keep
          future me slightly less annoyed.
        </MotionElement>
        <MotionElement
          as="div"
          variants={childVariants}
          className="mt-6 md:hidden"
        >
          <Button
            as="a"
            href="https://github.com/fikrilal"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full justify-center"
          >
            View GitHub
          </Button>
        </MotionElement>
      </div>

      <div className="max-w-6xl w-full mx-auto mt-10 sm:mt-14 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {repos.map((repo) => (
          <MotionElement
            key={repo.name}
            as="div"
            variants={childVariants}
            whileHover={cardHover}
            className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60 shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
          >
            <a
              href={repo.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${repo.name} repository on GitHub`}
              className="relative block aspect-[1.9/1] overflow-hidden bg-slate-900 focus:outline-none"
            >
              {repo.imageSrc ? (
                <Image
                  src={repo.imageSrc}
                  alt={`${repo.name} repository preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02] group-focus-within:scale-[1.02]"
                />
              ) : (
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.16),transparent_40%)]" />
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
                  <div className="relative z-10 flex h-full flex-col justify-between p-6">
                    <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-400">
                      {repo.language}
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        {repo.focus}
                      </p>
                      <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-50">
                        {repo.name}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-slate-950/0 transition-colors duration-300 group-hover:bg-slate-950/42 group-focus-within:bg-slate-950/42" />
              <div className="absolute inset-x-0 bottom-0 flex translate-y-4 items-center justify-between px-5 py-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="rounded-full border border-white/20 bg-slate-950/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-100 backdrop-blur">
                  Open Repository
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-slate-950/80 text-slate-100 backdrop-blur">
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M3.52148 12.4785L12.4783 3.52165M12.4783 3.52165L12.4783 10.1213M12.4783 3.52165L5.87862 3.52165"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </a>
          </MotionElement>
        ))}
      </div>
    </MotionElement>
  );
}
