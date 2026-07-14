import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import BookFumigationForm from "@/components/BookFumigationForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Book fumigation | Domel Safety",
  description:
    "Book a fumigation visit for your office, warehouse, school or home with Domel Safety.",
};

export default function BookFumigationPage() {
  return (
    <main>
      <Header />
      <PageHero
        eyebrow="BOOK FUMIGATION"
        title="Schedule your fumigation visit"
        description="Pick a preferred date and share your site details. We'll confirm the exact time before we arrive."
      />
      <section className="mx-auto max-w-2xl px-6 py-14">
        <BookFumigationForm />
      </section>
      <Footer />
    </main>
  );
}
