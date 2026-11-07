export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Course {
  slug: string;
  title: string;
  level: CourseLevel;
  duration: string;
  sessions: number;
  labs: number;
  price: string;
  tag?: string;
  description: string;
  skills?: string[];
}

export interface Week {
  title: string;
  topics: string[];
}

export interface Instructor {
  name: string;
  role: string;
  bio: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface CourseDetail {
  slug: string;
  outcomes: string[];
  startDate: string;
  totalSeats: number;
  seatsLeft: number;
  priceEtb: number;
  schedule: string;
  platform: string;
  language: string;
  cohortsPerYear: number;
  weeks: Week[];
  requirements: string[];
  audience: string[];
  instructors: Instructor[];
  faqs: Faq[];
}
