type Accent = "red" | "orange" | "charcoal";

type ValueCardProps = {
  title: string;
  description: string;
  accent: Accent;
  icon: string;
};

const ACCENT_BG: Record<Accent, string> = {
  red: "bg-brand-red/10 text-brand-red",
  orange: "bg-brand-orange/10 text-brand-orange",
  charcoal: "bg-charcoal/10 text-charcoal",
};

export default function ValueCard({ title, description, accent, icon }: ValueCardProps) {
  return (
    <div className="bg-white border border-border rounded-md p-5 transition-all hover:border-charcoal hover:shadow-sm">
      <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-3 ${ACCENT_BG[accent]}`}>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
      </div>
      <h3 className="font-display text-base font-bold text-charcoal mb-1">
        {title}
      </h3>
      <p className="text-sm text-steel leading-relaxed">{description}</p>
    </div>
  );
}
