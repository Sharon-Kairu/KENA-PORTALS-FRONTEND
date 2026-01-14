'use client'
import React from 'react'
import { useState } from 'react'

const page = () => {
  const [standaloneCourses, setStandaloneCourses] = useState({
    computer: false,
    ai: false,
  })

  const [subscription, setSubscription] = useState('')
  const [subscriptionCourses, setSubscriptionCourses] = useState({
    driving: false,
    computer: false,
    ai: false,
  })

  const mode: 'standalone' | 'subscription' | null =
    standaloneCourses.computer || standaloneCourses.ai
      ? 'standalone'
      : subscription
      ? 'subscription'
      : null

  return (
    <div className="ml-0 lg:ml-64">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40
                      h-20 md:h-25 p-4 md:p-6 pl-16 lg:pl-6
                      border-b border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">Add Student</h1>
        <p className="text-green-600 mt-1">Welcome, Chris Thairu</p>
      </div>

      {/* Content */}
      <div className="p-6 mt-24">
        <form className="bg-white rounded-2xl p-8 shadow border border-blue-200 space-y-10">

          {/* ================= PERSONAL DETAILS ================= */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Personal Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                'First Name',
                'Second Name',
                'Email',
                'Phone Number',
                'Nationality',
                'Date of Birth',
                'ID Number',
              ].map((label) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-blue-600 mb-1">
                    {label}
                  </label>
                  <input
                    type={label === 'Date of Birth' ? 'date' : 'text'}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Gender
                </label>
                <select className="w-full border border-blue-500 rounded-lg px-3 py-2">
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>
          </section>

          <hr />

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

          <hr />

          {/* ================= COURSE INFO ================= */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Course Information
            </h2>

            {/* Standalone */}
            <div
              className={`p-5 rounded-xl border transition
              ${mode === 'subscription'
                ? 'bg-gray-100 opacity-50 pointer-events-none'
                : 'bg-blue-50 border-blue-300'
              }`}
            >
              <p className="font-medium text-blue-700 mb-3">
                Standalone Courses
              </p>

              {['computer', 'ai'].map((course) => (
                <label key={course} className="flex items-center gap-2 text-blue-700">
                  <input
                    type="checkbox"
                    checked={standaloneCourses[course as keyof typeof standaloneCourses]}
                    onChange={(e) =>
                      setStandaloneCourses({
                        ...standaloneCourses,
                        [course]: e.target.checked,
                      })
                    }
                  />
                  {course.toUpperCase()}
                </label>
              ))}
            </div>

            <div className="text-center text-gray-400 font-semibold my-6">OR</div>

            {/* Subscription */}
            <div
              className={`p-5 rounded-xl border transition
              ${mode === 'standalone'
                ? 'bg-gray-100 opacity-50 pointer-events-none'
                : 'bg-white border-blue-300'
              }`}
            >
              <label className="block text-sm font-medium text-blue-600 mb-2">
                Subscription Plan
              </label>

              <select
                value={subscription}
                onChange={(e) => {
                  const value = e.target.value
                  setSubscription(value)

                  if (!value) {
                    setSubscriptionCourses({ driving: false, computer: false, ai: false })
                    return
                  }

                  if (value === 'bronze')
                    setSubscriptionCourses({ driving: true, computer: false, ai: false })

                  if (value === 'gold')
                    setSubscriptionCourses({ driving: true, computer: false, ai: false })

                  if (value === 'platinum')
                    setSubscriptionCourses({ driving: false, computer: false, ai: false })
                }}
                className="w-full border border-blue-500 rounded-lg px-3 py-2"
              >
                <option value="">Select subscription</option>
                <option value="bronze">Bronze</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
              </select>

              {subscription && (
                <div
                  className={`mt-4 p-4 rounded-lg
                  ${subscription === 'bronze' && 'bg-amber-100 text-amber-700'}
                  ${subscription === 'gold' && 'bg-orange-100 text-orange-700'}
                  ${subscription === 'platinum' && 'bg-green-100 text-green-700'}
                `}
                >
                  {subscription === 'bronze' && <p>Driving (Included)</p>}

                  {subscription === 'gold' && (
                    <>
                      <label className="flex gap-2">
                        <input checked disabled type="checkbox" /> Driving (Required)
                      </label>
                      <label className="flex gap-2">
                        <input
                          type="checkbox"
                          checked={subscriptionCourses.computer}
                          onChange={(e) =>
                            setSubscriptionCourses({
                              ...subscriptionCourses,
                              computer: e.target.checked,
                            })
                          }
                        />
                        Computer (Optional)
                      </label>
                    </>
                  )}

                  {subscription === 'platinum' &&
                    ['driving', 'computer', 'ai'].map((course) => (
                      <label key={course} className="flex gap-2">
                        <input
                          type="checkbox"
                          checked={subscriptionCourses[course as keyof typeof subscriptionCourses]}
                          onChange={(e) =>
                            setSubscriptionCourses({
                              ...subscriptionCourses,
                              [course]: e.target.checked,
                            })
                          }
                        />
                        {course.toUpperCase()}
                      </label>
                    ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Total Fees
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300  rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Student Password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300  rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </section>

          {/* ACTION */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Create Student
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page
