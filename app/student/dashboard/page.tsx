'use client'
import { useState } from 'react'
import { AiFillMoneyCollect } from 'react-icons/ai'
import { FiCalendar, FiUserCheck, FiClock, FiMessageSquare } from 'react-icons/fi'
import ScheduleClass from '@/app/components/modals/ScheduleClass'
import StudentComment from '@/app/components/modals/StudentComment'

const data = [
  { id: 1, date: '2025-12-12', practical: 'Practical One', status: 'pass',comment:'Needs Practice' },
  { id: 2, date: '2025-12-17', practical: 'Practical Two', status: 'pass',comment:'Very Good' },
  { id: 3, date: 'N/A', practical: 'Reverse', status: 'pending' ,comment:'N/A' },
]

const Page = () => {
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showCommentModal, setShowCommentModal] = useState(false)

  return (
    <div className="ml-25 md:ml-64">
      {/* Header – fixed on top */}
      <div className="fixed top-0 left-0 right-0 left-20 md:left-64 bg-white z-50 p-4 md:p-6 border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Student Dashboard</h1>
        <p className="text-green-600 text-md md:text-lg mt-1">Welcome, Sharon Kairu</p>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 mt-24 md:mt-28 space-y-6">
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Fees Paid */}
          <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-blue-700 font-semibold text-lg">Total Fees Paid</h2>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <AiFillMoneyCollect size={22} />
              </div>
            </div>
            <p className="mt-4 text-3xl font-bold text-blue-800">Ksh. 10,000</p>
            <p className="text-sm text-blue-600 mt-1">of 13,750</p>
          </div>

          {/* Exam Countdown */}
          <div className="bg-green-50 p-6 rounded-xl shadow-sm border border-green-100">
            <div className="flex items-center justify-between">
              <h2 className="text-green-700 font-semibold text-lg">Days to Final Exam</h2>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-700">
                <FiCalendar size={22} />
              </div>
            </div>
            <p className="mt-4 text-3xl font-bold text-green-800">18 Days</p>
            <p className="text-sm text-green-600 mt-1">Keep practicing, you’re almost there 🚗</p>
          </div>

          {/* Instructor Change */}
          <div className="bg-orange-50 p-6 rounded-xl shadow-sm border border-orange-100">
            <div className="flex items-center justify-between">
              <h2 className="text-orange-700 font-semibold text-lg">Instructor Change</h2>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 text-orange-700">
                <FiUserCheck size={22} />
              </div>
            </div>
            <p className="mt-4 text-3xl font-bold text-orange-800">5 Days</p>
            <p className="text-sm text-orange-600 mt-1">You can request a new instructor after this</p>
          </div>
        </div>

        {/* Schedule & Comment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Schedule a class */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-xl text-blue-600">Schedule an Extra Class</h2>
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <FiClock size={22} />
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Need more time on a topic or a make-up session? Book an extra class at your convenience.
            </p>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="w-full bg-blue-500 text-white py-2.5 rounded-lg font-medium hover:bg-blue-600 transition"
            >
              Schedule Class
            </button>
          </div>

          {/* Comment / Assistance */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-xl text-green-600">Need Help or More Practice?</h2>
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <FiMessageSquare size={22} />
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Share your questions, feedback, or areas you’d like more support with, and we’ll assist you.
            </p>
            <button
              onClick={() => setShowCommentModal(true)}
              className="w-full bg-green-500 text-white py-2.5 rounded-lg font-medium hover:bg-green-600 transition"
            >
              Leave a Comment
            </button>
          </div>
        </div>

        {/* Practical Table */}
        <div className="bg-white p-6 rounded-xl shadow-sm border text-gray-600 border-gray-100 overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Practical Lessons</h2>
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-2 text-gray-600">Date</th>
                <th className="px-4 py-2 text-gray-600">Practical</th>
                <th className="px-4 py-2 text-gray-600">Status</th>
                <th className="px-4 py-2 text-gray-600">Comment</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">{item.practical}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.status === 'pass'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">{item.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modals */}
        <ScheduleClass isOpen={showScheduleModal} onClose={() => setShowScheduleModal(false)} />
        <StudentComment isOpen={showCommentModal} onClose={() => setShowCommentModal(false)} />
      </div>
    </div>
  )
}

export default Page
