type ValueCardProps = {
  title: string;
  description: string;
  dot: string;
  icon: string;
};

export default function ValueCard({ title, description, dot, icon }: ValueCardProps) {
  return (
    <div className="relative bg-white border border-border rounded-md p-5">
      <span className={`absolute top-4 right-4 w-2 h-2 rounded-full ${dot}`} />
      <svg
        className="w-6 h-6 text-charcoal"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
      <h3 className="font-display text-base font-bold text-charcoal mt-3 mb-1">
        {title}
      </h3>
      <p className="text-sm text-steel leading-relaxed">{description}</p>
    </div>
  );
}
