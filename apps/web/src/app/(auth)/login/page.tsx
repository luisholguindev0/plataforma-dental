"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message === "Invalid login credentials" 
          ? "Credenciales inválidas. Por favor verifica tu email y contraseña."
          : error.message);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error("Login error:", error);
      setError("Ocurrió un error. Por favor intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Elegant background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--luxury-gray-50)] via-[var(--gold-champagne)]/30 to-[var(--luxury-gray-100)]" />
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[var(--gold-primary)]/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[var(--gold-light)]/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative w-full max-w-md z-10">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <Link href="/" className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[var(--gold-primary)] to-[var(--gold-light)] flex items-center justify-center shadow-lg shadow-[var(--gold-glow)] group-hover:shadow-xl group-hover:shadow-[var(--gold-glow)] transition-all duration-300">
              <span className="text-white font-serif font-bold text-2xl sm:text-3xl">JM</span>
            </div>
            <div className="text-center sm:text-left">
              <p className="font-serif text-[var(--luxury-gray-900)] font-semibold text-xl sm:text-2xl leading-tight">
                Dr. Jhoiner Marquez
              </p>
              <p className="text-sm text-[var(--luxury-gray-600)] mt-1">Panel de Administración</p>
            </div>
          </Link>
        </div>

        {/* Login card with glassmorphism */}
        <div className="glass-panel-premium rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 animate-fade-in delay-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] bg-clip-text text-transparent mb-3">
              Bienvenido
            </h1>
            <p className="text-[var(--luxury-gray-600)] text-sm sm:text-base">
              Ingresa tus credenciales para acceder al panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-fade-in">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--luxury-gray-700)] mb-2"
              >
                Correo electrónico
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors">
                  <Mail size={20} className={`transition-colors ${email ? "text-[var(--gold-primary)]" : "text-[var(--luxury-gray-400)]"}`} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-[var(--luxury-gray-200)] rounded-xl focus:ring-2 focus:ring-[var(--gold-primary)] focus:border-[var(--gold-primary)] transition-all outline-none bg-white hover:border-[var(--luxury-gray-300)]"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[var(--luxury-gray-700)] mb-2"
              >
                Contraseña
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors">
                  <Lock size={20} className={`transition-colors ${password ? "text-[var(--gold-primary)]" : "text-[var(--luxury-gray-400)]"}`} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-3 border-2 border-[var(--luxury-gray-200)] rounded-xl focus:ring-2 focus:ring-[var(--gold-primary)] focus:border-[var(--gold-primary)] transition-all outline-none bg-white hover:border-[var(--luxury-gray-300)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:opacity-70 transition-opacity"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-[var(--luxury-gray-400)]" />
                  ) : (
                    <Eye size={20} className="text-[var(--luxury-gray-400)]" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-premium w-full py-3.5 sm:py-4 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[var(--luxury-gray-600)] hover:text-[var(--gold-primary)] transition-colors group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Volver al sitio web</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-[var(--luxury-gray-500)] text-xs sm:text-sm animate-fade-in delay-200">
          © {new Date().getFullYear()} Dr. Jhoiner Marquez. Panel de Administración.
        </p>
      </div>
    </div>
  );
}

