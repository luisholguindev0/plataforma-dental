import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PatientDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PatientDetailPage({ params }: PatientDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Get patient with related data
  const { data: patientData, error } = await supabase
    .from("patients")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !patientData) {
    notFound();
  }

  const patient = patientData as {
    id: string;
    full_name: string | null;
    whatsapp_number: string;
    email: string | null;
    qualification_status: string;
    qualification_score: number;
    has_budget: boolean;
    has_urgency: boolean;
    is_local: boolean;
    interested_in_appointment: boolean;
    preferred_service: string | null;
    notes: string | null;
    address: string | null;
    created_at: string;
    updated_at: string;
    last_contact_at: string;
  };

  // Get appointments
  const { data: appointmentsData } = await supabase
    .from("appointments")
    .select("*")
    .eq("patient_id", id)
    .order("appointment_date", { ascending: false })
    .limit(5);

  const appointments = (appointmentsData || []) as Array<{
    id: string;
    appointment_date: string;
    appointment_time: string;
    service_type: string;
    status: string;
    notes: string | null;
  }>;

  // Get transactions
  const { data: transactionsData } = await supabase
    .from("transactions")
    .select("*")
    .eq("patient_id", id)
    .order("transaction_date", { ascending: false })
    .limit(5);

  const transactions = (transactionsData || []) as Array<{
    id: string;
    type: "income" | "expense";
    amount: number;
    category: string | null;
    description: string | null;
    transaction_date: string;
  }>;

  // Get documents
  const { data: documentsData } = await supabase
    .from("patient_documents")
    .select("*")
    .eq("patient_id", id)
    .order("uploaded_at", { ascending: false })
    .limit(5);

  const documents = (documentsData || []) as Array<{
    id: string;
    file_name: string;
    file_path: string;
    file_size: number | null;
    mime_type: string | null;
    document_type: string | null;
    description: string | null;
  }>;

  // Calculate financial summary
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const qualificationColors = {
    qualified: "bg-success-100 text-success-700 border-success-200",
    pending: "bg-warning-100 text-warning-700 border-warning-200",
    not_qualified: "bg-error-100 text-error-700 border-error-200",
  };

  const qualificationLabels = {
    qualified: "Calificado",
    pending: "Pendiente",
    not_qualified: "No Calificado",
  };

  const serviceLabels: Record<string, string> = {
    estetica_dental: "Estética Dental",
    diseno_sonrisa: "Diseño de Sonrisa",
    rehabilitacion_oral: "Rehabilitación Oral",
    valoracion: "Valoración",
    otro: "Otro",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            href="/dashboard/patients"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-4"
          >
            <ArrowLeft size={20} />
            Volver a pacientes
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center font-bold text-2xl text-primary-600">
              {patient.full_name
                ? patient.full_name.slice(0, 2).toUpperCase()
                : patient.whatsapp_number?.slice(-2) || "??"}
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-primary-600">
                {patient.full_name || "Sin nombre"}
              </h1>
              <p className="text-gray-600">
                {patient.whatsapp_number}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            asChild
            variant="secondary"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <a
              href={`https://wa.me/${patient.whatsapp_number}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageSquare size={18} />
              WhatsApp
            </a>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/dashboard/patients/${id}/edit`}>
              <Edit size={18} />
              Editar
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact info */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Información de Contacto
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                <Phone size={20} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Teléfono</p>
                  <p className="font-medium text-gray-800">
                    {patient.whatsapp_number}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                <Mail size={20} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium text-gray-800">
                    {patient.email || "No registrado"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 sm:col-span-2">
                <MapPin size={20} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Dirección</p>
                  <p className="font-medium text-gray-800">
                    {patient.address || "No registrada"}
                  </p>
                </div>
              </div>
            </div>

            {patient.notes && (
              <div className="mt-4 p-4 rounded-xl bg-gray-50">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Notas
                </p>
                <p className="text-gray-800">{patient.notes}</p>
              </div>
            )}
          </div>

          {/* Appointments */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Citas
              </h2>
              <Link
                href={`/dashboard/appointments/new?patient=${id}`}
                className="text-sm text-primary-600 font-medium hover:text-primary-700"
              >
                + Nueva cita
              </Link>
            </div>
            {appointments && appointments.length > 0 ? (
              <div className="space-y-3">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <Calendar size={18} className="text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-800">
                          {new Date(apt.appointment_date).toLocaleDateString("es-CO", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                          })}
                        </p>
                        <p className="text-sm text-gray-500">
                          {apt.appointment_time?.slice(0, 5)} -{" "}
                          {serviceLabels[apt.service_type] || apt.service_type}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        apt.status === "completed"
                          ? "bg-gray-100 text-gray-600"
                          : apt.status === "confirmed"
                          ? "bg-success-100 text-success-700"
                          : apt.status === "cancelled"
                          ? "bg-error-100 text-error-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {apt.status === "completed"
                        ? "Completada"
                        : apt.status === "confirmed"
                        ? "Confirmada"
                        : apt.status === "cancelled"
                        ? "Cancelada"
                        : "Agendada"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No hay citas registradas
              </p>
            )}
          </div>

          {/* Transactions */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Transacciones
              </h2>
              <Link
                href={`/dashboard/finances/new?patient=${id}`}
                className="text-sm text-primary-600 font-medium hover:text-primary-700"
              >
                + Nueva transacción
              </Link>
            </div>
            {transactions && transactions.length > 0 ? (
              <div className="space-y-3">
                {transactions.map((trx) => (
                  <div
                    key={trx.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <DollarSign
                        size={18}
                        className={
                          trx.type === "income"
                            ? "text-success-500"
                            : "text-error-500"
                        }
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {trx.description || trx.category || "Transacción"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(trx.transaction_date).toLocaleDateString("es-CO")}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`font-semibold ${
                        trx.type === "income" ? "text-success-600" : "text-error-600"
                      }`}
                    >
                      {trx.type === "income" ? "+" : "-"}$
                      {Number(trx.amount).toLocaleString("es-CO")}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No hay transacciones registradas
              </p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Qualification status */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Estado de Calificación
            </h2>
            <div
              className={`p-4 rounded-xl border ${
                qualificationColors[
                  patient.qualification_status as keyof typeof qualificationColors
                ]
              }`}
            >
              <p className="font-semibold text-lg">
                {
                  qualificationLabels[
                    patient.qualification_status as keyof typeof qualificationLabels
                  ]
                }
              </p>
              <p className="text-sm opacity-80">
                Score: {patient.qualification_score}/4
              </p>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-sm text-gray-600">
                  Tiene presupuesto
                </span>
                {patient.has_budget ? (
                  <CheckCircle size={18} className="text-success-500" />
                ) : (
                  <XCircle size={18} className="text-gray-300" />
                )}
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-sm text-gray-600">
                  Tiene urgencia
                </span>
                {patient.has_urgency ? (
                  <CheckCircle size={18} className="text-success-500" />
                ) : (
                  <XCircle size={18} className="text-gray-300" />
                )}
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-sm text-gray-600">Es local</span>
                {patient.is_local ? (
                  <CheckCircle size={18} className="text-success-500" />
                ) : (
                  <XCircle size={18} className="text-gray-300" />
                )}
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-sm text-gray-600">
                  Interesado en cita
                </span>
                {patient.interested_in_appointment ? (
                  <CheckCircle size={18} className="text-success-500" />
                ) : (
                  <XCircle size={18} className="text-gray-300" />
                )}
              </div>
            </div>
          </div>

          {/* Service interest */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Servicio de Interés
            </h2>
            <div className="p-4 rounded-xl bg-primary-500/10 border border-primary-500/20">
              <p className="font-medium text-primary-700">
                {patient.preferred_service
                  ? serviceLabels[patient.preferred_service]
                  : "No especificado"}
              </p>
            </div>
          </div>

          {/* Financial summary */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Resumen Financiero
            </h2>
            <div className="p-4 rounded-xl bg-green-50 border border-green-100">
              <p className="text-sm text-green-600">Total Pagado</p>
              <p className="text-2xl font-bold text-green-700">
                ${totalIncome.toLocaleString("es-CO")}
              </p>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Documentos
              </h2>
              <Link
                href={`/dashboard/documents?patient=${id}`}
                className="text-sm text-primary-600 font-medium hover:text-primary-700"
              >
                Ver todos
              </Link>
            </div>
            {documents && documents.length > 0 ? (
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
                  >
                    <FileText size={18} className="text-gray-400" />
                    <span className="text-sm text-gray-700 truncate">
                      {doc.file_name}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-2">
                Sin documentos
              </p>
            )}
          </div>

          {/* Dates */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Fechas
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Registrado</p>
                  <p className="text-sm text-gray-700">
                    {new Date(patient.created_at).toLocaleDateString("es-CO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">
                    Último contacto
                  </p>
                  <p className="text-sm text-gray-700">
                    {new Date(patient.last_contact_at).toLocaleDateString("es-CO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

