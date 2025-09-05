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
function Board({ xIsNext, squares, onPlay }) {
  // Remove local state - use props instead
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    // If square is already filled or there's a winner, do nothing
    if (squares[i] || calculateWinner(squares)) return;

    // Create a copy of squares array to modify
    const nextSquares = squares.slice();

    // Set the square to "X" or "O" based on whose turn it is
    if (xIsNext === true) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    // Let parent handle the state update
    onPlay(nextSquares);
  }

  // Render the board with 9 squares
  return (
    <>
      <div className="status">{status}</div>
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

export default function Game() {
  // State to track the game history and whose turn it is
  const [xIsNext, setXIsNext] = useState(true);
  // History is an array of board states
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    // Update history with the new board state
    setHistory([...history, nextSquares]);
    // Toggle whose turn it is
    setXIsNext(!xIsNext);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  // Define winning combinations
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check each winning combination
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // Return the winner if found
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // If no winner, return null
  return null;
}
