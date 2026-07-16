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
  { slug: 'interview-farnaz-modarresifar', tag: 'گفتگو', title: 'سنتور در کانون آوانگاردیسم: گفتگو با فرناز مدرسی‌فر', excerpt: 'گفت‌وگو با فرناز مدرسی‌فر، آهنگساز و نوازندهٔ سنتور، نخستین هنرمند ایرانی مقیم ویلا مدیچی؛ سنتور در کانون آوانگاردیسم.', date: 'تابستان ۲۵۸۵', author: 'یلدا زمانی' },
  { slug: 'music-totalitarian-regimes', tag: 'جستار', title: 'نقش موسیقی در نظام‌های تمامیت‌خواه', excerpt: 'از سرودهای رایش سوم تا سمفونی بابی‌یار؛ جستاری در دو چهرهٔ موسیقی زیر سایهٔ قدرت — نوای فرمان و زمزمهٔ پنهان آزادی.', date: 'تابستان ۲۵۸۵', author: 'حافظ باباشاهی' },
  { slug: 'beyzaie-myth-symbolic-action', tag: 'یادمان', title: 'حقیقتی که نمی‌رهاند؛ اسطوره‌سازی و کُنشِ نمادین در تئاتر بهرام بیضایی', excerpt: 'اسطوره در تئاتر بیضایی نه پناه‌بردن به گذشته، که راهبردی است برای برهم‌زدن قطعیت‌ها؛ درنگی بر کنش نمادین در «مرگ یزدگرد» و جهان نمایشی بیضایی.', date: 'تابستان ۲۵۸۵', author: 'حامد امان‌پور قرایی' },
  { slug: 'between-two-defeats', tag: 'پروندهٔ سیاست‌گذاری فرهنگی', title: 'میانِ دو شکست: دولت، بازار و سیاست‌گذاری فرهنگی در ایران (۱)', excerpt: 'چرا فرهنگ را نه می‌توان به بازار سپرد و نه به دولت مداخله‌گر؟ نخستین یادداشت از مجموعه‌ای دربارهٔ سیاست‌گذاری فرهنگی در ایرانِ آزادِ آینده.', date: 'تابستان ۲۵۸۵', author: 'یلدا زمانی' },
  { slug: 'interview-armin-sanayei', tag: 'گفتگو', title: 'گفتگو با آرمین صنایعی', excerpt: 'گفت‌وگو با آرمین صنایعی، آهنگساز موسیقی معاصر؛ از باله‌ای بر پایهٔ پرومتئوس و سیمرغ تا هویت، گسست تاریخی و سیاست‌گذاری موسیقی در ایران.', date: 'تابستان ۲۵۸۵', author: 'یلدا زمانی' },
];

/* ---------- serverless form delivery ----------
   Static site (GitHub Pages) has no backend, so form submissions are POSTed to
   FormSubmit (a free relay) which forwards them to info@gosan.org. The very first
   submission triggers a one-time activation email to that inbox; once confirmed,
   every later submission is delivered. If the request fails (offline / blocked),
   callers fall back to a mailto: compose. */
const GOSAN_FORM_INBOX = 'info@gosan.org';
async function gosanFormSubmit(fields) {
  const payload = {
    _subject: fields.subject || 'پیام از وب‌سایت گوسان',
    _template: 'table',
    _captcha: 'false',
    نام: fields.name || '',
    رایانامه: fields.email || '',
    صفحه: fields.page || '',
    پیام: fields.message || '',
  };
  const res = await fetch('https://formsubmit.co/ajax/' + GOSAN_FORM_INBOX, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('form relay status ' + res.status);
  return res.json();
}
function gosanMailtoFallback(fields) {
  const subject = encodeURIComponent(fields.subject || 'پیام از وب‌سایت گوسان');
  const body = encodeURIComponent(
    'نام: ' + (fields.name || '') + '\nرایانامه: ' + (fields.email || '') +
    '\nصفحه: ' + (fields.page || '') + '\n\nپیام:\n' + (fields.message || '')
  );
  window.location.href = 'mailto:' + GOSAN_FORM_INBOX + '?subject=' + subject + '&body=' + body;
}

/* article-page چکیده: the author/editor abstract (چکیدهٔ پیشنهادی) where one
   exists; SummaryAside falls back to the teaser excerpt otherwise. */
const GOSAN_SUMMARIES = {
  "voice-of-the-council": "شورای هنری، حلقهٔ خاموش اما تعیین‌کنندهٔ هر ارکستر است؛ جایی که پیش از نواخته‌شدن هر قطعه، انتخاب رپرتوار، رنگ‌آمیزی و شیوهٔ اجرا از صافیِ خرد جمعیِ رهبر و نوازندگان می‌گذرد. این جستار شورای هنری را «گوش سوم» و فانوسِ پیشِ‌روی ارکستر می‌داند؛ ساختاری کم‌صدا که اختلاف‌ها را به گفت‌وگو بدل می‌کند و ارکستر را از «گروهی از نوازندگان» به «تنی واحد و نهادی هنری» ارتقا می‌دهد. از این منظر، کیفیت پایدار و هویت هنری هر ارکستر بر ستون‌های پنهانی استوار است که همین شورا برمی‌افرازد.",
  "interview-farnaz-modarresifar": "فرناز مدرسی‌فر، نخستین آهنگساز ایرانیِ برگزیده برای آکادمی فرانسه در رم (ویلای مدیچی)، در این گفت‌وگو از کوشش خود برای بازتعریف سنتور سخن می‌گوید؛ از سازی وابسته به ردیف تا منبعی صوتی در کانون آهنگسازی آوانگارد معاصر. او پیوند میان منطق زمانیِ موسیقی کلاسیک ایرانی و زبان آهنگسازی امروز اروپا را می‌کاود و از مقاومت در برابر کلیشۀ «هنرمند شرقی» می‌گوید. در پایان، سه گام بنیادی برای اعتلای موسیقی در ایرانِ فردا و نقش اجتماعی موسیقی معاصر را برمی‌شمارد.",
  "herzfeld-german-archives": "این جستار، بخش نخست از مجموعه‌ای دنباله‌دار، به معرفی و بررسی اسناد مربوط به ارنست هرتسفلد، ایران‌شناس و باستان‌شناس نامدار آلمانی، در بایگانی سفارت آلمان در تهران می‌پردازد؛ اسنادی که اکنون در «بایگانی سیاسی ادارۀ فدرال خارجی» در برلین نگهداری می‌شوند. نویسنده که خود سه پوشۀ «پروفسور هرتسفلد» را در فاصلۀ سال‌های ۱۴۰۱ تا ۱۴۰۲ خورشیدی مطالعه و از آن‌ها تصویربرداری کرده است، پیشینه و سرنوشت این پوشه‌ها، پیوند نزدیک هرتسفلد با سفیران آلمان در تهران (به‌ویژه شولنبورگ و فُن بلوشر) و ساختار کلی اسناد را شرح می‌دهد. در پایان نیز رزومۀ کاری هرتسفلد به قلم خودش و نخستین سند این مجموعه (نامۀ فوریۀ ۱۹۲۳ وزارت خارجۀ آلمان) به دست داده می‌شود.",
  "crossroads-ahead": "این جستار به موج دو دهه‌ای مهاجرت موسیقی‌دانان ایرانی به اروپا و آمریکای شمالی و پیامدهای نهادی آن برای موسیقی کلاسیک ایران می‌پردازد. نویسنده، از دریچۀ تجربۀ شخصی و پژوهشی خود، استدلال می‌کند که این مهاجرت جمعی با گسستنِ تداومِ آموزشی، اجرایی و پژوهشی، از شکل‌گیری بدنه‌ای منسجم در آهنگسازی و موسیقی‌شناسی ایرانی جلوگیری کرده و این خلأ با ناهماهنگی میان نیازهای واقعی موسیقی ایران و مدهای آکادمیک غرب ژرف‌تر شده است. او در پایان، بازگرداندن اولویت به «تداوم» و تکمیل منابع بنیادین را راهی برای بازسازی این سنت پیشنهاد می‌کند.",
  "between-two-defeats": "این جستار، نخستین از یک مجموعه، با تکیه بر دو مفهوم بنیادین اقتصاد سیاسی، یعنی «شکست بازار» و «شکست دولت»، نشان می‌دهد که چرا فرهنگ و هنر را نه می‌توان یکسره به سازوکار عرضه و تقاضای بازار سپرد و نه به دولتِ مداخله‌گری که آن را ابزار بازتولید ایدئولوژی می‌کند. نویسنده با مرور تاریخِ حمایت دولتی از هنر در غرب و نقد کوشش‌های بومی‌سازیِ مدل چارترند و مک‌کاهی در ایران، استدلال می‌کند که آیندهٔ فرهنگ باید از مسیری باریک میان این دو شکست بگذرد: دولتی در نقش بسترساز و حامی که با «اصل فاصله از قدرت»، تأمین مالی فرهنگ را از داوری دربارهٔ محتوای آن جدا می‌کند. حاصل چنین آرایشی، سیاستی است که شکاف‌های بازار را جبران می‌کند بی‌آنکه راهِ پویایی و آزادیِ آفرینش هنری را ببندد.",
  "interview-armin-sanayei": "گفت‌وگو با آرمین صنایعی، آهنگسازِ معاصر، از تازه‌ترین اثرِ او — باله‌ای بر پایهٔ سه اسطورهٔ پرومتئوس، فروپاشیِ دیوارِ برلین و سیمرغِ عطار — آغاز می‌شود و به پرسش‌های بزرگ‌ترِ موسیقیِ امروزِ ایران می‌رسد: «حرکت»ی که از دلِ سکون می‌زاید، مسئولیتِ آهنگساز در برابرِ نوازنده، هویتِ ایرانی همچون امری پویا و نه فهرستی از نشانه‌ها، و آن گسستِ تاریخی که پس از ۱۳۵۷ از حذفِ نهادی و قطعِ حافظه برخاست و به «مدرنیسمِ بی‌تداوم» انجامید. صنایعی در پایان، از راهِ برون‌رفت می‌گوید: ساختنِ نهادی و پایدارِ ارکسترها و آکادمی‌ها، سپردنِ سیاست‌گذاری به شوراهای مستقل، و سه شرطِ استقلال و آگاهی و تجربه — چراکه به باورِ او موسیقی، پیش از هر چیز، کنشی انسانی و اخلاقی است.",
  "manichaean-music-terms": "این نوشته، فهرستی موقّت از اصطلاحات موسیقایی بازمانده در متون مانوی به دو زبانِ پارسی (فارسی میانه) و پهلوانی (پهلوی اشکانی) فراهم می‌آورد؛ اصطلاحاتی که به‌سبب رواج سرودخوانی و نوازندگی در دیرهای مانوی شمار قابل‌توجهی از آنها بر جای مانده است. نویسنده مدخل‌ها را در چهار دسته سامان می‌دهد: نام سازها و ابزارهای نواختن، واژه‌های رسانندهٔ معنای سرود و نوا و نغمه، نام‌های خوانندگان و نوازندگان، و افعال دالّ بر خواندن و نواختن؛ و برای هر یک، معنا و ریشه و شواهد متنی را با ارجاع به منابع مانوی‌شناسی به دست می‌دهد. در این میان به واژه‌هایی چون «نوا» (niwāg) و «سرود» (mahr) و به نام سازهایی مانند چنگ، نای، شیپور و پندورک می‌پردازد و ابهام‌های موجود در خواندن و تعیینِ مصداقِ برخی از آنها را نیز یادآور می‌شود.",
  "music-totalitarian-regimes": "این جستار با تأملی شخصی آغاز می‌شود — شنیدنِ اجرای فینال سمفونی نهم بتهوون در ویرانه‌های ساختمان صداوسیما — و از همین‌جا پرسش از نسبت هنرمند با زمانهٔ خویش و خطرِ بدل‌شدنِ زیبایی به تزئینِ زوال را پیش می‌کشد. نویسنده سپس به کارکرد دوگانهٔ موسیقی در نظام‌های تمامیت‌خواه می‌پردازد: از یک سو ابزار تبلیغات، بسیج عاطفی، سانسور و تربیت ایدئولوژیک، و از سوی دیگر پناهگاه مقاومت و حفظ کرامت انسانی. او این دوگانگی را با نمونه‌هایی تاریخی می‌کاود؛ از ارکسترهای اردوگاه‌های نازی و سرنوشت آهنگسازانی چون ویکتور اولمان و آلما روزه تا دیمیتری شوستاکوویچ و سمفونی «بابی‌یار»، ریشارد اشتراوس و «دگردیسی‌ها»، ایستادگیِ بلا بارتوک، و کانتاتای «یک بازمانده از ورشو»ی آرنولد شوئنبرگ. جستار در پایان، گونه‌گونیِ مواضع هنرمندان در دوران سرکوب را چون آینه‌ای از وضعیت اخلاقی یک دوران می‌خواند.",
  "beyzaie-myth-symbolic-action": "این یادمان، تئاتر بهرام بیضایی را در برابر سلطهٔ رئالیسمِ توضیح‌محور و نگاه روان‌شناختی می‌نشاند؛ تئاتری که به‌جای افشاگری و وعدهٔ رهایی، با اسطوره و کنش نمادین نظمِ خوگرفته به فهم‌پذیری و تسکین را برهم می‌زند. به باور نویسنده، اسطوره در آثار بیضایی نه بازگشت به گذشته و بازسازی روایت‌های ازدست‌رفته، بلکه راهبردی برای برهم‌زدن قطعیت‌ها و بازگرداندنِ امکانِ تجربهٔ تراژیک است؛ صحنه به میدانِ کشاکشِ روایت‌ها بدل می‌شود و حقیقت، به‌جای آشکار شدن، جابه‌جا می‌شود. نویسنده با تکیه بر «مرگ یزدگرد» و ساختار تودرتوی «هزارافسان»، نشان می‌دهد که کنش نمادین در این تئاتر بر غیاب و ناتمام‌ماندن استوار است و تماشاگر را در وضعیت پرسش‌گری و مواجهه با تناقض‌های حل‌ناشدنی نگه می‌دارد. اهمیت بیضایی، به گفتهٔ او، نه در پاسخ‌هایی که می‌دهد بلکه در پافشاری بر پرسشی است که بسته نمی‌شود.",
  "note-for-gosan": "این یادداشت به مناسبت زایش گاهنامهٔ گوسان نوشته شده و نویسنده در آن، دعوتِ احسان شواربی و گروهی از ایران‌دوستانِ مقیم اروپا به همکاری با نشریه را دست‌مایهٔ یادآوریِ «روزنامهٔ کاوه» می‌کند؛ نشریه‌ای که سیدحسن تقی‌زاده در گیرودار جنگ جهانی اول در برلن بنیاد نهاد. او دو دورهٔ متمایز کاوه، توجه وسواس‌گونهٔ آن به زبان و ادبیات فارسی و تأثیرش بر نثر معیارِ روزنامه‌نگاری، و نیز نقشِ کمتر دیده‌شدهٔ «چاپخانهٔ کاویانی» برلن را یادآور می‌شود. نویسنده از این «تناسخ‌های تاریخی» می‌پرسد که چرا مژدهٔ پیدایش گوسان بی‌درنگ او را به یاد قصه‌ای از صد و اندی سال پیش انداخت، و با اشاره به شاعرانِ روایتگرِ چنگ‌نواز که «گوسان» از شمار آنان بوده است، امید می‌بندد که این نشریهٔ نوزاده نیز در تداوم تاریخی این ملت ردی نیکو بر جای گذارد.",
  "oil-to-narrative": "این جستار از پروندهٔ اقتصاد خلاق استدلال می‌کند که فرهنگ و هنر در جهان امروز به عرصه‌ای برای رقابتِ قدرت و «قدرت نرم» بدل شده‌اند و دولت‌های خاورمیانه، از راه صندوق‌های ثروت ملی، آن را در خدمت سه هدف به کار گرفته‌اند: توانمندسازی هنر داخلی، برندسازی ملی، و رقابت منطقه‌ای و جهانی. نویسنده با نمونه‌هایی چون «چشم‌انداز سعودی ۲۰۳۰»، جشنواره‌های ریاض و موزهٔ لوور ابوظبی، این سرمایه‌گذاری‌ها را نه هزینه‌ای تزئینی بلکه راهبردی آگاهانه می‌خواند، و در برابرِ آن تجربهٔ ناتمام ایران را می‌نشاند: از سرمایه‌گذاری‌های فرامرزیِ دوران پهلوی تا فروکاسته‌شدنِ صندوق توسعهٔ ملیِ جمهوری اسلامی به ابزار جبران کسری بودجه. به باور او، ایجاد صندوق سرمایه‌گذاری ملیِ مستقل، شفاف و آینده‌نگر و تخصیص بخشی از آن به فرهنگ و هنر تنها از دولتی ملی برمی‌آید و برای بازسازی جایگاه منطقه‌ای و جهانی ایران نه انتخابی لوکس، بلکه ضرورتی است.",
};

Object.assign(window, {
  Button, Tag, SectionHead, ArticleCard, Verse, PullQuote, GoldDots, DraftFrame, FormField,
  DraftLineH, DraftLineV, Reveal, useParallax, GOSAN_POSTS, GOSAN_SUMMARIES, ClockIcon,
  gosanFormSubmit, gosanMailtoFallback,
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
