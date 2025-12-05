"use client";

import { Award, GraduationCap, Heart, Users, Cpu } from "lucide-react";
import { Card } from "@/components/ui/card";

const stats = [
  { value: "10+", label: "Años de Experiencia", icon: Award },
  { value: "500+", label: "Pacientes Satisfechos", icon: Users },
  { value: "100%", label: "Compromiso", icon: Heart },
];

const credentials = [
  "Odontólogo General - Universidad del Norte",
  "Especialización en Estética Dental",
  "Certificación en Diseño Digital de Sonrisa",
];

export default function About() {
  return (
    <section id="sobre-mi" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Image side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Image Container */}
              <Card className="relative overflow-hidden aspect-[4/5] border-0 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                  {/* Placeholder for doctor image - should be replaced with actual image */}
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-xl">
                    <span className="text-white font-serif font-bold text-5xl">JM</span>
                  </div>
                </div>
                
                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </Card>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse" />
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Disponible</div>
                    <div className="text-sm font-semibold text-gray-900">Consultas Online</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-primary-600 mb-4">
                <Cpu size={16} />
                <span className="text-sm font-semibold uppercase tracking-wider">Sobre Mí</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                Especialista en <br />
                <span className="text-primary-600">Estética Dental</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Combino la biología humana con la tecnología digital avanzada. Mi enfoque no es solo reparar, 
                sino optimizar la estructura dental para una funcionalidad y estética superiores. Cada tratamiento 
                es personalizado para lograr los mejores resultados.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-8 border-y border-gray-200">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-primary-100 rounded-xl">
                      <stat.icon size={20} className="text-primary-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 font-serif">{stat.value}</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Credentials */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <GraduationCap size={20} className="text-primary-600" />
                Formación Profesional
              </h3>
              <ul className="space-y-3">
                {credentials.map((cred, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{cred}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
