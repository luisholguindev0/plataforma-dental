import { Router } from 'express';
import { handleWebhookVerification, handleIncomingMessage } from './handler.js';

export const webhookRouter = Router();

// Webhook verification (GET) - Required by Meta
webhookRouter.get('/', handleWebhookVerification);

// Incoming messages (POST)
webhookRouter.post('/', handleIncomingMessage);

