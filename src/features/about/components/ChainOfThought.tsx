"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

import type { Variants } from "framer-motion";

function parseBoldText(text: string): ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={index}>{part.slice(2, -2)}</strong>
    ) : (
      part
    )
  );
}

type Thought = { title: string; content: string; chain?: string[] };

const thoughts: Thought[] = [
  {
    title: "📩 fikrildev@gmail.com",
    content:
      "Emails are processed in FIFO order, with an average response latency of 3-5 business lifetimes.",
    chain: [
      "🤖 Hmm... Communication is important...",
      "🤖 Maybe I should show my **email**?",
      "🤖 But wait… what if I start getting emails from a Nigerian prince?",
      "🤖 Or worse… recruiters who ‘found my profile interesting’?",
      "🤖 Ah, whatever. Here it is. Just… no weird stuff, okay?",
    ],
  },
  {
    title: "👨‍💻 Ahmad Fikril Al Muzakki",
    content:
      "Mobile engineer by day, nature explorer on weekends. Still debugging life, though.",
    chain: [
      "🤖 Identity crisis? Nah, just figuring out life.",
      "🤖 I code for a living, but I live for **traveling in nature**.",
      "🤖 Hiking, waterfalls, fresh air—what’s not to love?",
      "🤖 But wait... wouldn't these views be better with **someone special**?",
      "🤖 Nah, let’s keep it simple. Here’s my name!",
    ],
  },
  {
    title: "📍 Bandung, Indonesia",
    content:
      "Where I work, code, and question my life choices (mostly about missing Kediri's food).",
    chain: [
      "🤖 Location, location, location...",
      "🤖 I live in **Kediri**, but I work in **Bandung**.",
      "🤖 Which one should I put here?",
      "🤖 Let’s go with **Bandung**—the professional hub!",
      "🤖 But shoutout to **Kediri**, the true home base!",
    ],
  },
  {
    title: "💡 Mobile Engineer | Kotlin | Flutter",
    content:
      "Building smooth apps, breaking the laws of physics with animations.",
    chain: [
      "🤖 Should I flex my skills?",
      "🤖 Yeah, let’s show off the **tech stack**.",
      "🤖 **Flutter? Kotlin? Jetpack Compose?** Pick your fighter!",
      "🤖 But should I add **GetX supremacy** too?",
      "🤖 Nah, let’s keep it pro. Behold, my skill set!",
    ],
  },
  {
    title: "🎮 Warhammer 40K Enthusiast",
    content:
      "In the grim darkness of the far future, there is only war… and me, loving every bit of it.",
    chain: [
      "🤖 Warhammer 40K? Ah yes, **the perfect hobby**.",
      "🤖 Massive armies? **Check.** Grimdark lore? **Check.**",
      "🤖 The factions? **All morally questionable, but that’s the fun.**",
      "🤖 The setting? **A never-ending war where everyone loses.**",
      "🤖 And yet, here I am, absolutely loving it. **FOR THE EMPEROR!**",
    ],
  },
  {
    title: "🎵 Favorite Bands: Imagine Dragons, Aurora, Starset",
    content:
      "One moment it’s XXXTentacion, next it’s Aurora. Then Imagine Dragons crashes in. My Spotify algorithm is confused.",
    chain: [
      "🤖 Hmm… what’s the **vibe check** today?",
      "🤖 Debugging? Might need some **XXXTentacion or Juice WRLD** energy.",
      "🤖 But wait, deep focus mode? **Aurora it is.**",
      "🤖 Suddenly feeling heroic? **Imagine Dragons, let’s go!**",
      "🤖 Honestly, my Spotify has no idea who I really am.",
    ],
  },
  {
    title: "🥑 Best Coding Fuel: Avocados. The elite choice.",
    content:
      "Debugging is easier when you're powered by avocados. Scientifically proven (probably).",

    chain: [
      "🤖 Energy source? Nuclear? Solar?",
      "🤖 Nope, **AVOCADOS.** The real superfood.",
      "🤖 Healthy fats = Big brain coding moves.",
      "🤖 But what if I turn into an avocado someday? 🤔",
      "🤖 Nah, no time for existential crises. Let’s code!",
    ],
  },
  {
    title: "🎮 Last Game Played: Call of Duty Mobile",
    content: "When I'm not coding, I’m probably **no-scoping noobs**.",
    chain: [
      "🤖 Should I tell them what I do for fun?",
      "🤖 Coding? Gaming? Existential crisis?",
      "🤖 Nah, **COD Mobile supremacy**!",
      "🤖 But maybe I should mention my **sniper skills**?",
      "🤖 Nah, too OP. Let’s keep it humble.",
    ],
  },
  {
    title: "🎬 Favorite Movie Genre: Sci-Fi & Mind-bending Thrillers",
    content: "Reality is often disappointing... but movies? They fix that.",
    chain: [
      "🤖 What’s my go-to entertainment?",
      "🤖 Sci-Fi? Thriller? Anything **Christopher Nolan**?",
      "🤖 Wait, should I include anime too?",
      "🤖 Hmm... Let’s keep it simple for now.",
      "🤖 BOOM. Sci-Fi it is!",
    ],
  },
  {
    title: "💻 Favorite IDE: Android Studio (of course!)",
    content: `"Crashes often? Eats RAM? Still love it. Ride or die."`,
    chain: [
      "🤖 IDE wars are tricky...",
      "🤖 VS Code? Light but too basic...",
      "🤖 IntelliJ? Powerful but not quite my thing...",
      "🤖 Ah yes, **Android Studio**! Heavy? Yes. Amazing? Also yes.",
      "🤖 I mean, who needs RAM anyway? Let’s code!",
    ],
  },
];

function getDynamicPrefixFallback(thought: Thought): string {
  if (thought.title.includes("@"))
    return "🤖 Hmm... Perhaps I should show my email:";
  const c = thought.content.toLowerCase();
  if (c.includes("engineer"))
    return "🤖 Hmm... Maybe I should showcase my engineering side:";
  if (c.includes("developer"))
    return "🤖 Hmm... Maybe I should introduce the developer:";
  if (c.includes("designer"))
    return "🤖 Hmm... Perhaps my design portfolio would do:";
  return "🤖 Hmm... Maybe I should show:";
}

function getChainMessages(thought: Thought): string[] {
  return (
    thought.chain ?? [
      getDynamicPrefixFallback(thought),
      "🤖 Let me think about it...",
      "🤖 Processing the details...",
      "🤖 Almost there...",
    ]
  );
}

function ScrambleText({
  text,
  className,
  duration = 1000,
  interval = 50,
}: {
  text: string;
  className?: string;
  duration?: number;
  interval?: number;
}) {
  const [displayed, setDisplayed] = useState<string>(text);

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.ceil(duration / interval);
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    const scrambleInterval = setInterval(() => {
      frame++;
      let newText = "";
      for (let i = 0; i < text.length; i++) {
        if (i < (frame / totalFrames) * text.length) newText += text[i];
        else newText += chars[Math.floor(Math.random() * chars.length)];
      }
      setDisplayed(newText);
      if (frame >= totalFrames) {
        clearInterval(scrambleInterval);
        setDisplayed(text);
      }
    }, interval);
    return () => clearInterval(scrambleInterval);
  }, [text, duration, interval]);

  return <span className={className}>{displayed}</span>;
}

function ScrambleParsedText({
  text,
  className,
  duration = 1000,
  interval = 50,
}: {
  text: string;
  className?: string;
  duration?: number;
  interval?: number;
}) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={index}>
            <ScrambleText
              text={part.slice(2, -2)}
              className={className ?? ""}
              duration={duration}
              interval={interval}
            />
          </strong>
        ) : (
          <ScrambleText
            key={index}
            text={part}
            className={className ?? ""}
            duration={duration}
            interval={interval}
          />
        )
      )}
    </>
  );
}

export default function ChainOfThought() {
  const [reasoningIndex, setReasoningIndex] = useState<number>(1);
  const safeReasoningIndex = reasoningIndex % thoughts.length;
  const completedReasoningIndex =
    (reasoningIndex + thoughts.length - 1) % thoughts.length;
  const chainMessages = getChainMessages(thoughts[safeReasoningIndex]!);
  const finalChainMessage = "🤖 Reasoned for 8 seconds.";
  const [chainStepIndex, setChainStepIndex] = useState<number>(0);
  const displayIndex =
    chainStepIndex === chainMessages.length
      ? safeReasoningIndex
      : completedReasoningIndex;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (chainStepIndex < chainMessages.length) {
      timer = setTimeout(() => setChainStepIndex((prev) => prev + 1), 2000);
    } else if (chainStepIndex === chainMessages.length) {
      timer = setTimeout(() => {
        setReasoningIndex((prev) => (prev + 1) % thoughts.length);
        setChainStepIndex(0);
      }, 4000);
    }
    return () => timer && clearTimeout(timer);
  }, [chainStepIndex, chainMessages, reasoningIndex]);

  const chainVariants: Variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full max-w-lg">
      {chainStepIndex < chainMessages.length ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={`chain-${reasoningIndex}-${chainStepIndex}`}
            variants={chainVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="mb-4"
          >
            <p className="text-sm md:text-base text-slate-300 shimmer-text">
              {(() => {
                const safe = chainMessages.length > 0 ? chainMessages : [""];
                const msg = safe[chainStepIndex % safe.length] ?? "";
                return parseBoldText(msg);
              })()}
            </p>
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="mb-4">
          <p className="text-sm md:text-base text-slate-300">
            {finalChainMessage}
          </p>
        </div>
      )}

      <div className="mb-4">
        <p className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-medium text-slate-200 max-w-sm overflow-hidden wrap-break-word">
          <ScrambleParsedText
            text={thoughts[displayIndex % thoughts.length]!.title}
            className=""
            duration={1000}
            interval={50}
          />
        </p>
        <p className="mt-2 sm:mt-2 lg:mt-3 text-base md:text-lg text-slate-300 max-w-sm overflow-hidden wrap-break-word leading-[1.6]">
          <ScrambleParsedText
            text={thoughts[displayIndex % thoughts.length]!.content}
            className=""
            duration={1000}
            interval={50}
          />
        </p>
      </div>
    </div>
  );
}
