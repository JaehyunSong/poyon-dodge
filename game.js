/**
 * Poyonpoyon Dodge Game (ぽよんぽよんのよけよけ大作戦)
 * Core Game Logic File
 */

// ==========================================================================
// 1. CONFIGURATION & CONSTANTS
// ==========================================================================
const CANVAS_WIDTH = 540;   // Virtual Width
const CANVAS_HEIGHT = 960;  // Virtual Height
const GRASS_HEIGHT = 100;   // Height of the grass ground at the bottom
const MAX_LIVES = 10;
const INITIAL_LIVES = 5;

// Asset mappings
const ASSET_PATHS = {
  song: 'assets/song.png',
  ponyan: 'assets/ponyan.png',
  pomu: 'assets/pomu.png',
  pomi: 'assets/pomi.png',
  life: 'assets/life.png',
  pypy_idle1: 'assets/pypy_idle1.png',
  pypy_idle2: 'assets/pypy_idle2.png',
  pypy_idle3: 'assets/pypy_idle3.png',
  pypy_left1: 'assets/pypy_left1.png',
  pypy_left2: 'assets/pypy_left2.png',
  pypy_left3: 'assets/pypy_left3.png',
  pypy_right1: 'assets/pypy_right1.png',
  pypy_right2: 'assets/pypy_right2.png',
  pypy_right3: 'assets/pypy_right3.png'
};

// Falling object configurations
const OBJECT_TYPES = {
  song:   { name: 'ソン先生', points: 10,  lifeChg: 1,  prob: 0.05, speedMult: 1.0,  size: { w: 64, h: 55 } },
  ponyan: { name: 'ぽにゃん', points: -3,  lifeChg: -1, prob: 0.30, speedMult: 0.95, size: { w: 60, h: 51 } },
  pomu:   { name: 'ぽむ',     points: -2,  lifeChg: -1, prob: 0.30, speedMult: 1.05, size: { w: 60, h: 51 } },
  pomi:   { name: 'ぽみ',     points: -1,  lifeChg: -1, prob: 0.30, speedMult: 0.9,  size: { w: 60, h: 51 } },
  unpo:   { name: 'うんぽ',   points: -10, lifeChg: -1, prob: 0.05, speedMult: 1.25, size: { w: 45, h: 45 } }
};

// Poop 16x16 Pixel Matrix for programmatic generation
const POOP_MATRIX = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,2,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,2,2,3,1,0,0,0,0,0,0],
  [0,0,0,0,0,1,2,3,4,1,0,0,0,0,0,0],
  [0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0],
  [0,0,0,1,2,2,2,2,3,3,4,1,0,0,0,0],
  [0,0,1,2,2,3,3,3,3,4,4,4,1,0,0,0],
  [0,0,1,3,3,3,3,4,4,4,4,4,1,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
  [1,2,2,2,2,2,2,3,3,3,3,4,4,4,1,0],
  [1,2,2,3,3,3,3,3,3,4,4,4,4,4,1,0],
  [1,3,3,3,3,3,3,3,4,4,4,4,4,4,1,0],
  [1,3,4,4,4,4,4,4,4,4,4,4,4,4,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

// Color mapping for poop sprite
const POOP_COLORS = {
  0: 'transparent',
  1: '#2e1b10', // Outline
  2: '#d7a15c', // Highlight
  3: '#9f6532', // Medium brown
  4: '#592e12'  // Dark brown
};

// ==========================================================================
// 2. RETRO SOUND EFFECTS (Web Audio API Synthesizer)
// ==========================================================================
class SoundSynth {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playCoin() {
    this.init();
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
    osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
    osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
    
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
    
    osc.start(now);
    osc.stop(now + 0.5);
  }

  playHit() {
    this.init();
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(220, now); // A3
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.25); // Slur down
    
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    
    osc.start(now);
    osc.stop(now + 0.3);
  }

  playUnpo() {
    this.init();
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.linearRampToValueAtTime(40, now + 0.4);
    
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    
    osc.start(now);
    osc.stop(now + 0.4);
  }

  playPowerup() {
    this.init();
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(330, now); // E4
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.3); // Octave sweep
    
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    
    osc.start(now);
    osc.stop(now + 0.35);
  }

  playGameOver() {
    this.init();
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'square';
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(392.00, now); // G4
    osc.frequency.setValueAtTime(349.23, now + 0.2); // F4
    osc.frequency.setValueAtTime(311.13, now + 0.4); // Eb4
    osc.frequency.setValueAtTime(261.63, now + 0.6); // C4
    
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.setValueAtTime(0.15, now + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    
    osc.start(now);
    osc.stop(now + 1.2);
  }

  playClick() {
    this.init();
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(600, now);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    
    osc.start(now);
    osc.stop(now + 0.08);
  }

  playThunder() {
    this.init();
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(60 + Math.random() * 40, now);
    osc.frequency.linearRampToValueAtTime(20, now + 0.85);
    
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.9);
    
    osc.start(now);
    osc.stop(now + 0.9);
  }
}

const sounds = new SoundSynth();

// ==========================================================================
// 3. ENGINE & INITIALIZATION
// ==========================================================================
class GameEngine {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    
    // Set internal canvas resolution
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    
    this.images = {};
    this.unpoCanvas = null; // Programmatic canvas for poop sprite
    
    // Time tracking for day-night sync
    this.pageLoadTime = Date.now();
    this.nightFactor = 0;
    
    // Weather states
    this.weather = 'NORMAL'; // NORMAL, SNOW, RAIN, THUNDER
    this.lightningTimer = 0;
    this.lightningFlash = 0;
    this.weatherParticles = [];
    
    // Game state
    this.state = 'LOADING'; // LOADING, TITLE, PLAYING, PAUSED, GAMEOVER
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem('pypy_highscore') || '0');
    this.lives = INITIAL_LIVES;
    this.timeSurvived = 0; // in seconds
    this.lastTimeIncrement = 0;
    this.isNewHighScore = false;
    
    // Timing & Spawn control
    this.lastSpawnTime = 0;
    this.spawnInterval = 1200; // ms
    this.baseSpeed = 5; // Pixels per frame
    this.startTime = 0;
    this.elapsedPlayTime = 0; // ms
    this.lastFrameTime = 0;
    
    // Collections
    this.entities = [];
    this.particles = [];
    this.floatingTexts = [];
    
    // Generate static stars for night sky twinkling
    this.stars = [];
    for (let i = 0; i < 40; i++) {
      this.stars.push({
        x: Math.random() * CANVAS_WIDTH,
        y: Math.random() * (CANVAS_HEIGHT - GRASS_HEIGHT - 200), // kept in upper sky
        size: 1.5 + Math.random() * 2,
        twinkleOffset: Math.random() * Math.PI * 2
      });
    }
    
    // Player settings
    this.player = {
      x: CANVAS_WIDTH / 2 - 30,
      y: CANVAS_HEIGHT - GRASS_HEIGHT - 120, // Standing on grass
      width: 60,
      height: 120,
      targetX: CANVAS_WIDTH / 2 - 30,
      lerpSpeed: 0.18, // Bounce glide factor
      dirState: 'idle', // idle, left, right
      animFrame: 0,
      lastFrameChange: 0,
      frameInterval: 120, // ms per frame
      invulnerable: false,
      invulnTime: 0, // ms remaining
      flashState: true
    };
    
    // Visual Shake effect
    this.shake = {
      duration: 0,
      intensity: 0,
      x: 0,
      y: 0
    };
    
    // Setup inputs & event listeners
    this.setupInputs();
    this.setupUIEvents();
    
    // Start preloader
    this.preloadAssets();
  }
  
  // Create offscreen poop sprite
  createPoopSprite() {
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext('2d');
    
    for (let r = 0; r < 16; r++) {
      for (let c = 0; c < 16; c++) {
        const colorId = POOP_MATRIX[r][c];
        if (colorId > 0) {
          pCtx.fillStyle = POOP_COLORS[colorId];
          pCtx.fillRect(c, r, 1, 1);
        }
      }
    }
    this.unpoCanvas = pCanvas;
  }
  
  // Preload PNGs
  preloadAssets() {
    const keys = Object.keys(ASSET_PATHS);
    let loadedCount = 0;
    const totalCount = keys.length;
    
    const updateProgress = () => {
      const percentage = (loadedCount / totalCount) * 100;
      document.getElementById('loading-bar').style.width = percentage + '%';
      if (loadedCount === totalCount) {
        // Build poop sprite
        this.createPoopSprite();
        
        // Show start screen
        setTimeout(() => {
          this.transitionTo('TITLE');
        }, 500);
      }
    };
    
    keys.forEach(key => {
      const img = new Image();
      img.src = ASSET_PATHS[key];
      img.onload = () => {
        loadedCount++;
        this.images[key] = img;
        updateProgress();
      };
      img.onerror = () => {
        console.error('Failed to load asset:', ASSET_PATHS[key]);
        loadedCount++; // Avoid blocking the loader
        updateProgress();
      };
    });
  }

  // ==========================================================================
  // 4. INPUT CONTROLLERS
  // ==========================================================================
  setupInputs() {
    // Left/Right Arrow keyboard controls
    this.keysPressed = {};
    window.addEventListener('keydown', (e) => {
      this.keysPressed[e.code] = true;
      
      // Toggle Pause/Resume on Escape or Space
      if (e.code === 'Escape' || e.code === 'Space') {
        if (this.state === 'PLAYING' || this.state === 'PAUSED') {
          e.preventDefault(); // Prevent scrolling on Space
          sounds.playClick();
          this.togglePause();
          return;
        }
      }
      
      // Start game on Space from Title screen
      if (e.code === 'Space' && this.state === 'TITLE') {
        e.preventDefault(); // Prevent scrolling on Space
        sounds.playClick();
        this.startGame();
        return;
      }
      
      if (this.state === 'PLAYING') {
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
          // move target left
          this.player.targetX = Math.max(0, this.player.targetX - 25);
        }
        if (e.code === 'ArrowRight' || e.code === 'KeyD') {
          // move target right
          this.player.targetX = Math.min(CANVAS_WIDTH - this.player.width, this.player.targetX + 25);
        }
      }
    });
    
    window.addEventListener('keyup', (e) => {
      this.keysPressed[e.code] = false;
    });

    // Pointer events (handles Mouse and Touch)
    const handlePointerMove = (e) => {
      if (this.state !== 'PLAYING') return;
      
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = CANVAS_WIDTH / rect.width;
      
      // Calculate X relative to canvas
      let clientX = e.clientX;
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
      }
      
      const relativeX = (clientX - rect.left) * scaleX;
      
      // Poyonpoyon target center matches pointer coordinates
      const targetX = relativeX - this.player.width / 2;
      
      // Clamp inside screen bounds
      this.player.targetX = Math.max(0, Math.min(CANVAS_WIDTH - this.player.width, targetX));
    };

    this.canvas.addEventListener('pointerdown', (e) => {
      this.canvas.setPointerCapture(e.pointerId);
      handlePointerMove(e);
    });

    this.canvas.addEventListener('pointermove', (e) => {
      if (e.buttons > 0 || e.pointerType === 'touch') {
        handlePointerMove(e);
      }
    });

    this.canvas.addEventListener('pointerup', (e) => {
      this.canvas.releasePointerCapture(e.pointerId);
    });
    
    // Prevent default touch scrolls on screen to avoid page bounce
    this.canvas.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
    this.canvas.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
  }

  // ==========================================================================
  // 5. UI INTERACTIVE ACTIONS
  // ==========================================================================
  // Helper to bind buttons for responsive instant touch on mobiles and mouse clicks on desktop
  setupMobileButton(buttonId, callback) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;
    
    let touchTriggered = false;
    
    // Mobile Touch End (instantly responds, bypassing 300ms delays)
    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      touchTriggered = true;
      sounds.init(); // Initialize/Unlock Web Audio context on iOS Safari
      sounds.playClick(); // Play button click SFX
      callback();
    }, { passive: false });
    
    // Desktop / Fallback Click
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (touchTriggered) {
        touchTriggered = false;
        return;
      }
      sounds.init(); // Initialize/Unlock Web Audio context
      sounds.playClick(); // Play button click SFX
      callback();
    });
  }

  setupUIEvents() {
    // Start game button
    this.setupMobileButton('btn-start', () => {
      this.startGame();
    });

    // Pause trigger button
    this.setupMobileButton('btn-pause-trigger', () => {
      this.togglePause();
    });

    // Resume button
    this.setupMobileButton('btn-resume', () => {
      this.togglePause();
    });

    // Back to title from Pause screen
    this.setupMobileButton('btn-to-title', () => {
      this.transitionTo('TITLE');
    });

    // Restart button from Game Over
    this.setupMobileButton('btn-restart', () => {
      this.startGame();
    });

    // Back to title from Game Over
    this.setupMobileButton('btn-gameover-title', () => {
      this.transitionTo('TITLE');
    });
  }

  // ==========================================================================
  // 6. GAME STATES TRANSITIONS
  // ==========================================================================
  transitionTo(newState) {
    this.state = newState;
    
    // Hide all overlays first
    document.getElementById('loading-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('pause-screen').classList.add('hidden');
    document.getElementById('gameover-screen').classList.add('hidden');
    document.getElementById('btn-pause-trigger').classList.add('hidden');
    document.getElementById('game-hud').classList.add('hidden');

    if (newState === 'TITLE') {
      document.getElementById('start-screen').classList.remove('hidden');
      
      // Reset weather overlays and variables when returning to title
      const screenEl = document.getElementById('game-screen');
      if (screenEl) {
        screenEl.classList.remove('weather-snow', 'weather-rain', 'weather-thunder');
      }
      this.weather = 'NORMAL';
      this.weatherParticles = [];
      this.lightningFlash = 0;
      
      // Clear out play variables
      this.entities = [];
      this.particles = [];
      this.floatingTexts = [];
    } 
    else if (newState === 'PLAYING') {
      document.getElementById('game-hud').classList.remove('hidden');
      document.getElementById('btn-pause-trigger').classList.remove('hidden');
      this.updateLivesHUD();
    } 
    else if (newState === 'PAUSED') {
      document.getElementById('game-hud').classList.remove('hidden');
      document.getElementById('pause-screen').classList.remove('hidden');
    } 
    else if (newState === 'GAMEOVER') {
      document.getElementById('game-hud').classList.remove('hidden');
      document.getElementById('gameover-screen').classList.remove('hidden');
      
      // Update Game Over info
      document.getElementById('final-score').innerText = this.score;
      document.getElementById('final-time').innerText = this.timeSurvived + '秒';
      document.getElementById('best-score').innerText = this.highScore;
      
      const badge = document.getElementById('highscore-badge');
      if (this.isNewHighScore) {
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }
  }

  startGame() {
    this.score = 0;
    this.lives = INITIAL_LIVES;
    this.timeSurvived = 0;
    this.isNewHighScore = false;
    this.entities = [];
    this.particles = [];
    this.floatingTexts = [];
    this.spawnInterval = 1200;
    this.baseSpeed = 5;
    
    // Reset player position
    this.player.x = CANVAS_WIDTH / 2 - 30;
    this.player.targetX = CANVAS_WIDTH / 2 - 30;
    this.player.invulnerable = false;
    this.player.invulnTime = 0;
    this.player.dirState = 'idle';
    
    // Roll for weather: 5% Snow, 5% Rain, 5% Thunder, 85% Normal
    const weatherRoll = Math.random();
    const screenEl = document.getElementById('game-screen');
    if (screenEl) {
      screenEl.classList.remove('weather-snow', 'weather-rain', 'weather-thunder');
    }
    
    if (weatherRoll < 0.05) {
      this.weather = 'SNOW';
      if (screenEl) screenEl.classList.add('weather-snow');
    } else if (weatherRoll < 0.10) {
      this.weather = 'RAIN';
      if (screenEl) screenEl.classList.add('weather-rain');
    } else if (weatherRoll < 0.15) {
      this.weather = 'THUNDER';
      if (screenEl) screenEl.classList.add('weather-thunder');
      this.lightningTimer = 3000 + Math.random() * 4000; // 3 to 7 seconds first strike
      this.lightningFlash = 0;
    } else {
      this.weather = 'NORMAL';
    }
    this.weatherParticles = [];
    
    this.startTime = Date.now();
    this.lastTimeIncrement = Date.now();
    this.lastSpawnTime = Date.now();
    this.lastFrameTime = 0; // Fixes Epoch/HighRes timestamp mismatch causing visual glitches on restart
    this.elapsedPlayTime = 0;

    this.transitionTo('PLAYING');
    
    // Play sound
    sounds.playPowerup();

    // Trigger game loop
    this.updateLivesHUD();
    this.updateScoreHUD();
  }

  togglePause() {
    if (this.state === 'PLAYING') {
      this.transitionTo('PAUSED');
    } else if (this.state === 'PAUSED') {
      this.lastFrameTime = Date.now(); // Avoid huge delta time
      this.transitionTo('PLAYING');
    }
  }

  // Update UI heart icons
  updateLivesHUD() {
    const container = document.getElementById('hud-lives');
    const currentHeartCount = container.children.length;
    
    // If the number of heart elements doesn't match current lives, rebuild
    if (currentHeartCount !== this.lives) {
      container.innerHTML = '';
      for (let i = 0; i < this.lives; i++) {
        const heart = document.createElement('div');
        heart.className = 'hud-heart';
        
        // Add a nice animation when gained
        if (i >= currentHeartCount) {
          heart.classList.add('gained');
        }
        
        container.appendChild(heart);
      }
    }
  }

  updateScoreHUD() {
    document.getElementById('hud-score').innerText = this.score;
  }

  // Camera Shake trigger
  triggerShake(intensity, duration) {
    this.shake.intensity = intensity;
    this.shake.duration = duration;
  }

  // ==========================================================================
  // 7. GAME PLAY PHYSICS & LOGIC
  // ==========================================================================
  
  // Weighted Spawn algorithm
  spawnObject() {
    const roll = Math.random();
    let selectedType = 'ponyan'; // default
    let accumulatedProb = 0;

    for (const [type, config] of Object.entries(OBJECT_TYPES)) {
      accumulatedProb += config.prob;
      if (roll <= accumulatedProb) {
        selectedType = type;
        break;
      }
    }

    const config = OBJECT_TYPES[selectedType];
    
    // Roll for individual independent gimmicks
    const isFast = Math.random() < 0.20; // 20% chance to be extra fast
    const isGhost = Math.random() < 0.15; // 15% chance to be semi-transparent
    
    let sizeScale = 1.0;
    if (Math.random() < 0.20) {
      sizeScale = 1.2 + Math.random() * 0.8; // 20% chance to be up to 2x size
    }
    
    const isSpinning = Math.random() < 0.25; // 25% chance to spin
    const isSwaying = Math.random() < 0.25; // 25% chance to sway like a leaf

    const width = config.size.w * sizeScale;
    const height = config.size.h * sizeScale;

    // Spawn at a random X coordinate, fully visible on screen
    const x = Math.random() * (CANVAS_WIDTH - width);
    const y = -height;
    
    // Calculate base speed based on difficulty level (with +/-20% speed variation)
    let speed = this.baseSpeed * (0.8 + Math.random() * 0.4) * config.speedMult;
    
    // Apply speed modifiers for gimmicks
    if (isFast) {
      speed *= 1.6;
    }
    if (isSwaying) {
      speed *= 0.75; // Slower vertical speed for leaf fall (floats)
    }

    // Set rotation and sway parameters
    let rotation = 0;
    let rotationSpeed = 0;
    if (isSpinning) {
      // Spins at 0.02 to 0.06 rad/frame (approx 1 to 3 degrees/frame), random direction
      rotationSpeed = (0.02 + Math.random() * 0.04) * (Math.random() < 0.5 ? 1 : -1);
      rotation = Math.random() * Math.PI * 2;
    } else if (isSwaying) {
      rotation = Math.sin(0) * 0.4; // Initial rocking angle
    }

    let swayRange = 0;
    let swaySpeed = 0;
    let swayAngle = 0;
    if (isSwaying) {
      // Random sway amplitude (width)
      swayRange = Math.random() * (CANVAS_WIDTH * 0.25); // Max amplitude 135px (total sway span 270px, which is 50% of screen width)
      // Random sway speed (frequency)
      swaySpeed = 0.03 + Math.random() * 0.04;
      // Random starting phase angle
      swayAngle = Math.random() * Math.PI * 2;
    }

    this.entities.push({
      type: selectedType,
      x,
      y,
      width,
      height,
      speed,
      name: config.name,
      isFast,
      isGhost,
      sizeScale,
      isSpinning,
      isSwaying,
      rotation,
      rotationSpeed,
      swayRange,
      swaySpeed,
      swayAngle,
      baseX: x
    });
  }

  // Increase difficulty over time (doubles every 3 minutes / 180 seconds)
  scaleDifficulty() {
    const elapsedSeconds = this.elapsedPlayTime / 1000;
    const multiplier = Math.pow(2, elapsedSeconds / 180);
    
    // Base speed starts at 5 and doubles every 3 minutes
    this.baseSpeed = 5 * multiplier;
    
    // Spawn rate doubles every 3 minutes (spawn interval is halved, min cap of 100ms)
    this.spawnInterval = Math.max(100, 1200 / multiplier);
  }

  // AABB Collision check
  checkCollision(rect1, rect2) {
    // Narrow down hitboxes for fairer collision
    const hitbox1 = {
      x: rect1.x + rect1.width * 0.15,
      y: rect1.y + rect1.height * 0.1,
      w: rect1.width * 0.7,
      h: rect1.height * 0.8
    };

    const hitbox2 = {
      x: rect2.x + rect2.width * 0.1,
      y: rect2.y + rect2.height * 0.1,
      w: rect2.width * 0.8,
      h: rect2.height * 0.8
    };

    return hitbox1.x < hitbox2.x + hitbox2.w &&
           hitbox1.x + hitbox1.w > hitbox2.x &&
           hitbox1.y < hitbox2.y + hitbox2.h &&
           hitbox1.y + hitbox1.h > hitbox2.y;
  }

  // Handle player collisions
  handleCollision(entity) {
    const config = OBJECT_TYPES[entity.type];
    
    if (entity.type === 'song') {
      // Catching Song-sensei: Positive!
      sounds.playCoin();
      
      // Score increase
      this.score += config.points;
      
      // Life increase (max 10)
      if (this.lives < MAX_LIVES) {
        this.lives += config.lifeChg;
        this.updateLivesHUD();
      }
      
      // Floating points pop
      this.spawnFloatingText(`+${config.points} 点`, entity.x + entity.width/2, entity.y, '#38b000');
      this.spawnFloatingText(`残機 +1`, entity.x + entity.width/2, entity.y - 25, '#38b000');
      
      // Green shiny particles burst
      this.spawnBurst(entity.x + entity.width/2, entity.y + entity.height/2, '#70e000', 12);
    } 
    else {
      // Colliding with other characters/poop: Negative!
      if (this.player.invulnerable) return; // Ignore damage during invulnerability frames
      
      if (entity.type === 'unpo') {
        sounds.playUnpo();
      } else {
        sounds.playHit();
      }

      // Damage screen shake
      this.triggerShake(10, 250);

      // Score deduction (cap at 0)
      this.score = Math.max(0, this.score + config.points);
      
      // Life reduction
      this.lives += config.lifeChg;
      this.updateLivesHUD();

      // Trigger brief invulnerability frames
      this.player.invulnerable = true;
      this.player.invulnTime = 500; // 0.5s

      // Floating score pop
      this.spawnFloatingText(`${config.points} 点`, entity.x + entity.width/2, entity.y, '#d90429');
      
      // Burst particles depending on object type
      const burstColor = entity.type === 'unpo' ? '#8c5830' : '#ff477e';
      this.spawnBurst(entity.x + entity.width/2, entity.y + entity.height/2, burstColor, 10);
      
      // Verify game over
      if (this.lives <= 0) {
        this.gameOver();
      }
    }

    this.updateScoreHUD();
  }

  gameOver() {
    this.transitionTo('GAMEOVER');
    sounds.playGameOver();

    // High score verification
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('pypy_highscore', this.highScore);
      this.isNewHighScore = true;
    }
  }

  // ==========================================================================
  // 8. PARTICLE & VISUAL EFFECTS
  // ==========================================================================
  
  // Spawn a floating text effect
  spawnFloatingText(str, x, y, color) {
    this.floatingTexts.push({
      str,
      x,
      y,
      color,
      age: 0,
      maxAge: 45 // Frames
    });
  }

  // Spawn a particle burst
  spawnBurst(x, y, color, count) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1, // slight bias upwards
        size: 3 + Math.random() * 5,
        color,
        age: 0,
        maxAge: 20 + Math.random() * 20
      });
    }
  }

  // Environment wind effect (grass bits & light sparkles)
  spawnWindParticles() {
    if (Math.random() < 0.04) { // 4% chance per frame
      this.particles.push({
        x: CANVAS_WIDTH + 10,
        y: Math.random() * (CANVAS_HEIGHT - GRASS_HEIGHT - 100),
        vx: -(1.5 + Math.random() * 2), // drifts left
        vy: 0.5 + Math.random() * 0.8, // drifts down
        size: 2 + Math.random() * 4,
        color: Math.random() < 0.4 ? '#a7f3d0' : '#ffffff', // soft green or soft white sparkles
        age: 0,
        maxAge: 300,
        isWind: true
      });
    }
  }

  // ==========================================================================
  // 9. ANIMATIONS & DRAW LOOPS
  // ==========================================================================
  update(dt) {
    const now = Date.now();
    const timeScale = dt / 16.666; // Normalized to 60fps speed
    
    // Update Weather Particles spawning
    if (this.weather === 'SNOW') {
      if (Math.random() < 0.35) {
        this.weatherParticles.push({
          type: 'snow',
          x: Math.random() * (CANVAS_WIDTH + 100),
          y: -10,
          vx: -0.5 - Math.random() * 1.0,
          vy: 1.0 + Math.random() * 1.5,
          size: 2 + Math.random() * 3
        });
      }
    } else if (this.weather === 'RAIN' || this.weather === 'THUNDER') {
      const spawnRate = this.weather === 'THUNDER' ? 2 : 1;
      for (let r = 0; r < spawnRate; r++) {
        if (Math.random() < 0.8) {
          this.weatherParticles.push({
            type: 'rain',
            x: Math.random() * (CANVAS_WIDTH + 150) - 50,
            y: -20,
            vx: -1.5 - Math.random() * 1.0,
            vy: 14.0 + Math.random() * 5.0,
            size: 1 + Math.random() * 1,
            len: 10 + Math.random() * 10
          });
        }
      }
    }

    // Update Weather Particles position
    for (let i = this.weatherParticles.length - 1; i >= 0; i--) {
      const p = this.weatherParticles[i];
      p.x += p.vx * timeScale;
      p.y += p.vy * timeScale;
      
      // Remove offscreen
      if (p.y > CANVAS_HEIGHT || p.x < -30) {
        this.weatherParticles.splice(i, 1);
      }
    }

    // Handle lightning strikes
    if (this.weather === 'THUNDER') {
      this.lightningTimer -= dt;
      if (this.lightningTimer <= 0) {
        this.lightningFlash = 150 + Math.random() * 200; // Flash duration
        this.triggerShake(18, 300); // Thunder rumble shake
        sounds.playThunder();
        this.lightningTimer = 5000 + Math.random() * 8000; // Next flash in 5-13 seconds
      }
    }

    if (this.lightningFlash > 0) {
      this.lightningFlash -= dt;
    }

    // Scale difficulty parameters
    this.scaleDifficulty();

    // 1. Update Player Movement (Smooth Lerping)
    const prevX = this.player.x;
    this.player.x += (this.player.targetX - this.player.x) * this.player.lerpSpeed;
    
    const velocityX = this.player.x - prevX;
    
    // Determine player movement direction state for frames
    if (Math.abs(velocityX) < 0.8) {
      this.player.dirState = 'idle';
    } else if (velocityX < 0) {
      this.player.dirState = 'left';
    } else {
      this.player.dirState = 'right';
    }

    // Handle frame cycling
    if (now - this.player.lastFrameChange > this.player.frameInterval) {
      this.player.animFrame = (this.player.animFrame + 1) % 4; // Cycles: 0, 1, 2, 3 (we can do 1 -> 2 -> 3 -> 2 sequence)
      this.player.lastFrameChange = now;
    }

    // Handle invulnerability flashing
    if (this.player.invulnerable) {
      this.player.invulnTime -= dt;
      if (this.player.invulnTime <= 0) {
        this.player.invulnerable = false;
        this.player.flashState = true;
      } else {
        // Flash state toggles every 60ms
        this.player.flashState = (Math.floor(now / 60) % 2 === 0);
      }
    }

    // 2. Update Falling Objects
    for (let i = this.entities.length - 1; i >= 0; i--) {
      const entity = this.entities[i];
      const timeScale = dt / 16.666; // Normalized to 60fps speed
      
      // Move downward
      entity.y += entity.speed * timeScale;

      // Handle swaying (leaf) gimmick
      if (entity.isSwaying) {
        entity.swayAngle += entity.swaySpeed * timeScale;
        entity.x = entity.baseX + Math.sin(entity.swayAngle) * entity.swayRange;
        // Clamp to screen bounds
        entity.x = Math.max(0, Math.min(CANVAS_WIDTH - entity.width, entity.x));
        
        // Rock back and forth if not spinning
        if (!entity.isSpinning) {
          entity.rotation = Math.sin(entity.swayAngle) * 0.4;
        }
      }

      // Handle spinning gimmick
      if (entity.isSpinning) {
        entity.rotation += entity.rotationSpeed * timeScale;
      }

      // Check collision
      if (this.checkCollision(this.player, entity)) {
        this.handleCollision(entity);
        this.entities.splice(i, 1);
        continue;
      }

      // Remove offscreen objects
      if (entity.y > CANVAS_HEIGHT) {
        this.entities.splice(i, 1);
      }
    }

    // 3. Spawner trigger
    if (now - this.lastSpawnTime > this.spawnInterval) {
      this.spawnObject();
      this.lastSpawnTime = now;
    }

    // 4. Update Time Score (1 point per second)
    this.elapsedPlayTime = now - this.startTime;
    if (now - this.lastTimeIncrement >= 1000) {
      this.timeSurvived += 1;
      this.score += 1;
      this.updateScoreHUD();
      this.lastTimeIncrement = now;
    }

    // 5. Update Particles
    this.spawnWindParticles();
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.age++;
      
      // Remove dead particles
      if (p.age >= p.maxAge || p.x < -20 || p.y > CANVAS_HEIGHT) {
        this.particles.splice(i, 1);
      }
    }

    // 6. Update Floating Texts
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y -= 1.2; // Float up
      ft.age++;
      if (ft.age >= ft.maxAge) {
        this.floatingTexts.splice(i, 1);
      }
    }

    // 7. Update camera shake decay
    if (this.shake.duration > 0) {
      this.shake.duration -= dt;
      // Shake offset decays linearly
      const currentIntensity = this.shake.intensity * (this.shake.duration / 250);
      this.shake.x = (Math.random() - 0.5) * 2 * currentIntensity;
      this.shake.y = (Math.random() - 0.5) * 2 * currentIntensity;
      
      if (this.shake.duration <= 0) {
        this.shake.x = 0;
        this.shake.y = 0;
      }
    }
  }

  draw() {
    const elapsedSeconds = (Date.now() - this.pageLoadTime) / 1000;
    const timeInCycle = elapsedSeconds % 120;
    const distFromMidnight = Math.abs(timeInCycle - 60);
    this.nightFactor = distFromMidnight < 40 ? (1 + Math.cos(Math.PI * distFromMidnight / 40)) / 2 : 0;

    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Save context for camera shake
    this.ctx.save();
    this.ctx.translate(this.shake.x, this.shake.y);

    // Draw Stars (twinkling in lockstep with day-night cycle)
    if (this.nightFactor > 0 && this.weather === 'NORMAL') {
      this.ctx.save();
      this.ctx.globalAlpha = this.nightFactor;
      this.stars.forEach(star => {
        const twinkle = 0.4 + 0.6 * Math.sin((Date.now() / 300) + star.twinkleOffset);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        this.ctx.fill();
      });
      this.ctx.restore();
    }

    // 1. Draw Environment Wind Particles (Background layer)
    this.particles.forEach(p => {
      if (p.isWind) {
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(p.x, p.y, p.size, p.size);
      }
    });

    // Draw Weather Particles (behind objects but in front of wind sparkles)
    if (this.weatherParticles && this.weatherParticles.length > 0) {
      this.ctx.save();
      this.weatherParticles.forEach(p => {
        if (p.type === 'snow') {
          this.ctx.fillStyle = '#ffffff';
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          this.ctx.fill();
        } else if (p.type === 'rain') {
          this.ctx.strokeStyle = 'rgba(174, 219, 240, 0.45)';
          this.ctx.lineWidth = p.size;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p.x + p.vx * 0.8, p.y + p.vy * 0.8);
          this.ctx.stroke();
        }
      });
      this.ctx.restore();
    }

    // 2. Draw Falling Objects
    this.entities.forEach(entity => {
      const img = entity.type === 'unpo' ? this.unpoCanvas : this.images[entity.type];
      if (img) {
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.save();
        
        // Apply ghost transparency gimmick (25% opacity)
        if (entity.isGhost) {
          this.ctx.globalAlpha = 0.25;
        } else {
          this.ctx.globalAlpha = 1.0;
        }
        
        // Translate to the center of the entity
        this.ctx.translate(entity.x + entity.width / 2, entity.y + entity.height / 2);
        
        // Apply rotation if defined
        if (entity.rotation) {
          this.ctx.rotate(entity.rotation);
        }
        
        // Draw relative to center
        this.ctx.drawImage(img, -entity.width / 2, -entity.height / 2, entity.width, entity.height);
        this.ctx.restore();
      }
    });

    // 3. Draw Poyonpoyon Character
    if (this.player.flashState) {
      // Calculate correct frame (cycling sequence: 1 -> 2 -> 3 -> 2)
      let frameNum = 1;
      if (this.player.animFrame === 0) frameNum = 1;
      else if (this.player.animFrame === 1) frameNum = 2;
      else if (this.player.animFrame === 2) frameNum = 3;
      else frameNum = 2;

      const assetKey = `pypy_${this.player.dirState}${frameNum}`;
      const playerImg = this.images[assetKey];
      
      if (playerImg) {
        // Squash and Stretch based on velocity for juicy bouncy feel
        const velocityX = Math.abs(this.player.targetX - this.player.x);
        const stretchX = Math.min(1.2, 1 + velocityX * 0.005);
        const stretchY = Math.max(0.8, 1 - velocityX * 0.005);
        
        const drawW = this.player.width * stretchX;
        const drawH = this.player.height * stretchY;
        
        // Draw centered relative to actual coordinate
        const drawX = this.player.x - (drawW - this.player.width) / 2;
        const drawY = this.player.y + (this.player.height - drawH);

        this.ctx.imageSmoothingEnabled = false;
        
        // If invulnerable, draw with transparency
        if (this.player.invulnerable) {
          this.ctx.globalAlpha = 0.5;
        }
        
        this.ctx.drawImage(playerImg, drawX, drawY, drawW, drawH);
        this.ctx.globalAlpha = 1.0;
      }
    }

    // 4. Draw Grass Ground at bottom
    // Bottom Grass Ground (Dark/Light pixel layered green grass)
    this.ctx.fillStyle = '#38b000';
    this.ctx.fillRect(0, CANVAS_HEIGHT - GRASS_HEIGHT, CANVAS_WIDTH, GRASS_HEIGHT);
    
    // Grass top border tiles (retro jagged design)
    this.ctx.fillStyle = '#70e000';
    const tileSize = 12;
    for (let x = 0; x < CANVAS_WIDTH; x += tileSize) {
      // Draw alternating blocks for a classic 8-bit grass edge
      const yOffset = (x / tileSize) % 2 === 0 ? 0 : tileSize;
      this.ctx.fillRect(x, CANVAS_HEIGHT - GRASS_HEIGHT + yOffset, tileSize, tileSize);
    }

    // 5. Draw Particles (Foreground burst layer)
    this.particles.forEach(p => {
      if (!p.isWind) {
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(p.x, p.y, p.size, p.size);
      }
    });

    // 6. Draw Floating Texts
    this.floatingTexts.forEach(ft => {
      this.ctx.font = '16px "DotGothic16", monospace';
      this.ctx.fillStyle = ft.color;
      this.ctx.strokeStyle = '#1a202c';
      this.ctx.lineWidth = 4;
      this.ctx.textAlign = 'center';
      
      // Fade out dynamically
      const opacity = 1 - (ft.age / ft.maxAge);
      this.ctx.globalAlpha = opacity;
      
      // Text border outline
      this.ctx.strokeText(ft.str, ft.x, ft.y);
      this.ctx.fillText(ft.str, ft.x, ft.y);
    });
    
    this.ctx.globalAlpha = 1.0;
    this.ctx.restore();

    // 7. Draw Lightning Flash (Foreground overlay screen flash, outside camera shake context)
    if (this.lightningFlash > 0) {
      this.ctx.save();
      const flashOpacity = 0.5 + Math.random() * 0.3;
      this.ctx.fillStyle = `rgba(255, 255, 255, ${flashOpacity})`;
      this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      this.ctx.restore();
    }
  }

  // Main game loop
  loop(timestamp) {
    if (!this.lastFrameTime) this.lastFrameTime = timestamp;
    const dt = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    if (this.state === 'PLAYING') {
      this.update(dt);
      this.draw();
    } else if (this.state === 'PAUSED' || this.state === 'GAMEOVER') {
      // Draw but don't update physics (maintains overlays correctly)
      this.draw();
    } else if (this.state === 'TITLE') {
      // Draw static background/idle character when in title menu
      this.drawTitleBackground();
    }

    requestAnimationFrame((t) => this.loop(t));
  }

  drawTitleBackground() {
    const elapsedSeconds = (Date.now() - this.pageLoadTime) / 1000;
    const timeInCycle = elapsedSeconds % 120;
    const distFromMidnight = Math.abs(timeInCycle - 60);
    this.nightFactor = distFromMidnight < 40 ? (1 + Math.cos(Math.PI * distFromMidnight / 40)) / 2 : 0;

    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw Stars (twinkling at night on Title screen too)
    if (this.nightFactor > 0 && this.weather === 'NORMAL') {
      this.ctx.save();
      this.ctx.globalAlpha = this.nightFactor;
      this.stars.forEach(star => {
        const twinkle = 0.4 + 0.6 * Math.sin((Date.now() / 300) + star.twinkleOffset);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        this.ctx.fill();
      });
      this.ctx.restore();
    }
    
    // Spawn wind particles even in title screen
    this.spawnWindParticles();
    this.particles.forEach(p => {
      if (p.isWind) {
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(p.x, p.y, p.size, p.size);
      }
    });
    
    // Draw ground
    this.ctx.fillStyle = '#38b000';
    this.ctx.fillRect(0, CANVAS_HEIGHT - GRASS_HEIGHT, CANVAS_WIDTH, GRASS_HEIGHT);
    
    this.ctx.fillStyle = '#70e000';
    const tileSize = 12;
    for (let x = 0; x < CANVAS_WIDTH; x += tileSize) {
      const yOffset = (x / tileSize) % 2 === 0 ? 0 : tileSize;
      this.ctx.fillRect(x, CANVAS_HEIGHT - GRASS_HEIGHT + yOffset, tileSize, tileSize);
    }
  }
}

// Instantiate engine when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  const game = new GameEngine();
  // Start canvas render loop immediately
  requestAnimationFrame((t) => game.loop(t));
});
