type GalleryTileProps = {
  category: string;
  tint: string;
};

export default function GalleryTile({ category, tint }: GalleryTileProps) {
  return (
    <div
      className={`aspect-square rounded-md border border-border flex items-end p-3 ${tint}`}
    >
      <span className="font-mono text-xs text-charcoal/70">{category}</span>
    </div>
  );
}
