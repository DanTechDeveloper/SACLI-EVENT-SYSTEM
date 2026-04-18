import apiRequest from "../../services/apiRequest";
import { useState, useEffect } from "react";
import ApprovalModel from "../../components/Dashboard/ApprovalModel";

export default function DashContent() {
  const [data, setData] = useState(null);
  const [toggleModal, setToggleModal] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const url = `http://localhost/IPTFINALPROJECT/eventSystem/src/backend/dashboard.php`;
      const response = await apiRequest(url);
      if (response.success) {
        setData(response.data);
      } else {
        console.error(`Error fetching data: ${response.error}`);
      }
    }
    fetchData();
  }, []);

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
                Approval Events
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
                  {data?.readEvent?.map((value, key) => (
                    <tr key={key} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
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
                        <button
                          type="button"
                          onClick={() => setToggleModal(true)}
                          className="text-sm font-bold text-primary dark:text-white hover:underline">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          {/* <!-- Recent Announcements Section --> */}
          <section className="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h4 className="text-lg font-bold text-primary dark:text-white">
                Approval Announcements
              </h4>
              <button className="text-sm font-semibold text-primary/60 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors">
                Manage Announcements
              </button>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {data?.readAnnouncement?.map((values, key) => (
                <div
                  key={key}
                  className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-100 dark:bg-slate-800 h-10 w-10 flex items-center justify-center rounded-lg">
                      <span className="material-symbols-outlined text-primary dark:text-white text-[20px]">
                        info
                      </span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-slate-900 dark:text-slate-100">
                        {values.title}
                      </h5>
                      <p className="text-xs text-slate-500 mt-1">
                        {values.date_posted}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                      {values.category}
                    </span>
                    <button className="p-2 text-slate-400 hover:text-primary dark:hover:text-white transition-colors">
                      <span className="material-symbols-outlined">
                        chevron_right
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        {toggleModal && <ApprovalModel toggleModal={() => setToggleModal(false)} />}
      </div>
    </>
  );
}
