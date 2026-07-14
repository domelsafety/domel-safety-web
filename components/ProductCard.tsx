type ProductCardProps = {
  name: string;
  category: string;
  description: string;
  dot: string;
};

export default function ProductCard({ name, category, description, dot }: ProductCardProps) {
  return (
    <div className="relative bg-white border border-border rounded-md p-5">
      <span className={`absolute top-4 right-4 w-2 h-2 rounded-full ${dot}`} />
      <span className="font-mono text-xs text-steel">{category}</span>
      <h3 className="font-display text-base font-bold text-charcoal mt-1 mb-1">
        {name}
      </h3>
      <p className="text-sm text-steel leading-relaxed">{description}</p>
    </div>
  );
}
