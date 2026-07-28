import { notFound } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import PrintButton from "@/components/admin/PrintButton";
import { computeTotals, formatTZS } from "@/lib/invoice-helpers";

export default async function ReceiptPrintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: receipt } = await supabase
    .from("receipts")
    .select("*, invoices(*, invoice_items(*))")
    .eq("id", id)
    .single();

  if (!receipt) notFound();

  const invoice = receipt.invoices;
  const { total } = computeTotals(
    invoice?.invoice_items ?? [],
    invoice?.apply_vat ?? false,
    invoice?.vat_rate ?? 18
  );

  return (
    <main className="bg-white min-h-screen p-10 max-w-2xl mx-auto text-charcoal">
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
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="font-display text-2xl font-bold text-brand-red">
          PAYMENT RECEIPT
        </h2>
        <p className="text-sm font-mono mt-1">{receipt.receipt_number}</p>
        <p className="text-xs text-steel mt-1">
          {new Date(receipt.created_at).toLocaleDateString("en-GB")}
        </p>
      </div>

      <div className="border border-border rounded-md p-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-steel">Received from</span>
          <span className="font-semibold">
            {invoice?.client_name}
            {invoice?.client_company ? ` (${invoice.client_company})` : ""}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-steel">For invoice</span>
          <span className="font-mono">{invoice?.invoice_number}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-steel">Payment method</span>
          <span>{receipt.payment_method}</span>
        </div>
        <div className="flex justify-between text-base font-bold border-t border-border pt-3">
          <span>Amount paid</span>
          <span>{formatTZS(receipt.amount_paid)}</span>
        </div>
        {invoice && receipt.amount_paid < total && (
          <div className="flex justify-between text-xs text-brand-red">
            <span>Balance remaining</span>
            <span>{formatTZS(total - receipt.amount_paid)}</span>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-steel italic mt-16">
        Your safety is Our Responsibility!
      </p>
    </main>
  );
}
