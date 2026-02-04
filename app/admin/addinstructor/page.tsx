'use client';
import React, { useState, useEffect } from 'react';
import apiService from '@/app/services/apiService';
import next from 'next';
import NewAdmin from '../components/NewAdmin';

const Page = () => {
   const [user, setUser] = useState<any>(null)
   
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

    const payload = {
      user: {
        password: instructorData.password,
        first_name: instructorData.first_name,
        last_name: instructorData.last_name,
        email: instructorData.email,
        phone_number: instructorData.phone_number,
        role: instructorData.role,
  
      },
      course: (instructorData.course), 
      category:(instructorData.category),
      national_id: instructorData.national_id,
      instructor_id: instructorData.instructor_id,
      date_of_birth: instructorData.date_of_birth,
      nok_first_name: instructorData.nok_first_name,
      nok_last_name: instructorData.nok_last_name,
      nok_email: instructorData.nok_email,
      nok_phone: instructorData.nok_phone,
      nok_relationship: instructorData.nok_relationship,
      nok_occupation: instructorData.nok_occupation,
    };

    try {
      const res = await apiService.postWithToken('/instructors/register/', payload);
      console.log('Instructor registered:', res);
      alert('Instructor registered successfully!');
    } catch (err:any) {
      console.error('Error:', err);
  
      if (err.response) {
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
      }
  };}
  

  return (
    <div className="ml-0 lg:ml-64">
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
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={instructorData.first_name}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={instructorData.last_name}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={instructorData.email}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  value={instructorData.phone_number}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Course
                </label>
                <select
                  name="course"
                  value={instructorData.course}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                ><option value={''}>Select Course</option>
                  <option value={'ai'}>AI</option>
                  <option value={'computer'}>Computer</option>
                  <option value={'driving'}>Driving</option>
                </select>
              </div>

              {instructorData.course==='driving' && (
                <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Category
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
                  National ID
                </label>
                <input
                  type="text"
                  name="national_id"
                  value={instructorData.national_id}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              {instructorData.course==='driving'&&(
                <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Instructor License Number
                </label>
                <input
                  type="text"
                  name="instructor_id"
                  value={instructorData.instructor_id}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              )}
              

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={instructorData.date_of_birth}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

               <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={instructorData.password}
                  onChange={handleInstructorChange}
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
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="nok_first_name"
                  value={instructorData.nok_first_name}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="nok_last_name"
                  value={instructorData.nok_last_name}
                  onChange={handleInstructorChange}
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
                  name="nok_email"
                  value={instructorData.nok_email}
                  onChange={handleInstructorChange}
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
                  name="nok_phone"
                  value={instructorData.nok_phone}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              {/* Relationship */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Relationship
                </label>
                <input
                  type="text"
                  name="nok_relationship"
                  value={instructorData.nok_relationship}
                  onChange={handleInstructorChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
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
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Register Instructor
            </button>
          </div>
        </form>

        <NewAdmin />
        
      </div>
    </div>
  );
};

export default Page;
