export default function TableAnnouncement({
  announcements,
  emptyMessage,
  handleAction,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-violet-50 dark:bg-violet-900/20 border-b border-violet-100 dark:border-violet-900/40">
            <th className="px-6 py-3 text-xs font-black text-primary/70 dark:text-primary-light/70 uppercase tracking-widest" scope="col">
              Title
            </th>
            <th className="px-6 py-3 text-xs font-black text-primary/70 dark:text-primary-light/70 uppercase tracking-widest" scope="col">
              Description
            </th>
            <th className="px-6 py-3 text-xs font-black text-primary/70 dark:text-primary-light/70 uppercase tracking-widest" scope="col">
              Date Posted
            </th>
            <th className="px-6 py-3 text-xs font-black text-primary/70 dark:text-primary-light/70 uppercase tracking-widest" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-violet-50 dark:divide-violet-900/20">
          {!announcements || announcements.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-6 py-12 text-center text-slate-500 dark:text-slate-400 italic"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            announcements.map((announcement, key) => (
              <tr
                key={key}
                className="hover:bg-violet-50/60 dark:hover:bg-violet-900/10 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-800 dark:text-slate-100">
                    {announcement.title}
                  </div>
                </td>
                <td className="px-6 py-4 max-w-xs">
                  <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2 leading-relaxed">
                    {announcement.description}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-accent/10 text-accent dark:bg-accent/20 dark:text-cyan-300">
                    {announcement.date_posted}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAction("edit", announcement.id)}
                      className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-full hover:bg-primary hover:text-white dark:hover:bg-primary text-primary dark:text-violet-300 transition-colors"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button
                      onClick={() => handleAction("delete", announcement.id)}
                      className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-full hover:bg-secondary hover:text-white dark:hover:bg-secondary text-secondary dark:text-rose-300 transition-colors"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
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
