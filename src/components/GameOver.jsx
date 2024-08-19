import "./GameOver.css";

const GameOver = ({retryGame}) => {
  return (
    <div>
      <h1>Game Over</h1>
      <button onClick={retryGame}></button>
    </div>
  )
}

export default GameOver