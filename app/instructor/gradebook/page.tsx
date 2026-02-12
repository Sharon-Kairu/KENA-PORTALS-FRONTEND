'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import apiService from '@/app/services/apiService'

interface Student {
  student_id: number
  student_name: string
  mode: string
  subscription_plan: string | null
  courses: Array<{
    id: number
    name: string
  }>
}

interface ModuleProgress {
  student_id: string
  modules: Array<{
    id: number
    module_title: string
    status: string
    date_graded: string | null
  }>
  completedCount: number
  totalCount: number
}

const Page = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [moduleProgress, setModuleProgress] = useState<{ [key: string]: ModuleProgress }>({})
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [instructorName, setInstructorName] = useState('Instructor')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)

      // Fetch instructor info
      const userData = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/auth/me/`,
        { credentials: 'include' }
      ).then(res => res.json())
      
      if (userData.first_name) {
        setInstructorName(`${userData.first_name} ${userData.last_name}`)
      }

      // Fetch students assigned to this instructor
      const studentsData = await apiService.getWithToken('/instructors/students/')
      console.log('Students:', studentsData)
      setStudents(studentsData)

      // Fetch all student modules
      const modulesData = await apiService.getWithToken('/instructors/student-modules/')
      console.log('Modules:', modulesData)

      // Group modules by student
      const progressByStudent: { [key: string]: ModuleProgress } = {}
      studentsData.forEach((student: Student) => {
        const studentModules = modulesData.filter(
          (mod: any) => mod.student === student.student_id
        )
        
        progressByStudent[student.student_id] = {
          student_id: student.student_id.toString(),
          modules: studentModules,
          completedCount: studentModules.filter((m: any) => m.status === 'completed').length,
          totalCount: studentModules.length
        }
      })

      setModuleProgress(progressByStudent)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredStudents = students.filter(student =>
    student.student_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getLastCompletedDate = (studentId: number) => {
    const progress = moduleProgress[studentId]
    if (!progress) return 'N/A'

    const completedModules = progress.modules
      .filter(m => m.status === 'completed' && m.date_graded)
      .sort((a, b) => new Date(b.date_graded!).getTime() - new Date(a.date_graded!).getTime())

    return completedModules.length > 0 ? completedModules[0].date_graded : 'N/A'
  }

  if (loading) {
    return (
      <div className="ml-0 lg:ml-64 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading students...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="ml-0 lg:ml-64">
      {/* Header */}
      <div
        className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40
                h-20 md:h-25 p-4 md:p-6 pl-16 lg:pl-6
                border-b border-gray-200 shadow-sm"
      >
        <h1 className="text-xl md:text-3xl font-bold text-gray-800">
          Gradebook
        </h1>
        <p className="text-green-600 text-sm md:text-lg mt-1">
          Welcome, {instructorName}
        </p>
      </div>

      {/* Content */}
      <div className="p-4 md:p-10 mt-24 space-y-6">
        {/* Search */}
        <input
          className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Search student..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredStudents.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">
              {searchTerm ? 'No students found matching your search.' : 'No students assigned to you yet.'}
            </p>
          </div>
        ) : (
          <>
            {/* ===== MOBILE VIEW (Cards) ===== */}
            <div className="space-y-4 md:hidden">
              {filteredStudents.map((student) => {
                const progress = moduleProgress[student.student_id]
                const lastCompleted = getLastCompletedDate(student.student_id)

                return (
                  <div
                    key={student.student_id}
                    className="bg-white border border-blue-500 rounded-xl p-4 shadow-sm space-y-2"
                  >
                    <div>
                      <p className="text-sm text-gray-500">Student</p>
                      <p className="font-semibold text-blue-500">{student.student_name}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Courses</p>
                      <p className="text-gray-700 text-sm">
                        {student.courses.map(c => c.name).join(', ')}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Progress</p>
                      <p className="text-gray-700 text-sm">
                        {progress ? `${progress.completedCount} / ${progress.totalCount} modules` : 'N/A'}
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Last Graded</p>
                        <p className="text-gray-700 text-sm">{lastCompleted}</p>
                      </div>

                      <Link
                        href={`/instructor/gradebook/${student.student_id}`}
                        className="px-3 py-2 bg-blue-600 text-white text-sm
                                   rounded-lg font-medium hover:bg-green-700"
                      >
                        Grade Student
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ===== DESKTOP VIEW (Table) ===== */}
            <div className="hidden md:block bg-white shadow rounded-lg p-4 overflow-x-auto">
              <table className="min-w-full text-lg">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Courses</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Progress</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Last Graded</th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStudents.map((student) => {
                    const progress = moduleProgress[student.student_id]
                    const lastCompleted = getLastCompletedDate(student.student_id)

                    return (
                      <tr
                        key={student.student_id}
                        className="transition rounded-lg hover:bg-green-100 hover:shadow-md"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">{student.student_name}</td>
                        <td className="px-6 py-4 text-gray-700">
                          {student.courses.map(c => c.name).join(', ')}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {progress ? (
                            <span>
                              {progress.completedCount} / {progress.totalCount} modules
                              <span className="text-xs text-gray-500 ml-2">
                                ({Math.round((progress.completedCount / progress.totalCount) * 100)}%)
                              </span>
                            </span>
                          ) : 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-gray-700">{lastCompleted}</td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/instructor/gradebook/${student.student_id}`}
                            className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg font-medium hover:bg-green-700 transition"
                          >
                            Grade Student
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Page
