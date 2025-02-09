"use client";

export default function Button({ onClick, children, className = "" }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior: open mailto if no onClick provided
      window.location.href = "mailto:fikrildev@gmail.com";
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative
        overflow-hidden
        px-6 py-3 sm:px-8 sm:py-4
        w-auto max-w-fit
        inline-flex items-center
        group
        text-slate-100
        hover:text-slate-900 dark:hover:text-slate-900
        border border-slate-300 dark:border-slate-700
        rounded-full
        bg-transparent
        transform-gpu
        transition
        duration-500
        ease-out
        hover:scale-105
        hover:shadow-md
        focus:outline-none
        focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600
        active:scale-95
        ${className}
      `}
    >
      {/* The overlay that creates the curtain effect */}
      <span
        className="
          absolute inset-0
          bg-slate-100 dark:bg-slate-100
          rounded-full
          transform origin-left scale-x-0
          transition-transform duration-500 ease-out
          group-hover:scale-x-100
        "
      ></span>

      {/* Content wrapper ensures text & icon sit above the overlay */}
      <span className="relative z-10 inline-flex items-center">
        {children}
        <span
          className="
            px-2 ml-1
            transition-transform duration-500 ease-out
            group-hover:translate-x-1 group-hover:rotate-45
          "
        >
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
      </span>
    </button>
  );
}
