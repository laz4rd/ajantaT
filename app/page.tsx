"use client"
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import SpinningLogo from "./components/SpinningLogo";

// ── CONTACT ──
// TODO: replace with the real WhatsApp Business number (with country code, no + or spaces needed here).
const WHATSAPP_NUMBER = "91XXXXXXXXXX";
const CONTACT_EMAIL = " ";

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

// ── LOGOS ──
// Paths assume files live in /public (Next.js) so they're served from the site root.
// Adjust the paths below if your logos live elsewhere in the codebase.
const MAIN_LOGO = "/Mainlogo.png";

function categoryEnquiryMessage(categoryTitle: string) {
  return `Hi Ajanta, I'd like to enquire about your "${categoryTitle}" category.`;
}

const CATEGORIES = [
  {
    title: "Duffel Bags",
    desc: "Branded duffel bags for travel, gym, and weekend getaways — durable builds with custom logo placement.",
    img: "/prod1.jpg",
    alt: "Corporate duffel bag, canvas travel bag with branding",
  },
  {
    title: "HH-BOT-2 (Water Bottle Pill Organizer)",
    desc: "A 2-in-1 water bottle with a built-in pill organizer compartment — practical, leak-resistant, and ready to brand.",
    img: "/prod2.jpg",
    alt: "HH-BOT-2 water bottle with integrated pill organizer",
  },
  {
    title: "Branding Products",
    desc: "Custom-branded merchandise and corporate giveaways — your logo, your colours, produced to specification.",
    img: "/prod3.jpeg",
    alt: "Custom branded corporate merchandise",
  },
  {
    title: "Household Utilities",
    desc: "Useful everyday items for the home or office — practical utility products that make for thoughtful gifting at scale.",
    img: "/prod4.jpg",
    alt: "Household utility products, everyday corporate gifts",
  },
];

const BENEFITS = [
  {
    num: "01",
    title: "Custom Branding",
    desc: "Brand colours, logo placement, packaging, and insert cards — managed end to end with your team.",
  },
  {
    num: "02",
    title: "Bulk Capacity",
    desc: "Single production runs from 250 to 50,000+ units, with consistent quality across the full batch.",
  },
  {
    num: "03",
    title: "Quality Assurance",
    desc: "Every order is sample-approved before production begins and batch-inspected before dispatch.",
  },
  {
    num: "04",
    title: "Pan-India Delivery",
    desc: "Logistics partnerships across 500+ cities with fixed delivery windows and door-to-door tracking.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "The customization process felt like working with an in-house team, not a vendor. Every detail matched our brand guidelines on the first pass.",
    name: "R. Kapoor",
    title: "Head of Employee Experience",
    company: "Financial Services",
  },
  {
    quote:
      "We needed four thousand onboarding kits delivered across six cities in eleven days. Ajanta delivered on day ten.",
    name: "S. Iyer",
    title: "VP, People Operations",
    company: "Technology",
  },
  {
    quote:
      "Quality control is the part most vendors skip. Ajanta sent approval samples before a single unit went into production.",
    name: "N. Shah",
    title: "Procurement Lead",
    company: "Manufacturing",
  },
];

// Client logos — expects /public/client1.png, /public/client2.png, etc.
// Add or remove entries to match how many logo files you have; update `alt` with real client names.
const CLIENTS = [
  { src: "/client1.png", alt: "Client 1" },
  { src: "/client2.png", alt: "Client 2" },
  { src: "/client3.png", alt: "Client 3" },
  { src: "/client4.png", alt: "Client 4" },
  { src: "/client5.png", alt: "Client 5" },
  { src: "/client6.png", alt: "Client 6" },
  { src: "/client7.png", alt: "Client 7" },
  { src: "/client8.png", alt: "Client 8" },
];

// Nav links — items with an `id` scroll to a section on this page;
// items with an `href` navigate to a separate route (e.g. /about).
const NAV_LINKS: { id?: string; href?: string; label: string }[] = [
  { id: "categories", label: "Products" },
  { id: "capabilities", label: "Why Ajanta" },
  { href: "/about", label: "About Us" },
  { id: "clients", label: "Clients" },
  { id: "testimonials", label: "Testimonials" },
  { id: "visit", label: "Visit Us" },
  { id: "enquire", label: "Contact" },
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { setInView(true); observer.disconnect(); } });
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
  font-size:      13px;
  font-weight:    500;
  color:          var(--grey-700);
  padding-bottom: 2px;
  border-bottom:  1.5px solid transparent;
  transition:     color .2s, border-color .2s;
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
  opacity:    0;
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
  aspect-ratio: 4/5;
  overflow:     hidden;
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

/* ── CATEGORY GRID ── */
.aj-cat-grid {
  display:               grid;
  gap:                   32px;
  grid-template-columns: 1fr;
}
@media (min-width: 640px) { .aj-cat-grid { grid-template-columns: repeat(2, 1fr); } }

.aj-cat-card {
  background:  var(--white);
  border:      1px solid var(--line);
  overflow:    hidden;
  transition:  box-shadow .25s ease, transform .25s ease;
}
.aj-cat-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.1); transform: translateY(-3px); }

/* Whole card is a link — strip default <a> styling so the card visuals stay untouched. */
.aj-cat-card__linkwrap {
  display:     block;
  color:       inherit;
  cursor:      pointer;
}
.aj-cat-card__img {
  aspect-ratio: 3/2;
  overflow:    hidden;
  background:  var(--white);
  display:     flex;
  align-items: center;
  justify-content: center;
  padding:     28px;
}
.aj-cat-card__img img {
  width:      auto;
  height:     auto;
  max-width:  100%;
  max-height: 100%;
  object-fit: contain;
  display:    block;
  filter:     none;
  transition: transform .4s ease;
}
.aj-cat-card:hover .aj-cat-card__img img { transform: scale(1.04); }
.aj-cat-card__body { padding: 24px 28px; }
.aj-cat-card__title {
  font-family:    'Bricolage Grotesque', system-ui, sans-serif;
  font-weight:    700;
  font-size:      20px;
  margin:         0 0 10px;
  color:          var(--ink);
}
.aj-cat-card__desc { font-size: 14px; line-height: 1.7; color: var(--grey-700); margin: 0; }
.aj-cat-card__link {
  display:        inline-flex;
  align-items:    center;
  gap:            6px;
  font-size:      13px;
  font-weight:    600;
  color:          var(--blue);
  margin-top:     16px;
  letter-spacing: 0.01em;
  transition:     gap .2s;
}
.aj-cat-card:hover .aj-cat-card__link { gap: 10px; }

/* ── CAPABILITIES (dossier) ── */
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

/* ── CLIENT LOGO WALL ── */
.aj-clients {
  border-top: 1px solid var(--line);
}
.aj-clients__grid {
  display:               grid;
  grid-template-columns: repeat(2, 1fr);
  gap:                   1px;
  background:            var(--line);
  border:                1px solid var(--line);
}
@media (min-width: 640px)  { .aj-clients__grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 960px)  { .aj-clients__grid { grid-template-columns: repeat(4, 1fr); } }
.aj-client {
  background:     var(--white);
  min-height:     108px;
  display:        flex;
  align-items:    center;
  justify-content: center;
  padding:        24px;
  transition:     background .2s ease;
}
.aj-client:hover { background: var(--off-white); }
.aj-client__logo {
  max-width:  100%;
  max-height: 48px;
  width:      auto;
  height:     auto;
  object-fit: contain;
  filter:     grayscale(1) opacity(0.55);
  transition: filter .2s ease;
}
.aj-client:hover .aj-client__logo { filter: grayscale(0) opacity(1); }

/* ── TESTIMONIALS ── */
.aj-testi-grid {
  display:               grid;
  gap:                   24px;
  grid-template-columns: 1fr;
}
@media (min-width: 720px) { .aj-testi-grid { grid-template-columns: repeat(3, 1fr); } }

.aj-testi-card {
  background:  var(--white);
  border:      1px solid var(--line);
  padding:     32px 28px;
  display:     flex;
  flex-direction: column;
  justify-content: space-between;
  transition:  box-shadow .25s ease;
}
.aj-testi-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.08); }
.aj-testi-card__quote {
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-size:   16px;
  font-weight: 500;
  line-height: 1.7;
  color:       var(--ink);
  margin:      0 0 28px;
  flex:        1;
}
.aj-testi-card__rule { width: 28px; height: 1.5px; background: var(--blue); border: none; margin: 0 0 18px; }
.aj-testi-card__name {
  font-size:   14px;
  font-weight: 600;
  color:       var(--ink);
  margin:      0 0 3px;
}
.aj-testi-card__meta {
  font-size:   12px;
  font-weight: 400;
  color:       var(--grey-500);
}

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

/* ── VISIT US ── */
.aj-visit {
  background: var(--off-white);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding:    clamp(64px, 9vw, 112px) 0;
}
.aj-visit__inner {
  display:               grid;
  gap:                   40px;
  grid-template-columns: 1fr;
  align-items:           stretch;
}
@media (min-width: 860px) {
  .aj-visit__inner { grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
}
.aj-visit__head { margin-bottom: 28px; }
.aj-visit__details {
  display:        flex;
  flex-direction: column;
  gap:           18px;
}
.aj-visit__row {
  display:     flex;
  align-items: flex-start;
  gap:         14px;
  font-size:   15px;
  line-height: 1.65;
  color:       var(--grey-700);
}
.aj-visit__row strong {
  display:       block;
  font-weight:   600;
  color:         var(--ink);
  font-size:     13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 4px;
}
.aj-visit__icon {
  flex-shrink: 0;
  width:       20px;
  height:      20px;
  margin-top:  2px;
  color:       var(--blue);
}
.aj-visit__map {
  position:         relative;
  width:            100%;
  aspect-ratio:     4 / 3;
  background:       var(--grey-100);
  border:           1px solid var(--line);
  overflow:         hidden;
}
.aj-visit__map iframe {
  position:   absolute;
  inset:      0;
  width:      100%;
  height:     100%;
  border:     0;
  display:    block;
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

export default function AjantaLandingPage() {
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
      <header className={`aj-nav ${menuOpen ? "is-menu-open" : ""}`}>
        <div className="aj-container aj-nav__inner">
          <a href="#top" className="aj-nav__brand" onClick={goTop}>
            <img className="aj-nav__logo-img" src={MAIN_LOGO} alt="Ajanta — Corporate Gifting" />
          </a>

          <nav className="aj-nav__links" aria-label="Primary">
            {NAV_LINKS.map((l) =>
              l.href ? (
                <Link key={l.label} href={l.href} className="aj-nav__link">
                  {l.label}
                </Link>
              ) : (
                <a key={l.id} href={`#${l.id}`} onClick={goTo(l.id as string)} className="aj-nav__link">
                  {l.label}
                </a>
              )
            )}
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
          // Close when the user taps the dark backdrop (not the nav/links/CTA).
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
          {NAV_LINKS.map((l) =>
            l.href ? (
              <Link
                key={l.label}
                href={l.href}
                className="aj-mobile-menu__link"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            ) : (
              <a key={l.id} href={`#${l.id}`} onClick={goTo(l.id as string)} className="aj-mobile-menu__link">
                {l.label}
              </a>
            )
          )}
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
              <span className="aj-overline">Corporate Gifting — India</span>
              <h1 className="aj-h1">
                Gifts That Build Relationships.
              </h1>
              <p className="aj-lead">
                Ajanta designs, produces, and delivers corporate gifts at scale — onboarding kits, festive hampers, executive sets, and event merchandise, every order on time and on brand.
              </p>
              <div className="aj-hero__actions">
                <a className="aj-btn aj-btn--primary" href="#categories" onClick={goTo("categories")}>
                  Explore Products
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

        {/* ── STATS ── */}
        <div className="aj-stats">
          <div className="aj-container">
            <div className="aj-stats__grid">
              {[["500+","Brands Served"],["12M+","Gifts Delivered"],["99%","On-Time Rate"],["48 hr","Sample Turnaround"]].map(([n, l]) => (
                <Reveal key={l} className="aj-stat">
                  <div className="aj-stat__num">{n}</div>
                  <div className="aj-stat__label">{l}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ── PRODUCTS ── */}
        <section id="categories" className="aj-section">
          <div className="aj-container">
            <Reveal className="aj-section__head">
              <span className="aj-overline aj-overline--blue">Our Products</span>
              <h2 className="aj-h2">What We Produce</h2>
              <p className="aj-lead aj-lead--wide aj-lead--nobottom">
                Each category is built to its own brief — sample-approved, on schedule, and on brand.
              </p>
            </Reveal>
            <div className="aj-cat-grid">
              {CATEGORIES.map((c, i) => (
                <Reveal key={c.title} className="aj-cat-card" delay={i * 70}>
                  <a
                    className="aj-cat-card__linkwrap"
                    href={whatsappLink(categoryEnquiryMessage(c.title))}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Enquire about ${c.title} on WhatsApp`}
                  >
                    <div className="aj-cat-card__img">
                      <img src={c.img} alt={c.alt} loading="lazy" />
                    </div>
                    <div className="aj-cat-card__body">
                      <h3 className="aj-cat-card__title">{c.title}</h3>
                      <p className="aj-cat-card__desc">{c.desc}</p>
                      <span className="aj-cat-card__link">
                        Enquire about this category →
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CAPABILITIES ── */}
        <section id="capabilities" className="aj-section aj-section--off">
          <div className="aj-container">
            <Reveal className="aj-section__head">
              <span className="aj-overline aj-overline--blue">Why Ajanta</span>
              <h2 className="aj-h2">Our Commitments</h2>
            </Reveal>
            <div className="aj-dossier">
              {BENEFITS.map((b, i) => (
                <Reveal key={b.num} className="aj-dossier__row" delay={i * 55}>
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

        {/* ── OUR CLIENTS ── */}
        <section id="clients" className="aj-section aj-clients">
          <div className="aj-container">
            <Reveal className="aj-section__head aj-section__head--center">
              <span className="aj-overline aj-overline--blue">Our Clients</span>
              <h2 className="aj-h2">Brands We've Worked With</h2>
              <p className="aj-lead aj-lead--nobottom">
                A selection of the teams who trust Ajanta with their gifting programmes.
              </p>
            </Reveal>
            <Reveal>
              <div className="aj-clients__grid">
                {CLIENTS.map((client) => (
                  <div key={client.src} className="aj-client">
                    <img
                      className="aj-client__logo"
                      src={client.src}
                      alt={client.alt}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section id="testimonials" className="aj-section aj-section--off">
          <div className="aj-container">
            <Reveal className="aj-section__head aj-section__head--center">
              <span className="aj-overline aj-overline--blue">Client Testimonials</span>
              <h2 className="aj-h2">Trusted by Leading Companies</h2>
            </Reveal>
            <div className="aj-testi-grid">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.name} className="aj-testi-card" delay={i * 80}>
                  <p className="aj-testi-card__quote">"{t.quote}"</p>
                  <div>
                    <hr className="aj-testi-card__rule" />
                    <p className="aj-testi-card__name">{t.name}</p>
                    <p className="aj-testi-card__meta">{t.title} · {t.company}</p>
                  </div>
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
                Ready to Start a Gifting Programme?
              </h2>
              <p className="aj-lead aj-lead--white aj-lead--nobottom">
                Request our catalogue or speak with our team on WhatsApp. We'll put together a proposal suited to your budget and occasion, usually within 24 hours.
              </p>
            </Reveal>
            <Reveal delay={100} className="aj-cta__right">
              <a
                className="aj-btn aj-btn--primary aj-btn--block"
                href={whatsappLink(CATALOGUE_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Request the Catalogue
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

        {/* ── VISIT US ── */}
        <section id="visit" className="aj-visit">
          <div className="aj-container aj-visit__inner">
            <Reveal>
              <div className="aj-visit__head">
                <span className="aj-overline aj-overline--blue">Visit Us</span>
                <h2 className="aj-h2">Our Office</h2>
                <p className="aj-lead aj-lead--nobottom">
                  Drop by to see samples, discuss custom branding, or pick up an order in person.
                </p>
              </div>
              <div className="aj-visit__details">
                <div className="aj-visit__row">
                  <svg className="aj-visit__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s-7-7.5-7-13a7 7 0 1 1 14 0c0 5.5-7 13-7 13z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  <div>
                    <strong>Address</strong>
                    {ADDRESS_LINE_1}<br />
                    {ADDRESS_LINE_2}
                  </div>
                </div>
                <div className="aj-visit__row">
                  <svg className="aj-visit__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  <div>
                    <strong>Hours</strong>
                    Monday – Saturday · 10:00 – 19:00 IST
                  </div>
                </div>
                <div className="aj-visit__row">
                  <svg className="aj-visit__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <div>
                    <strong>Get in touch</strong>
                    <a
                      href={whatsappLink(ENQUIRY_MESSAGE)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--blue)", fontWeight: 600 }}
                    >
                      Message us on WhatsApp →
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="aj-visit__map">
                <iframe
                  src={MAP_EMBED_SRC}
                  title="Ajanta International — Mumbai office location"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
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
            {NAV_LINKS.map((l) =>
              l.href ? (
                <Link key={l.label} href={l.href} className="aj-footer__link">
                  {l.label}
                </Link>
              ) : (
                <a key={l.id} href={`#${l.id}`} onClick={goTo(l.id as string)} className="aj-footer__link">
                  {l.label}
                </a>
              )
            )}
          </div>
          <div>
            <p className="aj-footer__heading">Contact</p>
            <a className="aj-footer__link" href="#visit">{ADDRESS_LINE_1}</a>
            <a className="aj-footer__link" href="#visit">{ADDRESS_LINE_2}</a>
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