'use client'

import { useState } from 'react'
import ModalWrapper from './ModalWrapper'
import { FiCalendar, FiClock, FiEdit3 } from 'react-icons/fi'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const ScheduleClass = ({ isOpen, onClose }: Props) => {
  const today = new Date().toISOString().split('T')[0]
  const [time, setTime] = useState('')
  const [error, setError] = useState('')

  const handleTimeChange = (value: string) => {
    if (!value) return

    const [hours] = value.split(':').map(Number)

    if (hours < 8 || hours >= 17) {
      setError('Please select a time between 8:00 AM and 5:00 PM')
      return
    }

    setError('')
    setTime(value)
  }

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Schedule an Extra Class">
      <form className="space-y-5">
        
        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Date
          </label>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
            <input
              type="date"
              min={today}
              className="w-full pl-10 pr-3 py-2.5 border rounded-xl
                         focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            />
          </div>
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Time
          </label>
          <div className="relative">
            <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
            <input
              type="time"
              value={time}
              onChange={(e) => handleTimeChange(e.target.value)}
              min="08:00"
              max="17:00"
              className={`w-full pl-10 pr-3 py-2.5 border rounded-xl outline-none
                focus:ring-2 focus:ring-blue-400
                ${error ? 'border-red-400' : 'border-gray-300'}`}
            />
          </div>

          {error ? (
            <p className="text-xs text-red-500 mt-1">{error}</p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">
              Available between 8:00 AM and 5:00 PM
            </p>
          )}
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reason for Extra Class
          </label>
          <div className="relative">
            <FiEdit3 className="absolute left-3 top-3 text-blue-500" />
            <textarea
              rows={4}
              placeholder="Briefly explain why you need an extra class..."
              className="w-full pl-10 pr-3 py-2.5 border rounded-xl resize-none
                         focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!!error || !time}
          className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium
                     disabled:opacity-50 disabled:cursor-not-allowed
                     hover:bg-blue-600 transition"
        >
          Submit Request
        </button>
      </form>
    </ModalWrapper>
  )
}

export default ScheduleClass
