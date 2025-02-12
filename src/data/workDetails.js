const workDetails = [
  {
    id: 1,
    title: "Ngawi Smart City",
    slug: "ngawi-smart-city",
    shortDescription:
      "A digital platform to modernize public services and city management.",
    overview:
      "Many cities struggle with inefficient public service management. The Ngawi Smart City project aimed to create a digital solution for smoother communication between the government and citizens, improving response times and decision-making.",
    objectives: [
      "Reduce traffic congestion by 30% using real-time monitoring.",
      "Enable digital access to key government services.",
      "Improve waste management efficiency through IoT-based tracking.",
    ],
    targetUsers: [
      {
        role: "Citizens",
        needs: "Submit complaints, track services, access government updates.",
      },
      {
        role: "Government Officials",
        needs: "Monitor city conditions, optimize resource allocation.",
      },
      {
        role: "Traffic Department",
        needs: "Use AI-powered analytics to manage congestion.",
      },
    ],
    features: [
      "🚀 Real-Time Traffic Monitoring – Uses AI to analyze road congestion.",
      "📱 Citizen Reporting App – Allows residents to report infrastructure issues.",
      "💡 Smart Waste Management – IoT-based tracking of garbage collection.",
    ],
    techStack: {
      frontend: ["Next.js", "TailwindCSS"],
      backend: ["Node.js", "Express.js"],
      database: ["Firebase Firestore"],
      apis: ["Google Maps API", "OpenStreetMap"],
      infrastructure: ["Docker", "AWS Lambda"],
    },
    challenges: [
      {
        problem:
          "Real-time location tracking caused excessive API calls, increasing costs.",
        solution: "Implemented a caching layer to reduce redundant requests.",
      },
    ],
    results: [
      "🚗 Reduced traffic congestion by 28% in key zones.",
      "👥 Increased citizen engagement by 50%.",
      "🏙 Improved waste collection efficiency by 35%.",
    ],
    learnings:
      "This project reinforced the importance of real-time data processing in smart cities. Future improvements will focus on AI-driven analytics for even better decision-making.",
    timeframe: "Q1 2023 - Q3 2023",
    link: "https://ngawi-smart-city.com",
    thumbnail: "/images/shot.png",
    images: [
      "/images/ngawi-1.jpg",
      "/images/ngawi-2.jpg",
      "/images/ngawi-3.jpg",
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
    techStack: {
      frontend: ["Flutter", "React"],
      backend: ["Firebase", "Node.js"],
    },
    challenges: [
      {
        problem: "QR scanning latency was too high, affecting user experience.",
        solution: "Optimized QR decoding algorithm to reduce lag by 70%.",
      },
    ],
    results: [
      "📌 Reduced baggage mishandling incidents by 42%.",
      "💼 Increased porter efficiency by 58%.",
      "🎉 Improved customer satisfaction score to 9.2/10.",
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
    techStack: {
      frontend: ["React", "TailwindCSS"],
      backend: ["Django", "PostgreSQL"],
      apis: ["AWS Rekognition", "Google Maps API"],
      infrastructure: ["AWS Lambda", "Docker"],
    },
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
    techStack: {
      frontend: ["React Native", "Expo"],
      backend: ["FastAPI", "MongoDB"],
      apis: ["Google Health API", "Twilio Video"],
      infrastructure: ["GCP AI Models", "AWS S3"],
    },
    thumbnail: "/images/shot.png",
    images: [
      "/images/medisync-1.jpg",
      "/images/medisync-2.jpg",
      "/images/medisync-3.jpg",
    ],
  },
];

export default workDetails;
