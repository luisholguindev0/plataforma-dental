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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";

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
  const { isCollapsed, setIsCollapsed } = useSidebar();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const SidebarContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <>
      {/* Logo */}
      <div className={cn(
        "flex items-center py-5 border-b border-gray-200 transition-all duration-300",
        collapsed ? "justify-center px-4" : "gap-3 px-6"
      )}>
        <Link href="/" className={cn(
          "flex items-center w-full",
          collapsed ? "justify-center" : "gap-3"
        )}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-400 flex items-center justify-center flex-shrink-0 shadow-lg">
            <span className="text-white font-serif font-bold text-lg">JM</span>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="font-serif text-primary-600 font-semibold leading-tight truncate">
                Dr. Jhoiner Marquez
              </p>
              <p className="text-xs text-gray-500">Panel CRM</p>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className={cn(
        "flex-1 py-6 space-y-1 overflow-y-auto",
        collapsed ? "px-2" : "px-4"
      )}>
        {!collapsed && (
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Principal
          </p>
        )}
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            title={collapsed ? item.name : undefined}
            className={cn(
              "flex items-center py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
              collapsed ? "justify-center px-2" : "gap-3 px-3",
              isActive(item.href)
                ? "bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100 hover:text-primary-600"
            )}
          >
            <item.icon size={20} className="flex-shrink-0" />
            {!collapsed && <span>{item.name}</span>}
            {collapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-lg">
                {item.name}
              </div>
            )}
          </Link>
        ))}

        <div className="pt-6">
          {!collapsed && (
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Sistema
            </p>
          )}
          {secondaryNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              title={collapsed ? item.name : undefined}
              className={cn(
                "flex items-center py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                collapsed ? "justify-center px-2" : "gap-3 px-3",
                isActive(item.href)
                  ? "bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-primary-600"
              )}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {!collapsed && <span>{item.name}</span>}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-lg">
                  {item.name}
                </div>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom section */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-br from-primary-50 to-primary-50/50 rounded-2xl p-4 border border-primary-200">
            <p className="text-sm font-medium text-gray-800 mb-1">
              ¿Necesitas ayuda?
            </p>
            <p className="text-xs text-gray-600 mb-3">
              Consulta la documentación o contacta soporte.
            </p>
            <Link
              href="/dashboard/help"
              className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              Ver documentación →
            </Link>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Abrir menú"
      >
        <Menu size={24} className="text-gray-800" />
      </button>

      {/* Mobile sidebar */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-50 transition-all duration-300",
          isMobileMenuOpen ? "visible" : "invisible"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-black/50 transition-opacity duration-300",
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={cn(
            "absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl transition-transform duration-300 flex flex-col",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Cerrar menú"
          >
            <X size={20} className="text-gray-500" />
          </button>
          <SidebarContent collapsed={false} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 bg-white border-r border-gray-200 transition-all duration-300",
          isCollapsed ? "lg:w-20" : "lg:w-72"
        )}
      >
        <SidebarContent collapsed={isCollapsed} />
        {/* Collapse toggle button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow z-10"
          aria-label={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight size={14} className="text-gray-600" />
          ) : (
            <ChevronLeft size={14} className="text-gray-600" />
          )}
        </button>
      </aside>
    </>
  );
}
