"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const serviceOptions = [
  { value: "estetica_dental", label: "Estética Dental" },
  { value: "diseno_sonrisa", label: "Diseño de Sonrisa" },
  { value: "rehabilitacion_oral", label: "Rehabilitación Oral" },
  { value: "valoracion", label: "Valoración" },
  { value: "otro", label: "Otro" },
];

export default function NewPatientPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    whatsapp_number: "",
    full_name: "",
    email: "",
    preferred_service: "",
    notes: "",
    address: "",
    has_budget: false,
    has_urgency: false,
    is_local: false,
    interested_in_appointment: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!formData.whatsapp_number) {
      setError("El número de WhatsApp es obligatorio");
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.from("patients").insert({
        whatsapp_number: formData.whatsapp_number,
        full_name: formData.full_name || null,
        email: formData.email || null,
        preferred_service: formData.preferred_service || null,
        notes: formData.notes || null,
        address: formData.address || null,
        has_budget: formData.has_budget,
        has_urgency: formData.has_urgency,
        is_local: formData.is_local,
        interested_in_appointment: formData.interested_in_appointment,
      } as any); // Type assertion needed due to Supabase type inference limitations

      if (error) {
        if (error.code === "23505") {
          setError("Ya existe un paciente con este número de WhatsApp");
        } else {
          setError(error.message);
        }
        return;
      }

      router.push("/dashboard/patients");
      router.refresh();
    } catch {
      setError("Ocurrió un error al crear el paciente");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/patients"
          className="inline-flex items-center gap-2 text-[var(--color-gray-600)] hover:text-[var(--color-primary)] mb-4"
        >
          <ArrowLeft size={20} />
          Volver a pacientes
        </Link>
        <h1 className="text-2xl font-serif font-bold text-[var(--color-primary)]">
          Nuevo Paciente
        </h1>
        <p className="text-[var(--color-gray-600)]">
          Completa la información del nuevo paciente.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          <h2 className="text-lg font-semibold text-[var(--color-gray-800)]">
            Información de Contacto
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                Número de WhatsApp *
              </label>
              <input
                type="tel"
                name="whatsapp_number"
                value={formData.whatsapp_number}
                onChange={handleChange}
                placeholder="573001234567"
                required
                className="w-full px-4 py-2.5 border border-[var(--color-gray-200)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
              />
              <p className="mt-1 text-xs text-[var(--color-gray-500)]">
                Incluir código de país (ej: 57 para Colombia)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Juan Pérez"
                className="w-full px-4 py-2.5 border border-[var(--color-gray-200)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="juan@email.com"
                className="w-full px-4 py-2.5 border border-[var(--color-gray-200)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                Servicio de Interés
              </label>
              <select
                name="preferred_service"
                value={formData.preferred_service}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-[var(--color-gray-200)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
              >
                <option value="">Seleccionar servicio</option>
                {serviceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Dirección
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Calle 123 #45-67, Barranquilla"
              className="w-full px-4 py-2.5 border border-[var(--color-gray-200)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Notas
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Información adicional sobre el paciente..."
              className="w-full px-4 py-2.5 border border-[var(--color-gray-200)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all resize-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          <h2 className="text-lg font-semibold text-[var(--color-gray-800)]">
            Criterios de Calificación
          </h2>
          <p className="text-sm text-[var(--color-gray-500)]">
            Estos criterios determinan automáticamente el estado de calificación del paciente.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-gray-200)] hover:bg-[var(--color-gray-50)] cursor-pointer transition-colors">
              <input
                type="checkbox"
                name="has_budget"
                checked={formData.has_budget}
                onChange={handleChange}
                className="w-5 h-5 rounded border-[var(--color-gray-300)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
              />
              <div>
                <p className="font-medium text-[var(--color-gray-800)]">
                  Tiene presupuesto
                </p>
                <p className="text-sm text-[var(--color-gray-500)]">
                  El paciente tiene capacidad de pago
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-gray-200)] hover:bg-[var(--color-gray-50)] cursor-pointer transition-colors">
              <input
                type="checkbox"
                name="has_urgency"
                checked={formData.has_urgency}
                onChange={handleChange}
                className="w-5 h-5 rounded border-[var(--color-gray-300)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
              />
              <div>
                <p className="font-medium text-[var(--color-gray-800)]">
                  Tiene urgencia
                </p>
                <p className="text-sm text-[var(--color-gray-500)]">
                  Necesita atención pronto
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-gray-200)] hover:bg-[var(--color-gray-50)] cursor-pointer transition-colors">
              <input
                type="checkbox"
                name="is_local"
                checked={formData.is_local}
                onChange={handleChange}
                className="w-5 h-5 rounded border-[var(--color-gray-300)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
              />
              <div>
                <p className="font-medium text-[var(--color-gray-800)]">
                  Es local
                </p>
                <p className="text-sm text-[var(--color-gray-500)]">
                  Vive en Barranquilla o cercanías
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-gray-200)] hover:bg-[var(--color-gray-50)] cursor-pointer transition-colors">
              <input
                type="checkbox"
                name="interested_in_appointment"
                checked={formData.interested_in_appointment}
                onChange={handleChange}
                className="w-5 h-5 rounded border-[var(--color-gray-300)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
              />
              <div>
                <p className="font-medium text-[var(--color-gray-800)]">
                  Interesado en cita
                </p>
                <p className="text-sm text-[var(--color-gray-500)]">
                  Quiere agendar una valoración
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link
            href="/dashboard/patients"
            className="px-6 py-2.5 text-[var(--color-gray-600)] hover:text-[var(--color-gray-800)] font-medium transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save size={20} />
                Guardar Paciente
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

