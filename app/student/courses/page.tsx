
import React from "react"
import { FaCar, FaComputer, FaRobot } from "react-icons/fa6"
import Link from "next/link"
import { practicals } from "../../data/practicals"



const getIcon = (slug: string) => {
  switch (slug) {
    case "driving":
      return <FaCar size={22} className="text-blue-700" />
    case "computer":
      return <FaComputer size={22} className="text-green-700" />
    case "ai":
      return <FaRobot size={22} className="text-orange-700" />
    default:
      return <FaCar size={22} />
  }
}

// Helper to get badge color based on slug
const getBadgeColor = (slug: string) => {
  switch (slug) {
    case "driving":
      return "bg-blue-100 text-blue-700"
    case "computer":
      return "bg-green-100 text-green-700"
    case "ai":
      return "bg-orange-100 text-orange-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

// Main Page Component
const page = () => {
  return (
    <div className="ml-25 md:ml-64">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 left-20 md:left-64 bg-white z-50 p-4 md:p-6 border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Courses</h1>
        <p className="text-green-600 text-md md:text-lg mt-1">Welcome, Sharon Kairu</p>
      </div>

      {/* Main content */}
      <div className="p-4 md:p-6 mt-24 md:mt-28 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {practicals.map((course) => {
            const completed = course.features.filter(f => f.status === "Completed").length
            const total = course.features.length
            const next = course.features.find(f => f.status === "Pending")

            return (
              <div key={course.slug} className="bg-white p-4 rounded-xl space-y-6">
                {/* Course Header */}
                <div className="flex flex-row justify-between items-center">
                  <h1
                    className={`font-bold text-2xl ${
                      course.slug === "driving"
                        ? "text-blue-700"
                        : course.slug === "computer"
                        ? "text-green-700"
                        : "text-orange-700"
                    }`}
                  >
                    {course.title}
                  </h1>
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full ${getBadgeColor(course.slug)}`}>
                    {getIcon(course.slug)}
                  </div>
                </div>

                {/* Progress Badge */}
                <div className={`w-full p-4 rounded-lg text-xl font-bold ${getBadgeColor(course.slug)}`}>
                  {completed} <span className="text-lg">out of {total} {course.slug === "computer" ? "packages" : course.slug === "ai" ? "units" : "practicals"} done</span>
                </div>

                {/* Next Practical */}
                <p className="text-gray-800 font-bold text-xl">Next {course.slug === "computer" ? "Package" : course.slug === "ai" ? "Unit" : "Practical"}:</p>
                <p className="text-gray-600 text-lg">{next ? next.title : "All completed!"}</p>

                {/* View Course Link */}
                <Link href={`/student/courses/${course.slug}`} className="block mt-6">
                  <button className={`w-full p-4 rounded-xl text-white ${
                    course.slug === "driving" ? "bg-blue-500 hover:bg-blue-600" :
                    course.slug === "computer" ? "bg-green-500 hover:bg-green-600" :
                    "bg-orange-500 hover:bg-orange-600"
                  }`}>
                    View Course details
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

export default page
