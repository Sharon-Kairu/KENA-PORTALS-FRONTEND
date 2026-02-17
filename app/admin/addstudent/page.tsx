'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import apiService from '../../services/apiService'
import Toast, { ToastType } from '@/app/components/Toast'

export type Instructor = {
  id: number
  full_name: string
  course: string
  category?: string | null
}


const page = () => {
  const router = useRouter();
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [drivingTheoryInstructors, setDrivingTheoryInstructors] = useState<Instructor[]>([])
  const [drivingPracticalInstructors, setDrivingPracticalInstructors] = useState<Instructor[]>([])
  const [computerInstructors, setComputerInstructors] = useState<Instructor[]>([])
  const [aiInstructors, setAiInstructors] = useState<Instructor[]>([])

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

  // NEW: Store selected instructors
  const [selectedInstructors, setSelectedInstructors] = useState({
    drivingTheory: '',
    drivingPractical: '',
    computer: '',
    ai: '',
  })

  const [subscription, setSubscription] = useState<number | ''>('')
  const [subscriptionCourses, setSubscriptionCourses] = useState({
    driving: false,
    computer: false,
    ai: false,
  })

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await apiService.getWithToken('/instructors/get_instructors/')
        console.log("FULL RESPONSE:", res)
        console.log("RES.DATA:", res.data)
        console.log("IS ARRAY?", Array.isArray(res.data))


        const instructors: Instructor[] = res ?? []

        console.log(instructors)

        const driving = instructors.filter((inst: Instructor) => inst.course === "driving")
        const computer = instructors.filter((inst: Instructor) => inst.course === "computer")
        const ai = instructors.filter((inst: Instructor) => inst.course === "ai")

        setDrivingTheoryInstructors(
          driving.filter((inst: Instructor) => inst.category === "theory")
        )

        setDrivingPracticalInstructors(
          driving.filter((inst: Instructor) => inst.category === "practical")
        )

        setComputerInstructors(computer)
        setAiInstructors(ai)

      } catch (error) {
        console.log("Error fetching instructors:", error)
      }
    }

    fetchInstructors()
  }, [])

  const mode: 'standalone' | 'subscription' | null =
    standaloneCourses.computer || standaloneCourses.ai
      ? 'standalone'
      : subscription
      ? 'subscription'
      : null

  // NEW: Helper function to determine which courses need instructors
  const needsInstructorSelection = () => {
    const needs = {
      drivingTheory: false,
      drivingPractical: false,
      computer: false,
      ai: false,
    }

    if (mode === 'standalone') {
      needs.computer = standaloneCourses.computer
      needs.ai = standaloneCourses.ai
    }

    if (mode === 'subscription' && subscription) {
      // All subscription plans include driving
      if (subscription === 1 || subscription === 2 || subscription === 3) {
        needs.drivingTheory = subscriptionCourses.driving
        needs.drivingPractical = subscriptionCourses.driving
      }

      // Gold and Platinum can have computer
      if (subscription === 2 || subscription === 3) {
        needs.computer = subscriptionCourses.computer
      }

      // Only Platinum can have AI
      if (subscription === 3) {
        needs.ai = subscriptionCourses.ai
      }
    }

    return needs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true);

    // Frontend validation
    const requiredPersonalFields = [
      { field: 'firstName', label: 'First Name' },
      { field: 'secondName', label: 'Second Name' },
      { field: 'email', label: 'Email' },
      { field: 'phoneNumber', label: 'Phone Number' },
      { field: 'idNumber', label: 'ID Number' },
      { field: 'gender', label: 'Gender' },
      { field: 'password', label: 'Password' },
    ];

    const emptyPersonalFields = requiredPersonalFields.filter(
      ({ field }) => !student[field as keyof typeof student]
    );

    if (emptyPersonalFields.length > 0) {
      const fieldNames = emptyPersonalFields.map(f => f.label).join(', ');
      setToast({
        message: `Please fill in required personal fields: ${fieldNames}`,
        type: 'error'
      });
      setIsSubmitting(false);
      return;
    }

    // Validate NOK fields
    const requiredNOKFields = [
      { field: 'nokFirstName', label: 'NOK First Name' },
      { field: 'nokSecondName', label: 'NOK Second Name' },
      { field: 'nokPhone', label: 'NOK Phone' },
      { field: 'nokRelationship', label: 'NOK Relationship' },
    ];

    const emptyNOKFields = requiredNOKFields.filter(
      ({ field }) =>!student[field as keyof typeof student]
    );

    if (emptyNOKFields.length > 0) {
      const fieldNames = emptyNOKFields.map(f => f.label).join(', ');
      setToast({
        message: `Please fill in required next of kin fields: ${fieldNames}`,
        type: 'error'
      });
      setIsSubmitting(false);
      return;
    }

    // Validate total fees
    if (!student.totalFees || parseFloat(student.totalFees) <= 0) {
      setToast({
        message: 'Please enter valid total fees',
        type: 'error'
      });
      setIsSubmitting(false);
      return;
    }

    // Validate course selection
    if (!mode) {
      setToast({
        message: 'Please select either standalone courses or a subscription plan',
        type: 'error'
      });
      setIsSubmitting(false);
      return;
    }

    // Collect selected courses
    const selectedCourses: number[] = []

    if (mode === 'standalone') {
      if (standaloneCourses.computer) selectedCourses.push(5)
      if (standaloneCourses.ai) selectedCourses.push(6)
    }

    if (mode === 'subscription') {
      if (subscriptionCourses.driving) selectedCourses.push(7)
      if (subscriptionCourses.computer) selectedCourses.push(5)
      if (subscriptionCourses.ai) selectedCourses.push(6)
    }

    // NEW: Prepare instructor assignments
    const instructorAssignments = []

    const needs = needsInstructorSelection()

    if (needs.drivingTheory && selectedInstructors.drivingTheory) {
      instructorAssignments.push({
        course_id: 7, // driving course ID
        instructor_id: selectedInstructors.drivingTheory,
        category: 'theory'
      })
    }

    if (needs.drivingPractical && selectedInstructors.drivingPractical) {
      instructorAssignments.push({
        course_id: 7,
        instructor_id: selectedInstructors.drivingPractical,
        category: 'practical'
      })
    }

    if (needs.computer && selectedInstructors.computer) {
      instructorAssignments.push({
        course_id: 5,
        instructor_id: selectedInstructors.computer,
        category: null
      })
    }

    if (needs.ai && selectedInstructors.ai) {
      instructorAssignments.push({
        course_id: 6,
        instructor_id: selectedInstructors.ai,
        category: null
      })
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
      instructor_assignments: instructorAssignments, 
      nok_first_name: student.nokFirstName,
      nok_last_name: student.nokSecondName,
      nok_email: student.nokEmail,
      nok_phone: student.nokPhone,
      nok_relationship: student.nokRelationship,
      nok_occupation: student.nokOccupation,
      total_fees: student.totalFees,
    }

    console.log('Payload:', payload)

    try {
      const res = await apiService.postWithToken('/enrollments/enroll', payload)
      console.log('Student created:', res)
      
      setToast({
        message: 'Student registered successfully!',
        type: 'success'
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/admin/students');
      }, 2000);
    } catch (err: any) {
      console.error(err)
      
      // Extract error message from API response
      let errorMessage = 'Failed to register student';
      
      if (err.response?.data) {
        const data = err.response.data;
        if (data.message) {
          errorMessage = data.message;
        } else if (data.error) {
          errorMessage = data.error;
        } else if (data.errors) {
          const errorValues = Object.values(data.errors);
          if (errorValues.length > 0) {
            errorMessage = Array.isArray(errorValues[0])
              ? errorValues[0][0]
              : String(errorValues[0]);
          }
        }
      } else if (err.message) {
        errorMessage = err.message;
      }

      setToast({
        message: errorMessage,
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setStudent({ ...student, [field]: value })
  }

  // NEW: Handle instructor selection
  const handleInstructorChange = (field: keyof typeof selectedInstructors, value: string) => {
    setSelectedInstructors({ ...selectedInstructors, [field]: value })
  }

  const needs = needsInstructorSelection()

  return (
    <div className="ml-0 lg:ml-64">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
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
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Second Name</label>
                <input
                  type="text"
                  value={student.secondName}
                  onChange={(e) => handleInputChange('secondName', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Email</label>
                <input
                  type="email"
                  value={student.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={student.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
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
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Gender</label>
                <select
                  value={student.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full border border-blue-500 rounded-lg px-3 py-2"
                  required
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
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Second Name</label>
                <input
                  type="text"
                  value={student.nokSecondName}
                  onChange={(e) => handleInputChange('nokSecondName', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Email</label>
                <input
                  type="email"
                  value={student.nokEmail}
                  onChange={(e) => handleInputChange('nokEmail', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={student.nokPhone}
                  onChange={(e) => handleInputChange('nokPhone', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Relationship</label>
                <input
                  type="text"
                  value={student.nokRelationship}
                  onChange={(e) => handleInputChange('nokRelationship', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
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
                <label key={course} className="flex items-center gap-2 text-blue-700 mb-2">
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
                  const value = e.target.value ? Number(e.target.value) : ''
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
                      <label className="flex gap-2 mb-2">
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
                      <label key={course} className="flex gap-2 mb-2">
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

            {/* NEW: INSTRUCTOR SELECTION SECTION */}
            {(needs.drivingTheory || needs.drivingPractical || needs.computer || needs.ai) && (
              <div className="mt-6 p-5 bg-green-50 border border-green-300 rounded-xl">
                <h3 className="text-lg font-semibold text-green-700 mb-4">Assign Instructors</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Driving Theory Instructor */}
                  {needs.drivingTheory && (
                    <div>
                      <label className="block text-sm font-medium text-green-700 mb-1">
                        Driving Theory Instructor *
                      </label>
                      <select
                        value={selectedInstructors.drivingTheory}
                        onChange={(e) => handleInstructorChange('drivingTheory', e.target.value)}
                        className="w-full border border-green-500 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                        required
                      >
                        <option value="">Select theory instructor</option>
                        {drivingTheoryInstructors.map((instructor) => (
                          <option key={instructor.id} value={instructor.id}>
                            {instructor.full_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Driving Practical Instructor */}
                  {needs.drivingPractical && (
                    <div>
                      <label className="block text-sm font-medium text-green-700 mb-1">
                        Driving Practical Instructor *
                      </label>
                      <select
                        value={selectedInstructors.drivingPractical}
                        onChange={(e) => handleInstructorChange('drivingPractical', e.target.value)}
                        className="w-full border border-green-500 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                        required
                      >
                        <option value="">Select practical instructor</option>
                        {drivingPracticalInstructors.map((instructor) => (
                          <option key={instructor.id} value={instructor.id}>
                            {instructor.full_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Computer Instructor */}
                  {needs.computer && (
                    <div>
                      <label className="block text-sm font-medium text-green-700 mb-1">
                        Computer Instructor *
                      </label>
                      <select
                        value={selectedInstructors.computer}
                        onChange={(e) => handleInstructorChange('computer', e.target.value)}
                        className="w-full border border-green-500 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                        required
                      >
                        <option value="">Select computer instructor</option>
                        {computerInstructors.map((instructor) => (
                          <option key={instructor.id} value={instructor.id}>
                            {instructor.full_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* AI Instructor */}
                  {needs.ai && (
                    <div>
                      <label className="block text-sm font-medium text-green-700 mb-1">
                        AI Instructor *
                      </label>
                      <select
                        value={selectedInstructors.ai}
                        onChange={(e) => handleInstructorChange('ai', e.target.value)}
                        className="w-full border border-green-500 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                        required
                      >
                        <option value="">Select AI instructor</option>
                        {aiInstructors.map((instructor) => (
                          <option key={instructor.id} value={instructor.id}>
                            {instructor.full_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Total Fees</label>
                <input
                  type="number"
                  value={student.totalFees}
                  onChange={(e) => handleInputChange('totalFees', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Student Password *</label>
                <input
                  type="password"
                  value={student.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                  minLength={6}
                />
              </div>
            </div>
          </section>

          {/* ACTION */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Registering...' : 'Create Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page
