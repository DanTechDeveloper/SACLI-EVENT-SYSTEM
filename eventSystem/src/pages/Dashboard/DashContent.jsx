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
    const url = `http://localhost/IPTFINALPROJECT/eventSystem/src/backend/Dashboard/DashContent.php?id=${eventID}&status=${eventStatus}`;
    const response = await apiRequest(url);
    if (response.success) {
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
    const url = `http://localhost/IPTFINALPROJECT/eventSystem/src/backend/Dashboard/DashContent.php?id=${announcementID}&status=${announcementStatus}`;
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
            <p className="text-[#212529] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              Admin Dashboard
            </p>
            <p className="text-[#6C757D] dark:text-slate-400 text-base font-normal leading-normal">
              Welcome, Admin! Here's a summary of school activities.
            </p>
          </div>
        </div>
        {/* <!-- Stats --> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
            <p className="text-[#6C757D] dark:text-slate-400 text-base font-medium leading-normal">
              Total Posts
            </p>
            <p className="text-[#212529] dark:text-white tracking-light text-3xl font-bold leading-tight">
              {data?.totalPosts}
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
            <p className="text-[#6C757D] dark:text-slate-400 text-base font-medium leading-normal">
              Total Announcements
            </p>
            <p className="text-[#212529] dark:text-white tracking-light text-3xl font-bold leading-tight">
              {data?.totalAnnouncement}
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
            <p className="text-[#6C757D] dark:text-slate-400 text-base font-medium leading-normal">
              Total Events
            </p>
            <p className="text-[#212529] dark:text-white tracking-light text-3xl font-bold leading-tight">
              {data?.totalEvents}
            </p>
          </div>
        </div>
        {/* <!-- Recent Events Section --> */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h4 className="text-lg font-bold text-primary dark:text-white">
                Pending Events
              </h4>
              <button className="text-sm font-semibold text-primary/60 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors">
                View All Events
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Event Name
                    </th>
                    <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Category
                    </th>
                    <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Author
                    </th>
                    <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">
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
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
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
                            {value.author}
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
          <section className="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h4 className="text-lg font-bold text-primary dark:text-white">
                Pending Announcements
              </h4>
              <button className="text-sm font-semibold text-primary/60 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors">
                Manage Announcements
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Title
                    </th>
                    <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Category
                    </th>
                    <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Author
                    </th>
                    <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">
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
