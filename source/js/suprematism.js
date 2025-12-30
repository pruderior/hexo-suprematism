/**
 * Suprematism Art Generator
 * Config loaded from _config.yml via window.SUPREMATISM_CONFIG
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

  // ========================================
  // LOAD CONFIG FROM _config.yml (via layout.ejs)
  // Falls back to defaults if not set
  // ========================================
  const userConfig = window.SUPREMATISM_CONFIG || {};
  
  const CONFIG = {
    minShapes: userConfig.shapes?.min ?? 12,
    maxShapes: userConfig.shapes?.max ?? 20,
    colorWeights: {
      black: userConfig.colors?.black ?? 45,
      red: userConfig.colors?.red ?? 25,
      gray: userConfig.colors?.gray ?? 15,
      tan: userConfig.colors?.tan ?? 8,
      yellow: userConfig.colors?.yellow ?? 4,
      blue: userConfig.colors?.blue ?? 3
    }
  };

  const BIG_CIRCLE_CONFIG = {
    enabled: userConfig.bigCircle?.enabled ?? true,
    chance: userConfig.bigCircle?.chance ?? 0.7,
    minSize: userConfig.bigCircle?.minSize ?? 200,
    maxSize: userConfig.bigCircle?.maxSize ?? 380
  };

  const ARC_CONFIG = {
    fullArcsMin: userConfig.arcs?.fullArcsMin ?? 1,
    fullArcsMax: userConfig.arcs?.fullArcsMax ?? 2,
    partialArcChance: userConfig.arcs?.partialArcChance ?? 0.3
  };

  // Collage images from window (set in layout.ejs)
  const COLLAGE_IMAGES = window.COLLAGE_IMAGES || [];

  const COLLAGE_CONFIG = {
    enabled: (userConfig.collage?.enabled ?? true) && COLLAGE_IMAGES.length > 0,
    minImages: userConfig.collage?.minImages ?? 2,
    maxImages: userConfig.collage?.maxImages ?? 3,
    minSize: userConfig.collage?.minSize ?? 300,
    maxSize: userConfig.collage?.maxSize ?? 500,
    opacity: {
      min: userConfig.collage?.opacityMin ?? 0.7,
      max: userConfig.collage?.opacityMax ?? 0.95
    }
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

  // BIG CIRCLE - one HUGE prominent circle (uses config)
  function createBigCircle(container) {
    const el = document.createElement('div');
    const size = rand(BIG_CIRCLE_CONFIG.minSize, BIG_CIRCLE_CONFIG.maxSize);
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

  // ========================================
  // COLLAGE IMAGE - B&W photomontage element
  // Each image appears at most once, with anti-overlap zones
  // ========================================
  
  // Zones to spread images across the page (avoid overlap)
  const COLLAGE_ZONES = [
    { left: [5, 30], top: [10, 40] },   // Top-left
    { left: [35, 65], top: [5, 35] },   // Top-center
    { left: [60, 85], top: [10, 40] },  // Top-right
    { left: [5, 30], top: [45, 75] },   // Bottom-left
    { left: [35, 65], top: [50, 80] },  // Bottom-center
    { left: [60, 85], top: [45, 75] },  // Bottom-right
  ];

  function createCollageImage(container, imgSrc, zone) {
    const el = document.createElement('img');
    
    const size = rand(COLLAGE_CONFIG.minSize, COLLAGE_CONFIG.maxSize);
    const left = rand(zone.left[0], zone.left[1]);
    const top = rand(zone.top[0], zone.top[1]);
    const rotation = rand(-25, 25);
    const opacity = rand(COLLAGE_CONFIG.opacity.min, COLLAGE_CONFIG.opacity.max);
    
    el.src = imgSrc;
    el.alt = '';
    el.loading = 'lazy';
    el.style.cssText = `
      position: absolute;
      left: ${left}%;
      top: ${top}%;
      width: ${size}px;
      height: auto;
      transform: rotate(${rotation}deg);
      opacity: ${opacity};
      pointer-events: none;
      object-fit: contain;
    `;
    
    el.onerror = () => el.remove();
    container.appendChild(el);
  }

  // Add collage images - each image used at most once, spread across zones
  function addCollageImages(container) {
    if (!COLLAGE_CONFIG.enabled || COLLAGE_IMAGES.length === 0) return;
    
    // Shuffle images and zones
    const shuffledImages = [...COLLAGE_IMAGES].sort(() => Math.random() - 0.5);
    const shuffledZones = [...COLLAGE_ZONES].sort(() => Math.random() - 0.5);
    
    // Pick how many images (up to available, each unique)
    const maxPossible = Math.min(COLLAGE_CONFIG.maxImages, shuffledImages.length);
    const numImages = randInt(COLLAGE_CONFIG.minImages, maxPossible);
    
    // Add each unique image in a different zone
    for (let i = 0; i < numImages; i++) {
      const zone = shuffledZones[i % shuffledZones.length];
      createCollageImage(container, shuffledImages[i], zone);
    }
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
    // GUARANTEED: Full arc lines (uses config)
    // ========================================
    const numFullArcs = randInt(ARC_CONFIG.fullArcsMin, ARC_CONFIG.fullArcsMax);
    for (let i = 0; i < numFullArcs; i++) {
      createFullArc(canvas);
    }
    
    // ========================================
    // Big circle (uses config chance)
    // ========================================
    if (BIG_CIRCLE_CONFIG.enabled && Math.random() < BIG_CIRCLE_CONFIG.chance) {
      createBigCircle(canvas);
    }
    
    // ========================================
    // Additional partial arcs (uses config)
    // ========================================
    if (Math.random() < ARC_CONFIG.partialArcChance) {
      createPartialArc(canvas);
    }
    if (Math.random() < ARC_CONFIG.partialArcChance * 0.6) {
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
    
    // ========================================
    // COLLAGE IMAGES (loaded last, on top)
    // ========================================
    addCollageImages(canvas);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', generateSuprematism);
  } else {
    generateSuprematism();
  }

  window.regenerateSuprematism = generateSuprematism;
})();
