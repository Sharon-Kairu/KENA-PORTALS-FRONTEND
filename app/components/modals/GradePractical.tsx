'use client'

import React, { useState } from 'react'

interface GradePracticalProps {
  practicalName: string
  studentName: string
  onCancel: () => void
  onGrade: (comment: 'Excellent' | 'Good' | 'Fair') => void
}

const GradePractical = ({
  practicalName,
  studentName,
  onCancel,
  onGrade,
}: GradePracticalProps) => {
  const [comment, setComment] = useState<'Excellent' | 'Good' | 'Fair'>('Good')

  const commentStyles = {
    Excellent: 'border-green-300 bg-green-50 text-green-700',
    Good: 'border-orange-300 bg-orange-50 text-orange-700',
    Fair: 'border-yellow-300 bg-yellow-50 text-yellow-700',
  } as const

  return (
    <div className="space-y-6">
      {/* Info Section */}
      <div className="space-y-4">
        {/* Practical Name */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
            Practical
          </label>
          <input
            type="text"
            value={practicalName}
            readOnly
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5
                       bg-gray-100 text-sm text-gray-700"
          />
        </div>

        {/* Student Name */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
            Student
          </label>
          <input
            type="text"
            value={studentName}
            readOnly
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5
                       bg-gray-100 text-sm text-gray-700"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200" />

      {/* Comment */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
          Instructor Comment
        </label>
        <select
          value={comment}
          onChange={(e) => setComment(e.target.value as any)}
          className={`w-full rounded-xl border px-4 py-2.5 text-sm font-medium
                      focus:outline-none focus:ring-2 focus:ring-offset-1
                      ${commentStyles[comment]}`}
        >
          <option value="Excellent">Excellent</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={onCancel}
          className="px-5 py-2 rounded-xl text-sm font-medium
                     border border-red-200 text-red-600
                     hover:bg-red-50 active:scale-[0.98]
                     transition"
        >
          Cancel
        </button>

        <button
          onClick={() => onGrade(comment)}
          className="px-5 py-2 rounded-xl text-sm font-medium
                     bg-green-600 text-white
                     hover:bg-green-700 active:scale-[0.98]
                     transition"
        >
          Grade Practical
        </button>
      </div>
    </div>
  )
}

export default GradePractical
