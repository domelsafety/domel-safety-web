"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function nextInvoiceNumber(
  supabase: Awaited<ReturnType<typeof createClient>>
) {
  const year = new Date().getFullYear();
  const { count } = await supabase
    .from("invoices")
    .select("id", { count: "exact", head: true })
    .gte("created_at", `${year}-01-01`);
  const seq = (count ?? 0) + 1;
  return `INV-${year}-${String(seq).padStart(4, "0")}`;
}

async function nextReceiptNumber(
  supabase: Awaited<ReturnType<typeof createClient>>
) {
  const year = new Date().getFullYear();
  const { count } = await supabase
    .from("receipts")
    .select("id", { count: "exact", head: true })
    .gte("created_at", `${year}-01-01`);
  const seq = (count ?? 0) + 1;
  return `RCT-${year}-${String(seq).padStart(4, "0")}`;
}

export async function createInvoice(formData: FormData) {
  const supabase = await createClient();

  const client_name = formData.get("client_name") as string;
  const client_company = formData.get("client_company") as string;
  const client_email = formData.get("client_email") as string;
  const client_phone = formData.get("client_phone") as string;
  const client_address = formData.get("client_address") as string;
  const apply_vat = formData.get("apply_vat") === "on";
  const notes = formData.get("notes") as string;
  const quotation_id = (formData.get("quotation_id") as string) || null;
  const itemsRaw = formData.get("items") as string;
  const items = JSON.parse(itemsRaw) as {
    description: string;
    quantity: number;
    unit_price: number;
  }[];

  const invoice_number = await nextInvoiceNumber(supabase);

  const { data: invoice, error } = await supabase
    .from("invoices")
    .insert({
      invoice_number,
      quotation_id,
      client_name,
      client_company,
      client_email,
      client_phone,
      client_address,
      apply_vat,
      vat_rate: 18,
      notes,
      status: "unpaid",
    })
    .select()
    .single();

  if (error || !invoice) {
    return { error: error?.message ?? "Imeshindwa kuunda invoice." };
  }

  const rows = items
    .filter((i) => i.description)
    .map((item, idx) => ({
      invoice_id: invoice.id,
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unit_price,
      sort_order: idx,
    }));

  if (rows.length > 0) {
    await supabase.from("invoice_items").insert(rows);
  }

  if (quotation_id) {
    await supabase
      .from("quotations")
      .update({ status: "contacted" })
      .eq("id", quotation_id);
  }

  revalidatePath("/admin/invoices");
  redirect(`/admin/invoices/${invoice.id}`);
}

export async function markInvoicePaid(
  invoiceId: string,
  amountPaid: number,
  paymentMethod: string
) {
  const supabase = await createClient();

  const receipt_number = await nextReceiptNumber(supabase);

  await supabase.from("receipts").insert({
    receipt_number,
    invoice_id: invoiceId,
    amount_paid: amountPaid,
    payment_method: paymentMethod,
  });

  await supabase
    .from("invoices")
    .update({ status: "paid" })
    .eq("id", invoiceId);

  revalidatePath("/admin/invoices");
  revalidatePath(`/admin/invoices/${invoiceId}`);
  revalidatePath("/admin/receipts");
}
