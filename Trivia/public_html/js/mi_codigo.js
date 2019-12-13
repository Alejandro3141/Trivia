/* 
Archivo mi_codigo.js
En este archivo programaremos el código correspondiente
al juego de Trivia.
 */

var indice_pregunta_actual = 0;
var total_puntos = 0;


const nombre_alumno = "Alejandro Lapa";
const maximo_preguntas_por_jugada = 9;
const puntos_resultado_bien = 6;

document.querySelector("#inicio-boton-jugar").addEventListener("click", iniciarJuego);

function mostrarResultado() {
  document.querySelector("#pantalla-juego").classList.add("d-none");
  document.querySelector("#pantalla-resultado").classList.remove("bien");
  document.querySelector("#pantalla-resultado").classList.remove("mal");
  if (total_puntos >= puntos_resultado_bien) {
    mensajeIf = "¡Muy Bien!";
    document.querySelector("#pantalla-resultado").classList.add("bien");
  } else {
    mensajeIf = "¡Ooh no!";
    document.querySelector("#pantalla-resultado").classList.add("mal");
  }
  document.querySelector("#resultado-puntos").textContent = total_puntos;
  document.querySelector("#pantalla-resultado").classList.remove("d-none");
}

function obtenerSiguientePregunta () {
  indice_pregunta_actual ++;
  if (indice_pregunta_actual < preguntas.length && indice_pregunta_actual < maximo_preguntas_por_jugada) {
    return preguntas[indice_pregunta_actual];
  } else {
    return null;
  }
}


function mostrarPregunta (pregunta) {
  preguntaNum = document.querySelector("#pregunta-numero");
  preguntaNum.textContent = indice_pregunta_actual + 1 + ")";
  preguntaTexto = document.querySelector("#pregunta-texto");
  preguntaTexto.textContent = pregunta.pregunta;
  preguntaImagen = document.querySelector("#pregunta-imagen");
  preguntaImagen.src = pregunta.imagen_src;
  opciones = document.querySelectorAll("#opciones div");
  opcionesInputs = document.querySelectorAll("#opciones input");
  opcionesLabels = document.querySelectorAll("#opciones label");


  for(let div of opciones) {
    div.classList.remove("correcta", "erronea");
  }
  i = 0;
  for(let input of opcionesInputs) {
    input.checked = false;
    input.value = pregunta.opciones[i];
    i++;
  }
  i=0;
  for(let label of opcionesLabels) {
    label.textContent = pregunta.opciones[i];
    i++;
  }
}

function iniciarJuego() {
  document.querySelector("#pantalla-resultado").classList.add("d-none");
  document.querySelector("#pantalla-inicio").classList.add("d-none");
  document.querySelector("#header").classList.remove("d-none");
  document.querySelector("#pantalla-juego").classList.remove("d-none");
  mostrarPregunta(preguntas[indice_pregunta_actual]);
}

function verificarPreguntaActual () {
  var input_opciones = document.querySelectorAll("input");
  var pregunta = preguntas[indice_pregunta_actual];

  for (var opcion of input_opciones) {
    let recuadro = document.querySelector("." + opcion.id);

    if (opcion.value == pregunta.respuesta_correcta ) {
      recuadro.classList.add("correcta");
      if(opcion.checked) {	
        total_puntos++;
                        } 
    } else {
            if (opcion.checked) {
                     recuadro.classList.add("erronea");
                  }
               }
  }
}

function manejadorBotonVerificar () {
  opcion_seleccionada = document.querySelector("Input:checked");
  if (opcion_seleccionada != undefined){
    verificarPreguntaActual();
    document.querySelector("#boton-verificar").classList.add("d-none");
    document.querySelector("#boton-siguiente").classList.remove("d-none");
  }
}

function manejadorBotonSiguiente () {
  pregunta = obtenerSiguientePregunta();
  if (pregunta != null) {
    mostrarPregunta(pregunta);
    document.querySelector("#boton-siguiente").classList.add("d-none");
    document.querySelector("#boton-verificar").classList.remove("d-none");
  } else {
    mostrarResultado();
  }
}

function manejadorBotonVolverAJugar () {
  document.querySelector("#pantalla-resultado").classList.add("d-none");
  document.querySelector("#header").classList.add("d-none");
  document.querySelector("#pantalla-inicio").classList.remove("d-none");
  document.querySelector("#boton-siguiente").classList.add("d-none");
  document.querySelector("#boton-verificar").classList.remove("d-none");
  total_puntos = 0;
  indice_pregunta_actual = 0;
}

