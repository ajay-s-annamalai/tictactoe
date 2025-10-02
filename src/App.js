import { useState } from "react";
import "./App.css";

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(squares);

  function handleClick(i) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = isXNext ? "X" : "O";
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],      // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8],      // columns
      [0, 4, 8], [2, 4, 6],                 // diagonals
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }

  return (
    <div className="container">
      <h1 className="title">Tic-Tac-Toe</h1>
      <p className="status">
        {winner
          ? `🎉 Winner: ${winner}`
          : squares.every(Boolean)
          ? "It's a Draw!"
          : `Next Player: ${isXNext ? "X" : "O"}`}
      </p>

      <div className="board">
        {squares.map((sq, i) => (
          <button key={i}
            className={`square ${sq ? "filled" : ""}`}
            onClick={() => handleClick(i)}
            
          >
            {sq}
          </button>
        ))}
      </div>

      <button onClick={restart} className="restart-btn"> 🔄 Restart </button>
    </div>
  );
}


