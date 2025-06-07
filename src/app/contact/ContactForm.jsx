"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium text-slate-200">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md bg-slate-800 border border-slate-700 p-2 text-slate-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-200">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full rounded-md bg-slate-800 border border-slate-700 p-2 text-slate-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-200">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows="5"
          className="mt-1 block w-full rounded-md bg-slate-800 border border-slate-700 p-2 text-slate-100"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-brand-primary text-slate-900 rounded-md hover:opacity-90"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending..." : "Send"}
      </button>
      {status === "success" && (
        <p className="text-green-500">Message sent successfully!</p>
      )}
      {status === "error" && (
        <p className="text-red-500">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
