"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="print:hidden fixed top-4 right-4 bg-brand-red text-white text-sm font-semibold px-4 py-2 rounded-md"
    >
      Print / Save as PDF
    </button>
  );
}
