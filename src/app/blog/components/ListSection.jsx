"use client"; // If using Next.js App Router

import Image from "next/image"; // Optional if using Next.js

export default function BlogListSection() {
  // Updated mock data
  const blogPosts = [
    {
      id: 1,
      category: "Collaboration",
      title: "How to Set Up a Collaborative Workspace in 5 Minutes",
      imageUrl: "/images/dummy-image.jpg",
      authorName: "Benjamin",
      authorAvatar: "/images/avatar.jpg",
    },
    {
      id: 2,
      category: "Productivity",
      title: "Breaking Down Big Projects: A Guide to Managing Workload",
      imageUrl: "/images/dummy-image.jpg",
      authorName: "Chris",
      authorAvatar: "/images/avatar.jpg",
    },
    {
      id: 3,
      category: "Industry",
      title: "The Evolution of Machine Learning in Business",
      imageUrl: "/images/dummy-image.jpg",
      authorName: "Jessica",
      authorAvatar: "/images/avatar.jpg",
    },
    {
      id: 4,
      category: "Productivity",
      title: "10 Quick Hacks to Boost Your Productivity Today",
      imageUrl: "/images/dummy-image.jpg",
      authorName: "Benjamin",
      authorAvatar: "/images/avatar.jpg",
    },
    {
      id: 5,
      category: "Collaboration",
      title: "5 Essential Tools for Effective Remote Collaboration",
      imageUrl: "/images/dummy-image.jpg",
      authorName: "Chris",
      authorAvatar: "/images/avatar.jpg",
    },
    {
      id: 6,
      category: "Automation",
      title: "Top 5 Benefits of Automation for Small Businesses",
      imageUrl: "/images/dummy-image.jpg",
      authorName: "Jessica",
      authorAvatar: "/images/avatar.jpg",
    },
  ];

  return (
    <section className="bg-white text-gray-900 py-10 sm:py-12 lg:py-16">
      <div className="container mx-auto px-0 lg:px-8">
        {/* Grid of blog posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="flex flex-col">
              {/* Post image */}
              <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  layout="fill"
                  className="absolute inset-0 object-cover rounded-lg"
                />
              </div>

              {/* Post content */}
              <div className="py-4 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm sm:text-sm md:text-md lg:text-md text-green-600 tracking-wide">
                    {post.category}
                  </span>
                  <div className="flex items-center">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden">
                      <Image
                        src={post.authorAvatar}
                        alt={post.authorName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="ml-2 text-sm sm:text-sm md:text-md lg:text-md text-gray-600">
                      {post.authorName}
                    </p>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl lg:font-xl font-semibold mb-2 line-clamp-2 hover:underline">
                  {post.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
