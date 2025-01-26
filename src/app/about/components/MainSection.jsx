export default function MainSection() {
  const skills = [
    {
      name: "LinkedIn",
      link: "https://linkedin.com",
      icon: "/icons/linkedin.svg",
    },
    {
      name: "Instagram",
      link: "https://instagram.com",
      icon: "/icons/instagram.svg",
    },
    {
      name: "Email",
      link: "mailto:fikrildev@gmail.com",
      icon: "/icons/email.svg",
    },
  ];

  const achievements = [
    {
      title:
        "Awarded Kemendikbudristek Funding for the Karsa Cipta (PKM-KC) Student Creativity Program in 2023",
      organization: "Kemendikbud",
      date: "September 2023",
      credentialLink: "#",
    },
    {
      title: "3rd Runner Up Musabaqah Design Aplikasi Al-Qur'an (MDAQ) 2023",
      organization: "Universitas Negeri Yogyakarta",
      date: "April 2023",
      credentialLink: "#",
    },
    {
      title: "2nd Place in UI/UX Design at UI/UX Design Competition 2022",
      organization: "HMPS-TI UNISBANK",
      date: "September 2022",
      credentialLink: "#",
    },
    {
      title:
        "1st Place in UI/UX Design at Informatic's Conference & Competition (INFECT) 2022",
      organization: "HMTI Universitas Muhammadiyah Purwokerto",
      date: "July 2022",
      credentialLink: "#",
    },
    {
      title:
        "1st Place in UI/UX Design at Information Technology Competition (ITC) 2022",
      organization: "HMJTI Politeknik Negeri Jember",
      date: "June 2022",
      credentialLink: "#",
    },
  ];

  return (
    <>
      {/* Top Section */}
      <section className="text-left mb-8 container mx-auto px-6 lg:px-12 pt-12 sm:pt-24 lg:pt-40">
        <p className="flex items-center text-sm text-green-500 mb-2">
          <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
          Available for freelance work
        </p>
        <h1 className="text-7xl font-medium text-slate-900">About Me</h1>
      </section>

      {/* Main Section */}
      <section className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between container mx-auto py-12 lg:py-20 px-6 lg:px-12">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left">
          {/* Avatar */}
          <img
            src="/images/avatar.jpg"
            alt="Your Avatar"
            className="w-32 h-32 rounded-full mb-4 lg:mb-0 lg:mr-6"
          />

          {/* Info Section */}
          <div className="flex flex-col items-center lg:items-start">
            {/* Social Icons */}
            <div className="flex space-x-4 mb-4">
              {skills.map((skill, index) => (
                <a
                  key={index}
                  href={skill.link}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-80 transition"
                >
                  <img src={skill.icon} alt={skill.name} className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Email and Bio */}
            <p className="mt-2 text-4xl font-medium text-slate-900">
              fikrildev@gmail.com
            </p>
            <p className="mt-3 sm:mt-4 lg:mt-4 text-base md:text-lg text-slate-700 max-w-sm leading-[1.6] sm:!leading-[1.6]">
              I’m Fikril, a passionate Mobile Engineer with a love for creating
              visually stunning and user-friendly digital experiences.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 text-left lg:text-left">
          <p className="text-base md:text-lg text-slate-800 font-medium mb-4 leading-[1.6] sm:!leading-[1.8]">
            Hi, I’m Fikril—a mobile engineer and UX enthusiast based in Jakarta,
            Indonesia. My journey in tech started with a curiosity for how
            things work, and over the years, it’s turned into a passion for
            building apps that people love to use.
          </p>
          <p className="text-base md:text-lg text-slate-800 font-medium mb-4 leading-[1.6] sm:!leading-[1.8]">
            I specialize in creating seamless mobile experiences with Flutter,
            Kotlin, and Jetpack Compose, blending technical precision with
            thoughtful design. Whether it’s coding complex features or crafting
            intuitive interfaces, I’m all about solving problems and making
            ideas come to life.
          </p>
          <p className="text-base md:text-lg text-slate-800 font-medium mb-4 leading-[1.6] sm:!leading-[1.8]">
            When I’m not coding, you’ll probably find me diving into the
            grimdark universe of Warhammer 40K, listening to my favorite bands
            (Starset and Linkin Park, anyone?), or brainstorming the next big
            idea over a cup of coffee.
          </p>
          <p className="text-base md:text-lg text-slate-900 font-bold mb-4 leading-[1.6] sm:!leading-[1.8]">
            Let’s build something amazing together—because to me, every project
            is a story worth telling!
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section className="container mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <h2 className="text-7xl font-medium text-slate-900 mb-8">Experience</h2>
        <div className="space-y-8">
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className={`pt-8 border-t border-slate-200 ${
                index === 0 ? "border-t-0 pt-0" : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium text-slate-900">
                    Mobile Developer
                  </h3>
                  <p className="text-slate-600">Nodewave</p>
                </div>
                <p className="text-sm text-slate-500">Aug - Dec 2024</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="container mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <h2 className="text-7xl font-medium text-slate-900 mb-8">
          Achievements
        </h2>
        <div className="space-y-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`pt-8 border-t border-slate-200 ${
                index === 0 ? "border-t-0 pt-0" : ""
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="pr-4">
                  <h3 className="text-xl font-medium text-slate-900">
                    {achievement.title}
                  </h3>
                  <p className="text-slate-600">{achievement.organization}</p>
                </div>
                <p className="text-sm text-slate-500 whitespace-nowrap">
                  {achievement.date}
                </p>
              </div>
              <a
                href={achievement.credentialLink}
                className="inline-flex items-center text-green-500 hover:text-green-600 transition-colors text-sm"
              >
                Credential
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 ml-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="container mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="relative max-w-3xl mx-auto group">
          <div className="absolute -left-6 top-0 h-full w-1 bg-green-500 rounded-full opacity-20 transition-opacity group-hover:opacity-40"></div>

          <div className="pl-8">
            <blockquote className="text-2xl md:text-3xl leading-[1.6] md:leading-[1.5] font-medium text-slate-800 italic relative">
              <span className="absolute -left-8 -top-4 text-7xl text-green-500 opacity-25 select-none">
                “
              </span>
              <p className="relative z-10">
                In code as in life—build with purpose, design with care, and
                always leave room for creativity.
              </p>
              <span className="absolute -right-4 -bottom-8 text-7xl text-green-500 opacity-25 select-none transform rotate-180">
                “
              </span>
            </blockquote>
          </div>

          <div className="mt-6 h-px bg-gradient-to-r from-green-500/20 via-green-500/40 to-green-500/20 transition-all group-hover:via-green-500/60"></div>
        </div>
      </section>
    </>
  );
}
