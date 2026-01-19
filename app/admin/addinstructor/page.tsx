import React from 'react'

const page = () => {
  return (
    <div className='ml-0 lg:ml-64'>
        {/* Header */}
      <div className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40
                      h-20 md:h-25 p-4 md:p-6 pl-16 lg:pl-6
                      border-b border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">Add Instructor</h1>
        <p className="text-green-600 mt-1">Welcome, Chris Thairu</p>
      </div>
      {/*Content*/}
      <div className="pt-24 md:pt-28 p-4 md:p-6 space-y-6">
        <form className="bg-white rounded-2xl p-8 shadow border border-blue-200 space-y-8">

          {/* ================= INSTRUCTOR DETAILS ================= */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Instructor Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              {/* Second Name */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Second Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              {/* Nationality */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Nationality
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              {/* ID Number */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  ID Number
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              {/* Instructor License Number */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Instructor License Number
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

            </div>
          </section>
          {/* ================= NEXT OF KIN ================= */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Next of Kin Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                'First Name',
                'Second Name',
                'Email',
                'Phone Number',
                'Relationship',
                'Occupation',
              ].map((label) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-blue-600 mb-1">
                    {label}
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300  rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* ================= ACTION ================= */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Register Instructor
            </button>
          </div>

        </form>
      </div>
      
    </div>
  )
}

export default page
