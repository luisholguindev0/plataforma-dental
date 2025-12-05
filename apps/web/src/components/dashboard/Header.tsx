"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import {
  Bell,
  Search,
  ChevronDown,
  LogOut,
  User as UserIcon,
  Settings,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface DashboardHeaderProps {
  user: User;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const initials = user.email
    ?.split("@")[0]
    .slice(0, 2)
    .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[var(--luxury-gray-200)] shadow-sm">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 h-auto sm:h-16 px-4 sm:px-6 lg:px-8 py-3 sm:py-0">
        {/* Search */}
        <div className="flex-1 w-full sm:max-w-lg">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--luxury-gray-400)]"
            />
            <input
              type="text"
              placeholder="Buscar pacientes, citas..."
              className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-2 bg-[var(--luxury-gray-50)] border border-[var(--luxury-gray-200)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold-primary)] focus:border-[var(--gold-primary)] transition-all hover:border-[var(--luxury-gray-300)]"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-4 sm:ml-4">
          {/* Notifications */}
          <button 
            className="relative p-2.5 sm:p-2 rounded-xl hover:bg-[var(--luxury-gray-100)] transition-colors"
            aria-label="Notificaciones"
          >
            <Bell size={20} className="text-[var(--luxury-gray-600)]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--gold-primary)] rounded-full ring-2 ring-white" />
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 sm:gap-3 p-1.5 rounded-xl hover:bg-[var(--luxury-gray-100)] transition-colors"
              aria-label="Menú de usuario"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--gold-primary)] to-[var(--gold-light)] flex items-center justify-center shadow-md shadow-[var(--gold-glow)]">
                <span className="text-white text-sm font-semibold">{initials}</span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-[var(--luxury-gray-900)]">
                  {user.email?.split("@")[0]}
                </p>
                <p className="text-xs text-[var(--luxury-gray-600)]">Administrador</p>
              </div>
              <ChevronDown
                size={16}
                className={`hidden sm:block text-[var(--luxury-gray-400)] transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-[var(--luxury-gray-200)] py-2 z-20 animate-fade-in">
                  <div className="px-4 py-3 border-b border-[var(--luxury-gray-100)]">
                    <p className="text-sm font-medium text-[var(--luxury-gray-900)] truncate">
                      {user.email}
                    </p>
                    <p className="text-xs text-[var(--luxury-gray-600)] mt-0.5">Administrador</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        router.push("/dashboard/profile");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--luxury-gray-700)] hover:bg-[var(--luxury-gray-50)] transition-colors"
                    >
                      <UserIcon size={16} />
                      Mi Perfil
                    </button>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        router.push("/dashboard/settings");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--luxury-gray-700)] hover:bg-[var(--luxury-gray-50)] transition-colors"
                    >
                      <Settings size={16} />
                      Configuración
                    </button>
                  </div>
                  <div className="border-t border-[var(--luxury-gray-100)] py-1">
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      <LogOut size={16} />
                      {isLoggingOut ? "Cerrando sesión..." : "Cerrar Sesión"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

