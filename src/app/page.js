import Navbar from "@/components/Navbar";
import Hero from "@/components/HeroSection";
import Carousel from "@/components/Carousel";

export default function Home() {
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
    <>
      <Navbar />
      <Hero />
    </>
  );
}
