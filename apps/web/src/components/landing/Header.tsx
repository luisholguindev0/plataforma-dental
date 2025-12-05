"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#sobre-mi", label: "Sobre Mí" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#ubicacion", label: "Ubicación" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-950/80 backdrop-blur-xl border-b border-gray-800 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.65)] py-3"
          : "bg-transparent border-b border-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 via-primary-400 to-secondary-500 flex items-center justify-center shadow-[0_0_30px_rgba(106,91,255,0.45)] group-hover:scale-105 transition-transform">
            <span className="text-gray-950 font-serif font-bold text-lg">JM</span>
          </div>
          <div className="hidden sm:block">
            <p className="font-serif text-gray-50 font-bold text-lg leading-tight">
              Dr. Jhoiner Marquez
            </p>
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              Odontología Estética
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-primary-100 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-primary-400 focus-visible:outline-offset-2 rounded"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+573014990844"
            className="flex items-center gap-2 text-gray-300 hover:text-primary-100 transition-colors"
          >
            <Phone size={16} />
            <span className="text-sm">+57 301 499 0844</span>
          </a>
          <Button
            asChild
            size="sm"
          >
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573014990844"}?text=Hola, me gustaría agendar una cita.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Agendar Cita
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <nav
        id="mobile-menu"
        className={`md:hidden absolute top-full left-0 right-0 bg-gray-950/95 backdrop-blur-xl border-b border-gray-800 shadow-2xl transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
        aria-label="Navegación móvil"
      >
        <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-200 hover:text-primary-100 font-medium text-base py-3 px-2 rounded-lg focus-visible:outline-2 focus-visible:outline-primary-400 focus-visible:outline-offset-2 min-h-[44px] flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-gray-800 my-2" />
          <a
            href="tel:+573014990844"
            className="flex items-center gap-2 text-gray-300 hover:text-primary-100 py-3 px-2 rounded-lg focus-visible:outline-2 focus-visible:outline-primary-400 focus-visible:outline-offset-2 min-h-[44px]"
          >
            <Phone size={18} />
            <span>+57 301 499 0844</span>
          </a>
          <Button
            asChild
            className="w-full mt-2 min-h-[44px]"
          >
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573014990844"}?text=Hola, me gustaría agendar una cita.`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Agendar Cita
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
}
