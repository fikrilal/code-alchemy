import Image from "next/image";

import MotionElement from "@/components/animations/Motion";
import SpotifyNowPlaying from "@/components/SpotifyNowPlaying";
import GithubActivity from "@/components/GithubActivity";
import TechStack from "@/components/TechStack";
import IconCards from "@/components/IconCards";
import SideHustleFlashCard from "@/components/SideHustleFlashCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

export default function PortfolioSection() {
  return (
    <MotionElement
      as="section"
      className="w-full px-4 sm:px-6 lg:px-8 pt-20 text-slate-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <MotionElement
            as="div"
            className="bg-slate-1000 p-6 rounded-2xl border border-slate-800"
            variants={childVariants}
          >
            <p className="text-xs font-mono text-slate-500 tracking-widest mb-2 uppercase">
              RECENT PROJECT
            </p>
            <h3 className="text-xl text-slate-100 font-semibold mb-2">
              Math Tetris Game
            </h3>
            <p className="text-sm sm:text-base md:text-base font-light text-slate-300">
              A fast-paced mobile game combining math puzzles with Tetris
              mechanics.
            </p>
            <div className="mt-4 w-full aspect-[14/9] overflow-hidden rounded-xl">
              <Image
                src="/images/recent-project-thumbnail.png"
                alt="Recent Project screenshot"
                width={1390}
                height={782}
                className="w-full h-full object-cover"
              />
            </div>
          </MotionElement>

          <MotionElement as="div" variants={childVariants}>
            <SideHustleFlashCard />
          </MotionElement>

          <MotionElement
            as="div"
            className="flex flex-col gap-4 h-full"
            variants={childVariants}
          >
            <SpotifyNowPlaying />
            <IconCards />
          </MotionElement>
        </div>

        <div className="relative w-full overflow-hidden rounded-lg xl:aspect-[15/5]">
          <div className="grid grid-cols-1 xl:absolute xl:inset-0 xl:grid-cols-2 gap-4">
            <TechStack />
            <GithubActivity />
          </div>
        </div>
      </div>
    </MotionElement>
  );
}
