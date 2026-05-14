import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../services/apiRequest";

export default function StudentAnnouncement() {
  const navigate = useNavigate();
  const handleOnClick = () => navigate("/studentView");
  

  const [announcement, setAnnouncement] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await apiRequest(
          "http://localhost/IPTFINALPROJECT/eventSystem/src/backend/Student/Announcements.php"
        );
        if (response.success) {
          setAnnouncement(response.data);
        } else {
          setError(response.message || "Failed to load announcements.");
        }
      } catch (err) {
        setError("A server error occurred. Please try again later.");
        console.error("API Error:", err);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white antialiased min-h-screen">
        <div className="py-5 px-6 max-w-3xl mx-auto">
          <div className="mx-auto">
            <a
              onClick={handleOnClick}
              className="cursor-pointer flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light font-semibold mb-6 transition-colors group w-fit"
            >
              <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              Back to Events
            </a>
            <div className="mb-6">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Announcements
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
                The latest updates and news from your community.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {error ? (
                <div className="w-full flex justify-center items-center p-6 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-800 border-dashed">
                  <p className="text-red-500 dark:text-red-400 text-lg font-medium">
                    {error}
                  </p>
                </div>
              ) : announcement?.allAnnouncements && announcement.allAnnouncements.length > 0 ? (
                announcement?.allAnnouncements.map((values, key) => (
                  <article
                    key={key}
                    className="card-hover bg-white dark:bg-surface-dark border border-violet-100 dark:border-violet-900/40 rounded-2xl p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">
                        {values.title}
                      </h3>
                      <span className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light text-[10px] uppercase tracking-wider font-black px-2.5 py-1 rounded-full">
                        {values.category}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
                      {values.message}
                    </p>
                    <footer className="flex items-center justify-between pt-4 border-t border-violet-100 dark:border-violet-900/30">
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                          <span className="material-symbols-outlined text-xs text-primary dark:text-primary-light">
                            person
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          {values.author}
                        </span>
                      </div>
                      <time className="text-xs text-slate-400">
                        {values.created_at}
                      </time>
                    </footer>
                  </article>
                ))
              ) : (
                <div className="w-full flex justify-center items-center p-8 bg-white dark:bg-surface-dark rounded-2xl border border-dashed border-violet-200 dark:border-violet-900/40">
                  <p className="text-slate-500 dark:text-slate-400 text-base font-medium">
                    No announcements found.
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
