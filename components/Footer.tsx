import Image from "next/image";
import Link from "next/link";
import { PhoneIcon, EmailIcon, WhatsAppIcon } from "@/components/icons/ContactIcons";

const LINKS = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal">
      <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <Image src="/logo.png" alt="Domel Safety" width={40} height={40} className="h-10 w-auto mb-3" />
          <p className="text-charcoal-light text-sm leading-relaxed max-w-xs">
            Inspections, fumigation and safety consultation for companies and
            institutions across Tanzania.
          </p>
        </div>

        <div>
          <span className="font-mono text-xs text-brand-orange">QUICK LINKS</span>
          <ul className="mt-3 space-y-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-charcoal-light hover:text-offwhite transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="font-mono text-xs text-brand-orange">GET IN TOUCH</span>
          <ul className="mt-3 space-y-2.5">
            <li className="flex items-center gap-2 text-sm text-charcoal-light">
              <span className="text-brand-red"><PhoneIcon /></span>
              +255 695 118 422
            </li>
            <li className="flex items-center gap-2 text-sm text-charcoal-light">
              <span className="text-brand-orange"><WhatsAppIcon /></span>
              <a href="https://wa.me/255695118422" target="_blank" rel="noopener noreferrer" className="hover:text-offwhite transition-colors">
                Chat on WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-2 text-sm text-charcoal-light">
              <span className="text-brand-red"><EmailIcon /></span>
              info@domelsafety.co.tz
            </li>
            <li className="text-sm text-charcoal-light pl-7">
              P.O. Box 8323, Dar es Salaam
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-4 text-xs text-charcoal-light">
          © {new Date().getFullYear()} Domel Safety Company Limited
        </div>
      </div>
    </footer>
  );
}
