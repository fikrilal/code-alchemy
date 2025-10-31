"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import workDetails from "@/data/workDetails";
import Button from "@/components/Button";
import { useEffect } from "react";

// Helper to render minimal markdown formatting in strings
function renderMarkdown(text) {
  if (!text) return "";
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>");
}

function extractEmojiAndText(feature) {
  const emojiMatch = feature.match(
    /^(\p{Extended_Pictographic})(.+)/u
  );
  if (emojiMatch) {
    const emoji = emojiMatch[1];
    const remaining = emojiMatch[2].trim();
    const parts = remaining.split(/\s[–-]\s/);
    if (parts.length >= 2) {
      return { emoji, title: parts[0], description: parts.slice(1).join(" – ") };
    }
    return { emoji, title: remaining, description: "" };
  }
  return { emoji: "", title: feature, description: "" };
}

export default function WorkCaseStudyClient() {
  const { slug } = useParams();
  const router = useRouter();
  const project = workDetails.find((w) => w.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white flex-col gap-6">
        <h1 className="text-3xl">Project not found</h1>
        <p className="text-slate-400">The project you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/work")}>Back to Projects</Button>
      </div>
    );
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };
    const cards = document.querySelectorAll(".result-card");
    cards.forEach((card) => card.addEventListener("mousemove", handleMouseMove));
    return () => cards.forEach((card) => card.removeEventListener("mousemove", handleMouseMove));
  }, [project?.results]);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } } };
  const childVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } };

  const renderFeatures = (features) => {
    if (!features?.length) return null;
    return (
      <motion.section variants={childVariants}>
        <h2 className="text-3xl font-semibold text-slate-200">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {features.map((feature, index) => {
            const { emoji, title, description } = extractEmojiAndText(feature);
            return (
              <div key={index} className="flex space-x-4 p-4 rounded-lg border border-slate-800/40 bg-slate-900/10 hover:bg-slate-900/20 transition-colors duration-200">
                {emoji && <div className="flex-shrink-0 text-2xl w-10 h-10 flex items-center justify-center rounded-md bg-slate-800/50">{emoji}</div>}
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-slate-200" dangerouslySetInnerHTML={{ __html: renderMarkdown(title) }} />
                  {description && <p className="text-md text-slate-400" dangerouslySetInnerHTML={{ __html: renderMarkdown(description) }} />}
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>
    );
  };

  const renderProjectSection = (title, content, listItems = false) => {
    if (!content || (Array.isArray(content) && content.length === 0)) return null;
    return (
      <motion.section variants={childVariants}>
        <h2 className="text-3xl font-semibold text-slate-200">{title}</h2>
        {listItems ? (
          <ul className="list-none lg:text-lg space-y-2 text-slate-400 pt-4">
            {content.map((item, index) => (
              <li key={index} className="flex items-start">
                {title === "Objectives" && <span className="mr-2 text-slate-500">•</span>}
                <span dangerouslySetInnerHTML={{ __html: renderMarkdown(item) }} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="lg:text-lg text-slate-400 pt-4" dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
        )}
      </motion.section>
    );
  };

  return (
    <main className="bg-neutral-950 min-h-screen pt-10">
      <motion.section className="flex flex-col items-start transition-colors duration-300 px-4 sm:px-6 lg:px-8 xl:px-0 py-12 md:py-24" variants={containerVariants} initial="hidden" animate="visible" viewport={{ once: true, amount: 0.05 }}>
        <div className="max-w-6xl w-full mx-auto space-y-12">
          <motion.div variants={childVariants} className="inline-block">
            <button onClick={() => router.back()} className="relative overflow-hidden p-3 w-auto max-w-fit inline-flex items-center justify-center group text-slate-200 hover:text-slate-900 dark:hover:text-slate-900 border border-slate-300 dark:border-slate-700 rounded-full bg-transparent transform-gpu transition duration-500 ease-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600 active:scale-95">
              <span className="absolute inset-0 bg-slate-100 dark:bg-slate-100 rounded-full transform origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
              <span className="relative z-10">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 7H2M2 7L6 3M2 7L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </button>
          </motion.div>

          <div className="space-y-4">
            <motion.h1 className="text-4xl md:text-5xl font-bold text-slate-100" variants={childVariants}>{project.title}</motion.h1>
            <motion.p className="text-lg text-slate-400 max-w-2xl" variants={childVariants}>{project.shortDescription}</motion.p>
          </div>

          <motion.div className="w-full relative rounded-lg overflow-hidden" style={{ aspectRatio: "16/9" }} variants={childVariants}>
            <Image src={project.thumbnail} alt={project.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-8 md:mt-12">
            <div className="md:col-span-1 space-y-6 text-white">
              <motion.div variants={childVariants}>
                <h3 className="text-lg font-semibold text-slate-200">Timeline</h3>
                <p className="text-slate-400 pt-2">{project.timeframe}</p>
              </motion.div>
              <motion.div variants={childVariants}>
                <h3 className="text-lg font-semibold text-slate-200">Tech Stack</h3>
                <p className="text-slate-400 pt-2">{project.techStack.join(", ")}</p>
              </motion.div>
              {project.link && (
                <motion.div variants={childVariants}>
                  <Button onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")}>Visit website</Button>
                </motion.div>
              )}
            </div>

            <div className="md:col-span-2 space-y-10 text-white">
              {renderProjectSection("Overview", project.overview)}
              {project.features && renderFeatures(project.features)}
              {project.objectives && renderProjectSection("Objectives", project.objectives, true)}
              {project.challenges && (
                <motion.section variants={childVariants}>
                  <h2 className="text-3xl font-semibold text-slate-200">Challenges & Solutions</h2>
                  <div className="pt-4">
                    <div className="overflow-hidden border border-slate-800 rounded-lg divide-y divide-slate-800">
                      {project.challenges.map((item, index) => (
                        <div key={index} className="flex flex-col md:flex-row">
                          <div className="p-5 md:p-6 md:w-1/2 bg-slate-900/20">
                            <h3 className="text-lg font-medium text-slate-200 mb-2">{item.problem}</h3>
                            <p className="text-slate-400" dangerouslySetInnerHTML={{ __html: renderMarkdown(item.solution) }} />
                          </div>
                          <div className="p-5 md:p-6 md:w-1/2">
                            <h3 className="text-lg font-medium text-slate-200 mb-2">Solution</h3>
                            <p className="text-slate-400" dangerouslySetInnerHTML={{ __html: renderMarkdown(item.solution) }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.section>
              )}
              {project.results && (
                <motion.section variants={childVariants}>
                  <h2 className="text-3xl font-semibold text-slate-200">Results</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                    {project.results.map((result, index) => (
                      <div key={index} className={`result-card group relative bg-slate-900/20 border border-slate-800/40 p-6 rounded-lg text-center cursor-pointer ${project.results.length === 3 && index === 2 && "sm:col-span-2 lg:col-span-1"}`} style={{ "--mouse-x": "0px", "--mouse-y": "0px" }}>
                        <div className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-lg" style={{ background: "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent 40%)" }} />
                        <div className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" style={{ background: "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent 40%)", left: "-1px", top: "-1px", right: "-1px", bottom: "-1px", transform: "scale(1.02)" }} />
                        <div className="relative z-10 transition-transform duration-300 group-hover:scale-105 group-hover:translate-y-[-2px]">
                          <div className="text-3xl md:text-4xl font-bold text-slate-200 mb-2">{result.number}</div>
                          <p className="text-slate-400" dangerouslySetInnerHTML={{ __html: renderMarkdown(result.description) }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}
              {project.learnings && renderProjectSection("Key Learnings", project.learnings)}
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
