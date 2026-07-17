/* Gosan Weblog — home page. Minimal white layout; calligraphic title image as hero. */

function HeroTitle() {
  return (
    <section className="hero-mast">
      <LogoReveal />
      <HeroPanel />
      <span className="hero-mast-scroll" aria-hidden="true">گردش به پایین</span>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="manifesto wrap">
      <Reveal className="manifesto-body">
        <p className="hero-lede" style={{ marginBottom: '0.9rem' }}>
          <strong style={{ color: 'var(--ink)' }}>گوسان ریشه در روزگاران کهن دارد.</strong>{' '}
          در ایران باستان، گوسان به رامشگران و نغمه‌خوانانی گفته می‌شد که حافظ تاریخ و افسانه‌های کهن بودند.
          گوسان‌ها روایتگر بودند؛ روایتگر شادی و اندوه مردمان، روایتگر رزم و بزم شاهان، روایتگر پیروزی و شکست قهرمانان.
          و این همه را به دیبای وزن و قافیه می‌آراستند و به نوای سازهای خوش‌آهنگ خویش می‌آمیختند تا بر دل‌ها بنشیند
          و در یادها بماند، تا سینه به سینه بازگفته و بازخوانده شود. گوسان‌ها می‌سرودند و می‌نواختند تا تاریخ و افسانه را
          در جامهٔ زربفت چامه و موسیقی از گزند فراموشی در امان بدارند. از پس آنان خداینامه‌نویسان ساسانی آمدند
          و پسان‌تر سرایندگان پارسی‌گوی، از توس و بخارا تا تبریز و گنجه، از شیراز و کرمان تا غزنه و دهلی.
        </p>
        <p className="hero-lede" style={{ marginBottom: '0.3rem' }}>
          امروز نیز ما در گاهنامهٔ «گوسان» گردآمده‌ایم تا روایتگر باشیم؛ روایتگر فرهنگ و هنر و میراث کهن ایران،
          در روزگاری که فرهنگ و هنر به کنج انزوا گرفتار آمده و ستیز با تاریخ و میراث کهن ایران فزونی گرفته است؛
          چنان‌که حکیم توس در شرح روزگار چیرگی ضحاک تازی گفته است:
        </p>
        <div style={{ textAlign: 'center', margin: '1.6rem 0' }}>
          <MotifDivider style={{ marginBottom: '1.2rem' }} />
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', lineHeight: 1.9, color: 'var(--ink)', display: 'flex', gap: '2.4rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span>هنر خوار شد جادویی ارجمند</span>
            <span>نهان راستی، آشکارا گزند</span>
          </div>
        </div>
        <p className="hero-lede" style={{ marginBottom: 0 }}>
          گاهنامهٔ «گوسان» در پی آن است که غبار فراموشی را از صفحهٔ فرهنگ و هنر و میراث ایران بزداید؛
          گوشه‌های ناشناختهٔ تاریخ و فرهنگ و هنر ایران را به ابزار پژوهش و نقد بکاود، بشناسد و روایت کند.
        </p>
      </Reveal>
    </section>
  );
}

function HomePage() {
  const featured = GOSAN_POSTS[0];
  const latest = [1, 6, 7, 2, 8, 9].map((i) => GOSAN_POSTS[i]);
  const interview = GOSAN_POSTS[3];
  const memorial = GOSAN_POSTS[4];
  const freeNotes = GOSAN_POSTS.filter((p) => p.tag === 'یادداشت آزاد');
  const FA_NUM = ['۰۱', '۰۲', '۰۳', '۰۴', '۰۵', '۰۶'];
  const toFa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
  const READ_MIN = {
    'gosan-narrators': 14, 'miniature-narrative': 8, 'music-interview': 11, 'calligraphy-talk': 9,
    'memorial': 6, 'cypress-memory': 7, 'nowruz-rites': 10, 'modern-poetry': 9,
    'painter-talk': 12, 'radif-memorial': 6, 'silence-music': 4,
  };
  const readMin = (slug) => READ_MIN[slug] || 6;
  return (
    <main data-screen-label="خانه" style={{ overflow: 'hidden' }}>

      <Manifesto />

      {/* selected essay */}
      <section>
        <div className="band-grid" style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem' }}>
          <Reveal>
            <div className="essay-figure">
              <img src="assets/cypress-square.jpg" alt="" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Tag variant="gold">نوشتار برگزیده</Tag>
            <h3 className="gsn-display" style={{ fontSize: '2.2rem', margin: '1rem 0' }}>{featured.title}</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', textAlign: 'justify', lineHeight: 2.2, margin: '0 0 1.6rem' }}>
              آنها تاریخ و افسانه را به دیبای وزن و قافیه می‌آراستند و به نوای سازهای خوش‌آهنگ خویش می‌آمیختند
              تا به دل‌ها بنشیند و در یادها بماند، تا سینه به سینه باز گفته و باز خوانده شود.
            </p>
            <div style={{ display: 'flex', gap: '1.6rem', alignItems: 'center' }}>
              <Button size="sm" href={`#/article/${featured.slug}`}>خواندن نوشتار</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* latest feed */}
      <section className="wrap" style={{ paddingTop: '3rem', paddingBottom: '3.5rem' }}>
        <Reveal>
          <SectionHead title="تازه‌های گوسان" moreLabel="بایگانی ←" moreHref="#/archive" />
        </Reveal>
        <div className="feed-grid" style={{ marginTop: '2.2rem' }}>
          {latest.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 110}>
              <div className="feed-cell">
                <ArticleCard {...a} tagVariant={a.tag === 'یادمان' ? 'gold' : undefined} href={`#/article/${a.slug}`} />
                <span className="read-time">
                  <ClockIcon />
                  {toFa(readMin(a.slug))} دقیقه مطالعه
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* گفتگو — pull-quote interlude */}
      <section>
        <div className="band-grid" style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem 2rem 3rem' }}>
          <Reveal>
            <SectionHead title="گفتگو" moreLabel="همهٔ گفتگوها ←" moreHref="#/archive/گفتگو" />
            <div style={{ marginTop: '2rem' }}>
              <ArticleCard {...interview} href={`#/article/${interview.slug}`} />
            </div>
          </Reveal>
          <Reveal delay={140}>
            <PullQuote cite="از گفت‌وگوی این شماره">
              هر نغمه‌ای که از یاد برود، تکه‌ای از حافظهٔ ماست که خاموش می‌شود
            </PullQuote>
          </Reveal>
        </div>
      </section>

      {/* یادمان — quiet centered */}
      <section className="wrap" style={{ paddingTop: '2rem', paddingBottom: '3.5rem', textAlign: 'center' }}>
        <Reveal>
          <MotifDivider style={{ marginBottom: '1.4rem' }} />
          <h2 className="gsn-display" style={{ fontSize: '1.9rem', margin: '0 0 2rem' }}>یادمان</h2>
          <div className="memoriam">
            <div className="gsn-card">
              <div style={{ marginBottom: '0.7rem' }}><Tag variant="gold">{memorial.tag}</Tag></div>
              <h4><span className="gsn-brush"></span><a href={`#/article/${memorial.slug}`}>{memorial.title}</a></h4>
              <p>{memorial.excerpt}</p>
              <div className="gsn-byline">{memorial.author} · <span className="gsn-date">{memorial.date}</span></div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* نوشته‌های آزاد — free notes, editorial list */}
      <section style={{ background: 'var(--surface-band)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
          <Reveal>
            <SectionHead title="نوشته‌های آزاد" moreLabel="همهٔ یادداشت‌ها ←" moreHref="#/archive/یادداشت آزاد" />
          </Reveal>
          <ul className="notes-list">
            {freeNotes.map((a, i) => (
              <Reveal key={a.slug} delay={i * 110}>
                <li>
                  <a href={`#/article/${a.slug}`} className="note-row">
                    <span className="note-index">{String(i + 1).padStart(2, '0').replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d])}</span>
                    <span className="note-body">
                      <span className="note-title">{a.title}</span>
                      <span className="note-excerpt">{a.excerpt}</span>
                      <span className="note-byline">{a.author} · <span style={{ color: 'var(--accent)' }}>{a.date}</span></span>
                    </span>
                    <span className="note-arrow" aria-hidden="true">←</span>
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* issue promo */}
      <section>
        <div className="issue-grid" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 2rem 4rem' }}>
          <Reveal>
            <img
              src="assets/issue-cover.jpg"
              alt="جلد شمارهٔ یکم گوسان — سال یکم، شمارهٔ یکم، پاییز ۲۵۸۵"
              style={{
                display: 'block', width: '100%', boxShadow: 'var(--shadow-cover)',
              }}
            />
          </Reveal>
          <Reveal delay={130}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, margin: '0 0 0.3rem' }}>گاهنامهٔ فرهنگی و هنری گوسان</h2>
            <div style={{ color: 'var(--accent)', fontWeight: 500, marginBottom: '1.6rem' }}>سال یکم، شمارهٔ یکم، پاییز ۲۵۸۵</div>
            <dl style={{ margin: '0 0 2rem' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <dt style={{ fontWeight: 700, display: 'inline' }}>چکیده:</dt>
                <dd style={{ display: 'inline', color: 'var(--grey)', marginRight: '0.4rem' }}>نخستین شمارهٔ گوسان؛ جستارها، گفتگوها و یادمان‌هایی در فرهنگ، هنر و میراث ایران</dd>
              </div>
              <div>
                <dt style={{ fontWeight: 700, display: 'inline' }}>همکاران این شماره:</dt>
                <dd style={{ display: 'inline', color: 'var(--grey)', marginRight: '0.4rem' }}>حافظ باباشاهی، امین نایب‌پور، یلدا زمانی، احسان شواربی، سهراب لبیب</dd>
              </div>
            </dl>
            <div style={{ display: 'flex', gap: '1.4rem', alignItems: 'center' }}>
              <Button>دریافت نسخهٔ چاپی این شماره</Button>
              <Button variant="ghost" href="#/archive">بایگانی شماره‌ها ←</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <NewsletterBand />
    </main>
  );
}

Object.assign(window, { HomePage });
