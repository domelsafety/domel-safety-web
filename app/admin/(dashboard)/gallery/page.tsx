import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import GalleryUploadForm from "@/components/admin/GalleryUploadForm";
import EmptyState from "@/components/admin/EmptyState";
import DeleteGalleryButton from "./DeleteGalleryButton";

export default async function AdminGalleryPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("gallery_items")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-bold text-charcoal mb-1">
        Gallery
      </h1>
      <p className="text-sm text-steel mb-6">
        Ongeza au futa picha zinazoonekana kwenye ukurasa wa Gallery wa umma.
      </p>

      <GalleryUploadForm />

      {!items || items.length === 0 ? (
        <EmptyState label="picha" />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square rounded-md overflow-hidden border border-border"
            >
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <p className="text-xs text-white font-semibold leading-tight">
                  {item.title}
                </p>
                {item.location && (
                  <p className="text-[10px] text-brand-orange">
                    {item.location}
                  </p>
                )}
              </div>
              <DeleteGalleryButton id={item.id} imageUrl={item.image_url} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
