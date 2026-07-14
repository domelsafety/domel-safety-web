import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  return (
    <header className="bg-charcoal">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Domel Safety" width={40} height={40} className="h-10 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-charcoal-light hover:text-offwhite transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/request-quote"
          className="text-sm font-medium bg-brand-red text-offwhite px-4 py-2 rounded"
        >
          Request a quote
        </Link>
      </div>
    </header>
  );
}
