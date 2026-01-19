import { courseContent } from "../types/content";

export const courseContentData: courseContent[] = [
  {
    category: "Driving",
    contents: [
      { title: "Introduction to Driving", date: "2025-01-05", type: "video" },
      { title: "Road Safety Rules", date: "2025-01-07", type: "pdf" },
      { title: "Defensive Driving Techniques", date: "2025-01-10", type: "mp4" },
      { title: "Practical Vehicle Handling", date: "2025-01-12", type: "video" },
      { title: "Traffic Signs and Symbols", date: "2025-01-15", type: "pdf" },
    ],
  },
  {
    category: "AI",
    contents: [
      { title: "Introduction to AI", date: "2025-01-03", type: "video" },
      { title: "Machine Learning Basics", date: "2025-01-06", type: "pdf" },
      { title: "Prompt Engineering", date: "2025-01-09", type: "mp4" },
      { title: "Neural Networks Overview", date: "2025-01-11", type: "video" },
      { title: "AI Ethics and Safety", date: "2025-01-14", type: "pdf" },
    ],
  },
  {
    category: "Computer",
    contents: [
      { title: "Computer Basics", date: "2025-01-02", type: "video" },
      { title: "Operating Systems Overview", date: "2025-01-04", type: "pdf" },
      { title: "Introduction to Programming", date: "2025-01-08", type: "mp4" },
      { title: "Databases Fundamentals", date: "2025-01-10", type: "video" },
      { title: "Networking Essentials", date: "2025-01-13", type: "pdf" },
    ],
  },
]