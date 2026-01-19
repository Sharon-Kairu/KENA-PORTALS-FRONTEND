import React from 'react'
import { studentPaymentsData } from '@/app/data/payments'
import { FiEdit2,FiDownloadCloud, FiPlusCircle, FiCheckCircle, FiClock} from 'react-icons/fi'

const page = () => {
  const getProgressColor = (percent: number) => {
    if (percent < 25) return 'bg-red-500'
    if (percent < 100) return 'bg-orange-400'
    return 'bg-green-500'
  }
  
  return (
    <div className="ml-0 lg:ml-64">
      {/* Header */}
      <div
        className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40
                      h-20 md:h-25 p-4 md:p-6 pl-16 lg:pl-6
                      border-b border-gray-200 shadow-sm"
      >
        <h1 className="text-3xl font-bold text-gray-800">Payments</h1>
        <p className="text-green-600 mt-1">Welcome, Chris Thairu</p>
      </div>

      {/* Content */}
      <div className="pt-24 md:pt-28 p-4 md:p-6 space-y-6">
        <div className="flex items-center gap-4 justify-end">
          {/* Download */}
          <button
            className="flex items-center gap-3 px-6 py-3 rounded-xl
                      bg-gray-100 text-gray-700 font-semibold
                      hover:bg-gray-200 transition shadow-sm"
          >
            <FiDownloadCloud size={20} />
            <span>Download Monthly Report</span>
          </button>

          {/* Register */}
          <button
            className="flex items-center gap-3 px-6 py-3 rounded-xl
                      bg-blue-600 text-white font-semibold
                      hover:bg-blue-700 transition shadow"
          >
            <FiPlusCircle size={20} />
            <span>Register New Payment</span>
          </button>
        </div>
        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Paid */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-green-300 to-green-100 p-6 rounded-xl shadow-md">
            <div className="p-4 bg-white rounded-full shadow">
              <FiCheckCircle size={32} className="text-green-600" />
            </div>
            <div>
              <p className="text-green-700 font-semibold">Total Paid for Active Students</p>
              <p className="text-2xl font-bold text-green-700">KSH 98,675</p>
            </div>
          </div>

          {/* Total Pending */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-orange-300 to-orange-200 p-6 rounded-xl shadow-md">
            <div className="p-4 bg-white rounded-full shadow">
              <FiClock size={32} className="text-orange-600" />
            </div>
            <div>
              <p className="text-orange-700 font-semibold">Total Pending for Active Students</p>
              <p className="text-2xl font-bold text-orange-700">KSH 34,988</p>
            </div>
          </div>
        </div>


        

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-4 text-left">Student</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Balance</th>
                <th className="p-4 text-left">Total</th>
                <th className="p-4 text-left">Progress</th>
                <th className="p-4 text-center">Edit</th>
              </tr>
            </thead>

            <tbody>
              {studentPaymentsData.map((student, studentIndex) => {
                let totalPaidSoFar = 0

                return student.payments.map((payment, paymentIndex) => {
                  totalPaidSoFar += payment.amount
                  const balance = student.total - totalPaidSoFar
                  const percentPaid = Math.round(
                    (totalPaidSoFar / student.total) * 100
                  )

                  const isLastPayment =
                    paymentIndex === student.payments.length - 1

                  return (
                    <tr
                      key={`${studentIndex}-${paymentIndex}`}
                      className={`
                        hover:bg-green-50 transition
                        ${isLastPayment ? 'border-b-2 border-gray-600' : 'border-b border-dotted'}
                      `}
                    >
                      <td className="p-4 font-semibold text-gray-800">
                        {paymentIndex === 0 ? student.name : ''}
                      </td>

                      <td className="p-4">{payment.date}</td>

                      <td className="p-4 font-medium">
                        KES {payment.amount.toLocaleString()}
                      </td>

                      <td className="p-4">
                        KES {balance.toLocaleString()}
                      </td>

                      <td className="p-4">
                        KES {student.total.toLocaleString()}
                      </td>

                      {/* Progress bar */}
                      <td className="p-4 w-64">
                        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getProgressColor(percentPaid)}`}
                            style={{ width: `${percentPaid}%` }}
                          />
                          <span className="absolute bottom-0 right-1 text-[10px] font-bold text-gray-700">
                            {percentPaid}%
                          </span>
                        </div>
                      </td>

                      {/* Edit */}
                      <td className="p-4 text-center">
                        <button className="text-blue-600 hover:text-blue-800">
                          <FiEdit2 />
                        </button>
                      </td>
                    </tr>
                  )
                })
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default page
