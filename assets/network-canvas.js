'use strict';

/**
 * Deep RL Atlas — Interactive 3D Geodesic Policy-Value Manifold Visualizer
 * Simulates latent state topology, orbital trust-region trajectories, and
 * Bellman value-propagation pulses with theme-aware rendering.
 */
(() => {
  function initRLNetworkCanvas(canvas, motionBtn) {
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let angle = 0.42;
    let pulseClock = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let paused = reduced.matches;

    // Precompute Fibonacci geodesic sphere nodes
    const NODE_COUNT = 124;
    const points = Array.from({ length: NODE_COUNT }, (_, i) => {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * Math.PI * (3 - Math.sqrt(5));
      return {
        x: Math.cos(theta) * r,
        y,
        z: Math.sin(theta) * r,
        anchor: i % 15 === 0,
        hub: i % 9 === 0 && i % 15 !== 0
      };
    });

    // Precompute sparse topological edges once for crisp 60fps rendering
    const edges = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dz = points[i].z - points[j].z;
        const distSq = dx * dx + dy * dy + dz * dz;
        if (distSq < 0.27) {
          edges.push({ i, j, phase: (i * 0.37 + j * 0.19) % 1 });
        }
      }
    }

    // Active Bellman backup pulses traveling along topological edges
    const pulseEdges = edges.filter((_, idx) => idx % 11 === 0);

    function palette() {
      const isLight = document.documentElement.dataset.theme === 'light';
      return isLight
        ? {
            edgeRGB: '18, 118, 112',
            nodeRGB: '15, 115, 108',
            hubHex: '#0c7c75',
            signalHex: '#cc5214',
            orbitStroke: 'rgba(18, 118, 112, 0.20)',
            orbitSecondary: 'rgba(204, 82, 20, 0.16)',
            coreGlow: 'rgba(18, 118, 112, 0.09)'
          }
        : {
            edgeRGB: '26, 219, 203',
            nodeRGB: '56, 224, 210',
            hubHex: '#1adbc9',
            signalHex: '#f58832',
            orbitStroke: 'rgba(26, 219, 203, 0.20)',
            orbitSecondary: 'rgba(245, 136, 50, 0.16)',
            coreGlow: 'rgba(26, 219, 203, 0.10)'
          };
    }

    function project3D(px, py, pz, cy, sy, ct, st, scale) {
      const xx = px * cy - pz * sy;
      const zz = px * sy + pz * cy;
      const yy = py * ct - zz * st;
      const depth = py * st + zz * ct;
      const perspective = 3.85 / (3.85 - depth);
      return {
        x: width * 0.5 + xx * scale * perspective,
        y: height * 0.5 + yy * scale * perspective,
        z: depth,
        p: perspective
      };
    }

    function drawOrbit(cy, sy, ct, st, scale, radiusX, radiusZ, tiltOffset, strokeStyle) {
      ctx.beginPath();
      const steps = 72;
      for (let k = 0; k <= steps; k++) {
        const t = (k / steps) * Math.PI * 2;
        const ox = Math.cos(t) * radiusX;
        const oz = Math.sin(t) * radiusZ;
        const oy = Math.sin(t + tiltOffset) * 0.26;
        const pt = project3D(ox, oy, oz, cy, sy, ct, st, scale);
        if (k === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = 0.85;
      ctx.stroke();
    }

    function draw() {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);

      const colors = palette();
      const scale = Math.min(width * 0.34, height * 0.36);
      const rotY = angle + pointerX;
      const tilt = 0.24 + pointerY;
      const cy = Math.cos(rotY);
      const sy = Math.sin(rotY);
      const ct = Math.cos(tilt);
      const st = Math.sin(tilt);

      // Subtle central manifold radial glow
      const radial = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        scale * 0.08,
        width * 0.5,
        height * 0.5,
        scale * 1.25
      );
      radial.addColorStop(0, colors.coreGlow);
      radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      // Orbital latent & trust-region trajectories
      drawOrbit(cy, sy, ct, st, scale, 1.32, 1.18, 0.5, colors.orbitStroke);
      drawOrbit(cy, sy, ct, st, scale, 1.16, 1.28, -1.1, colors.orbitSecondary);

      const projected = points.map(pt => project3D(pt.x, pt.y, pt.z, cy, sy, ct, st, scale));

      // Geodesic manifold edges
      ctx.lineWidth = 0.65;
      for (let e = 0; e < edges.length; e++) {
        const a = projected[edges[e].i];
        const b = projected[edges[e].j];
        const depthAlpha = Math.max(0.035, 0.055 + (a.z + b.z + 2) * 0.062);
        ctx.strokeStyle = `rgba(${colors.edgeRGB}, ${depthAlpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Bellman backup pulses traveling along edges
      if (!paused) {
        for (let p = 0; p < pulseEdges.length; p++) {
          const edge = pulseEdges[p];
          const a = projected[edge.i];
          const b = projected[edge.j];
          const u = (pulseClock * 0.55 + edge.phase) % 1;
          const px = a.x + (b.x - a.x) * u;
          const py = a.y + (b.y - a.y) * u;
          const pz = a.z + (b.z - a.z) * u;
          if (pz > -0.45) {
            ctx.beginPath();
            ctx.fillStyle = p % 3 === 0 ? colors.signalHex : colors.hubHex;
            ctx.arc(px, py, 1.85, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Depth-sorted state nodes
      const order = projected
        .map((pt, idx) => ({ pt, idx }))
        .sort((m, n) => m.pt.z - n.pt.z);

      for (let k = 0; k < order.length; k++) {
        const { pt, idx } = order[k];
        const meta = points[idx];
        const depthFactor = (pt.z + 2.8) / 2.8;
        const radius = (meta.anchor ? 3.5 : meta.hub ? 2.5 : 1.75) * depthFactor;

        if (meta.anchor && pt.z > -0.2) {
          ctx.beginPath();
          ctx.fillStyle = 'rgba(245, 136, 50, 0.18)';
          ctx.arc(pt.x, pt.y, radius * 2.3, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        if (meta.anchor) {
          ctx.fillStyle = colors.signalHex;
        } else if (meta.hub) {
          ctx.fillStyle = colors.hubHex;
        } else {
          const alpha = Math.min(0.92, Math.max(0.18, 0.26 + (pt.z + 1) * 0.3));
          ctx.fillStyle = `rgba(${colors.nodeRGB}, ${alpha.toFixed(3)})`;
        }
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }

    function syncMotionButton() {
      if (!motionBtn) return;
      motionBtn.textContent = paused ? '▷ Resume motion' : 'Ⅱ Pause motion';
      motionBtn.setAttribute('aria-pressed', String(paused));
    }

    new ResizeObserver(resize).observe(canvas);

    canvas.addEventListener('pointermove', ev => {
      if (reduced.matches) return;
      const rect = canvas.getBoundingClientRect();
      targetX = ((ev.clientX - rect.left - rect.width / 2) / rect.width) * 0.72;
      targetY = ((ev.clientY - rect.top - rect.height / 2) / rect.height) * 0.44;
      if (paused) {
        pointerX = targetX;
        pointerY = targetY;
        draw();
      }
    });

    canvas.addEventListener('pointerleave', () => {
      targetX = 0;
      targetY = 0;
    });

    if (motionBtn) {
      motionBtn.addEventListener('click', () => {
        paused = !paused;
        syncMotionButton();
        draw();
      });
    }

    reduced.addEventListener('change', () => {
      paused = reduced.matches;
      syncMotionButton();
      draw();
    });

    let previous = performance.now();
    function animate(now) {
      const dt = Math.min(now - previous, 45);
      previous = now;
      if (!paused && !document.hidden) {
        angle += dt * 0.00011;
        pulseClock += dt * 0.00048;
        pointerX += (targetX - pointerX) * 0.08;
        pointerY += (targetY - pointerY) * 0.08;
        draw();
      }
      requestAnimationFrame(animate);
    }

    syncMotionButton();
    resize();
    requestAnimationFrame(animate);

    const api = { redraw: draw };
    window.RLNetworkCanvas = api;
    return api;
  }

  window.initRLNetworkCanvas = initRLNetworkCanvas;
})();
