'use client'

import { useState, useEffect } from 'react'
import ModalWrapper from './ModalWrapper'
import { FiSearch, FiDollarSign } from 'react-icons/fi'
import apiService from '@/app/services/apiService'

interface RegisterPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

interface Student {
  student_id: string
  user: {
    first_name: string
    last_name: string
    email: string
  }
  total_fees: number
  payment_status: string
}

const AddPayment = ({ isOpen, onClose, onSuccess }: RegisterPaymentModalProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    amount: '',
    payment_method: 'mpesa',
    transaction_code: ''
  })

  // Fetch all students when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchStudents()
    }
  }, [isOpen])

  // Filter students based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredStudents([])
      setShowDropdown(false)
      return
    }

    const filtered = students.filter((student) => {
      const fullName = `${student.user.first_name} ${student.user.last_name}`.toLowerCase()
      const studentId = student.student_id.toLowerCase()
      const query = searchQuery.toLowerCase()
      return fullName.includes(query) || studentId.includes(query)
    })

    setFilteredStudents(filtered)
    setShowDropdown(filtered.length > 0)
  }, [searchQuery, students])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const data = await apiService.getWithToken('/students/all_students/')
      setStudents(data)
    } catch (err) {
      console.error('Failed to fetch students:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student)
    setSearchQuery(`${student.user.first_name} ${student.user.last_name}`)
    setShowDropdown(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedStudent) {
      alert('Please select a student')
      return
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert('Please enter a valid amount')
      return
    }

    try {
      setSubmitting(true)

      const paymentData = {
        student_id: selectedStudent.student_id,
        amount: parseFloat(formData.amount),
        payment_method: formData.payment_method,
        transaction_code: formData.transaction_code || null
      }

      await apiService.postWithToken('/payments/register/', paymentData)

      alert('Payment registered successfully!')
      
      // Reset form
      setSelectedStudent(null)
      setSearchQuery('')
      setFormData({
        amount: '',
        payment_method: 'mpesa',
        transaction_code: ''
      })

      if (onSuccess) {
        onSuccess()
      }
      
      onClose()
    } catch (err: any) {
      console.error('Failed to register payment:', err)
      alert('Failed to register payment: ' + (err.message || 'Unknown error'))
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setSelectedStudent(null)
    setSearchQuery('')
    setFormData({
      amount: '',
      payment_method: 'mpesa',
      transaction_code: ''
    })
    onClose()
  }

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose} title="Register New Payment">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Student Search */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Student
          </label>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setShowDropdown(true)}
              placeholder="Search by name or student ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          {/* Dropdown */}
          {showDropdown && filteredStudents.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredStudents.map((student) => (
                <button
                  key={student.student_id}
                  type="button"
                  onClick={() => handleSelectStudent(student)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                >
                  <p className="font-medium text-gray-800">
                    {student.user.first_name} {student.user.last_name}
                  </p>
                  <p className="text-xs text-gray-500">{student.student_id}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected Student Info */}
        {selectedStudent && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">Selected Student:</p>
            <p className="font-semibold text-gray-800">
              {selectedStudent.user.first_name} {selectedStudent.user.last_name}
            </p>
            <p className="text-xs text-gray-500">{selectedStudent.student_id}</p>
            <p className="text-sm text-gray-600 mt-2">
              Total Fees: <span className="font-semibold">KSh {selectedStudent.total_fees?.toLocaleString() || 'N/A'}</span>
            </p>
          </div>
        )}

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (KSh) *
          </label>
          <div className="relative">
            <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              placeholder="Enter amount"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Method *
          </label>
          <select
            value={formData.payment_method}
            onChange={(e) => handleInputChange('payment_method', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="mpesa">M-Pesa</option>
            <option value="cash">Cash</option>
            <option value="bank">Bank Transfer</option>
          </select>
        </div>

        {/* Transaction Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transaction Code {formData.payment_method !== 'cash' && '(Optional)'}
          </label>
          <input
            type="text"
            value={formData.transaction_code}
            onChange={(e) => handleInputChange('transaction_code', e.target.value)}
            placeholder={
              formData.payment_method === 'mpesa' 
                ? 'e.g., QA12BC34DE' 
                : formData.payment_method === 'bank'
                ? 'Bank reference number'
                : 'Leave blank for cash'
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting || !selectedStudent}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Registering...' : 'Register Payment'}
          </button>
        </div>
      </form>
    </ModalWrapper>
  )
}

export default AddPayment 