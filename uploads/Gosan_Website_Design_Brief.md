# Gōsān Institute — Website Section Design Brief
### A dedicated "Institute / Research" section in the spirit of *The New Criterion*

*Paste this brief directly into Claude (or any design tool) to generate the page. It specifies the aesthetic, structure, components, and the actual copy. Everything is bilingual-ready (English LTR / Persian RTL).*

---

## 1. Design intent

Build a section that reads like a **serious editorial journal of arts and intellectual life** — the visual register of *The New Criterion*: restrained, literary, confident, and text-forward. This is **not** a startup landing page. No gradients, no neon, no rounded "SaaS" cards, no stock photography of people shaking hands. The authority comes from **typography, whitespace, hairline rules, and a single disciplined accent colour.** The page should feel printed.

Think: a monthly review's masthead, a table of contents, long-form essays set in a classic serif, a thin crimson rule under the nameplate, and small-caps section labels.

---

## 2. Art direction & visual system

**Mood:** ivory paper, black ink, oxblood accent. Quiet, scholarly, timeless.

### Colour palette
| Token | Hex | Use |
|---|---|---|
| Paper | `#FBF9F3` | page background (warm ivory, never pure white) |
| Ink | `#1C1A17` | body text, headlines |
| Crimson (accent) | `#8A1C24` | nameplate rule, links, section labels, drop caps, kicker |
| Ochre | `#9A7B3F` | secondary accent, sparingly (dividers, pull-quote marks) |
| Rule | `#CDC6B6` | hairline dividers between articles |
| Soft | `#6A6457` | metadata, captions, bylines, dates |

Keep it to **one accent (crimson)**. Ochre is a rare seasoning. No other colours.

### Typography
- **Display / headlines / nameplate:** a high-contrast Didone or transitional serif — **Playfair Display**, *Cormorant*, or *Canela*. Tight leading, generous size.
- **Body / essays:** a warm humanist book serif — **EB Garamond**, *Spectral*, or *Source Serif*. ~19px, line-height ~1.6, justified with hyphenation for the editorial look.
- **Labels / kickers / section eyebrows:** the body serif in **UPPERCASE, letter-spaced (~2–3px), 12–13px, crimson.** (e.g. `ESSAYS` · `POLICY BRIEFS` · `THE REVIEW`).
- **Persian:** **Vazirmatn** throughout (RTL), with the Latin nameplate kept LTR. Persian body line-height ~1.85.
- Use **real small caps** and **oldstyle figures** where available.

### Texture & ornament
- A **1px–1.5px crimson rule** directly under the nameplate, with a thinner grey hairline beneath it (the classic double-rule masthead).
- **Hairline dividers** (`#CDC6B6`, 0.5px) separating each article in a list — no boxes, no shadows.
- A small **❖ / ✦ fleuron** as a section break ornament, centred, crimson.
- **Drop caps** (crimson, Playfair) opening feature essays.
- Optional faint **paper grain** texture overlay at 2–3% opacity. No drop shadows anywhere.

### Layout grid
- Max content width ~**1180px**, centred, with wide margins.
- A **3-column** broadsheet feel for indexes/lists; **single 640px measure** for reading essays.
- Lots of **vertical whitespace**. Let headlines breathe.

---

## 3. Page structure (top to bottom)

### A. Masthead / nameplate
- Centered wordmark **"GŌSĀN"** in the display serif, large, letter-spaced; beneath it in italic: *Culture & Arts Institute* (and Persian **اندیشکدهٔ فرهنگ و هنر گوسان**).
- Double rule under the nameplate.
- A thin top strip above the nameplate with: the date/issue line (left, e.g. *"Founding Edition · Tirgān 2585"*), and a quiet language toggle **EN / فا** (right).
- A minimal horizontal **nav** in small-caps, letter-spaced, no buttons: `THE INSTITUTE · RESEARCH · THE REVIEW · DATA ATLAS · ADVISORS · SUPPORT`.

### B. Lead / hero essay block (the "above the fold")
- No image hero. Instead a **leading statement** treated like a journal's opening essay:
  - Crimson kicker: `THE INSTITUTE`
  - Large serif headline (see copy below).
  - A two-sentence standfirst in italic.
  - A "Read the Prospectus →" text link (crimson, underlined on hover only).
- To the right, a slim **contents rail** ("In This Section") listing the page's anchors with page-number-style dot leaders.

### C. Mission — "Three Pillars"
- Section label `MISSION`, headline *"Culture as Critical Infrastructure."*
- Three columns separated by vertical hairline rules (like newspaper columns), each a pillar (A / B / C) with a small-caps tag, a serif subhead, and a short paragraph.

### D. The Review (journal teaser)
- Section label `THE REVIEW — GŌSĀN`, presented as a **table of contents** of forthcoming essays/notes: each row = title (serif), author + discipline (soft italic byline), and a one-line dek, divided by hairlines. Page-number dot leaders on the right.

### E. The Cultural ROI Atlas (flagship)
- Section label `THE DATA ATLAS`. A restrained, editorial treatment of the data project: a headline, a short paragraph, and a **muted, monochrome data motif** (thin-line chart or a faint map of districts in crimson/ink line art — *line art only, no glossy dashboards*). A "Preview the Index →" link.

### F. Advisors & Partners
- Section label `BOARD OF ADVISORS`. Names set in serif with affiliations in soft small caps, in a simple two/three-column list. Placeholder rows. A quiet line: *"By invitation."*

### G. Support / Founding Circle (the ask)
- Section label `SUPPORT`. A short, dignified paragraph (no aggressive CTA). One text link: "Join the Founding Circle →". Optionally a single framed pull-quote.

### H. Footer / colophon
- Set like a **journal colophon**: institute name, *Berlin · Washington, D.C.*, ISSN placeholder, a one-line mission, copyright, and the EN/فا toggle. Hairline rule above. Small, soft, letter-spaced.

---

## 4. Interaction & motion
- **Almost none.** Links underline on hover (crimson); section anchors scroll smoothly. No parallax, no card flips, no autoplay.
- A subtle fade-in on scroll for each article block is acceptable — slow and quiet (≤300ms), or omit entirely.
- Fully **responsive**: the 3-column indexes collapse to a single column on mobile; the contents rail moves below the lead essay; nameplate scales down but keeps the double rule.
- **RTL parity:** when Persian is selected, the entire grid mirrors (`dir="rtl"`), column order reverses, dot leaders and labels flip; the Latin nameplate stays LTR.

---

## 5. Accessibility & build notes
- Body text ≥ 18px; contrast ≥ AA (ink on ivory passes comfortably). Crimson on ivory passes for large text and links.
- Semantic HTML: `<header>` masthead, `<nav>`, `<article>` per essay row, `<section>` per block, real `<h1>–<h3>`.
- Web fonts via self-hosted files or Google Fonts (Playfair Display, EB Garamond, Vazirmatn). Provide `font-display: swap`.
- Print stylesheet that preserves the editorial look (it should print like a page from the journal).

---

## 6. Ready-to-use copy

**Masthead tagline:** *Designing the systems, economics, and infrastructure for a post-transition Iranian creative economy.*

**Lead essay**
- Kicker: `THE INSTITUTE`
- Headline: **Culture as Critical Infrastructure**
- Standfirst: *The Gōsān Culture & Arts Institute is a data-driven policy think tank designing the institutional, economic, and digital blueprints for Iran's cultural sector in its transition toward an open future. We treat culture not as ornament, but as a macroeconomic driver, an instrument of soft power, and a pillar of national stability.*

**Mission — Three Pillars**
- *Pillar A — Institutional De-Radicalization.* Plug-and-play charters that convert state propaganda apparatuses into independent, public-interest platforms.
- *Pillar B — The Creative Macroeconomy.* Tax codes, copyright frameworks, and co-production compacts that bring the underground and diaspora creative classes into a formal market.
- *Pillar C — Digital Cultural Infrastructure.* Policy for a post-censorship internet: algorithmic copyright equity, digital-asset protection, and heritage cataloguing.

**The Data Atlas**
- Headline: **The Cultural ROI Atlas**
- Dek: *We map every public dollar spent on culture against real-time economic indicators — revealing which districts are cultural deserts and which are economic engines.*

**Support**
- *Gōsān is built by its founding supporters. The Founding Circle anchors our first chapter — the launch of the* Gōsān *review, our data pipelines, and the first model legislation for a free Iran's cultural sector.*

### Persian equivalents (RTL)
- نام‌واره / شعار: *طراحی سامانه‌ها، اقتصاد و زیرساخت‌های اقتصادِ خلاقِ ایران در دوران گذار.*
- تیتر اصلی: **فرهنگ به‌مثابهٔ زیرساختِ حیاتی**
- ستون الف — رادیکالیسم‌زداییِ نهادی · ستون ب — اقتصادِ کلانِ خلاق · ستون پ — زیرساختِ فرهنگیِ دیجیتال
- اطلسِ بازدهِ فرهنگی · شاخصِ رفاهِ فرهنگی · هیئتِ مشاورانِ علمی · حلقهٔ بنیان‌گذاران

---

## 7. One-paragraph prompt (if you want a single line to paste)

> *Design a dedicated "Institute" web section for the Gōsān Culture & Arts Institute in the editorial style of The New Criterion: a warm ivory background (#FBF9F3), black ink (#1C1A17), and a single oxblood-crimson accent (#8A1C24). Use a high-contrast serif (Playfair Display) for a centered "GŌSĀN" nameplate with a double rule beneath it, and EB Garamond for justified, hyphenated body text. Build it as a printed journal: small-caps letter-spaced section labels, hairline dividers between article rows, a table-of-contents block with dot leaders, a three-column "Three Pillars" mission set like newspaper columns, a restrained line-art data motif for the "Cultural ROI Atlas," a by-invitation advisors list, and a colophon-style footer. No shadows, no gradients, no stock photos, minimal motion. Provide an EN/Persian (RTL, Vazirmatn) toggle that mirrors the layout.*
