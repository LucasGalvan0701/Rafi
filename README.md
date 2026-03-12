# 🚀 Entrenador ICFES - Sistema de Estudio Adaptativo

## 📌 Contexto General
Este proyecto ha evolucionado de un simple simulador a un **sistema de estudio semanal adaptativo**. El objetivo es proporcionar al estudiante una guía clara ("El Camino") basada en sus debilidades reales, optimizando su tiempo de estudio.

**Tecnología:** Escrito 100% en **Vanilla JavaScript, HTML y CSS**. Sin dependencias pesadas, enfocado en rendimiento y experiencia de usuario fluida.
**Backend:** Integración con **Supabase** para autenticación controlada y almacenamiento de resultados.

---

## 🔄 Flujo de la Aplicación
1. **Login Restringido:** Acceso solo para usuarios creados manualmente en la base de datos (Nombre/Contraseña).
2. **Fase de Escaneo (Diagnóstico):** Examen de 25 preguntas (5 por área) para mapear debilidades.
3. **Generación de Plan:** Algoritmo que detecta las 2 áreas más críticas.
4. **Roadmap Semanal:** Presentación de un plan de **40 preguntas semanales** enfocado un 60% en la debilidad principal y 40% en la secundaria.
5. **Home (Panel de Control):**
    - **Puntaje Estimado:** Cálculo proyectado en escala 0-500.
    - **Cuenta Regresiva:** Días restantes para el examen ICFES real.
    - **Plan Activo:** Visualización clara de las tareas de la semana.
    - **Progreso por Área:** Gráficos de barras con el nivel de preparación actual.

---

## 📂 Arquitectura de Archivos Actualizada

```text
/entrenador icfes
│
├── index.html                   # Shell de la app.
├── README.md                    # Esta guía.
│
├── /src
│   ├── /css
│   │   └── style.css            # ✨ Sistema de diseño, animaciones y componentes.
│   │
│   └── /js
│       ├── questions.js         # 🗄️ Banco de preguntas y contextos.
│       └── app.js               # 🧠 Lógica de negocio (State Machine), Router y Supabase.
```

---

## 🛠️ Características Clave

### 🔐 Seguridad y Acceso
- El acceso es restringido. El administrador crea los usuarios directamente en la tabla `students` de Supabase.
- Al iniciar sesión, se captura el perfil del estudiante para personalizar toda la experiencia.

### 🎯 Plan Semanal Dinámico
- El sistema no crea un plan estático. Cada semana se recalcula basándose en los últimos resultados, asegurando que el estudiante siempre esté atacando sus puntos más débiles.
- Meta fija: **40 preguntas semanales**.

### 📊 Métricas e Inteligencia
- **Puntaje Proyectado:** Conversión de aciertos de diagnóstico a la escala oficial ICFES (0-500).
- **Learning Panel:** Desglose pedagógico en 3 pasos para cada pregunta fallida.

### 🛠️ Herramientas de Desarrollo (Debug Mode)
- **Skip Diagnostic:** Atajo en la pantalla de login para saltar el diagnóstico y entrar directamente al Home con datos aleatorios (solo para pruebas de UI/UX).

---

## 🚀 Próximos Pasos de Desarrollo

1. **Gestión de Sesión:** Implementar persistencia de login para evitar re-ingreso constante.
2. **Historial Evolutivo:** Mostrar una gráfica de cómo el "Puntaje Estimado" sube semana a semana.
3. **Módulo de Práctica:** Crear la interfaz para resolver las 40 preguntas del plan semanal generado.

---
¡El camino al éxito en el ICFES ya tiene mapa! 🧭✨
