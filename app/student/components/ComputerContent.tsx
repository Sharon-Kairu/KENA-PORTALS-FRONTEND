// components/courses/ComputerContent.tsx
import { Course } from "../../types/course"

type Props = {
  course: Course
}

export default function ComputerContent({ course }: Props) {
  return (
    <div className="space-y-4">
      {course.modules.map((module) => (
        <details
          key={module.title}
          className="bg-white rounded-xl border p-5"
        >
          <summary className="cursor-pointer font-bold text-lg">
            {module.title}
          </summary>

          <div className="mt-4 space-y-3">
            {module.lessons.map((lesson) => (
              <div key={lesson.title}>
                <h4 className="font-semibold">{lesson.title}</h4>
                <p className="text-sm text-gray-600">
                  {lesson.content}
                </p>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  )
}
