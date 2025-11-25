import Image from "next/image";
import Link from "next/link";

import MotionElement from "@/components/animations/Motion";

import type { BlogSummary } from "@/features/blog/types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function getOrdinal(n: number) {
  if (n > 3 && n < 21) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "long" });
  const day = getOrdinal(date.getDate());
  const year = date.getFullYear();
  return `${month}, ${day} ${year}`;
}

export default function BlogMainSection({
  blogPosts,
}: {
  blogPosts: BlogSummary[];
}) {
  const items = Array.isArray(blogPosts) ? blogPosts : [];

  return (
    <div className="min-h-screen transition-colors duration-300">
      <MotionElement
        as="section"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 pt-28 sm:pt-28 lg:pt-40"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
      >
        <MotionElement
          as="h1"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-slate-200 leading-[1.2] sm:!leading-tight max-w-2xl"
          variants={childVariants}
        >
          Blog Stuff
        </MotionElement>
        <MotionElement
          as="p"
          className="mt-3 sm:mt-4 lg:mt-5 text-base md:text-lg text-slate-300 max-w-2xl leading-[1.6] sm:!leading-[1.8]"
          variants={childVariants}
        >
          A place to dump notes from the journey — what worked, what broke, and
          the small realizations I don’t want to forget.
        </MotionElement>
      </MotionElement>

      <MotionElement
        as="section"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 py-4 sm:py-12 md:py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="space-y-2">
            {items.map((post, index) => (
              <MotionElement
                key={post.slug}
                as="div"
                variants={childVariants}
                className={`flex flex-col md:flex-row items-stretch ${
                  index !== 0 ? "border-t border-slate-900" : ""
                } py-12`}
              >
                <div className="w-full md:w-1/3">
                  <div
                    className="relative w-full"
                    style={{ paddingBottom: "56.25%" }}
                  >
                    <Image
                      src={post.coverImage || "/images/dummy-image.jpg"}
                      alt={post.title}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
                      className="absolute inset-0 w-full h-full object-cover rounded-md"
                    />
                  </div>
                </div>
                <div className="w-full md:w-2/3 md:pl-6 mt-4 md:mt-0 flex flex-col justify-between">
                  <div>
                    <span className="text-sm text-slate-400">
                      {formatDate(post.date)} • {post.readTime || "5 min read"}
                    </span>
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-xl sm:text-xl md:text-2xl font-bold text-slate-200 mt-4 hover:text-slate-300 transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="mt-2 text-slate-300">{post.description}</p>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-medium inline-flex items-center text-blue-500 hover:text-slate-300 transition-colors text-sm group self-start mt-4 md:mt-0"
                  >
                    Read more
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
                  </Link>
                </div>
              </MotionElement>
            ))}
            {items.length === 0 && (
              <MotionElement
                as="div"
                className="py-12 text-slate-400"
                variants={childVariants}
              >
                No posts published yet. Check back soon.
              </MotionElement>
            )}
          </div>
        </div>
      </MotionElement>
    </div>
  );
}
