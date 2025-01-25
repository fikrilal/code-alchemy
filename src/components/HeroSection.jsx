"use client";

import Carousel from "@/components/Carousel";

export default function Hero() {
  const myImages = [
    "/images/image2.png",
    "/images/image2.png",
    "/images/image2.png",
    "/images/image2.png",
    "/images/image2.png",
    "/images/image2.png",
    "/images/image2.png",
    "/images/image2.png",
    "/images/image2.png",
  ];

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center bg-white bg-[url('/bg-shape.svg')] bg-cover bg-center pt-12 sm:pt-24 lg:pt-20">
      {/* Role */}
      <p className="text-sm font-mono text-slate-700 tracking-wide uppercase mb-4 mt-16">
        MOBILE ENGINEER • UX DESIGNER
      </p>

      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-semibold text-slate-900 leading-[1.2] sm:!leading-tight max-w-4xl px-4 sm:px-6 lg:px-0">
        Hi, I’m Fikril—a Mobile Engineer based in Jakarta, Indonesia
      </h1>

      {/* Subtitle */}
      <p className="mt-3 sm:mt-4 lg:mt-5 text-base sm:text-base md:text-xl text-slate-700 max-w-4xl leading-[1.6] sm:!leading-[1.8] px-4 sm:px-6 lg:px-8">
        I love building apps and crafting designs that people actually enjoy
        using. Whether it’s coding something cool or tweaking pixels to
        perfection, I’m all about turning ideas into reality.
      </p>

      {/* Call-to-Actions */}
      <div className="mt-4 sm:mt-8 lg:mt-10 flex flex-col md:flex-row gap-4 pb-4 w-full justify-center px-4 sm:px-6 lg:px-8">
        <button
          className="px-6 py-3 sm:px-8 sm:py-4 w-full sm:w-auto flex items-center justify-center group text-slate-100 border-2 border-gray-300 text-md font-medium rounded-xl bg-gradient-to-b from-gray-600 to-gray-900 transition hover:from-gray-800 hover:to-gray-900"
          onClick={() => (window.location.href = "mailto:fikrildev@gmail.com")}
        >
          Let's Talk
          <span className="px-2 ml-1 transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-hover:rotate-45">
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
        </button>
      </div>
      <Carousel images={myImages} />
    </section>
  );
}
