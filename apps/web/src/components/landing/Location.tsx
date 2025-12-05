"use client";

import { MapPin, Clock, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Location() {
  return (
    <section id="ubicacion" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_30%,rgba(39,197,255,0.08),transparent_26%),radial-gradient(circle_at_90%_10%,rgba(106,91,255,0.07),transparent_30%)]" />
      <div className="container relative mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white">
              Agenda y visita nuestro{" "}
              <span className="text-primary-100">consultorio</span>
            </h2>
            <p className="text-lg text-gray-300">
              Barranquilla | Atención digital y presencial con protocolos premium de bioseguridad.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8">
            {/* Info Panel */}
            <Card className="border-gray-800 bg-gray-900/70 backdrop-blur shadow-[0_30px_70px_-50px_rgba(0,0,0,0.85)]">
              <CardContent className="p-8 lg:p-10 space-y-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-500/15 text-primary-100 flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Dirección</p>
                      <p className="text-white font-medium">Calle 58 #62-61</p>
                      <p className="text-gray-300">Barranquilla, Atlántico</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-500/15 text-primary-100 flex items-center justify-center flex-shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">
                        Horario de atención
                      </p>
                      <p className="text-white font-medium">Lunes - Viernes: 8:00 AM - 6:00 PM</p>
                      <p className="text-gray-300">Sábados: 8:00 AM - 12:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-500/15 text-primary-100 flex items-center justify-center flex-shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Teléfono</p>
                      <p className="text-white font-medium">+57 301 499 0844</p>
                      <p className="text-gray-300">WhatsApp y llamadas</p>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <Button asChild className="w-full">
                    <a
                      href="https://maps.google.com/?q=Calle+58+62-61+Barranquilla+Colombia"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver en Google Maps
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573014990844"}?text=Hola, deseo agendar una cita presencial.`}>
                      Agendar ahora
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="border-gray-800 bg-gray-900/70 overflow-hidden shadow-[0_30px_70px_-50px_rgba(0,0,0,0.85)]">
              <div className="w-full h-full min-h-[480px] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.5!2d-74.7813!3d10.9685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDU4JzA2LjYiTiA3NMKwNDYnNTIuNyJX!5e0!3m2!1ses!2sco!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "480px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
