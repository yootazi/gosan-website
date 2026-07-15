/* Gosan DS components — composed from the bound design-system bundle.
   Classes live in the DS css (gsn-*) — do not restyle them here. */

const {
  Button, Tag, SectionHead, ArticleCard, Verse, PullQuote, GoldDots, DraftFrame, FormField,
} = window.GosanMagazineDesignSystem_8ee353;

/* ---------- drafting lines ---------- */
function DraftLineH({ top, right = '-4rem', left = '-4rem' }) {
  return <div style={{ position: 'absolute', top: top, right: right, left: left, height: '1px', background: 'var(--line-draft)', pointerEvents: 'none' }}></div>;
}
function DraftLineV({ side, offset, top = '-3rem', bottom = '-3rem' }) {
  const st = { position: 'absolute', top: top, bottom: bottom, width: '1px', background: 'var(--line-draft)', pointerEvents: 'none' };
  st[side] = offset;
  return <div style={st}></div>;
}

/* ---------- motion: scroll reveal + parallax ---------- */
function Reveal({ children, delay = 0, style, className = '' }) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let fired = false;
    const show = () => { if (!fired) { fired = true; setInView(true); cleanup(); } };
    let io = null;
    try {
      io = new IntersectionObserver(
        (entries) => { if (entries[0].isIntersecting) show(); },
        { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
      );
      io.observe(el);
    } catch (e) { /* IO unavailable */ }
    /* fallback: IO can be inert during the bundler splash / embedded frames —
       re-check from scroll position over the first few seconds until layout settles */
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95 && r.bottom > 0) show();
    };
    const timers = [120, 400, 900, 1600, 2600].map((t) => setTimeout(check, t));
    window.addEventListener('load', check);
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    function cleanup() {
      if (io) io.disconnect();
      timers.forEach(clearTimeout);
      window.removeEventListener('load', check);
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    }
    return cleanup;
  }, []);
  return (
    <div ref={ref} className={`rv${inView ? ' rv-in' : ''}${className ? ' ' + className : ''}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

function useParallax(speed = 0.06) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.classList.add('plx');
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (document.body.dataset.motion === 'off') { el.style.transform = ''; return; }
        const r = el.getBoundingClientRect();
        const d = (r.top + r.height / 2) - window.innerHeight / 2;
        el.style.transform = `translateY(${(-d * speed).toFixed(1)}px)`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);
  return ref;
}

/* ---------- content (placeholder copy — replace with real pieces) ---------- */
const GOSAN_POSTS = [
  { slug: 'gosan-narrators', tag: 'جستار', title: 'گوسان‌ها؛ راویان فراموش‌شدهٔ تاریخ و افسانهٔ ایران', excerpt: 'جست‌وجویی در پیشینهٔ رامشگران و نغمه‌خوانان ایران باستان، آنان که تاریخ و افسانه را در جامهٔ زربفت چامه و موسیقی از گزند فراموشی در امان داشتند.', date: 'تابستان ۲۵۸۵', author: 'حافظ باباشاهی', full: true },
  { slug: 'miniature-narrative', tag: 'جستار', title: 'نگارگری و روایت؛ از نسخه‌های مصور تا امروز', excerpt: 'نگاهی به پیوند تصویر و قصه در سنت نگارگری ایرانی و آنچه از آن به زبان بصری امروز رسیده است.', date: 'تابستان ۲۵۸۵', author: 'امین نایب‌پور' },
  { slug: 'music-interview', tag: 'گفتگو', title: 'گفت‌وگو با پژوهشگر موسیقی کهن ایرانی', excerpt: 'دربارهٔ پیوند شعر و موسیقی در سنت روایتگری ایرانی و آنچه از نغمه‌های باستان به امروز رسیده است.', date: 'تابستان ۲۵۸۵', author: 'یلدا زمانی' },
  { slug: 'calligraphy-talk', tag: 'گفتگو', title: 'گفت‌وگو دربارهٔ خوشنویسی و هویت بصری ایرانی', excerpt: 'از قلمِ نی تا حروف امروز؛ خوشنویسی چگونه در زندگی روزمرهٔ ما زنده می‌ماند؟', date: 'تابستان ۲۵۸۵', author: 'سهراب لبیب' },
  { slug: 'memorial', tag: 'یادمان', title: 'یادی از بزرگان فرهنگ و هنر ایران', excerpt: 'یادمان چهره‌هایی که در پاسداشت زبان، ادب و هنر ایران کوشیدند و میراثی ماندگار بر جای نهادند.', date: 'تابستان ۲۵۸۵', author: 'احسان شواربی' },
  { slug: 'cypress-memory', tag: 'یادمان', title: 'سروهای کهن؛ یادمان باغ و معماری ایرانی', excerpt: 'درنگی بر جای‌گاه سرو در حافظهٔ بصری ایرانیان، از نقش‌برجسته‌های تخت‌جمشید تا باغ‌های کاشان.', date: 'تابستان ۲۵۸۵', author: 'حافظ باباشاهی' },
  { slug: 'nowruz-rites', tag: 'جستار', title: 'نوروز و آیینِ کهنِ سالِ نو', excerpt: 'از آتش‌افروزیِ شب چهارشنبه تا سفرهٔ هفت‌سین؛ ریشه‌های آیینیِ جشن نوروز و پیوند آن با اسطورهٔ آفرینش در فرهنگ ایرانی.', date: 'فروردین ۲۵۸۵', author: 'امین نایب‌پور' },
  { slug: 'modern-poetry', tag: 'جستار', title: 'شعر معاصر و میراثِ کلاسیک', excerpt: 'نگاهی به گفت‌وگوی پنهانِ شاعران نو با سنت هزارسالهٔ شعر فارسی، از نیما تا امروز.', date: 'تابستان ۲۵۸۵', author: 'سهراب لبیب' },
  { slug: 'painter-talk', tag: 'گفتگو', title: 'گفت‌وگو با یک نگارگرِ معاصر', excerpt: 'دربارهٔ جای‌گاه نگارگری سنتی در هنر امروز ایران و چالشِ پیوندِ کهنه و نو در زبانِ تصویر.', date: 'تابستان ۲۵۸۵', author: 'یلدا زمانی' },
  { slug: 'radif-memorial', tag: 'یادمان', title: 'یادمانِ استادِ ردیفِ موسیقی', excerpt: 'بزرگداشتِ چهره‌ای که عمر در پاسداشت ردیفِ موسیقی دستگاهیِ ایران گذاشت و نسلی را پروراند.', date: 'تابستان ۲۵۸۵', author: 'احسان شواربی' },
  { slug: 'silence-music', tag: 'یادداشت آزاد', title: 'در بابِ سکوت در موسیقی ایرانی', excerpt: 'یادداشتی کوتاه دربارهٔ نقشِ سکوت و درنگ در آواز و ردیف؛ آنجا که خاموشی، خود نغمه است.', date: 'تابستان ۲۵۸۵', author: 'یلدا زمانی' },
  { slug: 'city-memory', tag: 'یادداشت آزاد', title: 'شهر، حافظه و معماری', excerpt: 'قدم‌زدن در کوچه‌های کهن و این پرسش که شهر چگونه خاطرهٔ جمعیِ یک ملت را در خود نگاه می‌دارد.', date: 'تابستان ۲۵۸۵', author: 'حافظ باباشاهی' },
  { slug: 'letter-future', tag: 'یادداشت آزاد', title: 'نامه‌ای به خوانندهٔ آینده', excerpt: 'یادداشتی خطاب به آن‌که سال‌ها بعد این سطرها را می‌خواند؛ از امیدها و بیم‌های امروزِ ما.', date: 'تابستان ۲۵۸۵', author: 'امین نایب‌پور' },
  /* ---------- شمارهٔ یکم — نوشتارهای واقعی (پیش‌نویس؛ متن کامل در article-content.jsx) ---------- */
  { slug: 'manichaean-music-terms', tag: 'جستار', title: 'فهرستی از اصطلاحات موسیقایی در متون مانوی به پارسی و پهلوانی', excerpt: 'فهرستی از نام سازها، اصطلاحات سرود و نوا و افعال خواندن و نواختن در متون مانوی به پارسی و پهلوانی، همراه با شواهدی از متن‌ها.', date: 'تابستان ۲۵۸۵', author: 'احمدرضا قائم‌مقامی' },
  { slug: 'herzfeld-german-archives', tag: 'جستار', title: 'ارنست هرتسفلد در آیینۀ اسناد وزارت خارجۀ آلمان — بخش نخست', excerpt: 'درآمدی بر سه پوشهٔ اسناد «پروفسور هرتسفلد» در بایگانی سیاسی وزارت خارجهٔ آلمان و نخستین سند از این مجموعه.', date: 'تابستان ۲۵۸۵', author: 'سهیل دلشاد' },
  { slug: 'voice-of-the-council', tag: 'جستار', title: 'صدایی که از شورا می‌گذرد', excerpt: 'جستاری دربارهٔ جایگاه شورای هنری در ارکسترها؛ از الگوهای جهانی تا ساختار شوراهای هنری در ارکسترهای ایران.', date: 'تابستان ۲۵۸۵', author: 'علیرضا شیبانی' },
  { slug: 'note-for-gosan', tag: 'دیدگاه', title: 'یادداشتی برای گوسان', excerpt: 'یادداشتی به مناسبت زایش گوسان؛ از «روزنامهٔ کاوه» برلین تا رسالت روایتگری گوسانِ امروز.', date: 'تابستان ۲۵۸۵', author: 'سام گیوراد' },
  { slug: 'crossroads-ahead', tag: 'دیدگاه', title: 'دوراهی پیشِ رو', excerpt: 'درنگی در مهاجرت گستردهٔ موسیقی‌دانان ایرانی و پیامدهای آن برای تداوم نهادی آهنگسازی، موسیقی‌شناسی و اجرا.', date: 'تابستان ۲۵۸۵', author: 'مهرداد غلامی' },
  { slug: 'oil-to-narrative', tag: 'پروندهٔ اقتصاد خلاق', title: 'از نفت تا روایت: اهمیت ایجاد صندوق سرمایه‌گذاری ملی برای فرهنگ و هنر', excerpt: 'چرا ایجاد صندوق سرمایه‌گذاری ملی برای فرهنگ و هنر، نه یک انتخاب لوکس، که ضرورتی برای بازسازی جایگاه ایران است.', date: 'تابستان ۲۵۸۵', author: 'مصطفی بوشهری' },
  { slug: 'interview-farnaz-modarresifar', tag: 'گفتگو', title: 'گفتگو با فرناز مدرسی‌فر', excerpt: 'گفت‌وگو با فرناز مدرسی‌فر، آهنگساز و نوازندهٔ سنتور، نخستین هنرمند ایرانی مقیم ویلا مدیچی؛ سنتور در کانون آوانگاردیسم.', date: 'تابستان ۲۵۸۵', author: 'یلدا زمانی' },
  { slug: 'music-totalitarian-regimes', tag: 'جستار', title: 'نقش موسیقی در نظام‌های تمامیت‌خواه', excerpt: 'از سرودهای رایش سوم تا سمفونی بابی‌یار؛ جستاری در دو چهرهٔ موسیقی زیر سایهٔ قدرت — نوای فرمان و زمزمهٔ پنهان آزادی.', date: 'تابستان ۲۵۸۵', author: 'حافظ باباشاهی' },
  { slug: 'beyzaie-myth-symbolic-action', tag: 'نقد و بررسی', title: 'حقیقتی که نمی‌رهاند؛ اسطوره‌سازی و کُنشِ نمادین در تئاتر بهرام بیضایی', excerpt: 'اسطوره در تئاتر بیضایی نه پناه‌بردن به گذشته، که راهبردی است برای برهم‌زدن قطعیت‌ها؛ درنگی بر کنش نمادین در «مرگ یزدگرد» و جهان نمایشی بیضایی.', date: 'تابستان ۲۵۸۵', author: 'حامد امان‌پور قرایی' },
  { slug: 'between-two-defeats', tag: 'پروندهٔ سیاست‌گذاری فرهنگی', title: 'میانِ دو شکست: دولت، بازار و سیاست‌گذاری فرهنگی در ایران (۱)', excerpt: 'چرا فرهنگ را نه می‌توان به بازار سپرد و نه به دولت مداخله‌گر؟ نخستین یادداشت از مجموعه‌ای دربارهٔ سیاست‌گذاری فرهنگی در ایرانِ آزادِ آینده.', date: 'تابستان ۲۵۸۵', author: 'یلدا زمانی' },
  { slug: 'interview-armin-sanayei', tag: 'گفتگو', title: 'گفتگو با آرمین صنایعی', excerpt: 'گفت‌وگو با آرمین صنایعی، آهنگساز موسیقی معاصر؛ از باله‌ای بر پایهٔ پرومتئوس و سیمرغ تا هویت، گسست تاریخی و سیاست‌گذاری موسیقی در ایران.', date: 'تابستان ۲۵۸۵', author: 'یلدا زمانی' },
];

Object.assign(window, {
  Button, Tag, SectionHead, ArticleCard, Verse, PullQuote, GoldDots, DraftFrame, FormField,
  DraftLineH, DraftLineV, Reveal, useParallax, GOSAN_POSTS, ClockIcon,
});

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M12 7v5l3 2"></path>
    </svg>
  );
}

/* ---------- Persian motif — toranj medallion flanked by two fading gold lines ---------- */
function MotifMark({ size = 52 }) {
  return (
    <svg className="gsn-motif-mark" width={size * 86 / 117} height={size} viewBox="0 0 86 117" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* top trefoil finial */}
        <path d="M43 3 C41.3 6 41.3 8.6 43 11.2 C44.7 8.6 44.7 6 43 3 Z" />
        <path d="M37.5 9.5 C38 11.4 39.4 12 41 11.7 M48.5 9.5 C48 11.4 46.6 12 45 11.7" />
        {/* outer cartouche: onion-dome top, wide lower body, pointed base */}
        <path d="M43 11 C49 14 55 18 57 27 C58.4 31 55.5 33 57 37 C61 46 65 55 65 65 C65 77 56 88 43 103 C30 88 21 77 21 65 C21 55 25 46 29 37 C30.5 33 27.6 31 29 27 C31 18 37 14 43 11 Z" />
        {/* inner illuminated outline */}
        <path d="M43 18 C47.5 20.5 52 23.5 53.5 31 C54.5 35 52 37 53 40.5 C56 48 59 55 59 64 C59 74 51.5 83 43 95 C34.5 83 27 74 27 64 C27 55 30 48 33 40.5 C34 37 31.5 35 32.5 31 C34 23.5 38.5 20.5 43 18 Z" />
        {/* top inner pointed arch */}
        <path d="M43 23 C38.5 28 37.5 33 40 40 M43 23 C47.5 28 48.5 33 46 40" />
        {/* bottom pendant */}
        <path d="M43 103 L43 106" />
        <path d="M43 106 C41.2 108.5 41.2 111 43 113.5 C44.8 111 44.8 108.5 43 106 Z" />
        {/* central lotus bud */}
        <path d="M43 50 C39 58 39 66 43 74 C47 66 47 58 43 50 Z" />
      </g>
      <circle cx="43" cy="61" r="1.6" fill="currentColor" />
    </svg>
  );
}

function MotifDivider({ size = 26, style, className = '' }) {
  return (
    <div className={`gsn-motif-divider${className ? ' ' + className : ''}`} style={style} aria-hidden="true">
      <span className="gsn-motif-line"></span>
      <MotifMark size={size} />
      <span className="gsn-motif-line"></span>
    </div>
  );
}

Object.assign(window, { MotifMark, MotifDivider });
