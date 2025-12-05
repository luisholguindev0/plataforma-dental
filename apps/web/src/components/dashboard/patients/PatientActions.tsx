"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MoreVertical, Eye, Edit, Trash2, MessageSquare } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface PatientActionsProps {
  patientId: string;
}

export default function PatientActions({ patientId }: PatientActionsProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de eliminar este paciente? Esta acción no se puede deshacer.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const supabase = createClient();
      
      const { error } = await supabase
        .from("patients")
        .delete()
        .eq("id", patientId);

      if (error) {
        console.error("Error deleting patient:", error);
        alert("Error al eliminar el paciente. Por favor intenta de nuevo.");
        setIsDeleting(false);
        return;
      }

      router.refresh();
      setIsOpen(false);
    } catch (err) {
      console.error("Unexpected error deleting patient:", err);
      alert("Ocurrió un error inesperado. Por favor intenta de nuevo.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative flex justify-end">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-[var(--color-gray-100)] transition-colors"
      >
        <MoreVertical size={20} className="text-[var(--color-gray-500)]" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-[var(--color-gray-200)] py-1 z-20">
            <Link
              href={`/dashboard/patients/${patientId}`}
              className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Eye size={16} />
              Ver detalles
            </Link>
            <Link
              href={`/dashboard/patients/${patientId}/edit`}
              className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Edit size={16} />
              Editar
            </Link>
            <Link
              href={`/dashboard/conversations?patient=${patientId}`}
              className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <MessageSquare size={16} />
              Ver conversación
            </Link>
            <hr className="my-1 border-[var(--color-gray-100)]" />
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <Trash2 size={16} />
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

