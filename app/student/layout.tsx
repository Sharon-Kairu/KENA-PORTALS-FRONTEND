'use client'

import { useState } from 'react'
import StudentNav from '../components/navigation/student/StudentNav'

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const [mobileCollapsed, setMobileCollapsed] = useState(true)

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <StudentNav mobileCollapsed={mobileCollapsed} setMobileCollapsed={setMobileCollapsed} />

      {/* Page Content */}
      <div
        className={`
          flex-1 transition-all duration-300
          ${mobileCollapsed
            ? ''
            : 'filter blur-sm pointer-events-none'
          }
        `}
      >
        {children}
      </div>
    </div>
  )
}
