'use client'

import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { studentPaymentsData } from '../../data/payments'

type Props = {}

// Month names for display
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

// Get all years present in the data
const availableYears = Array.from(
  new Set(
    studentPaymentsData.flatMap((student) =>
      student.payments.map((p) => Number(p.date.split('-')[0]))
    )
  )
).sort()

export default function PaymentReports({}: Props) {
  const [year, setYear] = useState<number>(availableYears[0] || new Date().getFullYear())

  // Initialize all months with 0
  const paymentsByMonth: Record<string, number> = {}
  monthNames.forEach((m) => (paymentsByMonth[m] = 0))

  // Aggregate payments for selected year
  studentPaymentsData.forEach((student) => {
    student.payments.forEach((payment) => {
      const [yStr, mStr] = payment.date.split('-')
      const y = Number(yStr)
      const m = Number(mStr)
      if (y === year) {
        const monthName = monthNames[m - 1]
        paymentsByMonth[monthName] = (paymentsByMonth[monthName] || 0) + payment.amount
      }
    })
  })

  // Convert object to array for chart
  const data = monthNames.map((month) => ({
    month,
    total: paymentsByMonth[month] || 0
  }))

  const totalCollected = data.reduce((sum, item) => sum + item.total, 0)

  const highestMonth = data.reduce(
    (max, item) => (item.total > max.total ? item : max),
    { month: '', total: 0 }
  )

  return (
    <div className="space-y-6">
      {/* Year Selector */}
      <div className="flex items-center gap-2">
        <label className="text-gray-700 font-medium">Select Year:</label>
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="p-2 border rounded"
        >
          {availableYears.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Payments Collected ({year})</p>
          <p className="text-2xl font-semibold">{totalCollected.toLocaleString()}</p>
        </div>

        {highestMonth && (
          <div className="p-4 bg-white rounded-lg shadow">
            <p className="text-sm text-gray-500">Highest Collection Month</p>
            <p className="text-lg font-semibold">
              {highestMonth.month} ({highestMonth.total.toLocaleString()})
            </p>
          </div>
        )}
      </div>

      {/* Bar Chart */}
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">
          Payments Collected Per Month – {year}
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: number) => value.toLocaleString()} />
            <Bar dataKey="total" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
