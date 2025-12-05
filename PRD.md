# Product Requirements Document (PRD)
## Refactorización Completa de Plataforma Dental Web

**Versión:** 1.0  
**Fecha:** 2025-01-27  
**Estado:** Planificación  
**Objetivo:** Transformar la aplicación web en una plataforma moderna, elegante y funcional con diseño premium tipo Google/Apple/Tesla

---

## 1. Resumen Ejecutivo

### 1.1 Problemas Identificados

#### Críticos
- ❌ **Página de Settings inexistente**: Referenciada en Sidebar y Header pero no existe la ruta `/dashboard/settings`
- ❌ **Calendario roto**: Componente `AppointmentCalendar` tiene problemas de renderizado y funcionalidad
- ❌ **Contraste de colores**: Texto claro sobre fondos blancos, variables CSS mal aplicadas
- ❌ **Estilos inconsistentes**: Mezcla de temas (futurista oscuro en landing, dorado en dashboard)
- ❌ **Tailwind V4 mal configurado**: Variables CSS no integradas correctamente con Tailwind
- ❌ **Componentes shadcn incompletos**: Faltan variantes y configuraciones

#### Importantes
- ⚠️ **Landing page con elementos rotos**: Componentes con estilos inconsistentes
- ⚠️ **Sistema de diseño fragmentado**: Múltiples sistemas de colores y estilos
- ⚠️ **Falta de interactividad visual**: Demasiado texto, poco visual
- ⚠️ **Responsive design inconsistente**: Problemas en móviles y tablets
- ⚠️ **Performance**: Posibles problemas de carga de recursos

### 1.2 Objetivos

1. **Diseño Premium Minimalista**
   - Estilo tipo Google/Apple/Tesla: limpio, espacioso, elegante
   - Paleta de colores consistente y profesional
   - Tipografía moderna y legible
   - Espaciado generoso y jerarquía visual clara

2. **Experiencia Visual-First**
   - Menos texto, más iconos y visualizaciones
   - Interacciones fluidas y animaciones sutiles
   - Componentes interactivos y responsivos
   - Feedback visual inmediato

3. **Funcionalidad Completa**
   - Todas las páginas funcionando correctamente
   - Calendario completamente funcional
   - Sistema de settings completo
   - Navegación intuitiva

4. **Tecnología Moderna**
   - Tailwind CSS V4 correctamente configurado
   - shadcn/ui completamente integrado
   - Sistema de diseño unificado
   - Optimización de performance

---

## 2. Análisis Técnico Detallado

### 2.1 Arquitectura Actual

```
apps/web/
├── src/
│   ├── app/
│   │   ├── (auth)/          # Rutas de autenticación
│   │   ├── (dashboard)/     # Rutas del dashboard
│   │   │   └── dashboard/
│   │   │       ├── appointments/  ✅ Existe
│   │   │       ├── patients/     ✅ Existe
│   │   │       ├── finances/     ✅ Existe
│   │   │       ├── documents/    ✅ Existe
│   │   │       ├── conversations/ ✅ Existe
│   │   │       └── settings/     ❌ NO EXISTE
│   │   └── page.tsx          # Landing page
│   ├── components/
│   │   ├── dashboard/       # Componentes del dashboard
│   │   ├── landing/         # Componentes de landing
│   │   └── ui/              # Componentes shadcn
│   └── lib/                 # Utilidades
```

### 2.2 Problemas de Estilos Identificados

#### CSS Variables vs Tailwind
- **Problema**: Uso de `var(--gold-primary)` en clases Tailwind no funciona correctamente
- **Solución**: Migrar a sistema de tokens de Tailwind V4 usando `@theme`

#### Contraste de Colores
- **Problema**: Texto gris claro (`text-gray-400`) sobre fondo blanco
- **Solución**: Implementar sistema de contraste WCAG AA mínimo

#### Temas Inconsistentes
- **Problema**: Landing usa tema oscuro futurista, Dashboard usa tema claro dorado
- **Solución**: Unificar en un solo sistema de diseño con modo claro/oscuro opcional

### 2.3 Componentes Problemáticos

1. **AppointmentCalendar.tsx**
   - Usa variables CSS directamente en className
   - Falta de estados hover/focus consistentes
   - Vista mensual con problemas de layout

2. **Landing Components**
   - Hero.tsx: Estilos futuristas no consistentes
   - Services.tsx: Cards con glassmorphism mal aplicado
   - About.tsx: Placeholder de imagen roto

3. **UI Components**
   - Badge: Variantes `success` y `warning` no están en todos los lugares
   - Button: Gradientes con variables CSS que pueden no renderizar
   - Card: Falta de variantes para diferentes contextos

---

## 3. Plan de Implementación

### Fase 1: Fundación del Sistema de Diseño (Prioridad Alta)

#### 3.1 Configuración de Tailwind V4
**Archivos a modificar:**
- `apps/web/src/app/globals.css`
- `apps/web/postcss.config.mjs`
- Crear `apps/web/tailwind.config.ts` (si es necesario)

**Tareas:**
1. Migrar todas las variables CSS a tokens de Tailwind usando `@theme`
2. Definir paleta de colores unificada:
   ```css
   @theme {
     --color-primary-50: #fef9e7;
     --color-primary-100: #fef3c7;
     --color-primary-500: #d4af37; /* Gold principal */
     --color-primary-600: #b8941e;
     --color-primary-900: #7c5e0f;
     
     --color-gray-50: #fafafa;
     --color-gray-100: #f5f5f5;
     --color-gray-900: #212121;
   }
   ```
3. Configurar tipografía con variables de fuente
4. Definir sistema de espaciado consistente
5. Configurar sombras y bordes

#### 3.2 Sistema de Colores Unificado
**Objetivo**: Un solo sistema de colores para toda la aplicación

**Paleta propuesta:**
- **Primario**: Dorado elegante (#D4AF37) para acciones principales
- **Secundario**: Grises neutros para fondos y texto
- **Acento**: Azul profesional para información (#2563eb)
- **Éxito**: Verde (#10b981)
- **Advertencia**: Ámbar (#f59e0b)
- **Error**: Rojo (#ef4444)

**Implementación:**
- Eliminar variables CSS duplicadas
- Usar tokens de Tailwind exclusivamente
- Crear utilidades para estados (hover, focus, active)

#### 3.3 Componentes shadcn/ui Base
**Componentes a revisar/crear:**
- ✅ Button (mejorar)
- ✅ Badge (completar variantes)
- ✅ Card (agregar variantes)
- ✅ Input (revisar estilos)
- ✅ Select (revisar estilos)
- ✅ Calendar (integrar con react-day-picker correctamente)
- ✅ Dialog (revisar)
- ✅ Dropdown Menu (revisar)
- ✅ Tabs (revisar)
- ✅ Popover (revisar)

**Tareas:**
1. Asegurar que todos los componentes usen tokens de Tailwind
2. Eliminar referencias a variables CSS directas
3. Agregar variantes faltantes
4. Mejorar estados interactivos (hover, focus, disabled)

---

### Fase 2: Dashboard - Rediseño Completo (Prioridad Alta)

#### 3.4 Layout del Dashboard
**Archivos a modificar:**
- `apps/web/src/components/dashboard/DashboardLayoutClient.tsx`
- `apps/web/src/components/dashboard/Sidebar.tsx`
- `apps/web/src/components/dashboard/Header.tsx`

**Mejoras:**
1. **Sidebar**
   - Diseño más limpio y espacioso
   - Iconos más grandes y claros
   - Estados activos más visibles
   - Mejor feedback visual en hover
   - Animaciones sutiles

2. **Header**
   - Barra superior más delgada y elegante
   - Búsqueda mejorada con icono
   - Menú de usuario más refinado
   - Notificaciones visuales

3. **Contenedor Principal**
   - Padding y espaciado consistente
   - Fondo limpio (blanco/gris muy claro)
   - Cards con sombras sutiles

#### 3.5 Página Principal del Dashboard
**Archivo:** `apps/web/src/app/(dashboard)/dashboard/page.tsx`

**Mejoras:**
1. **Cards de Estadísticas**
   - Diseño más visual con iconos grandes
   - Gráficos pequeños o indicadores visuales
   - Animaciones al cargar
   - Mejor jerarquía visual

2. **Listas de Contenido**
   - Cards más espaciadas
   - Avatares o iconos para pacientes
   - Badges de estado más visibles
   - Acciones rápidas más accesibles

3. **Quick Actions**
   - Grid de acciones más visual
   - Iconos grandes y descriptivos
   - Hover states mejorados

#### 3.6 Calendario de Citas
**Archivos:**
- `apps/web/src/components/dashboard/appointments/AppointmentCalendar.tsx`
- `apps/web/src/app/(dashboard)/dashboard/appointments/page.tsx`

**Problemas a resolver:**
1. Variables CSS en className no funcionan
2. Vista mensual con layout roto
3. Falta de estados interactivos
4. Colores de estado inconsistentes

**Solución:**
1. Reescribir componente usando solo clases Tailwind
2. Mejorar vista mensual con grid más claro
3. Agregar drag & drop (opcional, futuro)
4. Mejorar vista semanal con mejor espaciado
5. Agregar tooltips y modales para detalles

#### 3.7 Página de Settings (NUEVA)
**Archivo a crear:** `apps/web/src/app/(dashboard)/dashboard/settings/page.tsx`

**Secciones:**
1. **Perfil de Usuario**
   - Foto de perfil
   - Información personal
   - Cambio de contraseña

2. **Preferencias**
   - Tema (claro/oscuro)
   - Idioma
   - Notificaciones
   - Zona horaria

3. **Configuración del Negocio**
   - Información del consultorio
   - Horarios de atención
   - Servicios ofrecidos
   - Integraciones (WhatsApp, etc.)

4. **Seguridad**
   - Autenticación de dos factores
   - Sesiones activas
   - Historial de acceso

**Diseño:**
- Layout tipo formulario con tabs
- Cards para cada sección
- Formularios con validación visual
- Guardado automático o botones claros

---

### Fase 3: Landing Page - Rediseño Completo (Prioridad Media)

#### 3.8 Hero Section
**Archivo:** `apps/web/src/components/landing/Hero.tsx`

**Problemas:**
- Estilo futurista demasiado extremo
- Texto difícil de leer
- Animaciones pesadas
- No responsive bien

**Nuevo diseño:**
1. **Estilo Minimalista Premium**
   - Fondo limpio (blanco o gris muy claro)
   - Tipografía grande y legible
   - Espaciado generoso
   - Imagen del doctor prominente

2. **CTA Principal**
   - Botón grande y claro
   - WhatsApp integration visible
   - Formulario de contacto rápido

3. **Elementos Visuales**
   - Imágenes reales del consultorio
   - Iconos simples y claros
   - Animaciones sutiles

#### 3.9 Sección de Servicios
**Archivo:** `apps/web/src/components/landing/Services.tsx`

**Mejoras:**
1. Cards más limpias y profesionales
2. Iconos más simples (no futuristas)
3. Descripciones más claras y menos técnicas
4. Imágenes de servicios reales
5. CTAs más claros

#### 3.10 Otras Secciones de Landing
**Archivos:**
- `About.tsx` - Rediseño completo, imagen real del doctor
- `Testimonials.tsx` - Cards más elegantes
- `Location.tsx` - Mapa integrado, información clara
- `Footer.tsx` - Más limpio y organizado
- `Header.tsx` - Navegación más clara

---

### Fase 4: Componentes de UI Mejorados (Prioridad Media)

#### 3.11 Formularios
**Mejoras:**
1. Inputs con mejor feedback visual
2. Labels flotantes o siempre visibles
3. Validación en tiempo real
4. Mensajes de error claros
5. Estados de carga visibles

#### 3.12 Tablas y Listas
**Mejoras:**
1. Tablas más espaciadas
2. Headers claros
3. Filas con hover states
4. Acciones rápidas visibles
5. Paginación mejorada

#### 3.13 Modales y Diálogos
**Mejoras:**
1. Animaciones de entrada/salida suaves
2. Overlay más oscuro
3. Botones de acción claros
4. Cierre intuitivo

---

### Fase 5: Optimización y Polish (Prioridad Baja)

#### 3.14 Performance
1. Lazy loading de imágenes
2. Code splitting de rutas
3. Optimización de fuentes
4. Minimización de CSS/JS

#### 3.15 Accesibilidad
1. Contraste WCAG AA
2. Navegación por teclado
3. Screen reader friendly
4. Focus states visibles

#### 3.16 Responsive Design
1. Mobile-first approach
2. Breakpoints consistentes
3. Touch targets adecuados
4. Menús móviles mejorados

---

## 4. Especificaciones de Diseño

### 4.1 Principios de Diseño

1. **Minimalismo**
   - Espacio en blanco generoso
   - Elementos esenciales solamente
   - Sin decoraciones innecesarias

2. **Claridad**
   - Tipografía legible
   - Contraste adecuado
   - Jerarquía visual clara

3. **Elegancia**
   - Colores sofisticados
   - Transiciones suaves
   - Detalles cuidadosos

4. **Funcionalidad**
   - Interacciones intuitivas
   - Feedback inmediato
   - Flujos claros

### 4.2 Sistema de Espaciado

```
Base: 4px
- xs: 4px (0.25rem)
- sm: 8px (0.5rem)
- md: 16px (1rem)
- lg: 24px (1.5rem)
- xl: 32px (2rem)
- 2xl: 48px (3rem)
- 3xl: 64px (4rem)
```

### 4.3 Tipografía

**Fuentes:**
- **Sans-serif**: DM Sans (ya configurada)
- **Serif**: Playfair Display (solo para títulos principales)

**Escalas:**
- **Display**: 3.5rem (56px) - Hero titles
- **H1**: 2.5rem (40px) - Page titles
- **H2**: 2rem (32px) - Section titles
- **H3**: 1.5rem (24px) - Subsection titles
- **Body**: 1rem (16px) - Texto normal
- **Small**: 0.875rem (14px) - Texto secundario
- **Tiny**: 0.75rem (12px) - Labels, captions

### 4.4 Componentes Base

#### Cards
- Fondo blanco
- Sombra sutil (shadow-sm o shadow-md)
- Border radius: 12px (lg)
- Padding: 24px (lg)
- Hover: Elevación sutil

#### Buttons
- Altura mínima: 44px (touch target)
- Padding horizontal: 24px
- Border radius: 8px (md)
- Estados claros (hover, active, disabled)

#### Inputs
- Altura: 44px
- Border: 1px sólido gris claro
- Border radius: 8px
- Focus: Border color primario + ring

---

## 5. Estructura de Archivos Propuesta

```
apps/web/src/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   └── dashboard/
│   │       ├── page.tsx                    # Dashboard principal
│   │       ├── appointments/
│   │       │   ├── page.tsx
│   │       │   └── new/page.tsx
│   │       ├── patients/
│   │       │   ├── page.tsx
│   │       │   ├── [id]/page.tsx
│   │       │   └── new/page.tsx
│   │       ├── finances/
│   │       │   ├── page.tsx
│   │       │   └── new/page.tsx
│   │       ├── documents/
│   │       │   └── page.tsx
│   │       ├── conversations/
│   │       │   └── page.tsx
│   │       └── settings/                    # NUEVO
│   │           └── page.tsx
│   ├── layout.tsx
│   └── page.tsx                             # Landing page
├── components/
│   ├── dashboard/
│   │   ├── DashboardLayoutClient.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── appointments/
│   │   │   └── AppointmentCalendar.tsx      # REESCRIBIR
│   │   └── settings/                        # NUEVO
│   │       ├── ProfileSection.tsx
│   │       ├── PreferencesSection.tsx
│   │       ├── BusinessSection.tsx
│   │       └── SecuritySection.tsx
│   ├── landing/
│   │   ├── Header.tsx                       # MEJORAR
│   │   ├── Hero.tsx                         # REESCRIBIR
│   │   ├── Services.tsx                     # REESCRIBIR
│   │   ├── About.tsx                        # REESCRIBIR
│   │   ├── Testimonials.tsx                 # MEJORAR
│   │   ├── Location.tsx                     # MEJORAR
│   │   ├── Footer.tsx                       # MEJORAR
│   │   └── WhatsAppButton.tsx               # MEJORAR
│   └── ui/                                  # Todos los componentes shadcn
│       ├── button.tsx                       # MEJORAR
│       ├── badge.tsx                        # COMPLETAR
│       ├── card.tsx                         # MEJORAR
│       ├── input.tsx                        # MEJORAR
│       ├── calendar.tsx                     # REVISAR
│       └── ... (otros componentes)
├── lib/
│   ├── utils.ts
│   └── supabase/
└── styles/
    └── globals.css                           # REESCRIBIR con Tailwind V4
```

---

## 6. Checklist de Implementación

### Fase 1: Fundación
- [ ] Configurar Tailwind V4 con tokens correctos
- [ ] Crear sistema de colores unificado
- [ ] Migrar variables CSS a tokens Tailwind
- [ ] Revisar y mejorar todos los componentes shadcn base
- [ ] Crear guía de estilos documentada

### Fase 2: Dashboard
- [ ] Rediseñar Sidebar
- [ ] Rediseñar Header
- [ ] Mejorar página principal del dashboard
- [ ] Reescribir componente AppointmentCalendar
- [ ] Crear página de Settings completa
- [ ] Mejorar todas las páginas del dashboard

### Fase 3: Landing Page
- [ ] Reescribir Hero section
- [ ] Rediseñar Services section
- [ ] Mejorar About section
- [ ] Mejorar Testimonials
- [ ] Mejorar Location section
- [ ] Mejorar Footer
- [ ] Mejorar Header de landing

### Fase 4: Componentes UI
- [ ] Mejorar formularios
- [ ] Mejorar tablas y listas
- [ ] Mejorar modales
- [ ] Agregar componentes faltantes

### Fase 5: Optimización
- [ ] Optimizar performance
- [ ] Mejorar accesibilidad
- [ ] Asegurar responsive design
- [ ] Testing completo

---

## 7. Métricas de Éxito

### Técnicas
- ✅ Todas las páginas funcionan sin errores
- ✅ Contraste WCAG AA en todos los elementos
- ✅ Carga inicial < 3 segundos
- ✅ Lighthouse score > 90

### UX
- ✅ Navegación intuitiva
- ✅ Feedback visual inmediato
- ✅ Diseño consistente en toda la app
- ✅ Responsive en todos los dispositivos

### Visuales
- ✅ Diseño limpio y profesional
- ✅ Colores consistentes
- ✅ Tipografía legible
- ✅ Espaciado adecuado

---

## 8. Notas de Implementación

### Orden Recomendado
1. **Primero**: Sistema de diseño (Fase 1)
2. **Segundo**: Dashboard crítico (Settings, Calendar) - Fase 2
3. **Tercero**: Mejoras visuales dashboard - Fase 2
4. **Cuarto**: Landing page - Fase 3
5. **Quinto**: Polish y optimización - Fases 4 y 5

### Consideraciones
- Hacer commits frecuentes por fase
- Testear en producción después de cada fase importante
- Documentar decisiones de diseño
- Mantener consistencia con el sistema de diseño

### Recursos Necesarios
- Imágenes del consultorio y doctor
- Iconos consistentes (usar lucide-react que ya está)
- Fuentes ya configuradas (DM Sans, Playfair Display)

---

## 9. Próximos Pasos

1. **Revisar este PRD** y ajustar según necesidades
2. **Priorizar fases** según urgencia del negocio
3. **Comenzar con Fase 1** (Fundación del sistema de diseño)
4. **Iterar** en base a feedback
5. **Documentar** cambios importantes

---

**Documento creado:** 2025-01-27  
**Última actualización:** 2025-01-27  
**Estado:** Listo para implementación
