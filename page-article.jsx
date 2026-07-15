/* Gosan Weblog — article reading view: two-column feature + listen bar + footnotes */

/* article category → home section key (matches NcCatSection ids on the home page) */
const TAG_TO_SECTION = {
  'جستار': 'essay',
  'دیدگاه': 'viewpoint',
  'یادمان': 'memoriam',
  'گفتگو': 'interview',
  'نقد و بررسی': 'review',
  'پیشنهاد': 'proposal',
  'پروندهٔ سیاست‌گذاری فرهنگی': 'dossier-policy',
  'پروندهٔ اقتصاد خلاق': 'dossier-economy',
  'پروندهٔ آموزش': 'dossier-education',
};
function goToHomeSection(tag) {
  const key = TAG_TO_SECTION[tag];
  if (key) {
    try { sessionStorage.setItem('gosan-scroll', 'cat-' + key); } catch (e) {}
    window.location.hash = '#/';
  } else {
    window.location.hash = '#/archive/' + encodeURIComponent(tag);
  }
}

const AUTHOR_PHOTOS = {
  'حافظ باباشاهی': 'assets/author-hafez.png',
};

const AUTHOR_BIOS = {
  'حافظ باباشاهی': 'پژوهشگر فرهنگ و تاریخ ایران و از بنیان‌گذاران گاهنامهٔ گوسان. کوشش او بازخوانی روایت‌های کهن و پیوند زدن میراث نیاکان به پرسش‌های امروز است.',
  'امین نایب‌پور': 'پژوهشگر نگارگری و هنرهای تصویری ایران؛ دل‌بستهٔ پیوند تصویر و روایت در نسخه‌های مصور کهن و زبان بصری امروز.',
  'یلدا زمانی': 'پژوهشگر موسیقی کهن ایرانی و گردآورندهٔ نغمه‌های آیینی؛ در پی ردیابی پیوند دیرینهٔ شعر و موسیقی در سنت روایتگری.',
  'احسان شواربی': 'پژوهشگر زبان‌های باستانی و کتیبه‌های ایرانی؛ نگارندهٔ یادمان‌هایی در پاسداشت چهره‌های ماندگار فرهنگ و ادب.',
  'سهراب لبیب': 'خوشنویس و پژوهشگر هنر؛ دل‌مشغول جای‌گاه قلم و حرف در هویت بصری ایرانی، از نیِ خوشنویسی تا حروف امروز.',
};

function toFa(n) {
  return String(n).replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
}

/* footnote contents for the featured essay (referenced by Footnote n=…) */
const ESSAY_FOOTNOTES = [
  'واژهٔ «گوسان» ریشه در زبان پارتی دارد. مری بویس در مقالهٔ کلاسیک خود، «گوسان پارتی و سنت رامشگری ایرانی» (۱۹۵۷)، این واژه را با نقش خنیاگرانِ راوی پیوند داده است.',
  'خداینامه، متن گمشدهٔ تاریخ‌نگاری دورهٔ ساسانی، یکی از سرچشمه‌های اصلی روایت‌های ملی ایران و از منابع دور شاهنامهٔ فردوسی به شمار می‌رود.',
  'ابونصر فارابی در «کتاب موسیقی کبیر» به پیوند ژرف شعر و نغمه در فرهنگ ایرانی و یونانی پرداخته و جای‌گاه موسیقی را در تربیت جان آدمی برجسته کرده است.',
  'اشاره به بیت فردوسی در شرح روزگار چیرگی ضحاک: «هنر خوار شد جادویی ارجمند / نهان راستی، آشکارا گزند».',
];

function AuthorAvatar({ name }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const src = AUTHOR_PHOTOS[name];
  const bio = AUTHOR_BIOS[name] || 'از نویسندگان و پژوهشگران همکار گاهنامهٔ گوسان.';
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);
  return (
    <span className="author-avatar-wrap" ref={ref}>
      <button
        type="button"
        className="author-avatar-btn"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`دربارهٔ ${name}`}
        title={`دربارهٔ ${name}`}
      >
        {src
          ? <img className="author-avatar" src={src} alt={name} />
          : <span className="author-avatar author-avatar--mono">{(name || '؟').trim().charAt(0)}</span>}
      </button>
      {open ? (
        <div className="author-bio-card" role="dialog">
          <span className="author-bio-name">{name}</span>
          <p className="author-bio-text">{bio}</p>
        </div>
      ) : null}
    </span>
  );
}

function ReadingIndicator() {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{ position: 'fixed', top: '90px', left: '2.2rem', bottom: '2.2rem', width: '3px', zIndex: 40 }}>
      <div style={{ position: 'absolute', inset: 0, width: '1px', right: 'auto', background: 'var(--line-draft)' }}></div>
      <div style={{ position: 'absolute', top: 0, width: '3px', height: `${progress * 100}%`, background: 'var(--ink)', transition: 'height 0.1s linear' }}></div>
      <span className="gsn-technical" style={{ position: 'absolute', bottom: '-1.4rem', left: '-0.4rem', fontSize: '0.6rem' }}>
        {Math.round(progress * 100)}%
      </span>
    </div>
  );
}

/* ---------- footnotes ---------- */
function Footnote({ n }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const content = ESSAY_FOOTNOTES[n - 1];
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);
  return (
    <span className="fn" ref={ref}>
      <button
        type="button"
        className={`fn-ref${open ? ' is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        aria-label={`پی‌نوشت ${toFa(n)}`}
      >{toFa(n)}</button>
      <span className={`fn-card${open ? ' is-open' : ''}`} role="note" onMouseLeave={() => setOpen(false)}>
        <span className="fn-card-num">{toFa(n)}</span>
        <span className="fn-card-text">{content}</span>
      </span>
    </span>
  );
}

function FootnotesList() {
  return (
    <section className="fn-list-sec">
      <span className="gsn-technical" style={{ color: 'var(--gold-deep)', display: 'block', marginBottom: '0.5rem', textAlign: 'right' }}>NOTES // پی‌نوشت</span>
      <ol className="fn-list">
        {ESSAY_FOOTNOTES.map((t, i) => (
          <li key={i} id={`fn-${i + 1}`}><span className="fn-list-num">{toFa(i + 1)}</span>{t}</li>
        ))}
      </ol>
    </section>
  );
}

/* ---------- listen bar (text-to-speech) ---------- */
function ListenBar({ getText }) {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const [state, setState] = React.useState('idle'); // idle | playing | paused
  const [progress, setProgress] = React.useState(0);
  const lenRef = React.useRef(1);

  React.useEffect(() => () => { try { window.speechSynthesis.cancel(); } catch (e) {} }, []);

  const start = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const text = (getText() || '').replace(/\s+/g, ' ').trim();
    lenRef.current = Math.max(1, text.length);
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'fa-IR';
    u.rate = 0.95;
    u.pitch = 1;
    const voices = synth.getVoices();
    const fa = voices.find((v) => /fa|persian|farsi/i.test((v.lang || '') + ' ' + (v.name || '')));
    if (fa) u.voice = fa;
    u.onboundary = (e) => { if (typeof e.charIndex === 'number') setProgress(Math.min(1, e.charIndex / lenRef.current)); };
    u.onend = () => { setState('idle'); setProgress(0); };
    u.onerror = () => { setState('idle'); setProgress(0); };
    synth.speak(u);
    setState('playing');
  };

  const onPlayPause = () => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    if (state === 'playing') { synth.pause(); setState('paused'); }
    else if (state === 'paused') { synth.resume(); setState('playing'); }
    else { start(); }
  };
  const onStop = () => { try { window.speechSynthesis.cancel(); } catch (e) {} setState('idle'); setProgress(0); };

  const label = !supported ? 'خواندن صوتی در این مرورگر در دسترس نیست'
    : state === 'playing' ? 'در حال خواندن…'
    : state === 'paused' ? 'مکث'
    : 'به این نوشتار گوش کنید';

  return (
    <div className={`listen-bar${!supported ? ' is-disabled' : ''}`}>
      <button type="button" className="listen-play" onClick={onPlayPause} disabled={!supported} aria-label={state === 'playing' ? 'مکث' : 'پخش'}>
        {state === 'playing' ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" /></svg>
        )}
      </button>
      <div className="listen-body">
        <div className="listen-top">
          <span className="listen-label">{label}</span>
          {state !== 'idle' ? (
            <button type="button" className="listen-stop" onClick={onStop} aria-label="توقف">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="1.5" /></svg>
            </button>
          ) : null}
        </div>
        <div className="listen-track">
          <span className={`listen-fill${state === 'playing' ? ' is-live' : ''}`} style={{ width: `${Math.max(progress * 100, state !== 'idle' ? 3 : 0)}%` }}></span>
        </div>
      </div>
      <span className="listen-tag">AUDIO</span>
    </div>
  );
}

/* ---------- article meta chips (reading time + word count) ---------- */
function ArticleMeta({ articleRef }) {
  const [stats, setStats] = React.useState(null);
  React.useEffect(() => {
    if (!articleRef.current) return;
    const text = (articleRef.current.textContent || '').trim();
    const words = (text.match(/[^\s]+/g) || []).length;
    const minutes = Math.max(1, Math.round(words / 200));
    setStats({ words, minutes });
  }, [articleRef]);
  if (!stats) return null;
  return (
    <div className="article-chips">
      <span className="article-chip">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
        {toFa(stats.minutes)} دقیقه مطالعه
      </span>
      <span className="article-chip-sep"></span>
      <span className="article-chip">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V5h16v2" /><path d="M9 19h6" /><path d="M12 5v14" /></svg>
        {stats.words.toLocaleString('fa-IR')} واژه
      </span>
    </div>
  );
}

/* ---------- social / share icons ---------- */
function ShareIcon({ kind }) {
  const common = { width: 17, height: 17, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    link: <React.Fragment><path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></React.Fragment>,
    facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
    x: <path d="M4 4l16 16M20 4L4 20" />,
    instagram: <React.Fragment><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></React.Fragment>,
    paperclip: <path d="M21 11.5l-8.5 8.5a5 5 0 0 1-7-7l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4l7.8-7.8" />,
    print: <React.Fragment><path d="M6 9V3h12v6" /><path d="M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="7" /></React.Fragment>,
  };
  return <svg {...common}>{paths[kind]}</svg>;
}

function ShareRow() {
  const [copied, setCopied] = React.useState(false);
  const copy = (e) => {
    e.preventDefault();
    try { navigator.clipboard.writeText(window.location.href); } catch (err) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div className="share-row">
      <span className="share-label">{copied ? 'نشانی رونوشت شد ✓' : 'این متن را به اشتراک بگذارید'}</span>
      <div className="share-icons">
        <a href="#" onClick={copy} aria-label="رونوشت پیوند" title="رونوشت پیوند"><ShareIcon kind="link" /></a>
        <a href="#" onClick={(e) => e.preventDefault()} aria-label="فیسبوک"><ShareIcon kind="facebook" /></a>
        <a href="#" onClick={(e) => e.preventDefault()} aria-label="ایکس"><ShareIcon kind="x" /></a>
        <a href="#" onClick={(e) => e.preventDefault()} aria-label="اینستاگرام"><ShareIcon kind="instagram" /></a>
        <a href="#" onClick={copy} aria-label="پیوست"><ShareIcon kind="paperclip" /></a>
        <a href="#" onClick={(e) => { e.preventDefault(); window.print(); }} aria-label="چاپ یا ذخیره به PDF" title="چاپ / ذخیره به PDF"><ShareIcon kind="print" /></a>
      </div>
    </div>
  );
}

/* ---------- summary aside (چکیده) — always visible ---------- */
function SummaryAside({ post, getText }) {
  return (
    <aside className="article-aside">
      <ListenBar getText={getText} />
      <div className="summary-card">
        <span className="summary-head">چکیده</span>
        <hr className="summary-rule" />
        <span className="summary-meta">مقاله از شمارهٔ یکم گوسان، {post.date}</span>
        <p className="summary-text">{post.summary || post.excerpt}</p>
      </div>
      <div className="share-card">
        <ShareRow />
      </div>
    </aside>
  );
}

/* ---------- reader comments ---------- */
function CommentsSection() {
  const [sent, setSent] = React.useState(false);
  return (
    <section className="comments-section">
      <hr className="gsn-rule-gold" style={{ margin: '0 0 2.4rem' }} />
      <h2 className="gsn-display" style={{ fontSize: '1.7rem', color: 'var(--gold-deep)', margin: '0 0 1.8rem' }}>
        دیدگاه خود را با ما به اشتراک بگذارید
      </h2>
      {sent ? (
        <p style={{ color: 'var(--accent-strong)', fontWeight: 500, margin: 0 }}>
          سپاس؛ دیدگاه شما ثبت شد و پس از بازبینی منتشر می‌شود.
        </p>
      ) : (
        <form onSubmit={(e) => {
          e.preventDefault();
          const v = (id) => (document.getElementById(id) || {}).value || '';
          const name = v('cm-name'), mail = v('cm-mail'), msg = v('cm-msg');
          const subject = encodeURIComponent('دیدگاه تازه — گوسان' + (typeof document !== 'undefined' && document.title ? ' (' + document.title + ')' : ''));
          const body = encodeURIComponent('نام: ' + name + '\nرایانامه: ' + mail + '\nصفحه: ' + (typeof location !== 'undefined' ? location.href : '') + '\n\nدیدگاه:\n' + msg);
          window.location.href = 'mailto:info@gosan.org?subject=' + subject + '&body=' + body;
          setSent(true);
        }}>
          <div className="comments-row">
            <FormField id="cm-name" placeholder="نام شما" />
            <FormField id="cm-mail" type="email" placeholder="ایمیل شما" />
          </div>
          <FormField id="cm-msg" multiline placeholder="پیام خود را بنویسید…" />
          <Button variant="gold">ارسال پیام</Button>
        </form>
      )}
    </section>
  );
}

function FullEssayBody() {
  return (
    <React.Fragment>
      <p className="essay-lede">
        از روزگاران کهن در ایران باستان، رامشگران و نغمه‌خوانانی در کار پاسداری از تاریخ و افسانه‌های این سرزمین بودند.
        «گوسان»ها، آن‌طور که در زبان پهلوی خوانده می‌شدند<Footnote n={1} />، روایتگر بودند؛ روایتگر شادی و اندوه مردمان،
        روایتگر رزم و بزم شاهان، روایتگر پیروزی و شکست قهرمانان.
      </p>

      <div className="essay-cols">
        <p>
          آنها این همه را به دیبای وزن و قافیه می‌آراستند و به نوای سازهای خوش‌آهنگ خویش می‌آمیختند تا به دل‌ها بنشیند
          و در یادها بماند، تا سینه به سینه باز گفته و باز خوانده شود. گوسان‌ها می‌سرودند و می‌نواختند تا تاریخ و افسانه
          را در جامهٔ زربفت چامه و موسیقی از گزند فراموشی در امان بدارند. از پس آنان خداینامه‌نویسان ساسانی آمدند<Footnote n={2} />
          و پسان‌تر سرایندگان پارسی‌گوی از توس و بخارا تا تبریز و گنجه.
        </p>
        <p>
          امروز که غبار «وحشتی بزرگ» بر شئون زندگانی ایرانیان سایه افکنده، و نشانه‌های بحران از فرهنگ و هنر تا اقتصاد
          و اقلیم این کهن‌دیار را فرا گرفته‌اند، ما فرزندان این بوم و بر بیش از هر زمان دیگری از خود می‌پرسیم
          در کجای این شب تاریک ایستاده‌ایم. بیش از هر زمان دیگری نشان فرهنگ و تاریخ خویش را می‌جوییم تا در ریسمان‌های آن چنگ زنیم.
        </p>
      </div>

      <PullQuote cite="از همین جستار" style={{ margin: '2.8rem 0' }}>
        فرهنگ و هنر، نه کالاهای تفننی، که ستون‌های تاب‌آوری، بازسازی و بازشناسی هویت یک ملت‌اند
      </PullQuote>

      <figure className="essay-figure">
        <DraftFrame label="FIG. 03 — CYPRESS LANDSCAPE">
          <img src="assets/cypress-landscape.png" alt="" style={{ display: 'block', width: '100%' }} />
        </DraftFrame>
        <figcaption>سروهای کهن در نگاره‌های ایرانی؛ نشانی از ایستادگی و پایداری در برابر تندباد روزگار.</figcaption>
      </figure>

      <div className="essay-cols">
        <p>
          میراث نیاکان، نه یادگاری‌های خاموش، که ریسمان‌هایی در هم پیوسته‌اند برای ایستادگی در تندبادهای فراموشی و سرگردانی؛
          ریسمان‌های ایران. ما بر این باوریم که گذار از بحران عمیق کنونی، نه با قرار دادن خود در جایگاه قربانی،
          که تنها با بازشناسی نقش خویش ممکن است.
        </p>
        <p>
          در سرزمینی غارت‌شده و جامعه‌ای بحران‌زده که نهادهای آن رو به فرسایش‌اند، آیا نمی‌توان فرهنگ و هنر را
          به نیرویی برای بازسازی بدل کرد؟<Footnote n={3} /> آیا نمی‌توان و نباید هنر و فرهنگ را از حاشیهٔ فراموشی به متن احیاء
          یک ملت آورد و با آن پلی به سوی فردایی روشن‌تر ساخت؟
        </p>
      </div>

      <div className="essay-verse">
        <Verse hemistichs={['هنر خوار شد جادویی ارجمند', 'نهان راستی، آشکارا گزند']} poet="حکیم ابوالقاسم فردوسی" />
        <Footnote n={4} />
      </div>

      <p className="essay-close">
        ما فرزندان ایران در گاهنامهٔ «گوسان» می‌کوشیم در مسیر این هدف گام برداشته، پلی باشیم میان میراث کهن پدران
        و چشم‌انداز فردا، و نیز همراهی برای همهٔ آنان که در گرگ و میش شب، نور مهر ایران را در دل دارند.
      </p>

      <FootnotesList />
    </React.Fragment>
  );
}

/* default template for every article that doesn't yet have hand-set full content.
   Same format as the lead essay — lede + two-column body + pull quote + a fillable
   image figure + closing — using the article's own data and editable placeholders. */
function TemplateEssayBody({ post }) {
  const ph = 'متنِ کاملِ این نوشتار در این بخش جای می‌گیرد. این قالب آمادهٔ ویرایش است؛ پاراگراف‌های اصلی مقاله را اینجا بگذارید تا در همین نظم و آرایش، یک‌دست با دیگر نوشتارهای گوسان، منتشر شوند.';
  return (
    <React.Fragment>
      <div className="essay-cols">
        <p>{ph}</p>
        <p>{ph}</p>
      </div>

      <PullQuote cite={post.author} style={{ margin: '2.8rem 0' }}>
        جملهٔ شاخصِ این نوشتار را در اینجا برجسته کنید.
      </PullQuote>

      <figure className="essay-figure">
        <DraftFrame label="FIG. 01">
          <div className="nc-img-wrap" style={{ aspectRatio: '16 / 9' }}>
            {React.createElement('image-slot', { id: `slot-article-${post.slug}`, placeholder: 'تصویر مقاله را اینجا رها کنید', shape: 'rect' })}
          </div>
        </DraftFrame>
        <figcaption>توضیح تصویر مقاله در این بخش قرار می‌گیرد.</figcaption>
      </figure>

      <div className="essay-cols">
        <p>{ph}</p>
        <p>{ph}</p>
      </div>

      <p className="essay-close">{ph}</p>
    </React.Fragment>
  );
}

function ArticleView({ slug }) {
  const post = GOSAN_POSTS.find((p) => p.slug === slug) || GOSAN_POSTS[0];
  const articleRef = React.useRef(null);
  const getText = React.useCallback(() => {
    const el = articleRef.current;
    if (!el) return '';
    const clone = el.cloneNode(true);
    clone.querySelectorAll('.fn-card, .fn-list-sec, .gsn-technical').forEach((n) => n.remove());
    return clone.textContent || '';
  }, []);
  return (
    <main data-screen-label={`نوشتار — ${post.title}`}>
      <ReadingIndicator />

      <div className="article-head">
        <DraftLineH top="2.4rem" right="-6rem" left="-6rem" />
        <span className="gsn-technical" style={{ color: 'var(--gold-deep)' }}><a href="#/" className="article-cat-link" onClick={(e) => { e.preventDefault(); goToHomeSection(post.tag); }}>{post.tag}</a> · شمارهٔ یکم — تابستان ۲۵۸۵</span>
        <h1 className="gsn-display" style={{ fontSize: '2.4rem', margin: '0.6rem 0 1rem' }}>{post.title}</h1>
        <div className="article-byline">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
            <AuthorAvatar name={post.author} />
            <span style={{ color: 'var(--text-body)', fontWeight: 500 }}>{post.author}</span>
          </span>
          <span style={{ color: 'var(--accent)' }}>{post.date}</span>
        </div>
        <ArticleMeta articleRef={articleRef} />
      </div>

      <div className="article-layout">
        <article ref={articleRef}>
          {post.full ? (
            <FullEssayBody />
          ) : (window.GOSAN_ARTICLE_BODIES && window.GOSAN_ARTICLE_BODIES[post.slug]) ? (
            React.createElement(window.GOSAN_ARTICLE_BODIES[post.slug])
          ) : (
            <TemplateEssayBody post={post} />
          )}
        </article>
        <SummaryAside post={post} getText={getText} />
      </div>

      <CommentsSection />

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 2rem 3rem', display: 'flex', justifyContent: 'center', borderTop: '1px solid var(--line)', paddingTop: '2rem' }}>
        <Button variant="ghost" href="#/">← بازگشت به خانه</Button>
      </div>
    </main>
  );
}

Object.assign(window, { ArticleView });
