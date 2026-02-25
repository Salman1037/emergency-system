export default function StatusCard({ complaint }) {
  return (
    <div
      className="border rounded-lg p-4 bg-white shadow flex flex-col justify-between w-full min-h-[220px] max-w-md mx-auto box-border"
      style={{
        minWidth: 0,
        maxWidth: '100%',
        overflow: 'hidden',
        wordBreak: 'break-word',
        height: '100%',
      }}
    >
      <div>
        <h3 className="font-bold text-base sm:text-lg mb-1 break-words">{complaint.title}</h3>
        <p className="text-gray-700 mb-1 break-words">{complaint.description}</p>
        <div className="flex flex-wrap gap-2 text-sm mb-1">
          <span className="font-semibold">Category:</span> <span className="mr-2">{complaint.category}</span>
          <span className="font-semibold">Priority:</span> <span className={complaint.priority === "HIGH" ? "text-red-600 font-bold" : "text-green-700 font-semibold"}>{complaint.priority}</span>
          <span className="font-semibold">Status:</span> <span>{complaint.status}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <div className="text-xs text-gray-500">{new Date(complaint.createdAt).toLocaleString()}</div>
        {complaint.image && (
          <div className="w-full flex justify-center">
            <img
              src={complaint.image}
              alt="evidence"
              className="mt-2 max-h-40 rounded object-contain w-full"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
