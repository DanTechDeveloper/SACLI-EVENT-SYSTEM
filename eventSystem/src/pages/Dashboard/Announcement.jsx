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
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              Announcements
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal">
              Welcome, Admin! Here's a summary of school activities.
            </p>
          </div>
        </div>

        {/* <!-- Stats --> */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {statisticalData.map((stat, index) => {
            const palettes = [
              "bg-grad-primary shadow-glow-primary",
              "bg-grad-secondary shadow-glow-secondary",
              "bg-grad-success shadow-glow-success",
              "bg-grad-accent shadow-glow-accent",
              "bg-grad-warning shadow-glow-warning",
              "bg-grad-primary shadow-glow-primary",
            ];
            return (
              <div
                key={index}
                className={`card-hover flex flex-col gap-2 rounded-2xl p-5 text-white ${palettes[index % palettes.length]}`}
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-white/70">
                  {stat.title}
                </p>
                <p className="text-4xl font-black leading-none">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>
        <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
          Recent Activity
        </h2>
        {/* <!-- ToolBar --> */}
        <div className="flex justify-between gap-4 py-2">
          <div className="flex gap-2">
            <select className="rounded-xl border border-violet-200 dark:border-violet-900/40 dark:bg-surface-dark dark:text-white text-slate-700 focus:ring-primary focus:border-primary text-sm px-3 py-2">
              <option>All Types</option>
              <option>Announcements</option>
              <option>Events</option>
            </select>
            <select className="rounded-xl border border-violet-200 dark:border-violet-900/40 dark:bg-surface-dark dark:text-white text-slate-700 focus:ring-primary focus:border-primary text-sm px-3 py-2">
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
