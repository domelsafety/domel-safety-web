import { notFound } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import PrintButton from "@/components/admin/PrintButton";
import { computeTotals, formatTZS } from "@/lib/invoice-helpers";

export default async function InvoicePrintPage({
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

  const { subtotal, vatAmount, total } = computeTotals(
    invoice.invoice_items ?? [],
    invoice.apply_vat,
    invoice.vat_rate
  );

  return (
    <main className="bg-white min-h-screen p-10 max-w-3xl mx-auto text-charcoal">
      <PrintButton />

      <div className="flex items-center justify-between border-b-4 border-brand-red pb-4 mb-8">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Domel Safety" width={48} height={48} />
          <div>
            <h1 className="font-display text-lg font-bold">
              DOMEL SAFETY COMPANY LIMITED
            </h1>
            <p className="text-xs text-steel italic">
              Firefighting equipment&apos;s supplies, service and maintainers
            </p>
          </div>
        </div>
        <div className="text-right text-xs text-steel">
          <p>P.O. Box 8323, Dar es Salaam</p>
          <p>+255 695 118 422</p>
          <p>domelsafety@gmail.com</p>
          <p>TIN: 186-796-837</p>
        </div>
      </div>

      <div className="flex justify-between mb-8">
        <div>
          <span className="text-xs font-mono text-steel">BILLED TO</span>
          <p className="text-sm font-semibold mt-1">{invoice.client_name}</p>
          {invoice.client_company && (
            <p className="text-sm text-steel">{invoice.client_company}</p>
          )}
          {invoice.client_address && (
            <p className="text-xs text-steel">{invoice.client_address}</p>
          )}
          <p className="text-xs text-steel mt-1">
            {invoice.client_phone} &middot; {invoice.client_email}
          </p>
        </div>
        <div className="text-right">
          <h2 className="font-display text-2xl font-bold text-brand-red">
            INVOICE
          </h2>
          <p className="text-sm font-mono mt-1">{invoice.invoice_number}</p>
          <p className="text-xs text-steel mt-1">
            {new Date(invoice.created_at).toLocaleDateString("en-GB")}
          </p>
          <p
            className={`text-xs font-mono mt-2 inline-block px-2 py-1 rounded ${
              invoice.status === "paid"
                ? "bg-charcoal/10 text-charcoal"
                : "bg-brand-red/10 text-brand-red"
            }`}
          >
            {invoice.status.toUpperCase()}
          </p>
        </div>
      </div>

      <table className="w-full text-sm mb-6">
        <thead>
          <tr className="border-b-2 border-charcoal text-left">
            <th className="py-2 font-mono text-xs">DESCRIPTION</th>
            <th className="py-2 font-mono text-xs text-right">QTY</th>
            <th className="py-2 font-mono text-xs text-right">UNIT PRICE</th>
            <th className="py-2 font-mono text-xs text-right">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {(invoice.invoice_items ?? []).map(
            (item: {
              description: string;
              quantity: number;
              unit_price: number;
            }, i: number) => (
              <tr key={i} className="border-b border-border">
                <td className="py-2">{item.description}</td>
                <td className="py-2 text-right">{item.quantity}</td>
                <td className="py-2 text-right">
                  {formatTZS(item.unit_price)}
                </td>
                <td className="py-2 text-right">
                  {formatTZS(item.quantity * item.unit_price)}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <div className="flex justify-end mb-8">
        <div className="w-64 space-y-1 text-sm">
          <div className="flex justify-between text-steel">
            <span>Subtotal</span>
            <span>{formatTZS(subtotal)}</span>
          </div>
          {invoice.apply_vat && (
            <div className="flex justify-between text-steel">
              <span>VAT ({invoice.vat_rate}%)</span>
              <span>{formatTZS(vatAmount)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-base border-t border-charcoal pt-1">
            <span>TOTAL</span>
            <span>{formatTZS(total)}</span>
          </div>
        </div>
      </div>

      {invoice.notes && (
        <div className="text-xs text-steel border-t border-border pt-4 mb-8 whitespace-pre-line">
          {invoice.notes}
        </div>
      )}

      <p className="text-center text-xs text-steel italic mt-16">
        Your safety is Our Responsibility!
      </p>
    </main>
  );
}
