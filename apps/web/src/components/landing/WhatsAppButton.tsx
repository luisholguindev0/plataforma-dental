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
    "Hola Dr. Jhoiner, solicito acceso al protocolo de mejora dental."
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
          <div className="relative glass-panel p-4 rounded-xl border border-emerald-500/30 bg-black/80">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-900 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/50 hover:bg-emerald-800 transition-colors"
            >
              <X size={12} />
            </button>
            <p className="text-xs text-emerald-100 typing-effect">
              <span className="text-emerald-400 font-bold block mb-1">SISTEMA:</span>
              Operadores disponibles para consulta inmediata. ¿Desea iniciar conexión?
            </p>
          </div>
        </div>
      )}

      {/* Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:shadow-[0_0_30px_rgba(16,185,129,0.8)] transition-all duration-300"
      >
        <span className="absolute inset-0 rounded-full border border-emerald-400 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50" />
        <MessageCircle size={32} className="relative z-10" />
      </a>
    </div>
  );
}
