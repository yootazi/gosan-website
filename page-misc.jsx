/* Gosan Weblog — archive, about, contact pages */

const ARCHIVE_TAGS = ['همه', 'جستار', 'گفتگو', 'یادمان', 'یادداشت آزاد'];

function ArchivePage({ tag }) {
  const active = ARCHIVE_TAGS.includes(tag) ? tag : 'همه';
  const posts = active === 'همه' ? GOSAN_POSTS : GOSAN_POSTS.filter((p) => p.tag === active);
  return (
    <main data-screen-label="بایگانی">
      <PageTitle technical="ARCHIVE // ALL ENTRIES" title="بایگانی" lede="همهٔ نوشتارهای گاهنامه، از نخستین شماره تاکنون" />
      <div className="wrap" style={{ paddingBottom: '5rem' }}>
        <div className="filter-row" style={{ justifyContent: 'center', marginBottom: '3rem' }}>
          {ARCHIVE_TAGS.map((t) => (
            <a
              key={t}
              className={`filter-btn${t === active ? ' is-active' : ''}`}
              href={t === 'همه' ? '#/archive' : `#/archive/${t}`}
            >{t}</a>
          ))}
        </div>
        <div className="archive-grid">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 110}>
              <ArticleCard {...p} tagVariant={p.tag === 'یادمان' ? 'gold' : undefined} href={`#/article/${p.slug}`} />
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}

const GOSAN_BOARD = [
  { key: 'hafez', name: 'حافظ باباشاهی', role: 'هیئت تحریریه', craft: 'پیانیست، مدرس موسیقی', img: 'assets/board-hafez.png',
    bio: 'پیانیستِ تک‌نواز و همنواز، آموختهٔ دانشگاه موسیقی وین؛ بنیان‌گذار جشنوارهٔ آواز کلاسیک «وینر لیدر هربست» و مدرس کلاس پیانو در کنسرواتوار ریشارد واگنر وین. از بنیان‌گذاران گاهنامهٔ گوسان.' },
  { key: 'yalda', name: 'یلدا زمانی', role: 'مدیر مسئول و سردبیر', craft: 'رهبر ارکستر، آهنگساز', img: 'assets/board-yalda.png',
    bio: 'رهبر ارکستر ایرانی–آلمانی مقیم برلین و متخصص موسیقی معاصر؛ دستیار رهبر ارکستر آنسامبل اینترکنتمپورن در فیلارمونی پاریس و بنیان‌گذار ارکستر مجلسی اِلبه در هامبورگ. مدیرمسئول و سردبیر گاهنامهٔ گوسان.' },
  { key: 'ehsan', name: 'احسان شواربی', role: 'مدیر داخلی', craft: 'باستان‌شناس، سکه‌شناس', img: 'assets/board-ehsan.png',
    bio: 'باستان‌شناس و سکه‌شناس؛ متصدی سکه‌های سدهٔ میانه و شرق در موزهٔ تاریخ هنر وین و پژوهشگر سکه‌شناسی ساسانی و زبان‌ها و کتیبه‌های ایران باستان.' },
  { key: 'sohrab', name: 'سهراب لبیب', role: 'هیئت تحریریه', craft: 'پیانیست، مدرس موسیقی', img: 'assets/board-sohrab.png',
    bio: 'پیانیست و مدرس موسیقی؛ علاقه‌مند به پیوند شعر و نغمه و بازخوانی سنت موسیقایی ایران برای نسل امروز.' },
  { key: 'amin', name: 'امین نایب‌پور', role: 'هیئت تحریریه', craft: 'محقق اندیشهٔ سیاسی', img: 'assets/board-amin.png',
    bio: 'پژوهشگر اندیشهٔ سیاسی؛ نویسندهٔ جستارهایی در نسبت فرهنگ، جامعه و قدرت در ایران معاصر و دیروز.' },
]

function EditorialBoard() {
  const [open, setOpen] = React.useState(null);
  const boardRef = React.useRef(null);
  React.useEffect(() => {
    if (open === null) return;
    const onDoc = (e) => { if (boardRef.current && !boardRef.current.contains(e.target)) setOpen(null); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);
  return (
    <div className={`board${open !== null ? ' has-open' : ''}`} ref={boardRef}>
      <div className="board-row">
        {GOSAN_BOARD.map((b, i) => (
          <button
            key={b.key}
            type="button"
            className={`board-card${i === open ? ' is-open' : ''}`}
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={i === open}
          >
            <span className="board-portrait-circle">
              <img src={b.img} alt={b.name} loading="lazy" />
            </span>
            <figcaption>
              <span className="board-card-name">{b.name}</span>
              <span className="board-card-role">{b.craft}</span>
            </figcaption>
            {i === open ? (
              <div className="board-pop" role="dialog">
                <span className="board-pop-craft">{b.craft}</span>
                <p>{b.bio}</p>
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}

function Credentials() {
  const editorial = GOSAN_BOARD.map((m) => m.name).join('، ');
  return (
    <div className="cred-float">
      <span className="gsn-technical" style={{ color: 'var(--gold-deep)' }}>MASTHEAD // ISSUE 01</span>
      <h2 className="gsn-display cred-title">شناسنامهٔ شماره</h2>
      <dl className="cred-list">
        <div className="cred-row">
          <dt>مدیر مسئول و سردبیر</dt>
          <dd>یلدا زمانی</dd>
        </div>
        <div className="cred-row">
          <dt>مدیر داخلی</dt>
          <dd>احسان شواربی</dd>
        </div>
        <div className="cred-row">
          <dt>هیئت تحریریه</dt>
          <dd>{editorial}</dd>
        </div>
      </dl>
    </div>
  );
}

function AboutPage() {
  const editorial = GOSAN_BOARD.map((m) => m.name).join('، ');
  return (
    <main data-screen-label="دربارهٔ ما" className="about-main">
      <section className="about-spread">
        {/* right column (RTL first): manifesto text */}
        <Reveal className="about-text">
          <PullQuote style={{ margin: '0 0 1.8rem' }}>
            از روزگاران کهن در ایران باستان، رامشگران و نغمه‌خوانانی در کار پاسداری از تاریخ و افسانه‌های این سرزمین بودند.
          </PullQuote>
          <p>
            «گوسان»‌ها، آن‌طور که در زبان پهلوی خوانده می‌شدند، روایتگر بودند. روایتگر شادی و اندوه مردمان، روایتگر رزم و بزم شاهان،
            روایتگر پیروزی و شکست قهرمانان. آنها، این همه را به دیبای وزن و قافیه می‌آراستند و به نوای سازهای خوش‌آهنگ خویش می‌آمیختند
            تا بر دل‌ها بنشیند و در یادها بماند، تا سینه به سینه باز گفته و باز خوانده شود. گوسان‌ها می‌سرودند و می‌نواختند تا تاریخ و افسانه را
            در جامهٔ زربفت چامه و موسیقی از گزند فراموشی در امان بدارند.
          </p>
          <p>
            امروز که غبار «وحشتی بزرگ» بر شئون زندگانی ایرانیان سایه افکنده، و نشانه‌های بحران از فرهنگ و هنر تا اقتصاد و اقلیم این کهن‌دیار را
            فرا گرفته‌اند، ما فرزندان این بوم و بر بیش از هر زمان دیگری از خود می‌پرسیم در کجای این شب تاریک و گرداب هایل ایستاده‌ایم.
            بیش از هر زمان دیگری نشان فرهنگ و تاریخ خویش را می‌جوییم تا در ریسمان‌های آن چنگ زنیم. میراث نیاکان، نه یادگاری‌های خاموش،
            که ریسمان‌هایی در هم پیوسته‌اند برای ایستادگی در تندبادهای فراموشی و سرگردانی؛ ریسمان‌های ایران.
          </p>
          <p>
            ما در «گوسان» بر این باوریم که گذار از بحران عمیق کنونی، نه با قرار دادن خود در جایگاه قربانی، که تنها با بازشناسی نقش خویش شدنی است.
            بیش از چهار دهه سلطهٔ نظام ایدئولوژیک و متحجر بر فرهنگ و هنر این سرزمین، بی‌تردید زخمی عمیق بر جان جمعی ما نهاده،
            و پرسشی ناگزیر و سهمگین را در برابرمان قرار داده است: سهم و نقش ما در گذار از این ویرانی چیست؟
          </p>
          <p>
            فرهنگ و هنر، نه کالاهای تفننی، که ستون‌های تاب‌آوری، بازسازی و بازشناسی هویت یک ملت در تندبادهای تاریخ‌اند.
            در سرزمینی غارت‌شده و جامعه‌ای بحران‌زده که نهادهای آن رو به فرسایش‌اند، آیا نمی‌توان فرهنگ و هنر را به نیرویی برای بازسازی بدل کرد؟
            آیا نمی‌توان و نباید هنر و فرهنگ را از حاشیهٔ فراموشی به متن احیاء یک ملت آورد و با آن پلی به سوی فردایی روشن‌تر ساخت؟
          </p>
          <p style={{ color: 'var(--ink)', fontWeight: 500 }}>
            ما فرزندان ایران در گاهنامهٔ «گوسان» می‌کوشیم در مسیر این هدف گام برداشته، پلی باشیم میان میراث کهن پدران و چشم‌انداز فردا،
            و نیز همراهی برای همهٔ آنان که در گرگ و میش شب، نور مهر ایران را در دل دارند.
          </p>
          <MotifDivider style={{ marginTop: '2.2rem', marginBottom: 0 }} />
        </Reveal>

        {/* center column: engraving */}
        <Reveal className="about-figure" delay={80}>
          <img src="assets/shahnameh-engraving.jpg" alt="نگارهٔ کهن ایرانی" />
        </Reveal>

        {/* left column: credentials masthead */}
        <Reveal className="about-cred" delay={140}>
          <GoldDots width={120} height={140} style={{ opacity: 0.7, marginBottom: '2rem' }} />
          <dl className="cred-list">
            <div className="cred-row">
              <dt>صاحب امتیاز</dt>
              <dd>اندیشکدهٔ فرهنگ و هنر گوسان</dd>
            </div>
            <div className="cred-row">
              <dt>مدیر مسئول و سردبیر</dt>
              <dd>یلدا زمانی</dd>
            </div>
            <div className="cred-row">
              <dt>مدیر داخلی</dt>
              <dd>احسان شواربی</dd>
            </div>
            <div className="cred-row">
              <dt>هیئت تحریریه</dt>
              <dd>
                حافظ باباشاهی، امین نایب‌پور<br />
                یلدا زمانی، احسان شواربی، سهراب لبیب
              </dd>
            </div>
          </dl>
          <span className="about-spine">گوسان، سال یکم، شمارهٔ یکم، تابستان ۲۵۸۵</span>
        </Reveal>
      </section>

      <section className="board-section">
        <div className="wrap" style={{ maxWidth: '1100px', paddingTop: '4.5rem', paddingBottom: '4.5rem', position: 'relative', zIndex: 1 }}>
          <Reveal>
            <span className="gsn-technical" style={{ color: 'var(--gold-deep)', display: 'block', textAlign: 'right', marginBottom: '0.7rem' }}>TEAM // ISSUE 01 — SUMMER 2585</span>
            <SectionHead title="هیئت تحریریه" />
            <p className="board-hint">
              دست‌اندرکاران این شماره؛ سال یکم، شمارهٔ یکم، تابستان ۲۵۸۵.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ marginTop: '2.6rem' }}>
              <EditorialBoard />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: '1rem', paddingBottom: '5rem', textAlign: 'center' }}>
        <Reveal>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '0 0 1.6rem' }}>برای همکاری با گاهنامه، با ما در گفت‌وگو باشید.</p>
          <Button href="#/contact">تماس با ما</Button>
        </Reveal>
      </section>
    </main>
  );
}

function ContactPage() {
  const [sent, setSent] = React.useState(false);
  return (
    <main data-screen-label="تماس با ما">
      <PageTitle technical="CONTACT // GOSAN" title="تماس با ما" lede="نامه‌ها، پیشنهادها و نوشتارهای شما" />
      <div className="wrap contact-grid" style={{ paddingBottom: '5rem', maxWidth: '1100px' }}>
        <Reveal>
          <div className="contact-card">
            {sent ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
                <span className="gsn-technical" style={{ color: 'var(--gold-deep)' }}>MESSAGE SENT</span>
                <h3 className="gsn-display" style={{ fontSize: '1.6rem', margin: '0.8rem 0 0.5rem' }}>پیام شما رسید</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0 }}>سپاس از همراهی شما؛ به‌زودی پاسخ می‌دهیم.</p>
              </div>
            ) : (
              <form onSubmit={(e) => {
                e.preventDefault();
                const v = (id) => (document.getElementById(id) || {}).value || '';
                const fields = {
                  name: v('c-name'), email: v('c-mail'), message: v('c-msg'),
                  subject: 'تماس از وب‌سایت گوسان — ' + (v('c-name') || 'بدون نام'),
                  page: (typeof location !== 'undefined' ? location.href : ''),
                };
                gosanFormSubmit(fields).then(() => setSent(true)).catch(() => { gosanMailtoFallback(fields); setSent(true); });
              }}>
                <FormField id="c-name" label="نام" placeholder="نام و نام خانوادگی" />
                <FormField id="c-mail" label="رایانامه" type="email" placeholder="you@example.com" />
                <FormField id="c-msg" label="پیام" multiline placeholder="پیام خود را بنویسید…" />
                <Button variant="gold">ارسال پیام</Button>
              </form>
            )}
          </div>
        </Reveal>
        <Reveal delay={130}>
          <div style={{ position: 'relative', paddingTop: '0.5rem' }}>
            <GoldDots width={90} height={80} style={{ opacity: 0.55, marginBottom: '1.6rem' }} />
            <p style={{ fontSize: '0.95rem', lineHeight: 2.2, color: 'var(--text-muted)', textAlign: 'justify', margin: '0 0 1.8rem' }}>
              اگر جستاری در فرهنگ و هنر ایران دارید، اگر یادمانی از بزرگان این سرزمین در سینه نگاه داشته‌اید،
              یا تنها می‌خواهید سخنی با ما بگویید — گوسان شنوندهٔ روایت شماست.
            </p>
            <a href="mailto:info@gosan.org" style={{ direction: 'ltr', display: 'inline-block', borderBottom: '1px solid var(--gold)', fontWeight: 500 }}>info@gosan.org</a>
            <div style={{ marginTop: '2.2rem' }}>
              <span className="gsn-technical">REPLY — WITHIN 7 DAYS</span>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}

Object.assign(window, { ArchivePage, AboutPage, ContactPage });
