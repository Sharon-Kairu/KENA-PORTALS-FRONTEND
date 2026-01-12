import React from 'react'
import {students} from '../../data/students'
import Link from 'next/link'

const page = () => {
  return (
    <div className='ml-5 lg:ml-64'>
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40
                h-20 md:h-25 p-4 md:p-6 pl-16 lg:pl-6
                border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">All Students</h1>
        <p className="text-green-600 text-md md:text-lg mt-1">Welcome, Instructor One</p>
      </div>
        {/* Main content */}
      <div className="p-4 md:p-6 mt-24 space-y-6">
        <input
          className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-green-500"
          type="text"
          placeholder="Search student..."
        />
        {/* ===== MOBILE VIEW (Cards) ===== */}
        <div className="space-y-4 md:hidden">
            {students.map((student) => {
            const completedFeatures = student.pracs
                .flatMap(prac => prac.features)
                .filter(f => f.status === 'Completed')

            let lastCompletedDate = 'N/A'
            if (completedFeatures.length > 0) {
                lastCompletedDate = completedFeatures.reduce((prev, current) =>
                new Date(current.date) > new Date(prev.date) ? current : prev
                ).date
            }

            return (
                <div
                key={student.id}
                className="bg-white border rounded-xl p-4 shadow-sm space-y-2"
                >
                <div>
                    <p className="text-sm text-gray-500">Student</p>
                    <p className="font-semibold text-green-500">{student.name}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-700 text-sm">{student.email}</p>
                </div>

                <div className="flex justify-between items-center">
                    <div>
                    <p className="text-sm text-gray-500">Last Practical</p>
                    <p className="text-gray-700 text-sm">{lastCompletedDate}</p>
                    </div>

                    <Link
                    href={`/instructor/students/${student.slug}`}
                    className="px-3 py-2 bg-green-600 text-white text-sm
                                rounded-lg font-medium hover:bg-green-700"
                    >
                    View Details
                    </Link>
                </div>
                </div>
            )
            })}
        </div>

        {/* ===== DESKTOP VIEW (Table) ===== */}
<div className="hidden md:block bg-white p-4 shadow rounded-lg overflow-x-auto">
  <table className="min-w-full text-lg">
    <thead>
      <tr className="border-b border-gray-200">
        <th className="px-6 py-4 text-left font-semibold text-gray-700">ID</th>
        <th className="px-6 py-4 text-left font-semibold text-gray-700">Name</th>
        <th className="px-6 py-4 text-left font-semibold text-gray-700">Email</th>
        <th className="px-6 py-4 text-left font-semibold text-gray-700">Last Practical</th>
        <th className="px-6 py-4 text-right font-semibold text-gray-700">Action</th>
      </tr>
    </thead>

    <tbody>
      {students.map((student) => {
        const completedFeatures = student.pracs
          .flatMap(prac => prac.features)
          .filter(f => f.status === 'Completed')

        let lastCompletedDate = 'N/A'
        if (completedFeatures.length > 0) {
          lastCompletedDate = completedFeatures.reduce((prev, current) =>
            new Date(current.date) > new Date(prev.date) ? current : prev
          ).date
        }

        return (
          <tr
            key={student.id}
            className="transition rounded-lg hover:bg-green-100 hover:shadow-md"
          >
            <td className="px-6 py-4 text-gray-700">{student.id}</td>
            <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
            <td className="px-6 py-4 text-gray-700">{student.email}</td>
            <td className="px-6 py-4 text-gray-700">{lastCompletedDate}</td>
            <td className="px-6 py-4 text-right">
              <Link
                href={`/instructor/students/${student.slug}`}
                className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg font-medium hover:bg-green-700 transition"
              >
                View Details
              </Link>
            </td>
          </tr>
        )
      })}
    </tbody>
  </table>
</div>
   
      </div>
    </div>
  )
}

export default page
