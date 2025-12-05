"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  MoreVertical,
} from "lucide-react";

interface Appointment {
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
}

interface AppointmentCalendarProps {
  appointments: Appointment[];
  currentDate: Date;
  view: "day" | "week" | "month";
}

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const statusColors: Record<string, string> = {
  scheduled: "bg-blue-100 border-blue-300 text-blue-800",
  confirmed: "bg-green-100 border-green-300 text-green-800",
  completed: "bg-gray-100 border-gray-300 text-gray-600",
  cancelled: "bg-red-100 border-red-300 text-red-800",
  no_show: "bg-orange-100 border-orange-300 text-orange-800",
};

const serviceLabels: Record<string, string> = {
  estetica_dental: "Estética Dental",
  diseno_sonrisa: "Diseño de Sonrisa",
  rehabilitacion_oral: "Rehabilitación Oral",
  valoracion: "Valoración",
  otro: "Otro",
};

export default function AppointmentCalendar({
  appointments,
  currentDate,
  view,
}: AppointmentCalendarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (view === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("date", newDate.toISOString().split("T")[0]);
    router.push(`/dashboard/appointments?${params.toString()}`);
  };

  const changeView = (newView: "day" | "week" | "month") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", newView);
    router.push(`/dashboard/appointments?${params.toString()}`);
  };

  const goToToday = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("date", new Date().toISOString().split("T")[0]);
    router.push(`/dashboard/appointments?${params.toString()}`);
  };

  // Get week days
  const getWeekDays = () => {
    const days = [];
    const start = new Date(currentDate);
    start.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays();
  const today = new Date().toISOString().split("T")[0];

  // Get appointments for a specific day and time
  const getAppointmentsForSlot = (date: Date, time: string) => {
    const dateStr = date.toISOString().split("T")[0];
    return appointments.filter(
      (apt) =>
        apt.appointment_date === dateStr &&
        apt.appointment_time?.slice(0, 5) === time
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[var(--color-gray-200)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateDate("prev")}
              className="p-2 rounded-lg hover:bg-[var(--color-gray-100)] transition-colors"
            >
              <ChevronLeft size={20} className="text-[var(--color-gray-600)]" />
            </button>
            <button
              onClick={() => navigateDate("next")}
              className="p-2 rounded-lg hover:bg-[var(--color-gray-100)] transition-colors"
            >
              <ChevronRight size={20} className="text-[var(--color-gray-600)]" />
            </button>
          </div>
          <h2 className="text-lg font-semibold text-[var(--color-gray-800)]">
            {view === "month"
              ? currentDate.toLocaleDateString("es-CO", {
                  month: "long",
                  year: "numeric",
                })
              : view === "week"
              ? `${weekDays[0].toLocaleDateString("es-CO", {
                  day: "numeric",
                  month: "short",
                })} - ${weekDays[6].toLocaleDateString("es-CO", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}`
              : currentDate.toLocaleDateString("es-CO", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="px-3 py-1.5 text-sm font-medium text-[var(--color-primary)] border border-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition-colors"
          >
            Hoy
          </button>
          <div className="flex rounded-lg border border-[var(--color-gray-200)] overflow-hidden">
            {(["day", "week", "month"] as const).map((v) => (
              <button
                key={v}
                onClick={() => changeView(v)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  view === v
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-white text-[var(--color-gray-600)] hover:bg-[var(--color-gray-50)]"
                }`}
              >
                {v === "day" ? "Día" : v === "week" ? "Semana" : "Mes"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Week view */}
      {view === "week" && (
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Day headers */}
            <div className="grid grid-cols-8 border-b border-[var(--color-gray-200)]">
              <div className="p-3 text-center text-sm text-[var(--color-gray-500)]">
                Hora
              </div>
              {weekDays.map((day, index) => (
                <div
                  key={index}
                  className={`p-3 text-center ${
                    day.toISOString().split("T")[0] === today
                      ? "bg-[var(--color-accent)]/10"
                      : ""
                  }`}
                >
                  <p className="text-sm text-[var(--color-gray-500)]">
                    {day.toLocaleDateString("es-CO", { weekday: "short" })}
                  </p>
                  <p
                    className={`text-lg font-semibold ${
                      day.toISOString().split("T")[0] === today
                        ? "text-[var(--color-accent)]"
                        : "text-[var(--color-gray-800)]"
                    }`}
                  >
                    {day.getDate()}
                  </p>
                </div>
              ))}
            </div>

            {/* Time slots */}
            <div className="max-h-[600px] overflow-y-auto">
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className="grid grid-cols-8 border-b border-[var(--color-gray-100)]"
                >
                  <div className="p-3 text-sm text-[var(--color-gray-500)] text-center">
                    {time}
                  </div>
                  {weekDays.map((day, dayIndex) => {
                    const dayAppointments = getAppointmentsForSlot(day, time);
                    return (
                      <div
                        key={dayIndex}
                        className={`p-1 min-h-[60px] border-l border-[var(--color-gray-100)] ${
                          day.toISOString().split("T")[0] === today
                            ? "bg-[var(--color-accent)]/5"
                            : ""
                        }`}
                      >
                        {dayAppointments.map((apt) => (
                          <Link
                            key={apt.id}
                            href={`/dashboard/patients/${apt.patient?.id}`}
                            className={`block p-2 rounded-lg text-xs border ${
                              statusColors[apt.status]
                            } hover:opacity-80 transition-opacity`}
                          >
                            <p className="font-medium truncate">
                              {apt.patient?.full_name || "Sin nombre"}
                            </p>
                            <p className="truncate opacity-80">
                              {serviceLabels[apt.service_type] || apt.service_type}
                            </p>
                          </Link>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Day view */}
      {view === "day" && (
        <div className="max-h-[600px] overflow-y-auto">
          {timeSlots.map((time) => {
            const dayAppointments = getAppointmentsForSlot(currentDate, time);
            return (
              <div
                key={time}
                className="flex border-b border-[var(--color-gray-100)]"
              >
                <div className="w-20 p-3 text-sm text-[var(--color-gray-500)] text-center flex-shrink-0">
                  {time}
                </div>
                <div className="flex-1 p-2 min-h-[70px]">
                  {dayAppointments.map((apt) => (
                    <Link
                      key={apt.id}
                      href={`/dashboard/patients/${apt.patient?.id}`}
                      className={`flex items-center gap-3 p-3 rounded-xl ${
                        statusColors[apt.status]
                      } hover:opacity-80 transition-opacity`}
                    >
                      <div className="flex-1">
                        <p className="font-medium">
                          {apt.patient?.full_name || "Sin nombre"}
                        </p>
                        <p className="text-sm opacity-80">
                          {serviceLabels[apt.service_type] || apt.service_type} •{" "}
                          {apt.patient?.whatsapp_number}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Month view */}
      {view === "month" && (
        <div className="p-4">
          {/* Week day headers */}
          <div className="grid grid-cols-7 mb-2">
            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-[var(--color-gray-500)] py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {(() => {
              const firstDay = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                1
              );
              const lastDay = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() + 1,
                0
              );
              const startOffset = firstDay.getDay();
              const totalDays = lastDay.getDate();
              const cells = [];

              // Empty cells for offset
              for (let i = 0; i < startOffset; i++) {
                cells.push(
                  <div key={`empty-${i}`} className="aspect-square p-1" />
                );
              }

              // Day cells
              for (let day = 1; day <= totalDays; day++) {
                const date = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day
                );
                const dateStr = date.toISOString().split("T")[0];
                const dayAppointments = appointments.filter(
                  (apt) => apt.appointment_date === dateStr
                );
                const isToday = dateStr === today;

                cells.push(
                  <div
                    key={day}
                    className={`aspect-square p-1 border rounded-lg ${
                      isToday
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5"
                        : "border-transparent hover:bg-[var(--color-gray-50)]"
                    }`}
                  >
                    <p
                      className={`text-sm font-medium mb-1 ${
                        isToday
                          ? "text-[var(--color-accent)]"
                          : "text-[var(--color-gray-700)]"
                      }`}
                    >
                      {day}
                    </p>
                    {dayAppointments.length > 0 && (
                      <div className="space-y-1">
                        {dayAppointments.slice(0, 2).map((apt) => (
                          <div
                            key={apt.id}
                            className={`text-xs px-1 py-0.5 rounded truncate ${
                              statusColors[apt.status]
                            }`}
                          >
                            {apt.appointment_time?.slice(0, 5)}
                          </div>
                        ))}
                        {dayAppointments.length > 2 && (
                          <p className="text-xs text-[var(--color-gray-500)]">
                            +{dayAppointments.length - 2} más
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              return cells;
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

