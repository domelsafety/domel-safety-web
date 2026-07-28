import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import EmptyState from "@/components/admin/EmptyState";
import MarkPaidButton from "@/components/admin/MarkPaidButton";
import { computeTotals, formatTZS } from "@/lib/invoice-helpers";

export default async function InvoicesPage() {
  const supabase = await createClient();
  const { data: invoices } = await supabase
    .from("invoices")
    .select("*, invoice_items(*)")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-display text-2xl font-bold text-charcoal">
          Invoices
        </h1>
        <Link
          href="/admin/invoices/new"
          className="bg-brand-red text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-brand-red/90 transition-colors"
        >
          + Invoice Mpya
        </Link>
      </div>
      <p className="text-sm text-steel mb-6">
        Invoices zote zilizoundwa, na hali ya malipo.
      </p>

      {!invoices || invoices.length === 0 ? (
        <EmptyState label="invoices" />
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
                  Jumla
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
              {invoices.map((inv) => {
                const { total } = computeTotals(
                  inv.invoice_items ?? [],
                  inv.apply_vat,
                  inv.vat_rate
                );
                return (
                  <tr key={inv.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-mono text-xs text-charcoal">
                      <Link
                        href={`/admin/invoices/${inv.id}`}
                        className="hover:text-brand-red"
                      >
                        {inv.invoice_number}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-charcoal">
                        {inv.client_name}
                      </div>
                      {inv.client_company && (
                        <div className="text-xs text-steel">
                          {inv.client_company}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-charcoal">
                      {formatTZS(total)}
                    </td>
                    <td className="px-4 py-3 text-xs text-steel whitespace-nowrap">
                      {new Date(inv.created_at).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-mono px-2 py-1 rounded capitalize ${
                          inv.status === "paid"
                            ? "bg-charcoal/10 text-charcoal"
                            : "bg-brand-red/10 text-brand-red"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {inv.status !== "paid" && (
                        <MarkPaidButton invoiceId={inv.id} total={total} />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
