'use client'

import React, { useState, useMemo } from 'react'
import { studentDistribution } from '@/app/data/distribution'
import { FiCalendar } from 'react-icons/fi'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

const DistributionChart = () => {
  const [year, setYear] = useState<number>(2026)

  // Available years for the dropdown
  const years = useMemo(
    () => studentDistribution.map(item => item.year),
    []
  )

  // Data for selected year (Recharts expects an array)
  const yearData = useMemo(
    () =>
      studentDistribution.find(item => item.year === year)?.data ?? [],
    [year]
  )

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      {/* Header + Filter */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Student Distribution Per Month
        </h2>

        <div className="relative">
          <FiCalendar
            className="absolute left-3 top-1/2 -translate-y-1/2
                       text-blue-600 pointer-events-none"
            size={16}
          />

          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="
              appearance-none
              pl-10 pr-10 py-2
              text-sm font-medium
              bg-blue-50 text-blue-700
              border border-blue-200
              rounded-full
              cursor-pointer
              hover:bg-blue-100
              focus:outline-none focus:ring-2 focus:ring-blue-500
              transition
            "
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <span className="absolute right-3 top-1/2 -translate-y-1/2
                           text-blue-600 pointer-events-none">
            ▾
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={yearData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="students"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default DistributionChart
