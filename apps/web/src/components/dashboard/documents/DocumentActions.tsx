"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Trash2, Eye } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

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
      <Button
        variant="outline"
        size="sm"
        onClick={handleView}
        className="flex-1 text-xs"
      >
        <Eye size={14} />
        Ver
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownload}
        className="flex-1 text-xs text-primary-600 hover:text-primary-700"
      >
        <Download size={14} />
        Descargar
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-error-600 hover:text-error-700 hover:bg-error-50"
      >
        <Trash2 size={14} />
      </Button>
    </div>
  );
}
