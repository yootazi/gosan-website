/* Gosan Weblog — شیوه‌نامه (style guide / submissions) — two-column with sticky index */

const SV_SECTIONS = [
  { id: 'sv-scope', num: '۰۱', en: 'SCOPE', title: 'رویکرد و اهداف' },
  { id: 'sv-structure', num: '۰۲', en: 'STRUCTURE', title: 'ساختار محتوا' },
  { id: 'sv-submission', num: '۰۳', en: 'SUBMISSION', title: 'روند انتشار مقاله' },
  { id: 'sv-language', num: '۰۴', en: 'LANGUAGE', title: 'زبان و شیوهٔ نگارش' },
  { id: 'sv-citations', num: '۰۵', en: 'CITATIONS', title: 'ارجاعات و منابع' },
  { id: 'sv-copyright', num: '۰۶', en: 'COPYRIGHT', title: 'حق نشر و دسترسی آزاد' },
];

function ShivenamehList({ items, cols = false }) {
  return (
    <ul className={`sv-list${cols ? ' sv-list--cols' : ''}`}>
      {items.map((it, i) => <li key={i}>{it}</li>)}
    </ul>
  );
}

function ShivenamehSection({ id, num, en, title, children }) {
  return (
    <Reveal>
      <section id={id} className="sv-section">
        <div className="sv-section-head">
          <span className="sv-num" aria-hidden="true">{num}</span>
          <div className="sv-section-titles">
            <h2 className="gsn-display sv-title">{title}</h2>
          </div>
        </div>
        <div className="sv-section-body">{children}</div>
      </section>
    </Reveal>
  );
}

function ShivenamehTOC({ active }) {
  const go = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: 'smooth' });
  };
  return (
    <aside className="sv-toc">
      <div className="sv-toc-inner">
        <span className="sv-toc-head">فهرست شیوه‌نامه</span>
        <nav className="sv-toc-nav">
          {SV_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => go(e, s.id)}
              className={`sv-toc-link${active === s.id ? ' is-active' : ''}`}
            >
              <span className="sv-toc-num">{s.num}</span>
              <span className="sv-toc-label">{s.title}</span>
            </a>
          ))}
        </nav>
        <a className="sv-toc-cta" href="mailto:info@gosan.org">ارسال نوشتار ←</a>
      </div>
    </aside>
  );
}

function ShivenamehPage() {
  const [active, setActive] = React.useState(SV_SECTIONS[0].id);
  React.useEffect(() => {
    const ids = SV_SECTIONS.map((s) => s.id);
    const onScroll = () => {
      const line = window.innerHeight * 0.32;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - line <= 0) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <main data-screen-label="شیوه‌نامه">
      <PageTitle
        technical="STYLE GUIDE // SUBMISSIONS — ISSUE 01"
        title="شیوه‌نامهٔ گوسان"
        lede="راهنمای نگارش، ارجاع‌دهی و فرستادن نوشتار برای گاهنامهٔ گوسان"
      />
      <MotifDivider style={{ marginTop: '-0.6rem', marginBottom: '2.4rem' }} />

      <div className="sv-layout">
        <div className="sv-content">
          <ShivenamehSection id="sv-scope" num="۰۱" en="SCOPE" title="رویکرد و اهداف">
            <p className="sv-p sv-lead">
              گاهنامهٔ گوسان با هدف آشنایی، پژوهش و روشنگری در زمینهٔ فرهنگ، هنر و تاریخ ایران و گونه‌گونی فرهنگ‌های این
              سرزمین منتشر می‌شود.
            </p>
            <p className="sv-p">
              گوسان می‌کوشد از یک سو میراث ارزشمند گذشته را بشناسد و بشناساند، و از سوی دیگر بازتابی
              برای پرسش‌ها و دغدغه‌های فرهنگی و هنری امروز و فردای ایران باشد. این شیوه‌نامه راهنمای علاقه‌مندان،
              پژوهشگران، هنرمندان و دوستداران فرهنگ و تاریخ ایران برای همراهی با گوسان است.
            </p>
          </ShivenamehSection>

          <ShivenamehSection id="sv-structure" num="۰۲" en="STRUCTURE" title="ساختار محتوا">
            <p className="sv-p">در گوسان مطالبی برای عموم دوستداران موضوعات فرهنگی، هنری و تاریخی منتشر می‌شود، از جمله:</p>
            <ShivenamehList cols items={[
              'جستارهای پژوهشی و تحلیلی',
              'یادداشت‌های کوتاه',
              'گفت‌وگو با اندیشمندان و هنرمندان',
              'پرونده‌های ویژه و رویکردهای میان‌رشته‌ای',
              'یادبود چهره‌های برجستهٔ فرهنگی و علمی',
              'نقد و معرفی کتاب',
              'گزارش رویدادها و کارگاه‌های فرهنگی',
            ]} />
          </ShivenamehSection>

          <ShivenamehSection id="sv-submission" num="۰۳" en="SUBMISSION" title="روند انتشار مقاله">
            <ShivenamehList items={[
              <React.Fragment>مقاله به صورت فایل <span className="sv-mono">docx.</span> به نشانی <a className="sv-mail" href="mailto:info@gosan.org">info@gosan.org</a> فرستاده شود.</React.Fragment>,
              'متن مقاله با یک قلم (فونت) سادهٔ متعارف و اندازهٔ ۱۲ تنظیم شود.',
              'پذیرش مقاله برای انتشار در گوسان، پس از بررسی و ارزیابی محتوا و به تصمیم نهایی هیئت تحریریه انجام می‌شود.',
              'گوسان از پذیرش مقاله‌ای که پیش‌تر در جای دیگری منتشر شده باشد، پرهیز می‌کند.',
              'نسخهٔ ویراسته و تأییدشدهٔ مقاله، پیش از انتشار برای نویسنده فرستاده می‌شود.',
              'مسئولیت محتوای مقاله بر عهدهٔ نویسنده است.',
            ]} />
            <div className="sv-note">
              <span className="sv-note-tag">سیاست عدم تحمل سرقت ادبی</span>
              <p>
                رعایت حقوق نویسندگان و هنرمندان برای گوسان الزامی است. سرقت ادبی، نقل مطلب بدون ذکر منبع، و استفاده از
                تصویر بدون ذکر منبع و رعایت حقوق پدیدآورنده، به هیچ وجه پذیرفته نیست.
              </p>
            </div>
          </ShivenamehSection>

          <ShivenamehSection id="sv-language" num="۰۴" en="LANGUAGE" title="زبان و شیوهٔ نگارش">
            <p className="sv-p">
              نظام نوشتاری گوسان بر پایهٔ <em>دستور خط فارسی</em> و <em>فرهنگ املای خط فارسیِ</em> فرهنگستان زبان و ادب
              فارسی است. رعایت نشانه‌های سجاوندی، اصول دستوری و پرهیز از نیم‌فاصلهٔ نابه‌جا ضروری است.
            </p>
            <ShivenamehList items={[
              'اصل بر پرهیز از کاربرد واژه‌های بیگانه است؛ در موارد لازم، معادل فارسی یا توضیح مناسب در کمانک (پرانتز) آورده می‌شود.',
              'برای نام‌های خاص کهن، تلفظ رایج در زبان فارسی مبناست؛ مثلاً «ارسطو» به جای «اریستوتلس».',
              'برای نام‌های خاص بیگانهٔ ناآشنا، صورت اصلی نام به خط لاتین در کمانک آورده می‌شود.',
              'نقل‌قول‌های کوتاه درون «گیومه» می‌آیند؛ نقل‌قول‌های بلند در یک بند مستقل و با تورفتگی از هر دو سو.',
            ]} />
          </ShivenamehSection>

          <ShivenamehSection id="sv-citations" num="۰۵" en="CITATIONS" title="ارجاعات و منابع">
            <ShivenamehList items={[
              'همهٔ ارجاعات، حواشی و نکات تکمیلی در پی‌نوشت آورده می‌شوند.',
              'شمارهٔ پی‌نوشت‌ها در هر جستار از ۱ آغاز می‌شود و تا پایان همان جستار ادامه می‌یابد.',
              'در مشخصات منابع، نام کتاب‌ها و مجله‌ها به صورت ایتالیک و نام مقاله‌ها در «گیومه» نوشته می‌شود.',
            ]} />
            <span className="sv-subhead">نمونهٔ منابع</span>
            <ol className="sv-cite">
              <li>آموزگار و تفضّلی ۱۳۷۰: ژاله آموزگار و احمد تفضّلی، <em>اسطورهٔ زندگی زردشت</em>، تهران: کتابسرای بابل، ۱۳۷۰.</li>
              <li>فارابی: ابونصر فارابی، <em>کتاب موسیقی کبیر</em>، ترجمهٔ آذرتاش آذرنوش، تهران: پژوهشگاه علوم انسانی و مطالعات فرهنگی، ۱۳۷۶.</li>
              <li>خالقی ۱۳۴۱: روح‌الله خالقی، «همنوازی در موسیقی ایران»، <em>مجلهٔ موسیقی</em>، شمارهٔ ۷۳–۷۴، بهمن و اسفند ۱۳۴۱، ص ۱۰–۱۸.</li>
              <li>یارشاطر ۱۳۷۰: احسان یارشاطر، «پیوستگی تاریخ ایران»، <em>ایران‌شناسی</em>، سال هفتم، شمارهٔ ۹، بهار ۱۳۷۰، ص ۱۴–۲۰.</li>
              <li dir="ltr" className="sv-cite-ltr">Schmitt 2009: Rüdiger Schmitt, <em>Die altpersischen Inschriften der Achaimeniden</em>, Wiesbaden: Reichert Verlag, 2009.</li>
              <li dir="ltr" className="sv-cite-ltr">Boyce 1957: Mary Boyce, “The Parthian Gōsān and Iranian Minstrel Tradition”, <em>JRAS</em>, Vol. 89, No. 1/2, 1957, pp. 10–45.</li>
            </ol>
          </ShivenamehSection>

          <ShivenamehSection id="sv-copyright" num="۰۶" en="COPYRIGHT &amp; OPEN ACCESS" title="حق نشر و دسترسی آزاد">
            <ShivenamehList items={[
              'نوشتارهای گوسان با ذکر دقیق منبع و نام پدیدآورنده، برای نقل و ارجاع پژوهشی آزاد است.',
              'بازنشر کامل یک نوشتار تنها با اجازهٔ کتبی گوسان و نویسنده ممکن است.',
              'استفاده از تصاویر تنها با ذکر منبع و رعایت حقوق پدیدآورنده مجاز است.',
              'حق مالکیت معنوی هر اثر نزد پدیدآورندهٔ آن باقی می‌ماند.',
            ]} />

            <div className="sv-cta">
              <span className="gsn-technical" style={{ color: 'var(--gold-deep)' }}>SUBMIT // info@gosan.org</span>
              <h3 className="gsn-display" style={{ fontSize: '1.6rem', margin: '0.7rem 0 0.4rem' }}>نوشتارتان را برای ما بفرستید</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '0 0 1.6rem' }}>
                فایل <span className="sv-mono">docx.</span> خود را به نشانی زیر ارسال کنید؛ هیئت تحریریه آن را بررسی می‌کند.
              </p>
              <Button variant="gold" href="mailto:info@gosan.org">ارسال نوشتار</Button>
            </div>
          </ShivenamehSection>
        </div>

        <ShivenamehTOC active={active} />
      </div>
    </main>
  );
}

Object.assign(window, { ShivenamehPage });
