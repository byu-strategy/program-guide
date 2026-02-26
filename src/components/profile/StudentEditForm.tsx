"use client";

import { useState } from "react";
import type { Person } from "@/types/database";

interface StudentEditFormProps {
  person: Person;
}

export default function StudentEditForm({ person }: StudentEditFormProps) {
  const [form, setForm] = useState({
    bio: person.bio || "",
    track: person.track || "",
    target_roles: person.target_roles || "",
    gpa: person.gpa?.toString() || "",
    internship_experience: person.internship_experience || "",
    linkedin_url: person.linkedin_url || "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const payload = {
      bio: form.bio || null,
      track: form.track || null,
      target_roles: form.target_roles || null,
      gpa: form.gpa ? parseFloat(form.gpa) : null,
      internship_experience: form.internship_experience || null,
      linkedin_url: form.linkedin_url || null,
    };

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setMessage("Profile updated successfully!");
    } else {
      const data = await res.json();
      setMessage(data.error || "Failed to update profile.");
    }
    setSaving(false);
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/profile/photo", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setMessage("Photo uploaded! Refresh to see changes.");
    } else {
      setMessage("Failed to upload photo.");
    }
  }

  async function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/profile/resume", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setMessage("Resume uploaded!");
    } else {
      setMessage("Failed to upload resume.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Photo */}
      <div>
        <label className="mb-1 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
          Profile Photo
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="text-sm text-slate-gray file:mr-3 file:border-0 file:bg-navy file:px-4 file:py-2 file:font-heading file:text-xs file:font-semibold file:text-white hover:file:bg-royal"
        />
      </div>

      {/* Track */}
      <div>
        <label htmlFor="track" className="mb-1 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
          Career Track
        </label>
        <select
          id="track"
          name="track"
          value={form.track}
          onChange={handleChange}
          className="w-full border border-slate-gray/20 bg-stone px-4 py-2.5 font-heading text-sm focus:border-royal focus:outline-none"
        >
          <option value="">Select a track</option>
          <option value="Consulting">Consulting</option>
          <option value="Corporate Strategy">Corporate Strategy</option>
          <option value="Finance">Finance</option>
          <option value="Product Management">Product Management</option>
        </select>
      </div>

      {/* Target Roles */}
      <div>
        <label htmlFor="target_roles" className="mb-1 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
          Target Roles / Companies
        </label>
        <input
          id="target_roles"
          name="target_roles"
          value={form.target_roles}
          onChange={handleChange}
          placeholder="e.g., Strategy Consulting at McKinsey, Product Management at Google"
          className="w-full border border-slate-gray/20 bg-stone px-4 py-2.5 text-sm focus:border-royal focus:outline-none"
        />
      </div>

      {/* GPA */}
      <div className="max-w-[200px]">
        <label htmlFor="gpa" className="mb-1 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
          GPA
        </label>
        <input
          id="gpa"
          name="gpa"
          type="number"
          step="0.01"
          min="0"
          max="4"
          value={form.gpa}
          onChange={handleChange}
          placeholder="3.85"
          className="w-full border border-slate-gray/20 bg-stone px-4 py-2.5 text-sm focus:border-royal focus:outline-none"
        />
        <p className="mt-1 text-[11px] text-slate-gray/60">
          Visible to consortium employers and faculty only
        </p>
      </div>

      {/* Internship Experience */}
      <div>
        <label htmlFor="internship_experience" className="mb-1 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
          Internship Experience
        </label>
        <textarea
          id="internship_experience"
          name="internship_experience"
          value={form.internship_experience}
          onChange={handleChange}
          rows={3}
          placeholder="e.g., Summer 2025 intern at Bain & Company (Dallas)"
          className="w-full border border-slate-gray/20 bg-stone px-4 py-2.5 text-sm focus:border-royal focus:outline-none"
        />
      </div>

      {/* LinkedIn */}
      <div>
        <label htmlFor="linkedin_url" className="mb-1 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
          LinkedIn URL
        </label>
        <input
          id="linkedin_url"
          name="linkedin_url"
          type="url"
          value={form.linkedin_url}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/yourname"
          className="w-full border border-slate-gray/20 bg-stone px-4 py-2.5 text-sm focus:border-royal focus:outline-none"
        />
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="bio" className="mb-1 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={form.bio}
          onChange={handleChange}
          rows={3}
          placeholder="Brief intro about yourself..."
          className="w-full border border-slate-gray/20 bg-stone px-4 py-2.5 text-sm focus:border-royal focus:outline-none"
        />
      </div>

      {/* Resume */}
      <div>
        <label className="mb-1 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
          Resume (PDF)
        </label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleResumeUpload}
          className="text-sm text-slate-gray file:mr-3 file:border-0 file:bg-navy file:px-4 file:py-2 file:font-heading file:text-xs file:font-semibold file:text-white hover:file:bg-royal"
        />
        {person.resume_url && (
          <p className="mt-1 text-[11px] text-slate-gray/60">
            Current resume uploaded.{" "}
            <a href={person.resume_url} target="_blank" rel="noopener noreferrer" className="text-royal">
              View
            </a>
          </p>
        )}
      </div>

      {/* Submit */}
      {message && (
        <p className={`text-sm ${message.includes("success") || message.includes("uploaded") ? "text-green" : "text-red"}`}>
          {message}
        </p>
      )}
      <button
        type="submit"
        disabled={saving}
        className="bg-navy px-6 py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-royal disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}
