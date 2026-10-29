import {
  ambassadors,
  experience,
  profile,
  projects,
  skillGroups,
  validatorExperience,
} from "@/content";
import LiveClock from "./live-clock";
import MenuOverlay from "./menu-overlay";
import Preloader from "./preloader";
import Reveal from "./reveal";

function hostOf(href: string) {
  return href.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

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

const marqueeItems = [
  "Web3 builder",
  "Community manager",
  "Content creator",
  "Node validator",
  "Jakarta, ID",
];

export default function HomePage() {
  return (
    <>
      <Preloader />
      <div className="grain" aria-hidden="true" />
      <a className="skip" href="#about">
        Skip to content
      </a>
      <header className="header">
        <div className="header-inner">
          <a className="wordmark" href="#hero">
            {profile.handle}
          </a>
          <MenuOverlay />
        </div>
      </header>
      <main className="wrap">
        <section className="hero" id="hero" aria-labelledby="hero-title">
          <p className="role-line">
            Web3 builder &amp; community manager. Anonymous by design.
          </p>
          <h1 id="hero-title" className="hero-title">
            0XDEXA
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
                {marqueeItems.map((item) => (
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
            <p className="kicker">About</p>
            <h2 id="about-title" className="statement">
              Community development in crypto and Web3.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="section-intro">
              {profile.handle} works as a web3 builder, community manager, and
              content creator. The community work is about 5 years, covering
              moderation, community management, and technical customer support.
            </p>
          </Reveal>
        </section>

        <section id="skills" aria-labelledby="skills-title">
          <Reveal>
            <p className="kicker">Skills</p>
            <h2 id="skills-title" className="kinetic">
              What he works with
            </h2>
          </Reveal>
          <div className="rows">
            {skillGroups.map((group, i) => (
              <Reveal key={group.title} delay={i * 70}>
                <div className="row">
                  <span className="row-index">{indexOf(i)}</span>
                  <div>
                    <h3 className="row-title">{group.title}</h3>
                    <p className="row-sub">{group.items.join("  ·  ")}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="experience" aria-labelledby="experience-title">
          <Reveal>
            <p className="kicker">Experience</p>
            <h2 id="experience-title" className="kinetic">
              Roles
            </h2>
          </Reveal>
          <div className="rows">
            {experience.map((job, i) => (
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
            <p className="kicker">Node Validator</p>
            <h2 id="validator-title" className="kinetic">
              Validator experience
            </h2>
          </Reveal>
          <div className="rows">
            <Reveal delay={80}>
              {validatorExperience.length === 0 ? (
                <div className="row">
                  <span className="row-index">01</span>
                  <div>
                    <h3 className="row-title">Details coming soon</h3>
                    <p className="row-sub">
                      Validator projects will be listed here.
                    </p>
                  </div>
                </div>
              ) : (
                validatorExperience.map((item, i) => (
                  <div className="row" key={item.name}>
                    <span className="row-index">{indexOf(i)}</span>
                    <div>
                      <h3 className="row-title">{item.name}</h3>
                      <p className="row-sub">
                        {item.network} — {item.since}
                      </p>
                      <ul className="row-points">
                        {item.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              )}
            </Reveal>
          </div>
        </section>

        <section id="ambassador" aria-labelledby="ambassador-title">
          <Reveal>
            <p className="kicker">Ambassador and KOL</p>
            <h2 id="ambassador-title" className="kinetic">
              Programs
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
            <p className="kicker">Projects</p>
            <h2 id="projects-title" className="kinetic">
              Selected work
            </h2>
          </Reveal>
          <div className="rows">
            {projects.map((project, i) => (
              <Reveal key={project.href} delay={i * 70}>
                <a
                  className="row row-link"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="row-index">{indexOf(i)}</span>
                  <div>
                    <h3 className="row-title">{project.name}</h3>
                    <p className="row-sub">
                      {project.kind} — {hostOf(project.href)}
                    </p>
                  </div>
                  <span className="row-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="community" aria-labelledby="community-title">
          <Reveal>
            <p className="kicker">Community</p>
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
            <p className="kicker">Contact</p>
            <h2 id="contact-title" className="statement">
              Let&apos;s build something together.
            </h2>
          </Reveal>
          <div className="rows">
            {[
              { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
              { label: "Telegram", value: profile.telegramHandle, href: profile.telegram },
              { label: "X", value: profile.xHandle, href: profile.x },
              { label: "GitHub", value: "github.com/Dexanode", href: profile.github },
            ].map((item, i) => (
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
      <footer className="footer">
        <div className="footer-inner">
          <p>{profile.handle} — Jakarta, ID</p>
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
    </>
  );
}
