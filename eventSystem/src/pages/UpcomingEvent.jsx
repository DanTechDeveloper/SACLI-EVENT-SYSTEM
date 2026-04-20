import { useState, useEffect } from "react";
import apiRequest from "../services/apiRequest";

export default function UpcomingEvent() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const url =
        "http://localhost/IPTFINALPROJECT/eventSystem/src/backend/Dashboard/UpcomingEvents.php";
      const response = await apiRequest(url);
      if (response.success) {
        setData(response.data);
      } else {
        console.error(`Error fetching data: ${response.error}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statsData = [
    {
      title: "Total Upcoming Events This Week",
      value: data?.counts?.week || 0,
    },
    {
      title: "Total Upcoming Events This Month",
      value: data?.counts?.month || 0,
    },
    {
      title: "Total Upcoming Events This Year",
      value: data?.counts?.year || 0,
    },
  ];

  // Filter events to ensure no overlap between sections
  const eventsThisWeek = data?.thisWeek || [];

  const eventsThisMonthFiltered = (data?.thisMonth || []).filter(
    (monthEvent) => !eventsThisWeek.some((weekEvent) => weekEvent.id === monthEvent.id)
  );

  // Combine events from this week and this month to exclude them from this year's remainder
  const allEventsUpToMonth = [...eventsThisWeek, ...eventsThisMonthFiltered];

  const eventsThisYearFiltered = (data?.thisYear || []).filter(
    (yearEvent) => !allEventsUpToMonth.some((pastEvent) => pastEvent.id === yearEvent.id)
  );

  // REUSABLE TABLE RENDERER
  const renderEventTable = (events, emptyMessage) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest" scope="col">Title</th>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest" scope="col">Category</th>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest" scope="col">Event Date</th>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest" scope="col">Event Time</th>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest" scope="col">Criteria</th>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest text-right" scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {!events || events.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400 italic">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              events.map((event, key) => (
                <tr key={key} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">{event.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {event.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600 dark:text-slate-300">{event.date}</div>
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
                    {/* Actions placeholder to match thead */}
                    <div className="flex justify-end gap-2 text-slate-400 italic text-xs">View Only</div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div className="flex flex-col gap-1">
            <p class="text-[#212529] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              Upcoming Posts
            </p>
            <p class="text-[#6C757D] dark:text-slate-400 text-base font-normal leading-normal">
              Welcome, Admin! Here's a summary of school activities.
            </p>
          </div>
        </div>
        {/* <!-- 10 High Density Stats Grid --> */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
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
        <h2 className="text-[#212529] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
          Recent Activity
        </h2>
        {/* <!-- ToolBar --> */}
        <div className="flex justify-between gap-4 py-2">
          <div className="flex gap-2">
            <select className="rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-primary focus:border-primary">
              <option>All Types</option>
              <option>Announcements</option>
              <option>Events</option>
            </select>
            <select className="rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-primary focus:border-primary">
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-12 w-full py-4">
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h4 className="text-lg font-bold text-primary dark:text-white">
                Happening This Week
              </h4>
            </div>
            {renderEventTable(eventsThisWeek, "No upcoming events scheduled for this week.")}
          </section>{" "}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h4 className="text-lg font-bold text-primary dark:text-white">
                Upcoming This Month
              </h4>
            </div>
            {renderEventTable(eventsThisMonthFiltered, "There are no events planned for the rest of this month.")}
          </section>
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h4 className="text-lg font-bold text-primary dark:text-white">
                Upcoming Remainder of the Year
              </h4>
            </div>
            {renderEventTable(eventsThisYearFiltered, "No more events found for the current year.")}
          </section>
        </div>
      </div>
    </>
  );
}
