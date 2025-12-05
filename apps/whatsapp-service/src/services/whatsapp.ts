import axios from 'axios';

const WHATSAPP_API_URL = 'https://graph.facebook.com/v18.0';
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID!;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN!;

interface MessageOptions {
  previewUrl?: boolean;
}

/**
 * Send a text message via WhatsApp Business API
 */
export async function sendWhatsAppMessage(
  to: string,
  message: string,
  options: MessageOptions = {}
): Promise<boolean> {
  try {
    const response = await axios.post(
      `${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: to,
        type: 'text',
        text: {
          preview_url: options.previewUrl || false,
          body: message,
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (process.env.NODE_ENV !== 'production') {
      console.log(`📤 Message sent to ${to}`);
    }
    return true;
  } catch (error: any) {
    const errorDetails = error.response?.data || error.message;
    const errorCode = error.response?.status;
    console.error(`Error sending WhatsApp message to ${to}:`, {
      error: errorDetails,
      statusCode: errorCode,
      phoneNumber: to,
    });
    return false;
  }
}

/**
 * Send a template message via WhatsApp Business API
 */
export async function sendWhatsAppTemplate(
  to: string,
  templateName: string,
  languageCode: string = 'es',
  components: any[] = []
): Promise<boolean> {
  try {
    const response = await axios.post(
      `${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: to,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: languageCode,
          },
          components: components,
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (process.env.NODE_ENV !== 'production') {
      console.log(`📤 Template sent to ${to}`);
    }
    return true;
  } catch (error: any) {
    const errorDetails = error.response?.data || error.message;
    const errorCode = error.response?.status;
    console.error(`Error sending WhatsApp template to ${to}:`, {
      error: errorDetails,
      statusCode: errorCode,
      template: templateName,
      phoneNumber: to,
    });
    return false;
  }
}

/**
 * Mark a message as read
 */
export async function markMessageAsRead(messageId: string): Promise<boolean> {
  try {
    await axios.post(
      `${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        status: 'read',
        message_id: messageId,
      },
      {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return true;
  } catch (error) {
    console.error('Error marking message as read:', error);
    return false;
  }
}

