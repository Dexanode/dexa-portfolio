export const profile = {
  handle: "DEXA",
  roles: ["Web3 builder", "Community manager", "Content creator"],
  summary:
    "Crypto and Web3 community manager and moderator, also called community development, with about 5 years in crypto community work.",
  email: "erulbathory@gmail.com",
  github: "https://github.com/Dexanode",
  x: "https://x.com/0xdxa_",
  xHandle: "@0xdxa_",
  telegram: "https://t.me/dexa555",
  telegramHandle: "@dexa555",
  communityUrl: "https://t.me/airdropsultanindonesia",
  communityName: "Airdrop Sultan Indonesia",
} as const;

export const skillGroups = [
  {
    title: "Programming and development",
    items: [
      "Rust",
      "Python",
      "Auto-trading bot development",
      "Smart contract auditing",
    ],
  },
  {
    title: "Trading and DeFi",
    items: [
      "DeFi liquidity and protocols",
      "Solana ecosystem",
      "On-chain analytics",
      "Risk management and position sizing",
    ],
  },
  {
    title: "Community and growth",
    items: [
      "Community marketing",
      "Outreach",
      "Social media marketing",
      "Content planning",
      "AI training",
    ],
  },
] as const;

export const experience = [
  {
    role: "Customer Support Technical",
    org: "Dawn Trade",
    dates: "October 2026 – Present",
    points: [
      "Handle tickets for technical issues",
      "Solving on-chain issues",
    ],
  },
  {
    role: "Community Manager",
    org: "Starfish Finance",
    dates: "May 2022 – Present",
    points: [
      "Help answer all questions and receive feedback from the community",
      "Building community trust and running events",
      "Engaging with Discord members",
      "Handling games and trivia",
    ],
  },
  {
    role: "Community Manager",
    org: "Tidefi Chain",
    dates: "July 2022 – 2023",
    points: [
      "Assist the team to develop marketing strategy",
      "Building community trust and running events",
      "Help answer all questions and receive feedback from the community",
    ],
  },
  {
    role: "Local Moderator Indonesia",
    org: "El Dorado (Australia)",
    dates: "September 2022 – 2023",
    points: [
      "Building community trust and running events",
      "Help answer all questions and receive feedback from the community",
    ],
  },
  {
    role: "Community Manager",
    org: "Si02 Finance",
    dates: "June 2022 – September 2022",
    points: [
      "Create an article about Si02 Finance and make a demo graphic",
      "Building community trust and running events",
      "Help answer all questions and receive feedback from the community",
    ],
  },
  {
    role: "Moderator",
    org: "Pulse Chain",
    dates: "July 2021 – December 2021",
    points: [
      "Help answer all questions and receive feedback from the community",
      "Conduct research to keep up to date",
    ],
  },
] as const;

export const ambassadors: Array<{
  name: string;
  /** Path under /public. Rendered grayscale; falls back to monogram when absent. */
  logo?: string;
  /** White logos need inverting on the light theme to stay visible. */
  logoInvertLight?: boolean;
  /** Black logos need inverting on the dark theme to stay visible. */
  logoInvertDark?: boolean;
}> = [
  { name: "Pontem", logo: "/logos/ambassador/pontem.svg", logoInvertDark: true },
  { name: "Manta", logo: "/logos/ambassador/manta.svg" },
  { name: "PolkaDex", logo: "/logos/ambassador/polkadex.svg" },
  { name: "Duck Chain", logo: "/logos/ambassador/duckchain.svg" },
  { name: "Inery", logo: "/logos/validators/inery.svg" },
  { name: "SOON SVM" },
  { name: "Coral Finance" },
  { name: "SuperFortune" },
  { name: "Wall App" },
  { name: "Bittime" },
  { name: "Socrates", logo: "/logos/ambassador/socrates.svg" },
  { name: "OKX", logo: "/logos/ambassador/okx.svg" },
];

/** Validator networks — logos supplied by the user via Google Drive (Empower excluded per request). */
export const validators: Array<{ name: string; logo: string }> = [
  { name: "Sui", logo: "/logos/validators/sui.svg" },
  { name: "Sei", logo: "/logos/validators/sei.svg" },
  { name: "Quicksilver", logo: "/logos/validators/quicksilver.svg" },
  { name: "SubQuery", logo: "/logos/validators/subquery.svg" },
  { name: "Forta", logo: "/logos/validators/forta.svg" },
  { name: "KYVE", logo: "/logos/validators/kyve.svg" },
  { name: "Aptos", logo: "/logos/validators/aptos.svg" },
  { name: "Archway", logo: "/logos/validators/archway.svg" },
  { name: "Akash", logo: "/logos/validators/akash.svg" },
  { name: "Upticek", logo: "/logos/validators/upticek.svg" },
  { name: "Stratos", logo: "/logos/validators/stratos.svg" },
  { name: "Teritori", logo: "/logos/validators/teritori.svg" },
  { name: "Stride", logo: "/logos/validators/stride.svg" },
  { name: "Fleek", logo: "/logos/validators/fleek.svg" },
  { name: "Taiko", logo: "/logos/validators/taiko.svg" },
  { name: "Ronin", logo: "/logos/validators/ronin.svg" },
  { name: "Wormhole", logo: "/logos/validators/wormhole.svg" },
  { name: "Inery", logo: "/logos/validators/inery.svg" },
  { name: "Q Blockchain", logo: "/logos/validators/qblockchain.svg" },
  { name: "Gitopia", logo: "/logos/validators/gitopia.svg" },
  { name: "Nolus", logo: "/logos/validators/nolus.svg" },
  { name: "Lava", logo: "/logos/validators/lava.svg" },
  { name: "Celestia", logo: "/logos/validators/celestia.svg" },
  { name: "Nibiru", logo: "/logos/validators/nibiru.svg" },
  { name: "Humans.ai", logo: "/logos/validators/humans.svg" },
  { name: "Mars", logo: "/logos/validators/mars.svg" },
  { name: "PlanQ", logo: "/logos/validators/planq.svg" },
  { name: "Lambda", logo: "/logos/validators/lambda.svg" },
];

/** Experience org name (as in copy.ts) -> logo. */
export const experienceLogos: Record<
  string,
  { logo: string; logoInvertLight?: boolean }
> = {
  "Dawn Trade": { logo: "/logos/experience/dawn.svg" },
  "Starfish Finance": { logo: "/logos/experience/starfish.svg" },
  "Tidefi Chain": { logo: "/logos/experience/tidelabs.svg" },
  "SiO2 Finance": { logo: "/logos/experience/sio2.svg" },
  "Pulse Chain": { logo: "/logos/experience/pulsechain.svg" },
};

export const projects: Array<{
  name: string;
  kind: "Own project" | "Client work";
  href: string;
  /** Path under /public. Rendered grayscale; falls back to monogram when absent. */
  logo?: string;
  /** White logos need inverting on the light theme to stay visible. */
  logoInvertLight?: boolean;
}> = [
  {
    name: "Strix Range",
    kind: "Own project",
    href: "https://strix-range.site",
  },
  {
    name: "Sova Protocol",
    kind: "Client work",
    href: "https://sovaprotocol.xyz",
    logo: "/logos/sova.svg",
    logoInvertLight: true,
  },
  {
    name: "Tumbuh",
    kind: "Client work",
    href: "http://tumbuh-six.vercel.app",
  },
];

export const validatorExperience: Array<{
  name: string;
  network: string;
  since: string;
  points: string[];
}> = [];

export const nav = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#validator", label: "Node Validator" },
  { href: "#ambassador", label: "Ambassador" },
  { href: "#projects", label: "Projects" },
  { href: "#community", label: "Community" },
  { href: "#contact", label: "Contact" },
] as const;
