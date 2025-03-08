const workDetails = [
  {
    id: 1,
    title: "Tutor App - Real-Time Online Tutoring Platform",
    slug: "tutor-app",
    shortDescription:
      "A scalable online tutoring platform with real-time video calls, authentication, and tutor verification.",
    overview:
      "Finding qualified tutors on demand can be challenging for students. The Tutor App provides an efficient way to match students with tutors based on subject expertise, availability, and ratings. With built-in video calls, real-time notifications, and session tracking, the platform ensures a smooth and interactive learning experience.",
    objectives: [
      "Develop a scalable architecture using Clean Architecture principles.",
      "Enable seamless real-time video sessions with reliable reconnection handling.",
      "Implement a secure authentication system using Flutter Secure Storage.",
      "Ensure only verified tutors can upload content and accept student session requests.",
    ],
    targetUsers: [
      {
        role: "Students",
        needs:
          "Book tutors, attend live sessions, and watch educational content.",
      },
      {
        role: "Tutors",
        needs:
          "Verify their profiles, create educational content, and accept session requests.",
      },
      {
        role: "Admin",
        needs: "Approve tutor profiles and moderate content.",
      },
    ],
    features: [
      "🎥 Live Video Sessions – Powered by Agora SDK with tracking and auto-pricing.",
      "💰 Auto-Pricing & Billing – Dynamic pricing based on session duration.",
      "🔄 Freeze-Unfreeze Mechanism – Prevents session loss due to connectivity issues.",
      "📩 Real-Time Notifications – Session alerts via Firebase Cloud Messaging (FCM).",
      "🔑 Secure Authentication – Uses Flutter Secure Storage for token management.",
      "📹 TikTok-Style Video Feature – Tutors upload educational videos with thumbnails.",
      "🔍 Profile Verification – Tutors must submit content and details for admin approval.",
      "📱 Core Component Development – Standardized UI components for scalable development.",
    ],
    techStack: [
      "Flutter (Dart)",
      "Firebase Firestore",
      "Firebase Authentication",
      "GetX (State Management)",
      "Agora SDK (Real-Time Video Calls)",
      "Firebase Cloud Messaging (FCM)",
      "Flutter Secure Storage",
      "Isar Database (Local Caching)",
    ],
    challenges: [
      {
        problem: "High Firebase Firestore costs due to frequent reads.",
        solution: "Implemented local caching with Isar to reduce API calls.",
      },
      {
        problem: "Agora RTM signaling was too costly.",
        solution:
          "Switched to Firebase Notifications for signaling, reducing expenses.",
      },
      {
        problem: "Students losing connection during sessions.",
        solution:
          "Developed a freeze-unfreeze mechanism to allow reconnection without losing progress.",
      },
      {
        problem: "Ensuring only verified tutors can accept sessions.",
        solution:
          "Built a profile verification process requiring admin approval.",
      },
    ],
    results: [
      {
        number: "40%",
        description: "Increased tutor-student matching efficiency",
      },
      {
        number: "50%",
        description: "Reduced Firebase costs using local caching",
      },
      {
        number: "95%",
        description:
          "Session completion rate with enhanced connection handling",
      },
    ],
    learnings:
      "Leading this project reinforced the importance of Clean Architecture and reusable components in scalable Flutter applications. Future improvements will focus on AI-based tutor recommendations and advanced session analytics for personalized learning experiences.",
    timeframe: "Q2 2024 - Q4 2024",
    link: "https://tutor-app.com",
    thumbnail: "/images/tutor-thumbnail.png",
    images: [
      "/images/tutor-1.jpg",
      "/images/tutor-2.jpg",
      "/images/tutor-3.jpg",
    ],
  },

  {
    id: 2,
    title: "E-Porter QR+",
    slug: "eporter-qr-plus",
    shortDescription:
      "An AI-powered airport porter service with QR-based tracking.",
    overview:
      "E-Porter QR+ solves the hassle of finding airport porters. By scanning a QR code, passengers can book a porter instantly, ensuring efficient baggage handling.",
    objectives: [
      "Ensure a seamless porter booking experience through QR codes.",
      "Reduce lost baggage incidents by 40% using AI tracking.",
      "Increase porter utilization efficiency by 60%.",
    ],
    targetUsers: [
      {
        role: "Passengers",
        needs: "Book a porter, track their baggage, and get real-time updates.",
      },
      {
        role: "Porters",
        needs:
          "Receive job requests, navigate to the customer, and confirm baggage handoff.",
      },
      {
        role: "Airport Admin",
        needs: "Monitor porter efficiency and optimize workforce allocation.",
      },
    ],
    features: [
      "📲 QR-Based Porter Booking – Scan and get instant service.",
      "🛅 Real-Time Baggage Tracking – AI-powered monitoring.",
      "📊 Workforce Optimization – Intelligent task distribution for porters.",
    ],
    techStack: ["Flutter", "React", "Firebase", "Node.js"],
    challenges: [
      {
        problem: "QR scanning latency was too high, affecting user experience.",
        solution: "Optimized QR decoding algorithm to reduce lag by 70%.",
      },
    ],
    results: [
      {
        number: "42%",
        description: "Reduced baggage mishandling incidents",
      },
      {
        number: "58%",
        description: "Increased porter efficiency",
      },
      {
        number: "9.2/10",
        description: "Customer satisfaction score",
      },
    ],
    learnings:
      "Optimizing QR scanning speed was crucial. Future iterations will include AI-driven predictive booking.",
    timeframe: "Q2 2023 - Q4 2023",
    link: "https://eporter-qr.com",
    thumbnail: "/images/shot.png",
    images: [
      "/images/dummy-image.jpg",
      "/images/dummy-image.jpg",
      "/images/dummy-image.jpg",
    ],
  },
  {
    id: 3,
    title: "EduTrack - Smart Attendance System",
    slug: "edutrack-smart-attendance",
    shortDescription:
      "A biometric and geolocation-based attendance tracking system for schools and businesses.",
    overview:
      "Many institutions face challenges in tracking attendance accurately. EduTrack provides a seamless, fraud-proof solution by integrating facial recognition and geofencing technology.",
    objectives: [
      "Eliminate buddy punching and manual attendance fraud.",
      "Ensure real-time tracking of employee and student attendance.",
      "Generate automated reports for HR and school administrators.",
    ],
    timeframe: "Q3 2023 - Q1 2024",
    link: "https://edutrack-system.com",
    targetUsers: [
      {
        role: "Students & Employees",
        needs: "Easily mark attendance without manual sign-ins.",
      },
      {
        role: "Administrators",
        needs: "Track and verify attendance records in real-time.",
      },
    ],
    features: [
      "📸 Biometric Authentication – Facial recognition ensures identity verification.",
      "📍 Geolocation-Based Tracking – Prevents proxy attendance fraud.",
      "📊 Automated Reports – Generates attendance analytics.",
    ],
    techStack: [
      "React",
      "TailwindCSS",
      "Django",
      "PostgreSQL",
      "AWS Rekognition",
      "Google Maps API",
      "AWS Lambda",
      "Docker",
    ],
    thumbnail: "/images/shot.png",
    images: [
      "/images/edutrack-1.jpg",
      "/images/edutrack-2.jpg",
      "/images/edutrack-3.jpg",
    ],
  },
  {
    id: 4,
    title: "MediSync - AI Health Assistant",
    slug: "medisync-ai-health",
    shortDescription:
      "A virtual health assistant that provides AI-powered medical recommendations.",
    overview:
      "Patients often struggle with self-diagnosis and medical queries. MediSync leverages AI to provide preliminary health assessments and connects users with healthcare professionals.",
    objectives: [
      "Provide 24/7 AI-based health assessments.",
      "Reduce unnecessary doctor visits by 35%.",
      "Connect patients with healthcare professionals efficiently.",
    ],
    timeframe: "Q1 2024 - Present",
    link: "https://medisync-ai.com",
    targetUsers: [
      {
        role: "Patients",
        needs: "Receive AI-powered health insights and doctor recommendations.",
      },
      {
        role: "Doctors",
        needs: "Access AI-assisted patient reports for better decision-making.",
      },
    ],
    features: [
      "🤖 AI-Powered Health Recommendations – Assists in preliminary diagnosis.",
      "📞 Instant Doctor Consultation – Connects patients with healthcare professionals.",
      "📊 Health Monitoring Dashboard – Tracks symptoms and vitals over time.",
    ],
    techStack: [
      "React Native",
      "Expo",
      "FastAPI",
      "MongoDB",
      "Google Health API",
      "Twilio Video",
      "GCP AI Models",
      "AWS S3",
    ],
    thumbnail: "/images/shot.png",
    images: [
      "/images/medisync-1.jpg",
      "/images/medisync-2.jpg",
      "/images/medisync-3.jpg",
    ],
  },
];

export default workDetails;
