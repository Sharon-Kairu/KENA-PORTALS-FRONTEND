'use client'

import React from 'react'
import Link from 'next/link'
import { students } from '../../data/students'

const Page = () => {
  return (
    <div className="ml-5 lg:ml-64">
      {/* Header – fixed on top */}
      <div
        className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40
                   h-20 md:h-25 p-4 md:p-6 pl-16 lg:pl-6
                   border-b border-gray-200 shadow-sm"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Instructor Dashboard
        </h1>
        <p className="text-gray-600 text-md md:text-lg mt-1">
          Welcome, Instructor One
        </p>
      </div>

      {/* Gradebook content */}
      <div className="p-4 md:p-6 mt-24 md:mt-28 space-y-6">
        {/* Search bar */}
        <div className="mb-4">
          <input
            className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter student name..."
          />
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Practical Date</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => {
                const completedFeatures = student.pracs
                    .flatMap(prac => prac.features)
                    .filter(f => f.status === 'Completed')

                // Find the latest date among completed features
                let lastCompletedDate: string = 'N/A'
                if (completedFeatures.length > 0) {
                    const latestFeature = completedFeatures.reduce((prev, current) =>
                    new Date(current.date) > new Date(prev.date) ? current : prev
                    )
                    lastCompletedDate = latestFeature.date
                }

                return (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{lastCompletedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <Link
                        href={`/student/${student.slug}`}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
                      >
                        Grade Next Practical
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

export default Page
