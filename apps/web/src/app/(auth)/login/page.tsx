"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const validate = () => {
    if (!email || !password) {
      return "Completa tu correo y contraseña.";
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return "Ingresa un correo válido.";
    }
    if (password.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setStatus(null);

    const validationError = validate();
    if (validationError) {
      setIsLoading(false);
      setError(validationError);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(
          error.message === "Invalid login credentials"
            ? "Credenciales inválidas. Por favor verifica tu email y contraseña."
            : error.message
        );
        return;
      }

      setStatus("Acceso concedido. Redirigiendo...");
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(106,91,255,0.18),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(39,197,255,0.18),transparent_30%),linear-gradient(135deg,#05060a_0%,#0b0f18_100%)] p-4 sm:p-6">
      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.25]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      {/* Decorative glows */}
      <div className="absolute top-0 right-0 h-72 w-72 -translate-y-1/2 translate-x-1/3 rounded-full bg-primary-500/20 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-80 w-80 translate-y-1/2 -translate-x-1/3 rounded-full bg-secondary-500/16 blur-[120px]" />

      <div className="relative w-full max-w-md z-10">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <Link href="/" className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary-500 via-secondary-500 to-primary-300 flex items-center justify-center shadow-[0_0_45px_rgba(106,91,255,0.45)] group-hover:shadow-[0_0_60px_rgba(106,91,255,0.55)] transition-all duration-300">
              <span className="text-gray-950 font-serif font-bold text-2xl sm:text-3xl">JM</span>
            </div>
            <div className="text-center sm:text-left">
              <p className="font-serif text-white font-semibold text-xl sm:text-2xl leading-tight">
                Dr. Jhoiner Marquez
              </p>
              <p className="text-sm text-gray-400 mt-1">Panel de administración</p>
            </div>
          </Link>
        </div>

        {/* Login card */}
        <div className="rounded-3xl border border-gray-800 bg-gray-900/85 p-6 sm:p-8 md:p-10 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.95)] backdrop-blur animate-fade-in delay-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold bg-gradient-to-r from-primary-200 to-secondary-200 bg-clip-text text-transparent mb-3">
              Bienvenido
            </h1>
            <p className="text-gray-300 text-sm sm:text-base">
              Ingresa tus credenciales para acceder al panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Error message */}
            {error && (
              <div className="rounded-xl border border-error-500/30 bg-error-500/10 p-4 text-error-100 animate-fade-in" role="alert">
                <p className="text-sm">{error}</p>
              </div>
            )}
            {status && (
              <div className="rounded-xl border border-primary-500/30 bg-primary-500/10 p-4 text-primary-100 animate-fade-in" role="status">
                <p className="text-sm">{status}</p>
              </div>
            )}

            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-200"
              >
                Correo electrónico
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors z-10">
                  <Mail
                    size={20}
                    className={`transition-colors ${email ? "text-primary-100" : "text-gray-500"}`}
                  />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="pl-12"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-200"
              >
                Contraseña
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors z-10">
                  <Lock
                    size={20}
                    className={`transition-colors ${password ? "text-primary-100" : "text-gray-500"}`}
                  />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors z-10"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 sm:py-4 text-base sm:text-lg"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-primary-100 transition-colors group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Volver al sitio web</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-gray-500 text-xs sm:text-sm animate-fade-in delay-200">
          © {new Date().getFullYear()} Dr. Jhoiner Marquez. Panel de Administración.
        </p>
      </div>
    </div>
  );
}
