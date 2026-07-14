import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import RequestQuoteForm from "@/components/RequestQuoteForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Request a quote | Domel Safety",
  description:
    "Tell us about your inspection, fumigation or safety consultation needs and get a quote from Domel Safety.",
};

export default function RequestQuotePage() {
  return (
    <main>
      <Header />
      <PageHero
        eyebrow="REQUEST A QUOTE"
        title="Tell us what you need"
        description="Share a few details about the job and our team will get back to you with a quote within one business day."
      />
      <section className="mx-auto max-w-2xl px-6 py-14">
        <RequestQuoteForm />
      </section>
      <Footer />
    </main>
  );
}
