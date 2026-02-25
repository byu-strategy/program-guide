"use client";

import { useState } from "react";

interface SubscribeFormProps {
  dark?: boolean;
}

export default function SubscribeForm({ dark }: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className={`text-sm font-semibold ${dark ? "text-yellow" : "text-green"}`}>
        You&apos;re subscribed! Watch your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className={`flex-1 px-4 py-2.5 text-sm transition-colors focus:outline-none ${
          dark
            ? "border border-white/20 bg-white/10 text-white placeholder-white/40 focus:border-yellow"
            : "border border-slate-gray/20 bg-white focus:border-royal"
        }`}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className={`shrink-0 px-5 py-2.5 font-heading text-sm font-semibold transition-colors disabled:opacity-50 ${
          dark
            ? "bg-yellow text-navy hover:bg-yellow/90"
            : "bg-navy text-white hover:bg-royal"
        }`}
      >
        {status === "sending" ? "..." : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="mt-1 text-xs text-red">Failed to subscribe. Try again.</p>
      )}
    </form>
  );
}
