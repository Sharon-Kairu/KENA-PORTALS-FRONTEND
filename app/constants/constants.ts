// src/constants/constants.ts
import {
  FiHome,
  FiBookOpen,
  FiCreditCard,
  FiUser,
  FiSettings,
} from 'react-icons/fi'

export const studentPages = [
  {
    name: 'Dashboard',
    href: '/student/dashboard',
    icon: FiHome,
  },
  {
    name: 'My Courses',
    href: '/student/courses',
    icon: FiBookOpen,
  },
  {
    name: 'Payments',
    href: '/student/payments',
    icon: FiCreditCard,
  },
  {
    name: 'Content',
    href: '/student/content',
    icon: FiCreditCard,
  },
  {
    name: 'Profile',
    href: '/student/profile',
    icon: FiUser,
  },
  {
    name: 'Settings',
    href: '/student/settings',
    icon: FiSettings,
  },
]
