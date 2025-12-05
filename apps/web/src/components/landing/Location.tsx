"use client";

import { MapPin, Clock, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Location() {
  return (
    <section id="ubicacion" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-4">
              Nuestra <span className="text-primary-600">Ubicación</span>
            </h2>
            <p className="text-lg text-gray-600">
              Visítanos en nuestro consultorio en el corazón de Barranquilla
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Info Panel */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8 lg:p-12">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8">
                  Información de Contacto
                </h3>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Dirección</p>
                      <p className="text-gray-900 font-medium">Calle 58 #62-61</p>
                      <p className="text-gray-600">Barranquilla, Atlántico</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Clock size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Horario de Atención</p>
                      <p className="text-gray-900 font-medium">Lunes - Viernes: 8:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Sábados: 8:00 AM - 12:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Teléfono</p>
                      <p className="text-gray-900 font-medium">+57 301 499 0844</p>
                      <p className="text-gray-600">WhatsApp disponible</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <Button
                    asChild
                    className="w-full"
                    size="lg"
                  >
                    <a
                      href="https://maps.google.com/?q=Calle+58+62-61+Barranquilla+Colombia"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver en Google Maps
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="w-full h-full min-h-[500px] bg-gray-100 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.5!2d-74.7813!3d10.9685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDU4JzA2LjYiTiA3NMKwNDYnNTIuNyJX!5e0!3m2!1ses!2sco!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '500px' }}
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
