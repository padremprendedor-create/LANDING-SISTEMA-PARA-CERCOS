
## 1. Análisis Psicológico y Estrategia Visual
* **Arquetipo de Marca:** **El Gobernante**. Transmite autoridad, control sobre el proceso de ventas y una estructura sólida que elimina el caos de los "leads curiosos".
* **Moodboard Virtual:** **Industrial-Tech, High-Contrast, Precision.** Una estética que mezcla la robustez del sector construcción (cercos) con la eficiencia quirúrgica de la Inteligencia Artificial.
* **Justificación:** El nicho de cercos perimétricos es físico y tangible. Usar un estilo **Dark Mode** con acentos "Electric Green" (del logo) posiciona a la agencia como una entidad tecnológica avanzada, rompiendo con la estética rudimentaria de la competencia y justificando un ticket de $1,000+.

---

## 2. Sistema de Diseño (Tailwind CSS Specs)
* **Paleta de Colores:**
    * **Primary (Brand):** `#0F3D5B` (Coti-Blue) -> `bg-[#0F3D5B]`.
    * **Accent/Action:** `#22C55E` (Electric Green de la chispa) -> `bg-green-500` / `hover:bg-green-400`.
    * **Background:** `bg-[#020617]` (Slate-950) para un look premium y tecnológico.
    * **Text:** `text-slate-50` (H1/H2), `text-slate-400` (Body/Muted).
* **Tipografía (Google Fonts):**
    * **Headings:** `Space Grotesk` (Semi-bold/Bold). Tracking: `-0.02em`. Transmite modernidad técnica.
    * **Body:** `Inter` (Regular/Medium). Alta legibilidad para explicar procesos complejos.
* **Estilos Globales:**
    * **Radio de Borde:** `rounded-2xl` para componentes y `rounded-full` para botones (estilo moderno/SaaS).
    * **Sombras:** `shadow-[0_0_20px_rgba(34,197,94,0.15)]` (Glow verde sutil para destacar la IA).
    * **Efectos:** Bordes finos `border border-white/10` y fondos con `backdrop-blur-lg`.

---

## 3. Instrucciones de Diseño por Sección

### 1️⃣ Hero Section - High Conversion
* **Layout:** Grid 2 columnas (Texto Izquierda / Chat UI Mockup Derecha).
* **Elementos Visuales:** En el lado derecho, una interfaz de chat de WhatsApp con burbujas de IA filtrando a un cliente en tiempo real.
* **Copywriting Vibe:** Directo, agresivo y enfocado en el ROI.

### 2️⃣ Identificación del Dolor (Agitación)
* **Layout:** Contenedor centralizado con tarjetas de borde sutil.
* **Elementos Visuales:** Iconos de "X" roja en los bullets de problemas. La **Frase destacada (Quote)** debe ir en un bloque de `bg-slate-900` con una tipografía cursiva elegante y un borde izquierdo verde neón.

### 3️⃣ VSL Section
* **Layout:** Ancho completo (Max-w-4xl) con marco de video estilo "MacBook" o "Glass Frame".
* **Efectos:** Un sutil resplandor (glow) verde detrás del contenedor del video para atraer la atención.

### 4️⃣ El Mecanismo (Steps)
* **Layout:** Horizontal Stepper en Desktop / Vertical en Mobile.
* **Elementos Visuales:** Cards con `hover:border-green-500/50` transición suave. Cada paso debe tener un icono minimalista de la librería Lucide (Filter, Calculator, Calendar, Repeat).

### 5️⃣ Demo Interactiva
* **Layout:** Mockup de teléfono móvil centrado.
* **Interacciones:** Un botón flotante tipo "Pulse" que invite a chatear.

### 7️⃣ La Oferta (Hormozi Style)
* **Layout:** "Feature Box" destacado con fondo `bg-[#0F3D5B]` y texto blanco.
* **Visuales:** El precio "$1,000" tachado o con una etiqueta de "Paga después de la venta". Garantía con un sello de "Riesgo Cero" diseñado en vectores.

### 8️⃣ Escasez Real
* **Layout:** Banner de urgencia superior o inferior con un "Live Badge" (punto rojo parpadeante) que diga: "Solo quedan 2 cupos para auditoría hoy".

---

## 4. Prompt para el Generador de Código (Meta-Prompt)

> "Create a high-ticket premium landing page for an AI Automation Agency using React, Tailwind CSS, and Lucide Icons. **Theme:** Dark Mode (Slate-950). **Primary Color:** #0F3D5B (Deep Blue) and #22C55E (Electric Green) for CTAs. **Typography:** Space Grotesk for headlines, Inter for body. **Structure:** 1. Hero with a split layout (headline + WhatsApp Chat UI mockup). 2. Pain points section using cards with subtle borders. 3. VSL video placeholder with a green glow effect. 4. 4-step process (Filter, Quote, Schedule, Follow-up) using a clean Bento Grid. 5. Interactive Demo section with a mobile phone frame. 6. Bold Offer section (Hormozi style) with high contrast and a 'Risk-Free' guarantee badge. 7. Lead gen form footer. Use `rounded-2xl` for all containers, `backdrop-blur` for the navbar, and ensure it's mobile-first responsive. All buttons should have a subtle green outer glow on hover."

---
