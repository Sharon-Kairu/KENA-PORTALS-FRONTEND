'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { packageDistribution2025 } from '../../data/distribution'

export default function PackagesReport() {
  // Prepare chart data: one object per month with standalone and subscription counts
  const data = packageDistribution2025[1].map((month) => ({
    month: month.month,
    Standalone: month.data.find((p) => p.type === 'Standalone')?.studentsr || 0,
    Subscription: month.data.find((p) => p.type === 'Subscription')?.studentsr || 0,
  }))

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="text-lg font-medium mb-2">Monthly Packages – 2025</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Standalone" fill="#3b82f6" />
          <Bar dataKey="Subscription" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
