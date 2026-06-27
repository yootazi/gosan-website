/* Gosan Weblog — minimal hero: centered architectural sketch that drifts with the cursor.
   "لایه‌ها، روایتگرِ زمان‌اند" — layers narrate time. */

const HL_IMAGE = 'assets/hero-arch-sm.jpg';

function HeroLab() {
  const mouse = React.useRef({ x: 0, y: 0 });      /* target offset from center, normalized -1..1 */
  const smooth = React.useRef({ x: 0, y: 0 });     /* eased */
  const rafRef = React.useRef(0);
  const [off, setOff] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const onMove = (e) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener('mousemove', onMove);
    const loop = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.06;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.06;
      setOff({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafRef.current); };
  }, []);

  /* layered parallax: base drifts gently, ghost lines drift further for a living "moving lines" feel */
  const base = `translate(${(-off.x * 14).toFixed(2)}px, ${(-off.y * 14).toFixed(2)}px) rotate(${(off.x * 0.6).toFixed(2)}deg)`;
  const ghost = `translate(${(off.x * 26).toFixed(2)}px, ${(off.y * 26).toFixed(2)}px) rotate(${(-off.x * 0.9).toFixed(2)}deg)`;

  return (
    <section className="hero-lab" data-screen-label="hero-lab" aria-label="نمای آغازین">
      {/* centered drifting sketch */}
      <div className="hl-stage">
        <div className="hl-ghost-img" aria-hidden="true" style={{ backgroundImage: `url("${HL_IMAGE}")`, transform: ghost }}></div>
        <div className="hl-img" role="img" aria-label="نگارهٔ معماری ایرانی" style={{ backgroundImage: `url("${HL_IMAGE}")`, transform: base }}></div>
      </div>

      {/* translucent gray panel (RTL start / right half) holding the text */}
      <div className="hl-panel">
        <div className="hl-panel-inner">
          <h1 className="hl-heading">
            <span className="hl-line1 display">لایه‌ها،</span>
            <span className="hl-line2">روایتگرِ زمان‌اند</span>
          </h1>
          <p className="hl-lede">
            هر لایه از این خاک، فصلی از یادِ این سرزمین را در خود دارد؛ از سنگ‌نگاره‌های کهن تا نقش‌های فراموش‌شده،
            نهفته در ژرفای هزاران سال. با گوسان، پرده از خاکِ زمان کنار می‌رود.
          </p>
          <div className="hl-actions">
            <Button href="#/article/gosan-narrators">خواندن شمارهٔ یکم</Button>
            <a className="hl-ghost" href="#/archive">بایگانی ←</a>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HeroLab });
