import { useEffect, useState } from "react";
import apiRequest from "../../services/apiRequest";
import BorderContainer from "../../components/Dashboard/BorderContainer";
import BorderLayout from "../../layouts/BorderLayout";
import TableEvent from "../../components/Dashboard/TableEvent";
export default function AllEvent() {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const response = await apiRequest(
      "http://localhost/IPTFINALPROJECT/eventSystem/src/backend/Dashboard/AllEvents.php",
    );

    if (response.success) {
      setData(response.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const statsData = [
    {
      title: "Total Techonology",
      value: data?.categoryCounts.total_technology,
    },
    {
      title: "Total Social",
      value: data?.categoryCounts.total_social,
    },
    {
      title: "Total Business",
      value: data?.categoryCounts.total_business,
    },
    {
      title: "Total Outdoors",
      value: data?.categoryCounts.total_outdoors,
    },
    {
      title: "Total Arts",
      value: data?.categoryCounts.total_arts,
    },
    {
      title: "Total Programming",
      value: data?.categoryCounts.total_programming,
    },
    {
      title: "Total School Activity",
      value: data?.categoryCounts.total_school_activity,
    },
    {
      title: "Total Campus Program",
      value: data?.categoryCounts.total_campus_program,
    },
    {
      title: "Total Community",
      value: data?.categoryCounts.total_community,
    },
    {
      title: "Total Health",
      value: data?.categoryCounts.total_health,
    },
  ];
  const handleAction = async (action, id) => {
    switch (action) {
      case "edit":
        const title = prompt("Enter title");
        const description = prompt("Enter description");
        const date = prompt("Enter date");
        const time = prompt("Enter time");
        const location = prompt("Enter location");
        const criteria = prompt("Enter criteria");
        const eventAuthor = prompt("Enter event author");
        const data = {
          title,
          description,
          date,
          time,
          location,
          criteria,
          eventAuthor,
        };
        const editApi = `http://localhost/IPTFINALPROJECT/eventSystem/src/backend/Dashboard/AllEvents.php?id=${id}&status=${action}`;
        const editResponse = await apiRequest(editApi, "POST", data);
        if (editResponse.success) {
          await fetchData();
          alert("Event updated successfully.");
        }
        break;
      case "delete":
        const deletePrompt = confirm(
          "Are you sure you want to delete this event?",
        );
        if (!deletePrompt) {
          return;
        }
        const deleteApi = `http://localhost/IPTFINALPROJECT/eventSystem/src/backend/Dashboard/AllEvents.php?id=${id}&status=${action}`;
        const deleteResponse = await apiRequest(deleteApi);
        if (deleteResponse.success) {
          await fetchData();
          alert("Event removed successfully.");
        }
        break;
    }
  };

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

        <BorderLayout>
          <BorderContainer title="Ongoing Events">
            <TableEvent
              events={data?.tableRows}
              emptyMessage="No ongoing events."
              handleAction={handleAction}
            ></TableEvent>
          </BorderContainer>{" "}
          <BorderContainer title="Past Events">
            <TableEvent
              events={data?.tableRows}
              emptyMessage="No ongoing events."
              handleAction={handleAction}
            ></TableEvent>
          </BorderContainer>
        </BorderLayout>
      </div>
    </>
  );
}
