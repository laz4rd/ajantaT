'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react';

const ABOUT_STORY = `Ajanta Corporate Gifting began with a simple vision: to transform corporate gifting from a transactional obligation into a meaningful relationship-building opportunity. Founded in [Year] by [Founder Name], our journey started in a small workshop where we handcrafted personalized gifts for local businesses.

What began as a passion project quickly grew as clients recognized the thoughtfulness and quality of our offerings. Today, we serve over 500+ brands across India, delivering 12M+ gifts with a 99% on-time rate. Our commitment to excellence remains unchanged - every gift is still crafted with the same attention to detail and personal touch that started it all.

We believe that the best gifts tell a story, strengthen connections, and leave lasting impressions. That's why we continue to innovate while staying true to our core values of quality, customization, and reliable service.`;

const HERO_IMAGE = {
  src: "https://images.unsplash.com/photo-1581091878487-7d24424bf374?q=80&w=1400&auto=format&fit=crop",
  alt: "Handcrafted corporate gifts being packaged",
};

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
  --blue:     #1A4FD6;
  --ink:      #111111;
  --white:    #FFFFFF;
  --off-white:#FAFAFA;
  --grey-50:  #F5F5F5;
  --grey-100: #EBEBEB;
  --grey-300: #C8C8C8;
  --grey-500: #888888;
  --grey-700: #444444;
  --line:     #E2E2E2;
  --nav-h:    72px;
  --maxw:     1240px;
  --pad:      clamp(20px, 5vw, 60px);
  background: var(--white);
  color:      var(--ink);
  font-family:'Inter', system-ui, sans-serif;
  overflow-x: hidden;
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
.aj-overline--blue { color: var(--blue); }

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
  flex-direction: column;
  line-height:    1;
  gap:            3px;
}
.aj-nav__mark {
  font-family:    'Bricolage Grotesque', system-ui, sans-serif;
  font-weight:    800;
  font-size:      22px;
  letter-spacing: -0.03em;
  color:          var(--ink);
}
.aj-nav__tag {
  font-size:      10px;
  font-weight:    500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color:          var(--grey-500);
}
.aj-nav__links { display: none; gap: 36px; align-items: center; }
.aj-nav__link {
  font-size:   13px;
  font-weight: 500;
  color:       var(--grey-700);
  transition:  color .2s;
  padding-bottom: 2px;
  border-bottom: 1.5px solid transparent;
  transition: color .2s, border-color .2s;
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
.aj-mobile-menu nav { display: flex; flex-direction: column; gap: 0; }
.aj-mobile-menu__link {
  font-family:    'Bricolage Grotesque', system-ui, sans-serif;
  font-weight:    800;
  font-size:      clamp(32px, 9vw, 48px);
  color:          var(--white);
  line-height:    1.2;
  padding:        14px 0;
  border-bottom:  1px solid rgba(255,255,255,0.1);
  transition:     color .2s;
}
.aj-mobile-menu__link:first-child { border-top: 1px solid rgba(255,255,255,0.1); }
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
  display:     flex;
  flex-wrap:   wrap;
  gap:         14px;
  margin-bottom: 0;
}

/* Hero image */
.aj-hero__img-wrap {
  position:   relative;
}
.aj-hero__img {
  width:       100%;
  aspect-ratio: 4/5;
  object-fit:  cover;
  display:     block;
  filter:      grayscale(0.08);
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
  letter-spacing: 0.1em;
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
  transition:      background .2s, color .2s, border-color .2s;
  cursor:          pointer;
  white-space:     nowrap;
}
.aj-btn--sm { padding: 9px 20px; font-size: 12px; }

.aj-btn--primary   { background: var(--blue); color: var(--white); border-color: var(--blue); }
.aj-btn--primary:hover { background: #1340b8; border-color: #1340b8; }

.aj-btn--outline   { background: transparent; color: var(--ink); border-color: var(--ink); }
.aj-btn--outline:hover { background: var(--ink); color: var(--white); }

.aj-btn--outline-white { background: transparent; color: var(--white); border-color: rgba(255,255,255,0.4); }
.aj-btn--outline-white:hover { border-color: var(--white); background: rgba(255,255,255,0.06); }

/* ── FOOTER ── */
.aj-footer {
  background:   var(--ink);
  color:        var(--white);
  padding:      56px 0 0;
  border-top:   2px solid var(--blue);
}
.aj-footer__inner {
  display:       grid;
  gap:           40px;
  padding-bottom: 48px;
  border-bottom:  1px solid rgba(255,255,255,0.1);
}
@media (min-width: 720px) { .aj-footer__inner { grid-template-columns: 1.4fr 1fr 1fr; } }

.aj-footer__mark {
  font-family:    'Bricolage Grotesque', system-ui, sans-serif;
  font-weight:    800;
  font-size:      22px;
  letter-spacing: -0.01em;
  color:          var(--white);
  display:        block;
  margin-bottom:  10px;
}
.aj-footer__copy {
  font-size:   14px;
  line-height: 1.7;
  color:       rgba(255,255,255,0.45);
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
  display:     block;
  font-size:   14px;
  margin-bottom: 10px;
  color:       rgba(255,255,255,0.65);
  transition:  color .2s;
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

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "categories", label: "Products" },
  { id: "capabilities", label: "Why Ajanta" },
  { id: "clients", label: "Clients" },
  { id: "enquire", label: "Contact" },
];

const CONTACT_EMAIL = " ";
const WHATSAPP_NUMBER = "+91XXXXXXXXXX"; // To be updated with actual number
const WHATSAPP_MESSAGE = "Hello Ajanta, I would like to request a catalogue.";

const getWhatsAppURL = () => {
  const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
  return `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
};

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

  return (
    <div className="aj-page">
      <style>{STYLES}</style>

      {/* ── NAV ── */}
      <header className="aj-nav">
        <div className="aj-container aj-nav__inner">
          <a href="#top" className="aj-nav__brand" onClick={goTop}>
            <span className="aj-nav__mark">Ajanta</span>
            <span className="aj-nav__tag">Corporate Gifting</span>
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
            href={getWhatsAppURL()}
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
      <div className={`aj-mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {NAV_LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={goTo(l.id)} className="aj-mobile-menu__link">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          className="aj-btn aj-btn--primary"
          href={getWhatsAppURL()}
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
                <a className="aj-btn aj-btn--primary" href="#story" onClick={goTo("story")}>
                  Learn Our Story
                </a>
                <a className="aj-btn aj-btn--outline" href={getWhatsAppURL()}>
                  Request Catalogue
                </a>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="aj-hero__img-wrap">
                <img
                  className="aj-hero__img"
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                />
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
              <div className="aj-dossier__row">
                <div className="aj-dossier__label">
                  <span className="aj-dossier__num">01</span>
                  <span className="aj-dossier__title">Quality First</span>
                </div>
                <p className="aj-dossier__desc">
                  Every product undergoes rigorous quality checks before reaching our clients.
                </p>
              </div>
              <div className="aj-dossier__row">
                <div className="aj-dossier__label">
                  <span className="aj-dossier__num">02</span>
                  <span className="aj-dossier__title">Customization Excellence</span>
                </div>
                <p className="aj-dossier__desc">
                  We tailor every gift to match your brand identity and gifting objectives.
                </p>
              </div>
              <div className="aj-dossier__row">
                <div className="aj-dossier__label">
                  <span className="aj-dossier__num">03</span>
                  <span className="aj-dossier__title">Reliable Delivery</span>
                </div>
                <p className="aj-dossier__desc">
                  Pan-India logistics network ensures timely delivery across 500+ cities.
                </p>
              </div>
              <div className="aj-dossier__row">
                <div className="aj-dossier__label">
                  <span className="aj-dossier__num">04</span>
                  <span className="aj-dossier__title">Sustainable Practices</span>
                </div>
                <p className="aj-dossier__desc">
                  We prioritize eco-friendly materials and ethical sourcing in our products.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="contact" className="aj-cta">
          <div className="aj-container aj-cta__inner">
            <Reveal>
              <hr className="aj-cta__rule" />
              <span className="aj-overline" style={{ color: "rgba(255,255,255,0.45)" }}>Get in Touch</span>
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
                className="aj-btn aj-btn--primary"
                href={getWhatsAppURL()}
                style={{ width: "100%", maxWidth: "320px", justifyContent: "center" }}
              >
                Request Catalogue
              </a>
              <a
                className="aj-btn aj-btn--outline-white"
                href={getWhatsAppURL()}
                style={{ width: "100%", maxWidth: "320px", justifyContent: "center" }}
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
            <span className="aj-footer__mark">Ajanta</span>
            <p className="aj-footer__copy">
              Corporate gifting, built to specification. Pan-India production and delivery.
            </p>
          </div>
          <div>
            <p className="aj-footer__heading">Navigation</p>
            {NAV_LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={goTo(l.id)} className="aj-footer__link">
                {l.label}
              </a>
            ))}
          </div>
          <div>
            <p className="aj-footer__heading">Contact</p>
            <a className="aj-footer__link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <a className="aj-footer__link" href={getWhatsAppURL()}>
              Request the catalogue →
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