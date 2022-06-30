import React, { useState } from "react";

import { Board } from "./components3/Board3";
import { ResetButton } from "./components3/ResetButton3";
import { ScoreBoard } from "./components3/ScoreBoard3";
import './App3.css';

const App = () => {

  const WIN_CONDITIONS = [
    [0, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, 31, 32, 33, 34],
    [35, 36, 37, 38, 39, 40, 41],
    [42, 43, 44, 45, 46, 47, 48],
    [0, 7, 14, 21, 28, 35, 42],
    [1, 8, 15, 22, 29, 36, 43],
    [2, 9, 16, 23, 30, 37, 44],
    [3, 10, 17, 24, 31, 38, 45],
    [4, 11, 18, 25, 32, 39, 46],
    [5, 12, 19, 26, 33, 40, 47],
    [6, 13, 20, 27, 34, 41, 48],
    [0, 8, 16, 24, 32, 40, 48],
    [6, 12, 18, 24, 30, 36, 42]
  ]

  const [xPlaying, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(49).fill(null))
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 })
  const [gameOver, setGameOver] = useState(false);

  const handleBoxClick = (boxIdx) => {
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    })

    setBoard(updatedBoard);

    const winner = checkWinner(updatedBoard);
    

    if (winner) {
      if (winner === "O") {
        let { oScore } = scores;
        oScore += 1;
        setScores({ ...scores, oScore })
      } else {
        let { xScore } = scores;
        xScore += 1;
        setScores({ ...scores, xScore })
      }

      if (winner === "o"){
        return "O is the winner!";
      } else {
        return "x is the winner!";
      }
    }

    

    setXPlaying(!xPlaying);
  }

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [a, b, c, d, e, f, g] = WIN_CONDITIONS[i];

      if (board[a] && board[a] === board[b] && board[b] === board[c] && board[c] === board[d] && board[d] === board[e] && board[e] === board[f] && board[f] === board[g]) {
        setGameOver(true);
        return board[a];
      }
    }
  }

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(49).fill(null));
  }

  return (
    <div className="App">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
}

export default App;