import { supabase } from '../config/supabase.js';
import { generateAIResponse } from '../ai/deepseek.js';
import { sendWhatsAppMessage } from './whatsapp.js';
import { updateQualificationCriteria } from './qualification.js';

interface IncomingMessage {
  phoneNumber: string;
  text: string;
  contactName: string;
  messageId: string;
  timestamp: string;
}

/**
 * Process an incoming WhatsApp message
 */
export async function processMessage(message: IncomingMessage) {
  const { phoneNumber, text, contactName, messageId, timestamp } = message;

  try {
    // 1. Check if patient exists, create if not
    let patient = await getOrCreatePatient(phoneNumber, contactName);

    // 2. Get or create chat session
    let chatSession = await getOrCreateChatSession(patient.id);

    // 3. Add user message to history
    const updatedMessages = [
      ...chatSession.messages,
      {
        role: 'user' as const,
        content: text,
        timestamp: new Date().toISOString(),
      },
    ];

    // 4. Analyze message for qualification criteria
    const qualificationUpdates = await updateQualificationCriteria(text, patient);
    if (Object.keys(qualificationUpdates).length > 0) {
      const { error: updateError } = await supabase
        .from('patients')
        .update({
          ...qualificationUpdates,
          last_contact_at: new Date().toISOString(),
        })
        .eq('id', patient.id);
      
      if (updateError) {
        console.error('Error updating patient qualification:', updateError);
      } else {
        // Refresh patient data
        const { data: updatedPatient, error: refreshError } = await supabase
          .from('patients')
          .select('*')
          .eq('id', patient.id)
          .single();
        
        if (refreshError) {
          console.error('Error refreshing patient data:', refreshError);
        } else if (updatedPatient) {
          patient = updatedPatient;
        }
      }
    }

    // 5. Generate AI response using DeepSeek
    const aiResponse = await generateAIResponse(updatedMessages, patient);

    // 6. Add AI response to history
    const finalMessages = [
      ...updatedMessages,
      {
        role: 'assistant' as const,
        content: aiResponse,
        timestamp: new Date().toISOString(),
      },
    ];

    // 7. Update chat session
    const { error: sessionUpdateError } = await supabase
      .from('chat_sessions')
      .update({
        messages: finalMessages,
        total_messages: finalMessages.length,
        user_messages: finalMessages.filter(m => m.role === 'user').length,
        ai_messages: finalMessages.filter(m => m.role === 'assistant').length,
        last_message_at: new Date().toISOString(),
      })
      .eq('id', chatSession.id);

    if (sessionUpdateError) {
      console.error('Error updating chat session:', sessionUpdateError);
      // Continue even if session update fails - message was already sent
    }

    // 8. Send response via WhatsApp
    const messageSent = await sendWhatsAppMessage(phoneNumber, aiResponse);
    if (!messageSent) {
      console.error(`Failed to send WhatsApp message to ${phoneNumber}`);
      // Don't throw - message is already processed and saved
    }

    // 9. Check if user wants to schedule an appointment
    try {
      await checkAndHandleAppointmentRequest(aiResponse, text, patient);
    } catch (err) {
      console.error('Error checking appointment request:', err);
      // Don't throw - this is not critical
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(`✅ Processed message from ${phoneNumber}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error('Error processing message:', {
      phoneNumber,
      contactName,
      messageId,
      error: errorMessage,
      stack: errorStack,
    });
    
    // Send a fallback message
    try {
      await sendWhatsAppMessage(
        phoneNumber,
        'Disculpa, estamos experimentando dificultades técnicas. Por favor, intenta de nuevo en unos minutos o llámanos directamente al +57 301 499 0844.'
      );
    } catch (sendError) {
      console.error('Error sending fallback message:', {
        phoneNumber,
        originalError: errorMessage,
        sendError: sendError instanceof Error ? sendError.message : String(sendError),
      });
    }
  }
}

/**
 * Get existing patient or create a new one
 */
async function getOrCreatePatient(phoneNumber: string, contactName: string) {
  // Check if patient exists
  const { data: existingPatient } = await supabase
    .from('patients')
    .select('*')
    .eq('whatsapp_number', phoneNumber)
    .maybeSingle();

  if (existingPatient) {
    // Update contact name if we have a new one
    if (contactName && !existingPatient.full_name) {
      await supabase
        .from('patients')
        .update({ full_name: contactName })
        .eq('id', existingPatient.id);
    }
    return existingPatient;
  }

  // Create new patient
  const { data: newPatient, error } = await supabase
    .from('patients')
    .insert({
      whatsapp_number: phoneNumber,
      full_name: contactName || null,
      qualification_status: 'pending',
    })
    .select()
    .single();

  if (error) {
    console.error('Failed to create patient:', {
      phoneNumber,
      contactName,
      error: error.message,
      details: error.details,
    });
    throw new Error(`Failed to create patient: ${error.message}`);
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log(`📝 Created new patient: ${phoneNumber}`);
  }
  return newPatient;
}

/**
 * Get existing chat session or create a new one
 */
async function getOrCreateChatSession(patientId: string) {
  // Get existing session from today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data: existingSession } = await supabase
    .from('chat_sessions')
    .select('*')
    .eq('patient_id', patientId)
    .gte('started_at', today.toISOString())
    .order('started_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existingSession) {
    return existingSession;
  }

  // Create new session
  const { data: newSession, error } = await supabase
    .from('chat_sessions')
    .insert({
      patient_id: patientId,
      messages: [],
      total_messages: 0,
      user_messages: 0,
      ai_messages: 0,
    })
    .select()
    .single();

  if (error) {
    console.error('Failed to create chat session:', {
      patientId,
      error: error.message,
      details: error.details,
    });
    throw new Error(`Failed to create chat session: ${error.message}`);
  }

  return newSession;
}

/**
 * Check if the conversation resulted in an appointment request
 */
async function checkAndHandleAppointmentRequest(
  aiResponse: string,
  userMessage: string,
  patient: any
) {
  // Simple check - in production, you'd use NLP/AI for this
  const appointmentKeywords = [
    'cita confirmada',
    'he agendado',
    'te espero',
    'quedas agendado',
    'reservada tu cita',
  ];

  const hasAppointmentConfirmation = appointmentKeywords.some(keyword =>
    aiResponse.toLowerCase().includes(keyword)
  );

  if (hasAppointmentConfirmation) {
    // Update patient's interested_in_appointment flag
    const { error: updateError } = await supabase
      .from('patients')
      .update({ interested_in_appointment: true })
      .eq('id', patient.id);

    if (updateError) {
      console.error('Error updating appointment interest:', updateError);
    } else if (process.env.NODE_ENV !== 'production') {
      console.log(`📅 Patient ${patient.whatsapp_number} interested in appointment`);
    }
  }
}

