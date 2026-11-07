import { courses } from "./courses";
import type { Course, CourseDetail } from "../types/course";

export type CourseWithDetail = Course & CourseDetail;

const courseDetails: CourseDetail[] = [
  {
    slug: "ethical-hacking-foundations",
    outcomes: [
      "Explain the legal and ethical boundaries of an authorized security assessment.",
      "Identify common operating-system, network, and web security terms.",
      "Build a basic threat model for a small example organization.",
      "Recognize common account and configuration risks in a guided lab.",
      "Interpret sample system and application logs to identify unusual activity.",
      "Prioritize findings by likelihood, impact, and remediation effort.",
      "Write a concise security finding with evidence and a practical mitigation.",
      "Present a small, permission-based assessment plan for review.",
    ],
    startDate: "Jan 10, 2027",
    totalSeats: 24,
    seatsLeft: 8,
    priceEtb: 4500,
    schedule: "Sat & Sun, 7:00 PM EAT",
    platform: "Live on Zoom, community on Telegram",
    language: "English",
    cohortsPerYear: 4,
    weeks: [
      { title: "Ethics, consent, and scope", topics: ["Authorization and responsible practice", "Defining scope and rules of engagement"] },
      { title: "Security foundations", topics: ["Confidentiality, integrity, and availability", "Threats, vulnerabilities, and risk"] },
      { title: "Operating-system essentials", topics: ["Linux and Windows concepts", "Users, permissions, and secure configuration"] },
      { title: "Networks in context", topics: ["Addressing and common network services", "How defensive controls protect traffic"] },
      { title: "Threat modeling", topics: ["Assets and trust boundaries", "Documenting likely threats and mitigations"] },
      { title: "Identity and access", topics: ["Authentication and authorization", "Account hygiene and multi-factor authentication"] },
      { title: "Logs and visibility", topics: ["Reading sample system logs", "Recognizing patterns that merit investigation"] },
      { title: "Vulnerability management", topics: ["Understanding severity and exposure", "Prioritizing remediation work"] },
      { title: "Web application basics", topics: ["Requests, responses, and sessions", "Common defensive design principles"] },
      { title: "Safe assessment planning", topics: ["Writing a permission-based test plan", "Communicating risk and constraints"] },
      { title: "Reporting and remediation", topics: ["Clear evidence and impact statements", "Actionable recommendations for owners"] },
      { title: "Foundations capstone", topics: ["Reviewing a fictional environment", "Presenting findings and next steps"] },
    ],
    requirements: [
      "A laptop or desktop computer and a reliable internet connection.",
      "No prior security experience is required.",
      "A willingness to follow the course ethics and lab-safety rules.",
    ],
    audience: [
      "You are new to cybersecurity and want a guided starting point.",
      "You want to understand how ethical security work is scoped and reported.",
      "You are building a foundation before choosing a technical specialty.",
    ],
    instructors: [
      {
        name: "Instructor Name",
        role: "Lead instructor",
        bio: "Guides the cohort through security fundamentals, responsible practice, and clear reporting.",
      },
    ],
    faqs: [
      { q: "Do I need security experience?", a: "No. The course starts with foundational concepts and builds up gradually." },
      { q: "Is the course fully online?", a: "Yes. Live sessions run on Zoom, with cohort communication and materials shared on Telegram." },
      { q: "Are labs included?", a: "Yes. Guided labs use controlled learning environments and focus on authorized practice." },
      { q: "What happens if I miss a live session?", a: "Contact the cohort team for the session notes and available catch-up guidance." },
      { q: "Do I receive a certificate?", a: "Certificate availability and completion criteria will be confirmed by the academy before enrollment." },
    ],
  },
  {
    slug: "network-defense",
    outcomes: [
      "Describe how common network components connect users, services, and devices.",
      "Create a basic asset inventory from a provided organization scenario.",
      "Explain the purpose of DNS, web, and remote-access services.",
      "Interpret sample network and firewall logs for defensive context.",
      "Identify configuration and exposure concerns in a controlled lab.",
      "Map a simple network diagram with trust boundaries and key controls.",
      "Recommend practical visibility and hardening improvements.",
      "Summarize network observations in a concise defensive report.",
    ],
    startDate: "Jan 10, 2027",
    totalSeats: 20,
    seatsLeft: 6,
    priceEtb: 6500,
    schedule: "Sat & Sun, 7:00 PM EAT",
    platform: "Live on Zoom, community on Telegram",
    language: "English",
    cohortsPerYear: 4,
    weeks: [
      { title: "Network defense and scope", topics: ["Defensive goals and authorization", "Building a safe assessment boundary"] },
      { title: "Network building blocks", topics: ["Routers, switches, and firewalls", "Private networks and segmentation"] },
      { title: "Addressing and name services", topics: ["IP addressing concepts", "DNS roles and defensive considerations"] },
      { title: "Common network services", topics: ["Web, email, and remote-access services", "Reducing unnecessary exposure"] },
      { title: "Asset inventory", topics: ["Documenting devices and owners", "Maintaining an accurate asset register"] },
      { title: "Network diagrams", topics: ["Representing paths and trust boundaries", "Reviewing a small example topology"] },
      { title: "Traffic visibility", topics: ["Network telemetry concepts", "Reading provided traffic summaries"] },
      { title: "Logs and alert context", topics: ["Firewall and service log fields", "Separating routine activity from concerns"] },
      { title: "Secure configuration", topics: ["Baseline settings and change control", "Common configuration review questions"] },
      { title: "Segmentation and resilience", topics: ["Limiting unnecessary access", "Planning for service continuity"] },
      { title: "Defensive review lab", topics: ["Reviewing a fictional network scenario", "Prioritizing visibility improvements"] },
      { title: "Network defense capstone", topics: ["Presenting an asset and risk summary", "Recommending a practical defense plan"] },
    ],
    requirements: [
      "A laptop or desktop computer and a reliable internet connection.",
      "Basic computer familiarity; prior networking experience is helpful but not required.",
      "A commitment to practice only in the provided, authorized learning environment.",
    ],
    audience: [
      "You want to understand how networks are organized and defended.",
      "You are starting a career in IT support, security operations, or infrastructure.",
      "You want practice interpreting network information from a defensive perspective.",
    ],
    instructors: [
      {
        name: "Instructor Name",
        role: "Network security instructor",
        bio: "Focuses on practical network visibility, asset management, and defensive controls.",
      },
    ],
    faqs: [
      { q: "Should I already know networking?", a: "No. We introduce core network concepts and provide optional preparation notes." },
      { q: "Will I work with real external networks?", a: "No. Practical work uses provided examples and controlled, authorized learning environments." },
      { q: "What does the schedule look like?", a: "The cohort meets live on Saturdays and Sundays at 7:00 PM EAT for 12 weeks." },
      { q: "Where are course materials shared?", a: "Materials and cohort communication are provided through the Telegram community." },
      { q: "How many seats are available?", a: "This cohort is limited to 20 participants; the current number of open seats is shown on this page." },
    ],
  },
  {
    slug: "web-security",
    outcomes: [
      "Explain how browsers, web servers, and APIs exchange information.",
      "Identify common web security risks from realistic, non-production examples.",
      "Review input-handling and access-control decisions against secure principles.",
      "Recognize secure session-management and authentication practices.",
      "Assess sample application findings for impact and remediation priority.",
      "Recommend validation, authorization, and data-protection improvements.",
      "Document a web security concern with clear evidence and a safe reproduction context.",
      "Present a short application security review and remediation roadmap.",
    ],
    startDate: "Jan 10, 2027",
    totalSeats: 18,
    seatsLeft: 4,
    priceEtb: 8000,
    schedule: "Sat & Sun, 7:00 PM EAT",
    platform: "Live on Zoom, community on Telegram",
    language: "English",
    cohortsPerYear: 4,
    weeks: [
      { title: "Application security and authorization", topics: ["Responsible review boundaries", "Secure development lifecycle overview"] },
      { title: "HTTP and browser foundations", topics: ["Requests, responses, and headers", "Browser trust and same-origin concepts"] },
      { title: "Application structure", topics: ["Routes, APIs, and data flows", "Identifying trust boundaries"] },
      { title: "Input and output handling", topics: ["Validation and normalization principles", "Context-aware output encoding"] },
      { title: "Authentication design", topics: ["Credential and account protections", "Multi-factor and recovery considerations"] },
      { title: "Authorization decisions", topics: ["Server-side access checks", "Least privilege and ownership rules"] },
      { title: "Sessions and browser protections", topics: ["Secure session lifecycle", "Cookie and browser security settings"] },
      { title: "Data protection", topics: ["Sensitive data handling", "Encryption and retention principles"] },
      { title: "API security review", topics: ["Consistent input and permission checks", "Safe error and response design"] },
      { title: "Dependency and configuration risk", topics: ["Keeping components maintained", "Secrets and deployment configuration"] },
      { title: "Review and remediation lab", topics: ["Assessing a deliberately safe sample app", "Prioritizing secure code improvements"] },
      { title: "Web security capstone", topics: ["Writing a concise application review", "Presenting a remediation roadmap"] },
    ],
    requirements: [
      "A laptop or desktop computer and a reliable internet connection.",
      "Basic familiarity with websites and web browsers.",
      "Some programming or web-development experience is helpful, but not essential.",
    ],
    audience: [
      "You build or maintain web applications and want stronger security habits.",
      "You are moving from general IT into application security.",
      "You want a structured way to review and communicate application risks.",
    ],
    instructors: [
      {
        name: "Instructor Name",
        role: "Application security instructor",
        bio: "Teaches secure web design and practical ways to communicate remediation priorities.",
      },
      {
        name: "Instructor Name",
        role: "Guest mentor",
        bio: "Supports cohort reviews with a focus on secure development and application risk.",
      },
    ],
    faqs: [
      { q: "Do I need to be a developer?", a: "Development experience helps, but the course explains concepts for learners from several technical backgrounds." },
      { q: "Are the examples safe to practice with?", a: "Yes. All practical activities use provided examples and controlled learning environments." },
      { q: "Will this cover both websites and APIs?", a: "Yes. The syllabus covers browser-based applications as well as common API design concerns." },
      { q: "How long is the cohort?", a: "It runs for 12 weeks, with live sessions on Saturday and Sunday evenings." },
      { q: "How do I get course materials?", a: "Materials and cohort updates are shared through Telegram; live classes are hosted on Zoom." },
    ],
  },
];

export function getCourseDetail(slug: string): CourseWithDetail | undefined {
  const course = courses.find((item) => item.slug === slug);
  const detail = courseDetails.find((item) => item.slug === slug);

  if (!course || !detail) {
    return undefined;
  }

  return { ...course, ...detail };
}
