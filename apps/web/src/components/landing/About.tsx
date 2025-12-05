"use client";

import { Award, GraduationCap, Heart, Users } from "lucide-react";

const stats = [
  { value: "10+", label: "Años de Experiencia", icon: Award },
  { value: "500+", label: "Sonrisas Transformadas", icon: Users },
  { value: "100%", label: "Compromiso", icon: Heart },
];

const credentials = [
  "Odontólogo General - Universidad del Norte",
  "Especialización en Estética Dental",
  "Certificación en Diseño Digital de Sonrisa",
  "Miembro de la Federación Odontológica Colombiana",
];

export default function About() {
  return (
    <section id="sobre-mi" className="section-lg bg-[var(--color-off-white)] relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%231a365d' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[var(--color-accent)]/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[var(--color-primary)]/10 rounded-full blur-2xl" />

              {/* Main image container */}
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden aspect-[4/5]">
                {/* Placeholder - replace with actual image */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="font-serif font-bold text-4xl">JM</span>
                    </div>
                    <p className="text-white/80 text-sm">Foto del Doctor</p>
                  </div>
                </div>

                {/* Overlay badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
                      <GraduationCap className="text-[var(--color-accent)]" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--color-primary)]">
                        Dr. Jhoiner Marquez
                      </p>
                      <p className="text-sm text-[var(--color-gray-600)]">
                        Odontólogo Especialista
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 max-w-md mx-auto lg:mx-0">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-4 text-center shadow-md hover:shadow-lg transition-shadow"
                >
                  <stat.icon
                    size={24}
                    className="mx-auto mb-2 text-[var(--color-accent)]"
                  />
                  <p className="text-2xl font-bold text-[var(--color-primary)]">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[var(--color-gray-600)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Content side */}
          <div>
            <span className="inline-block text-[var(--color-accent)] font-medium text-sm uppercase tracking-wider mb-4">
              Sobre Mí
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--color-primary)] mb-6">
              Tu Sonrisa es Mi{" "}
              <span className="text-[var(--color-accent)]">Pasión</span>
            </h2>

            <div className="space-y-4 text-[var(--color-gray-600)] mb-8">
              <p>
                Soy el Dr. Jhoiner Marquez, odontólogo con más de 10 años de
                experiencia dedicados a transformar sonrisas y cambiar vidas en
                Barranquilla y la Costa Caribe.
              </p>
              <p>
                Mi filosofía se basa en combinar la ciencia con el arte dental,
                utilizando las técnicas más avanzadas y tecnología de vanguardia
                para ofrecer resultados naturales y duraderos que superen las
                expectativas de mis pacientes.
              </p>
              <p>
                Cada sonrisa es única, por eso diseño tratamientos personalizados
                que se adaptan a tus necesidades, tu estilo de vida y tus metas
                estéticas.
              </p>
            </div>

            {/* Credentials */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="font-semibold text-[var(--color-primary)] mb-4 flex items-center gap-2">
                <Award size={20} className="text-[var(--color-accent)]" />
                Formación y Credenciales
              </h3>
              <ul className="space-y-3">
                {credentials.map((credential, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] mt-2 flex-shrink-0" />
                    <span className="text-[var(--color-gray-700)]">{credential}</span>
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

