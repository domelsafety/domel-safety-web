"use client";

import { useState, type FormEvent } from "react";
import { inputClass, labelClass } from "./formField";
import { supabase } from "@/lib/supabase";

type Status = "idle" | "submitting" | "success" | "error";

export default function RequestQuoteForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);

    const { error } = await supabase.from("quotations").insert({
      full_name: data.get("fullName") as string,
      company: (data.get("company") as string) || null,
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      service: data.get("service") as string,
      details: (data.get("details") as string) || null,
    });

    if (error) {
      console.error("Quote request error", error);
      setStatus("error");
      return;
    }

    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    return (
      <div className="bg-white border border-border rounded-md p-8 text-center">
        <h2 className="font-display text-xl font-bold text-charcoal mb-2">
          Quote request sent
        </h2>
        <p className="text-steel text-sm">
          We&apos;ve received your details and will get back to you within one
          business day.
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
          <label htmlFor="company" className={labelClass}>Company / institution</label>
          <input id="company" name="company" type="text" className={inputClass} placeholder="Optional" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="you@company.com" />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone</label>
          <input id="phone" name="phone" type="tel" required className={inputClass} placeholder="+255 7XX XXX XXX" />
        </div>
      </div>

      <div>
        <label htmlFor="service" className={labelClass}>Service needed</label>
        <select id="service" name="service" required className={inputClass}>
          <option value="">Select a service</option>
          <option value="inspection">Inspection</option>
          <option value="fumigation">Fumigation</option>
          <option value="consultation">Safety consultation</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="details" className={labelClass}>Tell us about the job</label>
        <textarea id="details" name="details" rows={4} className={inputClass} placeholder="Site location, size, timing, anything we should know" />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-brand-red text-offwhite text-sm font-medium px-6 py-3 rounded disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send request"}
      </button>

      {status === "error" && (
        <p className="text-sm text-brand-red">
          Something went wrong. Try again or call us directly.
        </p>
      )}
    </form>
  );
}
