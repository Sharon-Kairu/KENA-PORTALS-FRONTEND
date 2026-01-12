// src/constants/constants.ts
import {
  FiHome,
  FiBookOpen,
  FiCreditCard,
  FiUser,
  FiPenTool
  
} from 'react-icons/fi'
import { FaUsers, FaSquareCheck} from 'react-icons/fa6'

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
    name: 'Content',
    href: '/student/content',
    icon: FiPenTool,
  },
  {
    name: 'Payments',
    href: '/student/payments',
    icon: FiCreditCard,
  },
  
  {
    name: 'Profile',
    href: '/student/profile',
    icon: FiUser,
  },
 
]

export const instructorPages = [
  {
    name: 'Dashboard',
    href: '/instructor/dashboard',
    icon: FiHome,
  },
  
  {
    name: 'All Students',
    href: '/instructor/students',
    icon: FaUsers,
  },
  {
    name: 'Gradebook',
    href: '/instructor/gradebook',
    icon: FaSquareCheck,
  },

  {
    name: 'Profile',
    href: '/instructor/profile',
    icon: FiUser,
  },
]