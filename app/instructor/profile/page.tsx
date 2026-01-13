import React from 'react'
import { FiCalendar } from 'react-icons/fi'
import { FaIdCard } from "react-icons/fa";
import Detail from '@/app/components/Detail'

const page = () => {
  return (
    <div className='ml-5 lg:ml-64'>
        {/* Header */}
      <div className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40
                h-20 md:h-25 p-4 md:p-6 pl-16 lg:pl-6
                border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Profile</h1>
        <p className="text-green-600 text-md md:text-lg mt-1">Welcome, Instructor One</p>
      </div>
        {/* Main content */}
        <div className="p-4 md:p-6 mt-24 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Card 1 */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50 p-6 shadow-md hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-purple-700">
                        Days you have been with us
                    </h2>
                    <div className="bg-purple-600/10 p-3 rounded-full">
                        <FiCalendar size={22} className="text-purple-700" />
                    </div>
                    </div>
    
                    <p className="mt-4 text-4xl font-bold text-purple-800">138</p>
                    <p className="text-sm text-purple-600 mt-1">Total active days</p>
                </div>
    
                {/* Card 2 */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 p-6 shadow-md hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-blue-700">
                        Instructor Licence Number
                    </h2>
                    <div className="bg-blue-600/10 p-3 rounded-full">
                        <FaIdCard size={22} className="text-blue-700" />
                    </div>
                    </div>
    
                    <p className="mt-4 text-3xl font-bold text-blue-800 tracking-wide">
                    DDRWBB67WV
                    </p>
                </div>
            </div>
            {/*Instucor Details*/}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Personal Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <Detail label="First Name" value="Evans" />
                <Detail label="Last Name" value="Mwaniki" />
                <Detail label="Email Address" value="emwaniki@gmail.com" />
                <Detail label="Phone Number" value="+254 766539812" />
                <Detail label="National ID" value="20098667" />
                <Detail label="Date of Birth" value="01/08/1972" />
                <Detail label="Gender" value="Male" />
            </div>
        </div>
        </div>
      
    </div>
  )
}

export default page
