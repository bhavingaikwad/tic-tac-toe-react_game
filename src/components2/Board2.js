import React from 'react'

import { Box } from "./Box2"
import "./Board2.css"

export const Board = ({ board, onClick }) => {
  return (
    <div className="board">
      {
        board.map((value, idx) => {
          return <Box value={value} onClick={() => value === null && onClick(idx)} />;
        })
      }
    </div>
  )
}
