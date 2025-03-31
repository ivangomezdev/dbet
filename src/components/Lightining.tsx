"use client";
import { useEffect, useRef } from "react";
import { Application, Graphics, BlurFilter, GlowFilter } from "pixi.js";
import gsap from "gsap";

const LightningEffect = ({ backgroundAlpha = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      console.log("Container ref no está definido");
      return;
    }

    console.log("Inicializando PIXI Application");

    const initApp = async () => {
      const app = new Application();
      await app.init({
        width: 700,
        height: 600,
        backgroundAlpha,
        antialias: true,
        canvas: containerRef.current!.appendChild(document.createElement("canvas")),
      });

      appRef.current = app;

      const createLightning = () => {
        console.log("Creando rayo");
        const lightning = new Graphics();

        // Configurar estilo de trazo con color neón #13E990
        lightning.setStrokeStyle({
          width: 3, // Grosor aumentado para efecto neón
          color: 0x13E990, // Verde neón
          alpha: 1,
        });

        // Posición inicial centrada en el centro o bottom centre
        let startX: number, startY: number;
        const isBottom = Math.random() < 0.5;
        if (isBottom) {
          // Bottom centre (hacia abajo)
          startX = 350 + (Math.random() - 0.5) * 200;
          startY = 500;
        } else {
          // Centro (hacia abajo)
          startX = 350 + (Math.random() - 0.5) * 200;
          startY = 250;
        }
        lightning.moveTo(startX, startY);

        // Rayo pequeño de ~60px, más recto con zigzag
        const segmentCount = 6;
        const segmentLength = 10;
        for (let i = 0; i < segmentCount; i++) {
          const x = startX + (Math.random() - 0.5) * 20;
          const y = startY + (i + 1) * segmentLength;
          lightning.lineTo(x, y);
        }
        lightning.stroke();

        // Añadir efectos neón: blur + glow
        lightning.filters = [
          new BlurFilter({
            strength: 2,
            quality: 5,
          }),
          new GlowFilter({
            distance: 10, // Distancia del brillo
            outerStrength: 2, // Intensidad del brillo externo
            innerStrength: 0, // Sin brillo interno
            color: 0x13E990, // Mismo color neón
            quality: 0.2, // Suavidad del brillo
          }),
        ];

        app.stage.addChild(lightning);

        gsap.to(lightning, {
          alpha: 0,
          duration: 0.3,
          onComplete: () => {
            app.stage.removeChild(lightning);
            lightning.destroy();
          },
        });
      };

      // Crear múltiples rayos cada 500ms
      const interval = setInterval(() => {
        const lightningCount = 3;
        for (let i = 0; i < lightningCount; i++) {
          createLightning();
        }
      }, 500);

      return () => {
        console.log("Limpiando efecto");
        clearInterval(interval);
        app.destroy(true, { children: true, texture: true });
      };
    };

    initApp().catch(console.error);

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, { children: true, texture: true });
      }
    };
  }, [backgroundAlpha]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "700px",
        height: "600px",
        pointerEvents: "none",
        zIndex: 1000,
      }}
    />
  );
};

export default LightningEffect;