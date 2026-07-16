/* Gosan Weblog — bilingual (FA/EN) New Criterion–style home.
   3-up featured strip + dense two-column body + sticky sidebar.
   All article images are fill-later <image-slot> placeholders. */

/* English mirror of GOSAN_POSTS (same slugs, translated) */
const GOSAN_POSTS_EN = {
  'gosan-narrators': { tag: 'Essay', title: 'The Gōsān: Forgotten Narrators of Iran’s History & Myth', author: 'Hafez Babashahi', excerpt: 'A search into the minstrels and singers of ancient Iran, who kept history and legend safe from oblivion in the brocade of verse and music.' },
  'miniature-narrative': { tag: 'Essay', title: 'Miniature & Narrative: From Illuminated Manuscripts to Today', author: 'Amin Nayebpour', excerpt: 'On the bond between image and story in the Persian painting tradition, and what of it survives in today’s visual language.' },
  'music-interview': { tag: 'Interview', title: 'A Conversation with a Scholar of Ancient Persian Music', author: 'Yalda Zamani', excerpt: 'On the union of poetry and music in the Iranian storytelling tradition, and what reached us from the melodies of antiquity.' },
  'calligraphy-talk': { tag: 'Interview', title: 'On Calligraphy & the Iranian Visual Identity', author: 'Sohrab Labib', excerpt: 'From the reed pen to today’s letterforms — how calligraphy stays alive in our everyday life.' },
  'memorial': { tag: 'Memoriam', title: 'In Memory of the Masters of Iranian Culture & Art', author: 'Ehsan Shavarbi', excerpt: 'Remembering those who labored to preserve Iran’s language, letters, and art, and left a lasting legacy.' },
  'cypress-memory': { tag: 'Memoriam', title: 'Ancient Cypresses: A Memoriam of the Persian Garden', author: 'Hafez Babashahi', excerpt: 'On the place of the cypress in the Iranian visual memory, from the reliefs of Persepolis to the gardens of Kashan.' },
  'nowruz-rites': { tag: 'Essay', title: 'Nowruz & the Ancient Rite of the New Year', author: 'Amin Nayebpour', excerpt: 'From the fires of Chaharshanbe Suri to the Haft-Sin table — the ritual roots of Nowruz and its bond with the myth of creation.' },
  'modern-poetry': { tag: 'Essay', title: 'Modern Poetry & the Classical Inheritance', author: 'Sohrab Labib', excerpt: 'On the hidden dialogue of new poets with the thousand-year tradition of Persian verse, from Nima to today.' },
  'painter-talk': { tag: 'Interview', title: 'A Conversation with a Contemporary Miniaturist', author: 'Yalda Zamani', excerpt: 'On the place of traditional painting in Iran’s art today and the challenge of joining the old and the new.' },
  'radif-memorial': { tag: 'Memoriam', title: 'In Memoriam: A Master of the Musical Radif', author: 'Ehsan Shavarbi', excerpt: 'Honoring a figure who spent a life preserving the radif of Iranian classical music and raised a generation.' },
  'silence-music': { tag: 'Notes', title: 'On Silence in Persian Music', author: 'Yalda Zamani', excerpt: 'A short note on the role of silence and pause in song and radif — where stillness is itself a melody.' },
  'city-memory': { tag: 'Notes', title: 'City, Memory & Architecture', author: 'Hafez Babashahi', excerpt: 'Walking the old alleys, and the question of how a city keeps the collective memory of a people.' },
  'letter-future': { tag: 'Notes', title: 'A Letter to the Future Reader', author: 'Amin Nayebpour', excerpt: 'A note addressed to whoever reads these lines years hence — of the hopes and fears of our today.' },
};

const HOME_T = {
  fa: {
    issueR: 'سال یکم · شمارهٔ یکم', season: 'تابستان ۲۵۸۵ (۱۴۰۵)',
    tagline: 'گاهنامه‌ای در فرهنگ، هنر و میراث کهن ایران',
    subSmall: 'ده شماره در سال · دسترسی به بایگانی', sub: 'دریافت اشتراک ←',
    issueLine: 'شمارهٔ یکم — تابستان ۲۵۸۵', by: 'به‌قلمِ',
    notes: 'یادداشت‌ها و درنگ‌ها', features: 'جستارهای این شماره', featuresMore: 'همهٔ جستارها ←',
    interviews: 'گفتگو', interviewsMore: 'همهٔ گفتگوها ←', poetry: 'شعر',
    memoriam: 'یادمان', memoriamMore: 'همهٔ یادمان‌ها ←', popular: 'پرخواننده‌ترین‌ها',
    coverH: 'شمارهٔ یکم در دست است', coverP: 'جستارها، گفتگوها و یادمان‌هایی در فرهنگ، هنر و میراث ایران.', coverBtn: 'دریافت نسخهٔ چاپی',
    newsK: 'نامهٔ فصلی', newsH: 'نامهٔ فصلیِ گوسان', newsP: 'گزیدهٔ جستارها و گفتگوهای هر شماره، یک‌راست به صندوق شما.', newsBtn: 'پیوستن', newsOk: 'سپاس؛ نشانی شما ثبت شد.',
    edK: 'پیامی از سردبیران', edH: 'در پاسداشتِ فرهنگ و هنرِ ایران با ما همراه شوید.', edP: 'یاریِ شما، روایتگریِ گوسان را پایدار نگاه می‌دارد.', edBtn: 'حمایت می‌کنم',
    slotPh: 'تصویر را اینجا رها کنید',
    latestK: 'تازه‌ترین‌ها',
    manK: 'بیانیهٔ گوسان',
    manLead: 'گوسان ریشه در روزگاران کهن دارد.',
    manBody: [
      'در ایران باستان، گوسان به رامشگران و نغمه‌خوانانی گفته می‌شد که حافظ تاریخ و افسانه‌های کهن بودند. گوسان‌ها روایتگر بودند؛ روایتگر شادی و اندوه مردمان، روایتگر رزم و بزم شاهان، روایتگر پیروزی و شکست قهرمانان. و این همه را به دیبای وزن و قافیه می‌آراستند تا سینه به سینه بازگفته و بازخوانده شود. گوسان‌ها می‌سرودند و می‌نواختند تا تاریخ و افسانه را در جامهٔ زربفتِ چامه و موسیقی از گزند فراموشی در امان بدارند. از پس آنان خدای‌نامه‌نویسانِ ساسانی آمدند و پسان‌تر سرایندگانِ پارسی‌گوی، از توس و بخارا تا تبریز و گنجه، از شیراز و کرمان تا غزنه و دهلی.',
      'امروز نیز ما در گاهنامهٔ «گوسان» گردآمده‌ایم تا روایتگر باشیم؛ روایتگرِ فرهنگ و هنر و میراثِ کهنِ ایران، در روزگاری که فرهنگ و هنر به کنج انزوا گرفتار آمده و ستیز با تاریخ و میراثِ کهنِ ایران فزونی گرفته است؛ چنان‌که حکیم توس در شرح روزگارِ چیرگی ضحاکِ تازی گفته است:',
    ],
    manVerse: { a: 'هنر خوار شد جادویی ارجمند', b: 'نهان راستی، آشکارا گزند' },
    manClose: 'گاهنامهٔ «گوسان» در پی آن است که غبار فراموشی را از صفحهٔ فرهنگ و هنر و میراثِ ایران بزداید؛ گوشه‌های ناشناختهٔ تاریخ و فرهنگ و هنرِ ایران را به ابزارِ پژوهش و نقد بکاود، بشناسد و روایت کند.',
    topics: [['جستار', '#/archive/جستار'], ['گفتگو', '#/archive/گفتگو'], ['یادمان', '#/archive/یادمان'], ['یادداشت آزاد', '#/archive/یادداشت آزاد'], ['شیوه‌نامه', '#/shivenameh'], ['اندیشکده', '#/thinktank']],
    verses: [
      { hemistichs: ['هنر خوار شد جادویی ارجمند', 'نهان راستی، آشکارا گزند'], poet: 'فردوسی — شاهنامه' },
      { hemistichs: ['بسی رنج بردم در این سال سی', 'عجم زنده کردم بدین پارسی'], poet: 'فردوسی — شاهنامه' },
    ],
  },
  en: {
    issueR: 'Vol. I · No. 1', season: 'Summer 2585',
    tagline: 'A review of the arts, culture & heritage of Iran',
    subSmall: 'Ten issues a year · archive access', sub: 'Subscribe →',
    issueLine: 'No. 1 — Summer 2585', by: 'by',
    notes: 'Notes & Comments', features: 'Features', featuresMore: 'All essays →',
    interviews: 'Interviews', interviewsMore: 'All interviews →', poetry: 'Poetry',
    memoriam: 'Memoriam', memoriamMore: 'All memorials →', popular: 'Most Popular',
    coverH: 'Issue No. 1 is here', coverP: 'Essays, interviews, and memorials on the culture, art, and heritage of Iran.', coverBtn: 'Get the print edition',
    newsK: 'NEWSLETTER', newsH: 'The Gosan Letter', newsP: 'A seasonal selection of essays and interviews, straight to your inbox.', newsBtn: 'Join', newsOk: 'Thank you — your address is registered.',
    edK: 'A MESSAGE FROM THE EDITORS', edH: 'Join us in preserving the culture & art of Iran.', edP: 'Your support keeps Gosan’s storytelling alive.', edBtn: 'Support us',
    slotPh: 'Drop an image',
    latestK: 'Latest',
    manK: 'The Gosan Manifesto',
    manLead: 'Gōsān is the name of those ancient minstrels and narrators who kept the history and legend of this land safe from oblivion, in the brocade of verse and song.',
    manBody: [
      'We took this name to carry the same charge: to tell the story of Iran’s culture, art, and heritage as it deserves to be told — not with a blind nostalgia for the past, but with a clear eye on the present.',
      'Gosan is not a museum, nor a mourner of bygone days. It is a living review that bridges tradition and now — from the miniature to the new poetry, from the musical radif to the architecture of old alleys.',
      'Our belief is simple: a culture that is not narrated is forgotten. And we have come to narrate it.',
    ],
    topics: [['Essays', '#/archive/جستار'], ['Interviews', '#/archive/گفتگو'], ['Memoriam', '#/archive/یادمان'], ['Notes', '#/archive/یادداشت آزاد'], ['Style', '#/shivenameh'], ['Think Tank', '#/thinktank']],
    verses: [
      { hemistichs: ['Art was scorned, and sorcery prized,', 'truth lay hidden, and harm ran rife.'], poet: 'Ferdowsi — Shāhnāmeh' },
      { hemistichs: ['Much have I toiled across these thirty years —', 'I revived the Persians with this Persian tongue.'], poet: 'Ferdowsi — Shāhnāmeh' },
    ],
  },
};

function postFor(slug, lang) {
  if (lang === 'en') return { slug, ...GOSAN_POSTS_EN[slug] };
  return GOSAN_POSTS.find((p) => p.slug === slug);
}

/* real cover photos for articles that ship with imagery; the rest fall back
   to fillable <image-slot> placeholders. */
/* Home-page cover photos use a black-and-white halftone treatment (separate
   files); the same photos appear inside the articles in their original form. */
const GOSAN_COVERS = {
  'herzfeld-german-archives': 'uploads/cover-herzfeld.jpg',
  'interview-farnaz-modarresifar': 'uploads/cover-farnaz.jpg',
};

/* split a two-part title at «:» or «؛» and drop the second part to a new line */
function splitTitle(t) {
  const s = String(t == null ? '' : t);
  const m = s.match(/^(.+?)\s*[:؛—–]\s*(.+)$/);
  return m ? [m[1].trim(), m[2].trim()] : [s, null];
}
function TitleLines({ text }) {
  const [main, sub] = splitTitle(text);
  return sub ? <React.Fragment>{main}<span className="title-sub">{sub}</span></React.Fragment> : <React.Fragment>{text}</React.Fragment>;
}

function Slot({ slug, lang, ph }) {
  const cover = GOSAN_COVERS[slug];
  return (
    <div className="nc-img-wrap">
      {cover
        ? <img className="nc-cover-img" src={cover} alt="" loading="lazy" />
        : React.createElement('image-slot', { id: `slot-${lang}-${slug}`, placeholder: ph, shape: 'rect' })}
    </div>
  );
}

function ByLine({ post, by }) {
  return <p className="nc-by">{by} <span className="nc-by-name">{post.author}</span></p>;
}

function HomePage({ lang = 'fa', onToggleLang }) {
  const en = lang === 'en';
  const T = HOME_T[lang] || HOME_T.fa;
  const P = (slug) => postFor(slug, lang);

  /* elegant scroll-reveals — sections, manifesto, sidebar, dividers.
     No wrapper divs (keeps grid/flex layouts intact); fully gated on motion prefs.
     IO can be inert inside embedded frames, so we also re-check on scroll/resize
     + a few settle timers (same proven pattern as the Reveal component). */
  React.useEffect(() => {
    const sel = '.nc-home .nc-section, .nc-home .nc-manifesto, .nc-home .nc-aside-block, .nc-home .nc-issue-divider, .nc-home .nc-feat';
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let els = Array.from(document.querySelectorAll(sel));
    if (reduce || document.body.dataset.motion === 'off') {
      els.forEach((e) => e.classList.add('is-in'));
      return;
    }
    const reveal = (e) => { e.classList.add('is-in'); };
    const check = () => {
      const vh = window.innerHeight;
      els = els.filter((e) => {
        const r = e.getBoundingClientRect();
        if (r.top < vh * 0.92) { reveal(e); return false; }
        return true;
      });
      if (!els.length) cleanup();
    };
    let io = null;
    try {
      io = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { reveal(en.target); io.unobserve(en.target); els = els.filter((x) => x !== en.target); } });
      }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
      els.forEach((e) => io.observe(e));
    } catch (err) { /* IO unavailable */ }
    const timers = [120, 450, 1000, 1800, 2800].map((t) => setTimeout(check, t));
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    window.addEventListener('load', check);
    function cleanup() {
      if (io) io.disconnect();
      timers.forEach(clearTimeout);
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
      window.removeEventListener('load', check);
    }
    check();
    return cleanup;
  }, []);

  /* scroll to a section when arriving from an article's category link */
  React.useEffect(() => {
    let target;
    try { target = sessionStorage.getItem('gosan-scroll'); } catch (e) {}
    if (!target) return;
    try { sessionStorage.removeItem('gosan-scroll'); } catch (e) {}
    let tries = 0;
    const tryScroll = () => {
      const el = document.getElementById(target);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else if (tries++ < 12) {
        setTimeout(tryScroll, 130);
      }
    };
    setTimeout(tryScroll, 150);
  }, []);

  /* real pieces of issue no. 1 — hero switcher, featured strip and popular list
     are curated from the eleven received essays (no demo posts left up top). */
  const latest = ['music-totalitarian-regimes', 'interview-farnaz-modarresifar', 'herzfeld-german-archives', 'between-two-defeats', 'beyzaie-myth-symbolic-action', 'interview-armin-sanayei'].map(P);
  const featured = ['manichaean-music-terms', 'voice-of-the-council', 'oil-to-narrative'].map(P);
  const notes = ['silence-music', 'city-memory', 'letter-future'].map(P);
  const features = ['manichaean-music-terms', 'herzfeld-german-archives', 'voice-of-the-council', 'music-totalitarian-regimes'].map(P);
  const viewpoints = ['note-for-gosan', 'crossroads-ahead'].map(P);
  const interviews = ['interview-farnaz-modarresifar', 'interview-armin-sanayei'].map(P);
  const reviews = [].map(P);
  const policyDossier = ['between-two-defeats'].map(P);
  const economyDossier = ['oil-to-narrative'].map(P);
  const reflections = ['beyzaie-myth-symbolic-action', 'cypress-memory', 'radif-memorial'].map(P);
  const popular = ['music-totalitarian-regimes', 'interview-farnaz-modarresifar', 'note-for-gosan', 'between-two-defeats', 'crossroads-ahead'].map(P);

  /* the magazine's section taxonomy. populated categories reuse the sample
     articles; the rest are fillable placeholder structures (image-slots). */
  const categories = [
    { key: 'dossier-policy', label: 'پروندهٔ سیاست‌گذاری فرهنگی', posts: policyDossier, layout: 'grid' },
    { key: 'essay', label: 'جستار', posts: features, layout: 'grid' },
    { key: 'dossier-economy', label: 'پروندهٔ اقتصاد خلاق', posts: economyDossier, layout: 'grid' },
    { key: 'dossier-education', label: 'پروندهٔ آموزش', posts: [], layout: 'grid' },
    { key: 'viewpoint', label: 'دیدگاه', posts: viewpoints, layout: 'grid' },
    { key: 'memoriam', label: 'یادمان', posts: reflections, layout: 'rows' },
    { key: 'interview', label: 'گفتگو', posts: interviews, layout: 'rows' },
    { key: 'review', label: 'نقد و بررسی', posts: reviews, layout: 'grid' },
  ];

  return (
    <main className="nc-home" data-screen-label={en ? 'Home' : 'خانه'}>

      {/* masthead */}
      <div className="nc-masthead">
        <div className="nc-masthead-grid">
          <div className="nc-mast-side is-start">
            <span className="nc-issueline">{T.issueR} · {T.season}</span>
            <a className="nc-mast-sub" href="#/archive">{T.sub}</a>
            <a href="#/archive"><img className="nc-mast-cover" src="assets/issue-cover.jpg" alt={en ? 'Issue No. 1 cover' : 'جلد شمارهٔ یکم'} /></a>
          </div>
          <div className="nc-mast-center">
            <a href="#/" className="nc-logo" role="img" aria-label="گوسان"></a>
          </div>
          <div className="nc-mast-side is-end"></div>
        </div>
      </div>

      {/* floating nav bar */}
      <NcFloatingNav en={en} />

      {/* latest-articles carousel */}
      <NcCarousel slides={latest} lang={lang} T={T} />

      {/* manifesto — text only */}
      <NcManifesto T={T} />

      {/* featured 3-up strip */}
      <section className="nc-feat">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={i * 110}>
            <article>
              <Slot slug={p.slug} lang={lang} ph={T.slotPh} />
              <span className="nc-kicker">{p.tag}</span>
              <h2 className="nc-title" style={{ marginTop: '0.5rem' }}><a href={`#/article/${p.slug}`}><TitleLines text={p.title} /></a></h2>
              <ByLine post={p} by={T.by} />
              <p className="nc-dek">{p.excerpt}</p>
            </article>
          </Reveal>
        ))}
      </section>

      {/* issue divider */}
      <div className="nc-issue-divider"><span>{T.issueLine}</span></div>

      {/* body */}
      <div className="nc-body">
        <div className="nc-main">
          {categories.map((c) => <NcCatSection key={c.key} cat={c} lang={lang} T={T} />)}
        </div>

        {/* sidebar */}
        <aside className="nc-aside">
          <div className="nc-aside-block">
            <h4 className="nc-aside-head"><span className="nc-sh-mark">◆</span> {T.popular}</h4>
            <ol className="nc-popular">
              {popular.map((p) => (
                <li key={p.slug}>
                  <a href={`#/article/${p.slug}`}>{p.title}<span className="nc-pop-by">{p.author}</span></a>
                </li>
              ))}
            </ol>
          </div>

          <div className="nc-aside-block nc-cover-card">
            <img src="assets/issue-cover.jpg" alt={en ? 'Gosan, Issue No. 1' : 'جلد شمارهٔ یکم گوسان'} />
            <h4>{T.coverH}</h4>
            <p>{T.coverP}</p>
            <Button>{T.coverBtn}</Button>
          </div>

          <NcNewsletter T={T} />

          <div className="nc-aside-block nc-editors">
            <span className="nc-kicker">{T.edK}</span>
            <h4>{T.edH}</h4>
            <p>{T.edP}</p>
            <Button variant="gold" size="sm" href="#/about">{T.edBtn}</Button>
          </div>
        </aside>
      </div>

    </main>
  );
}

function NcFloatingNav({ en }) {
  const [navStuck, setNavStuck] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setNavStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`nc-topics${navStuck ? ' is-stuck' : ''}`}>
      <div className="nc-topics-main">
        <a href="#/thinktank" className="nav-think">{en ? 'The Gosan Think Tank' : 'اندیشکدهٔ فرهنگ و هنر گوسان'}</a>
        <span className="nc-topics-sep"></span>
        {NAV_ITEMS.map((it) => (
          <a
            key={it.href}
            href={it.href}
            className={`nc-topic-link${it.href === '#/' ? ' is-active' : ''}`}
          >{en ? it.en : it.fa}</a>
        ))}
      </div>
      <div className="nc-topics-controls">
        <a className="nc-support-btn" href="#/about">حمایت از ما</a>
        <button
          className="nav-search"
          onClick={() => window.dispatchEvent(new Event('gosan:search'))}
          aria-label={en ? 'Search' : 'جستجو'}
          title={en ? 'Search ( / )' : 'جستجو ( / )'}
        ><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><line x1="20" y1="20" x2="16.05" y2="16.05"></line></svg></button>
      </div>
    </nav>
  );
}

function NcCarousel({ slides, lang, T }) {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (paused) return;
    if (document.body.dataset.motion === 'off') return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % slides.length), 6500);
    return () => clearInterval(id);
  }, [paused, slides.length]);
  const p = slides[active];
  return (
    <section
      className="nc-carousel"
      data-screen-label={lang === 'en' ? 'Latest carousel' : 'تازه‌ترین‌ها'}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="nc-carousel-inner">
        <div className="nc-carousel-text">
          <div className="nc-carousel-copy" key={active}>
            <h2 className="nc-carousel-title"><a href={`#/article/${p.slug}`}><TitleLines text={p.title} /></a></h2>
            <p className="nc-carousel-by"><span>{p.author}</span></p>
            <p className="nc-carousel-dek">{p.excerpt}</p>
          </div>
          <div className="nc-carousel-dots" role="tablist" aria-label={T.latestK}>
            {slides.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`${i + 1} / ${slides.length}`}
                className={`nc-dot ${i === active ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
        <div className="nc-carousel-media">
          {slides.map((s, i) => (
            <div key={s.slug} className={`nc-carousel-slide-media ${i === active ? 'is-active' : ''}`} aria-hidden={i !== active}>
              {GOSAN_COVERS[s.slug]
                ? <img className="nc-cover-img" src={GOSAN_COVERS[s.slug]} alt="" loading="lazy" />
                : React.createElement('image-slot', { id: `slot-carousel-${lang}-${s.slug}`, placeholder: T.slotPh, shape: 'rect' })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NcManifesto({ T }) {
  return (
    <section className="nc-manifesto" data-screen-label={T.manK}>
      <div className="nc-manifesto-grid">

        {/* branding column (right in RTL) */}
        <div className="nc-man-brand">
          <div className="nc-man-brand-foot">
            <img className="nc-man-logo" src="assets/logo-gosan.png" alt="گوسان" />
            <p className="nc-man-sub">گاهنامهٔ فرهنگی و هنری گوسان</p>
            <p className="nc-man-issue">سال یکم، شمارهٔ یکم، تابستان ۲۵۸۵ (۱۴۰۵)</p>
          </div>
        </div>

        {/* gold divider */}
        <div className="nc-man-divider"></div>

        {/* statement column (left in RTL) */}
        <div className="nc-man-text">
          <p className="nc-manifesto-p nc-man-first">
            <strong>{T.manLead}</strong> {T.manBody[0]}
          </p>
          {T.manBody.slice(1).map((para, i) => <p key={i} className="nc-manifesto-p">{para}</p>)}
          {T.manVerse ? (
            <div className="nc-manifesto-verse">
              <span>{T.manVerse.a}</span>
              <span>{T.manVerse.b}</span>
            </div>
          ) : null}
          {T.manClose ? <p className="nc-manifesto-p nc-manifesto-close">{T.manClose}</p> : null}
          <div className="nc-man-actions">
            <a href="#/archive" className="nc-man-archive">بایگانی ←</a>
          </div>
        </div>

      </div>
    </section>
  );
}

function NcCatSection({ cat, lang, T }) {
  const { key, label, posts, layout } = cat;
  return (
    <section id={`cat-${key}`} className="nc-section" data-screen-label={label}>
      <div className="nc-sectionhead">
        <span className="nc-sh-label">{label}</span>
        <span className="nc-sh-mark">◆</span>
        <a className="nc-sh-more" href={`#/archive/${encodeURIComponent(label)}`}>همه ←</a>
      </div>

      {posts.length ? (
        layout === 'rows' ? (
          <div className="nc-rows">
            {posts.map((p) => (
              <article key={p.slug} className="nc-row">
                <Slot slug={p.slug} lang={lang} ph={T.slotPh} />
                <div>
                  <span className="nc-kicker">{p.tag}</span>
                  <h3 className="nc-title" style={{ marginTop: '0.35rem' }}><a href={`#/article/${p.slug}`}><TitleLines text={p.title} /></a></h3>
                  <ByLine post={p} by={T.by} />
                  <p className="nc-dek">{p.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="nc-grid2">
            {posts.map((p) => (
              <article key={p.slug}>
                <Slot slug={p.slug} lang={lang} ph={T.slotPh} />
                <span className="nc-kicker">{p.tag}</span>
                <h3 className="nc-title" style={{ marginTop: '0.4rem' }}><a href={`#/article/${p.slug}`}><TitleLines text={p.title} /></a></h3>
                <ByLine post={p} by={T.by} />
                <p className="nc-dek">{p.excerpt}</p>
              </article>
            ))}
          </div>
        )
      ) : (
        <div className="nc-cat-invite">
          <p className="nc-cat-invite-lead">این بخش هنوز در آغاز راه است و چشم‌به‌راه نخستین نوشته‌هاست.</p>
          <p className="nc-cat-invite-body">اگر در زمینهٔ «{label}» پژوهش، نقد یا دیدگاهی دارید، گوسان از دریافت مقاله یا پیشنهاد شما برای همکاری استقبال می‌کند.</p>
          <a className="nc-cat-invite-cta" href="#/contact">ارسال مقاله یا پیشنهاد ←</a>
        </div>
      )}
    </section>
  );
}

function NcNewsletter({ T }) {
  const [sent, setSent] = React.useState(false);
  return (
    <div className="nc-aside-block nc-news-mini">
      <span className="nc-kicker">{T.newsK}</span>
      <h4>{T.newsH}</h4>
      <p>{T.newsP}</p>
      {sent ? (
        <p style={{ color: 'var(--accent-strong)', fontWeight: 500, fontSize: '0.85rem', margin: 0 }}>{T.newsOk}</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <input type="email" required placeholder="you@example.com" aria-label="email" />
          <Button variant="gold" size="sm">{T.newsBtn}</Button>
        </form>
      )}
    </div>
  );
}

Object.assign(window, { HomePage });
