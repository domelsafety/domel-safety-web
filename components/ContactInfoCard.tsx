import Link from "next/link";
import type { ReactNode } from "react";

type ContactInfoCardProps = {
  label: string;
  value: string;
  icon: ReactNode;
  href?: string;
  accent?: "red" | "orange" | "charcoal";
};

const ACCENT_BG: Record<NonNullable<ContactInfoCardProps["accent"]>, string> = {
  red: "bg-brand-red/10 text-brand-red",
  orange: "bg-brand-orange/10 text-brand-orange",
  charcoal: "bg-charcoal/10 text-charcoal",
};

export default function ContactInfoCard({
  label,
  value,
  icon,
  href,
  accent = "red",
}: ContactInfoCardProps) {
  const content = (
    <div className="flex items-center gap-4 bg-white border border-border rounded-md p-4 transition-all hover:border-charcoal hover:shadow-sm">
      <div className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center ${ACCENT_BG[accent]}`}>
        {icon}
      </div>
      <div>
        <div className="text-xs text-steel">{label}</div>
        <div className="text-sm font-medium text-charcoal">{value}</div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {content}
      </Link>
    );
  }

  return content;
}
