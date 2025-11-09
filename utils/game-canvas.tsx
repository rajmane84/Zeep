"use client";
import { useCallback, useEffect, useRef, useState } from "react";

interface GameCanvasProps {
  spaceId: string;
}

interface CircleState {
  x: number;
  y: number;
  speed: number;
  radius: number;
  color: string;
}

const GameCanvas = ({ spaceId }: GameCanvasProps) => {
  console.log(spaceId);

  const gameCanvasRef = useRef<null | HTMLCanvasElement>(null);
  const [circleState, setCircleState] = useState<CircleState>({
    x: 100,
    y: 600,
    speed: 10,
    radius: 25,
    color: "red",
  });

  const drawCircle = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      canvasWidth: number,
      canvasHeight: number,
      state: CircleState,
    ) => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      ctx.beginPath();
      ctx.arc(state.x, state.y, state.radius, 0, Math.PI * 2);

      ctx.fillStyle = state.color;
      ctx.fill();

      ctx.closePath();
    },
    [],
  );

  useEffect(() => {
    const canvas = gameCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    drawCircle(ctx, width, height, circleState);
  }, [circleState, drawCircle]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        const canvas = gameCanvasRef.current;
        if (!canvas) return;
        
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;

      setCircleState((prevState) => {
        let newX = prevState.x;
        let newY = prevState.y;
        const speed = prevState.speed;
        const radius = prevState.radius;

        switch (event.key) {
          case "ArrowUp":
          case "w":
            newY -= speed;
            break;
          case "ArrowDown":
          case "s":
            newY += speed;
            break;
          case "ArrowLeft":
          case "a":
            newX -= speed;
            break;
          case "ArrowRight":
          case "d":
            newX += speed;
            break;
          default:
            return prevState;
        }

        // Horizontal Check: Center X must be between radius and (width - radius)
        const minX = radius;
        const maxX = width - radius;
        newX = Math.max(minX, Math.min(newX, maxX));

        // Vertical Check: Center Y must be between radius and (height - radius)
        const minY = radius;
        const maxY = height - radius;
        newY = Math.max(minY, Math.min(newY, maxY));

        return { ...prevState, x: newX, y: newY };
      });
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <canvas className="h-[calc(100vh-64px)] w-full" ref={gameCanvasRef} />
    </div>
  );
};

export default GameCanvas;
