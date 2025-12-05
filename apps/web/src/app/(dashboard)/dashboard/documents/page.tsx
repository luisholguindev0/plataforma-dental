import { createClient } from "@/lib/supabase/server";
import { FileText, Image, File, Search } from "lucide-react";
import DocumentUpload from "@/components/dashboard/documents/DocumentUpload";
import DocumentActions from "@/components/dashboard/documents/DocumentActions";

interface DocumentsPageProps {
  searchParams: Promise<{
    patient?: string;
    type?: string;
    search?: string;
  }>;
}

export default async function DocumentsPage({ searchParams }: DocumentsPageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("patient_documents")
    .select("*, patient:patients(id, full_name, whatsapp_number)")
    .order("uploaded_at", { ascending: false });

  if (params.patient) {
    query = query.eq("patient_id", params.patient);
  }

  if (params.type) {
    query = query.eq("document_type", params.type);
  }

  if (params.search) {
    // Sanitize search input to prevent SQL injection
    const sanitizedSearch = params.search.replace(/[%_]/g, '');
    if (sanitizedSearch.length > 0) {
      query = query.ilike("file_name", `%${sanitizedSearch}%`);
    }
  }

  const { data: documentsData, error: documentsError } = await query;
  if (documentsError) {
    console.error("Error fetching documents", documentsError.message);
  }
  
  const documents = (documentsData || []) as Array<{
    id: string;
    file_name: string;
    file_path: string;
    file_size: number | null;
    mime_type: string | null;
    document_type: string | null;
    description: string | null;
    uploaded_at: string;
    patient: {
      id: string;
      full_name: string | null;
      whatsapp_number: string;
    } | null;
  }>;

  // Get patients for filter
  const { data: patientsData, error: patientsError } = await supabase
    .from("patients")
    .select("id, full_name, whatsapp_number")
    .order("full_name", { ascending: true });
  if (patientsError) {
    console.error("Error fetching patients (documents)", patientsError.message);
  }
  
  const patients = (patientsData || []) as Array<{
    id: string;
    full_name: string | null;
    whatsapp_number: string;
  }>;

  const getFileIcon = (mimeType: string | null) => {
    if (!mimeType) return File;
    if (mimeType.startsWith("image/")) return Image;
    return FileText;
  };

  const documentTypes = [
    { value: "radiografia", label: "Radiografía" },
    { value: "foto_antes", label: "Foto Antes" },
    { value: "foto_despues", label: "Foto Después" },
    { value: "contrato", label: "Contrato" },
    { value: "consentimiento", label: "Consentimiento" },
    { value: "otro", label: "Otro" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-primary-200 to-secondary-200 bg-clip-text text-transparent">
            Documentos
          </h1>
          <p className="text-gray-400">
            Gestiona la documentación de tus pacientes.
          </p>
        </div>
        <DocumentUpload patients={patients || []} />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Buscar por nombre de archivo..."
            defaultValue={params.search}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-800 bg-gray-900/70 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all placeholder:text-gray-500"
          />
        </div>

        <select
          defaultValue={params.patient || ""}
          className="px-4 py-2.5 rounded-xl border border-gray-800 bg-gray-900/70 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
        >
          <option value="">Todos los pacientes</option>
          {patients?.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.full_name || patient.whatsapp_number}
            </option>
          ))}
        </select>

        <select
          defaultValue={params.type || ""}
          className="px-4 py-2.5 rounded-xl border border-gray-800 bg-gray-900/70 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
        >
          <option value="">Todos los tipos</option>
          {documentTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Documents grid */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900/70 shadow-[0_30px_70px_-50px_rgba(0,0,0,0.85)]">
        {documents && documents.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {documents.map((doc) => {
              const FileIcon = getFileIcon(doc.mime_type);
              return (
                <div
                  key={doc.id}
                  className="group relative rounded-xl border border-gray-800 bg-gray-900/60 p-4 hover:border-primary-500/40 hover:bg-primary-500/5 transition-colors"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-500/15 flex items-center justify-center flex-shrink-0">
                      <FileIcon size={20} className="text-primary-100" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">
                        {doc.file_name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {doc.document_type || "Sin categoría"}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-400 mb-3">
                    <p>
                      Paciente:{" "}
                      <span className="text-gray-200">
                        {doc.patient?.full_name || "Sin asignar"}
                      </span>
                    </p>
                    <p>
                      {new Date(doc.uploaded_at).toLocaleDateString("es-CO", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <DocumentActions document={doc} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center">
            <FileText size={48} className="mx-auto text-gray-700 mb-3" />
            <p className="text-gray-400">No hay documentos cargados</p>
            <p className="text-sm text-gray-500 mt-1">
              Sube el primer documento usando el botón arriba
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

