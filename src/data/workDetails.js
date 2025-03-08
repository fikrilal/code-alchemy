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
    title: "Mobile ERP - Employee Attendance & Workforce Management",
    slug: "mobile-erp",
    shortDescription:
      "A mobile ERP solution for employee attendance, shift management, and payroll access with geofencing-based check-ins.",
    overview:
      "This project was developed for a **Japanese company** while working under **Nodewave**. Managing employee attendance accurately is a challenge for many companies, especially with remote or multiple-location teams. Mobile ERP is a workforce management solution that enables employees to check in securely using geofencing, track shifts, request leave, and access payroll data seamlessly. The app ensures security, preventing location spoofing and unauthorized check-ins.",
    objectives: [
      "Implement **secure geofencing-based attendance tracking** with OpenStreetMap.",
      "Develop **a robust authentication system** with session management.",
      "Enable **real-time shift management** to assign or swap shifts dynamically.",
      "Ensure **data integrity and security** against GPS spoofing and mock locations.",
    ],
    targetUsers: [
      {
        role: "Employees",
        needs:
          "Check in for work, view shifts, request leave, and access payroll.",
      },
      {
        role: "HR & Admins",
        needs:
          "Monitor attendance logs, approve leave, and manage workforce schedules.",
      },
    ],
    features: [
      "📍 **Geofencing Attendance** – Ensures employees check in within a **100-meter radius** of the workplace.",
      "📸 **Selfie Verification** – Requires employees to take a **real-time photo** as proof of attendance.",
      "🚫 **Mock Location Prevention** – Uses **Device Info Plus** and backend validation to detect location spoofing.",
      "🔑 **Secure Authentication** – Implements **access & refresh tokens** stored with **Flutter Secure Storage**.",
      "📆 **Shift Management** – Employees can view and request shift changes based on company policies.",
      "📝 **Leave Request System** – Submit leave applications digitally, with document uploads for approval.",
      "💰 **Payslip Access** – Employees can **view and download** their monthly salary breakdown in PDF format.",
    ],
    techStack: [
      "Flutter (Dart)",
      "GetX (State Management)",
      "OpenStreetMap + Leaflet",
      "Geolocator & Geofence Service",
      "Device Info Plus (Mock Location Detection)",
      "Dio (API Requests)",
      "Shared Preferences & Get Storage",
      "File Picker & Open File (For document uploads)",
    ],
    challenges: [
      {
        problem: "Ensuring employees only check in at the correct location.",
        solution:
          "Implemented **geofencing with OpenStreetMap** and validated GPS coordinates server-side.",
      },
      {
        problem: "Handling mock location & GPS spoofing.",
        solution:
          "Used **Device Info Plus** to detect fake GPS apps and added backend validation.",
      },
      {
        problem: "Managing authentication securely.",
        solution:
          "Implemented **access & refresh tokens** with auto-renewal using **Flutter Secure Storage**.",
      },
    ],
    results: [
      {
        number: "85%",
        description: "Increased attendance accuracy with geofencing.",
      },
      {
        number: "100m",
        description: "Ensured strict geofencing validation for check-ins.",
      },
      {
        number: "40%",
        description:
          "Reduced administrative workload with automated shift management.",
      },
    ],
    learnings:
      "Working on this project under **Nodewave** reinforced the importance of **location-based security** and efficient **session management** in workforce applications. Future improvements will focus on AI-powered attendance insights and performance tracking.",
    timeframe: "Q3 2024 - Q4 2024",
    link: "https://mobile-erp.com",
    thumbnail: "/images/mobile-erp-thumbnail.png",
    images: [
      "/images/mobile-erp-1.jpg",
      "/images/mobile-erp-2.jpg",
      "/images/mobile-erp-3.jpg",
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
