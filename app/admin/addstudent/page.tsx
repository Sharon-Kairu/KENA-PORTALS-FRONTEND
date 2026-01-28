'use client'
import React, { useState } from 'react'
import apiService from '../../services/apiService'

const page = () => {
  const [student, setStudent] = useState({
    firstName: '',
    secondName: '',
    email: '',
    phoneNumber: '',
    nationality: '',
    dateOfBirth: '',
    idNumber: '',
    gender: '',
    password: '',
    nokFirstName: '',
    nokSecondName: '',
    nokEmail: '',
    nokPhone: '',
    nokRelationship: '',
    nokOccupation: '',
    totalFees: '',
  })

  const [standaloneCourses, setStandaloneCourses] = useState({
    computer: false,
    ai: false,
  })

  // CHANGED: Store as number or empty string
  const [subscription, setSubscription] = useState<number | ''>('')
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // collect selected courses
    const selectedCourses: number[] = []

    if (mode === 'standalone') {
      if (standaloneCourses.computer) selectedCourses.push(5)  // CHANGED: 1 -> 5
      if (standaloneCourses.ai) selectedCourses.push(6)        // CHANGED: 2 -> 6
    }

    if (mode === 'subscription') {
      if (subscriptionCourses.driving) selectedCourses.push(7)   // CHANGED: 3 -> 7
      if (subscriptionCourses.computer) selectedCourses.push(5)  // CHANGED: 1 -> 5
      if (subscriptionCourses.ai) selectedCourses.push(6)        // CHANGED: 2 -> 6
    }

    const payload = {
      user: {
        role: 'student',
        first_name: student.firstName,
        last_name: student.secondName,
        email: student.email,
        phone: student.phoneNumber,
        password: student.password,
        id_number: student.idNumber,
      },
      subscription_plan: subscription || null, 
      courses: selectedCourses,
      nok_first_name: student.nokFirstName,
      nok_last_name: student.nokSecondName,
      nok_email: student.nokEmail,
      nok_phone: student.nokPhone,
      nok_relationship: student.nokRelationship,
      nok_occupation: student.nokOccupation,
      total_fees: student.totalFees,
    }

    console.log('Payload:', payload)  // Debug log

    try {
      const res = await apiService.postWithToken('/enrollments/enroll', payload)
      console.log('Student created:', res)
      alert('Student created successfully')
    } catch (err: any) {
      console.error(err)
      alert(err.message || 'Failed to create student')
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setStudent({ ...student, [field]: value })
  }

  return (
    <div className="ml-0 lg:ml-64">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40 h-20 md:h-25 p-4 md:p-6 pl-16 lg:pl-6 border-b border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">Add Student</h1>
        <p className="text-green-600 mt-1">Welcome, Chris Thairu</p>
      </div>

      {/* Content */}
      <div className="p-6 mt-24">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow border border-blue-200 space-y-10">
          {/* ================= PERSONAL DETAILS ================= */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">First Name</label>
                <input
                  type="text"
                  value={student.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Second Name</label>
                <input
                  type="text"
                  value={student.secondName}
                  onChange={(e) => handleInputChange('secondName', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Email</label>
                <input
                  type="text"
                  value={student.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={student.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Nationality</label>
                <input
                  type="text"
                  value={student.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={student.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">ID Number</label>
                <input
                  type="text"
                  value={student.idNumber}
                  onChange={(e) => handleInputChange('idNumber', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Gender</label>
                <select
                  value={student.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full border border-blue-500 rounded-lg px-3 py-2"
                >
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
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Next of Kin Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">First Name</label>
                <input
                  type="text"
                  value={student.nokFirstName}
                  onChange={(e) => handleInputChange('nokFirstName', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Second Name</label>
                <input
                  type="text"
                  value={student.nokSecondName}
                  onChange={(e) => handleInputChange('nokSecondName', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Email</label>
                <input
                  type="text"
                  value={student.nokEmail}
                  onChange={(e) => handleInputChange('nokEmail', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={student.nokPhone}
                  onChange={(e) => handleInputChange('nokPhone', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Relationship</label>
                <input
                  type="text"
                  value={student.nokRelationship}
                  onChange={(e) => handleInputChange('nokRelationship', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Occupation</label>
                <input
                  type="text"
                  value={student.nokOccupation}
                  onChange={(e) => handleInputChange('nokOccupation', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
            </div>
          </section>

          <hr />

          {/* ================= COURSE INFO ================= */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Course Information</h2>

            {/* Standalone */}
            <div
              className={`p-5 rounded-xl border transition ${
                mode === 'subscription'
                  ? 'bg-gray-100 opacity-50 pointer-events-none'
                  : 'bg-blue-50 border-blue-300'
              }`}
            >
              <p className="font-medium text-blue-700 mb-3">Standalone Courses</p>

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

            {/* Subscription - UPDATED */}
            <div
              className={`p-5 rounded-xl border transition ${
                mode === 'standalone'
                  ? 'bg-gray-100 opacity-50 pointer-events-none'
                  : 'bg-white border-blue-300'
              }`}
            >
              <label className="block text-sm font-medium text-blue-600 mb-2">Subscription Plan</label>

              <select
                value={subscription}
                onChange={(e) => {
                  const value = e.target.value ? Number(e.target.value) : ''  // CHANGED: Convert to number
                  setSubscription(value)

                  if (!value) {
                    setSubscriptionCourses({ driving: false, computer: false, ai: false })
                    return
                  }

                  if (value === 1)  // Bronze
                    setSubscriptionCourses({ driving: true, computer: false, ai: false })

                  if (value === 2)  // Gold
                    setSubscriptionCourses({ driving: true, computer: false, ai: false })

                  if (value === 3)  // Platinum
                    setSubscriptionCourses({ driving: false, computer: false, ai: false })
                }}
                className="w-full border border-blue-500 rounded-lg px-3 py-2"
              >
                <option value="">Select subscription</option>
                <option value="1">Bronze</option>
                <option value="2">Gold</option>
                <option value="3">Platinum</option>
              </select>

              {subscription && (
                <div
                  className={`mt-4 p-4 rounded-lg ${subscription === 1 && 'bg-amber-100 text-amber-700'} ${
                    subscription === 2 && 'bg-orange-100 text-orange-700'
                  } ${subscription === 3 && 'bg-green-100 text-green-700'}`}
                >
                  {subscription === 1 && <p>Driving (Included)</p>}

                  {subscription === 2 && (
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

                  {subscription === 3 &&
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
                <label className="block text-sm font-medium text-blue-600 mb-1">Total Fees</label>
                <input
                  type="number"
                  value={student.totalFees}
                  onChange={(e) => handleInputChange('totalFees', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Student Password</label>
                <input
                  type="password"
                  value={student.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
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