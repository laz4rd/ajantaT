"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * Ajanta — Corporate Gifting (display-only landing page)
 *
 * Single-file, self-contained React component. All styling is plain CSS
 * scoped under the .aj-page wrapper, so this drops into any React project
 * (Next.js, Vite, CRA) without a Tailwind config or extra setup.
 *
 * Before shipping to production:
 *  - Swap CONTACT_EMAIL for a real inbox.
 *  - Swap the Unsplash URLs in HERO_IMAGE / CATEGORIES for licensed,
 *    on-brand photography.
 *  - This page intentionally has no purchase flow — it is a showcase
 *    that routes every action to "request a catalogue" / "start an
 *    enquiry" rather than a cart or checkout.
 */

const CONTACT_EMAIL = " ";

const HERO_IMAGE = {
  src: "https://images.unsplash.com/photo-1671749999622-4087a86868cc?q=80&w=1400&auto=format&fit=crop",
  alt: "Black gift box with a red ribbon, premium corporate gift packaging",
};

type Category = {
  code: string;
  title: string;
  desc: string;
  spec: string;
  img: string;
  alt: string;
};

const CATEGORIES: Category[] = [
  {
    code: "REF.EG—01",
    title: "Executive Gifting",
    desc: "Leather goods, premium pens, and desk accessories for leadership gifting and client appreciation.",
    spec: "FULL-GRAIN LEATHER, DEBOSSED LOGO",
    img: "https://images.unsplash.com/photo-1677064061401-f77f966ff8a1?q=80&w=1200&auto=format&fit=crop",
    alt: "Leather notebook with a pen, a premium executive gift set",
  },
  {
    code: "REF.OK—02",
    title: "Onboarding Kits",
    desc: "Welcome kits that make day one count — apparel, notebooks, and essentials, kitted and boxed.",
    spec: "KITTED & BOXED, READY TO SHIP",
    img: "https://images.unsplash.com/photo-1674620213535-9b2a2553ef40?q=80&w=1200&auto=format&fit=crop",
    alt: "Two gift boxes with gold ribbons, corporate onboarding kit packaging",
  },
  {
    code: "REF.FH—03",
    title: "Festive Hampers",
    desc: "Curated gourmet hampers for festive and year-end gifting, scaled across offices and cities.",
    spec: "SEASONAL CURATION, GIFT-WRAPPED",
    img: "https://images.unsplash.com/photo-1773450970981-793e2d72d820?q=80&w=1200&auto=format&fit=crop",
    alt: "Gourmet gift box with assorted treats and fruit, a festive corporate hamper",
  },
  {
    code: "REF.EM—04",
    title: "Event & Conference Merch",
    desc: "Branded merchandise for conferences, launches, and team events — totes, drinkware, and apparel.",
    spec: "SCREEN PRINT OR EMBROIDERY",
    img: "https://images.unsplash.com/photo-1548863227-3af567fc3b27?q=80&w=1200&auto=format&fit=crop",
    alt: "Plain canvas tote bag, corporate event merchandise",
  },
];

type Benefit = { num: string; title: string; desc: string };

const BENEFITS: Benefit[] = [
  {
    num: "01",
    title: "Customization",
    desc: "Brand colors, logo placement, packaging, and insert cards — specified end to end, not bolted on after the fact.",
  },
  {
    num: "02",
    title: "Bulk Capacity",
    desc: "Single production runs from 250 to 50,000+ units, with consistent quality across the full batch.",
  },
  {
    num: "03",
    title: "Quality Control",
    desc: "Every order is sample-approved before production starts, and batch-inspected before it ships.",
  },
  {
    num: "04",
    title: "Delivery Network",
    desc: "Pan-India logistics with fixed delivery windows, tracked door-to-door to every office on the list.",
  },
];

type Testimonial = { quote: string; name: string; title: string; segment: string };

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The customization process felt like working with an in-house team, not a vendor. Every detail matched our brand guidelines on the first pass.",
    name: "R. Kapoor",
    title: "Head of Employee Experience",
    segment: "Financial Services — 1,200+ employees",
  },
  {
    quote:
      "We needed four thousand onboarding kits delivered across six cities in eleven days. Ajanta delivered on day ten.",
    name: "S. Iyer",
    title: "VP, People Operations",
    segment: "Technology — 3,000+ employees",
  },
  {
    quote:
      "Quality control is the part most vendors skip. Ajanta sent approval samples before a single unit went into production.",
    name: "N. Shah",
    title: "Procurement Lead",
    segment: "Manufacturing — 600+ employees",
  },
];

const NAV_LINKS = [
  { id: "categories", label: "Categories" },
  { id: "capabilities", label: "Capabilities" },
  { id: "clients", label: "Clients" },
  { id: "enquire", label: "Enquire" },
];

/** Reveals children on scroll into view; respects prefers-reduced-motion. */
function useInView<T extends HTMLElement>(threshold = 0.16) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`aj-reveal ${inView ? "is-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

function FramedImage({
  src,
  alt,
  code,
  spec,
}: {
  src: string;
  alt: string;
  code: string;
  spec: string;
}) {
  return (
    <div className="aj-frame">
      <div className="aj-frame__media">
        <img src={src} alt={alt} loading="lazy" />
        <span className="aj-frame__code">{code}</span>
        <span className="aj-frame__corner aj-frame__corner--tl" aria-hidden="true" />
        <span className="aj-frame__corner aj-frame__corner--tr" aria-hidden="true" />
        <span className="aj-frame__corner aj-frame__corner--bl" aria-hidden="true" />
        <span className="aj-frame__corner aj-frame__corner--br" aria-hidden="true" />
      </div>
      <p className="aj-frame__spec">
        <span className="aj-frame__spec-label">SPEC —</span> {spec}
      </p>
    </div>
  );
}

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

.aj-page {
  --ink: #0E0E0E;
  --paper: #F6F5F2;
  --bone: #ECEAE4;
  --charcoal: #1B1B1A;
  --stone: #6B6862;
  --line: #D6D2C8;
  --nav-h: 80px;
  --maxw: 1280px;
  --pad: clamp(20px, 5vw, 64px);

  background: var(--paper);
  color: var(--ink);
  font-family: 'Inter', system-ui, sans-serif;
  position: relative;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

.aj-page * { box-sizing: border-box; }
.aj-page a { color: inherit; text-decoration: none; }
.aj-page button { font: inherit; color: inherit; background: none; border: none; cursor: pointer; padding: 0; }
.aj-page img { max-width: 100%; display: block; }
.aj-page p { margin: 0; }

.aj-page a:focus-visible,
.aj-page button:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 3px;
}

.aj-container {
  max-width: var(--maxw);
  margin: 0 auto;
  padding-left: var(--pad);
  padding-right: var(--pad);
}

/* Typography */
.aj-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--stone);
  margin: 0 0 18px;
}
.aj-eyebrow--inverse { color: rgba(246,245,242,0.62); }

.aj-h1 {
  font-family: 'Big Shoulders Display', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  font-size: clamp(48px, 9.5vw, 124px);
  line-height: 0.94;
  letter-spacing: -0.01em;
  margin: 0 0 28px;
}

.aj-h2 {
  font-family: 'Big Shoulders Display', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  font-size: clamp(32px, 5.4vw, 64px);
  line-height: 1.02;
  letter-spacing: -0.005em;
  margin: 0 0 20px;
  max-width: 14ch;
}
.aj-h2--inverse { color: var(--paper); }

.aj-lead {
  font-size: clamp(16px, 1.6vw, 18px);
  line-height: 1.65;
  color: var(--ink);
  max-width: 460px;
  margin: 0 0 32px;
}
.aj-lead--tight { max-width: 560px; margin-bottom: 0; }
.aj-lead--inverse { color: rgba(246,245,242,0.82); }

/* Edge blur (top/bottom fade) */
.aj-edge {
  position: fixed;
  left: 0; right: 0;
  height: 110px;
  pointer-events: none;
  z-index: 40;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}
.aj-edge--top {
  top: 0;
  background: linear-gradient(to bottom, rgba(246,245,242,0.7), rgba(246,245,242,0));
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, transparent 100%);
  mask-image: linear-gradient(to bottom, #000 0%, transparent 100%);
}
.aj-edge--bottom {
  bottom: 0;
  background: linear-gradient(to top, rgba(246,245,242,0.7), rgba(246,245,242,0));
  -webkit-mask-image: linear-gradient(to top, #000 0%, transparent 100%);
  mask-image: linear-gradient(to top, #000 0%, transparent 100%);
}

/* Nav */
.aj-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  height: var(--nav-h);
  display: flex;
  align-items: center;
  background: rgba(246,245,242,0.86);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}
.aj-nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 24px;
}
.aj-nav__brand { display: flex; flex-direction: column; line-height: 1; gap: 4px; }
.aj-nav__mark {
  font-family: 'Big Shoulders Display', sans-serif;
  font-weight: 800;
  font-size: 26px;
  letter-spacing: 0.01em;
}
.aj-nav__tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.16em;
  color: var(--stone);
}
.aj-nav__links { display: none; gap: 32px; }
.aj-nav__link {
  position: relative;
  font-size: 14px;
  font-weight: 500;
  padding-bottom: 4px;
}
.aj-nav__link::after {
  content: '';
  position: absolute; left: 0; bottom: 0;
  width: 0; height: 2px;
  background: var(--ink);
  transition: width .3s ease;
}
.aj-nav__link:hover::after { width: 100%; }
.aj-nav__cta { display: none; }
.aj-burger {
  display: flex; flex-direction: column; justify-content: center; gap: 5px;
  width: 32px; height: 32px;
}
.aj-burger span {
  display: block; height: 2px; width: 100%; background: var(--ink);
  transition: transform .3s ease, opacity .3s ease;
}
.aj-burger.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.aj-burger.is-open span:nth-child(2) { opacity: 0; }
.aj-burger.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (min-width: 900px) {
  .aj-nav__links { display: flex; }
  .aj-nav__cta { display: inline-flex; }
  .aj-burger { display: none; }
}

/* Mobile menu */
.aj-mobile-menu {
  position: fixed; inset: 0; z-index: 110;
  background: var(--ink);
  display: flex; flex-direction: column; justify-content: center; gap: 40px;
  padding: 0 var(--pad);
  transform: translateY(-100%);
  transition: transform .4s ease;
}
.aj-mobile-menu.is-open { transform: translateY(0); }
.aj-mobile-menu nav { display: flex; flex-direction: column; gap: 18px; }
.aj-mobile-menu__link {
  font-family: 'Big Shoulders Display', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 40px;
  color: var(--paper);
  line-height: 1;
}

@media (min-width: 900px) {
  .aj-mobile-menu { display: none; }
}

/* Badge */
.aj-badge {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; letter-spacing: .1em;
  border: 1px solid var(--line);
  padding: 7px 12px;
  margin-bottom: 28px;
}
.aj-badge__dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--ink);
  animation: aj-pulse 2.2s ease-in-out infinite;
}
@keyframes aj-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .25; } }

/* Hero */
.aj-hero {
  position: relative;
  padding-top: calc(var(--nav-h) + clamp(40px, 8vw, 90px));
  padding-bottom: clamp(60px, 9vw, 110px);
  overflow: hidden;
}
.aj-hero__grid {
  position: absolute; inset: 0;
  max-width: var(--maxw);
  margin: 0 auto;
  background-image: repeating-linear-gradient(to right, transparent 0, transparent calc(100%/12 - 1px), rgba(14,14,14,0.05) calc(100%/12 - 1px), rgba(14,14,14,0.05) calc(100%/12));
  display: none;
}
@media (min-width: 768px) { .aj-hero__grid { display: block; } }

.aj-hero__inner {
  display: grid;
  gap: 48px;
  position: relative;
}
.aj-scroll-cue {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; letter-spacing: .12em;
  color: var(--stone);
}
.aj-scroll-cue__line { width: 1px; height: 28px; background: var(--ink); animation: aj-scroll 1.8s ease-in-out infinite; }
@keyframes aj-scroll { 0%, 100% { transform: scaleY(1); opacity: 1; } 50% { transform: scaleY(.4); opacity: .4; } }

@media (min-width: 1000px) {
  .aj-hero__inner { grid-template-columns: 1.1fr 0.9fr; align-items: center; }
}

/* Framed image (signature element) */
.aj-frame__media {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: var(--bone);
}
.aj-frame__media img {
  width: 100%; height: 100%; object-fit: cover;
  filter: grayscale(1) contrast(1.05);
  transition: transform .6s ease;
}
.aj-frame__corner { position: absolute; width: 22px; height: 22px; transition: transform .35s ease; }
.aj-frame__corner--tl { top: 0; left: 0; border-top: 2px solid var(--ink); border-left: 2px solid var(--ink); }
.aj-frame__corner--tr { top: 0; right: 0; border-top: 2px solid var(--ink); border-right: 2px solid var(--ink); }
.aj-frame__corner--bl { bottom: 0; left: 0; border-bottom: 2px solid var(--ink); border-left: 2px solid var(--ink); }
.aj-frame__corner--br { bottom: 0; right: 0; border-bottom: 2px solid var(--ink); border-right: 2px solid var(--ink); }

.aj-frame__code {
  position: absolute; left: 14px; bottom: 14px;
  background: var(--paper);
  color: var(--ink);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; letter-spacing: .06em;
  padding: 4px 8px;
}
.aj-frame__spec {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; letter-spacing: .04em;
  color: var(--stone);
  margin: 14px 0 0;
}
.aj-frame__spec-label { color: var(--ink); }

.aj-cat-card:hover .aj-frame__media img { transform: scale(1.045); }
.aj-cat-card:hover .aj-frame__corner--tl { transform: translate(-4px,-4px); }
.aj-cat-card:hover .aj-frame__corner--tr { transform: translate(4px,-4px); }
.aj-cat-card:hover .aj-frame__corner--bl { transform: translate(-4px,4px); }
.aj-cat-card:hover .aj-frame__corner--br { transform: translate(4px,4px); }

/* Sections */
.aj-section { padding: clamp(64px, 10vw, 130px) 0; }
.aj-section--bone { background: var(--bone); }
.aj-section__head { max-width: 640px; margin-bottom: 56px; }

/* Categories grid */
.aj-cat-grid {
  display: grid; gap: 48px 32px;
  grid-template-columns: 1fr;
}
@media (min-width: 700px) {
  .aj-cat-grid { grid-template-columns: repeat(2, 1fr); }
}
.aj-cat-card { transition: transform .3s ease, box-shadow .3s ease; }
.aj-cat-card:hover { transform: translate(-4px,-4px); box-shadow: 8px 8px 0 var(--ink); }
.aj-cat-card__title {
  font-family: 'Big Shoulders Display', sans-serif;
  font-weight: 700; text-transform: uppercase;
  font-size: 24px;
  margin: 20px 0 10px;
}
.aj-cat-card__desc { font-size: 15px; line-height: 1.6; color: var(--ink); max-width: 38ch; margin: 0; }

/* Dossier (benefits) */
.aj-dossier { border-top: 1px solid var(--line); }
.aj-dossier__row {
  display: grid; gap: 12px;
  padding: 28px 0;
  border-bottom: 1px solid var(--line);
}
@media (min-width: 760px) {
  .aj-dossier__row { grid-template-columns: 280px 1fr; align-items: start; gap: 32px; }
}
.aj-dossier__label { display: flex; align-items: baseline; gap: 14px; }
.aj-dossier__num { font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--stone); }
.aj-dossier__title {
  font-family: 'Big Shoulders Display', sans-serif;
  font-weight: 700; text-transform: uppercase; font-size: 20px;
}
.aj-dossier__desc { font-size: 15px; line-height: 1.65; color: var(--ink); max-width: 56ch; margin: 0; }

/* Testimonials */
.aj-testi-grid { display: grid; gap: 28px; grid-template-columns: 1fr; }
@media (min-width: 760px) { .aj-testi-grid { grid-template-columns: repeat(auto-fit, minmax(260px,1fr)); } }
.aj-testi-card {
  border: 1px solid var(--line);
  padding: 32px 28px;
  background: var(--paper);
  transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease;
}
.aj-testi-card:hover { transform: translate(-4px,-4px); box-shadow: 8px 8px 0 var(--ink); border-color: var(--ink); }
.aj-testi-card__mark {
  font-family: 'Big Shoulders Display', sans-serif;
  font-size: 48px; line-height: 1; display: block; margin-bottom: 8px; color: var(--ink);
}
.aj-testi-card__quote { font-size: 16px; line-height: 1.6; margin: 0 0 24px; }
.aj-testi-card__divider { width: 32px; height: 2px; background: var(--ink); margin-bottom: 16px; }
.aj-testi-card__name { font-weight: 600; font-size: 14px; margin: 0; }
.aj-testi-card__segment {
  font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--stone); margin: 4px 0 0;
}

/* CTA */
.aj-cta { background: var(--ink); padding: clamp(70px,11vw,140px) 0; }
.aj-cta__actions { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 24px; }
.aj-cta__footnote {
  font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: .1em; color: rgba(246,245,242,0.55); margin: 0;
}

/* Buttons */
.aj-btn {
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 600;
  padding: 15px 26px;
  border: 2px solid var(--ink);
  transition: background .25s ease, color .25s ease;
}
.aj-btn--sm { padding: 10px 18px; font-size: 13px; }
.aj-btn--primary { background: var(--ink); color: var(--paper); }
.aj-btn--primary:hover { background: var(--paper); color: var(--ink); }
.aj-btn--secondary { background: var(--paper); color: var(--ink); }
.aj-btn--secondary:hover { background: var(--ink); color: var(--paper); }
.aj-btn--inverse { border-color: var(--paper); }
.aj-btn--inverse.aj-btn--primary { background: var(--paper); color: var(--ink); }
.aj-btn--inverse.aj-btn--primary:hover { background: transparent; color: var(--paper); }
.aj-btn--inverse.aj-btn--secondary { background: transparent; color: var(--paper); }
.aj-btn--inverse.aj-btn--secondary:hover { background: var(--paper); color: var(--ink); }

/* Footer */
.aj-footer { background: var(--charcoal); color: var(--paper); padding: 64px 0 0; }
.aj-footer__inner {
  display: grid; gap: 48px;
  padding-bottom: 56px;
  border-bottom: 1px solid rgba(246,245,242,0.15);
}
@media (min-width: 760px) { .aj-footer__inner { grid-template-columns: 1.4fr 1fr 1fr; } }
.aj-footer__mark { color: var(--paper); }
.aj-footer__copy { font-size: 14px; color: rgba(246,245,242,0.62); max-width: 34ch; margin-top: 14px; }
.aj-footer__heading { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: .12em; color: rgba(246,245,242,0.5); margin: 0 0 16px; }
.aj-footer__link { display: block; font-size: 14px; margin-bottom: 10px; color: rgba(246,245,242,0.85); }
.aj-footer__link:hover { color: var(--paper); }
.aj-footer__bottom {
  display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px;
  font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .08em;
  color: rgba(246,245,242,0.45);
  padding: 22px 0;
}

/* Reveal */
.aj-reveal { opacity: 0; transform: translateY(18px); transition: opacity .7s ease, transform .7s ease; }
.aj-reveal.is-in { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  .aj-reveal { transition: none; opacity: 1; transform: none; }
  .aj-badge__dot, .aj-scroll-cue__line { animation: none; }
}
`;

export default function AjantaLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const goTo = useCallback(
    (id: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      setMenuOpen(false);
      const el = document.getElementById(id);
      if (!el) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    },
    []
  );

  const goTop = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="aj-page">
      <style>{STYLES}</style>

      <div className="aj-edge aj-edge--top" aria-hidden="true" />
      <div className="aj-edge aj-edge--bottom" aria-hidden="true" />

      <header className="aj-nav">
        <div className="aj-container aj-nav__inner">
          <a href="#top" className="aj-nav__brand" onClick={goTop}>
            <span className="aj-nav__mark">AJANTA</span>
            <span className="aj-nav__tag">CORPORATE GIFTING</span>
          </a>

          <nav className="aj-nav__links" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={goTo(l.id)} className="aj-nav__link">
                {l.label}
              </a>
            ))}
          </nav>

          <a
            className="aj-btn aj-btn--sm aj-btn--primary aj-nav__cta"
            href={`mailto:${CONTACT_EMAIL}?subject=Catalogue%20Request`}
          >
            Request Catalogue
          </a>

          <button
            className={`aj-burger ${menuOpen ? "is-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`aj-mobile-menu ${menuOpen ? "is-open" : ""}`}>
        <nav aria-label="Mobile">
          {NAV_LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={goTo(l.id)} className="aj-mobile-menu__link">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          className="aj-btn aj-btn--primary"
          href={`mailto:${CONTACT_EMAIL}?subject=Catalogue%20Request`}
          onClick={() => setMenuOpen(false)}
        >
          Request Catalogue
        </a>
      </div>

      <main id="top">
        {/* HERO */}
        <section className="aj-hero">
          <div className="aj-hero__grid" aria-hidden="true" />
          <div className="aj-container aj-hero__inner">
            <Reveal className="aj-hero__copy">
              <div className="aj-badge">
                <span className="aj-badge__dot" />
                OPEN FOR Q3 ENQUIRIES
              </div>
              <p className="aj-eyebrow">AJANTA — CORPORATE GIFTING</p>
              <h1 className="aj-h1">
                GIFTING,
                <br />
                BUILT TO SPEC.
              </h1>
              <p className="aj-lead">
                We design, customize, and produce corporate gifts at scale —
                onboarding kits, festive hampers, executive sets, and event
                merchandise — specified, sampled, and delivered like a
                production line.
              </p>
              <a href="#categories" onClick={goTo("categories")} className="aj-scroll-cue">
                <span className="aj-scroll-cue__line" />
                SCROLL — CATEGORIES
              </a>
            </Reveal>

            <Reveal className="aj-hero__media" delay={120}>
              <FramedImage
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                code="FIG.00"
                spec="RIGID BOX, MATTE FINISH"
              />
            </Reveal>
          </div>
        </section>

        {/* CATEGORIES */}
        <section id="categories" className="aj-section aj-section--bone">
          <div className="aj-container">
            <Reveal className="aj-section__head">
              <p className="aj-eyebrow">WHAT WE PRODUCE</p>
              <h2 className="aj-h2">FOUR WAYS TO GIFT WELL.</h2>
              <p className="aj-lead aj-lead--tight">
                Each category is built to its own brief — every one ships
                sample-approved, on schedule, and on-brand.
              </p>
            </Reveal>

            <div className="aj-cat-grid">
              {CATEGORIES.map((c, i) => (
                <Reveal key={c.code} className="aj-cat-card" delay={i * 80}>
                  <FramedImage src={c.img} alt={c.alt} code={c.code} spec={c.spec} />
                  <h3 className="aj-cat-card__title">{c.title}</h3>
                  <p className="aj-cat-card__desc">{c.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section id="capabilities" className="aj-section">
          <div className="aj-container">
            <Reveal className="aj-section__head">
              <p className="aj-eyebrow">HOW WE OPERATE</p>
              <h2 className="aj-h2">FOUR COMMITMENTS, NO EXCEPTIONS.</h2>
            </Reveal>

            <div className="aj-dossier">
              {BENEFITS.map((b, i) => (
                <Reveal key={b.num} className="aj-dossier__row" delay={i * 70}>
                  <div className="aj-dossier__label">
                    <span className="aj-dossier__num">{b.num}</span>
                    <span className="aj-dossier__title">{b.title}</span>
                  </div>
                  <p className="aj-dossier__desc">{b.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CLIENTS */}
        <section id="clients" className="aj-section aj-section--bone">
          <div className="aj-container">
            <Reveal className="aj-section__head">
              <p className="aj-eyebrow">CLIENT FILE</p>
              <h2 className="aj-h2">ON THE RECORD.</h2>
            </Reveal>

            <div className="aj-testi-grid">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.name} className="aj-testi-card" delay={i * 90}>
                  <span className="aj-testi-card__mark" aria-hidden="true">
                    &ldquo;
                  </span>
                  <p className="aj-testi-card__quote">{t.quote}</p>
                  <div className="aj-testi-card__divider" />
                  <p className="aj-testi-card__name">
                    {t.name}, {t.title}
                  </p>
                  <p className="aj-testi-card__segment">{t.segment}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="enquire" className="aj-cta">
          <div className="aj-container">
            <Reveal>
              <p className="aj-eyebrow aj-eyebrow--inverse">GET IN TOUCH</p>
              <h2 className="aj-h2 aj-h2--inverse">
                LET'S PUT IT INTO
                <br />
                PRODUCTION.
              </h2>
              <p className="aj-lead aj-lead--inverse">
                Request our catalogue or start a conversation with our
                gifting team. No order minimums to discuss — just bring
                your brief.
              </p>
              <div className="aj-cta__actions">
                <a
                  className="aj-btn aj-btn--primary aj-btn--inverse"
                  href={`mailto:${CONTACT_EMAIL}?subject=Catalogue%20Request`}
                >
                  Request the Catalogue
                </a>
                <a
                  className="aj-btn aj-btn--secondary aj-btn--inverse"
                  href={`mailto:${CONTACT_EMAIL}?subject=Business%20Enquiry`}
                >
                  Start an Enquiry
                </a>
              </div>
              <p className="aj-cta__footnote">RESPONSE WITHIN 1 BUSINESS DAY</p>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="aj-footer">
        <div className="aj-container aj-footer__inner">
          <div className="aj-footer__brand">
            <span className="aj-nav__mark aj-footer__mark">AJANTA</span>
            <p className="aj-footer__copy">
              Corporate gifting, built to spec. Pan-India production,
              nationwide delivery.
            </p>
          </div>

          <div className="aj-footer__col">
            <p className="aj-footer__heading">SITE</p>
            {NAV_LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={goTo(l.id)} className="aj-footer__link">
                {l.label}
              </a>
            ))}
          </div>

          <div className="aj-footer__col">
            <p className="aj-footer__heading">CONTACT</p>
            <a className="aj-footer__link" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            <a
              className="aj-footer__link"
              href={`mailto:${CONTACT_EMAIL}?subject=Catalogue%20Request`}
            >
              Request the catalogue ↗
            </a>
          </div>
        </div>

        <div className="aj-container aj-footer__bottom">
          <p>© 2026 AJANTA. ALL RIGHTS RESERVED.</p>
          <p>DISPLAY CATALOGUE — NOT AN ONLINE STORE.</p>
        </div>
      </footer>
    </div>
  );
}