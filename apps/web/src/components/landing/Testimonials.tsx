"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "María García",
    service: "Diseño de Sonrisa",
    rating: 5,
    text: "Increíble experiencia. El Dr. Jhoiner transformó completamente mi sonrisa. El proceso fue muy profesional y los resultados superaron mis expectativas. ¡Ahora sonrío con confianza!",
    avatar: "MG",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    service: "Rehabilitación Oral",
    rating: 5,
    text: "Después de años con problemas dentales, encontré la solución perfecta. El equipo es muy profesional y el Dr. Marquez explica todo el proceso con paciencia. Totalmente recomendado.",
    avatar: "CR",
  },
  {
    id: 3,
    name: "Ana Martínez",
    service: "Estética Dental",
    rating: 5,
    text: "El blanqueamiento y las carillas quedaron perfectas. Se nota que el Dr. Jhoiner tiene un ojo artístico increíble. El consultorio es moderno y muy cómodo. ¡Gracias por mi nueva sonrisa!",
    avatar: "AM",
  },
  {
    id: 4,
    name: "Roberto Herrera",
    service: "Diseño de Sonrisa",
    rating: 5,
    text: "Siempre tuve vergüenza de sonreír en fotos. Gracias al Dr. Marquez, ahora no puedo parar de hacerlo. El proceso fue indoloro y los resultados son naturales y hermosos.",
    avatar: "RH",
  },
  {
    id: 5,
    name: "Laura Sánchez",
    service: "Estética Dental",
    rating: 5,
    text: "Excelente atención desde la primera consulta. El Dr. Jhoiner se toma el tiempo de escuchar y entender lo que necesitas. Los resultados hablan por sí solos.",
    avatar: "LS",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonios" className="section-lg bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-accent)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-[var(--color-accent)] font-medium text-sm uppercase tracking-wider mb-4">
            Testimonios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[var(--color-primary)] mb-6">
            Lo que Dicen Nuestros{" "}
            <span className="text-[var(--color-accent)]">Pacientes</span>
          </h2>
          <p className="text-lg text-[var(--color-gray-600)]">
            La satisfacción de nuestros pacientes es nuestra mayor recompensa.
            Conoce sus experiencias y resultados.
          </p>
        </div>

        {/* Main testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            {/* Quote icon */}
            <div className="absolute top-8 right-8 opacity-20">
              <Quote size={80} />
            </div>

            <div className="relative z-10">
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className="fill-[var(--color-accent)] text-[var(--color-accent)]"
                  />
                ))}
              </div>

              {/* Testimonial text */}
              <blockquote className="text-xl md:text-2xl font-light leading-relaxed mb-8">
                &ldquo;{testimonials[currentIndex].text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[var(--color-accent)] flex items-center justify-center font-bold text-lg">
                    {testimonials[currentIndex].avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-white/70 text-sm">
                      {testimonials[currentIndex].service}
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Testimonio anterior"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Siguiente testimonio"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-[var(--color-accent)]"
                    : "bg-[var(--color-gray-300)] hover:bg-[var(--color-gray-400)]"
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-3xl mx-auto">
          <div className="text-center">
            <p className="text-4xl font-bold text-[var(--color-primary)]">500+</p>
            <p className="text-sm text-[var(--color-gray-600)]">Pacientes Satisfechos</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[var(--color-primary)]">5.0</p>
            <p className="text-sm text-[var(--color-gray-600)]">Calificación Promedio</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[var(--color-primary)]">98%</p>
            <p className="text-sm text-[var(--color-gray-600)]">Recomiendan</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[var(--color-primary)]">10+</p>
            <p className="text-sm text-[var(--color-gray-600)]">Años de Confianza</p>
          </div>
        </div>
      </div>
    </section>
  );
}

