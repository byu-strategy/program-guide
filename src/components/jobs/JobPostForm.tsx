"use client";

import { useState } from "react";
import { ROLE_BUCKETS } from "@/types/database";

export default function JobPostForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form, setForm] = useState({
    title: "",
    company_name: "",
    description: "",
    location: "",
    job_type: "full-time",
    role_bucket: "",
    url: "",
    contact_email: "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMessage("Job posted successfully!");
      setForm({
        title: "",
        company_name: "",
        description: "",
        location: "",
        job_type: "full-time",
        role_bucket: "",
        url: "",
        contact_email: "",
      });
      onSuccess?.();
    } else {
      const data = await res.json();
      setMessage(data.error || "Failed to post job.");
    }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-xs">
      <h2 className="font-heading text-lg font-bold text-navy">Post a Job</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="mb-1 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
            Job Title *
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border border-slate-gray/20 bg-stone px-4 py-2.5 text-sm focus:border-royal focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="company_name" className="mb-1 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
            Company *
          </label>
          <input
            id="company_name"
            name="company_name"
            value={form.company_name}
            onChange={handleChange}
            required
            className="w-full border border-slate-gray/20 bg-stone px-4 py-2.5 text-sm focus:border-royal focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full border border-slate-gray/20 bg-stone px-4 py-2.5 text-sm focus:border-royal focus:outline-none"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="location" className="mb-1 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
            Location
          </label>
          <input
            id="location"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border border-slate-gray/20 bg-stone px-4 py-2.5 text-sm focus:border-royal focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="job_type" className="mb-1 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
            Type
          </label>
          <select
            id="job_type"
            name="job_type"
            value={form.job_type}
            onChange={handleChange}
            className="w-full border border-slate-gray/20 bg-stone px-4 py-2.5 font-heading text-sm focus:border-royal focus:outline-none"
          >
            <option value="full-time">Full-time</option>
            <option value="internship">Internship</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
          </select>
        </div>
        <div>
          <label htmlFor="role_bucket" className="mb-1 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
            Role Category
          </label>
          <select
            id="role_bucket"
            name="role_bucket"
            value={form.role_bucket}
            onChange={handleChange}
            className="w-full border border-slate-gray/20 bg-stone px-4 py-2.5 font-heading text-sm focus:border-royal focus:outline-none"
          >
            <option value="">Select...</option>
            {ROLE_BUCKETS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="url" className="mb-1 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
            Application URL
          </label>
          <input
            id="url"
            name="url"
            type="url"
            value={form.url}
            onChange={handleChange}
            className="w-full border border-slate-gray/20 bg-stone px-4 py-2.5 text-sm focus:border-royal focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="contact_email" className="mb-1 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
            Contact Email
          </label>
          <input
            id="contact_email"
            name="contact_email"
            type="email"
            value={form.contact_email}
            onChange={handleChange}
            className="w-full border border-slate-gray/20 bg-stone px-4 py-2.5 text-sm focus:border-royal focus:outline-none"
          />
        </div>
      </div>

      {message && (
        <p className={`text-sm ${message.includes("success") ? "text-green" : "text-red"}`}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="bg-navy px-6 py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-royal disabled:opacity-50"
      >
        {saving ? "Posting..." : "Post Job"}
      </button>
    </form>
  );
}
