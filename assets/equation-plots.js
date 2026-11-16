'use strict';

/**
 * Deep RL Atlas — Analytical Operator Diagnostic Plots (FIG. 002)
 * Computes and renders exact mathematical curves for all 6 Canonical Equations
 * with interactive parameter sliders, dual-panel diagnostics, and hover probes.
 */
(() => {
  const CONFIGS = {
    bellman: {
      paramLabel: 'Discount γ',
      min: 0.5,
      max: 0.96,
      step: 0.02,
      initial: 0.88,
      format: v => `γ = ${v.toFixed(2)}`,
      caption: 'FIG. 002A · Contraction γᵏ & Maximization Bias vs Action Cardinality M'
    },
    'pg-gae': {
      paramLabel: 'GAE trace λ',
      min: 0.0,
      max: 1.0,
      step: 0.02,
      initial: 0.92,
      format: v => `λ = ${v.toFixed(2)}`,
      caption: 'FIG. 002B · TD-Residual Kernel (γλ)ˡ & Bias²–Variance–MSE Decomposition'
    },
    'trust-grpo': {
      paramLabel: 'Clip radius ε',
      min: 0.05,
      max: 0.45,
      step: 0.01,
      initial: 0.2,
      format: v => `ε = ${v.toFixed(2)}`,
      caption: 'FIG. 002C · Clipped Surrogate L^CLIP(ρ, Â=±1) vs KL-Regularized Objective'
    },
    'dist-maxent': {
      paramLabel: 'Temperature τ',
      min: 0.1,
      max: 1.2,
      step: 0.02,
      initial: 0.32,
      format: v => `τ = ${v.toFixed(2)}`,
      caption: 'FIG. 002D · Categorical Bellman Projection Φ𝒯^πZ & MaxEnt Policy Tilt q*(a)'
    },
    'flow-steering': {
      paramLabel: 'Steering α',
      min: 0.05,
      max: 1.0,
      step: 0.03,
      initial: 0.78,
      format: v => `α = ${v.toFixed(2)}`,
      caption: 'FIG. 002E · In-Support MeanFlow Steering Gψ(s, z) vs Unconstrained OOD Q-Ascent'
    },
    'frontier-2026': {
      paramLabel: 'NOPO scale β',
      min: 0.3,
      max: 3.0,
      step: 0.05,
      initial: 1.25,
      format: v => `β = ${v.toFixed(2)}`,
      caption: 'FIG. 002F · NOPO Self-Attenuating Negative Weight σ(βΔ) & Effective Entropy H_eff'
    }
  };

  const paramState = {};
  Object.keys(CONFIGS).forEach(k => {
    paramState[k] = CONFIGS[k].initial;
  });

  function palette() {
    const light = document.documentElement.dataset.theme === 'light';
    return light
      ? {
          ink: '#141c26',
          secondary: '#425063',
          muted: '#6d7a8c',
          grid: 'rgba(20, 28, 38, 0.09)',
          axis: 'rgba(20, 28, 38, 0.24)',
          teal: '#0b7a73',
          tealFill: 'rgba(11, 122, 115, 0.14)',
          amber: '#c84e12',
          amberFill: 'rgba(200, 78, 18, 0.13)',
          steel: '#25689c',
          badgeBg: 'rgba(255, 255, 255, 0.90)'
        }
      : {
          ink: '#edf2f7',
          secondary: '#a3b3c6',
          muted: '#6c7c91',
          grid: 'rgba(215, 228, 242, 0.08)',
          axis: 'rgba(215, 228, 242, 0.22)',
          teal: '#1adbc9',
          tealFill: 'rgba(26, 219, 201, 0.13)',
          amber: '#f68832',
          amberFill: 'rgba(246, 136, 50, 0.13)',
          steel: '#58a9f7',
          badgeBg: 'rgba(11, 15, 22, 0.90)'
        };
  }

  function drawAxes(ctx, box, c, xLabel, yLabel) {
    ctx.strokeStyle = c.axis;
    ctx.lineWidth = 1;
    ctx.strokeRect(box.x, box.y, box.w, box.h);

    ctx.strokeStyle = c.grid;
    ctx.beginPath();
    for (let k = 1; k <= 3; k++) {
      const gx = box.x + (box.w * k) / 4;
      const gy = box.y + (box.h * k) / 4;
      ctx.moveTo(gx, box.y);
      ctx.lineTo(gx, box.y + box.h);
      ctx.moveTo(box.x, gy);
      ctx.lineTo(box.x + box.w, gy);
    }
    ctx.stroke();

    ctx.font = '9.5px "JetBrains Mono", monospace';
    ctx.fillStyle = c.muted;
    if (xLabel) ctx.fillText(xLabel, box.x + box.w - ctx.measureText(xLabel).width - 4, box.y + box.h + 13);
    if (yLabel) ctx.fillText(yLabel, box.x + 5, box.y + 12);
  }

  function plotCurve(ctx, box, xMin, xMax, yMin, yMax, fn, stroke, widthPx = 1.85, dash = []) {
    const steps = 110;
    ctx.save();
    ctx.beginPath();
    ctx.setLineDash(dash);
    ctx.strokeStyle = stroke;
    ctx.lineWidth = widthPx;
    for (let i = 0; i <= steps; i++) {
      const xv = xMin + ((xMax - xMin) * i) / steps;
      const yv = Math.max(yMin, Math.min(yMax, fn(xv)));
      const px = box.x + ((xv - xMin) / (xMax - xMin)) * box.w;
      const py = box.y + box.h - ((yv - yMin) / (yMax - yMin)) * box.h;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.restore();
  }

  function splitBoxes(w, h) {
    if (w < 500) {
      return [
        { x: 34, y: 12, w: w - 46, h: h * 0.42 },
        { x: 34, y: h * 0.54, w: w - 46, h: h * 0.38 }
      ];
    }
    const gap = 36;
    const bw = (w - 56 - gap) * 0.5;
    return [
      { x: 34, y: 16, w: bw, h: h - 38 },
      { x: 34 + bw + gap, y: 16, w: bw, h: h - 38 }
    ];
  }

  /* ------------------------------------------------------------------------
     1. Bellman Contraction & Double-Q Overestimation Bias
     ------------------------------------------------------------------------ */
  function drawBellmanDiagnostic(ctx, w, h, gamma, hoverX, c) {
    const [b1, b2] = splitBoxes(w, h);

    // Left: Contraction ||T^k Q - Q*|| <= gamma^k
    drawAxes(ctx, b1, c, 'backup k (0→30)', '‖𝒯ᵏQ − Q*‖∞');
    plotCurve(ctx, b1, 0, 30, 0, 1.05, k => Math.pow(gamma, k), c.teal, 2.0);
    plotCurve(ctx, b1, 0, 30, 0, 1.05, k => Math.pow(0.95, k), c.steel, 1.2, [4, 3]);
    ctx.font = '9.5px "JetBrains Mono", monospace';
    ctx.fillStyle = c.teal;
    ctx.fillText(`γᵏ (${gamma.toFixed(2)}ᵏ)`, b1.x + b1.w - 86, b1.y + 24);
    ctx.fillStyle = c.steel;
    ctx.fillText('ref 0.95ᵏ', b1.x + b1.w - 86, b1.y + 37);

    // Right: Analytical Maximization Bias E[max_a Q_hat - Q*] vs Action Count M
    const yMax = 2.6;
    drawAxes(ctx, b2, c, 'actions |𝒜| (2→32)', 'E[Q̂ − Q*] bias');
    const sigma = 0.22 / Math.sqrt(1 - gamma);
    // Zero bias reference line
    const yZero = b2.y + b2.h - (0.3 / yMax) * b2.h;
    ctx.strokeStyle = c.axis;
    ctx.beginPath();
    ctx.moveTo(b2.x, yZero);
    ctx.lineTo(b2.x + b2.w, yZero);
    ctx.stroke();

    plotCurve(
      ctx,
      b2,
      2,
      32,
      -0.3,
      yMax - 0.3,
      m => sigma * Math.sqrt(Math.max(0, 2 * Math.log(m) - Math.log(Math.log(m) + 1))),
      c.amber,
      2.0
    );
    plotCurve(ctx, b2, 2, 32, -0.3, yMax - 0.3, m => -0.04 / Math.sqrt(m), c.teal, 2.0);

    ctx.fillStyle = c.amber;
    ctx.fillText('DQN max_a Q̂ (overestimates)', b2.x + 8, b2.y + 26);
    ctx.fillStyle = c.teal;
    ctx.fillText('Double DQN (decoupled)', b2.x + 8, b2.y + 39);
  }

  /* ------------------------------------------------------------------------
     2. GAE(γ, λ) Exponential Credit Kernel & Bias²–Variance–MSE Tradeoff
     ------------------------------------------------------------------------ */
  function drawGAEDiagnostic(ctx, w, h, lambda, hoverX, c) {
    const [b1, b2] = splitBoxes(w, h);
    const gamma = 0.98;

    // Left: Effective step weight (γλ)^l
    drawAxes(ctx, b1, c, 'horizon lag l (0→35)', 'weight (γλ)ˡ');
    plotCurve(ctx, b1, 0, 35, 0, 1.05, l => Math.pow(gamma, l), c.steel, 1.25, [4, 3]);
    plotCurve(ctx, b1, 0, 35, 0, 1.05, l => Math.pow(gamma * Math.max(0.001, lambda), l), c.teal, 2.1);

    ctx.font = '9.5px "JetBrains Mono", monospace';
    ctx.fillStyle = c.teal;
    ctx.fillText(`GAE (γλ)ˡ, λ=${lambda.toFixed(2)}`, b1.x + b1.w - 118, b1.y + 24);
    ctx.fillStyle = c.steel;
    ctx.fillText('MC (λ=1)', b1.x + b1.w - 118, b1.y + 37);

    // Right: Bias² + Variance = Total MSE across λ ∈ [0, 1]
    drawAxes(ctx, b2, c, 'trace parameter λ (0→1)', 'error');
    const biasSq = lam => 0.72 * Math.pow(1 - lam, 2.1);
    const variance = lam => 0.06 + 0.76 * Math.pow(lam, 4.6);
    const mse = lam => biasSq(lam) + variance(lam);

    plotCurve(ctx, b2, 0, 1, 0, 1.0, biasSq, c.steel, 1.4, [4, 3]);
    plotCurve(ctx, b2, 0, 1, 0, 1.0, variance, c.amber, 1.4, [3, 3]);
    plotCurve(ctx, b2, 0, 1, 0, 1.0, mse, c.teal, 2.1);

    // Active λ cursor marker
    const lx = b2.x + lambda * b2.w;
    const ly = b2.y + b2.h - Math.min(1, mse(lambda)) * b2.h;
    ctx.strokeStyle = c.axis;
    ctx.beginPath();
    ctx.moveTo(lx, b2.y);
    ctx.lineTo(lx, b2.y + b2.h);
    ctx.stroke();

    ctx.fillStyle = c.teal;
    ctx.beginPath();
    ctx.arc(lx, ly, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '9.5px "JetBrains Mono", monospace';
    ctx.fillStyle = c.teal;
    ctx.fillText(`MSE=${mse(lambda).toFixed(2)}`, b2.x + 8, b2.y + 25);
    ctx.fillStyle = c.steel;
    ctx.fillText('Bias²', b2.x + 8, b2.y + 38);
    ctx.fillStyle = c.amber;
    ctx.fillText('Var', b2.x + 48, b2.y + 38);
  }

  /* ------------------------------------------------------------------------
     3. PPO / GRPO Clipped Surrogate vs KL-Regularized Trust Region
     ------------------------------------------------------------------------ */
  function drawTrustRegionDiagnostic(ctx, w, h, eps, hoverX, c) {
    const box = { x: 40, y: 16, w: w - 58, h: h - 38 };
    const rMin = 0.25;
    const rMax = 1.95;
    const yMin = -1.95;
    const yMax = 1.65;

    const toX = r => box.x + ((r - rMin) / (rMax - rMin)) * box.w;
    const toY = y => box.y + box.h - ((y - yMin) / (yMax - yMin)) * box.h;

    // Shaded [1 - ε, 1 + ε] proximal trust band
    const xLo = toX(1 - eps);
    const xHi = toX(1 + eps);
    ctx.fillStyle = c.tealFill;
    ctx.fillRect(xLo, box.y, xHi - xLo, box.h);

    drawAxes(ctx, box, c, 'ratio ρ = πθ / π_old (0.25→1.95)', 'surrogate L(ρ)');

    // Reference lines ρ = 1 and L = 0
    ctx.strokeStyle = c.axis;
    ctx.beginPath();
    ctx.moveTo(toX(1), box.y);
    ctx.lineTo(toX(1), box.y + box.h);
    ctx.moveTo(box.x, toY(0));
    ctx.lineTo(box.x + box.w, toY(0));
    ctx.stroke();

    const clip = r => Math.max(1 - eps, Math.min(1 + eps, r));
    const lPos = r => Math.min(r * 1.0, clip(r) * 1.0);
    const lNeg = r => Math.min(-r * 1.0, -clip(r) * 1.0);
    const lKL = r => r - 0.55 * (r * Math.log(r) - r + 1);

    plotCurve(ctx, box, rMin, rMax, yMin, yMax, r => r, c.muted, 1.0, [2, 4]);
    plotCurve(ctx, box, rMin, rMax, yMin, yMax, lKL, c.steel, 1.5, [5, 3]);
    plotCurve(ctx, box, rMin, rMax, yMin, yMax, lPos, c.teal, 2.3);
    plotCurve(ctx, box, rMin, rMax, yMin, yMax, lNeg, c.amber, 2.1);

    ctx.font = '9.5px "JetBrains Mono", monospace';
    ctx.fillStyle = c.teal;
    ctx.fillText(`L^CLIP (Â=+1), flat ρ>${(1 + eps).toFixed(2)}`, box.x + 10, box.y + 24);
    ctx.fillStyle = c.amber;
    ctx.fillText(`L^CLIP (Â=-1), flat ρ<${(1 - eps).toFixed(2)}`, box.x + 10, box.y + 37);
    ctx.fillStyle = c.steel;
    ctx.fillText('ρÂ − β D_KL(π_old‖πθ)', box.x + 10, box.y + 50);

    if (hoverX !== null && hoverX >= box.x && hoverX <= box.x + box.w) {
      const r = rMin + ((hoverX - box.x) / box.w) * (rMax - rMin);
      ctx.strokeStyle = c.ink;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(hoverX, box.y);
      ctx.lineTo(hoverX, box.y + box.h);
      ctx.stroke();
      ctx.fillStyle = c.ink;
      ctx.fillText(
        `ρ=${r.toFixed(2)} · L+=${lPos(r).toFixed(2)} · L-=${lNeg(r).toFixed(2)}`,
        box.x + box.w - 225,
        box.y + 14
      );
    }
  }

  /* ------------------------------------------------------------------------
     4. Categorical Distributional Bellman (C51) & MaxEnt Policy Tilt
     ------------------------------------------------------------------------ */
  function drawDistMaxEntDiagnostic(ctx, w, h, tau, hoverX, c) {
    const [b1, b2] = splitBoxes(w, h);

    // Left: Exact 21-atom C51 Cramér projection Φ T^π Z
    drawAxes(ctx, b1, c, 'return atoms z_j ∈ [-2, +4]', 'P(Z = z_j)');
    const M = 21;
    const vMin = -2.0;
    const vMax = 4.0;
    const dz = (vMax - vMin) / (M - 1);
    const atoms = Array.from({ length: M }, (_, j) => vMin + j * dz);

    // Bimodal prior return distribution p(z)
    let rawPrior = atoms.map(
      z => 0.42 * Math.exp(-((z + 0.65) ** 2) / 0.32) + 0.58 * Math.exp(-((z - 1.55) ** 2) / 0.38)
    );
    const sumP = rawPrior.reduce((a, b) => a + b, 0);
    const prior = rawPrior.map(p => p / sumP);

    // Exact Categorical Bellman Projection Φ(r + γZ) with r = 0.72, γ = 0.82
    const rStep = 0.72;
    const gamma = 0.82;
    const proj = new Float64Array(M);
    for (let i = 0; i < M; i++) {
      const tz = Math.max(vMin, Math.min(vMax, rStep + gamma * atoms[i]));
      const bIdx = (tz - vMin) / dz;
      const lo = Math.floor(bIdx);
      const hi = Math.min(M - 1, Math.ceil(bIdx));
      if (lo === hi) {
        proj[lo] += prior[i];
      } else {
        proj[lo] += prior[i] * (hi - bIdx);
        proj[hi] += prior[i] * (bIdx - lo);
      }
    }

    const barW = (b1.w - 14) / M;
    const pScale = 0.28;
    for (let j = 0; j < M; j++) {
      const bx = b1.x + 7 + j * barW;
      const hPrior = Math.min(b1.h - 14, (prior[j] / pScale) * (b1.h - 16));
      const hProj = Math.min(b1.h - 14, (proj[j] / pScale) * (b1.h - 16));

      ctx.strokeStyle = c.steel;
      ctx.lineWidth = 1;
      ctx.strokeRect(bx + 1, b1.y + b1.h - hPrior, barW - 3, hPrior);

      ctx.fillStyle = c.teal;
      ctx.globalAlpha = 0.72;
      ctx.fillRect(bx + 2, b1.y + b1.h - hProj, barW - 4, hProj);
      ctx.globalAlpha = 1;
    }
    ctx.font = '9.5px "JetBrains Mono", monospace';
    ctx.fillStyle = c.steel;
    ctx.fillText('Z(s′,a*)', b1.x + 8, b1.y + 24);
    ctx.fillStyle = c.teal;
    ctx.fillText('Φ𝒯^πZ (projected)', b1.x + 68, b1.y + 24);

    // Right: Variational MaxEnt Tilt q*(a) ∝ π_ref(a) exp(Q(a)/τ)
    drawAxes(ctx, b2, c, 'continuous action a ∈ [-2, 2]', 'density q*(a)');
    const piRef = a => 0.55 * Math.exp(-((a + 0.65) ** 2) / 0.55) + 0.45 * Math.exp(-((a - 0.75) ** 2) / 0.55);
    const qFunc = a => 0.85 * Math.exp(-((a - 0.82) ** 2) / 0.28) + 0.35 * Math.exp(-((a + 0.7) ** 2) / 0.35);

    // Numerical normalization of q*(a)
    let Znorm = 0;
    const G = 100;
    for (let i = 0; i <= G; i++) {
      const a = -2 + (4 * i) / G;
      Znorm += piRef(a) * Math.exp(qFunc(a) / tau) * (4 / G);
    }
    const qTilt = a => (piRef(a) * Math.exp(qFunc(a) / tau)) / Math.max(1e-8, Znorm);

    plotCurve(ctx, b2, -2, 2, 0, 1.9, piRef, c.steel, 1.35, [4, 3]);
    plotCurve(ctx, b2, -2, 2, 0, 1.9, qFunc, c.amber, 1.35, [2, 3]);
    plotCurve(ctx, b2, -2, 2, 0, 1.9, qTilt, c.teal, 2.15);

    ctx.fillStyle = c.teal;
    ctx.fillText(`q*(a) ∝ π_ref·exp(Q/τ)`, b2.x + 8, b2.y + 24);
    ctx.fillStyle = c.steel;
    ctx.fillText('π_ref', b2.x + 8, b2.y + 37);
    ctx.fillStyle = c.amber;
    ctx.fillText('Q(s,a)', b2.x + 52, b2.y + 37);
  }

  /* ------------------------------------------------------------------------
     5. Latent Flow Steering Gψ(s, z) vs Unconstrained OOD Action Ascent
     ------------------------------------------------------------------------ */
  function drawFlowSteeringDiagnostic(ctx, w, h, alpha, hoverX, c) {
    const [b1, b2] = splitBoxes(w, h);

    // Left: 2D Action Space (a1, a2) ∈ [-1.4, 1.4]^2
    drawAxes(ctx, b1, c, 'action a₁', 'a₂');
    const toAx = a1 => b1.x + ((a1 + 1.4) / 2.8) * b1.w;
    const toAy = a2 => b1.y + b1.h - ((a2 + 1.4) / 2.8) * b1.h;

    // Generator manifold G_psi(z) = (z, 0.52 sin(1.9 z) - 0.22), z ∈ [-1, 1]
    const Gpsi = z => [z * 1.05, 0.52 * Math.sin(1.9 * z) - 0.22];

    // Draw support tube supp(π_β)
    ctx.save();
    ctx.beginPath();
    for (let k = 0; k <= 60; k++) {
      const z = -1 + (2 * k) / 60;
      const [a1, a2] = Gpsi(z);
      if (k === 0) ctx.moveTo(toAx(a1), toAy(a2));
      else ctx.lineTo(toAx(a1), toAy(a2));
    }
    ctx.strokeStyle = c.tealFill;
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.strokeStyle = c.steel;
    ctx.lineWidth = 1.3;
    ctx.setLineDash([4, 3]);
    ctx.stroke();
    ctx.restore();

    // OOD Critic Hallucination Zone at (-0.25, +0.88)
    const oodX = toAx(-0.25);
    const oodY = toAy(0.88);
    [10, 20, 30].forEach(rad => {
      ctx.beginPath();
      ctx.arc(oodX, oodY, rad, 0, Math.PI * 2);
      ctx.strokeStyle = c.amberFill;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    });

    // Unconstrained ∇_a Q trajectory drifting off-manifold into OOD hallucination
    ctx.beginPath();
    const steps = Math.max(2, Math.round(alpha * 40));
    let ua1 = -0.65;
    let ua2 = 0.52 * Math.sin(-1.9 * 0.62) - 0.22;
    ctx.moveTo(toAx(ua1), toAy(ua2));
    for (let s = 1; s <= steps; s++) {
      ua1 += (-0.25 - ua1) * 0.085;
      ua2 += (0.88 - ua2) * 0.085;
      ctx.lineTo(toAx(ua1), toAy(ua2));
    }
    ctx.strokeStyle = c.amber;
    ctx.lineWidth = 1.9;
    ctx.stroke();

    // Latent Policy Steering z_k ∈ [-1, 1] climbing along G_psi(z) to true optimum z* = +0.84
    ctx.beginPath();
    for (let s = 0; s <= steps; s++) {
      const u = (s / 40);
      const z = -0.62 + (0.84 - (-0.62)) * (1 - Math.exp(-3.4 * u));
      const [la1, la2] = Gpsi(Math.max(-1, Math.min(1, z)));
      if (s === 0) ctx.moveTo(toAx(la1), toAy(la2));
      else ctx.lineTo(toAx(la1), toAy(la2));
    }
    ctx.strokeStyle = c.teal;
    ctx.lineWidth = 2.3;
    ctx.stroke();

    ctx.font = '9.5px "JetBrains Mono", monospace';
    ctx.fillStyle = c.amber;
    ctx.fillText('OOD Q̂ trap', oodX - 28, oodY - 12);
    ctx.fillStyle = c.teal;
    ctx.fillText('LPS Gψ(s, μθ(s)) ∈ supp(πβ)', b1.x + 6, b1.y + b1.h - 7);

    // Right: True Return J(π) vs Hallucinated Critic along steering horizon
    drawAxes(ctx, b2, c, 'optimization progress (0→1)', 'true return J(π)');
    plotCurve(ctx, b2, 0, 1, -0.4, 1.1, t => 0.15 + 0.78 * (1 - Math.exp(-3.6 * t)), c.teal, 2.15);
    plotCurve(ctx, b2, 0, 1, -0.4, 1.1, t => 0.15 + 0.45 * t - 1.15 * t * t, c.amber, 1.9);
    plotCurve(ctx, b2, 0, 1, -0.4, 1.1, t => 0.15 + 0.88 * t, c.amber, 1.2, [3, 3]);

    const curX = b2.x + alpha * b2.w;
    ctx.strokeStyle = c.axis;
    ctx.beginPath();
    ctx.moveTo(curX, b2.y);
    ctx.lineTo(curX, b2.y + b2.h);
    ctx.stroke();

    ctx.fillStyle = c.teal;
    ctx.fillText('LPS true return', b2.x + 8, b2.y + 24);
    ctx.fillStyle = c.amber;
    ctx.fillText('Unconstrained true / Q̂ (dashed)', b2.x + 8, b2.y + 37);
  }

  /* ------------------------------------------------------------------------
     6. NOPO Reference-Relative Negative Weight & VEPO Effective Entropy
     ------------------------------------------------------------------------ */
  function drawFrontier2026Diagnostic(ctx, w, h, beta, hoverX, c) {
    const [b1, b2] = splitBoxes(w, h);

    // Left: NOPO negative suppression gradient weight σ(β Δ) vs log(πθ / π_ref)
    drawAxes(ctx, b1, c, 'Δ = log(πθ / π_ref) ∈ [-4, +3]', 'neg. grad weight');
    const sigmoid = x => 1 / (1 + Math.exp(-x));
    plotCurve(ctx, b1, -4, 3, 0, 1.15, () => 1.0, c.amber, 1.35, [4, 3]);
    plotCurve(ctx, b1, -4, 3, 0, 1.15, d => sigmoid(beta * d), c.teal, 2.2);

    // Δ = 0 reference line (πθ = π_ref)
    const xZero = b1.x + (4 / 7) * b1.w;
    ctx.strokeStyle = c.axis;
    ctx.beginPath();
    ctx.moveTo(xZero, b1.y);
    ctx.lineTo(xZero, b1.y + b1.h);
    ctx.stroke();

    ctx.font = '9.5px "JetBrains Mono", monospace';
    ctx.fillStyle = c.teal;
    ctx.fillText(`NOPO σ(βΔ), β=${beta.toFixed(2)}`, b1.x + 8, b1.y + 24);
    ctx.fillStyle = c.amber;
    ctx.fillText('Unattenuated (collapses)', b1.x + 8, b1.y + 37);

    // Right: VEPO Effective Entropy H_eff = S_topk * (1 - H_topk / log k)
    drawAxes(ctx, b2, c, 'norm. top-k entropy H_k/log k', 'H_eff');
    plotCurve(ctx, b2, 0, 1, 0, 1.05, hNorm => 0.95 * (1 - hNorm), c.teal, 2.05);
    plotCurve(ctx, b2, 0, 1, 0, 1.05, hNorm => 0.62 * (1 - hNorm), c.steel, 1.65);
    plotCurve(ctx, b2, 0, 1, 0, 1.05, hNorm => 0.30 * (1 - hNorm), c.amber, 1.45, [4, 3]);

    ctx.fillStyle = c.teal;
    ctx.fillText('S_top-k = 0.95 (focused)', b2.x + 8, b2.y + 24);
    ctx.fillStyle = c.steel;
    ctx.fillText('S_top-k = 0.62', b2.x + 8, b2.y + 37);
    ctx.fillStyle = c.amber;
    ctx.fillText('S_top-k = 0.30 (tail noise)', b2.x + 8, b2.y + 50);
  }

  function mountEquationLab(container, equationId) {
    const cfg = CONFIGS[equationId];
    if (!cfg || !container) return;

    const wrap = document.createElement('div');
    wrap.className = 'equation-lab';

    const bar = document.createElement('div');
    bar.className = 'equation-lab-bar';

    const title = document.createElement('span');
    title.className = 'equation-lab-title';
    title.textContent = cfg.caption;

    const sliderWrap = document.createElement('label');
    sliderWrap.className = 'equation-slider-wrap';
    sliderWrap.htmlFor = `eq-slider-${equationId}`;
    sliderWrap.append(document.createTextNode(cfg.paramLabel));

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.className = 'sci-slider';
    slider.id = `eq-slider-${equationId}`;
    slider.min = String(cfg.min);
    slider.max = String(cfg.max);
    slider.step = String(cfg.step);
    slider.value = String(paramState[equationId]);

    const out = document.createElement('output');
    out.id = `eq-output-${equationId}`;
    out.textContent = cfg.format(paramState[equationId]);

    sliderWrap.append(slider, out);
    bar.append(title, sliderWrap);

    const canvas = document.createElement('canvas');
    canvas.className = 'equation-plot-canvas';
    canvas.id = `eq-canvas-${equationId}`;
    canvas.setAttribute('aria-label', cfg.caption);

    wrap.append(bar, canvas);
    container.append(wrap);

    const ctx = canvas.getContext('2d');
    let hoverX = null;

    function renderPlot() {
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(260, rect.width || 620);
      const h = Math.max(170, rect.height || 214);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const c = palette();
      const val = paramState[equationId];
      if (equationId === 'bellman') drawBellmanDiagnostic(ctx, w, h, val, hoverX, c);
      else if (equationId === 'pg-gae') drawGAEDiagnostic(ctx, w, h, val, hoverX, c);
      else if (equationId === 'trust-grpo') drawTrustRegionDiagnostic(ctx, w, h, val, hoverX, c);
      else if (equationId === 'dist-maxent') drawDistMaxEntDiagnostic(ctx, w, h, val, hoverX, c);
      else if (equationId === 'flow-steering') drawFlowSteeringDiagnostic(ctx, w, h, val, hoverX, c);
      else drawFrontier2026Diagnostic(ctx, w, h, val, hoverX, c);
    }

    slider.addEventListener('input', () => {
      const v = Number(slider.value);
      paramState[equationId] = v;
      out.textContent = cfg.format(v);
      renderPlot();
    });

    canvas.addEventListener('pointermove', ev => {
      const r = canvas.getBoundingClientRect();
      hoverX = ev.clientX - r.left;
      renderPlot();
    });

    canvas.addEventListener('pointerleave', () => {
      hoverX = null;
      renderPlot();
    });

    const ro = new ResizeObserver(renderPlot);
    ro.observe(canvas);
    requestAnimationFrame(renderPlot);

    window.RLEquationPlotActive = { redraw: renderPlot };
  }

  window.RLEquationPlots = {
    mountEquationLab
  };
})();
