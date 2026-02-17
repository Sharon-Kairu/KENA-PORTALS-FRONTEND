'use client'

import { useState } from 'react'
import ModalWrapper from './ModalWrapper'
import { FiAlertTriangle } from 'react-icons/fi'

interface DeactivateInstructorModalProps {
  isOpen: boolean
  onClose: () => void
  instructorName: string
  onConfirm: () => Promise<void>
}

const DeactivateInstructor = ({ 
  isOpen, 
  onClose, 
  instructorName, 
  onConfirm 
}: DeactivateInstructorModalProps) => {
  const [isDeactivating, setIsDeactivating] = useState(false)

  const handleConfirm = async () => {
    try {
      setIsDeactivating(true)
      await onConfirm()
      onClose()
    } catch (error) {
      console.error('Failed to deactivate instructor:', error)
    } finally {
      setIsDeactivating(false)
    }
  }

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Deactivate Instructor">
      <div className="space-y-4">
        {/* Warning Icon */}
        <div className="flex justify-center">
          <div className="bg-red-100 rounded-full p-4">
            <FiAlertTriangle size={40} color="#DC2626" />
          </div>
        </div>

        {/* Confirmation Message */}
        <div className="text-center space-y-2">
          <p className="text-gray-700 text-base">
            Are you sure you want to deactivate
          </p>
          <p className="text-xl font-bold text-gray-900">
            {instructorName}?
          </p>
          <p className="text-sm text-gray-500 mt-2">
            The instructor will no longer be able to access their account.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            disabled={isDeactivating}
            className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isDeactivating}
            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
          >
            {isDeactivating ? 'Deactivating...' : 'Deactivate'}
          </button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default DeactivateInstructor
