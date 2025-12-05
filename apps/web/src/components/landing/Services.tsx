"use client";

import { Sparkles, Smile, RefreshCw, ArrowRight, Check, Cpu, Scan, Zap } from "lucide-react";

const services = [
  {
    id: "estetica-dental",
    icon: Sparkles,
    title: "Estética Cuántica",
    description:
      "Optimización visual de la sonrisa mediante nanotecnología y materiales de última generación.",
    features: [
      "Blanqueamiento Fotónico",
      "Carillas de Grafeno/Cerámica",
      "Micro-contorneado Láser",
      "Restauraciones Biomiméticas",
    ],
    color: "text-cyan-400",
    bgColor: "bg-cyan-900/20",
    borderColor: "border-cyan-500/30",
  },
  {
    id: "diseno-sonrisa",
    icon: Scan,
    title: "Arquitectura Digital",
    description:
      "Modelado 3D y simulación predictiva para una sonrisa matemáticamente perfecta.",
    features: [
      "Escaneo Intraoral 4D",
      "Prototipado Virtual",
      "Bio-integración Facial",
      "Previsualización Holística",
    ],
    color: "text-purple-400",
    bgColor: "bg-purple-900/20",
    borderColor: "border-purple-500/30",
    featured: true,
  },
  {
    id: "rehabilitacion-oral",
    icon: Cpu,
    title: "Bio-Rehabilitación",
    description:
      "Restauración funcional de sistemas orales complejos mediante ingeniería de tejidos y prótesis avanzadas.",
    features: [
      "Implantes de Titanio/Zirconio",
      "Prótesis Híbridas",
      "Regeneración Tisular",
      "Sistemas de Anclaje",
    ],
    color: "text-emerald-400",
    bgColor: "bg-emerald-900/20",
    borderColor: "border-emerald-500/30",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="section-lg relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] mb-4 animate-pulse">
            Protocolos Disponibles
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Sistemas de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Mejora Humana</span>
          </h2>
          <p className="text-lg text-gray-400">
            Intervenciones de alta precisión para la actualización estética y funcional de su interfaz biológica.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative glass-card rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 ${
                service.featured ? "border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)]" : "border-white/5"
              }`}
            >
              {service.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-900 text-cyan-300 border border-cyan-500/50 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                  Sistema Central
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl ${service.bgColor} border ${service.borderColor} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <service.icon size={32} className={service.color} />
              </div>

              {/* Content */}
              <h3 className={`text-2xl font-bold mb-4 ${service.featured ? "text-white" : "text-gray-200"}`}>
                {service.title}
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300">
                    <div className={`w-1.5 h-1.5 rounded-full ${service.color.replace('text', 'bg')} shadow-[0_0_8px_currentColor]`} />
                    <span className="text-sm tracking-wide">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573014990844"}?text=Iniciar protocolo: ${service.title}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider ${service.color} hover:gap-4 transition-all duration-300`}
              >
                Inicializar
                <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
