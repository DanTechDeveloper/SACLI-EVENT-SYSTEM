import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../services/apiRequest.js";
export default function StudentRecentlyJoined() {
  const [recentlyJoined, setRecentlyJoined] = useState(null);
  const navigate = useNavigate();
  const handleOnClick = () => navigate("/studentView");

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiRequest(
        "http://localhost/IPTFINALPROJECT/eventSystem/src/backend/Student/RecentlyJoined.php",
      );
    
      if (response.success) {
        setRecentlyJoined(response.data);
      }
    };


    fetchData();
  }, []);

  return (
    <>
      <div class="cursor-pointer bg-background-light dark:bg-background-dark text-slate-900 dark:text-white antialiased min-h-screen">
        <div class="py-5 px-6">
          <div class="mx-auto">
            <a
              onClick={handleOnClick}
              class="flex items-center text-slate-600 hover:text-slate-900 font-medium mb-6 transition-colors group"
            >
              <span class="material-symbols-outlined mr-1 text-xl group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              Back
            </a>
            <div class="mb-5">
              <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                My Recently Joined Event's
              </h1>
            </div>

            <div class="flex flex-col gap-6">
              {recentlyJoined && recentlyJoined.length > 0 ? (
                recentlyJoined.map((event, index) => (
                  <article
                    key={index}
                    class="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl p-5 shadow-sm"
                  >
                    <div class="flex items-start justify-between mb-3">
                      <h3 class="font-bold text-lg text-slate-900 dark:text-white">
                        {event.title}
                      </h3>
                      <span class="bg-blue-100 text-blue-700 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md">
                        {event.category}
                      </span>
                    </div>
                    <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
                      {event.description}
                    </p>
                    <footer class="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-border-dark">
                      <div class="flex items-center gap-2">
                        <div class="size-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <span class="material-symbols-outlined text-xs text-slate-500">
                            event
                          </span>
                        </div>
                        <span class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          {event.date} • {event.time}
                        </span>
                      </div>
                      <div class="text-xs text-slate-400 flex items-center gap-1">
                        <span class="material-symbols-outlined text-xs">location_on</span>
                        {event.location}
                      </div>
                    </footer>
                  </article>
                ))
              ) : (
                <div class="w-full flex justify-center items-center p-6 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark border-dashed">
                    <p class="text-gray-500 dark:text-gray-400 text-lg font-medium">
                      {"No events found."}
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
