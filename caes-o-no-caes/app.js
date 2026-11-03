// ¿Caés o no caés? — ficción interactiva de prevención. Sin cuentas ni rastreadores.
'use strict';

const cases = [
  {
    title:'CAMBIO DE NÚMERO', subtitle:'El contacto que pide plata', icon:'💬', kind:'chat', channel:'CHAT SIMULADO', sender:'Número desconocido', senderSub:'Contacto no guardado', senderIcon:'👤',
    fragmentLabels:[
      {text:'Hola, ¿estás por ahí?', clue:false},
      {text:'Soy tu hermana. Cambié de número, agendame acá.', clue:true, label:'IDENTIDAD SIN VERIFICAR', reason:'Decir que es un familiar desde otro número no confirma su identidad.'},
      {text:'Te cuento después qué pasó, ahora estoy apurada.', clue:false},
      {text:'Mandame una transferencia YA. No puedo hablar por teléfono.', clue:true, label:'URGENCIA + PRESIÓN', reason:'La urgencia y la excusa para no llamar buscan que actúes sin verificar.'},
      {text:'Usá este alias nuevo, no el de siempre: ayuda.rapida', clue:true, label:'CUENTA DESCONOCIDA', reason:'Pedir dinero a una cuenta nueva es una señal importante para frenar.'}
    ],
    question:'¿Qué harías antes de transferir?',
    choices:[
      {text:'Llamar al número de siempre o verificar por otro canal confiable',good:true,feedback:'¡Esa es la jugada! Comprobar la identidad por un canal que ya conocés ayuda a evitar suplantaciones.'},
      {text:'Transferir rápido para no dejarle esperando',good:false,feedback:'Entendible preocuparse por alguien, pero la urgencia también puede ser una trampa. Primero verificá.'},
      {text:'Reenviar el mensaje a todo el grupo sin consultar',good:false,feedback:'Difundir un mensaje sospechoso puede confundir a otros. Conviene verificar y alertar con cuidado.'}
    ],
    tip:'Si alguien te pide dinero desde un número nuevo, verificá su identidad llamando al contacto habitual.',
    source:'BCRA',sourceUrl:'https://www.bcra.gob.ar/como-prevenir-estafas-virtuales/'
  },
  {
    title:'PREMIO TRAMPA', subtitle:'El aviso demasiado bueno', icon:'🎁', kind:'social', channel:'PUBLICACIÓN SIMULADA', sender:'Cuenta de sorteos', senderSub:'Publicidad en redes', senderIcon:'🎉', special:'🎓',specialTitle:'¡SORTEO ESPECIAL!',specialSub:'Una oportunidad increíble para jóvenes',
    fragmentLabels:[
      {text:'Compartí esta publicación con tus amigos.', clue:false},
      {text:'¡Fuiste seleccionado para una beca! Solo tenés hasta las 23:59 para reclamarla.', clue:true,label:'APURO ARTIFICIAL',reason:'Un plazo extremo busca que decidas antes de comprobar la información.'},
      {text:'Para recibirla, adelantá un pago de inscripción a una billetera personal.', clue:true,label:'PAGO ANTICIPADO',reason:'Solicitar dinero para liberar un supuesto premio o beneficio es una señal de alerta.'},
      {text:'Confirmá tus datos en premios-catamarca.example/ganaste', clue:true,label:'SITIO SIN VERIFICAR',reason:'El enlace no corresponde a un canal oficial verificado. No ingreses datos en sitios enviados por mensajes.'},
      {text:'Mirá nuestras novedades cada semana.', clue:false}
    ],
    question:'¿Cómo comprobarías si la oportunidad existe?',
    choices:[
      {text:'Pagar primero para no perder el lugar',good:false,feedback:'Una promesa atractiva no justifica mandar dinero. No pagues ni compartas datos sin verificar.'},
      {text:'Buscar el organismo por su sitio o canal oficial, sin usar ese enlace',good:true,feedback:'¡Excelente! Entrar por cuenta propia al canal oficial es mucho más seguro que confiar en un enlace de una publicación.'},
      {text:'Dar mis datos para averiguar si es cierto',good:false,feedback:'Los datos personales también tienen valor. Verificá primero por canales oficiales.'}
    ],
    tip:'Desconfiá de premios o beneficios que exigen transferencias, datos personales o respuestas urgentes.',
    source:'Argentina.gob.ar',sourceUrl:'https://www.argentina.gob.ar/seguridad/ciberdelito/recomendaciones-para-evitar-estafas-en-internet'
  },
  {
    title:'OFERTA IMPOSIBLE', subtitle:'La compra que apura', icon:'🛒', kind:'shop', channel:'TIENDA SIMULADA', sender:'Outlet Express', senderSub:'Anuncio de comercio desconocido', senderIcon:'📦', special:'🎮',specialTitle:'¡90% DE DESCUENTO!',specialSub:'Consola nueva · Stock limitado',
    fragmentLabels:[
      {text:'Elegí tu color favorito.',clue:false},
      {text:'Oferta increíble: consola nueva al 10% de su valor habitual.',clue:true,label:'PRECIO INVEROSÍMIL',reason:'Un descuento exagerado puede utilizarse para atraer compras impulsivas.'},
      {text:'Solo transferencia directa a una cuenta personal. No aceptamos otras formas de pago.',clue:true,label:'PAGO SIN RESPALDO',reason:'Exigir transferencia anticipada a una cuenta personal, sin respaldo comercial, aumenta el riesgo.'},
      {text:'No hay factura ni datos del local. Preguntas y reclamos solo por mensaje privado.',clue:true,label:'VENDEDOR OPACO',reason:'Faltan datos comprobables del comercio y mecanismos claros de reclamo.'},
      {text:'Tenemos productos de varios colores.',clue:false}
    ],
    question:'¿Cuál sería tu compra más inteligente?',
    choices:[
      {text:'Enviar una seña para reservar el descuento',good:false,feedback:'Antes de adelantar dinero, investigá quién vende y qué respaldo ofrece.'},
      {text:'Comprar porque la publicación tiene muchos comentarios',good:false,feedback:'Los comentarios pueden ser engañosos. Conviene revisar la reputación y los canales del comercio.'},
      {text:'Verificar identidad del vendedor, reputación, datos del comercio y medios de pago',good:true,feedback:'¡Gran jugada! Una compra segura empieza por comprobar a quién le estás comprando.'}
    ],
    tip:'Antes de comprar, investigá la reputación del comercio y desconfiá de ofertas extraordinarias sin respaldo.',
    source:'BCRA',sourceUrl:'https://www.bcra.gob.ar/herramientas-conocimientos/como-evitar-las-estafas-virtuales/'
  },
  {
    title:'CÓDIGO SECRETO', subtitle:'La falsa mesa de ayuda', icon:'🔑', kind:'support', channel:'AVISO SIMULADO', sender:'Soporte de Billetera', senderSub:'Cuenta no verificada', senderIcon:'🛡️', special:'⚠️',specialTitle:'PROBLEMA DE SEGURIDAD',specialSub:'Aviso enviado fuera de la aplicación',
    fragmentLabels:[
      {text:'Hola, te escribe el área de soporte.',clue:false},
      {text:'Detectamos un problema: tu cuenta será bloqueada en 5 minutos.',clue:true,label:'AMENAZA CON RELOJ',reason:'El mensaje genera miedo y urgencia para que respondas sin pensar.'},
      {text:'Pasame el código de 6 dígitos que te acaba de llegar por SMS.',clue:true,label:'PEDIDO DE CÓDIGO',reason:'Nunca compartas códigos de verificación, ni siquiera con alguien que dice ser soporte.'},
      {text:'Respondé por este chat. No entres a la aplicación oficial.',clue:true,label:'EVITA EL CANAL OFICIAL',reason:'Quien intenta engañarte suele impedir que verifiques desde la app o el sitio oficial.'},
      {text:'Gracias por tu tiempo.',clue:false}
    ],
    question:'¿Cómo protegés tu cuenta?',
    choices:[
      {text:'Responder con el código para recuperar el acceso',good:false,feedback:'Los códigos son secretos. Compartirlos puede permitir que otra persona acceda a tu cuenta.'},
      {text:'No compartir nada y verificar desde la app o canal oficial',good:true,feedback:'¡Perfecto! Ingresá por tu cuenta a la aplicación legítima y revisá allí cualquier alerta.'},
      {text:'Reenviar el código a un amigo para que lo revise',good:false,feedback:'Un código de acceso no debe compartirse. Si hay dudas, acudí al soporte oficial.'}
    ],
    tip:'No compartas claves, PIN, token ni códigos de verificación recibidos por SMS, email o mensajería.',
    source:'BCRA',sourceUrl:'https://www.bcra.gob.ar/como-prevenir-estafas-virtuales/'
  },
  {
    title:'VOZ EN APUROS', subtitle:'¿Podés creerle a un audio?', icon:'🎙️', kind:'voice', channel:'AUDIO SIMULADO', sender:'Mensaje inesperado', senderSub:'Transcripción ficticia; no hay audio real', senderIcon:'🎧', special:'🎙️',specialTitle:'MENSAJE DE VOZ',specialSub:'La voz podría ser imitada con tecnología',
    fragmentLabels:[
      {text:'Che, soy Nico. Escuchá cuando puedas.',clue:false},
      {text:'Estoy en una emergencia, necesito plata en este momento.',clue:true,label:'EMERGENCIA REPENTINA',reason:'El miedo por una persona querida puede hacer que actuemos sin verificar.'},
      {text:'No me llames ni hagas videollamada; no puedo atender.',clue:true,label:'BLOQUEA LA VERIFICACIÓN',reason:'Impedir una llamada por otro canal dificulta confirmar quién está detrás del mensaje.'},
      {text:'Depositá en este alias distinto al mío. Después te explico.',clue:true,label:'DESTINO DESCONOCIDO',reason:'Una cuenta diferente y sin explicación es otra señal para frenar y comprobar.'},
      {text:'Nos hablamos más tarde.',clue:false}
    ],
    question:'Aunque la voz te resulte conocida, ¿qué conviene hacer?',
    choices:[
      {text:'Verificar con una llamada al contacto habitual o con otra persona de confianza',good:true,feedback:'¡Radar de experto! Una voz puede imitarse. Verificar la identidad por un canal independiente es lo importante.'},
      {text:'Transferir porque reconozco cómo habla',good:false,feedback:'Una voz parecida no alcanza para confirmar identidad; hoy existen imitaciones muy convincentes.'},
      {text:'Publicar el audio con el número para que otros investiguen',good:false,feedback:'Difundir datos de otras personas puede generar nuevos riesgos. Mejor verificar y buscar ayuda adecuada.'}
    ],
    tip:'Si un audio o llamada te pide dinero de forma inesperada, cortá y verificá por un medio independiente.',
    source:'Argentina.gob.ar',sourceUrl:'https://www.argentina.gob.ar/justicia/convosenlaweb/situaciones/que-es-la-ingenieria-social-y-como-protegerte'
  }
];

const arena=document.getElementById('arena');
const gameSection=document.getElementById('jugar');
const recordKey='caes-o-no-caes-best-v1';
let soundOn=false;
let audioContext;
let bestScore=readRecord();
let state=initialState();

function initialState(){return {mode:'home',index:0,score:0,caseStart:0,found:new Set(),safeClicks:new Set(),lastHint:'',decisionChoice:null,caseScores:[],foundCounts:[]};}
function readRecord(){try{return Math.max(0,Math.min(500,Number(localStorage.getItem(recordKey))||0));}catch{return 0;}}
function saveRecord(score){if(score<=bestScore)return;bestScore=score;try{localStorage.setItem(recordKey,String(score));}catch{/* El juego funciona sin almacenamiento. */}updateRecord();}
function updateRecord(){document.getElementById('best-score').textContent=String(bestScore);document.getElementById('record-indicator').textContent=`${bestScore}/500`;}
function esc(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function scrollGame(){gameSection.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}
function beep(type){
  if(!soundOn)return;
  try{const Ctor=window.AudioContext||window.webkitAudioContext;if(!Ctor)return;audioContext??=new Ctor();const osc=audioContext.createOscillator(),gain=audioContext.createGain();osc.type='sine';osc.frequency.value=type==='win'?800:type==='clue'?620:260;gain.gain.setValueAtTime(.04,audioContext.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audioContext.currentTime+.13);osc.connect(gain).connect(audioContext.destination);osc.start();osc.stop(audioContext.currentTime+.14);}catch{/* Sonido opcional. */}
}
function confetti(amount){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const layer=document.getElementById('confetti-layer'),colors=['#d4ff68','#ff62a5','#7af3fd','#ffe579','#a58cff'];
  for(let i=0;i<amount;i++){const bit=document.createElement('span');bit.className='confetti';bit.style.left=`${Math.random()*100}%`;bit.style.background=colors[i%colors.length];bit.style.animationDelay=`${Math.random()*.7}s`;layer.append(bit);setTimeout(()=>bit.remove(),3100);}
}
function updateRail(){document.querySelectorAll('[data-mini]').forEach((node,i)=>{node.classList.toggle('is-active',state.mode!=='home'&&state.mode!=='final'&&i===state.index);node.classList.toggle('is-done',state.mode==='final'||i<state.index);});}
function startGame(){state=initialState();state.mode='inspect';gameSection.hidden=false;render();scrollGame();}
function backHome(){state.mode='home';gameSection.hidden=true;updateRail();document.getElementById('inicio').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
function header(){const item=cases[state.index];return `<div class="game-head"><div class="case-heading"><span aria-hidden="true">${esc(item.icon)}</span><div><small>CASO ${state.index+1} DE ${cases.length} · DETECTIVE DIGITAL</small><h2>${esc(item.title)}</h2><p>${esc(item.subtitle)}</p></div></div><div class="head-counter"><strong>${state.index+1}/${cases.length}</strong>NIVEL</div></div><div class="case-progress" role="progressbar" aria-label="Progreso de los casos" aria-valuemin="0" aria-valuemax="5" aria-valuenow="${state.index}"><span style="width:${(state.index/cases.length)*100}%"></span></div>`;}
function renderSimulator(item){
  const special=item.special?`<div class="sim-special"><span class="special-emoji" aria-hidden="true">${esc(item.special)}</span><strong>${esc(item.specialTitle)}</strong><small>${esc(item.specialSub)}</small>${item.kind==='voice'?'<div class="voice-wave" aria-hidden="true">'+[15,22,35,19,32,26,16,33,25,15,31,22,17].map(h=>`<span style="--h:${h}px"></span>`).join('')+'</div>':''}</div>`:'';
  return `<div class="simulator kind-${item.kind}"><div class="sim-banner"><span>🧪 SIMULACIÓN EDUCATIVA</span><span>${esc(item.channel)}</span></div><div class="sim-header"><span class="sim-avatar" aria-hidden="true">${esc(item.senderIcon)}</span><div><strong>${esc(item.sender)}</strong><small>${esc(item.senderSub)}</small></div><b aria-hidden="true">⋮</b></div><div class="sim-content">${special}${item.fragmentLabels.map((f,i)=>`<button type="button" class="evidence ${state.found.has(i)?'found':state.safeClicks.has(i)?'checked-safe':''}" data-evidence="${i}" aria-pressed="${state.found.has(i)}" ${state.found.has(i)||state.safeClicks.has(i)||state.mode!=='inspect'?'disabled':''}>${esc(f.text)}</button>`).join('')}</div><div class="sim-bottom"><span>FICCIÓN · NO HAY ENLACES ACTIVOS</span><span class="sim-lock">🔒 ENTORNO SEGURO</span></div></div>`;
}
function renderInspect(){
  const item=cases[state.index], clues=item.fragmentLabels.map((f,i)=>({...f,i})).filter(f=>f.clue),found=state.found.size;
  arena.innerHTML=`<div class="game-shell">${header()}<div class="game-body"><div class="step-row"><span class="step-chip">🕵️ PASO 1: ENCONTRÁ SEÑALES</span><span>+15 XP POR PISTA</span></div><h3 class="game-prompt">Esta pantalla tiene algo raro… 👀</h3><p class="game-prompt-sub">Tocá los mensajes o detalles que te generen sospecha. Encontrá al menos <strong>2 pistas</strong> para desbloquear tu decisión.</p><div class="detective-layout">${renderSimulator(item)}<aside class="intel-card"><div class="intel-top"><strong>🧭 TU RADAR</strong><div class="intel-ring" aria-label="${found} de 3 pistas">${found}/3</div></div><h3>¿Cuántas señales encontraste?</h3><p>El buen detective mira los detalles, incluso cuando un mensaje parece real.</p><ul class="clue-list">${clues.map((c,n)=>`<li class="${state.found.has(c.i)?'is-found':''}"><span class="clue-check" aria-hidden="true">${state.found.has(c.i)?'✓':'?'}</span><span>${state.found.has(c.i)?esc(c.label):`PISTA ${n+1} POR DESCUBRIR`}</span></li>`).join('')}</ul>${state.lastHint?`<div class="intel-feedback" role="status">${esc(state.lastHint)}</div>`:''}<button class="button button-purple intel-button" type="button" data-action="decide" ${found<2?'disabled':''}>TOMAR DECISIÓN <span aria-hidden="true">→</span></button><span class="intel-help">${found<2?`Te falta${2-found>1?'n':''} ${2-found} pista${2-found>1?'s':''} para avanzar`:'¡Ya podés decidir! Buscá la tercera pista para sumar más XP.'}</span></aside></div></div></div>`;
}
function renderDecision(){
  const item=cases[state.index],selected=state.decisionChoice,answered=selected!==null,best=item.choices.findIndex(c=>c.good);
  arena.innerHTML=`<div class="game-shell">${header()}<div class="game-body"><div class="step-row"><span class="step-chip">🎯 PASO 2: ELEGÍ TU JUGADA</span><span>+55 XP POR DECISIÓN SEGURA</span></div><div class="decision-area"><div class="decision-context"><span aria-hidden="true">${esc(item.icon)}</span><div>Encontraste <strong>${state.found.size} señales</strong> de alerta. Ahora que las viste, llegó la decisión importante.</div></div><h3 class="decision-question">${esc(item.question)}</h3><div class="decision-options" role="group" aria-label="Elegí cómo actuarías">${item.choices.map((c,i)=>`<button type="button" class="decision-option ${!answered?'':i===best?'is-good':i===selected?'is-bad':'is-dim'}" data-decision="${i}" ${answered?'disabled':''}><span aria-hidden="true">${!answered?'✦':i===best?'✓':i===selected?'!':'✦'}</span>${esc(c.text)}</button>`).join('')}</div>${answered?`<div class="outcome ${item.choices[selected].good?'':'not-best'}" role="status"><span class="outcome-icon" aria-hidden="true">${item.choices[selected].good?'🛡️':'💡'}</span><div><h3>${item.choices[selected].good?'¡BUENA JUGADA! +55 XP':'¡SEGUIMOS ENTRENANDO EL RADAR!'}</h3><p>${esc(item.choices[selected].feedback)}</p><button class="button button-purple" type="button" data-action="case-finish">VER LO QUE APRENDÍ <span aria-hidden="true">→</span></button></div></div>`:`<p class="game-prompt-sub" style="margin-top:22px">💭 Podés tomarte todo el tiempo que necesites. No hay cronómetro.</p>`}</div></div></div>`;
}
function renderCaseEnd(){
  const item=cases[state.index],earned=state.score-state.caseStart;
  arena.innerHTML=`<div class="game-shell"><div class="case-end"><div class="case-end-badge" aria-hidden="true">${earned>=85?'🛡️':'🔎'}</div><span class="case-end-kicker">CASO ${state.index+1} DE 5 RESUELTO</span><h2>${earned>=85?'¡TU RADAR ESTÁ ENCENDIDO!':'¡OTRA SEÑAL QUE YA CONOCÉS!'}</h2><p>${esc(item.title)}: ahora sabés reconocer señales de alerta y cómo protegerte mejor.</p><div class="case-end-score"><strong>${earned}<span style="font-size:22px">/100</span></strong><small>XP DEL CASO</small></div><div class="case-end-tip"><strong>🧠 TIP PARA LA VIDA REAL:</strong> ${esc(item.tip)}</div><div class="end-actions"><button class="button button-purple" type="button" data-action="advance">${state.index===cases.length-1?'VER MI RESULTADO':'IR AL SIGUIENTE CASO'} →</button></div><p class="source-small">Orientación basada en <a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer">${esc(item.source)} ↗</a></p></div></div>`;
}
function rankFor(score){return score>=430?{label:'DETECTIVE ÉLITE',icon:'🏆',desc:'¡Tenés un radar impresionante para detectar señales de alerta!'}:score>=280?{label:'CAZADOR DE PISTAS',icon:'🛡️',desc:'¡Muy buen entrenamiento! Ya sabés frenar y verificar ante mensajes dudosos.'}:{label:'RADAR EN FORMACIÓN',icon:'🔎',desc:'Cada caso te dejó nuevas herramientas. ¡Seguí entrenando tu mirada digital!'};}
function renderFinal(){
  const rank=rankFor(state.score);
  arena.innerHTML=`<div class="game-shell"><div class="case-end"><div class="case-end-badge" aria-hidden="true">${rank.icon}</div><span class="case-end-kicker">✳ ¡5 CASOS COMPLETADOS! ✳</span><h2>¿CAÍSTE? ¡APRENDISTE!</h2><p>${esc(rank.desc)} Recordá: la clave es no actuar con apuro y verificar por canales confiables.</p><div class="case-end-score"><strong>${state.score}<span style="font-size:24px">/500</span></strong><small>TUS PUNTOS DE EXPERIENCIA</small></div><div class="final-awards"><span class="award"><span>🏅</span>${esc(rank.label)}</span><span class="award"><span>🧩</span>${state.foundCounts.reduce((n,c)=>n+c,0)}/15 PISTAS ENCONTRADAS</span></div><div class="case-end-tip"><strong>💚 UNA COSA IMPORTANTE:</strong> caer en una estafa no es culpa de la víctima. Pedir ayuda y denunciar también son decisiones valientes.</div><div class="end-actions"><button class="button button-lime" data-action="download" type="button">⬇ BAJAR MI TARJETA</button><button class="button button-outline" data-action="copy" type="button">📋 COPIAR RESULTADO</button><button class="button button-purple" data-action="restart" type="button">↻ VOLVER A JUGAR</button></div><p class="source-small" role="status" id="share-notice"></p></div></div>`;
}
function render(){updateRail();if(state.mode==='inspect')renderInspect();else if(state.mode==='decision')renderDecision();else if(state.mode==='case-end')renderCaseEnd();else if(state.mode==='final')renderFinal();}
function inspect(i){
  if(state.mode!=='inspect')return;const f=cases[state.index].fragmentLabels[i];if(!f||state.found.has(i)||state.safeClicks.has(i))return;
  if(f.clue){state.found.add(i);state.score+=15;state.lastHint=`✨ PISTA ENCONTRADA · ${f.reason}`;beep('clue');}
  else{state.safeClicks.add(i);state.lastHint='💭 Este detalle por sí solo no es una señal clara. Mirá el mensaje completo y seguí buscando.';beep('neutral');}
  renderInspect();
}
function decide(){if(state.mode!=='inspect'||state.found.size<2)return;state.mode='decision';renderDecision();scrollGame();}
function choose(i){
  if(state.mode!=='decision'||state.decisionChoice!==null)return;
  const c=cases[state.index].choices[i];if(!c)return;
  state.decisionChoice=i;if(c.good){state.score+=55;beep('win');}else beep('neutral');renderDecision();
}
function completeCase(){if(state.mode!=='decision'||state.decisionChoice===null)return;state.caseScores.push(state.score-state.caseStart);state.foundCounts.push(state.found.size);state.mode='case-end';renderCaseEnd();scrollGame();confetti(18);}
function advance(){
  if(state.mode!=='case-end')return;
  if(state.index===cases.length-1){state.mode='final';saveRecord(state.score);renderFinal();confetti(70);beep('win');}
  else{state.index++;state.caseStart=state.score;state.found=new Set();state.safeClicks=new Set();state.lastHint='';state.decisionChoice=null;state.mode='inspect';renderInspect();}
  scrollGame();
}
function copyResult(){
  const text=`¿CAÉS O NO CAÉS? 🕵️\nCompleté los 5 casos de Detective Digital y sumé ${state.score}/500 XP.\nMi rango: ${rankFor(state.score).label}.\nPista clave: nunca compartas códigos; verificá los mensajes por otro canal.\n#NoCaigas #Catamarca`;
  const feedback=document.getElementById('share-notice');
  const fallback=()=>{const area=document.createElement('textarea');area.value=text;area.style.position='fixed';area.style.opacity='0';document.body.append(area);area.select();let ok=false;try{ok=document.execCommand('copy');}catch{}area.remove();if(feedback)feedback.textContent=ok?'✅ Resultado copiado':'No se pudo copiar. Podés descargar tu tarjeta como imagen.';};
  if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(text).then(()=>{if(feedback)feedback.textContent='✅ Resultado copiado';}).catch(fallback);else fallback();
}
function pathRound(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();}
function wrapCanvas(ctx,str,x,y,maxWidth,lineHeight){const words=str.split(' ');let line='';for(const w of words){const test=line?`${line} ${w}`:w;if(ctx.measureText(test).width>maxWidth&&line){ctx.fillText(line,x,y);y+=lineHeight;line=w;}else line=test;}if(line)ctx.fillText(line,x,y);return y+lineHeight;}
function downloadCertificate(){
  const c=document.createElement('canvas');c.width=1080;c.height=1350;const ctx=c.getContext('2d');if(!ctx)return;
  const g=ctx.createLinearGradient(0,0,1000,1350);g.addColorStop(0,'#4d229d');g.addColorStop(1,'#180e42');ctx.fillStyle=g;ctx.fillRect(0,0,1080,1350);
  ctx.fillStyle='#fe5fa8';ctx.beginPath();ctx.arc(1000,220,305,0,Math.PI*2);ctx.fill();ctx.fillStyle='#d4ff68';ctx.beginPath();ctx.arc(-50,1120,255,0,Math.PI*2);ctx.fill();
  pathRound(ctx,64,66,952,1218,36);ctx.lineWidth=8;ctx.strokeStyle='#d4ff68';ctx.stroke();
  ctx.fillStyle='#d4ff68';ctx.font='900 47px system-ui';ctx.fillText('✳ DETECTIVE DIGITAL',120,186);
  ctx.fillStyle='#fff';ctx.font='900 95px system-ui';ctx.fillText('¿CAÉS O',120,373);ctx.fillText('NO CAÉS?',120,475);
  ctx.fillStyle='#d4ff68';ctx.font='900 220px system-ui';ctx.fillText(String(state.score),116,775);
  ctx.fillStyle='#fff';ctx.font='800 55px system-ui';ctx.fillText('/ 500 XP',520,761);
  ctx.fillStyle='#fff';ctx.font='900 53px system-ui';wrapCanvas(ctx,rankFor(state.score).label,120,920,780,69);
  ctx.fillStyle='#d4ff68';ctx.font='750 32px system-ui';ctx.fillText('5 CASOS · UN RADAR MÁS FUERTE',120,1060);
  ctx.fillStyle='#fff';ctx.font='750 32px system-ui';ctx.fillText('#NOCAIGAS   ·   CATAMARCA',120,1192);
  c.toBlob(blob=>{if(!blob)return;const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='detective-digital-mi-resultado.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);const feedback=document.getElementById('share-notice');if(feedback)feedback.textContent='🖼️ ¡Tarjeta lista para compartir!';},'image/png');
}

document.addEventListener('click',e=>{
  const btn=e.target.closest('button');if(!btn)return;
  if(btn.id==='hero-start'){startGame();return;}
  if(btn.id==='back-home'){backHome();return;}
  if(btn.id==='sound-toggle'){soundOn=!soundOn;btn.setAttribute('aria-pressed',String(soundOn));btn.setAttribute('aria-label',soundOn?'Desactivar efectos de sonido':'Activar efectos de sonido');btn.querySelector('span').textContent=soundOn?'ON':'OFF';if(soundOn)beep('clue');return;}
  if(btn.hasAttribute('data-evidence')){inspect(Number(btn.dataset.evidence));return;}
  if(btn.hasAttribute('data-decision')){choose(Number(btn.dataset.decision));return;}
  if(btn.dataset.action==='decide'){decide();return;}
  if(btn.dataset.action==='case-finish'){completeCase();return;}
  if(btn.dataset.action==='advance'){advance();return;}
  if(btn.dataset.action==='restart'){startGame();return;}
  if(btn.dataset.action==='copy'){copyResult();return;}
  if(btn.dataset.action==='download'){downloadCertificate();return;}
});

updateRecord();
