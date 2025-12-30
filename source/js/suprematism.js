/**
 * Suprematism Art Generator
 * With guaranteed arcs and big circle
 */

(function() {
  'use strict';

  const COLORS = {
    black: '#1A1A1A',
    red: '#C93A32',
    yellow: '#C9A227',
    blue: '#2B4162',
    gray: '#8A8680',
    tan: '#C4A87A'
  };

  const CONFIG = {
    minShapes: 12,
    maxShapes: 20,
    colorWeights: { black: 45, red: 25, gray: 15, tan: 8, yellow: 4, blue: 3 }
  };

  function getRandomColor() {
    const weights = CONFIG.colorWeights;
    const total = Object.values(weights).reduce((a, b) => a + b, 0);
    let random = Math.random() * total;
    for (const [color, weight] of Object.entries(weights)) {
      random -= weight;
      if (random <= 0) return COLORS[color];
    }
    return COLORS.black;
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }
  function randInt(min, max) { return Math.floor(rand(min, max + 1)); }

  // Rectangle/bar
  function createRect(container) {
    const el = document.createElement('div');
    const isBar = Math.random() > 0.3;
    
    let width, height;
    if (isBar) {
      width = rand(60, 200);
      height = rand(8, 30);
    } else {
      const size = rand(30, 85);
      width = size * rand(0.8, 1.4);
      height = size * rand(0.6, 1.2);
    }
    
    const left = rand(0, 85);
    const top = rand(5, 90);
    const rotation = rand(-65, 65);
    const opacity = rand(0.4, 1);
    
    el.style.cssText = `
      position: absolute;
      left: ${left}%;
      top: ${top}%;
      width: ${width}px;
      height: ${height}px;
      background: ${getRandomColor()};
      transform: rotate(${rotation}deg);
      opacity: ${opacity};
    `;
    container.appendChild(el);
  }

  // Small/medium circle
  function createCircle(container) {
    const el = document.createElement('div');
    const size = rand(25, 70);
    const left = rand(5, 85);
    const top = rand(10, 85);
    const opacity = rand(0.5, 1);
    
    const circleColors = [COLORS.red, COLORS.black, COLORS.black, COLORS.red, COLORS.yellow];
    const color = circleColors[randInt(0, circleColors.length - 1)];
    
    el.style.cssText = `
      position: absolute;
      left: ${left}%;
      top: ${top}%;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      opacity: ${opacity};
    `;
    container.appendChild(el);
  }

  // BIG CIRCLE - one HUGE prominent circle
  function createBigCircle(container) {
    const el = document.createElement('div');
    const size = rand(200, 380); // MUCH BIGGER
    const left = rand(5, 65);
    const top = rand(10, 55);
    const opacity = rand(0.75, 1);
    
    // Big circles often red or black
    const color = Math.random() > 0.4 ? COLORS.red : COLORS.black;
    
    el.style.cssText = `
      position: absolute;
      left: ${left}%;
      top: ${top}%;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      opacity: ${opacity};
    `;
    container.appendChild(el);
  }

  // Thin line
  function createLine(container) {
    const el = document.createElement('div');
    const length = rand(50, 150);
    const thickness = rand(1, 3);
    const left = rand(0, 80);
    const top = rand(10, 90);
    const rotation = rand(-60, 60);
    const opacity = rand(0.3, 0.7);
    
    el.style.cssText = `
      position: absolute;
      left: ${left}%;
      top: ${top}%;
      width: ${length}px;
      height: ${thickness}px;
      background: ${COLORS.black};
      transform: rotate(${rotation}deg);
      opacity: ${opacity};
    `;
    container.appendChild(el);
  }

  // FULL ARC - complete circle outline (not clipped)
  function createFullArc(container) {
    const el = document.createElement('div');
    const size = rand(200, 500);
    const left = rand(-15, 70);
    const top = rand(-10, 65);
    const borderWidth = rand(2, 5);
    const opacity = rand(0.35, 0.75);
    
    el.style.cssText = `
      position: absolute;
      left: ${left}%;
      top: ${top}%;
      width: ${size}px;
      height: ${size}px;
      border: ${borderWidth}px solid ${COLORS.black};
      border-radius: 50%;
      background: transparent;
      opacity: ${opacity};
    `;
    container.appendChild(el);
  }

  // PARTIAL ARC - clipped circle outline
  function createPartialArc(container) {
    const el = document.createElement('div');
    const size = rand(150, 400);
    const left = rand(-20, 75);
    const top = rand(-15, 70);
    const borderWidth = rand(2, 4);
    const opacity = rand(0.25, 0.6);
    const clipStart = randInt(0, 40);
    const clipEnd = randInt(60, 100);
    
    el.style.cssText = `
      position: absolute;
      left: ${left}%;
      top: ${top}%;
      width: ${size}px;
      height: ${size}px;
      border: ${borderWidth}px solid ${COLORS.black};
      border-radius: 50%;
      background: transparent;
      opacity: ${opacity};
      clip-path: polygon(${clipStart}% 0%, ${clipEnd}% 0%, ${clipEnd}% 100%, ${clipStart}% 100%);
    `;
    container.appendChild(el);
  }

  // Cluster of shapes
  function createCluster(container, side) {
    const clusterEl = document.createElement('div');
    const clusterLeft = side === 'left' ? rand(3, 20) : rand(60, 80);
    const clusterTop = rand(15, 50);
    
    clusterEl.style.cssText = `
      position: absolute;
      left: ${clusterLeft}%;
      top: ${clusterTop}%;
      width: 280px;
      height: 320px;
    `;
    
    const numShapes = randInt(5, 9);
    for (let i = 0; i < numShapes; i++) {
      const shape = document.createElement('div');
      const width = rand(40, 140);
      const height = rand(10, 35);
      const left = rand(0, 55);
      const top = rand(0, 75);
      const rotation = rand(-55, 55);
      const opacity = rand(0.5, 1);
      
      shape.style.cssText = `
        position: absolute;
        left: ${left}%;
        top: ${top}%;
        width: ${width}px;
        height: ${height}px;
        background: ${getRandomColor()};
        transform: rotate(${rotation}deg);
        opacity: ${opacity};
      `;
      clusterEl.appendChild(shape);
    }
    container.appendChild(clusterEl);
  }

  function generateSuprematism() {
    let canvas = document.querySelector('.suprematist-canvas');
    if (!canvas) {
      canvas = document.createElement('div');
      canvas.className = 'suprematist-canvas';
      document.body.insertBefore(canvas, document.body.firstChild);
    }
    
    canvas.innerHTML = '';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    `;
    
    // ========================================
    // GUARANTEED: 1-2 full arc lines
    // ========================================
    const numFullArcs = randInt(1, 2);
    for (let i = 0; i < numFullArcs; i++) {
      createFullArc(canvas);
    }
    
    // ========================================
    // GUARANTEED: 1 big circle (70% chance)
    // ========================================
    if (Math.random() > 0.3) {
      createBigCircle(canvas);
    }
    
    // ========================================
    // Additional partial arcs (30% chance each)
    // ========================================
    if (Math.random() > 0.7) {
      createPartialArc(canvas);
    }
    if (Math.random() > 0.8) {
      createPartialArc(canvas);
    }
    
    // ========================================
    // Main composition
    // ========================================
    const style = Math.random();
    
    if (style < 0.35) {
      // Clustered style
      createCluster(canvas, 'left');
      if (Math.random() > 0.5) createCluster(canvas, 'right');
      
      const numExtra = randInt(4, 8);
      for (let i = 0; i < numExtra; i++) {
        if (Math.random() > 0.75) createCircle(canvas);
        else if (Math.random() > 0.5) createLine(canvas);
        else createRect(canvas);
      }
    } else {
      // Scattered style
      const numShapes = randInt(CONFIG.minShapes, CONFIG.maxShapes);
      for (let i = 0; i < numShapes; i++) {
        const r = Math.random();
        if (r > 0.88) createCircle(canvas);
        else if (r > 0.75) createLine(canvas);
        else createRect(canvas);
      }
    }
    
    // ========================================
    // Prominent red element (left side)
    // ========================================
    const redLeft = document.createElement('div');
    if (Math.random() > 0.5) {
      const size = rand(50, 80);
      redLeft.style.cssText = `
        position: absolute;
        left: ${rand(8, 28)}%;
        top: ${rand(35, 60)}%;
        width: ${size}px;
        height: ${size}px;
        background: ${COLORS.red};
        border-radius: 50%;
      `;
    } else {
      redLeft.style.cssText = `
        position: absolute;
        left: ${rand(5, 22)}%;
        top: ${rand(30, 55)}%;
        width: ${rand(100, 170)}px;
        height: ${rand(15, 28)}px;
        background: ${COLORS.red};
        transform: rotate(${rand(-50, 50)}deg);
      `;
    }
    canvas.appendChild(redLeft);
    
    // ========================================
    // Right side accent
    // ========================================
    if (Math.random() > 0.35) {
      const rightAccent = document.createElement('div');
      if (Math.random() > 0.5) {
        const size = rand(35, 65);
        rightAccent.style.cssText = `
          position: absolute;
          left: ${rand(68, 88)}%;
          top: ${rand(25, 70)}%;
          width: ${size}px;
          height: ${size}px;
          background: ${Math.random() > 0.5 ? COLORS.red : COLORS.black};
          border-radius: 50%;
          opacity: ${rand(0.6, 1)};
        `;
      } else {
        rightAccent.style.cssText = `
          position: absolute;
          left: ${rand(65, 85)}%;
          top: ${rand(25, 65)}%;
          width: ${rand(80, 150)}px;
          height: ${rand(12, 24)}px;
          background: ${getRandomColor()};
          transform: rotate(${rand(-55, 55)}deg);
          opacity: ${rand(0.6, 1)};
        `;
      }
      canvas.appendChild(rightAccent);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', generateSuprematism);
  } else {
    generateSuprematism();
  }

  window.regenerateSuprematism = generateSuprematism;
})();
