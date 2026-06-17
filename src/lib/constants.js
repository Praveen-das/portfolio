import obsidianImg from "../assets/projects/obsidian.png";
import visionImg from "../assets/projects/vision.png";
import signalImg from "../assets/projects/signal.png";
import voidImg from "../assets/projects/void.png";

export const PROJECTS = [
  {
    id: "01",
    title: "OBSIDIAN",
    category: "DIGITAL PRODUCT",
    year: "2024",
    image: obsidianImg,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    description: "A minimalist workspace designed for thinkers and creators. Obsidian redefines productivity through a brutalist lens, focusing on raw interaction and spatial depth.",
  },
  {
    id: "02",
    title: "VISION",
    category: "ART DIRECTION",
    year: "2024",
    image: visionImg,
    techStack: ["React", "Three.js", "WebGL", "GLSL"],
    description: "An immersive digital exhibition exploring the intersection of light and memory. Vision uses real-time WebGL distortions to create an ever-evolving visual narrative.",
  },
  {
    id: "03",
    title: "SIGNAL",
    category: "BRAND IDENTITY",
    year: "2023",
    image: signalImg,
    techStack: ["Node.js", "PostgreSQL", "Redis", "Docker"],
    description: "A high-performance infrastructure built for seamless communication. Signal focuses on the raw transmission of data, visualized through a technical and precise design system.",
  },
  {
    id: "04",
    title: "VOID",
    category: "INTERACTIVE EXP",
    year: "2023",
    image: voidImg,
    techStack: ["Unity", "C#", "ARKit", "Blender"],
    description: "A journey into the unknown. Void is an interactive AR experience that collapses the boundary between physical reality and digital abstraction.",
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

export const PRELOAD_IMAGES = [
  ...PROJECTS.map((p) => p.image),
  ...SEQUENCE_IMAGES,
];
