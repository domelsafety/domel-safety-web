import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import ContactInfoCard from "@/components/ContactInfoCard";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact | Domel Safety",
  description:
    "Get in touch with Domel Safety Company Limited for inspections, fumigation and safety consultation in Dar es Salaam, Tanzania.",
};

const CONTACT_INFO = [
  {
    label: "Phone",
    value: "+255 7XX XXX XXX",
    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  },
  {
    label: "Email",
    value: "info@domelsafety.co.tz",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    label: "Office",
    value: "Dar es Salaam, Tanzania",
    icon: "M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    label: "Hours",
    value: "Mon–Sat, 24/7 callout line",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export default function ContactPage() {
  return (
    <main>
      <Header />
      <PageHero
        eyebrow="CONTACT"
        title="Get in touch"
        description="Have a question or need a hand right away? Reach us directly or send a message and we'll respond within one business day."
      />

      <section className="mx-auto max-w-6xl px-6 py-14 grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-3">
          <ContactForm />
        </div>
        <div className="md:col-span-2 space-y-3">
          {CONTACT_INFO.map((info) => (
            <ContactInfoCard key={info.label} {...info} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
