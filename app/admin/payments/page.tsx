'use client'
import React, { useEffect, useState } from 'react'
import { FiEdit2, FiDownloadCloud, FiPlusCircle, FiCheckCircle, FiClock } from 'react-icons/fi'
import AddPayment from '@/app/components/modals/AddPayment'
import apiService from '@/app/services/apiService'

interface Payment {
  id: number
  student: {
    student_id: string
    user: {
      first_name: string
      last_name: string
    }
    total_fees: number
  }
  amount: string
  payment_date: string
  payment_method: string
  transaction_code: string | null
  receipt_number: string
}

export default function PaymentsPage() {
  const [user, setUser] = useState<any>(null)
  const [payments, setPayments] = useState<Payment[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const getProgressColor = (percent: number) => {
    if (percent < 25) return 'bg-red-500'
    if (percent < 100) return 'bg-orange-400'
    return 'bg-green-500'
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/auth/me/`,
          { credentials: 'include' }
        ).then(res => res.json())
        setUser(data)
      } catch (err) {
        console.error('Failed to fetch user', err)
      }
    }
    fetchUser()
  }, [])

  const fetchPayments = async () => {
    try {
      setLoading(true)
      const data = await apiService.getWithToken('/payments/all/')
      console.log('Fetched payments:', data)
      setPayments(data)
    } catch (err) {
      console.error('Failed to fetch payments', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPayments()
  }, [])

  const handlePaymentSuccess = () => {
    console.log('Payment registered successfully!')
    fetchPayments() // Refetch payments to show the new one
  }

  // Calculate totals
  const totalPaid = payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0)
  const totalFees = payments.reduce((sum, payment) => {
    // Get unique students to avoid counting total_fees multiple times
    return sum
  }, 0)

  return (
    <div className="ml-0 lg:ml-64">
      {/* Header */}
      <div
        className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40
                      h-20 md:h-25 p-4 md:p-6 pl-16 lg:pl-6
                      border-b border-gray-200 shadow-sm"
      >
        <h1 className="text-3xl font-bold text-gray-800">Payments</h1>
        <p className="text-green-600 mt-1">Welcome, {user?.first_name} {user?.last_name}</p>
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
            <span className="hidden sm:inline">Download Monthly Report</span>
            <span className="sm:hidden">Download</span>
          </button>

          {/* Register */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-3 px-6 py-3 rounded-xl
                      bg-blue-600 text-white font-semibold
                      hover:bg-blue-700 transition shadow"
          >
            <FiPlusCircle size={20} />
            <span className="hidden sm:inline">Register New Payment</span>
            <span className="sm:hidden">Register</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Paid */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-green-300 to-green-100 p-6 rounded-xl shadow-md">
            <div className="p-4 bg-white rounded-full shadow">
              <FiCheckCircle size={32} className="text-green-600" />
            </div>
            <div>
              <p className="text-green-700 font-semibold">Total Paid</p>
              <p className="text-2xl font-bold text-green-700">
                KSh {totalPaid.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* Total Transactions */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-blue-300 to-blue-100 p-6 rounded-xl shadow-md">
            <div className="p-4 bg-white rounded-full shadow">
              <FiClock size={32} className="text-blue-600" />
            </div>
            <div>
              <p className="text-blue-700 font-semibold">Total Transactions</p>
              <p className="text-2xl font-bold text-blue-700">{payments.length}</p>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading payments...</div>
          ) : payments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No payments found</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Receipt</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Student</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Amount</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Method</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Transaction Code</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600">
                      {payment.receipt_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-medium text-gray-800">
                          {payment.student.user.first_name} {payment.student.user.last_name}
                        </p>
                        <p className="text-xs text-gray-500">{payment.student.student_id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-green-600">
                      KSh {parseFloat(payment.amount).toLocaleString('en-KE', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2 
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment.payment_method === 'mpesa' 
                          ? 'bg-green-100 text-green-800'
                          : payment.payment_method === 'cash'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {payment.payment_method.charAt(0).toUpperCase() + payment.payment_method.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {payment.transaction_code || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {new Date(payment.payment_date).toLocaleDateString('en-KE')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button className="text-blue-600 hover:text-blue-800 transition">
                        <FiEdit2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      <AddPayment
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  )
}