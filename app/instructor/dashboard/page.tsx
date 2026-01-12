import React from 'react'

const page = () => {
  return (
    <div className='ml-5 lg:ml-64'>
      {/* Header – fixed on top */}
      <div className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40
                h-20 md:h-25 p-4 md:p-6 pl-16 lg:pl-6
                border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Instructor Dashboard
        </h1>
        <p className="text-gray-600 text-md md:text-lg mt-1">
          Welcome, Instructor One
        </p>
      </div>
    </div>
  )
}

export default page
