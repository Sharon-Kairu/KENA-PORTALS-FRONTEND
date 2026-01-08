'use client'

import { useState } from 'react'
import ModalWrapper from './ModalWrapper'
import { FiMessageSquare, FiEdit3 } from 'react-icons/fi'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const StudentComment = ({ isOpen, onClose }: Props) => {
  const [comment, setComment] = useState('')

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Leave a Comment"
    >
      <form className="space-y-5">
        
        {/* Description */}
        <p className="text-sm text-gray-600">
          Share your feedback, questions, or areas where you’d like more assistance.
        </p>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Comment
          </label>

          <div className="relative">
            <FiEdit3 className="absolute left-3 top-3 text-green-500" />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Type your message here..."
              rows={5}
              maxLength={300}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl resize-none
                         focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            />
          </div>

          {/* Character counter */}
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Max 300 characters</span>
            <span>{comment.length}/300</span>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!comment.trim()}
          className="w-full bg-green-500 text-white py-3 rounded-xl font-medium
                     disabled:opacity-50 disabled:cursor-not-allowed
                     hover:bg-blue-600 active:scale-[0.98] transition"
        >
          Send Comment
        </button>
      </form>
    </ModalWrapper>
  )
}

export default StudentComment
