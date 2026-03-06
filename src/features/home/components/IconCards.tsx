import Image from "next/image";

const cardClassName =
  "bg-slate-1000 p-6 rounded-2xl border border-slate-600 flex items-center justify-center aspect-square transition-transform duration-200 hover:scale-[1.04]";

export default function IconCards() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <a
        href="https://x.com/fikrilal"
        target="_blank"
        rel="noreferrer"
        aria-label="X"
        className={cardClassName}
      >
        <Image src="/icons/icons8-x.svg" alt="X" width={40} height={40} sizes="40px" className="w-10 h-10" />
      </a>

      <a
        href="https://github.com/fikrilal"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className={cardClassName}
      >
        <Image src="/icons/github.svg" alt="GitHub" width={40} height={40} sizes="40px" className="w-10 h-10" />
      </a>

      <a
        href="https://www.linkedin.com/in/fikrilal/"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        className={cardClassName}
      >
        <Image src="/icons/linkedin.svg" alt="LinkedIn" width={40} height={40} sizes="40px" className="w-10 h-10" />
      </a>
    </div>
  );
}
