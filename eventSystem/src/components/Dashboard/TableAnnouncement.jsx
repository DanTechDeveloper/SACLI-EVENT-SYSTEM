export default function TableAnnouncement({
  announcements,
  emptyMessage,
  handleAction,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-slate-50 dark:bg-slate-800/50">
          <tr>
            <th
              className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest"
              scope="col"
            >
              Title
            </th>
            <th
              className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest"
              scope="col"
            >
              Description
            </th>
          
            <th
              className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest"
              scope="col"
            >
              Date Posted
            </th>
            <th
              className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest"
              scope="col"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {!announcements || announcements.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="px-6 py-12 text-center text-slate-500 dark:text-slate-400 italic"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            announcements.map((announcement, key) => (
              <tr
                key={key}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                    {announcement.title}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    {announcement.description}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    {announcement.date_posted}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAction("edit", announcement.id)}
                      className="p-2 bg-blue-200 rounded-full hover:bg-blue-300 hover:text-white transition-colors"
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button
                      onClick={() => handleAction("delete", announcement.id)}
                      className="p-2 bg-red-200 rounded-full hover:bg-red-300 hover:text-white transition-colors"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
