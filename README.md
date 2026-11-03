# Tu Mejor Jugada · Edición juvenil interactiva

Juego educativo para estudiantes de nivel secundario sobre prevención de apuestas online, decisiones responsables y creación de mensajes audiovisuales.

## Cómo jugar

1. Elegí **Modo Arcade** (25 segundos por pregunta, con puntos extra si respondés rápido) o **Modo Tranqui** (sin tiempo).
2. Completá **Cazá el mito** y **Elegí la jugada**: cinco preguntas por nivel, con explicaciones y enlaces de consulta.
3. Creá tu spot de 45 segundos y copiá o descargá el guion.
4. Ganá tres medallas y, si querés, guardá tu apodo y puntaje en el ranking de este dispositivo.

Cada respuesta correcta vale 10 puntos. En Modo Arcade, responder con 17 segundos o más de tiempo restante suma 5 puntos extra. Terminar el spot suma 40 puntos. Puntaje máximo: 190 (Arcade) o 140 (Tranqui). Las tres vidas pueden recargarse sin perder el avance.

## Archivos

- `index.html`: estructura de la página.
- `enhancements.css`: estilos visuales de esta versión.
- `game.js`: preguntas, respuestas, puntajes, temporizador, vidas, medallas, ranking y creación del guion.
- `caes-o-no-caes/`: juego complementario que se conserva sin modificaciones.

## Editar preguntas

Abrí `game.js` y buscá `const challenges`. Cada objeto tiene:

- `question`: texto de la consigna.
- `choices`: opciones.
- `correct`: posición de la opción correcta, empezando en **0**.
- `explanation`: devolución pedagógica.
- `source` y `sourceUrl`: fuente y enlace de referencia.

Podés cambiar la cantidad de preguntas. El contador se ajusta automáticamente, pero si modificás la cantidad también deberás recalcular el puntaje máximo en `maxScore()` y sus etiquetas.

## Privacidad y publicación

No utiliza cuentas, analítica ni servidores propios. Los resultados y apodos se guardan **solo en el navegador de cada dispositivo** mediante `localStorage`. El ranking no es compartido ni global. Los enlaces de fuentes se abren únicamente si el jugador los selecciona.

Funciona como sitio estático en GitHub Pages: publicá los archivos en la rama `main` y serví la raíz del repositorio. Para probar en local, abrí `index.html` en el navegador.
