"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addGalleryItem(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const location = formData.get("location") as string;
  const file = formData.get("image") as File;

  if (!file || file.size === 0) {
    return { error: "Chagua picha kwanza." };
  }

  const ext = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("gallery-images")
    .upload(path, file);

  if (uploadError) {
    return { error: uploadError.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("gallery-images").getPublicUrl(path);

  const { error: insertError } = await supabase.from("gallery_items").insert({
    title,
    location,
    image_url: publicUrl,
  });

  if (insertError) {
    return { error: insertError.message };
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { error: null };
}

export async function deleteGalleryItem(id: string, imageUrl: string) {
  const supabase = await createClient();

  const fileName = imageUrl.split("/gallery-images/")[1];
  if (fileName) {
    await supabase.storage.from("gallery-images").remove([fileName]);
  }

  await supabase.from("gallery_items").delete().eq("id", id);

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}
