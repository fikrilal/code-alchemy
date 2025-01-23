import Navbar from "@/components/Navbar";
import Hero from "@/components/HeroSection";
import Skills from "@/components/Skills";
import SelectedWork from "@/components/SelectedWork";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

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
      <Skills />
      <SelectedWork />
      <BlogSection />
      <Footer />
    </>
  );
}
