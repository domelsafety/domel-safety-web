import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Stats from "@/components/Stats";
import ValueCard from "@/components/ValueCard";
import ComplianceCertificates from "@/components/ComplianceCertificates";
import ClientLogo from "@/components/ClientLogo";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About | Domel Safety",
  description:
    "Domel Safety Company Limited supplies, services and maintains fire safety equipment and OHS/PPE gear for companies and institutions across Tanzania.",
};

const CORE_VALUES = [
  {
    title: "Integrity & Loyalty",
    description:
      "Demonstrating openness and honesty always, and building strong connections with customers and staff.",
    accent: "red" as const,
    icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Quality",
    description: "Improving the quality and efficiency of our work on every job, every time.",
    accent: "orange" as const,
    icon: "M5 13l4 4L19 7",
  },
  {
    title: "Knowledge",
    description: "Fostering a culture that encourages learning and personal development.",
    accent: "charcoal" as const,
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    title: "Professionalism",
    description: "Doing the right thing, at the right time, responsibly.",
    accent: "red" as const,
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

const COMPLIANCE = [
  {
    title: "Certificate of Incorporation",
    issuer: "BRELA \u2014 Business Registrations and Licensing Agency",
    reference: "Reg. No. 186796837",
    validity: "Incorporated 12 July 2025",
    image: "/compliance/brela-certificate.jpg",
  },
  {
    title: "Taxpayer Identification Number (TIN)",
    issuer: "Tanzania Revenue Authority",
    reference: "TIN 186-796-837",
    validity: "Tax Office: Goba \u00b7 Salasala, Dar es Salaam",
    image: "/compliance/tin-certificate.jpg",
  },
  {
    title: "Certificate of Competence",
    issuer: "Ministry of Home Affairs \u2014 Fire and Rescue Force",
    reference: "Serial No. A2021-00618",
    validity: "Valid 03 Sept 2025 \u2013 02 Sept 2026",
    image: "/compliance/fire-rescue-certificate.jpg",
  },
  {
    title: "Business License",
    issuer: "Kinondoni Municipal Council",
    reference: "BL01396912025-2600003079",
    validity: "Valid 28 Jul 2025 \u2013 27 Jul 2026",
    image: "/compliance/business-license.jpg",
  },
];

const INDUSTRIES = [
  "Oil & Gas Industries",
  "Warehousing & Storage Facilities",
  "Hospitality Industry",
  "Security Industry",
  "Engineering & Construction Contractors",
];

const CLIENT_LOGOS = [
  { src: "/clients/nakuroi.png", name: "Nakuroi Inv. Co. Ltd" },
  { src: "/clients/ajplus.png", name: "AJPLUS Co. Ltd" },
  { src: "/clients/palm-village.png", name: "Palm Village" },
  { src: "/clients/hero-masai.png", name: "Hero Masai Company Ltd" },
];

const OTHER_CLIENTS = [
  "Salasala Plaza, Dar es Salaam",
  "Famasla Enterprises",
  "Rodek Company Limited",
  "Chutaz Shops",
];

export default function AboutPage() {
  return (
    <main>
      <Header />
      <PageHero
        eyebrow="ABOUT DOMEL SAFETY"
        title="Firefighting equipment supply, service and maintenance across Tanzania"
        description="Domel Safety Company Limited is a Tanzanian fire safety and OHS company, supplying, servicing and maintaining fire safety equipment and PPE for businesses and institutions nationwide."
      />

      <section className="mx-auto max-w-6xl px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div>
          <span className="font-mono text-xs text-brand-red">OUR STORY</span>
          <h2 className="font-display text-2xl font-bold text-charcoal mt-2 mb-4">
            Built on trusted fire safety supply
          </h2>
          <p className="text-steel text-sm leading-relaxed mb-4">
            Founded in 2025, Domel Safety Company Limited joined the local
            market with a remarkable capability and a professional work
            team, specializing in comprehensive fire safety solutions:
            prevention, detection, suppression, evacuation, and the supply
            of fire safety equipment and protective clothing.
          </p>
          <p className="text-steel text-sm leading-relaxed">
            Our strong business-to-business relationships across Tanzania,
            combined with a network of international traders and
            manufacturers, make us a dependable partner \u2014 backed by
            experience that has made us a key player in our clients&apos;
            operations.
          </p>
        </div>
        <div className="space-y-6">
          <div>
            <span className="font-mono text-xs text-brand-red">OUR MISSION</span>
            <p className="text-steel text-sm leading-relaxed mt-2">
              To provide the highest quality service of unmatched value to
              our clients through a highly dedicated, trained and
              productive workforce committed to the long-term growth and
              success of the company \u2014 leading the industry in superior
              quality and maintenance through the latest technology and
              equipment.
            </p>
          </div>
          <div>
            <span className="font-mono text-xs text-brand-red">OUR VISION</span>
            <p className="text-steel text-sm leading-relaxed mt-2">
              To be recognized as the most respected professional supplies
              and service provider in Tanzania, matching world market
              standards through continuous investment in our people and
              infrastructure to enhance customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      <Stats />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <span className="font-mono text-xs text-brand-red">CORE VALUES</span>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          {CORE_VALUES.map((value) => (
            <ValueCard key={value.title} {...value} />
          ))}
        </div>
      </section>

      <section className="bg-offwhite border-y border-border">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <span className="font-mono text-xs text-brand-red">COMPLIANCE</span>
          <h2 className="font-display text-2xl font-bold text-charcoal mt-2 mb-2">
            Licensed, registered and inspected
          </h2>
          <p className="text-steel text-sm leading-relaxed max-w-2xl mb-6">
            Domel Safety operates under full statutory compliance in
            Tanzania, from company registration to fire authority
            certification.
          </p>
          <ComplianceCertificates items={COMPLIANCE} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <span className="font-mono text-xs text-brand-red">WHO WE SERVE</span>
        <h2 className="font-display text-2xl font-bold text-charcoal mt-2 mb-2">
          Trusted across industries
        </h2>
        <p className="text-steel text-sm leading-relaxed max-w-2xl mb-6">
          We understand that customers are the driving force behind our
          success. Our comprehensive service solutions cater to a wide
          range of industrial and non-industrial sectors.
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {INDUSTRIES.map((industry) => (
            <span
              key={industry}
              className="text-xs font-mono px-3 py-1.5 rounded-full border border-border text-charcoal bg-white"
            >
              {industry}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {CLIENT_LOGOS.map((client) => (
            <ClientLogo key={client.name} {...client} />
          ))}
        </div>

        <p className="text-xs text-steel">
          Also serving: {OTHER_CLIENTS.join(" \u00b7 ")}
        </p>
      </section>

      <section className="bg-charcoal">
        <div className="mx-auto max-w-6xl px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-brand-orange">GALLERY</span>
            <h2 className="font-display text-2xl font-bold text-offwhite mt-2 mb-2">
              See our work on site
            </h2>
            <p className="text-charcoal-light text-sm leading-relaxed max-w-lg">
              Installations, inspections and safety training from recent
              jobs across Dar es Salaam, Arusha, Mwanza, Dodoma and
              Morogoro.
            </p>
          </div>
          <Link
            href="/gallery"
            className="shrink-0 bg-brand-red text-white text-sm font-semibold px-6 py-3 rounded-md hover:bg-brand-red/90 transition-colors"
          >
            View Gallery
          </Link>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </main>
  );
}
