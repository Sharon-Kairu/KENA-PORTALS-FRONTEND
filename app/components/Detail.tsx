const Detail = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-800">{value}</span>
  </div>
)
export default Detail