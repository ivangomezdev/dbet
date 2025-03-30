"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import "./prueba.css";

const MovingBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!; // Aserción de tipo no nulo
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    function drawBackground(): void {
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "#054F36");
      gradient.addColorStop(1, "#000000");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      drawSportsIcons();
    }

    function drawSportsIcons(): void {
      ctx.fillStyle = "rgba(10, 107, 74, 0.1)";
      drawCircle(width * 0.1, height * 0.2, 30);
      drawRectangle(width * 0.8, height * 0.3, 40, 30);
      drawSquare(width * 0.2, height * 0.7, 25);
      drawSquare(width * 0.25, height * 0.75, 25);
      drawRectangle(width * 0.7, height * 0.8, 20, 30);
    }

    function drawCircle(x: number, y: number, radius: number): void {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawRectangle(x: number, y: number, width: number, height: number): void {
      ctx.fillRect(x, y, width, height);
    }

    function drawSquare(x: number, y: number, size: number): void {
      ctx.fillRect(x, y, size, size);
    }

    drawBackground();

    const handleResize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawBackground();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="background-container">
      <canvas ref={canvasRef} className="background-canvas"></canvas>
      <div className="floating-elements">
        <div className="floating-element ball"></div>
        <div className="floating-element cardsTyles"></div>
        <div className="floating-element dice"></div>
        <div className="floating-element trophy"></div>
        <div className="floating-element stats"></div>
      </div>
    </div>
  );
};

export default MovingBackground;