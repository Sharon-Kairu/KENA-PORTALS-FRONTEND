'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import apiService from '@/app/services/apiService'

export default function StudentDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const studentId = params.studentId as string

  const [studentData, setStudentData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editedData, setEditedData] = useState<any>(null)

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        setLoading(true)
        const data = await apiService.getWithToken(`/students/${studentId}/`)
        console.log('Received data:', data)
        setStudentData(data)
        setEditedData(data.student)
      } catch (err: any) {
        console.error('Failed to fetch student details', err)
        setError('Failed to load student details')
      } finally {
        setLoading(false)
      }
    }

    if (studentId) {
      fetchStudentDetails()
    }
  }, [studentId])

  const handleSave = async () => {
    try {
      setIsSaving(true)
      const updatedData = await apiService.patchWithToken(`/students/${studentId}/`, editedData)
      setStudentData({ ...studentData, student: updatedData })
      setIsEditing(false)
    } catch (err: any) {
      console.error('Failed to save changes', err)
      alert('Failed to save changes: ' + err.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditedData(studentData.student)
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: any, isUserField = false) => {
    if (isUserField) {
      setEditedData({
        ...editedData,
        user: {
          ...editedData.user,
          [field]: value
        }
      })
    } else {
      setEditedData({
        ...editedData,
        [field]: value
      })
    }
  }

  if (loading) {
    return (
      <div className="ml-0 lg:ml-64">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40 h-20 md:h-24 p-4 md:p-6 pl-16 lg:pl-6 border-b border-gray-200 shadow-sm">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Student Details</h1>
          <p className="text-gray-500 mt-1">Loading...</p>
        </div>

        {/* Content */}
        <div className="pt-24 md:pt-28 p-4 md:p-6 flex items-center justify-center h-64">
          <div className="text-gray-500">Loading student details...</div>
        </div>
      </div>
    )
  }

  if (error || !studentData) {
    return (
      <div className="ml-0 lg:ml-64">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40 h-20 md:h-24 p-4 md:p-6 pl-16 lg:pl-6 border-b border-gray-200 shadow-sm">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Student Details</h1>
          <p className="text-red-500 mt-1">Error loading student</p>
        </div>

        {/* Content */}
        <div className="pt-24 md:pt-28 p-4 md:p-6 flex items-center justify-center">
          <div className="text-center bg-white rounded-lg shadow-md p-8 max-w-md">
            <p className="text-red-500 mb-4 text-lg">{error || 'Student not found'}</p>
            <p className="text-gray-500 mb-6">Student ID: {studentId}</p>
            <button
              onClick={() => router.push('/admin/allstudents')}
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
            >
              ← Back to Students
            </button>
          </div>
        </div>
      </div>
    )
  }

  const student = studentData.student
  const enrollment = studentData.enrollment

  return (
    <div className="ml-0 lg:ml-64">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40 h-20 md:h-24 p-4 md:p-6 pl-16 lg:pl-6 border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/admin/allstudents')}
              className="text-gray-600 hover:text-gray-800 font-medium text-lg"
            >
              ←
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {student.user?.first_name} {student.user?.last_name}
              </h1>
              <p className="text-gray-500 text-sm mt-1">{student.student_id}</p>
            </div>
          </div>
          <div className="hidden md:flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Edit Details
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-24 md:pt-28 p-4 md:p-6 space-y-6">
        {/* Mobile Edit Buttons */}
        <div className="md:hidden flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Edit Details
            </button>
          )}
        </div>

        {/* Personal Information Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField
              label="First Name"
              value={isEditing ? editedData.user?.first_name : student.user?.first_name}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('first_name', value, true)}
            />
            <InputField
              label="Last Name"
              value={isEditing ? editedData.user?.last_name : student.user?.last_name}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('last_name', value, true)}
            />
            <InputField
              label="Email"
              value={isEditing ? editedData.user?.email : student.user?.email}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('email', value, true)}
              type="email"
            />
            <InputField
              label="Phone Number"
              value={isEditing ? editedData.user?.phone_number : student.user?.phone_number}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('phone_number', value, true)}
            />
            <div>
              <label className="text-sm text-gray-500 block mb-1">Status</label>
              <span
                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                  student.user?.is_active
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {student.user?.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <InputField
              label="Student ID"
              value={student.student_id}
              isEditing={false}
            />
          </div>
        </div>

        {/* Driving License Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Driving License Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField
              label="PDL Number"
              value={isEditing ? editedData.driving_pdl : student.driving_pdl}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('driving_pdl', value)}
            />
            <InputField
              label="PDL Issue Date"
              value={isEditing ? editedData.driving_pdl_date : student.driving_pdl_date}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('driving_pdl_date', value)}
              type="date"
            />
            <InputField
              label="Exam Date"
              value={isEditing ? editedData.driving_exam_date : student.driving_exam_date}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('driving_exam_date', value)}
              type="date"
            />
          </div>
        </div>

        {/* Next of Kin Information Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Next of Kin Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField
              label="First Name"
              value={isEditing ? editedData.nok_first_name : student.nok_first_name}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('nok_first_name', value)}
            />
            <InputField
              label="Last Name"
              value={isEditing ? editedData.nok_last_name : student.nok_last_name}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('nok_last_name', value)}
            />
            <InputField
              label="Email"
              value={isEditing ? editedData.nok_email : student.nok_email}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('nok_email', value)}
              type="email"
            />
            <InputField
              label="Phone Number"
              value={isEditing ? editedData.nok_phone : student.nok_phone}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('nok_phone', value)}
            />
            <InputField
              label="Relationship"
              value={isEditing ? editedData.nok_relationship : student.nok_relationship}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('nok_relationship', value)}
            />
            <InputField
              label="Occupation"
              value={isEditing ? editedData.nok_occupation : student.nok_occupation}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('nok_occupation', value)}
            />
          </div>
        </div>

        {/* Financial Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Financial Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Total Fees"
              value={isEditing ? editedData.total_fees : student.total_fees}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('total_fees', value)}
              type="number"
            />
            <InputField
              label="Payment Status"
              value={isEditing ? editedData.payment_status : student.payment_status}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('payment_status', value)}
            />
          </div>
        </div>

        {/* Enrollment Information */}
        {enrollment && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Enrollment Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 block mb-1">Enrollment Mode</label>
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                  enrollment.mode === 'subscription' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {enrollment.mode.charAt(0).toUpperCase() + enrollment.mode.slice(1)}
                </span>
              </div>

              {enrollment.mode === 'subscription' && enrollment.subscription_plan && (
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Subscription Plan</label>
                  <p className="text-gray-800 font-medium">{enrollment.subscription_plan.name}</p>
                  {enrollment.subscription_plan.duration && (
                    <p className="text-sm text-gray-600">Duration: {enrollment.subscription_plan.duration}</p>
                  )}
                  {enrollment.subscription_plan.price && (
                    <p className="text-sm text-gray-600">Price: KSh {enrollment.subscription_plan.price}</p>
                  )}
                </div>
              )}

              {enrollment.subscription_courses && enrollment.subscription_courses.length > 0 && (
                <div>
                  <label className="text-sm text-gray-500 block mb-2">Subscription Courses</label>
                  <div className="flex flex-wrap gap-2">
                    {enrollment.subscription_courses.map((course: any) => (
                      <span
                        key={course.id}
                        className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                      >
                        {course.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {enrollment.standalone_courses && enrollment.standalone_courses.length > 0 && (
                <div>
                  <label className="text-sm text-gray-500 block mb-2">Standalone Courses</label>
                  <div className="flex flex-wrap gap-2">
                    {enrollment.standalone_courses.map((course: any) => (
                      <span
                        key={course.id}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {course.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Reusable Input Field Component
function InputField({ 
  label, 
  value, 
  isEditing, 
  onChange, 
  type = 'text' 
}: { 
  label: string
  value: any
  isEditing: boolean
  onChange?: (value: any) => void
  type?: string
}) {
  return (
    <div>
      <label className="text-sm text-gray-500 block mb-1">{label}</label>
      {isEditing && onChange ? (
        <input
          type={type}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />
      ) : (
        <p className="text-gray-800 font-medium py-2">{value || 'N/A'}</p>
      )}
    </div>
  )
}