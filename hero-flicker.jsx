/* Gosan Weblog — flickering-grid logo hero.
   Ported from the FlickeringGrid canvas effect: a grid of small squares whose
   opacities randomly flicker each frame. One faint gold grid fills the section
   (radial-vignette masked); a brighter warm-white grid is masked to the
   «گوسان» wordmark (logo-mask.png) so the logo reads as flickering squares. */

function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = 'rgb(246, 243, 236)',
  width,
  height,
  className = '',
  maxOpacity = 0.3,
  style,
}) {
  const canvasRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const [isInView, setIsInView] = React.useState(false);
  const [canvasSize, setCanvasSize] = React.useState({ width: 0, height: 0 });

  const memoizedColor = React.useMemo(() => {
    const toRGBA = (c) => {
      if (typeof window === 'undefined') return 'rgba(0, 0, 0,';
      const cv = document.createElement('canvas');
      cv.width = cv.height = 1;
      const ctx = cv.getContext('2d');
      if (!ctx) return 'rgba(255, 0, 0,';
      ctx.fillStyle = c;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
      return `rgba(${r}, ${g}, ${b},`;
    };
    return toRGBA(color);
  }, [color]);

  const setupCanvas = React.useCallback((canvas, w, h) => {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const cols = Math.floor(w / (squareSize + gridGap));
    const rows = Math.floor(h / (squareSize + gridGap));
    const squares = new Float32Array(cols * rows);
    for (let i = 0; i < squares.length; i++) squares[i] = Math.random() * maxOpacity;
    return { cols, rows, squares, dpr };
  }, [squareSize, gridGap, maxOpacity]);

  const updateSquares = React.useCallback((squares, deltaTime) => {
    for (let i = 0; i < squares.length; i++) {
      if (Math.random() < flickerChance * deltaTime) squares[i] = Math.random() * maxOpacity;
    }
  }, [flickerChance, maxOpacity]);

  const drawGrid = React.useCallback((ctx, w, h, cols, rows, squares, dpr) => {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const opacity = squares[i * rows + j];
        ctx.fillStyle = `${memoizedColor}${opacity})`;
        ctx.fillRect(
          i * (squareSize + gridGap) * dpr,
          j * (squareSize + gridGap) * dpr,
          squareSize * dpr,
          squareSize * dpr,
        );
      }
    }
  }, [memoizedColor, squareSize, gridGap]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let gridParams;

    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth;
      const newHeight = height || container.clientHeight;
      setCanvasSize({ width: newWidth, height: newHeight });
      gridParams = setupCanvas(canvas, newWidth, newHeight);
    };
    updateCanvasSize();

    let lastTime = 0;
    const animate = (time) => {
      if (!isInView) return;
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;
      updateSquares(gridParams.squares, deltaTime);
      drawGrid(ctx, canvas.width, canvas.height, gridParams.cols, gridParams.rows, gridParams.squares, gridParams.dpr);
      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => updateCanvasSize());
    resizeObserver.observe(container);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    if (isInView) animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);

  return (
    <div ref={containerRef} className={`flicker-grid ${className}`} style={style}>
      <canvas
        ref={canvasRef}
        className="flicker-canvas"
        style={{ width: canvasSize.width, height: canvasSize.height }}
      ></canvas>
    </div>
  );
}

function FlickerHero() {
  return (
    <section className="hero-halftone hero-flicker" data-screen-label="سرصفحه">
      <FlickeringGrid
        className="hero-flicker-bg"
        color="#C99227"
        maxOpacity={0.13}
        flickerChance={0.12}
        squareSize={4}
        gridGap={6}
      />
      <div className="hero-halftone-inner">
        <span className="hero-halftone-eyebrow">ISSUE 01 // SUMMER 2585</span>
        <div className="hero-flicker-logo">
          <FlickeringGrid
            color="#F6F3EC"
            maxOpacity={0.78}
            flickerChance={0.20}
            squareSize={4}
            gridGap={3}
          />
        </div>
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

Object.assign(window, { FlickeringGrid, FlickerHero });
