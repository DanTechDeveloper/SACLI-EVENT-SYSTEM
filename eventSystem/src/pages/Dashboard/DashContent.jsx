import apiRequest from "../../services/apiRequest";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function DashContent() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const fetchDashboardData = async () => {
    const url = `http://localhost/IPTFINALPROJECT/eventSystem/src/backend/Dashboard/DashContent.php`;
    const response = await apiRequest(url);
    if (response.success) {
      setData(response.data);
    } else {
      console.error(`Error fetching data: ${response.error}`);
    }
  };
  
  useEffect(() => {
    fetchDashboardData();
  }, []);


  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              Admin Dashboard
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal">
              Welcome, Admin! Here's a summary of school activities.
            </p>
          </div>
        </div>
        {/* <!-- Stats --> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Posts */}
          <div className="card-hover relative overflow-hidden flex flex-col gap-3 rounded-2xl p-6 bg-grad-primary shadow-glow-primary text-white">
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-widest text-white/70">Total Posts</p>
              <span className="stat-icon material-symbols-outlined text-3xl text-white/80">feed</span>
            </div>
            <p className="text-5xl font-black tracking-tight leading-none">
              {data?.totalPosts ?? "—"}
            </p>
            <p className="text-xs text-white/60 font-medium">Approved events + announcements</p>
          </div>

          {/* Total Announcements */}
          <div className="card-hover relative overflow-hidden flex flex-col gap-3 rounded-2xl p-6 bg-grad-secondary shadow-glow-secondary text-white">
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-widest text-white/70">Total Announcements</p>
              <span className="stat-icon material-symbols-outlined text-3xl text-white/80" style={{animationDelay:'0.6s'}}>campaign</span>
            </div>
            <p className="text-5xl font-black tracking-tight leading-none">
              {data?.totalAnnouncement ?? "—"}
            </p>
            <p className="text-xs text-white/60 font-medium">Published & approved</p>
          </div>

          {/* Total Events */}
          <div className="card-hover relative overflow-hidden flex flex-col gap-3 rounded-2xl p-6 bg-grad-accent shadow-glow-accent text-white">
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-widest text-white/70">Total Events</p>
              <span className="stat-icon material-symbols-outlined text-3xl text-white/80" style={{animationDelay:'1.2s'}}>event_available</span>
            </div>
            <p className="text-5xl font-black tracking-tight leading-none">
              {data?.totalEvents ?? "—"}
            </p>
            <p className="text-xs text-white/60 font-medium">Approved events only</p>
          </div>
        </div>

        {/* <!-- Recent Events Section --> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Events */}
          <section className="bg-white dark:bg-surface-dark rounded-2xl border border-violet-100 dark:border-violet-900/40 shadow-sm overflow-hidden p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Events</h2>
              <button
                onClick={() => navigate("/events")}
                className="text-sm font-semibold text-primary dark:text-primary-light hover:underline"
              >
                View All
              </button>
            </div>
            {data?.recentEvents && data.recentEvents.length > 0 ? (
              <div className="space-y-4">
                {data.recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined text-primary">event</span>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">{event.title}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{event.date} • {event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-center py-4">No recent events to display.</p>
            )}
          </section>

          {/* <!-- Recent Announcements Section --> */}
          <section className="bg-white dark:bg-surface-dark rounded-2xl border border-violet-100 dark:border-violet-900/40 shadow-sm overflow-hidden p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Announcements</h2>
              <button
                onClick={() => navigate("/announcements")}
                className="text-sm font-semibold text-primary dark:text-primary-light hover:underline"
              >
                View All
              </button>
            </div>
            {data?.recentAnnouncements && data.recentAnnouncements.length > 0 ? (
              <div className="space-y-4">
                {data.recentAnnouncements.map((announcement) => (
                  <div key={announcement.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined text-secondary">campaign</span>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">{announcement.title}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{announcement.created_at}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-center py-4">No recent announcements to display.</p>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
