/**
 * 姓名：樊宏宇 | 学号：24001010618 | 时间：2026-11-19 | 大模型：Tencent Hunyuan Hy
 * 原创抽象封面图生成器（Node 脚本，生成 SVG 矢量图，无第三方依赖）
 * 运行：node Fanhy_genImages.js
 */
const fs = require('fs');
const path = require('path');

// 每张图：主色 / 辅色 / 图形主题
const Fanhy_images = [
  { file: 'news-ai',       c1: '#1b2a6b', c2: '#6d3bff', accent: '#4de3ff', motif: 'neural' },
  { file: 'news-chip',     c1: '#062b3a', c2: '#0e7c86', accent: '#5ff5d0', motif: 'circuit' },
  { file: 'news-quantum',  c1: '#241058', c2: '#7a2ec0', accent: '#c39bff', motif: 'orbit' },
  { file: 'news-space',    c1: '#040b28', c2: '#2746a8', accent: '#8fb6ff', motif: 'planet' },
  { file: 'news-harmony',  c1: '#0a2f3d', c2: '#1f8f7a', accent: '#7ff0c0', motif: 'wave' },
  { file: 'news-car',      c1: '#161a4d', c2: '#4b4fd8', accent: '#9db4ff', motif: 'road' },
  { file: 'news-6g',       c1: '#0d1b4a', c2: '#3b5fe0', accent: '#7ad9ff', motif: 'signal' },
  { file: 'news-vr',       c1: '#3a0f4a', c2: '#b23b8c', accent: '#ff9ad5', motif: 'mesh' },
  { file: 'gallery-aurora',c1: '#05203a', c2: '#0e6b6b', accent: '#6ff0c8', motif: 'aurora' },
  { file: 'gallery-kyoto', c1: '#3a0f22', c2: '#a8343c', accent: '#ff9e7a', motif: 'leaf' },
  { file: 'gallery-ocean', c1: '#02263f', c2: '#0a6e8f', accent: '#7fe4ff', motif: 'rays' },
  { file: 'gallery-desert',c1: '#1b1238', c2: '#6b3b8f', accent: '#f7d488', motif: 'stars' },
  { file: 'gallery-fjord', c1: '#062a2e', c2: '#1f7a6e', accent: '#9ff0d8', motif: 'mountain' },
  { file: 'gallery-chongqing', c1: '#2a0e1c', c2: '#a83b45', accent: '#ffcf7a', motif: 'city' },
  { file: 'gallery-alps',  c1: '#0f2a24', c2: '#4a8f5e', accent: '#c7f59a', motif: 'flower' },
  { file: 'gallery-jiangnan', c1: '#10202b', c2: '#3a6b7a', accent: '#bfe6ef', motif: 'boat' }
];

function Fanhy_motif(Fanhy_m, Fanhy_a) {
  switch (Fanhy_m) {
    case 'neural':
      return `<g stroke="${Fanhy_a}" stroke-width="1.4" fill="none" opacity="0.55">
        <path d="M120 90 L260 160 L400 90 M120 190 L260 160 L400 190 M260 160 L260 60 M260 160 L260 260"/>
        <circle cx="120" cy="90" r="7"/><circle cx="120" cy="190" r="7"/><circle cx="400" cy="90" r="7"/><circle cx="400" cy="190" r="7"/><circle cx="260" cy="160" r="10"/><circle cx="260" cy="60" r="6"/><circle cx="260" cy="260" r="6"/></g>`;
    case 'circuit':
      return `<g stroke="${Fanhy_a}" stroke-width="1.6" fill="none" opacity="0.5">
        <path d="M80 80 H200 V140 H320 M80 200 H170 V120 H400 M400 80 H300 V220 H180"/>
        <circle cx="200" cy="140" r="5" fill="${Fanhy_a}"/><circle cx="170" cy="120" r="5" fill="${Fanhy_a}"/><circle cx="300" cy="220" r="5" fill="${Fanhy_a}"/></g>`;
    case 'orbit':
      return `<g stroke="${Fanhy_a}" fill="none" opacity="0.5">
        <ellipse cx="260" cy="160" rx="180" ry="70" stroke-width="1.4" transform="rotate(-20 260 160)"/>
        <ellipse cx="260" cy="160" rx="180" ry="70" stroke-width="1.4" transform="rotate(35 260 160)"/>
        <ellipse cx="260" cy="160" rx="180" ry="70" stroke-width="1.4" transform="rotate(90 260 160)"/>
        <circle cx="260" cy="160" r="14" fill="${Fanhy_a}"/></g>`;
    case 'planet':
      return `<g opacity="0.6"><circle cx="330" cy="120" r="72" fill="${Fanhy_a}" opacity="0.18"/>
        <circle cx="330" cy="120" r="72" stroke="${Fanhy_a}" stroke-width="1.5" fill="none"/>
        <ellipse cx="330" cy="120" rx="110" ry="26" stroke="${Fanhy_a}" stroke-width="2" fill="none" transform="rotate(-18 330 120)"/></g>`;
    case 'wave':
      return `<g stroke="${Fanhy_a}" fill="none" stroke-width="1.6" opacity="0.5">
        <path d="M40 180 Q130 100 220 180 T400 180"/><path d="M40 210 Q130 130 220 210 T400 210"/><path d="M40 240 Q130 160 220 240 T400 240"/></g>`;
    case 'road':
      return `<g stroke="${Fanhy_a}" opacity="0.5"><path d="M260 60 L120 300 M260 60 L400 300" stroke-width="1.6" fill="none"/>
        <path d="M260 100 L210 200 M260 100 L310 200 M210 240 L180 300 M310 240 L340 300" stroke-width="4" stroke-dasharray="14 10"/></g>`;
    case 'signal':
      return `<g stroke="${Fanhy_a}" fill="none" stroke-width="2" opacity="0.5">
        <circle cx="260" cy="220" r="16" fill="${Fanhy_a}"/>
        <path d="M220 190 A60 60 0 0 1 300 190"/><path d="M195 165 A95 95 0 0 1 325 165"/><path d="M170 140 A130 130 0 0 1 350 140"/></g>`;
    case 'mesh':
      return `<g stroke="${Fanhy_a}" fill="none" stroke-width="1" opacity="0.45">
        <path d="M80 60 L440 60 M80 110 L440 110 M80 160 L440 160 M80 210 L440 210 M80 260 L440 260"/>
        <path d="M80 60 L80 260 M140 60 L140 260 M200 60 L200 260 M260 60 L260 260 M320 60 L320 260 M380 60 L380 260 M440 60 L440 260"/></g>`;
    case 'aurora':
      return `<g opacity="0.55"><path d="M40 60 Q160 200 260 80 T480 100 L480 20 L40 20 Z" fill="${Fanhy_a}" opacity="0.25"/>
        <path d="M40 110 Q200 250 300 120 T480 140 L480 60 L40 60 Z" fill="${Fanhy_a}" opacity="0.18"/></g>`;
    case 'leaf':
      return `<g fill="${Fanhy_a}" opacity="0.4"><path d="M150 100 Q200 60 250 100 Q200 140 150 100 Z"/>
        <path d="M280 160 Q330 120 380 160 Q330 200 280 160 Z"/><path d="M180 200 Q220 170 260 200 Q220 230 180 200 Z"/></g>`;
    case 'rays':
      return `<g stroke="${Fanhy_a}" stroke-width="10" opacity="0.13"><path d="M260 0 L120 300 M260 0 L200 300 M260 0 L260 300 M260 0 L320 300 M260 0 L400 300"/></g>`;
    case 'stars':
      return `<g fill="${Fanhy_a}"><circle cx="90" cy="70" r="2.5"/><circle cx="160" cy="130" r="1.8"/><circle cx="220" cy="60" r="2"/><circle cx="300" cy="110" r="2.6"/><circle cx="370" cy="70" r="1.6"/><circle cx="420" cy="150" r="2.2"/><circle cx="120" cy="220" r="2"/><circle cx="200" cy="250" r="2.8"/><circle cx="340" cy="230" r="2"/><circle cx="280" cy="190" r="1.6"/></g>`;
    case 'mountain':
      return `<g opacity="0.4"><path d="M40 280 L160 130 L260 260 L340 150 L480 280 Z" fill="${Fanhy_a}" opacity="0.3"/>
        <path d="M40 300 L140 200 L260 300 Z" fill="${Fanhy_a}" opacity="0.2"/></g>`;
    case 'city':
      return `<g fill="${Fanhy_a}" opacity="0.3"><rect x="80" y="160" width="46" height="140"/><rect x="140" y="120" width="40" height="180"/><rect x="196" y="180" width="52" height="120"/><rect x="262" y="100" width="42" height="200"/><rect x="320" y="150" width="48" height="150"/><rect x="384" y="190" width="40" height="110"/></g>`;
    case 'flower':
      return `<g fill="${Fanhy_a}" opacity="0.4"><circle cx="130" cy="220" r="10"/><circle cx="200" cy="250" r="8"/><circle cx="270" cy="210" r="12"/><circle cx="340" cy="250" r="9"/><circle cx="400" cy="220" r="7"/><circle cx="170" cy="180" r="6"/><circle cx="310" cy="170" r="8"/></g>`;
    case 'boat':
      return `<g opacity="0.45"><path d="M60 230 Q260 250 460 230" stroke="${Fanhy_a}" stroke-width="2" fill="none"/>
        <path d="M210 210 L310 210 L290 235 L230 235 Z" fill="${Fanhy_a}" opacity="0.4"/><path d="M260 150 L260 210" stroke="${Fanhy_a}" stroke-width="3"/></g>`;
    default:
      return '';
  }
}

function Fanhy_buildSvg(Fanhy_item) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 320" width="520" height="320">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${Fanhy_item.c1}"/>
      <stop offset="1" stop-color="${Fanhy_item.c2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.4" r="0.6">
      <stop offset="0" stop-color="${Fanhy_item.accent}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${Fanhy_item.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="520" height="320" fill="url(#bg)"/>
  <rect width="520" height="320" fill="url(#glow)"/>
  ${Fanhy_motif(Fanhy_item.motif, Fanhy_item.accent)}
  <rect x="1" y="1" width="518" height="318" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
</svg>`;
}

Fanhy_images.forEach(function (Fanhy_item) {
  const Fanhy_svg = Fanhy_buildSvg(Fanhy_item);
  fs.writeFileSync(path.join(__dirname, Fanhy_item.file + '.svg'), Fanhy_svg, 'utf8');
  console.log('生成 ' + Fanhy_item.file + '.svg');
});
console.log('完成：共生成 ' + Fanhy_images.length + ' 张封面图');
