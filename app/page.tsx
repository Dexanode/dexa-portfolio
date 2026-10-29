"use client";

import { ambassadors, profile, validators } from "@/content";
import { t } from "./copy";
import HeroEntrance from "./hero-entrance";
import LiveClock from "./live-clock";
import Magnetic from "./magnetic";
import MarqueeFx from "./marquee-fx";
import MenuOverlay from "./menu-overlay";
import Preloader from "./preloader";
import ProjectCarousel from "./project-carousel";
import Reveal from "./reveal";
import ScrollProgress from "./scroll-progress";
import SkillCarousel from "./skill-carousel";
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

function indexOf(i: number) {
  return String(i + 1).padStart(2, "0");
}

function SiteHeader() {
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
          <MenuOverlay />
        </div>
      </div>
    </header>
  );
}

function SiteMain() {
  const contactRows = [
    {
      label: t.contactLabels[0],
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      label: t.contactLabels[1],
      value: profile.telegramHandle,
      href: profile.telegram,
    },
    { label: t.contactLabels[2], value: profile.xHandle, href: profile.x },
    {
      label: t.contactLabels[3],
      value: "github.com/Dexanode",
      href: profile.github,
    },
  ];

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
          <span>{profile.handle}</span>
          <span aria-hidden="true">—</span>
          <span>Jakarta, ID</span>
          <span aria-hidden="true">—</span>
          <span>
            <LiveClock /> (WIB)
          </span>
        </div>
        <div className="actions">
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>
            Email
          </a>
          <a
            className="btn btn-ghost"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="btn btn-ghost"
            href={profile.x}
            target="_blank"
            rel="noopener noreferrer"
          >
            X
          </a>
          <a
            className="btn btn-ghost"
            href={profile.telegram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram
          </a>
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
          <h2 id="about-title" className="statement">
            {t.aboutTitle}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="section-intro">{t.aboutIntro}</p>
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
        <SkillCarousel />
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
          <h2 id="community-title" className="kinetic">
            {profile.communityName}
          </h2>
        </Reveal>
        <div className="rows">
          <Reveal delay={80}>
            <a
              className="row row-link"
              href={profile.communityUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="row-index">01</span>
              <div>
                <h3 className="row-title">Telegram</h3>
                <p className="row-sub">{profile.communityUrl}</p>
              </div>
              <span className="row-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-title">
        <Reveal>
          <p className="kicker">{t.contactKicker}</p>
          <h2 id="contact-title" className="statement">
            {t.contactTitle}
          </h2>
        </Reveal>
        <div className="rows">
          {contactRows.map((item, i) => (
            <Reveal key={item.label} delay={i * 60}>
              <a
                className="row row-link"
                href={item.href}
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
              >
                <span className="row-index">{indexOf(i)}</span>
                <div>
                  <h3 className="row-title">{item.label}</h3>
                  <p className="row-sub">{item.value}</p>
                </div>
                <span className="row-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}

function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-logo" aria-hidden="true">
          <img src="/logos/dexa-logo-white.svg" alt="" className="mark-dark" draggable={false} />
          <img src="/logos/dexa-logo-black.svg" alt="" className="mark-light" draggable={false} />
        </span>
        <div className="footer-links">
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.telegram} target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
          <a href={profile.x} target="_blank" rel="noopener noreferrer">
            X
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
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
      <SiteHeader />
      <SiteMain />
      <SiteFooter />
    </>
  );
}
