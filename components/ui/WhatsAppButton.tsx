"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "971500000000";
  const message = encodeURIComponent("Hi Nexa Telecom, I'd like to know more about your plans.");

  return (
    <a
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft transition-transform hover:scale-110 focus-ring"
    >
      <MessageCircle size={28} fill="white" strokeWidth={0} />
    </a>
  );
}
