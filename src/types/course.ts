export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Course {
  slug: string;
  title: string;
  level: CourseLevel;
  duration: string;
  lessons: number;
  labs: number;
  price: string;
  tag?: string;
  description: string;
  skills?: string[];
}
