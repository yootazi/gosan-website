/* Gosan Weblog — logo hero (experiment).
   The teal Shahnameh miniature fills the hero; the «گوسان» logo is carved out
   of it as a white (paper) negative — a white layer masked to the logo silhouette. */

const LOGO_MASK = 'assets/logo-mask.png';
const LOGO_ASPECT = 1608 / 1134;

function LogoReveal() {
  return (
    <div className="logo-reveal" role="img" aria-label="گوسان">
      <div
        className="logo-reveal-white"
        style={{ WebkitMaskImage: `url("${LOGO_MASK}")`, maskImage: `url("${LOGO_MASK}")` }}
      ></div>
    </div>
  );
}

Object.assign(window, { LogoReveal });

/* ---------- draggable frosted text panel that slides over the logo ---------- */
function HeroPanel() {
  const stageRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const drag = React.useRef({ active: false, startX: 0, startLeft: 0 });
  const [left, setLeft] = React.useState(null); /* px from stage left; null = default */

  const clamp = (x) => {
    const stage = stageRef.current?.parentElement;
    const panel = panelRef.current;
    if (!stage || !panel) return x;
    const max = stage.clientWidth - panel.offsetWidth;
    return Math.max(0, Math.min(max, x));
  };

  React.useEffect(() => {
    /* default: rest on the LEFT (RTL-end) side, clear of the logo */
    const stage = stageRef.current?.parentElement;
    const panel = panelRef.current;
    if (stage && panel && left === null) {
      setLeft(clamp(Math.min(40, stage.clientWidth * 0.04)));
    }
  }, []);

  React.useEffect(() => {
    const onMove = (e) => {
      if (!drag.current.active) return;
      const px = (e.touches ? e.touches[0].clientX : e.clientX);
      setLeft(clamp(drag.current.startLeft + (px - drag.current.startX)));
      e.preventDefault();
    };
    const onUp = () => {
      if (!drag.current.active) return;
      drag.current.active = false;
      panelRef.current?.classList.remove('is-dragging');
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', onMove, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  const startDrag = (e) => {
    const px = (e.touches ? e.touches[0].clientX : e.clientX);
    drag.current = { active: true, startX: px, startLeft: panelRef.current.offsetLeft };
    panelRef.current.classList.add('is-dragging');
    document.body.style.userSelect = 'none';
  };

  const [open, setOpen] = React.useState(false);
  const stop = (e) => e.stopPropagation();

  return (
    <div className="hero-panel-track" ref={stageRef} aria-hidden="false">
      <div
        className="hero-panel"
        ref={panelRef}
        style={left === null ? undefined : { left: `${left}px`, right: 'auto' }}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        role="group"
        aria-label="پنل کشویی"
      >
        <span className="hero-panel-grip" aria-hidden="true"></span>

        {/* gold slide-out panel — opens rightward to cover the logo */}
        <div className={`hero-subpanel${open ? ' is-open' : ''}`} onMouseDown={stop} onTouchStart={stop}>
          <div className="hero-subpanel-inner">
            <GoldDots width={84} height={58} style={{ opacity: 0.85, marginBottom: '1.4rem' }} />
            <p className="hero-subpanel-quote">
              «گوسان»‌ها روایتگر بودند؛ روایتگرِ شادی و اندوهِ مردمان، رزم و بزمِ شاهان،
              پیروزی و شکستِ قهرمانان.
            </p>
            <p className="hero-subpanel-cite">از سرآغازِ شمارهٔ یکم</p>
          </div>
        </div>

        <div className="hero-panel-inner">
          <p className="hero-panel-tagline">روایتگرِ فرهنگ و هنرِ ایران</p>
          <p className="hero-panel-sub">گاهنامه‌ای در فرهنگ، هنر و میراث کهن ایران.</p>
          <div className="hero-actions">
            <Button href="#/article/gosan-narrators">خواندن شمارهٔ یکم</Button>
            <Button variant="ghost" href="#/archive">بایگانی ←</Button>
          </div>
          <button
            type="button"
            className={`hero-subpanel-toggle${open ? ' is-open' : ''}`}
            onMouseDown={stop}
            onTouchStart={stop}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            {open ? 'بستن ←' : 'پرده را کنار بزنید →'}
          </button>
        </div>

        {/* the 5-dot motif, anchored top-right of the panel */}
        <GoldDots width={84} height={58} style={{ position: 'absolute', top: '1.6rem', right: '1.4rem', opacity: 0.7 }} />
      </div>
    </div>
  );
}

Object.assign(window, { HeroPanel });
