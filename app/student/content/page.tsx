import React from "react"
import Link from "next/link"
import { courses } from "../../data/courses"
import { coursesUi } from "../../data/coursesUi"

const colorMap = {
  blue: { text: "text-blue-700", bg: "bg-blue-500", hover: "hover:bg-blue-600", soft: "bg-blue-100 text-blue-700" },
  green: { text: "text-green-700", bg: "bg-green-500", hover: "hover:bg-green-600", soft: "bg-green-100 text-green-700" },
  orange: { text: "text-orange-700", bg: "bg-orange-500", hover: "hover:bg-orange-600", soft: "bg-orange-100 text-orange-700" },
} as const

const Page = () => {
  return (
    <div className="ml-25 md:ml-64">
      {/* Header */}
      <div className="fixed top-0 left-20 md:left-64 right-0 bg-white z-50 p-4 md:p-6 border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Content</h1>
        <p className="text-green-600 text-md md:text-lg mt-1">Welcome, Sharon Kairu</p>
      </div>
    
      {/* Main content */}
      <div className="p-4 md:p-6 mt-24 md:mt-28">
        <div className="p- md:p-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Feeling like you need to catch up on class content? We've got you covered!
          </h1>
          <p className="mt-3 text-gray-600 text-md md:text-lg">
            Explore a variety of resources for each course, including instructional videos, audiobooks, and sample questions. 
            Whether you’re revising for exams, practicing practical skills, or just catching up, everything you need is right here in one place.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => {
            const ui = coursesUi.find((c) => c.id === course.id)
            if (!ui) return null

            const { color, icon: Icon, buttonText } = ui
            const styles = colorMap[color]

            return (
              <div
                key={course.id}
                className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className={`${styles.text} font-bold text-2xl`}>{course.title}</h2>

                  <div className={`w-12 h-12 flex items-center justify-center rounded-full ${styles.soft}`}>
                    <Icon size={22} />
                  </div>
                </div>
                <p className="text-gray-600 text-md mt-1 text-sm">{ui.description}</p>

                <Link href={`/student/content/${course.slug}`} className="block mt-6">
                  <button className={`w-full ${styles.bg} ${styles.hover} p-4 rounded-xl text-white font-medium transition`}>
                    {buttonText}
                  </button>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Page
