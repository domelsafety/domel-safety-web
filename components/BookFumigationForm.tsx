"use client";

import { useState, type FormEvent } from "react";
import { inputClass, labelClass } from "./formField";
import { supabase } from "@/lib/supabase";

type Status = "idle" | "submitting" | "success" | "error";

export default function BookFumigationForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);

    const { error } = await supabase.from("bookings").insert({
      full_name: data.get("fullName") as string,
      company: (data.get("company") as string) || null,
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      property_type: data.get("propertyType") as string,
      preferred_date: data.get("preferredDate") as string,
      address: data.get("address") as string,
      notes: (data.get("notes") as string) || null,
    });

    if (error) {
      console.error("Fumigation booking error", error);
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
          Booking received
        </h2>
        <p className="text-steel text-sm">
          We&apos;ll confirm your fumigation slot by phone or email shortly.
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="propertyType" className={labelClass}>Property type</label>
          <select id="propertyType" name="propertyType" required className={inputClass}>
            <option value="">Select property type</option>
            <option value="office">Office</option>
            <option value="warehouse">Warehouse</option>
            <option value="school">School / institution</option>
            <option value="home">Home</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="preferredDate" className={labelClass}>Preferred date</label>
          <input id="preferredDate" name="preferredDate" type="date" required className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="address" className={labelClass}>Site address</label>
        <input id="address" name="address" type="text" required className={inputClass} placeholder="Street, area, city" />
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>Notes</label>
        <textarea id="notes" name="notes" rows={4} className={inputClass} placeholder="Pest type, site size, access instructions" />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-brand-red text-offwhite text-sm font-medium px-6 py-3 rounded disabled:opacity-60"
      >
        {status === "submitting" ? "Booking…" : "Book fumigation"}
      </button>

      {status === "error" && (
        <p className="text-sm text-brand-red">
          Something went wrong. Try again or call us directly.
        </p>
      )}
    </form>
  );
}
