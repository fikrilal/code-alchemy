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
        title: "Jr. Mobile Developer",
        employmentPeriod: {
          start: "02.2025",
        },
        employmentType: "On-site",
        icon: <CodeXmlIcon aria-hidden />,
        description:
          "Building and shipping Flutter products for school and cooperative clients, including white-label deployments and production release workflows.",
        skills: ["Flutter", "Dart", "GetX", "White-label tooling"],
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
        description:
          "Worked remotely with a London-based team on mobile product delivery, architecture, and production releases.",
        skills: ["Flutter", "Mobile architecture", "Release engineering"],
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
    id: "sintech",
    companyName: "Sintech",
    positions: [
      {
        id: "sintech-intern",
        title: "Mobile Developer Intern",
        employmentPeriod: {
          start: "04.2024",
          end: "07.2024",
        },
        employmentType: "Remote",
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