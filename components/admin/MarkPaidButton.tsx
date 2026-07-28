"use client";

import { useState, useTransition } from "react";
import { markInvoicePaid } from "@/app/admin/(dashboard)/invoices/actions";

export default function MarkPaidButton({
  invoiceId,
  total,
}: {
  invoiceId: string;
  total: number;
}) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(total);
  const [method, setMethod] = useState("Cash");
  const [pending, startTransition] = useTransition();

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-xs font-mono bg-charcoal text-white px-3 py-1.5 rounded"
      >
        Weka Paid
      </button>
    );
  }

  return (
    <div className="bg-white border border-border rounded-md p-3 space-y-2 w-56">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full border border-border rounded px-2 py-1.5 text-sm"
      />
      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className="w-full border border-border rounded px-2 py-1.5 text-sm"
      >
        <option>Cash</option>
        <option>Bank Transfer</option>
        <option>Mobile Money</option>
        <option>Cheque</option>
      </select>
      <div className="flex gap-2">
        <button
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await markInvoicePaid(invoiceId, amount, method);
              setOpen(false);
            })
          }
          className="flex-1 text-xs font-mono bg-brand-red text-white px-3 py-1.5 rounded disabled:opacity-60"
        >
          {pending ? "..." : "Thibitisha"}
        </button>
        <button
          onClick={() => setOpen(false)}
          className="text-xs font-mono border border-border px-3 py-1.5 rounded"
        >
          Ghairi
        </button>
      </div>
    </div>
  );
}
