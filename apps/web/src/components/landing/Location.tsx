"use client";

import { MapPin, Clock, Phone, Mail, Navigation } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Dirección",
    value: "Calle 58 #62-61, Barranquilla",
    link: "https://maps.google.com/?q=Calle+58+62-61+Barranquilla+Colombia",
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "+57 301 499 0844",
    link: "tel:+573014990844",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contacto@drjhoinermarquez.com",
    link: "mailto:contacto@drjhoinermarquez.com",
  },
];

const schedule = [
  { day: "Lunes - Viernes", hours: "8:00 AM - 6:00 PM" },
  { day: "Sábado", hours: "8:00 AM - 12:00 PM" },
  { day: "Domingo", hours: "Cerrado" },
];

export default function Location() {
  return (
    <section id="ubicacion" className="section-lg bg-[var(--color-off-white)] relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-[var(--color-accent)] font-medium text-sm uppercase tracking-wider mb-4">
            Ubicación
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[var(--color-primary)] mb-6">
            Visítanos en{" "}
            <span className="text-[var(--color-accent)]">Barranquilla</span>
          </h2>
          <p className="text-lg text-[var(--color-gray-600)]">
            Estamos ubicados en el corazón de Barranquilla, con fácil acceso y
            estacionamiento disponible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-auto lg:min-h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.478736!2d-74.7835!3d10.9685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDU4JzA2LjYiTiA3NMKwNDcnMDAuNiJX!5e0!3m2!1ses!2sco!4v1699999999999"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación del consultorio"
              className="absolute inset-0"
            />

            {/* Map overlay with CTA */}
            <div className="absolute bottom-6 left-6 right-6">
              <a
                href="https://maps.google.com/?q=Calle+58+62-61+Barranquilla+Colombia"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-4 shadow-lg flex items-center gap-4 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
                  <Navigation size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[var(--color-primary)]">
                    Calle 58 #62-61
                  </p>
                  <p className="text-sm text-[var(--color-gray-600)]">
                    Barranquilla, Atlántico
                  </p>
                </div>
                <span className="text-[var(--color-accent)] font-medium text-sm">
                  Cómo llegar →
                </span>
              </a>
            </div>
          </div>

          {/* Contact info */}
          <div className="space-y-8">
            {/* Contact cards */}
            <div className="grid gap-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center group-hover:bg-[var(--color-primary)] transition-colors">
                    <item.icon
                      size={24}
                      className="text-[var(--color-primary)] group-hover:text-white transition-colors"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-gray-500)]">{item.label}</p>
                    <p className="font-semibold text-[var(--color-gray-800)]">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">
                  <Clock size={24} className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-primary)]">
                    Horario de Atención
                  </h3>
                  <p className="text-sm text-[var(--color-gray-500)]">
                    Agenda tu cita con anticipación
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {schedule.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-[var(--color-gray-100)] last:border-0"
                  >
                    <span className="text-[var(--color-gray-700)]">{item.day}</span>
                    <span
                      className={`font-medium ${
                        item.hours === "Cerrado"
                          ? "text-[var(--color-gray-400)]"
                          : "text-[var(--color-primary)]"
                      }`}
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573014990844"}?text=Hola Dr. Jhoiner, me gustaría agendar una cita.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full text-lg py-4"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Agendar Cita por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

