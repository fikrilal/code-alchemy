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
    thumbnail: "/images/tutor-app-thumbnail.png",
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
    thumbnail: "/images/mobile-erp-app-thumbnail.png",
    images: [
      "/images/mobile-erp-1.jpg",
      "/images/mobile-erp-2.jpg",
      "/images/mobile-erp-3.jpg",
    ],
  },

  {
    id: 3,
    title: "CeritaKita - AI-Powered Mental Health Support Platform",
    slug: "cerita-kita",
    shortDescription:
      "An AI-integrated mental health platform built with Kotlin & Jetpack Compose, providing counseling services, journaling, and self-help tools.",
    overview:
      "Developed during Bangkit 2024, CeritaKita is an **AI-powered mental health app** designed to provide **accessible, affordable, and stigma-free mental health support** for Indonesian users. The platform allows users to track their emotional well-being, book counseling sessions, and access self-help resources. Built entirely with **Kotlin & Jetpack Compose**, the app integrates AI-based emotion recognition and counselor recommendations via **backend APIs**. The project was proposed for **140 million IDR in funding** and is positioned as a scalable solution to Indonesia’s mental health challenges.",
    objectives: [
      "Develop a **Kotlin-based Android application** with Jetpack Compose for a modern UI experience.",
      "Integrate AI-powered **emotion recognition and counselor recommendations** via backend APIs.",
      "Implement **secure authentication & session management** using Firebase.",
      "Ensure a **smooth and intuitive user experience** for booking counseling sessions.",
    ],
    targetUsers: [
      {
        role: "Adolescents & Young Adults",
        needs:
          "Safe mental health support without stigma, access to peer mentoring, and self-help tools.",
      },
      {
        role: "Corporate Employees & Professionals",
        needs:
          "Counseling and mental wellness programs to manage workplace stress and burnout.",
      },
      {
        role: "Mental Health Experts & NGOs",
        needs:
          "A platform to extend mental health support to a broader audience efficiently.",
      },
    ],
    features: [
      "📖 **Journaling & Self-Help Tools** – Users can track emotions, write daily reflections, and access mental health guides.",
      "📅 **Session Booking System** – Seamlessly schedule counseling with professionals or peer mentors.",
      "🧠 **AI Integration for Emotion Detection** – Backend API integration for **text & image-based emotion analysis**.",
      "📩 **Personalized Counselor Matching** – AI-driven recommendations based on user needs.",
      "🔐 **Secure Authentication** – Firebase Authentication for user login and data security.",
      "🌎 **Cloud-Connected Infrastructure** – Uses **Google Cloud Firestore** for real-time data management.",
    ],
    techStack: [
      "Kotlin (Jetpack Compose) - Android Development",
      "Firebase Authentication - Secure Login",
      "Google Cloud Firestore - Database",
      "Retrofit - API Integration",
      "FastAPI - AI Model API",
      "Jetpack Navigation - App Flow Management",
    ],
    challenges: [
      {
        problem:
          "Integrating AI-powered emotion recognition seamlessly into the mobile app.",
        solution:
          "Used **Retrofit** to connect with the **FastAPI-based ML API**, ensuring **real-time data processing**.",
      },
      {
        problem:
          "Building a responsive UI with Jetpack Compose for various screen sizes.",
        solution:
          "Implemented **adaptive layouts** and Material 3 components for a modern user experience.",
      },
      {
        problem: "Ensuring secure authentication and session management.",
        solution:
          "Used **Firebase Authentication** with token-based access control for user data security.",
      },
    ],
    results: [
      {
        number: "140M IDR",
        description:
          "Proposed funding for platform development. (**Rejected**—guess investors weren’t ready for AI-powered therapy)",
      },
      {
        number: "95%",
        description:
          "Project completed in under 2 months with positive user feedback.",
      },
      {
        number: "5+ Features",
        description:
          "Integrated session booking, journaling, and authentication.",
      },
    ],

    learnings:
      "This project reinforced my expertise in **Kotlin, Jetpack Compose, and Firebase integration**. The experience of working with **AI-powered APIs** also improved my skills in backend API communication and secure session management.",
    timeframe: "Q1 2024 - Q3 2024",
    link: "https://ceritakita.app",
    thumbnail: "/images/ceritakita-app-thumbnail.png",
    images: [
      "/images/ceritakita-1.jpg",
      "/images/ceritakita-2.jpg",
      "/images/ceritakita-3.jpg",
    ],
  },
  {
    id: 4,
    title: "SummitUp - Mountain Trip Booking & Gear Rental",
    slug: "summitup",
    shortDescription:
      "A mountain trip booking app with integrated payment gateway, rental services, and user reviews.",
    overview:
      "SummitUp is a **hiking-focused marketplace** that helps outdoor enthusiasts **book guided trips, rent hiking gear, and leave reviews**. The platform lists **mountains across Indonesia**, each offering various trip packages and equipment rentals. Users can book trips, make secure payments via **Midtrans**, and manage their hiking plans seamlessly. I worked on both the **mobile app (Flutter + BLoC) and backend (Next.js + SQL)**, ensuring a smooth end-to-end experience.",
    objectives: [
      "Develop a **full-stack solution** for booking mountain trips and renting hiking gear.",
      "Implement a **secure payment gateway using Midtrans** for seamless transactions.",
      "Enable **real-time booking & availability tracking** for trips and rentals.",
      "Ensure a **scalable backend** with Next.js and SQL for handling transactions and user data.",
    ],
    targetUsers: [
      {
        role: "Hikers & Adventure Enthusiasts",
        needs:
          "Find and book guided hiking trips, rent gear, and explore Indonesia’s mountains.",
      },
      {
        role: "Trip Organizers",
        needs:
          "Manage trip bookings, update availability, and process payments securely.",
      },
      {
        role: "Gear Rental Providers",
        needs: "List hiking equipment, track rentals, and handle user reviews.",
      },
    ],
    features: [
      "⛰ **Mountain Listings** – Explore **detailed hiking destinations** across Indonesia.",
      "🎒 **Gear Rental System** – Rent hiking equipment for trips **directly in the app**.",
      "📅 **Trip Booking System** – Book **guided hikes** with **real-time availability tracking**.",
      "💳 **Integrated Payment Gateway** – Secure transactions using **Midtrans** for credit cards, e-wallets, and bank transfers.",
      "🔄 **Order & Booking Management** – Users can **view, cancel, or reschedule trips and rentals**.",
      "⭐ **User Reviews & Ratings** – Leave feedback on **trips, guides, and rented gear**.",
      "📜 **Transaction History** – Track **past bookings and payments** with detailed invoices.",
    ],
    techStack: [
      "Flutter (Dart) - Mobile App",
      "BLoC - State Management",
      "Next.js - Backend",
      "SQL - Database",
      "Midtrans - Payment Gateway",
      "Firebase Authentication - Secure Login",
      "Dio - API Communication",
      "Jetstream & Laravel Sanctum - User Authentication (Backend)",
    ],
    challenges: [
      {
        problem: "Handling secure transactions with a **payment gateway**.",
        solution:
          "Integrated **Midtrans API** with real-time payment verification & automatic booking confirmation.",
      },
      {
        problem: "Ensuring real-time **trip availability updates**.",
        solution:
          "Implemented **database polling and caching** to keep availability accurate without excessive queries.",
      },
      {
        problem:
          "Synchronizing backend & frontend for a smooth booking experience.",
        solution:
          "Used **BLoC for structured state management** and **optimized API response times**.",
      },
    ],
    results: [
      {
        number: "100+",
        description: "Successful bookings processed via **Midtrans**.",
      },
      {
        number: "3 Payment Methods",
        description:
          "Supports **credit cards, e-wallets, and bank transfers**.",
      },
      {
        number: "90%",
        description:
          "Users completed their bookings without issues. (The remaining 10% probably changed their minds mid-hike.)",
      },
    ],
    learnings:
      "Building SummitUp strengthened my expertise in **payment gateway integration, backend development with Next.js, and managing state using BLoC**. Handling **real-time trip bookings and transactions** required deep coordination between the frontend and backend, reinforcing my problem-solving skills in full-stack development.",
    timeframe: "Q2 2024 - Q3 2024",
    link: "https://summitup.com",
    thumbnail: "/images/summitup-app-thumbnail.png",
    images: [
      "/images/summitup-1.jpg",
      "/images/summitup-2.jpg",
      "/images/summitup-3.jpg",
    ],
  },
];

export default workDetails;
