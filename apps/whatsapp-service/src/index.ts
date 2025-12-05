import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { webhookRouter } from './webhook/router.js';

dotenv.config();

/**
 * Validate all required environment variables
 */
function validateEnvironmentVariables() {
  const requiredVars = [
    'SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'WHATSAPP_PHONE_NUMBER_ID',
    'WHATSAPP_ACCESS_TOKEN',
    'WHATSAPP_VERIFY_TOKEN',
    'DEEPSEEK_API_KEY',
  ];

  const missingVars: string[] = [];

  for (const varName of requiredVars) {
    if (!process.env[varName] || process.env[varName]?.trim() === '') {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.error('\nPlease set all required environment variables before starting the server.');
    process.exit(1);
  }

  // Validate that Supabase URL is a valid URL
  try {
    new URL(process.env.SUPABASE_URL!);
  } catch {
    console.error('❌ SUPABASE_URL is not a valid URL');
    process.exit(1);
  }

  console.log('✅ All environment variables validated');
}

// Validate environment variables before starting
validateEnvironmentVariables();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// WhatsApp webhook routes
app.use('/webhook', webhookRouter);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`🚀 WhatsApp Service running on port ${PORT}`);
    console.log(`📱 Webhook URL: http://localhost:${PORT}/webhook`);
  }
  // In production, only log essential startup message
  if (process.env.NODE_ENV === 'production') {
    console.log(`🚀 WhatsApp Service running on port ${PORT}`);
  }
});

export default app;

