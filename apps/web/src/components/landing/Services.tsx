"use client";

import { Sparkles, Smile, RefreshCw, ArrowRight, Check, Scan, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "estetica-dental",
    icon: Sparkles,
    title: "Estética Dental",
    description:
      "Blanqueamiento profesional, carillas cerámicas y tratamientos estéticos para una sonrisa radiante.",
    features: [
      "Blanqueamiento Dental",
      "Carillas Cerámicas",
      "Contorneado Estético",
      "Restauraciones Estéticas",
    ],
    color: "text-primary-600",
    bgColor: "bg-primary-50",
    borderColor: "border-primary-200",
  },
  {
    id: "diseno-sonrisa",
    icon: Scan,
    title: "Diseño de Sonrisa",
    description:
      "Planificación digital y diseño personalizado para lograr la sonrisa de tus sueños.",
    features: [
      "Diseño Digital 3D",
      "Simulación Virtual",
      "Plan de Tratamiento",
      "Previsualización",
    ],
    color: "text-primary-600",
    bgColor: "bg-primary-50",
    borderColor: "border-primary-200",
    featured: true,
  },
  {
    id: "rehabilitacion-oral",
    icon: RefreshCw,
    title: "Rehabilitación Oral",
    description:
      "Restauraciones completas con implantes, prótesis y tratamientos de alta calidad.",
    features: [
      "Implantes Dentales",
      "Prótesis Fijas",
      "Coronas y Puentes",
      "Rehabilitación Completa",
    ],
    color: "text-primary-600",
    bgColor: "bg-primary-50",
    borderColor: "border-primary-200",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
            Nuestros Servicios
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-6">
            Servicios de <span className="text-primary-600">Excelencia</span>
          </h2>
          <p className="text-lg text-gray-600">
            Ofrecemos tratamientos de vanguardia con tecnología avanzada y un enfoque personalizado para cada paciente.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`group hover:shadow-xl transition-all duration-300 ${
                service.featured ? "border-primary-300 border-2" : ""
              }`}
            >
              {service.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  Más Popular
                </div>
              )}

              <CardHeader>
                <div className={`w-16 h-16 ${service.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon size={32} className={service.color} />
                </div>
                <CardTitle className="text-2xl text-gray-900">{service.title}</CardTitle>
                <CardDescription className="text-base text-gray-600 mt-2">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  asChild
                  variant="outline"
                  className="w-full group/btn"
                >
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573014990844"}?text=Me interesa el servicio: ${service.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Consultar
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
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
