"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
  scheduled: "bg-blue-50 border-blue-200 text-blue-800",
  confirmed: "bg-success-50 border-success-200 text-success-800",
  completed: "bg-gray-50 border-gray-200 text-gray-700",
  cancelled: "bg-error-50 border-error-200 text-error-800",
  no_show: "bg-warning-50 border-warning-200 text-warning-800",
};

const statusBadgeVariants: Record<string, "default" | "secondary" | "destructive" | "success" | "warning"> = {
  scheduled: "secondary",
  confirmed: "success",
  completed: "secondary",
  cancelled: "destructive",
  no_show: "warning",
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
    <Card className="overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateDate("prev")}
                className="h-9 w-9"
              >
                <ChevronLeft size={18} className="text-gray-600" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateDate("next")}
                className="h-9 w-9"
              >
                <ChevronRight size={18} className="text-gray-600" />
              </Button>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
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

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
              className="text-sm"
            >
              Hoy
            </Button>
            <div className="flex rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
              {(["day", "week", "month"] as const).map((v) => (
                <Button
                  key={v}
                  variant={view === v ? "default" : "ghost"}
                  size="sm"
                  onClick={() => changeView(v)}
                  className={cn(
                    "rounded-none border-0 text-xs sm:text-sm px-3 py-1.5 h-9",
                    view === v
                      ? "bg-primary-500 text-white hover:bg-primary-600"
                      : "bg-transparent text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {v === "day" ? "Día" : v === "week" ? "Semana" : "Mes"}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Week view */}
      {view === "week" && (
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Day headers */}
            <div className="grid grid-cols-8 border-b border-gray-200 bg-gray-50">
              <div className="p-3 text-center text-sm font-semibold text-gray-600">
                Hora
              </div>
              {weekDays.map((day, index) => {
                const isToday = day.toISOString().split("T")[0] === today;
                return (
                  <div
                    key={index}
                    className={cn(
                      "p-3 text-center",
                      isToday && "bg-primary-50"
                    )}
                  >
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">
                      {day.toLocaleDateString("es-CO", { weekday: "short" })}
                    </p>
                    <p
                      className={cn(
                        "text-base sm:text-lg font-semibold",
                        isToday
                          ? "text-primary-600"
                          : "text-gray-900"
                      )}
                    >
                      {day.getDate()}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Time slots */}
            <div className="max-h-[600px] overflow-y-auto">
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className="grid grid-cols-8 border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="p-3 text-xs sm:text-sm text-gray-500 text-center font-medium flex items-center justify-center">
                    {time}
                  </div>
                  {weekDays.map((day, dayIndex) => {
                    const dayAppointments = getAppointmentsForSlot(day, time);
                    const isToday = day.toISOString().split("T")[0] === today;
                    return (
                      <div
                        key={dayIndex}
                        className={cn(
                          "p-1.5 min-h-[60px] border-l border-gray-100",
                          isToday && "bg-primary-50/30"
                        )}
                      >
                        {dayAppointments.map((apt) => (
                          <Link
                            key={apt.id}
                            href={`/dashboard/patients/${apt.patient?.id}`}
                            className={cn(
                              "block p-2 rounded-lg text-xs border mb-1 hover:shadow-sm transition-all",
                              statusColors[apt.status]
                            )}
                          >
                            <p className="font-medium truncate mb-0.5">
                              {apt.patient?.full_name || "Sin nombre"}
                            </p>
                            <p className="truncate opacity-80 text-xs">
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
                className="flex border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
              >
                <div className="w-20 sm:w-24 p-3 text-xs sm:text-sm text-gray-500 text-center flex-shrink-0 font-medium flex items-center justify-center">
                  {time}
                </div>
                <div className="flex-1 p-3 min-h-[70px]">
                  {dayAppointments.length > 0 ? (
                    <div className="space-y-2">
                      {dayAppointments.map((apt) => (
                        <Link
                          key={apt.id}
                          href={`/dashboard/patients/${apt.patient?.id}`}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-xl border hover:shadow-sm transition-all",
                            statusColors[apt.status]
                          )}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-sm truncate">
                                {apt.patient?.full_name || "Sin nombre"}
                              </p>
                              <Badge
                                variant={statusBadgeVariants[apt.status] || "secondary"}
                                className="text-xs"
                              >
                                {apt.status}
                              </Badge>
                            </div>
                            <p className="text-xs opacity-80 truncate">
                              {serviceLabels[apt.service_type] || apt.service_type} •{" "}
                              {apt.patient?.whatsapp_number}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex items-center">
                      <span className="text-xs text-gray-400">Libre</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Month view */}
      {view === "month" && (
        <div className="p-4 sm:p-6">
          {/* Week day headers */}
          <div className="grid grid-cols-7 mb-2 gap-1">
            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
              <div
                key={day}
                className="text-center text-xs sm:text-sm font-semibold text-gray-600 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
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
                    className={cn(
                      "aspect-square p-1.5 sm:p-2 border rounded-lg transition-colors cursor-pointer",
                      isToday
                        ? "border-primary-500 bg-primary-50"
                        : "border-transparent hover:bg-gray-50 hover:border-gray-200"
                    )}
                  >
                    <p
                      className={cn(
                        "text-xs sm:text-sm font-semibold mb-1",
                        isToday
                          ? "text-primary-600"
                          : "text-gray-700"
                      )}
                    >
                      {day}
                    </p>
                    {dayAppointments.length > 0 && (
                      <div className="space-y-0.5">
                        {dayAppointments.slice(0, 2).map((apt) => (
                          <div
                            key={apt.id}
                            className={cn(
                              "text-[10px] sm:text-xs px-1 py-0.5 rounded truncate border",
                              statusColors[apt.status]
                            )}
                          >
                            {apt.appointment_time?.slice(0, 5)}
                          </div>
                        ))}
                        {dayAppointments.length > 2 && (
                          <p className="text-[10px] sm:text-xs text-gray-500 font-medium">
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
    </Card>
  );
}
