/* @ds-bundle: {"format":3,"namespace":"GosanMagazineDesignSystem_8ee353","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"ArticleCard","sourcePath":"components/editorial/ArticleCard.jsx"},{"name":"SectionHead","sourcePath":"components/editorial/SectionHead.jsx"},{"name":"Tag","sourcePath":"components/editorial/Tag.jsx"},{"name":"FormField","sourcePath":"components/forms/FormField.jsx"},{"name":"DraftFrame","sourcePath":"components/motifs/DraftFrame.jsx"},{"name":"GoldDots","sourcePath":"components/motifs/GoldDots.jsx"},{"name":"PullQuote","sourcePath":"components/quotes/PullQuote.jsx"},{"name":"Verse","sourcePath":"components/quotes/Verse.jsx"},{"name":"WebsiteArticle","sourcePath":"ui_kits/website/ArticlePage.jsx"},{"name":"SiteHeader","sourcePath":"ui_kits/website/Chrome.jsx"},{"name":"SiteFooter","sourcePath":"ui_kits/website/Chrome.jsx"},{"name":"WebsiteHome","sourcePath":"ui_kits/website/Home.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"9af850ab9f74","components/editorial/ArticleCard.jsx":"753ac55157f1","components/editorial/SectionHead.jsx":"242f14bba860","components/editorial/Tag.jsx":"40dadeffedb9","components/forms/FormField.jsx":"2948fdea2245","components/motifs/DraftFrame.jsx":"a1207d567027","components/motifs/GoldDots.jsx":"75b313b34a0f","components/quotes/PullQuote.jsx":"1a13efd18150","components/quotes/Verse.jsx":"162d21bc41bd","ui_kits/website/ArticlePage.jsx":"1a635f51e246","ui_kits/website/Chrome.jsx":"e72b4d54e73f","ui_kits/website/Home.jsx":"1584d7f87764"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.GosanMagazineDesignSystem_8ee353 = window.GosanMagazineDesignSystem_8ee353 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  children,
  style
}) {
  const cls = ['gsn-btn', `gsn-btn--${variant}`, size === 'sm' ? 'gsn-btn--sm' : null].filter(Boolean).join(' ');
  if (href !== undefined) {
    return /*#__PURE__*/React.createElement("a", {
      className: cls,
      href: href,
      onClick: onClick,
      style: style
    }, children);
  }
  return /*#__PURE__*/React.createElement("button", {
    className: cls,
    onClick: onClick,
    style: style
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/editorial/SectionHead.jsx
try { (() => {
function SectionHead({
  title,
  moreLabel,
  moreHref = '#',
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "gsn-section-head"
  }, /*#__PURE__*/React.createElement("h2", null, title), moreLabel ? /*#__PURE__*/React.createElement("a", {
    className: "gsn-more",
    href: moreHref
  }, moreLabel) : null, children);
}
Object.assign(__ds_scope, { SectionHead });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/SectionHead.jsx", error: String((e && e.message) || e) }); }

// components/editorial/Tag.jsx
try { (() => {
function Tag({
  variant = 'cerulean',
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: `gsn-tag${variant === 'gold' ? ' gsn-tag--gold' : ''}`
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/Tag.jsx", error: String((e && e.message) || e) }); }

// components/editorial/ArticleCard.jsx
try { (() => {
function ArticleCard({
  tag,
  tagVariant,
  title,
  excerpt,
  date,
  author,
  href = '#'
}) {
  return /*#__PURE__*/React.createElement("article", {
    className: "gsn-card"
  }, tag ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '0.7rem'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    variant: tagVariant
  }, tag)) : null, /*#__PURE__*/React.createElement("h4", null, /*#__PURE__*/React.createElement("span", {
    className: "gsn-brush"
  }), /*#__PURE__*/React.createElement("a", {
    href: href
  }, title)), excerpt ? /*#__PURE__*/React.createElement("p", null, excerpt) : null, date || author ? /*#__PURE__*/React.createElement("div", {
    className: "gsn-byline"
  }, author ? /*#__PURE__*/React.createElement("span", null, author) : null, author && date ? /*#__PURE__*/React.createElement("span", null, " \xB7 ") : null, date ? /*#__PURE__*/React.createElement("span", {
    className: "gsn-date"
  }, date) : null) : null);
}
Object.assign(__ds_scope, { ArticleCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/ArticleCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/FormField.jsx
try { (() => {
function FormField({
  label,
  type = 'text',
  multiline = false,
  placeholder,
  id,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "gsn-field",
    style: {
      marginBottom: '1.3rem'
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: id
  }, label) : null, multiline ? /*#__PURE__*/React.createElement("textarea", {
    id: id,
    placeholder: placeholder,
    value: value,
    onChange: onChange
  }) : /*#__PURE__*/React.createElement("input", {
    id: id,
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange
  }));
}
Object.assign(__ds_scope, { FormField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FormField.jsx", error: String((e && e.message) || e) }); }

// components/motifs/DraftFrame.jsx
try { (() => {
function DraftFrame({
  children,
  label,
  style
}) {
  return /*#__PURE__*/React.createElement("figure", {
    className: "gsn-draft-frame",
    style: {
      margin: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gsn-frame-inner"
  }, children), label ? /*#__PURE__*/React.createElement("figcaption", {
    className: "gsn-technical",
    style: {
      marginTop: '0.6rem'
    }
  }, label) : null);
}
Object.assign(__ds_scope, { DraftFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/motifs/DraftFrame.jsx", error: String((e && e.message) || e) }); }

// components/motifs/GoldDots.jsx
try { (() => {
function GoldDots({
  width = 130,
  height = 150,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "gsn-dots",
    style: {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      ...style
    }
  });
}
Object.assign(__ds_scope, { GoldDots });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/motifs/GoldDots.jsx", error: String((e && e.message) || e) }); }

// components/quotes/PullQuote.jsx
try { (() => {
function PullQuote({
  children,
  cite,
  style
}) {
  return /*#__PURE__*/React.createElement("blockquote", {
    className: "gsn-pullquote",
    style: style
  }, children, cite ? /*#__PURE__*/React.createElement("cite", null, cite) : null);
}
Object.assign(__ds_scope, { PullQuote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/quotes/PullQuote.jsx", error: String((e && e.message) || e) }); }

// components/quotes/Verse.jsx
try { (() => {
function Verse({
  hemistichs = [],
  poet
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "gsn-verse"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gsn-hemistichs"
  }, hemistichs.map((h, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, h))), poet ? /*#__PURE__*/React.createElement("span", {
    className: "gsn-poet"
  }, "\u2014 ", poet) : null);
}
Object.assign(__ds_scope, { Verse });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/quotes/Verse.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ArticlePage.jsx
try { (() => {
/* sticky charcoal reading indicator — a line that sketches itself downward on scroll */
function ReadingIndicator() {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: '90px',
      left: '2.2rem',
      bottom: '2.2rem',
      width: '3px',
      zIndex: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      width: '1px',
      right: 'auto',
      background: 'var(--line-draft)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      width: '3px',
      height: `${progress * 100}%`,
      background: 'var(--ink)',
      transition: 'height 0.1s linear'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "gsn-technical",
    style: {
      position: 'absolute',
      bottom: '-1.4rem',
      left: '-0.4rem',
      fontSize: '0.6rem'
    }
  }, Math.round(progress * 100), "%"));
}
function WebsiteArticle({
  onBack
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(ReadingIndicator, null), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '860px',
      margin: '0 auto',
      padding: '4rem 2rem 2.5rem',
      textAlign: 'center',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '2.4rem',
      right: '-6rem',
      left: '-6rem',
      height: '1px',
      background: 'var(--line-draft)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "gsn-technical",
    style: {
      color: 'var(--gold-deep)'
    }
  }, "ESSAY 01 // ISSUE 01 \u2014 SPRING 2585"), /*#__PURE__*/React.createElement("h1", {
    className: "gsn-display",
    style: {
      fontSize: '3.2rem',
      margin: '1rem 0'
    }
  }, "\u06AF\u0648\u0633\u0627\u0646\u200C\u0647\u0627\u061B \u0631\u0627\u0648\u06CC\u0627\u0646 \u0641\u0631\u0627\u0645\u0648\u0634\u200C\u0634\u062F\u0647\u0654 \u062A\u0627\u0631\u06CC\u062E \u0648 \u0627\u0641\u0633\u0627\u0646\u0647\u0654 \u0627\u06CC\u0631\u0627\u0646"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '0.85rem',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Tag, null, "\u062C\u0633\u062A\u0627\u0631"), /*#__PURE__*/React.createElement("span", null, "\u062D\u0627\u0641\u0638 \u0628\u0627\u0628\u0627\u0634\u0627\u0647\u06CC"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "\u0628\u0647\u0627\u0631 \u06F2\u06F5\u06F8\u06F5"))), /*#__PURE__*/React.createElement("article", {
    style: {
      maxWidth: '860px',
      margin: '0 auto',
      padding: '0 2rem 3rem'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '1rem',
      lineHeight: 'var(--leading-prose)',
      textAlign: 'justify',
      margin: '0 0 1.5rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gsn-dropcap",
    style: {
      fontSize: '3.4rem',
      lineHeight: 1,
      float: 'right',
      margin: '0.4rem 0 0 0.8rem'
    }
  }, "\u0627"), "\u0632 \u0631\u0648\u0632\u06AF\u0627\u0631\u0627\u0646 \u06A9\u0647\u0646 \u062F\u0631 \u0627\u06CC\u0631\u0627\u0646 \u0628\u0627\u0633\u062A\u0627\u0646\u060C \u0631\u0627\u0645\u0634\u06AF\u0631\u0627\u0646 \u0648 \u0646\u063A\u0645\u0647\u200C\u062E\u0648\u0627\u0646\u0627\u0646\u06CC \u062F\u0631 \u06A9\u0627\u0631 \u067E\u0627\u0633\u062F\u0627\u0631\u06CC \u0627\u0632 \u062A\u0627\u0631\u06CC\u062E \u0648 \u0627\u0641\u0633\u0627\u0646\u0647\u200C\u0647\u0627\u06CC \u0627\u06CC\u0646 \u0633\u0631\u0632\u0645\u06CC\u0646 \u0628\u0648\u062F\u0646\u062F. \xAB\u06AF\u0648\u0633\u0627\u0646\xBB\u0647\u0627 \u2014 \u0622\u0646\u200C\u0637\u0648\u0631 \u06A9\u0647 \u062F\u0631 \u0632\u0628\u0627\u0646 \u067E\u0647\u0644\u0648\u06CC \u062E\u0648\u0627\u0646\u062F\u0647 \u0645\u06CC\u200C\u0634\u062F\u0646\u062F \u2014 \u0631\u0648\u0627\u06CC\u062A\u06AF\u0631 \u0628\u0648\u062F\u0646\u062F. \u0631\u0648\u0627\u06CC\u062A\u06AF\u0631 \u0634\u0627\u062F\u06CC \u0648 \u0627\u0646\u062F\u0648\u0647 \u0645\u0631\u062F\u0645\u0627\u0646\u060C \u0631\u0648\u0627\u06CC\u062A\u06AF\u0631 \u0631\u0632\u0645 \u0648 \u0628\u0632\u0645 \u0634\u0627\u0647\u0627\u0646\u060C \u0631\u0648\u0627\u06CC\u062A\u06AF\u0631 \u067E\u06CC\u0631\u0648\u0632\u06CC \u0648 \u0634\u06A9\u0633\u062A \u0642\u0647\u0631\u0645\u0627\u0646\u0627\u0646. \u0622\u0646\u0647\u0627 \u0627\u06CC\u0646 \u0647\u0645\u0647 \u0631\u0627 \u0628\u0647 \u062F\u06CC\u0628\u0627\u06CC \u0648\u0632\u0646 \u0648 \u0642\u0627\u0641\u06CC\u0647 \u0645\u06CC\u200C\u0622\u0631\u0627\u0633\u062A\u0646\u062F \u0648 \u0628\u0647 \u0646\u0648\u0627\u06CC \u0633\u0627\u0632\u0647\u0627\u06CC \u062E\u0648\u0634\u200C\u0622\u0647\u0646\u06AF \u062E\u0648\u06CC\u0634 \u0645\u06CC\u200C\u0622\u0645\u06CC\u062E\u062A\u0646\u062F \u062A\u0627 \u0628\u0647 \u062F\u0644\u200C\u0647\u0627 \u0628\u0646\u0634\u06CC\u0646\u062F \u0648 \u062F\u0631 \u06CC\u0627\u062F\u0647\u0627 \u0628\u0645\u0627\u0646\u062F."), /*#__PURE__*/React.createElement("div", {
    style: {
      columns: 2,
      columnGap: '3rem',
      columnRule: '1px solid var(--line-draft)',
      fontSize: '0.95rem',
      lineHeight: 'var(--leading-prose)',
      textAlign: 'justify'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 1.3rem'
    }
  }, "\u0627\u0645\u0631\u0648\u0632 \u06A9\u0647 \u063A\u0628\u0627\u0631 \xAB\u0648\u062D\u0634\u062A\u06CC \u0628\u0632\u0631\u06AF\xBB \u0628\u0631 \u0634\u0626\u0648\u0646 \u0632\u0646\u062F\u06AF\u0627\u0646\u06CC \u0627\u06CC\u0631\u0627\u0646\u06CC\u0627\u0646 \u0633\u0627\u06CC\u0647 \u0627\u0641\u06A9\u0646\u062F\u0647\u060C \u0648 \u0646\u0634\u0627\u0646\u0647\u200C\u0647\u0627\u06CC \u0628\u062D\u0631\u0627\u0646 \u0627\u0632 \u0641\u0631\u0647\u0646\u06AF \u0648 \u0647\u0646\u0631 \u062A\u0627 \u0627\u0642\u062A\u0635\u0627\u062F \u0648 \u0627\u0642\u0644\u06CC\u0645 \u0627\u06CC\u0646 \u06A9\u0647\u0646\u200C\u062F\u06CC\u0627\u0631 \u0631\u0627 \u0641\u0631\u0627 \u06AF\u0631\u0641\u062A\u0647\u200C\u0627\u0646\u062F\u060C \u0645\u0627 \u0641\u0631\u0632\u0646\u062F\u0627\u0646 \u0627\u06CC\u0646 \u0628\u0648\u0645 \u0648 \u0628\u0631 \u0628\u06CC\u0634 \u0627\u0632 \u0647\u0631 \u0632\u0645\u0627\u0646 \u062F\u06CC\u06AF\u0631\u06CC \u0627\u0632 \u062E\u0648\u062F \u0645\u06CC\u200C\u067E\u0631\u0633\u06CC\u0645 \u062F\u0631 \u06A9\u062C\u0627\u06CC \u0627\u06CC\u0646 \u0634\u0628 \u062A\u0627\u0631\u06CC\u06A9 \u0627\u06CC\u0633\u062A\u0627\u062F\u0647\u200C\u0627\u06CC\u0645. \u0628\u06CC\u0634 \u0627\u0632 \u0647\u0631 \u0632\u0645\u0627\u0646 \u062F\u06CC\u06AF\u0631\u06CC \u0646\u0634\u0627\u0646 \u0641\u0631\u0647\u0646\u06AF \u0648 \u062A\u0627\u0631\u06CC\u062E \u062E\u0648\u06CC\u0634 \u0631\u0627 \u0645\u06CC\u200C\u062C\u0648\u06CC\u06CC\u0645 \u062A\u0627 \u062F\u0631 \u0631\u06CC\u0633\u0645\u0627\u0646\u200C\u0647\u0627\u06CC \u0622\u0646 \u0686\u0646\u06AF \u0632\u0646\u06CC\u0645."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 1.3rem'
    }
  }, "\u0645\u06CC\u0631\u0627\u062B \u0646\u06CC\u0627\u06A9\u0627\u0646\u060C \u0646\u0647 \u06CC\u0627\u062F\u06AF\u0627\u0631\u06CC\u200C\u0647\u0627\u06CC \u062E\u0627\u0645\u0648\u0634\u060C \u06A9\u0647 \u0631\u06CC\u0633\u0645\u0627\u0646\u200C\u0647\u0627\u06CC\u06CC \u062F\u0631 \u0647\u0645 \u067E\u06CC\u0648\u0633\u062A\u0647\u200C\u0627\u0646\u062F \u0628\u0631\u0627\u06CC \u0627\u06CC\u0633\u062A\u0627\u062F\u06AF\u06CC \u062F\u0631 \u062A\u0646\u062F\u0628\u0627\u062F\u0647\u0627\u06CC \u0641\u0631\u0627\u0645\u0648\u0634\u06CC \u0648 \u0633\u0631\u06AF\u0631\u062F\u0627\u0646\u06CC\u061B \u0631\u06CC\u0633\u0645\u0627\u0646\u200C\u0647\u0627\u06CC \u0627\u06CC\u0631\u0627\u0646. \u0645\u0627 \u0628\u0631 \u0627\u06CC\u0646 \u0628\u0627\u0648\u0631\u06CC\u0645 \u06A9\u0647 \u06AF\u0630\u0627\u0631 \u0627\u0632 \u0628\u062D\u0631\u0627\u0646 \u0639\u0645\u06CC\u0642 \u06A9\u0646\u0648\u0646\u06CC\u060C \u0646\u0647 \u0628\u0627 \u0642\u0631\u0627\u0631 \u062F\u0627\u062F\u0646 \u062E\u0648\u062F \u062F\u0631 \u062C\u0627\u06CC\u06AF\u0627\u0647 \u0642\u0631\u0628\u0627\u0646\u06CC\u060C \u06A9\u0647 \u062A\u0646\u0647\u0627 \u0628\u0627 \u0628\u0627\u0632\u0634\u0646\u0627\u0633\u06CC \u0646\u0642\u0634 \u062E\u0648\u06CC\u0634 \u0645\u0645\u06A9\u0646 \u0627\u0633\u062A.")), /*#__PURE__*/React.createElement(__ds_scope.PullQuote, {
    cite: "\u0627\u0632 \u0647\u0645\u06CC\u0646 \u062C\u0633\u062A\u0627\u0631",
    style: {
      margin: '2.5rem 0'
    }
  }, "\u0641\u0631\u0647\u0646\u06AF \u0648 \u0647\u0646\u0631\u060C \u0646\u0647 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u062A\u0641\u0646\u0646\u06CC\u060C \u06A9\u0647 \u0633\u062A\u0648\u0646\u200C\u0647\u0627\u06CC \u062A\u0627\u0628\u200C\u0622\u0648\u0631\u06CC\u060C \u0628\u0627\u0632\u0633\u0627\u0632\u06CC \u0648 \u0628\u0627\u0632\u0634\u0646\u0627\u0633\u06CC \u0647\u0648\u06CC\u062A \u06CC\u06A9 \u0645\u0644\u062A\u200C\u0627\u0646\u062F"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.2fr',
      gap: '2.5rem',
      alignItems: 'center',
      margin: '0 0 2.5rem'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.DraftFrame, {
    label: "FIG. 03 \u2014 CYPRESS LANDSCAPE"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/illustrations/cypress-landscape.png",
    alt: "",
    style: {
      display: 'block',
      width: '100%'
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.95rem',
      lineHeight: 'var(--leading-prose)',
      textAlign: 'justify',
      margin: 0
    }
  }, "\u062F\u0631 \u0633\u0631\u0632\u0645\u06CC\u0646\u06CC \u063A\u0627\u0631\u062A\u200C\u0634\u062F\u0647 \u0648 \u062C\u0627\u0645\u0639\u0647\u200C\u0627\u06CC \u0628\u062D\u0631\u0627\u0646\u200C\u0632\u062F\u0647 \u06A9\u0647 \u0646\u0647\u0627\u062F\u0647\u0627\u06CC \u0622\u0646 \u0631\u0648 \u0628\u0647 \u0641\u0631\u0633\u0627\u06CC\u0634\u200C\u0627\u0646\u062F\u060C \u0622\u06CC\u0627 \u0646\u0645\u06CC\u200C\u062A\u0648\u0627\u0646 \u0641\u0631\u0647\u0646\u06AF \u0648 \u0647\u0646\u0631 \u0631\u0627 \u0628\u0647 \u0646\u06CC\u0631\u0648\u06CC\u06CC \u0628\u0631\u0627\u06CC \u0628\u0627\u0632\u0633\u0627\u0632\u06CC \u0628\u062F\u0644 \u06A9\u0631\u062F\u061F \u0622\u06CC\u0627 \u0646\u0645\u06CC\u200C\u062A\u0648\u0627\u0646 \u0648 \u0646\u0628\u0627\u06CC\u062F \u0647\u0646\u0631 \u0648 \u0641\u0631\u0647\u0646\u06AF \u0631\u0627 \u0627\u0632 \u062D\u0627\u0634\u06CC\u0647\u0654 \u0641\u0631\u0627\u0645\u0648\u0634\u06CC \u0628\u0647 \u0645\u062A\u0646 \u0627\u062D\u06CC\u0627\u0621 \u06CC\u06A9 \u0645\u0644\u062A \u0622\u0648\u0631\u062F \u0648 \u0628\u0627 \u0622\u0646 \u067E\u0644\u06CC \u0628\u0647 \u0633\u0648\u06CC \u0641\u0631\u062F\u0627\u06CC\u06CC \u0631\u0648\u0634\u0646\u200C\u062A\u0631 \u0633\u0627\u062E\u062A\u061F \u0645\u0627 \u0641\u0631\u0632\u0646\u062F\u0627\u0646 \u0627\u06CC\u0631\u0627\u0646 \u062F\u0631 \u06AF\u0627\u0647\u0646\u0627\u0645\u0647\u0654 \xAB\u06AF\u0648\u0633\u0627\u0646\xBB \u0645\u06CC\u200C\u06A9\u0648\u0634\u06CC\u0645 \u062F\u0631 \u0645\u0633\u06CC\u0631 \u0627\u06CC\u0646 \u0647\u062F\u0641 \u06AF\u0627\u0645 \u0628\u0631\u062F\u0627\u0634\u062A\u0647\u060C \u067E\u0644\u06CC \u0628\u0627\u0634\u06CC\u0645 \u0645\u06CC\u0627\u0646 \u0645\u06CC\u0631\u0627\u062B \u06A9\u0647\u0646 \u067E\u062F\u0631\u0627\u0646 \u0648 \u0686\u0634\u0645\u200C\u0627\u0646\u062F\u0627\u0632 \u0641\u0631\u062F\u0627.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      borderTop: '1px solid var(--line)',
      paddingTop: '2rem'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    onClick: onBack
  }, "\u2190 \u0628\u0627\u0632\u06AF\u0634\u062A \u0628\u0647 \u062E\u0627\u0646\u0647"))));
}
Object.assign(__ds_scope, { WebsiteArticle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ArticlePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Chrome.jsx
try { (() => {
const NAV_ITEMS = ['خانه', 'جستار', 'گفتگو', 'یادمان', 'یادداشت‌های آزاد', 'شیوه‌نامهٔ گوسان', 'دربارهٔ ما', 'تماس با ما'];
function SiteHeader({
  active = 'خانه',
  onNav
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--ink)',
      color: 'var(--white)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '0.8rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '2rem'
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.4rem'
    }
  }, /*#__PURE__*/React.createElement("button", {
    title: "\u062C\u0633\u062A\u062C\u0648",
    style: {
      background: 'none',
      border: 'none',
      color: 'var(--white)',
      fontSize: '1.05rem',
      cursor: 'pointer',
      opacity: 0.85
    }
  }, "\u2315"), /*#__PURE__*/React.createElement("ul", {
    style: {
      display: 'flex',
      listStyle: 'none',
      gap: '1.5rem',
      margin: 0,
      padding: 0,
      fontSize: '0.92rem',
      flexWrap: 'wrap'
    }
  }, NAV_ITEMS.map(item => /*#__PURE__*/React.createElement("li", {
    key: item
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav && onNav(item);
    },
    style: {
      fontWeight: item === active ? 700 : 400,
      opacity: item === active ? 1 : 0.92
    }
  }, item))))), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav && onNav('خانه');
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.png",
    alt: "\u06AF\u0648\u0633\u0627\u0646",
    style: {
      height: '38px',
      display: 'block',
      filter: 'invert(1) sepia(1) saturate(4.5) hue-rotate(-14deg) brightness(.95)'
    }
  }))));
}
function SiteFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--ink)',
      color: 'var(--text-on-dark)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '3.5rem 2rem 2rem',
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr',
      gap: '3rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.png",
    alt: "\u06AF\u0648\u0633\u0627\u0646",
    style: {
      height: '50px',
      marginBottom: '0.8rem',
      filter: 'invert(1) sepia(1) saturate(4.5) hue-rotate(-14deg) brightness(.95)'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.85rem',
      lineHeight: 2.1,
      color: 'var(--grey-faint)',
      margin: 0
    }
  }, "\u06AF\u0627\u0647\u0646\u0627\u0645\u0647\u0654 \xAB\u06AF\u0648\u0633\u0627\u0646\xBB \u062F\u0631 \u067E\u06CC \u0622\u0646 \u0627\u0633\u062A \u06A9\u0647 \u063A\u0628\u0627\u0631 \u0641\u0631\u0627\u0645\u0648\u0634\u06CC \u0631\u0627 \u0627\u0632 \u0635\u0641\u062D\u0647\u0654 \u0641\u0631\u0647\u0646\u06AF \u0648 \u0647\u0646\u0631 \u0648 \u0645\u06CC\u0631\u0627\u062B \u0627\u06CC\u0631\u0627\u0646 \u0628\u0632\u062F\u0627\u06CC\u062F \u0648 \u06AF\u0648\u0634\u0647\u200C\u0647\u0627\u06CC \u0646\u0627\u0634\u0646\u0627\u062E\u062A\u0647\u0654 \u062A\u0627\u0631\u06CC\u062E \u0648 \u0641\u0631\u0647\u0646\u06AF \u0648 \u0647\u0646\u0631 \u0627\u06CC\u0631\u0627\u0646 \u0631\u0627 \u0628\u0647 \u0627\u0628\u0632\u0627\u0631 \u067E\u0698\u0648\u0647\u0634 \u0648 \u0646\u0642\u062F \u0628\u06A9\u0627\u0648\u062F\u060C \u0628\u0634\u0646\u0627\u0633\u062F \u0648 \u0631\u0648\u0627\u06CC\u062A \u06A9\u0646\u062F.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", {
    style: {
      color: 'var(--white)',
      fontSize: '1rem',
      margin: '0 0 1rem',
      fontWeight: 700
    }
  }, "\u0628\u062E\u0634\u200C\u0647\u0627"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'grid',
      gap: '0.55rem',
      fontSize: '0.88rem'
    }
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "\u062C\u0633\u062A\u0627\u0631")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "\u06AF\u0641\u062A\u06AF\u0648")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "\u06CC\u0627\u062F\u0645\u0627\u0646")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "\u06CC\u0627\u062F\u062F\u0627\u0634\u062A\u200C\u0647\u0627\u06CC \u0622\u0632\u0627\u062F")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", {
    style: {
      color: 'var(--white)',
      fontSize: '1rem',
      margin: '0 0 1rem',
      fontWeight: 700
    }
  }, "\u067E\u06CC\u0648\u0646\u062F\u0647\u0627"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'grid',
      gap: '0.55rem',
      fontSize: '0.88rem'
    }
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "\u0634\u06CC\u0648\u0647\u200C\u0646\u0627\u0645\u0647\u0654 \u06AF\u0648\u0633\u0627\u0646")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "\u062F\u0631\u0628\u0627\u0631\u0647\u0654 \u0645\u0627")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "mailto:gosan@info.org",
    style: {
      direction: 'ltr',
      display: 'inline-block',
      borderBottom: '1px solid var(--gold)',
      color: 'var(--white)'
    }
  }, "gosan@info.org"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--line-dark)',
      textAlign: 'center',
      padding: '1.2rem',
      fontSize: '0.78rem',
      color: '#9A9A9A'
    }
  }, "\u06AF\u0627\u0647\u0646\u0627\u0645\u0647\u0654 \u06AF\u0648\u0633\u0627\u0646 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gold)'
    }
  }, "\u25CF"), " \u0633\u0627\u0644 \u06CC\u06A9\u0645\u060C \u0634\u0645\u0627\u0631\u0647\u0654 \u06CC\u06A9\u0645\u060C \u0628\u0647\u0627\u0631 \u06F2\u06F5\u06F8\u06F5 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gold)'
    }
  }, "\u25CF"), " \u0647\u0645\u0647\u0654 \u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638 \u0627\u0633\u062A"));
}
Object.assign(__ds_scope, { SiteHeader, SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
const LATEST = [{
  tag: 'جستار',
  title: 'گوسان‌ها؛ راویان فراموش‌شدهٔ تاریخ و افسانهٔ ایران',
  excerpt: 'جست‌وجویی در پیشینهٔ رامشگران و نغمه‌خوانان ایران باستان، آنان که تاریخ و افسانه را در جامهٔ زربفت چامه و موسیقی از گزند فراموشی در امان داشتند.',
  date: 'بهار ۲۵۸۵',
  author: 'حافظ باباشاهی'
}, {
  tag: 'گفتگو',
  title: 'گفت‌وگو با پژوهشگر موسیقی کهن ایرانی',
  excerpt: 'دربارهٔ پیوند شعر و موسیقی در سنت روایتگری ایرانی و آنچه از نغمه‌های باستان به امروز رسیده است.',
  date: 'بهار ۲۵۸۵',
  author: 'یلدا زمانی'
}, {
  tag: 'یادمان',
  title: 'یادی از بزرگان فرهنگ و هنر ایران',
  excerpt: 'یادمان چهره‌هایی که در پاسداشت زبان، ادب و هنر ایران کوشیدند و میراثی ماندگار بر جای نهادند.',
  date: 'بهار ۲۵۸۵',
  author: 'احسان شواربی'
}];
function DraftLineH({
  top,
  right = '-4rem',
  left = '-4rem'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      right,
      left,
      height: '1px',
      background: 'var(--line-draft)',
      pointerEvents: 'none'
    }
  });
}
function DraftLineV({
  side,
  offset
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '-3rem',
      bottom: '-3rem',
      [side]: offset,
      width: '1px',
      background: 'var(--line-draft)',
      pointerEvents: 'none'
    }
  });
}
function WebsiteHome({
  onReadArticle
}) {
  return /*#__PURE__*/React.createElement("main", {
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '4.5rem 2rem 3.5rem',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(DraftLineH, {
    top: "2.2rem"
  }), /*#__PURE__*/React.createElement(DraftLineH, {
    top: "calc(100% - 1.2rem)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr 1fr',
      gap: '4rem',
      alignItems: 'center',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(DraftLineV, {
    side: "right",
    offset: "-1.6rem"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.GoldDots, {
    width: 110,
    height: 100,
    style: {
      position: 'absolute',
      top: '-2.6rem',
      left: 0,
      opacity: 0.55
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "gsn-technical",
    style: {
      color: 'var(--gold-deep)',
      marginBottom: '1.2rem'
    }
  }, "ISSUE 01 // SPRING 2585"), /*#__PURE__*/React.createElement("h1", {
    className: "gsn-display",
    style: {
      fontSize: 'var(--text-hero)',
      margin: '0.6rem 0 1rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gsn-dropcap"
  }, "\u0631"), "\u0648\u0627\u06CC\u062A\u06AF\u0631\u0650 \u0641\u0631\u0647\u0646\u06AF \u0648 \u0647\u0646\u0631\u0650 \u0627\u06CC\u0631\u0627\u0646"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '1.05rem',
      color: 'var(--text-muted)',
      fontWeight: 300,
      margin: '0 0 0.4rem'
    }
  }, "\u06AF\u0627\u0647\u0646\u0627\u0645\u0647\u0654 \u0641\u0631\u0647\u0646\u06AF\u06CC \u0648 \u0647\u0646\u0631\u06CC"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--accent)',
      fontWeight: 500,
      fontSize: '0.95rem',
      margin: '0 0 2rem'
    }
  }, "\u0633\u0627\u0644 \u06CC\u06A9\u0645\u060C \u0634\u0645\u0627\u0631\u0647\u0654 \u06CC\u06A9\u0645\u060C \u0628\u0647\u0627\u0631 \u06F2\u06F5\u06F8\u06F5"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '1.6rem',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, null, "\u062F\u0631\u06CC\u0627\u0641\u062A \u0646\u0633\u062E\u0647\u0654 \u062F\u06CC\u062C\u06CC\u062A\u0627\u0644"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    href: "#"
  }, "\u0628\u0627\u06CC\u06AF\u0627\u0646\u06CC \u0634\u0645\u0627\u0631\u0647\u200C\u0647\u0627 \u2190"))), /*#__PURE__*/React.createElement(__ds_scope.DraftFrame, {
    label: "FIG. 01 \u2014 SIMORGH & GOLDEN MOON"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/illustrations/bird-moon.png",
    alt: "",
    style: {
      display: 'block',
      width: '100%'
    }
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--prose-max)',
      margin: '0 auto',
      padding: '2.5rem 2rem 3.5rem',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("hr", {
    className: "gsn-rule-gold"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '1.02rem',
      lineHeight: 'var(--leading-prose)',
      textAlign: 'justify',
      color: 'var(--text-body)',
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--ink)'
    }
  }, "\u06AF\u0648\u0633\u0627\u0646 \u0631\u06CC\u0634\u0647 \u062F\u0631 \u0631\u0648\u0632\u06AF\u0627\u0631\u0627\u0646 \u06A9\u0647\u0646 \u062F\u0627\u0631\u062F."), ' ', "\u062F\u0631 \u0627\u06CC\u0631\u0627\u0646 \u0628\u0627\u0633\u062A\u0627\u0646\u060C \u06AF\u0648\u0633\u0627\u0646 \u0628\u0647 \u0631\u0627\u0645\u0634\u06AF\u0631\u0627\u0646 \u0648 \u0646\u063A\u0645\u0647\u200C\u062E\u0648\u0627\u0646\u0627\u0646\u06CC \u06AF\u0641\u062A\u0647 \u0645\u06CC\u200C\u0634\u062F \u06A9\u0647 \u062D\u0627\u0641\u0638 \u062A\u0627\u0631\u06CC\u062E \u0648 \u0627\u0641\u0633\u0627\u0646\u0647\u200C\u0647\u0627\u06CC \u06A9\u0647\u0646 \u0628\u0648\u062F\u0646\u062F. \u06AF\u0648\u0633\u0627\u0646\u200C\u0647\u0627 \u0631\u0648\u0627\u06CC\u062A\u06AF\u0631 \u0628\u0648\u062F\u0646\u062F\u061B \u0631\u0648\u0627\u06CC\u062A\u06AF\u0631 \u0634\u0627\u062F\u06CC \u0648 \u0627\u0646\u062F\u0648\u0647 \u0645\u0631\u062F\u0645\u0627\u0646\u060C \u0631\u0648\u0627\u06CC\u062A\u06AF\u0631 \u0631\u0632\u0645 \u0648 \u0628\u0632\u0645 \u0634\u0627\u0647\u0627\u0646\u060C \u0631\u0648\u0627\u06CC\u062A\u06AF\u0631 \u067E\u06CC\u0631\u0648\u0632\u06CC \u0648 \u0634\u06A9\u0633\u062A \u0642\u0647\u0631\u0645\u0627\u0646\u0627\u0646. \u0627\u0645\u0631\u0648\u0632 \u0646\u06CC\u0632 \u0645\u0627 \u062F\u0631 \u06AF\u0627\u0647\u0646\u0627\u0645\u0647\u0654 \xAB\u06AF\u0648\u0633\u0627\u0646\xBB \u06AF\u0631\u062F \u0622\u0645\u062F\u0647\u200C\u0627\u06CC\u0645 \u062A\u0627 \u0631\u0648\u0627\u06CC\u062A\u06AF\u0631 \u0628\u0627\u0634\u06CC\u0645\u061B \u0631\u0648\u0627\u06CC\u062A\u06AF\u0631 \u0641\u0631\u0647\u0646\u06AF \u0648 \u0647\u0646\u0631 \u0648 \u0645\u06CC\u0631\u0627\u062B \u06A9\u0647\u0646 \u0627\u06CC\u0631\u0627\u0646."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '2.4rem'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Verse, {
    hemistichs: ['هنر خوار شد جادویی ارجمند', 'نهان راستی، آشکارا گزند'],
    poet: "\u062D\u06A9\u06CC\u0645 \u0627\u0628\u0648\u0627\u0644\u0642\u0627\u0633\u0645 \u0641\u0631\u062F\u0648\u0633\u06CC"
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-band)',
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '4rem 2rem',
      display: 'grid',
      gridTemplateColumns: '1fr 1.3fr',
      gap: '3.5rem',
      alignItems: 'center',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(DraftLineV, {
    side: "left",
    offset: "38%"
  }), /*#__PURE__*/React.createElement(__ds_scope.DraftFrame, {
    label: "FIG. 02 \u2014 CYPRESS & BIRD"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/illustrations/cypress-square.jpg",
    alt: "",
    style: {
      display: 'block',
      width: '100%'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    variant: "gold"
  }, "\u0646\u0648\u0634\u062A\u0627\u0631 \u0628\u0631\u06AF\u0632\u06CC\u062F\u0647"), /*#__PURE__*/React.createElement("h3", {
    className: "gsn-display",
    style: {
      fontSize: '2.2rem',
      margin: '1rem 0'
    }
  }, "\u06AF\u0648\u0633\u0627\u0646\u200C\u0647\u0627\u061B \u0631\u0627\u0648\u06CC\u0627\u0646 \u0641\u0631\u0627\u0645\u0648\u0634\u200C\u0634\u062F\u0647\u0654 \u062A\u0627\u0631\u06CC\u062E \u0648 \u0627\u0641\u0633\u0627\u0646\u0647\u0654 \u0627\u06CC\u0631\u0627\u0646"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.95rem',
      color: 'var(--text-muted)',
      textAlign: 'justify',
      lineHeight: 2.2,
      margin: '0 0 1.6rem'
    }
  }, "\u0622\u0646\u0647\u0627 \u062A\u0627\u0631\u06CC\u062E \u0648 \u0627\u0641\u0633\u0627\u0646\u0647 \u0631\u0627 \u0628\u0647 \u062F\u06CC\u0628\u0627\u06CC \u0648\u0632\u0646 \u0648 \u0642\u0627\u0641\u06CC\u0647 \u0645\u06CC\u200C\u0622\u0631\u0627\u0633\u062A\u0646\u062F \u0648 \u0628\u0647 \u0646\u0648\u0627\u06CC \u0633\u0627\u0632\u0647\u0627\u06CC \u062E\u0648\u0634\u200C\u0622\u0647\u0646\u06AF \u062E\u0648\u06CC\u0634 \u0645\u06CC\u200C\u0622\u0645\u06CC\u062E\u062A\u0646\u062F \u062A\u0627 \u0628\u0647 \u062F\u0644\u200C\u0647\u0627 \u0628\u0646\u0634\u06CC\u0646\u062F \u0648 \u062F\u0631 \u06CC\u0627\u062F\u0647\u0627 \u0628\u0645\u0627\u0646\u062F\u060C \u062A\u0627 \u0633\u06CC\u0646\u0647 \u0628\u0647 \u0633\u06CC\u0646\u0647 \u0628\u0627\u0632 \u06AF\u0641\u062A\u0647 \u0648 \u0628\u0627\u0632 \u062E\u0648\u0627\u0646\u062F\u0647 \u0634\u0648\u062F."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '1.6rem',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    onClick: onReadArticle
  }, "\u062E\u0648\u0627\u0646\u062F\u0646 \u0646\u0648\u0634\u062A\u0627\u0631"), /*#__PURE__*/React.createElement("span", {
    className: "gsn-technical"
  }, "EST. READING \u2014 14 MIN"))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '3.5rem 2rem',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SectionHead, {
    title: "\u062A\u0627\u0632\u0647\u200C\u0647\u0627\u06CC \u06AF\u0648\u0633\u0627\u0646",
    moreLabel: "\u0628\u0627\u06CC\u06AF\u0627\u0646\u06CC \u2190"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1px 1fr 1px 1fr',
      gap: '2.2rem',
      marginTop: '2.2rem',
      alignItems: 'stretch'
    }
  }, LATEST.map((a, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: a.title
  }, i > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "gsn-draft-v",
    style: {
      marginTop: '-3.5rem',
      marginBottom: '-2rem'
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: `${i * 2.4}rem`
    },
    onClick: onReadArticle
  }, /*#__PURE__*/React.createElement(__ds_scope.ArticleCard, a)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-band)',
      borderTop: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '4rem 2rem',
      display: 'grid',
      gridTemplateColumns: '320px 1fr',
      gap: '3.5rem',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--white)',
      border: '1px solid var(--line)',
      boxShadow: 'var(--shadow-cover)',
      aspectRatio: '3 / 4.2',
      position: 'relative',
      padding: '2rem 1.6rem',
      display: 'flex',
      flexDirection: 'column',
      transform: 'rotate(-1.5deg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      width: '5px',
      background: 'var(--gold)'
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.GoldDots, {
    width: 70,
    height: 60,
    style: {
      backgroundSize: '10px 10px'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.png",
    alt: "\u06AF\u0648\u0633\u0627\u0646",
    style: {
      width: '70%',
      margin: 'auto auto 0 auto',
      mixBlendMode: 'multiply'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 900,
      fontSize: '1.3rem',
      marginTop: '0.5rem'
    }
  }, "\u06AF\u0648\u0633\u0627\u0646"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.7rem',
      color: 'var(--grey)'
    }
  }, "\u06AF\u0627\u0647\u0646\u0627\u0645\u0647\u0654 \u0641\u0631\u0647\u0646\u06AF\u06CC \u0648 \u0647\u0646\u0631\u06CC"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.7rem',
      color: 'var(--accent)',
      fontWeight: 700
    }
  }, "\u0633\u0627\u0644 \u06CC\u06A9\u0645\u060C \u0634\u0645\u0627\u0631\u0647\u0654 \u06CC\u06A9\u0645\u060C \u0628\u0647\u0627\u0631 \u06F2\u06F5\u06F8\u06F5"), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/illustrations/cypress-row.png",
    alt: "",
    style: {
      marginTop: '1rem',
      height: '34%',
      objectFit: 'cover'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: '1.6rem',
      fontWeight: 900,
      margin: '0 0 0.3rem'
    }
  }, "\u06AF\u0627\u0647\u0646\u0627\u0645\u0647\u0654 \u0641\u0631\u0647\u0646\u06AF\u06CC \u0648 \u0647\u0646\u0631\u06CC \u06AF\u0648\u0633\u0627\u0646"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--accent)',
      fontWeight: 500,
      marginBottom: '1.6rem'
    }
  }, "\u0633\u0627\u0644 \u06CC\u06A9\u0645\u060C \u0634\u0645\u0627\u0631\u0647\u0654 \u06CC\u06A9\u0645\u060C \u0628\u0647\u0627\u0631 \u06F2\u06F5\u06F8\u06F5"), /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: '0 0 2rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      fontWeight: 700,
      display: 'inline'
    }
  }, "\u0686\u06A9\u06CC\u062F\u0647:"), /*#__PURE__*/React.createElement("dd", {
    style: {
      display: 'inline',
      color: 'var(--grey)',
      marginRight: '0.4rem'
    }
  }, "\u0646\u062E\u0633\u062A\u06CC\u0646 \u0634\u0645\u0627\u0631\u0647\u0654 \u06AF\u0648\u0633\u0627\u0646\u061B \u062C\u0633\u062A\u0627\u0631\u0647\u0627\u060C \u06AF\u0641\u062A\u06AF\u0648\u0647\u0627 \u0648 \u06CC\u0627\u062F\u0645\u0627\u0646\u200C\u0647\u0627\u06CC\u06CC \u062F\u0631 \u0641\u0631\u0647\u0646\u06AF\u060C \u0647\u0646\u0631 \u0648 \u0645\u06CC\u0631\u0627\u062B \u0627\u06CC\u0631\u0627\u0646")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", {
    style: {
      fontWeight: 700,
      display: 'inline'
    }
  }, "\u0647\u0645\u06A9\u0627\u0631\u0627\u0646 \u0627\u06CC\u0646 \u0634\u0645\u0627\u0631\u0647:"), /*#__PURE__*/React.createElement("dd", {
    style: {
      display: 'inline',
      color: 'var(--grey)',
      marginRight: '0.4rem'
    }
  }, "\u062D\u0627\u0641\u0638 \u0628\u0627\u0628\u0627\u0634\u0627\u0647\u06CC\u060C \u0627\u0645\u06CC\u0646 \u0646\u0627\u06CC\u0628\u200C\u067E\u0648\u0631\u060C \u06CC\u0644\u062F\u0627 \u0632\u0645\u0627\u0646\u06CC\u060C \u0627\u062D\u0633\u0627\u0646 \u0634\u0648\u0627\u0631\u0628\u06CC\u060C \u0633\u0647\u0631\u0627\u0628 \u0644\u0628\u06CC\u0628"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '1.4rem',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, null, "\u062F\u0631\u06CC\u0627\u0641\u062A \u0646\u0633\u062E\u0647\u0654 \u0686\u0627\u067E\u06CC \u0627\u06CC\u0646 \u0634\u0645\u0627\u0631\u0647"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    href: "#"
  }, "\u0628\u0627\u06CC\u06AF\u0627\u0646\u06CC \u0634\u0645\u0627\u0631\u0647\u200C\u0647\u0627 \u2190"))))));
}
Object.assign(__ds_scope, { WebsiteHome });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.ArticleCard = __ds_scope.ArticleCard;

__ds_ns.SectionHead = __ds_scope.SectionHead;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.FormField = __ds_scope.FormField;

__ds_ns.DraftFrame = __ds_scope.DraftFrame;

__ds_ns.GoldDots = __ds_scope.GoldDots;

__ds_ns.PullQuote = __ds_scope.PullQuote;

__ds_ns.Verse = __ds_scope.Verse;

__ds_ns.WebsiteArticle = __ds_scope.WebsiteArticle;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.WebsiteHome = __ds_scope.WebsiteHome;

})();
