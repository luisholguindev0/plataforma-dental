"use client";

import { ArrowRight, Sparkles, Shield, Clock } from "lucide-react";

const features = [
  { icon: Sparkles, text: "Tecnología de Vanguardia" },
  { icon: Shield, text: "Tratamientos Seguros" },
  { icon: Clock, text: "Resultados Inmediatos" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[var(--color-accent)]/5 to-transparent rounded-full" />
      </div>

      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a365d' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[var(--color-accent)]/10 text-[var(--color-accent-dark)] px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Sparkles size={16} />
              <span>Especialista en Sonrisas Perfectas</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[var(--color-primary)] mb-6 animate-fade-in delay-100">
              Transforma tu{" "}
              <span className="text-gradient">Sonrisa</span>,{" "}
              <br className="hidden sm:block" />
              Transforma tu{" "}
              <span className="text-[var(--color-accent)]">Vida</span>
            </h1>

            <p className="text-lg text-[var(--color-gray-600)] mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in delay-200">
              Soy el Dr. Jhoiner Marquez, especialista en Odontología Estética en
              Barranquilla. Te ayudo a conseguir la sonrisa que siempre soñaste
              con tratamientos personalizados y tecnología de última generación.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fade-in delay-300">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573014990844"}?text=Hola Dr. Jhoiner, me gustaría agendar una valoración para conocer mis opciones de tratamiento.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp text-lg px-8 py-4"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Agendar Valoración Gratis
                <ArrowRight size={20} />
              </a>
              <a
                href="#servicios"
                className="btn btn-outline text-lg px-8 py-4"
              >
                Ver Servicios
              </a>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 animate-fade-in delay-400">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-[var(--color-gray-600)]"
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <feature.icon size={20} className="text-[var(--color-primary)]" />
                  </div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative hidden lg:block animate-fade-in delay-300">
            <div className="relative">
              {/* Main image placeholder - replace with actual image */}
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-[3rem] rotate-6 opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] rounded-[3rem] -rotate-3 opacity-20" />
                <div className="relative bg-gradient-to-br from-[var(--color-off-white)] to-white rounded-[3rem] shadow-2xl overflow-hidden h-full flex items-center justify-center">
                  {/* Placeholder content - replace with actual doctor image */}
                  <div className="text-center p-12">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
                      <span className="text-white font-serif font-bold text-5xl">JM</span>
                    </div>
                    <p className="text-[var(--color-gray-500)] text-sm">
                      Foto del Dr. Jhoiner Marquez
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -left-8 top-1/4 bg-white rounded-2xl shadow-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center">
                    <Shield className="text-[var(--color-success)]" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--color-gray-800)]">+500</p>
                    <p className="text-sm text-[var(--color-gray-500)]">Sonrisas Transformadas</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/4 bg-white rounded-2xl shadow-xl p-4 animate-float delay-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
                    <Sparkles className="text-[var(--color-accent)]" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--color-gray-800)]">10+ Años</p>
                    <p className="text-sm text-[var(--color-gray-500)]">de Experiencia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-[var(--color-gray-300)] flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-[var(--color-gray-400)] rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

