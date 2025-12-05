# Plataforma Dental - Dr. Jhoiner Marquez

Plataforma profesional completa para el consultorio dental del Dr. Jhoiner Marquez en Barranquilla, Colombia. Incluye página web pública, CRM/Dashboard de gestión, y automatización de WhatsApp con IA.

## 📋 Tabla de Contenidos

- [Arquitectura](#arquitectura)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración Local](#configuración-local)
- [Base de Datos](#base-de-datos)
- [Despliegue](#despliegue)
- [Configuración de WhatsApp](#configuración-de-whatsapp)
- [Variables de Entorno](#variables-de-entorno)

## 🏗️ Arquitectura

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   WhatsApp      │────▶│  Microservicio   │────▶│    Supabase     │
│   Business API  │     │  (Railway)       │     │  (PostgreSQL)   │
│   +57 301 499   │◀────│  + DeepSeek AI   │◀────│  + Storage      │
└─────────────────┘     └──────────────────┘     └────────┬────────┘
                                                          │
                        ┌──────────────────┐              │
                        │   Next.js App    │◀─────────────┘
                        │   (Vercel)       │
                        │  Landing + CRM   │
                        └──────────────────┘
```

### Flujo de Datos

1. **Usuario contacta por WhatsApp** → Meta envía webhook al microservicio
2. **Microservicio procesa mensaje** → Crea/actualiza perfil de paciente en Supabase
3. **DeepSeek genera respuesta** → Respuesta personalizada basada en contexto del paciente
4. **Sistema califica automáticamente** → Actualiza estado de calificación según criterios
5. **Dashboard refleja cambios** → El Dr. ve nuevos leads y conversaciones en tiempo real

## 🛠️ Tecnologías

| Componente | Tecnología |
|------------|------------|
| Framework Web | Next.js 14 (App Router) |
| Estilos | Tailwind CSS |
| Base de Datos | Supabase (PostgreSQL) |
| Autenticación | Supabase Auth |
| Storage | Supabase Storage |
| IA/Chatbot | DeepSeek API |
| WhatsApp | Meta WhatsApp Business API |
| Despliegue Web | Vercel |
| Despliegue Servicio | Railway |
| Monorepo | Turborepo |

## 📁 Estructura del Proyecto

```
plataforma-dental/
├── apps/
│   ├── web/                        # Next.js Application
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (public)/       # Landing page pública
│   │   │   │   ├── (auth)/         # Páginas de autenticación
│   │   │   │   └── (dashboard)/    # CRM protegido
│   │   │   ├── components/
│   │   │   │   ├── landing/        # Componentes de landing
│   │   │   │   ├── dashboard/      # Componentes del CRM
│   │   │   │   └── ui/             # Componentes reutilizables
│   │   │   └── lib/
│   │   │       └── supabase/       # Clientes de Supabase
│   │   └── package.json
│   │
│   └── whatsapp-service/           # Microservicio Node.js
│       ├── src/
│       │   ├── webhook/            # Handlers de WhatsApp
│       │   ├── ai/                 # Integración DeepSeek
│       │   ├── services/           # Lógica de negocio
│       │   └── config/             # Configuraciones
│       ├── Dockerfile
│       └── package.json
│
├── packages/
│   └── database/                   # Schema y tipos compartidos
│       ├── schema.sql
│       └── types.ts
│
├── turbo.json
├── vercel.json
└── README.md
```

## 🚀 Configuración Local

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Cuenta de Supabase
- Cuenta de DeepSeek
- Cuenta de Meta Business (para WhatsApp)

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd plataforma-dental
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Para la aplicación web (`apps/web/`):
```bash
cp apps/web/env.example apps/web/.env.local
```

Para el microservicio (`apps/whatsapp-service/`):
```bash
cp apps/whatsapp-service/env.example apps/whatsapp-service/.env
```

4. **Configurar la base de datos**

Ve a tu proyecto de Supabase y ejecuta el contenido de `packages/database/schema.sql` en el SQL Editor.

5. **Iniciar en desarrollo**
```bash
# Iniciar toda la plataforma
npm run dev

# O iniciar proyectos individualmente
npm run dev:web        # Solo la app web
npm run dev:whatsapp   # Solo el microservicio
```

## 🗄️ Base de Datos

### Esquema de Tablas

| Tabla | Descripción |
|-------|-------------|
| `patients` | Pacientes/clientes con estado de calificación |
| `appointments` | Citas agendadas |
| `transactions` | Transacciones financieras |
| `patient_documents` | Metadatos de documentos |
| `chat_sessions` | Historial de conversaciones WhatsApp |
| `admin_users` | Usuarios del dashboard |

### Sistema de Calificación

Los pacientes se califican automáticamente basándose en 4 criterios:

| Criterio | Descripción |
|----------|-------------|
| `has_budget` | Tiene presupuesto para el tratamiento |
| `has_urgency` | Tiene urgencia o necesidad inmediata |
| `is_local` | Está en Barranquilla o zonas cercanas |
| `interested_in_appointment` | Mostró interés en agendar cita |

**Estados de calificación:**
- `qualified`: 3-4 criterios cumplidos
- `pending`: 1-2 criterios cumplidos
- `not_qualified`: 0 criterios cumplidos

### Storage

El bucket `patient-documents` almacena:
- Radiografías
- Fotos antes/después
- Contratos
- Consentimientos
- Otros documentos

## 🌐 Despliegue

### Vercel (Aplicación Web)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`

3. Despliega con:
```bash
vercel --prod
```

### Railway (Microservicio WhatsApp)

1. Crea un nuevo proyecto en Railway
2. Conecta el repositorio y selecciona `apps/whatsapp-service`
3. Configura las variables de entorno:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `WHATSAPP_PHONE_NUMBER_ID`
   - `WHATSAPP_ACCESS_TOKEN`
   - `WHATSAPP_VERIFY_TOKEN`
   - `DEEPSEEK_API_KEY`

4. Railway detectará el Dockerfile y desplegará automáticamente

## 📱 Configuración de WhatsApp

### Requisitos

1. Cuenta de Meta Business verificada
2. App de WhatsApp Business configurada
3. Número de teléfono verificado (+57 301 499 0844)

### Pasos

1. Ve a [Meta Developer Console](https://developers.facebook.com/)
2. Crea o selecciona tu app de WhatsApp Business
3. En "WhatsApp > Configuration":
   - Configura el Webhook URL: `https://tu-servicio.railway.app/webhook`
   - Configura el Verify Token: `dental_platform_verify_token`
   - Suscríbete a los eventos: `messages`
4. Obtén el `Phone Number ID` y `Access Token`

### Flujo de Mensajes

```
Usuario envía mensaje
       ↓
Meta envía POST a /webhook
       ↓
Handler extrae mensaje y contacto
       ↓
Crea/actualiza paciente en Supabase
       ↓
Obtiene historial de conversación
       ↓
Analiza criterios de calificación
       ↓
DeepSeek genera respuesta contextual
       ↓
Guarda en historial de chat
       ↓
Envía respuesta por WhatsApp API
```

## 🔐 Variables de Entorno

### Aplicación Web (`apps/web/.env.local`)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=573014990844
```

### Microservicio (`apps/whatsapp-service/.env`)

```env
# Server
PORT=3001

# Supabase
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# WhatsApp Business API
WHATSAPP_PHONE_NUMBER_ID=1234567890
WHATSAPP_ACCESS_TOKEN=EAAxxxx...
WHATSAPP_VERIFY_TOKEN=dental_platform_verify_token

# DeepSeek AI
DEEPSEEK_API_KEY=sk-xxxx...
```

## 📊 Módulos del Dashboard

### Pacientes
- Lista con filtros por estado de calificación
- Vista detallada con historial
- CRUD completo

### Citas
- Calendario visual (día/semana/mes)
- Estados: Agendada, Confirmada, Completada, Cancelada

### Documentos
- Upload a Supabase Storage
- Categorización por tipo
- Visor integrado

### Finanzas
- Dashboard con métricas
- Ingresos y gastos
- Historial por paciente

### Conversaciones
- Historial de chats WhatsApp
- Estado de calificación en tiempo real

## 🤖 Chatbot IA

El chatbot está entrenado para:

1. **Dar la bienvenida** de forma cálida y profesional
2. **Informar sobre servicios**:
   - Estética Dental
   - Diseño de Sonrisa
   - Rehabilitación Oral
3. **Calificar pacientes** mediante preguntas naturales
4. **Agendar valoraciones** cuando el paciente está listo
5. **Proporcionar información** del consultorio

### Personalización del Prompt

El prompt de sistema se encuentra en:
`apps/whatsapp-service/src/ai/deepseek.ts`

Puedes modificarlo para ajustar:
- Tono de comunicación
- Información de servicios
- Criterios de calificación
- Flujo de agendamiento

## 📝 Licencia

Este proyecto es propiedad del Dr. Jhoiner Marquez. Todos los derechos reservados.

---

Desarrollado con ❤️ para transformar sonrisas en Barranquilla 🦷

