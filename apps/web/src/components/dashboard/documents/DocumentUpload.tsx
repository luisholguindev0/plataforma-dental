"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Patient {
  id: string;
  full_name: string | null;
  whatsapp_number: string;
}

interface DocumentUploadProps {
  patients: Patient[];
}

const documentTypes = [
  { value: "radiografia", label: "Radiografía" },
  { value: "foto_antes", label: "Foto Antes" },
  { value: "foto_despues", label: "Foto Después" },
  { value: "contrato", label: "Contrato" },
  { value: "consentimiento", label: "Consentimiento" },
  { value: "otro", label: "Otro" },
];

export default function DocumentUpload({ patients }: DocumentUploadProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [patientId, setPatientId] = useState("");
  const [documentType, setDocumentType] = useState("otro");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("El archivo no puede ser mayor a 10MB");
        return;
      }
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !patientId) {
      setError("Por favor selecciona un archivo y un paciente");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const supabase = createClient();

      // Upload file to storage
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${patientId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("patient-documents")
        .upload(fileName, selectedFile);

      if (uploadError) {
        throw new Error("Error al subir el archivo");
      }

      // Save document metadata
      const { error: dbError } = await supabase.from("patient_documents").insert({
        patient_id: patientId,
        file_name: selectedFile.name,
        file_path: fileName,
        file_size: selectedFile.size,
        mime_type: selectedFile.type,
        document_type: documentType,
        description: description || null,
      } as any);

      if (dbError) {
        throw new Error("Error al guardar el documento");
      }

      setIsOpen(false);
      setSelectedFile(null);
      setPatientId("");
      setDocumentType("otro");
      setDescription("");
      router.refresh();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error.message || "Ocurrió un error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Upload size={20} />
        Subir Documento
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Subir Documento</DialogTitle>
          </DialogHeader>

          {error && (
            <div className="p-3 bg-error-50 border border-error-200 rounded-xl text-error-600 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* File input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Archivo *
              </label>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                accept="image/*,.pdf,.doc,.docx"
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary-500 transition-colors"
              >
                {selectedFile ? (
                  <div>
                    <p className="font-medium text-gray-800">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div>
                    <Upload
                      size={32}
                      className="mx-auto text-gray-400 mb-2"
                    />
                    <p className="text-sm text-gray-600">
                      Haz clic para seleccionar un archivo
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Máximo 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Patient select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paciente *
              </label>
              <select
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                <option value="">Seleccionar paciente</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.full_name || patient.whatsapp_number}
                  </option>
                ))}
              </select>
            </div>

            {/* Document type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Documento
              </label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                {documentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                placeholder="Descripción opcional..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none bg-white"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpload}
                disabled={isUploading || !selectedFile || !patientId}
                className="flex-1"
              >
                {isUploading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Subiendo...
                  </>
                ) : (
                  "Subir"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
