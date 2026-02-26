"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Person } from "@/types/database";

interface ProfileEditFormProps {
  person: Person;
}

export default function ProfileEditForm({ person }: ProfileEditFormProps) {
  const [form, setForm] = useState({
    bio: person.bio || "",
    contact_preference: person.contact_preference || "linkedin",
    current_job_title: person.current_job_title || "",
    current_company: person.current_company || "",
    location_city: person.location_city || "",
    location_state: person.location_state || "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
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

      {/* Current Role */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="current_job_title" className="mb-1 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
            Current Title
          </label>
          <input
            id="current_job_title"
            name="current_job_title"
            value={form.current_job_title}
            onChange={handleChange}
            className="w-full border border-slate-gray/20 bg-stone px-4 py-2.5 text-sm focus:border-royal focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="current_company" className="mb-1 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
            Current Company
          </label>
          <input
            id="current_company"
            name="current_company"
            value={form.current_company}
            onChange={handleChange}
            className="w-full border border-slate-gray/20 bg-stone px-4 py-2.5 text-sm focus:border-royal focus:outline-none"
          />
        </div>
      </div>

      {/* Location */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="location_city" className="mb-1 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
            City
          </label>
          <input
            id="location_city"
            name="location_city"
            value={form.location_city}
            onChange={handleChange}
            className="w-full border border-slate-gray/20 bg-stone px-4 py-2.5 text-sm focus:border-royal focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="location_state" className="mb-1 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
            State
          </label>
          <input
            id="location_state"
            name="location_state"
            value={form.location_state}
            onChange={handleChange}
            className="w-full border border-slate-gray/20 bg-stone px-4 py-2.5 text-sm focus:border-royal focus:outline-none"
          />
        </div>
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
          rows={4}
          className="w-full border border-slate-gray/20 bg-stone px-4 py-2.5 text-sm focus:border-royal focus:outline-none"
          placeholder="Tell fellow alumni about yourself..."
        />
      </div>

      {/* Contact Preference */}
      <div>
        <label htmlFor="contact_preference" className="mb-1 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
          How should students contact you?
        </label>
        <select
          id="contact_preference"
          name="contact_preference"
          value={form.contact_preference}
          onChange={handleChange}
          className="border border-slate-gray/20 bg-stone px-4 py-2.5 font-heading text-sm focus:border-royal focus:outline-none"
        >
          <option value="linkedin">LinkedIn</option>
          <option value="email">Email</option>
          <option value="none">Prefer not to be contacted</option>
        </select>
      </div>

      {/* Submit */}
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
        {saving ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}
