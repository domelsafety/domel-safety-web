"use client";

import { useTransition } from "react";
import { deleteGalleryItem } from "./actions";

export default function DeleteGalleryButton({
  id,
  imageUrl,
}: {
  id: string;
  imageUrl: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm("Futa picha hii?")) {
          startTransition(() => deleteGalleryItem(id, imageUrl));
        }
      }}
      disabled={pending}
      className="absolute top-2 right-2 bg-charcoal/80 text-white text-xs px-2 py-1 rounded disabled:opacity-50"
    >
      {pending ? "..." : "Futa"}
    </button>
  );
}
