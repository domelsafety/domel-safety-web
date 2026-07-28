import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import MarkPaidButton from "@/components/admin/MarkPaidButton";
import { computeTotals, formatTZS } from "@/lib/invoice-helpers";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: invoice } = await supabase
    .from("invoices")
    .select("*, invoice_items(*)")
    .eq("id", id)
    .single();

  if (!invoice) notFound();

  const { data: receipt } = await supabase
    .from("receipts")
    .select("*")
    .eq("invoice_id", id)
    .maybeSingle();

  const { subtotal, vatAmount, total } = computeTotals(
    invoice.invoice_items ?? [],
    invoice.apply_vat,
    invoice.vat_rate
  );

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-display text-2xl font-bold text-charcoal">
          {invoice.invoice_number}
        </h1>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/invoices/${invoice.id}/print`}
            target="_blank"
            className="text-xs font-mono border border-border px-3 py-1.5 rounded"
          >
            Print / PDF
          </Link>
          {invoice.status !== "paid" ? (
            <MarkPaidButton invoiceId={invoice.id} total={total} />
          ) : (
            <span className="text-xs font-mono bg-charcoal/10 text-charcoal px-3 py-1.5 rounded">
              Paid
            </span>
          )}
        </div>
      </div>
      <p className="text-sm text-steel mb-6">
        {new Date(invoice.created_at).toLocaleDateString("en-GB")}
      </p>

      <div className="bg-white border border-border rounded-md p-5 mb-4">
        <h2 className="font-display text-sm font-bold text-charcoal mb-2">
          Mteja
        </h2>
        <p className="text-sm text-charcoal">{invoice.client_name}</p>
        {invoice.client_company && (
          <p className="text-sm text-steel">{invoice.client_company}</p>
        )}
        <p className="text-xs text-steel mt-1">
          {invoice.client_phone} &middot; {invoice.client_email}
        </p>
      </div>

      <div className="bg-white border border-border rounded-md p-5 mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-border">
              <th className="pb-2 font-mono text-xs text-steel">Maelezo</th>
              <th className="pb-2 font-mono text-xs text-steel text-right">
                Idadi
              </th>
              <th className="pb-2 font-mono text-xs text-steel text-right">
                Bei
              </th>
              <th className="pb-2 font-mono text-xs text-steel text-right">
                Jumla
              </th>
            </tr>
          </thead>
          <tbody>
            {(invoice.invoice_items ?? []).map(
              (item: {
                description: string;
                quantity: number;
                unit_price: number;
              }, i: number) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="py-2 text-charcoal">{item.description}</td>
                  <td className="py-2 text-right text-steel">
                    {item.quantity}
                  </td>
                  <td className="py-2 text-right text-steel">
                    {formatTZS(item.unit_price)}
                  </td>
                  <td className="py-2 text-right text-charcoal">
                    {formatTZS(item.quantity * item.unit_price)}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        <div className="mt-4 space-y-1 text-sm border-t border-border pt-3">
          <div className="flex justify-between text-steel">
            <span>Jumla ndogo</span>
            <span>{formatTZS(subtotal)}</span>
          </div>
          {invoice.apply_vat && (
            <div className="flex justify-between text-steel">
              <span>VAT ({invoice.vat_rate}%)</span>
              <span>{formatTZS(vatAmount)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-charcoal text-base">
            <span>Jumla Kuu</span>
            <span>{formatTZS(total)}</span>
          </div>
        </div>
      </div>

      {receipt && (
        <div className="bg-white border border-border rounded-md p-5">
          <h2 className="font-display text-sm font-bold text-charcoal mb-2">
            Receipt
          </h2>
          <p className="text-sm text-steel">
            {receipt.receipt_number} &middot; {formatTZS(receipt.amount_paid)}{" "}
            &middot; {receipt.payment_method}
          </p>
          <Link
            href={`/admin/receipts/${receipt.id}/print`}
            target="_blank"
            className="text-xs font-mono text-brand-red mt-2 inline-block"
          >
            Print Receipt &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
