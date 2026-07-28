import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import GalleryTile from "@/components/GalleryTile";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Gallery | Domel Safety",
  description:
    "A look at Domel Safety's fire safety, PPE, fumigation and inspection work across Tanzania.",
};

export const revalidate = 0;

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("gallery_items")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <main>
      <Header />
      <PageHero
        eyebrow="GALLERY"
        title="Our work on site"
        description="Photos from recent installations, inspections, fumigation jobs and safety training across Tanzania."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        {items && items.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item) => (
              <GalleryTile
                key={item.id}
                src={item.image_url}
                title={item.title}
                location={item.location ?? ""}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-steel text-sm py-10">
            Picha zinakuja hivi karibuni.
          </p>
        )}
      </section>

      <CtaBanner />
      <Footer />
    </main>
  );
}
