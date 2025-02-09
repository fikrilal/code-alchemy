"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="fixed w-full bg-transparent z-50 backdrop-blur-md">
      <div className="container mx-auto px-6 py-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-slate-100">
          fikrilal.
        </Link>

        {/* Navigation Links (Desktop) */}
        <div className="space-x-8 hidden md:flex">
          <Link
            href="#case-studies"
            className="text-slate-100 hover:text-brand-primary"
          >
            Case Studies
          </Link>
          <Link
            href="#work"
            className="text-slate-100 hover:text-brand-primary"
          >
            Work
          </Link>
          <Link
            href="/blog"
            className="text-slate-100 hover:text-brand-primary"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="text-slate-100 hover:text-brand-primary"
          >
            About
          </Link>
        </div>

        {/* Available Badge (Desktop) */}
        <div className="hidden md:block">
          <div className="relative flex items-center px-2 py-1 bg-brand-900 text-slate-100 text-sm font-medium rounded-full border border-brand-900 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-100/15 to-transparent rounded-full"></div>
            <div className="relative flex items-center">
              <div className="mr-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="8" cy="8" r="8" fill="#86EFAC" opacity="0.4" />
                  <circle cx="8" cy="8" r="4" fill="#22C55E" />
                </svg>
              </div>
              Available for Work
            </div>
          </div>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          className={`tham tham-e-spin tham-w-6 md:hidden ${
            isMenuOpen ? "tham-active" : ""
          }`}
          onClick={toggleMenu}
        >
          <div className="tham-box">
            <div className="tham-inner text-slate-100"></div>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden
          bg-transparent
          px-6
          overflow-hidden
          transition-all
          duration-300
          ease-in-out
          transform
          ${isMenuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"}
        `}
      >
        <Link
          href="#case-studies"
          className="block py-2 text-slate-100 hover:text-brand-primary"
          onClick={toggleMenu}
        >
          Case Studies
        </Link>
        <Link
          href="#work"
          className="block py-2 text-slate-100 hover:text-brand-primary"
          onClick={toggleMenu}
        >
          Work
        </Link>
        <Link
          href="/blog"
          className="block py-2 text-slate-100 hover:text-brand-primary"
          onClick={toggleMenu}
        >
          Blog
        </Link>
        <Link
          href="/about"
          className="block py-2 text-slate-100 hover:text-brand-primary"
          onClick={toggleMenu}
        >
          About
        </Link>
      </div>
    </nav>
  );
}
