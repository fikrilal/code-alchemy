"use client";

import { useState, useEffect, useRef } from "react";

export default function TextCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [grid, setGrid] = useState([]);
  const gridRef = useRef([]);
  const requestRef = useRef();
  const positionRef = useRef({ x: 0, y: 0 });
  const matrixChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>?/;:[]{}!@#$%^&*()_+";

  useEffect(() => {
    // Initialize grid
    const cols = Math.ceil(window.innerWidth / 20);
    const rows = Math.ceil(window.innerHeight / 20);

    const newGrid = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        newGrid.push({
          x: j * 20,
          y: i * 20,
          char: matrixChars.charAt(
            Math.floor(Math.random() * matrixChars.length)
          ),
          opacity: 0,
          lastUpdated: 0,
        });
      }
    }
    gridRef.current = newGrid;
    setGrid(newGrid);

    // Track mouse movement
    const handleMouseMove = (e) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Update function for animation
    const updateMatrix = (time) => {
      const updatedGrid = [...gridRef.current];
      let hasChanges = false;
      const currentPosition = positionRef.current;

      updatedGrid.forEach((cell, i) => {
        // Distance from cursor
        const dx = currentPosition.x - cell.x;
        const dy = currentPosition.y - cell.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // The illumination radius - increased for larger effect area
        const radius = 180;

        // The further from the cursor, the lower the opacity
        let targetOpacity = 0;
        if (distance < radius) {
          // Make opacity fade more quickly with distance
          targetOpacity = (1 - distance / radius) ** 1.5;

          // Change character more frequently - reduced time between updates
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

        // Speed up opacity transition - increase the weight of target opacity
        const newOpacity = cell.opacity * 0.7 + targetOpacity * 0.3;

        // Reduce threshold for updates to make more responsive
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

    requestRef.current = requestAnimationFrame(updateMatrix);

    // Handle window resize
    const handleResize = () => {
      const cols = Math.ceil(window.innerWidth / 20);
      const rows = Math.ceil(window.innerHeight / 20);

      const newGrid = [];
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          newGrid.push({
            x: j * 20,
            y: i * 20,
            char: matrixChars.charAt(
              Math.floor(Math.random() * matrixChars.length)
            ),
            opacity: 0,
            lastUpdated: 0,
          });
        }
      }
      gridRef.current = newGrid;
      setGrid(newGrid);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(requestRef.current);
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
