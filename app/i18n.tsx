"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "en" | "id";

export type ExperienceItem = {
  role: string;
  org: string;
  dates: string;
  points: string[];
};

export type SkillGroup = {
  title: string;
  blurb: string;
  items: string[];
};

export type NavItem = {
  href: string;
  label: string;
};

export type Dict = {
  skip: string;
  menuOpen: string;
  menuClose: string;
  getInTouch: string;
  brandRole: string;
  nav: NavItem[];
  heroRoleLine: string;
  marquee: string[];
  aboutKicker: string;
  aboutTitle: string;
  aboutIntro: string;
  skillsKicker: string;
  skillsTitle: string;
  skillsIntro: string;
  findOutMore: string;
  skillGroups: SkillGroup[];
  expKicker: string;
  expTitle: string;
  experience: ExperienceItem[];
  valKicker: string;
  valTitle: string;
  valSoon: string;
  valSoonSub: string;
  ambKicker: string;
  ambTitle: string;
  projKicker: string;
  projTitle: string;
  projIntro: string;
  openProject: string;
  kindOwn: string;
  kindClient: string;
  commKicker: string;
  commTitle: string;
  contactKicker: string;
  contactTitle: string;
  contactLabels: string[];
  footerNote: string;
  preloaderQuotes: string[];
};

const en: Dict = {
  skip: "Skip to content",
  menuOpen: "Menu",
  menuClose: "Close",
  getInTouch: "GET IN TOUCH",
  brandRole: "WEB3 BUILDER / COMMUNITY MANAGER",
  nav: [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#validator", label: "Node Validator" },
    { href: "#ambassador", label: "Ambassador" },
    { href: "#projects", label: "Projects" },
    { href: "#community", label: "Community" },
    { href: "#contact", label: "Contact" },
  ],
  heroRoleLine: "Web3 builder & community manager. Anonymous by design.",
  marquee: [
    "Web3 builder",
    "Community manager",
    "Content creator",
    "Node validator",
    "Jakarta, ID",
  ],
  aboutKicker: "About",
  aboutTitle: "Community development in crypto and Web3.",
  aboutIntro:
    "0xDexa works as a web3 builder, community manager, and content creator. The community work is about 5 years, covering moderation, community management, and technical customer support.",
  skillsKicker: "Skills",
  skillsTitle: "What he works with",
  skillsIntro:
    "A practical toolkit built over five years in crypto — from code to community.",
  findOutMore: "FIND OUT MORE",
  skillGroups: [
    {
      title: "Programming and development",
      blurb:
        "Rust and Python development, auto-trading bots, and smart contract auditing — built for the on-chain world.",
      items: [
        "Rust",
        "Python",
        "Auto-trading bot development",
        "Smart contract auditing",
      ],
    },
    {
      title: "Trading and DeFi",
      blurb:
        "DeFi liquidity, the Solana ecosystem, on-chain analytics, and disciplined risk management.",
      items: [
        "DeFi liquidity and protocols",
        "Solana ecosystem",
        "On-chain analytics",
        "Risk management and position sizing",
      ],
    },
    {
      title: "Community and growth",
      blurb:
        "Community marketing, outreach, and content planning — growing communities that stay.",
      items: [
        "Community marketing",
        "Outreach",
        "Social media marketing",
        "Content planning",
        "AI training",
      ],
    },
  ],
  expKicker: "Experience",
  expTitle: "Roles",
  experience: [
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
  ],
  valKicker: "Node Validator",
  valTitle: "Validator experience",
  valSoon: "Details coming soon",
  valSoonSub: "Validator projects will be listed here.",
  ambKicker: "Ambassador and KOL",
  ambTitle: "Programs",
  projKicker: "Projects",
  projTitle: "Selected work",
  projIntro:
    "A curated selection of recent projects, where code meets the on-chain world.",
  openProject: "OPEN PROJECT",
  kindOwn: "Own project",
  kindClient: "Client work",
  commKicker: "Community",
  commTitle: "Airdrop Sultan Indonesia",
  contactKicker: "Contact",
  contactTitle: "Let's build something together.",
  contactLabels: ["Email", "Telegram", "X", "GitHub"],
  footerNote: "0xDexa — Jakarta, ID",
  preloaderQuotes: [
    "Web3 builder",
    "Community manager",
    "Content creator",
    "Anonymous by design",
  ],
};

const id: Dict = {
  skip: "Lewati ke konten",
  menuOpen: "Menu",
  menuClose: "Tutup",
  getInTouch: "HUBUNGI SAYA",
  brandRole: "WEB3 BUILDER / COMMUNITY MANAGER",
  nav: [
    { href: "#about", label: "Tentang" },
    { href: "#skills", label: "Skill" },
    { href: "#experience", label: "Pengalaman" },
    { href: "#validator", label: "Node Validator" },
    { href: "#ambassador", label: "Ambassador" },
    { href: "#projects", label: "Proyek" },
    { href: "#community", label: "Komunitas" },
    { href: "#contact", label: "Kontak" },
  ],
  heroRoleLine: "Web3 builder & community manager. Didesain untuk anonim.",
  marquee: [
    "Web3 builder",
    "Community manager",
    "Content creator",
    "Node validator",
    "Jakarta, ID",
  ],
  aboutKicker: "Tentang",
  aboutTitle: "Pengembangan komunitas di crypto dan Web3.",
  aboutIntro:
    "0xDexa adalah web3 builder, community manager, dan content creator. Pengalaman di komunitas sekitar 5 tahun, mencakup moderasi, manajemen komunitas, dan technical customer support.",
  skillsKicker: "Skill",
  skillsTitle: "Yang dia kerjakan",
  skillsIntro:
    "Toolkit praktis yang dibangun selama lima tahun di crypto — dari code sampai komunitas.",
  findOutMore: "SELENGKAPNYA",
  skillGroups: [
    {
      title: "Pemrograman dan pengembangan",
      blurb:
        "Pengembangan Rust dan Python, auto-trading bot, dan audit smart contract — dibangun untuk dunia on-chain.",
      items: [
        "Rust",
        "Python",
        "Auto-trading bot development",
        "Smart contract auditing",
      ],
    },
    {
      title: "Trading dan DeFi",
      blurb:
        "Likuiditas DeFi, ekosistem Solana, analitik on-chain, dan manajemen risiko yang disiplin.",
      items: [
        "DeFi liquidity and protocols",
        "Solana ecosystem",
        "On-chain analytics",
        "Risk management and position sizing",
      ],
    },
    {
      title: "Komunitas dan pertumbuhan",
      blurb:
        "Community marketing, outreach, dan content planning — menumbuhkan komunitas yang bertahan.",
      items: [
        "Community marketing",
        "Outreach",
        "Social media marketing",
        "Content planning",
        "AI training",
      ],
    },
  ],
  expKicker: "Pengalaman",
  expTitle: "Peran",
  experience: [
    {
      role: "Customer Support Teknis",
      org: "Dawn Trade",
      dates: "Oktober 2026 – Sekarang",
      points: [
        "Menangani tiket untuk masalah teknis",
        "Menyelesaikan masalah on-chain",
      ],
    },
    {
      role: "Manajer Komunitas",
      org: "Starfish Finance",
      dates: "Mei 2022 – Sekarang",
      points: [
        "Membantu menjawab semua pertanyaan dan menerima feedback dari komunitas",
        "Membangun kepercayaan komunitas dan menjalankan event",
        "Berinteraksi dengan member Discord",
        "Menghandle games dan trivia",
      ],
    },
    {
      role: "Manajer Komunitas",
      org: "Tidefi Chain",
      dates: "Juli 2022 – 2023",
      points: [
        "Membantu tim mengembangkan strategi marketing",
        "Membangun kepercayaan komunitas dan menjalankan event",
        "Membantu menjawab semua pertanyaan dan menerima feedback dari komunitas",
      ],
    },
    {
      role: "Moderator Lokal Indonesia",
      org: "El Dorado (Australia)",
      dates: "September 2022 – 2023",
      points: [
        "Membangun kepercayaan komunitas dan menjalankan event",
        "Membantu menjawab semua pertanyaan dan menerima feedback dari komunitas",
      ],
    },
    {
      role: "Manajer Komunitas",
      org: "Si02 Finance",
      dates: "Juni 2022 – September 2022",
      points: [
        "Membuat artikel tentang Si02 Finance dan demo grafik",
        "Membangun kepercayaan komunitas dan menjalankan event",
        "Membantu menjawab semua pertanyaan dan menerima feedback dari komunitas",
      ],
    },
    {
      role: "Moderator",
      org: "Pulse Chain",
      dates: "Juli 2021 – Desember 2021",
      points: [
        "Membantu menjawab semua pertanyaan dan menerima feedback dari komunitas",
        "Melakukan riset agar tetap up to date",
      ],
    },
  ],
  valKicker: "Node Validator",
  valTitle: "Pengalaman validator",
  valSoon: "Detail segera hadir",
  valSoonSub: "Project validator akan ditampilkan di sini.",
  ambKicker: "Ambassador dan KOL",
  ambTitle: "Program",
  projKicker: "Proyek",
  projTitle: "Pekerjaan pilihan",
  projIntro:
    "Pilihan project terbaru yang dikurasi, tempat code bertemu dunia on-chain.",
  openProject: "BUKA PROYEK",
  kindOwn: "Project sendiri",
  kindClient: "Project klien",
  commKicker: "Komunitas",
  commTitle: "Airdrop Sultan Indonesia",
  contactKicker: "Kontak",
  contactTitle: "Mari bangun sesuatu bersama.",
  contactLabels: ["Email", "Telegram", "X", "GitHub"],
  footerNote: "0xDexa — Jakarta, ID",
  preloaderQuotes: [
    "Web3 builder",
    "Community manager",
    "Content creator",
    "Didesain untuk anonim",
  ],
};

export const dict: Record<Lang, Dict> = { en, id };

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({ lang: "en", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  return { ...ctx, t: dict[ctx.lang] };
}
