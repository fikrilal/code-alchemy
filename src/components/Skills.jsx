import Image from "next/image";

export default function Skills() {
  const tools = [
    { name: "Flutter", level: "EXPERT", icon: "/icons/flutter-logo.svg" },
    { name: "Kotlin", level: "INTERMEDIATE", icon: "/icons/kotlin-logo.svg" },
    {
      name: "Jetpack Compose",
      level: "INTERMEDIATE",
      icon: "/icons/compose-logo.svg",
    },
    { name: "Golang", level: "INTERMEDIATE", icon: "/icons/golang-logo.svg" },
    {
      name: "Javascript",
      level: "INTERMEDIATE",
      icon: "/icons/javascript-logo.svg",
    },
    { name: "MySQL", level: "INTERMEDIATE", icon: "/icons/mysql-logo.svg" },
    {
      name: "Android Studio",
      level: "INTERMEDIATE",
      icon: "/icons/android-studio-logo.svg",
    },
    {
      name: "Firebase",
      level: "INTERMEDIATE",
      icon: "/icons/firebase-logo.svg",
    },
    { name: "Figma", level: "INTERMEDIATE", icon: "/icons/figma-logo.svg" },
    { name: "GitHub", level: "INTERMEDIATE", icon: "/icons/github-logo.svg" },
    {
      name: "Notion (Docs)",
      level: "INTERMEDIATE",
      icon: "/icons/notion-logo.svg",
    },
    { name: "ChatGPT", level: "GODLIKE, LOL", icon: "/icons/chatgpt-logo.svg" },
  ];

  // Define border rules for each tool
  const borders = [
    "border-b-[0.5px]", // Flutter
    "border-l-[0.5px] border-b-[0.5px]", // Kotlin
    "border-l-[0.5px] border-b-[0.5px]", // Jetpack Compose
    "border-l-[0.5px] border-b-[0.5px]", // Golang
    "border-b-[0.5px]", // Javascript
    "border-l-[0.5px] border-b-[0.5px]", // MySQL
    "border-l-[0.5px] border-b-[0.5px]", // Android Studio
    "border-l-[0.5px] border-b-[0.5px]", // Firebase
    "", // Figma (no border)
    "border-l-[0.5px]", // GitHub
    "border-l-[0.5px]", // Notion
    "border-l-[0.5px]", // ChatGPT
  ];

  return (
    <section className="bg-gray-50 py-32">
      {/* Title */}
      <h2 className="text-center text-sm md:text-lg font-mono tracking-wide text-gray-500 mb-12">
        TOOLS I LOVE TO BUILD WITH
      </h2>

      {/* Grid */}
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {tools.map((tool, index) => (
          <div
            key={index}
            className={`flex items-center p-8 bg-white ${borders[index]} border-gray-200`}
          >
            <Image
              src={tool.icon}
              alt={tool.name}
              width={48}
              height={48}
              className="w-12 h-12 mr-4"
            />
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-slate-600">
                {tool.name}
              </p>
              <p className="text-xs font-mono text-gray-500">{tool.level}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
