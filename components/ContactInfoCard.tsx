type ContactInfoCardProps = {
  label: string;
  value: string;
  icon: string;
};

export default function ContactInfoCard({ label, value, icon }: ContactInfoCardProps) {
  return (
    <div className="flex items-start gap-3 bg-white border border-border rounded-md p-4">
      <svg
        className="w-5 h-5 mt-0.5 shrink-0 text-brand-red"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
      <div>
        <div className="text-xs text-steel">{label}</div>
        <div className="text-sm font-medium text-charcoal">{value}</div>
      </div>
    </div>
  );
}
