import { createClient } from "@/lib/supabase/server";
import InvoiceForm from "@/components/admin/InvoiceForm";

export default async function NewInvoicePage({
  searchParams,
}: {
  searchParams: Promise<{ quotation_id?: string }>;
}) {
  const { quotation_id } = await searchParams;

  let defaults;
  if (quotation_id) {
    const supabase = await createClient();
    const { data: q } = await supabase
      .from("quotations")
      .select("*")
      .eq("id", quotation_id)
      .single();

    if (q) {
      defaults = {
        client_name: q.full_name,
        client_company: q.company ?? "",
        client_email: q.email,
        client_phone: q.phone,
        notes: `Huduma: ${q.service}${q.details ? `\n${q.details}` : ""}`,
      };
    }
  }

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-bold text-charcoal mb-1">
        Invoice Mpya
      </h1>
      <p className="text-sm text-steel mb-6">
        {quotation_id
          ? "Fomu imejazwa kwa taarifa kutoka kwenye Quotation."
          : "Jaza taarifa za mteja na vitu vya invoice."}
      </p>
      <InvoiceForm quotationId={quotation_id} defaults={defaults} />
    </div>
  );
}
