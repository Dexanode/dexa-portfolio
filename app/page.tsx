import {
  ambassadors,
  profile,
  projects,
  skillGroups,
  validatorExperience,
} from "@/content";
import ExperienceCarousel from "./experience-carousel";
import MenuOverlay from "./menu-overlay";
import Preloader from "./preloader";
import Reveal from "./reveal";

function hostOf(href: string) {
  return href.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

const web3Tags = new Set([
  "Web3 builder",
  "Smart contract auditing",
  "DeFi liquidity and protocols",
  "Solana ecosystem",
  "On-chain analytics",
]);

function chipClass(label: string) {
  return web3Tags.has(label) ? "chip chip-web3" : "chip";
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

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
          <p className="kicker">Portfolio</p>
          <h1 id="hero-title" className="hero-title">
            {profile.handle}
          </h1>
          <ul className="roles" aria-label="Roles">
            {profile.roles.map((role) => (
              <li className={chipClass(role)} key={role}>
                {role}
              </li>
            ))}
          </ul>
          <p className="lede">{profile.summary}</p>
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

        <section id="about" aria-labelledby="about-title">
          <Reveal>
            <p className="kicker">About</p>
            <h2 id="about-title" className="kinetic">
              Community development in crypto and Web3
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
          <div className="grid-3">
            {skillGroups.map((group, i) => (
              <Reveal key={group.title} delay={i * 90}>
                <article className="card">
                  <h3>{group.title}</h3>
                  <ul className="skill-list">
                    {group.items.map((item) => (
                      <li className={chipClass(item)} key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
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
          <Reveal delay={120}>
            <ExperienceCarousel />
          </Reveal>
        </section>

        <section id="validator" aria-labelledby="validator-title">
          <Reveal>
            <p className="kicker">Node Validator</p>
            <h2 id="validator-title" className="kinetic">
              Validator experience
            </h2>
          </Reveal>
          <Reveal delay={120}>
            {validatorExperience.length === 0 ? (
              <article className="card mt-16">
                <h3>Details coming soon</h3>
                <p className="org">Validator projects will be listed here.</p>
              </article>
            ) : (
              <div className="stack">
                {validatorExperience.map((item) => (
                  <article className="card" key={item.name}>
                    <div className="exp-top">
                      <div>
                        <h3>{item.name}</h3>
                        <p className="org">{item.network}</p>
                      </div>
                      <p className="dates">{item.since}</p>
                    </div>
                    <ul className="points">
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            )}
          </Reveal>
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
                <Reveal delay={(i % 4) * 70} className="amb-reveal">
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
              Own project and client work
            </h2>
          </Reveal>
          <div className="grid-3">
            {projects.map((project, i) => (
              <Reveal key={project.href} delay={i * 90}>
                <a
                  className="card project"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="kicker">{project.kind}</p>
                  <h3>{project.name}</h3>
                  <p className="host">{hostOf(project.href)}</p>
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
          <Reveal delay={120}>
            <article className="card mt-16">
              <h3>Telegram</h3>
              <p className="section-intro">
                <a href={profile.communityUrl} target="_blank" rel="noopener noreferrer">
                  {profile.communityUrl}
                </a>
              </p>
            </article>
          </Reveal>
        </section>

        <section id="contact" aria-labelledby="contact-title">
          <Reveal>
            <p className="kicker">Contact</p>
            <h2 id="contact-title" className="kinetic">
              Reach {profile.handle}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <address>
              <ul className="contact">
                <li>
                  <span>Email</span>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </li>
                <li>
                  <span>Telegram</span>
                  <a href={profile.telegram} target="_blank" rel="noopener noreferrer">
                    {profile.telegramHandle}
                  </a>
                </li>
                <li>
                  <span>X</span>
                  <a href={profile.x} target="_blank" rel="noopener noreferrer">
                    {profile.xHandle}
                  </a>
                </li>
                <li>
                  <span>GitHub</span>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer">
                    github.com/Dexanode
                  </a>
                </li>
              </ul>
            </address>
          </Reveal>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <p>{profile.handle}</p>
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
