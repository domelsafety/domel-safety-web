"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Overview", href: "/admin" },
  { label: "Quotations", href: "/admin/quotations" },
  { label: "Bookings", href: "/admin/bookings" },
  { label: "Messages", href: "/admin/messages" },
  { label: "Invoices", href: "/admin/invoices" },
  { label: "Gallery", href: "/admin/gallery" },
  { label: "Blog", href: "/admin/blog" },
];

export default function AdminSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {NAV.map((item) => {
        const active =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block text-sm px-3 py-2 rounded-md transition-colors ${
              active
                ? "bg-brand-red text-white font-semibold"
                : "text-charcoal-light hover:bg-white/10"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
