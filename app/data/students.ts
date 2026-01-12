import { student } from "../types/student";

export const students: student[] = [
  {
    id: 'STD001',
    name: "Alice Mwangi",
    email: "alice.mwangi@example.com",
    slug: "alice-mwangi",
    instructor: "John Doe",
    pracs: [
      {
        title: "Driving",
        slug: "driving",
        features: [
          { title: "Introduction to Driving", date: "2024-07-10", status: "Completed", comment: "Excellent" },
      { title: "Vehicle Controls Overview", date: "2024-07-12", status: "Completed", comment: "Good" },
      { title: "Starting and Stopping", date: "2024-07-15", status: "Completed", comment: "Excellent" },
      { title: "Steering Techniques", date: "2024-07-18", status: "Completed", comment: "Good" },
      { title: "Basic Road Signs", date: "2024-07-20", status: "Completed", comment: "Fair" },
      { title: "Lane Discipline", date: "2024-07-22", status: "Completed", comment: "Good" },
      { title: "Turning and Cornering", date: "2024-07-25", status: "Completed", comment: "Excellent" },
      { title: "Parking Basics", date: "2024-07-28", status: "Completed", comment: "Good" },
      { title: "Reverse Driving", date: "2024-07-30", status: "Completed", comment: "Fair" },
      { title: "Traffic Rules Assessment", date: "2024-08-02", status: "Completed", comment: "Excellent" },
      // Pending
      { title: "Hill Start Technique", date: "N/A", status: "Pending", comment: "N/A" },
      { title: "Night Driving", date: "N/A", status: "Pending", comment: "N/A" },
      { title: "Highway Driving", date: "N/A", status: "Pending", comment: "N/A" },
      { title: "Emergency Braking", date: "N/A", status: "Pending", comment: "N/A" },
      { title: "Defensive Driving", date: "N/A", status: "Pending", comment: "N/A" },
      { title: "Roundabout Navigation", date: "N/A", status: "Pending", comment: "N/A" },
      { title: "Overtaking Safely", date: "N/A", status: "Pending", comment: "N/A" },
      { title: "Driving in Traffic", date: "N/A", status: "Pending", comment: "N/A" },
      { title: "Weather Condition Driving", date: "N/A", status: "Pending", comment: "N/A" },
      { title: "Fuel-Efficient Driving", date: "N/A", status: "Pending", comment: "N/A" },
      { title: "Basic Vehicle Maintenance", date: "N/A", status: "Pending", comment: "N/A" },
      { title: "Handling Breakdowns", date: "N/A", status: "Pending", comment: "N/A" },
      { title: "Driving Test Preparation", date: "N/A", status: "Pending", comment: "N/A" },
      { title: "Mock Driving Test", date: "N/A", status: "Pending", comment: "N/A" },
      { title: "Final Driving Evaluation", date: "N/A", status: "Pending", comment: "N/A" },
        ],
      },
    ],
  },
  {
    id: 'STD002',
    name: "Brian Ochieng",
    email: "brian.ochieng@example.com",
    slug: "brian-ochieng",
    instructor: "John Doe",
    pracs: [
      {
        title: "Driving",
        slug: "driving",
        features: [
          { title: "Reverse Parking", date: "2026-01-03", status: "Completed", comment: "Good" },
          { title: "City Driving", date: "2026-01-06", status: "Completed", comment: "Fair" },
        ],
      },
    ],
  },
  {
    id: 'STD003',
    name: "Catherine Njeri",
    email: "catherine.njeri@example.com",
    slug: "catherine-njeri",
    instructor: "Mary Wanjiku",
    pracs: [
      {
        title: "Driving",
        slug: "driving",
        features: [
          { title: "Hill Start", date: "2026-01-04", status: "Pending", comment: "Excellent" },
          { title: "Roundabout", date: "2026-01-07", status: "Completed", comment: "Good" },
        ],
      },
    ],
  },
  {
    id: 'STD004',
    name: "David Kimani",
    email: "david.kimani@example.com",
    slug: "david-kimani",
    instructor: "Mary Wanjiku",
    pracs: [
      {
        title: "Driving",
        slug: "driving",
        features: [
          { title: "Parking Lot Maneuver", date: "2026-01-05", status: "Completed", comment: "Fair" },
          { title: "City Driving", date: "2026-01-08", status: "Completed", comment: "Good" },
        ],
      },
    ],
  },
  {
    id: 'STD005',
    name: "Esther Wambui",
    email: "esther.wambui@example.com",
    slug: "esther-wambui",
    instructor: "John Doe",
    pracs: [
      {
        title: "Driving",
        slug: "driving",
        features: [
          { title: "Parallel Parking", date: "2026-01-02", status: "Completed", comment: "Excellent" },
          { title: "Highway Driving", date: "2026-01-06", status: "Pending", comment: "Good" },
        ],
      },
    ],
  },
  {
    id: 'STD006',
    name: "Fredrick Otieno",
    email: "fredrick.otieno@example.com",
    slug: "fredrick-otieno",
    instructor: "Mary Wanjiku",
    pracs: [
      {
        title: "Driving",
        slug: "driving",
        features: [
          { title: "Reverse Parking", date: "2026-01-03", status: "Completed", comment: "Fair" },
          { title: "City Driving", date: "2026-01-07", status: "Completed", comment: "Excellent" },
        ],
      },
    ],
  },
  {
    id: 'STD007',
    name: "Grace Kamau",
    email: "grace.kamau@example.com",
    slug: "grace-kamau",
    instructor: "John Doe",
    pracs: [
      {
        title: "Driving",
        slug: "driving",
        features: [
          { title: "Hill Start", date: "2026-01-04", status: "Pending", comment: "Good" },
          { title: "Roundabout", date: "2026-01-08", status: "Completed", comment: "Fair" },
        ],
      },
    ],
  },
  {
    id: 'STD008',
    name: "Henry Mutua",
    email: "henry.mutua@example.com",
    slug: "henry-mutua",
    instructor: "Mary Wanjiku",
    pracs: [
      {
        title: "Driving",
        slug: "driving",
        features: [
          { title: "Parking Lot Maneuver", date: "2026-01-05", status: "Completed", comment: "Excellent" },
          { title: "City Driving", date: "2026-01-09", status: "Completed", comment: "Good" },
        ],
      },
    ],
  },
  {
    id: 'STD009',
    name: "Irene Achieng",
    email: "irene.achieng@example.com",
    slug: "irene-achieng",
    instructor: "John Doe",
    pracs: [
      {
        title: "Driving",
        slug: "driving",
        features: [
          { title: "Parallel Parking", date: "2026-01-02", status: "Completed", comment: "Good" },
          { title: "Highway Driving", date: "2026-01-06", status: "Pending", comment: "Fair" },
        ],
      },
    ],
  },
  {
    id:'STD010',
    name: "James Mwiti",
    email: "james.mwiti@example.com",
    slug: "james-mwiti",
    instructor: "Mary Wanjiku",
    pracs: [
      {
        title: "Driving",
        slug: "driving",
        features: [
          { title: "Reverse Parking", date: "2026-01-03", status: "Completed", comment: "Excellent" },
          { title: "City Driving", date: "2026-01-07", status: "Completed", comment: "Good" },
        ],
      },
    ],
  },
  // --- 10 more students for 20 total ---
  {
    id: 'STD011',
    name: "Joyce Njeri",
    email: "joyce.njeri@example.com",
    slug: "joyce-njeri",
    instructor: "John Doe",
    pracs: [
      {
        title: "Driving",
        slug: "driving",
        features: [
          { title: "Hill Start", date: "2026-01-04", status: "Pending", comment: "Fair" },
          { title: "Roundabout", date: "2026-01-08", status: "Completed", comment: "Good" },
        ],
      },
    ],
  },
  {
    id: 'STD012',
    name: "Kevin Otieno",
    email: "kevin.otieno@example.com",
    slug: "kevin-otieno",
    instructor: "Mary Wanjiku",
    pracs: [
      {
        title: "Driving",
        slug: "driving",
        features: [
          { title: "Parking Lot Maneuver", date: "2026-01-05", status: "Completed", comment: "Excellent" },
          { title: "City Driving", date: "2026-01-09", status: "Completed", comment: "Good" },
        ],
      },
    ],
  },
  {
    id: 'STD013',
    name: "Linda Wambui",
    email: "linda.wambui@example.com",
    slug: "linda-wambui",
    instructor: "John Doe",
    pracs: [
      {
        title: "Driving",
        slug: "driving",
        features: [
          { title: "Parallel Parking", date: "2026-01-02", status: "Completed", comment: "Excellent" },
          { title: "Highway Driving", date: "2026-01-06", status: "Pending", comment: "Fair" },
        ],
      },
    ],
  },
  {
    id: 'STD014',
    name: "Michael Kariuki",
    email: "michael.kariuki@example.com",
    slug: "michael-kariuki",
    instructor: "Mary Wanjiku",
    pracs: [
      {
        title: "Driving",
        slug: "driving",
        features: [
          { title: "Reverse Parking", date: "2026-01-03", status: "Completed", comment: "Good" },
          { title: "City Driving", date: "2026-01-07", status: "Completed", comment: "Excellent" },
        ],
      },
    ],
  },
  {
    id: 'STD015',
    name: "Nancy Mwende",
    email: "nancy.mwende@example.com",
    slug: "nancy-mwende",
    instructor: "John Doe",
    pracs: [
      {
        title: "Driving",
        slug: "driving",
        features: [
          { title: "Hill Start", date: "2026-01-04", status: "Pending", comment: "Good" },
          { title: "Roundabout", date: "2026-01-08", status: "Completed", comment: "Fair" },
        ],
      },
    ],
  },
  {
    id: 'STD0016',
    name: "Patrick Njoroge",
    email: "patrick.njoroge@example.com",
    slug: "patrick-njoroge",
    instructor: "Mary Wanjiku",
    pracs: [
      {
        title: "Driving",
        slug: "driving",
        features: [
          { title: "Parking Lot Maneuver", date: "2026-01-05", status: "Completed", comment: "Excellent" },
          { title: "City Driving", date: "2026-01-09", status: "Completed", comment: "Good" },
        ],
      },
    ],
  },
  {
    id: 'STD0017',
    name: "Rachel Achieng",
    email: "rachel.achieng@example.com",
    slug: "rachel-achieng",
    instructor: "John Doe",
    pracs: [
      {
        title: "Driving",
        slug: "driving",
        features: [
          { title: "Parallel Parking", date: "2026-01-02", status: "Completed", comment: "Good" },
          { title: "Highway Driving", date: "2026-01-06", status: "Pending", comment: "Fair" },
        ],
      },
    ],
  },
  {
    id: 'STD0018',
    name: "Samuel Kimani",
    email: "samuel.kimani@example.com",
    slug: "samuel-kimani",
    instructor: "Mary Wanjiku",
    pracs: [
      {
        title: "Driving",
        slug: "driving",
        features: [
          { title: "Reverse Parking", date: "2026-01-03", status: "Completed", comment: "Excellent" },
          { title: "City Driving", date: "2026-01-07", status: "Completed", comment: "Good" },
        ],
      },
    ],
  },
  {
    id: 'STD0019',
    name: "Theresa Wanjiku",
    email: "theresa.wanjiku@example.com",
    slug: "theresa-wanjiku",
    instructor: "John Doe",
    pracs: [
      {
        title: "Driving",
        slug: "driving",
        features: [
          { title: "Hill Start", date: "2026-01-04", status: "Pending", comment: "Fair" },
          { title: "Roundabout", date: "2026-01-08", status: "Completed", comment: "Good" },
        ],
      },
    ],
  },
  {
    id: 'STD0020',
    name: "Victor Otieno",
    email: "victor.otieno@example.com",
    slug: "victor-otieno",
    instructor: "Mary Wanjiku",
    pracs: [
      {
        title: "Driving",
        slug: "driving",
        features: [
          { title: "Parking Lot Maneuver", date: "2026-01-05", status: "Completed", comment: "Excellent" },
          { title: "City Driving", date: "2026-01-09", status: "Completed", comment: "Good" },
        ],
      },
    ],
  },
];
