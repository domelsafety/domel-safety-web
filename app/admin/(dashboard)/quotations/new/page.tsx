import { createQuotation } from "../actions";

export default function NewQuotationPage() {
  return (
    <div className="p-8 max-w-xl">
      <h1 className="font-display text-2xl font-bold text-charcoal mb-1">
        Quotation Mpya
      </h1>
      <p className="text-sm text-steel mb-6">
        Jaza taarifa za mteja kutengeneza quotation moja kwa moja.
      </p>

      <form action={createQuotation} className="bg-white border border-border rounded-md p-5 space-y-4">
        <div>
          <label className="block text-xs font-mono text-steel mb-1.5">JINA *</label>
          <input name="full_name" required className="w-full border border-border rounded-md px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-mono text-steel mb-1.5">KAMPUNI</label>
          <input name="company" className="w-full border border-border rounded-md px-3 py-2 text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-steel mb-1.5">EMAIL *</label>
            <input name="email" type="email" required className="w-full border border-border rounded-md px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-mono text-steel mb-1.5">SIMU *</label>
            <input name="phone" required className="w-full border border-border rounded-md px-3 py-2 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-mono text-steel mb-1.5">HUDUMA *</label>
          <input name="service" required placeholder="Fire Extinguisher Supply" className="w-full border border-border rounded-md px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-mono text-steel mb-1.5">MAELEZO</label>
          <textarea name="details" rows={3} className="w-full border border-border rounded-md px-3 py-2 text-sm" />
        </div>
        <button
          type="submit"
          className="bg-brand-red text-white text-sm font-semibold px-6 py-2.5 rounded-md hover:bg-brand-red/90 transition-colors"
        >
          Hifadhi Quotation
        </button>
      </form>
    </div>
  );
}
