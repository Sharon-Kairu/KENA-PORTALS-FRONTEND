'use client'

import { useState } from 'react'
import ReportTabs from '../components/ReportsTabs'
import Filters from '../components/Filters'
import StudentsReport from '../components/StudentsReport'
import PaymentsReport from '../components/PaymentsReport'
import PackagesReport from '../components/PackagesReport'
import PerformanceReport from '../components/PerformanceReport'

const page = () => {
  const [activeTab, setActiveTab] = useState('students')
  const [year, setYear] = useState(2024)
  return (
    <div className='ml-0 lg:ml-64'>
        {/* Header */}
      <div
        className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40
                   h-20 md:h-25 p-4 md:p-6 pl-16 lg:pl-6
                   border-b border-gray-200 shadow-sm"
      >
        <h1 className="text-3xl font-bold text-gray-800">Course Content</h1>
        <p className="text-green-600 mt-1">Welcome, Chris Thairu</p>
      </div>
      <div className='pt-24 md:pt-28 p-4 md:p-6 space-y-6'>
         <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Reports</h1>

      <ReportTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <Filters year={year} setYear={setYear} />

      {activeTab === 'students' && <StudentsReport year={year} />}
      {activeTab === 'payments' && <PaymentsReport />}
      {activeTab === 'packages' && <PackagesReport />}
      {activeTab === 'performance' && <PerformanceReport />}
    </div>
        
      </div>
      
    </div>
  )
}

export default page
