import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Stats from "@/components/Stats";
import ValueCard from "@/components/ValueCard";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About | Domel Safety",
  description:
    "Domel Safety Company Limited is a licensed inspection, fumigation and safety consulting company serving companies, institutions and individuals across Tanzania.",
};

const VALUES = [
  {
    title: "Licensed and certified",
    description: "Every inspector and technician is licensed, insured and trained to national safety standards.",
    dot: "bg-brand-red",
    icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Fast response",
    description: "Same-week bookings and a 24/7 callout line for urgent safety and pest issues.",
    dot: "bg-brand-orange",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Clear reporting",
    description: "Every job ends with a written report you can share with regulators, clients or your own team.",
    dot: "bg-charcoal",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
];

export default function AboutPage() {
  return (
    <main>
      <Header />
      <PageHero
        eyebrow="ABOUT DOMEL SAFETY"
        title="Keeping people and places safe across Tanzania"
        description="Domel Safety Company Limited serves companies, institutions and individuals with inspections, fumigation and safety consulting, backed by a licensed team and a clear paper trail on every job."
      />

      <section className="mx-auto max-w-6xl px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div>
          <span className="font-mono text-xs text-brand-red">OUR STORY</span>
          <h2 className="font-display text-2xl font-bold text-charcoal mt-2 mb-4">
            Built on inspections you can trust
          </h2>
          <p className="text-steel text-sm leading-relaxed mb-4">
            We started Domel Safety to give companies and institutions a
            single, dependable partner for safety, from the inspection
            that spots a hazard to the fumigation that clears it.
          </p>
          <p className="text-steel text-sm leading-relaxed">
            Today we work with offices, warehouses, schools and other
            institutions, combining licensed technicians with reporting
            that holds up to regulators and auditors alike.
          </p>
        </div>
        <div>
          <span className="font-mono text-xs text-brand-red">OUR MISSION</span>
          <h2 className="font-display text-2xl font-bold text-charcoal mt-2 mb-4">
            Safety that's inspected, not assumed
          </h2>
          <p className="text-steel text-sm leading-relaxed">
            Every site we visit gets the same standard: a certified
            inspector, a documented process and a report you can act on.
            We measure our work by how confidently you can hand that
            report to your own stakeholders.
          </p>
        </div>
      </section>

      <Stats />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <span className="font-mono text-xs text-brand-red">WHY CLIENTS CHOOSE US</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {VALUES.map((value) => (
            <ValueCard key={value.title} {...value} />
          ))}
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </main>
  );
}
