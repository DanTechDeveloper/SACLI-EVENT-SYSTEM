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
          "http://localhost/IPTFINALPROJECT/eventSystem/src/backend/announcement.php"
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
        <div className="py-5 px-6">
          <div className="mx-auto">
            <a
              onClick={handleOnClick}
              className="cursor-pointer flex items-center text-slate-600 hover:text-slate-900 font-medium mb-6 transition-colors group"
            >
              <span className="material-symbols-outlined mr-1 text-xl group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              Back
            </a>
            <div className="mb-5">
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Announcements
              </h1>
              <p className="text-slate-500 mt-2">
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
                    className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                        {values.title}
                      </h3>
                      <span className="bg-blue-100 text-blue-700 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md">
                        {values.category}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
                      {values.message}
                    </p>
                    <footer className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-border-dark">
                      <div className="flex items-center gap-2">
                        <div className="size-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <span className="material-symbols-outlined text-xs text-slate-500">
                            person
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Admin
                        </span>
                      </div>
                      <time className="text-xs text-slate-400">
                        {values.date_posted}
                      </time>
                    </footer>
                  </article>
                ))
              ) : (
                <div className="w-full flex justify-center items-center p-6 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark border-dashed">
                  <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
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
