'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { commentsData } from '../../data/reports'

// Map comment to numeric score
const commentScore = (comment: 'Excellent' | 'Good' | 'Fair') => {
  switch (comment) {
    case 'Excellent':
      return 10
    case 'Good':
      return 5
    case 'Fair':
      return 1
    default:
      return 0
  }
}

export default function PerformanceReport() {
  // Flatten comments into chart-friendly data: month + scores for each year
  const months = commentsData[0].data.map((m) => m.month)

  const data = months.map((month, index) => {
    const monthData: any = { month }
    commentsData.forEach((yearData) => {
      const score = commentScore(yearData.data[index].comment)
      monthData[yearData.year] = score
    })
    return monthData
  })

  // Calculate average per year
  const averages: { year: number; score: number; label: string }[] = commentsData.map(
    (yearData) => {
      const total = yearData.data.reduce(
        (sum, month) => sum + commentScore(month.comment),
        0
      )
      const avgScore = total / yearData.data.length
      // Determine label
      let label = ''
      if (avgScore >= 8) label = 'Excellent'
      else if (avgScore >= 4) label = 'Good'
      else label = 'Fair'

      return { year: yearData.year, score: avgScore, label }
    }
  )

  return (
    <div className="space-y-6">
      {/* Average Performance Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {averages.map((avg) => (
          <div
            key={avg.year}
            className="bg-white p-4 rounded shadow flex flex-col items-start"
          >
            <p className="text-sm text-gray-500">Average Performance ({avg.year})</p>
            <p className="text-xl font-semibold">
              {avg.label} ({avg.score.toFixed(1)})
            </p>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-medium mb-4">Monthly Performance</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => value.toFixed(1)}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            {commentsData.map((year) => (
              <Bar
                key={year.year}
                dataKey={year.year}
                name={`${year.year}`}
                fill={year.year === 2025 ? '#3b82f6' : '#10b981'}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
