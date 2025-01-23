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
    <section className="flex flex-col items-center justify-center min-h-screen text-center bg-white bg-[url('/bg-shape.svg')] bg-cover bg-center">
      {/* Role */}
      <p className="text-sm font-mono text-slate-700 tracking-wide uppercase mb-4 mt-40">
        MOBILE ENGINEER • UX DESIGNER
      </p>

      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-semibold text-slate-900 !leading-tight">
        Hi, I’m Fikril—a Mobile Engineer <br /> based in Jakarta, Indonesia
      </h1>

      {/* Subtitle */}
      <p className="mt-5 text-lg md:text-xl text-slate-700 max-w-4xl !leading-[1.8]">
        I love building apps and crafting designs that people actually enjoy
        using. Whether it’s coding something cool or tweaking pixels to
        perfection, I’m all about turning ideas into reality.
      </p>

      {/* Call-to-Actions */}
      <div className="mt-10 flex flex-col md:flex-row gap-4 pb-4">
        <button className="px-6 py-3 w-32 group text-slate-100 border-2 border-gray-300 text-sm font-medium rounded-xl bg-gradient-to-b from-gray-600 to-gray-900 transition hover:from-gray-800 hover:to-gray-900">
          Contact Me
        </button>
        <button className="px-6 py-3 w-32 bg-white-100 text-slate-900 border border-gray-300 text-sm font-medium rounded-xl shadow-sm hover:bg-gray-100 transition">
          Blog
        </button>
      </div>
      <Carousel images={myImages} />
    </section>
  );
}
