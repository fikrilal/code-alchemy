export type Experience = {
  title: string;
  organization: string;
  location: string;
  workType: string;
  date: string;
  description?: string;
};

const experiences: Experience[] = [
  {
    title: "Jr. Mobile Developer",
    organization: "SIESTA",
    location: "Bandung, Indonesia",
    workType: "On-site",
    date: "Feb - Present",
  },
  {
    title: "Mobile Engineer",
    organization: "Studyo.io",
    location: "London, United Kingdom",
    workType: "Remote",
    date: "Jul - Feb 2025",
  },
  {
    title: "Mobile Developer Intern",
    organization: "Nodewave",
    location: "West Jakarta, Indonesia",
    workType: "On-site",
    date: "Aug - Dec 2024",
  },
  {
    title: "Mobile Developer Intern",
    organization: "Sintech",
    location: "South Jakarta, Indonesia",
    workType: "Remote",
    date: "Apr - Jul 2024",
  },
  {
    title: "Full Stack Developer Intern",
    organization: "Dropify Technologies",
    location: "Toronto, Ontario, Canada",
    workType: "Remote",
    date: "Feb - May 2024",
  },
];

export default experiences;

