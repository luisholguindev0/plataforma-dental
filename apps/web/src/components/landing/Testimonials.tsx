"use client";

import { Star, MessageSquare, Quote, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Ana María P.",
    text: "Nunca imaginé que ir al dentista pudiera ser tan cómodo. El diseño digital me permitió ver el resultado antes de empezar. El cambio es increíble.",
    rating: 5,
    treatment: "Diseño de sonrisa",
  },
  {
    name: "Carlos R.",
    text: "Implantes guiados con precisión milimétrica. Sin dolor, sin incertidumbre, y una mordida que se siente natural. Gran acompañamiento.",
    rating: 5,
    treatment: "Implantes digitales",
  },
  {
    name: "Valentina M.",
    text: "Blanqueamiento + carillas ultrafinas. El tono, la forma y la naturalidad quedaron perfectos. Súper profesional y humano.",
    rating: 5,
    treatment: "Estética avanzada",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(39,197,255,0.08),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(106,91,255,0.08),transparent_30%)]" />
      <div className="container relative mx-auto px-6">
        <div className="text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/40 bg-primary-500/10 px-4 py-2 text-sm text-primary-100">
            <MessageSquare size={16} />
            Pacientes reales
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white">
            Historias que inspiran <span className="text-primary-100">confianza</span>
          </h2>
          <p className="text-lg text-gray-300">
            Experiencias medibles: precisión digital, tiempos cortos y resultados naturales.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-gray-800/70 bg-gray-900/70 backdrop-blur shadow-[0_20px_70px_-50px_rgba(0,0,0,0.85)] transition-all duration-300 hover:-translate-y-1 hover:border-primary-500/40"
            >
              <CardContent className="p-8 space-y-6">
                <Quote className="absolute -left-1 -top-1 text-primary-500/15 w-16 h-16" />

                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-warning-500 fill-warning-500" />
                  ))}
                </div>

                <p className="text-gray-200 leading-relaxed">“{testimonial.text}”</p>

                <div className="flex items-center justify-between border-t border-gray-800 pt-6">
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-primary-100 mt-1">{testimonial.treatment}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/20 text-primary-100">
                    <Sparkles size={18} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
