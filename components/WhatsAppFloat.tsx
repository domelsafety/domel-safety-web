import { WhatsAppIcon } from "@/components/icons/ContactIcons";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/255695118422"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
    >
      <WhatsAppIcon className="w-7 h-7" />
    </a>
  );
}
