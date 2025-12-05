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
    <header className="sticky top-0 z-40 bg-white border-b border-[var(--color-gray-200)]">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-gray-400)]"
            />
            <input
              type="text"
              placeholder="Buscar pacientes, citas..."
              className="w-full pl-10 pr-4 py-2 bg-[var(--color-gray-50)] border border-[var(--color-gray-200)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 ml-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-xl hover:bg-[var(--color-gray-100)] transition-colors">
            <Bell size={20} className="text-[var(--color-gray-600)]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-accent)] rounded-full" />
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-[var(--color-gray-100)] transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
                <span className="text-white text-sm font-semibold">{initials}</span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-[var(--color-gray-800)]">
                  {user.email?.split("@")[0]}
                </p>
                <p className="text-xs text-[var(--color-gray-500)]">Administrador</p>
              </div>
              <ChevronDown
                size={16}
                className={`hidden sm:block text-[var(--color-gray-400)] transition-transform duration-200 ${
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
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-[var(--color-gray-200)] py-2 z-20">
                  <div className="px-4 py-2 border-b border-[var(--color-gray-100)]">
                    <p className="text-sm font-medium text-[var(--color-gray-800)]">
                      {user.email}
                    </p>
                    <p className="text-xs text-[var(--color-gray-500)]">Administrador</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        router.push("/dashboard/profile");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)] transition-colors"
                    >
                      <UserIcon size={16} />
                      Mi Perfil
                    </button>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        router.push("/dashboard/settings");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)] transition-colors"
                    >
                      <Settings size={16} />
                      Configuración
                    </button>
                  </div>
                  <div className="border-t border-[var(--color-gray-100)] py-1">
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
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

