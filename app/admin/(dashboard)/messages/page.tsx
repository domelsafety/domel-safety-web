import { createClient } from "@/lib/supabase/server";
import StatusSelect from "@/components/admin/StatusSelect";
import EmptyState from "@/components/admin/EmptyState";
import { updateMessageStatus } from "../data-actions";

export default async function MessagesPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-bold text-charcoal mb-1">
        Messages
      </h1>
      <p className="text-sm text-steel mb-6">
        Ujumbe uliotumwa kupitia fomu ya Contact.
      </p>

      {!messages || messages.length === 0 ? (
        <EmptyState label="messages" />
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className="bg-white border border-border rounded-md p-4"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <div className="font-semibold text-charcoal text-sm">
                    {m.subject}
                  </div>
                  <div className="text-xs text-steel mt-0.5">
                    {m.full_name} &middot; {m.email}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-steel whitespace-nowrap">
                    {new Date(m.created_at).toLocaleDateString("en-GB")}
                  </span>
                  <StatusSelect
                    id={m.id}
                    status={m.status}
                    options={["new", "read", "replied"]}
                    action={updateMessageStatus}
                  />
                </div>
              </div>
              <p className="text-sm text-steel leading-relaxed">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
