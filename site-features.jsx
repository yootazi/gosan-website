/* Gosan Weblog — interactive features: scroll progress, search overlay, back-to-top */

/* thin gold reading-progress hairline pinned to the very top */
function ScrollProgress() {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const on = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setP(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, []);
  return <div className="scroll-progress" style={{ transform: `scaleX(${p})` }}></div>;
}

/* minimal full-screen search — filters posts live; opens via window 'gosan:search' event or "/" key */
function SearchOverlay() {
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState('');
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
      const tag = (document.activeElement && document.activeElement.tagName) || '';
      if (e.key === '/' && !/INPUT|TEXTAREA/.test(tag)) { e.preventDefault(); setOpen(true); }
    };
    window.addEventListener('gosan:search', onOpen);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('gosan:search', onOpen); window.removeEventListener('keydown', onKey); };
  }, []);

  React.useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const query = q.trim();
  const results = query
    ? GOSAN_POSTS.filter((p) => (p.title + ' ' + p.excerpt + ' ' + p.tag + ' ' + p.author).includes(query))
    : GOSAN_POSTS.slice(0, 5);

  if (!open) return null;
  return (
    <div className="search-overlay" onClick={(e) => { if (e.target.classList.contains('search-overlay')) setOpen(false); }}>
      <div className="search-panel">
        <div className="search-head">
          <span className="gsn-technical">SEARCH // جستجو در گوسان</span>
          <button className="search-close" onClick={() => setOpen(false)} aria-label="بستن">×</button>
        </div>
        <input
          ref={inputRef}
          className="search-input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="عنوان، موضوع یا نویسنده…"
        />
        <div className="search-meta gsn-technical">
          {query ? `${results.length} نتیجه` : 'تازه‌ترین نوشتارها'}
        </div>
        <ul className="search-results">
          {results.map((p) => (
            <li key={p.slug}>
              <a href={`#/article/${p.slug}`} onClick={() => { setOpen(false); setQ(''); }}>
                <span className="search-r-tag">{p.tag}</span>
                <span className="search-r-title">{p.title}</span>
                <span className="search-r-arrow" aria-hidden="true">←</span>
              </a>
            </li>
          ))}
          {query && results.length === 0 ? <li className="search-empty">چیزی یافت نشد.</li> : null}
        </ul>
      </div>
    </div>
  );
}

function BackToTop() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <button
      className={`back-top${show ? ' is-show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="بازگشت به بالا"
    >↑</button>
  );
}

Object.assign(window, { ScrollProgress, SearchOverlay, BackToTop });
