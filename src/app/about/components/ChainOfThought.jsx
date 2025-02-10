"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// This parse function is used for the chain messages.
function parseBoldText(text) {
  const parts = text.split(/(\*\*.*?\*\*)/g); // Split at bold markers
  return parts.map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={index}>{part.slice(2, -2)}</strong>
    ) : (
      part
    )
  );
}

// Thoughts array with personalized chain-of-thought messages.
const thoughts = [
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
      "🤖 And yet, here I am, **absolutely loving it.** *FOR THE EMPEROR!*",
    ],
  },
  {
    title: "🎵 Favorite Bands: Linkin Park, Starset, Breaking Benjamin",
    content: `"Give me a sign, I wanna believe!" - *Breaking Benjamin* (and me when debugging)`,
    chain: [
      "🤖 What’s my **background music** today?",
      "🤖 Debugging session? Sounds like a **Linkin Park** moment.",
      "🤖 Oh wait, should I mention **Evanescence** too?",
      "🤖 Nah, let’s not overwhelm them with too much greatness.",
      "🤖 Alright, let’s just **list them all**!",
    ],
  },
  {
    title: "🥑 Best Coding Fuel: Avocados. The elite choice.",
    content: `"Debugging is easier when you're powered by avocados. Scientifically proven (probably)."`,

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
    content: `"Reality is often disappointing... but movies? They fix that."`,
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

// Fallback dynamic prefix if a thought has no custom chain.
function getDynamicPrefixFallback(thought) {
  if (thought.title.includes("@")) {
    return "🤖 Hmm... Perhaps I should show my email:";
  } else if (thought.content.toLowerCase().includes("engineer")) {
    return "🤖 Hmm... Maybe I should showcase my engineering side:";
  } else if (thought.content.toLowerCase().includes("developer")) {
    return "🤖 Hmm... Maybe I should introduce the developer:";
  } else if (thought.content.toLowerCase().includes("designer")) {
    return "🤖 Hmm... Perhaps my design portfolio would do:";
  } else {
    return "🤖 Hmm... Maybe I should show:";
  }
}

function getChainMessages(thought) {
  return (
    thought.chain || [
      getDynamicPrefixFallback(thought),
      "🤖 Let me think about it...",
      "🤖 Processing the details...",
      "🤖 Almost there...",
    ]
  );
}

// ScrambleText: animates text by gradually revealing the real text amidst random characters.
function ScrambleText({ text, className, duration = 1000, interval = 50 }) {
  const [displayed, setDisplayed] = useState(text);

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.ceil(duration / interval);
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    const scrambleInterval = setInterval(() => {
      frame++;
      let newText = "";
      for (let i = 0; i < text.length; i++) {
        if (i < (frame / totalFrames) * text.length) {
          newText += text[i];
        } else {
          newText += chars[Math.floor(Math.random() * chars.length)];
        }
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

// New component: ScrambleParsedText applies the scramble effect to content while parsing **bold** markers.
function ScrambleParsedText({
  text,
  className,
  duration = 1000,
  interval = 50,
}) {
  // Split the text at bold markers.
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={index}>
            <ScrambleText
              text={part.slice(2, -2)}
              className={className}
              duration={duration}
              interval={interval}
            />
          </strong>
        ) : (
          <ScrambleText
            key={index}
            text={part}
            className={className}
            duration={duration}
            interval={interval}
          />
        )
      )}
    </>
  );
}

export default function ChainOfThought() {
  // 'displayIndex' holds the index of the currently visible content.
  const [displayIndex, setDisplayIndex] = useState(0);
  // 'reasoningIndex' is for the thought being "reasoned about" (its chain messages).
  // We initialize it to 1 so that the first cycle reasons about the upcoming content.
  const [reasoningIndex, setReasoningIndex] = useState(1);

  // Get the chain messages for the thought that’s being reasoned.
  const chainMessages = getChainMessages(thoughts[reasoningIndex]);
  // Define a final pause message (without shimmer).
  const finalChainMessage = "🤖 Reasoned for 8 seconds.";
  // Total chain steps: the chain messages plus one extra pause step.
  const totalChainSteps = chainMessages.length + 1;

  // 'chainStepIndex' tracks the current step in the chain-of-thought sequence.
  const [chainStepIndex, setChainStepIndex] = useState(0);

  useEffect(() => {
    let timer;
    if (chainStepIndex < chainMessages.length) {
      // Advance through the chain messages every 2 seconds.
      timer = setTimeout(() => {
        setChainStepIndex((prev) => prev + 1);
      }, 2000);
    } else if (chainStepIndex === chainMessages.length) {
      // When the final pause message appears, update the visible content immediately.
      setDisplayIndex(reasoningIndex);
      // Then, after a pause (4 seconds), set up the next reasoning cycle.
      timer = setTimeout(() => {
        setReasoningIndex((prev) => (prev + 1) % thoughts.length);
        setChainStepIndex(0);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [chainStepIndex, chainMessages, reasoningIndex]);

  // Framer Motion variants for chain messages (used only for animated chain steps).
  const chainVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full max-w-lg">
      {/* Chain-of-Thought block */}
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
            <p className="text-sm md:text-base text-slate-400 shimmer-text">
              {parseBoldText(chainMessages[chainStepIndex])}
            </p>
          </motion.div>
        </AnimatePresence>
      ) : (
        // Final chain message: rendered as static text without shimmer or animation.
        <div className="mb-4">
          <p className="text-sm md:text-base text-slate-400">
            {finalChainMessage}
          </p>
        </div>
      )}

      {/* Content block: always visible, using ScrambleParsedText for scramble effect with bold parsing. */}
      <div className="mb-4">
        <p className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-medium text-slate-200 max-w-sm overflow-hidden break-words">
          <ScrambleParsedText
            text={thoughts[displayIndex].title}
            className=""
            duration={1000}
            interval={50}
          />
        </p>
        <p className="mt-2 sm:mt-2 lg:mt-3 text-base md:text-lg text-slate-400 max-w-sm overflow-hidden break-words leading-[1.6]">
          <ScrambleParsedText
            text={thoughts[displayIndex].content}
            className=""
            duration={1000}
            interval={50}
          />
        </p>
      </div>
    </div>
  );
}
