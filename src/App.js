import { useState } from "react";

// Square component represents each square on the board
function Square({ value, onSquareClick }) {
  return (
    // Render a button for the square
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Board component manages the state of the game
export default function Board() {
  // State to track whose turn it is and the state of the squares
  const [XisNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    // Ignore click if square is already filled
    if (squares[i]) return;

    // Create a copy of squares array to modify
    const nextSquares = squares.slice();

    // Set the square to "X" or "O" based on whose turn it is
    if (XisNext === true) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // Update state with new squares and toggle turn
    setXIsNext(!XisNext);
    setSquares(nextSquares);
  }

  // Render the board with 9 squares
  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
