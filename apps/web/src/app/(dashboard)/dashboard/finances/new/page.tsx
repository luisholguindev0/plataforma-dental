"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

interface Patient {
  id: string;
  full_name: string | null;
  whatsapp_number: string;
}

const categories = [
  "Tratamiento",
  "Valoración",
  "Radiografía",
  "Materiales",
  "Nómina",
  "Servicios",
  "Marketing",
  "Otros",
];

const paymentMethods = [
  "Efectivo",
  "Transferencia",
  "Tarjeta Débito",
  "Tarjeta Crédito",
  "Nequi",
  "Daviplata",
  "Otro",
];

export default function NewTransactionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const patientIdParam = searchParams.get("patient");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);

  const [formData, setFormData] = useState({
    patient_id: patientIdParam || "",
    amount: "",
    type: "income",
    category: "Tratamiento",
    description: "",
    payment_method: "Efectivo",
    reference_number: "",
    transaction_date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const loadPatients = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("patients")
        .select("id, full_name, whatsapp_number")
        .order("full_name", { ascending: true });

      if (data) {
        setPatients(data);
      }
    };

    loadPatients();
  }, []);

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

    if (!formData.amount || Number(formData.amount) <= 0) {
      setError("Por favor ingresa un monto válido");
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.from("transactions").insert({
        patient_id: formData.patient_id || null,
        amount: Number(formData.amount),
        type: formData.type,
        category: formData.category,
        description: formData.description || null,
        payment_method: formData.payment_method,
        reference_number: formData.reference_number || null,
        transaction_date: formData.transaction_date,
      } as any); // Type assertion needed due to Supabase type inference limitations

      if (error) {
        setError(error.message);
        return;
      }

      router.push("/dashboard/finances");
      router.refresh();
    } catch {
      setError("Ocurrió un error al crear la transacción");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/finances"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-4"
        >
          <ArrowLeft size={20} />
          Volver a finanzas
        </Link>
        <h1 className="text-2xl font-serif font-bold text-primary-600">
          Nueva Transacción
        </h1>
        <p className="text-gray-600">
          Registra un nuevo ingreso o gasto.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-error-50 border border-error-200 rounded-xl p-4">
            <p className="text-error-600 text-sm">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          {/* Transaction type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Transacción *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label
                className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.type === "income"
                    ? "border-success-500 bg-success-50 text-success-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={formData.type === "income"}
                  onChange={handleChange}
                  className="hidden"
                />
                <span className="font-medium">Ingreso</span>
              </label>
              <label
                className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.type === "expense"
                    ? "border-error-500 bg-error-50 text-error-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={formData.type === "expense"}
                  onChange={handleChange}
                  className="hidden"
                />
                <span className="font-medium">Gasto</span>
              </label>
            </div>
          </div>

          {/* Amount */}
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monto *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  step="1000"
                  required
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg font-semibold bg-white"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha
                </label>
                <input
                  type="date"
                  name="transaction_date"
                  value={formData.transaction_date}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
                />
              </div>
            </div>

            {/* Patient (optional for income) */}
            {formData.type === "income" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paciente (opcional)
                </label>
                <select
                  name="patient_id"
                  value={formData.patient_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="">Sin paciente asignado</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.full_name || patient.whatsapp_number}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Payment method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Método de Pago
                </label>
                <select
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
                >
                  {paymentMethods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reference number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Referencia
                </label>
                <input
                  type="text"
                  name="reference_number"
                  value={formData.reference_number}
                  onChange={handleChange}
                  placeholder="Opcional"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Descripción de la transacción..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none bg-white"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Link
              href="/dashboard/finances"
              className="px-6 py-2.5 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancelar
            </Link>
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save size={20} />
                Guardar Transacción
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

