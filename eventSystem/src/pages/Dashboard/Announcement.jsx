import { useEffect, useState } from "react";
import apiRequest from "../../services/apiRequest";
import TableAnnouncement from "../../components/Dashboard/TableAnnouncement";
import BorderLayout from "../../layouts/BorderLayout";
import BorderContainer from "../../components/Dashboard/BorderContainer";

export default function Announcement() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await apiRequest(
      "http://localhost/IPTFINALPROJECT/eventSystem/src/backend/Dashboard/AllAnnouncement.php",
    );

    if (response.success) {
      setData(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statisticalData = [
    {
      title: "IMPORTANT",
      value: data?.getAnnouncementCategoryCount?.total_important || 0,
    },
    {
      title: "REMINDERS",
      value: data?.getAnnouncementCategoryCount?.total_reminder || 0,
    },
    {
      title: "GENERAL",
      value: data?.getAnnouncementCategoryCount?.total_general || 0,
    },
    {
      title: "EVENTS",
      value: data?.getAnnouncementCategoryCount?.total_event || 0,
    },
    {
      title: "ACHIEVEMENTS",
      value: data?.getAnnouncementCategoryCount?.total_achievement || 0,
    },
    {
      title: "EMERGENCY",
      value: data?.getAnnouncementCategoryCount?.total_emergency || 0,
    },
  ];

  const handleAction = async (action, id) => {
    switch (action) {
      case "edit":
        const editTitle = prompt("Enter new title:");
        if (!editTitle) return;
        const editDescription = prompt("Enter new description:");
        if (!editDescription) return;
        const editCategory = prompt("Enter new category:");
        if (!editCategory) return;
        const api = `http://localhost/IPTFINALPROJECT/eventSystem/src/backend/announcement.php?id=${id}&status=${action}`;
        const response = await apiRequest(api, "POST", {
          title: editTitle,
          description: editDescription,
          category: editCategory,
        });
        if (response.success) {
          await fetchData();
          alert("Announcement updated successfully!");
        }
        break;
      case "delete":
        const deletePrompt = confirm(
          "Are you sure you want to delete this announcement?",
        );
        if (!deletePrompt) {
          return;
        }
        const deleteApi = `http://localhost/IPTFINALPROJECT/eventSystem/src/backend/announcement.php?id=${id}&status=${action}`;
        const deleteResponse = await apiRequest(deleteApi);
        if (deleteResponse.success) {
          await fetchData();
          alert("Announcement removed successfully.");
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div class="flex flex-col gap-8">
        <div class="flex flex-wrap justify-between items-center gap-3">
          <div class="flex flex-col gap-1">
            <p class="text-[#212529] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              Announcements
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
        <BorderLayout>
          <BorderContainer title="IMPORTANT">
            <TableAnnouncement
              announcements={data?.important || []}
              emptyMessage="No important announcements found."
              handleAction={handleAction}
            />
          </BorderContainer>{" "}
          <BorderContainer title="REMINDERS">
            <TableAnnouncement
              announcements={data?.reminder || []}
              emptyMessage="No reminder announcements found."
              handleAction={handleAction}
            />
          </BorderContainer>{" "}
          <BorderContainer title="GENERAL">
            <TableAnnouncement
              announcements={data?.general || []}
              emptyMessage="No general announcements found."
              handleAction={handleAction}
            />
          </BorderContainer>{" "}
          <BorderContainer title="EVENTS">
            <TableAnnouncement
              announcements={data?.event || []}
              emptyMessage="No events announcements found."
              handleAction={handleAction}
            />
          </BorderContainer>{" "}
          <BorderContainer title="ACHIEVEMENTS">
            <TableAnnouncement
              announcements={data?.achievement || []}
              emptyMessage="No achievement announcements found."
              handleAction={handleAction}
            />
          </BorderContainer>
          <BorderContainer title="EMERGENCY">
            <TableAnnouncement
              announcements={data?.emergency || []}
              emptyMessage="No emergency announcements found."
              handleAction={handleAction}
            />
          </BorderContainer>
        </BorderLayout>
      </div>
    </>
  );
}
