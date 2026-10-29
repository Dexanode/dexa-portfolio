"use client";

import { ambassadors, profile } from "@/content";
import { LangProvider, useLang, type Lang } from "./i18n";
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

function LangToggle() {
  const { lang, setLang } = useLang();
  const next: Lang = lang === "en" ? "id" : "en";
  return (
    <button
      type="button"
      className="lang-toggle"
      data-lang={lang}
      onClick={() => setLang(next)}
      aria-label={lang === "en" ? "Switch to Indonesian" : "Switch to English"}
    >
      <span className={lang === "en" ? "active" : ""}>EN</span>
      <span className="lang-switch" aria-hidden="true">
        <span className="lang-knob" />
      </span>
      <span className={lang === "id" ? "active" : ""}>ID</span>
    </button>
  );
}

function SiteHeader() {
  const { t } = useLang();
  return (
    <header className="header">
      <div className="header-inner">
        <a className="brand" href="#hero" aria-label="0xDexa home">
          <span className="brand-mark" aria-hidden="true">
            0X
          </span>
          <span className="brand-text">
            <strong>0XDEXA</strong>
            <small>{t.brandRole}</small>
          </span>
        </a>
        <div className="header-controls">
          <div className="control-pill">
            <LangToggle />
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
  const { t } = useLang();
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
        <h1 id="hero-title" className="hero-title" aria-label="0XDEXA">
          {"0XDEXA".split("").map((c, i) => (
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
        <div className="rows">
          {t.experience.map((job, i) => (
            <Reveal key={`${job.org}-${job.dates}`} delay={i * 60}>
              <div className="row">
                <span className="row-index">{indexOf(i)}</span>
                <div>
                  <h3 className="row-title">{job.org}</h3>
                  <p className="row-sub">
                    {job.role} — {job.dates}
                  </p>
                  <ul className="row-points">
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="validator" aria-labelledby="validator-title">
        <Reveal>
          <p className="kicker">{t.valKicker}</p>
          <h2 id="validator-title" className="kinetic">
            {t.valTitle}
          </h2>
        </Reveal>
        <div className="rows">
          <Reveal delay={80}>
            <div className="row">
              <span className="row-index">01</span>
              <div>
                <h3 className="row-title">{t.valSoon}</h3>
                <p className="row-sub">{t.valSoonSub}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="ambassador" aria-labelledby="ambassador-title">
        <Reveal>
          <p className="kicker">{t.ambKicker}</p>
          <h2 id="ambassador-title" className="kinetic">
            {t.ambTitle}
          </h2>
        </Reveal>
        <ul className="amb-grid">
          {ambassadors.map((name, i) => (
            <li className="amb" key={name}>
              <Reveal delay={(i % 4) * 60} className="amb-reveal">
                <span className="amb-logo" aria-hidden="true">
                  {initials(name)}
                </span>
                <span className="amb-name">{name}</span>
              </Reveal>
            </li>
          ))}
        </ul>
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
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>{t.footerNote}</p>
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
  const { t } = useLang();
  return (
    <LangProvider>
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
    </LangProvider>
  );
}
