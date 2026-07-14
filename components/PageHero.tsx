type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative bg-offwhite border-b-4 border-brand-orange overflow-hidden">
      <div
        className="absolute top-0 right-0 w-14 h-14"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--color-brand-orange) 0 8px, var(--color-charcoal) 8px 16px)",
        }}
      />
      <div className="mx-auto max-w-6xl px-6 py-14">
        <span className="font-mono text-xs tracking-widest text-brand-red">
          {eyebrow}
        </span>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal mt-2 mb-3 leading-tight">
          {title}
        </h1>
        <p className="text-steel text-base leading-relaxed max-w-xl">
          {description}
        </p>
      </div>
    </section>
  );
}
