/*
 * silhouette.js — a 2D toy of the paper's silhouette loss (Eqs. 3-5).
 *
 * A fork is held by a hand. Only two slivers of the fork are visible (the object mask O);
 * the rest is behind the hand (the hand mask H). The tool is drawn at a candidate pose and
 * the loss is computed exactly as in the paper, just in 2D instead of through a camera:
 *
 *   L_cov = mean over pixels sampled from O of the distance to the nearest projected tool point
 *   L_out = mean over projected tool points of the distance to U = O ∪ H (0 inside U)
 *   L_sil = (L_cov + L_out) / W          (W = crop width)
 *
 * Usage:  const lab = SilLab(canvasElement, { mode:'both', colors:{...}, onUpdate(state){} })
 *         lab.setMode('both' | 'object' | 'hand'); lab.descend(); lab.perturb(); lab.reset();
 */
(function () {
  'use strict';
  var W = 480, H = 360, G = 2, GW = W / G, GH = H / G;
  var FORK = [[-150,-6],[-147,-9],[-60,-8],[10,-4.5],[48,-5],[62,-15],[76,-22],[150,-21],[150,-16],[100,-15.5],[100,-9.5],[150,-9],[150,-3.5],[100,-3],[100,3],[150,3.5],[150,9],[100,9.5],[100,15.5],[150,16],[150,21],[76,22],[62,15],[48,5],[10,4.5],[-60,8],[-147,9],[-150,6]];
  var GT = { x: 222, y: 168, th: 215 * Math.PI / 180 };
  var FIST = { lx: -35, rx: 80, ry: 50 };            // fist, in fork-local coordinates at the GT pose
  var ARM = { dx: -0.15, dy: 0.99, half: 38, len: 320 };
  var KNOB = 178;                                     // rotation knob, local x

  function tf(p, pose) { var c = Math.cos(pose.th), s = Math.sin(pose.th); return [pose.x + c * p[0] - s * p[1], pose.y + s * p[0] + c * p[1]]; }
  function forkPath(ctx, pose) {
    ctx.beginPath();
    for (var i = 0; i < FORK.length; i++) { var q = tf(FORK[i], pose); if (i) ctx.lineTo(q[0], q[1]); else ctx.moveTo(q[0], q[1]); }
    ctx.closePath();
  }
  function handPath(ctx) {
    var c = tf([FIST.lx, 0], GT), n = Math.hypot(ARM.dx, ARM.dy), ax = ARM.dx / n, ay = ARM.dy / n, px = -ay, py = ax;
    ctx.beginPath();
    ctx.ellipse(c[0], c[1], FIST.rx, FIST.ry, GT.th, 0, Math.PI * 2);
    ctx.closePath();
    ctx.moveTo(c[0] - px * ARM.half, c[1] - py * ARM.half);      // same winding as the ellipse, so the overlap stays filled
    ctx.lineTo(c[0] + ax * ARM.len - px * (ARM.half + 8), c[1] + ay * ARM.len - py * (ARM.half + 8));
    ctx.lineTo(c[0] + ax * ARM.len + px * (ARM.half + 8), c[1] + ay * ARM.len + py * (ARM.half + 8));
    ctx.lineTo(c[0] + px * ARM.half, c[1] + py * ARM.half);
    ctx.closePath();
  }
  function inPoly(x, y) {
    var inside = false;
    for (var i = 0, j = FORK.length - 1; i < FORK.length; j = i++) {
      var xi = FORK[i][0], yi = FORK[i][1], xj = FORK[j][0], yj = FORK[j][1];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }
  function raster(draw) {
    var c = document.createElement('canvas'); c.width = GW; c.height = GH;
    var x = c.getContext('2d', { willReadFrequently: true }); x.scale(1 / G, 1 / G); x.fillStyle = '#000'; draw(x); x.fill('nonzero');
    var d = x.getImageData(0, 0, GW, GH).data, m = new Uint8Array(GW * GH);
    for (var i = 0; i < m.length; i++) m[i] = d[i * 4 + 3] > 127 ? 1 : 0;
    return m;
  }
  // two-pass chamfer distance transform, in logical pixels (0 inside the mask)
  function distance(mask) {
    var INF = 1e6, d = new Float32Array(GW * GH), i, x, y, a = 1, b = Math.SQRT2;
    for (i = 0; i < d.length; i++) d[i] = mask[i] ? 0 : INF;
    for (y = 0; y < GH; y++) for (x = 0; x < GW; x++) {
      i = y * GW + x; var v = d[i];
      if (x > 0) v = Math.min(v, d[i - 1] + a);
      if (y > 0) { v = Math.min(v, d[i - GW] + a); if (x > 0) v = Math.min(v, d[i - GW - 1] + b); if (x < GW - 1) v = Math.min(v, d[i - GW + 1] + b); }
      d[i] = v;
    }
    for (y = GH - 1; y >= 0; y--) for (x = GW - 1; x >= 0; x--) {
      i = y * GW + x; var u = d[i];
      if (x < GW - 1) u = Math.min(u, d[i + 1] + a);
      if (y < GH - 1) { u = Math.min(u, d[i + GW] + a); if (x < GW - 1) u = Math.min(u, d[i + GW + 1] + b); if (x > 0) u = Math.min(u, d[i + GW - 1] + b); }
      d[i] = u;
    }
    for (i = 0; i < d.length; i++) d[i] *= G;
    return d;
  }
  function sampleDT(dt, x, y) {     // bilinear, x/y in logical pixels (already clamped to the crop)
    var gx = Math.min(GW - 1.001, Math.max(0, x / G - 0.5)), gy = Math.min(GH - 1.001, Math.max(0, y / G - 0.5));
    var x0 = gx | 0, y0 = gy | 0, fx = gx - x0, fy = gy - y0, i = y0 * GW + x0;
    return (dt[i] * (1 - fx) + dt[i + 1] * fx) * (1 - fy) + (dt[i + GW] * (1 - fx) + dt[i + GW + 1] * fx) * fy;
  }

  // ---- static scene (shared by all instances) ----
  var scene = null;
  function build() {
    if (scene) return scene;
    var hand = raster(handPath), tool = raster(function (c) { forkPath(c, GT); });
    var obj = new Uint8Array(GW * GH), both = new Uint8Array(GW * GH), none = new Uint8Array(GW * GH), i;
    for (i = 0; i < obj.length; i++) { obj[i] = tool[i] && !hand[i] ? 1 : 0; both[i] = obj[i] || hand[i] ? 1 : 0; }
    var pts = [], x, y;                                   // P tool points (fork-local)
    for (x = -149; x <= 150; x += 5) for (y = -21; y <= 21; y += 4.2) if (inPoly(x, y)) pts.push([x, y]);
    var all = [];                                         // Q pixels sampled from O
    for (i = 0; i < obj.length; i++) if (obj[i]) all.push([((i % GW) + 0.5) * G, (((i / GW) | 0) + 0.5) * G]);
    var step = Math.max(1, Math.floor(all.length / 220)), q = [];
    for (i = 0; i < all.length; i += step) q.push(all[i]);
    scene = { hand: hand, obj: obj, pts: pts, q: q, dt: { both: distance(both), object: distance(obj), hand: distance(hand) }, none: none };
    return scene;
  }

  function loss(pose, mode) {
    var S = build(), c = Math.cos(pose.th), s = Math.sin(pose.th), n = S.pts.length, ux = new Float32Array(n), uy = new Float32Array(n), k, out = 0;
    var dt = S.dt[mode], dk = new Float32Array(n);
    for (k = 0; k < n; k++) {
      var p = S.pts[k], x = pose.x + c * p[0] - s * p[1], y = pose.y + s * p[0] + c * p[1];
      ux[k] = x; uy[k] = y;
      var cx = Math.min(W, Math.max(0, x)), cy = Math.min(H, Math.max(0, y));
      dk[k] = sampleDT(dt, cx, cy) + Math.hypot(x - cx, y - cy);
      out += dk[k];
    }
    out /= n;
    var cov = 0, near = null;
    if (mode !== 'hand') {
      near = new Int16Array(S.q.length);
      for (var j = 0; j < S.q.length; j++) {
        var qx = S.q[j][0], qy = S.q[j][1], best = 1e12, bi = 0;
        for (k = 0; k < n; k++) { var d2 = (qx - ux[k]) * (qx - ux[k]) + (qy - uy[k]) * (qy - uy[k]); if (d2 < best) { best = d2; bi = k; } }
        cov += Math.sqrt(best); near[j] = bi;
      }
      cov /= S.q.length;
    }
    return { cov: cov / W, out: out / W, sil: (cov + out) / W, raw: cov + out, ux: ux, uy: uy, dk: dk, near: near };
  }

  var DEF = { bg: '#ffffff', hand: '#f08a1c', obj: '#e0409a', pred: '#2b8fd6', bad: '#e5322d', gt: '#e0409a', off: '#9a9a9a', knob: '#2b8fd6', frame: 'rgba(0,0,0,.18)' };

  window.SilLab = function (canvas, opts) {
    opts = opts || {};
    var S = build(), col = Object.assign({}, DEF, opts.colors || {}), mode = opts.mode || 'both';
    var START = { x: GT.x + 30, y: GT.y + 40, th: GT.th + 28 * Math.PI / 180 };
    var pose = opts.start === 'gt' ? { x: GT.x, y: GT.y, th: GT.th } : Object.assign({}, START);
    var showAnswer = !!opts.showAnswer, interactive = opts.interactive !== false, raf = 0, drag = null, scale = 1, dpr = 1, touched = false;
    var ctx = canvas.getContext('2d');
    canvas.style.touchAction = 'none';
    if (interactive) { canvas.tabIndex = 0; canvas.setAttribute('role', 'application'); canvas.setAttribute('aria-label', 'Silhouette loss playground: drag the fork to move it, drag the round knob to rotate it. Arrow keys move, Q and E rotate.'); }

    function layer(paint) {              // offscreen layer in logical coordinates at 2x
      var c = document.createElement('canvas'); c.width = W * 2; c.height = H * 2; var x = c.getContext('2d'); x.scale(2, 2); paint(x); return c;
    }
    var objLayers = {};
    function objLayer(color) {
      if (objLayers[color]) return objLayers[color];
      return (objLayers[color] = layer(function (x) {
        forkPath(x, GT); x.globalAlpha = 0.55; x.fillStyle = color; x.fill(); x.globalAlpha = 1; x.lineWidth = 2.5; x.strokeStyle = color; x.lineJoin = 'round'; x.stroke();
        x.globalCompositeOperation = 'destination-out'; handPath(x); x.fillStyle = '#000'; x.fill('nonzero'); x.lineWidth = 1; x.stroke();
      }));
    }

    var handLayers = {};
    function handLayer(color, off) {     // union outline of fist + forearm, light fill, finger hints
      var key = color + (off ? '-off' : '');
      if (handLayers[key]) return handLayers[key];
      return (handLayers[key] = layer(function (x) {
        handPath(x); x.lineWidth = 5; x.strokeStyle = color; if (off) x.setLineDash([6, 5]); x.stroke(); x.setLineDash([]);
        x.globalCompositeOperation = 'destination-out'; x.fillStyle = '#000'; x.fill('nonzero');
        x.globalCompositeOperation = 'source-over'; x.globalAlpha = off ? 0.08 : 0.2; x.fillStyle = color; x.fill('nonzero');
        x.globalAlpha = off ? 0.25 : 0.45; x.lineWidth = 1.5; x.lineCap = 'round'; x.strokeStyle = color;
        [-38, 0, 38].forEach(function (dx) { var a = tf([FIST.lx + dx, -FIST.ry * 0.78], GT), b = tf([FIST.lx + dx * 0.9, -4], GT); x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke(); });
      }));
    }
    function draw() {
      var L = loss(pose, mode), k;
      ctx.setTransform(scale * dpr, 0, 0, scale * dpr, 0, 0);
      ctx.clearRect(0, 0, W, H); ctx.fillStyle = col.bg; ctx.fillRect(0, 0, W, H);
      // hand mask
      var handOn = mode !== 'object', objOn = mode !== 'hand';
      ctx.globalAlpha = handOn ? 1 : 0.6; ctx.drawImage(handLayer(handOn ? col.hand : col.off, !handOn), 0, 0, W, H); ctx.globalAlpha = 1;
      // visible object mask
      ctx.globalAlpha = objOn ? 1 : 0.4; ctx.drawImage(objLayer(objOn ? col.obj : col.off), 0, 0, W, H); ctx.globalAlpha = 1;
      // answer ghost
      if (showAnswer) { forkPath(ctx, GT); ctx.setLineDash([4, 4]); ctx.lineWidth = 1.5; ctx.strokeStyle = col.gt; ctx.stroke(); ctx.setLineDash([]); }
      // pulls from uncovered object pixels to the nearest tool point (L_cov)
      if (L.near) {
        ctx.strokeStyle = col.obj; ctx.lineWidth = 1; ctx.globalAlpha = 0.5; ctx.beginPath();
        for (var j = 0; j < S.q.length; j += 3) { var kk = L.near[j], d = Math.hypot(S.q[j][0] - L.ux[kk], S.q[j][1] - L.uy[kk]); if (d > 5) { ctx.moveTo(S.q[j][0], S.q[j][1]); ctx.lineTo(L.ux[kk], L.uy[kk]); } }
        ctx.stroke(); ctx.globalAlpha = 1;
      }
      // candidate tool
      forkPath(ctx, pose); ctx.fillStyle = col.pred; ctx.globalAlpha = 0.13; ctx.fill(); ctx.globalAlpha = 1; ctx.lineWidth = 2; ctx.strokeStyle = col.pred; ctx.lineJoin = 'round'; ctx.stroke();
      // projected points: inside U (quiet) vs outside U (penalised by L_out)
      for (k = 0; k < L.ux.length; k++) {
        var bad = L.dk[k] > 1.2;
        ctx.beginPath(); ctx.arc(L.ux[k], L.uy[k], bad ? 2.3 : 1.2, 0, 6.3); ctx.fillStyle = bad ? col.bad : col.pred; ctx.globalAlpha = bad ? 0.95 : 0.55; ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (interactive) {                 // rotation knob
        var a = tf([150, 0], pose), b = tf([KNOB, 0], pose);
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.strokeStyle = col.knob; ctx.lineWidth = 1.5; ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([]);
        ctx.beginPath(); ctx.arc(b[0], b[1], 9, 0, 6.3); ctx.fillStyle = col.bg; ctx.fill(); ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.arc(b[0], b[1], 4.2, 0.6, 5.2); ctx.lineWidth = 1.5; ctx.stroke();
      }
      ctx.strokeStyle = col.frame; ctx.lineWidth = 1; ctx.strokeRect(0.5, 0.5, W - 1, H - 1);
      if (opts.onUpdate) {
        var dth = ((pose.th - GT.th) * 180 / Math.PI) % 360; if (dth > 180) dth -= 360; if (dth < -180) dth += 360;
        var nb = 0; for (k = 0; k < L.dk.length; k++) if (L.dk[k] > 1.2) nb++;
        opts.onUpdate({ mode: mode, cov: L.cov, out: L.out, sil: L.sil, rotErr: Math.abs(dth), transErr: Math.hypot(pose.x - GT.x, pose.y - GT.y), outsideFrac: nb / L.dk.length, running: !!raf, touched: touched });
      }
    }

    function resize() {
      var w = canvas.clientWidth || W; dpr = Math.min(2.5, window.devicePixelRatio || 1); scale = w / W;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(w * H / W * dpr); draw();
    }
    function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }

    function descend(done) {             // gradient descent on (x, y, theta) with a numerical gradient + backtracking
      stop(); var step = 6, it = 0, LEVER = 90 * 90;
      function f(p) { return loss(p, mode).raw; }
      function tick() {
        for (var n = 0; n < 3; n++) {
          var f0 = f(pose);
          var gx = (f({ x: pose.x + 0.5, y: pose.y, th: pose.th }) - f({ x: pose.x - 0.5, y: pose.y, th: pose.th }));
          var gy = (f({ x: pose.x, y: pose.y + 0.5, th: pose.th }) - f({ x: pose.x, y: pose.y - 0.5, th: pose.th }));
          var gt = (f({ x: pose.x, y: pose.y, th: pose.th + 0.004 }) - f({ x: pose.x, y: pose.y, th: pose.th - 0.004 })) / 0.008;
          var gl = Math.hypot(gx, gy, gt / 90) || 1e-9, ok = false;
          while (step > 0.02) {
            var np = { x: pose.x - step * gx / gl, y: pose.y - step * gy / gl, th: pose.th - step * (gt / LEVER) / gl };
            if (f(np) < f0 - 1e-6) { pose = np; step *= 1.2; ok = true; break; }
            step *= 0.5;
          }
          it++;
          if (!ok || it > 400) { raf = 0; draw(); if (done) done(); return; }
        }
        raf = requestAnimationFrame(tick); draw();
      }
      raf = requestAnimationFrame(tick);
    }

    // ---- pointer + keyboard ----
    function pt(e) { var r = canvas.getBoundingClientRect(); return [(e.clientX - r.left) / scale, (e.clientY - r.top) / scale]; }
    function local(p) { var c = Math.cos(-pose.th), s = Math.sin(-pose.th), dx = p[0] - pose.x, dy = p[1] - pose.y; return [c * dx - s * dy, s * dx + c * dy]; }
    function hit(p) { var l = local(p); if (Math.hypot(l[0] - KNOB, l[1]) < 20) return 'rot'; if (l[0] > -165 && l[0] < 160 && Math.abs(l[1]) < 34) return 'move'; return null; }
    if (interactive) {
      canvas.addEventListener('pointerdown', function (e) {
        var p = pt(e), h = hit(p); if (!h) return;
        stop(); touched = true; canvas.setPointerCapture(e.pointerId); drag = { kind: h, p: p, pose: Object.assign({}, pose) }; e.preventDefault();
      });
      canvas.addEventListener('pointermove', function (e) {
        var p = pt(e);
        if (!drag) { var h = hit(p); canvas.style.cursor = h === 'rot' ? 'crosshair' : h ? 'grab' : 'default'; return; }
        if (drag.kind === 'move') { pose.x = drag.pose.x + p[0] - drag.p[0]; pose.y = drag.pose.y + p[1] - drag.p[1]; canvas.style.cursor = 'grabbing'; }
        else pose.th = Math.atan2(p[1] - pose.y, p[0] - pose.x);
        draw();
      });
      var end = function () { drag = null; };
      canvas.addEventListener('pointerup', end); canvas.addEventListener('pointercancel', end);
      canvas.addEventListener('keydown', function (e) {
        var m = { ArrowLeft: [-3, 0, 0], ArrowRight: [3, 0, 0], ArrowUp: [0, -3, 0], ArrowDown: [0, 3, 0], q: [0, 0, -0.035], e: [0, 0, 0.035] }[e.key];
        if (!m) return; stop(); touched = true; pose.x += m[0]; pose.y += m[1]; pose.th += m[2]; draw(); e.preventDefault();
      });
    }
    if (window.ResizeObserver) new ResizeObserver(resize).observe(canvas); else window.addEventListener('resize', resize);
    resize();

    return {
      setMode: function (m) { stop(); mode = m; draw(); },
      getMode: function () { return mode; },
      descend: descend,
      stop: function () { stop(); draw(); },
      reset: function () { stop(); pose = Object.assign({}, START); draw(); },
      toGT: function () { stop(); pose = { x: GT.x, y: GT.y, th: GT.th }; draw(); },
      perturb: function () { stop(); var r = Math.random; pose = { x: GT.x + (r() * 2 - 1) * 60, y: GT.y + (r() * 2 - 1) * 45, th: GT.th + (r() * 2 - 1) * 0.6 }; draw(); },
      setShowAnswer: function (v) { showAnswer = !!v; draw(); },
      setColors: function (c) { Object.assign(col, c); objLayers = {}; handLayers = {}; draw(); },
      redraw: draw
    };
  };
})();
