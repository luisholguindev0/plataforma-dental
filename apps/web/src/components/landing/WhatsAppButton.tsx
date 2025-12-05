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
          <div className="relative bg-white rounded-xl shadow-xl p-4 border border-gray-200">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-200"
            >
              <X size={12} />
            </button>
            <p className="text-sm text-gray-700">
              <span className="text-primary-600 font-semibold block mb-1">¿Tienes preguntas?</span>
              Estamos disponibles para ayudarte. Contáctanos por WhatsApp.
            </p>
          </div>
        </div>
      )}

      {/* Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-success-500 hover:bg-success-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={28} className="relative z-10" />
      </a>
    </div>
  );
}
