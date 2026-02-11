'use client'

import React, { useEffect, useState } from 'react'
import apiService from '@/app/services/apiService'
import { FiCheck, FiX, FiClock, FiCalendar, FiUser, FiBook } from 'react-icons/fi'

interface Request {
  id: number
  student_name: string
  student_id: string
  course: string
  request_date: string
  request_time: string
  request_reason: string
  date_posted: string
  status: 'pending' | 'approved' | 'denied'
}

const RequestAndComments = () => {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState<number | null>(null)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const data = await apiService.getWithToken('/extra_classes/all_request/')
      setRequests(data)
      setError('')
    } catch (err) {
      console.error('Error fetching requests:', err)
      setError('Failed to load requests')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: Request['status']) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      approved: 'bg-green-100 text-green-800 border-green-300',
      denied: 'bg-red-100 text-red-800 border-red-300'
    }

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}
      >
        {status.toUpperCase()}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading requests...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Extra Class Requests
          </h1>
          <p className="text-gray-600">
            Manage student requests for extra classes
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* ================= MOBILE CARDS ================= */}
        <div className="space-y-4 md:hidden">
          {requests.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No requests found
            </div>
          ) : (
            requests.map(request => (
              <div
                key={request.id}
                className="bg-white rounded-xl shadow-sm p-5 space-y-3 border"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {request.student_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      ID: {request.student_id}
                    </p>
                  </div>
                  {getStatusBadge(request.status)}
                </div>

                <div className="text-sm text-gray-700 space-y-1">
                  <p className="flex items-center gap-2">
                    <FiBook className="text-blue-600" />
                    <span className="capitalize">{request.course}</span>
                  </p>

                  <p className="flex items-center gap-2">
                    <FiCalendar className="text-gray-400" />
                    {request.request_date}
                  </p>

                  <p className="flex items-center gap-2">
                    <FiClock className="text-gray-400" />
                    {request.request_time}
                  </p>
                </div>

                <p className="text-sm text-gray-600">
                  {request.request_reason}
                </p>

                {request.status === 'pending' && (
                  <div className="flex gap-2 pt-2">
                    <button
                      disabled={actionLoading === request.id}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                      <FiCheck className="mr-1" />
                      Approve
                    </button>
                    <button
                      disabled={actionLoading === request.id}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 disabled:opacity-50"
                    >
                      <FiX className="mr-1" />
                      Deny
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* ================= TABLE (MD+) ================= */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm mb-8">
          <p className="text-sm text-gray-400 px-6 pt-4">
            Scroll horizontally to see all columns →
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-600">
                <tr>
                  {[
                    'Student',
                    'Student ID',
                    'Course',
                    'Requested Date',
                    'Time',
                    'Reason',
                    'Status',
                    'Actions'
                  ].map(head => (
                    <th
                      key={head}
                      className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      No requests found
                    </td>
                  </tr>
                ) : (
                  requests.map(request => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <FiUser className="text-blue-600 mr-2" />
                          {request.student_name}
                        </div>
                      </td>
                      <td className="px-6 py-4">{request.student_id}</td>
                      <td className="px-6 py-4 capitalize">
                        <FiBook className="inline mr-2 text-blue-600" />
                        {request.course}
                      </td>
                      <td className="px-6 py-4">{request.request_date}</td>
                      <td className="px-6 py-4">{request.request_time}</td>
                      <td className="px-6 py-4 max-w-xs truncate">
                        {request.request_reason}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(request.status)}
                      </td>
                      <td className="px-6 py-4">
                        {request.status === 'pending' ? (
                          <div className="flex gap-2">
                            <button className="px-3 py-1.5 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700">
                              <FiCheck className="inline mr-1" />
                              Approve
                            </button>
                            <button className="px-3 py-1.5 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700">
                              <FiX className="inline mr-1" />
                              Deny
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-500">
                            No action needed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= COMMENTS ================= */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Comments
          </h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <p className="text-gray-500 text-lg">
              Comments functionality coming soon...
            </p>
            <p className="text-gray-400 text-sm mt-2">
              This section will allow admins to add comments and notes about requests
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestAndComments
