import React from 'react'
import { FiUser, FiClipboard, FiBarChart } from 'react-icons/fi'

const DashCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* Card 1 */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100
                      rounded-2xl shadow-sm hover:shadow-md transition
                      p-6 border border-blue-200">
        <div className="flex items-center justify-between">
          <h3 className="text-blue-700 font-semibold">
            Current Students
          </h3>
          <div className="bg-blue-200 text-blue-700 rounded-full p-3">
            <FiUser size={22} />
          </div>
        </div>

        <p className="text-4xl font-bold text-blue-800 mt-6">
          125
        </p>
        <p className="text-sm text-blue-600 mt-1">
          Active learners enrolled
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-gradient-to-br from-green-50 to-green-100
                      rounded-2xl shadow-sm hover:shadow-md transition
                      p-6 border border-green-200">
        <div className="flex items-center justify-between">
          <h3 className="text-green-700 font-semibold">
            Exams This Week
          </h3>
          <div className="bg-green-200 text-green-700 rounded-full p-3">
            <FiClipboard size={22} />
          </div>
        </div>

        <p className="text-4xl font-bold text-green-800 mt-6">
          12
        </p>
        <p className="text-sm text-green-600 mt-1">
          Exam Date: 15/01/2026
        </p>
      </div>

      {/* Card 3 – Performance Breakdown */}
      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100
                      rounded-2xl shadow-sm hover:shadow-md transition
                      p-6 border border-yellow-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-yellow-700 font-semibold">
            Average Student Performance
          </h3>
          <div className="bg-yellow-200 text-yellow-700 rounded-full p-3">
            <FiBarChart size={22} />
          </div>
        </div>

        <p className="text-4xl font-bold text-yellow-800">62%</p>
        <p className="text-sm font-bold text-yellow-800 mt-1">Excellent</p>
      </div>

    </div>
  )
}

export default DashCards
