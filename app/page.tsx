import {
  ambassadors,
  education,
  experience,
  nav,
  profile,
  projects,
  skillGroups,
} from "@/content";

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

export default function HomePage() {
  return (
    <>
      <a className="skip" href="#about">
        Skip to content
      </a>
      <header className="header">
        <div className="header-inner">
          <a className="wordmark" href="#hero">
            {profile.handle}
          </a>
          <nav className="nav" aria-label="Sections">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main className="wrap">
        <section className="hero" id="hero" aria-labelledby="hero-title">
          <p className="kicker">Portfolio</p>
          <h1 id="hero-title">{profile.name}</h1>
          <p className="handle">{profile.handle}</p>
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
          <p className="kicker">About</p>
          <h2 id="about-title">Community development in crypto and Web3</h2>
          <p className="section-intro">
            {profile.name} works as a web3 builder, community manager, and
            content creator. The community work is about 5 years, covering
            moderation, community management, and technical customer support.
          </p>
        </section>

        <section id="skills" aria-labelledby="skills-title">
          <p className="kicker">Skills</p>
          <h2 id="skills-title">What he works with</h2>
          <div className="grid-3">
            {skillGroups.map((group) => (
              <article className="card" key={group.title}>
                <h3>{group.title}</h3>
                <ul className="skill-list">
                  {group.items.map((item) => (
                    <li className={chipClass(item)} key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" aria-labelledby="experience-title">
          <p className="kicker">Experience</p>
          <h2 id="experience-title">Roles</h2>
          <div className="stack">
            {experience.map((job) => (
              <article className="card" key={`${job.org}-${job.dates}`}>
                <div className="exp-top">
                  <div>
                    <h3>{job.role}</h3>
                    <p className="org">{job.org}</p>
                  </div>
                  <p className="dates">{job.dates}</p>
                </div>
                <ul className="points">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="ambassador" aria-labelledby="ambassador-title">
          <p className="kicker">Ambassador and KOL</p>
          <h2 id="ambassador-title">Programs</h2>
          <ul className="amb-grid">
            {ambassadors.map((name) => (
              <li className="amb" key={name}>
                {name}
              </li>
            ))}
          </ul>
        </section>

        <section id="projects" aria-labelledby="projects-title">
          <p className="kicker">Projects</p>
          <h2 id="projects-title">Own project and client work</h2>
          <div className="grid-3">
            {projects.map((project) => (
              <a
                className="card project"
                key={project.href}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="kicker">{project.kind}</p>
                <h3>{project.name}</h3>
                <p className="host">{hostOf(project.href)}</p>
              </a>
            ))}
          </div>
        </section>

        <section id="education" aria-labelledby="education-title">
          <p className="kicker">Education</p>
          <h2 id="education-title">{education.field}</h2>
          <article className="card mt-16">
            <h3>{education.school}</h3>
            <p className="org">{education.field}</p>
          </article>
        </section>

        <section id="community" aria-labelledby="community-title">
          <p className="kicker">Community</p>
          <h2 id="community-title">{profile.communityName}</h2>
          <article className="card mt-16">
            <h3>Telegram</h3>
            <p className="section-intro">
              <a href={profile.communityUrl} target="_blank" rel="noopener noreferrer">
                {profile.communityUrl}
              </a>
            </p>
          </article>
        </section>

        <section id="contact" aria-labelledby="contact-title">
          <p className="kicker">Contact</p>
          <h2 id="contact-title">Reach {profile.handle}</h2>
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
        </section>
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <p>
            {profile.name} · {profile.handle}
          </p>
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
