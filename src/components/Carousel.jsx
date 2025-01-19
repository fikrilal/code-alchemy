"use client";

import Marquee from "react-fast-marquee";

export default function Carousel({ images }) {
  return (
    <section className="w-full bg-white py-8 flex items-center justify-center overflow-hidden">
      <Marquee gradient={false} speed={100} className="w-full">
        {images.map((image, index) => (
          <div
            key={index}
            className="h-[280px] sm:h-[300px] md:h-[450px] lg:h-[560px] mx-2 sm:mx-3 lg:mx-4 flex-none"
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
