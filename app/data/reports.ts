export type monthlyComment = {
  month: string
  comment: "Excellent" | "Good" | "Fair"
}

export type yearComments = {
  year: number
  data: monthlyComment[]
}

export type commentDistribution = yearComments[]

export const commentsData: commentDistribution = [
  {
    year: 2025,
    data: [
      { month: "January", comment: "Excellent" },
      { month: "February", comment: "Good" },
      { month: "March", comment: "Excellent" },
      { month: "April", comment: "Fair" },
      { month: "May", comment: "Good" },
      { month: "June", comment: "Excellent" },
      { month: "July", comment: "Good" },
      { month: "August", comment: "Excellent" },
      { month: "September", comment: "Fair" },
      { month: "October", comment: "Good" },
      { month: "November", comment: "Excellent" },
      { month: "December", comment: "Good" },
    ],
  },
  {
    year: 2026,
    data: [
      { month: "January", comment: "Good" },
      { month: "February", comment: "Excellent" },
      { month: "March", comment: "Fair" },
      { month: "April", comment: "Good" },
      { month: "May", comment: "Excellent" },
      { month: "June", comment: "Fair" },
      { month: "July", comment: "Good" },
      { month: "August", comment: "Excellent" },
      { month: "September", comment: "Good" },
      { month: "October", comment: "Fair" },
      { month: "November", comment: "Excellent" },
      { month: "December", comment: "Good" },
    ],
  },
]