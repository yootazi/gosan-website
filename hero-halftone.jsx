/* Gosan Weblog — halftone logo hero.
   The «گوسان» wordmark (logo-mask.png) is stippled into a beaded halftone:
   off-white dots on near-black, large & overlapping where the letterform is
   solid (leaving small dark gaps), shrinking to scattered dots at the edges. */

const HALFTONE_MASK = 'assets/logo-mask.png';
const HALFTONE_W = 1608;
const HALFTONE_H = 1134;
const DOT_INK = '#F6F3EC';      /* warm near-white bead */
const DOT_BG = '#0A0C0B';       /* near-black field */

function HalftoneLogo() {
  const canvasRef = React.useRef(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = HALFTONE_MASK;

    const draw = () => {
      const spacing = 19;                      /* grid pitch in source px */
      const maxR = spacing * 0.62;             /* touching-dot radius */
      const cols = Math.ceil(HALFTONE_W / spacing);
      const rows = Math.ceil(HALFTONE_H / spacing);

      /* sample coverage by drawing the mask tiny — the downscale averages it */
      const s = document.createElement('canvas');
      s.width = cols; s.height = rows;
      const sctx = s.getContext('2d');
      sctx.drawImage(img, 0, 0, cols, rows);
      const data = sctx.getImageData(0, 0, cols, rows).data;

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = HALFTONE_W * dpr;
      canvas.height = HALFTONE_H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, HALFTONE_W, HALFTONE_H);

      /* deterministic pseudo-random so the pattern is stable across redraws */
      let seed = 1337;
      const rnd = () => {
        seed = (seed * 1664525 + 1013904223) & 0xffffffff;
        return ((seed >>> 0) / 0xffffffff);
      };

      ctx.fillStyle = DOT_INK;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const a = data[(j * cols + i) * 4 + 3] / 255;   /* mask alpha = coverage */
          if (a < 0.06) continue;
          const cx = (i + 0.5) * spacing + (rnd() - 0.5) * spacing * 0.22;
          const cy = (j + 0.5) * spacing + (rnd() - 0.5) * spacing * 0.22;
          const r = maxR * Math.pow(a, 0.45) * (0.9 + rnd() * 0.18);
          ctx.globalAlpha = 0.82 + rnd() * 0.18;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      setReady(true);
    };

    if (img.complete && img.naturalWidth) draw();
    else img.onload = draw;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`halftone-canvas${ready ? ' is-ready' : ''}`}
      role="img"
      aria-label="گوسان"
    ></canvas>
  );
}

function HalftoneHero() {
  return (
    <section className="hero-halftone" data-screen-label="سرصفحه">
      <div className="hero-halftone-inner">
        <span className="hero-halftone-eyebrow">ISSUE 01 // SPRING 2585</span>
        <HalftoneLogo />
        <p className="hero-halftone-tagline">روایتگرِ فرهنگ و هنرِ ایران</p>
        <div className="hero-halftone-actions">
          <a className="hero-halftone-btn" href="#/article/gosan-narrators">خواندن شمارهٔ یکم</a>
          <a className="hero-halftone-btn is-ghost" href="#/archive">بایگانی ←</a>
        </div>
      </div>
      <span className="hero-halftone-scroll" aria-hidden="true">گردش به پایین</span>
    </section>
  );
}

Object.assign(window, { HalftoneHero, HalftoneLogo });
