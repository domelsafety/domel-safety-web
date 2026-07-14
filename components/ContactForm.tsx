"use client";

import { useState, type FormEvent } from "react";
import { inputClass, labelClass } from "./formField";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      // TODO: wire to Supabase (insert into `contact_messages` table).
      await new Promise((resolve) => setTimeout(resolve, 600));
      console.log("Contact message payload", payload);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white border border-border rounded-md p-8 text-center">
        <h2 className="font-display text-xl font-bold text-charcoal mb-2">
          Message sent
        </h2>
        <p className="text-steel text-sm">
          Thanks for reaching out. We&apos;ll reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-border rounded-md p-6 md:p-8 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fullName" className={labelClass}>Full name</label>
          <input id="fullName" name="fullName" type="text" required className={inputClass} placeholder="Jina lako" />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="you@company.com" />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className={labelClass}>Subject</label>
        <input id="subject" name="subject" type="text" required className={inputClass} placeholder="What's this about?" />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Message</label>
        <textarea id="message" name="message" rows={5} required className={inputClass} placeholder="Write your message" />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-brand-red text-offwhite text-sm font-medium px-6 py-3 rounded disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>

      {status === "error" && (
        <p className="text-sm text-brand-red">
          Something went wrong. Try again or call us directly.
        </p>
      )}
    </form>
  );
}
