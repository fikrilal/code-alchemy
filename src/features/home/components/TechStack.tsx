import Image from "next/image";

const iconCardClassName =
  "bg-slate-900 rounded-lg flex items-center justify-center p-4 relative group";

export default function TechStack() {
  return (
    <div className="bg-slate-1100 p-6 rounded-2xl border border-slate-600 flex flex-col h-full">
      <p className="text-xs font-mono text-slate-400 tracking-widest mb-2 uppercase">
        MOBILE TECH STACK
      </p>
      <h3 className="text-xl text-slate-200 font-semibold mb-2">
        Technologies I’m Proficient In
      </h3>
      <p className="text-sm sm:text-base md:text-base text-slate-300">
        Flutter powers most of my projects—occasionally spiced up with a bit of
        Kotlin or Compose for fun.
      </p>

      <div className="flex-1 mt-6">
        <div className="grid grid-cols-3 gap-4 h-full">
          <div className="bg-slate-900 rounded-lg flex flex-col items-center justify-center p-4">
            <Image src="/icons/ic_flutter.svg" alt="Flutter" width={32} height={32} sizes="32px" className="h-8 w-auto" />
            <p className="mt-6 text-sm text-slate-100 font-mono">Flutter</p>
          </div>

          <div className="bg-slate-900 rounded-lg flex flex-col items-center justify-center p-4">
            <Image src="/icons/ic_kotlin.svg" alt="Kotlin" width={32} height={32} sizes="32px" className="h-8 w-auto" />
            <p className="mt-6 text-sm text-slate-100 font-mono">Kotlin</p>
          </div>

          <div className="bg-slate-900 rounded-lg flex flex-col items-center justify-center p-4">
            <Image src="/icons/ic_compose.svg" alt="Compose" width={32} height={32} sizes="32px" className="h-8 w-auto" />
            <p className="mt-6 text-sm text-slate-100 font-mono">Compose</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className={iconCardClassName}>
          <Image src="/icons/ic_getx.svg" alt="GetX" width={32} height={32} sizes="32px" className="h-8 w-auto" />
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-slate-300 bg-black/60 rounded px-2 py-1 pointer-events-none">
            GetX
          </span>
        </div>

        <div className="bg-slate-900 rounded-lg flex items-center justify-center p-2 relative group">
          <Image src="/icons/ic_bloc.svg" alt="BLOC" width={40} height={40} sizes="40px" className="h-10 w-auto" />
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-slate-300 bg-black/60 rounded px-2 py-1 pointer-events-none">
            BLOC
          </span>
        </div>

        <div className={iconCardClassName}>
          <Image src="/icons/ic_riverpod.svg" alt="Riverpod" width={32} height={32} sizes="32px" className="h-8 w-auto" />
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-slate-300 bg-black/60 rounded px-2 py-1 pointer-events-none">
            Riverpod
          </span>
        </div>
      </div>
    </div>
  );
}
