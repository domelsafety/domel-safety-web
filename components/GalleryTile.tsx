import Image from "next/image";

type GalleryTileProps = {
  src: string;
  title: string;
  location: string;
};

export default function GalleryTile({ src, title, location }: GalleryTileProps) {
  return (
    <div className="group relative aspect-square overflow-hidden rounded-md border border-border">
      <Image
        src={src}
        alt={title}
        fill
        sizes="(min-width: 768px) 33vw, 50vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 pt-10">
        <p className="text-sm font-semibold text-offwhite leading-tight">{title}</p>
        <p className="text-xs font-mono text-brand-orange mt-0.5">{location}</p>
      </div>
    </div>
  );
}
