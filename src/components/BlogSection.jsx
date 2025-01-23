export default function BlogSection() {
  const blogs = [
    {
      title: "Work in Dev Environments Globally with Fly.io",
      description:
        "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.",
      date: "Dec 25 2024",
      link: "#",
    },
    {
      title: "Work in Dev Environments Globally with Fly.io",
      description:
        "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.",
      date: "Dec 25 2024",
      link: "#",
    },
    {
      title: "Work in Dev Environments Globally with Fly.io",
      description:
        "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.",
      date: "Dec 25 2024",
      link: "#",
    },
  ];

  return (
    <section className="bg-gray-50 py-32">
      <div className="container mx-auto text-center ">
        {/* Section Title */}
        <div className="mb-20">
          <span className="inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-full">
            <img
              src="/icons/writing-thoughts.svg"
              alt="Writing & Thoughts Icon"
              className="w-5 h-5 mr-2"
            />
            Writing & Thoughts
          </span>
          <h2 className="mt-5 text-2xl md:text-4xl font-semibold text-gray-800">
            Stories, Code, and Everything In Between
          </h2>
          <p className="mt-4 text-slate-700 max-w-2xl mx-auto leading-[1.6]">
            A space where I share my journey, insights, and lessons learned.
            From coding tips to design musings, it’s all about growth,
            creativity, and a little bit of fun along the way.
          </p>
        </div>

        {/* Blog List */}
        <div className="space-y-16">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="flex items-stretch border-b border-gray-200 pb-16"
            >
              {/* Image with 16:9 Aspect Ratio */}
              <div
                className="relative h-72 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 mr-6"
                style={{ aspectRatio: "16 / 9" }}
              ></div>

              {/* Blog Content */}
              <div className="flex flex-col justify-between flex-1 text-left">
                {/* Title and Description */}
                <div>
                  <h3 className="text-3xl font-medium text-slate-900">
                    {blog.title}
                  </h3>
                  <p className="mt-2 text-slate-700 text-md">
                    {blog.description}
                  </p>
                </div>

                {/* Date at the bottom */}
                <p className="text-gray-500 text-xs mt-auto text-left">
                  {blog.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-10 text-right">
          <a
            href="#"
            className="inline-flex items-center text-sm font-medium text-gray-800 hover:text-brand-primary transition"
          >
            View All [22]
            <span className="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 6.75L21 12m0 0-3.75 5.25M21 12H3"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
