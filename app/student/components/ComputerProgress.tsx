import React from 'react'
import { Practical } from '@/app/types/practical'
import { FaCheck } from 'react-icons/fa6'

type Props = {
  practical: Practical
}

const ComputerProgress = ({practical}: Props) => {
  const completed = practical.features.filter(f => f.status === "Completed").length
  const total = practical.features.length
  const per = Math.round((completed / total) * 100)
  const next = practical.features.find(f => f.status === "Pending")

  // Determine message and colors
  let message = ""
  let bgColor = ""
  let textColor = ""

  if (per === 100) {
    message = "Congratulations! You have completed all packages!"
    bgColor = "bg-green-100"
    textColor = "text-green-800"
  } else if (per >= 50) {
    message = "Keep going! You are almost there!"
    bgColor = "bg-orange-100"
    textColor = "text-orange-800"
  } else {
    message = "You’re just getting started. Keep learning!"
    bgColor = "bg-yellow-100"
    textColor = "text-yellow-800"
  }
  return (
    <div className="p-4 md:p-6">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Progress of Your Packages
          </h2>
    
          {/* Progress Summary */}
          <div className={`p-4 rounded-lg mb-6 ${bgColor}`}>
            <h3 className={`font-semibold text-xl ${textColor}`}>{per}% Completed</h3>
            <p className={`mt-2 ${textColor}`}>
              {message} <br />
              You have completed {completed} out of {total} packages. <br />
              Next up: {next ? next.title : "All completed!"}
            </p>
          </div>
    
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3 border-b border-gray-300">Packages</th>
                  <th className="text-left p-3 border-b border-gray-300">Date</th>
                  <th className="text-left p-3 border-b border-gray-300">Status</th>
                  <th className="text-left p-3 border-b border-gray-300">Comment</th>
                </tr>
              </thead>
    
              <tbody>
                {practical.features.map((feature) => (
                  <tr
                    key={feature.title}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 border-b border-gray-200">{feature.title}</td>
                    <td className="p-3 border-b border-gray-200">{feature.date}</td>
                    <td className="p-3 border-b border-gray-200">
                      {feature.status === "Completed" ? (
                        <div className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                          <FaCheck className="w-4 h-4" /> {feature.status}
                        </div>
                      ) : (
                        <div className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full font-medium">
                          {feature.status}
                        </div>
                      )}
                    </td>
                    <td className="p-3 border-b border-gray-200">{feature.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  )
}

export default ComputerProgress
