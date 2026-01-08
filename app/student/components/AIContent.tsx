// components/courses/AIContent.tsx
import { Course } from "../../types/course"

type Props = {
  course: Course
}

export default function AIContent({ course }: Props) {
  return (
    <div className="prose max-w-none bg-white p-6 rounded-xl border">
      {course.modules.map((module) => (
        <section key={module.title}>
          <h2>{module.title}</h2>

          {module.lessons.map((lesson) => (
            <article key={lesson.title}>
              <h3>{lesson.title}</h3>
              <p>{lesson.content}</p>
            </article>
          ))}
        </section>
      ))}
    </div>
  )
}
