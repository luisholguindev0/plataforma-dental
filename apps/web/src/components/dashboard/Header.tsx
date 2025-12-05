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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

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
    <header className="sticky top-0 z-40 border-b border-gray-800 bg-gray-950/80 backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 h-auto sm:h-16 px-4 sm:px-6 lg:px-8 py-3 sm:py-0">
        {/* Search */}
        <div className="flex-1 w-full sm:max-w-lg">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
            <Input
              type="text"
              placeholder="Buscar pacientes, citas..."
              className="pl-9 sm:pl-10"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-4 sm:ml-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-gray-200 hover:text-white"
            aria-label="Notificaciones"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-400 ring-2 ring-gray-950" />
          </Button>

          {/* User menu */}
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 sm:gap-3 p-1.5 h-auto text-gray-200 hover:text-white"
                aria-label="Menú de usuario"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 via-secondary-500 to-primary-300 flex items-center justify-center shadow-[0_0_20px_rgba(106,91,255,0.35)]">
                  <span className="text-gray-950 text-sm font-semibold">{initials}</span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-white">
                    {user.email?.split("@")[0]}
                  </p>
                  <p className="text-xs text-gray-500">Administrador</p>
                </div>
                <ChevronDown
                  size={16}
                  className={cn(
                    "hidden sm:block text-gray-500 transition-transform duration-200",
                    isDropdownOpen && "rotate-180"
                  )}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 border-gray-800 bg-gray-900 text-gray-100">
              <DropdownMenuLabel>
                <div>
                  <p className="text-sm font-medium text-white truncate">
                    {user.email}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Administrador</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setIsDropdownOpen(false);
                  router.push("/dashboard/profile");
                }}
              >
                <UserIcon size={16} className="mr-2" />
                Mi Perfil
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsDropdownOpen(false);
                  router.push("/dashboard/settings");
                }}
              >
                <Settings size={16} className="mr-2" />
                Configuración
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="text-error-400 focus:text-error-300 focus:bg-error-500/10"
              >
                <LogOut size={16} className="mr-2" />
                {isLoggingOut ? "Cerrando sesión..." : "Cerrar Sesión"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
