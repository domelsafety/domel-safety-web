"use client";

import { useRef, useState, useTransition } from "react";
import { addGalleryItem } from "@/app/admin/(dashboard)/gallery/actions";

export default function GalleryUploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await addGalleryItem(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setError(null);
        formRef.current?.reset();
      }
    });
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="bg-white border border-border rounded-md p-5 mb-6 grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
    >
      <div>
        <label className="block text-xs font-mono text-steel mb-1.5">
          PICHA
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          required
          className="text-xs w-full"
        />
      </div>
      <div>
        <label className="block text-xs font-mono text-steel mb-1.5">
          KICHWA
        </label>
        <input
          type="text"
          name="title"
          required
          placeholder="Fire Extinguisher Installation"
          className="w-full border border-border rounded-md px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-mono text-steel mb-1.5">
          ENEO
        </label>
        <input
          type="text"
          name="location"
          placeholder="Dar es Salaam"
          className="w-full border border-border rounded-md px-3 py-2 text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="bg-brand-red text-white text-sm font-semibold py-2.5 rounded-md hover:bg-brand-red/90 transition-colors disabled:opacity-60"
      >
        {pending ? "Inapakia..." : "Ongeza Picha"}
      </button>
      {error && (
        <p className="md:col-span-4 text-xs text-brand-red">{error}</p>
      )}
    </form>
  );
}
