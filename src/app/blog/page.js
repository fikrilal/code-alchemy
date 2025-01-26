// app/blog/page.js
import { format } from "date-fns";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogListSection from "./components/ListSection";
import BlogMainSection from "./components/MainSection";

export default function BlogHomePage() {
  // Dummy posts data
  const posts = [
    {
      slug: "daytona-times-square",
      title: "Daytona Lights Up Times Square",
      author: "Ivan Burazin",
      role: "CEO & CO-FOUNDER",
      date: "2024-12-31",
      excerpt:
        "Daytona lights up Times Square after becoming #1 open-source CDE in record time. See how this dev environment manager is transforming coding.",
      image: "/images/image1.png",
      popular: true,
      highlight: true,
    },
    {
      slug: "ai-generated-code",
      title: "Run AI-Generated Code Safely with Daytona Sandboxes",
      date: "2024-11-15",
      author: "Jaafar Mummed",
      excerpt:
        "Learn how to safely execute AI-generated code using Daytona's isolated sandbox environments.",
      image: "/images/image1.png",
      popular: true,
    },
    {
      slug: "ai-enablement-stack",
      title: "Building Better AI Agents: The AI Enablement Stack",
      date: "2024-10-02",
      author: "Sarah Johnson",
      excerpt:
        "Discover the essential components of a robust AI enablement stack for modern development.",
      image: "/images/image1.png",
      popular: true,
    },
    {
      slug: "daytona-openhands",
      title: "Instant AI Development with Daytona and OpenHands",
      date: "2024-09-18",
      author: "Michael Chen",
      excerpt:
        "Accelerate your AI development workflow with the Daytona and OpenHands integration.",
      image: "/images/image1.png",
      popular: true,
    },
    {
      slug: "remote-development-productivity",
      title: "Remote Development Productivity: Lessons from Slack",
      date: "2024-08-05",
      author: "Emma Wilson",
      excerpt:
        "Key productivity insights from Slack's remote development team implementation.",
      image: "/images/image1.png",
      popular: true,
    },
    {
      slug: "virtual-desktop-hurdles",
      title: "The Hurdles of Virtual Desktop Infrastructure",
      date: "2024-07-12",
      author: "Alex Martinez",
      excerpt:
        "Understanding the challenges and solutions in modern virtual desktop infrastructure.",
      image: "/images/image1.png",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-40">
        <BlogMainSection posts={posts} />
        <BlogListSection posts={posts} />
      </div>
      <Footer />
    </>
  );
}
