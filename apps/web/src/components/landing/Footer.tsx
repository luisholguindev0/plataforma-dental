"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Activity } from "lucide-react";

const quickLinks = [
  { href: "#servicios", label: "Sistemas" },
  { href: "#sobre-mi", label: "Especialista" },
  { href: "#testimonios", label: "Resultados" },
  { href: "#ubicacion", label: "Ubicación" },
];

const services = [
  { href: "#servicios", label: "Estética Cuántica" },
  { href: "#servicios", label: "Arquitectura Digital" },
  { href: "#servicios", label: "Bio-Rehabilitación" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/40 backdrop-blur-lg pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-cyan-900/30 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all">
                <Activity size={20} />
              </div>
              <div>
                <p className="font-bold text-white text-lg tracking-wide">Dr. Jhoiner</p>
                <p className="text-xs text-cyan-500 uppercase tracking-[0.2em]">Cyber Dental</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Avanzando la evolución humana a través de la perfección dental. Tecnología y biología en armonía.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-cyan-900/30 hover:text-cyan-400 flex items-center justify-center transition-all duration-300 border border-transparent hover:border-cyan-500/30"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-cyan-500 rounded-full" />
              Navegación
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-purple-500 rounded-full" />
              Protocolos
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm hover:translate-x-1 inline-block"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-emerald-500 rounded-full" />
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={16} className="mt-1 text-emerald-400 shrink-0" />
                <span>Calle 58 #62-61, Barranquilla</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone size={16} className="text-emerald-400 shrink-0" />
                <span>+57 301 499 0844</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={16} className="text-emerald-400 shrink-0" />
                <span>contacto@drjhoinermarquez.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} Dr. Jhoiner Marquez. Sistema Operativo v2.0</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-cyan-400 transition-colors">Privacidad</Link>
            <Link href="#" className="hover:text-cyan-400 transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
