import Button from "@/components/ui/Button";
import MotionElement from "@/components/ui/MotionElement";

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
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function HeroSection() {
  return (
    <MotionElement
      as="section"
      className="relative flex min-h-[100svh] items-center transition-colors duration-300"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24">
        <MotionElement
          as="p"
          className="text-sm font-mono text-slate-300 tracking-wide uppercase mb-4"
          variants={childVariants}
        >
          MOBILE ENGINEER • FOUNDING ENGINEER
        </MotionElement>

        <MotionElement
          as="h1"
          className="text-4xl md:text-6xl font-semibold text-slate-50 leading-[1.2] sm:leading-tight! max-w-4xl"
          variants={childVariants}
        >
          Hi, I’m Fikril—a Mobile Engineer based in Bandung, Indonesia
        </MotionElement>

        <MotionElement
          as="p"
          className="mt-3 sm:mt-4 lg:mt-5 text-base sm:text-base md:text-xl font-light text-slate-200 max-w-4xl leading-[1.6] sm:leading-[1.8]!"
          variants={childVariants}
        >
          I typically take end-to-end ownership across the 0 → 1 phase: defining
          Flutter app architecture, patterns, and tooling, and driving the
          initial release into production.
        </MotionElement>

        <MotionElement
          as="div"
          className="mt-8 sm:mt-8 lg:mt-10 flex w-full flex-col items-start justify-start gap-4 pb-4 md:flex-row md:items-center"
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
