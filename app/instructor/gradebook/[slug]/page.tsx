'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import apiService from '@/app/services/apiService'
import GradePractical from '@/app/components/modals/GradePractical'
import ModalWrapper from '@/app/components/modals/ModalWrapper'

type PageProps = {
  params: {
    slug: string
  }
}

interface Module {
  id: number
  student: number
  student_name: string
  student_id: string
  module: number
  module_title: string
  module_order: number
  course_name: string
  status: 'pending' | 'completed'
  comment: '' | 'excellent' | 'good' | 'fair'
  date_graded: string | null
  instructor: number | null
  instructor_name: string | null
}

const Page = ({ params }: PageProps) => {
  const router = useRouter()
  const [modules, setModules] = useState<Module[]>([])
  const [studentName, setStudentName] = useState('')
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchModules()
  }, [params.slug])

  const fetchModules = async () => {
    try {
      setLoading(true)
      const data = await apiService.getWithToken('/instructors/student-modules/')
      
      // Filter modules for the specific student
      const studentModules = data.filter((mod: Module) => mod.student === parseInt(params.slug))
      
      if (studentModules.length > 0) {
        setStudentName(studentModules[0].student_name)
        setModules(studentModules)
      } else {
        // Student not found or no modules
        setModules([])
      }
    } catch (error) {
      console.error('Error fetching modules:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (module: Module) => {
    setSelectedModule(module)
    setIsOpen(true)
  }

  const handleGrade = async (comment: 'excellent' | 'good' | 'fair') => {
    if (!selectedModule) return

    try {
      await apiService.patchWithToken(`/instructors/grade-module/${selectedModule.id}/`, {
        status: 'completed',
        comment: comment
      })

      // Refresh modules
      await fetchModules()
      setIsOpen(false)
      alert('Module graded successfully!')
    } catch (error) {
      console.error('Error grading module:', error)
      alert('Failed to grade module')
    }
  }

  const commentStyles = {
    excellent: 'text-green-500',
    good: 'text-orange-500',
    fair: 'text-yellow-500',
  } as const

  // Group modules by course
  const modulesByCourse = modules.reduce((acc, mod) => {
    if (!acc[mod.course_name]) {
      acc[mod.course_name] = []
    }
    acc[mod.course_name].push(mod)
    return acc
  }, {} as { [key: string]: Module[] })

  // Filter modules
  const filteredModules = modules.filter(mod =>
    mod.module_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mod.course_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="ml-5 lg:ml-64 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading modules...</p>
        </div>
      </div>
    )
  }

  if (modules.length === 0) {
    return (
      <div className="ml-5 lg:ml-64 p-6">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-red-600 font-semibold">Student not found or no modules assigned.</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const completedCount = modules.filter(m => m.status === 'completed').length
  const progressPercentage = Math.round((completedCount / modules.length) * 100)

  return (
    <div className="ml-5 lg:ml-64 p-4 md:p-6 space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-2xl p-5 md:p-6 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Module Assessments
        </h1>
        <p className="text-sm md:text-base mt-1 opacity-90">
          Student: <span className="font-medium">{studentName}</span> ({modules[0].student_id})
        </p>
        <div className="mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{completedCount} / {modules.length} modules ({progressPercentage}%)</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Search */}
      <input
        className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Search modules..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* ===== MOBILE VIEW (Cards) ===== */}
      <div className="space-y-4 md:hidden">
        {Object.entries(modulesByCourse).map(([courseName, courseModules]) => {
          const displayModules = courseModules.filter(mod =>
            mod.module_title.toLowerCase().includes(searchTerm.toLowerCase())
          )

          if (displayModules.length === 0) return null

          return (
            <div key={courseName} className="space-y-3">
              <h2 className="text-lg font-bold text-gray-800 capitalize bg-blue-50 px-4 py-2 rounded-lg">
                {courseName} Course
              </h2>
              {displayModules.map((module) => (
                <div
                  key={module.id}
                  className="bg-white rounded-2xl p-4 shadow-sm space-y-2 border border-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-900">{module.module_title}</p>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border
                        ${
                          module.status === 'completed'
                            ? 'bg-green-100 text-green-700 border-green-200'
                            : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                        }`}
                    >
                      {module.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-700">
                    <span>Date: {module.date_graded || 'Not graded'}</span>
                    <span
                      className={module.comment ? commentStyles[module.comment] : 'text-gray-400'}
                    >
                      {module.comment ? module.comment.charAt(0).toUpperCase() + module.comment.slice(1) : '—'}
                    </span>
                  </div>

                  <button
                    onClick={() => handleOpenModal(module)}
                    disabled={module.status === 'completed'}
                    className={`w-full px-4 py-2 rounded-lg text-sm font-medium mt-2
                      ${
                        module.status === 'completed'
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700 active:scale-[0.98] transition'
                      }`}
                  >
                    {module.status === 'completed' ? 'Graded' : 'Grade Now'}
                  </button>
                </div>
              ))}
            </div>
          )
        })}
      </div>

      {/* ===== DESKTOP VIEW (Table) ===== */}
      <div className="hidden md:block space-y-6">
        {Object.entries(modulesByCourse).map(([courseName, courseModules]) => {
          const displayModules = courseModules.filter(mod =>
            mod.module_title.toLowerCase().includes(searchTerm.toLowerCase())
          )

          if (displayModules.length === 0) return null

          return (
            <div key={courseName} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="bg-blue-600 text-white px-6 py-3">
                <h2 className="text-xl font-bold capitalize">{courseName} Course Modules</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm lg:text-base">
                  <thead className="border-b border-gray-200 bg-gray-50">
                    <tr className="text-left text-gray-700">
                      <th className="px-6 py-4 font-semibold">Module</th>
                      <th className="px-6 py-4 font-semibold">Date Graded</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold">Comment</th>
                      <th className="px-6 py-4 font-semibold">Graded By</th>
                      <th className="px-6 py-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {displayModules.map((module) => (
                      <tr
                        key={module.id}
                        className="hover:bg-green-50 transition border-b border-gray-100"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">{module.module_title}</td>
                        <td className="px-6 py-4 text-gray-600">
                          {module.date_graded || '—'}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border
                              ${
                                module.status === 'completed'
                                  ? 'bg-green-100 text-green-700 border-green-200'
                                  : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                              }`}
                          >
                            {module.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold">
                          {module.comment ? (
                            <span className={commentStyles[module.comment]}>
                              {module.comment.charAt(0).toUpperCase() + module.comment.slice(1)}
                            </span>
                          ) : (
                            <span className="text-gray-400 font-normal">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">
                          {module.instructor_name || '—'}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {module.status === 'completed' ? (
                            <button
                              disabled
                              className="px-4 py-2 rounded-lg text-xs font-medium bg-gray-200 text-gray-500 cursor-not-allowed"
                            >
                              Graded
                            </button>
                          ) : (
                            <button
                              onClick={() => handleOpenModal(module)}
                              className="px-4 py-2 rounded-lg text-xs font-medium bg-green-600 text-white hover:bg-green-700 transition"
                            >
                              Grade Now
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal */}
      <ModalWrapper
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Grade Module"
      >
        {selectedModule && (
          <GradePractical
            practicalName={selectedModule.module_title}
            studentName={studentName}
            onCancel={() => setIsOpen(false)}
            onGrade={handleGrade}
          />
        )}
      </ModalWrapper>
    </div>
  )
}

export default Page
