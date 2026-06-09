/**
 * Poyonpoyon Dodge Game (ぽよんぽよんのよけよけ大作戦)
 */
const TRANSLATIONS = {
  ja: {
    "title": "ぽよんぽよんのよけよけ大作戦 | Poyonpoyon Dodge Game",
    "meta-desc": "空から降ってくる猫たちを避けて、キャロットやソン先生をキャッチしよう！ぽよんぽよんが主人公のドット絵アクションゲーム。",
    "loading-status": "アセットを読み込み中...",
    "title-sub": "ぽよんぽよんの",
    "title-main": "よけよけ大作戦",
    "instructions-title": "あそびかた",
    "instruction-1": "左右にドラッグ（または左右矢印キー）でぽよんぽよんを動かそう！",
    "instruction-2": "をキャッチすると良いことがあるかも...?!",
    "instruction-3": "に当たると <strong>ダメージ！</strong>",
    "instruction-or": "や",
    "instruction-4": "時間経過とともに難易度アップ！",
    "btn-start": "スタート",
    "btn-ranking": "ランキング",
    "pause-title": "一時停止中",
    "btn-resume": "ゲームに戻る",
    "btn-to-title": "タイトルへ",
    "score-label": "スコア:",
    "time-label": "生存時間:",
    "best-score-label": "自己ベスト:",
    "btn-restart": "もういちど遊ぶ",
    "registration-label": "オンラインランキングに登録",
    "btn-submit": "送信",
    "ranking-loading": "読み込み中...",
    "th-rank": "順位",
    "th-name": "なまえ",
    "th-score": "スコア",
    "th-time": "時間",
    "no-data": "データがありません。最初の登録者になろう！",
    "float-life-up": "残機 +1",
    "float-points-suffix": "点",
    "float-score-fever": "スコア10倍！",
    "status-submitting": "送信中...",
    "status-success": "登録完了しました！",
    "status-fail": "送信に失敗しました。再試行してください。",
    "status-error": "ランキングの取得に失敗しました。",
    "time-unit": "秒",
    "click-to-continue": "画面タップ または キー入力で次へ",
    "instruction-carrot": "をキャッチすると <strong>残機+1！</strong>"
  },
  ko: {
    "title": "뽀용뽀용의 비사이로막가 대작전 | Poyonpoyon Dodge Game",
    "meta-desc": "하늘에서 떨어지는 고양이들을 피하며 캐럿이나 송센세를 잡으세요! 뽀용뽀용이 주인공인 도트 액션 게임.",
    "loading-status": "에셋 불러오는 중...",
    "title-sub": "뽀용뽀용의",
    "title-main": "비사이로막가 대작전",
    "instructions-title": "게임 방법",
    "instruction-1": "좌우로 드래그 (또는 좌우 화살표 키) 하여 뽀용뽀용을 움직이세요!",
    "instruction-2": "를 캐치하면 좋은 일이 생길지도...?!",
    "instruction-3": "에 부딪히면 <strong>대미지!</strong>",
    "instruction-or": " 또는 ",
    "instruction-carrot": "을 캐치하면 <strong>목숨+1!</strong>",
    "instruction-4": "시간이 지날수록 난이도 업!",
    "btn-start": "스타트",
    "btn-ranking": "랭킹",
    "pause-title": "일시정지 중",
    "btn-resume": "게임으로 돌아가기",
    "btn-to-title": "타이틀로",
    "score-label": "스코어:",
    "time-label": "생존 시간:",
    "best-score-label": "최고 기록:",
    "btn-restart": "다시 하기",
    "registration-label": "온라인 랭킹에 등록",
    "btn-submit": "전송",
    "ranking-loading": "불러오는 중...",
    "th-rank": "순위",
    "th-name": "이름",
    "th-score": "스코어",
    "th-time": "시간",
    "no-data": "데이터가 없습니다. 첫 번째 등록자가 되어보세요!",
    "float-life-up": "목숨 +1",
    "float-points-suffix": "점",
    "float-score-fever": "스코어 10배!",
    "status-submitting": "전송 중...",
    "status-success": "등록 완료되었습니다!",
    "status-fail": "전송에 실패했습니다. 다시 시도해주세요.",
    "status-error": "랭킹을 불러오지 못했습니다.",
    "time-unit": "초",
    "click-to-continue": "화면을 터치하거나 아무 키나 눌러서 계속"
  }
};

// ==========================================================================
// 1. CONFIGURATION & CONSTANTS
// ==========================================================================
const CANVAS_WIDTH = 540;   // Virtual Width
const CANVAS_HEIGHT = 960;  // Virtual Height
const GRASS_HEIGHT = 100;   // Height of the grass ground at the bottom
const MAX_LIVES = 5;
const INITIAL_LIVES = 3;
const RANKING_API_URL = 'https://script.google.com/macros/s/AKfycbybhv6cgp_vF01mHrWDux67I8JIGLjBZqmbLWszmw8ia1UnCVXrS859AK_foN0KSoEmyw/exec';

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
  song: { name: 'ソン先生', points: 0, lifeChg: 0, prob: 0.01, speedMult: 1.0, size: { w: 64, h: 55 } },
  carrot: { name: 'キャロット', points: 50, lifeChg: 1, prob: 0.04, speedMult: 1.1, size: { w: 45, h: 45 } },
  ponyan: { name: 'ぽにゃん', points: -3, lifeChg: -1, prob: 0.30, speedMult: 0.95, size: { w: 60, h: 51 } },
  pomu: { name: 'ぽむ', points: -2, lifeChg: -1, prob: 0.30, speedMult: 1.05, size: { w: 60, h: 51 } },
  pomi: { name: 'ぽみ', points: -1, lifeChg: -1, prob: 0.30, speedMult: 0.9, size: { w: 60, h: 51 } },
  unpo: { name: 'うんぽ', points: -10, lifeChg: -1, prob: 0.05, speedMult: 1.25, size: { w: 45, h: 45 } }
};

// Poop 16x16 Pixel Matrix for programmatic generation
const POOP_MATRIX = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 2, 2, 3, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 2, 3, 4, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 2, 2, 2, 3, 3, 4, 1, 0, 0, 0, 0],
  [0, 0, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 1, 0, 0, 0],
  [0, 0, 1, 3, 3, 3, 3, 4, 4, 4, 4, 4, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 1, 0],
  [1, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 1, 0],
  [1, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 1, 0],
  [1, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// Color mapping for poop sprite
const POOP_COLORS = {
  0: 'transparent',
  1: '#2e1b10', // Outline
  2: '#d7a15c', // Highlight
  3: '#9f6532', // Medium brown
  4: '#592e12'  // Dark brown
};

// Carrot 16x16 Pixel Matrix for programmatic generation
const CARROT_MATRIX = [
  [0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0],
  [0, 0, 4, 5, 4, 0, 4, 4, 0, 4, 5, 4, 0, 0, 0, 0],
  [0, 0, 0, 4, 5, 4, 5, 5, 4, 5, 4, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 3, 3, 3, 2, 2, 2, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 3, 3, 3, 2, 2, 2, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 3, 3, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 3, 3, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 3, 3, 2, 2, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 3, 3, 2, 2, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 3, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// Color mapping for carrot sprite
const CARROT_COLORS = {
  0: 'transparent',
  1: '#4a1d00', // Outline
  2: '#e65c00', // Orange body
  3: '#ff9933', // Highlight orange
  4: '#38b000', // Green leaves
  5: '#1b4d00'  // Dark green leaves
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
    this.carrotCanvas = null; // Programmatic canvas for carrot sprite
    this.scoreMultiplier = 1;
    this.multiplierTimer = 0; // remaining time in ms for 2x score
    this.activeDefaultName = '';
    this.livesTapCount = 0; // Easter Egg tap count

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

    // Initialize language (Default to Korean 'ko' as requested)
    const savedLang = localStorage.getItem('pypy_lang');
    this.lang = savedLang || 'ko';
    this.switchLanguage(this.lang);

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

  renderUnpoDescription() {
    const canvas = document.getElementById('unpo-desc-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const pixelSize = canvas.width / 16;
    for (let r = 0; r < 16; r++) {
      for (let c = 0; c < 16; c++) {
        const colorId = POOP_MATRIX[r][c];
        if (colorId > 0) {
          ctx.fillStyle = POOP_COLORS[colorId];
          ctx.fillRect(c * pixelSize, r * pixelSize, pixelSize, pixelSize);
        }
      }
    }
  }

  // Create offscreen carrot sprite
  createCarrotSprite() {
    const cCanvas = document.createElement('canvas');
    cCanvas.width = 16;
    cCanvas.height = 16;
    const cCtx = cCanvas.getContext('2d');

    for (let r = 0; r < 16; r++) {
      for (let c = 0; c < 16; c++) {
        const colorId = CARROT_MATRIX[r][c];
        if (colorId > 0) {
          cCtx.fillStyle = CARROT_COLORS[colorId];
          cCtx.fillRect(c, r, 1, 1);
        }
      }
    }
    this.carrotCanvas = cCanvas;
  }

  renderCarrotDescription() {
    const canvas = document.getElementById('carrot-desc-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const pixelSize = canvas.width / 16;
    for (let r = 0; r < 16; r++) {
      for (let c = 0; c < 16; c++) {
        const colorId = CARROT_MATRIX[r][c];
        if (colorId > 0) {
          ctx.fillStyle = CARROT_COLORS[colorId];
          ctx.fillRect(c * pixelSize, r * pixelSize, pixelSize, pixelSize);
        }
      }
    }
  }

  renderCarrotPreview() {
    const canvas = document.getElementById('carrot-preview-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const pixelSize = canvas.width / 16;
    for (let r = 0; r < 16; r++) {
      for (let c = 0; c < 16; c++) {
        const colorId = CARROT_MATRIX[r][c];
        if (colorId > 0) {
          ctx.fillStyle = CARROT_COLORS[colorId];
          ctx.fillRect(c * pixelSize, r * pixelSize, pixelSize, pixelSize);
        }
      }
    }
  }

  switchLanguage(lang) {
    this.lang = lang;
    localStorage.setItem('pypy_lang', lang);

    const dict = TRANSLATIONS[lang];
    if (!dict) return;

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (key.startsWith('instruction-') || key === 'registration-label') {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    document.title = dict['title'] || document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict['meta-desc']) {
      metaDesc.setAttribute('content', dict['meta-desc']);
    }

    const btnJa = document.getElementById('btn-lang-ja');
    const btnKo = document.getElementById('btn-lang-ko');
    if (btnJa && btnKo) {
      if (lang === 'ja') {
        btnJa.classList.add('active');
        btnKo.classList.remove('active');
      } else {
        btnKo.classList.add('active');
        btnJa.classList.remove('active');
      }
    }
  }

  i18n(key) {
    return TRANSLATIONS[this.lang]?.[key] || key;
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

        // Build carrot sprite
        this.createCarrotSprite();

        // Render unpo description canvas on title screen
        this.renderUnpoDescription();

        // Render carrot description canvas on title screen
        this.renderCarrotDescription();

        // Render carrot preview canvas on title screen
        this.renderCarrotPreview();

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

      // Handle transition to score screen on any key press during Game Over animation
      if (this.state === 'GAMEOVER_ANIM') {
        // Enforce 500ms minimum animation display time on keypresses
        if (this.gameoverAnimElapsed > 500) {
          e.preventDefault();
          sounds.playClick();
          this.goToScoreScreen();
        }
        return;
      }

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
      if (this.state === 'GAMEOVER_ANIM') {
        // Enforce 500ms minimum animation display time on taps
        if (this.gameoverAnimElapsed > 500) {
          sounds.playClick();
          this.goToScoreScreen();
        }
        return;
      }
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
    // 言語切替ボタンのバインド
    this.setupMobileButton('btn-lang-ja', () => {
      this.switchLanguage('ja');
    });
    this.setupMobileButton('btn-lang-ko', () => {
      this.switchLanguage('ko');
    });

    // Start game button
    this.setupMobileButton('btn-start', () => {
      this.startGame();
    });

    // Ranking board button
    this.setupMobileButton('btn-ranking', () => {
      this.showRankingBoard();
    });

    // Close ranking button
    this.setupMobileButton('btn-close-ranking', () => {
      document.getElementById('ranking-modal').classList.add('hidden');
    });

    // Submit score button
    this.setupMobileButton('btn-submit-score', () => {
      this.handleManualScoreSubmit();
    });

    // Input box focus/blur events for default name handling
    const nameInput = document.getElementById('player-name');
    if (nameInput) {
      nameInput.addEventListener('focus', () => {
        if (nameInput.value === this.activeDefaultName) {
          nameInput.value = '';
          nameInput.style.color = '#1a202c';
        }
      });
      nameInput.addEventListener('blur', () => {
        if (nameInput.value.trim() === '') {
          nameInput.value = this.activeDefaultName;
          nameInput.style.color = '#718096';
        }
      });
    }

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

    // Easter egg: tap lives HUD 3 times to spawn Song-sensei
    const livesEl = document.getElementById('hud-lives');
    if (livesEl) {
      livesEl.addEventListener('pointerdown', (e) => {
        if (this.state !== 'PLAYING') return;
        this.livesTapCount = (this.livesTapCount || 0) + 1;
        if (this.livesTapCount >= 3) {
          this.livesTapCount = 0;
          this.spawnObject('song');
        }
      });
    }
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
    document.getElementById('ranking-modal').classList.add('hidden');
    document.getElementById('ranking-registration').classList.add('hidden');

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

    // Reset score multiplier
    this.scoreMultiplier = 1;
    this.multiplierTimer = 0;
    this.livesTapCount = 0;
    const multEl = document.getElementById('hud-multiplier');
    if (multEl) multEl.classList.add('hidden');
    const scoreEl = document.getElementById('hud-score');
    if (scoreEl) scoreEl.style.color = '#1a202c';

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
  spawnObject(forcedType = null) {
    let selectedType = forcedType;
    if (!selectedType) {
      const roll = Math.random();
      selectedType = 'ponyan'; // default
      let accumulatedProb = 0;

      for (const [type, config] of Object.entries(OBJECT_TYPES)) {
        accumulatedProb += config.prob;
        if (roll <= accumulatedProb) {
          selectedType = type;
          break;
        }
      }
    }

    const config = OBJECT_TYPES[selectedType];

    // Roll for individual independent gimmicks
    const isFast = Math.random() < 0.20; // 20% chance to be extra fast
    
    // Song-sensei should not have the ghost/transparency gimmick applied
    const isGhost = (selectedType === 'song') ? false : (Math.random() < 0.15); // 15% chance to be semi-transparent
    let ghostAlpha = 1.0;
    if (isGhost) {
      const alphas = [0.75, 0.5, 0.25];
      ghostAlpha = alphas[Math.floor(Math.random() * alphas.length)];
    }

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
      ghostAlpha,
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

  // Helper to check if a column is clear to spawn a new object near the top
  isColumnClear(colIndex) {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      if (entity.isGameOverObject && entity.colIndex === colIndex && entity.y < 120) {
        return false;
      }
    }
    return true;
  }

  // Helper to check if all columns are fully filled up to the top
  isGameOverScreenFilled() {
    return this.columnHeights.every(h => h <= -100);
  }

  // Spawns a randomized object for the Game Over dramatic filling effect (column-restricted)
  spawnGameOverObject(colIndex) {
    const types = ['song', 'carrot', 'ponyan', 'pomu', 'pomi', 'unpo'];
    const selectedType = types[Math.floor(Math.random() * types.length)];
    const config = OBJECT_TYPES[selectedType];

    const width = 60;
    // Scale height to preserve aspect ratio of the original sprite relative to 60px width
    const height = config.size.h * (60 / config.size.w);

    const x = colIndex * 60;
    const y = -height;

    // Fixed speed for all falling objects to prevent overlapping while falling
    const speed = 25;

    // Full opacity (transparency removed as requested)
    const ghostAlpha = 1.0;

    // Random rotation: 0 to 2*PI, and some rotation speed so they spin while falling
    const rotation = Math.random() * Math.PI * 2;
    const rotationSpeed = (Math.random() - 0.5) * 0.15;

    this.entities.push({
      type: selectedType,
      x,
      y,
      width,
      height,
      speed,
      name: config.name,
      isFast: false,
      isGhost: false,
      ghostAlpha,
      sizeScale: 1.0,
      isSpinning: true,
      isSwaying: false,
      rotation,
      rotationSpeed,
      swayRange: 0,
      swaySpeed: 0,
      swayAngle: 0,
      baseX: x,
      isGameOverObject: true,
      colIndex: colIndex
    });
  }

  // Update loop for the Game Over dramatic filling animation
  updateGameOverAnim(dt) {
    this.gameoverAnimElapsed = (this.gameoverAnimElapsed || 0) + dt;
    const timeScale = dt / 16.666;

    // Spawn new objects rapidly if the screen is not completely filled yet
    if (!this.isGameOverScreenFilled()) {
      this.gameoverSpawnAccumulator = (this.gameoverSpawnAccumulator || 0) + dt;
      // Spawn an object every 15ms of elapsed game time
      while (this.gameoverSpawnAccumulator >= 15) {
        // Find available columns that are not full and are clear at the top
        const availableCols = [];
        for (let c = 0; c < 9; c++) {
          if (this.columnHeights[c] > -100 && this.isColumnClear(c)) {
            availableCols.push(c);
          }
        }

        if (availableCols.length > 0) {
          const colIndex = availableCols[Math.floor(Math.random() * availableCols.length)];
          this.spawnGameOverObject(colIndex);
        }
        this.gameoverSpawnAccumulator -= 15;
      }
    }

    // Update positions and handle stacking against the columns
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      if (entity.isGameOverObject && entity.speed > 0) {
        entity.y += entity.speed * timeScale;
        if (entity.rotationSpeed) {
          entity.rotation += entity.rotationSpeed * timeScale;
        }

        // Check if the bottom of the object hits or goes below its column's current stack height
        const targetY = this.columnHeights[entity.colIndex] - entity.height;
        if (entity.y >= targetY) {
          entity.y = targetY;
          entity.speed = 0; // stop falling
          entity.rotationSpeed = 0; // stop spinning
          // Update stack height for this column
          this.columnHeights[entity.colIndex] -= entity.height;
        }
      }
    }

    // Update standard particle effects (for any wind particles)
    this.spawnWindParticles();
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.age++;
      if (p.age >= p.maxAge || p.x < -20 || p.y > CANVAS_HEIGHT) {
        this.particles.splice(i, 1);
      }
    }
  }

  // Increase difficulty over time (1.5x every 3 minutes / 180 seconds)
  scaleDifficulty() {
    const elapsedSeconds = this.elapsedPlayTime / 1000;
    const multiplier = Math.pow(1.5, elapsedSeconds / 180);

    // Base speed starts at 5 and increases 1.5x every 3 minutes
    this.baseSpeed = 5 * multiplier;

    // Spawn rate increases 1.5x every 3 minutes (spawn interval is divided by multiplier, min cap of 100ms)
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

    if (entity.type === 'carrot') {
      // Catching Carrot: Positive! Recover life, or if at max life, get 50 points
      sounds.playCoin();

      if (this.lives < MAX_LIVES) {
        this.lives += config.lifeChg;
        this.updateLivesHUD();
        this.spawnFloatingText(this.i18n('float-life-up'), entity.x + entity.width / 2, entity.y, '#38b000');
      } else {
        const gainedPoints = config.points * this.scoreMultiplier;
        this.score += gainedPoints;
        this.updateScoreHUD();
        this.spawnFloatingText(`+${gainedPoints} ${this.i18n('float-points-suffix')}`, entity.x + entity.width / 2, entity.y, '#38b000');
      }

      // Green shiny particles burst
      this.spawnBurst(entity.x + entity.width / 2, entity.y + entity.height / 2, '#70e000', 12);
    }
    else if (entity.type === 'song') {
      // Catching Song-sensei: Positive! 10s 10x Score Fever!
      sounds.playPowerup();

      this.scoreMultiplier = 10;
      this.multiplierTimer = 10000; // 10 seconds

      // Show multiplier indicator on HUD
      const multEl = document.getElementById('hud-multiplier');
      if (multEl) {
        multEl.innerText = "10x";
        multEl.classList.remove('hidden');
      }
      const scoreEl = document.getElementById('hud-score');
      if (scoreEl) scoreEl.style.color = '#ff9f1c'; // Gold/orange score text during 10x

      this.spawnFloatingText(this.i18n('float-score-fever'), entity.x + entity.width / 2, entity.y, '#ff9e00');

      // Orange shiny particles burst
      this.spawnBurst(entity.x + entity.width / 2, entity.y + entity.height / 2, '#ff9933', 15);
    }
    else {
      // Colliding with other characters/poop: Negative (or positive during Song-sensei fever!)
      const isFever = this.scoreMultiplier === 10;

      if (isFever) {
        // Caught during Song-sensei fever: positive bonus!
        sounds.playCoin();

        const bonusPoints = Math.abs(config.points);
        this.score += bonusPoints;

        // Floating score pop
        this.spawnFloatingText(`+${bonusPoints} ${this.i18n('float-points-suffix')}`, entity.x + entity.width / 2, entity.y, '#38b000');

        // Burst particles depending on object type
        const burstColor = entity.type === 'unpo' ? '#8c5830' : '#ff477e';
        this.spawnBurst(entity.x + entity.width / 2, entity.y + entity.height / 2, burstColor, 10);
      }
      else {
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
        this.spawnFloatingText(`${config.points} ${this.i18n('float-points-suffix')}`, entity.x + entity.width / 2, entity.y, '#d90429');

        // Burst particles depending on object type
        const burstColor = entity.type === 'unpo' ? '#8c5830' : '#ff477e';
        this.spawnBurst(entity.x + entity.width / 2, entity.y + entity.height / 2, burstColor, 10);

        // Verify game over
        if (this.lives <= 0) {
          this.gameOver();
        }
      }
    }

    this.updateScoreHUD();
  }

  gameOver() {
    sounds.playGameOver();

    // High score verification
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('pypy_highscore', this.highScore);
      this.isNewHighScore = true;
    }

    // Initialize Game Over Animation properties
    this.columnHeights = Array(9).fill(CANVAS_HEIGHT);
    this.gameoverSpawnAccumulator = 0;
    this.gameoverAnimElapsed = 0;

    this.transitionTo('GAMEOVER_ANIM');
  }

  // Transitions from the animation to the actual score registration screen
  goToScoreScreen() {
    this.transitionTo('GAMEOVER');
    this.initScoreRegistration();
  }

  // オンラインランキング登録フォームの初期化
  initScoreRegistration() {
    const regForm = document.getElementById('ranking-registration');
    const statusEl = document.getElementById('registration-status');
    const submitBtn = document.getElementById('btn-submit-score');
    if (!regForm) return;

    regForm.classList.remove('hidden');
    if (submitBtn) submitBtn.disabled = false;
    if (statusEl) statusEl.innerText = '';

    // 規定値の名前をランダムで設定 (言語別)
    const nameInput = document.getElementById('player-name');
    if (nameInput) {
      let randomName = '';
      if (this.lang === 'ko') {
        const list1 = ["질풍의", "날쌘돌이", "배고픈", "춤추는", "잠자는", "밥먹는", "츄르먹는", "만취의"];
        const list2 = ["뽀용뽀용", "뽀카피", "송센세", "뽀냥이", "뽀무", "뽀미"];
        const w1 = list1[Math.floor(Math.random() * list1.length)];
        const w2 = list2[Math.floor(Math.random() * list2.length)];
        randomName = w1 + " " + w2; // スペースあり
      } else {
        const list1 = ["疾風の", "腹ペコの", "踊る", "爆睡中の", "大食いの"];
        const list2 = ["ぽよんぽよん", "ぽかぴー", "ソン先生", "ぽにゃん", "ぽむ", "ぽみ"];
        const w1 = list1[Math.floor(Math.random() * list1.length)];
        const w2 = list2[Math.floor(Math.random() * list2.length)];
        randomName = w1 + w2; // スペースなし
      }
      this.activeDefaultName = randomName;
      nameInput.value = randomName;
      nameInput.style.color = '#718096'; // プレースホルダー用の薄い文字色
    }
  }

  // スコアの直接送信処理
  async submitScoreDirectly(name) {
    if (!RANKING_API_URL) return;
    try {
      await fetch(RANKING_API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
          name: name,
          score: this.score,
          time: this.timeSurvived
        })
      });
      // no-cors の場合はレスポンスの内容を読み取れないため、成功とみなしてダミーを返します
      return { status: 'success' };
    } catch (error) {
      console.error('Submit score failed:', error);
      throw error;
    }
  }

  // 手動でのスコア送信処理
  async handleManualScoreSubmit() {
    const nameInput = document.getElementById('player-name');
    const statusEl = document.getElementById('registration-status');
    const submitBtn = document.getElementById('btn-submit-score');

    if (!nameInput || !statusEl || !submitBtn) return;

    let name = nameInput.value.trim();
    if (name === '' || name === this.activeDefaultName) {
      name = this.activeDefaultName || 'ななし';
    }

    submitBtn.disabled = true;
    statusEl.innerText = this.i18n('status-submitting');

    try {
      await this.submitScoreDirectly(name);
      statusEl.innerText = this.i18n('status-success');

      // 1秒後に自動でフォームを非表示にしてランキング画面を開く
      setTimeout(() => {
        const regForm = document.getElementById('ranking-registration');
        if (regForm) regForm.classList.add('hidden');
        this.showRankingBoard();
      }, 1000);
    } catch (error) {
      statusEl.innerText = this.i18n('status-fail');
      submitBtn.disabled = false;
    }
  }

  // ランキングボード表示処理
  async showRankingBoard() {
    const modal = document.getElementById('ranking-modal');
    const loading = document.getElementById('ranking-loading');
    const table = document.getElementById('ranking-table');
    const tbody = document.getElementById('ranking-tbody');

    if (!modal) return;
    modal.classList.remove('hidden');
    if (loading) loading.classList.remove('hidden');
    if (loading) loading.innerText = this.i18n('ranking-loading');
    if (table) table.classList.add('hidden');
    if (tbody) tbody.innerHTML = '';

    if (!RANKING_API_URL) {
      if (loading) loading.innerText = 'ランキングAPIのURLが設定されていません。';
      return;
    }

    try {
      const response = await fetch(RANKING_API_URL);
      if (!response.ok) throw new Error('取得エラー');
      const rankings = await response.json();

      if (loading) loading.classList.add('hidden');
      if (table) table.classList.remove('hidden');

      if (rankings.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3">${this.i18n('no-data')}</td></tr>`;
        return;
      }

      rankings.forEach((entry, index) => {
        const tr = document.createElement('tr');
        const rank = index + 1;

        let rankClass = '';
        if (rank === 1) rankClass = 'rank-1';
        else if (rank === 2) rankClass = 'rank-2';
        else if (rank === 3) rankClass = 'rank-3';

        tr.innerHTML = `
          <td class="${rankClass}">${rank}</td>
          <td>${this.escapeHTML(entry.name)}</td>
          <td>${entry.score}</td>
        `;
        tbody.appendChild(tr);
      });
    } catch (error) {
      console.error(error);
      if (loading) loading.innerText = this.i18n('status-error');
    }
  }

  escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g,
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
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

    // Update score multiplier timer
    if (this.multiplierTimer > 0) {
      this.multiplierTimer -= dt;
      if (this.multiplierTimer <= 0) {
        this.scoreMultiplier = 1;
        this.spawnFloatingText("10x End", this.player.x + this.player.width / 2, this.player.y - 20, '#ff9e00');
        const multEl = document.getElementById('hud-multiplier');
        if (multEl) multEl.classList.add('hidden');
        const scoreEl = document.getElementById('hud-score');
        if (scoreEl) scoreEl.style.color = '#1a202c';
      }
    }

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
      this.score += 1 * this.scoreMultiplier;
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
      const img = entity.type === 'unpo' ? this.unpoCanvas : (entity.type === 'carrot' ? this.carrotCanvas : this.images[entity.type]);
      if (img) {
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.save();

        // Apply ghost transparency gimmick
        if (entity.isGhost) {
          this.ctx.globalAlpha = entity.ghostAlpha;
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

    // Draw Fever Countdown (large semi-transparent number in screen center)
    if (this.state === 'PLAYING' && this.multiplierTimer > 0 && this.multiplierTimer <= 10000) {
      const countdownVal = Math.ceil(this.multiplierTimer / 1000);
      this.ctx.save();
      this.ctx.font = 'bold 120px "DotGothic16", monospace';
      this.ctx.fillStyle = 'rgba(255, 159, 28, 0.4)'; // Gold/Orange semi-transparent
      this.ctx.strokeStyle = 'rgba(26, 32, 44, 0.3)';
      this.ctx.lineWidth = 12;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.strokeText(countdownVal, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50);
      this.ctx.fillText(countdownVal, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50);
      this.ctx.restore();
    }

    // 7. Draw Lightning Flash (Foreground overlay screen flash, outside camera shake context)
    if (this.lightningFlash > 0) {
      this.ctx.save();
      const flashOpacity = 0.5 + Math.random() * 0.3;
      this.ctx.fillStyle = `rgba(255, 255, 255, ${flashOpacity})`;
      this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      this.ctx.restore();
    }

    // 8. Draw "TAP TO CONTINUE" prompt during GameOver animation
    if (this.state === 'GAMEOVER_ANIM') {
      const blink = Math.floor(Date.now() / 400) % 2 === 0;
      if (blink) {
        this.ctx.save();
        this.ctx.font = '22px "DotGothic16", monospace';
        this.ctx.fillStyle = '#ffffff';
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 4;
        this.ctx.textAlign = 'center';

        const txt = this.i18n('click-to-continue');
        this.ctx.strokeText(txt, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 150);
        this.ctx.fillText(txt, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 150);
        this.ctx.restore();
      }
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
    } else if (this.state === 'GAMEOVER_ANIM') {
      this.updateGameOverAnim(dt);
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
