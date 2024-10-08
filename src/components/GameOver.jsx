import "./GameOver.css";

const GameOver = ({retryGame, score}) => {
  return (
    <div>
      <h1>Fim de Jogo</h1>
      <h2>
        A sua pontuação foi: <span>{score}</span>
      </h2>
      <button onClick={retryGame}>RESETAR O JOGO</button>
    </div>
  )
}

export default GameOver