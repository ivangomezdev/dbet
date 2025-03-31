"use client";
import { useEffect, useRef } from "react";

const FogEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;

    const offscreenCanvas = canvas.transferControlToOffscreen();
    const fogWorker = new Worker(new URL("../lib/fogWorker.js", import.meta.url));

    // Enviar dimensiones iniciales y canvas al worker
    fogWorker.postMessage({
      canvas: offscreenCanvas,
      width: canvas.width,
      height: canvas.height,
    }, [offscreenCanvas]);

    // Manejar redimensionamiento (opcional, para mejor experiencia)
    const resizeObserver = new ResizeObserver(() => {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      fogWorker.postMessage({ width: canvas.width, height: canvas.height });
    });
    resizeObserver.observe(parent);

    return () => {
      fogWorker.terminate();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
};

export default FogEffect;