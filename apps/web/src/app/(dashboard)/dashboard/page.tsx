import { createClient } from "@/lib/supabase/server";
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

async function getDashboardStats() {
  const supabase = await createClient();

  // Get patients count
  const { count: patientsCount } = await supabase
    .from("patients")
    .select("*", { count: "exact", head: true });

  // Get qualified patients count
  const { count: qualifiedCount } = await supabase
    .from("patients")
    .select("*", { count: "exact", head: true })
    .eq("qualification_status", "qualified");

  // Get today's appointments
  const today = new Date().toISOString().split("T")[0];
  const { count: todayAppointments } = await supabase
    .from("appointments")
    .select("*", { count: "exact", head: true })
    .eq("appointment_date", today)
    .neq("status", "cancelled");

  // Get this month's income
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  const { data: monthTransactionsData } = await supabase
    .from("transactions")
    .select("amount")
    .eq("type", "income")
    .gte("transaction_date", startOfMonth.toISOString().split("T")[0]);

  const monthTransactions = (monthTransactionsData || []) as Array<{ amount: number }>;
  const monthlyIncome = monthTransactions.reduce((sum, t) => sum + Number(t.amount), 0);

  // Get pending appointments (today)
  const { data: pendingAppointmentsData } = await supabase
    .from("appointments")
    .select("*, patient:patients(full_name, whatsapp_number)")
    .eq("appointment_date", today)
    .in("status", ["scheduled", "confirmed"])
    .order("appointment_time", { ascending: true })
    .limit(5);

  const pendingAppointments = (pendingAppointmentsData || []) as Array<{
    id: string;
    appointment_time: string;
    service_type: string;
    status: string;
    patient: {
      full_name: string | null;
      whatsapp_number: string;
    } | null;
    [key: string]: unknown;
  }>;

  // Get recent patients
  const { data: recentPatientsData } = await supabase
    .from("patients")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  const recentPatients = (recentPatientsData || []) as Array<{
    id: string;
    full_name: string | null;
    whatsapp_number: string;
    qualification_status: string;
    [key: string]: unknown;
  }>;

  return {
    patientsCount: patientsCount || 0,
    qualifiedCount: qualifiedCount || 0,
    todayAppointments: todayAppointments || 0,
    monthlyIncome,
    pendingAppointments,
    recentPatients,
  };
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      title: "Total Pacientes",
      value: stats.patientsCount,
      icon: Users,
      color: "blue",
      href: "/dashboard/patients",
    },
    {
      title: "Pacientes Calificados",
      value: stats.qualifiedCount,
      icon: CheckCircle,
      color: "green",
      href: "/dashboard/patients?status=qualified",
    },
    {
      title: "Citas Hoy",
      value: stats.todayAppointments,
      icon: Calendar,
      color: "purple",
      href: "/dashboard/appointments",
    },
    {
      title: "Ingresos del Mes",
      value: `$${stats.monthlyIncome.toLocaleString("es-CO")}`,
      icon: DollarSign,
      color: "amber",
      href: "/dashboard/finances",
    },
  ];

  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      icon: "bg-blue-100 text-blue-600",
      text: "text-blue-600",
    },
    green: {
      bg: "bg-emerald-50",
      icon: "bg-emerald-100 text-emerald-600",
      text: "text-emerald-600",
    },
    purple: {
      bg: "bg-purple-50",
      icon: "bg-purple-100 text-purple-600",
      text: "text-purple-600",
    },
    amber: {
      bg: "bg-amber-50",
      icon: "bg-amber-100 text-amber-600",
      text: "text-amber-600",
    },
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-[var(--color-primary)]">
          Dashboard
        </h1>
        <p className="text-[var(--color-gray-600)]">
          Bienvenido al panel de control. Aquí tienes un resumen de tu negocio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const colors = colorClasses[stat.color as keyof typeof colorClasses];
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[var(--color-gray-500)]">{stat.title}</p>
                  <p className="text-3xl font-bold text-[var(--color-gray-800)] mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${colors.icon}`}>
                  <stat.icon size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-sm">
                <TrendingUp size={16} className="text-green-500" />
                <span className="text-green-500 font-medium">+12%</span>
                <span className="text-[var(--color-gray-400)]">vs mes anterior</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Today's Appointments */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-[var(--color-gray-100)]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--color-gray-800)]">
                Citas de Hoy
              </h2>
              <Link
                href="/dashboard/appointments"
                className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] font-medium"
              >
                Ver todas →
              </Link>
            </div>
          </div>
          <div className="p-6">
            {stats.pendingAppointments.length === 0 ? (
              <div className="text-center py-8">
                <Calendar
                  size={48}
                  className="mx-auto text-[var(--color-gray-300)] mb-3"
                />
                <p className="text-[var(--color-gray-500)]">
                  No hay citas programadas para hoy
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {stats.pendingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center gap-4 p-3 rounded-xl bg-[var(--color-gray-50)] hover:bg-[var(--color-gray-100)] transition-colors"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--color-primary)]/10">
                      <Clock size={20} className="text-[var(--color-primary)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[var(--color-gray-800)] truncate">
                        {appointment.patient?.full_name || "Sin nombre"}
                      </p>
                      <p className="text-sm text-[var(--color-gray-500)]">
                        {appointment.appointment_time?.slice(0, 5)} -{" "}
                        {appointment.service_type || "Valoración"}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        appointment.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {appointment.status === "confirmed" ? "Confirmada" : "Pendiente"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-[var(--color-gray-100)]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--color-gray-800)]">
                Pacientes Recientes
              </h2>
              <Link
                href="/dashboard/patients"
                className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] font-medium"
              >
                Ver todos →
              </Link>
            </div>
          </div>
          <div className="p-6">
            {stats.recentPatients.length === 0 ? (
              <div className="text-center py-8">
                <Users
                  size={48}
                  className="mx-auto text-[var(--color-gray-300)] mb-3"
                />
                <p className="text-[var(--color-gray-500)]">
                  No hay pacientes registrados
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {stats.recentPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center gap-4 p-3 rounded-xl bg-[var(--color-gray-50)] hover:bg-[var(--color-gray-100)] transition-colors"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 font-semibold text-[var(--color-accent-dark)]">
                      {patient.full_name
                        ? patient.full_name.slice(0, 2).toUpperCase()
                        : patient.whatsapp_number?.slice(-2) || "??"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[var(--color-gray-800)] truncate">
                        {patient.full_name || "Sin nombre"}
                      </p>
                      <p className="text-sm text-[var(--color-gray-500)]">
                        {patient.whatsapp_number}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        patient.qualification_status === "qualified"
                          ? "bg-green-100 text-green-700"
                          : patient.qualification_status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {patient.qualification_status === "qualified"
                        ? "Calificado"
                        : patient.qualification_status === "pending"
                        ? "Pendiente"
                        : "No Calificado"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-[var(--color-gray-800)] mb-4">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href="/dashboard/patients/new"
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[var(--color-gray-50)] hover:bg-[var(--color-primary)] hover:text-white transition-colors group"
          >
            <Users
              size={24}
              className="text-[var(--color-primary)] group-hover:text-white"
            />
            <span className="text-sm font-medium">Nuevo Paciente</span>
          </Link>
          <Link
            href="/dashboard/appointments/new"
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[var(--color-gray-50)] hover:bg-[var(--color-primary)] hover:text-white transition-colors group"
          >
            <Calendar
              size={24}
              className="text-[var(--color-primary)] group-hover:text-white"
            />
            <span className="text-sm font-medium">Nueva Cita</span>
          </Link>
          <Link
            href="/dashboard/finances/new"
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[var(--color-gray-50)] hover:bg-[var(--color-primary)] hover:text-white transition-colors group"
          >
            <DollarSign
              size={24}
              className="text-[var(--color-primary)] group-hover:text-white"
            />
            <span className="text-sm font-medium">Nueva Transacción</span>
          </Link>
          <Link
            href="/dashboard/conversations"
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[var(--color-gray-50)] hover:bg-[var(--color-primary)] hover:text-white transition-colors group"
          >
            <AlertCircle
              size={24}
              className="text-[var(--color-primary)] group-hover:text-white"
            />
            <span className="text-sm font-medium">Ver Chats</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

