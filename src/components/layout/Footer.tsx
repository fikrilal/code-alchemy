import Image from "next/image";

export default function Footer() {
  return (
    <footer className="text-gray-400 py-2 sm:py-4 lg:py-4 px-2 sm:px-4 lg:px-4 pt-20 sm:pt-24 lg:pt-32">
      <div className="bg-[#0E1012] mx-auto px-6 md:px-24 py-12 sm:py-16 lg:py-24 text-center rounded-xl w-full">
        <h2 className="text-2xl md:text-4xl font-semibold text-slate-200">
          Ahmad Fikril Al Muzakki
        </h2>

        <p className="mt-2 sm:mt-2 lg:mt-4 text-sm md:text-base max-w-2xl text-slate-400 mx-auto leading-relaxed!">
          Thanks for stopping by! Let’s connect and create something amazing
          together! Feel free to reach out about coding, design, or just say hi.
        </p>

        <div className="mt-6 flex justify-center space-x-4">
          <a href="https://github.com/fikrilal" target="_blank" rel="noopener noreferrer">
            <Image
              src="/icons/github.svg"
              alt="GitHub"
              width={32}
              height={32}
              sizes="(max-width: 768px) 24px, 32px"
              className="w-6 h-6 md:w-8 md:h-8 hover:opacity-80 transition"
            />
          </a>
          <a href="https://www.linkedin.com/in/fikrilal/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/icons/linkedin.svg"
              alt="LinkedIn"
              width={32}
              height={32}
              sizes="(max-width: 768px) 24px, 32px"
              className="w-6 h-6 md:w-8 md:h-8 hover:opacity-80 transition"
            />
          </a>
          <a href="mailto:fikrildev@gmail.com">
            <Image
              src="/icons/email.svg"
              alt="Email"
              width={32}
              height={32}
              sizes="(max-width: 768px) 24px, 32px"
              className="w-6 h-6 md:w-8 md:h-8 hover:opacity-80 transition"
            />
          </a>
          <a href="https://medium.com/@fikrilal" target="_blank" rel="noopener noreferrer">
            <Image
              src="/icons/medium.svg"
              alt="Medium"
              width={32}
              height={32}
              sizes="(max-width: 768px) 24px, 32px"
              className="w-6 h-6 md:w-8 md:h-8 hover:opacity-80 transition"
            />
          </a>
          <a href="https://www.instagram.com/fikril.al/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/icons/instagram.svg"
              alt="Instagram"
              width={32}
              height={32}
              sizes="(max-width: 768px) 24px, 32px"
              className="w-6 h-6 md:w-8 md:h-8 hover:opacity-80 transition"
            />
          </a>
        </div>

        <p className="mt-8 text-xs md:text-sm font-mono text-gray-500">
          © 2025 FIKRIL AL. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
