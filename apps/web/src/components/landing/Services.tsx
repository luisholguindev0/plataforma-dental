"use client";

import { Sparkles, Smile, RefreshCw, ArrowRight, Check } from "lucide-react";

const services = [
  {
    id: "estetica-dental",
    icon: Sparkles,
    title: "Estética Dental",
    description:
      "Mejora la apariencia de tu sonrisa con tratamientos estéticos de última generación.",
    features: [
      "Blanqueamiento dental profesional",
      "Carillas de porcelana",
      "Contorneado dental",
      "Restauraciones estéticas",
    ],
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    id: "diseno-sonrisa",
    icon: Smile,
    title: "Diseño de Sonrisa",
    description:
      "Transformación completa de tu sonrisa diseñada digitalmente para resultados perfectos.",
    features: [
      "Diseño digital personalizado",
      "Vista previa de resultados",
      "Carillas ultrafinas",
      "Armonía facial completa",
    ],
    color: "from-[var(--color-accent)] to-[var(--color-accent-dark)]",
    bgColor: "bg-[var(--color-accent)]/10",
    textColor: "text-[var(--color-accent-dark)]",
    featured: true,
  },
  {
    id: "rehabilitacion-oral",
    icon: RefreshCw,
    title: "Rehabilitación Oral",
    description:
      "Recupera la función y estética de tu boca con tratamientos integrales y duraderos.",
    features: [
      "Implantes dentales",
      "Prótesis fijas y removibles",
      "Coronas y puentes",
      "Reconstrucción total",
    ],
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="section-lg bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[var(--color-off-white)] to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-[var(--color-accent)] font-medium text-sm uppercase tracking-wider mb-4">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[var(--color-primary)] mb-6">
            Soluciones Dentales{" "}
            <span className="text-[var(--color-accent)]">Personalizadas</span>
          </h2>
          <p className="text-lg text-[var(--color-gray-600)]">
            Ofrecemos tratamientos especializados adaptados a tus necesidades,
            utilizando tecnología de vanguardia para garantizar los mejores resultados.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative bg-white rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl ${
                service.featured
                  ? "ring-2 ring-[var(--color-accent)] shadow-xl lg:-translate-y-4"
                  : "shadow-lg hover:-translate-y-2"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {service.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-dark)] text-white text-xs font-semibold px-4 py-1 rounded-full">
                  Más Popular
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl ${service.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon size={32} className={service.textColor} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-serif font-bold text-[var(--color-primary)] mb-3">
                {service.title}
              </h3>
              <p className="text-[var(--color-gray-600)] mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full ${service.bgColor} flex items-center justify-center flex-shrink-0`}
                    >
                      <Check size={12} className={service.textColor} />
                    </div>
                    <span className="text-sm text-[var(--color-gray-700)]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573014990844"}?text=Hola Dr. Jhoiner, estoy interesado en ${service.title}. Me gustaría más información.`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 font-semibold ${service.textColor} hover:gap-4 transition-all duration-300`}
              >
                Consultar ahora
                <ArrowRight size={18} />
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-[var(--color-gray-600)] mb-4">
            ¿No estás seguro de qué tratamiento necesitas?
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573014990844"}?text=Hola Dr. Jhoiner, me gustaría una valoración para conocer qué tratamiento es el más adecuado para mí.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Agenda una Valoración Gratuita
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

