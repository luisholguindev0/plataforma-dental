"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Calendar,
  FileText,
  DollarSign,
  LayoutDashboard,
  Settings,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Pacientes", href: "/dashboard/patients", icon: Users },
  { name: "Citas", href: "/dashboard/appointments", icon: Calendar },
  { name: "Documentos", href: "/dashboard/documents", icon: FileText },
  { name: "Finanzas", href: "/dashboard/finances", icon: DollarSign },
  { name: "Conversaciones", href: "/dashboard/conversations", icon: MessageSquare },
];

const secondaryNavigation = [
  { name: "Configuración", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[var(--color-gray-200)]">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
            <span className="text-white font-serif font-bold text-lg">JM</span>
          </div>
          <div>
            <p className="font-serif text-[var(--color-primary)] font-semibold leading-tight">
              Dr. Jhoiner Marquez
            </p>
            <p className="text-xs text-[var(--color-gray-500)]">Panel CRM</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="px-3 text-xs font-semibold text-[var(--color-gray-400)] uppercase tracking-wider mb-3">
          Principal
        </p>
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive(item.href)
                ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30"
                : "text-[var(--color-gray-600)] hover:bg-[var(--color-gray-100)] hover:text-[var(--color-primary)]"
            }`}
          >
            <item.icon size={20} />
            {item.name}
          </Link>
        ))}

        <div className="pt-6">
          <p className="px-3 text-xs font-semibold text-[var(--color-gray-400)] uppercase tracking-wider mb-3">
            Sistema
          </p>
          {secondaryNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30"
                  : "text-[var(--color-gray-600)] hover:bg-[var(--color-gray-100)] hover:text-[var(--color-primary)]"
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-[var(--color-gray-200)]">
        <div className="bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-accent)]/5 rounded-2xl p-4">
          <p className="text-sm font-medium text-[var(--color-gray-800)] mb-1">
            ¿Necesitas ayuda?
          </p>
          <p className="text-xs text-[var(--color-gray-500)] mb-3">
            Consulta la documentación o contacta soporte.
          </p>
          <Link
            href="/dashboard/help"
            className="text-xs font-medium text-[var(--color-accent-dark)] hover:text-[var(--color-accent)] transition-colors"
          >
            Ver documentación →
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-white shadow-lg"
      >
        <Menu size={24} className="text-[var(--color-gray-700)]" />
      </button>

      {/* Mobile sidebar */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl transition-transform duration-300 flex flex-col ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[var(--color-gray-100)]"
          >
            <X size={20} className="text-[var(--color-gray-500)]" />
          </button>
          <SidebarContent />
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-white border-r border-[var(--color-gray-200)]">
        <SidebarContent />
      </aside>
    </>
  );
}

