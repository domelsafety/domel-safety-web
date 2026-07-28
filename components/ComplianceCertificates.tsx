"use client";

import { useState } from "react";
import Image from "next/image";

export type CertificateItem = {
  title: string;
  issuer: string;
  reference: string;
  validity?: string;
  image: string;
};

export default function ComplianceCertificates({
  items,
}: {
  items: CertificateItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null ? items[openIndex] : null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <button
            key={item.title}
            onClick={() => setOpenIndex(i)}
            className="text-left bg-white border border-border rounded-md p-4 flex gap-4 items-center hover:border-charcoal hover:shadow-sm transition-all"
          >
            <div className="relative w-20 h-24 shrink-0 rounded overflow-hidden border border-border bg-offwhite">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-charcoal leading-tight">
                {item.title}
              </h3>
              <p className="text-xs text-steel mt-1">{item.issuer}</p>
              <p className="text-xs font-mono text-brand-orange mt-1">
                {item.reference}
              </p>
              {item.validity && (
                <p className="text-xs text-steel mt-0.5">{item.validity}</p>
              )}
              <span className="text-[11px] font-mono text-brand-red mt-2 inline-block">
                View certificate &rarr;
              </span>
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-charcoal/90 z-50 flex items-center justify-center p-6"
          onClick={() => setOpenIndex(null)}
        >
          <div
            className="bg-white rounded-md max-w-lg w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[3/4]">
              <Image
                src={open.image}
                alt={open.title}
                fill
                className="object-contain bg-offwhite"
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-sm font-bold text-charcoal">
                  {open.title}
                </h3>
                <p className="text-xs text-steel">{open.reference}</p>
              </div>
              <button
                onClick={() => setOpenIndex(null)}
                className="text-xs font-mono text-brand-red px-3 py-1.5 border border-brand-red rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
