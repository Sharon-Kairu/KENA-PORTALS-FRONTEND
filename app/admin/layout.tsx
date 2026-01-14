'use client'
import { useState } from 'react'
import AdminNav from '../components/navigation/AdminNav'

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  const [mobileCollapsed, setMobileCollapsed] = useState(true)

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <AdminNav mobileCollapsed={mobileCollapsed} setMobileCollapsed={setMobileCollapsed} />

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
