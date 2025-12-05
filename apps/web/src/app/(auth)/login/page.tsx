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
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center p-4">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
              <span className="text-white font-serif font-bold text-2xl">JM</span>
            </div>
            <div className="text-left">
              <p className="font-serif text-white font-semibold text-xl leading-tight">
                Dr. Jhoiner Marquez
              </p>
              <p className="text-xs text-white/60">Panel de Administración</p>
            </div>
          </Link>
        </div>

        {/* Login card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif font-bold text-[var(--color-primary)] mb-2">
              Bienvenido
            </h1>
            <p className="text-[var(--color-gray-600)]">
              Ingresa tus credenciales para acceder al panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--color-gray-700)] mb-2"
              >
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={20} className="text-[var(--color-gray-400)]" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-[var(--color-gray-200)] rounded-xl focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all outline-none"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[var(--color-gray-700)] mb-2"
              >
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={20} className="text-[var(--color-gray-400)]" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-3 border border-[var(--color-gray-200)] rounded-xl focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-[var(--color-gray-400)]" />
                  ) : (
                    <Eye size={20} className="text-[var(--color-gray-400)]" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-[var(--color-gray-500)] hover:text-[var(--color-primary)] transition-colors"
            >
              ← Volver al sitio web
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-white/60 text-sm">
          © {new Date().getFullYear()} Dr. Jhoiner Marquez. Panel de Administración.
        </p>
      </div>
    </div>
  );
}

