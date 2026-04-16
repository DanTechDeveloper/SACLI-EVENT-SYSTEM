import apiRequest from "../../services/apiRequest";
import { useState, useEffect } from "react";

export default function DashContent() {
  const [data, setData] = useState(null);
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
      <div class="flex flex-col gap-8">
        <div class="flex flex-wrap justify-between items-center gap-3">
          <div class="flex flex-col gap-1">
            <p class="text-[#212529] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              Admin Dashboard
            </p>
            <p class="text-[#6C757D] dark:text-slate-400 text-base font-normal leading-normal">
              Welcome, Admin! Here's a summary of school activities.
            </p>
          </div>
        </div>
        {/* <!-- Stats --> */}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
            <p class="text-[#6C757D] dark:text-slate-400 text-base font-medium leading-normal">
              Total Posts
            </p>
            <p class="text-[#212529] dark:text-white tracking-light text-3xl font-bold leading-tight">
              {data?.totalPosts}
            </p>
          </div>
          <div class="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
            <p class="text-[#6C757D] dark:text-slate-400 text-base font-medium leading-normal">
              Total Announcements
            </p>
            <p class="text-[#212529] dark:text-white tracking-light text-3xl font-bold leading-tight">
              {data?.totalAnnouncement}
            </p>
          </div>
          <div class="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
            <p class="text-[#6C757D] dark:text-slate-400 text-base font-medium leading-normal">
              Total Events
            </p>
            <p class="text-[#212529] dark:text-white tracking-light text-3xl font-bold leading-tight">
              {data?.totalEvents}
            </p>
          </div>
        </div>
        {/* <!-- Recent Events Section --> */}
        <div class="lg:col-span-2 space-y-8">
          <section class="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h4 class="text-lg font-bold text-primary dark:text-white">
                Recent Events
              </h4>
              <button class="text-sm font-semibold text-primary/60 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors">
                View All Events
              </button>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead class="bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <th class="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Event Name
                    </th>
                    <th class="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Category
                    </th>
                    <th class="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                  {data?.readEvent?.map((value, key) => (
                    <tr key={key} class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td class="px-6 py-4">
                        <div class="font-medium text-slate-900 dark:text-slate-100">
                          {value.title}
                        </div>
                        <div class="text-xs text-slate-400">
                          {`${value.date} • ${value.time} • ${value.location}`}
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                          {value.category}
                        </span>
                      </td>
                      <td class="px-6 py-4 text-right">
                        <button class="text-sm font-bold text-primary dark:text-white hover:underline">
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
          <section class="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h4 class="text-lg font-bold text-primary dark:text-white">
                Recent Announcements
              </h4>
              <button class="text-sm font-semibold text-primary/60 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors">
                Manage Announcements
              </button>
            </div>
            <div class="divide-y divide-slate-100 dark:divide-slate-800">
              {data?.readAnnouncement?.map((values, key) => (
                <div
                  key={key}
                  class="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors flex items-center justify-between"
                >
                  <div class="flex items-center gap-4">
                    <div class="bg-slate-100 dark:bg-slate-800 h-10 w-10 flex items-center justify-center rounded-lg">
                      <span class="material-symbols-outlined text-primary dark:text-white text-[20px]">
                        info
                      </span>
                    </div>
                    <div>
                      <h5 class="font-semibold text-slate-900 dark:text-slate-100">
                        {values.title}
                      </h5>
                      <p class="text-xs text-slate-500 mt-1">
                        {values.date_posted}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-4">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                      {values.category}
                    </span>
                    <button class="p-2 text-slate-400 hover:text-primary dark:hover:text-white transition-colors">
                      <span class="material-symbols-outlined">
                        chevron_right
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
