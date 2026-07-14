import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import PortfolioCard from "@/components/PortfolioCard";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Products and portfolio | Domel Safety",
  description:
    "Safety equipment, fumigation supplies and signage from Domel Safety, plus a look at recent projects.",
};

const PRODUCTS = [
  {
    name: "Fire extinguishers",
    category: "FIRE SAFETY",
    description: "CO2, foam and dry powder units, supplied and serviced on site.",
    accent: "red" as const,
  },
  {
    name: "Smoke and heat detectors",
    category: "FIRE SAFETY",
    description: "Detection systems for offices, warehouses and institutions.",
    accent: "red" as const,
  },
  {
    name: "Protective coveralls",
    category: "PPE",
    description: "Chemical-resistant coveralls, gloves and respirators for site teams.",
    accent: "orange" as const,
  },
  {
    name: "Safety helmets and boots",
    category: "PPE",
    description: "Certified head and foot protection for industrial sites.",
    accent: "orange" as const,
  },
  {
    name: "Fumigation chemicals",
    category: "FUMIGATION SUPPLIES",
    description: "Licensed pest and termite control products for commercial use.",
    accent: "charcoal" as const,
  },
  {
    name: "Safety signage",
    category: "SIGNAGE",
    description: "Hazard, exit and compliance signage built to local standards.",
    accent: "charcoal" as const,
  },
];

const PORTFOLIO = [
  {
    index: "01",
    client: "Logistics warehouse",
    title: "Full-site fumigation",
    result: "Cleared a 3,000 sqm warehouse of termite activity in one weekend, zero downtime.",
  },
  {
    index: "02",
    client: "Manufacturing plant",
    title: "Fire safety inspection",
    result: "Identified 14 compliance gaps and delivered a certified report within 3 days.",
  },
  {
    index: "03",
    client: "Private school",
    title: "Safety consultation and training",
    result: "Trained 40 staff on emergency procedures and updated the site safety policy.",
  },
];

export default function ProductsPage() {
  return (
    <main>
      <Header />
      <PageHero
        eyebrow="PRODUCTS AND PORTFOLIO"
        title="What we supply, and what we've delivered"
        description="Safety equipment and fumigation supplies for your site, backed by a track record of completed projects."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <span className="font-mono text-xs text-brand-red">PRODUCTS</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <span className="font-mono text-xs text-brand-red">PORTFOLIO</span>
        <div className="mt-2">
          {PORTFOLIO.map((item) => (
            <PortfolioCard key={item.index} {...item} />
          ))}
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </main>
  );
}
