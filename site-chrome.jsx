/* Gosan Weblog — site chrome: header (bilingual + EN/FA switch) + footer */

const NAV_ITEMS = [
  { fa: 'خانه', en: 'Home', href: '#/' },
  { fa: 'دربارهٔ ما', en: 'About', href: '#/about' },
  { fa: 'بایگانی', en: 'Archive', href: '#/archive' },
  { fa: 'شیوه‌نامه', en: 'Style', href: '#/shivenameh' },
  { fa: 'تماس با ما', en: 'Contact', href: '#/contact' },
];

function SiteHeader({ active, lang = 'fa', onToggleLang }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [hash, setHash] = React.useState(() => window.location.hash || '#/');
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onHash = () => setHash(window.location.hash || '#/');
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('hashchange', onHash);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('hashchange', onHash); };
  }, []);
  const en = lang === 'en';
  const isActive = (href) => href === '#/' ? (hash === '' || hash === '#/' || hash === '#') : hash.startsWith(href);
  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="wrap">
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
          <button
            className="nav-search"
            onClick={() => window.dispatchEvent(new Event('gosan:search'))}
            aria-label="جستجو"
            title="جستجو ( / )"
          ><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><line x1="20" y1="20" x2="16.05" y2="16.05"></line></svg></button>
          <ul>
            {NAV_ITEMS.map((it) => (
              <li key={it.href}>
                <a
                  href={it.href}
                  className={isActive(it.href) ? 'is-active' : ''}
                  style={{ fontWeight: isActive(it.href) ? 700 : 400, opacity: isActive(it.href) ? 1 : 0.92 }}
                >{en ? it.en : it.fa}</a>
              </li>
            ))}
            <li className="nav-think-li">
              <a
                href="#/thinktank"
                className={`nav-think${isActive('#/thinktank') ? ' is-active' : ''}`}
              >{en ? 'The Gosan Think Tank' : 'اندیشکدهٔ فرهنگ و هنر گوسان'}</a>
            </li>
          </ul>
        </nav>
        <a href="#/" style={{ flexShrink: 0 }}>
          <img src="assets/logo-gosan.png" alt="گوسان" className="header-logo" style={{ height: '40px', display: 'block' }} />
        </a>
      </div>
    </header>
  );
}

function SiteFooter({ route }) {
  if (route === 'thinktank') return null;
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--text-on-dark)' }}>
      <div className="wrap foot-grid" style={{ paddingTop: '3.5rem', paddingBottom: '2rem' }}>
        <div>
          <img src="assets/logo-gosan.png" alt="گوسان" style={{ height: '54px', marginBottom: '0.8rem' }} />
          <p style={{ fontSize: '0.85rem', lineHeight: 2.1, color: 'var(--grey-faint)', margin: 0 }}>
            گاهنامهٔ «گوسان» در پی آن است که غبار فراموشی را از صفحهٔ فرهنگ و هنر و میراث ایران بزداید
            و گوشه‌های ناشناختهٔ تاریخ و فرهنگ و هنر ایران را به ابزار پژوهش و نقد بکاود، بشناسد و روایت کند.
          </p>
        </div>
        <div>
          <h5 style={{ color: 'var(--white)', fontSize: '1rem', margin: '0 0 1rem', fontWeight: 700 }}>بخش‌ها</h5>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '0.55rem', fontSize: '0.88rem' }}>
            <li><a href="#/archive/جستار">جستار</a></li>
            <li><a href="#/archive/گفتگو">گفتگو</a></li>
            <li><a href="#/archive/یادمان">یادمان</a></li>
            <li><a href="#/archive">بایگانی شماره‌ها</a></li>
          </ul>
        </div>
        <div>
          <h5 style={{ color: 'var(--white)', fontSize: '1rem', margin: '0 0 1rem', fontWeight: 700 }}>پیوندها</h5>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '0.55rem', fontSize: '0.88rem' }}>
            <li><a href="#/about">دربارهٔ ما</a></li>
            <li><a href="#/thinktank">اندیشکدهٔ فرهنگ و هنر</a></li>
            <li><a href="#/contact">تماس با ما</a></li>
            <li><a href="mailto:info@gosan.org" style={{ direction: 'ltr', display: 'inline-block', borderBottom: '1px solid var(--gold)', color: 'var(--white)' }}>info@gosan.org</a></li>
          </ul>
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--line-dark)', textAlign: 'center', padding: '1.2rem', fontSize: '0.78rem', color: '#9A9A9A' }}>
        گاهنامهٔ گوسان <span style={{ color: 'var(--gold)' }}>●</span> سال یکم، شمارهٔ یکم، تابستان ۲۵۸۵ <span style={{ color: 'var(--gold)' }}>●</span> همهٔ حقوق محفوظ است
      </div>
    </footer>
  );
}

/* shared title block for inner pages */
function PageTitle({ technical, title, lede }) {
  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '4rem 2rem 2.5rem', textAlign: 'center', position: 'relative' }}>
      <DraftLineH top="2.4rem" right="-6rem" left="-6rem" />
      <span className="gsn-technical" style={{ color: 'var(--gold-deep)' }}>{technical}</span>
      <h1 className="gsn-display" style={{ fontSize: 'var(--text-display)', margin: '1rem 0 0.6rem' }}>{title}</h1>
      {lede ? <p style={{ color: 'var(--text-muted)', fontWeight: 300, margin: 0 }}>{lede}</p> : null}
    </div>
  );
}

/* newsletter band — used on home */
function NewsletterBand() {
  const [sent, setSent] = React.useState(false);
  return (
    <section style={{ borderTop: '1px solid var(--line)', textAlign: 'center' }}>
      <div className="wrap" style={{ paddingTop: '4rem', paddingBottom: '4.5rem', maxWidth: '720px' }}>
        <Reveal>
          <span className="gsn-technical" style={{ color: 'var(--gold-deep)' }}>NEWSLETTER // SEASONAL</span>
          <h2 className="gsn-display" style={{ fontSize: '1.9rem', margin: '0.8rem 0 0.5rem' }}>نامهٔ گوسان</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '0 0 2rem' }}>
            هر فصل یک نامه؛ گزیدهٔ جستارها و گفتگوهای شمارهٔ تازه، یک‌راست به صندوق شما.
          </p>
          {sent ? (
            <p style={{ color: 'var(--accent-strong)', fontWeight: 500, margin: 0 }}>سپاس؛ نشانی شما ثبت شد. نامهٔ بعدی، آغاز تابستان.</p>
          ) : (
            <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <input type="email" required placeholder="you@example.com" aria-label="نشانی رایانامه" />
              <Button variant="gold">پیوستن</Button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { NAV_ITEMS, SiteHeader, SiteFooter, PageTitle, NewsletterBand });
