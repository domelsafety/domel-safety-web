import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="bg-brand-red">
      <div className="mx-auto max-w-6xl px-6 py-5 flex flex-col md:flex-row gap-4 items-center justify-between">
        <span className="text-offwhite text-sm font-medium">
          Need an inspection this week?
        </span>
        <Link
          href="/contact"
          className="bg-offwhite text-brand-red text-sm font-medium px-5 py-2.5 rounded"
        >
          Talk to us
        </Link>
      </div>
    </section>
  );
}
