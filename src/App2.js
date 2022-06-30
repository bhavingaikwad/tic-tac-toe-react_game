import React, { useState } from "react";

import { Board } from "./components2/Board2";
import { ResetButton } from "./components2/ResetButton2";
import { ScoreBoard } from "./components2/ScoreBoard2";
import './App2.css';

const App = () => {

  const WIN_CONDITIONS = [
                [0, 1, 2, 3, 4],
                [5, 6, 7, 8, 9],
                [10, 11, 12, 13, 14],
                [15, 16, 17, 18, 19],
                [20, 21, 22, 23, 24],
                [0, 5, 10, 15, 20],
                [1, 6, 11, 16, 21],
                [2, 7, 12, 17, 22],
                [3, 8, 13, 18, 23],
                [4, 9, 14, 19, 24],
                [0, 6, 12, 18, 24],
                [4, 8, 12, 16, 20]
  ]

  const [xPlaying, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(25).fill(null))
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
      const [x, y, z, a, b] = WIN_CONDITIONS[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z] && board[z] === board[a] && board[a] === board[b]) {
        setGameOver(true);
        return board[x];
      }
    }
  }

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(25).fill(null));
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