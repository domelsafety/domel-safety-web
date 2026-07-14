type GalleryTileProps = {
  category: "Inspections" | "Fumigation" | "Consultation";
  tint: string;
};

function InspectionArt() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <rect x="30" y="20" width="60" height="80" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <line x1="42" y1="38" x2="78" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="42" y1="50" x2="78" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="42" y1="62" x2="65" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="82" cy="82" r="20" fill="var(--color-brand-red)" />
      <path d="M73 82l6 6 12-13" stroke="var(--color-offwhite)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FumigationArt() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <path d="M25 95 L45 45 L75 45 L95 95 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="60" y1="45" x2="60" y2="30" stroke="currentColor" strokeWidth="2.5" />
      <path d="M50 30 L60 18 L70 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="60" cy="80" r="18" fill="var(--color-brand-orange)" />
      <path d="M52 72 L68 88 M68 72 L52 88" stroke="var(--color-offwhite)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function ConsultationArt() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <circle cx="42" cy="50" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M20 92c2-16 14-24 22-24s20 8 22 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="82" cy="46" r="12" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M64 90c2-13 11-20 18-20s16 7 18 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="46" y="24" width="20" height="16" rx="2" fill="var(--color-charcoal)" />
      <line x1="50" y1="29" x2="62" y2="29" stroke="var(--color-offwhite)" strokeWidth="1.5" />
      <line x1="50" y1="33" x2="58" y2="33" stroke="var(--color-offwhite)" strokeWidth="1.5" />
    </svg>
  );
}

const ART: Record<GalleryTileProps["category"], () => React.ReactElement> = {
  Inspections: InspectionArt,
  Fumigation: FumigationArt,
  Consultation: ConsultationArt,
};

export default function GalleryTile({ category, tint }: GalleryTileProps) {
  const Art = ART[category];
  return (
    <div
      className={`aspect-square rounded-md border border-border flex flex-col justify-between p-4 text-charcoal ${tint}`}
    >
      <div className="flex-1 flex items-center justify-center">
        <div className="w-2/3 h-2/3">
          <Art />
        </div>
      </div>
      <span className="font-mono text-xs text-charcoal/70">{category}</span>
    </div>
  );
}
