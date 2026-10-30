"use client";

import { useCallback, useState } from "react";
import { ambassadors, profile, validators } from "@/content";
import { t } from "./copy";
import HeroEntrance from "./hero-entrance";
import LiveClock from "./live-clock";
import Magnetic from "./magnetic";
import MarqueeFx from "./marquee-fx";
import { MenuButton } from "./menu-overlay";
import MenuOverlay from "./menu-overlay";
import BottomNav from "./bottom-nav";
import CountUp from "./count-up";
import CollabSheet from "./collab-sheet";
import Preloader from "./preloader";
import ProjectCarousel from "./project-carousel";
import Reveal from "./reveal";
import ScrollProgress from "./scroll-progress";
import SkillMarquee from "./skill-marquee";
import SoundToggle from "./sound-toggle";
import ThemeToggle from "./theme-toggle";
import ExperienceAccordion from "./experience-accordion";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function SiteHeader({
  menuOpen,
  onToggleMenu,
}: {
  menuOpen: boolean;
  onToggleMenu: () => void;
}) {
  return (
    <header className="header">
      <div className="header-inner">
        <a className="brand" href="#hero" aria-label="DEXA home">
          <span className="brand-logo" aria-hidden="true">
            <img src="/logos/dexa-logo-white.svg" alt="" className="mark-dark" draggable={false} />
            <img src="/logos/dexa-logo-black.svg" alt="" className="mark-light" draggable={false} />
          </span>
          <span className="brand-text">
            <small>{t.brandRole}</small>
          </span>
        </a>
        <div className="header-controls">
          <div className="control-pill">
            <ThemeToggle />
            <Magnetic>
              <a className="touch-btn" href="#contact">
                {t.getInTouch}
                <span className="touch-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </Magnetic>
          </div>
          <SoundToggle />
          <MenuButton open={menuOpen} onToggle={onToggleMenu} />
        </div>
      </div>
    </header>
  );
}

function SiteMain() {
  return (
    <main className="wrap">
      <section className="hero" id="hero" aria-labelledby="hero-title">
        <p className="role-line">{t.heroRoleLine}</p>
        <h1 id="hero-title" className="hero-title" aria-label="DEXA">
          {"DEXA".split("").map((c, i) => (
            <span className="char-mask" key={i} aria-hidden="true">
              <span className="char">{c}</span>
            </span>
          ))}
        </h1>
        <div className="hero-meta">
          <span>Jakarta, ID</span>
          <span aria-hidden="true">—</span>
          <span>
            <LiveClock /> (WIB)
          </span>
        </div>
        <div className="hero-stats" aria-label="Key stats">
          <span>
            <strong>5+</strong> years
          </span>
          <span aria-hidden="true">·</span>
          <span>
            <strong>28</strong> networks
          </span>
          <span aria-hidden="true">·</span>
          <span>
            <strong>12</strong> ambassador programs
          </span>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <span className="marquee-copy" key={copy}>
              {t.marquee.map((item) => (
                <span className="marquee-item" key={`${copy}-${item}`}>
                  {item}
                  <span className="marquee-dot">•</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <section id="about" aria-labelledby="about-title">
        <Reveal>
          <p className="kicker">{t.aboutKicker}</p>
          <h2 id="about-title" className="band-headline">
            {t.aboutTitle} <span className="dim">{t.aboutTitleDim}</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="section-intro">{t.aboutIntro}</p>
        </Reveal>
        <Reveal delay={180}>
          <div className="band-stats">
            <div className="about-stat">
              <div className="band-stat-num">
                <CountUp to={5} suffix="+" />
              </div>
              <div className="band-stat-label">{t.aboutStat1Label}</div>
            </div>
            <div className="about-stat">
              <div className="band-stat-num">
                <CountUp to={12} />
              </div>
              <div className="band-stat-label">{t.aboutStat2Label}</div>
            </div>
            <div className="about-stat">
              <div className="band-stat-num">
                <CountUp to={28} />
              </div>
              <div className="band-stat-label">{t.aboutStat3Label}</div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="skills" aria-labelledby="skills-title">
        <Reveal>
          <p className="kicker">{t.skillsKicker}</p>
          <h2 id="skills-title" className="skills-heading">
            {t.skillsTitle}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="section-intro skills-intro">{t.skillsIntro}</p>
        </Reveal>
        <SkillMarquee />
      </section>

      <section id="experience" aria-labelledby="experience-title">
        <Reveal>
          <p className="kicker">{t.expKicker}</p>
          <h2 id="experience-title" className="kinetic">
            {t.expTitle}
          </h2>
        </Reveal>
        <ExperienceAccordion />
      </section>

      <section id="validator" aria-labelledby="validator-title">
        <Reveal>
          <p className="kicker">{t.valKicker}</p>
          <h2 id="validator-title" className="kinetic">
            {t.valTitle}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="val-marquee" role="list" aria-label={`${t.valTitle} — row 1`}>
            <div className="val-track">
              {[...validators.slice(0, 14), ...validators.slice(0, 14)].map((v, i) => (
                <span className="val-logo" role="listitem" key={`a-${i}`} data-name={v.name}>
                  <img src={v.logo} alt={`${v.name} logo`} draggable={false} loading="lazy" />
                </span>
              ))}
            </div>
          </div>
          <div className="val-marquee" role="list" aria-label={`${t.valTitle} — row 2`}>
            <div className="val-track rev">
              {[...validators.slice(14), ...validators.slice(14)].map((v, i) => (
                <span className="val-logo" role="listitem" key={`b-${i}`} data-name={v.name}>
                  <img src={v.logo} alt={`${v.name} logo`} draggable={false} loading="lazy" />
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="ambassador" aria-labelledby="ambassador-title">
        <Reveal>
          <p className="kicker">{t.ambKicker}</p>
          <h2 id="ambassador-title" className="kinetic">
            {t.ambTitle}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="amb-marquee" role="list" aria-label={`${t.ambTitle} — row 1`}>
            <div className="amb-track">
              {[...ambassadors.slice(0, 6), ...ambassadors.slice(0, 6)].map((amb, i) => (
                <span className="amb-logo" role="listitem" key={`a-${i}`} data-name={amb.name}>
                  {amb.logo ? (
                    <img
                      src={amb.logo}
                      alt={`${amb.name} logo`}
                      draggable={false}
                      loading="lazy"
                      className={[
                        amb.logoInvertLight ? "invert-light" : "",
                        amb.logoInvertDark ? "invert-dark" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    />
                  ) : (
                    initials(amb.name)
                  )}
                </span>
              ))}
            </div>
          </div>
          <div className="amb-marquee" role="list" aria-label={`${t.ambTitle} — row 2`}>
            <div className="amb-track rev">
              {[...ambassadors.slice(6), ...ambassadors.slice(6)].map((amb, i) => (
                <span className="amb-logo" role="listitem" key={`b-${i}`} data-name={amb.name}>
                  {amb.logo ? (
                    <img
                      src={amb.logo}
                      alt={`${amb.name} logo`}
                      draggable={false}
                      loading="lazy"
                      className={[
                        amb.logoInvertLight ? "invert-light" : "",
                        amb.logoInvertDark ? "invert-dark" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    />
                  ) : (
                    initials(amb.name)
                  )}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="projects" aria-labelledby="projects-title">
        <Reveal>
          <p className="kicker">{t.projKicker}</p>
          <h2 id="projects-title" className="kinetic">
            {t.projTitle}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="section-intro">{t.projIntro}</p>
        </Reveal>
        <ProjectCarousel />
      </section>

      <section id="community" aria-labelledby="community-title">
        <Reveal>
          <p className="kicker">{t.commKicker}</p>
          <h2 id="community-title" className="band-headline">
            {t.commHeadline} <span className="dim">{t.commHeadlineDim}</span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="section-intro">{t.commSub}</p>
        </Reveal>
        <Reveal delay={160}>
          <div className="band-stats">
            <div className="comm-stat">
              <div className="band-stat-num">
                <CountUp to={40} suffix="K+" />
              </div>
              <div className="band-stat-label">{t.commStat1Label}</div>
            </div>
            <div className="comm-stat">
              <div className="band-stat-num">
                <CountUp to={50} suffix="+" />
              </div>
              <div className="band-stat-label">{t.commStat2Label}</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={220}>
          <a
            className="comm-cta"
            href={profile.communityUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.commCta} <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </section>

      <section id="contact" aria-labelledby="contact-title">
        <Reveal>
          <p className="kicker">{t.contactKicker}</p>
          <h2 id="contact-title" className="statement">
            {t.contactTitle}
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="contact-avail">
            <span className="pulse-dot" aria-hidden="true" />
            {t.contactAvailability}
          </p>
        </Reveal>
        <Reveal delay={140}>
          <div className="contact-actions">
            <CollabSheet />
          </div>
        </Reveal>
      </section>
    </main>
  );
}

function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-logo" aria-hidden="true">
          <img src="/logos/dexa-logo-white.svg" alt="" className="mark-dark" draggable={false} loading="lazy" />
          <img src="/logos/dexa-logo-black.svg" alt="" className="mark-light" draggable={false} loading="lazy" />
        </span>
        <div className="footer-links">
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="footer-icon"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
          <a
            href={profile.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="footer-icon"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </a>
          <a
            href={profile.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="footer-icon"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </svg>
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="footer-icon"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  return (
    <>
      <Preloader />
      <HeroEntrance />
      <ScrollProgress />
      <MarqueeFx />
      <div className="grain" aria-hidden="true" />
      <a className="skip" href="#about">
        {t.skip}
      </a>
      <SiteHeader menuOpen={menuOpen} onToggleMenu={toggleMenu} />
      <SiteMain />
      <SiteFooter />
      <MenuOverlay open={menuOpen} onClose={closeMenu} />
      <BottomNav menuOpen={menuOpen} onToggleMenu={toggleMenu} />
    </>
  );
}
