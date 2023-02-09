import Preguntas from "./Preguntas";
import { useState, useEffect } from "react";
import "./global.css";

function App() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(20);
  const [areDisabled, setAreDisabled] = useState(false);
  const [answersShown, setAnswersShown] = useState(false);

  function handleAnswerSubmit(isCorrect, e) {
    //Añadir puntuación
    if (isCorrect) setPuntuacion(puntuacion + 1);
    //Añadir estilos de pregunta
    e.target.classList.add(isCorrect ? "correct" : "incorrect");
    //Cambiar a la siguiente pregunta
    setTimeout(() => {
      if (preguntaActual === Preguntas.length - 1) {
        setIsFinished(true);
      } else {
        setPreguntaActual(preguntaActual + 1);
      }
    }, 1500);
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
      if (tiempoRestante === 0) setAreDisabled(true);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tiempoRestante]);

  if (isFinished)
    return (
      <main className="app">
        <div className="juego-terminado">
          <span>
            Obtuviste {puntuacion} de {Preguntas.length}{" "}
          </span>
          <button onClick={() => (window.location.href = "/")}>
            Volver a jugar
          </button>
          <button
            onClick={() => {
              setIsFinished(false);
              setAnswersShown(true);
              setPreguntaActual(0);
            }}
          >
            Ver respuestas
          </button>
        </div>
      </main>
    );

  if (answersShown)
    return (
      <main className="app">
        <div className="lado-izquierdo">
          <div className="numero-pregunta">
            <span>Pregunta {preguntaActual + 1} </span> de {Preguntas.length}
          </div>
          <div className="titulo-pregunta">
            {Preguntas[preguntaActual].titulo}
          </div>
          <div>
            {
              Preguntas[preguntaActual].opciones.filter(
                (opcion) => opcion.isCorrect
              )[0].textoRespuesta
            }
          </div>
          <button
            onClick={() => {
              if (preguntaActual === Preguntas.length - 1) {
                window.location.href = "/";
              } else {
                setPreguntaActual(preguntaActual + 1);
              }
            }}
          >
            {preguntaActual === Preguntas.length - 1
              ? "Volver a jugar"
              : "Siguiente"}
          </button>
        </div>
      </main>
    );

  return (
    <main className="app">
      <div className="lado-izquierdo">
        <div className="numero-pregunta">
          <span>Pregunta {preguntaActual + 1} </span> de {Preguntas.length}
        </div>
        <div className="titulo-pregunta">
          {Preguntas[preguntaActual].titulo}
        </div>
        <div>
          {!areDisabled ? (
            <span className="tiempo-restante">
              Tiempo restante: {tiempoRestante}
            </span>
          ) : (
            <button
              onClick={() => {
                setTiempoRestante(10);
                setAreDisabled(false);
                setPreguntaActual(preguntaActual + 1);
              }}
            >
              Continuar
            </button>
          )}
        </div>
      </div>
      <div className="lado-derecho">
        {Preguntas[preguntaActual].opciones.map((respuesta) => (
          <button
            disabled={areDisabled}
            key={respuesta.textoRespuesta}
            onClick={(e) => handleAnswerSubmit(respuesta.isCorrect, e)}
          >
            {respuesta.textoRespuesta}
          </button>
        ))}
      </div>
    </main>
  );
}

export default App;
