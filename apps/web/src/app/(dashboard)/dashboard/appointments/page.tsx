import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  User,
} from "lucide-react";
import AppointmentCalendar from "@/components/dashboard/appointments/AppointmentCalendar";
import { Button } from "@/components/ui/button";

interface AppointmentsPageProps {
  searchParams: Promise<{
    date?: string;
    view?: "day" | "week" | "month";
  }>;
}

export default async function AppointmentsPage({
  searchParams,
}: AppointmentsPageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  // Get current date or from params
  const currentDate = params.date ? new Date(params.date) : new Date();
  const view = params.view || "week";

  // Calculate date range based on view
  let startDate: Date;
  let endDate: Date;

  if (view === "day") {
    startDate = new Date(currentDate);
    endDate = new Date(currentDate);
  } else if (view === "week") {
    startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - currentDate.getDay());
    endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
  } else {
    startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  }

  // Get appointments in range
  const { data: appointmentsData } = await supabase
    .from("appointments")
    .select("*, patient:patients(id, full_name, whatsapp_number)")
    .gte("appointment_date", startDate.toISOString().split("T")[0])
    .lte("appointment_date", endDate.toISOString().split("T")[0])
    .order("appointment_date", { ascending: true })
    .order("appointment_time", { ascending: true });

  const appointments = (appointmentsData || []) as Array<{
    id: string;
    appointment_date: string;
    appointment_time: string;
    service_type: string;
    status: string;
    patient: {
      id: string;
      full_name: string | null;
      whatsapp_number: string;
    } | null;
  }>;

  // Get today's appointments for sidebar
  const today = new Date().toISOString().split("T")[0];
  const { data: todayAppointmentsData } = await supabase
    .from("appointments")
    .select("*, patient:patients(id, full_name, whatsapp_number)")
    .eq("appointment_date", today)
    .neq("status", "cancelled")
    .order("appointment_time", { ascending: true });

  const todayAppointments = (todayAppointmentsData || []) as Array<{
    id: string;
    appointment_time: string;
    service_type: string;
    status: string;
    patient: {
      id: string;
      full_name: string | null;
      whatsapp_number: string;
    } | null;
  }>;

  const statusColors: Record<string, string> = {
    scheduled: "bg-blue-500",
    confirmed: "bg-green-500",
    completed: "bg-gray-400",
    cancelled: "bg-red-500",
    no_show: "bg-orange-500",
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
          <h1 className="text-2xl font-serif font-bold text-primary-600">
            Citas
          </h1>
          <p className="text-gray-600">
            Gestiona y organiza las citas con tus pacientes.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/appointments/new">
            <Plus size={20} />
            Nueva Cita
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <AppointmentCalendar
            appointments={appointments}
            currentDate={currentDate}
            view={view}
          />
        </div>

        {/* Sidebar - Today's appointments */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CalendarIcon size={20} className="text-primary-600" />
              Hoy
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {new Date().toLocaleDateString("es-CO", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>

            {todayAppointments && todayAppointments.length > 0 ? (
              <div className="space-y-3">
                {todayAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-1 h-full min-h-[40px] rounded-full ${
                          statusColors[apt.status]
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock
                            size={14}
                            className="text-gray-400"
                          />
                          <span className="text-sm font-medium text-gray-800">
                            {apt.appointment_time?.slice(0, 5)}
                          </span>
                        </div>
                        <p className="font-medium text-gray-800 truncate">
                          {apt.patient?.full_name || "Sin nombre"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {serviceLabels[apt.service_type] || apt.service_type}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <CalendarIcon
                  size={40}
                  className="mx-auto text-gray-300 mb-2"
                />
                <p className="text-sm text-gray-500">
                  No hay citas para hoy
                </p>
              </div>
            )}
          </div>

          {/* Status legend */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">
              Estados
            </h3>
            <div className="space-y-2">
              {[
                { status: "scheduled", label: "Agendada" },
                { status: "confirmed", label: "Confirmada" },
                { status: "completed", label: "Completada" },
                { status: "cancelled", label: "Cancelada" },
                { status: "no_show", label: "No asistió" },
              ].map((item) => (
                <div key={item.status} className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${statusColors[item.status]}`}
                  />
                  <span className="text-sm text-gray-600">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

