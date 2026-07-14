import Link from "next/link";

type ServiceDetailProps = {
  index: string;
  title: string;
  description: string;
  items: string[];
  dot: string;
  reversed?: boolean;
  ctaLabel: string;
  ctaHref: string;
};

export default function ServiceDetail({
  index,
  title,
  description,
  items,
  dot,
  reversed = false,
  ctaLabel,
  ctaHref,
}: ServiceDetailProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12 border-b border-border ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div>
        <span className="font-mono text-xs text-steel">{index}</span>
        <div className="flex items-center gap-2 mt-1 mb-3">
          <span className={`w-2 h-2 rounded-full ${dot}`} />
          <h2 className="font-display text-2xl font-bold text-charcoal">
            {title}
          </h2>
        </div>
        <p className="text-steel text-sm leading-relaxed mb-5">
          {description}
        </p>
        <Link
          href={ctaHref}
          className="inline-block bg-charcoal text-offwhite text-sm font-medium px-5 py-2.5 rounded"
        >
          {ctaLabel}
        </Link>
      </div>
      <div className="bg-white border border-border rounded-md p-5">
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-charcoal">
              <svg
                className="w-4 h-4 mt-0.5 shrink-0 text-brand-red"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
