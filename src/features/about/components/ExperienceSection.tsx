import experiences from "@/features/about/data/experience";

export default function ExperienceSection() {
  return (
    <section className="container mx-auto py-12 lg:py-20">
      <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-slate-50 mb-2 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
        Experience
      </h2>
      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <div
            key={`${experience.title}-${experience.organization}`}
            className={`pt-8 border-t border-slate-900 ${index === 0 ? "border-t-0 pt-0" : ""}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-medium text-slate-100">{experience.title}</h3>
                <div className="pt-2 flex flex-wrap items-center gap-2 text-slate-200">
                  <span>{experience.organization}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-200">{experience.location}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-3 py-1 text-xs rounded-full bg-slate-800/40 text-slate-200 border border-slate-400/50">
                    {experience.workType}
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-200 whitespace-nowrap">{experience.date}</p>
            </div>
            {experience.description && (
              <p className="mt-3 text-slate-200 text-sm leading-relaxed">{experience.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
