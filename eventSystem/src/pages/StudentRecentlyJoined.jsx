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
        <div class="py-5 px-6 max-w-3xl mx-auto">
          <div class="mx-auto">
            <a
              onClick={handleOnClick}
              class="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light font-semibold mb-6 transition-colors group w-fit"
            >
              <span class="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              Back to Events
            </a>
            <div class="mb-6">
              <h1 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                My Recently Joined Events
              </h1>
              <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">Events you have registered for.</p>
            </div>

            <div class="flex flex-col gap-6">
              {recentlyJoined && recentlyJoined.length > 0 ? (
                recentlyJoined.map((event, index) => (
                  <article
                    key={index}
                    class="card-hover bg-white dark:bg-surface-dark border border-violet-100 dark:border-violet-900/40 rounded-2xl p-5 shadow-sm"
                  >
                    <div class="flex items-start justify-between mb-3">
                      <h3 class="font-bold text-base text-slate-900 dark:text-white">
                        {event.title}
                      </h3>
                      <span class="bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light text-[10px] uppercase tracking-wider font-black px-2.5 py-1 rounded-full">
                        {event.category}
                      </span>
                    </div>
                    <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
                      {event.description}
                    </p>
                    <footer class="flex items-center justify-between pt-4 border-t border-violet-100 dark:border-violet-900/30">
                      <div class="flex items-center gap-2">
                        <div class="size-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                          <span class="material-symbols-outlined text-xs text-primary dark:text-primary-light">
                            event
                          </span>
                        </div>
                        <span class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          {event.date} • {event.time}
                        </span>
                      </div>
                      <div class="text-xs text-slate-400 flex items-center gap-1">
                        <span class="material-symbols-outlined text-xs text-primary/50">location_on</span>
                        {event.location}
                      </div>
                    </footer>
                  </article>
                ))
              ) : (
                <div class="w-full flex justify-center items-center p-8 bg-white dark:bg-surface-dark rounded-2xl border border-dashed border-violet-200 dark:border-violet-900/40">
                    <p class="text-slate-500 dark:text-slate-400 text-base font-medium">
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
