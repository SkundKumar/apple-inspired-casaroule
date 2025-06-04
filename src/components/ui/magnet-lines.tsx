"use client";

import { useEffect, useRef } from "react";

export const MagnetLines = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 100;
    const lineLength = 200;
    const particleSpeed = 0.3;
    const lineWidth = 1.5;
    const particleSize = 3;

    // Define colors using RGB values
    const particleColor = { r: 255, g: 255, b: 255, a: 0.3 };
    const lineColor = { r: 255, g: 255, b: 255, a: 0.2 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * particleSpeed;
        this.vy = (Math.random() - 0.5) * particleSpeed;
        this.size = particleSize;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor.r}, ${particleColor.g}, ${particleColor.b}, ${particleColor.a})`;
        ctx.fill();
      }
    }

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      resizeCanvas();
      particles = Array.from({ length: particleCount }, () => new Particle());
    };

    const drawLines = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();

        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < lineLength) {
            const opacity = lineColor.a * (1 - distance / lineLength);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(${lineColor.r}, ${lineColor.g}, ${lineColor.b}, ${opacity})`;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(drawLines);
    };

    // Initialize only on client-side
    if (typeof window !== 'undefined') {
      init();
      drawLines();
      window.addEventListener("resize", init);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", init);
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full bg-gradient-to-b from-black via-neutral-900 to-black"
    />
  );
}; 