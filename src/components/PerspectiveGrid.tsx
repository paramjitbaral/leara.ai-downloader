/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";

export default function PerspectiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    scrollY: 0,
    targetScrollY: 0,
    hoverIntensity: 0,
    targetHoverIntensity: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      stateRef.current.targetMouseX = e.clientX - rect.left;
      stateRef.current.targetMouseY = e.clientY - rect.top;
      stateRef.current.targetHoverIntensity = 1;
    };

    const handleMouseLeave = () => {
      stateRef.current.targetHoverIntensity = 0;
    };

    const handleWindowBlur = () => {
      stateRef.current.targetHoverIntensity = 0;
    };

    const handleScroll = () => {
      stateRef.current.targetScrollY = window.scrollY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Sleek, high-performance density mesh matrix
    const columns = 22;
    const rows = 18;

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const state = stateRef.current;

      // Initialize mouse target dynamically in center on load if not fired yet
      if (state.mouseX === 0 && state.targetMouseX === 0) {
        state.mouseX = state.targetMouseX = width / 2;
        state.mouseY = state.targetMouseY = height / 2;
      }

      // Responsive silky-smooth dampening
      state.mouseX += (state.targetMouseX - state.mouseX) * 0.08;
      state.mouseY += (state.targetMouseY - state.mouseY) * 0.08;
      state.scrollY += (state.targetScrollY - state.scrollY) * 0.08;
      state.hoverIntensity += (state.targetHoverIntensity - state.hoverIntensity) * 0.08;

      // High-end perspective angles
      const angleX = 0.85; 
      const angleY = 0;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const fov = 350;
      const centerX = width / 2;
      const centerY = height * 0.52; // Centered beautifully to cover the full top section fold

      // Optimal spacing for sleek coverage
      const spacing = Math.max(40, Math.min(80, width / 14));

      const mx = state.mouseX;
      const my = state.mouseY;

      // 1. PROJECT ALL GRID VERTICES TO 3D SCREEN COORDINATES
      interface MeshVertex {
        px: number;
        py: number;
        pz: number;
        worldY: number;
        alpha: number;
        hoverFactor: number;
      }

      const grid: Array<Array<MeshVertex | null>> = [];

      for (let c = 0; c < columns; c++) {
        grid[c] = [];
        for (let r = 0; r < rows; r++) {
          const xi = c - columns / 2;
          const zi = r - rows / 2;

          const wx = xi * spacing;
          const wz = zi * spacing;

          // Pure static curved mountain-valley structure with a tiny elegant breathing pulse
          const waveScale = 14 + Math.sin(frame * 0.008) * 3.5;
          
          // Symmetrical framing valley: holds text space in center and climbs up elegantly at page sides
          const cDistNormalized = Math.abs(xi) / (columns / 2);
          const rDistNormalized = Math.abs(zi) / (rows / 2);
          const sideWeight = 0.3 + Math.pow(cDistNormalized, 2) * 1.8 + Math.pow(rDistNormalized, 2) * 0.6;

          const wy_base = (Math.sin(xi * 0.2) * Math.cos(zi * 0.15) * waveScale) * sideWeight;

          // Unperturbed reference projection for accurate 2D screen distance tracking
          const rY1_un = wy_base * cosX - wz * sinX;
          const rZ1_un = wy_base * sinX + wz * cosX;
          const rX2_un = wx * cosY - rZ1_un * sinY;
          const rZ2_un = wx * sinY + rZ1_un * cosY;

          let px_un = centerX;
          let py_un = centerY;
          if (rZ2_un + fov > 15) {
            const scale_un = fov / (fov + rZ2_un);
            px_un = centerX + rX2_un * scale_un;
            py_un = centerY + rY1_un * scale_un;
          }

          const dx = px_un - mx;
          const dy = py_un - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Elastic magnetic pull downward on mouse proximity
          let wy = wy_base;
          let hoverFactor = 0;
          if (dist < 185) {
            const hoverPower = 1 - dist / 185;
            hoverFactor = Math.pow(hoverPower, 1.8) * state.hoverIntensity;
            const pull = 22 * hoverFactor;
            wy -= pull;
          }

          // Apply 3D matrix transformation math
          const rY1 = wy * cosX - wz * sinX;
          const rZ1 = wy * sinX + wz * cosX;
          const rX2 = wx * cosY - rZ1 * sinY;
          const rZ2 = wx * sinY + rZ1 * cosY;

          if (rZ2 + fov > 15) {
            const scale = fov / (fov + rZ2);
            const px = centerX + rX2 * scale;
            const py = centerY + rY1 * scale;
            // Smoothly dissolve lines towards the endless horizon with high-fidelity visibility
            const alpha = Math.max(0.12, Math.min(0.85, (fov - rZ2) / (fov * 1.1)));

            grid[c][r] = { px, py, pz: rZ2, worldY: wy, alpha, hoverFactor };
          } else {
            grid[c][r] = null;
          }
        }
      }

      // 2. DEFINE AND COMPUTE QUADS FOR SURFACE MESH SHADING
      interface MeshQuad {
        p0: MeshVertex;
        p1: MeshVertex;
        p2: MeshVertex;
        p3: MeshVertex;
        avgDepth: number;
        avgAlpha: number;
        cIndex: number;
        rIndex: number;
      }

      const quads: MeshQuad[] = [];

      for (let c = 0; c < columns - 1; c++) {
        for (let r = 0; r < rows - 1; r++) {
          const p0 = grid[c][r];
          const p1 = grid[c + 1][r];
          const p2 = grid[c + 1][r + 1];
          const p3 = grid[c][r + 1];

          if (p0 && p1 && p2 && p3) {
            const avgDepth = (p0.pz + p1.pz + p2.pz + p3.pz) / 4;
            const avgAlpha = (p0.alpha + p1.alpha + p2.alpha + p3.alpha) / 4;
            quads.push({ p0, p1, p2, p3, avgDepth, avgAlpha, cIndex: c, rIndex: r });
          }
        }
      }

      // Sort quads back-to-front (Painter's algorithm)
      quads.sort((a, b) => b.avgDepth - a.avgDepth);

      // 3. DRAW CONNECTED TOPOLOGICAL SURFACE WIRES
      quads.forEach((q) => {
        const { p0, p1, p2, p3, avgDepth, avgAlpha, cIndex, rIndex } = q;

        const avgHoverFactor = (p0.hoverFactor + p1.hoverFactor + p2.hoverFactor + p3.hoverFactor) / 4;
        
        ctx.beginPath();
        ctx.moveTo(p0.px, p0.py);
        ctx.lineTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.lineTo(p3.px, p3.py);
        ctx.closePath();

        // Background-matching occlusion masks for pure white background
        ctx.fillStyle = `rgba(255, 255, 255, ${0.72 + avgAlpha * 0.18})`;
        ctx.fill();

        // Dynamic minimalist color logic (subtle, crisp slate grid that transitions elegantly to solid emerald/green on cursor proximity)
        let strokeColor = `rgba(203, 213, 225, ${avgAlpha * 0.75})`; 
        let lineWidth = 0.55;
        if (avgHoverFactor > 0.05) {
          strokeColor = `rgba(16, 185, 129, ${(0.65 + avgHoverFactor * 0.35) * Math.max(0.45, avgAlpha)})`;
          lineWidth = 0.65 + avgHoverFactor * 1.35;
        }

        // Draw connected mesh wires (Painter segment styling)
        ctx.beginPath();
        ctx.moveTo(p0.px, p0.py);
        ctx.lineTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);

        // Render clean structural lines
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none bg-white"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block"
      />
      {/* Subtle top fade mask to match white backdrop */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      {/* Soft white fade overlay that terminates/merges into the features fold seamlessly */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none z-[5]" />
    </div>
  );
}
