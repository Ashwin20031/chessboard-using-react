import React, { useState } from 'react';

import bp from "../../asset/b_p.png";
import wp from "../../asset/w_p.png";
import wh from "../../asset/w_h.png";
import bh from "../../asset/b_h.png";
import wb from "../../asset/w_b.png";
import bb from "../../asset/b_b.png";
import we from "../../asset/w_e.png";
import be from "../../asset/b_e.png";
import wk from "../../asset/w_k.png";
import bk from "../../asset/b_k.png";
import wq from "../../asset/w_q.png";
import bq from "../../asset/b_q.png";

import './index.css';

const Chessboard = () => {
  const initialBoard = [
    [be, bh, bb, bq,bk, bb, bh, be],
    [bp, bp, bp, bp, bp, bp, bp, bp],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    [wp, wp, wp, wp, wp, wp, wp, wp],
    [we, wh, wb, wq, wk, wb, wh, we],
  ];

  const [board, setBoard] = useState(initialBoard);
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);

  const handleDragStart = (piece, fromRow, fromCol) => {
    setDraggedPiece(piece);
    setDraggedFrom([fromRow, fromCol]);
  };

  const handleDrop = (toRow, toCol) => {
    if (draggedPiece) {
      const newBoard = board.map(row => row.slice());
      newBoard[draggedFrom[0]][draggedFrom[1]] = '';
      newBoard[toRow][toCol] = draggedPiece;
      setBoard(newBoard);
      setDraggedPiece(null);
      setDraggedFrom(null);
    }
  };

  return (
    <div className="chessboard">
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`square ${ (rowIndex + colIndex) % 2 === 0 ? 'white' : 'black'}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(rowIndex, colIndex)}
          >
            {piece && (
              <img
                src={piece}
                alt={piece}
                draggable
                onDragStart={() => handleDragStart(piece, rowIndex, colIndex)}
                className="piece"
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Chessboard;
