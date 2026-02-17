'use client'

import { useEffect } from 'react'
import { FiCheckCircle, FiXCircle, FiAlertCircle, FiX } from 'react-icons/fi'

export type ToastType = 'success' | 'error' | 'warning'

interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
  duration?: number
}

const Toast = ({ message, type, onClose, duration = 5000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const bgColor = {
    success: 'bg-green-50 border-green-500',
    error: 'bg-red-50 border-red-500',
    warning: 'bg-orange-50 border-orange-500',
  }[type]

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-orange-800',
  }[type]

  const Icon = {
    success: FiCheckCircle,
    error: FiXCircle,
    warning: FiAlertCircle,
  }[type]

  const iconColorHex = {
    success: '#16A34A',
    error: '#DC2626',
    warning: '#EA580C',
  }[type]

  return (
    <div className="fixed top-4 right-4 z-[9999] animate-slideIn">
      <div
        className={`flex items-center gap-3 min-w-[320px] max-w-md p-4 rounded-lg border-l-4 shadow-lg ${bgColor}`}
      >
        <Icon size={24} color={iconColorHex} />
        <p className={`flex-1 font-medium ${textColor}`}>{message}</p>
        <button
          onClick={onClose}
          className={`hover:opacity-70 transition-opacity ${textColor}`}
        >
          <FiX size={20} />
        </button>
      </div>
    </div>
  )
}

export default Toast
