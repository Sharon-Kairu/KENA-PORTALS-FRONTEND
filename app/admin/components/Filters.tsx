type Props = {
  year: number
  setYear: (year: number) => void
}

export default function Filters({ year, setYear }: Props) {
  return (
    <div className="flex gap-4 items-center">
      <select
        value={year}
        onChange={e => setYear(Number(e.target.value))}
        className="border rounded px-3 py-2"
      >
        <option value={2023}>2023</option>
        <option value={2024}>2024</option>
        <option value={2025}>2025</option>
      </select>
    </div>
  )
}
