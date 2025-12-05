import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Users,
  Phone,
  Mail,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import PatientFilters from "@/components/dashboard/patients/PatientFilters";
import PatientActions from "@/components/dashboard/patients/PatientActions";
import { Button } from "@/components/ui/button";

interface PatientsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function PatientsPage({ searchParams }: PatientsPageProps) {
  const params = await searchParams;
  const supabase = await createClient();
  const page = Number(params.page) || 1;
  const perPage = 10;
  const offset = (page - 1) * perPage;

  let query = supabase
    .from("patients")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + perPage - 1);

  if (params.search) {
    // Sanitize search input to prevent SQL injection
    const sanitizedSearch = params.search.replace(/[%_]/g, '');
    if (sanitizedSearch.length > 0) {
      query = query.or(
        `full_name.ilike.%${sanitizedSearch}%,whatsapp_number.ilike.%${sanitizedSearch}%,email.ilike.%${sanitizedSearch}%`
      );
    }
  }

  if (params.status && params.status !== "all") {
    query = query.eq("qualification_status", params.status);
  }

  const { data: patientsData, count } = await query;
  const patients = (patientsData || []) as Array<{
    id: string;
    full_name: string | null;
    whatsapp_number: string;
    email: string | null;
    qualification_status: string;
    qualification_score: number;
    preferred_service: string | null;
    created_at: string;
  }>;
  const totalPages = Math.ceil((count || 0) / perPage);

  const qualificationColors = {
    qualified: "bg-green-100 text-green-700",
    pending: "bg-amber-100 text-amber-700",
    not_qualified: "bg-red-100 text-red-700",
  };

  const qualificationLabels = {
    qualified: "Calificado",
    pending: "Pendiente",
    not_qualified: "No Calificado",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-primary-600">
            Pacientes
          </h1>
          <p className="text-gray-600">
            Gestiona tu base de datos de pacientes y clientes potenciales.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/patients/new">
            <Plus size={20} />
            Nuevo Paciente
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <PatientFilters />

      {/* Patients table/list */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Paciente
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Contacto
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Estado
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Score
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Fecha
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {patients && patients.length > 0 ? (
                patients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center font-semibold text-primary-600">
                          {patient.full_name
                            ? patient.full_name.slice(0, 2).toUpperCase()
                            : patient.whatsapp_number?.slice(-2) || "??"}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {patient.full_name || "Sin nombre"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {patient.preferred_service || "Sin servicio"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone size={14} />
                          {patient.whatsapp_number}
                        </p>
                        {patient.email && (
                          <p className="flex items-center gap-2 text-sm text-gray-500">
                            <Mail size={14} />
                            {patient.email}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          qualificationColors[
                            patient.qualification_status as keyof typeof qualificationColors
                          ]
                        }`}
                      >
                        {
                          qualificationLabels[
                            patient.qualification_status as keyof typeof qualificationLabels
                          ]
                        }
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className={`w-2 h-6 rounded-sm ${
                                i <= (patient.qualification_score || 0)
                                  ? "bg-primary-500"
                                  : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {patient.qualification_score}/4
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(patient.created_at).toLocaleDateString("es-CO", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <PatientActions patientId={patient.id} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Users
                      size={48}
                      className="mx-auto text-gray-300 mb-3"
                    />
                    <p className="text-gray-500">
                      No se encontraron pacientes
                    </p>
                    <Link
                      href="/dashboard/patients/new"
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm mt-2 inline-block"
                    >
                      Agregar primer paciente →
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-gray-100">
          {patients && patients.length > 0 ? (
            patients.map((patient) => (
              <div key={patient.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center font-semibold text-primary-600">
                      {patient.full_name
                        ? patient.full_name.slice(0, 2).toUpperCase()
                        : patient.whatsapp_number?.slice(-2) || "??"}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {patient.full_name || "Sin nombre"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {patient.whatsapp_number}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      qualificationColors[
                        patient.qualification_status as keyof typeof qualificationColors
                      ]
                    }`}
                  >
                    {
                      qualificationLabels[
                        patient.qualification_status as keyof typeof qualificationLabels
                      ]
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-4 rounded-sm ${
                            i <= (patient.qualification_score || 0)
                              ? "bg-primary-500"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      Score: {patient.qualification_score}/4
                    </span>
                  </div>
                  <Link
                    href={`/dashboard/patients/${patient.id}`}
                    className="text-sm text-primary-600 font-medium"
                  >
                    Ver detalles →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <Users
                size={48}
                className="mx-auto text-gray-300 mb-3"
              />
              <p className="text-gray-500">
                No se encontraron pacientes
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Mostrando {offset + 1} - {Math.min(offset + perPage, count || 0)} de{" "}
              {count} pacientes
            </p>
            <div className="flex gap-2">
              {page > 1 && (
                <Link
                  href={`/dashboard/patients?page=${page - 1}${
                    params.search ? `&search=${params.search}` : ""
                  }${params.status ? `&status=${params.status}` : ""}`}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Anterior
                </Link>
              )}
              {page < totalPages && (
                <Link
                  href={`/dashboard/patients?page=${page + 1}${
                    params.search ? `&search=${params.search}` : ""
                  }${params.status ? `&status=${params.status}` : ""}`}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Siguiente
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

