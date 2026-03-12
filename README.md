# 🚀 Entrenador ICFES - Prototipo Diagnóstico

## 📌 Contexto General (Vibe Coding Context)
Hola, IA colega. Bienvenida al proyecto **Entrenador ICFES**.
Este es un **prototipo inicial, puro y ligero** escrito 100% en **Vanilla JavaScript, HTML y CSS**. No usamos React, ni Vue, ni Tailwind, ni dependencias externas (NPM). 

**El objetivo central del prototipo es validar el flujo de aprendizaje:**
1. El estudiante hace un simulacro diagnóstico (20 preguntas, 4 por área).
2. Responde cada pregunta en un entorno simulado (tarjetas iterativas con scroll propio, pero sin recargar pantallas).
3. Obtiene **retroalimentación inmediata** (se bloquean opciones y sube un footer).
4. El núcleo del prototipo: El botón **"Ver cómo se resuelve"** despliega un **Learning Panel** (Bottom Sheet) directamente sobre la vista actual, sin cambiar de ruta, sin perder el contexto visual de la pregunta, ofreciendo un desglose de 3 pasos y conceptos clave.
5. Al finalizar las 20 preguntas, una pantalla de **Resultados** calcula el puntaje global y por área.

---

## 📂 Arquitectura de Archivos

```text
/entrenador icfes
│
├── index.html                   # Shell mínimo de la app. Carga los assets.
│
├── /pdfs
│   └── README.txt               # Directorio futuro para almacenar PDFs de donde extraer más preguntas.
│
├── /src
│   ├── /css
│   │   └── style.css            # ✨ ÚNICO archivo de estilos.
│   │
│   └── /js
│       ├── questions.js         # 🗄️ Base de datos (Constantes: QUESTIONS y CONTEXTS).
│       └── app.js               # 🧠 Toda la lógica de negocio y renderizado UI (DOM dinámico).
```

---

## 🛠️ Reglas del Proyecto (Estricto)

1. **Vanilla Core:** Mantener la pureza de Vanilla JS/CSS. Nada de bundlers complejos hasta que la arquitectura de prototipo pase a MVP escalable.
2. **Anti-Flicker / DOM Updates:** Las interacciones dentro de una misma pregunta (seleccionar opción, abrir panel de aprendizaje) **NO DEBEN RE-RENDERIZAR** la pantalla entera usando `app.innerHTML`. Solo se manipulan las clases de CSS (`classList.add('visible')`) o se inyectan/reemplazan bloques (`appendChild`) relativos a `app` para asegurar que el `position: fixed` mantenga el panel de aprendizaje relativo al Viewport y **nunca al scroll**.
3. **Escala y Mobile-First:** El `<div id="app">` está restringido a `max-width: 480px` centrado. La UI prioriza la legibilidad móvil, el scroll vertical para las tarjetas de contexto de las preguntas y los "Bottom Sheets" para ventanas modales. Está bloqueado a `maximum-scale=1.0` y `-webkit-tap-highlight-color: transparent` para evitar el zoom dinámico de iOS/Android al interactuar.
4. **Estado Central (State Machine):** En `app.js`, todo gira alrededor del objeto `const S`, que rastrea la vista actual (`screen`), índice de pregunta (`qIndex`), opciones marcadas (`answered`, `selected`, `answers`), y el tiempo (`elapsed`).

---

## 🧩 Modulos y Componentes Actuales

### 1. `src/js/questions.js`
Almacena el Mockup Data:
- `CONTEXTS`: Diccionario de textos/imágenes que requieren más de 1 párrafo y pueden compartirse.
- `QUESTIONS`: Array de 20 preguntas. Cada una tiene: `id`, `area`, `icon`, `contextId`, `question`, `options{}`, `correct`, y un objeto `explanation` que alimenta el **Learning Panel** (`context`, `concepts[]`, `step1`, `step2`, `step3`).

### 2. `src/js/app.js`
Diseñado alrededor de renderización basada en estado puro de JS a DOM:
- `render()`: Enruta la pantalla dependiendo de `S.screen`.
- `renderWelcome()` & `renderInstructions()`: Flujo de entrada (Onboarding).
- `renderQuestion()`: 
  - Crea la vista (Scrollable `#q-content`). 
  - Mapea botones de opción.
  - Ojo: Agrega separadamente `footer` y `overlay/panel` directo a `app` para solucionar el infame bug del `transform + position:fixed`.
- `handleSelect(key)`: Actualiza estilos `.opt-btn`, evalúa si está correcto, e inyecta dinámicamente el feedback en el `q-footer` y lo anima hacia arriba.
- `renderLearningPanel(q)`: Crea el overlay interactivo basado en `q.explanation`.
- `renderResults()`: Calcula % totales, agrupa arrays basado en la métrica `.area` de cada pregunta y renderiza el dona y gráficas de barra progresivas.

### 3. `src/css/style.css`
- Modo Oscuro nativo (`--bg: #0d0d1a`, `--primary: #7c3aed`, `--secondary: #06b6d4`).
- **Cards & Stacks:** Los textos de contexto están en `.ctx-card` separados por espacios para facilitar lectura. 
- **Bottom Sheets Animados:** `.q-footer` y `.learning-panel` usan `transform: translateY(110%)` por default y `.visible` lo devuelve a `translateY(0)` vía cubic-bezier fluidos. 
- **Sticky Elements:** La barra de progreso y métricas (`.q-header`, `.q-progress`) viven adheridos arriba.

---

## 🚀 Próximos Pasos de Vibe Coding

Si tomas este proyecto para iterar en el futuro, las áreas de crecimiento recomendadas son:

1. **Extracción y poblamiento de Banco:** Crear un script de Node que procese PDFs de `pdfs/`, detectando con Regex u OCR enunciados y opciones para volcarlos al Json de `/questions.js`.
2. **Historial Persistente:** Conectar Firebase o LocalStorage para guardar las `S.answers` a la variable local de progreso antes de reiniciarlo si refresca.
3. **Pausar Diagnóstico:** Integrar `clearInterval(S.timerInterval)` manejado localmente si el usuario abandona la página y resume luego.

¡Disfruta el código!
