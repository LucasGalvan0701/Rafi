import { CONTEXTS, QUESTIONS } from './questions.js';
import { supabase } from './supabase.js';
import '../css/style.css';

/* ─────────────────────────────────────────────────────────
   ESTADO GLOBAL
───────────────────────────────────────────────────────── */
const S = {
  screen:            'welcome',
  mode:              'diagnostic',
  qIndex:            0,
  selected:          null,
  answered:          false,
  answers:           [],
  trainingAnswers:   [],
  trainingQuestions: [],
  elapsed:           0,
  startTime:         null,
  timerInterval:     null,
  user:              { name: '', whatsapp: '', email: '' },
  finalReview:       '',
  errors:            [],
  trainingComplete:  false,
  streak:            1
};

/* ─── PERSISTENCIA ────────────────────────────────────── */
const STORAGE_KEY = 'icfes_entrenador_v1';

function saveState() {
  const { user, answers, screen, mode, trainingAnswers, trainingQuestions,
          trainingComplete, streak, qIndex, selected, answered, elapsed, startTime } = S;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    user, answers, screen, mode, trainingAnswers, trainingQuestions,
    trainingComplete, streak, qIndex, selected, answered, elapsed, startTime
  }));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const d = JSON.parse(raw);
    S.user              = d.user              ?? S.user;
    S.answers           = d.answers           ?? [];
    S.mode              = d.mode              ?? 'diagnostic';
    S.trainingAnswers   = d.trainingAnswers   ?? [];
    S.trainingQuestions = d.trainingQuestions ?? [];
    S.trainingComplete  = d.trainingComplete  ?? false;
    S.streak            = d.streak            ?? 1;
    S.qIndex            = d.qIndex            ?? 0;
    S.selected          = d.selected          ?? null;
    S.answered          = d.answered          ?? false;
    S.elapsed           = d.elapsed           ?? 0;
    S.startTime         = d.startTime         ?? null;
    if (S.user.name || S.answers.length > 0) {
      S.screen = d.screen ?? 'welcome';
    }
  } catch (e) {
    console.error('Error cargando estado:', e);
  }
}

function clearState() {
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

/* ─── TIMER ───────────────────────────────────────────── */
const EXAM_DURATION = 25 * 60; // segundos

function startTimer() {
  if (!S.startTime) S.startTime = Date.now();
  
  clearInterval(S.timerInterval);
  S.timerInterval = setInterval(() => {
    const now = Date.now();
    S.elapsed = Math.floor((now - S.startTime) / 1000);
    
    const el = document.getElementById('timer-val');
    if (el) el.textContent = fmtTime(EXAM_DURATION - S.elapsed);

    if (S.elapsed >= EXAM_DURATION) {
      clearInterval(S.timerInterval);
      S.startTime = null; // Reset for next time if needed
      alert('¡Se ha agotado el tiempo del Escaneo Estratégico!');
      navigate('review');
    }
  }, 1000);
}

function fmtTime(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}



/* ─── NAVEGACIÓN ──────────────────────────────────────── */
function navigate(screen, qIndex = 0, push = true) {
  S.screen   = screen;
  S.qIndex   = qIndex;
  S.selected = null;
  S.answered = false;
  if (push) history.pushState({ screen, qIndex }, '', '');
  saveState();
  render();
}

/* ─── RENDER PRINCIPAL ────────────────────────────────── */
let app;

function render() {
  app.innerHTML = '';
  const screens = {
    welcome:         renderWelcome,
    instructions:    renderInstructions,
    question:        renderQuestion,
    results:         renderResults,
    review:          renderReview,
    generating:      renderGeneratingPlan,
    roadmap:         renderRoadmap,
    paywall:         renderPaywall,
    home:            renderHome,
    studentLogin:    renderStudentLogin,
    trainingResults: renderTrainingResults
  };
  if (screens[S.screen]) screens[S.screen]();
}

/* ─────────────────────────────────────────────────────────
   PANTALLAS
───────────────────────────────────────────────────────── */

/* ─── BIENVENIDA ──────────────────────────────────────── */
function renderWelcome() {
  const el = div('screen welcome-screen');
  el.innerHTML = `
    <div class="welcome-badge">MÉTODO OPTIMIZADO 2026</div>
    <h1 class="welcome-title">Te damos el camino exacto para el ICFES</h1>
    <p class="welcome-sub">Deja de estudiar a ciegas. Creamos tu <b>Plan de Estudio Semanal</b> detectando tus fallos en 25 minutos. El 90% de los estudiantes no sabe por dónde empezar; tú tendrás la hoja de ruta clara.</p>

    <div class="welcome-benefits">
      <div class="benefit-item">
        <span>📍</span>
        <div><b>Hoja de Ruta Personalizada</b>Sabrás exactamente qué temas estudiar cada día de tu semana.</div>
      </div>
      <div class="benefit-item">
        <span>⚡</span>
        <div><b>Foco Estratégico</b>Atacamos directamente los fallos que más frenan tu puntaje.</div>
      </div>
      <div class="benefit-item">
        <span>📁</span>
        <div><b>Banco Oficial ICFES</b>Entrena con preguntas reales de exámenes de años anteriores.</div>
      </div>
      <div class="benefit-item">
        <span>📅</span>
        <div><b>Meta Semanal</b>Supera el reto de 120 preguntas para asegurar tu éxito.</div>
      </div>
    </div>

    <button class="btn btn-primary" id="btn-start">Obtener mi Plan Personalizado →</button>

    <div style="margin-top:2rem; text-align:center;">
      <a id="btn-to-login" style="font-size:0.75rem; color:var(--primary); cursor:pointer; font-weight:700; text-decoration:none;">Ya soy estudiante (Ingresar)</a>
    </div>`;

  el.querySelector('#btn-start').onclick    = () => navigate('instructions');
  el.querySelector('#btn-to-login').onclick = () => navigate('studentLogin');
  app.appendChild(el);
}

/* ─── LOGIN DE ESTUDIANTE ─────────────────────────────── */
function renderStudentLogin() {
  const el = div('screen welcome-screen');
  el.innerHTML = `
    <div class="welcome-badge" style="background:rgba(6,182,212,0.1); color:var(--secondary); border-color:var(--secondary);">ZONA DE ESTUDIANTES</div>
    <h1 class="welcome-title">Ingresa a tu cuenta</h1>
    <p class="welcome-sub">Si ya tienes tu acceso anticipado, ingresa tus credenciales aquí.</p>

    <div class="lp-section" style="margin-top:2rem;">
      <div class="lp-section-title">Correo Electrónico</div>
      <input type="email" id="login-email" class="btn btn-secondary" style="text-align:left; cursor:text; margin-bottom:1.5rem;" placeholder="ejemplo@rafi.com">
      <div class="lp-section-title">Contraseña</div>
      <input type="password" id="login-pass" class="btn btn-secondary" style="text-align:left; cursor:text; margin-bottom:2rem;" placeholder="••••••••">
    </div>

    <button class="btn btn-primary" id="btn-login-exec">Entrar al Panel de Estudio →</button>
    <p id="login-error-msg" style="color:var(--error); font-size:0.8rem; margin-top:1rem; text-align:center; ${S.loginError ? '' : 'display:none;'}">${S.loginError || ''}</p>

    <div style="margin-top:2rem; text-align:center;">
      <a id="btn-back-welcome" style="font-size:0.7rem; color:var(--text-muted); cursor:pointer;">← Volver al inicio</a>
    </div>`;

  el.querySelector('#btn-back-welcome').onclick = () => navigate('welcome');

  el.querySelector('#btn-login-exec').onclick = async () => {
    const email   = el.querySelector('#login-email').value.trim();
    const pass    = el.querySelector('#login-pass').value.trim();
    const btn     = el.querySelector('#btn-login-exec');
    const errorEl = el.querySelector('#login-error-msg');

    if (!email || !pass) {
      errorEl.textContent = 'Ingresa correo y contraseña.';
      errorEl.style.display = 'block';
      return;
    }

    btn.textContent = 'Verificando...';
    btn.disabled = true;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: pass,
      });

      if (error) {
        S.loginError = 'Credenciales incorrectas o acceso denegado.';
        render();
      } else {
        S.user.email = data.user.email;
        S.user.name  = data.user.user_metadata?.name || data.user.email.split('@')[0];
        S.loginError = '';
        navigate('home');
      }
    } catch (err) {
      S.loginError = 'Error de conexión.';
      render();
    }
  };

  app.appendChild(el);
}

/* ─── INSTRUCCIONES ───────────────────────────────────── */
function renderInstructions() {
  const el = div('screen welcome-screen');
  el.innerHTML = `
    <h1 class="welcome-title">Fase de Escaneo Estratégico 🔍</h1>
    <p class="welcome-sub">Para darte el camino exacto, primero debemos mapear tus debilidades actuales.</p>

    <div class="lp-section" style="margin-top:2.5rem; text-align:left; max-width:420px; margin-left:auto; margin-right:auto;">
      <div class="benefit-item" style="margin-bottom:1.2rem;">🕒 <b>Detección en 25 min:</b> Tiempo límite para un escaneo real.</div>
      <div class="benefit-item" style="margin-bottom:1.2rem;">📁 <b>Preguntas Históricas:</b> Seleccionadas de bancos reales de años anteriores.</div>
      <div class="benefit-item">🚀 <b>Tu Meta:</b> Obtener tu Plan Semanal de 120 preguntas.</div>
    </div>

    <button class="btn btn-primary" id="btn-start-diag" style="margin-top:2rem;">Comenzar a crear mi camino →</button>`;

  el.querySelector('#btn-start-diag').onclick = () => {
    S.mode    = 'diagnostic';
    S.answers = [];
    S.startTime = null;
    S.elapsed = 0;
    startTimer();
    navigate('question', 0);
  };
  app.appendChild(el);
}

/* ─── PREGUNTA ────────────────────────────────────────── */
function renderQuestion() {
  const qs = S.mode === 'training' ? S.trainingQuestions : QUESTIONS;
  if (!qs || qs.length === 0) return navigate('home');

  const q   = qs[S.qIndex];
  const ctx = q.contextId ? CONTEXTS[q.contextId] : null;
  const pct = ((S.qIndex + 1) / qs.length) * 100;

  const el = div('screen question-screen');

  // Header
  const isPractice = S.mode === 'training';
  el.innerHTML = `
    <div class="q-header">
      <div class="q-timer${isPractice ? ' practice' : ''}">
        <div class="q-timer-dot"></div>
        ${isPractice
          ? '<span>Práctica</span>'
          : `<span id="timer-val">${fmtTime(EXAM_DURATION - S.elapsed)}</span>`
        }
      </div>
      <div class="q-counter">Pregunta <span>${S.qIndex + 1}</span> / ${qs.length}</div>
    </div>
    <div class="q-progress"><div class="q-progress-fill" style="width:${pct}%"></div></div>`;

  // Area / Year tag
  const areaBar = div('q-area-container');
  areaBar.innerHTML = `
    <div class="q-area-tag">${q.icon} ${q.area}</div>
    ${q.year ? `<div class="q-year-tag"><span>📝</span> Prueba Real ICFES ${q.year}</div>` : ''}`;
  el.appendChild(areaBar);

  // Scrollable content
  const content = div('q-content');

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

  const qCard = div('q-card');
  qCard.innerHTML = `<h2>${q.question}</h2>`;
  content.appendChild(qCard);

  const opts = div('q-options');
  Object.keys(q.options).forEach(key => {
    const btn = document.createElement('button');
    const isCorrect  = S.answered && key === q.correct;
    const isWrong    = S.answered && key === S.selected && key !== q.correct;
    const isSelected = !S.answered && key === S.selected;
    btn.className  = `opt-btn${isCorrect ? ' correct' : ''}${isWrong ? ' wrong' : ''}${isSelected ? ' selected' : ''}`;
    btn.disabled   = S.answered;
    btn.dataset.key = key;
    btn.innerHTML  = `<span class="opt-key">${key}</span><span>${q.options[key]}</span>`;
    if (!S.answered) btn.onclick = () => handleSelect(key);
    opts.appendChild(btn);
  });
  content.appendChild(opts);
  el.appendChild(content);
  app.appendChild(el);

  // Footer
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
        <button class="btn btn-primary" id="btn-next">${S.qIndex === qs.length - 1 ? (S.mode === 'training' ? 'Finalizar Práctica' : 'Terminar y calificar') : 'Siguiente →'}</button>
      </div>`;
    footer.classList.add('visible');
    footer.querySelector('#btn-next').onclick  = handleNext;
    footer.querySelector('#btn-learn').onclick = () => openLearning(q);
  }
  app.appendChild(footer);

  // Learning panel + overlay
  const overlay = div('learning-overlay');
  overlay.id = 'lp-overlay';
  overlay.addEventListener('click', closeLearning);
  app.appendChild(overlay);

  const panel = buildLearningPanel(q);
  panel.id = 'lp-panel';
  app.appendChild(panel);
}

/* ─── SELECCIONAR RESPUESTA ───────────────────────────── */
function handleSelect(key) {
  if (S.answered) return;
  S.selected = key;
  S.answered = true;

  const qs  = S.mode === 'training' ? S.trainingQuestions : QUESTIONS;
  const q   = qs[S.qIndex];
  const isCorrect = key === q.correct;
  const record = { id: q.id, area: q.area, selected: key, correct: q.correct, isCorrect };

  if (S.mode === 'training') S.trainingAnswers.push(record);
  else                       S.answers.push(record);

  // Update option visuals
  document.querySelectorAll('.opt-btn').forEach(btn => {
    const k = btn.dataset.key;
    btn.disabled = true;
    if (k === q.correct)              btn.classList.add('correct');
    else if (k === key)               btn.classList.add('wrong');
  });

  // Build and show footer
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

  footer.querySelector('#btn-next').onclick  = handleNext;
  footer.querySelector('#btn-learn').onclick = () => openLearning(q);
  requestAnimationFrame(() => footer.classList.add('visible'));
}

/* ─── SIGUIENTE PREGUNTA ──────────────────────────────── */
function handleNext() {
  const qs      = S.mode === 'training' ? S.trainingQuestions : QUESTIONS;
  const nextIdx = S.qIndex + 1;
  if (nextIdx >= qs.length) {
    if (S.mode === 'training') {
      completeTraining();
    } else {
      clearInterval(S.timerInterval);
      S.startTime = null;
      navigate('review');
    }
  } else {
    navigate('question', nextIdx);
  }
}

function completeTraining() {
  // Fusionar respuestas de entrenamiento al historial global para actualizar progreso
  S.answers = [...S.answers, ...S.trainingAnswers];
  S.trainingComplete = true;
  // Aumentar racha si es primer entrenamiento (lógica simplificada)
  if (S.trainingAnswers.length > 0) S.streak += 1;
  saveState();
  navigate('trainingResults');
}

/* ─── PANEL DE APRENDIZAJE ────────────────────────────── */
function buildLearningPanel(q) {
  const exp = q.explanation;
  const qFragment = exp.fragment || (q.question.length > 80 ? q.question.substring(0, 80) + '...' : q.question);

  const conceptsHtml = exp.concepts.map(c => `
    <a href="${c.url}" target="_blank" rel="noopener" class="concept-card">
      <div class="c-name">${c.name}</div>
      <div class="c-def">${c.def}</div>
    </a>`).join('');

  const panel = div('learning-panel');
  panel.innerHTML = `
    <div class="lp-handle"></div>
    <div class="lp-header">
      <h3>🧠 Cómo se resuelve</h3>
      <button class="lp-close" id="btn-close-lp">✕</button>
    </div>
    <div class="lp-body">

      <div class="audio-controls">
        <div class="audio-controls-label">
          <span class="icon">🔊</span>
          <span class="title">TUTOR INTELIGENTE</span>
        </div>
        <div class="audio-controls-btns">
          <button id="btn-audio-prev" class="btn-icon sm" title="Sección anterior">⏮</button>
          <button id="btn-audio-toggle" class="btn-icon md" title="Reproducir / Pausar">▶</button>
          <button id="btn-audio-next" class="btn-icon sm" title="Sección siguiente">⏭</button>
        </div>
      </div>

      <div id="section-context" class="lp-section" style="border-radius:8px; padding:0.5rem;">
        <div class="lp-section-title">Contexto de la pregunta</div>
        ${exp.contextImg ? `<div class="lp-img-container"><img src="${exp.contextImg}" class="lp-img"></div>` : ''}
        <div class="lp-context-text">Esta pregunta evalúa: <b>${exp.context}</b></div>
      </div>

      <div id="section-concepts" class="lp-section" style="border-radius:8px; padding:0.5rem;">
        <div class="lp-section-title">Conceptos clave <span style="font-size:0.7rem; font-weight:normal; opacity:0.7;">(Clic para aprender más)</span></div>
        <div class="concepts-grid">${conceptsHtml}</div>
      </div>

      <div class="lp-section">
        <div class="lp-section-title">Pasos para resolverla</div>
        <div id="step-1" class="step-card s1">
          <div class="step-label">Paso 1 — ¿Qué pide exactamente?</div>
          ${exp.step1Img ? `<div class="lp-img-container"><img src="${exp.step1Img}" class="lp-img"></div>` : ''}
          <div class="step-fragment">"${qFragment}"</div>
          <p>${exp.step1}</p>
        </div>
        <div id="step-2" class="step-card s2">
          <div class="step-label">Paso 2 — ¿Cómo encontrar la respuesta?</div>
          ${exp.step2Img ? `<div class="lp-img-container"><img src="${exp.step2Img}" class="lp-img"></div>` : ''}
          <p>${exp.step2}</p>
        </div>
        <div id="step-3" class="step-card s3">
          <div class="step-label">Paso 3 — Técnica de Descarte</div>
          ${exp.step3Img ? `<div class="lp-img-container"><img src="${exp.step3Img}" class="lp-img"></div>` : ''}
          <p>${exp.step3}</p>
        </div>
      </div>

      <button class="btn btn-primary" id="btn-lp-next" style="margin-top:1.5rem;">Entendido, siguiente →</button>
    </div>`;

  panel.querySelector('#btn-close-lp').onclick  = closeLearning;
  panel.querySelector('#btn-lp-next').onclick   = () => { closeLearning(); handleNext(); };

  // ─── Audio Guide ────────────────────────────────────────
  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const sections = [
    { id: 'section-context',  text: `${stripHtml(exp.context)}. Busca que seas capaz de analizar esta situación rápidamente.` },
    { id: 'section-concepts', text: `Los conceptos que debes dominar son: ${exp.concepts.map(c => c.name).join(', ')}. Si ya los dominas, sigamos adelante.` },
    { id: 'step-1', text: `Paso 1. Identifiquemos la clave. El texto dice: "${stripHtml(qFragment)}". En resumen, lo que te están pidiendo exactamente es esto: ${stripHtml(exp.step1)}.` },
    { id: 'step-2', text: `Paso 2. ¿Cómo llegamos a la respuesta? Fíjate en los detalles del problema. Para resolverlo, hacemos esto: ${stripHtml(exp.step2)}.` },
    { id: 'step-3', text: `Paso 3. Usemos descarte. Si analizamos bien, las otras opciones no tienen sentido porque ${stripHtml(exp.step3)}. Así la eliminamos al instante y aseguramos el punto.` }
  ];

  let currentStep = 0;

  let internalPaused = false;
  let selectedVoice  = null;

  const getVoice = () => {
    if (selectedVoice) return selectedVoice;
    const voices = window.speechSynthesis.getVoices();
    
    const filters = [
      // 🥇 Máxima calidad: Edge Natural Voices
      v => v.lang.startsWith('es') && v.name.includes('Natural'),
      // 🥈 Chrome Premium: Google Español (Latino o US suelen ser mejores)
      v => (v.lang === 'es-MX' || v.lang === 'es-US') && v.name.includes('Google'),
      v => v.lang.startsWith('es') && v.name.includes('Google'),
      // 🥉 Otras Neurales
      v => v.lang.startsWith('es') && v.name.includes('Neural'),
      // 🏅 Voces de Sistema (último recurso)
      v => v.lang.startsWith('es') && (v.name.includes('Helena') || v.name.includes('Sabina')),
      v => v.lang.startsWith('es')
    ];

    for (const f of filters) {
      const found = voices.find(f);
      if (found) { selectedVoice = found; return found; }
    }
    return voices.find(v => v.lang.startsWith('es')) || null;
  };

  // Pre-cargar voces
  window.speechSynthesis.onvoiceschanged = () => { if(!selectedVoice) getVoice(); };
  getVoice(); // Intento inicial

  const updateUI = () => {
    const ss  = window.speechSynthesis;
    const btn = panel.querySelector('#btn-audio-toggle');
    const isActuallySpeaking = ss.speaking && !internalPaused;
    
    if (btn) btn.innerHTML = isActuallySpeaking ? '⏸' : '▶';
    
    sections.forEach((sec, idx) => {
      const el = panel.querySelector(`#${sec.id}`);
      if (!el) return;
      const active = idx + 1 === currentStep && isActuallySpeaking;
      el.classList.toggle('section-highlight', active);
    });
  };

  const playStep = (idx) => {
    if (idx < 1 || idx > sections.length) {
      currentStep = 0;
      updateUI();
      return;
    }
    currentStep = idx;
    internalPaused = false;
    const u = new SpeechSynthesisUtterance(sections[idx - 1].text);
    const v = getVoice();
    if (v) u.voice = v;
    u.lang     = v ? v.lang : 'es-MX';
    u.rate     = 0.88; 
    u.pitch    = 1.0;
    
    u.onstart  = () => { internalPaused = false; updateUI(); };
    u.onerror  = (err) => { 
      console.warn("Speech error:", err);
      internalPaused = false;
      updateUI();
    };
    u.onend    = () => {
      if (currentStep === idx) {
        if (idx < sections.length) {
          setTimeout(() => playStep(idx + 1), 600);
        } else {
          currentStep = 0;
          internalPaused = false;
          updateUI();
        }
      }
    };

    window.speechSynthesis.cancel();
    setTimeout(() => {
      window.speechSynthesis.speak(u);
    }, 50);
  };

  panel.querySelector('#btn-audio-toggle').onclick = (e) => {
    e.preventDefault();
    const ss = window.speechSynthesis;
    
    if (ss.speaking) {
      if (internalPaused) {
        ss.resume();
        internalPaused = false;
      } else {
        ss.pause();
        internalPaused = true;
      }
    } else {
      playStep(1);
    }
    
    updateUI();
  };

  panel.querySelector('#btn-audio-prev').onclick = () => {
    playStep(currentStep > 1 ? currentStep - 1 : 1);
  };

  panel.querySelector('#btn-audio-next').onclick = () => {
    if (currentStep < sections.length) playStep(currentStep + 1);
  };

  // Poll UI (boundary event is unreliable across browsers)
  const timer = setInterval(() => {
    if (!document.getElementById('lp-panel')) { clearInterval(timer); return; }
    updateUI();
  }, 300);

  return panel;
}

function openLearning(q) {
  const overlay = document.getElementById('lp-overlay');
  const panel   = document.getElementById('lp-panel');
  overlay?.classList.add('visible');
  panel?.classList.add('visible');
  panel?.querySelector('#btn-audio-toggle')?.click();
}

function closeLearning() {
  document.getElementById('lp-overlay')?.classList.remove('visible');
  document.getElementById('lp-panel')?.classList.remove('visible');
  // Cancelar y limpiar cualquier proceso de voz pendiente
  window.speechSynthesis.pause(); // Algunos navegadores necesitan pausa antes de cancel
  window.speechSynthesis.cancel();
}

/* ─── RESULTADOS ──────────────────────────────────────── */
function renderResults() {
  const total   = S.answers.length;
  const correct = S.answers.filter(a => a.isCorrect).length;
  const pct     = Math.round((correct / total) * 100);

  const AREAS = [
    { name: 'Lectura Crítica',       icon: '📖', color: '#7c3aed' },
    { name: 'Matemáticas',           icon: '📐', color: '#06b6d4' },
    { name: 'Sociales y Ciudadanas', icon: '🏛️', color: '#f59e0b' },
    { name: 'Ciencias Naturales',    icon: '🔬', color: '#10b981' },
    { name: 'Inglés',                icon: '🌎', color: '#f43f5e' }
  ];

  const areaStats = AREAS.map(a => {
    const qs = S.answers.filter(ans => ans.area === a.name);
    const c  = qs.filter(ans => ans.isCorrect).length;
    return { ...a, correct: c, total: qs.length, pct: Math.round((c / qs.length) * 100) };
  });

  let msg = pct >= 80 ? '🏆 ¡Excelente resultado! Tienes una base sólida. El entrenamiento te llevará al siguiente nivel.'
          : pct >= 60 ? '💪 Buen comienzo. Identifica las áreas donde fallaste y empieza a entrenar con nosotros.'
          : pct >= 40 ? '📚 Este es tu punto de partida. Con práctica guiada, mejorarás rápidamente. ¡Tú puedes!'
          :             '🌱 Todos empezamos aquí. Lo importante es que ya diste el primer paso. ¡A entrenar!';

  const areasHtml = areaStats.map(s => `
    <div class="area-row">
      <div class="area-row-header">
        <div class="area-row-name">${s.icon} ${s.area}</div>
        <div class="area-row-score">${s.correct}/${s.total}</div>
      </div>
      <div class="area-bar"><div class="area-bar-fill" style="width:${s.pct}%; background:${s.color};"></div></div>
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
      <h2>${pct >= 70 ? '¡Muy bien hecho!' : pct >= 50 ? 'Buen esfuerzo' : 'Escaneo completado'}</h2>
      <p>${correct} correctas · ${total - correct} para mejorar · ${fmtTime(S.elapsed)}</p>
    </div>
    <div class="results-message">${msg}</div>
    <div class="areas-section">
      <h3>Rendimiento por área</h3>
      ${areasHtml}
    </div>
    <div class="results-actions">
      <button class="btn btn-primary" id="btn-go-home-from-results">🏠 Ir a Mi Panel de Estudio</button>
    </div>`;

  el.querySelector('#btn-go-home-from-results').onclick = () => navigate('roadmap');
  app.appendChild(el);
}

/* ─── RESULTADOS ENTRENAMIENTO ────────────────────────── */
function renderTrainingResults() {
  const total   = S.trainingAnswers.length;
  const correct = S.trainingAnswers.filter(a => a.isCorrect).length;
  const pct     = Math.round((correct / total) * 100);

  const el = div('screen results-screen');
  el.innerHTML = `
    <div class="results-top">
      <div style="font-size:3.5rem; margin-bottom:1rem;">🎉</div>
      <h2 style="font-size:1.8rem;">¡Así te fue hoy!</h2>
      <p style="color:var(--text-muted); margin-bottom:2rem;">Entrenamiento completado con éxito</p>
      <div style="background:var(--surface2); border:1px solid var(--border); border-radius:var(--radius); padding:2rem; width:100%; max-width:320px; margin:0 auto 2rem;">
        <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--primary); font-weight:800; margin-bottom:0.5rem;">Puntaje de Sesión</div>
        <div style="font-size:3rem; font-weight:900; color:white;">${correct}<span style="font-size:1.2rem; opacity:0.5;">/${total}</span></div>
        <div style="font-size:0.85rem; color:var(--text-muted); margin-top:0.4rem;">${pct}% de efectividad</div>
      </div>
      <p style="font-size:0.95rem; font-weight:600; line-height:1.6; padding:0 1rem;">Has fortalecido tus puntos críticos. Mañana tendremos un nuevo plan para ti.</p>
    </div>
    <div class="results-actions">
      <button class="btn btn-primary" id="btn-back-home">🏠 Ir al Panel de Inicio</button>
    </div>`;

  el.querySelector('#btn-back-home').onclick = () => {
    S.mode = 'diagnostic';
    navigate('home');
  };
  app.appendChild(el);
}

/* ─── REVIEW / OPINIÓN ────────────────────────────────── */
function renderReview() {
  const el = div('screen welcome-screen');
  el.innerHTML = `
    <h1 class="welcome-title">¡Último paso!</h1>
    <p class="welcome-sub">Tu opinión es lo más importante para nosotros. ¿Qué te pareció el Escaneo Estratégico?</p>

    <div class="lp-section" style="margin-top:2rem; width:100%; box-sizing:border-box;">
      <div class="lp-section-title">¿Cómo fue tu experiencia hoy?</div>
      <textarea id="final-review-text" class="btn btn-secondary"
        style="width:100%; height:200px; text-align:left; cursor:text; margin-bottom:1.5rem; padding:1.2rem; font-size:1rem; resize:none; line-height:1.5;"
        placeholder="Escribe aquí tu comentario o sugerencia..."></textarea>
    </div>

    <button class="btn btn-primary" id="btn-submit-review">Enviar mi opinión por WhatsApp →</button>
    <div style="margin-top:2.5rem; text-align:center;">
      <a id="btn-skip-review" style="font-size:0.75rem; color:var(--text-muted); opacity:0.5; font-weight:500; cursor:pointer;">Opcional: saltar y ver resultados</a>
    </div>
    <p id="submit-status" style="color:var(--success); font-size:0.85rem; margin-top:1rem; text-align:center; display:none;">Abriendo WhatsApp y preparando tu plan...</p>`;

  const handleFinish = async (reviewText = '') => {
    S.finalReview = reviewText || 'Sin comentario (saltó review)';
    const btn    = el.querySelector('#btn-submit-review');
    const status = el.querySelector('#submit-status');
    if (btn)    btn.disabled = true;
    if (status) status.style.display = 'block';

    await submitToSupabase();

    if (reviewText) {
      const msg = encodeURIComponent(`¡Hola Lucas! Acabo de terminar el Escaneo Estratégico. Aquí mi opinión:\n\n"${reviewText}"`);
      window.open(`https://wa.me/573043995297?text=${msg}`, '_blank');
    }
    navigate('generating');
  };

  el.querySelector('#btn-submit-review').onclick = () => {
    const text = el.querySelector('#final-review-text').value.trim();
    if (!text) return alert('Por favor escribe un breve comentario antes de enviar por WhatsApp.');
    handleFinish(text);
  };
  el.querySelector('#btn-skip-review').onclick = () => handleFinish();

  app.appendChild(el);
}

/* ─── GENERANDO PLAN ──────────────────────────────────── */
function renderGeneratingPlan() {
  const messages = [
    'Mapeando brechas de conocimiento...',
    'Alineando debilidades con estándares ICFES...',
    'Estructurando tus metas de 15 preguntas semanales...',
    'Finalizando tu Hoja de Ruta personalizada...'
  ];

  const el = div('screen welcome-screen');
  el.innerHTML = `
    <div class="loading-container" style="text-align:center; padding:3rem 0;">
      <div class="spinner"></div>
      <h2 id="gen-msg" class="welcome-title" style="font-size:1.2rem;">${messages[0]}</h2>
      <p class="welcome-sub">Casi listo. Esto cambiará tu forma de estudiar.</p>
    </div>`;

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

/* ─── ROADMAP ─────────────────────────────────────────── */
function renderRoadmap() {
  const areas = ['Lectura Crítica', 'Matemáticas', 'Sociales y Ciudadanas', 'Ciencias Naturales', 'Inglés'];
  const areaStats = areas.map(area => {
    const qs      = S.answers.filter(a => a.area === area);
    const correct = qs.filter(a => a.isCorrect).length;
    return { area, pct: qs.length ? (correct / qs.length) : 0 };
  }).sort((a, b) => a.pct - b.pct);

  const weak1 = areaStats[0].area;
  const weak2 = areaStats[1].area;

  const el = div('screen roadmap-screen');
  el.style.paddingBottom = '100px';
  el.innerHTML = `
    <div class="results-top">
      <div class="welcome-badge" style="background:rgba(16,185,129,0.1); color:var(--success); border-color:var(--success);">TU PLAN ESTÁ LISTO</div>
      <h1 class="welcome-title" style="margin:1rem 0;">Tu Plan de Estudio Semanal</h1>
      <p class="welcome-sub">Esta semana vas a entrenar con <b>40 preguntas</b>, pero debido a tus debilidades actuales, nos enfocaremos intensamente en <b>${weak1}</b> y <b>${weak2}</b>.</p>
    </div>

    <div class="roadmap-focus-card">
      <div class="roadmap-badge">OBJETIVO SEMANAL</div>
      <div class="focus-item">
        <h3 style="color:var(--primary);">1. Inmersión en ${weak1}</h3>
        <p>Tu mayor oportunidad de mejora. Harás <b>25 de las 40 preguntas</b> enfocadas aquí.</p>
      </div>
      <div class="focus-item">
        <h3 style="color:var(--secondary);">2. Refuerzo en ${weak2}</h3>
        <p>Segunda prioridad. Dedicaremos 15 ejercicios para fortalecer tus bases.</p>
      </div>
    </div>

    <div class="roadmap-note">⚠️ Este plan se actualiza cada semana según tu progreso.</div>

    <div style="margin-top:3rem; text-align:center;">
      <button class="btn btn-primary" id="btn-go-home" style="padding:1.3rem; font-size:1.15rem; box-shadow:0 12px 40px rgba(124,58,237,0.4);">🚀 Empezar a Estudiar</button>
      <p style="margin-top:1rem; font-size:0.75rem; color:var(--text-muted);">Tu camino comienza ahora</p>
    </div>`;

  el.querySelector('#btn-go-home').onclick = () => navigate('paywall');
  app.appendChild(el);
}

/* ─── PAYWALL ─────────────────────────────────────────── */
function renderPaywall() {
  const el = div('screen welcome-screen');
  el.innerHTML = `
    <div style="text-align:center; margin-bottom:1.5rem;">
      <span style="font-size:3rem;">🔒</span>
      <div style="background:linear-gradient(135deg,#f59e0b,#ef4444); color:white; font-size:0.65rem; font-weight:900; letter-spacing:0.1em; padding:0.3rem 0.8rem; border-radius:50px; display:inline-block; margin-top:0.5rem;">ACCESO ANTICIPADO LIMITADO</div>
    </div>

    <h1 class="welcome-title" style="font-size:1.6rem; margin-bottom:0.5rem;">Tu plan ya está listo.<br>Desbloquéalo.</h1>
    <p class="welcome-sub" style="margin-bottom:2rem;">Acabas de ver tu hoja de ruta. Lo que viene ahora es practicar con ella cada semana. Eso es lo que sube el puntaje de verdad.</p>

    <div class="price-grid">
      <div class="price-card">
        <div class="price-card-bar muted"></div>
        <div class="price-label" style="color:var(--text-muted);">Precio regular</div>
        <div class="price-sub" style="color:var(--text-muted); text-decoration:line-through;">Cuando lancemos</div>
        <div class="price-amount" style="opacity:0.7;">$2.000<span style="color:var(--text-muted);">/semana</span></div>
        <div class="price-note" style="color:var(--text-muted);">≈ $8.000/mes</div>
      </div>
      <div class="price-card featured">
        <div class="price-card-bar gradient"></div>
        <div class="price-label" style="color:var(--primary);">⚡ Acceso anticipado</div>
        <div class="price-sub" style="color:#a78bfa;">Acceso ilimitado</div>
        <div class="price-amount" style="color:white;">$5.000<span style="color:#a78bfa;"> único</span></div>
        <div class="price-note" style="color:var(--success); font-weight:700;">Mientras mejoramos la app 🎉</div>
      </div>
    </div>

    <div class="paywall-benefits">
      <div style="font-size:0.8rem; font-weight:800; margin-bottom:0.8rem; color:var(--primary);">✅ Con tu acceso anticipado obtienes:</div>
      <div class="paywall-benefit">🎯 Tu plan semanal dinámico de 40 preguntas</div>
      <div class="paywall-benefit">📊 Seguimiento de puntaje estimado en tiempo real</div>
      <div class="paywall-benefit">🧠 Panel de aprendizaje para cada pregunta fallida</div>
      <div class="paywall-benefit">🔄 Actualizaciones de la app incluidas (tú retroalimentas)</div>
    </div>

    <button class="btn btn-primary" id="btn-pay" style="font-size:1.05rem; padding:1.15rem; box-shadow:0 10px 30px rgba(124,58,237,0.5); margin-bottom:0.8rem;">⚡ Quiero el Acceso Anticipado por $5.000</button>
    <p style="font-size:0.7rem; color:var(--text-muted); text-align:center;">Pago por WhatsApp · Solo para los primeros estudiantes</p>

    <div style="margin-top:2.5rem; text-align:center; padding-top:1.5rem; border-top:1px solid var(--border);">
      <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.8rem;">¿Ya compraste tu acceso?</p>
      <a id="btn-claim-access" style="font-size:0.85rem; color:var(--secondary); font-weight:800; cursor:pointer;">Ingresar con mi cuenta →</a>
    </div>`;

  el.querySelector('#btn-pay').onclick = () => {
    const msg = encodeURIComponent('Hola! Quiero el acceso anticipado al Entrenador ICFES por $5.000. Acabo de hacer el Escaneo Estratégico y quiero empezar.');
    window.open(`https://wa.me/573043995297?text=${msg}`, '_blank');
  };
  el.querySelector('#btn-claim-access').onclick = () => navigate('studentLogin');
  app.appendChild(el);
}

/* ─── HOME ────────────────────────────────────────────── */
function renderHome() {
  const AREAS = [
    { name: 'Lectura Crítica',       icon: '📖', color: '#7c3aed' },
    { name: 'Matemáticas',           icon: '📐', color: '#06b6d4' },
    { name: 'Sociales y Ciudadanas', icon: '🌍', color: '#f59e0b' },
    { name: 'Ciencias Naturales',    icon: '🔬', color: '#10b981' },
    { name: 'Inglés',                icon: '🌐', color: '#f43f5e' }
  ];

  const areaStats = AREAS.map(a => {
    const qs      = S.answers.filter(ans => ans.area === a.name);
    const correct = qs.filter(ans => ans.isCorrect).length;
    const pct     = qs.length ? Math.round((correct / qs.length) * 100) : 0;
    return { ...a, correct, total: qs.length, pct };
  }).sort((a, b) => a.pct - b.pct);

  const totalCorrect   = S.answers.filter(a => a.isCorrect).length;
  const totalPct       = S.answers.length ? Math.round((totalCorrect / S.answers.length) * 100) : 0;
  const estimatedScore = Math.round(totalPct * 5);
  const weak1 = areaStats[0];
  const weak2 = areaStats[1];
  const greeting = S.user.name ? S.user.name.split(' ')[0] : 'Estudiante';

  const now        = new Date();
  const targetDate = new Date('2026-08-10');
  const diffDays   = Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24));

  const scoreColor = pct => pct >= 70 ? 'high' : pct >= 40 ? 'mid' : 'low';

  const areasBarHtml = areaStats.map(a => `
    <div class="progress-area-row">
      <div class="progress-area-header">
        <span class="progress-area-name">${a.icon} ${a.name}</span>
        <span class="progress-area-score ${scoreColor(a.pct)}">${a.pct}/100</span>
      </div>
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width:${a.pct}%; background:${a.color};"></div>
      </div>
    </div>`).join('');

  const trainingContent = S.trainingComplete ? `
    <div class="training-complete-card">
      <div class="icon">✅</div>
      <h2>¡Entrenamiento Completado!</h2>
      <p>Ya cumpliste con tu meta diaria. Descansa un poco y vuelve mañana para seguir subiendo ese puntaje.</p>
      <div class="streak-info">🔥 Llevas ${S.streak} días de racha. ¡No te detengas!</div>
      <button class="btn btn-secondary" id="btn-redo-training" style="margin-top:2rem; font-size:0.75rem; opacity:0.6;">Repetir práctica (opcional)</button>
    </div>` : `
    <div class="training-card">
      <div class="training-card-badge">META DE HOY</div>
      <h2>🎯 Tu Plan del Día</h2>
      <p class="sub">Resuelve estas preguntas estratégicas para atacar tus debilidades directamente.</p>
      <div class="area-focus-row critical">
        <div class="area-focus-icon">${weak1.icon}</div>
        <div>
          <span class="area-focus-tag critical">Área Crítica</span>
          <p class="area-focus-name">${weak1.name}</p>
          <p class="area-focus-meta">12 preguntas · Dificultad Adaptable</p>
        </div>
      </div>
      <div class="area-focus-row reinforce">
        <div class="area-focus-icon">${weak2.icon}</div>
        <div>
          <span class="area-focus-tag reinforce">Refuerzo</span>
          <p class="area-focus-name">${weak2.name}</p>
          <p class="area-focus-meta">8 preguntas · Consolidación</p>
        </div>
      </div>
      <button class="btn btn-primary" id="btn-start-daily" style="margin-top:1.5rem;">🚀 Hacer Entrenamiento de Hoy</button>
    </div>`;

  const el = div('screen home-screen');
  el.innerHTML = `
    <div class="home-header">
      <div class="home-header-glow"></div>
      <div class="home-header-top">
        <div>
          <div class="home-greeting">
            <h1>Hola, ${greeting}</h1>
            <div class="streak-badge">🔥 <span>${S.streak}</span></div>
          </div>
          <div class="home-days-badge">⏳ <span>${diffDays} días para el ICFES</span></div>
        </div>
        <div class="score-card">
          <div class="score-card-label">Puntaje Estimado</div>
          <div class="score-card-value">${estimatedScore}<span>/500</span></div>
        </div>
      </div>
      <div class="home-tabs">
        <button id="tab-trainer" class="tab-btn active">Entrenamiento del Día</button>
        <button id="tab-progress" class="tab-btn">Tu Progreso</button>
      </div>
    </div>

    <div class="home-content">
      <div id="view-trainer">${trainingContent}</div>

      <div id="view-progress" style="display:none;">
        <div class="progress-card">
          <h2>📊 Tu Rendimiento por Área</h2>
          ${areasBarHtml}
        </div>
        <div style="background:linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.1)); border:1px solid rgba(124,58,237,0.2); border-radius:var(--radius); padding:1.5rem; text-align:center;">
          <div style="font-size:2rem; margin-bottom:0.5rem;">🏆</div>
          <p style="font-size:0.9rem; font-weight:700; margin-bottom:0.3rem;">Mantén el ritmo</p>
          <p style="font-size:0.78rem; color:var(--text-muted); line-height:1.5;">Los estudiantes que practican 120 preguntas semanales mejoran en promedio <b style="color:#a78bfa;">15 puntos</b> su puntaje ICFES.</p>
        </div>
      </div>

      <div class="home-actions">
        <button class="btn btn-muted" id="btn-restart-diag" style="flex:1; font-size:0.8rem;">🔄 Reiniciar Plan</button>
        <button class="btn btn-danger" id="btn-logout" style="flex:1; font-size:0.8rem;">🚪 Salir</button>
      </div>
    </div>`;

  // Tab switching
  const tabTrainer  = el.querySelector('#tab-trainer');
  const tabProgress = el.querySelector('#tab-progress');
  const viewTrainer = el.querySelector('#view-trainer');
  const viewProgres = el.querySelector('#view-progress');

  const switchTab = (active, inactive, showEl, hideEl) => {
    active.classList.add('active');    inactive.classList.remove('active');
    showEl.style.display = 'block';   hideEl.style.display  = 'none';
  };

  tabTrainer.onclick  = () => switchTab(tabTrainer, tabProgress, viewTrainer, viewProgres);
  tabProgress.onclick = () => switchTab(tabProgress, tabTrainer, viewProgres, viewTrainer);

  // Training start logic
  const startFn = () => {
    S.mode           = 'training';
    S.trainingAnswers = [];
    S.elapsed        = 0;

    const allWeak1 = QUESTIONS.filter(q => q.area === weak1.name);
    const allWeak2 = QUESTIONS.filter(q => q.area === weak2.name);
    let trainQs    = [...allWeak1.slice(0, 12), ...allWeak2.slice(0, 8)];

    if (trainQs.length < 20) {
      const ids    = new Set(trainQs.map(q => q.id));
      const filler = QUESTIONS.filter(q => !ids.has(q.id)).slice(0, 20 - trainQs.length);
      trainQs      = [...trainQs, ...filler];
    }

    if (trainQs.length === 0) return alert('No hay preguntas disponibles en el banco.');
    S.trainingQuestions = trainQs;
    navigate('question', 0);
  };

  el.querySelector('#btn-start-daily')?.addEventListener('click', startFn);
  el.querySelector('#btn-redo-training')?.addEventListener('click', startFn);

  el.querySelector('#btn-restart-diag').onclick = () => {
    if (confirm('¿Quieres borrar tu progreso actual y hacer un nuevo Escaneo Estratégico?')) {
      S.answers = []; S.elapsed = 0; S.finalReview = '';
      navigate('welcome');
    }
  };

  el.querySelector('#btn-logout').onclick = async () => {
    if (confirm('¿Seguro que quieres cerrar tu sesión?')) {
      await supabase.auth.signOut();
      clearState();
      navigate('welcome');
    }
  };

  app.appendChild(el);
}

/* ─── SUPABASE ────────────────────────────────────────── */
async function submitToSupabase() {
  const correct = S.answers.filter(a => a.isCorrect).length;
  const total   = S.answers.length;
  const data = {
    name:         S.user.name,
    whatsapp:     S.user.whatsapp,
    score:        `${correct}/${total}`,
    percentage:   Math.round((correct / total) * 100),
    time_spent:   fmtTime(S.elapsed),
    final_review: S.finalReview,
    errors_log:   S.errors.join('\n')
  };

  try {
    const { error } = await supabase.from('leads').insert(data);
    if (error) console.error('Error de Supabase:', error.message);
  } catch (e) {
    console.error('Error de red al enviar a Supabase:', e);
  }

  // Always navigate regardless of result
  navigate('generating');
}

/* ─── ERROR TRACKER ───────────────────────────────────── */
window.onerror = (msg, url, lineNo, columnNo) => {
  S.errors.push(`[Error]: ${msg} at ${lineNo}:${columnNo}`);
  return false;
};

/* ─── HELPER ──────────────────────────────────────────── */


function div(classes) {
  const el = document.createElement('div');
  if (classes) el.className = classes;
  return el;
}

/* ─── INIT ────────────────────────────────────────────── */
function initApp() {
  app = document.getElementById('app');
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  loadState();
  if (S.screen === 'question' && S.mode === 'diagnostic') startTimer();
  history.replaceState({ screen: S.screen, qIndex: S.qIndex }, '', '');
  render();
}

// Módulos ES se ejecutan con defer, así que el DOM ya está listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

window.onpopstate = (event) => {
  if (event.state) navigate(event.state.screen, event.state.qIndex, false);
};
