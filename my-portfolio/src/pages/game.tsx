"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";

// Sample word list
const WORDS = ["REACT", "JAVASCRIPT", "HTML", "CSS", "NODE", "TAILWIND"];

const GRID_SIZE = 10;

const generateEmptyGrid = () => {
  return Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(""));
};

const directions = [
  [0, 1],   // Right
  [1, 0],   // Down
  [1, 1],   // Diagonal Down-Right
  [-1, 1],  // Diagonal Up-Right
];

const placeWordsInGrid = (grid: string[][], words: string[]): string[][] => {
  const newGrid = grid.map((row) => [...row]);

  for (let word of words) {
    let placed = false;

    while (!placed) {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);

      let fits = true;

      for (let i = 0; i < word.length; i++) {
        const r = row + dir[0] * i;
        const c = col + dir[1] * i;

        if (
          r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE ||
          (newGrid[r][c] !== "" && newGrid[r][c] !== word[i])
        ) {
          fits = false;
          break;
        }
      }

      if (fits) {
        for (let i = 0; i < word.length; i++) {
          const r = row + dir[0] * i;
          const c = col + dir[1] * i;
          newGrid[r][c] = word[i];
        }
        placed = true;
      }
    }
  }

  // Fill empty spots with random letters
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (newGrid[r][c] === "") {
        newGrid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
  }

  return newGrid;
};

const Game = () => {
    const [grid, setGrid] = useState<string[][]>(generateEmptyGrid());
    const [selected, setSelected] = useState<[number, number][]>([]);
    const [foundWords, setFoundWords] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);
  
    useEffect(() => {
      const placedGrid = placeWordsInGrid(generateEmptyGrid(), WORDS);
      setGrid(placedGrid);
    }, []);
  
    const handleDragStart = (row: number, col: number) => {
      setIsDragging(true);
      setSelected([[row, col]]);
    };
  
    const handleDragEnter = (row: number, col: number) => {
      if (isDragging) {
        const lastSelected = selected[selected.length - 1];
        if (lastSelected[0] !== row || lastSelected[1] !== col) {
          setSelected(prev => [...prev, [row, col]]);
        }
      }
    };
  
    const handleDragEnd = () => {
      setIsDragging(false);
      const word = getWordFromSelection(selected);
      if (WORDS.includes(word) && !foundWords.includes(word)) {
        setFoundWords(prev => [...prev, word]);
      }
      setTimeout(() => setSelected([]), 300);
    };
  
    const getWordFromSelection = (cells: [number, number][]) => {
      return cells.map(([r, c]) => grid[r][c]).join("");
    };
  
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
        <h1 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🔍</span> 
          Word Search
        </h1>
        <div 
          className="grid touch-none" 
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 2rem)` }}
        >
          {grid.map((row, rowIndex) =>
            row.map((letter, colIndex) => {
              const isSelected = selected.some(([r, c]) => r === rowIndex && c === colIndex);
              return (
                <button
                key={`${rowIndex}-${colIndex}`}
                onMouseDown={() => handleDragStart(rowIndex, colIndex)}
                onMouseEnter={() => handleDragEnter(rowIndex, colIndex)}
                onMouseUp={handleDragEnd}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleDragStart(rowIndex, colIndex);
                }}
                onTouchMove={(e) => {
                  e.preventDefault();
                  const touch = e.touches[0];
                  const element = document.elementFromPoint(touch.clientX, touch.clientY);
                  const cellCoords = element?.getAttribute('data-coords');
                  if (cellCoords) {
                    const [row, col] = cellCoords.split(',').map(Number);
                    handleDragEnter(row, col);
                  }
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handleDragEnd();
                }}
                data-coords={`${rowIndex},${colIndex}`}
                className={clsx(
                  "w-8 h-8 flex items-center justify-center text-xs sm:text-sm font-mono select-none",
                  "border rounded-sm transition-colors duration-200",
                  isSelected
                    ? "border-2 border-primary text-foreground"
                    : "border-muted hover:border-primary/50"
                )}
              >
                {letter}
              </button>
              );
            })
          )}
        </div>


      <div className="mt-6 w-full max-w-xs text-sm">
        <h2 className="font-semibold mb-2">Words to Find:</h2>
        <ul className="grid grid-cols-2 gap-2 text-xs">
          {WORDS.map((word) => (
            <li
              key={word}
              className={clsx(
                "p-1 rounded border text-center",
                foundWords.includes(word)
                  ? "bg-green-100 border-green-400 text-green-800"
                  : "border-muted text-muted-foreground"
              )}
            >
              {word}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Game;
