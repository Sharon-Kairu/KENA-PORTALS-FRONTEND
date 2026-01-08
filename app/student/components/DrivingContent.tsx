// components/courses/DrivingContent.tsx
import { Course } from "../../types/course"

type Props = {
  course: Course
}

export default function DrivingContent({ course }: Props) {
  return (
    <div className="space-y-6">
      {course.modules.map((module) => (
        <div
          key={module.title}
          className="bg-white p-5 rounded-xl border"
        >
          <h2 className="text-xl font-bold mb-4">
            {module.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {module.lessons.map((lesson) => (
              <div
                key={lesson.title}
                className="p-4 border rounded-lg"
              >
                <h3 className="font-semibold">{lesson.title}</h3>
                <p className="text-sm text-gray-600">
                  {lesson.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
