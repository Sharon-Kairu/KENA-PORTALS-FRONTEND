'use client'
import React, { useState, useEffect } from 'react'
import {
  FaUserGraduate,
  FaMoneyBillWave,
  FaReceipt,
} from 'react-icons/fa6'
import { FaChalkboardTeacher } from 'react-icons/fa'
import apiService from '@/app/services/apiService'

const DashCards = () => {
  const [extraClasses, setExtraClasses] = useState(0) 
  const [activeStudents,setActiveStudents]=useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await apiService.getWithToken('/extra_classes/all_request/')
        const requests = Array.isArray(res)
          ? res.filter((r: any) => r.status === 'pending')
          : []

        setExtraClasses(requests.length)
      } catch (error) {
        console.error('Error fetching requests:', error)
        setExtraClasses(0)
      } finally {
        setLoading(false)
      }
    }
    const fetchStudents=async()=>{
      try{
        const res=await apiService.getWithToken('/students/all_students/')
        setActiveStudents(res.length)
      }
      
      catch (error) {
      console.error('Error fetching requests:', error)
      setActiveStudents(0)
    } finally {
      setLoading(false)
    }
      
    }

    fetchRequest()
    fetchStudents()
  }, []) 

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Active Students */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-blue-700">
            Active Students
          </p>
          <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
            <FaUserGraduate size={18} />
          </div>
        </div>
        <h1 className="mt-4 text-3xl font-bold text-blue-800">
          {loading ? '...' : activeStudents}
        </h1>
      </div>

      {/* Pending Extra Class Approvals */}
      <div className="bg-green-50 border border-green-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-green-700">
            Pending Extra Class Approvals
          </p>
          <div className="bg-green-100 text-green-600 p-3 rounded-xl">
            <FaChalkboardTeacher size={18} />
          </div>
        </div>
        {/* Fix 4: Display the actual state value */}
        <h1 className="mt-4 text-3xl font-bold text-green-800">
          {loading ? '...' : extraClasses}
        </h1>
      </div>

      {/* Pending Payments */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-red-700">
            Pending Payments
          </p>
          <div className="bg-red-100 text-red-600 p-3 rounded-xl">
            <FaMoneyBillWave size={18} />
          </div>
        </div>
        <h1 className="mt-4 text-3xl font-bold text-red-800">76</h1>
      </div>

      {/* Receipt Approvals */}
      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-orange-700">
            Pending Receipt Approvals
          </p>
          <div className="bg-orange-100 text-orange-600 p-3 rounded-xl">
            <FaReceipt size={18} />
          </div>
        </div>
        <h1 className="mt-4 text-3xl font-bold text-orange-800">3</h1>
      </div>
    </div>
  )
}

export default DashCards