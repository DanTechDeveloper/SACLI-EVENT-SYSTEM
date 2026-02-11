import apiRequest from "../../services/apiRequest";
import { useState, useEffect } from "react";


export default function DashContent() {
  const [selectedSort, setSelectedSort] = useState({
    type: "Announcement",
    sort: "ASC",
  });
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData({ type, sort }) {
      const url = `http://localhost/IPTFINALPROJECT/eventSystem/src/backend/dashboard.php?type=${type}&sort=${sort}`;
      const response = await apiRequest(url);

      if (response.success) {
        setData(response.data);
      } else {
        console.error(`Error fetching data: ${response.error}`);
      }
    }
    fetchData(selectedSort);
  }, [selectedSort]);

  const typeOptions = [
    { value: "Announcement", label: "Announcements" },
    { value: "Event", label: "Events" },
  ];

  const sortOptions = [
    { value: "ASC", label: "Newest First" },
    { value: "DESC", label: "Oldest First" },
  ];
  const handleSort = (e) => {
    const { name, value } = e.target;

    setSelectedSort((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
              {data?.totalPosts}cccccc
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
        <div class="flex flex-col gap-4">
          {/* <!-- SectionHeader --> */}
          <h2 class="text-[#212529] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
            Recent Activity
          </h2>
          {/* <!-- ToolBar --> */}
          <div class="flex justify-between gap-4 py-2">
            <div className="flex gap-2">
              <select
                name="type"
                value={selectedSort.type}
                onChange={handleSort}
                className="rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-primary focus:border-primary"
              >
                {typeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <select
                name="sort"
                value={selectedSort.sort}
                onChange={handleSort}
                className="rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-primary focus:border-primary"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* <!-- Data Table --> */}
          <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
            <table class="w-full text-left text-sm">
              <thead class="bg-slate-50 text-xs uppercase text-[#6C757D] dark:bg-slate-800 dark:text-slate-400">
                <tr>
                  <th class="px-6 py-3 font-medium" scope="col">
                    Title
                  </th>
                  <th class="px-6 py-3 font-medium" scope="col">
                    Type
                  </th>
                  <th class="px-6 py-3 font-medium" scope="col">
                    Date
                  </th>
                  <th class="px-6 py-3 font-medium" scope="col">
                    {(selectedSort.type === "Announcement") ? "Category" : "Subtype"}
                  </th>
                  <th class="px-6 py-3 text-right font-medium" scope="col">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.allAnnouncements?.map((announcement) => (
                  <tr class="border-b dark:border-slate-800 text-[#212529] dark:text-white">
                    <td class="px-6 py-4 font-semibold">
                      {announcement.title}
                    </td>
                    <td class="px-6 py-4">
                      <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        {announcement.type}
                      </span>
                    </td>
                    <td class="px-6 py-4">{announcement.date}</td>
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                        <span class="size-1.5 rounded-full bg-green-600"></span>
                        {announcement.type}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <div class="flex items-center justify-end gap-2">
                        <button class="p-1.5 text-[#6C757D] dark:text-slate-400 hover:text-primary">
                          <span class="material-symbols-outlined">edit</span>
                        </button>
                        <button class="p-1.5 text-[#6C757D] dark:text-slate-400 hover:text-primary">
                          <span class="material-symbols-outlined">
                            visibility
                          </span>
                        </button>
                        <button class="p-1.5 text-[#6C757D] dark:text-slate-400 hover:text-red-500">
                          <span class="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <!-- Pagination -->
          <nav
            aria-label="Table navigation"
            class="flex items-center justify-between pt-4"
          >
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing{" "}
              <span class="font-semibold text-gray-900 dark:text-white">
                1-5
              </span>{" "}
              of{" "}
              <span class="font-semibold text-gray-900 dark:text-white">
                100
              </span>
            </span>
            <ul class="inline-flex -space-x-px text-sm h-8">
              <li>
                <a
                  class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  href="#"
                >
                  Previous
                </a>
              </li>
              <li>
                <a
                  class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  href="#"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  aria-current="page"
                  class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  href="#"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  href="#"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  href="#"
                >
                  Next
                </a>
              </li>
            </ul>
          </nav> */}
        </div>
      </div>
    </>
  );
}
