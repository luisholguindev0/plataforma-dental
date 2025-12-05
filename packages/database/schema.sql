-- ============================================
-- PLATAFORMA DENTAL - DR. JHOINER MARQUEZ
-- Schema de Base de Datos para Supabase
-- ============================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TIPOS ENUMERADOS
-- ============================================

-- Estado de calificación de pacientes
CREATE TYPE qualification_status AS ENUM ('pending', 'qualified', 'not_qualified');

-- Estado de citas
CREATE TYPE appointment_status AS ENUM ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show');

-- Tipo de transacción
CREATE TYPE transaction_type AS ENUM ('income', 'expense');

-- Tipo de servicio dental
CREATE TYPE service_type AS ENUM ('estetica_dental', 'diseno_sonrisa', 'rehabilitacion_oral', 'valoracion', 'otro');

-- ============================================
-- TABLA: patients (Pacientes/Clientes)
-- ============================================
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    whatsapp_number VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    email VARCHAR(255),
    
    -- Estado de calificación
    qualification_status qualification_status DEFAULT 'pending',
    qualification_score INT DEFAULT 0 CHECK (qualification_score >= 0 AND qualification_score <= 4),
    
    -- Criterios de calificación
    has_budget BOOLEAN DEFAULT FALSE,
    has_urgency BOOLEAN DEFAULT FALSE,
    is_local BOOLEAN DEFAULT FALSE,
    interested_in_appointment BOOLEAN DEFAULT FALSE,
    
    -- Información adicional
    preferred_service service_type,
    notes TEXT,
    address TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_contact_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para búsquedas frecuentes
CREATE INDEX idx_patients_whatsapp ON patients(whatsapp_number);
CREATE INDEX idx_patients_qualification ON patients(qualification_status);
CREATE INDEX idx_patients_created ON patients(created_at DESC);

-- ============================================
-- TABLA: appointments (Citas)
-- ============================================
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    
    -- Detalles de la cita
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration_minutes INT DEFAULT 60,
    service_type service_type DEFAULT 'valoracion',
    
    -- Estado y seguimiento
    status appointment_status DEFAULT 'scheduled',
    confirmation_sent BOOLEAN DEFAULT FALSE,
    reminder_sent BOOLEAN DEFAULT FALSE,
    
    -- Notas
    notes TEXT,
    cancellation_reason TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_appointments_status ON appointments(status);

-- Restricción: evitar citas duplicadas en el mismo horario
CREATE UNIQUE INDEX idx_appointments_unique_slot 
ON appointments(appointment_date, appointment_time) 
WHERE status NOT IN ('cancelled');

-- ============================================
-- TABLA: transactions (Transacciones Financieras)
-- ============================================
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
    
    -- Detalles financieros
    amount DECIMAL(12,2) NOT NULL,
    type transaction_type NOT NULL,
    category VARCHAR(100),
    description TEXT,
    
    -- Método de pago
    payment_method VARCHAR(50),
    reference_number VARCHAR(100),
    
    -- Fecha de la transacción
    transaction_date DATE DEFAULT CURRENT_DATE,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_transactions_patient ON transactions(patient_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date DESC);
CREATE INDEX idx_transactions_type ON transactions(type);

-- ============================================
-- TABLA: patient_documents (Documentos de Pacientes)
-- ============================================
CREATE TABLE patient_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    
    -- Información del archivo
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT,
    mime_type VARCHAR(100),
    
    -- Categorización
    document_type VARCHAR(100), -- 'radiografia', 'foto_antes', 'foto_despues', 'contrato', 'consentimiento', etc.
    description TEXT,
    
    -- Timestamps
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_documents_patient ON patient_documents(patient_id);
CREATE INDEX idx_documents_type ON patient_documents(document_type);

-- ============================================
-- TABLA: chat_sessions (Sesiones de Chat WhatsApp)
-- ============================================
CREATE TABLE chat_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    
    -- Historial de mensajes (JSONB para flexibilidad)
    messages JSONB DEFAULT '[]'::jsonb,
    
    -- Metadatos de la sesión
    total_messages INT DEFAULT 0,
    ai_messages INT DEFAULT 0,
    user_messages INT DEFAULT 0,
    
    -- Timestamps
    started_at TIMESTAMPTZ DEFAULT NOW(),
    last_message_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_chat_sessions_patient ON chat_sessions(patient_id);
CREATE INDEX idx_chat_sessions_last_message ON chat_sessions(last_message_at DESC);

-- ============================================
-- TABLA: admin_users (Usuarios del Dashboard)
-- ============================================
CREATE TABLE admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin', -- 'admin', 'assistant'
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- FUNCIONES Y TRIGGERS
-- ============================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_patients_updated_at
    BEFORE UPDATE ON patients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
    BEFORE UPDATE ON appointments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Función para calcular qualification_score automáticamente
CREATE OR REPLACE FUNCTION calculate_qualification_score()
RETURNS TRIGGER AS $$
BEGIN
    NEW.qualification_score := 
        (CASE WHEN NEW.has_budget THEN 1 ELSE 0 END) +
        (CASE WHEN NEW.has_urgency THEN 1 ELSE 0 END) +
        (CASE WHEN NEW.is_local THEN 1 ELSE 0 END) +
        (CASE WHEN NEW.interested_in_appointment THEN 1 ELSE 0 END);
    
    -- Actualizar estado de calificación basado en el score
    IF NEW.qualification_score >= 3 THEN
        NEW.qualification_status := 'qualified';
    ELSIF NEW.qualification_score >= 1 THEN
        NEW.qualification_status := 'pending';
    ELSE
        NEW.qualification_status := 'not_qualified';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_patient_qualification
    BEFORE INSERT OR UPDATE ON patients
    FOR EACH ROW
    EXECUTE FUNCTION calculate_qualification_score();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Políticas para admin_users (solo pueden ver su propio perfil o si son admin)
CREATE POLICY "Users can view own profile" ON admin_users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON admin_users
    FOR UPDATE USING (auth.uid() = id);

-- Políticas para otras tablas (los usuarios autenticados pueden ver/modificar todo)
-- En producción, podrías querer políticas más restrictivas basadas en roles

CREATE POLICY "Authenticated users can view patients" ON patients
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert patients" ON patients
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update patients" ON patients
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete patients" ON patients
    FOR DELETE TO authenticated USING (true);

-- Appointments
CREATE POLICY "Authenticated users can view appointments" ON appointments
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert appointments" ON appointments
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update appointments" ON appointments
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete appointments" ON appointments
    FOR DELETE TO authenticated USING (true);

-- Transactions
CREATE POLICY "Authenticated users can view transactions" ON transactions
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert transactions" ON transactions
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update transactions" ON transactions
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete transactions" ON transactions
    FOR DELETE TO authenticated USING (true);

-- Documents
CREATE POLICY "Authenticated users can view documents" ON patient_documents
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert documents" ON patient_documents
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update documents" ON patient_documents
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete documents" ON patient_documents
    FOR DELETE TO authenticated USING (true);

-- Chat Sessions
CREATE POLICY "Authenticated users can view chat sessions" ON chat_sessions
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert chat sessions" ON chat_sessions
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update chat sessions" ON chat_sessions
    FOR UPDATE TO authenticated USING (true);

-- Service Role puede hacer todo (para el microservicio)
CREATE POLICY "Service role has full access to patients" ON patients
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role has full access to appointments" ON appointments
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role has full access to transactions" ON transactions
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role has full access to documents" ON patient_documents
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role has full access to chat sessions" ON chat_sessions
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ============================================
-- STORAGE BUCKET CONFIGURATION
-- ============================================
-- Nota: Ejecutar en Supabase Dashboard > Storage

-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('patient-documents', 'patient-documents', false);

-- Política para subir archivos
-- CREATE POLICY "Authenticated users can upload documents"
-- ON storage.objects FOR INSERT TO authenticated
-- WITH CHECK (bucket_id = 'patient-documents');

-- Política para ver archivos
-- CREATE POLICY "Authenticated users can view documents"
-- ON storage.objects FOR SELECT TO authenticated
-- USING (bucket_id = 'patient-documents');

-- Política para eliminar archivos
-- CREATE POLICY "Authenticated users can delete documents"
-- ON storage.objects FOR DELETE TO authenticated
-- USING (bucket_id = 'patient-documents');

-- ============================================
-- DATOS INICIALES (SEEDS)
-- ============================================

-- Insertar categorías de transacciones comunes (como referencia)
-- INSERT INTO transaction_categories (name) VALUES 
--     ('Tratamiento'),
--     ('Valoración'),
--     ('Radiografía'),
--     ('Materiales'),
--     ('Nómina'),
--     ('Servicios'),
--     ('Marketing'),
--     ('Otros');

