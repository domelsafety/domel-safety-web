import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import GalleryTile from "@/components/GalleryTile";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gallery | Domel Safety",
  description:
    "A look at Domel Safety's inspection, fumigation and consultation work across Tanzania.",
};

const TILES = [
  { category: "Inspections", tint: "bg-brand-red/10" },
  { category: "Fumigation", tint: "bg-brand-orange/10" },
  { category: "Consultation", tint: "bg-charcoal/10" },
  { category: "Inspections", tint: "bg-brand-orange/10" },
  { category: "Fumigation", tint: "bg-charcoal/10" },
  { category: "Consultation", tint: "bg-brand-red/10" },
  { category: "Inspections", tint: "bg-charcoal/10" },
  { category: "Fumigation", tint: "bg-brand-red/10" },
  { category: "Consultation", tint: "bg-brand-orange/10" },
];

export default function GalleryPage() {
  return (
    <main>
      <Header />
      <PageHero
        eyebrow="GALLERY"
        title="Our work on site"
        description="Photos from recent inspections, fumigation jobs and safety consultations. Real project photos go here as jobs are completed."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {TILES.map((tile, i) => (
            <GalleryTile key={`${tile.category}-${i}`} {...tile} />
          ))}
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </main>
  );
}
