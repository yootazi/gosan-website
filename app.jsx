/* Gosan Weblog — hash router, tweaks, app shell */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "typeScale": 100,
  "accent": "#6E94A0",
  "motion": true
}/*EDITMODE-END*/;

const GOSAN_ACCENTS = {
  '#6E94A0': { accent: '#6E94A0', strong: '#547C8B', wash: 'rgba(110, 148, 160, 0.16)' },
  '#1D92B4': { accent: '#1D92B4', strong: '#0E7D99', wash: 'rgba(29, 146, 180, 0.14)' },
  '#C99227': { accent: '#C99227', strong: '#A87A1F', wash: 'rgba(212, 175, 55, 0.18)' },
};

function parseHash() {
  const h = decodeURIComponent(window.location.hash || '#/');
  const parts = h.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (parts[0] === 'article') return { page: 'article', param: parts[1] || '' };
  if (parts[0] === 'archive') return { page: 'archive', param: parts[1] || '' };
  if (parts[0] === 'about') return { page: 'about', param: '' };
  if (parts[0] === 'contact') return { page: 'contact', param: '' };
  if (parts[0] === 'shivenameh') return { page: 'shivenameh', param: '' };
  if (parts[0] === 'thinktank') return { page: 'thinktank', param: '' };
  return { page: 'home', param: '' };
}

function useHashRoute() {
  const [route, setRoute] = React.useState(parseHash);
  React.useEffect(() => {
    const onHash = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

const PAGE_TITLES = {
  home: 'گوسان — گاهنامهٔ فرهنگی و هنری',
  article: 'گوسان — نوشتار',
  archive: 'گوسان — بایگانی',
  about: 'گوسان — دربارهٔ ما',
  contact: 'گوسان — تماس با ما',
  shivenameh: 'گوسان — شیوه‌نامه',
  thinktank: 'گوسان — اندیشکدهٔ فرهنگ و هنر',
};

const NAV_ACTIVE = { home: 'خانه', archive: 'بایگانی', about: 'دربارهٔ ما', contact: 'تماس با ما', shivenameh: 'شیوه‌نامه', thinktank: 'اندیشکده' };

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const route = useHashRoute();
  const lang = 'fa';
  React.useEffect(() => {
    try { localStorage.setItem('gosan-lang', 'fa'); } catch (e) {}
    const el = document.documentElement;
    el.dir = 'rtl';
    el.lang = 'fa';
    document.body.dataset.lang = 'fa';
  }, []);

  /* let the embedded Institute iframe ask us to navigate (cross-origin-safe back button) */
  React.useEffect(() => {
    const onMsg = (e) => {
      const d = e && e.data;
      if (d && d.type === 'gosan-nav' && typeof d.hash === 'string') {
        window.location.hash = d.hash;
      }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  /* apply tweaks to css custom properties */
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${(16 * t.typeScale) / 100}px`;
    const a = GOSAN_ACCENTS[t.accent] || GOSAN_ACCENTS['#6E94A0'];
    root.style.setProperty('--accent', a.accent);
    root.style.setProperty('--accent-strong', a.strong);
    root.style.setProperty('--cerulean-wash', a.wash);
    root.style.setProperty('--font-display', "'IRANSansX', 'Vazirmatn', 'Tahoma', sans-serif");
    document.body.dataset.motion = t.motion ? 'on' : 'off';
  }, [t.typeScale, t.accent, t.motion]);

  React.useEffect(() => {
    document.title = PAGE_TITLES[route.page] || PAGE_TITLES.home;
    document.body.dataset.page = route.page;
  }, [route.page]);

  let activeNav = NAV_ACTIVE[route.page] || 'خانه';
  if (route.page === 'archive' && route.param) activeNav = route.param;
  if (route.page === 'article') activeNav = '';

  return (
    <React.Fragment>
      <ScrollProgress />
      {route.page !== 'home' && route.page !== 'thinktank' ? <SiteHeader active={activeNav} lang={lang} /> : null}
      <div className="route-fade" key={route.page + ':' + route.param}>
        {route.page === 'article' ? <ArticleView slug={route.param} key={route.param} /> :
         route.page === 'archive' ? <ArchivePage tag={route.param} key={route.param} /> :
         route.page === 'about' ? <AboutPage /> :
         route.page === 'contact' ? <ContactPage /> :
         route.page === 'shivenameh' ? <ShivenamehPage /> :
         route.page === 'thinktank' ? <iframe src="institute-fa.html" title="اندیشکدهٔ فرهنگ و هنر گوسان" className="inst-frame" style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', border: 0, zIndex: 40, background: '#0B1B33' }} /> :
         <HomePage lang={lang} />}
      </div>
      <SiteFooter route={route.page} />
      <SearchOverlay />
      <BackToTop />

      <TweaksPanel>
        <TweakSection label="رنگ و حروف" />
        <TweakColor
          label="رنگ تأکیدی"
          value={t.accent}
          options={['#6E94A0', '#1D92B4', '#C99227']}
          onChange={(v) => setTweak('accent', v)}
        />
        <TweakSlider
          label="مقیاس حروف"
          value={t.typeScale}
          min={90}
          max={120}
          step={2}
          unit="%"
          onChange={(v) => setTweak('typeScale', v)}
        />
        <TweakSection label="جنبش" />
        <TweakToggle
          label="جنبش اسکرول"
          value={t.motion}
          onChange={(v) => setTweak('motion', v)}
        />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
