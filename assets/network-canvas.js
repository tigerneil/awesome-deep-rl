'use strict';

/**
 * Deep RL Atlas — Interactive Scientific RL Instrument (FIG. 001)
 * Three mathematically grounded, real-time interactive modes:
 *   1. 'bellman'  — 3D Soft-Bellman Value Iteration V_k(s) + 2D Policy Quiver π(a|s)
 *   2. 'pendulum' — Underactuated Pendulum HJB Optimal Control Phase Portrait (θ, θ̇)
 *   3. 'corpus'   — Empirical Temporal–Taxonomic Graph built from window.RL_CATALOG
 */
(() => {
  const MDP_PRESETS = [
    {
      name: 'Obstacle Detour',
      goal: [13, 13],
      subGoal: [3, 13],
      hazards: [
        { i: 8, j: 8, amp: -0.95, sigma2: 5.2 },
        { i: 10, j: 5, amp: -0.55, sigma2: 3.5 }
      ]
    },
    {
      name: 'Twin-Canyon Saddle',
      goal: [14, 8],
      subGoal: [3, 3],
      hazards: [
        { i: 8, j: 5, amp: -0.92, sigma2: 4.2 },
        { i: 8, j: 11, amp: -0.92, sigma2: 4.2 }
      ]
    },
    {
      name: 'Cliff-Walking Ridge',
      goal: [14, 3],
      subGoal: [13, 13],
      hazards: [
        { i: 6, j: 3, amp: -1.05, sigma2: 3.6 },
        { i: 10, j: 3, amp: -1.05, sigma2: 3.6 },
        { i: 8, j: 9, amp: -0.48, sigma2: 4.5 }
      ]
    },
    {
      name: 'Asymmetric Trap',
      goal: [3, 13],
      subGoal: [13, 4],
      hazards: [
        { i: 7, j: 10, amp: -0.98, sigma2: 4.8 },
        { i: 11, j: 11, amp: -0.62, sigma2: 3.8 }
      ]
    }
  ];

  const DIRS = [
    [1, 0, 1.0],
    [-1, 0, 1.0],
    [0, 1, 1.0],
    [0, -1, 1.0],
    [1, 1, Math.SQRT2],
    [1, -1, Math.SQRT2],
    [-1, 1, Math.SQRT2],
    [-1, -1, Math.SQRT2]
  ];

  // Orthogonal slip indices for stochastic transition P(s' | s, a)
  const ORTHO_MAP = [
    [2, 3],
    [2, 3],
    [0, 1],
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [1, 3]
  ];

  function initRLNetworkCanvas(canvas, options = {}) {
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const motionBtn = options.motionBtn || document.getElementById('motion');
    const perturbBtn = options.perturbBtn || document.getElementById('visual-perturb');
    const readoutEl = options.readoutEl || document.getElementById('visual-readout');
    const modeButtons = options.modeButtons || document.querySelectorAll('[data-visual-mode]');
    const onOpenNote = typeof options.onOpenNote === 'function' ? options.onOpenNote : null;

    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let mode = 'bellman';
    let width = 0;
    let height = 0;
    let paused = reduced.matches;
    let hoverPx = null;

    function colors() {
      const light = document.documentElement.dataset.theme === 'light';
      return light
        ? {
            ink: '#141c26',
            secondary: '#425063',
            muted: '#6c788a',
            grid: 'rgba(20, 28, 38, 0.10)',
            gridStrong: 'rgba(20, 28, 38, 0.22)',
            teal: '#0b7a73',
            tealRGB: [11, 122, 115],
            amber: '#c84e12',
            amberRGB: [200, 78, 18],
            steel: '#226699',
            steelRGB: [34, 102, 153],
            panelBg: 'rgba(255, 255, 255, 0.88)'
          }
        : {
            ink: '#edf2f7',
            secondary: '#9fb0c4',
            muted: '#6c7c91',
            grid: 'rgba(215, 228, 242, 0.085)',
            gridStrong: 'rgba(215, 228, 242, 0.19)',
            teal: '#1adbc9',
            tealRGB: [26, 219, 201],
            amber: '#f68832',
            amberRGB: [246, 136, 50],
            steel: '#56a8f5',
            steelRGB: [86, 168, 245],
            panelBg: 'rgba(11, 15, 22, 0.86)'
          };
    }

    function lerpColor(rgbA, rgbB, t) {
      const u = Math.max(0, Math.min(1, t));
      const r = Math.round(rgbA[0] + (rgbB[0] - rgbA[0]) * u);
      const g = Math.round(rgbA[1] + (rgbB[1] - rgbA[1]) * u);
      const b = Math.round(rgbA[2] + (rgbB[2] - rgbA[2]) * u);
      return `rgb(${r},${g},${b})`;
    }

    /* ======================================================================
       MODE 1: 3D Soft-Bellman Value Surface V_k(s) + 2D Policy Quiver π(a|s)
       ====================================================================== */
    const N = 17;
    const GAMMA = 0.94;
    const TAU = 0.075;
    let presetIdx = 0;
    let V = new Float64Array(N * N);
    let VNext = new Float64Array(N * N);
    let RMap = new Float64Array(N * N);
    let policyDx = new Float64Array(N * N);
    let policyDy = new Float64Array(N * N);
    let policyEnt = new Float64Array(N * N);
    let bellmanIter = 0;
    let bellmanResidual = 1.0;
    let azimuth = -0.66;
    let elevation = 0.56;
    let targetAzimuth = -0.66;
    let targetElevation = 0.56;
    let particles = [];
    let projectedGridCache = null;
    let hoverStateIdx = -1;

    function idx(i, j) {
      return j * N + i;
    }

    function clampGrid(v) {
      return Math.max(0, Math.min(N - 1, v));
    }

    function setupMDP(pIndex) {
      presetIdx = ((pIndex % MDP_PRESETS.length) + MDP_PRESETS.length) % MDP_PRESETS.length;
      const preset = MDP_PRESETS[presetIdx];
      V.fill(0);
      VNext.fill(0);
      bellmanIter = 0;
      bellmanResidual = 1.0;

      for (let j = 0; j < N; j++) {
        for (let i = 0; i < N; i++) {
          let r = 0;
          if (i === preset.goal[0] && j === preset.goal[1]) {
            r = 1.0;
          } else {
            const dSub = (i - preset.subGoal[0]) ** 2 + (j - preset.subGoal[1]) ** 2;
            r += 0.36 * Math.exp(-dSub / 2.4);
            for (const h of preset.hazards) {
              const dh = (i - h.i) ** 2 + (j - h.j) ** 2;
              r += h.amp * Math.exp(-dh / h.sigma2);
            }
          }
          RMap[idx(i, j)] = r;
        }
      }
      updatePolicyField();
      resetRolloutParticles();
      if (paused || reduced.matches) {
        for (let s = 0; s < 75; s++) stepBellman();
      }
    }

    function stepBellman() {
      const preset = MDP_PRESETS[presetIdx];
      let maxDiff = 0;
      const qBuf = new Float64Array(DIRS.length);

      for (let j = 0; j < N; j++) {
        for (let i = 0; i < N; i++) {
          const id = idx(i, j);
          if (i === preset.goal[0] && j === preset.goal[1]) {
            const nv = 1.0;
            maxDiff = Math.max(maxDiff, Math.abs(nv - V[id]));
            VNext[id] = nv;
            continue;
          }

          let maxQ = -Infinity;
          for (let a = 0; a < DIRS.length; a++) {
            const [di, dj, stepLen] = DIRS[a];
            const ni = clampGrid(i + di);
            const nj = clampGrid(j + dj);
            const [o1, o2] = ORTHO_MAP[a];
            const s1i = clampGrid(i + DIRS[o1][0]);
            const s1j = clampGrid(j + DIRS[o1][1]);
            const s2i = clampGrid(i + DIRS[o2][0]);
            const s2j = clampGrid(j + DIRS[o2][1]);

            const expectedNextV =
              0.76 * V[idx(ni, nj)] + 0.12 * V[idx(s1i, s1j)] + 0.12 * V[idx(s2i, s2j)];
            const stepReward = RMap[id] - 0.026 * stepLen;
            const q = stepReward + GAMMA * expectedNextV;
            qBuf[a] = q;
            if (q > maxQ) maxQ = q;
          }

          let sumExp = 0;
          for (let a = 0; a < DIRS.length; a++) {
            sumExp += Math.exp((qBuf[a] - maxQ) / TAU);
          }
          const softV = maxQ + TAU * Math.log(sumExp / DIRS.length);
          const clampedV = Math.max(-1.05, Math.min(1.05, softV));
          maxDiff = Math.max(maxDiff, Math.abs(clampedV - V[id]));
          VNext[id] = clampedV;
        }
      }

      V.set(VNext);
      bellmanIter++;
      bellmanResidual = maxDiff;
      updatePolicyField();
    }

    function updatePolicyField() {
      const preset = MDP_PRESETS[presetIdx];
      const qBuf = new Float64Array(DIRS.length);
      const probs = new Float64Array(DIRS.length);

      for (let j = 0; j < N; j++) {
        for (let i = 0; i < N; i++) {
          const id = idx(i, j);
          if (i === preset.goal[0] && j === preset.goal[1]) {
            policyDx[id] = 0;
            policyDy[id] = 0;
            policyEnt[id] = 0;
            continue;
          }
          let maxQ = -Infinity;
          for (let a = 0; a < DIRS.length; a++) {
            const [di, dj, stepLen] = DIRS[a];
            const ni = clampGrid(i + di);
            const nj = clampGrid(j + dj);
            const q = RMap[id] - 0.026 * stepLen + GAMMA * V[idx(ni, nj)];
            qBuf[a] = q;
            if (q > maxQ) maxQ = q;
          }
          let Z = 0;
          for (let a = 0; a < DIRS.length; a++) {
            probs[a] = Math.exp((qBuf[a] - maxQ) / TAU);
            Z += probs[a];
          }
          let vx = 0;
          let vy = 0;
          let ent = 0;
          for (let a = 0; a < DIRS.length; a++) {
            const p = probs[a] / Z;
            vx += p * (DIRS[a][0] / DIRS[a][2]);
            vy += p * (DIRS[a][1] / DIRS[a][2]);
            if (p > 1e-9) ent -= p * Math.log(p);
          }
          policyDx[id] = vx;
          policyDy[id] = vy;
          policyEnt[id] = ent / Math.log(DIRS.length);
        }
      }
    }

    function spawnParticle(idxSeed) {
      const starts = [
        [1.2, 1.5], [1.5, 8.0], [1.5, 14.2], [8.0, 1.4],
        [14.5, 1.8], [6.0, 14.6], [14.6, 10.5], [2.4, 5.2]
      ];
      const base = starts[idxSeed % starts.length];
      const gx = Math.max(0.5, Math.min(N - 1.5, base[0] + (Math.random() - 0.5) * 1.6));
      const gy = Math.max(0.5, Math.min(N - 1.5, base[1] + (Math.random() - 0.5) * 1.6));
      return { x: gx, y: gy, age: 0, trail: [{ x: gx, y: gy }] };
    }

    function resetRolloutParticles() {
      particles = Array.from({ length: 14 }, (_, k) => spawnParticle(k));
    }

    function bilinearSample(arr, gx, gy) {
      const x = Math.max(0, Math.min(N - 1.001, gx));
      const y = Math.max(0, Math.min(N - 1.001, gy));
      const i0 = Math.floor(x);
      const j0 = Math.floor(y);
      const tx = x - i0;
      const ty = y - j0;
      const v00 = arr[idx(i0, j0)];
      const v10 = arr[idx(i0 + 1, j0)];
      const v01 = arr[idx(i0, j0 + 1)];
      const v11 = arr[idx(i0 + 1, j0 + 1)];
      return (1 - ty) * ((1 - tx) * v00 + tx * v10) + ty * ((1 - tx) * v01 + tx * v11);
    }

    function stepParticles() {
      const preset = MDP_PRESETS[presetIdx];
      for (let p = 0; p < particles.length; p++) {
        const pt = particles[p];
        const vx = bilinearSample(policyDx, pt.x, pt.y);
        const vy = bilinearSample(policyDy, pt.x, pt.y);
        const speed = Math.hypot(vx, vy);
        const jitter = 0.04;
        pt.x = Math.max(0.2, Math.min(N - 1.2, pt.x + vx * 0.22 + (Math.random() - 0.5) * jitter));
        pt.y = Math.max(0.2, Math.min(N - 1.2, pt.y + vy * 0.22 + (Math.random() - 0.5) * jitter));
        pt.age++;
        pt.trail.push({ x: pt.x, y: pt.y });
        if (pt.trail.length > 26) pt.trail.shift();

        const distGoal = Math.hypot(pt.x - preset.goal[0], pt.y - preset.goal[1]);
        if (distGoal < 0.75 || pt.age > 135 || speed < 0.015) {
          particles[p] = spawnParticle(p + bellmanIter);
        }
      }
    }

    function projectMDPPoint(nx, ny, nz) {
      // nx, ny in [-1, 1]; nz in [-0.8, 0.8]
      const ca = Math.cos(azimuth);
      const sa = Math.sin(azimuth);
      const ce = Math.cos(elevation);
      const se = Math.sin(elevation);

      const rx = nx * ca - ny * sa;
      const ry = nx * sa + ny * ca;
      const sy = ry * se - nz * ce;
      const depth = ry * ce + nz * se;
      const scale = Math.min(width * 0.35, height * 0.37);
      const persp = 4.4 / (4.4 + depth * 0.65);

      return {
        x: width * 0.5 + rx * scale * persp,
        y: height * 0.53 + sy * scale * persp,
        depth
      };
    }

    function drawBellmanMode(c) {
      const floorZ = -0.56;
      const zScale = 0.52;
      const preset = MDP_PRESETS[presetIdx];

      // 1. Floor State-Space Plane S = [-1, 1]^2
      const corners = [
        projectMDPPoint(-1, -1, floorZ),
        projectMDPPoint(1, -1, floorZ),
        projectMDPPoint(1, 1, floorZ),
        projectMDPPoint(-1, 1, floorZ)
      ];
      ctx.beginPath();
      ctx.moveTo(corners[0].x, corners[0].y);
      for (let k = 1; k < 4; k++) ctx.lineTo(corners[k].x, corners[k].y);
      ctx.closePath();
      ctx.strokeStyle = c.gridStrong;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Floor axis labels
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = c.muted;
      ctx.fillText('s₁ ∈ [-1,1]', (corners[0].x + corners[1].x) * 0.5 - 28, (corners[0].y + corners[1].y) * 0.5 + 14);
      ctx.fillText('π(a|s) floor', corners[3].x - 10, corners[3].y + 13);

      // 2. Policy Vector Field Quiver on Floor (every 2nd cell for clarity)
      ctx.lineWidth = 1;
      for (let j = 1; j < N - 1; j += 2) {
        for (let i = 1; i < N - 1; i += 2) {
          const id = idx(i, j);
          const vx = policyDx[id];
          const vy = policyDy[id];
          const mag = Math.hypot(vx, vy);
          if (mag < 0.08) continue;
          const nx = (i / (N - 1)) * 2 - 1;
          const ny = (j / (N - 1)) * 2 - 1;
          const step = 0.095;
          const p0 = projectMDPPoint(nx, ny, floorZ);
          const p1 = projectMDPPoint(nx + (vx / mag) * step, ny + (vy / mag) * step, floorZ);

          ctx.strokeStyle = `rgba(${c.tealRGB.join(',')}, 0.34)`;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();

          // Arrowhead dot
          ctx.fillStyle = `rgba(${c.tealRGB.join(',')}, 0.58)`;
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, 1.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Project 3D Value Surface V_k(s1, s2)
      const proj = new Array(N * N);
      for (let j = 0; j < N; j++) {
        const ny = (j / (N - 1)) * 2 - 1;
        for (let i = 0; i < N; i++) {
          const nx = (i / (N - 1)) * 2 - 1;
          const val = V[idx(i, j)];
          const p = projectMDPPoint(nx, ny, val * zScale + 0.05);
          proj[idx(i, j)] = { x: p.x, y: p.y, val, nx, ny, i, j };
        }
      }
      projectedGridCache = proj;

      // Nearest hovered state node
      hoverStateIdx = -1;
      if (hoverPx) {
        let bestDist = 22 * 22;
        for (let k = 0; k < proj.length; k++) {
          const dx = proj[k].x - hoverPx.x;
          const dy = proj[k].y - hoverPx.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < bestDist) {
            bestDist = d2;
            hoverStateIdx = k;
          }
        }
      }

      function valueStroke(v) {
        if (v >= 0) {
          return lerpColor(c.steelRGB, c.tealRGB, Math.pow(Math.min(1, v), 0.78));
        }
        return lerpColor(c.steelRGB, c.amberRGB, Math.min(1, Math.abs(v) * 1.25));
      }

      // Draw surface mesh lines along s1 and s2
      ctx.lineWidth = 1.05;
      for (let j = 0; j < N; j++) {
        for (let i = 0; i < N - 1; i++) {
          const a = proj[idx(i, j)];
          const b = proj[idx(i + 1, j)];
          ctx.strokeStyle = valueStroke((a.val + b.val) * 0.5);
          ctx.globalAlpha = 0.62;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N - 1; j++) {
          const a = proj[idx(i, j)];
          const b = proj[idx(i, j + 1)];
          ctx.strokeStyle = valueStroke((a.val + b.val) * 0.5);
          ctx.globalAlpha = 0.62;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      // 4. Boltzmann Policy Rollout Streamlines along V_k(s)
      for (const pt of particles) {
        if (pt.trail.length < 2) continue;
        ctx.beginPath();
        for (let t = 0; t < pt.trail.length; t++) {
          const node = pt.trail[t];
          const nx = (node.x / (N - 1)) * 2 - 1;
          const ny = (node.y / (N - 1)) * 2 - 1;
          const vz = bilinearSample(V, node.x, node.y) * zScale + 0.065;
          const sp = projectMDPPoint(nx, ny, vz);
          if (t === 0) ctx.moveTo(sp.x, sp.y);
          else ctx.lineTo(sp.x, sp.y);
        }
        ctx.strokeStyle = c.teal;
        ctx.globalAlpha = 0.78;
        ctx.lineWidth = 1.65;
        ctx.stroke();

        const head = pt.trail[pt.trail.length - 1];
        const hp = projectMDPPoint(
          (head.x / (N - 1)) * 2 - 1,
          (head.y / (N - 1)) * 2 - 1,
          bilinearSample(V, head.x, head.y) * zScale + 0.065
        );
        ctx.globalAlpha = 1;
        ctx.fillStyle = c.ink;
        ctx.beginPath();
        ctx.arc(hp.x, hp.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Data-Attached Vertical Projection Stems (Goal Summit, Primary Hazard, Hover Probe)
      function drawStem(gi, gj, label, colorHex) {
        const surf = proj[idx(gi, gj)];
        const flr = projectMDPPoint(surf.nx, surf.ny, floorZ);
        ctx.save();
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = colorHex;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(flr.x, flr.y);
        ctx.lineTo(surf.x, surf.y);
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = colorHex;
        ctx.beginPath();
        ctx.arc(surf.x, surf.y, 3.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '600 10.5px "JetBrains Mono", monospace';
        const tw = ctx.measureText(label).width;
        const bx = Math.max(8, Math.min(width - tw - 16, surf.x - tw * 0.5));
        const by = Math.max(18, surf.y - 11);
        ctx.fillStyle = c.panelBg;
        ctx.fillRect(bx - 4, by - 10, tw + 8, 14);
        ctx.fillStyle = colorHex;
        ctx.fillText(label, bx, by);
      }

      drawStem(preset.goal[0], preset.goal[1], `s* V=${V[idx(preset.goal[0], preset.goal[1])].toFixed(2)}`, c.teal);
      const h0 = preset.hazards[0];
      drawStem(h0.i, h0.j, `cost V=${V[idx(h0.i, h0.j)].toFixed(2)}`, c.amber);

      if (hoverStateIdx >= 0) {
        const hs = proj[hoverStateIdx];
        drawStem(
          hs.i,
          hs.j,
          `s=(${hs.nx.toFixed(1)},${hs.ny.toFixed(1)}) V=${hs.val.toFixed(2)}`,
          c.ink
        );
      }

      // Top-left compact mathematical legend inside viewport
      ctx.font = '10.5px "JetBrains Mono", monospace';
      ctx.fillStyle = c.secondary;
      ctx.fillText(`𝒯*V(s) = τ log ∑ exp((r + γ𝔼V)/τ) · ${preset.name}`, 12, 18);

      updateReadout(
        hoverStateIdx >= 0
          ? `k=${bellmanIter} · V(s)=${proj[hoverStateIdx].val.toFixed(3)} · H(π)=${policyEnt[hoverStateIdx].toFixed(2)} · ‖𝒯V−V‖∞=${bellmanResidual.toExponential(1)}`
          : `k=${bellmanIter} sweeps · ‖𝒯V−V‖∞=${bellmanResidual.toExponential(1)} · γ=${GAMMA} · τ=${TAU}`
      );
    }

    /* ======================================================================
       MODE 2: Underactuated Pendulum HJB Phase Portrait (θ, θ̇)
       ====================================================================== */
    const N_TH = 45;
    const N_OM = 33;
    const OM_MAX = 6.5;
    const U_MAX = 2.2; // Strictly underactuated: U_MAX = 2.2 < g/l = 5.0
    const G_OVER_L = 5.0;
    const DAMP = 0.12;
    const ACTIONS_U = [-2.2, -1.47, -0.73, 0, 0.73, 1.47, 2.2];

    let hjbSolved = false;
    const hjbV = new Float64Array(N_TH * N_OM);
    const hjbU = new Float64Array(N_TH * N_OM);
    let swingTrajs = [];

    function wrapAngle(th) {
      let a = ((th + Math.PI) % (2 * Math.PI));
      if (a < 0) a += 2 * Math.PI;
      return a - Math.PI;
    }

    function pendDeriv(th, om, u) {
      // th = 0 is upright unstable equilibrium; th = ±π is hanging down
      return [om, G_OVER_L * Math.sin(th) - DAMP * om + u];
    }

    function pendRK4(th, om, u, dt) {
      const [d1t, d1o] = pendDeriv(th, om, u);
      const [d2t, d2o] = pendDeriv(th + 0.5 * dt * d1t, om + 0.5 * dt * d1o, u);
      const [d3t, d3o] = pendDeriv(th + 0.5 * dt * d2t, om + 0.5 * dt * d2o, u);
      const [d4t, d4o] = pendDeriv(th + dt * d3t, om + dt * d3o, u);
      const nth = wrapAngle(th + (dt / 6) * (d1t + 2 * d2t + 2 * d3t + d4t));
      const nom = Math.max(-OM_MAX, Math.min(OM_MAX, om + (dt / 6) * (d1o + 2 * d2o + 2 * d3o + d4o)));
      return [nth, nom];
    }

    function interpHJB(arr, th, om) {
      const wTh = wrapAngle(th);
      const fx = ((wTh + Math.PI) / (2 * Math.PI)) * (N_TH - 1);
      const fy = ((om + OM_MAX) / (2 * OM_MAX)) * (N_OM - 1);
      const i0 = Math.max(0, Math.min(N_TH - 2, Math.floor(fx)));
      const j0 = Math.max(0, Math.min(N_OM - 2, Math.floor(fy)));
      const tx = fx - i0;
      const ty = fy - j0;
      const v00 = arr[j0 * N_TH + i0];
      const v10 = arr[j0 * N_TH + i0 + 1];
      const v01 = arr[(j0 + 1) * N_TH + i0];
      const v11 = arr[(j0 + 1) * N_TH + i0 + 1];
      return (1 - ty) * ((1 - tx) * v00 + tx * v10) + ty * ((1 - tx) * v01 + tx * v11);
    }

    function solvePendulumHJB() {
      if (hjbSolved) return;
      hjbV.fill(0);
      const nextV = new Float64Array(N_TH * N_OM);
      const dt = 0.065;
      const discount = 0.965;

      for (let sweep = 0; sweep < 68; sweep++) {
        for (let j = 0; j < N_OM; j++) {
          const om = -OM_MAX + (j / (N_OM - 1)) * (2 * OM_MAX);
          for (let i = 0; i < N_TH; i++) {
            const th = -Math.PI + (i / (N_TH - 1)) * (2 * Math.PI);
            let bestVal = -Infinity;
            let bestU = 0;

            for (let a = 0; a < ACTIONS_U.length; a++) {
              const u = ACTIONS_U[a];
              // Midpoint RK2 step for fast HJB sweep
              const [mTh, mOm] = pendDeriv(th, om, u);
              const [dTh, dOm] = pendDeriv(th + 0.5 * dt * mTh, om + 0.5 * dt * mOm, u);
              const nth = wrapAngle(th + dt * dTh);
              const nom = Math.max(-OM_MAX, Math.min(OM_MAX, om + dt * dOm));

              const cost = (1 - Math.cos(th)) + 0.045 * om * om + 0.018 * u * u;
              const q = -cost * dt + discount * interpHJB(hjbV, nth, nom);
              if (q > bestVal) {
                bestVal = q;
                bestU = u;
              }
            }
            nextV[j * N_TH + i] = bestVal;
            hjbU[j * N_TH + i] = bestU;
          }
        }
        // Periodic boundary seam average at ±π
        for (let j = 0; j < N_OM; j++) {
          const avg = 0.5 * (nextV[j * N_TH] + nextV[j * N_TH + N_TH - 1]);
          nextV[j * N_TH] = avg;
          nextV[j * N_TH + N_TH - 1] = avg;
        }
        hjbV.set(nextV);
      }
      hjbSolved = true;
      resetPendulumTrajectories();
    }

    function resetPendulumTrajectories() {
      const seeds = [
        [-Math.PI + 0.12, 0.0],
        [Math.PI - 0.15, 0.0],
        [-2.25, -2.6],
        [2.15, 2.8]
      ];
      swingTrajs = seeds.map(([th, om]) => ({
        th,
        om,
        age: 0,
        pts: [{ th, om }]
      }));
      if (paused || reduced.matches) {
        for (let k = 0; k < 140; k++) stepPendulumTrajectories();
      }
    }

    function optimalTorqueAt(th, om) {
      let bestVal = -Infinity;
      let bestU = 0;
      const dt = 0.05;
      for (let a = 0; a < ACTIONS_U.length; a++) {
        const u = ACTIONS_U[a];
        const [nth, nom] = pendRK4(th, om, u, dt);
        const cost = (1 - Math.cos(th)) + 0.045 * om * om + 0.018 * u * u;
        const q = -cost * dt + 0.965 * interpHJB(hjbV, nth, nom);
        if (q > bestVal) {
          bestVal = q;
          bestU = u;
        }
      }
      return bestU;
    }

    function stepPendulumTrajectories() {
      for (let k = 0; k < swingTrajs.length; k++) {
        const tr = swingTrajs[k];
        if (tr.age > 220) {
          if (k < 2) {
            tr.th = (k === 0 ? -1 : 1) * (Math.PI - 0.1 - Math.random() * 0.2);
            tr.om = (Math.random() - 0.5) * 0.6;
            tr.age = 0;
            tr.pts = [{ th: tr.th, om: tr.om }];
          }
          continue;
        }
        const u = optimalTorqueAt(tr.th, tr.om);
        const [nth, nom] = pendRK4(tr.th, tr.om, u, 0.032);
        tr.th = nth;
        tr.om = nom;
        tr.age++;
        tr.pts.push({ th: nth, om: nom });
        if (tr.pts.length > 165) tr.pts.shift();
      }
    }

    function phasePlotBounds() {
      return {
        left: 44,
        right: width - 18,
        top: 30,
        bottom: height - 28
      };
    }

    function drawPendulumMode(c) {
      solvePendulumHJB();
      const b = phasePlotBounds();
      const pw = b.right - b.left;
      const ph = b.bottom - b.top;

      const toX = th => b.left + ((th + Math.PI) / (2 * Math.PI)) * pw;
      const toY = om => b.bottom - ((om + OM_MAX) / (2 * OM_MAX)) * ph;

      // 1. Subtle Value Landscape Shading + Optimal Control Switching Cells
      let vMin = Infinity;
      let vMax = -Infinity;
      for (let k = 0; k < hjbV.length; k++) {
        if (hjbV[k] < vMin) vMin = hjbV[k];
        if (hjbV[k] > vMax) vMax = hjbV[k];
      }
      const cw = pw / (N_TH - 1);
      const ch = ph / (N_OM - 1);
      for (let j = 0; j < N_OM - 1; j++) {
        for (let i = 0; i < N_TH - 1; i++) {
          const vNorm = (hjbV[j * N_TH + i] - vMin) / Math.max(1e-6, vMax - vMin);
          const uOpt = hjbU[j * N_TH + i];
          const rgb = uOpt >= 0 ? c.tealRGB : c.amberRGB;
          const alpha = 0.03 + 0.14 * Math.pow(vNorm, 1.6);
          ctx.fillStyle = `rgba(${rgb.join(',')}, ${alpha.toFixed(3)})`;
          ctx.fillRect(b.left + i * cw, b.bottom - (j + 1) * ch, cw + 0.6, ch + 0.6);
        }
      }

      // 2. Axes, Zero Crosshairs & Coordinate Ticks
      ctx.strokeStyle = c.gridStrong;
      ctx.lineWidth = 1;
      ctx.strokeRect(b.left, b.top, pw, ph);

      ctx.beginPath();
      ctx.moveTo(toX(0), b.top);
      ctx.lineTo(toX(0), b.bottom);
      ctx.moveTo(b.left, toY(0));
      ctx.lineTo(b.right, toY(0));
      ctx.strokeStyle = c.grid;
      ctx.stroke();

      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = c.muted;
      const xTicks = [
        [-Math.PI, '-π'],
        [-Math.PI * 0.5, '-π/2'],
        [0, '0'],
        [Math.PI * 0.5, '+π/2'],
        [Math.PI, '+π']
      ];
      xTicks.forEach(([val, lbl]) => {
        const x = toX(val);
        ctx.fillText(lbl, x - 10, b.bottom + 14);
      });
      [-6, -3, 0, 3, 6].forEach(om => {
        const y = toY(om);
        ctx.fillText(String(om), 16, y + 3);
      });
      ctx.fillStyle = c.secondary;
      ctx.fillText('θ (rad)', b.right - 46, b.bottom + 14);
      ctx.fillText('θ̇', 8, b.top + 8);
      ctx.fillText('HJB Swing-Up u*(θ,θ̇) · |u|≤2.2 < g/ℓ=5.0 (click to launch)', b.left, 18);

      // 3. Closed-Loop Phase-Space Vector Field (θ̇, θ̈(u*))
      for (let j = 2; j < N_OM - 1; j += 3) {
        const om = -OM_MAX + (j / (N_OM - 1)) * (2 * OM_MAX);
        for (let i = 2; i < N_TH - 1; i += 3) {
          const th = -Math.PI + (i / (N_TH - 1)) * (2 * Math.PI);
          const u = hjbU[j * N_TH + i];
          const [dth, dom] = pendDeriv(th, om, u);
          const sx = dth / Math.PI;
          const sy = -dom / OM_MAX;
          const norm = Math.hypot(sx, sy) || 1;
          const len = 8.5;
          const px = toX(th);
          const py = toY(om);
          const ex = px + (sx / norm) * len;
          const ey = py + (sy / norm) * len;

          ctx.strokeStyle = u >= 0 ? `rgba(${c.tealRGB.join(',')}, 0.42)` : `rgba(${c.amberRGB.join(',')}, 0.42)`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(ex, ey);
          ctx.stroke();
        }
      }

      // 4. RK4 Swing-Up Trajectories (handling periodic ±π wrap cleanly)
      swingTrajs.forEach((tr, idxT) => {
        if (tr.pts.length < 2) return;
        ctx.strokeStyle = idxT % 2 === 0 ? c.teal : c.amber;
        ctx.lineWidth = 1.85;
        ctx.beginPath();
        for (let k = 0; k < tr.pts.length; k++) {
          const p = tr.pts[k];
          const x = toX(p.th);
          const y = toY(p.om);
          if (k === 0 || Math.abs(p.th - tr.pts[k - 1].th) > Math.PI) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        const head = tr.pts[tr.pts.length - 1];
        ctx.fillStyle = c.ink;
        ctx.beginPath();
        ctx.arc(toX(head.th), toY(head.om), 2.8, 0, Math.PI * 2);
        ctx.fill();
      });

      // 5. Equilibrium Markers: Upright Target (0, 0) & Hang-Down (±π, 0)
      ctx.fillStyle = c.teal;
      ctx.beginPath();
      ctx.arc(toX(0), toY(0), 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = c.ink;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      [-Math.PI, Math.PI].forEach(hangTh => {
        ctx.beginPath();
        ctx.arc(toX(hangTh), toY(0), 3.6, 0, Math.PI * 2);
        ctx.strokeStyle = c.amber;
        ctx.stroke();
      });

      // Hover readout in phase space
      if (hoverPx && hoverPx.x >= b.left && hoverPx.x <= b.right && hoverPx.y >= b.top && hoverPx.y <= b.bottom) {
        const hTh = -Math.PI + ((hoverPx.x - b.left) / pw) * (2 * Math.PI);
        const hOm = OM_MAX - ((hoverPx.y - b.top) / ph) * (2 * OM_MAX);
        const hU = optimalTorqueAt(hTh, hOm);
        const hV = interpHJB(hjbV, hTh, hOm);

        ctx.strokeStyle = c.gridStrong;
        ctx.beginPath();
        ctx.arc(hoverPx.x, hoverPx.y, 4.5, 0, Math.PI * 2);
        ctx.stroke();

        updateReadout(
          `θ=${hTh.toFixed(2)} rad · θ̇=${hOm.toFixed(2)} rad/s · u*=${hU >= 0 ? '+' : ''}${hU.toFixed(2)} · V*=${hV.toFixed(2)}`
        );
      } else {
        updateReadout('Underactuated HJB solved (45×33 grid) · Click phase plane to integrate RK4 trajectory');
      }
    }

    /* ======================================================================
       MODE 3: Empirical Corpus Graph (Built from window.RL_CATALOG)
       ====================================================================== */
    let corpusBuilt = false;
    let corpusNodes = [];
    let corpusEdges = [];
    let hoveredCorpusNode = null;

    const ERA_YEAR_HINTS = {
      DQN: 2015, DDQN: 2016, Dueling: 2016, PER: 2016, TRPO: 2015, DDPG: 2016,
      A3C: 2016, ACER: 2017, PPO: 2017, C51: 2017, NoisyNet: 2018, UBE: 2018,
      Distral: 2017, I2As: 2017, LOLA: 2018, MPO: 2018
    };

    const LINEAGE_GROUPS = [
      ['DQN', 'DDQN', 'Dueling', 'PER', 'C51', 'NoisyNet', 'UBE', 'Relative-Value-Learning', 'PTR-CRL'],
      ['TRPO', 'PPO', 'ACER', 'LGPO', 'Reward-Budgeting', 'Parallel-Safe-RL', 'SHAPO'],
      ['DDPG', 'MPO', 'Latent-Policy-Steering', 'NSPG', 'Excursion-Policies', 'MEND', 'K-PWM'],
      ['C51', 'MPO', 'Distral', 'Distributional-IRL', 'I2As', 'K-PWM'],
      ['LOLA', 'Phi-Actor-Critic'],
      ['PPO', 'NOPO', 'VEPO', 'SDPO', 'LARBRID', 'TACA', 'LoongRL', 'T3-Belief-RL', 'HyperSkill', 'HeMeR']
    ];

    function trackRowForItem(item) {
      const cat = String(item.category || '');
      if (/Value|Q-Learning|Exploration/i.test(cat) || ['DQN', 'DDQN', 'Dueling', 'PER', 'NoisyNet', 'UBE', 'Relative-Value-Learning', 'PTR-CRL'].includes(item.id)) return 0;
      if (/Policy|Actor|Trust/i.test(cat) || ['TRPO', 'PPO', 'DDPG', 'ACER', 'MPO', 'LGPO', 'SHAPO', 'Parallel-Safe-RL'].includes(item.id)) return 1;
      if (/Model|Distributional|Multi-Agent|Hierarchical/i.test(cat) || ['C51', 'Distral', 'I2As', 'LOLA', 'Distributional-IRL', 'Phi-Actor-Critic'].includes(item.id)) return 2;
      if (/Embodied/i.test(cat) || ['Latent-Policy-Steering', 'NSPG', 'Excursion-Policies', 'K-PWM', 'MEND', 'HeMeR'].includes(item.id)) return 3;
      return 4; // Agentic & Verifiable Post-Training
    }

    function buildCorpusGraph() {
      if (corpusBuilt) return;
      const catalog = window.RL_CATALOG || [];
      const priorityIds = new Set([
        'DQN', 'DDQN', 'Dueling', 'PER', 'C51', 'NoisyNet', 'UBE', 'TRPO', 'PPO',
        'DDPG', 'ACER', 'MPO', 'Distral', 'I2As', 'LOLA', 'NOPO', 'VEPO', 'LGPO',
        'SDPO', 'LARBRID', 'Relative-Value-Learning', 'Reward-Budgeting',
        'Excursion-Policies', 'Parallel-Safe-RL', 'PTR-CRL', 'K-PWM', 'TACA',
        'Phi-Actor-Critic', 'Distributional-IRL', 'NSPG', 'Latent-Policy-Steering',
        'SHAPO', 'MEND', 'HyperSkill', 'LoongRL', 'T3-Belief-RL', 'HeMeR'
      ]);

      const selected = catalog.filter(
        item => item.file && item.id !== 'README' && item.id !== 'WEBSITE' && item.id !== '2026' &&
          (priorityIds.has(item.id) || item.hasMath)
      ).slice(0, 44);

      const byRowYear = new Map();
      corpusNodes = selected.map(item => {
        let year = ERA_YEAR_HINTS[item.id] || 2019;
        if (item.publishedAt && /^20\d\d/.test(item.publishedAt)) {
          year = Number(item.publishedAt.slice(0, 4));
        } else if (String(item.category).startsWith('2026')) {
          year = 2026;
        }
        const row = trackRowForItem(item);
        const key = `${row}:${year}`;
        const slot = byRowYear.get(key) || 0;
        byRowYear.set(key, slot + 1);
        return { item, id: item.id, year, row, slot, x: 0, y: 0 };
      });

      const idToIndex = new Map(corpusNodes.map((n, idxN) => [n.id, idxN]));
      const edgeSet = new Set();
      const addEdge = (a, b, kind) => {
        if (a === b || a == null || b == null) return;
        const k = a < b ? `${a}:${b}` : `${b}:${a}`;
        if (edgeSet.has(k)) return;
        edgeSet.add(k);
        corpusEdges.push({ a, b, kind });
      };

      // 1. Explicit Markdown cross-links in repository notes
      corpusNodes.forEach((node, i) => {
        const body = node.item.body || '';
        for (const m of body.matchAll(/\]\(([A-Za-z0-9_-]+)\.md\)/g)) {
          const j = idToIndex.get(m[1]);
          if (j !== undefined) addEdge(i, j, 'citation');
        }
      });

      // 2. Documented algorithmic operator lineages
      for (const group of LINEAGE_GROUPS) {
        const present = group.map(id => idToIndex.get(id)).filter(v => v !== undefined);
        for (let k = 0; k < present.length - 1; k++) {
          addEdge(present[k], present[k + 1], 'lineage');
        }
      }

      corpusBuilt = true;
    }

    function layoutCorpusNodes() {
      const left = 96;
      const right = width - 26;
      const top = 36;
      const bottom = height - 30;
      const rowHeight = (bottom - top) / 4.4;

      // Count slots per (row, yearBucket) to spread 2026 cluster cleanly without overlap
      const bucketCounts = new Map();
      corpusNodes.forEach(n => {
        const k = `${n.row}:${n.year}`;
        bucketCounts.set(k, (bucketCounts.get(k) || 0) + 1);
      });

      corpusNodes.forEach(n => {
        const totalInBucket = bucketCounts.get(`${n.row}:${n.year}`) || 1;
        // Nonlinear time scale giving extra horizontal resolution to the dense 2025–2026 frontier
        const tRaw = (n.year - 2015) / (2026 - 2015);
        const tBase = Math.max(0, Math.min(1, Math.pow(tRaw, 0.72)));
        const spreadX = totalInBucket > 1 ? ((n.slot / (totalInBucket - 1)) - 0.5) * Math.min(0.28, totalInBucket * 0.036) : 0;
        const spreadY = totalInBucket > 1 ? (((n.slot % 3) - 1) * 11) : 0;

        n.x = left + Math.max(0.02, Math.min(0.98, tBase + spreadX)) * (right - left);
        n.y = top + (n.row + 0.25) * rowHeight + spreadY;
      });
    }

    function drawCorpusMode(c) {
      buildCorpusGraph();
      layoutCorpusNodes();

      const trackNames = ['Value / TD', 'Policy / Trust', 'Dist. / World', 'Embodied Flow', 'Agentic RLVR'];
      const top = 36;
      const bottom = height - 30;
      const rowHeight = (bottom - top) / 4.4;

      ctx.font = '9.5px "JetBrains Mono", monospace';
      trackNames.forEach((label, r) => {
        const y = top + (r + 0.25) * rowHeight;
        ctx.strokeStyle = c.grid;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(92, y);
        ctx.lineTo(width - 20, y);
        ctx.stroke();
        ctx.fillStyle = c.muted;
        ctx.fillText(label, 10, y + 3);
      });

      // Timeline ticks
      [2015, 2017, 2020, 2026].forEach(yr => {
        const t = Math.pow((yr - 2015) / 11, 0.72);
        const x = 96 + t * (width - 122);
        ctx.fillStyle = c.muted;
        ctx.fillText(String(yr), x - 12, height - 10);
      });
      ctx.fillStyle = c.secondary;
      ctx.fillText(
        `Empirical Lineage Graph (${corpusNodes.length} math-indexed notes · ${corpusEdges.length} couplings · click node to open)`,
        12,
        18
      );

      // Hover detection
      hoveredCorpusNode = null;
      if (hoverPx) {
        let best = 15 * 15;
        for (let i = 0; i < corpusNodes.length; i++) {
          const dx = corpusNodes[i].x - hoverPx.x;
          const dy = corpusNodes[i].y - hoverPx.y;
          if (dx * dx + dy * dy < best) {
            best = dx * dx + dy * dy;
            hoveredCorpusNode = i;
          }
        }
      }

      const neighborSet = new Set();
      if (hoveredCorpusNode !== null) {
        neighborSet.add(hoveredCorpusNode);
        corpusEdges.forEach(e => {
          if (e.a === hoveredCorpusNode) neighborSet.add(e.b);
          if (e.b === hoveredCorpusNode) neighborSet.add(e.a);
        });
      }

      // Edges (Bezier curves)
      corpusEdges.forEach(e => {
        const na = corpusNodes[e.a];
        const nb = corpusNodes[e.b];
        const activeEdge =
          hoveredCorpusNode !== null && (e.a === hoveredCorpusNode || e.b === hoveredCorpusNode);
        ctx.beginPath();
        const midX = (na.x + nb.x) * 0.5;
        ctx.moveTo(na.x, na.y);
        ctx.quadraticCurveTo(midX, (na.y + nb.y) * 0.5 - 10, nb.x, nb.y);
        if (activeEdge) {
          ctx.strokeStyle = e.kind === 'citation' ? c.amber : c.teal;
          ctx.lineWidth = 1.65;
          ctx.globalAlpha = 0.92;
        } else {
          ctx.strokeStyle = e.kind === 'citation' ? c.amber : c.teal;
          ctx.lineWidth = 0.85;
          ctx.globalAlpha = hoveredCorpusNode !== null ? 0.08 : 0.24;
        }
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      // Paper Nodes
      corpusNodes.forEach((n, idxN) => {
        const isHov = idxN === hoveredCorpusNode;
        const isNeighbor = neighborSet.has(idxN);
        const dim = hoveredCorpusNode !== null && !isNeighbor;
        const is2026 = n.year >= 2026;

        ctx.globalAlpha = dim ? 0.25 : 1;
        ctx.beginPath();
        ctx.fillStyle = isHov ? c.ink : is2026 ? c.amber : c.teal;
        ctx.arc(n.x, n.y, isHov ? 5.2 : n.item.hasMath ? 3.6 : 2.8, 0, Math.PI * 2);
        ctx.fill();

        if (isHov || (hoveredCorpusNode === null && ['DQN', 'PPO', 'C51', 'MPO', 'NOPO', 'Latent-Policy-Steering', 'K-PWM'].includes(n.id))) {
          ctx.font = isHov ? '600 10.5px "JetBrains Mono", monospace' : '9.5px "JetBrains Mono", monospace';
          const lbl = n.id;
          const tw = ctx.measureText(lbl).width;
          const lx = Math.min(width - tw - 10, Math.max(8, n.x - tw * 0.5));
          const ly = n.y - 8;
          ctx.fillStyle = c.panelBg;
          ctx.fillRect(lx - 3, ly - 9, tw + 6, 12);
          ctx.fillStyle = isHov ? c.ink : c.secondary;
          ctx.fillText(lbl, lx, ly);
        }
      });
      ctx.globalAlpha = 1;

      if (hoveredCorpusNode !== null) {
        const hn = corpusNodes[hoveredCorpusNode].item;
        const venueTag = hn.venue ? ` · ${hn.venue}` : '';
        updateReadout(`${hn.id}${venueTag} — click node to open typeset research note`);
      } else {
        updateReadout(
          `${corpusNodes.length} formal RL notes (${corpusEdges.length} lineage & Markdown citation edges) · Hover node to inspect`
        );
      }
    }

    /* ======================================================================
       Shared Viewport Controller, Events & Animation Loop
       ====================================================================== */
    function updateReadout(text) {
      if (readoutEl && readoutEl.textContent !== text) {
        readoutEl.textContent = text;
      }
    }

    function syncButtons() {
      if (motionBtn) {
        motionBtn.textContent = paused ? '▷ Resume' : 'Ⅱ Pause';
        motionBtn.setAttribute('aria-pressed', String(paused));
      }
      if (perturbBtn) {
        perturbBtn.textContent =
          mode === 'bellman'
            ? '↻ Perturb MDP'
            : mode === 'pendulum'
              ? '↻ Reset swing-up'
              : '↻ Open random node';
      }
      modeButtons.forEach(btn => {
        btn.setAttribute('aria-selected', String(btn.dataset.visualMode === mode));
      });
    }

    function draw() {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);
      const c = colors();
      if (mode === 'bellman') drawBellmanMode(c);
      else if (mode === 'pendulum') drawPendulumMode(c);
      else drawCorpusMode(c);
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

    new ResizeObserver(resize).observe(canvas);

    canvas.addEventListener('pointermove', ev => {
      const rect = canvas.getBoundingClientRect();
      hoverPx = { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
      if (mode === 'bellman' && !reduced.matches) {
        const nx = (hoverPx.x - rect.width * 0.5) / Math.max(1, rect.width);
        const ny = (hoverPx.y - rect.height * 0.5) / Math.max(1, rect.height);
        targetAzimuth = -0.66 + nx * 0.55;
        targetElevation = 0.56 + ny * 0.25;
      }
      if (paused || mode === 'corpus') draw();
    });

    canvas.addEventListener('pointerleave', () => {
      hoverPx = null;
      targetAzimuth = -0.66;
      targetElevation = 0.56;
      draw();
    });

    canvas.addEventListener('click', ev => {
      const rect = canvas.getBoundingClientRect();
      const cx = ev.clientX - rect.left;
      const cy = ev.clientY - rect.top;

      if (mode === 'bellman') {
        if (hoverStateIdx >= 0 && projectedGridCache) {
          const hs = projectedGridCache[hoverStateIdx];
          particles.push({ x: hs.i, y: hs.j, age: 0, trail: [{ x: hs.i, y: hs.j }] });
          if (particles.length > 20) particles.shift();
        } else {
          setupMDP(presetIdx + 1);
        }
        draw();
      } else if (mode === 'pendulum') {
        const b = phasePlotBounds();
        if (cx >= b.left && cx <= b.right && cy >= b.top && cy <= b.bottom) {
          const th = -Math.PI + ((cx - b.left) / (b.right - b.left)) * (2 * Math.PI);
          const om = OM_MAX - ((cy - b.top) / (b.bottom - b.top)) * (2 * OM_MAX);
          swingTrajs.push({ th, om, age: 0, pts: [{ th, om }] });
          if (swingTrajs.length > 7) swingTrajs.shift();
          if (paused) {
            for (let s = 0; s < 120; s++) stepPendulumTrajectories();
          }
          draw();
        }
      } else if (mode === 'corpus' && hoveredCorpusNode !== null && onOpenNote) {
        onOpenNote(corpusNodes[hoveredCorpusNode].item);
      }
    });

    modeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        mode = btn.dataset.visualMode || 'bellman';
        if (mode === 'pendulum') solvePendulumHJB();
        if (mode === 'corpus') buildCorpusGraph();
        syncButtons();
        draw();
      });
    });

    if (perturbBtn) {
      perturbBtn.addEventListener('click', () => {
        if (mode === 'bellman') {
          setupMDP(presetIdx + 1);
        } else if (mode === 'pendulum') {
          resetPendulumTrajectories();
        } else if (mode === 'corpus' && onOpenNote) {
          buildCorpusGraph();
          if (corpusNodes.length) {
            const pick = corpusNodes[Math.floor(Math.random() * corpusNodes.length)];
            onOpenNote(pick.item);
          }
        }
        draw();
      });
    }

    if (motionBtn) {
      motionBtn.addEventListener('click', () => {
        paused = !paused;
        syncButtons();
        draw();
      });
    }

    reduced.addEventListener('change', () => {
      paused = reduced.matches;
      syncButtons();
      draw();
    });

    let accumBellman = 0;
    let lastTime = performance.now();
    function tick(now) {
      const dt = Math.min(now - lastTime, 48);
      lastTime = now;

      if (!paused && !document.hidden) {
        if (mode === 'bellman') {
          accumBellman += dt;
          if (bellmanResidual > 1e-4 && accumBellman >= 42) {
            stepBellman();
            accumBellman = 0;
          }
          stepParticles();
          azimuth += (targetAzimuth - azimuth) * 0.08;
          elevation += (targetElevation - elevation) * 0.08;
          draw();
        } else if (mode === 'pendulum') {
          stepPendulumTrajectories();
          draw();
        }
      }
      requestAnimationFrame(tick);
    }

    setupMDP(0);
    syncButtons();
    resize();
    requestAnimationFrame(tick);

    const api = {
      redraw: draw,
      setMode(nextMode) {
        mode = nextMode;
        syncButtons();
        draw();
      }
    };
    window.RLNetworkCanvas = api;
    return api;
  }

  window.initRLNetworkCanvas = initRLNetworkCanvas;
})();
