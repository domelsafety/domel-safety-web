import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import ContactInfoCard from "@/components/ContactInfoCard";
import Footer from "@/components/Footer";
import {
  PhoneIcon,
  EmailIcon,
  OfficeIcon,
  ClockIcon,
  WhatsAppIcon,
} from "@/components/icons/ContactIcons";

export const metadata: Metadata = {
  title: "Contact | Domel Safety",
  description:
    "Get in touch with Domel Safety Company Limited for inspections, fumigation and safety consultation in Dar es Salaam, Tanzania.",
};

const CONTACT_INFO = [
  {
    label: "Phone",
    value: "+255 695 118 422 / 0676 958 607",
    icon: <PhoneIcon />,
    href: "tel:+255695118422",
    accent: "red" as const,
  },
  {
    label: "WhatsApp",
    value: "+255 695 118 422",
    icon: <WhatsAppIcon />,
    href: "https://wa.me/255695118422",
    accent: "orange" as const,
  },
  {
    label: "Email",
    value: "info@domelsafety.co.tz",
    icon: <EmailIcon />,
    href: "mailto:info@domelsafety.co.tz",
    accent: "charcoal" as const,
  },
  {
    label: "Office",
    value: "P.O. Box 8323, Dar es Salaam, Tanzania",
    icon: <OfficeIcon />,
    accent: "red" as const,
  },
  {
    label: "Hours",
    value: "Mon–Sat, 24/7 callout line",
    icon: <ClockIcon />,
    accent: "orange" as const,
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
