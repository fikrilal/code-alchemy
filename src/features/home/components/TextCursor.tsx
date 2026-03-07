"use client";

import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };
type Cell = {
  x: number;
  y: number;
  char: string;
  opacity: number;
  lastUpdated: number;
};

const CELL_SIZE = 20;
const ILLUMINATION_RADIUS = 180;

function createGrid(matrixChars: string): Cell[] {
  const cols = Math.ceil(window.innerWidth / CELL_SIZE);
  const rows = Math.ceil(window.innerHeight / CELL_SIZE);
  const nextGrid: Cell[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      nextGrid.push({
        x: col * CELL_SIZE,
        y: row * CELL_SIZE,
        char: matrixChars.charAt(Math.floor(Math.random() * matrixChars.length)),
        opacity: 0,
        lastUpdated: 0,
      });
    }
  }

  return nextGrid;
}

export default function TextCursor() {
  const [grid, setGrid] = useState<Cell[]>([]);
  const gridRef = useRef<Cell[]>([]);
  const requestRef = useRef<number | null>(null);
  const positionRef = useRef<Point>({ x: 0, y: 0 });
  const matrixChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>?/;:[]{}!@#$%^&*()_+";

  useEffect(() => {
    const syncGrid = () => {
      const nextGrid = createGrid(matrixChars);
      gridRef.current = nextGrid;
      setGrid(nextGrid);
    };

    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
    };

    const updateMatrix = (time: number) => {
      const updatedGrid = [...gridRef.current];
      let hasChanges = false;
      const currentPosition = positionRef.current;

      updatedGrid.forEach((cell, i) => {
        // Distance from cursor
        const dx = currentPosition.x - cell.x;
        const dy = currentPosition.y - cell.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let targetOpacity = 0;
        if (distance < ILLUMINATION_RADIUS) {
          targetOpacity = (1 - distance / ILLUMINATION_RADIUS) ** 1.5;

          if (time - cell.lastUpdated > 30 + Math.random() * 100) {
            updatedGrid[i] = {
              ...cell,
              char: matrixChars.charAt(
                Math.floor(Math.random() * matrixChars.length)
              ),
              lastUpdated: time,
            };
            hasChanges = true;
          }
        }

        const newOpacity = cell.opacity * 0.7 + targetOpacity * 0.3;

        if (Math.abs(newOpacity - cell.opacity) > 0.005) {
          updatedGrid[i] = {
            ...cell,
            opacity: newOpacity,
          };
          hasChanges = true;
        }
      });

      if (hasChanges) {
        gridRef.current = updatedGrid;
        setGrid([...updatedGrid]);
      }

      requestRef.current = requestAnimationFrame(updateMatrix);
    };

    const handleResize = () => {
      syncGrid();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const initialFrame = requestAnimationFrame(() => {
      syncGrid();
      requestRef.current = requestAnimationFrame(updateMatrix);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(initialFrame);
      if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {grid.map(
        (cell, index) =>
          // Show cells at lower opacity threshold for faster appearance
          cell.opacity > 0.01 && (
            <div
              key={index}
              className="absolute text-sm font-mono"
              style={{
                left: cell.x,
                top: cell.y,
                color: `rgba(71, 240, 142, ${cell.opacity})`,
                opacity: cell.opacity,
                textShadow: `0 0 5px rgba(71, 240, 142, ${cell.opacity * 0.8})`,
              }}
            >
              {cell.char}
            </div>
          )
      )}
    </div>
  );
}
