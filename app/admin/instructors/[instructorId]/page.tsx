'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import apiService from '@/app/services/apiService'
import DeactivateInstructor from '@/app/components/modals/DeactivateInstructor'

export default function InstructorDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const instructorId = params.instructorId as string
  const [instructorData, setInstructorData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editedData, setEditedData] = useState<any>(null)
  const [showDeactivateModal, setShowDeactivateModal] = useState(false)

  useEffect(() => {
    const fetchInstructorDetails = async () => {
      try {
        setLoading(true)
        const data = await apiService.getWithToken(`/instructors/${instructorId}/`)
        console.log('Received instructor data:', data)
        setInstructorData(data)
        setEditedData(data)
      } catch (err: any) {
        console.error('Failed to fetch instructor details', err)
        setError('Failed to load instructor details')
      } finally {
        setLoading(false)
      }
    }

    if (instructorId) {
      fetchInstructorDetails()
    }
  }, [instructorId])

  const handleSave = async () => {
    try {
      setIsSaving(true)
      const updatedData = await apiService.patchWithToken(
        `/instructors/${instructorId}/`,
        editedData
      )
      setInstructorData(updatedData)
      setIsEditing(false)
    } catch (err: any) {
      console.error('Failed to save changes', err)
      alert('Failed to save changes: ' + err.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditedData(instructorData)
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

  const handleDeactivate = async () => {
    try {
      await apiService.patchWithToken(
        `/instructors/${instructorId}/`,
        {
          user: {
            ...instructorData.user,
            is_active: false
          }
        }
      )
      // Refresh the page data
      const data = await apiService.getWithToken(`/instructors/${instructorId}/`)
      setInstructorData(data)
      setEditedData(data)
    } catch (error) {
      console.error('Failed to deactivate instructor:', error)
      alert('Failed to deactivate instructor')
    }
  }

  if (loading) {
    return (
      <div className="ml-0 lg:ml-64">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40 h-20 md:h-25 p-4 md:p-6 pl-16 lg:pl-6 border-b border-gray-200 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800">Instructor Details</h1>
          <p className="text-gray-500 mt-1">Loading...</p>
        </div>

        {/* Content */}
        <div className="pt-24 md:pt-28 p-4 md:p-6 flex items-center justify-center h-64">
          <div className="text-gray-500">Loading instructor details...</div>
        </div>
      </div>
    )
  }

  if (error || !instructorData) {
    return (
      <div className="ml-0 lg:ml-64">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40 h-20 md:h-25 p-4 md:p-6 pl-16 lg:pl-6 border-b border-gray-200 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800">Instructor Details</h1>
          <p className="text-red-500 mt-1">Error loading instructor</p>
        </div>

        {/* Content */}
        <div className="pt-24 md:pt-28 p-4 md:p-6 flex items-center justify-center">
          <div className="text-center bg-white rounded-lg shadow-md p-8 max-w-md">
            <p className="text-red-500 mb-4 text-lg">{error || 'Instructor not found'}</p>
            <p className="text-gray-500 mb-6">Instructor ID: {instructorId}</p>
            <button
              onClick={() => router.push('/admin/instructors')}
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
            >
              ← Back to Instructors
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ml-0 lg:ml-64">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40 h-20 md:h-25 p-4 md:p-6 pl-16 lg:pl-6 border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/admin/instructors')}
              className="text-gray-600 hover:text-gray-800 font-medium text-lg"
            >
              ←
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {instructorData.user?.first_name} {instructorData.user?.last_name}
              </h1>
              <p className="text-gray-500 text-sm mt-1">{instructorData.instructor_id}</p>
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
              <>
                <button
                  onClick={() => setShowDeactivateModal(true)}
                  disabled={!instructorData.user?.is_active}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Deactivate
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Edit Details
                </button>
              </>
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
            <>
              <button
                onClick={() => setShowDeactivateModal(true)}
                disabled={!instructorData.user?.is_active}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Deactivate
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Edit Details
              </button>
            </>
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
              value={isEditing ? editedData.user?.first_name : instructorData.user?.first_name}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('first_name', value, true)}
            />
            <InputField
              label="Last Name"
              value={isEditing ? editedData.user?.last_name : instructorData.user?.last_name}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('last_name', value, true)}
            />
            <InputField
              label="Email"
              value={isEditing ? editedData.user?.email : instructorData.user?.email}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('email', value, true)}
              type="email"
            />
            <InputField
              label="Phone Number"
              value={isEditing ? editedData.user?.phone_number : instructorData.user?.phone_number}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('phone_number', value, true)}
            />
            <div>
              <label className="text-sm text-gray-500 block mb-1">Status</label>
              <span
                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                  instructorData.user?.is_active
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {instructorData.user?.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <InputField
              label="Instructor ID"
              value={instructorData.instructor_id}
              isEditing={false}
            />
          </div>
        </div>

        {/* Course & Professional Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Professional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-500 block mb-1">Course</label>
              <p className="text-gray-800 font-medium py-2">
                {instructorData.course 
                  ? instructorData.course.charAt(0).toUpperCase() + instructorData.course.slice(1)
                  : 'N/A'
                }
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500 block mb-1">Category</label>
              <p className="text-gray-800 font-medium py-2">
                {instructorData.category 
                  ? instructorData.category.charAt(0).toUpperCase() + instructorData.category.slice(1)
                  : 'N/A'
                }
              </p>
            </div>
            <InputField
              label="National ID"
              value={isEditing ? editedData.national_id : instructorData.national_id}
              isEditing={false}
              onChange={(value) => handleInputChange('national_id', value)}
            />
            <InputField
              label="License Number"
              value={isEditing ? editedData.license_number : instructorData.license_number}
              isEditing={false}
              onChange={(value) => handleInputChange('license_number', value)}
            />
            <InputField
              label="Date of Birth"
              value={isEditing ? editedData.date_of_birth : instructorData.date_of_birth}
              isEditing={false}
              onChange={(value) => handleInputChange('date_of_birth', value)}
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
              value={isEditing ? editedData.nok_first_name : instructorData.nok_first_name}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('nok_first_name', value)}
            />
            <InputField
              label="Last Name"
              value={isEditing ? editedData.nok_last_name : instructorData.nok_last_name}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('nok_last_name', value)}
            />
            <InputField
              label="Email"
              value={isEditing ? editedData.nok_email : instructorData.nok_email}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('nok_email', value)}
              type="email"
            />
            <InputField
              label="Phone Number"
              value={isEditing ? editedData.nok_phone : instructorData.nok_phone}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('nok_phone', value)}
            />
            <InputField
              label="Relationship"
              value={isEditing ? editedData.nok_relationship : instructorData.nok_relationship}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('nok_relationship', value)}
            />
            <InputField
              label="Occupation"
              value={isEditing ? editedData.nok_occupation : instructorData.nok_occupation}
              isEditing={isEditing}
              onChange={(value) => handleInputChange('nok_occupation', value)}
            />
          </div>
        </div>
      </div>

      {/* Deactivate Modal */}
      <DeactivateInstructor
        isOpen={showDeactivateModal}
        onClose={() => setShowDeactivateModal(false)}
        instructorName={`${instructorData.user?.first_name} ${instructorData.user?.last_name}`}
        onConfirm={handleDeactivate}
      />
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
