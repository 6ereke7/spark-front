import type { Course } from "../types/course";

export const courses: Course[] = [
  {
    slug: "ethical-hacking-foundations",
    title: "Foundations of Ethical Hacking",
    level: "Beginner",
    duration: "12 weeks",
    sessions: 24,
    labs: 5,
    price: "ETB 4,500",
    tag: "Start here",
    description:
      "Build a foundation in security principles and responsible testing. Learn how ethical hackers work within clear legal boundaries.",
    skills: ["Security fundamentals", "Threat modeling", "Ethical practice", "Linux basics"],
  },
  {
    slug: "network-defense",
    title: "Network Defense & Recon",
    level: "Beginner",
    duration: "12 weeks",
    sessions: 24,
    labs: 4,
    price: "ETB 6,500",
    description:
      "Understand network structure, asset discovery, and defensive visibility. Practice reading network information in guided labs.",
    skills: ["Network basics", "Asset discovery", "Traffic analysis", "Defense in depth"],
  },
  {
    slug: "web-security",
    title: "Web Security Essentials",
    level: "Intermediate",
    duration: "12 weeks",
    sessions: 24,
    labs: 7,
    price: "ETB 8,000",
    description:
      "Study common web application risks and ways to prevent them. Apply each concept in controlled, authorized practice environments.",
    skills: ["HTTP fundamentals", "Input validation", "Session security", "Secure design"],
  },
];
