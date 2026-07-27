import Image from "next/image";

type ClientLogoProps = {
  src: string;
  name: string;
};

export default function ClientLogo({ src, name }: ClientLogoProps) {
  return (
    <div className="bg-white border border-border rounded-md p-4 flex flex-col items-center justify-center gap-2 h-32">
      <div className="relative w-16 h-16">
        <Image src={src} alt={name} fill className="object-contain" />
      </div>
      <span className="text-xs text-steel text-center leading-tight">{name}</span>
    </div>
  );
}
