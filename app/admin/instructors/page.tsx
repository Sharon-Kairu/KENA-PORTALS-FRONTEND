'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import apiService from '@/app/services/apiService'

const Page = () => {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [instructors, setInstructors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/auth/me/`,
          { credentials: 'include' }
        ).then(res => res.json())

        setUser(data)
      } catch (err) {
        console.error('Failed to fetch user', err)
      }
    }

    fetchUser()
  }, [])

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        setLoading(true)
        const data = await apiService.getWithToken('/instructors/get_instructors/')
        setInstructors(data)
        console.log(data)
      } catch (err) {
        console.error('Failed to fetch instructors', err)
        setInstructors([])
      } finally {
        setLoading(false)
      }
    }

    fetchInstructors()
  }, [])

  return (
    <div className="ml-0 lg:ml-64">
      {/* Header */}
      <div
        className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40
                   h-20 md:h-25 p-4 md:p-6 pl-16 lg:pl-6
                   border-b border-gray-200 shadow-sm"
      >
        <h1 className="text-3xl font-bold text-gray-800">
          Instructors
        </h1>
        <p className="text-green-600 mt-1">
          Welcome, {user?.first_name} {user?.last_name}
        </p>
      </div>

      {/* Content */}
      <div className='pt-24 md:pt-28 p-4 md:p-6 space-y-6'>
        <div className="flex justify-end">
          <button
            onClick={() => router.push('/admin/addinstructor')}
            className="flex items-center gap-3 px-6 py-3 rounded-xl
                       bg-blue-600 text-white font-semibold
                       hover:bg-blue-700 transition shadow"
          >
            Add New Instructor
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">Loading instructors...</div>
          </div>
        ) : instructors.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center mt-6">
            <p className="text-gray-500">No instructors found</p>
          </div>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="block md:hidden space-y-4 mt-6">
              {instructors.map((instructor) => (
                <div
                  key={instructor.instructor_id}
                  className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {instructor.full_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {instructor.instructor_id}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        instructor.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {instructor.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500 w-24">Course:</span>
                      <span className="text-gray-700">
                        {instructor.course || 'N/A'}
                      </span>
                    </div>

                    <div className="flex items-center text-sm">
                      <span className="text-gray-500 w-24">Phone:</span>
                      <span className="text-gray-700">
                        {instructor.phone_number || 'N/A'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      router.push(
                        `/admin/instructors/${instructor.instructor_id}`
                      )
                    }
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors font-medium"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>

            {/* Tablet/Desktop Table View */}
            <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Instructor ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {instructors.map((instructor) => (
                      <tr
                        key={instructor.instructor_id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {instructor.instructor_id}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {instructor.full_name}
                         
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {instructor.course === 'driving' && (
                                <div className="bg-blue-100 text-blue-600 font-bold flex items-center justify-center p-1 rounded-2xl">
                                Driving
                                </div>
                            )}

                            {instructor.course === 'computer' && (
                                <div className="bg-green-100 text-green-600 font-bold flex items-center justify-center p-1 rounded-2xl">
                                Computer
                                </div>
                            )}

                            {instructor.course === 'ai' && (
                                <div className="bg-orange-100 text-orange-600 font-bold flex items-center justify-center p-1 rounded-2xl">
                                AI
                                </div>
                            )}
                        </td>


                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {instructor.phone_number || 'N/A'}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              instructor.is_active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {instructor.is_active
                              ? 'Active'
                              : 'Inactive'}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() =>
                              router.push(
                                `/admin/instructors/${instructor.instructor_id}`
                              )
                            }
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors font-medium"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Page
