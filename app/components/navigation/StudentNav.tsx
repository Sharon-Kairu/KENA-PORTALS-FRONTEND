'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiChevronRight, FiChevronLeft, FiLogOut } from 'react-icons/fi'
import { studentPages } from '@/app/constants/constants'

interface Props {
  mobileCollapsed: boolean
  setMobileCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const StudentNav = ({ mobileCollapsed, setMobileCollapsed }: Props) => {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile backdrop */}
      {!mobileCollapsed && (
        <div
          onClick={() => setMobileCollapsed(true)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* Toggle button – MOBILE & TABLET ONLY */}
      <button
        onClick={() => setMobileCollapsed(!mobileCollapsed)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 border border-gray-700
                   rounded-full p-1 text-gray-300 hover:text-white shadow-lg"
      >
        {mobileCollapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
      </button>

      <aside
        className={`
          fixed left-0 top-0 h-screen bg-gray-900 text-white flex flex-col z-40
          transition-all duration-300 ease-in-out overflow-hidden
          md:w-64
          ${mobileCollapsed ? 'w-0 md:w-64' : 'w-64'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-20 mt-10">
          <Image
            src="/logo.png"
            alt="Kena Logo"
            width={120}
            height={40}
            priority
            className={`${mobileCollapsed ? 'hidden md:block' : 'block'}`}
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 mt-10 py-6 space-y-2">
          {studentPages.map((page) => {
            const Icon = page.icon
            const isActive = pathname === page.href

            return (
              <div key={page.name} className="relative">
                {isActive && (
                  <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r-md" />
                )}

                <Link
                  href={page.href}
                  onClick={() => setMobileCollapsed(true)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${isActive
                      ? 'bg-gray-200 text-gray-900 font-semibold'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  {/* Icons hidden on mobile/tablet when collapsed */}
                  <span className={`${mobileCollapsed ? 'hidden md:inline' : 'inline'}`}>
                    <Icon size={20} />
                  </span>

                  {/* Text */}
                  <span
                    className={`
                      text-sm font-medium whitespace-nowrap
                      ${mobileCollapsed ? 'hidden md:inline' : 'inline'}
                    `}
                  >
                    {page.name}
                  </span>
                </Link>
              </div>
            )
          })}
        </nav>

        {/* Logout */}
        <div className={`flex flex-row ${mobileCollapsed ? 'hidden md:flex' : 'flex'}`}>
          <FiLogOut size={20} className="mx-4 mb-4" />
          <span className="text-sm font-medium mx-4 mb-4">Logout</span>
        </div>

        {/* Footer */}
        <div
          className={`
            px-4 py-4 border-t border-gray-700 text-xs text-gray-400
            ${mobileCollapsed ? 'hidden md:block' : 'block'}
          `}
        >
          © {new Date().getFullYear()} Kena Driving School
        </div>
      </aside>
    </>
  )
}

export default StudentNav
