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
    bio: 'موسیقیدان و دانش‌آموختهٔ دانشگاه موسیقی وین، بنیان‌گذار جشنوارهٔ آواز کلاسیک «وینر لیدر هربست»، مدیر هنری مسابقهٔ پیانوی ماکان، مدرس پیانو در کنسرواتوار ریشارد واگنر وین و از بنیان‌گذاران گاهنامهٔ «گوسان» است.' },
  { key: 'yalda', name: 'یلدا زمانی', role: 'مدیرمسئول اندیشکدهٔ فرهنگ و هنر گوسان / سردبیر گاهنامهٔ گوسان', craft: 'رهبر ارکستر، آهنگساز', img: 'assets/board-yalda.png',
    bio: 'رهبر ارکستر ایرانی–آلمانی مقیم برلین و متخصص موسیقی معاصر؛ دستیار رهبر ارکستر آنسامبل اینترکنتمپورن در فیلارمونی پاریس و بنیان‌گذار ارکستر مجلسی اِلبه در هامبورگ. مدیرمسئول اندیشکدهٔ فرهنگ و هنر گوسان / سردبیر گاهنامهٔ گوسان.' },
  { key: 'ehsan', name: 'احسان شواربی', role: 'مدیر بخش پژوهش', craft: 'باستان‌شناس، سکه‌شناس', img: 'assets/board-ehsan.png',
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
          <dt>مدیرمسئول اندیشکدهٔ فرهنگ و هنر گوسان / سردبیر گاهنامهٔ گوسان</dt>
          <dd>یلدا زمانی</dd>
        </div>
        <div className="cred-row">
          <dt>مدیر بخش پژوهش</dt>
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
              <dd>اندیشکدهٔ فرهنگ و هنر گوسان<br /><span style={{ direction: 'ltr', display: 'inline-block' }}>Gōsān Institute e.V.</span></dd>
            </div>
            <div className="cred-row">
              <dt>مدیرمسئول اندیشکدهٔ فرهنگ و هنر گوسان / سردبیر گاهنامهٔ گوسان</dt>
              <dd>یلدا زمانی</dd>
            </div>
            <div className="cred-row">
              <dt>مدیر بخش پژوهش</dt>
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
          <span className="about-spine">گوسان، سال یکم، شمارهٔ یکم، پاییز ۲۵۸۵</span>
        </Reveal>
      </section>

      <section className="board-section">
        <div className="wrap" style={{ maxWidth: '1100px', paddingTop: '4.5rem', paddingBottom: '4.5rem', position: 'relative', zIndex: 1 }}>
          <Reveal>
            <span className="gsn-technical" style={{ color: 'var(--gold-deep)', display: 'block', textAlign: 'right', marginBottom: '0.7rem' }}>TEAM // ISSUE 01 — SUMMER 2585</span>
            <SectionHead title="هیئت تحریریه" />
            <p className="board-hint">
              دست‌اندرکاران این شماره؛ سال یکم، شمارهٔ یکم، پاییز ۲۵۸۵.
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
      <PageTitle technical="CONTACT // GŌSĀN" title="تماس با ما" lede="نامه‌ها، پیشنهادها و نوشتارهای شما" />
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

function ImpressumPage() {
  const label = { fontSize: '0.72rem', letterSpacing: '0.09em', color: 'var(--gold-deep)', textTransform: 'uppercase', fontWeight: 700, margin: '1.9rem 0 0.55rem' };
  const line = { fontSize: '0.98rem', lineHeight: 2, color: 'var(--ink)', margin: '0 0 0.3rem', direction: 'ltr', textAlign: 'right' };
  const empty = { color: 'var(--text-muted)', fontStyle: 'italic' };
  const mail = { direction: 'ltr', display: 'inline-block', borderBottom: '1px solid var(--gold)', fontWeight: 500 };
  return (
    <main data-screen-label="Impressum">
      <PageTitle technical="IMPRESSUM // GŌSĀN" title="اطلاعات ناشر — Impressum" lede="شناسنامهٔ حقوقی وب‌سایت بر پایهٔ § ۵ DDG و § ۱۸ MStV" />
      <div className="wrap" style={{ maxWidth: '760px', paddingBottom: '5rem' }}>
        <Reveal>
          <p style={{ fontSize: '0.9rem', lineHeight: 2, color: 'var(--text-muted)', margin: '0 0 1.4rem', textAlign: 'justify' }}>
            اطلاعات قانونی زیر بر پایهٔ § ۵ قانون خدمات دیجیتال آلمان (DDG) ارائه می‌شود.
          </p>

          <div style={label}>ناشر · Diensteanbieter</div>
          <p style={line}>Gōsān Institute e.V.</p>
          <p style={line}>Friedrichstr. 155</p>
          <p style={line}>10117 Berlin</p>
          <p style={line}>Germany</p>

          <div style={label}>نماینده · Vertreten durch</div>
          <p style={line}>Yalda Zamani</p>

          <div style={label}>تماس · Kontakt</div>
          <p style={line}>E-Mail: <a href="mailto:info@gosan.org" style={mail}>info@gosan.org</a></p>
          <p style={line}>Telefon: <span style={empty}>—</span></p>

          <div style={label}>ثبت انجمن · Registereintrag</div>
          <p style={line}>Registergericht: <span style={empty}>—</span></p>
          <p style={line}>Registernummer: <span style={empty}>—</span></p>

          <div style={label}>شمارهٔ مالیاتی · Umsatzsteuer-Identifikationsnummer</div>
          <p style={line}><span style={empty}>—</span></p>

          <div style={label}>مسئول محتوا · Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</div>
          <p style={line}>Yalda Zamani</p>
          <p style={line}>Friedrichstr. 155, 10117 Berlin, Germany</p>

          <div style={label}>اعتبار تصویرها · Bildnachweise</div>
          <p style={{ fontSize: '0.78rem', lineHeight: 1.95, color: 'var(--text-muted)', margin: '0 0 0.7rem', textAlign: 'justify' }}>
            تصویرهای روی جلد نوشتارها از مجموعه‌های دسترسی آزاد موزه‌ها و آرشیوهای عمومی برگزیده شده‌اند و با پردازش یکسان آرشیوی گاهنامه بازنشر می‌شوند:
          </p>
          <ul style={{ listStyle: 'none', margin: '0 0 0.5rem', padding: 0 }}>
            {GOSAN_POSTS.filter((p) => (window.GOSAN_COVER_ALTS || {})[p.slug]).map((p) => (
              <li key={p.slug} style={{ fontSize: '0.72rem', lineHeight: 1.9, color: 'var(--text-muted)', padding: '0.28rem 0', borderBottom: '1px dashed var(--line, #CFCCC3)' }}>
                <a href={`#/article/${p.slug}`} style={{ color: 'var(--ink)', textDecoration: 'none' }}>{p.title}</a>
                <span style={{ margin: '0 0.35rem' }}>—</span>
                {window.GOSAN_COVER_ALTS[p.slug]}
              </li>
            ))}
          </ul>

          <MotifDivider style={{ margin: '2.6rem 0 1.4rem' }} />
          <p style={{ fontSize: '0.82rem', lineHeight: 1.95, color: 'var(--text-muted)', textAlign: 'justify' }}>
            حل اختلاف مصرف‌کننده · Verbraucherstreitbeilegung: Gōsān Institute e.V. مایل یا موظف به شرکت در روش حل اختلاف در برابر هیئت داوری مصرف‌کننده نیست.
          </p>
        </Reveal>
      </div>
    </main>
  );
}

function DatenschutzPage() {
  const label = { fontSize: '0.72rem', letterSpacing: '0.09em', color: 'var(--gold-deep)', textTransform: 'uppercase', fontWeight: 700, margin: '1.9rem 0 0.55rem' };
  const line = { fontSize: '0.98rem', lineHeight: 2, color: 'var(--ink)', margin: '0 0 0.3rem', direction: 'ltr', textAlign: 'right' };
  const para = { fontSize: '0.92rem', lineHeight: 2.05, color: 'var(--ink)', margin: '0 0 1rem', textAlign: 'justify' };
  const mail = { direction: 'ltr', display: 'inline-block', borderBottom: '1px solid var(--gold)', fontWeight: 500 };
  const ext = { direction: 'ltr', display: 'inline-block', borderBottom: '1px solid var(--gold)', fontSize: '0.85rem', wordBreak: 'break-all' };
  return (
    <main data-screen-label="Datenschutz">
      <PageTitle technical="DATENSCHUTZ // GŌSĀN" title="حفاظت از داده‌ها — Datenschutzerklärung" lede="پردازش داده‌ها در این وب‌سایت، بر پایهٔ DSGVO و TDDDG" />
      <div className="wrap" style={{ maxWidth: '760px', paddingBottom: '5rem' }}>
        <Reveal>
          <p style={para}>
            این صفحه شرح می‌دهد که هنگام بازدید از وب‌سایت گاهنامهٔ گوسان چه داده‌هایی پردازش می‌شود، به چه منظور و بر کدام مبنای حقوقی — و شما در برابر آن چه حقوقی دارید. مبنای این اعلامیه، مقررات عمومی حفاظت از داده‌های اتحادیهٔ اروپا (DSGVO) و قانون آلمانی TDDDG است.
          </p>
          <p style={para}>
            این وب‌سایت یک سایت ایستاست: نه کوکی می‌گذارد، نه آمارگیری و ردیابی می‌کند و نه محتوایی از سرویس‌های ثالث بارگذاری می‌کند. قلم‌ها و پرونده‌های رسانه‌ای همگی از خود سایت بارگیری می‌شوند.
          </p>

          <div style={label}>مسئول پردازش داده‌ها · Verantwortlicher</div>
          <p style={line}>Gōsān Institute e.V.</p>
          <p style={line}>Friedrichstr. 155</p>
          <p style={line}>10117 Berlin, Germany</p>
          <p style={line}>Vertreten durch: Yalda Zamani</p>
          <p style={line}>E-Mail: <a href="mailto:info@gosan.org" style={mail}>info@gosan.org</a></p>

          <div style={label}>میزبانی وب‌سایت · Hosting (GitHub Pages)</div>
          <p style={para}>
            این وب‌سایت روی GitHub Pages میزبانی می‌شود؛ سرویسی از شرکت GitHub, Inc. (ایالات متحدهٔ آمریکا). با هر بار باز شدن صفحه، سرورهای GitHub به‌طور خودکار داده‌های فنی اتصال را دریافت می‌کنند: نشانی IP، شناسهٔ مرورگر (User-Agent) و زمان درخواست. این داده‌ها برای نمایش سایت و تأمین امنیت فنی آن لازم است. مبنای حقوقی: Art. 6 Abs. 1 lit. f DSGVO — منافع مشروع ما در ارائهٔ پایدار و امن وب‌سایت.
          </p>
          <p style={para}>
            GitHub, Inc. زیر «چارچوب حریم دادهٔ اتحادیهٔ اروپا و آمریکا» (EU-US Data Privacy Framework) گواهی شده است؛ انتقال داده به آمریکا از این رو بر تصمیم کفایت کمیسیون اروپا (Art. 45 DSGVO) استوار است. جزئیات پردازش نزد GitHub در اعلامیهٔ حریم خصوصی خود GitHub آمده است:{' '}
            <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer" style={ext}>docs.github.com/…/github-general-privacy-statement</a>
          </p>

          <div style={label}>تماس با ما · Kontakt per E-Mail</div>
          <p style={para}>
            فرم تماس این وب‌سایت تنها برنامهٔ ایمیل خود شما را باز می‌کند (پیوند mailto:)؛ خود وب‌سایت هیچ داده‌ای دریافت یا ذخیره نمی‌کند. آنچه با ایمیل برای ما بفرستید، تنها برای پاسخ‌گویی و پیگیری همان مکاتبه پردازش می‌شود (Art. 6 Abs. 1 lit. b und f DSGVO) و به کسی واگذار نمی‌شود. پس از پایان مکاتبه، ایمیل‌ها حذف می‌شوند، مگر آنکه نگهداری آنها تکلیف قانونی باشد.
          </p>

          <div style={label}>خبرنامه · Newsletter</div>
          <p style={para}>
            در وب‌سایت فرمی برای عضویت در خبرنامه هست. نشانی ایمیلی که ثبت می‌کنید تنها برای فرستادن خبرنامه ذخیره و به‌کار می‌رود و به هیچ منظور دیگری پردازش نمی‌شود. مبنای حقوقی: رضایت شما (Art. 6 Abs. 1 lit. a DSGVO). این رضایت را هر زمان می‌توانید پس بگیرید — با پیامی به info@gosan.org یا از راه لغو عضویت در خود خبرنامه. پس از آن، نشانی شما حذف می‌شود. پس گرفتن رضایت، به قانونی بودن پردازشی که پیش از آن انجام شده خدشه‌ای نمی‌زند.
          </p>

          <div style={label}>حافظهٔ مرورگر — بدون کوکی · Browser-Speicher (keine Cookies)</div>
          <p style={para}>
            این وب‌سایت کوکی نمی‌گذارد و هیچ ابزار آمارگیری یا ردیابی به‌کار نمی‌برد. تنها از حافظهٔ مرورگر شما (sessionStorage / localStorage) برای کارکردهای فنی استفاده می‌شود: نگه داشتن جای پیمایش صفحه و وضعیت ظاهری سایت. در این حافظه هیچ دادهٔ شخصی ذخیره نمی‌شود؛ محتوای آن در مرورگر خود شما می‌ماند و هرگز به ما یا دیگری فرستاده نمی‌شود. این ذخیره‌سازی برای کارکرد سایت ضروری است و بنابر § 25 Abs. 2 Nr. 2 TDDDG نیازی به رضایت ندارد؛ از همین روست که این سایت بنر کوکی ندارد.
          </p>

          <div style={label}>حقوق شما · Ihre Rechte als betroffene Person</div>
          <p style={para}>
            دربارهٔ داده‌های شخصی خود، این حقوق را دارید: دسترسی (Art. 15)، تصحیح (Art. 16)، حذف (Art. 17)، محدود کردن پردازش (Art. 18)، انتقال داده‌ها (Art. 20)، اعتراض به پردازشِ مبتنی بر منافع مشروع (Art. 21)، پس گرفتن رضایت در هر زمان بدون اثر بر پردازش پیشین (Art. 7 Abs. 3) و شکایت نزد مرجع نظارتی (Art. 77 DSGVO). برای به‌کار بستن این حقوق کافی است به <a href="mailto:info@gosan.org" style={mail}>info@gosan.org</a> بنویسید.
          </p>
          <p style={para}>
            مرجع نظارتی صلاحیت‌دار برای شکایت: Berliner Beauftragte für Datenschutz und Informationsfreiheit (BlnBDI)، Alt-Moabit 59–61, 10555 Berlin —{' '}
            <a href="https://www.datenschutz-berlin.de" target="_blank" rel="noopener noreferrer" style={ext}>datenschutz-berlin.de</a>
          </p>

          <MotifDivider style={{ margin: '2.6rem 0 1.4rem' }} />
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>آخرین بازنگری: اوت ۲۰۲۶ · Stand: August 2026</p>
        </Reveal>
      </div>
    </main>
  );
}


/* donation configuration — set the PayPal link to activate the button
   (PayPal.Me link or hosted-button URL of the institute account) */
const GOSAN_DONATE = {
  paypal: '',            // e.g. 'https://www.paypal.com/donate/?hosted_button_id=…'
  iban: '',              // filled after Registereintragung + bank account
  monthly: { 5: '', 20: '', 50: '', 100: '' },  // PayPal monthly-subscription links per tier
  yearly: { 5: '', 20: '', 50: '', 100: '' },   // PayPal annual-payment links per tier (recommended path)
};

function SupportPage() {
  const label = { fontSize: '0.72rem', letterSpacing: '0.09em', color: 'var(--gold-deep)', textTransform: 'uppercase', fontWeight: 700, margin: '2rem 0 0.6rem' };
  const para = { fontSize: '0.95rem', lineHeight: 2.05, color: 'var(--ink)', margin: '0 0 1rem', textAlign: 'justify' };
  const note = { fontSize: '0.85rem', lineHeight: 2, color: 'var(--text-muted)', margin: '0 0 1rem', textAlign: 'justify' };
  const payBtn = {
    display: 'inline-block', padding: '0.7rem 2.2rem', border: '1px solid var(--ink)',
    background: GOSAN_DONATE.paypal ? 'var(--ink)' : 'var(--surface-band)',
    color: GOSAN_DONATE.paypal ? 'var(--paper, #EAEAE6)' : 'var(--text-muted)',
    fontWeight: 600, textDecoration: 'none', cursor: GOSAN_DONATE.paypal ? 'pointer' : 'default',
  };
  return (
    <main data-screen-label="حمایت از گوسان">
      <PageTitle technical="SUPPORT // GŌSĀN" title="حمایت از گوسان" lede="گاهنامه و اندیشکده تنها با پشتیبانی خوانندگان سر پا می‌مانند" />
      <div className="wrap" style={{ maxWidth: '760px', paddingBottom: '5rem' }}>
        <Reveal>
          <p style={para}>
            گوسان نه آگهی و نه بودجه‌ای از جایی می‌پذیرد. هزینهٔ گاهنامه و اندیشکده (قلم‌بهای نویسندگان و پژوهشگران، دستمزد تحریریه و هزینه‌های فنی)، یکسره از کمک‌های مردمی تأمین می‌شود. هیچ حامی‌ای بر محتوا اثر نمی‌گذارد و هیچ یافته‌ای را پیش از انتشار نمی‌بیند.
          </p>

          <div style={{ border: '1px solid var(--gold)', padding: '1rem 1.3rem', margin: '1.4rem 0' }}>
            <p style={{ ...note, margin: 0 }}>
              انجمن گوسان (Gōsān Institute e.V.) در آستانهٔ ثبت رسمی در برلین است. دریافت کمک‌های مالی پس از ثبت انجمن و گشایش حساب بانکی آغاز می‌شود؛ این صفحه راه‌های کمک را از هم‌اکنون معرفی می‌کند.
            </p>
          </div>


          <div style={label}>حلقهٔ دوستان گوسان · Freundeskreis</div>
          <p style={para}>
            نهادهای فرهنگی و پژوهشی ماندگار را همیشه حلقه‌ای از دوستان برپا نگه داشته است.
          </p>
          <p style={para}>
            دوستان گوسان جایگاهی ویژه نزد ما دارند و گوسان سپاسگزاری از آنان را به شیوه‌های شایسته به جا می‌آورد. محتوای گوسان برای همه آزاد می‌ماند؛ حمایت دوستان نه خریدن امتیازی برای خود، که سهم داشتن در ماندگاری نهادی است که دوستش دارند.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.9rem', margin: '0 0 1rem' }}>
            {[
              { amt: 5, what: 'با پرداخت هزینه‌های میزبانی و ابزارها، چراغ تارنما را روشن نگه می‌دارد.' },
              { amt: 20, what: 'هر سال قلم‌بهای یک جستار گاهنامه را می‌پردازد.' },
              { amt: 50, what: 'هر سال هزینهٔ یک مقالهٔ پژوهشی اندیشکده و بخشی از یک جستار را می‌پردازد.' },
              { amt: 100, what: 'هر سال هزینهٔ یک مقالهٔ کامل اندیشکده و قلم‌بهای پژوهشگران آن را می‌پردازد.' },
            ].map((t) => {
              const yLink = GOSAN_DONATE.yearly[t.amt];
              const mLink = GOSAN_DONATE.monthly[t.amt];
              const optStyle = (primary, active) => ({
                display: 'block', textAlign: 'center', padding: '0.45rem 0.4rem', fontSize: '0.78rem',
                fontWeight: primary ? 700 : 400, textDecoration: 'none', cursor: active ? 'pointer' : 'default',
                border: '1px solid ' + (primary ? 'var(--ink)' : 'var(--line, #CFCCC3)'),
                background: primary ? 'var(--ink)' : 'transparent',
                color: primary ? 'var(--paper, #EAEAE6)' : 'var(--ink)',
              });
              return (
                <div key={t.amt} style={{ border: '1px solid var(--line, #CFCCC3)', background: 'var(--surface-band)', padding: '1rem 1.1rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--ink)' }}>{'\u20AC'}{t.amt}<span style={{ fontSize: '0.72rem', fontWeight: 400, color: 'var(--text-muted)' }}> در ماه</span></span>
                  <span style={{ fontSize: '0.76rem', lineHeight: 1.8, color: 'var(--text-muted)', minHeight: '3.6em' }}>{t.what}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: 'auto', borderTop: '1px dashed var(--line, #CFCCC3)', paddingTop: '0.7rem' }}>
                    {yLink
                      ? <a href={yLink} target="_blank" rel="noopener noreferrer" style={optStyle(true, true)}>حمایت سالانه — {'\u20AC'}{t.amt * 12}</a>
                      : <span style={optStyle(true, false)}>حمایت سالانه — {'\u20AC'}{t.amt * 12}</span>}
                    {mLink
                      ? <a href={mLink} target="_blank" rel="noopener noreferrer" style={optStyle(false, true)}>حمایت ماهانه — {'\u20AC'}{t.amt}</a>
                      : <span style={optStyle(false, false)}>حمایت ماهانه — {'\u20AC'}{t.amt}</span>}
                  </div>
                </div>
              );
            })}
          </div>
          <p style={note}>
            حمایت ماهانه یا سالانه از راه PayPal یا دستور پرداخت بانکی، از زمان راه‌اندازی رسمی فعال می‌شود. پس از تأیید عام‌المنفعگی، حق عضویت حامیان برای مالیات‌دهندگان آلمان کسرپذیر است — برخلاف باشگاه‌های ورزشی، حمایت از انجمن‌های فرهنگی مشمول کسر مالیاتی است، درست به این دلیل که حامی چیزی برای خودش نمی‌خرد.
          </p>

          <div style={label}>پی‌پال · PayPal</div>
          {GOSAN_DONATE.paypal
            ? <p style={para}><a href={GOSAN_DONATE.paypal} target="_blank" rel="noopener noreferrer" style={payBtn}>کمک از راه PayPal</a></p>
            : <p style={note}>پرداخت با PayPal و کارت‌های بانکی بین‌المللی از زمان راه‌اندازی رسمی فعال می‌شود و همین‌جا در دسترس خواهد بود.</p>}

          <div style={label}>انتقال بانکی · Überweisung</div>
          <p style={note}>
            شماره حساب انجمن (IBAN) پس از ثبت رسمی و گشایش حساب، در همین صفحه اعلام می‌شود.
          </p>

          <div style={label}>حامیان در آلمان</div>
          <p style={note}>
            پس از تأیید عام‌المنفعگی از سوی ادارهٔ دارایی (§ 60a AO)، برای کمک‌ها گواهی مالیاتی (Zuwendungsbestätigung) صادر خواهد شد. تا آن زمان کمک پذیرفته می‌شود، اما گواهی ندارد.
          </p>

          <div style={label}>حامیان در اروپا و دیگر کشورها · European &amp; International Donors</div>
          <p style={note}>
            کمک از هر جای اروپا و جهان ساده است: انتقال بانکی (در منطقهٔ یورو با SEPA، بی‌هزینه) و پرداخت با PayPal و کارت بانکی. در اتحادیهٔ اروپا، بنا بر حقوق اتحادیه، کسر مالیاتی کمک به نهادهای عام‌المنفعهٔ دیگر کشورهای عضو در کشور خود حامی ممکن است؛ گوسان پس از تأیید عام‌المنفعگی، اسناد لازم را در اختیار حامیانی می‌گذارد که بخواهند از این امکان استفاده کنند. برای کمک‌های بزرگ‌تر از دیگر کشورهای اروپایی، مسیر گواهی مالیاتی محلی از راه شبکهٔ Transnational Giving Europe بررسی و اعلام خواهد شد.
          </p>

          <div style={label}>حامیان در آمریکا · U.S. Donors</div>
          <p style={note}>
            کمک با کارت بانکی و PayPal از آمریکا بی‌دردسر ممکن است. کسر مالیاتی آمریکا (tax-deductible) هنوز برقرار نیست؛ پس از تأیید عام‌المنفعگی، مسیر کمک کسرپذیر از راه صندوق دوستان آمریکایی (American Friends Fund) برقرار و همین‌جا اعلام می‌شود.
          </p>

          <div style={label}>شفافیت · Transparenz</div>
          <p style={note}>
            برآورد نیاز سالانهٔ گاهنامه و اندیشکده حدود ۶۵ هزار یورو است: نزدیک به ۳۷ درصد آن به عنوان قلم‌بها به نویسندگان و پژوهشگران می‌رسد؛ حدود ۲۲ درصد دستمزد تحریریه و مدیریت است؛ حدود ۲۲ درصد هزینه‌های پشتیبانی، ویرایش و ترجمه؛ و تنها حدود ۴ درصد هزینه‌های فنی (میزبانی و ابزارها). باقی، اندوختهٔ احتیاطی است. این رقم، بودجهٔ مرحلهٔ بنیان‌گذاری است: گوسان برنامهٔ مالی پانزده‌سالهٔ خود را در سه مرحله تعریف کرده است؛ رشد هر مرحله تنها بر پایهٔ منابع پایدار به‌دست‌آمده آغاز می‌شود و هزینه‌های ثابت هرگز از درآمد پایدار پیشی نمی‌گیرند. گوسان هر سال گزارشی کلی از منابع و مصارف مالی خود منتشر می‌کند؛ نام حامیان بدون خواست خودشان هرگز اعلام نمی‌شود.
          </p>

          <MotifDivider style={{ margin: '2.4rem 0 1.2rem' }} />
          <div style={{ border: '1px solid var(--line, #CFCCC3)', background: 'var(--surface-band)', padding: '1.3rem 1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 500, color: 'var(--ink)' }}>پرسش دربارهٔ حمایت، کمک نهادی یا همکاری؟</p>
            <a href="mailto:info@gosan.org" style={{ display: 'inline-block', padding: '0.55rem 1.7rem', border: '1px solid var(--ink)', background: 'var(--ink)', color: 'var(--paper, #EAEAE6)', fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none', direction: 'ltr' }}>info@gosan.org</a>
          </div>
        </Reveal>
      </div>
    </main>
  );
}


Object.assign(window, { ArchivePage, AboutPage, ContactPage, ImpressumPage, DatenschutzPage, SupportPage });
