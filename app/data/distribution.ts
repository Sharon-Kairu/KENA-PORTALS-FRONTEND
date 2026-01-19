export type MonthlyDistribution = {
  month: string;
  students: number;
};

export type Year = {
  year: number;
  data: MonthlyDistribution[];
};

export const studentDistribution: Year[] = [
  {
    year: 2025,
    data: [
      { month: "January", students: 135 },
      { month: "February", students: 113 },
      { month: "March", students: 98 },
      { month: "April", students: 78 },
      { month: "May", students: 80 },
      { month: "June", students: 67 },
      { month: "July", students: 34 },
      { month: "August", students: 42 },
      { month: "September", students: 36 },
      { month: "October", students: 56 },
      { month: "November", students: 89 },
      { month: "December", students: 80 },
    ],
  },
  {
    year: 2026,
    data: [
      { month: "January", students: 125 },
      { month: "February", students: 0 },
      { month: "March", students: 0 },
      { month: "April", students: 0 },
      { month: "May", students: 0 },
      { month: "June", students: 0 },
      { month: "July", students: 0 },
      { month: "August", students: 0 },
      { month: "September", students: 0 },
      { month: "October", students: 0 },
      { month: "November", students: 0 },
      { month: "December", students: 0 },
    ],
  },
];

export type packages={
  type:string
  studentsr:number
}

export type monthPackages={
  month:string
  data:packages[]
}
export type getPackageDistribution=[
  year:number,
  data: monthPackages[]
]

export const packageDistribution2025: getPackageDistribution = [
  2025,
  [
    { month: "January", data: [{ type: "Standalone", studentsr: 45 }, { type: "Subscription", studentsr: 65 }] },
    { month: "February", data: [{ type: "Standalone", studentsr: 42 }, { type: "Subscription", studentsr: 60 }] },
    { month: "March", data: [{ type: "Standalone", studentsr: 48 }, { type: "Subscription", studentsr: 70 }] },
    { month: "April", data: [{ type: "Standalone", studentsr: 40 }, { type: "Subscription", studentsr: 62 }] },
    { month: "May", data: [{ type: "Standalone", studentsr: 46 }, { type: "Subscription", studentsr: 68 }] },
    { month: "June", data: [{ type: "Standalone", studentsr: 44 }, { type: "Subscription", studentsr: 65 }] },
    { month: "July", data: [{ type: "Standalone", studentsr: 43 }, { type: "Subscription", studentsr: 63 }] },
    { month: "August", data: [{ type: "Standalone", studentsr: 47 }, { type: "Subscription", studentsr: 67 }] },
    { month: "September", data: [{ type: "Standalone", studentsr: 45 }, { type: "Subscription", studentsr: 66 }] },
    { month: "October", data: [{ type: "Standalone", studentsr: 46 }, { type: "Subscription", studentsr: 68 }] },
    { month: "November", data: [{ type: "Standalone", studentsr: 40 }, { type: "Subscription", studentsr: 55 }] },
    { month: "December", data: [{ type: "Standalone", studentsr: 48 }, { type: "Subscription", studentsr: 70 }] },
  ],
]

export const subscriptionDistribution = [
  { name: 'Bronze', value: 109 },
  { name: 'Gold', value: 89 },
  { name: 'Platinum', value: 12 },
]
export const standaloneDistribution=[
  {name:'Computer',value:34},
  {name:'AI',value:21}
]