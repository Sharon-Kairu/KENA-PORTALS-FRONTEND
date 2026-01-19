'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { studentDistribution } from '../../data/distribution'

type Props = {
  year: number
}

export default function StudentsReport({ year }: Props) {
  const yearData = studentDistribution.find((y) => y.year === year) 
  const data = yearData?.data ?? []

  // Summary calculations
  const totalStudents = data.reduce((sum, item) => sum + item.students, 0)

  const highestMonth =
    data.reduce(
      (max, item) => (item.students > max.students ? item : max),
      { month: '', students: 0 } 
    ) || null

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Students ({year})</p>
          <p className="text-2xl font-semibold">{totalStudents}</p>
        </div>

        {highestMonth && (
          <div className="p-4 bg-white rounded-lg shadow">
            <p className="text-sm text-gray-500">Highest Enrollment Month</p>
            <p className="text-lg font-semibold">
              {highestMonth.month} ({highestMonth.students})
            </p>
          </div>
        )}
      </div>

      {/* Bar Chart */}
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">
          Students Per Month – {year}
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="students" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
