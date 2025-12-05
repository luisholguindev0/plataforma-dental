import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { MessageSquare, Clock, ChevronRight } from "lucide-react";

export default async function ConversationsPage() {
  const supabase = await createClient();

  // Get all chat sessions with patient info
  const { data: chatSessionsData, error } = await supabase
    .from("chat_sessions")
    .select("*, patient:patients(id, full_name, whatsapp_number, qualification_status)")
    .order("last_message_at", { ascending: false });

  if (error) {
    console.error("Error loading chat sessions:", error);
  }

  const chatSessions = (chatSessionsData || []) as Array<{
    id: string;
    total_messages: number;
    last_message_at: string | null;
    patient: {
      id: string;
      full_name: string | null;
      whatsapp_number: string;
      qualification_status: string;
    } | null;
  }>;

  const qualificationColors = {
    qualified: "bg-success-100 text-success-700",
    pending: "bg-warning-100 text-warning-700",
    not_qualified: "bg-error-100 text-error-700",
  };

  const qualificationLabels = {
    qualified: "Calificado",
    pending: "Pendiente",
    not_qualified: "No Calificado",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-primary-600">
          Conversaciones
        </h1>
        <p className="text-gray-600">
          Historial de conversaciones de WhatsApp con pacientes.
        </p>
      </div>

      {/* Chat list */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {chatSessions && chatSessions.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {chatSessions.map((session) => (
              <Link
                key={session.id}
                href={`/dashboard/patients/${session.patient?.id}`}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center font-semibold text-primary-600">
                  {session.patient?.full_name
                    ? session.patient.full_name.slice(0, 2).toUpperCase()
                    : session.patient?.whatsapp_number?.slice(-2) || "??"}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-800 truncate">
                      {session.patient?.full_name || "Sin nombre"}
                    </p>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        qualificationColors[
                          session.patient?.qualification_status as keyof typeof qualificationColors
                        ] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {qualificationLabels[
                        session.patient?.qualification_status as keyof typeof qualificationLabels
                      ] || "Desconocido"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {session.patient?.whatsapp_number}
                  </p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <MessageSquare size={12} />
                      {session.total_messages || 0} mensajes
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {session.last_message_at
                        ? new Date(session.last_message_at).toLocaleDateString(
                            "es-CO",
                            {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "Sin mensajes"}
                    </span>
                  </div>
                </div>

                <ChevronRight
                  size={20}
                  className="text-gray-400"
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <MessageSquare
              size={48}
              className="mx-auto text-gray-300 mb-3"
            />
            <p className="text-gray-500">
              No hay conversaciones registradas
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Las conversaciones aparecerán cuando los pacientes contacten por
              WhatsApp
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
