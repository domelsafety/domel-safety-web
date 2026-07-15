import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import GalleryTile from "@/components/GalleryTile";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gallery | Domel Safety",
  description:
    "A look at Domel Safety's fire safety, PPE, fumigation and inspection work across Tanzania.",
};

const TILES: { src: string; title: string; location: string }[] = [
  { src: "/gallery/fire_alarm_hydrant.png", title: "Fire Alarm & Hydrant System Installation", location: "Dar es Salaam" },
  { src: "/gallery/fire_extinguishers.png", title: "Fire Extinguishers Supply & Maintenance", location: "Dar es Salaam" },
  { src: "/gallery/fire_hose_reel.png", title: "Fire Hose Reel System Installation", location: "Arusha" },
  { src: "/gallery/safety_inspection.png", title: "Safety Inspection & Risk Assessment", location: "Mwanza" },
  { src: "/gallery/fumigation_service.png", title: "Fumigation Service - Commercial Building", location: "Dar es Salaam" },
  { src: "/gallery/ppe_supply.png", title: "PPE Supply to Construction Site", location: "Dodoma" },
  { src: "/gallery/smoke_detector.png", title: "Smoke Detector Installation", location: "Dar es Salaam" },
  { src: "/gallery/fire_safety_training.png", title: "Fire Safety Training Session", location: "Dar es Salaam" },
  { src: "/gallery/warehouse_fumigation.png", title: "Warehouse Fumigation", location: "Morogoro" },
  { src: "/gallery/fire_drill_emergency.png", title: "Fire Drill & Emergency Training", location: "Dar es Salaam" },
];

export default function GalleryPage() {
  return (
    <main>
      <Header />
      <PageHero
        eyebrow="GALLERY"
        title="Our work on site"
        description="Photos from recent installations, inspections, fumigation jobs and safety training across Tanzania."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {TILES.map((tile) => (
            <GalleryTile key={tile.src} {...tile} />
          ))}
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </main>
  );
}
