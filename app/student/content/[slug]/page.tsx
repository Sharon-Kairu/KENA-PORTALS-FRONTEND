// app/courses/[slug]/page.tsx
import { notFound } from "next/navigation"
import { getCourseBySlug } from "../../../lib/getCourses"
import DrivingContent from "../../components/DrivingContent"
import ComputerContent from "../../components/ComputerContent"
import AIContent from "../../components/AIContent"

type PageProps = {
  params: {
    slug: string
  }
}

export default function CoursePage({ params }: PageProps) {
  const course = getCourseBySlug(params.slug)

  if (!course) {
    notFound()
  }

  return (
    <div className="ml-25 md:ml-64 p-4 md:p-6 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h1 className="text-3xl font-bold text-gray-800">
          {course.title}
        </h1>
        <p className="text-gray-600 mt-2">
          {course.description}
        </p>
      </div>

      {/* Content */}
      {course.category === "driving" && (
        <DrivingContent course={course} />
      )}

      {course.category === "computer" && (
        <ComputerContent course={course} />
      )}

      {course.category === "ai" && (
        <AIContent course={course} />
      )}
    </div>
  )
}
