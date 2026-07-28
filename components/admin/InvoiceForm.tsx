"use client";

import { useState, useTransition } from "react";
import { createInvoice } from "@/app/admin/(dashboard)/invoices/actions";
import { computeTotals, formatTZS } from "@/lib/invoice-helpers";

type Item = { description: string; quantity: number; unit_price: number };

export default function InvoiceForm({
  quotationId,
  defaults,
}: {
  quotationId?: string;
  defaults?: {
    client_name?: string;
    client_company?: string;
    client_email?: string;
    client_phone?: string;
    notes?: string;
  };
}) {
  const [items, setItems] = useState<Item[]>([
    { description: "", quantity: 1, unit_price: 0 },
  ]);
  const [applyVat, setApplyVat] = useState(true);
  const [pending, startTransition] = useTransition();

  const { subtotal, vatAmount, total } = computeTotals(items, applyVat, 18);

  function updateItem(index: number, field: keyof Item, value: string) {
    setItems((prev) =>
      prev.map((it, i) =>
        i === index
          ? {
              ...it,
              [field]:
                field === "description" ? value : Number(value) || 0,
            }
          : it
      )
    );
  }

  function addItem() {
    setItems((prev) => [...prev, { description: "", quantity: 1, unit_price: 0 }]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(formData: FormData) {
    formData.set("items", JSON.stringify(items));
    formData.set("apply_vat", applyVat ? "on" : "off");
    if (quotationId) formData.set("quotation_id", quotationId);
    startTransition(() => {
      createInvoice(formData);
    });
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="bg-white border border-border rounded-md p-5">
        <h2 className="font-display text-sm font-bold text-charcoal mb-4">
          Taarifa za Mteja
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-steel mb-1.5">
              JINA *
            </label>
            <input
              name="client_name"
              required
              defaultValue={defaults?.client_name}
              className="w-full border border-border rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-steel mb-1.5">
              KAMPUNI
            </label>
            <input
              name="client_company"
              defaultValue={defaults?.client_company}
              className="w-full border border-border rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-steel mb-1.5">
              EMAIL
            </label>
            <input
              name="client_email"
              type="email"
              defaultValue={defaults?.client_email}
              className="w-full border border-border rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-steel mb-1.5">
              SIMU
            </label>
            <input
              name="client_phone"
              defaultValue={defaults?.client_phone}
              className="w-full border border-border rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-steel mb-1.5">
              ANUANI
            </label>
            <input
              name="client_address"
              className="w-full border border-border rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-border rounded-md p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-sm font-bold text-charcoal">
            Vitu / Huduma
          </h2>
          <button
            type="button"
            onClick={addItem}
            className="text-xs font-mono text-brand-red border border-brand-red rounded px-3 py-1.5"
          >
            + Ongeza kitu
          </button>
        </div>

        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-center">
              <input
                placeholder="Maelezo"
                value={item.description}
                onChange={(e) => updateItem(i, "description", e.target.value)}
                className="col-span-6 border border-border rounded-md px-2 py-2 text-sm"
              />
              <input
                type="number"
                min={0}
                placeholder="Idadi"
                value={item.quantity}
                onChange={(e) => updateItem(i, "quantity", e.target.value)}
                className="col-span-2 border border-border rounded-md px-2 py-2 text-sm"
              />
              <input
                type="number"
                min={0}
                placeholder="Bei (TZS)"
                value={item.unit_price}
                onChange={(e) => updateItem(i, "unit_price", e.target.value)}
                className="col-span-3 border border-border rounded-md px-2 py-2 text-sm"
              />
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="col-span-1 text-brand-red text-xs"
              >
                Futa
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="vat"
            checked={applyVat}
            onChange={(e) => setApplyVat(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="vat" className="text-sm text-charcoal">
            Weka VAT (18%)
          </label>
        </div>

        <div className="mt-4 border-t border-border pt-4 space-y-1 text-sm">
          <div className="flex justify-between text-steel">
            <span>Jumla ndogo</span>
            <span>{formatTZS(subtotal)}</span>
          </div>
          {applyVat && (
            <div className="flex justify-between text-steel">
              <span>VAT (18%)</span>
              <span>{formatTZS(vatAmount)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-charcoal text-base pt-1">
            <span>Jumla Kuu</span>
            <span>{formatTZS(total)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-border rounded-md p-5">
        <label className="block text-xs font-mono text-steel mb-1.5">
          MAELEZO YA ZIADA (yataonekana kwenye Invoice)
        </label>
        <textarea
          name="notes"
          rows={3}
          defaultValue={defaults?.notes}
          className="w-full border border-border rounded-md px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-brand-red text-white text-sm font-semibold px-6 py-3 rounded-md hover:bg-brand-red/90 transition-colors disabled:opacity-60"
      >
        {pending ? "Inaunda..." : "Unda Invoice"}
      </button>
    </form>
  );
}
