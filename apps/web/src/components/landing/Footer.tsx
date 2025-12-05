"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

const quickLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#sobre-mi", label: "Sobre Mí" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#ubicacion", label: "Ubicación" },
];

const services = [
  { href: "#servicios", label: "Estética Dental" },
  { href: "#servicios", label: "Diseño de Sonrisa" },
  { href: "#servicios", label: "Rehabilitación Oral" },
  { href: "#servicios", label: "Valoración" },
];

const socialLinks = [
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Facebook, label: "Facebook" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-primary)] text-white">
      {/* Main footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-white font-serif font-bold text-xl">JM</span>
              </div>
              <div>
                <p className="font-serif text-white font-semibold text-lg leading-tight">
                  Dr. Jhoiner Marquez
                </p>
                <p className="text-xs text-white/60">Odontología Estética</p>
              </div>
            </Link>
            <p className="text-white/70 text-sm mb-6">
              Transformando sonrisas y vidas en Barranquilla con tratamientos
              dentales de vanguardia y atención personalizada.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Servicios</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com/?q=Calle+58+62-61+Barranquilla+Colombia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/70 hover:text-white transition-colors text-sm"
                >
                  <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                  <span>Calle 58 #62-61, Barranquilla, Atlántico</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+573014990844"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm"
                >
                  <Phone size={18} className="flex-shrink-0" />
                  <span>+57 301 499 0844</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@drjhoinermarquez.com"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm"
                >
                  <Mail size={18} className="flex-shrink-0" />
                  <span>contacto@drjhoinermarquez.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {currentYear} Dr. Jhoiner Marquez. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-white/60 hover:text-white transition-colors text-sm"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/terms"
                className="text-white/60 hover:text-white transition-colors text-sm"
              >
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

