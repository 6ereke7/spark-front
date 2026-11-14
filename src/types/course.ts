import type { CourseLevel, Instructor, Week } from "./apiContract";

export type {
  CourseContent,
  CourseLevel,
  Instructor,
  Week,
} from "./apiContract";

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

export interface CourseDetail {
  slug: string;
  outcomes: string[];
  startDate: string;
  totalSeats: number;
  seatsLeft: number;
  priceEtb?: number;
  schedule: string;
  platform?: string;
  language?: string;
  cohortsPerYear?: number;
  weeks: Week[];
  requirements: string[];
  audience: string[];
  instructors: Instructor[];
}

export type CourseWithDetail = Course & CourseDetail;
