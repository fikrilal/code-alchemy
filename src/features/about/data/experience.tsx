import { BriefcaseBusinessIcon, CodeXmlIcon } from "lucide-react";

import type { ExperienceItemType } from "@/components/work-experience";

export const EXPERIENCES: ExperienceItemType[] = [
  {
    id: "siesta",
    companyName: "SIESTA",
    companyWebsite: "https://siesta.ai",
    isCurrentEmployer: true,
    positions: [
      {
        id: "siesta-jr-mobile",
        title: "Mobile Engineer",
        employmentPeriod: {
          start: "02.2025",
        },
        employmentType: "On-site",
        icon: <CodeXmlIcon aria-hidden />,
        description: `Helped standardize SIESTA's Flutter stack after the React Native era — Clean Architecture with vertical slices, GetX in a Cubit-style setup, feature-first repos, and dev/staging/prod flavors across apps.

Led PesantrenQu's rewrite into Flutter as a multi-tenant school product with tiered offerings — now used by 15+ schools and 3,000+ users. Built server-driven entitlements so each client can turn modules on or off from one codebase; new white-label setups went from roughly three days to about one.

On KoperasiQu, delivered v1 and owned auth, KYC, wallet top-ups, internal payment flows, savings payments, and in-app tickets — all scoped per cooperative tenant.`,
        skills: [
          "Flutter",
          "Dart",
          "GetX",
          "Clean Architecture",
          "Multi-tenant",
          "White-label",
        ],
        isExpanded: true,
      },
    ],
  },
  {
    id: "studyo",
    companyName: "Studyo.io",
    companyWebsite: "https://studyo.io",
    positions: [
      {
        id: "studyo-mobile-engineer",
        title: "Mobile Engineer",
        employmentPeriod: {
          start: "07.2024",
          end: "02.2025",
        },
        employmentType: "Remote",
        icon: <CodeXmlIcon aria-hidden />,
        description: `Worked remotely at Studyo, a London-headquartered startup with most of the team in Indonesia, helping lead a small cross-functional group (two mobile, one backend, one UI/UX) to ship a real-time tutoring platform.

Built 1:1 video calling on Agora RTC — session flow, live connection handling, and per-minute pricing wired into the mobile experience.

Structured the app with clean architecture, local caching (Isar), and FCM push signaling so sessions felt responsive without leaning on the backend for every state change.`,
        skills: [
          "Flutter",
          "Agora RTC",
          "Clean Architecture",
          "Isar",
          "FCM",
        ],
      },
    ],
  },
  {
    id: "nodewave",
    companyName: "Nodewave",
    positions: [
      {
        id: "nodewave-intern",
        title: "Mobile Developer Intern",
        employmentPeriod: {
          start: "08.2024",
          end: "12.2024",
        },
        employmentType: "On-site",
        icon: <BriefcaseBusinessIcon aria-hidden />,
      },
    ],
  },
  {
    id: "dropify",
    companyName: "Dropify Technologies",
    positions: [
      {
        id: "dropify-intern",
        title: "Full Stack Developer Intern",
        employmentPeriod: {
          start: "02.2024",
          end: "05.2024",
        },
        employmentType: "Remote",
        icon: <BriefcaseBusinessIcon aria-hidden />,
      },
    ],
  },
];