import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import StatusSelect from "@/components/admin/StatusSelect";
import EmptyState from "@/components/admin/EmptyState";
import { updateQuotationStatus } from "../data-actions";

export default async function QuotationsPage() {
  const supabase = await createClient();
  const { data: quotations } = await supabase
    .from("quotations")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-display text-2xl font-bold text-charcoal">
          Quotations
        </h1>
        <Link
          href="/admin/quotations/new"
          className="bg-brand-red text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-brand-red/90 transition-colors"
        >
          + Quotation Mpya
        </Link>
      </div>
      <p className="text-sm text-steel mb-6">
        Maombi ya bei yaliyotumwa kutoka tovuti.
      </p>

      {!quotations || quotations.length === 0 ? (
        <EmptyState label="quotations" />
      ) : (
        <div className="bg-white border border-border rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-offwhite text-left">
                <th className="px-4 py-3 font-mono text-xs text-steel">
                  Jina / Kampuni
                </th>
                <th className="px-4 py-3 font-mono text-xs text-steel">
                  Mawasiliano
                </th>
                <th className="px-4 py-3 font-mono text-xs text-steel">
                  Huduma
                </th>
                <th className="px-4 py-3 font-mono text-xs text-steel">
                  Tarehe
                </th>
                <th className="px-4 py-3 font-mono text-xs text-steel">
                  Status
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {quotations.map((q) => (
                <tr key={q.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 align-top">
                    <div className="font-semibold text-charcoal">
                      {q.full_name}
                    </div>
                    {q.company && (
                      <div className="text-xs text-steel">{q.company}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-steel">
                    <div>{q.phone}</div>
                    <div>{q.email}</div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="text-charcoal">{q.service}</div>
                    {q.details && (
                      <div className="text-xs text-steel mt-1 max-w-xs">
                        {q.details}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-steel whitespace-nowrap">
                    {new Date(q.created_at).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <StatusSelect
                      id={q.id}
                      status={q.status}
                      options={["new", "contacted", "closed"]}
                      action={updateQuotationStatus}
                    />
                  </td>
                  <td className="px-4 py-3 align-top">
                    <Link
                      href={`/admin/invoices/new?quotation_id=${q.id}`}
                      className="text-xs font-mono text-brand-red whitespace-nowrap"
                    >
                      Generate Invoice &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
