'use client'

import React, { useState } from 'react'
import { getStudent } from '@/app/lib/getStudent'
import GradePractical from '@/app/components/modals/GradePractical'
import ModalWrapper from '@/app/components/modals/ModalWrapper'

type PageProps = {
  params: {
    slug: string
  }
}

const Page = ({ params }: PageProps) => {
  const student = getStudent(params.slug)

  const [isOpen, setIsOpen] = useState(false)
  const [selectedPractical, setSelectedPractical] = useState<string | null>(null)

  if (!student) {
    return (
      <div className="ml-5 lg:ml-64 p-6 text-red-600 font-semibold">
        Student not found.
      </div>
    )
  }

  const handleOpenModal = (practicalName: string) => {
    setSelectedPractical(practicalName)
    setIsOpen(true)
  }

  const handleGrade = (comment: 'Excellent' | 'Good' | 'Fair') => {
    console.log({
      student: student.name,
      practical: selectedPractical,
      comment,
    })
    setIsOpen(false)
  }

  const commentStyles = {
    Excellent: 'text-green-500',
    Good: 'text-orange-500',
    Fair: 'text-yellow-500',
  } as const

  return (
    <div className="ml-5 lg:ml-64 p-4 md:p-6 space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-2xl p-5 md:p-6 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Practical Assessments
        </h1>
        <p className="text-sm md:text-base mt-1 opacity-90">
          Student: <span className="font-medium">{student.name}</span>
        </p>
      </div>

      {/* ===== MOBILE VIEW (Cards) ===== */}
      <div className="space-y-4 md:hidden">
        {student.pracs.map(prac =>
          prac.features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 shadow-sm space-y-2"
            >
              <div className="flex justify-between items-center">
                <p className="font-medium text-gray-900">{feature.title}</p>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border
                    ${
                      feature.status === 'Completed'
                        ? 'bg-green-100 text-green-700 border-green-200'
                        : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                    }`}
                >
                  {feature.status}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-700">
                <span>Date: {feature.date}</span>
                <span
                  className={feature.comment ? commentStyles[feature.comment] : 'text-gray-400'}
                >
                  {feature.comment || '—'}
                </span>
              </div>

              <button
                onClick={() => handleOpenModal(feature.title)}
                disabled={feature.status === 'Completed'}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium mt-2
                  ${
                    feature.status === 'Completed'
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700 active:scale-[0.98] transition'
                  }`}
              >
                {feature.status === 'Completed' ? 'Graded' : 'Grade Now'}
              </button>
            </div>
          ))
        )}
      </div>

      {/* ===== DESKTOP VIEW (Table) ===== */}
      <div className="hidden md:block bg-white rounded-2xl p-4 shadow-md overflow-x-auto">
        <table className="min-w-full text-sm lg:text-base">
          <thead className="border-b border-gray-200">
            <tr className="text-left text-gray-700">
              <th className="px-6 py-4 font-semibold">Practical</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Comment</th>
              <th className="px-6 py-4 font-semibold text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {student.pracs.map(prac =>
              prac.features.map((feature, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-green-100 transition rounded-lg"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">{feature.title}</td>
                  <td className="px-6 py-4 text-gray-600">{feature.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border
                        ${
                          feature.status === 'Completed'
                            ? 'bg-green-100 text-green-700 border-green-200'
                            : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                        }`}
                    >
                      {feature.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    {feature.comment ? (
                      <span className={commentStyles[feature.comment]}>
                        {feature.comment}
                      </span>
                    ) : (
                      <span className="text-gray-400 font-normal">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {feature.status === 'Completed' ? (
                      <button
                        disabled
                        className="px-4 py-2 rounded-lg text-xs font-medium bg-gray-200 text-gray-500 cursor-not-allowed"
                      >
                        Graded
                      </button>
                    ) : (
                      <button
                        onClick={() => handleOpenModal(feature.title)}
                        className="px-4 py-2 rounded-lg text-xs font-medium bg-green-600 text-white hover:bg-green-700 transition"
                      >
                        Grade Now
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <ModalWrapper
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Grade Practical"
      >
        {selectedPractical && (
          <GradePractical
            practicalName={selectedPractical}
            studentName={student.name}
            onCancel={() => setIsOpen(false)}
            onGrade={handleGrade}
          />
        )}
      </ModalWrapper>
    </div>
  )
}

export default Page
