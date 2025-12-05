"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Trash2, Eye } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface DocumentActionsProps {
  document: {
    id: string;
    file_path: string;
    file_name: string;
  };
}

export default function DocumentActions({ document }: DocumentActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDownload = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.storage
        .from("patient-documents")
        .createSignedUrl(document.file_path, 60);

      if (error) {
        console.error("Error creating signed URL:", error);
        alert("Error al generar el enlace de descarga. Por favor intenta de nuevo.");
        return;
      }

      if (data?.signedUrl) {
        window.open(data.signedUrl, "_blank");
      }
    } catch (err) {
      console.error("Unexpected error downloading document:", err);
      alert("Ocurrió un error inesperado. Por favor intenta de nuevo.");
    }
  };

  const handleView = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.storage
        .from("patient-documents")
        .createSignedUrl(document.file_path, 60);

      if (error) {
        console.error("Error creating signed URL:", error);
        alert("Error al generar el enlace de visualización. Por favor intenta de nuevo.");
        return;
      }

      if (data?.signedUrl) {
        window.open(data.signedUrl, "_blank");
      }
    } catch (err) {
      console.error("Unexpected error viewing document:", err);
      alert("Ocurrió un error inesperado. Por favor intenta de nuevo.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de eliminar este documento?")) {
      return;
    }

    setIsDeleting(true);
    try {
      const supabase = createClient();

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("patient-documents")
        .remove([document.file_path]);

      if (storageError) {
        console.error("Error deleting from storage:", storageError);
        // Continue with database deletion even if storage fails
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from("patient_documents")
        .delete()
        .eq("id", document.id);

      if (dbError) {
        console.error("Error deleting from database:", dbError);
        alert("Error al eliminar el documento. Por favor intenta de nuevo.");
        setIsDeleting(false);
        return;
      }

      router.refresh();
    } catch (err) {
      console.error("Unexpected error deleting document:", err);
      alert("Ocurrió un error inesperado. Por favor intenta de nuevo.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleView}
        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-[var(--color-gray-600)] bg-white rounded-lg hover:bg-[var(--color-gray-50)] transition-colors border border-[var(--color-gray-200)]"
      >
        <Eye size={14} />
        Ver
      </button>
      <button
        onClick={handleDownload}
        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-[var(--color-primary)] bg-white rounded-lg hover:bg-[var(--color-primary)]/5 transition-colors border border-[var(--color-gray-200)]"
      >
        <Download size={14} />
        Descargar
      </button>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="p-2 text-red-500 bg-white rounded-lg hover:bg-red-50 transition-colors border border-[var(--color-gray-200)] disabled:opacity-50"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

