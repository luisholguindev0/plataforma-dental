"use client";

import { useState, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(tooltipTimer);
    };
  }, []);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573014990844";
  const message = encodeURIComponent(
    "Hola Dr. Jhoiner, me gustaría agendar una cita."
  );

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-4 animate-fade-in w-64">
          <div className="relative rounded-xl border border-gray-800 bg-gray-900/90 p-4 text-gray-100 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.85)] backdrop-blur">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border border-gray-800 bg-gray-800 text-gray-300 transition-colors hover:bg-gray-700"
            >
              <X size={12} />
            </button>
            <p className="text-sm text-gray-200">
              <span className="text-primary-100 font-semibold block mb-1">¿Tienes preguntas?</span>
              Estamos disponibles para ayudarte por WhatsApp.
            </p>
          </div>
        </div>
      )}

      {/* Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-success-500 to-success-400 text-gray-950 shadow-[0_20px_60px_-25px_rgba(16,185,129,0.8)] transition-transform hover:-translate-y-1"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={28} className="relative z-10" />
      </a>
    </div>
  );
}
