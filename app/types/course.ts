// types/course.ts
export type Lesson = {
  title: string
  content: string
}

export type Module = {
  title: string
  lessons: Lesson[]
}

export type Course = {
  id: string
  slug: string
  title: string
  category: "driving" | "computer" | "ai"
  description: string
  modules: Module[]
}
