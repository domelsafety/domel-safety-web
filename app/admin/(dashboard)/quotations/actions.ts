"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createQuotation(formData: FormData) {
  const supabase = await createClient();

  const full_name = formData.get("full_name") as string;
  const company = formData.get("company") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const service = formData.get("service") as string;
  const details = formData.get("details") as string;

  await supabase.from("quotations").insert({
    full_name,
    company,
    email,
    phone,
    service,
    details,
    status: "new",
  });

  revalidatePath("/admin/quotations");
  revalidatePath("/admin");
  redirect("/admin/quotations");
}
