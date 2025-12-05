"use client";

import {
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Activity,
  Scan,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  { icon: Zap, text: "Escaneo 3D + AI", desc: "Plan digital exacto" },
  { icon: Shield, text: "Bioseguridad total", desc: "Protocolos clínicos" },
  { icon: Scan, text: "Guías quirúrgicas", desc: "Precisión milimétrica" },
  { icon: Wand2, text: "Diseño estético", desc: "Natural y personalizado" },
];

export default function Hero() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573014990844";

  return (
    <section className="relative overflow-hidden pt-28 lg:pt-32 pb-20">
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(106,91,255,0.18),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(39,197,255,0.15),transparent_28%),radial-gradient(circle_at_50%_70%,rgba(12,16,26,0.8),#05060a)]" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_50%,rgba(255,255,255,0.04)_100%)]" />
        <div className="absolute top-24 right-12 w-60 h-60 bg-primary-500/15 blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-secondary-500/12 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] max-w-6xl mx-auto">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/40 bg-primary-500/10 px-5 py-2 text-sm font-medium text-primary-100 shadow-[0_0_20px_rgba(106,91,255,0.35)] backdrop-blur">
              <Sparkles size={16} />
              <span className="tracking-wide">Odontología Estética + Precisión Digital</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight text-white">
                Sonrisas diseñadas con{" "}
                <span className="bg-gradient-to-r from-primary-200 via-white to-secondary-300 bg-clip-text text-transparent">
                  tecnología de vanguardia
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Dr. Jhoiner Marquez | Especialista en Estética Dental y Diseño de Sonrisa.
                Planificación digital, materiales premium y acompañamiento humano en cada fase.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a
                  href={`https://wa.me/${whatsapp}?text=Hola Dr. Jhoiner, quiero agendar una cita.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Agendar cita por WhatsApp"
                >
                  Agendar cita
                  <ArrowRight size={20} className="ml-1" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <a href="#servicios">Explorar servicios</a>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border border-gray-800/80 bg-gray-900/60 rounded-2xl px-4 py-5 shadow-lg shadow-black/30 backdrop-blur">
              {[
                { label: "Pacientes felices", value: "500+" },
                { label: "Años de experiencia", value: "10+" },
                { label: "Procedimientos digitales", value: "100%" },
                { label: "Casos de sonrisa", value: "320+" },
              ].map((item) => (
                <div key={item.label} className="text-left">
                  <p className="text-xs uppercase tracking-wider text-gray-500">{item.label}</p>
                  <p className="text-xl font-semibold text-primary-100">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="absolute -inset-10 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10 blur-3xl" />
            <div className="relative aspect-square rounded-[32px] border border-gray-800/80 bg-gray-950/70 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.85)] backdrop-blur">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary-500 via-secondary-500 to-primary-300 flex items-center justify-center shadow-[0_0_60px_rgba(106,91,255,0.45)]">
                  <span className="text-gray-950 font-serif font-bold text-6xl">JM</span>
                </div>
              </div>

              {/* Floating cards */}
              <Card className="absolute -right-8 top-10 w-56 border-primary-500/25 bg-gray-900/90 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]">
                <div className="flex items-center gap-4 p-5">
                  <div className="p-3 rounded-xl bg-success-600/20 text-success-200">
                    <Activity size={22} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400">Experiencia</p>
                    <p className="text-xl font-semibold text-white">10+ años</p>
                  </div>
                </div>
              </Card>

              <Card className="absolute -left-8 bottom-12 w-56 border-secondary-500/25 bg-gray-900/90 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]">
                <div className="flex items-center gap-4 p-5">
                  <div className="p-3 rounded-xl bg-primary-500/20 text-primary-100">
                    <Shield size={22} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400">Pacientes</p>
                    <p className="text-xl font-semibold text-white">500+</p>
                  </div>
                </div>
              </Card>

              <div className="absolute inset-8 rounded-[28px] border border-white/5" />
              <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(106,91,255,0.08),transparent_32%)]" />
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.text}
              className="group relative overflow-hidden rounded-2xl border border-gray-800/70 bg-gray-900/60 p-5 shadow-lg shadow-black/30 backdrop-blur"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start gap-3 relative">
                <div className="p-2.5 rounded-xl bg-primary-500/15 text-primary-100">
                  <feature.icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{feature.text}</p>
                  <p className="text-xs text-gray-400 mt-1">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Scroll</span>
        <div className="w-[2px] h-14 bg-gradient-to-b from-primary-400 via-primary-500 to-transparent rounded-full" />
      </div>
    </section>
  );
}
