"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="fixed w-full bg-transparent z-50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 py-4 flex justify-between items-center">
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
          <div className="relative flex items-center px-2 py-1 text-slate-100 text-sm font-medium rounded-full overflow-hidden">
            <div className="relative flex items-center">
              <div className="mr-2">
                <span className="availability-dot" aria-hidden="true">
                  <span className="availability-dot__core" />
                </span>
              </div>
              Available for Project
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
          className="block py-2 text-slate-200 hover:text-brand-primary"
          onClick={toggleMenu}
        >
          Case Studies
        </Link>
        <Link
          href="/blog"
          className="block py-2 text-slate-200 hover:text-brand-primary"
          onClick={toggleMenu}
        >
          Blog
        </Link>
        <Link
          href="/about"
          className="block py-2 text-slate-200 hover:text-brand-primary"
          onClick={toggleMenu}
        >
          About
        </Link>
      </div>

      {/* Global style override for the hamburger icon */}
      <style jsx global>{`
        .tham-inner,
        .tham-inner::before,
        .tham-inner::after {
          background-color: #cdcdcd !important;
        }
        .availability-dot {
          position: relative;
          display: inline-flex;
          width: 18px;
          height: 18px;
          align-items: center;
          justify-content: center;
        }
        .availability-dot::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: rgba(134, 239, 172, 0.4);
          animation: availabilityPulse 2.2s ease-in-out infinite;
        }
        .availability-dot__core {
          position: relative;
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: #22c55e;
          box-shadow: 0 0 8px rgba(34, 197, 94, 0.8);
        }
        @keyframes availabilityPulse {
          0% {
            transform: scale(0.4);
            opacity: 0.8;
          }
          50% {
            transform: scale(1);
            opacity: 0.4;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
      `}</style>
    </nav>
  );
}
