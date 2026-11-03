/* Tu Mejor Jugada 2.0: juego sin cuentas ni datos enviados a servidores. */
'use strict';

const stage = document.getElementById('game-stage');
const levelTiles = Array.from(document.querySelectorAll('.level-tile'));
const ROUND_SECONDS = 25;
const BOARD_KEY = 'tu-mejor-jugada-marcadores-v2';
const SOURCE_GOV = 'https://www.argentina.gob.ar/capital-humano/familia/bienestar-emocional/somos-familia/apuestas-online-y-juego-problematico';
const SOURCE_UNICEF = 'https://www.unicef.org/argentina/apuestas-online';
const SOURCE_MENTAL = 'https://www.unicef.org/argentina/apuestas-online-salud-mental';

/* Los textos se concentran acá para facilitar futuras ediciones. */
const challenges = {
  quiz1: {
    number: 1, icon: '🕵️', title: 'CAZÁ EL MITO',
    subtitle: '¿Es verdad o puro verso? Pensá antes de elegir.',
    label: 'DETECTIVE DIGITAL',
    questions: [
      {
        question: '“Si perdí varias veces, la próxima seguro gano”. ¿Qué pensás?',
        choices: ['Sí, así funcionan las apuestas.', 'No. Perder antes no garantiza ganar después.', 'Depende de cuánto dinero apueste.'],
        correct: 1,
        explanation: 'Cada apuesta tiene un resultado incierto. Haber perdido antes no significa que ahora toque ganar. Perseguir las pérdidas puede aumentar el problema.',
        source: 'Argentina.gob.ar: apuestas online y juego problemático', sourceUrl: SOURCE_GOV
      },
      {
        question: '¿Cuál de estas situaciones es una señal de alerta?',
        choices: ['No poder dejar de pensar en recuperar plata perdida.', 'Desconectar el celular para descansar.', 'Jugar a la pelota con amigos.'],
        correct: 0,
        explanation: 'Pensar todo el tiempo en recuperar lo perdido, ocultar gastos o apostar sin poder parar son señales para conversar y buscar acompañamiento, sin juzgar.',
        source: 'Argentina.gob.ar: apuestas online y juego problemático', sourceUrl: SOURCE_GOV
      },
      {
        question: 'Las apuestas online para menores de edad...',
        choices: ['Son una forma fácil de conseguir dinero.', 'Son seguras si apostás muy poquito.', 'No son para menores y pueden causar daños.'],
        correct: 2,
        explanation: 'En Argentina, las apuestas online están prohibidas para menores de 18 años. Que una plataforma parezca un videojuego no elimina sus riesgos.',
        source: 'UNICEF Argentina: apuestas online', sourceUrl: SOURCE_UNICEF
      },
      {
        question: 'Un influencer muestra una gran ganancia en apuestas. ¿Qué conviene recordar?',
        choices: ['Si le funcionó, a todos les va a pasar.', 'Un video de éxito no demuestra que apostar sea seguro.', 'Cuantos más seguidores tiene, más fácil es ganar.'],
        correct: 1,
        explanation: 'Las publicaciones pueden mostrar premios y ocultar pérdidas. La popularidad de alguien no transforma una apuesta en una oportunidad segura.',
        source: 'UNICEF Argentina: apuestas online', sourceUrl: SOURCE_UNICEF
      },
      {
        question: 'Una app tiene luces, niveles y premios, pero te pide dinero para apostar. ¿Qué es?',
        choices: ['Una apuesta, aunque se parezca a un videojuego.', 'Solo un juego de habilidades sin riesgos.', 'Una forma garantizada de ahorrar.'],
        correct: 0,
        explanation: 'El diseño de las plataformas puede parecer divertido. Si arriesgás dinero por un resultado incierto, sigue siendo una apuesta, no una forma de ahorro.',
        source: 'UNICEF Argentina: apuestas online', sourceUrl: SOURCE_UNICEF
      }
    ]
  },
  quiz2: {
    number: 2, icon: '💬', title: 'ELEGÍ LA JUGADA',
    subtitle: 'Situaciones reales. Decisiones que te cuidan.',
    label: 'MODO CHAT ACTIVADO',
    questions: [
      {
        question: 'Al grupo del curso llega un link: “¡Plata fácil! Entrá ahora”. ¿Qué hacés?',
        choices: ['Lo comparto para que todos aprovechen.', 'No entro ni lo reenvío y aviso a un adulto de confianza.', 'Pruebo para ver si es real.'],
        correct: 1,
        explanation: 'No abrir ni reenviar enlaces sospechosos ayuda a frenar su circulación. Si tenés dudas, consultá con alguien de confianza.',
        source: 'UNICEF Argentina: apuestas online', sourceUrl: SOURCE_UNICEF
      },
      {
        question: 'Un amigo perdió dinero apostando y está angustiado. ¿Cómo lo ayudás?',
        choices: ['Lo escucho sin juzgar y lo acompaño a pedir ayuda.', 'Le presto dinero para que intente recuperarlo.', 'Lo cargo delante del grupo.'],
        correct: 0,
        explanation: 'Escuchar sin juzgar y acompañar es mucho más útil que burlarse o prestar dinero para seguir apostando. Se puede buscar apoyo adulto o profesional.',
        source: 'UNICEF Argentina: apuestas online y salud mental', sourceUrl: SOURCE_MENTAL
      },
      {
        question: 'Querés hacer un video de prevención. ¿Qué mensaje suma de verdad?',
        choices: ['“Con este truco siempre ganás”.', '“Apostar no tiene riesgos si sabés jugar”.', '“No todo lo que promete premios es una oportunidad”.'],
        correct: 2,
        explanation: 'Un mensaje preventivo cuestiona las promesas engañosas y ayuda a pensar críticamente sobre la publicidad de apuestas.',
        source: 'UNICEF Argentina: apuestas online', sourceUrl: SOURCE_UNICEF
      },
      {
        question: 'Alguien desconocido te ofrece un bono para apostar y pide tus datos. ¿Qué hacés?',
        choices: ['Envío mis datos para reclamar el bono.', 'Reenvío la oferta al curso.', 'No comparto mis datos y bloqueo o reporto el mensaje.'],
        correct: 2,
        explanation: 'Los mensajes que prometen beneficios a cambio de datos pueden exponerte a riesgos. No compartas información personal ni difundas promociones sospechosas.',
        source: 'UNICEF Argentina: apuestas online', sourceUrl: SOURCE_UNICEF
      },
      {
        question: 'Una compañera quiere pedir ayuda, pero le da vergüenza. ¿Qué le sugerís?',
        choices: ['Contarlo en el grupo sin preguntarle.', 'Buscar juntos a un adulto o referente de confianza.', 'Que lo resuelva sola y no diga nada.'],
        correct: 1,
        explanation: 'Pedir ayuda es una decisión valiente. Acompañar con respeto y sin exponer a la persona facilita que encuentre apoyo.',
        source: 'UNICEF Argentina: apuestas online y salud mental', sourceUrl: SOURCE_MENTAL
      }
    ]
  }
};

const creativeChoices = {
  hook: ['“¿Y si un clic te cuesta más que dinero?”', '“No todo lo que parece premio lo es”.', '“Te llegó un link. ¿Y ahora?”'],
  format: ['💬 Chat ficticio en pantalla', '🎭 Mini sketch con compañeros', '✨ Animación con ilustraciones'],
  close: ['“Pedir ayuda también es una gran jugada”.', '“Tu tiempo y tus sueños valen mucho más”.', '“Tu mejor jugada es decidir por vos”.']
};

let state = freshState();
let activeTimer = null;
let audioContext = null;

function freshState(mode = 'arcade') {
  return {
    screen: 'intro', mode, index: 0, selected: null, timedOut: false, lastEarned: 0,
    score: 0, completed: 0, lives: 3, streak: 0, recharges: 0,
    remaining: ROUND_SECONDS, paused: false, sound: false,
    creative: { hook: 0, format: 0, close: 2 }, copied: false, savedRank: false
  };
}

function safeText(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function maxScore() { return state.mode === 'arcade' ? 190 : 140; }
function motionAllowed() { return !window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
function stageScroll() { stage.scrollIntoView({ behavior: motionAllowed() ? 'smooth' : 'auto', block: 'start' }); }
function stopTimer() { if (activeTimer) clearInterval(activeTimer); activeTimer = null; }

function readBoard() {
  try {
    const parsed = JSON.parse(localStorage.getItem(BOARD_KEY) || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(item => item && typeof item.nickname === 'string' &&
      Number.isFinite(item.score) && ['arcade', 'tranqui'].includes(item.mode))
      .map(item => ({
        nickname: item.nickname.slice(0, 14), score: Math.max(0, Math.min(190, item.score)),
        mode: item.mode, created: Number.isFinite(item.created) ? item.created : 0
      })).sort((a, b) => b.score - a.score || a.created - b.created).slice(0, 30);
  } catch { return []; }
}

function writeBoard(entries) {
  try {
    localStorage.setItem(BOARD_KEY, JSON.stringify(entries));
    return true;
  } catch { return false; }
}

function boardMarkup() {
  const top = readBoard().filter(entry => entry.mode === state.mode).slice(0, 5);
  return `<aside class="leaderboard" aria-label="Ranking de este dispositivo">
    <div class="leaderboard-head"><span class="leaderboard-trophy" aria-hidden="true">🏆</span><div>
      <h3>HALL DE LA FAMA</h3><p>TOP 5 · ${state.mode === 'arcade' ? 'MODO ARCADE' : 'MODO TRANQUI'}</p>
    </div></div>
    ${top.length ? top.map((item, index) => `<div class="leaderboard-row"><span>${['🥇','🥈','🥉','⭐','⭐'][index]} ${safeText(item.nickname)}</span><b>${item.score} PTS</b></div>`).join('') :
      '<div class="leaderboard-empty">✨ Todavía no hay récords. ¡El primer puesto puede ser tuyo!</div>'}
    <div class="leaderboard-footer">🔐 Este ranking se guarda solo en este dispositivo. No es público ni se envía a internet.</div>
  </aside>`;
}

function renderIntro() {
  stage.innerHTML = `<div class="stage-intro"><div class="start-layout">
    <div class="start-copy">
      <div class="intro-icon" aria-hidden="true">⚡</div>
      <div class="stage-kicker">MISIÓN: PENSAR, ELEGIR Y CREAR</div>
      <h2>¿TENÉS LO QUE HACE FALTA PARA <em>SUBIR DE NIVEL?</em></h2>
      <p>Dos rondas de preguntas, un desafío creativo y tres medallas para desbloquear. Elegí cómo jugar:</p>
      <div class="mode-select" role="group" aria-label="Elegí una modalidad">
        <button type="button" class="mode-choice ${state.mode === 'arcade' ? 'is-selected' : ''}" data-mode="arcade" aria-pressed="${state.mode === 'arcade'}">
          <span aria-hidden="true">🚀</span><strong>MODO ARCADE</strong><small>25 segundos por pregunta. ¡Sumá puntos por rapidez!</small>
        </button>
        <button type="button" class="mode-choice ${state.mode === 'tranqui' ? 'is-selected' : ''}" data-mode="tranqui" aria-pressed="${state.mode === 'tranqui'}">
          <span aria-hidden="true">🌈</span><strong>MODO TRANQUI</strong><small>Sin límite de tiempo. Aprendé a tu ritmo.</small>
        </button>
      </div>
      <button class="btn btn-primary start-main-btn" type="button" data-action="start">¡VAMOS CON EL DESAFÍO! <span aria-hidden="true">→</span></button>
      <p class="intro-note">💗 Empezás con 3 vidas. Si se terminan, las recargás y seguís aprendiendo.</p>
    </div>
    ${boardMarkup()}
  </div></div>`;
}

function updateDashboard() {
  document.getElementById('score-value').textContent = String(state.score);
  document.getElementById('score-max').textContent = '/' + maxScore();
  document.getElementById('lives-value').textContent = '♥ '.repeat(state.lives).trim() || '♡ ♡ ♡';
  document.getElementById('lives-value').setAttribute('aria-label', state.lives + ' vidas');
  document.getElementById('streak-value').textContent = state.streak + ' ACIERTOS';
  document.getElementById('mode-value').textContent = state.mode === 'arcade' ? 'MODO ARCADE' : 'MODO TRANQUI';
  document.getElementById('progress-fill').style.width = (state.completed / 3 * 100) + '%';
  document.getElementById('progress-track').setAttribute('aria-valuenow', String(state.completed));
  const current = state.screen === 'quiz2' || state.screen === 'milestone2' ? 2 :
                  state.screen === 'creative' || state.screen === 'complete' ? 3 : 1;
  levelTiles.forEach((tile, index) => {
    const number = index + 1;
    const done = number <= state.completed;
    tile.classList.toggle('is-completed', done);
    tile.classList.toggle('is-current', !done && number === current);
    tile.querySelector('.level-status').textContent = done ? '🏅 LISTO' : number === current ? 'EN JUEGO' : 'SIGUE';
  });
  const soundButton = document.getElementById('sound-toggle');
  soundButton.setAttribute('aria-pressed', String(state.sound));
  soundButton.setAttribute('aria-label', state.sound ? 'Desactivar sonidos' : 'Activar sonidos');
  soundButton.innerHTML = state.sound ? '🔊 <span>SONIDO ON</span>' : '🔇 <span>SONIDO OFF</span>';
}

function startQuiz(which) {
  stopTimer();
  state.screen = which;
  state.index = 0;
  state.selected = null;
  state.lives = 3;
  state.paused = false;
  state.remaining = ROUND_SECONDS;
  render();
  stageScroll();
}

function playTone(correct) {
  if (!state.sound) return;
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === 'suspended') void audioContext.resume();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = correct ? 'sine' : 'triangle';
    oscillator.frequency.value = correct ? 740 : 260;
    gain.gain.setValueAtTime(.045, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + .16);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + .17);
  } catch { /* El audio es opcional. */ }
}

function submitAnswer(index) {
  if (!['quiz1', 'quiz2'].includes(state.screen) || state.selected !== null || state.paused) return;
  stopTimer();
  const question = challenges[state.screen].questions[state.index];
  const correct = index === question.correct;
  state.selected = index;
  state.timedOut = index === -1;
  state.lastEarned = 0;
  if (correct) {
    state.lastEarned = 10 + (state.mode === 'arcade' && state.remaining >= 17 ? 5 : 0);
    state.score += state.lastEarned;
    state.streak++;
    if (state.streak >= 3) confetti(14);
  } else {
    state.lives = Math.max(0, state.lives - 1);
    state.streak = 0;
  }
  playTone(correct);
  render();
}

function nextQuestion() {
  if (state.selected === null) return;
  const quiz = challenges[state.screen];
  if (state.lives === 0) {
    state.lives = 3;
    state.recharges++;
    confetti(12);
  }
  if (state.index < quiz.questions.length - 1) {
    state.index++;
    state.selected = null;
    state.timedOut = false;
    state.paused = false;
    state.remaining = ROUND_SECONDS;
  } else {
    state.completed = Math.max(state.completed, quiz.number);
    state.screen = 'milestone' + quiz.number;
    confetti(30);
  }
  render();
  stageScroll();
}

function updateTimerDisplay() {
  const value = document.getElementById('timer-value');
  const fill = document.getElementById('timer-fill');
  const card = document.getElementById('timer-card');
  if (!value || !fill || !card) return;
  value.textContent = '⏱ ' + state.remaining + 's';
  fill.style.width = (state.remaining / ROUND_SECONDS * 100) + '%';
  card.classList.toggle('is-hurry', state.remaining <= 8);
}

function startTimer() {
  stopTimer();
  if (state.mode !== 'arcade' || state.selected !== null) return;
  updateTimerDisplay();
  activeTimer = window.setInterval(() => {
    if (document.hidden || state.paused || !['quiz1', 'quiz2'].includes(state.screen) || state.selected !== null) return;
    state.remaining = Math.max(0, state.remaining - 1);
    updateTimerDisplay();
    if (state.remaining === 0) submitAnswer(-1);
  }, 1000);
}

function renderQuiz() {
  const quiz = challenges[state.screen];
  const item = quiz.questions[state.index];
  const answered = state.selected !== null;
  const right = answered && state.selected === item.correct;
  const timeBar = state.mode === 'arcade' ? `<div class="timer-card" id="timer-card" aria-label="Tiempo disponible">
    <strong class="timer-number" id="timer-value">⏱ ${state.remaining}s</strong>
    <div class="timer-line" aria-hidden="true"><div class="timer-fill" id="timer-fill"></div></div>
    <button type="button" class="timer-pause" data-action="pause" aria-pressed="${state.paused}">${state.paused ? '▶ SEGUIR' : '⏸ PAUSA'}</button>
  </div>` : '<div class="question-number">🌈 SIN CRONÓMETRO</div>';

  stage.innerHTML = `<div class="challenge-panel">
    <div class="challenge-header">
      <span class="challenge-emoji" aria-hidden="true">${quiz.icon}</span>
      <div><span class="challenge-kicker">NIVEL ${quiz.number} / 3</span><h2>${quiz.title}</h2><p>${quiz.subtitle}</p></div>
      <div class="challenge-count"><strong>${state.index + 1}</strong> / ${quiz.questions.length}<br>RONDAS</div>
    </div>
    <div class="question-area">
      <div class="question-step"><span class="question-tag">${quiz.label}</span><span>+10 POR ACIERTO ${state.mode === 'arcade' ? '· +5 SI RESPONDÉS RÁPIDO' : ''}</span></div>
      <div class="quiz-tools">${answered ? '<div class="question-number">⭐ RONDA RESUELTA</div>' : timeBar}
        <span class="question-number">💗 ${state.lives} ${state.lives === 1 ? 'VIDA' : 'VIDAS'}</span>
      </div>
      <h3 class="question-title">${safeText(item.question)}</h3>
      <div class="answer-grid" role="group" aria-label="Elegí una respuesta">
        ${item.choices.map((choice, index) => {
          const klass = !answered ? '' : index === item.correct ? 'is-correct' : index === state.selected ? 'is-wrong' : 'is-dim';
          return `<button type="button" class="answer ${klass}" data-answer="${index}" ${answered ? 'disabled' : state.paused ? 'disabled' : ''}>
            <span class="answer-letter" aria-hidden="true">${['✦','●','◆'][index]}</span><span>${safeText(choice)}</span>
          </button>`;
        }).join('')}
      </div>
      ${answered ? `<div class="feedback ${right ? '' : 'is-wrong'} ${state.timedOut ? 'is-timeout' : ''}" role="status">
        <span class="feedback-icon" aria-hidden="true">${right ? '💚' : state.timedOut ? '⏰' : '💡'}</span>
        <div>
          <h3>${right ? '¡BIEN JUGADO! +' + state.lastEarned : state.timedOut ? '¡SE ACABÓ EL TIEMPO!' : '¡SEGUIMOS APRENDIENDO!'}</h3>
          ${right && state.lastEarned === 15 ? '<span class="speed-bonus">⚡ BONUS DE VELOCIDAD +5</span>' : ''}
          <p>${safeText(item.explanation)}</p>
          <div class="feedback-source">Para saber más: <a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer">${safeText(item.source)} ↗</a></div>
          ${state.lives === 0 ? '<div class="recharge">💗 Te quedaste sin vidas, pero nadie queda afuera. ¡Recargalas y seguí!</div>' : ''}
          <button type="button" class="btn btn-dark" data-action="next">${state.lives === 0 ? '💗 RECARGAR Y CONTINUAR' : state.index === quiz.questions.length - 1 ? 'VER MEDALLA' : 'SIGUIENTE RONDA'} <span aria-hidden="true">→</span></button>
        </div>
      </div>` : `<div class="stage-action-row"><span class="tipline">💭 Elegí lo que te parezca y después descubrí por qué.</span>
        <span class="tipline">${state.mode === 'arcade' ? '⏸ Podés pausar el reloj.' : '🌈 Sin presión.'}</span></div>
        <div class="question-pause-notice" id="pause-notice" ${state.paused ? '' : 'hidden'}>⏸ Juego en pausa. Cuando estés listo, tocá SEGUIR para continuar.</div>`}
    </div>
  </div>`;
  if (!answered) startTimer();
}

function renderMilestone(number) {
  const first = number === 1;
  stage.innerHTML = `<div class="challenge-panel milestone">
    <div class="stage-kicker">NIVEL ${number} SUPERADO · MEDALLA DESBLOQUEADA</div>
    <span class="medal-large" aria-hidden="true">${first ? '🧠🏅' : '💗🏅'}</span>
    <h2>${first ? '¡MENTE CRÍTICA!' : '¡ALIADO DE TU EQUIPO!'}</h2>
    <p>${first ? 'Detectaste promesas engañosas. Ahora veamos cómo actuarías en situaciones cotidianas.' :
    'Sabés escuchar, pensar antes de compartir y buscar apoyo. ¡Ahora a crear algo con tu voz!'}</p>
    <div class="milestone-sub">${state.score} PUNTOS · ${state.recharges} RECARGAS</div><br>
    <button type="button" class="btn btn-primary" data-action="${first ? 'to-quiz2' : 'to-creative'}">${first ? 'IR AL NIVEL 2' : 'CREAR MI VIDEO'} <span aria-hidden="true">→</span></button>
  </div>`;
}

function cleanFormat(value) { return value.replace(/^[^\p{L}]+/u, '').trim().toLowerCase(); }

function scriptText() {
  const hook = creativeChoices.hook[state.creative.hook];
  const format = cleanFormat(creativeChoices.format[state.creative.format]);
  const close = creativeChoices.close[state.creative.close];
  return ['TU MEJOR JUGADA — IDEA DE SPOT (45 SEGUNDOS)', '',
    'FORMATO: ' + format, '', '0–5 s | GANCHO', hook, '',
    '5–20 s | SITUACIÓN', 'Mostrá a un grupo que recibe un mensaje de “dinero fácil” con un enlace de apuestas. Una persona duda antes de tocarlo.', '',
    '20–35 s | DECISIÓN', 'El grupo decide no abrir ni reenviar el enlace. Conversan sobre los riesgos y el valor de pedir ayuda.', '',
    '35–45 s | CIERRE', close, '', '¡Tu idea puede convertirse en un video para Tu Mejor Jugada!'].join('\n');
}

function renderCreative() {
  const { hook, format, close } = state.creative;
  const control = (key, title, subtitle) => `<div class="creative-control">
    <div class="creative-label">${title} <span style="font-weight:500;color:#8e86a5">${subtitle}</span></div>
    <div class="creative-options">${creativeChoices[key].map((choice, index) => `<button type="button" class="creative-choice ${state.creative[key] === index ? 'selected' : ''}" data-creative="${key}" data-creative-index="${index}" aria-pressed="${state.creative[key] === index}">
      <span class="choice-symbol" aria-hidden="true">${state.creative[key] === index ? '✓' : ''}</span>${safeText(choice)}</button>`).join('')}</div>
  </div>`;
  stage.innerHTML = `<div class="challenge-panel creative-panel">
    <div class="challenge-header"><span class="challenge-emoji" aria-hidden="true">🎥</span><div><span class="challenge-kicker">NIVEL 3 / 3</span><h2>CREÁ TU SPOT</h2><p>¡Tu voz también puede ayudar a otros jóvenes!</p></div><div class="challenge-count">+40<br>PUNTOS</div></div>
    <div class="creative-top"><span class="question-tag">🎬 MODO CREATIVO</span><h3>Elegí 3 ingredientes para tu video</h3>
      <p>Acá no hay opciones equivocadas. Armá tu idea y mirá cómo cambia el guion.</p></div>
    <div class="creative-grid"><div>
      ${control('hook', '01 · EL GANCHO', '¿Con qué frase empezás?')}
      ${control('format', '02 · EL ESTILO', '¿Cómo lo vas a contar?')}
      ${control('close', '03 · EL MENSAJE FINAL', '¿Cómo querés cerrar?')}
    </div><aside class="storyboard" aria-label="Vista previa de tu guion">
      <div class="storyboard-head"><strong>🎬 TU MINI GUION</strong><span>45 SEG.</span></div>
      <div class="storyboard-body">
        <div class="story-step"><span class="story-time">0–5 S</span><div><strong>EL GANCHO</strong><p>${safeText(creativeChoices.hook[hook])}</p></div></div>
        <div class="story-step"><span class="story-time">5–20 S</span><div><strong>LA ESCENA</strong><p>Un grupo recibe un link de “dinero fácil”. Lo cuentan con ${safeText(cleanFormat(creativeChoices.format[format]))}.</p></div></div>
        <div class="story-step"><span class="story-time">20–35 S</span><div><strong>LA DECISIÓN</strong><p>Eligen no abrir ni reenviar el link. Hablan de los riesgos y de pedir ayuda.</p></div></div>
        <div class="story-step"><span class="story-time">35–45 S</span><div><strong>EL CIERRE</strong><p>${safeText(creativeChoices.close[close])}</p></div></div>
      </div><div class="storyboard-bottom">HECHO POR VOS, PARA OTROS JÓVENES 💛</div>
    </aside></div>
    <div class="creative-finish"><button class="btn btn-outline" type="button" data-action="copy">📋 COPIAR MI GUION</button>
      <button class="btn btn-primary" type="button" data-action="finish">🏅 ¡MI IDEA ESTÁ LISTA! <span aria-hidden="true">→</span></button></div>
    ${state.copied ? '<p class="copy-notice" style="text-align:center;padding-bottom:18px" role="status">✅ ¡Guion copiado!</p>' : ''}
  </div>`;
}

function resultTitle() {
  const ratio = state.score / maxScore();
  return ratio >= .85 ? 'LEYENDA DEL CUIDADO' : ratio >= .65 ? 'MENTE CRÍTICA' : 'EXPLORADOR/A VALIENTE';
}

function renderFinish() {
  stage.innerHTML = `<div class="challenge-panel finish-panel">
    <div class="finish-stars" aria-hidden="true">🌟 🏆 🌟</div>
    <div class="stage-kicker">¡COMPLETASTE LOS 3 NIVELES!</div>
    <h2>¡SOS ${resultTitle()}!</h2>
    <p>Detectaste riesgos, pensaste cómo ayudar a tus amigos y creaste tu propio mensaje. ¡Eso vale mucho!</p>
    <div class="medal-tray" aria-label="Medallas ganadas">
      <div class="medal-chip">🧠 MENTE CRÍTICA</div><div class="medal-chip">💗 BUEN COMPAÑERO</div><div class="medal-chip">🎬 CREADOR/A</div>
    </div>
    <div class="finish-score"><strong>${state.score}<span style="font-size:22px">/${maxScore()}</span></strong><span>PUNTOS · ${state.mode === 'arcade' ? 'MODO ARCADE' : 'MODO TRANQUI'}</span></div>
    <div class="finish-message">⭐ ${state.recharges ? 'Usaste ' + state.recharges + ' recargas. ¡Lo importante es haber seguido!' : 'Terminaste sin recargar vidas. ¡Gran recorrido!'} </div>
    <section class="finish-rank" aria-label="Guardar resultado">
      <h3>🏆 TU LUGAR EN EL RANKING</h3>
      <p>Elegí un apodo inventado, no tu nombre real. Tu marca se guarda únicamente en este dispositivo.</p>
      ${state.savedRank ? '<div class="rank-saved" role="status">✅ ¡Marca guardada! Buscala en el Hall de la Fama al volver al inicio.</div>' : `<form class="rank-form" id="rank-form">
        <label class="sr-only" for="rank-nickname">Apodo para el ranking</label>
        <input id="rank-nickname" name="nickname" maxlength="14" autocomplete="off" placeholder="EJ: SUPERMENTE" required />
        <button class="btn btn-dark" type="submit">GUARDAR MARCA</button></form>`}
    </section>
    <div class="finish-actions"><button class="btn btn-dark" type="button" data-action="copy">📋 COPIAR MI GUION</button>
      <button class="btn btn-primary" type="button" data-action="contest">🎥 CREAR CON MI CURSO</button>
      <button class="btn btn-outline" type="button" data-action="restart">↻ VOLVER A JUGAR</button></div>
    ${state.copied ? '<p class="copy-notice" role="status">✅ ¡Guion copiado!</p>' : ''}
  </div>`;
}

function render() {
  stopTimer();
  updateDashboard();
  if (state.screen === 'intro') renderIntro();
  else if (state.screen === 'quiz1' || state.screen === 'quiz2') renderQuiz();
  else if (state.screen === 'milestone1') renderMilestone(1);
  else if (state.screen === 'milestone2') renderMilestone(2);
  else if (state.screen === 'creative') renderCreative();
  else if (state.screen === 'complete') renderFinish();
}

async function copyScript() {
  const contents = scriptText();
  let success = false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(contents);
      success = true;
    }
  } catch { /* Se usa la descarga alternativa. */ }
  if (!success) {
    const file = new Blob([contents], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(file);
    link.href = url;
    link.download = 'mi-spot-tu-mejor-jugada.txt';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
    return;
  }
  state.copied = true;
  render();
}

function confetti(amount = 25) {
  if (!motionAllowed()) return;
  const layer = document.getElementById('confetti-layer');
  const colors = ['#ff5ca7', '#ffe75a', '#56d9f5', '#b8f6b0', '#ab84ff'];
  for (let i = 0; i < amount; i++) {
    const bit = document.createElement('span');
    bit.className = 'confetti';
    bit.style.left = Math.random() * 100 + '%';
    bit.style.background = colors[i % colors.length];
    bit.style.animationDelay = Math.random() * .5 + 's';
    layer.append(bit);
    window.setTimeout(() => bit.remove(), 3000);
  }
}

function saveRank() {
  if (state.screen !== 'complete' || state.savedRank) return;
  const field = document.getElementById('rank-nickname');
  const nickname = String(field?.value || '').trim().replace(/[<>\r\n]/g, '').slice(0, 14);
  if (!nickname) { field?.focus(); return; }
  const entries = readBoard();
  entries.push({ nickname, mode: state.mode, score: state.score, created: Date.now() });
  entries.sort((a, b) => b.score - a.score || a.created - b.created);
  if (writeBoard(entries.slice(0, 30))) {
    state.savedRank = true;
    render();
  } else {
    const notice = document.createElement('p');
    notice.setAttribute('role', 'alert');
    notice.textContent = 'Este navegador no permite guardar resultados. Podés seguir jugando igualmente.';
    document.getElementById('rank-form')?.append(notice);
  }
}

stage.addEventListener('click', event => {
  const mode = event.target.closest('[data-mode]');
  if (mode && state.screen === 'intro') {
    state.mode = mode.dataset.mode === 'tranqui' ? 'tranqui' : 'arcade';
    render();
    return;
  }
  const answer = event.target.closest('[data-answer]');
  if (answer) { submitAnswer(Number(answer.dataset.answer)); return; }
  const creative = event.target.closest('[data-creative]');
  if (creative && state.screen === 'creative') {
    const key = creative.dataset.creative;
    const index = Number(creative.dataset.creativeIndex);
    if (Object.hasOwn(creativeChoices, key) && index >= 0 && index < creativeChoices[key].length) {
      state.creative[key] = index;
      state.copied = false;
      renderCreative();
    }
    return;
  }
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (!action) return;
  if (action === 'start') startQuiz('quiz1');
  else if (action === 'next') nextQuestion();
  else if (action === 'to-quiz2') startQuiz('quiz2');
  else if (action === 'to-creative') { state.screen = 'creative'; render(); stageScroll(); }
  else if (action === 'copy') void copyScript();
  else if (action === 'contest') document.getElementById('concurso').scrollIntoView({ behavior: motionAllowed() ? 'smooth' : 'auto', block: 'center' });
  else if (action === 'pause' && state.mode === 'arcade' && state.selected === null) {
    state.paused = !state.paused;
    const button = document.querySelector('[data-action="pause"]');
    if (button) { button.textContent = state.paused ? '▶ SEGUIR' : '⏸ PAUSA'; button.setAttribute('aria-pressed', String(state.paused)); }
    document.querySelectorAll('[data-answer]').forEach(item => item.disabled = state.paused);
    const note = document.getElementById('pause-notice');
    if (note) note.hidden = !state.paused;
  }
  else if (action === 'finish' && state.screen === 'creative') {
    if (state.completed < 3) { state.score += 40; state.completed = 3; }
    state.screen = 'complete';
    state.copied = false;
    confetti(62);
    render();
    stageScroll();
  }
  else if (action === 'restart') {
    const mode = state.mode;
    const sound = state.sound;
    state = freshState(mode);
    state.sound = sound;
    render();
    stageScroll();
  }
});

stage.addEventListener('submit', event => {
  if (event.target.id !== 'rank-form') return;
  event.preventDefault();
  saveRank();
});

document.getElementById('start-button').addEventListener('click', () => {
  if (state.screen === 'intro') stageScroll();
  else stageScroll();
});
document.getElementById('sound-toggle').addEventListener('click', () => {
  state.sound = !state.sound;
  updateDashboard();
  playTone(true);
});

render();
