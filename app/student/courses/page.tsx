import React from 'react'
import { FaCar,FaComputer,FaRobot} from 'react-icons/fa6'

const page = () => {
  return (
    <div className='ml-25 md:ml-64'>
      {/* Header – fixed on top */}
      <div className="fixed top-0 left-0 right-0 left-20 md:left-64 bg-white z-50 p-4 md:p-6 border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Courses</h1>
        <p className="text-green-600 text-md md:text-lg mt-1">Welcome, Sharon Kairu</p>
      </div>
      {/*Main content*/}
      <div className='p-4 md:p-6 mt-24 md:mt-28 space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {/*Driving*/}
          <div className='bg-white p-4 rounded-xl space-y-6'>
            <div className='flex flex-row justify-between items-center '>
              <h1 className='text-blue-700 font-bold text-2xl'>Driving</h1>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <FaCar size={22}/>
              </div>
            </div>
            <div className='w-full p-4 bg-blue-100 rounded-lg text-blue-700 text-xl font-bold'>
              10 <span className='text-lg'>out of 13 practicals done</span>
            </div>
            <p className='text-gray-800 font-bold text-xl'>Next Practical:</p>
            <p className='text-gray-600 text-lg'>Reverese 2 </p>
            <button className='w-full bg-blue-500 hover:bg-blue-600 p-4 rounded-xl text-white'>
              View Course details
            </button> 
          </div>

          {/*Computer*/}
          <div className='bg-white p-4 rounded-xl space-y-6'>
            <div className='flex flex-row justify-between items-center '>
              <h1 className='text-green-700 font-bold text-2xl'>Computer</h1>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-700">
                <FaComputer size={22}/>
              </div>
            </div>
            <div className='w-full p-4 bg-green-100 rounded-lg text-green-700 text-xl font-bold'>
              8 <span className='text-lg'>out of 10 packages done</span>
            </div>
            <p className='text-gray-800 font-bold text-xl'>Next Package:</p>
            <p className='text-gray-600 text-lg'>Microsoft Word </p>
            <button className='w-full bg-green-500 hover:bg-green-600 p-4 rounded-xl text-white'>
              View Course details
            </button> 
          </div>

          {/*AI*/}
          <div className='bg-white p-4 rounded-xl space-y-6'>
            <div className='flex flex-row justify-between items-center '>
              <h1 className='text-orange-700 font-bold text-2xl'>Artificial Intelligence</h1>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 text-orange-700">
                <FaRobot size={22}/>
              </div>
            </div>
            <div className='w-full p-4 bg-orange-100 rounded-lg text-orange-700 text-xl font-bold'>
              7 <span className='text-lg'>out of 10 units done</span>
            </div>
            <p className='text-gray-800 font-bold text-xl'>Next Unit:</p>
            <p className='text-gray-600 text-lg'>Creating Videos </p>
            <button className='w-full bg-orange-500 hover:bg-orange-600 p-4 rounded-xl text-white'>
              View Course details
            </button> 
          </div>

        </div>
      </div>
    </div>
  )
}

export default page
