import React from 'react'
import { FiUser,FiCalendar,FiClock} from 'react-icons/fi'
import { FaIdCard } from "react-icons/fa";
import Detail from '@/app/components/Detail'

const page = () => {
  return (
    <div className="ml-5 md:ml-64">
      {/* Header – fixed on top */}
      <div className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40
                h-20 p-4 md:p-6 md:h-25 pl-16 lg:pl-6
                border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Student Profile</h1>
        <p className="text-green-600 text-md md:text-lg mt-1">Welcome, Sharon Kairu</p>
      </div>
      {/* Content */}
      <div className="p-4 md:p-6 mt-24 md:mt-28 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

                <p className="mt-4 text-4xl font-bold text-purple-800">36</p>
                <p className="text-sm text-purple-600 mt-1">Total active days</p>
            </div>

            {/* Card 2 */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 p-6 shadow-md hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-blue-700">
                    PDL Number
                </h2>
                <div className="bg-blue-600/10 p-3 rounded-full">
                    <FaIdCard size={22} className="text-blue-700" />
                </div>
                </div>

                <p className="mt-4 text-3xl font-bold text-blue-800 tracking-wide">
                HHHSBQT52
                </p>
                
            </div>

            {/* Card 3 */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-100 to-green-50 p-6 shadow-md hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-green-700">
                    Days to Exam
                </h2>
                <div className="bg-green-600/10 p-3 rounded-full">
                    <FiClock size={22} className="text-green-700" />
                </div>
                </div>

                <p className="mt-4 text-4xl font-bold text-green-800">34</p>
                <p className="text-sm text-green-600 mt-1">
                Exam Date: 23/02/2026
                </p>
            </div>
        </div>
        {/*Student Details*/}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Personal Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <Detail label="First Name" value="Sharon" />
                <Detail label="Last Name" value="Kairu" />
                <Detail label="Email Address" value="sharonkairu62@gmail.com" />
                <Detail label="Phone Number" value="+254 716018543" />
                <Detail label="National ID" value="41167582" />
                <Detail label="Date of Birth" value="09/10/2003" />
                <Detail label="Gender" value="Female" />
            </div>
        </div>
        {/*Nrxt of Kin*/}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Next of Kin Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <Detail label="First Name" value="Nancy" />
                <Detail label="Last Name" value="Waithira" />
                <Detail label="Relationship" value="Mother" />
                <Detail label="Phone Number" value="+254 722761971" />
                <Detail label="Email Address" value="nancykairu22@email.com" />
                <Detail label="Occupation" value="Retired" />
            </div>
        </div>


      </div>
    </div>
  )
}

export default page
