import { BriefcaseBusinessIcon, CodeXmlIcon } from "lucide-react";

import type { ExperienceItemType } from "@/components/work-experience";

export const EXPERIENCES: ExperienceItemType[] = [
  {
    id: "siesta",
    companyName: "SIESTA",
    companyLogo: "/images/companies/siesta.png",
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
        description: `Shipped PesantrenQu's rewrite into Flutter as a multi-tenant school product with tiered offerings — now used by 15+ schools and 3,000+ users. Built server-driven entitlements so each client can turn modules on or off from one codebase; new white-label setups went from roughly three days to about one.`,
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
    companyLogo: "/images/companies/studyo-io.jpeg",
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
        description: `Worked remotely at Studyo (London HQ, team mostly in Indonesia) and shipped a real-time tutoring platform with a small cross-functional group — 1:1 Agora RTC video with per-minute pricing, plus Isar caching and FCM push so live sessions stayed responsive.`,
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
    companyLogo: "/images/companies/nodewave.jpeg",
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
    companyLogo: "/images/companies/dropify.png",
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