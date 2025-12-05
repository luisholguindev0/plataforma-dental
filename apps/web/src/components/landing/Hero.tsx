"use client";

import { ArrowRight, Sparkles, Shield, Zap, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Zap, text: "Tecnología Avanzada" },
  { icon: Shield, text: "Bioseguridad Total" },
  { icon: Activity, text: "Escaneo Digital 3D" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 px-6 py-3 rounded-full text-sm font-medium text-primary-700 animate-fade-in">
              <Sparkles size={16} className="text-primary-600" />
              <span className="tracking-wide">Odontología de Vanguardia</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold leading-tight animate-fade-in delay-100">
              Tu Sonrisa <br />
              <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                Redefinida
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in delay-200">
              Dr. Jhoiner Marquez. Especialista en Estética Dental y Diseño de Sonrisa. 
              Transformamos sonrisas con tecnología de precisión y un enfoque personalizado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in delay-300">
              <Button
                asChild
                size="lg"
                className="group"
              >
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573014990844"}?text=Hola Dr. Jhoiner, me gustaría agendar una cita.`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agendar Cita
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
              >
                <a href="#servicios">
                  Ver Servicios
                </a>
              </Button>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-8 animate-fade-in delay-400 border-t border-gray-200">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-gray-600"
                >
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <feature.icon size={18} className="text-primary-600" />
                  </div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual - Clean and Professional */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main Image Container */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Placeholder for doctor image - should be replaced with actual image */}
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-xl">
                    <span className="text-white font-serif font-bold text-6xl">JM</span>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-8 right-8 w-24 h-24 bg-primary-200/30 rounded-full blur-2xl" />
                <div className="absolute bottom-8 left-8 w-32 h-32 bg-primary-300/20 rounded-full blur-3xl" />
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -right-8 top-1/4 bg-white rounded-2xl shadow-xl p-6 border border-gray-200 animate-float delay-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-success-100 rounded-xl">
                    <Activity className="text-success-600" size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Experiencia</div>
                    <div className="text-2xl font-bold text-gray-900">10+ Años</div>
                  </div>
                </div>
              </div>

              <div className="absolute -left-8 bottom-1/4 bg-white rounded-2xl shadow-xl p-6 border border-gray-200 animate-float delay-300">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-100 rounded-xl">
                    <Shield className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Pacientes</div>
                    <div className="text-2xl font-bold text-gray-900">500+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] uppercase tracking-widest text-gray-400">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary-500 to-transparent" />
      </div>
    </section>
  );
}
