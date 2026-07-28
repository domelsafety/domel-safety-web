import { createClient } from "@/lib/supabase/server";
import StatusSelect from "@/components/admin/StatusSelect";
import EmptyState from "@/components/admin/EmptyState";
import { updateBookingStatus } from "../data-actions";

export default async function BookingsPage() {
  const supabase = await createClient();
  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-bold text-charcoal mb-1">
        Bookings
      </h1>
      <p className="text-sm text-steel mb-6">
        Maombi ya kufunga miadi (fumigation/inspection) kutoka tovuti.
      </p>

      {!bookings || bookings.length === 0 ? (
        <EmptyState label="bookings" />
      ) : (
        <div className="bg-white border border-border rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-offwhite text-left">
                <th className="px-4 py-3 font-mono text-xs text-steel">
                  Jina / Kampuni
                </th>
                <th className="px-4 py-3 font-mono text-xs text-steel">
                  Mawasiliano
                </th>
                <th className="px-4 py-3 font-mono text-xs text-steel">
                  Aina ya Mali
                </th>
                <th className="px-4 py-3 font-mono text-xs text-steel">
                  Tarehe Aliyopendekeza
                </th>
                <th className="px-4 py-3 font-mono text-xs text-steel">
                  Anuani
                </th>
                <th className="px-4 py-3 font-mono text-xs text-steel">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 align-top">
                    <div className="font-semibold text-charcoal">
                      {b.full_name}
                    </div>
                    {b.company && (
                      <div className="text-xs text-steel">{b.company}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-steel">
                    <div>{b.phone}</div>
                    <div>{b.email}</div>
                  </td>
                  <td className="px-4 py-3 align-top text-charcoal">
                    {b.property_type}
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-steel whitespace-nowrap">
                    {new Date(b.preferred_date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-steel max-w-[200px]">
                    {b.address}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <StatusSelect
                      id={b.id}
                      status={b.status}
                      options={["new", "confirmed", "closed"]}
                      action={updateBookingStatus}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
