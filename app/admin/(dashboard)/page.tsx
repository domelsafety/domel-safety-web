import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

async function getCounts() {
  const supabase = await createClient();

  const [quotations, bookings, messages] = await Promise.all([
    supabase.from("quotations").select("id", { count: "exact", head: true }),
    supabase.from("bookings").select("id", { count: "exact", head: true }),
    supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true }),
  ]);

  return {
    quotations: quotations.count ?? 0,
    bookings: bookings.count ?? 0,
    messages: messages.count ?? 0,
  };
}

export default async function AdminOverviewPage() {
  const counts = await getCounts();

  const CARDS = [
    {
      label: "Quotations",
      value: counts.quotations,
      href: "/admin/quotations",
      accent: "bg-brand-red",
    },
    {
      label: "Bookings",
      value: counts.bookings,
      href: "/admin/bookings",
      accent: "bg-brand-orange",
    },
    {
      label: "Messages",
      value: counts.messages,
      href: "/admin/messages",
      accent: "bg-charcoal",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-bold text-charcoal mb-1">
        Muhtasari
      </h1>
      <p className="text-sm text-steel mb-8">
        Karibu kwenye Dashboard ya Domel Safety.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CARDS.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white border border-border rounded-md p-5 hover:shadow-sm hover:border-charcoal transition-all"
          >
            <div className={`w-8 h-1.5 rounded-full mb-3 ${card.accent}`} />
            <div className="font-display text-3xl font-bold text-charcoal">
              {card.value}
            </div>
            <div className="text-sm text-steel mt-1">{card.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
