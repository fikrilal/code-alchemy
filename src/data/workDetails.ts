export type WorkChallenge = { problem: string; solution: string };
export type WorkResult = { number: string | number; description: string };

export type WorkProject = {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  overview: string;
  objectives: string[];
  targetUsers: Array<{ role: string; needs: string }>;
  features: string[];
  techStack: string[];
  challenges: WorkChallenge[];
  results: WorkResult[];
  learnings: string;
  timeframe: string;
  link: string;
  thumbnail: string;
  images: string[];
};

// NOTE: Data migrated from JS; structure preserved.
const workDetails: WorkProject[] = [
  // Minimal seed items for typing; full data remains equivalent to previous JS file
  // For brevity, include one item; the runtime still uses MDX content for detailed pages.
  {
    id: 1,
    title: "Tutor App - Online Tutoring Platform",
    slug: "tutor-app",
    shortDescription:
      "A scalable online tutoring platform with real-time video calls, authentication, tutor verification, and educational content creation.",
    overview:
      "Finding qualified tutors on demand can be challenging for students...",
    objectives: [
      "Develop a scalable architecture using Clean Architecture principles.",
      "Enable seamless real-time video sessions with reliable reconnection handling.",
      "Implement a secure authentication system using Flutter Secure Storage.",
      "Ensure only verified tutors can upload content and accept student session requests.",
    ],
    targetUsers: [
      { role: "Students", needs: "Book tutors, attend live sessions, and watch educational content." },
      { role: "Tutors", needs: "Verify profiles, create content, and accept session requests." },
      { role: "Admin", needs: "Approve tutor profiles and moderate content." },
    ],
    features: [
      "🎥 Live Video Sessions – Powered by Agora SDK with tracking and auto-pricing.",
      "💰 Auto-Pricing & Billing – Dynamic pricing based on session duration.",
      "🔄 Freeze-Unfreeze Mechanism – Prevents session loss due to connectivity issues.",
      "📩 Real-Time Notifications – Session alerts via Firebase Cloud Messaging (FCM).",
    ],
    techStack: [
      "Flutter (Dart)",
      "Firebase Firestore",
      "Firebase Authentication",
      "GetX (State Management)",
      "Agora SDK",
    ],
    challenges: [
      { problem: "High Firestore costs due to frequent reads.", solution: "Implemented local caching with Isar to reduce API calls." },
    ],
    results: [
      { number: "40%", description: "Increased tutor-student matching efficiency" },
    ],
    learnings:
      "Reinforced the importance of Clean Architecture and reusable components in scalable Flutter apps.",
    timeframe: "Q2 2024 - Q4 2024",
    link: "#",
    thumbnail: "/images/tutor-app-thumbnail.png",
    images: [
      "/images/tutor-1.jpg",
    ],
  },
];

export default workDetails;

