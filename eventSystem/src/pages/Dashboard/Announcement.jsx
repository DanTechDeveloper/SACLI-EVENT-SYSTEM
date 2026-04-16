import { useEffect, useState } from "react";
import apiRequest from "../../services/apiRequest";
export default function Announcement() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiRequest(
        "http://localhost/IPTFINALPROJECT/eventSystem/src/backend/dashboard.php",
      );
      
      if (response.success) {
        setData(response.data);
      }
    };
    fetchData();
  }, []);

  // Calculate category totals from the event list returned by dashboard.php
  const eventCounts = data?.readEvent?.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {}) || {};

  const statisticalData = [
    { title: "TECHNOLOGY", value: eventCounts["Technology"] || 0 },
    { title: "SOCIAL", value: eventCounts["Social"] || 0 },
    { title: "BUSINESS", value: eventCounts["Business"] || 0 },
    { title: "OUTDOORS", value: eventCounts["Outdoors"] || 0 },
    { title: "ARTS", value: eventCounts["Arts"] || 0 },
    { title: "PROGRAMMING", value: eventCounts["Programming"] || 0 },
  ];

  return (
    <>
      <div class="flex flex-col gap-8">
        <div class="flex flex-wrap justify-between items-center gap-3">
          <div class="flex flex-col gap-1">
            <p class="text-[#212529] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              Events Statistical Overview
            </p>
            <p class="text-[#6C757D] dark:text-slate-400 text-base font-normal leading-normal">
              Welcome, Admin! Here's a summary of school activities.
            </p>
          </div>
        </div>

        {/* <!-- Stats --> */}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {statisticalData.map((stat, index) => (
            <div class="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
              <p class="text-[#6C757D] dark:text-slate-400 text-base font-medium leading-normal">
                {stat.title}
              </p>
              <p class="text-[#212529] dark:text-white tracking-light text-3xl font-bold leading-tight">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
        <h2 class="text-[#212529] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
          Recent Activity
        </h2>
        {/* <!-- ToolBar --> */}
        <div class="flex justify-between gap-4 py-2">
          <div class="flex gap-2">
            <select class="rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-primary focus:border-primary">
              <option>All Types</option>
              <option>Announcements</option>
              <option>Events</option>
            </select>
            <select class="rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-primary focus:border-primary">
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>
        </div>
        <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 text-xs uppercase text-[#6C757D] dark:bg-slate-800 dark:text-slate-400">
              <tr>
                <th class="px-6 py-3 font-medium" scope="col">
                  Title
                </th>
                <th class="px-6 py-3 font-medium" scope="col">
                  Description
                </th>
                <th class="px-6 py-3 font-medium" scope="col">
                  Category
                </th>
                <th class="px-6 py-3 font-medium" scope="col">
                  Event Schedule
                </th>
                <th class="px-6 py-3 text-right font-medium" scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.readEvent?.map((value, key) => (
                <tr key={key} class="border-b dark:border-slate-800 text-[#212529] dark:text-white">
                  <td class="px-6 py-4 font-semibold">
                    {value.title}
                  </td>
                  <td class="px-6 py-4">
                    <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                     {value.description}
                    </span>
                  </td>
                  <td class="px-6 py-4">{value.category}</td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                      <span class="size-1.5 rounded-full bg-green-600"></span>
                      {`${value.date} • ${value.time}`}
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
      </div>
    </>
  );
}
