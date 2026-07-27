type ComplianceBadgeProps = {
  title: string;
  issuer: string;
  reference: string;
  validity?: string;
};

export default function ComplianceBadge({
  title,
  issuer,
  reference,
  validity,
}: ComplianceBadgeProps) {
  return (
    <div className="bg-white border border-border rounded-md p-5 flex gap-4 items-start">
      <div className="w-10 h-10 shrink-0 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center">
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div>
        <h3 className="font-display text-sm font-bold text-charcoal leading-tight">
          {title}
        </h3>
        <p className="text-xs text-steel mt-1">{issuer}</p>
        <p className="text-xs font-mono text-brand-orange mt-1">{reference}</p>
        {validity && (
          <p className="text-xs text-steel mt-0.5">{validity}</p>
        )}
      </div>
    </div>
  );
}
