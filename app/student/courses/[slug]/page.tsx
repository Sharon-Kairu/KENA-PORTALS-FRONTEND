import React from 'react'
import { notFound } from 'next/navigation'
import { getPracticals } from '@/app/lib/getPracticals'
import ComputerProgress from "../../components/ComputerProgress"
import DrivingProgress from "../../components/DrivingProgress"
import AIProgress from "../../components/AIProgress"
import { FaCar, FaComputer, FaRobot } from 'react-icons/fa6'

type PageProps = {
  params: {
    slug: string
  }
}

const page = ({ params }: PageProps) => {
  const practicals = getPracticals(params.slug)
  if (!practicals) {
    notFound()
  }

  let textColor = ""
  let icon: JSX.Element | null = null
  let bgColor = ""

  if (practicals.title === "Driving") {
    textColor = "text-blue-700"
    bgColor="bg-blue-100"
    icon = <FaCar size={22} className="text-blue-700" />
  } else if (practicals.title === "Computer") {
    textColor = "text-green-700"
    bgColor="bg-green-100"
    icon = <FaComputer size={22} className="text-green-700" />
  } else if (practicals.title === "AI") {
    textColor = "text-orange-700"
    bgColor="bg-orange-100"
    icon = <FaRobot size={22} className="text-orange-700" />
  }

  return (
    <div className="ml-25 md:ml-64 p-4 md:p-6 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border flex justify-between items-center gap-4">
        
        <h1 className={`text-3xl font-bold ${textColor}`}>
          {practicals.title}
        </h1>
        <div className={`p-3 rounded-full ${bgColor}`}>
          {icon}
        </div>
      </div>

      {/* Content */}
      {practicals.title === "Driving" && (
        <DrivingProgress practical={practicals} />
      )}
      {practicals.title === "Computer" && (
        <ComputerProgress practical={practicals} />
      )}
      {practicals.title==="AI" &&(
        <AIProgress practical={practicals} />
      )}
      
    </div>
  )
}

export default page
