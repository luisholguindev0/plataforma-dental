"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { AppointmentInsert } from "database/types";

const serviceOptions = [
  { value: "valoracion", label: "Valoración" },
  { value: "estetica_dental", label: "Estética Dental" },
  { value: "diseno_sonrisa", label: "Diseño de Sonrisa" },
  { value: "rehabilitacion_oral", label: "Rehabilitación Oral" },
  { value: "otro", label: "Otro" },
];

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

interface Patient {
  id: string;
  full_name: string | null;
  whatsapp_number: string;
}

export default function NewAppointmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const patientIdParam = searchParams.get("patient");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const [formData, setFormData] = useState({
    patient_id: patientIdParam || "",
    appointment_date: "",
    appointment_time: "",
    service_type: "valoracion",
    notes: "",
  });

  // Load patients
  useEffect(() => {
    const loadPatients = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("patients")
        .select("id, full_name, whatsapp_number")
        .order("full_name", { ascending: true });

      if (error) {
        console.error("Error loading patients:", error);
        return;
      }

      if (data) {
        const typedData = data as Patient[];
        setPatients(typedData);

        // If patient ID is in params, find and select that patient
        if (patientIdParam) {
          const patient = typedData.find((p) => p.id === patientIdParam);
          if (patient) {
            setSelectedPatient(patient);
          }
        }
      }
    };

    loadPatients();
  }, [patientIdParam]);

  const filteredPatients = patients.filter(
    (p) =>
      p.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.whatsapp_number.includes(searchTerm)
  );

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setFormData((prev) => ({ ...prev, patient_id: patient.id }));
    setShowPatientDropdown(false);
    setSearchTerm("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!formData.patient_id || !formData.appointment_date || !formData.appointment_time) {
      setError("Por favor completa todos los campos obligatorios");
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const appointmentData: AppointmentInsert = {
        patient_id: formData.patient_id,
        appointment_date: formData.appointment_date,
        appointment_time: formData.appointment_time,
        service_type: formData.service_type as "valoracion" | "estetica_dental" | "diseno_sonrisa" | "rehabilitacion_oral" | "otro",
        duration_minutes: 60,
        notes: formData.notes || null,
        status: "scheduled",
        confirmation_sent: false,
        reminder_sent: false,
        cancellation_reason: null,
      };
      // Type assertion needed due to Supabase type inference limitations with custom Database types
      const { error } = await supabase
        .from("appointments")
        .insert(appointmentData as any);

      if (error) {
        if (error.code === "23505") {
          setError("Ya existe una cita en este horario");
        } else {
          setError(error.message);
        }
        return;
      }

      router.push("/dashboard/appointments");
      router.refresh();
    } catch {
      setError("Ocurrió un error al crear la cita");
    } finally {
      setIsLoading(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/appointments"
          className="inline-flex items-center gap-2 text-[var(--color-gray-600)] hover:text-[var(--color-primary)] mb-4"
        >
          <ArrowLeft size={20} />
          Volver a citas
        </Link>
        <h1 className="text-2xl font-serif font-bold text-[var(--color-primary)]">
          Nueva Cita
        </h1>
        <p className="text-[var(--color-gray-600)]">
          Programa una nueva cita para un paciente.
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
          {/* Patient selector */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Paciente *
            </label>
            <div className="relative">
              {selectedPatient ? (
                <div className="flex items-center justify-between p-3 border border-[var(--color-gray-200)] rounded-xl bg-[var(--color-gray-50)]">
                  <div>
                    <p className="font-medium text-[var(--color-gray-800)]">
                      {selectedPatient.full_name || "Sin nombre"}
                    </p>
                    <p className="text-sm text-[var(--color-gray-500)]">
                      {selectedPatient.whatsapp_number}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPatient(null);
                      setFormData((prev) => ({ ...prev, patient_id: "" }));
                    }}
                    className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-dark)]"
                  >
                    Cambiar
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-gray-400)]"
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowPatientDropdown(true);
                    }}
                    onFocus={() => setShowPatientDropdown(true)}
                    placeholder="Buscar paciente por nombre o teléfono..."
                    className="w-full pl-10 pr-4 py-2.5 border border-[var(--color-gray-200)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
                  />
                  {showPatientDropdown && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowPatientDropdown(false)}
                      />
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[var(--color-gray-200)] rounded-xl shadow-lg max-h-60 overflow-y-auto z-20">
                        {filteredPatients.length > 0 ? (
                          filteredPatients.map((patient) => (
                            <button
                              key={patient.id}
                              type="button"
                              onClick={() => handlePatientSelect(patient)}
                              className="w-full text-left px-4 py-3 hover:bg-[var(--color-gray-50)] transition-colors"
                            >
                              <p className="font-medium text-[var(--color-gray-800)]">
                                {patient.full_name || "Sin nombre"}
                              </p>
                              <p className="text-sm text-[var(--color-gray-500)]">
                                {patient.whatsapp_number}
                              </p>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-center text-[var(--color-gray-500)]">
                            No se encontraron pacientes
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Date and time */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                Fecha *
              </label>
              <input
                type="date"
                name="appointment_date"
                value={formData.appointment_date}
                onChange={handleChange}
                min={today}
                required
                className="w-full px-4 py-2.5 border border-[var(--color-gray-200)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                Hora *
              </label>
              <select
                name="appointment_time"
                value={formData.appointment_time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-[var(--color-gray-200)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
              >
                <option value="">Seleccionar hora</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Service type */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Tipo de Servicio
            </label>
            <select
              name="service_type"
              value={formData.service_type}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-[var(--color-gray-200)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
            >
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Notas
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Notas adicionales sobre la cita..."
              className="w-full px-4 py-2.5 border border-[var(--color-gray-200)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all resize-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link
            href="/dashboard/appointments"
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
                Guardar Cita
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

