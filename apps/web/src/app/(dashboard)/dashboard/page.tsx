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
      icon: "bg-primary-500/15 text-primary-100",
      text: "text-primary-100",
    },
    green: {
      icon: "bg-success-600/20 text-success-100",
      text: "text-success-100",
    },
    purple: {
      icon: "bg-primary-500/20 text-primary-100",
      text: "text-primary-100",
    },
        amber: {
          icon: "bg-gradient-to-br from-primary-500/25 to-secondary-500/20 text-primary-100",
          text: "text-primary-100",
        },
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="px-2 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold bg-gradient-to-r from-primary-200 to-secondary-200 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-gray-400 text-sm sm:text-base mt-1">
          Bienvenido al panel de control. Aquí tienes un resumen de tu negocio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((stat) => {
          const colors = colorClasses[stat.color as keyof typeof colorClasses];
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="premium-card p-5 sm:p-6 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-400 font-medium mb-1">{stat.title}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`p-2.5 sm:p-3 rounded-xl ${colors.icon} flex-shrink-0 ml-3 group-hover:scale-110 transition-transform`}
                >
                  <stat.icon size={20} className="sm:w-6 sm:h-6" />
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-sm">
                <TrendingUp size={14} className="sm:w-4 sm:h-4 text-success-300" />
                <span className="text-success-200 font-medium">+12%</span>
                <span className="text-gray-500">vs mes anterior</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Today's Appointments */}
        <div className="premium-card">
          <div className="p-5 sm:p-6 border-b border-gray-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Citas de Hoy
              </h2>
              <Link
                href="/dashboard/appointments"
                className="text-sm text-primary-100 hover:text-white font-medium transition-colors inline-flex items-center gap-1"
              >
                Ver todas
                <span>→</span>
              </Link>
            </div>
          </div>
          <div className="p-5 sm:p-6">
            {stats.pendingAppointments.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <Calendar
                  size={48}
                  className="mx-auto text-gray-700 mb-3"
                />
                <p className="text-gray-400 text-sm sm:text-base">
                  No hay citas programadas para hoy
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {stats.pendingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gray-900/60 hover:bg-gray-800 transition-colors border border-gray-800"
                  >
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary-500/10 to-primary-400/10 flex-shrink-0">
                      <Clock size={18} className="sm:w-5 sm:h-5 text-primary-100" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate text-sm sm:text-base">
                        {appointment.patient?.full_name || "Sin nombre"}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400">
                        {appointment.appointment_time?.slice(0, 5)} -{" "}
                        {appointment.service_type || "Valoración"}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                        appointment.status === "confirmed"
                          ? "bg-success-100 text-success-700"
                          : "bg-info-100 text-info-700"
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
        <div className="premium-card">
          <div className="p-5 sm:p-6 border-b border-gray-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Pacientes Recientes
              </h2>
              <Link
                href="/dashboard/patients"
                className="text-sm text-primary-100 hover:text-white font-medium transition-colors inline-flex items-center gap-1"
              >
                Ver todos
                <span>→</span>
              </Link>
            </div>
          </div>
          <div className="p-5 sm:p-6">
            {stats.recentPatients.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <Users
                  size={48}
                  className="mx-auto text-gray-700 mb-3"
                />
                <p className="text-gray-400 text-sm sm:text-base">
                  No hay pacientes registrados
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {stats.recentPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gray-900/60 hover:bg-gray-800 transition-colors border border-gray-800"
                  >
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-400/20 font-semibold text-primary-700 flex-shrink-0 text-sm sm:text-base">
                      {patient.full_name
                        ? patient.full_name.slice(0, 2).toUpperCase()
                        : patient.whatsapp_number?.slice(-2) || "??"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate text-sm sm:text-base">
                        {patient.full_name || "Sin nombre"}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400">
                        {patient.whatsapp_number}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                        patient.qualification_status === "qualified"
                          ? "bg-success-100 text-success-700"
                          : patient.qualification_status === "pending"
                          ? "bg-warning-100 text-warning-700"
                          : "bg-error-100 text-error-700"
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
      <div className="premium-card p-5 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <Link
            href="/dashboard/patients/new"
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-800 bg-gray-900/60 hover:border-primary-500/40 hover:bg-primary-500/10 hover:text-white transition-all duration-300 group"
          >
            <Users
              size={24}
              className="text-primary-100 group-hover:text-white transition-colors"
            />
            <span className="text-xs sm:text-sm font-medium text-center">Nuevo Paciente</span>
          </Link>
          <Link
            href="/dashboard/appointments/new"
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-800 bg-gray-900/60 hover:border-primary-500/40 hover:bg-primary-500/10 hover:text-white transition-all duration-300 group"
          >
            <Calendar
              size={24}
              className="text-primary-100 group-hover:text-white transition-colors"
            />
            <span className="text-xs sm:text-sm font-medium text-center">Nueva Cita</span>
          </Link>
          <Link
            href="/dashboard/finances/new"
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-800 bg-gray-900/60 hover:border-primary-500/40 hover:bg-primary-500/10 hover:text-white transition-all duration-300 group"
          >
            <DollarSign
              size={24}
              className="text-primary-100 group-hover:text-white transition-colors"
            />
            <span className="text-xs sm:text-sm font-medium text-center">Nueva Transacción</span>
          </Link>
          <Link
            href="/dashboard/conversations"
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-800 bg-gray-900/60 hover:border-primary-500/40 hover:bg-primary-500/10 hover:text-white transition-all duration-300 group"
          >
            <AlertCircle
              size={24}
              className="text-primary-100 group-hover:text-white transition-colors"
            />
            <span className="text-xs sm:text-sm font-medium text-center">Ver Chats</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

