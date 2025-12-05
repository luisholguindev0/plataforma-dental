"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, Activity } from "lucide-react";

const navLinks = [
  { href: "#servicios", label: "Sistemas" },
  { href: "#sobre-mi", label: "El Especialista" },
  { href: "#testimonios", label: "Resultados" },
  { href: "#ubicacion", label: "Base" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-black/60 backdrop-blur-xl border-white/10 py-3"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] transition-shadow duration-300">
            <Activity className="text-white w-6 h-6" />
          </div>
          <div className="hidden sm:block">
            <p className="font-sans text-white font-bold text-lg leading-tight tracking-wide">
              Dr. Jhoiner
            </p>
            <p className="text-xs text-cyan-400 uppercase tracking-widest">
              Cyber Dental
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-400 hover:text-cyan-400 text-sm font-medium uppercase tracking-widest transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(34,211,238,1)]" />
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="tel:+573014990844"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Phone size={16} />
            <span className="text-sm font-mono">+57 301 499 0844</span>
          </a>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573014990844"}?text=Hola, quiero acceder al futuro.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-cyan-900/20 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 border border-cyan-500/50 hover:border-cyan-400 rounded text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          >
            Agendar
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <nav className="container mx-auto px-6 py-6 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-cyan-400 font-medium text-lg uppercase tracking-wider"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-white/10" />
          <a
            href="tel:+573014990844"
            className="flex items-center gap-2 text-gray-400 hover:text-white"
          >
            <Phone size={18} />
            <span>+57 301 499 0844</span>
          </a>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573014990844"}?text=Hola, quiero acceder al futuro.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center px-6 py-3 bg-cyan-600 text-white font-bold uppercase tracking-wider rounded hover:bg-cyan-500 transition-colors"
          >
            Agendar Cita
          </a>
        </nav>
      </div>
    </header>
  );
}
