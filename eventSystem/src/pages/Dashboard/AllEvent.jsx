export default function AllEvent() {
  const statsData = [
    {
      title: "Total Techonology",
      value: "842,512",
      icon: "group",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50 dark:bg-blue-900/20",
      trend: "12%",
      trendIcon: "trending_up",
      trendColor: "text-green-600",
      trendBg: "bg-green-50",
    },
    {
      title: "Total Social",
      value: "1,204",
      icon: "event",
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50 dark:bg-purple-900/20",
      trend: "4%",
      trendIcon: "trending_up",
      trendColor: "text-green-600",
      trendBg: "bg-green-50",
    },
    {
      title: "Total Business",
      value: "42",
      icon: "pending_actions",
      iconColor: "text-orange-600",
      iconBg: "bg-orange-50 dark:bg-orange-900/20",
      trend: "8%",
      trendIcon: "trending_down",
      trendColor: "text-red-600",
      trendBg: "bg-red-50",
    },
    {
      title: "Total Outdoors",
      value: "892",
      icon: "campaign",
      iconColor: "text-teal-600",
      iconBg: "bg-teal-50 dark:bg-teal-900/20",
      trend: "0%",
      trendIcon: "horizontal_rule",
      trendColor: "text-slate-500",
      trendBg: "bg-slate-100",
    },
    {
      title: "Total Arts",
      value: "12.5%",
      icon: "monitoring",
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-50 dark:bg-indigo-900/20",
      trend: "1.2%",
      trendIcon: "trending_up",
      trendColor: "text-green-600",
      trendBg: "bg-green-50",
    },
    {
      title: "Total Programming",
      value: "64.8%",
      icon: "favorite",
      iconColor: "text-rose-600",
      iconBg: "bg-rose-50 dark:bg-rose-900/20",
      trend: "2%",
      trendIcon: "trending_up",
      trendColor: "text-green-600",
      trendBg: "bg-green-50",
    },
    {
      title: "Total School Activity",
      value: "$2.4M",
      icon: "payments",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50 dark:bg-emerald-900/20",
      trend: "24%",
      trendIcon: "trending_up",
      trendColor: "text-green-600",
      trendBg: "bg-green-50",
    },
    {
      title: "Total Campus Program",
      value: "128",
      icon: "support_agent",
      iconColor: "text-yellow-600",
      iconBg: "bg-yellow-50 dark:bg-yellow-900/20",
      trend: "15%",
      trendIcon: "trending_up",
      trendColor: "text-red-600",
      trendBg: "bg-red-50",
    },
    {
      title: "Total Community",
      value: "99.98%",
      icon: "timer",
      iconColor: "text-cyan-600",
      iconBg: "bg-cyan-50 dark:bg-cyan-900/20",
      trend: "0.01%",
      trendIcon: "trending_up",
      trendColor: "text-green-600",
      trendBg: "bg-green-50",
    },
    {
      title: "Total Health",
      value: "4,120",
      icon: "person_add",
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50 dark:bg-amber-900/20",
      trend: "32%",
      trendIcon: "trending_up",
      trendColor: "text-green-600",
      trendBg: "bg-green-50",
    },
  ];

  return (
    <>
      <div class="flex flex-col gap-8">
        <div class="flex flex-wrap justify-between items-center gap-3">
          <div class="flex flex-col gap-1">
            <p class="text-[#212529] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              Event Posts
            </p>
            <p class="text-[#6C757D] dark:text-slate-400 text-base font-normal leading-normal">
              Welcome, Admin! Here's a summary of school activities.
            </p>
          </div>
        </div>
        {/* <!-- 10 High Density Stats Grid --> */}
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {statsData.map((stat, index) => (
            <div
              key={index}
              class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <p class="text-slate-500 text-[12px] font-bold uppercase tracking-wider">
                {stat.title}
              </p>
              <p class="text-xl font-bold text-slate-900 dark:text-slate-100">
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
                  Type
                </th>
                <th class="px-6 py-3 font-medium" scope="col">
                  Date
                </th>
                <th class="px-6 py-3 font-medium" scope="col">
                  Status
                </th>
                <th class="px-6 py-3 text-right font-medium" scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b dark:border-slate-800 text-[#212529] dark:text-white">
                <td class="px-6 py-4 font-semibold">
                  Midterm Examination Schedule
                </td>
                <td class="px-6 py-4">
                  <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    Announcement
                  </span>
                </td>
                <td class="px-6 py-4">Oct 25, 2023</td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                    <span class="size-1.5 rounded-full bg-green-600"></span>
                    Published
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button class="p-1.5 text-[#6C757D] dark:text-slate-400 hover:text-primary">
                      <span class="material-symbols-outlined">edit</span>
                    </button>
                    <button class="p-1.5 text-[#6C757D] dark:text-slate-400 hover:text-primary">
                      <span class="material-symbols-outlined">visibility</span>
                    </button>
                    <button class="p-1.5 text-[#6C757D] dark:text-slate-400 hover:text-red-500">
                      <span class="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr class="border-b dark:border-slate-800 text-[#212529] dark:text-white">
                <td class="px-6 py-4 font-semibold">
                  University Foundation Day Celebration
                </td>
                <td class="px-6 py-4">
                  <span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                    Event
                  </span>
                </td>
                <td class="px-6 py-4">Nov 15, 2023</td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                    <span class="size-1.5 rounded-full bg-green-600"></span>
                    Published
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button class="p-1.5 text-[#6C757D] dark:text-slate-400 hover:text-primary">
                      <span class="material-symbols-outlined">edit</span>
                    </button>
                    <button class="p-1.5 text-[#6C757D] dark:text-slate-400 hover:text-primary">
                      <span class="material-symbols-outlined">visibility</span>
                    </button>
                    <button class="p-1.5 text-[#6C757D] dark:text-slate-400 hover:text-red-500">
                      <span class="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr class="border-b dark:border-slate-800 text-[#212529] dark:text-white">
                <td class="px-6 py-4 font-semibold">
                  Enrollment for Second Semester
                </td>
                <td class="px-6 py-4">
                  <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    Announcement
                  </span>
                </td>
                <td class="px-6 py-4">Oct 20, 2023</td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700 dark:bg-orange-900 dark:text-orange-300">
                    <span class="size-1.5 rounded-full bg-orange-600"></span>
                    Draft
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button class="p-1.5 text-[#6C757D] dark:text-slate-400 hover:text-primary">
                      <span class="material-symbols-outlined">edit</span>
                    </button>
                    <button class="p-1.5 text-[#6C757D] dark:text-slate-400 hover:text-primary">
                      <span class="material-symbols-outlined">visibility</span>
                    </button>
                    <button class="p-1.5 text-[#6C757D] dark:text-slate-400 hover:text-red-500">
                      <span class="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr class="border-b dark:border-slate-800 text-[#212529] dark:text-white">
                <td class="px-6 py-4 font-semibold">Campus Job Fair 2023</td>
                <td class="px-6 py-4">
                  <span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                    Event
                  </span>
                </td>
                <td class="px-6 py-4">Nov 05, 2023</td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                    <span class="size-1.5 rounded-full bg-green-600"></span>
                    Published
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button class="p-1.5 text-[#6C757D] dark:text-slate-400 hover:text-primary">
                      <span class="material-symbols-outlined">edit</span>
                    </button>
                    <button class="p-1.5 text-[#6C757D] dark:text-slate-400 hover:text-primary">
                      <span class="material-symbols-outlined">visibility</span>
                    </button>
                    <button class="p-1.5 text-[#6C757D] dark:text-slate-400 hover:text-red-500">
                      <span class="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr class="text-[#212529] dark:text-white">
                <td class="px-6 py-4 font-semibold">
                  Holiday Notice: All Saints' Day
                </td>
                <td class="px-6 py-4">
                  <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    Announcement
                  </span>
                </td>
                <td class="px-6 py-4">Oct 18, 2023</td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                    <span class="size-1.5 rounded-full bg-green-600"></span>
                    Published
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button class="p-1.5 text-[#6C757D] dark:text-slate-400 hover:text-primary">
                      <span class="material-symbols-outlined">edit</span>
                    </button>
                    <button class="p-1.5 text-[#6C757D] dark:text-slate-400 hover:text-primary">
                      <span class="material-symbols-outlined">visibility</span>
                    </button>
                    <button class="p-1.5 text-[#6C757D] dark:text-slate-400 hover:text-red-500">
                      <span class="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
