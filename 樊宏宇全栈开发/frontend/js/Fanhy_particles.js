/**
 * 姓名：樊宏宇 | 学号：24001010618 | 时间：2026-11-19 | 大模型：Tencent Hunyuan Hy
 * 星空粒子 + 光轨引擎：鼠标交互连线、流星拖尾，纯原生 Canvas。
 * 所有变量 / 函数均以 Fanhy_ 开头。
 */
(function () {
  'use strict';

  var Fanhy_canvas = document.getElementById('Fanhy_particleCanvas');
  if (!Fanhy_canvas) { return; }
  var Fanhy_ctx = Fanhy_canvas.getContext('2d');
  var Fanhy_width = 0;
  var Fanhy_height = 0;
  var Fanhy_dpr = window.devicePixelRatio || 1;
  var Fanhy_particles = [];
  var Fanhy_shootingStars = [];
  var Fanhy_mouse = { x: -1000, y: -1000, active: false };
  var Fanhy_reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var Fanhy_palette = ['#4de3ff', '#9b6bff', '#ff5fa2', '#f7d488', '#ffffff'];

  function Fanhy_resize() {
    Fanhy_width = window.innerWidth;
    Fanhy_height = window.innerHeight;
    Fanhy_canvas.width = Fanhy_width * Fanhy_dpr;
    Fanhy_canvas.height = Fanhy_height * Fanhy_dpr;
    Fanhy_ctx.setTransform(Fanhy_dpr, 0, 0, Fanhy_dpr, 0, 0);
    Fanhy_initParticles();
  }

  function Fanhy_initParticles() {
    var Fanhy_count = Math.min(140, Math.floor((Fanhy_width * Fanhy_height) / 12000));
    Fanhy_particles = [];
    for (var Fanhy_i = 0; Fanhy_i < Fanhy_count; Fanhy_i++) {
      Fanhy_particles.push({
        x: Math.random() * Fanhy_width,
        y: Math.random() * Fanhy_height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
        color: Fanhy_palette[Math.floor(Math.random() * Fanhy_palette.length)],
        phase: Math.random() * Math.PI * 2,
        twinkle: Math.random() * 0.02 + 0.008
      });
    }
  }

  function Fanhy_spawnShootingStar() {
    if (Fanhy_reduced) { return; }
    var Fanhy_fromLeft = Math.random() > 0.5;
    Fanhy_shootingStars.push({
      x: Fanhy_fromLeft ? -100 : Fanhy_width + 100,
      y: Math.random() * Fanhy_height * 0.55,
      vx: Fanhy_fromLeft ? (Math.random() * 3 + 5) : -(Math.random() * 3 + 5),
      vy: Math.random() * 2 + 1.5,
      life: 1,
      color: Math.random() > 0.5 ? '#4de3ff' : '#ffffff'
    });
  }

  function Fanhy_draw() {
    Fanhy_ctx.clearRect(0, 0, Fanhy_width, Fanhy_height);

    var Fanhy_i, Fanhy_j, Fanhy_p, Fanhy_q, Fanhy_dist, Fanhy_maxDist = 130;

    // 粒子之间的连线（形成星座光网）
    for (Fanhy_i = 0; Fanhy_i < Fanhy_particles.length; Fanhy_i++) {
      Fanhy_p = Fanhy_particles[Fanhy_i];
      for (Fanhy_j = Fanhy_i + 1; Fanhy_j < Fanhy_particles.length; Fanhy_j++) {
        Fanhy_q = Fanhy_particles[Fanhy_j];
        var Fanhy_dx = Fanhy_p.x - Fanhy_q.x;
        var Fanhy_dy = Fanhy_p.y - Fanhy_q.y;
        Fanhy_dist = Math.sqrt(Fanhy_dx * Fanhy_dx + Fanhy_dy * Fanhy_dy);
        if (Fanhy_dist < Fanhy_maxDist) {
          var Fanhy_alpha = (1 - Fanhy_dist / Fanhy_maxDist) * 0.22;
          Fanhy_ctx.strokeStyle = 'rgba(140,170,255,' + Fanhy_alpha + ')';
          Fanhy_ctx.lineWidth = 0.6;
          Fanhy_ctx.beginPath();
          Fanhy_ctx.moveTo(Fanhy_p.x, Fanhy_p.y);
          Fanhy_ctx.lineTo(Fanhy_q.x, Fanhy_q.y);
          Fanhy_ctx.stroke();
        }
      }

      // 鼠标与粒子的光轨连线
      if (Fanhy_mouse.active) {
        var Fanhy_mdx = Fanhy_p.x - Fanhy_mouse.x;
        var Fanhy_mdy = Fanhy_p.y - Fanhy_mouse.y;
        var Fanhy_mdist = Math.sqrt(Fanhy_mdx * Fanhy_mdx + Fanhy_mdy * Fanhy_mdy);
        if (Fanhy_mdist < 190) {
          var Fanhy_ma = (1 - Fanhy_mdist / 190) * 0.55;
          Fanhy_ctx.strokeStyle = 'rgba(77,227,255,' + Fanhy_ma + ')';
          Fanhy_ctx.lineWidth = 1;
          Fanhy_ctx.beginPath();
          Fanhy_ctx.moveTo(Fanhy_p.x, Fanhy_p.y);
          Fanhy_ctx.lineTo(Fanhy_mouse.x, Fanhy_mouse.y);
          Fanhy_ctx.stroke();
        }
      }
    }

    // 绘制粒子本身（带闪烁）
    for (Fanhy_i = 0; Fanhy_i < Fanhy_particles.length; Fanhy_i++) {
      Fanhy_p = Fanhy_particles[Fanhy_i];
      Fanhy_p.x += Fanhy_p.vx;
      Fanhy_p.y += Fanhy_p.vy;
      Fanhy_p.phase += Fanhy_p.twinkle;
      if (Fanhy_p.x < -10) Fanhy_p.x = Fanhy_width + 10;
      if (Fanhy_p.x > Fanhy_width + 10) Fanhy_p.x = -10;
      if (Fanhy_p.y < -10) Fanhy_p.y = Fanhy_height + 10;
      if (Fanhy_p.y > Fanhy_height + 10) Fanhy_p.y = -10;

      var Fanhy_tw = 0.55 + Math.sin(Fanhy_p.phase) * 0.35;
      Fanhy_ctx.globalAlpha = Math.max(0.2, Fanhy_tw);
      Fanhy_ctx.fillStyle = Fanhy_p.color;
      Fanhy_ctx.shadowBlur = 12;
      Fanhy_ctx.shadowColor = Fanhy_p.color;
      Fanhy_ctx.beginPath();
      Fanhy_ctx.arc(Fanhy_p.x, Fanhy_p.y, Fanhy_p.r, 0, Math.PI * 2);
      Fanhy_ctx.fill();
    }
    Fanhy_ctx.globalAlpha = 1;
    Fanhy_ctx.shadowBlur = 0;

    // 流星拖尾
    for (Fanhy_i = Fanhy_shootingStars.length - 1; Fanhy_i >= 0; Fanhy_i--) {
      var Fanhy_s = Fanhy_shootingStars[Fanhy_i];
      Fanhy_s.x += Fanhy_s.vx;
      Fanhy_s.y += Fanhy_s.vy;
      Fanhy_s.life -= 0.008;
      var Fanhy_tailX = Fanhy_s.x - Fanhy_s.vx * 18;
      var Fanhy_tailY = Fanhy_s.y - Fanhy_s.vy * 18;
      var Fanhy_grad = Fanhy_ctx.createLinearGradient(Fanhy_s.x, Fanhy_s.y, Fanhy_tailX, Fanhy_tailY);
      Fanhy_grad.addColorStop(0, 'rgba(255,255,255,' + Math.max(0, Fanhy_s.life) + ')');
      Fanhy_grad.addColorStop(1, 'rgba(255,255,255,0)');
      Fanhy_ctx.strokeStyle = Fanhy_grad;
      Fanhy_ctx.lineWidth = 2;
      Fanhy_ctx.lineCap = 'round';
      Fanhy_ctx.beginPath();
      Fanhy_ctx.moveTo(Fanhy_s.x, Fanhy_s.y);
      Fanhy_ctx.lineTo(Fanhy_tailX, Fanhy_tailY);
      Fanhy_ctx.stroke();
      if (Fanhy_s.life <= 0 || Fanhy_s.x < -200 || Fanhy_s.x > Fanhy_width + 200 || Fanhy_s.y > Fanhy_height + 200) {
        Fanhy_shootingStars.splice(Fanhy_i, 1);
      }
    }

    window.requestAnimationFrame(Fanhy_draw);
  }

  window.addEventListener('resize', Fanhy_resize);
  window.addEventListener('mousemove', function (Fanhy_e) {
    Fanhy_mouse.x = Fanhy_e.clientX;
    Fanhy_mouse.y = Fanhy_e.clientY;
    Fanhy_mouse.active = true;
  });
  window.addEventListener('mouseout', function () { Fanhy_mouse.active = false; });
  window.addEventListener('touchmove', function (Fanhy_e) {
    if (Fanhy_e.touches && Fanhy_e.touches[0]) {
      Fanhy_mouse.x = Fanhy_e.touches[0].clientX;
      Fanhy_mouse.y = Fanhy_e.touches[0].clientY;
      Fanhy_mouse.active = true;
    }
  }, { passive: true });

  Fanhy_resize();
  if (!Fanhy_reduced) {
    Fanhy_draw();
    setInterval(Fanhy_spawnShootingStar, 4200);
  } else {
    Fanhy_ctx.clearRect(0, 0, Fanhy_width, Fanhy_height);
    Fanhy_initParticles();
    for (var Fanhy_k = 0; Fanhy_k < Fanhy_particles.length; Fanhy_k++) {
      var Fanhy_sp = Fanhy_particles[Fanhy_k];
      Fanhy_ctx.fillStyle = Fanhy_sp.color;
      Fanhy_ctx.beginPath();
      Fanhy_ctx.arc(Fanhy_sp.x, Fanhy_sp.y, Fanhy_sp.r, 0, Math.PI * 2);
      Fanhy_ctx.fill();
    }
  }
})();
