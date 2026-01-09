import { Course } from "../types/course"

export const courses: Course[] = [
  {
    id: "driving",
    slug: "driving",
    title: "Driving",
    category: "driving",
    description: "Learn safe and professional driving skills.",
    modules: [
      {
        title: "Basic Driving",
        lessons: [
          {
            title: "Introduction to Driving",
            content: "Driving basics...",
          },
          {
            title: "Road Signs",
            content: "Understanding road signs...",
          },
        ],
      },
    ],
  },

  {
    id: "computer",
    slug: "computer",
    title: "Computer",
    category: "computer",
    description: "Become confident with computers and software.",
    modules: [
      {
        title: "Computer Basics",
        lessons: [
          {
            title: "Introduction to Computers",
            content: "What is a computer?",
          },
          {
            title: "Using the Keyboard & Mouse",
            content: "Input devices...",
          },
        ],
      },
    ],
  },

  {
    id: "ai",
    slug: "ai",
    title: "Artificial Intelligence",
    category: "ai",
    description: "Introduction to modern AI concepts.",
    modules: [
      {
        title: "AI Foundations",
        lessons: [
          {
            title: "What is AI?",
            content: "Artificial Intelligence explained.",
          },
          {
            title: "AI in Daily Life",
            content: "Real-world examples...",
          },
        ],
      },
    ],
  },
]
