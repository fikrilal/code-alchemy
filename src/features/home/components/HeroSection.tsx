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

const heroPixels = [
  { top: "6%", left: "58%", size: 18, delay: "0s", duration: "9s" },
  { top: "14%", left: "72%", size: 26, delay: "-1.2s", duration: "11s" },
  { top: "20%", left: "63%", size: 14, delay: "-0.8s", duration: "8s" },
  { top: "26%", left: "79%", size: 20, delay: "-3.4s", duration: "10s" },
  { top: "32%", left: "68%", size: 32, delay: "-2.2s", duration: "12s" },
  { top: "38%", left: "84%", size: 16, delay: "-4.5s", duration: "8.5s" },
  { top: "46%", left: "60%", size: 22, delay: "-1.8s", duration: "10.5s" },
  { top: "52%", left: "73%", size: 12, delay: "-5.2s", duration: "7.5s" },
  { top: "56%", left: "80%", size: 28, delay: "-2.7s", duration: "11.5s" },
  { top: "62%", left: "66%", size: 18, delay: "-3.1s", duration: "9.5s" },
  { top: "68%", left: "76%", size: 24, delay: "-0.4s", duration: "12.5s" },
  { top: "74%", left: "59%", size: 14, delay: "-6s", duration: "8s" },
];

export default function HeroSection() {
  return (
    <MotionElement
      as="section"
      className="relative flex min-h-[100svh] items-center overflow-hidden transition-colors duration-300"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-24 left-[8%] h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl sm:h-80 sm:w-80 lg:h-[26rem] lg:w-[26rem]" />
        <div className="absolute top-[10%] right-[12%] h-80 w-80 rounded-full bg-cyan-400/14 blur-3xl sm:h-[24rem] sm:w-[24rem] lg:h-[32rem] lg:w-[32rem]" />
        <div className="absolute top-[24%] right-[28%] h-64 w-64 rounded-full bg-blue-500/12 blur-3xl lg:h-[26rem] lg:w-[26rem]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_32%),linear-gradient(180deg,rgba(2,6,23,0.06)_0%,rgba(2,6,23,0)_32%,rgba(2,6,23,0.28)_100%)]" />
      </div>

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24">
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-[-10%] right-[-10%] hidden w-[36%] lg:block"
          >
            <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_35%_35%,rgba(103,232,249,0.18),transparent_30%),radial-gradient(circle_at_72%_46%,rgba(96,165,250,0.16),transparent_32%),radial-gradient(circle_at_48%_62%,rgba(74,222,128,0.12),transparent_28%)] blur-2xl" />
            {heroPixels.map((pixel, index) => (
              <span
                key={`${pixel.top}-${pixel.left}-${pixel.size}`}
                className="hero-pixel absolute rounded-[4px] border border-cyan-200/10 bg-gradient-to-br from-cyan-200/28 via-sky-300/18 to-emerald-200/10 shadow-[0_0_18px_rgba(56,189,248,0.08)]"
                style={{
                  top: pixel.top,
                  left: pixel.left,
                  width: `${pixel.size}px`,
                  height: `${pixel.size}px`,
                  animationDelay: pixel.delay,
                  animationDuration: pixel.duration,
                  opacity: 0.55 - (index % 3) * 0.08,
                }}
              />
            ))}
            <div className="hero-pixel-line absolute top-[34%] left-[61%] h-[1px] w-[16%] bg-gradient-to-r from-transparent via-cyan-200/45 to-transparent" />
            <div className="hero-pixel-line absolute top-[58%] left-[69%] h-[1px] w-[18%] bg-gradient-to-r from-transparent via-emerald-200/35 to-transparent" />
          </div>

          <div className="max-w-4xl">
            <MotionElement
              as="p"
              className="mb-4 text-sm font-mono tracking-wide uppercase text-slate-300"
              variants={childVariants}
            >
              MOBILE ENGINEER • FOUNDING ENGINEER
            </MotionElement>

            <MotionElement
              as="h1"
              className="max-w-5xl text-4xl font-semibold leading-[1.15] text-slate-50 md:text-6xl sm:leading-tight!"
              variants={childVariants}
            >
              Hi, I’m Fikril—a Mobile Engineer based in Bandung, Indonesia
            </MotionElement>

            <MotionElement
              as="p"
              className="mt-3 max-w-4xl text-base font-light leading-[1.7]! text-slate-200 sm:mt-4 md:text-xl sm:leading-[1.8]!"
              variants={childVariants}
            >
              I typically take end-to-end ownership across the 0 → 1 phase:
              defining Flutter app architecture, patterns, and tooling, and
              driving the initial release into production.
            </MotionElement>

            <MotionElement
              as="div"
              className="mt-8 flex w-full flex-col items-start justify-start gap-4 pb-4 md:flex-row md:items-center lg:mt-10"
              variants={childVariants}
            >
              <Button as="a" href="mailto:fikrildev@gmail.com">
                Contact Me
              </Button>
            </MotionElement>
          </div>
        </div>
      </div>

      <style>{`
        .hero-pixel {
          animation-name: heroPixelDrift;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }

        .hero-pixel-line {
          animation: heroPixelLinePulse 6.8s ease-in-out infinite;
          will-change: opacity, transform;
        }

        @keyframes heroPixelDrift {
          0% {
            transform: translate3d(0, 0, 0) scale(0.96);
            opacity: 0.18;
          }
          25% {
            transform: translate3d(8px, -12px, 0) scale(1);
            opacity: 0.42;
          }
          50% {
            transform: translate3d(-4px, 10px, 0) scale(1.08);
            opacity: 0.24;
          }
          75% {
            transform: translate3d(12px, 4px, 0) scale(0.98);
            opacity: 0.4;
          }
          100% {
            transform: translate3d(0, 0, 0) scale(0.96);
            opacity: 0.18;
          }
        }

        @keyframes heroPixelLinePulse {
          0%,
          100% {
            opacity: 0.12;
            transform: scaleX(0.92);
          }
          50% {
            opacity: 0.38;
            transform: scaleX(1.06);
          }
        }
      `}</style>
    </MotionElement>
  );
}
