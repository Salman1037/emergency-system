export default function StatusCard({ complaint }) {
  return (
    <div className="border rounded p-4 mb-4 bg-white shadow">
      <h3 className="font-bold text-lg mb-1">{complaint.title}</h3>
      <p className="text-gray-700 mb-1">{complaint.description}</p>
      <div className="flex gap-4 text-sm mb-1">
        <span className="font-semibold">Category:</span> {complaint.category}
        <span className="font-semibold">Priority:</span> <span className={complaint.priority === "HIGH" ? "text-red-600 font-bold" : "text-green-700"}>{complaint.priority}</span>
        <span className="font-semibold">Status:</span> {complaint.status}
      </div>
      <div className="text-xs text-gray-500">{new Date(complaint.createdAt).toLocaleString()}</div>
      {complaint.image && <img src={complaint.image} alt="evidence" className="mt-2 max-h-40 rounded" />}
    </div>
  );
}
