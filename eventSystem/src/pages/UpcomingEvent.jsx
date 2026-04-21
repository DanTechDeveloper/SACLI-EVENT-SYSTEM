import { useState, useEffect } from "react";
import apiRequest from "../services/apiRequest";
import BorderContainer from "../components/Dashboard/BorderContainer";
import BorderLayout from "../layouts/BorderLayout";
import TableEvent from "../components/Dashboard/TableEvent";

export default function UpcomingEvent() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const url =
        "http://localhost/IPTFINALPROJECT/eventSystem/src/backend/Dashboard/UpcomingEvents.php";
      const response = await apiRequest(url);
      if (response.success) {
        setData(response.data);
        console.log(response.data);
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
      title: "Total Upcoming Events Next Year",
      value: data?.counts?.year || 0,
    },
  ];

  // Filter events to ensure no overlap between sections
  const eventsThisWeek = data?.thisWeek || [];

  const eventsThisMonthFiltered = (data?.thisMonth || []).filter(
    (monthEvent) =>
      !eventsThisWeek.some((weekEvent) => weekEvent.id === monthEvent.id),
  );

  // Combine events from this week and this month to exclude them from this year's remainder
  const allEventsUpToMonth = [...eventsThisWeek, ...eventsThisMonthFiltered];

  const eventsThisYearFiltered = (data?.thisYear || []).filter(
    (yearEvent) =>
      !allEventsUpToMonth.some((pastEvent) => pastEvent.id === yearEvent.id),
  );

 
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
        <BorderLayout>
          <BorderContainer title="Happening This Week">
            <TableEvent events={eventsThisWeek} emptyMessage="No events found for this week."/>
          </BorderContainer>{" "}
          <BorderContainer title="Upcoming This Month">
            <TableEvent events={eventsThisMonthFiltered} emptyMessage="No events found for this month."></TableEvent>
          </BorderContainer>
          <BorderContainer title="Upcoming Events Next Year">
            <TableEvent events={eventsThisYearFiltered} emptyMessage="No events found for this year."/>
          </BorderContainer>
        </BorderLayout>
      </div>
    </>
  );
}
