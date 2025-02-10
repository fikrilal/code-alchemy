"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const messages = [
  "booting up...",
  "Initializing Fikril’s Portfolio System...",
  "Loading skills: Flutter, Kotlin, Jetpack Compose...",
  "Fetching music playlist... 🎵",
  "Compiling Warhammer 40K lore...",
  "Ready. Type 'help' to see available commands.",
];

export default function ConsoleSection() {
  const [output, setOutput] = useState([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < messages.length) {
        setOutput((prev) => [...prev, messages[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1200); // Simulate typing delay

    return () => clearInterval(interval);
  }, []);

  const handleCommand = () => {
    setIsProcessing(true);

    setTimeout(() => {
      if (input.toLowerCase() === "help") {
        setOutput((prev) => [
          ...prev,
          "Available commands:",
          "• email - Show contact email",
          "• github - Open GitHub profile",
          "• linkedin - Open LinkedIn profile",
          "• warhammer - Generate random Warhammer 40K fact",
          "• clear - Clear console",
        ]);
      } else if (input.toLowerCase() === "email") {
        setOutput((prev) => [...prev, "📩 Contact: fikrildev@gmail.com"]);
      } else if (input.toLowerCase() === "github") {
        window.open("https://github.com/yourprofile", "_blank");
      } else if (input.toLowerCase() === "linkedin") {
        window.open("https://linkedin.com/in/yourprofile", "_blank");
      } else if (input.toLowerCase() === "warhammer") {
        const facts = [
          "The Emperor protects, but He does not forgive.",
          "Sanguinius foresaw his own death at the hands of Horus.",
          "There is only war in the grimdark future.",
        ];
        setOutput((prev) => [
          ...prev,
          "⚔️ Warhammer 40K Fact: " +
            facts[Math.floor(Math.random() * facts.length)],
        ]);
      } else if (input.toLowerCase() === "clear") {
        setOutput([]);
      } else {
        setOutput((prev) => [...prev, `Command not found: '${input}'`]);
      }

      setInput("");
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="bg-black text-green-400 font-mono p-6 rounded-lg shadow-md h-64 overflow-y-auto">
      {output.map((line, index) => (
        <p key={index} className="animate-fadeIn">
          {line}
        </p>
      ))}

      {/* User input line */}
      <div className="flex">
        <span className="text-green-500">$</span>
        <input
          type="text"
          value={input}
          disabled={isProcessing}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.trim() !== "") handleCommand();
          }}
          className="bg-transparent border-none outline-none text-green-400 ml-2 flex-1"
          autoFocus
        />
      </div>
    </div>
  );
}
