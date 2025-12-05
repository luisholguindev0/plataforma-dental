# 🚀 Guía de Despliegue - Plataforma Dental

Esta guía te llevará paso a paso para desplegar la plataforma en Vercel (aplicación web) y Railway (servicio WhatsApp).

---

## 📋 PREREQUISITOS

Antes de comenzar, asegúrate de tener:

1. ✅ Cuenta en [Vercel](https://vercel.com) (gratis)
2. ✅ Cuenta en [Railway](https://railway.app) (gratis con créditos)
3. ✅ Cuenta en [Supabase](https://supabase.com) (gratis)
4. ✅ Cuenta en [Meta Business](https://business.facebook.com) para WhatsApp
5. ✅ Cuenta en [DeepSeek](https://www.deepseek.com) para IA
6. ✅ Repositorio en GitHub (recomendado) o GitLab

---

## 📦 PASO 1: Preparar el Repositorio

### 1.1 Subir código a GitHub

```bash
# Si aún no has subido el código
cd /home/luis/Desktop/PLATAFORMAL\ DENTAL/plataforma-dental

# Inicializar git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit - Ready for production"

# Conectar con tu repositorio remoto
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# Subir código
git push -u origin main
```

**⚠️ IMPORTANTE:** Asegúrate de que `.env` y `.env.local` estén en `.gitignore` (no subir credenciales).

---

## 🌐 PASO 2: Desplegar en Vercel (Aplicación Web)

### 2.1 Conectar Repositorio

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Click en **"Add New..."** → **"Project"**
3. Importa tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto Next.js

### 2.2 Configurar el Proyecto

En la configuración del proyecto:

- **Framework Preset:** Next.js (detectado automáticamente)
- **Root Directory:** `apps/web` (Vercel lo detectará del `vercel.json`)
- **Build Command:** `npm run build:web` (ya configurado en `vercel.json`)
- **Output Directory:** `apps/web/.next` (ya configurado en `vercel.json`)
- **Install Command:** `npm install` (ya configurado)

### 2.3 Configurar Variables de Entorno

En la sección **"Environment Variables"**, agrega:

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL=https://tu-app.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=573014990844
```

**📝 Notas:**
- `NEXT_PUBLIC_APP_URL` lo actualizarás después del primer despliegue con la URL real de Vercel
- Todas las variables que empiezan con `NEXT_PUBLIC_` son públicas (se exponen al cliente)
- `SUPABASE_SERVICE_ROLE_KEY` es privada (solo servidor)

### 2.4 Desplegar

1. Click en **"Deploy"**
2. Espera a que termine el build (2-5 minutos)
3. Copia la URL de producción (ej: `https://tu-app.vercel.app`)

### 2.5 Actualizar NEXT_PUBLIC_APP_URL

1. Ve a **Settings** → **Environment Variables**
2. Edita `NEXT_PUBLIC_APP_URL` con la URL real de Vercel
3. Haz un nuevo deploy (Vercel lo hará automáticamente o puedes hacerlo manual)

---

## 🚂 PASO 3: Desplegar en Railway (Servicio WhatsApp)

### 3.1 Crear Proyecto en Railway

1. Ve a [railway.app](https://railway.app) e inicia sesión
2. Click en **"New Project"**
3. Selecciona **"Deploy from GitHub repo"**
4. Conecta tu repositorio

### 3.2 Configurar el Servicio

Railway detectará automáticamente el `railway.json` y el `Dockerfile.whatsapp`.

**⚠️ IMPORTANTE:** Railway debe construir desde la **raíz del monorepo**, no desde `apps/whatsapp-service`.

1. En la configuración del servicio, verifica:
   - **Build Command:** (Railway usará el Dockerfile)
   - **Start Command:** (definido en el Dockerfile)
   - **Dockerfile Path:** `Dockerfile.whatsapp` (en la raíz)

### 3.3 Configurar Variables de Entorno

En **Variables**, agrega todas estas variables:

```
PORT=3001
NODE_ENV=production

# Supabase
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# WhatsApp Business API
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WHATSAPP_VERIFY_TOKEN=dental_platform_verify_token

# DeepSeek AI
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**📝 Notas:**
- `WHATSAPP_PHONE_NUMBER_ID`: Lo obtienes de Meta Developer Console
- `WHATSAPP_ACCESS_TOKEN`: Token temporal o permanente de Meta
- `WHATSAPP_VERIFY_TOKEN`: Puede ser cualquier string, pero debe coincidir con el webhook
- `DEEPSEEK_API_KEY`: Tu API key de DeepSeek

### 3.4 Desplegar

1. Railway comenzará a construir automáticamente
2. Espera a que termine (5-10 minutos la primera vez)
3. Railway generará una URL pública (ej: `https://tu-servicio.up.railway.app`)

### 3.5 Obtener URL del Webhook

1. Ve a **Settings** → **Networking**
2. Railway te dará una URL pública (ej: `https://tu-servicio.up.railway.app`)
3. **Copia esta URL** - la necesitarás para configurar WhatsApp

---

## 📱 PASO 4: Configurar Webhook de WhatsApp

### 4.1 Ir a Meta Developer Console

1. Ve a [developers.facebook.com](https://developers.facebook.com)
2. Selecciona tu app de WhatsApp Business
3. Ve a **WhatsApp** → **Configuration**

### 4.2 Configurar Webhook

1. En **Webhook URL**, pega la URL de Railway:
   ```
   https://tu-servicio.up.railway.app/webhook
   ```

2. En **Verify Token**, ingresa:
   ```
   dental_platform_verify_token
   ```
   (Debe coincidir con `WHATSAPP_VERIFY_TOKEN` en Railway)

3. Click en **"Verify and Save"**

4. En **Webhook fields**, suscríbete a:
   - ✅ `messages`

### 4.3 Obtener Credenciales de WhatsApp

En la misma página de configuración, encontrarás:
- **Phone Number ID**: Cópialo y agrégalo a Railway como `WHATSAPP_PHONE_NUMBER_ID`
- **Access Token**: Cópialo y agrégalo a Railway como `WHATSAPP_ACCESS_TOKEN`

**⚠️ IMPORTANTE:** Si el token es temporal, necesitarás generar uno permanente:
1. Ve a **WhatsApp** → **API Setup**
2. Genera un token permanente
3. Actualiza `WHATSAPP_ACCESS_TOKEN` en Railway

---

## ✅ PASO 5: Verificación Final

### 5.1 Verificar Vercel

1. Visita tu URL de Vercel: `https://tu-app.vercel.app`
2. Deberías ver la landing page
3. Intenta hacer login (si tienes usuarios creados en Supabase)

### 5.2 Verificar Railway

1. Ve a los logs de Railway
2. Deberías ver: `✅ All environment variables validated`
3. Deberías ver: `🚀 WhatsApp Service running on port 3001`

### 5.3 Probar Webhook de WhatsApp

1. Envía un mensaje de WhatsApp al número configurado
2. Revisa los logs de Railway - deberías ver el mensaje procesado
3. Revisa Supabase - debería crearse/actualizarse el paciente

---

## 🔧 SOLUCIÓN DE PROBLEMAS

### Problema: Build falla en Vercel

**Solución:**
- Verifica que `rootDirectory: "apps/web"` esté en `vercel.json`
- Verifica que todas las variables de entorno estén configuradas
- Revisa los logs de build en Vercel

### Problema: Railway no encuentra el Dockerfile

**Solución:**
- Verifica que `Dockerfile.whatsapp` esté en la raíz del repositorio
- Verifica que `railway.json` tenga `"dockerfilePath": "Dockerfile.whatsapp"`

### Problema: Webhook no funciona

**Solución:**
- Verifica que la URL del webhook sea correcta: `https://tu-servicio.up.railway.app/webhook`
- Verifica que `WHATSAPP_VERIFY_TOKEN` en Railway coincida con el de Meta
- Verifica que Railway esté corriendo (revisa logs)

### Problema: Variables de entorno no se cargan

**Solución:**
- En Vercel: Verifica que las variables estén en "Production" environment
- En Railway: Verifica que las variables estén guardadas (click en "Save")
- Reinicia el servicio después de agregar variables

---

## 📊 CHECKLIST FINAL

Antes de considerar el despliegue completo, verifica:

- [ ] Vercel desplegado y accesible
- [ ] Railway desplegado y corriendo
- [ ] Todas las variables de entorno configuradas
- [ ] Webhook de WhatsApp configurado y verificado
- [ ] Base de datos Supabase configurada (schema ejecutado)
- [ ] Storage bucket `patient-documents` creado en Supabase
- [ ] Usuario admin creado en Supabase Auth
- [ ] Prueba de mensaje WhatsApp funcionando

---

## 🔄 ACTUALIZACIONES FUTURAS

### Para actualizar Vercel:
```bash
# Simplemente haz push a GitHub
git push origin main
# Vercel desplegará automáticamente
```

### Para actualizar Railway:
```bash
# Simplemente haz push a GitHub
git push origin main
# Railway detectará cambios y redesplegará
```

---

## 📞 SOPORTE

Si tienes problemas:
1. Revisa los logs en Vercel y Railway
2. Verifica que todas las variables de entorno estén correctas
3. Verifica que el schema de Supabase esté ejecutado
4. Revisa la documentación de [Vercel](https://vercel.com/docs) y [Railway](https://docs.railway.app)

---

**¡Listo! Tu plataforma debería estar funcionando en producción.** 🎉


