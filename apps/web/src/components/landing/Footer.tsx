"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

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
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-gray-800/60 bg-gray-950 text-white pt-16 pb-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(106,91,255,0.08),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(39,197,255,0.08),transparent_30%)]" />
      <div className="container relative mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 via-primary-400 to-secondary-500 flex items-center justify-center shadow-[0_0_30px_rgba(106,91,255,0.35)]">
                <span className="text-gray-950 font-serif font-bold text-lg">JM</span>
              </div>
              <div>
                <p className="font-serif font-bold text-lg tracking-wide text-white">
                  Dr. Jhoiner Marquez
                </p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Odontología estética
                </p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Estética dental y diseño de sonrisa con tecnología digital, materiales premium y
              acompañamiento personalizado.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg border border-gray-800 bg-gray-900/70 hover:border-primary-400 hover:text-primary-100 flex items-center justify-center transition-colors"
                  aria-label={i === 0 ? "Instagram" : "Facebook"}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-6">Navegación</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-100 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-6">Servicios</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-primary-100 transition-colors text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={16} className="mt-1 text-primary-100 shrink-0" />
                <span>Calle 58 #62-61, Barranquilla</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone size={16} className="text-primary-100 shrink-0" />
                <span>+57 301 499 0844</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={16} className="text-primary-100 shrink-0" />
                <span>contacto@drjhoinermarquez.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {currentYear} Dr. Jhoiner Marquez. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary-100 transition-colors">
              Privacidad
            </Link>
            <Link href="#" className="hover:text-primary-100 transition-colors">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
