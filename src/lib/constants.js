export const PROJECTS = [
  {
    id: "01",
    title: "VIREL",
    category: "DIGITAL PRODUCT",
    year: "2024",
    image: "./virel.png",
    techStack: ["React", "TypeScript", "TailwindCSS", "Express", "PostgreSQL", "Redis", "OlaMaps"],
    description:
      "Virel is a social discovery platform that connects people with local community events and custom travel routes. Users can explore neighborhoods on an interactive map, find popular regional activities, and plan multi-stop trips. By combining local discovery with group planning tools and a personalized activity feed, Virel makes community engagement simple and engaging.",
    link: "https://client-black-one.vercel.app/",
  },
  {
    id: "02",
    title: "CHATVIA",
    category: "ART DIRECTION",
    year: "2024",
    image: "./chatvia.png",
    techStack: ["React", "TypeScript", "TailwindCSS", "Express", "Socket.io", "Redis", "Kafka", "MongoDB", "Docker"],
    description:
      "A highly scalable, real-time chat app designed for secure global communication. It features private peer-to-peer end-to-end encryption (P2P E2EE) and smart AI assistance for a more helpful, intuitive experience. Built to handle massive growth, it ensures a fast, secure, and completely seamless connection for everyone.",
    link: "https://chatapp-web-alpha.vercel.app/",
  },
  {
    id: "03",
    title: "ARTWORLD",
    category: "BRAND IDENTITY",
    year: "2023",
    image: "artworld.png",
    techStack: ["Next.js", "TypeScript", "MaterialUI", "Express", "Stripe", "PostgreSQL"],
    description:
      "An immersive digital gallery and marketplace designed for art discovery and trade. It features high-fidelity curation, secure transaction flows, and custom dashboard tools that empower artists to build their brand and collectors to acquire verified physical and digital artworks.",
    link: "https://artworld-nine.vercel.app/",
  },
];

// Background Sequence
const sequenceModules = import.meta.glob("../assets/sequences/*.jpg", {
  eager: true,
  import: "default",
});

export const SEQUENCE_IMAGES = Object.keys(sequenceModules)
  .sort()
  .map((key) => sequenceModules[key]);

export const PRELOAD_IMAGES = [...PROJECTS.map((p) => p.image), ...SEQUENCE_IMAGES];
