"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateQuotationStatus(id: string, status: string) {
  const supabase = await createClient();
  await supabase.from("quotations").update({ status }).eq("id", id);
  revalidatePath("/admin/quotations");
  revalidatePath("/admin");
}

export async function updateBookingStatus(id: string, status: string) {
  const supabase = await createClient();
  await supabase.from("bookings").update({ status }).eq("id", id);
  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
}

export async function updateMessageStatus(id: string, status: string) {
  const supabase = await createClient();
  await supabase.from("contact_messages").update({ status }).eq("id", id);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}
