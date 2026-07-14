import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-charcoal">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row justify-between gap-6">
        <Image src="/logo.png" alt="Domel Safety" width={40} height={40} className="h-10 w-auto" />
        <div className="text-charcoal-light text-sm">
          <p>Dar es Salaam, Tanzania</p>
          <p className="mt-1">© {new Date().getFullYear()} Domel Safety Company Limited</p>
        </div>
      </div>
    </footer>
  );
}
