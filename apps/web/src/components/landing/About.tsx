"use client";

import { Award, GraduationCap, Users, Cpu, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

const stats = [
  { value: "10+", label: "Años de experiencia", icon: Award },
  { value: "500+", label: "Pacientes felices", icon: Users },
  { value: "100%", label: "Plan digital", icon: ShieldCheck },
];

const credentials = [
  "Odontólogo - Universidad del Norte",
  "Especialización en Estética Dental",
  "Certificado en Diseño Digital de Sonrisa (DDS)",
  "Escaneo y guías 3D para cirugía e implantes",
];

export default function About() {
  return (
    <section id="sobre-mi" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(255,255,255,0.04),transparent_28%),radial-gradient(circle_at_85%_30%,rgba(106,91,255,0.07),transparent_30%)]" />
      <div className="container relative mx-auto px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 max-w-6xl mx-auto">
          {/* Image side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md">
              <Card className="relative overflow-hidden aspect-[4/5] border-gray-800 bg-gray-950/70 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.9)]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/15 via-gray-900 to-secondary-500/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary-500 via-secondary-500 to-primary-200 flex items-center justify-center shadow-[0_0_60px_rgba(106,91,255,0.35)]">
                    <span className="text-gray-950 font-serif font-bold text-5xl">JM</span>
                  </div>
                </div>
                <div className="absolute inset-6 rounded-[28px] border border-white/8" />
              </Card>

              {/* Floating badge */}
              <div className="absolute -bottom-8 -right-6 rounded-2xl border border-primary-500/30 bg-gray-900/90 px-6 py-5 shadow-[0_20px_60px_-40px_rgba(106,91,255,0.6)] backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse" />
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">Disponible</div>
                    <div className="text-sm font-semibold text-white">Consultas online</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-primary-100 mb-4">
                <Cpu size={16} />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Sobre mí
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white leading-tight">
                Estética dental impulsada por{" "}
                <span className="text-primary-100">tecnología y detalle</span>
              </h2>
              <p className="mt-4 text-lg text-gray-300 leading-relaxed">
                Integro biología, ingeniería digital y diseño estético para crear sonrisas
                saludables, naturales y duraderas. Cada caso se planifica con escaneo 3D, guías
                digitales y materiales de alto desempeño.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-5 rounded-2xl border border-gray-800 bg-gray-900/60 px-4 py-6 shadow-inner shadow-black/30">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center space-y-2">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/15 text-primary-100">
                    <stat.icon size={18} />
                  </div>
                  <div className="text-2xl font-semibold text-white">{stat.value}</div>
                  <div className="text-xs uppercase tracking-wider text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Credentials */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <GraduationCap size={20} className="text-primary-100" />
                Formación y certificaciones
              </h3>
              <ul className="space-y-3">
                {credentials.map((cred) => (
                  <li key={cred} className="flex items-start gap-3 text-gray-200">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary-400" />
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
