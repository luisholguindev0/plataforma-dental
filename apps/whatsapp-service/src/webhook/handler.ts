import { Request, Response } from 'express';
import { processMessage } from '../services/messageProcessor.js';

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

if (!VERIFY_TOKEN) {
  throw new Error('WHATSAPP_VERIFY_TOKEN is required. This should have been caught during startup validation.');
}

/**
 * Handle webhook verification from Meta
 * This is called when you first set up the webhook in Meta Developer Console
 */
export async function handleWebhookVerification(req: Request, res: Response) {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('✅ Webhook verified successfully');
    }
    res.status(200).send(challenge);
  } else {
    if (process.env.NODE_ENV !== 'production') {
      console.log('❌ Webhook verification failed');
    }
    res.sendStatus(403);
  }
}

/**
 * Handle incoming messages from WhatsApp
 */
export async function handleIncomingMessage(req: Request, res: Response) {
  try {
    const body = req.body;

    // Check if this is a WhatsApp status update
    if (body.object !== 'whatsapp_business_account') {
      return res.sendStatus(404);
    }

    // Process each entry
    const entries = body.entry || [];
    
    for (const entry of entries) {
      const changes = entry.changes || [];
      
      for (const change of changes) {
        if (change.field !== 'messages') continue;
        
        const value = change.value;
        const messages = value.messages || [];
        const contacts = value.contacts || [];
        
        for (let i = 0; i < messages.length; i++) {
          const message = messages[i];
          const contact = contacts[i] || {};
          
          // Only process text messages for now
          if (message.type === 'text') {
            const phoneNumber = message.from;
            const text = message.text?.body || '';
            const contactName = contact.profile?.name || '';
            const messageId = message.id;
            
            if (process.env.NODE_ENV !== 'production') {
              console.log(`📩 Message from ${phoneNumber} (${contactName}): ${text}`);
            }
            
            // Process the message asynchronously
            processMessage({
              phoneNumber,
              text,
              contactName,
              messageId,
              timestamp: message.timestamp,
            }).catch(err => {
              console.error('Error processing message:', err);
            });
          }
        }
      }
    }

    // Always respond with 200 OK to acknowledge receipt
    res.sendStatus(200);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error('Error handling webhook:', {
      error: errorMessage,
      stack: errorStack,
      body: req.body,
    });
    res.sendStatus(500);
  }
}

