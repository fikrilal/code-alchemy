export default function SelectedWork() {
  const projects = [
    {
      title: "eDamkar",
      description:
        "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.",
      link: "#",
      borderStyles: "border-b border-gray-200", // Bottom border
    },
    {
      title: "ePKK",
      description:
        "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.",
      link: "#",
      borderStyles: "border-b border-l border-gray-200", // Left and bottom border
    },
    {
      title: "Ngawi Smart City",
      description:
        "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.",
      link: "#",
      borderStyles: "", // No border
    },
    {
      title: "Lofo - leftover food",
      description:
        "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.",
      link: "#",
      borderStyles: "border-l border-gray-200", // Left border only
    },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto text-center">
        {/* Section Title */}
        <div className="mb-8">
          <span className="inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-full">
            <img
              src="/icons/selected-work.svg"
              alt="Selected Work Icon"
              className="w-5 h-5 mr-2" // Adjust size and spacing
            />
            Selected Work
          </span>

          <h2 className="mt-5 text-2xl md:text-4xl font-semibold text-gray-800">
            Some Stuff I’ve Built
          </h2>
          <p className="mt-4 text-slate-700 max-w-2xl mx-auto !leading-relaxed">
            Here’s a peek at the projects where I turned ideas into something
            cool. From apps to designs, it’s all about making things that work
            and look awesome.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`p-8 bg-white transition text-left ${project.borderStyles}`} // Add custom borders
            >
              {/* Placeholder for image */}
              <div className="bg-gray-100 h-80 rounded-md mb-6"></div>
              <div className="flex items-center justify-between group">
                <h3 className="text-2xl md:text-3xl font-medium text-gray-800">
                  {project.title}
                </h3>
                <a
                  href={project.link}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium bg-white-100 shadow-sm border border-gray-300 rounded-lg transition-all duration-300 hover:bg-brand-primary/10 hover:border-brand-primary hover:text-brand-primary"
                >
                  View Work{" "}
                  <span className="ml-1 transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-hover:rotate-45">
                    <svg
                      width="12"
                      height="13"
                      viewBox="0 0 12 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.64121 9.85889L9.35872 3.14138M9.35872 3.14138L9.35872 8.09113M9.35872 3.14138L4.40898 3.14138"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </div>
              <p className="mt-3 text-slate-700 text-md">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
