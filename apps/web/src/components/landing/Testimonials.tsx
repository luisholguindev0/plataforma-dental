"use client";

import { Star, MessageSquare, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ana María P.",
    text: "Nunca imaginé que ir al dentista pudiera sentirse como viajar al futuro. El resultado es simplemente perfecto.",
    rating: 5,
    treatment: "Diseño de Sonrisa",
  },
  {
    name: "Carlos R.",
    text: "La tecnología que usa el Dr. Jhoiner es increíble. Pude ver cómo quedaría mi sonrisa antes de empezar.",
    rating: 5,
    treatment: "Implantes",
  },
  {
    name: "Valentina M.",
    text: "Atención impecable y resultados que superaron mis expectativas. Totalmente recomendado.",
    rating: 5,
    treatment: "Blanqueamiento",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="section-lg relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-900/30 text-cyan-400 mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <MessageSquare size={20} />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Registro de Usuarios</h2>
          <p className="text-gray-400">Datos confirmados de pacientes satisfechos.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-2xl relative group"
            >
              <Quote className="absolute top-8 right-8 text-white/5 w-12 h-12 group-hover:text-cyan-500/10 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-gray-300 mb-8 leading-relaxed relative z-10">
                "{testimonial.text}"
              </p>

              <div className="flex items-center justify-between border-t border-white/5 pt-6">
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-xs text-cyan-400 uppercase tracking-wider mt-1">{testimonial.treatment}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_5px_#4ade80]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
