"use client";

import { useTransition } from "react";

const STATUS_STYLES: Record<string, string> = {
  new: "bg-brand-red/10 text-brand-red",
  contacted: "bg-brand-orange/10 text-brand-orange",
  read: "bg-brand-orange/10 text-brand-orange",
  replied: "bg-charcoal/10 text-charcoal",
  closed: "bg-charcoal/10 text-charcoal",
  confirmed: "bg-charcoal/10 text-charcoal",
};

export default function StatusSelect({
  id,
  status,
  options,
  action,
}: {
  id: string;
  status: string;
  options: string[];
  action: (id: string, status: string) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={pending}
      onChange={(e) =>
        startTransition(() => {
          action(id, e.target.value);
        })
      }
      className={`text-xs font-mono px-2 py-1.5 rounded-md border-0 capitalize cursor-pointer disabled:opacity-50 ${
        STATUS_STYLES[status] ?? "bg-steel/10 text-steel"
      }`}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
