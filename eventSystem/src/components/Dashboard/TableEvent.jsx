import { useState, useEffect } from "react";
import apiRequest from "../../services/apiRequest";
export default function TableEvent({events, emptyMessage, handleAction,}) {
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
                Category
              </th>
              <th
                className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest"
                scope="col"
              >
                Event Date
              </th>
              <th
                className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest"
                scope="col"
              >
                Event Time
              </th>
              <th
                className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest"
                scope="col"
              >
                Criteria
              </th>
              <th
                className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest text-right"
                scope="col"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {!events || events.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-slate-500 dark:text-slate-400 italic"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              events.map((event, key) => (
                <tr
                  key={key}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {event.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {event.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      {event.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                      <span className="size-1.5 rounded-full bg-green-600"></span>
                      {event.time}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {event.criteria}
                  </td>
                  <td className="px-6 py-4 text-right">
                   <div className="flex gap-2 justify-end">
                    <button onClick={() => handleAction("edit", event.id)} className="p-2 bg-blue-200 rounded-full hover:bg-blue-300 hover:text-white transition-colors">
                      <span className="material-symbols-outlined">
                        edit
                      </span>
                    </button>
                    <button onClick={() => handleAction("delete", event.id)} className="p-2 bg-red-200 rounded-full hover:bg-red-300 hover:text-white transition-colors">
                      <span className="material-symbols-outlined">
                        delete
                      </span>
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
  };

