'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiService from '@/app/services/apiService';
import Toast, { ToastType } from '@/app/components/Toast';

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null)
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
   
     useEffect(() => {
       const fetchUser = async () => {
         try {
         const data = await fetch(
         `${process.env.NEXT_PUBLIC_API_HOST}/auth/me/`,
         { credentials: 'include' } // 🔥 cookies sent automatically
         ).then(res => res.json())
         console.log('Fetched user data:', data)
         setUser(data)
         } catch (err) {
         console.error('Failed to fetch user', err)
         }
      }
       fetchUser()
       }, [])

  // State for instructor
  const [instructorData, setInstructorData] = useState({
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    role: 'instructor',
    course: '', 
    category:'',
    national_id: '',
    instructor_id: '',
    license_number: '',
    date_of_birth: '',
    nok_first_name: '',
    nok_last_name: '',
    nok_email: '',
    nok_phone: '',
    nok_relationship: '',
    nok_occupation: '',
  });


  // Generic handler for instructor fields
  const handleInstructorChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInstructorData((prev) => ({ ...prev, [name]: value }));
  };


  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Frontend validation
    const requiredFields = [
      { field: 'first_name', label: 'First Name' },
      { field: 'last_name', label: 'Last Name' },
      { field: 'email', label: 'Email' },
      { field: 'phone_number', label: 'Phone Number' },
      { field: 'password', label: 'Password' },
      { field: 'course', label: 'Course' },
      { field: 'national_id', label: 'National ID' },
      { field: 'date_of_birth', label: 'Date of Birth' },
      { field: 'nok_first_name', label: 'Next of Kin First Name' },
      { field: 'nok_last_name', label: 'Next of Kin Last Name' },
      { field: 'nok_phone', label: 'Next of Kin Phone' },
      { field: 'nok_relationship', label: 'Next of Kin Relationship' },
    ];

    const emptyFields = requiredFields.filter(({ field }) => !instructorData[field as keyof typeof instructorData]);
    
    if (emptyFields.length > 0) {
      const fieldNames = emptyFields.map(f => f.label).join(', ');
      setToast({
        message: `Please fill in all required fields: ${fieldNames}`,
        type: 'error'
      });
      setIsSubmitting(false);
      return;
    }

    // Validate driving instructors must have category
    if (instructorData.course === 'driving' && !instructorData.category) {
      setToast({
        message: 'Please select a category for driving instructors (Theory or Practical)',
        type: 'error'
      });
      setIsSubmitting(false);
      return;
    }

    const payload: any = {
      user: {
        password: instructorData.password,
        first_name: instructorData.first_name,
        last_name: instructorData.last_name,
        email: instructorData.email,
        phone_number: instructorData.phone_number,
        role: 'instructor',
        national_id: instructorData.national_id,
      },
      course: instructorData.course,
      license_number: instructorData.license_number, 
      date_of_birth: instructorData.date_of_birth,
      nok_first_name: instructorData.nok_first_name,
      nok_last_name: instructorData.nok_last_name,
      nok_email: instructorData.nok_email,
      nok_phone: instructorData.nok_phone,
      nok_relationship: instructorData.nok_relationship,
      nok_occupation: instructorData.nok_occupation,
    };

    if (instructorData.course === 'driving' && instructorData.category) {
      payload.category = instructorData.category;
    }

    try {
      const res = await apiService.postWithToken('/instructors/register/', payload);
      console.log('Instructor registered:', res);
      
      setToast({
        message: 'Instructor registered successfully!',
        type: 'success'
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/admin/instructors');
      }, 2000);
    } catch (err: any) {
      console.error('Error:', err);
      
      // Extract error message from API response
      let errorMessage = 'Failed to register instructor';
      
      if (err.response?.data) {
        const data = err.response.data;
        if (data.message) {
          errorMessage = data.message;
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
  };
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
      <div
        className="fixed top-0 left-0 right-0 lg:left-64 bg-white z-40
                    h-20 md:h-25 p-4 md:p-6 pl-16 lg:pl-6
                    border-b border-gray-200 shadow-sm"
      >
        <h1 className="text-3xl font-bold text-gray-800">Add Instructor</h1>
        <p className="text-green-600 mt-1">Welcome, Chris Thairu</p>
      </div>

      {/* Content */}
      <div className="pt-24 md:pt-28 p-4 md:p-6 space-y-6">
        <form
          className="bg-white rounded-2xl p-8 shadow border border-blue-200 space-y-8"
          onSubmit={handleSubmit}
        >
          {/* ================= INSTRUCTOR DETAILS ================= */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Instructor Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={instructorData.first_name}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={instructorData.last_name}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={instructorData.email}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  value={instructorData.phone_number}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Course <span className="text-red-500">*</span>
                </label>
                <select
                  name="course"
                  value={instructorData.course}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                ><option value={''}>Select Course</option>
                  <option value={'ai'}>AI</option>
                  <option value={'computer'}>Computer</option>
                  <option value={'driving'}>Driving</option>
                </select>
              </div>

              {instructorData.course==='driving' && (
                <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={instructorData.category}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  <option value={''}>Select Category</option>
                  <option value={'theory'}>Theory</option>
                  <option value={'practical'}>Practical</option>
                  
                </select>
              </div>
              )} 

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  National ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="national_id"
                  value={instructorData.national_id}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>
              {instructorData.course==='driving'&&(
                <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Instructor License Number
                </label>
                <input
                  type="text"
                  name="license_number"
                  value={instructorData.license_number}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              )}
              

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={instructorData.date_of_birth}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

               <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={instructorData.password}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                  minLength={6}
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
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nok_first_name"
                  value={instructorData.nok_first_name}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nok_last_name"
                  value={instructorData.nok_last_name}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="nok_email"
                  value={instructorData.nok_email}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="nok_phone"
                  value={instructorData.nok_phone}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              {/* Relationship */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Relationship <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nok_relationship"
                  value={instructorData.nok_relationship}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              {/* Occupation */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Occupation
                </label>
                <input
                  type="text"
                  name="nok_occupation"
                  value={instructorData.nok_occupation}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
            </div>
          </section>

          {/* ================= ACTION ================= */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Registering...' : 'Register Instructor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
