// ============================================
// PLATAFORMA DENTAL - Tipos de Base de Datos
// ============================================

export type QualificationStatus = 'pending' | 'qualified' | 'not_qualified';
export type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
export type TransactionType = 'income' | 'expense';
export type ServiceType = 'estetica_dental' | 'diseno_sonrisa' | 'rehabilitacion_oral' | 'valoracion' | 'otro';

// ============================================
// Interfaces de Tablas
// ============================================

export interface Patient {
  id: string;
  whatsapp_number: string;
  full_name: string | null;
  email: string | null;
  qualification_status: QualificationStatus;
  qualification_score: number;
  has_budget: boolean;
  has_urgency: boolean;
  is_local: boolean;
  interested_in_appointment: boolean;
  preferred_service: ServiceType | null;
  notes: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
  last_contact_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number;
  service_type: ServiceType;
  status: AppointmentStatus;
  confirmation_sent: boolean;
  reminder_sent: boolean;
  notes: string | null;
  cancellation_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  patient_id: string | null;
  amount: number;
  type: TransactionType;
  category: string | null;
  description: string | null;
  payment_method: string | null;
  reference_number: string | null;
  transaction_date: string;
  created_at: string;
}

export interface PatientDocument {
  id: string;
  patient_id: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  document_type: string | null;
  description: string | null;
  uploaded_at: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  patient_id: string;
  messages: ChatMessage[];
  total_messages: number;
  ai_messages: number;
  user_messages: number;
  started_at: string;
  last_message_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  role: 'admin' | 'assistant';
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

// ============================================
// Tipos para Inserción/Actualización
// ============================================

export type PatientInsert = Omit<Patient, 'id' | 'created_at' | 'updated_at' | 'last_contact_at' | 'qualification_score' | 'qualification_status'> & {
  qualification_status?: QualificationStatus;
};

export type PatientUpdate = Partial<Omit<Patient, 'id' | 'created_at' | 'updated_at'>>;

export type AppointmentInsert = Omit<Appointment, 'id' | 'created_at' | 'updated_at'>;

export type AppointmentUpdate = Partial<Omit<Appointment, 'id' | 'created_at' | 'updated_at'>>;

export type TransactionInsert = Omit<Transaction, 'id' | 'created_at'>;

export type TransactionUpdate = Partial<Omit<Transaction, 'id' | 'created_at'>>;

export type PatientDocumentInsert = Omit<PatientDocument, 'id' | 'uploaded_at'>;

// ============================================
// Tipos con Relaciones
// ============================================

export interface PatientWithAppointments extends Patient {
  appointments: Appointment[];
}

export interface PatientWithTransactions extends Patient {
  transactions: Transaction[];
}

export interface PatientWithDocuments extends Patient {
  documents: PatientDocument[];
}

export interface PatientFull extends Patient {
  appointments: Appointment[];
  transactions: Transaction[];
  documents: PatientDocument[];
  chat_sessions: ChatSession[];
}

export interface AppointmentWithPatient extends Appointment {
  patient: Patient;
}

export interface TransactionWithPatient extends Transaction {
  patient: Patient | null;
}

// ============================================
// Tipos de Supabase Database
// ============================================

export interface Database {
  public: {
    Tables: {
      patients: {
        Row: Patient;
        Insert: PatientInsert;
        Update: PatientUpdate;
      };
      appointments: {
        Row: Appointment;
        Insert: AppointmentInsert;
        Update: AppointmentUpdate;
      };
      transactions: {
        Row: Transaction;
        Insert: TransactionInsert;
        Update: TransactionUpdate;
      };
      patient_documents: {
        Row: PatientDocument;
        Insert: PatientDocumentInsert;
        Update: Partial<PatientDocumentInsert>;
      };
      chat_sessions: {
        Row: ChatSession;
        Insert: Omit<ChatSession, 'id' | 'started_at' | 'last_message_at'>;
        Update: Partial<Omit<ChatSession, 'id' | 'started_at'>>;
      };
      admin_users: {
        Row: AdminUser;
        Insert: Omit<AdminUser, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<AdminUser, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
    Enums: {
      qualification_status: QualificationStatus;
      appointment_status: AppointmentStatus;
      transaction_type: TransactionType;
      service_type: ServiceType;
    };
  };
}

// ============================================
// Constantes de Servicios
// ============================================

export const SERVICE_LABELS: Record<ServiceType, string> = {
  estetica_dental: 'Estética Dental',
  diseno_sonrisa: 'Diseño de Sonrisa',
  rehabilitacion_oral: 'Rehabilitación Oral',
  valoracion: 'Valoración',
  otro: 'Otro',
};

export const QUALIFICATION_LABELS: Record<QualificationStatus, string> = {
  pending: 'Pendiente',
  qualified: 'Calificado',
  not_qualified: 'No Calificado',
};

export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatus, string> = {
  scheduled: 'Agendada',
  confirmed: 'Confirmada',
  completed: 'Completada',
  cancelled: 'Cancelada',
  no_show: 'No Asistió',
};

export const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  income: 'Ingreso',
  expense: 'Egreso',
};

// ============================================
// Colores para estados
// ============================================

export const QUALIFICATION_COLORS: Record<QualificationStatus, string> = {
  pending: '#f59e0b', // amber
  qualified: '#10b981', // emerald
  not_qualified: '#ef4444', // red
};

export const APPOINTMENT_STATUS_COLORS: Record<AppointmentStatus, string> = {
  scheduled: '#3b82f6', // blue
  confirmed: '#10b981', // emerald
  completed: '#6b7280', // gray
  cancelled: '#ef4444', // red
  no_show: '#f97316', // orange
};

