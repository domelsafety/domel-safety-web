const SERVICES = [
  {
    title: "Inspections",
    description: "Site and equipment safety checks with a certified report.",
    dot: "bg-brand-red",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Fumigation",
    description: "Pest control for offices, warehouses and institutions.",
    dot: "bg-brand-orange",
    icon: "M5 13l4 4L19 7",
  },
  {
    title: "Consultation",
    description: "Safety audits and compliance guidance for your team.",
    dot: "bg-charcoal",
    icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export default function Services() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <span className="font-mono text-xs text-brand-red">OUR SERVICES</span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {SERVICES.map((service) => (
          <div
            key={service.title}
            className="relative bg-white border border-border rounded-md p-5"
          >
            <span
              className={`absolute top-4 right-4 w-2 h-2 rounded-full ${service.dot}`}
            />
            <svg
              className="w-6 h-6 text-charcoal"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={service.icon}
              />
            </svg>
            <h3 className="font-display text-base font-bold text-charcoal mt-3 mb-1">
              {service.title}
            </h3>
            <p className="text-sm text-steel leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
