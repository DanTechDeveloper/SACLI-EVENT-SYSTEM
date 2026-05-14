import { useState, useEffect } from "react";
import apiRequest from "../../services/apiRequest";
export default function TableEvent({
  events,
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
              Category
            </th>
            <th className="px-6 py-3 text-xs font-black text-primary/70 dark:text-primary-light/70 uppercase tracking-widest" scope="col">
              Event Date
            </th>
            <th className="px-6 py-3 text-xs font-black text-primary/70 dark:text-primary-light/70 uppercase tracking-widest" scope="col">
              Start
            </th>
            <th className="px-6 py-3 text-xs font-black text-primary/70 dark:text-primary-light/70 uppercase tracking-widest" scope="col">
              End
            </th>
            <th className="px-6 py-3 text-xs font-black text-primary/70 dark:text-primary-light/70 uppercase tracking-widest" scope="col">
              Criteria
            </th>
            <th className="px-6 py-3 text-xs font-black text-primary/70 dark:text-primary-light/70 uppercase tracking-widest text-right" scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-violet-50 dark:divide-violet-900/20">
          {!events || events.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="px-6 py-12 text-center text-slate-500 dark:text-slate-400 italic"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            events.map((event, key) => (
              <tr
                key={key}
                className="hover:bg-violet-50/60 dark:hover:bg-violet-900/10 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-800 dark:text-slate-100">
                    {event.title}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                    {event.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                    {event.date}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    <span className="size-1.5 rounded-full bg-emerald-500"></span>
                    {event.time}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-2.5 py-1 text-xs font-bold text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
                    <span className="size-1.5 rounded-full bg-rose-500"></span>
                    {event.time_end}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                  {event.criteria}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => handleAction("edit", event.id)}
                      className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-full hover:bg-primary hover:text-white dark:hover:bg-primary text-primary dark:text-violet-300 transition-colors"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button
                      onClick={() => handleAction("delete", event.id)}
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
