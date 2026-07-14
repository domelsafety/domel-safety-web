type Accent = "red" | "orange" | "charcoal";

type ProductCardProps = {
  name: string;
  category: string;
  description: string;
  accent: Accent;
};

const ACCENT_BORDER: Record<Accent, string> = {
  red: "border-l-brand-red",
  orange: "border-l-brand-orange",
  charcoal: "border-l-charcoal",
};

export default function ProductCard({ name, category, description, accent }: ProductCardProps) {
  return (
    <div
      className={`bg-white border border-border ${ACCENT_BORDER[accent]} border-l-4 rounded-md p-5 transition-all hover:border-charcoal hover:shadow-sm`}
    >
      <span className="font-mono text-xs text-steel">{category}</span>
      <h3 className="font-display text-base font-bold text-charcoal mt-1 mb-1">
        {name}
      </h3>
      <p className="text-sm text-steel leading-relaxed">{description}</p>
    </div>
  );
}
