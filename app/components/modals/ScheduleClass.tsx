'use client'

import { useState, useEffect } from 'react'
import ModalWrapper from './ModalWrapper'
import { FiCalendar, FiClock, FiEdit3, FiAlertCircle } from 'react-icons/fi'
import apiService from '@/app/services/apiService'

interface Props {
  isOpen: boolean
  onClose: () => void
}

interface Course {
  id: string
  name: string
}

interface EnrollmentData {
  subscription_plan: string | { name: string } | null
  standalone_courses: Course[]
  subscription_courses: Course[]
}

const ScheduleClass = ({ isOpen, onClose }: Props) => {
  const today = new Date().toISOString().split('T')[0]
  const [time, setTime] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [enrollment, setEnrollment] = useState<EnrollmentData | null>(null)
  const [selectedCourse, setSelectedCourse] = useState('')
  const [requestDate, setRequestDate] = useState('')
  const [reason, setReason] = useState('')

  // Fetch enrollment when modal opens
  useEffect(() => {
    if (!isOpen) return

    const fetchEnrollment = async () => {
      setLoading(true)
      try {
        const res = await apiService.getWithToken('/students/me/') 
        console.log('API Response:', res) // Debug log
        
        // The enrollment data comes directly from res.data.enrollment
        if (res.enrollment) {
          const enrollmentData = res.enrollment
          
          const normalizedData: EnrollmentData = {
            subscription_plan: enrollmentData.subscription_plan?.name || 
                             enrollmentData.subscription_plan || 
                             '',
            standalone_courses: Array.isArray(enrollmentData.standalone_courses) 
              ? enrollmentData.standalone_courses 
              : [],
            subscription_courses: Array.isArray(enrollmentData.subscription_courses) 
              ? enrollmentData.subscription_courses 
              : []
          }
          
          console.log('Normalized enrollment:', normalizedData) 
          setEnrollment(normalizedData)
        } else {
          console.log('No enrollment data found')
          setEnrollment(null)
        }
      } catch (err) {
        console.error('Error fetching enrollment', err)
        setError('Failed to load enrollment data')
      } finally {
        setLoading(false)
      }
    }

    fetchEnrollment()
  }, [isOpen])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCourse || !time || !requestDate) return

    try {
      await apiService.postWithToken('/extra_classes/register/', {
        course: selectedCourse,
        request_date: requestDate,   // date from date input
        request_time: time,          // time from time input
        request_reason: reason,      // reason from textarea
      })

      alert('Extra class request submitted!')
      setTime('')
      setReason('')
      setSelectedCourse('')
      setRequestDate('') 
      onClose()
    } catch (err) {
      console.error(err)
      alert('Error submitting request')
    }
  }


  // Merge courses for dropdown
  const allCourses: Course[] = enrollment
    ? [
        ...(Array.isArray(enrollment.standalone_courses) ? enrollment.standalone_courses : []),
        ...(Array.isArray(enrollment.subscription_courses) ? enrollment.subscription_courses : [])
      ]
    : []

  // Get subscription plan name (handle both string and object)
  const subscriptionPlanName = typeof enrollment?.subscription_plan === 'string' 
    ? enrollment.subscription_plan 
    : enrollment?.subscription_plan?.name || ''

  // Check if subscription is Bronze
  const isBronze = subscriptionPlanName.toLowerCase() === 'bronze'

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Schedule an Extra Class">
      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading your courses...</p>
        </div>
      ) : !enrollment ? (
        <div className="text-center py-8">
          <p className="text-red-600">Failed to load enrollment data. Please try again.</p>
        </div>
      ) : (
        <>
          {/* Subscription Info */}
          {subscriptionPlanName && (
            <div className={`mb-4 p-3 rounded-lg ${isBronze ? 'bg-amber-50 border border-amber-200' : 'bg-blue-50 border border-blue-200'}`}>
              <p className="text-sm font-medium text-gray-700">
                Your Subscription: <span className="font-semibold">{subscriptionPlanName}</span>
              </p>
            </div>
          )}

          {/* Bronze Restriction Message */}
          {isBronze && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="text-orange-500 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-orange-800 mb-1">Upgrade Required</h4>
                  <p className="text-sm text-orange-700">
                    Seems your subscription is Bronze. Please upgrade to Gold or Platinum to schedule extra classes.
                  </p>
                </div>
              </div>
            </div>
          )}
          {!isBronze && (
            <form className={`space-y-5`} onSubmit={handleSubmit}>
            {/* Course */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Course
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                disabled={isBronze}
                className="w-full pl-3 pr-3 py-2.5 border rounded-xl
                           focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none
                           disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <option value="">-- Select a course --</option>
                {allCourses.map((course) => (
                  <option key={course.id} value={course.name}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

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
                  value={requestDate}
                  onChange={(e) => setRequestDate(e.target.value)}
                  disabled={isBronze}
                  className="w-full pl-10 pr-3 py-2.5 border rounded-xl
                            focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none
                            disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
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
                  disabled={isBronze}
                  className={`w-full pl-10 pr-3 py-2.5 border rounded-xl outline-none
                    focus:ring-2 focus:ring-blue-400
                    disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60
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
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  disabled={isBronze}
                  placeholder="Briefly explain why you need an extra class..."
                  className="w-full pl-10 pr-3 py-2.5 border rounded-xl resize-none
                             focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none
                             disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isBronze || !!error || !time || !selectedCourse}
              className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium
                         disabled:opacity-50 disabled:cursor-not-allowed
                         hover:bg-blue-600 transition"
            >
              {isBronze ? 'Upgrade to Gold or Platinum' : 'Submit Request'}
            </button>
          </form>
          )}
          
        </>
      )}
    </ModalWrapper>
  )
}

export default ScheduleClass