import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../services/apiRequest";

export default function StudentAnnouncement() {
  const navigate = useNavigate();
  const handleOnClick = () => navigate("/studentView");

  const [content, setContent] = useState(null);
  const [announcementFilter, setAnnouncementFilter] = useState("Academic");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const response = await apiRequest(
        "http://localhost/IPTFINALPROJECT/eventSystem/src/backend/announcement.php",
        "GET",
      );
      if (response && response.success) {
        setContent(response);
      }
    };
    fetchAnnouncements();
  }, []);

  const filterKey = announcementFilter.toLowerCase();
  const rawData = content ? content[filterKey] : [];
  const filteredAnnouncements = Array.isArray(rawData) ? rawData : [];

  return (
    <>
      <div class="cursor-pointer bg-background-light dark:bg-background-dark text-slate-900 dark:text-white antialiased min-h-screen">
        <div class="py-5 px-6">
          <div class="mx-auto">
            <a
              onClick={handleOnClick}
              class="flex items-center text-slate-600 hover:text-slate-900 font-medium mb-6 transition-colors group"
            >
              <span
                // onClick={handleOnClick}
                class="material-symbols-outlined mr-1 text-xl group-hover:-translate-x-1 transition-transform"
              >
                arrow_back
              </span>
              Back
            </a>
            <div class="mb-5">
              <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Announcements
              </h1>
              <p class="text-slate-500 mt-2">
                The latest updates and news from your community.
              </p>
            </div>
            <div class="mb-5">
              <div class="flex flex-col sm:flex-row justify-between gap-2 py-2">
                <div class="flex gap-2 items-center flex-wrap">
                  <button
                    onClick={() => setAnnouncementFilter("Academic")}
                    class={`flex h-10 items-center justify-center gap-x-2 rounded-lg pl-4 pr-3 text-sm font-medium leading-normal transition-colors ${announcementFilter === "Academic" ? "bg-primary text-white" : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300"}`}
                  >
                    <p class="text-sm font-medium leading-normal">Academic</p>
                  </button>
                  <button
                    onClick={() => setAnnouncementFilter("Holiday")}
                    class={`flex h-10 items-center justify-center gap-x-2 rounded-lg pl-4 pr-3 text-sm font-medium leading-normal transition-colors ${announcementFilter === "Holiday" ? "bg-primary text-white" : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300"}`}
                  >
                    <p class="text-sm font-medium leading-normal">Holiday</p>
                  </button>
                  <button
                    onClick={() => setAnnouncementFilter("Sports")}
                    class={`flex h-10 items-center justify-center gap-x-2 rounded-lg pl-4 pr-3 text-sm font-medium leading-normal transition-colors ${announcementFilter === "Sports" ? "bg-primary text-white" : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300"}`}
                  >
                    <p class="text-sm font-medium leading-normal">Sports</p>
                  </button>
                </div>
                <div class="flex gap-2">
                  <div class="relative w-full max-w-xs">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span class="material-symbols-outlined text-gray-500 dark:text-gray-400">
                        search
                      </span>
                    </div>
                    <input
                      placeholder="Search announcements..."
                      type="text"
                      class="block w-full h-10 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-10 pr-3 text-sm text-gray-900 dark:text-gray-200 focus:border-primary focus:ring-primary ml-"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-6">
              {filteredAnnouncements.length > 0 ? (
                filteredAnnouncements.map((values, key) => (
                  <article
                    key={key}
                    class="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl p-5 shadow-sm"
                  >
                    <div class="flex items-start justify-between mb-3">
                      <h3 class="font-bold text-lg text-slate-900 dark:text-white">
                        {values.title}
                      </h3>
                      <span class="bg-blue-100 text-blue-700 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md">
                        {values.category || "Announcement"}
                      </span>
                    </div>
                    <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
                      {values.content}
                    </p>
                    <footer class="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-border-dark">
                      <div class="flex items-center gap-2">
                        <div class="size-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <span class="material-symbols-outlined text-xs text-slate-500">
                            person
                          </span>
                        </div>
                        <span class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Admin
                        </span>
                      </div>
                      <time class="text-xs text-slate-400">{values.date}</time>
                    </footer>
                  </article>
                ))
              ) : (
                <div class="w-full flex justify-center items-center p-6 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark border-dashed">
                  <p class="text-gray-500 dark:text-gray-400 text-lg font-medium">
                    {typeof rawData === "string"
                      ? rawData
                      : "No announcements found."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
