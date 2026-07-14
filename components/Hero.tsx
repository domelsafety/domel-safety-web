import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-offwhite border-b-4 border-brand-orange overflow-hidden">
      <div
        className="absolute top-0 right-0 w-14 h-14"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--color-brand-orange) 0 8px, var(--color-charcoal) 8px 16px)",
        }}
      />
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-xl">
          <span className="font-mono text-xs tracking-widest text-brand-red">
            CERTIFIED · INSPECTED · PROTECTED
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal mt-2 mb-4 leading-tight">
            Safety you can inspect, fumigation you can trust
          </h1>
          <p className="text-steel text-base leading-relaxed mb-8">
            Domel Safety runs inspections, fumigation and safety consultations
            for companies and institutions across Tanzania.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/request-quote"
              className="bg-brand-red text-offwhite text-sm font-medium px-6 py-3 rounded"
            >
              Request a quote
            </Link>
            <Link
              href="/book-fumigation"
              className="border-2 border-charcoal text-charcoal text-sm font-medium px-6 py-3 rounded"
            >
              Book fumigation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
