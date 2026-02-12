'use client'
import React,{useState, useEffect} from 'react'
import DashCards from '../components/DashCards'
import { FiBarChart, FiAlertTriangle, FiExternalLink } from 'react-icons/fi'
import { awayStudents } from '../../data/awayStudents'
import DistributionChart from '@/app/components/DistributionChart'

const page = () => {
  const [user, setUser] = useState<any>(null)
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
      const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/auth/me/`,
      { credentials: 'include' } 
      ).then(res => res.json())
      
      console.log('Fetched user data:', data)


      setUser(data)
      } catch (err) {
      console.error('Failed to fetch user', err)
      }
    }
    fetchUser()
    }, [])
  return (
    <div className="ml-5 lg:ml-64">

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40
                      h-20 md:h-25 p-4 md:p-6 pl-16 lg:pl-6
                      border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Instructor Dashboard
        </h1>
        <p className="text-green-500 text-md md:text-lg mt-1">
          Welcome, {user?.first_name} {user?.last_name}
        </p>
      </div>

      {/* Main Content */}
      <div className="pt-24 md:pt-28 p-4 md:p-6 space-y-6">

        {/* Top Stats */}
        <DashCards />

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

          {/* Performance Breakdown */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100
                          rounded-2xl shadow-sm hover:shadow-md transition
                          p-6 border border-yellow-200 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-yellow-700 font-semibold">
                Student Performance
              </h3>
              <div className="bg-yellow-200 text-yellow-700 rounded-full p-3">
                <FiBarChart size={22} />
              </div>
            </div>

            <div className="space-y-4 flex-1">
              {/* Excellent */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Excellent</span>
                <span className="text-sm font-bold text-green-600">56 (62%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-[60%]" />
              </div>

              {/* Good */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Good</span>
                <span className="text-sm font-bold text-yellow-600">34 (38%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full w-[35%]" />
              </div>

              {/* Fair */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Fair</span>
                <span className="text-sm font-bold text-red-500">12</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-400 h-2 rounded-full w-[15%]" />
              </div>
            </div>
          </div>

          {/* Away Students */}
          <div className="bg-gradient-to-br from-red-50 to-red-100
                          rounded-2xl shadow-sm hover:shadow-md transition
                          p-6 border border-red-200 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-red-700 font-semibold">
                Students Not Seen (15+ days)
              </h3>
              <div className="bg-red-200 text-red-700 rounded-full p-3">
                <FiAlertTriangle size={22} />
              </div>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto">
              {awayStudents.map((student, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between
                             bg-red-50 p-4 rounded-xl
                             border border-red-200 hover:shadow-sm transition"
                >
                  <div>
                    <p className="font-medium text-red-700">
                      {student.name}
                    </p>
                    <p className="text-sm text-red-500">
                      Last seen: {student.date}
                    </p>
                  </div>

                  <FiExternalLink
                    size={18}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Distribution Chart */}
        <DistributionChart />

      </div>
    </div>
  )
}

export default page
