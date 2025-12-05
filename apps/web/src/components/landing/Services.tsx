"use client";

import {
  Sparkles,
  RefreshCw,
  ArrowRight,
  Scan,
  Wand2,
  Shield,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "diseno-sonrisa",
    icon: Wand2,
    title: "Diseño digital de sonrisa",
    description:
      "Simulación 3D, mockup y guía personalizada para lograr proporciones naturales y funcionales.",
    highlights: ["Mockup 3D previo", "Plan biométrico", "Materiales premium"],
  },
  {
    id: "estetica-dental",
    icon: Sparkles,
    title: "Estética dental avanzada",
    description:
      "Carillas, blanqueamiento, resinas biomiméticas y contouring para armonía facial completa.",
    highlights: ["Carillas ultrafinas", "Blanqueamiento clínico", "Escaneo digital"],
    featured: true,
  },
  {
    id: "rehabilitacion-oral",
    icon: RefreshCw,
    title: "Rehabilitación integral",
    description:
      "Implantes, prótesis fijas y rehabilitación completa guiada digitalmente para longevidad y confort.",
    highlights: ["Implantes guiados", "Prótesis fijas", "Oclusión optimizada"],
  },
  {
    id: "cirugia-digital",
    icon: Scan,
    title: "Cirugía guiada + AI",
    description:
      "Planeación con CBCT y guías milimétricas para precisión quirúrgica y recuperación segura.",
    highlights: ["CBCT + guías", "Bioseguridad total", "Recuperación rápida"],
  },
  {
    id: "proteccion-bioseguridad",
    icon: Shield,
    title: "Bioseguridad y confort",
    description:
      "Protocolos reforzados, sedación consciente y experiencia centrada en el bienestar del paciente.",
    highlights: ["Protocolos AAA", "Sedación opcional", "Monitoreo constante"],
  },
];

export default function Services() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573014990844";

  return (
    <section id="servicios" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(106,91,255,0.08),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(39,197,255,0.08),transparent_28%)]" />
      <div className="container relative mx-auto px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary-100">
            Servicios premium
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white">
            Experiencias clínicas diseñadas{" "}
            <span className="text-primary-100">para sonreír</span>
          </h2>
          <p className="text-lg text-gray-300">
            Protocolos digitales, materiales de última generación y acompañamiento humano en cada
            fase del tratamiento.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`relative overflow-hidden border-gray-800/80 bg-gray-900/70 backdrop-blur shadow-[0_30px_70px_-50px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-1 hover:border-primary-500/50 hover:shadow-[0_30px_90px_-50px_rgba(106,91,255,0.6)] ${
                service.featured ? "border-primary-500/50" : ""
              }`}
            >
              {service.featured && (
                <div className="absolute right-3 top-3 rounded-full border border-primary-400/50 bg-primary-500/20 px-3 py-1 text-xs font-semibold text-primary-50">
                  Más solicitado
                </div>
              )}

              <CardHeader className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/15 text-primary-100 flex items-center justify-center">
                  <service.icon size={22} />
                </div>
                <CardTitle className="text-white text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base text-gray-300">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {service.highlights.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-200">
                      <div className="w-2 h-2 rounded-full bg-primary-400/80 shadow-[0_0_0_6px_rgba(106,91,255,0.12)]" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-between border-primary-500/40 text-primary-100 hover:border-primary-400"
                >
                  <a
                    href={`https://wa.me/${whatsapp}?text=Me interesa el servicio: ${service.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Reservar valoración
                    <ArrowRight size={16} className="ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
