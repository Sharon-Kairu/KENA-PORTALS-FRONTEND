import React from 'react'
import { courseContentData } from '@/app/data/courseContents'
import { FiPlusCircle, FiFileText, FiVideo, FiMusic } from 'react-icons/fi'

const typeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'pdf':
      return <FiFileText className="text-red-500" size={20} />
    case 'video':
    case 'mp4':
      return <FiVideo className="text-blue-500" size={20} />
    case 'mp3':
      return <FiMusic className="text-purple-500" size={20} />
    default:
      return <FiFileText size={20} />
  }
}

const page = () => {
  return (
    <div className="ml-0 lg:ml-64">
      {/* Header */}
      <div
        className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40
                   h-20 md:h-25 p-4 md:p-6 pl-16 lg:pl-6
                   border-b border-gray-200 shadow-sm"
      >
        <h1 className="text-3xl font-bold text-gray-800">Course Content</h1>
        <p className="text-green-600 mt-1">Welcome, Chris Thairu</p>
      </div>

      {/* Content */}
      <div className="pt-24 md:pt-28 p-4 md:p-6 space-y-6">
        {/* Add content button */}
        <div className="flex justify-end">
          <button
            className="flex items-center gap-3 px-6 py-3 rounded-xl
                       bg-blue-600 text-white font-semibold
                       hover:bg-blue-700 transition shadow"
          >
            <FiPlusCircle size={20} />
            <span>Add New Content</span>
          </button>
        </div>

        {/* Course content cards */}
        <div className="space-y-8">
          {courseContentData.map((categoryData) => (
            <div key={categoryData.category}>
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {categoryData.category}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryData.contents.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
                  >
                    <div className="p-3 bg-gray-100 rounded-full">
                      {typeIcon(item.type)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.date}</p>
                      <p className="text-xs text-gray-400 uppercase">{item.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
