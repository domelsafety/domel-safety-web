import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import EmptyState from "@/components/admin/EmptyState";
import { formatTZS } from "@/lib/invoice-helpers";

export default async function ReceiptsPage() {
  const supabase = await createClient();
  const { data: receipts } = await supabase
    .from("receipts")
    .select("*, invoices(invoice_number, client_name, client_company)")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-bold text-charcoal mb-1">
        Receipts
      </h1>
      <p className="text-sm text-steel mb-6">
        Risiti zinazotengenezwa kiotomatiki Invoice ikiwekwa &quot;Paid&quot;.
      </p>

      {!receipts || receipts.length === 0 ? (
        <EmptyState label="receipts" />
      ) : (
        <div className="bg-white border border-border rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-offwhite text-left">
                <th className="px-4 py-3 font-mono text-xs text-steel">No.</th>
                <th className="px-4 py-3 font-mono text-xs text-steel">
                  Mteja
                </th>
                <th className="px-4 py-3 font-mono text-xs text-steel">
                  Invoice
                </th>
                <th className="px-4 py-3 font-mono text-xs text-steel">
                  Kiasi
                </th>
                <th className="px-4 py-3 font-mono text-xs text-steel">
                  Tarehe
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {receipts.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-mono text-xs text-charcoal">
                    {r.receipt_number}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-charcoal">
                      {r.invoices?.client_name}
                    </div>
                    {r.invoices?.client_company && (
                      <div className="text-xs text-steel">
                        {r.invoices.client_company}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-steel">
                    {r.invoices?.invoice_number}
                  </td>
                  <td className="px-4 py-3 text-charcoal">
                    {formatTZS(r.amount_paid)}
                  </td>
                  <td className="px-4 py-3 text-xs text-steel whitespace-nowrap">
                    {new Date(r.created_at).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/receipts/${r.id}/print`}
                      target="_blank"
                      className="text-xs font-mono text-brand-red"
                    >
                      Print &rarr;
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
