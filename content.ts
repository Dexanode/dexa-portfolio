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

export const ambassadors = [
  "Pontem",
  "Manta",
  "PolkaDex",
  "Duck Chain",
  "Inery",
  "SOON SVM",
  "Coral Finance",
  "SuperFortune",
  "Wall App",
  "Bittime",
  "Socrates",
  "OKX",
] as const;

export const projects = [
  {
    name: "Strix Range",
    kind: "Own project",
    href: "https://strix-range.site",
  },
  {
    name: "Sova Protocol",
    kind: "Client work",
    href: "https://sovaprotocol.xyz",
  },
  {
    name: "Tumbuh",
    kind: "Client work",
    href: "http://tumbuh-six.vercel.app",
  },
] as const;

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
