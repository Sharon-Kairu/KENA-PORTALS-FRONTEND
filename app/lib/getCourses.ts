// lib/getCourse.ts
import { courses } from "../data/courses"
import { Course } from "../types/course"

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find(course => course.slug === slug)
}
