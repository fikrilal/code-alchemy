import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white z-50">
      <div className="container mx-auto px-6 py-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
          fikrilal.
        </Link>

        {/* Navigation Links */}
        <div className="space-x-8 hidden md:flex">
          <Link
            href="#case-studies"
            className="text-slate-900 hover:text-brand-primary"
          >
            Case Studies
          </Link>
          <Link
            href="#work"
            className="text-slate-900 hover:text-brand-primary"
          >
            Work
          </Link>
          <Link
            href="#blog"
            className="text-slate-900 hover:text-brand-primary"
          >
            Blog
          </Link>
          <Link
            href="#about"
            className="text-slate-900 hover:text-brand-primary"
          >
            About
          </Link>
        </div>

        {/* Available Badge */}
        <div className="hidden md:block">
          <div className="relative flex items-center px-2 py-1 bg-brand-900 text-slate-100 text-sm font-medium rounded-full border border-brand-900 overflow-hidden">
            {/* Inner Shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-100/15 to-transparent rounded-full"></div>

            {/* Content */}
            <div className="relative flex items-center">
              {/* Green Circle as an SVG */}
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

        {/* Mobile Menu (optional) */}
        <button className="md:hidden text-gray-700">☰</button>
      </div>
    </nav>
  );
}
