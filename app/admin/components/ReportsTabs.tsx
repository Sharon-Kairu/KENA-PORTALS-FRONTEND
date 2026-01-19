type Props = {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const tabs = [
  { key: 'students', label: 'Students' },
  { key: 'payments', label: 'Payments' },
  { key: 'packages', label: 'Packages' },
  { key: 'performance', label: 'Performance' },
]

export default function ReportTabs({ activeTab, setActiveTab }: Props) {
  return (
    <div className="flex gap-6 border-b">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`pb-2 text-sm font-medium ${
            activeTab === tab.key
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-400'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
