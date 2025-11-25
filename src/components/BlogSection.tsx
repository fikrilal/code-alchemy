import Image from "next/image";
import Link from "next/link";

import MotionElement from "@/components/animations/Motion";
import Button from "@/components/ui/Button";

import type { BlogSummary } from "@/features/blog/types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
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

export default function BlogSection({ blogPosts = [] as BlogSummary[] }) {
  const sortedBlogPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <MotionElement
      as="section"
      className="flex flex-col items-start min-h-screen transition-colors duration-300"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-6xl w-full mx-auto pt-24 sm:pt-24 lg:pt-60 px-4 sm:px-6 lg:px-8 xl:px-0">
        <div className="flex justify-between items-center">
          <MotionElement
            as="h2"
            className="text-3xl md:text-5xl font-semibold text-slate-100 leading-[1.2] sm:!leading-tight max-w-2xl"
            variants={childVariants}
          >
            Stories, Code, and Everything In Between
          </MotionElement>
          <MotionElement
            as="div"
            variants={childVariants}
            className="hidden md:block"
          >
            <Link href="/blog">
              <Button>View all posts</Button>
            </Link>
          </MotionElement>
        </div>
        <MotionElement
          as="p"
          className="mt-3 sm:mt-4 lg:mt-5 text-base md:text-lg text-slate-300 max-w-2xl leading-[1.6] sm:!leading-[1.8]"
          variants={childVariants}
        >
          A space where I share my journey, insights, and lessons learned. From
          coding tips to design musings, it's all about growth, creativity, and
          a little bit of fun along the way.
        </MotionElement>
      </div>

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 lg:px-8 lg:mt-4">
        {sortedBlogPosts.slice(0, 3).map((blog, index) => (
          <MotionElement
            key={blog.slug}
            as="div"
            variants={childVariants}
            className={`flex flex-col md:flex-row items-stretch ${
              index === 0 ? "" : "border-t border-slate-900"
            } py-12`}
          >
            <div className="w-full md:w-1/3">
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <Image
                  src={blog.coverImage || `/images/blog/${blog.slug}.jpg`}
                  alt={blog.title}
                  fill
                  className="absolute inset-0 w-full h-full object-cover rounded-md"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3 md:pl-6 mt-4 md:mt-0 flex flex-col justify-between">
              <div>
                <span className="text-sm text-slate-400">
                  {formatDate(blog.date)}
                </span>
                <h3 className="text-xl font-semibold text-slate-200 mt-4">
                  {blog.title}
                </h3>
                <p className="mt-2 text-slate-300">{blog.description}</p>
              </div>
              <Link
                href={`/blog/${blog.slug}`}
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
      </div>
    </MotionElement>
  );
}
