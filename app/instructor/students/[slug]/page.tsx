'use client'

import React from 'react'
import { getStudent } from '../../../lib/getStudent'
import Detail from '@/app/components/Detail'

type PageProps = {
  params: {
    slug: string
  }
}

type CommentType = 'Excellent' | 'Good' | 'Fair'

const page = ({ params }: PageProps) => {
  const student = getStudent(params.slug)

  if (!student) {
    return <div className="ml-5 lg:ml-64 p-6 text-red-600 font-semibold">Student not found</div>
  }

  // Completed practicals
  const getCompletedPracticals = () =>
    student.pracs.flatMap(prac => prac.features).filter(f => f.status === 'Completed')

  const countComments = () => {
    const counts = { Excellent: 0, Good: 0, Fair: 0 }
    getCompletedPracticals().forEach(f => {
      if (f.comment in counts) counts[f.comment as CommentType]++
    })
    return counts
  }

  const calculateAverage = () => {
    const scores = { Excellent: 10, Good: 5, Fair: 1 }
    const completed = getCompletedPracticals()
    if (!completed.length) return { label: 'N/A', score: 0 }

    const total = completed.reduce((sum, f) => sum + scores[f.comment as CommentType], 0)
    const avg = total / completed.length

    let label: CommentType
    if (avg >= 7) label = 'Excellent'
    else if (avg >= 4) label = 'Good'
    else label = 'Fair'

    return { label, score: avg.toFixed(1) }
  }

  const completedCount = getCompletedPracticals().length
  const commentCounts = countComments()
  const average = calculateAverage()

  const badgeColors = {
    Excellent: 'bg-green-100 text-green-800',
    Good: 'bg-orange-100 text-orange-800',
    Fair: 'bg-yellow-100 text-yellow-800',
  }

  return (
    <div className="ml-5 lg:ml-64 p-4 md:p-8 space-y-6">

      {/* Student Name Section */}
      <div className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40
                h-20 p-4 md:p-6 md:h-25 pl-16 lg:pl-6
                border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-green-500 tracking-tight">Student: {student.name}</h1>
        <p className="text-sm md:text-base opacity-90 mt-1">{student.email}</p>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 mt-24 md:mt-28 space-y-6">

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-green-300 via-white to-green-100 rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center">
            <p className="text-sm text-green-700 font-medium">Completed Practicals</p>
            <p className="text-3xl font-bold text-green-800 mt-1">{completedCount}</p>
          </div>

          <div className="bg-gradient-to-r from-blue-300 via-white to-blue-100 rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center">
            <p className="text-sm text-blue-700 font-medium">Average Performance</p>
            <span className={`text-xl font-bold text-blue-800 px-3 py-1 rounded-full mt-1`}>
              {average.label}
            </span>
            <p className="text-sm text-blue-600 mt-1">Score: {average.score}</p>
          </div>
        </div>

        {/* Comment Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Comment Breakdown</h2>
          <div className="flex justify-around items-center space-x-4">
            {(['Excellent', 'Good', 'Fair'] as CommentType[]).map(type => (
              <div key={type} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${badgeColors[type]} font-bold text-lg`}>
                  {commentCounts[type]}
                </div>
                <p className="mt-2 font-semibold text-gray-700">{type}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Info Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Student Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <Detail label="First Name" value="Alice" />
              <Detail label="Last Name" value="Mwangi" />
              <Detail label="Email Address" value="alice.mwangi@gmail.com" />
              <Detail label="Phone Number" value="+254 713015849" />
              <Detail label="National ID" value="31667592" />
              <Detail label="Date of Birth" value="02/10/1993" />
              <Detail label="Gender" value="Female" />
            </div>
          </div>

          {/* Next of Kin Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Next of Kin Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <Detail label="First Name" value="Mark" />
              <Detail label="Last Name" value="Kangethe" />
              <Detail label="Relationship" value="Father" />
              <Detail label="Phone Number" value="+254 722450988" />
              <Detail label="Email Address" value="mark.ngethe2@email.com" />
              <Detail label="Occupation" value="Teacher" />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default page
