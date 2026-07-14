import ValueCard from "./ValueCard";

const SERVICES = [
  {
    title: "Inspections",
    description: "Site and equipment safety checks with a certified report.",
    accent: "red" as const,
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Fumigation",
    description: "Pest control for offices, warehouses and institutions.",
    accent: "orange" as const,
    icon: "M5 13l4 4L19 7",
  },
  {
    title: "Consultation",
    description: "Safety audits and compliance guidance for your team.",
    accent: "charcoal" as const,
    icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export default function Services() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <span className="font-mono text-xs text-brand-red">OUR SERVICES</span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {SERVICES.map((service) => (
          <ValueCard key={service.title} {...service} />
        ))}
      </div>
    </section>
  );
}
