import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AdminSidebarNav from "@/components/admin/AdminSidebarNav";
import { signOut } from "../actions";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-offwhite flex">
      <aside className="w-60 shrink-0 bg-charcoal min-h-screen flex flex-col">
        <div className="p-5 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Domel Safety"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-offwhite text-sm font-display font-bold">
              Admin
            </span>
          </Link>
        </div>
        <div className="p-3 flex-1">
          <AdminSidebarNav />
        </div>
        <div className="p-3 border-t border-white/10">
          <p className="text-xs text-charcoal-light px-3 truncate mb-2">
            {user?.email}
          </p>
          <form action={signOut}>
            <button
              type="submit"
              className="w-full text-left text-sm text-charcoal-light hover:text-offwhite px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
            >
              Toka (Sign out)
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
