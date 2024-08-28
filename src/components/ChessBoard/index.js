import React, { useState } from 'react';
import './index.css';

const Chessboard = () => {
  const initialBoard = [
    ['R', 'https://cdn.pixabay.com/photo/2018/05/19/12/48/chess-black-horse-3413410_640.png', 'B', 'Q', '	&#9812', 'B', 'https://cdn.pixabay.com/photo/2018/05/19/12/48/chess-black-horse-3413410_640.png', 'R'],
    ['https://cdn.pixabay.com/photo/2018/05/19/12/49/chess-3413420_640.png', 'https://cdn.pixabay.com/photo/2018/05/19/12/49/chess-3413420_640.png', 'https://cdn.pixabay.com/photo/2018/05/19/12/49/chess-3413420_640.png', 'https://cdn.pixabay.com/photo/2018/05/19/12/49/chess-3413420_640.png', 'https://cdn.pixabay.com/photo/2018/05/19/12/49/chess-3413420_640.png', 'https://cdn.pixabay.com/photo/2018/05/19/12/49/chess-3413420_640.png', 'https://cdn.pixabay.com/photo/2018/05/19/12/49/chess-3413420_640.png', 'https://cdn.pixabay.com/photo/2018/05/19/12/49/chess-3413420_640.png'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['https://cdn.pixabay.com/photo/2018/05/19/12/49/chess-3413417_640.png', 'https://cdn.pixabay.com/photo/2018/05/19/12/49/chess-3413417_640.png', 'https://cdn.pixabay.com/photo/2018/05/19/12/49/chess-3413417_640.png', 'https://cdn.pixabay.com/photo/2018/05/19/12/49/chess-3413417_640.png', 'https://cdn.pixabay.com/photo/2018/05/19/12/49/chess-3413417_640.png', 'https://cdn.pixabay.com/photo/2018/05/19/12/49/chess-3413417_640.png', 'https://cdn.pixabay.com/photo/2018/05/19/12/49/chess-3413417_640.png', 'https://cdn.pixabay.com/photo/2018/05/19/12/49/chess-3413417_640.png'],
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
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
