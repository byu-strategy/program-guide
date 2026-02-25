"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      setStatus("sent");
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 shadow-md">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <Image
              src="/images/Strategy_left_blue_grey_rgb.png"
              alt="BYU Strategy"
              width={160}
              height={50}
              className="h-14 w-auto"
            />
          </div>

          <h1 className="mb-2 text-center font-heading text-2xl font-bold text-navy">
            Sign In
          </h1>
          <p className="mb-6 text-center text-sm text-slate-gray">
            Enter your email to receive a magic link
          </p>

          {status === "sent" ? (
            <div className="rounded-sm bg-green-light/10 p-4 text-center">
              <p className="font-heading text-sm font-semibold text-green">
                Check your email
              </p>
              <p className="mt-1 text-sm text-slate-gray">
                We sent a sign-in link to <strong>{email}</strong>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full border border-slate-gray/20 bg-stone px-4 py-3 text-sm transition-colors focus:border-royal focus:outline-none"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-navy py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-royal disabled:opacity-50"
              >
                {status === "sending" ? "Sending..." : "Send Magic Link"}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-xs text-slate-gray">
            Use the email associated with your BYU Strategy account.
            <br />
            New users will be automatically matched to their alumni record.
          </p>
        </div>
      </div>
    </div>
  );
}
