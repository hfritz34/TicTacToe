
import { useState } from 'react';
import './App.css';

function Square({ value, onSquareClick, highlight }: { value: any, onSquareClick: any, highlight: boolean }) {
  return (
    <button className={`square ${highlight ? 'highlight' : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }: { xIsNext: boolean, squares: any[], onPlay: any }) {
 const winnerData = calculateWinner(squares);
 const line = winnerData ? winnerData.line : [];

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
          return;
      }
        const nextSquares = squares.slice();
        if (xIsNext) {
          nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
      
 }
  let status;
  if (winnerData) {
    status = "Winner: " + winnerData.winner; 
  } else if (squares.every(square => square !== null)) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
    const createBoard = () => {
      const board = [];
      const size = 3;
      for (let row = 0; row < size; row++) {
        const boardRow = [];
        for (let col = 0; col < size; col++) {
          const idx = row * size + col;
          const highlight = line.includes(idx);
          boardRow.push(<Square key={idx} value={squares[idx]} onSquareClick={() => handleClick(idx)} highlight={highlight} />);
        }
        board.push(<div key={row} className="board-row">{boardRow}</div>);
      }
      return board;
    }
return (
  <>
  <div className="status">{status}</div>
  <div className= "board-container">
    {createBoard()}
  </div>
  </>
);
}


export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const checkMove = currentMove;

  function handlePlay(nextSquares: any) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: any) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_squares, move) => {
    let description;

    if (move === checkMove) {
      if (checkMove === 0) {
        description = 'Game Start!';
      }
      else{
        description = 'You are on move #' + (move +1) + ' now.';
      }
    } else if (move > 0) {
      description = 'Go to move #' + move + ' at ' + Math.floor((move - 1) / 3) + ',' + ((move - 1) % 3);
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        {move === checkMove ? (
          <div>{description}</div>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button> 
        )}
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={() => setIsAscending(!isAscending)}>
          {isAscending ? 'Sort Descending' : 'Sort Ascending'}          
        </button>
        <ol>{isAscending ? moves : moves.slice().reverse()}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: any) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { 
      return { winner: squares[a], line: lines[i] };
    }

  }
  return null;
}