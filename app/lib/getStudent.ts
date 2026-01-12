import { students } from "../data/students";
import { student } from "../types/student";

export function getStudent(slug: string):student | undefined {
  return students.find(student => student.slug === slug);
}