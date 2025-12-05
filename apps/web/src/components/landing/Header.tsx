"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
            <span className="text-white font-serif font-bold text-lg">JM</span>
          </div>
          <div className="hidden sm:block">
            <p className="font-serif text-[var(--color-primary)] font-semibold text-lg leading-tight">
              Dr. Jhoiner Marquez
            </p>
            <p className="text-xs text-[var(--color-gray-600)]">
              Odontología Estética
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--color-gray-700)] hover:text-[var(--color-primary)] font-medium transition-colors relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+573014990844"
            className="flex items-center gap-2 text-[var(--color-gray-700)] hover:text-[var(--color-primary)] transition-colors"
          >
            <Phone size={18} />
            <span className="font-medium">+57 301 499 0844</span>
          </a>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573014990844"}?text=Hola, me gustaría agendar una valoración`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Agendar Cita
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-[var(--color-gray-700)]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <nav className="container mx-auto px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--color-gray-700)] hover:text-[var(--color-primary)] font-medium py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-[var(--color-gray-200)]" />
          <a
            href="tel:+573014990844"
            className="flex items-center gap-2 text-[var(--color-gray-700)] py-2"
          >
            <Phone size={18} />
            <span>+57 301 499 0844</span>
          </a>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573014990844"}?text=Hola, me gustaría agendar una valoración`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full"
          >
            Agendar Cita
          </a>
        </nav>
      </div>
    </header>
  );
}

