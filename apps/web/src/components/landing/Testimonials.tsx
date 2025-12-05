"use client";

import { Star, MessageSquare, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Ana María P.",
    text: "Nunca imaginé que ir al dentista pudiera ser tan profesional y cómodo. El resultado es simplemente perfecto.",
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
    <section id="testimonios" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-6">
            <MessageSquare size={20} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-4">
            Lo Que Dicen Nuestros <span className="text-primary-600">Pacientes</span>
          </h2>
          <p className="text-lg text-gray-600">Testimonios reales de pacientes satisfechos.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="relative group hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-8">
                <Quote className="absolute top-8 right-8 text-gray-100 w-12 h-12 group-hover:text-primary-100 transition-colors" />
                
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-warning-500 fill-warning-500" />
                  ))}
                </div>

                <p className="text-gray-700 mb-8 leading-relaxed relative z-10 text-base">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-primary-600 mt-1">{testimonial.treatment}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center">
                    <div className="w-3 h-3 bg-success-500 rounded-full" />
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
