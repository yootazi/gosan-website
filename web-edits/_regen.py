# -*- coding: utf-8 -*-
"""Rebuilds README.md (the live dashboard) and the per-edit word-diff .md files
from the .json records in pending/approved/applied/rejected.

Runs two ways, producing identical output:
  - locally, by the edit-desk server on this machine
  - on GitHub, by .github/workflows/webedits-regen.yml after a remote editor
    saves through the GitHub API
"""
import json, os, re, difflib

ROOT = os.path.dirname(os.path.abspath(__file__))
STATES = [('pending', 'در انتظار بازبینی'), ('approved', 'تأییدشده'),
          ('applied', 'اعمال‌شده روی سایت'), ('rejected', 'ردشده')]
CTX = 8

def text_of_html(h):
    h = re.sub(r'<[^>]+>', ' ', str(h))
    h = h.replace('&zwnj;', '‌').replace('&nbsp;', ' ')
    h = h.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
    return re.sub(r'\s+', ' ', h).strip()

def word_diff(a, b):
    a, b = a.split(' '), b.split(' ')
    out = []
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(a=a, b=b, autojunk=False).get_opcodes():
        if tag in ('replace', 'delete'):
            out += [('-', w) for w in a[i1:i2]]
        if tag in ('replace', 'insert'):
            out += [('+', w) for w in b[j1:j2]]
        if tag == 'equal':
            out += [(' ', w) for w in a[i1:i2]]
    return out

FA_DIGITS = str.maketrans('0123456789', '۰۱۲۳۴۵۶۷۸۹')

def _jalali(gy, gm, gd):
    g_days = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
    gy2 = gy - 1600; gm2 = gm - 1; gd2 = gd - 1
    g_day_no = 365 * gy2 + (gy2 + 3) // 4 - (gy2 + 99) // 100 + (gy2 + 399) // 400
    g_day_no += g_days[gm2] + gd2
    if gm2 > 1 and ((gy % 4 == 0 and gy % 100 != 0) or gy % 400 == 0):
        g_day_no += 1
    j_day_no = g_day_no - 79
    j_np = j_day_no // 12053; j_day_no %= 12053
    jy = 979 + 33 * j_np + 4 * (j_day_no // 1461); j_day_no %= 1461
    if j_day_no >= 366:
        jy += (j_day_no - 1) // 365; j_day_no = (j_day_no - 1) % 365
    for i, ml in enumerate([31]*6 + [30]*5 + [29]):
        if j_day_no < ml:
            return jy, i + 1, j_day_no + 1
        j_day_no -= ml
    return jy, 12, 29

def fa_date(iso):
    # Gregorian international date in Berlin/Vienna time (input is UTC ISO)
    m = re.match(r'(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})', str(iso))
    if not m:
        return str(iso or '')
    from datetime import datetime, timezone
    from zoneinfo import ZoneInfo
    dt = datetime(int(m.group(1)), int(m.group(2)), int(m.group(3)),
                  int(m.group(4)), int(m.group(5)), tzinfo=timezone.utc)
    dt = dt.astimezone(ZoneInfo('Europe/Berlin'))
    return dt.strftime('%d %b %Y, %H:%M').lstrip('0')

def esc(w):
    return w.replace('&', '&amp;').replace('<', '&lt;')

def hunks_html(parts):
    keep = set()
    for idx, p in enumerate(parts):
        if p[0] != ' ':
            for k in range(max(0, idx - CTX), min(len(parts), idx + CTX + 1)):
                keep.add(k)
    hunks, cur, last = [], [], -2
    for idx, p in enumerate(parts):
        if idx not in keep:
            continue
        if idx != last + 1 and cur:
            hunks.append(cur); cur = []
        cur.append(p); last = idx
    if cur:
        hunks.append(cur)
    return '\n>\n> …\n>\n'.join(
        '> ' + ' '.join(esc(w) if s == ' ' else
                        ('<del>' + esc(w) + '</del>' if s == '-' else '<ins>' + esc(w) + '</ins>')
                        for s, w in h) for h in hunks)

def diff_md(rec):
    parts = word_diff(text_of_html(rec.get('original_html', '')),
                      text_of_html(rec.get('html', '')))
    changed = sum(1 for p in parts if p[0] != ' ')
    sum_block = ''
    if rec.get('original_summary_html') or rec.get('summary_html'):
        sparts = word_diff(text_of_html(rec.get('original_summary_html', '')),
                           text_of_html(rec.get('summary_html', '')))
        schanged = sum(1 for p in sparts if p[0] != ' ')
        if schanged:
            changed += schanged
            sum_block = ('**چکیده**\n\n' + hunks_html(sparts) + '\n\n**متن**\n\n')
    body = hunks_html(parts)
    if sum_block:
        body = sum_block + (body or '_تغییری در متن یافت نشد_')
    if not changed:
        norm = lambda h: re.sub(r'\s*(?:contenteditable|spellcheck)="[^"]*"', '',
                                re.sub(r'\s+', ' ', str(h)))
        if (norm(rec.get('original_html', '')) != norm(rec.get('html', '')) or
            norm(rec.get('original_summary_html', '')) != norm(rec.get('summary_html', ''))):
            body = ('_واژه‌ای تغییر نکرده، اما قالب‌بندی (پررنگ/ایتالیک/نیم‌فاصله) '
                    'تغییر کرده است؛ برای دیدن جزئیات، پروندهٔ JSON را ببینید._\n\n') + (body or '')
    md = ('# ویرایش: ' + rec['slug'] + '\n\n| | |\n|---|---|\n'
          '| ویراستار | ' + rec.get('editor', '') + ' |\n'
          '| زمان ذخیره | ' + fa_date(rec.get('saved_at')) + ' |\n'
          '| واژه‌های تغییرکرده | ' + str(changed) + ' |\n\n'
          '<div dir="rtl">\n\n' + (body or '_تغییری در متن یافت نشد_') + '\n\n</div>\n')
    return changed, md

def main():
    rows = []
    for st, label in STATES:
        d = os.path.join(ROOT, st)
        if not os.path.isdir(d):
            continue
        jsons = {f[:-5] for f in os.listdir(d) if f.endswith('.json')}
        for f in sorted(os.listdir(d)):
            if f.endswith('.md') and f[:-3] not in jsons:
                os.remove(os.path.join(d, f))
            if not f.endswith('.json'):
                continue
            try:
                rec = json.load(open(os.path.join(d, f), encoding='utf-8'))
            except Exception:
                continue
            changed, md = diff_md(rec)
            with open(os.path.join(d, rec['slug'] + '.md'), 'w', encoding='utf-8') as fh:
                fh.write(md)
            if st == 'pending':
                label = 'در انتظار تأیید سردبیر' if rec.get('finished') else 'پیش‌نویس؛ ویراستار در حال کار'
            rows.append({'label': label, 'slug': rec['slug'],
                         'editor': rec.get('editor', ''), 'at': rec.get('saved_at', ''),
                         'changed': changed, 'md': st + '/' + rec['slug'] + '.md'})
    rows.sort(key=lambda r: r['at'] or '', reverse=True)
    md = ('# میز ویرایش وب — فهرست زندهٔ تغییرها\n\n'
          'این فهرست با هر ذخیره به‌روز می‌شود. ستون «تفاوت‌ها» متن خوانا با افزوده‌ها و حذف‌ها است.\n\n'
          '| جستار | ویراستار | زمان | واژه‌های تغییرکرده | وضعیت | تفاوت‌ها |\n'
          '|---|---|---|---|---|---|\n')
    PRS = 'https://github.com/yootazi/gosan-website/pulls'
    md += '\n'.join('| `%s` | %s | %s | %s | %s | [دیدن](%s) |' %
                    (r['slug'], r['editor'], fa_date(r['at']),
                     str(r['changed']).translate(FA_DIGITS),
                     ('[%s ← PR](%s)' % (r['label'], PRS)) if 'تأیید سردبیر' in r['label'] else r['label'],
                     r['md'])
                    for r in rows)
    md += ('\n\n---\n\n'
           'گردش کار: ویراستار در «میز ویرایش» ذخیره می‌کند ← برای هر ذخیره یک '
           '[Pull Request](%s) ساخته می‌شود ← سردبیر همان‌جا تفاوت‌ها را می‌بیند و تصمیم می‌گیرد: '
           '**Merge = تأیید ✓** و **Close = رد ✗** ← تأییدشده‌ها با گفتگو با دستیار '
           'روی سایت اصلی اعمال و به `applied` منتقل می‌شوند. نسخهٔ اصلیِ نویسنده هرگز در این چرخه تغییر نمی‌کند.\n' % PRS)
    with open(os.path.join(ROOT, 'README.md'), 'w', encoding='utf-8') as fh:
        fh.write(md)
    print('regen: %d records' % len(rows))

if __name__ == '__main__':
    main()
