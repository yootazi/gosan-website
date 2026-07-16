# -*- coding: utf-8 -*-
"""
Generates lightweight per-article share pages under gosan-website/share/.

Why: the site is a hash-routed single-page app, so social-media scrapers
(X, Facebook, Telegram…) that don't run JavaScript can't read a per-article
Open Graph cover from #/article/<slug>. Each generated stub carries the correct
og:title / og:description / og:image for one article, then redirects real
visitors straight to the SPA route. The article Share buttons point at these
stubs so the cover image shows on the platform.

Keep in sync with GOSAN_POSTS (gosan-components.jsx) and GOSAN_COVERS
(page-home.jsx). Re-run after adding/renaming an article:
    python3 tools/build-share-pages.py
"""
import os, html

BASE = 'https://yootazi.github.io/gosan-website/'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'share')

DEFAULT_COVER = 'assets/issue-cover.jpg'

# slug, title, excerpt, cover (relative to site root)
ARTICLES = [
    ('manichaean-music-terms',
     'فهرستی از اصطلاحات موسیقایی در متون مانوی به پارسی و پهلوانی',
     'فهرستی از نام سازها، اصطلاحات سرود و نوا و افعال خواندن و نواختن در متون مانوی به پارسی و پهلوانی، همراه با شواهدی از متن‌ها.',
     DEFAULT_COVER),
    ('herzfeld-german-archives',
     'ارنست هرتسفلد در آیینۀ اسناد وزارت خارجۀ آلمان — بخش نخست',
     'درآمدی بر سه پوشهٔ اسناد «پروفسور هرتسفلد» در بایگانی سیاسی وزارت خارجهٔ آلمان و نخستین سند از این مجموعه.',
     'uploads/cover-herzfeld.jpg'),
    ('voice-of-the-council',
     'صدایی که از شورا می‌گذرد',
     'جستاری دربارهٔ جایگاه شورای هنری در ارکسترها؛ از الگوهای جهانی تا ساختار شوراهای هنری در ارکسترهای ایران.',
     DEFAULT_COVER),
    ('note-for-gosan',
     'یادداشتی برای گوسان',
     'یادداشتی به مناسبت زایش گوسان؛ از «روزنامهٔ کاوه» برلین تا رسالت روایتگری گوسانِ امروز.',
     DEFAULT_COVER),
    ('crossroads-ahead',
     'دوراهی پیشِ رو',
     'درنگی در مهاجرت گستردهٔ موسیقی‌دانان ایرانی و پیامدهای آن برای تداوم نهادی آهنگسازی، موسیقی‌شناسی و اجرا.',
     DEFAULT_COVER),
    ('oil-to-narrative',
     'از نفت تا روایت: اهمیت ایجاد صندوق سرمایه‌گذاری ملی برای فرهنگ و هنر',
     'چرا ایجاد صندوق سرمایه‌گذاری ملی برای فرهنگ و هنر، نه یک انتخاب لوکس، که ضرورتی برای بازسازی جایگاه ایران است.',
     DEFAULT_COVER),
    ('interview-farnaz-modarresifar',
     'سنتور در کانون آوانگاردیسم: گفتگو با فرناز مدرسی‌فر',
     'گفت‌وگو با فرناز مدرسی‌فر، آهنگساز و نوازندهٔ سنتور، نخستین هنرمند ایرانی مقیم ویلا مدیچی؛ سنتور در کانون آوانگاردیسم.',
     'uploads/cover-farnaz.jpg'),
    ('music-totalitarian-regimes',
     'نقش موسیقی در نظام‌های تمامیت‌خواه',
     'از سرودهای رایش سوم تا سمفونی بابی‌یار؛ جستاری در دو چهرهٔ موسیقی زیر سایهٔ قدرت — نوای فرمان و زمزمهٔ پنهان آزادی.',
     DEFAULT_COVER),
    ('beyzaie-myth-symbolic-action',
     'حقیقتی که نمی‌رهاند؛ اسطوره‌سازی و کُنشِ نمادین در تئاتر بهرام بیضایی',
     'اسطوره در تئاتر بیضایی نه پناه‌بردن به گذشته، که راهبردی است برای برهم‌زدن قطعیت‌ها؛ درنگی بر کنش نمادین در «مرگ یزدگرد».',
     DEFAULT_COVER),
    ('between-two-defeats',
     'میانِ دو شکست: دولت، بازار و سیاست‌گذاری فرهنگی در ایران (۱)',
     'چرا فرهنگ را نه می‌توان به بازار سپرد و نه به دولت مداخله‌گر؟ نخستین یادداشت از مجموعه‌ای دربارهٔ سیاست‌گذاری فرهنگی.',
     DEFAULT_COVER),
    ('interview-armin-sanayei',
     'گفتگو با آرمین صنایعی',
     'گفت‌وگو با آرمین صنایعی، آهنگساز موسیقی معاصر؛ از باله‌ای بر پایهٔ پرومتئوس و سیمرغ تا هویت، گسست تاریخی و سیاست‌گذاری موسیقی در ایران.',
     DEFAULT_COVER),
]

TPL = """<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>{title} — گوسان</title>
<meta property="og:type" content="article">
<meta property="og:site_name" content="گوسان">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{excerpt}">
<meta property="og:image" content="{base}{cover}">
<meta property="og:url" content="{base}#/article/{slug}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{excerpt}">
<meta name="twitter:image" content="{base}{cover}">
<link rel="canonical" href="{base}#/article/{slug}">
<script>location.replace('../#/article/{slug}');</script>
<meta http-equiv="refresh" content="0; url=../#/article/{slug}">
</head>
<body style="font-family:Vazirmatn,Tahoma,sans-serif;background:#0c1311;color:#e8e8e8;text-align:center;padding:3rem 1.5rem">
<p>در حال هدایت به مقالهٔ «{title}»…</p>
<p><a href="../#/article/{slug}" style="color:#D9B35A">اگر به‌صورت خودکار منتقل نشدید، اینجا را بزنید</a></p>
</body>
</html>
"""

def esc(s):
    return html.escape(s, quote=True)

def main():
    os.makedirs(OUT, exist_ok=True)
    for slug, title, excerpt, cover in ARTICLES:
        page = TPL.format(title=esc(title), excerpt=esc(excerpt),
                          cover=cover, slug=slug, base=BASE)
        with open(os.path.join(OUT, slug + '.html'), 'w', encoding='utf-8') as f:
            f.write(page)
        print('share/%s.html  ->  %s' % (slug, cover))
    print('generated %d share pages in %s' % (len(ARTICLES), OUT))

if __name__ == '__main__':
    main()
