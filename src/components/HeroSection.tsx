import MotionElement from "@/components/animations/Motion";
import Button from "@/components/ui/Button";

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

export default function HeroSection() {
  return (
    <MotionElement
      as="section"
      className="flex flex-col items-start transition-colors duration-300 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl w-full mx-auto pt-20 sm:pt-24 lg:pt-52 sm:pb-24 lg:pb-40 px-4 sm:px-6 lg:px-8 xl:px-0">
        <MotionElement
          as="p"
          className="text-sm font-mono text-slate-400 tracking-wide uppercase mb-4 mt-16"
          variants={childVariants}
        >
          MOBILE ENGINEER • UX DESIGNER
        </MotionElement>

        <MotionElement
          as="h1"
          className="text-4xl md:text-6xl font-semibold text-slate-100 leading-[1.2] sm:!leading-tight max-w-4xl"
          variants={childVariants}
        >
          Hi, I’m Fikril—a Mobile Engineer based in Bandung, Indonesia
        </MotionElement>

        <MotionElement
          as="p"
          className="mt-3 sm:mt-4 lg:mt-5 text-base sm:text-base md:text-xl text-slate-300 max-w-4xl leading-[1.6] sm:!leading-[1.8]"
          variants={childVariants}
        >
          I love building apps and crafting designs that people actually enjoy
          using. Whether it’s coding something cool or tweaking pixels to
          perfection, I’m all about turning ideas into reality.
        </MotionElement>

        <MotionElement
          as="div"
          className="mt-8 sm:mt-8 lg:mt-10 flex flex-col md:flex-row gap-4 pb-4 w-full justify-start items-start md:items-center"
          variants={childVariants}
        >
          <Button as="a" href="mailto:fikrildev@gmail.com">
            Contact Me
          </Button>
        </MotionElement>
      </div>
    </MotionElement>
  );
}
