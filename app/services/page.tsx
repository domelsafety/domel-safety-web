import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import ServiceDetail from "@/components/ServiceDetail";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Services | Domel Safety",
  description:
    "Inspections, fumigation and safety consultation services from Domel Safety Company Limited.",
};

const SERVICES = [
  {
    index: "01",
    title: "Inspections",
    description:
      "Certified inspectors assess your site, equipment and workplace against Tanzanian safety standards, then hand you a clear report with any actions you need to take.",
    items: [
      "Fire safety and equipment checks",
      "Workplace hazard assessment",
      "Building and site safety audits",
      "Certified inspection report",
    ],
    dot: "bg-brand-red",
    ctaLabel: "Request an inspection",
    ctaHref: "/request-quote",
  },
  {
    index: "02",
    title: "Fumigation",
    description:
      "Pest and termite control for offices, warehouses, schools and institutions, using licensed chemicals and a team trained to work around your operating hours.",
    items: [
      "Termite and general pest treatment",
      "Warehouse and stock protection",
      "Pre- and post-treatment site checks",
      "Scheduled or one-off callouts",
    ],
    dot: "bg-brand-orange",
    reversed: true,
    ctaLabel: "Book fumigation",
    ctaHref: "/book-fumigation",
  },
  {
    index: "03",
    title: "Safety consultation",
    description:
      "Ongoing guidance to keep your organisation compliant, from a one-time audit to ongoing advisory support and staff training.",
    items: [
      "Compliance and risk audits",
      "Staff safety training",
      "Policy and procedure guidance",
      "Ongoing advisory support",
    ],
    dot: "bg-charcoal",
    ctaLabel: "Book a consultation",
    ctaHref: "/request-quote",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <Header />
      <PageHero
        eyebrow="OUR SERVICES"
        title="Three services, one safety standard"
        description="Whatever your organisation needs, from a single inspection to ongoing safety consulting, our licensed team covers it."
      />
      <section className="mx-auto max-w-6xl px-6">
        {SERVICES.map((service) => (
          <ServiceDetail key={service.index} {...service} />
        ))}
      </section>
      <CtaBanner />
      <Footer />
    </main>
  );
}
