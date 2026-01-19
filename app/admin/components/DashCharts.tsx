import React from 'react'
import { ResponsiveContainer,PieChart,Tooltip,Pie,Cell,Legend} from 'recharts'
import {subscriptionDistribution,standaloneDistribution} from '../../data/distribution'



const DashCharts = () => {
  const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}: any) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) / 2
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight="600"
    >
      {value}
    </text>
  )
}

  const COLORS = ['#CD7F32', '#FFD700', '#E5E4E2']
  const colors=['#62b5ed','#ff8000']
  return (
    
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart Card */}
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-orange-700 mb-4">
            Subscription Distribution
          </h2>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subscriptionDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={45}
                  label={renderLabel}
                  labelLine={false} 
                >
                  {subscriptionDistribution.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className='bg-blue-100 border border-blue-200 rounded-xl p-6 shadow-sm'>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Standalone Distribution
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={standaloneDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={45}
                  label={renderLabel}
                  labelLine={false} 
                >
                  {standaloneDistribution.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
    
  )
}

export default DashCharts
