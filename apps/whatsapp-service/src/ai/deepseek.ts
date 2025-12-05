import OpenAI from 'openai';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY!;
const DEEPSEEK_BASE_URL = 'https://api.deepseek.com';

// Initialize DeepSeek client (compatible with OpenAI SDK)
const client = new OpenAI({
  apiKey: DEEPSEEK_API_KEY,
  baseURL: DEEPSEEK_BASE_URL,
});

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface Patient {
  id: string;
  full_name: string | null;
  whatsapp_number: string;
  qualification_status: string;
  qualification_score: number;
  has_budget: boolean;
  has_urgency: boolean;
  is_local: boolean;
  interested_in_appointment: boolean;
  preferred_service: string | null;
  notes: string | null;
}

/**
 * System prompt for the dental assistant
 */
const SYSTEM_PROMPT = `Eres el asistente virtual del Dr. Jhoiner Marquez, odontólogo especialista en Barranquilla, Colombia. Tu nombre es "Asistente Dr. Marquez".

## Tu rol:
1. Dar una bienvenida cálida y profesional a los pacientes
2. Entender sus necesidades dentales y responder sus preguntas
3. Informar sobre los servicios disponibles
4. Calificar al paciente mediante preguntas naturales
5. Agendar citas de valoración cuando el paciente esté listo

## Servicios que ofrecemos:
- **Estética Dental**: Blanqueamiento profesional, carillas de porcelana, contorneado dental, restauraciones estéticas
- **Diseño de Sonrisa**: Transformación completa personalizada con diseño digital, carillas ultrafinas, armonía facial
- **Rehabilitación Oral**: Implantes dentales, prótesis fijas y removibles, coronas y puentes, reconstrucción total

## Información del consultorio:
- **Dirección**: Calle 58 #62-61, Barranquilla, Atlántico
- **Teléfono**: +57 301 499 0844
- **Horario**: Lunes a Viernes 8:00 AM - 6:00 PM, Sábados 8:00 AM - 12:00 PM
- **Valoración inicial**: GRATUITA

## Cómo calificar pacientes (haz estas preguntas de forma natural durante la conversación):
1. **Presupuesto**: "¿Tienes un presupuesto aproximado en mente para tu tratamiento?" o "¿Has considerado las opciones de financiamiento?"
2. **Urgencia**: Detecta palabras como "dolor", "urgente", "molestia", "pronto", "lo antes posible"
3. **Ubicación**: "¿Te encuentras en Barranquilla o cerca?" o "¿De qué zona nos escribes?"
4. **Interés en cita**: "¿Te gustaría agendar una valoración gratuita?" o detecta frases como "quiero agendar", "cuándo hay disponibilidad"

## Cómo agendar citas:
Cuando el paciente quiera agendar:
1. Pregunta la fecha preferida (dentro del horario de atención)
2. Ofrece horarios disponibles
3. Confirma nombre completo y número de contacto
4. Confirma los detalles de la cita

## Reglas de comunicación:
- Sé profesional pero cálido y empático
- Usa español natural de Colombia (no uses "vos")
- Respuestas concisas (máximo 3-4 oraciones por mensaje)
- Usa emojis moderadamente para hacer la conversación amigable 😊
- Si no sabes algo específico sobre un tratamiento, ofrece agendar una cita para que el doctor pueda explicar personalmente
- NUNCA inventes información sobre precios específicos - siempre menciona que los precios se determinan en la valoración
- Si detectas una emergencia dental, recomienda llamar directamente o visitar urgencias

## Ejemplos de respuestas:

Usuario: "Hola, quiero información sobre diseño de sonrisa"
Respuesta: "¡Hola! 👋 Gracias por contactar al consultorio del Dr. Jhoiner Marquez. El Diseño de Sonrisa es uno de nuestros tratamientos estrella ✨ Consiste en una transformación completa y personalizada de tu sonrisa usando tecnología digital para que puedas ver los resultados antes de comenzar. ¿Te gustaría saber más sobre el proceso o prefieres agendar una valoración gratuita para que el doctor evalúe tu caso?"

Usuario: "Cuánto cuesta?"
Respuesta: "El precio del tratamiento depende de cada caso particular, ya que cada sonrisa es única 😊 En la valoración gratuita, el Dr. Marquez evaluará tu situación y te dará un presupuesto personalizado con opciones de pago. ¿Tienes un presupuesto aproximado en mente? Así podemos orientarte mejor sobre las opciones disponibles."`;

/**
 * Generate a response using DeepSeek API
 */
export async function generateAIResponse(
  messages: ChatMessage[],
  patient: Patient
): Promise<string> {
  try {
    // Build context about the patient
    const patientContext = buildPatientContext(patient);
    
    // Prepare messages for the API
    const apiMessages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT + '\n\n' + patientContext },
      ...messages.slice(-10), // Keep last 10 messages for context
    ];

    const response = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: apiMessages,
      max_tokens: 500,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const aiMessage = response.choices[0]?.message?.content;
    
    if (!aiMessage) {
      throw new Error('No response from AI');
    }

    return aiMessage;
  } catch (error: any) {
    console.error('Error generating AI response:', error);
    
    // Return a fallback response
    return 'Disculpa, estoy teniendo dificultades para procesar tu mensaje. ¿Podrías reformularlo o llamarnos directamente al +57 301 499 0844? Estaré encantado de ayudarte. 😊';
  }
}

/**
 * Build patient context for the AI
 */
function buildPatientContext(patient: Patient): string {
  const lines = ['## Información del paciente actual:'];
  
  if (patient.full_name) {
    lines.push(`- Nombre: ${patient.full_name}`);
  }
  
  lines.push(`- Teléfono: ${patient.whatsapp_number}`);
  lines.push(`- Estado: ${getStatusLabel(patient.qualification_status)}`);
  lines.push(`- Puntuación de calificación: ${patient.qualification_score}/4`);
  
  // Qualification criteria
  lines.push('\n### Criterios de calificación detectados:');
  lines.push(`- Tiene presupuesto: ${patient.has_budget ? 'Sí ✓' : 'No determinado'}`);
  lines.push(`- Tiene urgencia: ${patient.has_urgency ? 'Sí ✓' : 'No determinado'}`);
  lines.push(`- Es local (Barranquilla): ${patient.is_local ? 'Sí ✓' : 'No determinado'}`);
  lines.push(`- Interesado en cita: ${patient.interested_in_appointment ? 'Sí ✓' : 'No determinado'}`);
  
  if (patient.preferred_service) {
    lines.push(`\n- Servicio de interés: ${getServiceLabel(patient.preferred_service)}`);
  }
  
  if (patient.notes) {
    lines.push(`- Notas: ${patient.notes}`);
  }

  lines.push('\n### Instrucciones especiales:');
  
  if (patient.qualification_score < 2) {
    lines.push('- Este paciente aún no está calificado. Intenta obtener más información sobre su presupuesto, urgencia y ubicación de forma natural.');
  } else if (patient.qualification_score >= 3 && !patient.interested_in_appointment) {
    lines.push('- Este paciente parece calificado. Sería buen momento para sugerirle agendar una valoración.');
  }

  return lines.join('\n');
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    qualified: 'Calificado',
    pending: 'Pendiente',
    not_qualified: 'No calificado',
  };
  return labels[status] || status;
}

function getServiceLabel(service: string): string {
  const labels: Record<string, string> = {
    estetica_dental: 'Estética Dental',
    diseno_sonrisa: 'Diseño de Sonrisa',
    rehabilitacion_oral: 'Rehabilitación Oral',
    valoracion: 'Valoración',
    otro: 'Otro',
  };
  return labels[service] || service;
}

