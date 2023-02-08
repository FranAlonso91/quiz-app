import Preguntas from "./Preguntas";

function App() {
  return (
    <div className="app">
      <div className="left-side">
        <div className="question-number">
          <span>Pregunta 1 de </span> 4
        </div>
        <div className="question-title">¿Cómo te llamas?</div>
      </div>
      <div className="right-side"></div>

      <button>opcion 1</button>
      <button>opcion 2</button>
      <button>opcion 3</button>
      <button>opcion 4</button>
    </div>
  );
}

export default App;
