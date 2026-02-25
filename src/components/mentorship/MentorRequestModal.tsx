"use client";

import { useState } from "react";

interface MentorRequestModalProps {
  mentorPersonId: number;
  mentorName: string;
  onClose: () => void;
}

export default function MentorRequestModal({
  mentorPersonId,
  mentorName,
  onClose,
}: MentorRequestModalProps) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const res = await fetch("/api/mentorship", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mentor_person_id: mentorPersonId, message }),
    });

    if (res.ok) {
      setStatus("sent");
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-dark/50 p-4">
      <div className="w-full max-w-md bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-navy">
            Request Mentorship
          </h2>
          <button
            onClick={onClose}
            className="text-slate-gray transition-colors hover:text-navy"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {status === "sent" ? (
          <div className="text-center">
            <p className="font-heading text-sm font-semibold text-green">
              Request sent!
            </p>
            <p className="mt-1 text-sm text-slate-gray">
              {mentorName} will be notified of your request.
            </p>
            <button
              onClick={onClose}
              className="mt-4 bg-navy px-4 py-2 font-heading text-sm font-semibold text-white transition-colors hover:bg-royal"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-slate-gray">
              Send a message to <strong>{mentorName}</strong> explaining what
              you&apos;d like to discuss.
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Hi, I'm a current Strategy student and I'd love to learn about..."
              className="w-full border border-slate-gray/20 bg-stone px-4 py-2.5 text-sm focus:border-royal focus:outline-none"
              required
            />
            {status === "error" && (
              <p className="text-sm text-red">Failed to send request. Please try again.</p>
            )}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 font-heading text-sm text-slate-gray transition-colors hover:text-navy"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === "sending"}
                className="bg-navy px-6 py-2 font-heading text-sm font-semibold text-white transition-colors hover:bg-royal disabled:opacity-50"
              >
                {status === "sending" ? "Sending..." : "Send Request"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
