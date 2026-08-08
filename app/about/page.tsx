'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import SpinningLogo from '../components/SpinningLogo';

// ── CONTACT ── (kept identical to the main page for consistency)
const WHATSAPP_NUMBER = "919821015919";
const CONTACT_EMAIL = "sales@ajantainternational.com";

const ADDRESS_LINE_1 = "Ajanta International";
const ADDRESS_LINE_2 = "Mumbai, Maharashtra, India";

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.229197387829!2d72.82774309999999!3d18.9886952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce5dbaaaaaab%3A0xd1479dfd1c72351!2sAJANTA%20INTERNATIONAL!5e1!3m2!1sen!2sin!4v1784445540356!5m2!1sen!2sin";

function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const CATALOGUE_MESSAGE =
  "Hi Ajanta, I'd like to request your corporate gifting catalogue.";
const ENQUIRY_MESSAGE =
  "Hi Ajanta, I'd like to start a corporate gifting enquiry.";

// ── LOGO ── (same asset/path as the main page)
const MAIN_LOGO = "/Mainlogo.png";

const ABOUT_STORY = `Ajanta International, is a 62+ year old market leader in corporate gifting and sales promotional products. Our-state-of-the-art infrastructure, cloud-based supply chain management and special focus on quality allows us to offer unparalleled services to our valued clients and develop long lasting relationships.

Our core team comprises of highly experienced industry veterans and graduates from top universities like IIT Bombay ensuring professional working in the organization.

This brochure is an overview to the broad spectrum of Branding & Promotional products which are either imported or manufactured at our state-of-the-art production facility having an MSME & ISO 9001-15 certification.`;

const VALUES = [
  {
    num: "01",
    title: "Quality First",
    desc: "Every product undergoes rigorous quality checks before reaching our clients.",
  },
  {
    num: "02",
    title: "Customization Excellence",
    desc: "We tailor every gift to match your brand identity and gifting objectives.",
  },
  {
    num: "03",
    title: "Reliable Delivery",
    desc: "Pan-India logistics network ensures timely delivery across 500+ cities.",
  },
  {
    num: "04",
    title: "Sustainable Practices",
    desc: "We prioritize eco-friendly materials and ethical sourcing in our products.",
  },
];

// Nav links — kept identical to the main page so the navbar reads the same on every route.
// `href` items use absolute "/#id" because the home page lives at a different route;
// the home-only sections (categories, capabilities, clients, testimonials, visit, enquire)
// don't exist on /about, so the link routes back to "/" and scrolls to the matching section.
const NAV_LINKS = [
  { href: "/#categories", label: "Products" },
  { href: "/#capabilities", label: "Why Ajanta" },
  { href: "/about", label: "About Us" },
  { href: "/#clients", label: "Clients" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#visit", label: "Visit Us" },
  { href: "/#enquire", label: "Contact" },
];

function useInView(threshold = 0.14) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setInView(true); return; }
    // If the element is already in (or above) the viewport on mount,
    // reveal it immediately — otherwise mobile users landing deep-linked
    // or with a short page see a blank section until they scroll.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setInView(true); return; }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
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
  const { ref, inView } = useInView();
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

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Inter:wght@300;400;500;600&display=swap');

/* ── TOKENS ── */
.aj-page {
  --blue:        #1A4FD6;
  --blue-hover:  #1340B8;
  --ink:         #111;
  --white:       #fff;
  --off-white:   #FAFAFA;
  --grey-50:     #F5F5F5;
  --grey-100:    #EBEBEB;
  --grey-300:    #C8C8C8;
  --grey-500:    #888;
  --grey-700:    #444;
  --line:        #E2E2E2;
  --on-dark-mute: rgba(255,255,255,0.45);
  --on-dark-line: rgba(255,255,255,0.10);
  --on-dark-link: rgba(255,255,255,0.65);
  --nav-h:       72px;
  --maxw:        1240px;
  --pad:         clamp(20px, 5vw, 60px);
  --radius-btn:  8px;
  background:    var(--white);
  color:         var(--ink);
  font-family:   'Inter', system-ui, sans-serif;
  overflow-x:    hidden;
  -webkit-font-smoothing: antialiased;
}

.aj-page * { box-sizing: border-box; }
.aj-page a  { text-decoration: none; }
.aj-page button { font: inherit; color: inherit; background: none; border: none; cursor: pointer; padding: 0; }
.aj-page img { max-width: 100%; display: block; }
.aj-page p   { margin: 0; }
.aj-page a:focus-visible,
.aj-page button:focus-visible { outline: 2px solid var(--blue); outline-offset: 3px; }

.aj-container {
  max-width:     var(--maxw);
  margin:        0 auto;
  padding-left:  var(--pad);
  padding-right: var(--pad);
}

/* ── TYPE ── */
.aj-overline {
  font-size:      11px;
  font-weight:    600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color:          var(--grey-500);
  margin:         0 0 14px;
  display:        block;
}
.aj-overline--blue  { color: var(--blue); }
.aj-overline--white { color: var(--on-dark-mute); }

.aj-h1 {
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-weight: 800;
  font-size:   clamp(40px, 6.5vw, 80px);
  line-height: 1.06;
  letter-spacing: -0.03em;
  margin:      0 0 24px;
  color:       var(--ink);
}

.aj-h2 {
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-weight: 800;
  font-size:   clamp(28px, 3.8vw, 48px);
  line-height: 1.12;
  letter-spacing: -0.025em;
  margin:      0 0 16px;
  color:       var(--ink);
}
.aj-h2--white { color: var(--white); }

.aj-h3 {
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-weight: 700;
  font-size:   clamp(17px, 1.6vw, 20px);
  line-height: 1.35;
  margin:      0 0 10px;
  color:       var(--ink);
}

.aj-lead {
  font-size:   clamp(15px, 1.4vw, 17px);
  line-height: 1.75;
  color:       var(--grey-700);
  max-width:   480px;
  font-weight: 400;
  margin:      0 0 32px;
  white-space: pre-line;
}
.aj-lead--wide    { max-width: 560px; }
.aj-lead--white   { color: rgba(255,255,255,0.75); }
.aj-lead--nobottom { margin-bottom: 0; }

/* ── NAV ── */
.aj-nav {
  position:   fixed;
  top: 0; left: 0; right: 0;
  z-index:    100;
  height:     var(--nav-h);
  display:    flex;
  align-items: center;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--line);
  transition: background .3s ease, border-color .3s ease;
}
.aj-nav.is-menu-open {
  background:     transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border-bottom-color: transparent;
}
.aj-nav__inner {
  display:         flex;
  align-items:     center;
  justify-content: space-between;
  width:           100%;
  gap:             20px;
}
.aj-nav__brand {
  display:        flex;
  align-items:    center;
}
.aj-nav__logo-img {
  height:      36px;
  width:       auto;
  object-fit:  contain;
  display:     block;
}
.aj-nav__links { display: none; gap: 32px; align-items: center; }
.aj-nav__link {
  font-size:   13px;
  font-weight: 500;
  color:       var(--grey-700);
  transition:  color .2s, border-color .2s;
  padding-bottom: 2px;
  border-bottom: 1.5px solid transparent;
}
.aj-nav__link:hover { color: var(--blue); border-bottom-color: var(--blue); }
.aj-nav__cta { display: none; }

/* Burger */
.aj-burger {
  display:         flex;
  flex-direction:  column;
  justify-content: center;
  gap:             5px;
  width:           36px;
  height:          36px;
  padding:         4px;
  z-index:         200;
  position:        relative;
}
.aj-burger span {
  display:       block;
  height:        1.5px;
  width:         100%;
  background:    var(--ink);
  border-radius: 1px;
  transition:    transform .3s ease, opacity .3s ease, background .3s ease;
}
.aj-burger.is-open {
  opacity:        0;
  pointer-events: none;
}
.aj-burger.is-open span { background: var(--white); }
.aj-burger.is-open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.aj-burger.is-open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.aj-burger.is-open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

@media (min-width: 900px) {
  .aj-nav__links { display: flex; }
  .aj-nav__cta   { display: inline-flex; }
  .aj-burger     { display: none; }
}

/* ── MOBILE MENU ── */
.aj-mobile-menu {
  position:       fixed;
  inset:          0;
  z-index:        150;
  background:     var(--ink);
  display:        flex;
  flex-direction: column;
  justify-content: center;
  gap:            48px;
  padding:        0 var(--pad);
  visibility:     hidden;
  opacity:        0;
  pointer-events: none;
  transition:     opacity .3s ease, visibility .3s ease;
}
.aj-mobile-menu.is-open {
  visibility:     visible;
  opacity:        1;
  pointer-events: all;
}
.aj-mobile-menu__top {
  position:        absolute;
  top:             0;
  right:          0;
  height:          var(--nav-h);
  width:           var(--nav-h);
  display:         flex;
  align-items:     center;
  justify-content: center;
}
/* Specificity (0,2,0) beats the .aj-page button reset (0,1,1)
   so the X stroke renders white on the dark mobile menu, not the
   inherited page ink colour. */
.aj-page .aj-mobile-menu__close {
  width:           40px;
  height:          40px;
  display:         flex;
  align-items:     center;
  justify-content: center;
  color:           var(--white);
  transition:      color .2s, transform .2s;
}
.aj-page .aj-mobile-menu__close:hover { color: var(--blue); transform: rotate(90deg); }
.aj-mobile-menu__close svg { width: 24px; height: 24px; stroke: var(--white); }
.aj-mobile-menu nav { display: flex; flex-direction: column; gap: 0; }
.aj-mobile-menu__link {
  font-family:    'Bricolage Grotesque', system-ui, sans-serif;
  font-weight:    800;
  font-size:      clamp(30px, 9vw, 46px);
  color:          var(--white);
  line-height:    1.2;
  padding:        12px 0;
  border-bottom:  1px solid var(--on-dark-line);
  transition:     color .2s;
}
.aj-mobile-menu__link:first-child { border-top: 1px solid var(--on-dark-line); }
.aj-mobile-menu__link:hover { color: var(--blue); }

@media (min-width: 900px) {
  .aj-mobile-menu { display: none !important; }
  .aj-burger       { display: none !important; }
}

/* ── HERO ── */
.aj-hero {
  padding-top:    calc(var(--nav-h) + clamp(48px, 8vw, 96px));
  padding-bottom: clamp(64px, 9vw, 112px);
  background:     var(--white);
}
.aj-hero__inner {
  display: grid;
  gap:     56px;
}
@media (min-width: 960px) {
  .aj-hero__inner { grid-template-columns: 1.1fr 0.9fr; align-items: center; }
}
.aj-hero__rule {
  width:      56px;
  height:     2px;
  background: var(--blue);
  margin:     0 0 24px;
  border:     none;
}
.aj-hero__actions {
  display:        flex;
  flex-wrap:      wrap;
  gap:            14px;
  margin-top:     24px;
  margin-bottom:  0;
}

/* Hero image */
.aj-hero__img-wrap {
  position:     relative;
  width:        100%;
  aspect-ratio: 4/3;
  overflow:     hidden;
  max-width:    480px;
  margin:       0 auto;
}
@media (min-width: 960px) {
  .aj-hero__img-wrap {
    aspect-ratio: 4/5;
    max-width:    none;
    margin:       0;
  }
}
.aj-hero__img-border {
  position:    absolute;
  inset:       -8px;
  border:      1px solid var(--line);
  pointer-events: none;
}

/* ── STATS ── */
.aj-stats {
  background:    var(--grey-50);
  border-top:    1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding:       40px 0;
}
.aj-stats__grid {
  display:               grid;
  gap:                   1px;
  grid-template-columns: repeat(2, 1fr);
  background:            var(--line);
  border:                1px solid var(--line);
}
@media (min-width: 640px) { .aj-stats__grid { grid-template-columns: repeat(4, 1fr); } }
.aj-stat {
  background: var(--grey-50);
  padding:    28px 32px;
  text-align: center;
}
.aj-stat__num {
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-weight: 800;
  font-size:   clamp(28px, 4vw, 42px);
  color:       var(--ink);
  line-height: 1;
}
.aj-stat__label {
  font-size:      11px;
  font-weight:    500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color:          var(--grey-500);
  margin-top:     6px;
}

/* ── SECTIONS ── */
.aj-section { padding: clamp(64px, 9vw, 112px) 0; }
.aj-section--off { background: var(--off-white); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.aj-section--dark { background: var(--ink); }
.aj-section__head { margin-bottom: 52px; }
.aj-section__head--center { text-align: center; }
.aj-section__head--center .aj-lead { margin-left: auto; margin-right: auto; }

/* ── DIVIDER ── */
.aj-section__divider {
  width:      40px;
  height:     2px;
  background: var(--blue);
  border:     none;
  margin:     0 0 20px;
  display:    block;
}
.aj-section__divider--center { margin-left: auto; margin-right: auto; }

/* ── VALUES (dossier) ── */
.aj-dossier { border-top: 1px solid var(--line); }
.aj-dossier__row {
  display:        grid;
  gap:            12px;
  padding:        32px 0;
  border-bottom:  1px solid var(--line);
  align-items:    start;
}
@media (min-width: 760px) {
  .aj-dossier__row { grid-template-columns: 240px 1fr; gap: 40px; }
}
.aj-dossier__label { display: flex; align-items: baseline; gap: 14px; }
.aj-dossier__num {
  font-size:   13px;
  font-weight: 600;
  color:       var(--blue);
  min-width:   28px;
}
.aj-dossier__title {
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-weight: 700;
  font-size:   18px;
  color:       var(--ink);
}
.aj-dossier__desc { font-size: 15px; line-height: 1.75; color: var(--grey-700); max-width: 54ch; margin: 0; }

/* ── BUTTONS ── */
.aj-btn {
  display:         inline-flex;
  align-items:     center;
  justify-content: center;
  gap:             8px;
  font-size:       13px;
  font-weight:     600;
  letter-spacing:  0.04em;
  padding:         14px 28px;
  border:          1.5px solid transparent;
  border-radius:   var(--radius-btn);
  transition:      background .2s, color .2s, border-color .2s;
  cursor:          pointer;
  white-space:     nowrap;
}
.aj-btn--sm { padding: 9px 20px; font-size: 12px; }

.aj-btn--primary   { background: var(--blue); color: var(--white); border-color: var(--blue); }
.aj-btn--primary:hover { background: var(--blue-hover); border-color: var(--blue-hover); }

.aj-btn--outline   { background: transparent; color: var(--ink); border-color: var(--ink); }
.aj-btn--outline:hover { background: var(--ink); color: var(--white); }

.aj-btn--outline-white { background: transparent; color: var(--white); border-color: rgba(255,255,255,0.4); }
.aj-btn--outline-white:hover { border-color: var(--white); background: rgba(255,255,255,0.06); }

.aj-btn--block { width: 100%; max-width: 320px; justify-content: center; }

/* ── CTA ── */
.aj-cta {
  background: var(--ink);
  padding:    clamp(72px, 10vw, 120px) 0;
}
.aj-cta__inner {
  display:   grid;
  gap:       48px;
  align-items: center;
}
@media (min-width: 900px) {
  .aj-cta__inner { grid-template-columns: 1fr 1fr; }
}
.aj-cta__rule {
  width:      40px; height: 2px;
  background: var(--blue);
  border:     none;
  margin:     0 0 20px;
  display:    block;
}
.aj-cta__right {
  display:        flex;
  flex-direction: column;
  gap:            14px;
  align-items:    flex-start;
}
@media (min-width: 900px) {
  .aj-cta__right { align-items: flex-end; }
}
.aj-cta__note {
  font-size:      11px;
  font-weight:    500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color:          rgba(255,255,255,0.35);
}

/* ── FOOTER ── */
.aj-footer {
  background:   var(--ink);
  color:        var(--white);
  padding:      56px 0 0;
  border-top:   2px solid var(--blue);
}
.aj-footer__inner {
  display:        grid;
  gap:            40px;
  padding-bottom: 48px;
  border-bottom:  1px solid var(--on-dark-line);
}
@media (min-width: 720px) { .aj-footer__inner { grid-template-columns: 1.4fr 1fr 1fr; } }

.aj-footer__logo-img {
  height:        32px;
  width:         auto;
  object-fit:    contain;
  display:       block;
  margin-bottom: 14px;
  /* Logo is assumed dark-on-transparent; invert so it reads on the dark footer. */
  filter:        brightness(0) invert(1);
}
.aj-footer__copy {
  font-size:   14px;
  line-height: 1.7;
  color:       var(--on-dark-mute);
  max-width:   30ch;
}
.aj-footer__heading {
  font-size:      11px;
  font-weight:    600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color:          rgba(255,255,255,0.4);
  margin:         0 0 16px;
}
.aj-footer__link {
  display:       block;
  font-size:     14px;
  margin-bottom: 10px;
  color:         var(--on-dark-link);
  transition:    color .2s;
}
.aj-footer__link:hover { color: var(--white); }
.aj-footer__bottom {
  display:         flex;
  flex-wrap:       wrap;
  justify-content: space-between;
  gap:             8px;
  font-size:       11px;
  font-weight:     400;
  letter-spacing:  0.06em;
  color:           rgba(255,255,255,0.25);
  padding:         20px 0;
  text-transform:  uppercase;
}

/* ── REVEAL ── */
.aj-reveal { opacity: 0; transform: translateY(16px); transition: opacity .6s ease, transform .6s ease; }
.aj-reveal.is-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .aj-reveal { transition: none; opacity: 1; transform: none; }
}
`;

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [menuOpen]);

  const goTo = useCallback(
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setMenuOpen(false);
      const el = document.getElementById(id);
      if (!el) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    },
    []
  );

  const goTop = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const renderNavLink = (l: { id?: string; href?: string; label: string }, className: string, onNavigate?: () => void) =>
    l.href ? (
      <Link key={l.label} href={l.href} className={className} onClick={onNavigate}>
        {l.label}
      </Link>
    ) : (
      <a key={l.label} href={`#${l.id}`} onClick={goTo(l.id!)} className={className}>
        {l.label}
      </a>
    );

  return (
    <div className="aj-page">
      <style>{STYLES}</style>

      {/* ── NAV ── */}
      <header className={`aj-nav ${menuOpen ? "is-menu-open" : ""}`}>
        <div className="aj-container aj-nav__inner">
          <a href="#top" className="aj-nav__brand" onClick={goTop}>
            <img className="aj-nav__logo-img" src={MAIN_LOGO} alt="Ajanta — Corporate Gifting" />
          </a>

          <nav className="aj-nav__links" aria-label="Primary">
            {NAV_LINKS.map((l) => renderNavLink(l, "aj-nav__link"))}
          </nav>

          <a
            className="aj-btn aj-btn--sm aj-btn--primary aj-nav__cta"
            href={whatsappLink(CATALOGUE_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Request Catalogue
          </a>

          <button
            className={`aj-burger ${menuOpen ? "is-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      <div
        className={`aj-mobile-menu ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMenuOpen(false);
        }}
      >
        <div className="aj-mobile-menu__top">
          <button
            type="button"
            className="aj-mobile-menu__close"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {NAV_LINKS.map((l) => renderNavLink(l, "aj-mobile-menu__link", () => setMenuOpen(false)))}
        </nav>
        <a
          className="aj-btn aj-btn--primary"
          href={whatsappLink(CATALOGUE_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
          style={{ alignSelf: "flex-start" }}
        >
          Request Catalogue
        </a>
      </div>

      <main id="top">
        {/* ── HERO ── */}
        <section className="aj-hero">
          <div className="aj-container aj-hero__inner">
            <Reveal>
              <hr className="aj-hero__rule" />
              <span className="aj-overline">Our Story</span>
              <h1 className="aj-h1">
                Our Journey in Corporate Gifting
              </h1>
              <p className="aj-lead">
                From humble beginnings to trusted partner for India's leading brands.
              </p>
              <div className="aj-hero__actions">
                <a
                  className="aj-btn aj-btn--primary"
                  href="/ajantapdf.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn Our Story
                </a>
                <a
                  className="aj-btn aj-btn--outline"
                  href={whatsappLink(CATALOGUE_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Request Catalogue
                </a>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="aj-hero__img-wrap">
                <SpinningLogo />
                <div className="aj-hero__img-border" aria-hidden="true" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── STORY ── */}
        <section id="story" className="aj-section">
          <div className="aj-container">
            <Reveal className="aj-section__head">
              <span className="aj-overline aj-overline--blue">Our Story</span>
              <h2 className="aj-h2">The Ajanta Journey</h2>
              <p className="aj-lead aj-lead--wide">
                {ABOUT_STORY}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section id="values" className="aj-section aj-section--off">
          <div className="aj-container">
            <Reveal className="aj-section__head">
              <span className="aj-overline aj-overline--blue">Our Values</span>
              <h2 className="aj-h2">What We Stand For</h2>
            </Reveal>
            <div className="aj-dossier">
              {VALUES.map((v, i) => (
                <Reveal key={v.num} className="aj-dossier__row" delay={i * 55}>
                  <div className="aj-dossier__label">
                    <span className="aj-dossier__num">{v.num}</span>
                    <span className="aj-dossier__title">{v.title}</span>
                  </div>
                  <p className="aj-dossier__desc">{v.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="enquire" className="aj-cta">
          <div className="aj-container aj-cta__inner">
            <Reveal>
              <hr className="aj-cta__rule" />
              <span className="aj-overline aj-overline--white">Get in Touch</span>
              <h2 className="aj-h2 aj-h2--white">
                Ready to Start Your Gifting Journey?
              </h2>
              <p className="aj-lead aj-lead--white aj-lead--nobottom">
                Let's create meaningful connections through thoughtful gifting.
                We'll respond within one business day.
              </p>
            </Reveal>
            <Reveal delay={100} className="aj-cta__right">
              <a
                className="aj-btn aj-btn--primary aj-btn--block"
                href={whatsappLink(CATALOGUE_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Request Catalogue
              </a>
              <a
                className="aj-btn aj-btn--outline-white aj-btn--block"
                href={whatsappLink(ENQUIRY_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Start an Enquiry
              </a>
              <p className="aj-cta__note">Response within one business day</p>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="aj-footer">
        <div className="aj-container aj-footer__inner">
          <div>
            <img className="aj-footer__logo-img" src={MAIN_LOGO} alt="Ajanta — Corporate Gifting" />
            <p className="aj-footer__copy">
              Corporate gifting, built to specification. Pan-India production and delivery.
            </p>
          </div>
          <div>
            <p className="aj-footer__heading">Navigation</p>
            {NAV_LINKS.map((l) => renderNavLink(l, "aj-footer__link"))}
          </div>
          <div>
            <p className="aj-footer__heading">Contact</p>
            <a className="aj-footer__link" href="mailto:sales@ajantainternational.com">{CONTACT_EMAIL}</a>
            <a className="aj-footer__link" href="/#visit">{ADDRESS_LINE_1}</a>
            <a className="aj-footer__link" href="/#visit">{ADDRESS_LINE_2}</a>
            <a
              className="aj-footer__link"
              href={whatsappLink(ENQUIRY_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat with us on WhatsApp →
            </a>
          </div>
        </div>
        <div className="aj-container aj-footer__bottom">
          <p>© 2026 Ajanta Corporate Gifting. All rights reserved.</p>
          <p>Enquiries only — not an online store.</p>
        </div>
      </footer>
    </div>
  );
}