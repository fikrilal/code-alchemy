import Navbar from "@/components/Navbar";
import Hero from "@/components/HeroSection";
import SelectedWork from "@/components/SelectedWork";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import PortfolioSection from "@/components/PortfolioSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <PortfolioSection />
      <SelectedWork />
      <BlogSection />
      <Footer />
    </>
  );
}
