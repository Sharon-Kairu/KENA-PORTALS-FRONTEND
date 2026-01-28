import React, { useState } from 'react';
import apiService from '@/app/services/apiService';

const NewAdmin = () => {
  const [adminData, setAdminData] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    role: 'superadmin',
  });

  const handleAdminChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...adminData, role: 'superadmin' };

    try {
        const res = await apiService.postWithToken('/users/register/', payload);

        // Check if res is JSON
        if (res && typeof res === 'object') {
        console.log('Admin registered:', res);
        alert('Admin registered successfully!');
        setAdminData({
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            role: 'superadmin',
        });
        } else {
        console.error('Unexpected response:', res);
        alert('Failed to register admin. Check console for details.');
        }
    } catch (err: any) {
        console.error('Error registering admin:', err.message || err);
        alert('Failed to register admin. Check console for details.');
    }
    };

  return (
    <div className="p-4 md:p-6">
      <form
        className="bg-white rounded-2xl p-8 shadow border border-blue-200 space-y-8"
        onSubmit={handleAdminSubmit}
      >
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Admin Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-blue-600 mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={adminData.username}
                onChange={handleAdminChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-600 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={adminData.password}
                onChange={handleAdminChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-600 mb-1">First Name</label>
              <input
                type="text"
                name="first_name"
                value={adminData.first_name}
                onChange={handleAdminChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-600 mb-1">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={adminData.last_name}
                onChange={handleAdminChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={adminData.email}
                onChange={handleAdminChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-600 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone_number"
                value={adminData.phone_number}
                onChange={handleAdminChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Register Admin
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewAdmin;