import { useState } from "react";
import "./App.css";

export default function App() {
const [boardOfBoard, setBoardofBoard] = useState(() => Array(9).fill(null));
const [board, setBoard] = useState(() =>
  Array(9).fill(null).map(() =>
    Array(9).fill(null)
  )
);
const [turn, setTurn] = useState("x");
const [validSquare, setValidSquare] = useState(4);
const [wonSquares, setWonSquares] = useState(Array(9).fill(null));

function clickButton(i, j) {
  //console.log("valid clicks ",validSquare, " ", wonSquares[i], " ", i )
  console.log("wonSquares ", wonSquares[i])
  if((validSquare == i || wonSquares[validSquare] !== null) && board[i][j] == null){


    setBoard(prevBoard => {
      const newBoard = [...prevBoard];
      newBoard[i][j] = turn
      setTurn(turn === "x" ? "o" : "x");
      
      setValidSquare(j);
      if(winnerOfBoard(i) !== null){
        setWonSquares(prevWonSquares => {
          const newWonSquares = [...prevWonSquares];
          newWonSquares[i] = winnerOfBoard(i);
          return newWonSquares;
        }
        )}
        
      return newBoard;
    });
  }
}
function winnerOfBoard(index) {
  
  const newBoard = board[index];
  if(newBoard == null){
    return null
  }
    
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (const[a,b,c] of lines){
    
    if(newBoard[a]!== null && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]){
      
      return newBoard[a];
    }
  }
  return null; 
}; 
function winnerOfBoardOfBoards() {
  
    
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (const[a,b,c] of lines){
    if(wonSquares[a]!== null && wonSquares[a] === wonSquares[b] && wonSquares[a] === wonSquares[c]){
      return wonSquares[a];
    }
  }
  return null;
} 

function restart(){
  setBoardofBoard(Array(9).fill(null));
  setBoard(Array(9).fill(null).map(() =>
    Array(9).fill(null)
  ));
  setTurn("x");
  setValidSquare(4);
  setWonSquares(Array(9).fill(null));
}


return (
  <div>
    <h1 className = "title"> 🎮 Tic Tac Toe 🎮 </h1>
    <div className="container">
      {winnerOfBoardOfBoards() === null ? (
        <div className="boardOfBoards">
          {boardOfBoard.map((boardStatus, i) => (
            winnerOfBoard(i) == null ? (
              <div key={i} className="board">
                {board[i].map((cell, j) => (
                  <button
                    key={j}
                    className="cell"
                    onClick={() => clickButton(i, j)}
                  >
                    {cell}
                  </button>
                ))}
              </div>
            ) : (
              <div key={i} className="boardWon">
                {winnerOfBoard(i)}
              </div>
            )
          ))}
        </div>
      ) : (
        <div className="gameWon">
          <h1>🏆 Game Over!</h1>
          <h2>Winner: {winnerOfBoardOfBoards().toUpperCase()}</h2>
        </div>
      )}
      <div>
        <button className="restart-btn" onClick={restart}>Restart</button>
      </div>
    </div>
  </div>
);

}
