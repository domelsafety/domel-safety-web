const STATS = [
  { value: "500+", label: "sites inspected" },
  { value: "24/7", label: "callout response" },
  { value: "100%", label: "licensed team" },
];

export default function Stats() {
  return (
    <section className="bg-charcoal">
      <div className="mx-auto max-w-6xl px-6 py-6 flex justify-around text-center">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <div className="font-mono text-brand-orange text-xl font-medium">
              {stat.value}
            </div>
            <div className="text-charcoal-light text-xs mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
