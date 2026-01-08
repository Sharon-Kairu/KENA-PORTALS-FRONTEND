// data/coursesUi.ts
import { FaCar, FaComputer, FaRobot } from "react-icons/fa6"

type ColorKey = "blue" | "green" | "orange"

export const coursesUi: {
  id: string
  color: ColorKey
  icon: React.ElementType
  buttonText: string
  description: string
}[] = [
  {
    id: "driving",
    color: "blue",
    icon: FaCar,
    buttonText: "View Course Content",
    description: "Includes MTB, road safety, and general driving knowledge for safe and professional driving skills.",
  },
  {
    id: "computer",
    color: "green",
    icon: FaComputer,
    buttonText: "View Course Content",
    description: "Covers essential computer packages and software skills to become confident with computers.",
  },
  {
    id: "ai",
    color: "orange",
    icon: FaRobot,
    buttonText: "View Course Content",
    description: "Focuses on AI packages and practical applications to understand modern artificial intelligence.",
  },
]
