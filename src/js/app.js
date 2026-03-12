const S = {
  screen: 'login',      // login | welcome | instructions | question | results | review | generating | roadmap
  qIndex: 0,
  selected: null,
  answered: false,
  answers: [],           // {id, selected, correct, isCorrect, area}
  elapsed: 0,
  timerInterval: null,
  user: { name: '', whatsapp: '' },
  liveFeedback: '',      // Recommendations written during the exam
  finalReview: '',       // Mandatory review at the end
  errors: [],
  supabaseUrl: 'https://eimdtnrehzmxkxdxtaqu.supabase.co',
  supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpbWR0bnJlaHpteGt4ZHh0YXF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNzc4NTcsImV4cCI6MjA4ODg1Mzg1N30.KDdUoGQt8gpdPkOaOSt5_uzlQmfY_Vx8ClXUirmROQ4',
  roadmap: null,         // Will store the weekly study plan
  loginError: ''
};

/* ─── ROOT ELEMENT ──────────────────────────────────── */
const app = document.getElementById('app');

/* ─── TIMER ─────────────────────────────────────────── */
function startTimer() {
  S.elapsed = 0;
  clearInterval(S.timerInterval);
  S.timerInterval = setInterval(() => {
    S.elapsed++;
    const totalMax = 25 * 60; // 25 minutos
    const remaining = totalMax - S.elapsed;

    // Actualizar UI
    const el = document.getElementById('timer-val');
    if (el) el.textContent = fmtTime(remaining);

    // Si se acaba el tiempo
    if (S.elapsed >= totalMax) {
      clearInterval(S.timerInterval);
      alert("¡Se ha agotado el tiempo del diagnóstico!");
      navigate('review');
    }
  }, 1000);
}

function fmtTime(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/* ─── NAVIGATION ─────────────────────────────────────── */
function navigate(screen, qIndex = 0) {
  S.screen = screen;
  S.qIndex = qIndex;
  S.selected = null;
  S.answered = false;
  render();
}

/* ─── MAIN RENDER ────────────────────────────────────── */
function render() {
  app.innerHTML = '';
  const screens = {
    login: renderLogin,
    welcome: renderWelcome,
    instructions: renderInstructions,
    question: renderQuestion,
    results: renderResults,
    review: renderReview,
    generating: renderGeneratingPlan,
    roadmap: renderRoadmap
  };
  if (screens[S.screen]) screens[S.screen]();
}

/* ─── LOGIN SCREEN ───────────────────────────────────── */
function renderLogin() {
  const el = div('screen welcome-screen');
  el.innerHTML = `
    <div class="welcome-badge">ACCESO RESTRINGIDO</div>
    <h1 class="welcome-title">Bienvenido Entrenador</h1>
    <p class="welcome-sub">Ingresa tus credenciales para acceder a tu plan de estudio personalizado.</p>
    
    <div class="lp-section" style="margin-top:2rem;">
        <div class="lp-section-title">Usuario</div>
        <input type="text" id="login-user" class="btn btn-secondary" style="text-align:left; cursor:text; margin-bottom:1.5rem;" placeholder="Tu nombre">
        
        <div class="lp-section-title">Contraseña</div>
        <input type="password" id="login-pass" class="btn btn-secondary" style="text-align:left; cursor:text; margin-bottom:2rem;" placeholder="••••••••">
    </div>

    <button class="btn btn-primary" id="btn-login">Entrar al Camino →</button>
    <p id="login-error-msg" style="color:var(--error); font-size:0.8rem; margin-top:1rem; text-align:center; ${S.loginError ? '' : 'display:none;'}">${S.loginError}</p>
  `;

  el.querySelector('#btn-login').onclick = async () => {
    const user = el.querySelector('#login-user').value.trim();
    const pass = el.querySelector('#login-pass').value.trim();
    const btn = el.querySelector('#btn-login');
    const errorEl = el.querySelector('#login-error-msg');

    if (!user || !pass) {
      errorEl.textContent = "Ingresa usuario y contraseña.";
      errorEl.style.display = 'block';
      return;
    }

    btn.textContent = "Verificando...";
    btn.disabled = true;

    try {
      const url = `${S.supabaseUrl}/rest/v1/students?username=eq.${user}&password=eq.${pass}`;
      const response = await fetch(url, {
        headers: {
          'apikey': S.supabaseKey,
          'Authorization': `Bearer ${S.supabaseKey}`
        }
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("Error de Supabase:", errText);
        S.loginError = "Error en el servidor de base de datos.";
        render();
        return;
      }

      const students = await response.json();

      if (students && students.length > 0) {
        S.user.name = students[0].username;
        S.user.whatsapp = students[0].whatsapp || '';
        S.loginError = '';
        navigate('welcome');
      } else {
        S.loginError = "Credenciales incorrectas.";
        render();
      }
    } catch (e) {
      console.error("Error de conexión:", e);
      S.loginError = "No se pudo conectar con Supabase.";
      render();
    }
  };

  app.appendChild(el);
}

/* ─── WELCOME ────────────────────────────────────────── */
function renderWelcome() {
  const el = div('screen welcome-screen');
  el.innerHTML = `
    <div class="welcome-badge">MÉTODO OPTIMIZADO 2026</div>
    <h1 class="welcome-title">Te damos el camino exacto para el ICFES</h1>
    <p class="welcome-sub">Deja de estudiar a ciegas. Creamos tu <b>Plan de Estudio Semanal</b> detectando tus fallos en 25 minutos. El 90% de los estudiantes no sabe por dónde empezar; tú tendrás la hoja de ruta clara.</p>
    
    <div class="welcome-benefits">
      <div class="benefit-item">📍 <b>Tu Hoja de Ruta:</b> Qué estudiar cada día, sin rodeos.</div>
      <div class="benefit-item">⚡ <b>Foco en Fallos:</b> Atacamos lo que te quita puntos hoy.</div>
      <div class="benefit-item">📅 <b>Plan Semanal:</b> 40 preguntas estratégicas cada semana.</div>
    </div>
    <button class="btn btn-primary" id="btn-start">Obtener mi Plan Personalizado →</button>`;

  // Temporalmente saltamos el registro para enviárselo a amigos
  el.querySelector('#btn-start').onclick = () => navigate('instructions');
  app.appendChild(el);
}



/* ─── INSTRUCTIONS ───────────────────────────────────── */
function renderInstructions() {
  const el = div('screen welcome-screen');
  el.innerHTML = `
    <h1 class="welcome-title">Fase de Escaneo Estratégico 🔍</h1>
    <p class="welcome-sub">Para darte el camino exacto, primero debemos mapear tus debilidades actuales.</p>
    
    <div class="lp-section" style="margin-top:2rem; text-align:left;">
      <div class="benefit-item">🕒 <b>Detección en 25 min:</b> Tiempo límite para un diagnóstico real.</div>
      <div class="benefit-item">🎯 <b>Honestidad:</b> Cada fallo ayuda a optimizar tu plan semanal de 40 preguntas.</div>
      <div class="benefit-item">🚀 <b>Tu Meta:</b> Obtener tu Plan Semanal de 40 preguntas.</div>
    </div>

    <button class="btn btn-primary" id="btn-start-diag" style="margin-top:2rem;">Comenzar a crear mi camino →</button>`;

  el.querySelector('#btn-start-diag').onclick = () => {
    startTimer();
    navigate('question', 0);
  };
  app.appendChild(el);
}

/* ─── QUESTION ───────────────────────────────────────── */
function renderQuestion() {
  const q = QUESTIONS[S.qIndex];
  const ctx = q.contextId ? CONTEXTS[q.contextId] : null;
  const pct = ((S.qIndex + 1) / QUESTIONS.length) * 100;

  const el = div('screen question-screen');

  // Header
  el.innerHTML = `
    <div class="q-header">
      <div class="q-timer">
        <div class="q-timer-dot"></div>
        <span id="timer-val">${fmtTime(25 * 60 - S.elapsed)}</span>
      </div>
      <button id="btn-open-report" style="background:none; border:1px solid var(--border); color:var(--text-muted); padding:5px 10px; border-radius:8px; font-size:0.7rem; font-weight:800; cursor:pointer;">⚠️ REPORTAR / SUGERIR</button>
      <div class="q-counter">Pregunta <span>${S.qIndex + 1}</span> / ${QUESTIONS.length}</div>
    </div>
    <div class="q-progress"><div class="q-progress-fill" style="width:${pct}%"></div></div>`;

  // Area tag
  const tag = div('');
  tag.innerHTML = `<div class="q-area-tag">${q.icon} ${q.area}</div>`;
  el.appendChild(tag);

  // Scrollable content
  const content = div('q-content');

  // Context cards
  if (ctx) {
    const label = div('ctx-label');
    label.textContent = ctx.title;
    content.appendChild(label);

    ctx.cards.forEach(text => {
      const card = div('ctx-card');
      card.textContent = text;
      content.appendChild(card);
    });
  }

  // Question card
  const qCard = div('q-card');
  qCard.innerHTML = `<h2>${q.question}</h2>`;
  content.appendChild(qCard);

  // Options
  const opts = div('q-options');
  const keys = ['A', 'B', 'C', 'D'];
  keys.forEach(key => {
    const btn = document.createElement('button');
    btn.className = `opt-btn${S.answered && key === q.correct ? ' correct' : ''}${S.answered && key === S.selected && key !== q.correct ? ' wrong' : ''}${!S.answered && key === S.selected ? ' selected' : ''}`;
    btn.disabled = S.answered;
    btn.dataset.key = key;
    btn.innerHTML = `<span class="opt-key">${key}</span><span>${q.options[key]}</span>`;

    if (!S.answered) {
      btn.onclick = () => handleSelect(key);
    }
    opts.appendChild(btn);
  });
  content.appendChild(opts);
  el.appendChild(content);

  // Append main screen directly to app
  app.appendChild(el);

  // Footer (action strip) - Appended to app, outside the transformed screen
  const footer = div('q-footer');
  if (S.answered) {
    const isCorrect = S.selected === q.correct;
    footer.innerHTML = `
      <div class="footer-feedback">
        <div class="feedback-icon ${isCorrect ? 'correct' : 'wrong'}">${isCorrect ? '✅' : '❌'}</div>
        <div>
          <h4>${isCorrect ? '¡Correcto!' : `Incorrecto — era ${q.correct}`}</h4>
          <p>${isCorrect ? 'Muy bien. Sigue así.' : `"${q.options[q.correct]}"`}</p>
        </div>
      </div>
      <div class="footer-actions">
        <button class="btn btn-secondary" id="btn-learn">🎓 Ver cómo se resuelve</button>
        <button class="btn btn-primary" id="btn-next">${S.qIndex === QUESTIONS.length - 1 ? 'Terminar y calificar' : 'Siguiente →'}</button>
      </div>`;

    footer.classList.add('visible');
    footer.querySelector('#btn-next').onclick = handleNext;
    footer.querySelector('#btn-learn').onclick = openLearning;
  }
  app.appendChild(footer);

  // Learning panel + overlay - Appended to app to be relative to viewport
  const overlay = div('learning-overlay');
  overlay.id = 'lp-overlay';
  overlay.addEventListener('click', closeLearning);
  app.appendChild(overlay);

  const panel = renderLearningPanel(q);
  panel.id = 'lp-panel';
  app.appendChild(panel);

  // Universal Report Modal
  const reportOverlay = div('learning-overlay');
  reportOverlay.id = 'report-overlay';
  reportOverlay.onclick = closeReport;
  app.appendChild(reportOverlay);

  const reportPanel = div('learning-panel');
  reportPanel.id = 'report-panel';
  reportPanel.innerHTML = `
        <div class="lp-handle"></div>
        <div class="lp-header">
            <h3>⚠️ Reportar problema o sugerencia</h3>
            <button class="lp-close" onclick="closeReport()">✕</button>
        </div>
        <div class="lp-body">
            <p class="sub" style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">¿Hay algún error en esta pregunta o tienes una recomendación para mejorar?</p>
            <textarea id="report-text" class="btn btn-secondary" style="width:100%; height:120px; text-align:left; cursor:text; margin-bottom:1.5rem; padding:1rem;" placeholder="Escribe aquí..."></textarea>
            <button class="btn btn-primary" id="btn-save-report">Guardar comentario</button>
        </div>
    `;
  reportPanel.querySelector('#btn-save-report').onclick = () => {
    const val = document.getElementById('report-text').value;
    S.liveFeedback += `[Pregunta ${S.qIndex + 1}]: ${val}\n`;
    closeReport();
  };
  app.appendChild(reportPanel);

  el.querySelector('#btn-open-report').onclick = openReport;
}

function openReport() {
  document.getElementById('report-overlay').classList.add('visible');
  document.getElementById('report-panel').classList.add('visible');
}
function closeReport() {
  document.getElementById('report-overlay').classList.remove('visible');
  document.getElementById('report-panel').classList.remove('visible');
}

/* ─── SELECT OPTION (no re-render) ──────────────────── */
function handleSelect(key) {
  if (S.answered) return;
  S.selected = key;
  S.answered = true;

  const q = QUESTIONS[S.qIndex];
  const isCorrect = key === q.correct;

  S.answers.push({ id: q.id, area: q.area, selected: key, correct: q.correct, isCorrect });

  // Update option styles without re-render
  document.querySelectorAll('.opt-btn').forEach(btn => {
    const k = btn.dataset.key;
    btn.disabled = true;
    if (k === q.correct) btn.classList.add('correct');
    else if (k === key) btn.classList.add('wrong');
  });

  // Build footer
  const footer = document.querySelector('.q-footer');
  footer.innerHTML = `
    <div class="footer-feedback">
      <div class="feedback-icon ${isCorrect ? 'correct' : 'wrong'}">${isCorrect ? '✅' : '❌'}</div>
      <div>
        <h4>${isCorrect ? '¡Correcto!' : `Incorrecto — era ${q.correct}`}</h4>
        <p>${isCorrect ? 'Muy bien. Sigue así.' : `"${q.options[q.correct]}"`}</p>
      </div>
    </div>
    <div class="footer-actions">
      <button class="btn btn-secondary" id="btn-learn">🎓 Ver cómo se resuelve</button>
      <button class="btn btn-primary" id="btn-next">Siguiente →</button>
    </div>`;

  footer.querySelector('#btn-next').onclick = handleNext;
  footer.querySelector('#btn-learn').onclick = openLearning;

  // Slide up footer
  requestAnimationFrame(() => footer.classList.add('visible'));
}

/* ─── NEXT QUESTION ──────────────────────────────────── */
function handleNext() {
  const nextIdx = S.qIndex + 1;
  if (nextIdx >= QUESTIONS.length) {
    clearInterval(S.timerInterval);
    navigate('review'); // Ahora va directo a la opinión antes de ver resultados
  } else {
    navigate('question', nextIdx);
  }
}

/* ─── LEARNING PANEL ─────────────────────────────────── */
function renderLearningPanel(q) {
  const exp = q.explanation;
  const panel = div('learning-panel');

  let conceptsHtml = exp.concepts.map(c => `
    <a href="${c.url}" target="_blank" rel="noopener" class="concept-card">
      <div class="c-name">${c.name}</div>
      <div class="c-def">${c.def}</div>
    </a>`).join('');

  panel.innerHTML = `
    <div class="lp-handle"></div>
    <div class="lp-header">
      <h3>🧠 Cómo se resuelve</h3>
      <button class="lp-close" id="btn-close-lp">✕</button>
    </div>
    <div class="lp-body">
      <div class="lp-section">
        <div class="lp-section-title">Contexto</div>
        <div class="lp-context-text">${exp.context}</div>
      </div>
      <div class="lp-section">
        <div class="lp-section-title">Conceptos clave</div>
        <div class="concepts-grid">${conceptsHtml}</div>
      </div>
      <div class="lp-section">
        <div class="lp-section-title">Pasos para resolverla</div>
        <div class="step-card s1" style="margin-bottom:0.7rem;">
          <div class="step-label">Paso 1 — ¿Qué pide?</div>
          <p>${exp.step1}</p>
        </div>
        <div class="step-card s2" style="margin-bottom:0.7rem;">
          <div class="step-label">Paso 2 — ¿Cómo encontrar la respuesta?</div>
          <p>${exp.step2}</p>
        </div>
        <div class="step-card s3">
          <div class="step-label">Paso 3 — ¿Por qué esta opción?</div>
          <p>${exp.step3}</p>
        </div>
      </div>
      <button class="btn btn-primary" id="btn-lp-next" style="margin-top:1.5rem;">Entendido, siguiente →</button>
    </div>`;

  panel.querySelector('#btn-close-lp').onclick = closeLearning;
  panel.querySelector('#btn-lp-next').onclick = () => { closeLearning(); handleNext(); };
  return panel;
}

function openLearning() {
  const overlay = document.getElementById('lp-overlay');
  const panel = document.getElementById('lp-panel');
  if (overlay) overlay.classList.add('visible');
  if (panel) panel.classList.add('visible');
}

function closeLearning() {
  const overlay = document.getElementById('lp-overlay');
  const panel = document.getElementById('lp-panel');
  if (overlay) overlay.classList.remove('visible');
  if (panel) panel.classList.remove('visible');
}

/* ─── RESULTS ────────────────────────────────────────── */
function renderResults() {
  const total = S.answers.length;
  const correct = S.answers.filter(a => a.isCorrect).length;
  const pct = Math.round((correct / total) * 100);

  // Per-area stats
  const areas = ['Lectura Crítica', 'Matemáticas', 'Sociales y Ciudadanas', 'Ciencias Naturales', 'Inglés'];
  const areaIcons = { 'Lectura Crítica': '📖', 'Matemáticas': '📐', 'Sociales y Ciudadanas': '🏛️', 'Ciencias Naturales': '🔬', 'Inglés': '🌎' };
  const areaColors = { 'Lectura Crítica': '#7c3aed', 'Matemáticas': '#06b6d4', 'Sociales y Ciudadanas': '#f59e0b', 'Ciencias Naturales': '#10b981', 'Inglés': '#f43f5e' };

  const areaStats = areas.map(area => {
    const qs = S.answers.filter(a => a.area === area);
    const c = qs.filter(a => a.isCorrect).length;
    return { area, icon: areaIcons[area], color: areaColors[area], correct: c, total: qs.length, pct: Math.round((c / qs.length) * 100) };
  });

  // Message based on score
  let msg = '';
  if (pct >= 80) msg = '🏆 ¡Excelente resultado! Tienes una base sólida. El entrenamiento te llevará al siguiente nivel.';
  else if (pct >= 60) msg = '💪 Buen comienzo. Identifica las áreas donde fallaste y empieza a entrenar con nosotros.';
  else if (pct >= 40) msg = '📚 Este es tu punto de partida. Con práctica guiada, mejorarás rápidamente. ¡Tú puedes!';
  else msg = '🌱 Todos empezamos aquí. Lo importante es que ya diste el primer paso. ¡A entrenar!';

  const areasHtml = areaStats.map(s => `
    <div class="area-row">
      <div class="area-row-header">
        <div class="area-row-name">${s.icon} ${s.area}</div>
        <div class="area-row-score">${s.correct}/${s.total}</div>
      </div>
      <div class="area-bar"><div class="area-bar-fill" style="width:${s.pct}%;background:${s.color};"></div></div>
    </div>`).join('');

  const el = div('screen results-screen');
  el.innerHTML = `
    <div class="results-top">
      <div class="score-ring" style="--pct:${pct}">
        <div class="score-inner">
          <span class="score-number">${correct}</span>
          <span class="score-total">de ${total}</span>
        </div>
      </div>
      <h2>${pct >= 70 ? '¡Muy bien hecho!' : pct >= 50 ? 'Buen esfuerzo' : 'Diagnóstico completado'}</h2>
      <p>${correct} correctas · ${total - correct} para mejorar · ${fmtTime(S.elapsed)}</p>
    </div>
    <div class="results-message">${msg}</div>
    <div class="areas-section">
      <h3>Rendimiento por área</h3>
      ${areasHtml}
    </div>
    <div class="results-actions">
      <button class="btn btn-secondary" id="btn-back-roadmap">← Volver a mi Hoja de Ruta</button>
      <button class="btn btn-primary" id="btn-home" style="margin-top:1rem;">Ir al inicio (Reiniciar)</button>
    </div>`;

  el.querySelector('#btn-back-roadmap').onclick = () => {
    navigate('roadmap');
  };

  el.querySelector('#btn-home').onclick = () => {
    S.answers = []; S.elapsed = 0; S.liveFeedback = ''; S.user = { name: '', whatsapp: '' };
    navigate('welcome');
  };

  app.appendChild(el);
}

/* ─── MANDATORY REVIEW SCREEN ────────────────────────── */
function renderReview() {
  const el = div('screen welcome-screen');
  el.innerHTML = `
    <h1 class="welcome-title">¡Último paso!</h1>
    <p class="welcome-sub">Tu opinión nos ayuda a ayudarte a mejorar tu puntaje.</p>
    
    <div class="lp-section" style="margin-top:2rem;">
        <div class="lp-section-title">Déjanos una breve reseña o comentario (Obligatorio)</div>
        <textarea id="final-review-text" class="btn btn-secondary" style="width:100%; height:150px; text-align:left; cursor:text; margin-bottom:2rem; padding:1rem;" placeholder="¿Qué te pareció el simulacro? ¿En qué podemos mejorar?"></textarea>
    </div>

    <button class="btn btn-primary" id="btn-submit-all">Finalizar y enviar diagnóstico →</button>
    <p id="review-error" style="color:var(--error); font-size:0.8rem; margin-top:1rem; text-align:center; display:none;">Por favor escribe un breve comentario.</p>
    <p id="submit-status" style="color:var(--success); font-size:0.85rem; margin-top:1rem; text-align:center; display:none;">Enviando datos...</p>`;

  el.querySelector('#btn-submit-all').onclick = async () => {
    const val = el.querySelector('#final-review-text').value.trim();
    if (val.length < 5) {
      el.querySelector('#review-error').style.display = 'block';
      return;
    }

    S.finalReview = val;
    el.querySelector('#btn-submit-all').disabled = true;
    el.querySelector('#submit-status').style.display = 'block';

    await submitToSupabase();

    // Ahora vamos a la fase de generación de plan
    navigate('generating');
  };
  app.appendChild(el);
}

/* ─── GENERATING PLAN (Simulation) ─────────────────── */
function renderGeneratingPlan() {
  const el = div('screen welcome-screen');
  const messages = [
    "Mapeando brechas de conocimiento...",
    "Alineando debilidades con estándares ICFES...",
    "Estructurando tus metas de 15 preguntas semanales...",
    "Finalizando tu Hoja de Ruta personalizada..."
  ];

  el.innerHTML = `
    <div class="loading-container" style="text-align:center; padding:3rem 0;">
      <div class="spinner" style="width:50px; height:50px; border:5px solid var(--border); border-top-color:var(--primary); border-radius:50%; animation:spin 1s linear infinite; margin: 0 auto 2rem;"></div>
      <h2 id="gen-msg" class="welcome-title" style="font-size:1.2rem;">${messages[0]}</h2>
      <p class="welcome-sub">Casi listo. Esto cambiará tu forma de estudiar.</p>
    </div>
    <style>
      @keyframes spin { to { transform: rotate(360deg); } }
    </style>
  `;

  let step = 0;
  const interval = setInterval(() => {
    step++;
    if (step < messages.length) {
      const msgEl = el.querySelector('#gen-msg');
      if (msgEl) msgEl.textContent = messages[step];
    } else {
      clearInterval(interval);
      navigate('roadmap');
    }
  }, 1000);

  app.appendChild(el);
}

/* ─── ROADMAP (The "Start Here" Solution) ────────────── */
function renderRoadmap() {
  // Identify weakest areas
  const areas = ['Lectura Crítica', 'Matemáticas', 'Sociales y Ciudadanas', 'Ciencias Naturales', 'Inglés'];
  const areaStats = areas.map(area => {
    const qs = S.answers.filter(a => a.area === area);
    const correct = qs.filter(a => a.isCorrect).length;
    return { area, pct: qs.length ? (correct / qs.length) : 0 };
  }).sort((a, b) => a.pct - b.pct);

  const weak1 = areaStats[0].area;
  const weak2 = areaStats[1].area;

  const el = div('screen roadmap-screen');
  el.style.paddingBottom = "100px"; // Space for footer

  el.innerHTML = `
    <div class="results-top">
      <div class="welcome-badge" style="background:var(--success-bg); color:var(--success); border-color:var(--success);">TU PLAN ESTÁ LISTO</div>
      <h1 class="welcome-title" style="margin: 1rem 0;">Tu Plan de Estudio Semanal</h1>
      <p class="welcome-sub">Esta semana vas a entrenar con <b>40 preguntas</b>, pero debido a tus debilidades actuales, nos enfocaremos intensamente en <b>${weak1}</b> y <b>${weak2}</b>.</p>
    </div>

    <div class="roadmap-focus-card" style="background:var(--surface2); border:1px solid var(--border); border-radius:var(--radius); padding:2rem; margin-top:2rem; position:relative; overflow:hidden;">
      <div style="position:absolute; top:0; right:0; padding:0.5rem 1rem; background:var(--primary); color:white; font-size:0.7rem; font-weight:900;">OBJETIVO SEMANAL</div>
      
      <div class="focus-item" style="margin-bottom:1.5rem;">
        <h3 style="color:var(--primary); font-size:1.1rem; margin-bottom:0.5rem;">1. Inmersión en ${weak1}</h3>
        <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.5;">Tu mayor oportunidad de mejora. Harás <b>25 de las 40 preguntas</b> enfocadas aquí.</p>
      </div>

      <div class="focus-item">
        <h3 style="color:var(--secondary); font-size:1.1rem; margin-bottom:0.5rem;">2. Refuerzo en ${weak2}</h3>
        <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.5;">Segunda prioridad. Dedicaremos 15 ejercicios para fortalecer tus bases.</p>
      </div>
    </div>

    <div style="margin-top:2rem; background:rgba(124, 58, 237, 0.05); padding:1rem; border-radius:var(--radius-sm); border-left:3px solid var(--primary);">
      <p style="font-size:0.8rem; color:var(--primary); font-weight:600;">⚠️ RECUERDA: Este plan se actualiza cada semana según tu progreso. No estudies a ciegas.</p>
    </div>

    <div class="results-actions" style="margin-top:3rem;">
      <button class="btn btn-primary" id="btn-see-results">Ver detalle de mi puntaje →</button>
    </div>

    <style>
      .roadmap-step { display: flex; gap: 1.5rem; margin-bottom: 2rem; position: relative; }
      .roadmap-step::after { content: ''; position: absolute; left: 17px; top: 40px; bottom: -20px; width: 2px; background: var(--border); }
      .roadmap-step:last-child::after { display: none; }
      .step-num { width: 36px; height: 36px; background: var(--surface); border: 2px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0; z-index: 1; }
      .roadmap-step.active .step-num { background: var(--primary); color: white; border-color: var(--primary); }
      .step-content h3 { font-size: 1rem; margin-bottom: 0.3rem; }
      .step-content p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.4; }
    </style>
  `;

  el.querySelector('#btn-see-results').onclick = () => navigate('results');
  app.appendChild(el);
}

/* ─── SUPABASE SUBMISSION ─────────────────────────── */
async function submitToSupabase() {
  const correct = S.answers.filter(a => a.isCorrect).length;
  const total = S.answers.length;

  const data = {
    name: S.user.name,
    whatsapp: S.user.whatsapp,
    score: `${correct}/${total}`,
    percentage: Math.round((correct / total) * 100),
    time_spent: fmtTime(S.elapsed),
    recommendations: S.liveFeedback,
    final_review: S.finalReview,
    errors_log: S.errors.join('\n')
  };

  console.log('Enviando a Supabase:', data);

  try {
    const response = await fetch(`${S.supabaseUrl}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'apikey': S.supabaseKey,
        'Authorization': `Bearer ${S.supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      console.log('Datos guardados en Supabase correctamente');
      navigate('generating');
    } else {
      const errText = await response.text();
      console.error('Error de Supabase:', errText);
      navigate('generating'); // Navegamos igual para no bloquear la experiencia del usuario
    }
  } catch (e) {
    console.error('Error de red al enviar a Supabase:', e);
    navigate('generating');
  }
}

/* ─── ERROR TRACKER ─────────────────────────────────── */
window.onerror = function (msg, url, lineNo, columnNo, error) {
  const err = `[Error]: ${msg} at ${lineNo}:${columnNo}`;
  S.errors.push(err);
  console.error(err);
  return false;
};

/* ─── HELPER ─────────────────────────────────────────── */
function div(classes) {
  const el = document.createElement('div');
  if (classes) el.className = classes;
  return el;
}

/* ─── INIT ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => render());
