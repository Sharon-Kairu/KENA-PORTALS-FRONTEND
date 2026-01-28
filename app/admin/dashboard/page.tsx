"use client"
import React,{useState,useEffect} from 'react'
import DashCards from '../components/DashCards'
import DashCharts from '../components/DashCharts'
import DistributionChart from '@/app/components/DistributionChart'
import { pendindReceipts } from '../../data/pendingReceipts'


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
    <div className='ml-0 lg:ml-64'>
      {/* Header */}
      <div
        className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40
                   h-20 md:h-25 p-4 md:p-6 pl-16 lg:pl-6
                   border-b border-gray-200 shadow-sm"
      >
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        {user && (
          <p className="text-green-600 mt-1">
          Welcome, {user.first_name} {user.last_name}
          </p>
        )}
      </div>
      {/*Content*/}
      <div className='pt-24 md:pt-28 p-4 md:p-6 space-y-6'>
        <DashCards/>
        <DashCharts/>
        <DistributionChart/>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Pending Receipt Adjustments
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 text-left text-sm font-medium text-gray-600">
                  <th className="px-4 py-3 border-b">Student Name</th>
                  <th className="px-4 py-3 border-b">Former Amount</th>
                  <th className="px-4 py-3 border-b">New Amount</th>
                  <th className="px-4 py-3 border-b">Date</th>
                  <th className="px-4 py-3 border-b text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {pendindReceipts.map((receipt) => (
                  <tr
                    key={receipt.id}
                    className="text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 border-b font-medium">
                      {receipt.studentName}
                    </td>

                    <td className="px-4 py-3 border-b text-red-600">
                      KES {receipt.formerAmount.toLocaleString()}
                    </td>

                    <td className="px-4 py-3 border-b text-green-600 font-semibold">
                      KES {receipt.newAmount.toLocaleString()}
                    </td>

                    <td className="px-4 py-3 border-b">
                      {receipt.date}
                    </td>

                    <td className="px-4 py-3 border-b">
                      <div className="flex justify-center gap-2">
                        <button
                          className="
                            px-3 py-1.5
                            text-xs font-medium
                            text-white bg-green-600
                            rounded-lg
                            hover:bg-green-700
                            transition
                          "
                        >
                          Approve
                        </button>

                        <button
                          className="
                            px-3 py-1.5
                            text-xs font-medium
                            text-white bg-red-600
                            rounded-lg
                            hover:bg-red-700
                            transition
                          "
                        >
                          Deny
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        </div>

      </div>
      
   
  )
}

export default page
