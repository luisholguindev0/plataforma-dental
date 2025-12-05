interface Patient {
  id: string;
  has_budget: boolean;
  has_urgency: boolean;
  is_local: boolean;
  interested_in_appointment: boolean;
  preferred_service: string | null;
}

interface QualificationUpdates {
  has_budget?: boolean;
  has_urgency?: boolean;
  is_local?: boolean;
  interested_in_appointment?: boolean;
  preferred_service?: string;
}

// Keywords and patterns for qualification detection
const QUALIFICATION_PATTERNS = {
  // Budget indicators
  budget: {
    positive: [
      'tengo presupuesto',
      'tengo el dinero',
      'puedo pagar',
      'tengo ahorrado',
      'cuento con',
      'tengo para',
      'cuánto cuesta',
      'precio',
      'financiación',
      'financiamiento',
      'cuotas',
      'crédito',
    ],
    keywords: ['presupuesto', 'pagar', 'costo', 'precio', 'dinero', 'inversión'],
  },
  
  // Urgency indicators
  urgency: {
    positive: [
      'dolor',
      'molestia',
      'urgente',
      'urgencia',
      'lo antes posible',
      'pronto',
      'rápido',
      'ya no aguanto',
      'me duele',
      'necesito',
      'hinchado',
      'inflamado',
      'sangra',
      'roto',
      'caído',
      'emergencia',
    ],
  },
  
  // Location indicators
  location: {
    barranquilla: [
      'barranquilla',
      'bquilla',
      'baq',
      'atlántico',
      'atlantico',
      'estoy cerca',
      'vivo cerca',
      'soy de aquí',
      'soy de acá',
      'norte',
      'sur',
      'centro',
      'riomar',
      'country',
      'alto prado',
      'villa country',
      'boston',
    ],
    nearby: [
      'soledad',
      'malambo',
      'galapa',
      'puerto colombia',
      'área metropolitana',
    ],
  },
  
  // Appointment interest indicators
  appointment: {
    positive: [
      'quiero agendar',
      'quiero una cita',
      'agenda',
      'reservar',
      'cuándo hay',
      'disponibilidad',
      'horario',
      'puedo ir',
      'me gustaría ir',
      'visitar',
      'consulta',
      'valoración',
      'cita',
    ],
  },
  
  // Service detection
  services: {
    estetica_dental: [
      'blanqueamiento',
      'blanquear',
      'dientes blancos',
      'manchas',
      'amarillos',
      'estética',
      'estético',
      'carillas',
      'restauración',
    ],
    diseno_sonrisa: [
      'diseño de sonrisa',
      'diseño sonrisa',
      'cambiar mi sonrisa',
      'sonrisa nueva',
      'transformar',
      'sonrisa perfecta',
      'hollywood',
    ],
    rehabilitacion_oral: [
      'implante',
      'implantes',
      'prótesis',
      'corona',
      'puente',
      'diente perdido',
      'sin dientes',
      'falta diente',
      'rehabilitación',
    ],
  },
};

/**
 * Analyze message and update qualification criteria
 */
export async function updateQualificationCriteria(
  message: string,
  patient: Patient
): Promise<QualificationUpdates> {
  const updates: QualificationUpdates = {};
  const lowerMessage = message.toLowerCase();

  // Check for budget indicators
  if (!patient.has_budget) {
    const hasBudgetIndicator = 
      QUALIFICATION_PATTERNS.budget.positive.some(p => lowerMessage.includes(p)) ||
      QUALIFICATION_PATTERNS.budget.keywords.some(k => lowerMessage.includes(k));
    
    if (hasBudgetIndicator) {
      updates.has_budget = true;
    }
  }

  // Check for urgency indicators
  if (!patient.has_urgency) {
    const hasUrgencyIndicator = QUALIFICATION_PATTERNS.urgency.positive.some(
      p => lowerMessage.includes(p)
    );
    
    if (hasUrgencyIndicator) {
      updates.has_urgency = true;
    }
  }

  // Check for location indicators
  if (!patient.is_local) {
    const isBarranquilla = QUALIFICATION_PATTERNS.location.barranquilla.some(
      p => lowerMessage.includes(p)
    );
    const isNearby = QUALIFICATION_PATTERNS.location.nearby.some(
      p => lowerMessage.includes(p)
    );
    
    if (isBarranquilla || isNearby) {
      updates.is_local = true;
    }
  }

  // Check for appointment interest
  if (!patient.interested_in_appointment) {
    const wantsAppointment = QUALIFICATION_PATTERNS.appointment.positive.some(
      p => lowerMessage.includes(p)
    );
    
    if (wantsAppointment) {
      updates.interested_in_appointment = true;
    }
  }

  // Detect preferred service
  if (!patient.preferred_service) {
    for (const [service, keywords] of Object.entries(QUALIFICATION_PATTERNS.services)) {
      const matchesService = keywords.some(k => lowerMessage.includes(k));
      if (matchesService) {
        updates.preferred_service = service;
        break;
      }
    }
  }

  return updates;
}

/**
 * Calculate qualification score based on criteria
 */
export function calculateQualificationScore(patient: {
  has_budget: boolean;
  has_urgency: boolean;
  is_local: boolean;
  interested_in_appointment: boolean;
}): number {
  let score = 0;
  if (patient.has_budget) score++;
  if (patient.has_urgency) score++;
  if (patient.is_local) score++;
  if (patient.interested_in_appointment) score++;
  return score;
}

/**
 * Determine qualification status based on score
 */
export function getQualificationStatus(score: number): 'qualified' | 'pending' | 'not_qualified' {
  if (score >= 3) return 'qualified';
  if (score >= 1) return 'pending';
  return 'not_qualified';
}

