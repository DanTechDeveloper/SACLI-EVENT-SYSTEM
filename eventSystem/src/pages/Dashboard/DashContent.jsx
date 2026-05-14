import apiRequest from "../../services/apiRequest";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function DashContent() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const fetchDashboardData = async () => {
    const url = `http://localhost/IPTFINALPROJECT/eventSystem/src/backend/Dashboard/DashContent.php`;
    const response = await apiRequest(url);
    if (response.success) {
      setData(response.data);
    } else {
      console.error(`Error fetching data: ${response.error}`);
    }
  };
  
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleApproveEvent = async (eventID, eventStatus) => {
    if (eventStatus === "approved") {
      const approvedPrompt = confirm(
        "Are you sure you want to approve this event?",
      );
      if (!approvedPrompt) {
        return;
      }
      eventStatus = "approved";
    } else {
      const rejectedPrompt = confirm(
        "Are you sure you want to reject this event?",
      );
      if (!rejectedPrompt) {
        return;
      }
      eventStatus = "rejected";
    }
    const url = `http://localhost/IPTFINALPROJECT/eventSystem/src/backend/Dashboard/DashContent.php?eventID=${eventID}&eventStatus=${eventStatus}`;
    const response = await apiRequest(url);
    if (response.success) {
      await fetchDashboardData();
      alert("Event status updated successfully!");
      navigate("/events");
    } else {
      console.error(`Error updating event: ${response.error}`);
    }
  };

  const handleApprovalAnnouncement = async (announcementID, announcementStatus) => {
    if (announcementStatus === "approved") {
      const approvedPrompt = confirm(
        "Are you sure you want to approve this announcement?",
      );  
      if (!approvedPrompt) {
        return;
      }
      announcementStatus = "approved";
    } else {
      const rejectedPrompt = confirm(
        "Are you sure you want to reject this announcement?",
      );
      if (!rejectedPrompt) {
        return;
      }
      announcementStatus = "rejected";
    }
    const url = `http://localhost/IPTFINALPROJECT/eventSystem/src/backend/Dashboard/DashContent.php?announcementID=${announcementID}&announcementStatus=${announcementStatus}`;
    const response = await apiRequest(url);
    if (response.success) {
      await fetchDashboardData();
      alert("Announcement status updated successfully!");
      navigate("/announcements");
    } else {
      console.error(`Error updating announcement: ${response.error}`);
    }
  };


  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              Admin Dashboard
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
              <p className="text-sm font-semibold uppercase tracking-widest text-white/70">Total Posts</p>
              <span className="stat-icon material-symbols-outlined text-3xl text-white/80">feed</span>
            </div>
            <p className="text-5xl font-black tracking-tight leading-none">
              {data?.totalPosts ?? "—"}
            </p>
            <p className="text-xs text-white/60 font-medium">Approved events + announcements</p>
          </div>

          {/* Total Announcements */}
          <div className="card-hover relative overflow-hidden flex flex-col gap-3 rounded-2xl p-6 bg-grad-secondary shadow-glow-secondary text-white">
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-widest text-white/70">Total Announcements</p>
              <span className="stat-icon material-symbols-outlined text-3xl text-white/80" style={{animationDelay:'0.6s'}}>campaign</span>
            </div>
            <p className="text-5xl font-black tracking-tight leading-none">
              {data?.totalAnnouncement ?? "—"}
            </p>
            <p className="text-xs text-white/60 font-medium">Published & approved</p>
          </div>

          {/* Total Events */}
          <div className="card-hover relative overflow-hidden flex flex-col gap-3 rounded-2xl p-6 bg-grad-accent shadow-glow-accent text-white">
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-widest text-white/70">Total Events</p>
              <span className="stat-icon material-symbols-outlined text-3xl text-white/80" style={{animationDelay:'1.2s'}}>event_available</span>
            </div>
            <p className="text-5xl font-black tracking-tight leading-none">
              {data?.totalEvents ?? "—"}
            </p>
            <p className="text-xs text-white/60 font-medium">Approved events only</p>
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
                  {data?.readEvent?.length === 0 ? (
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
                              <span class="material-symbols-outlined">
                                check
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleApproveEvent(value.id, "rejected")
                              }
                              className="text-sm font-bold text-red-500 dark:text-red-400 hover:underline"
                            >
                              <span class="material-symbols-outlined">
                                close
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
          </section>
          {/* <!-- Recent Announcements Section --> */}
          <section className="bg-white dark:bg-surface-dark rounded-2xl border border-violet-100 dark:border-violet-900/40 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-violet-100 dark:border-violet-900/40 bg-violet-50/50 dark:bg-violet-900/10 flex items-center justify-between">
              <h4 className="text-sm font-black text-primary dark:text-primary-light uppercase tracking-widest">
                Pending Announcements
              </h4>
              <button className="text-xs font-bold text-primary/60 hover:text-primary dark:text-primary-light/60 dark:hover:text-primary-light transition-colors uppercase tracking-wider">
                Manage
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-violet-50 dark:bg-violet-900/20 border-b border-violet-100 dark:border-violet-900/40">
                  <tr>
                    <th className="px-6 py-3 text-xs font-black text-primary/70 dark:text-primary-light/70 uppercase tracking-widest">
                      Title
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
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {data?.readAnnouncement?.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-4 text-center text-slate-500 dark:text-slate-400"
                      >
                        No pending announcements found
                      </td>
                    </tr>
                  ) : (
                    data?.readAnnouncement?.map((values, key) => (
                      <tr
                        key={key}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-900 dark:text-slate-100">
                            {values.title}
                          </div>
                          <div className="text-xs text-slate-400 mt-1">
                            {values.date_posted}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            {values.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {values.author}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              className="p-2 text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
                              onClick={() =>
                                handleApprovalAnnouncement(
                                  values.id,
                                  "approved",
                                )
                              }
                            >
                              <span className="material-symbols-outlined">
                                check
                              </span>
                            </button>
                            <button
                              className="p-2 text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
                              onClick={() =>
                                handleApprovalAnnouncement(
                                  values.id,
                                  "rejected",
                                )
                              }
                            >
                              <span className="material-symbols-outlined">
                                close
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
          </section>
        </div>
      </div>
    </>
  );
}
