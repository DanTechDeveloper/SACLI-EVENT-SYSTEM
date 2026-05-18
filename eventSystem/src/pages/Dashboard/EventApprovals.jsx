import apiRequest from "../../services/apiRequest";
import { useState, useEffect } from "react"

export default function EventApprovals() {
  const [data, setData] = useState([])

  const handleApprovals = () => {
    const URL = "http://localhost/IPTFINALPROJECT/eventSystem/src/backend/Dashboard/EventApprovals.php";
    
    const response = apiRequest(URL, "GET");

    if(response.success){
      setData(response.data)
    }
  }

  useEffect(() => {
    handleApprovals();
  }, [])

  useEffect(() => {
    console.table(data);
  }, [data])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            Event Approvals
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal">
            Welcome, Admin! Here's a summary of school activities.
          </p>
        </div>
      </div>
      {/* <!-- Stats --> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Posts */}
        <div className="card-hover relative overflow-hidden flex flex-col gap-3 rounded-2xl p-6 bg-grad-primary shadow-glow-primary text-white">
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
              Total Approved
            </p>
            <span className="stat-icon material-symbols-outlined text-3xl text-white/80">
              event
            </span>
          </div>
          <p className="text-5xl font-black tracking-tight leading-none">
        {/* {data?.totalPostsApproval ?? "—"} */}
          </p>
          <p className="text-xs text-white/60 font-medium">
            Approved events only
          </p>
        </div>

        {/* Total Announcements */}
        <div className="card-hover relative overflow-hidden flex flex-col gap-3 rounded-2xl p-6 bg-grad-secondary shadow-glow-secondary text-white">
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
              Total Pending
            </p>
            <span
              className="stat-icon material-symbols-outlined text-3xl text-white/80"
              style={{ animationDelay: "0.6s" }}
            >
              campaign
            </span>
          </div>
          <p className="text-5xl font-black tracking-tight leading-none">
            {/* {data?.totalAnnouncement ?? "—"} */}
          </p>
          <p className="text-xs text-white/60 font-medium">
            Pending events only
          </p>
        </div>

        {/* Total Events */}
        <div className="card-hover relative overflow-hidden flex flex-col gap-3 rounded-2xl p-6 bg-grad-accent shadow-glow-accent text-white">
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
              Total Draft
            </p>
            <span
              className="stat-icon material-symbols-outlined text-3xl text-white/80"
              style={{ animationDelay: "1.2s" }}
            >
              event_available
            </span>
          </div>
          <p className="text-5xl font-black tracking-tight leading-none">
            {/* {data?.totalEvents ?? "—"} */}
          </p>
          <p className="text-xs text-white/60 font-medium">
            Draft events only
          </p>
        </div>
      </div>

      {/* <!-- Recent Events Section --> */}
      <div className="lg:col-span-2 space-y-8">
        <section className="bg-white dark:bg-surface-dark rounded-2xl border border-violet-100 dark:border-violet-900/40 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-violet-100 dark:border-violet-900/40 bg-violet-50/50 dark:bg-violet-900/10 flex items-center justify-between">
            <h4 className="text-sm font-black text-primary dark:text-primary-light uppercase tracking-widest">
              Pending Events
            </h4>
            <button className="text-xs font-bold text-primary/60 hover:text-primary dark:text-primary-light/60 dark:hover:text-primary-light transition-colors uppercase tracking-wider">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-violet-50 dark:bg-violet-900/20 border-b border-violet-100 dark:border-violet-900/40">
                <tr>
                  <th className="px-6 py-3 text-xs font-black text-primary/70 dark:text-primary-light/70 uppercase tracking-widest">
                    Event Name
                  </th>
                  <th className="px-6 py-3 text-xs font-black text-primary/70 dark:text-primary-light/70 uppercase tracking-widest">
                    Category
                  </th>
                  <th className="px-6 py-3 text-xs font-black text-primary/70 dark:text-primary-light/70 uppercase tracking-widest">
                    Author
                  </th>
                  <th className="px-6 py-3 text-xs font-black text-primary/70 dark:text-primary-light/70 uppercase tracking-widest text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                {/* {data?.readEvent?.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-slate-500 dark:text-slate-400"
                    >
                      No pending events found
                    </td>
                  </tr>
                ) : (
                  data?.readEvent?.map((value, key) => (
                    <tr
                      key={key}
                      className="hover:bg-violet-50/60 dark:hover:bg-violet-900/10 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          {value.title}
                        </div>
                        <div className="text-xs text-slate-400">
                          {`${value.date} • ${value.time} • ${value.location}`}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                          {value.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                          {value.event_author}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-3 justify-end">
                          <button
                            type="button"
                            onClick={() =>
                              handleApproveEvent(value.id, "approved")
                            }
                            className="text-sm font-bold text-primary dark:text-white hover:underline"
                          >
                            <span class="material-symbols-outlined">check</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleApproveEvent(value.id, "rejected")
                            }
                            className="text-sm font-bold text-red-500 dark:text-red-400 hover:underline"
                          >
                            <span class="material-symbols-outlined">close</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )} */}
              </tbody>
            </table>
          </div>
        </section>
      
      </div>
    </div>
  );
}
