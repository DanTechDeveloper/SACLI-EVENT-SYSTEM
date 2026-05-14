import { useState } from "react";
import SacliLogo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../services/apiRequest";

export default function StudentHeader({ user }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const handleAnnouncement = () => navigate("/studentAnnouncement");
  const handleRecentlyJoined = () => navigate("/studentRecentlyJoined");

  const handleLogout = async () => {
    const response = await apiRequest(
      "http://localhost/IPTFINALPROJECT/eventSystem/src/backend/Student/Logout.php",
      "POST",
    );
    if (response.success) {
      navigate("/");
    }
  };

  return (
    <>
      <header className="fixed w-full flex items-center justify-between whitespace-nowrap border-b border-violet-100 dark:border-violet-900/40 px-4 md:px-8 lg:px-10 py-3 bg-white/90 dark:bg-background-dark/80 backdrop-blur-md top-0 z-10 shadow-sm">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full overflow-hidden ring-2 ring-primary/20 shrink-0">
            <img src={SacliLogo} alt="SACLI" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-slate-900 dark:text-white text-lg font-black leading-tight tracking-[-0.015em]">
            SACLIEventSys
          </h2>
        </div>

        {/* Nav */}
        <div className="flex flex-1 justify-end items-center gap-2">
          <nav className="hidden lg:flex items-center gap-2">
            <span
              onClick={handleAnnouncement}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary-light cursor-pointer transition-colors px-3 py-2 rounded-xl hover:bg-primary/5 dark:hover:bg-primary/10"
            >
              <span className="material-symbols-outlined text-[20px]">campaign</span>
              Announcements
            </span>
            <span
              onClick={handleRecentlyJoined}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary-light cursor-pointer transition-colors px-3 py-2 rounded-xl hover:bg-primary/5 dark:hover:bg-primary/10"
            >
              <span className="material-symbols-outlined text-[20px]">history</span>
              My Recently Joined
            </span>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary-light transition-colors group focus:outline-none px-2 py-1 rounded-xl"
              >
                <div className="size-8 flex items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 ring-2 ring-primary/20 overflow-hidden">
                  <img
                    src={(user?.profile_picture === null) ? "" : user?.profile_picture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="truncate max-w-[120px]">
                  {user ? user.fullName : "Student"}
                </span>
                <span className="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                  expand_more
                </span>
              </button>

              <div
                id="profileMenu"
                className={`${
                  isProfileMenuOpen ? "" : "hidden"
                } absolute right-0 mt-2 w-56 bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-violet-100 dark:border-violet-900/40 py-2 z-50`}
              >
                <div className="px-4 py-3 border-b border-violet-100 dark:border-violet-900/30 mb-1">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {user ? user.fullName : "Student"}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {user ? user.email : ""}
                  </p>
                </div>
                <a
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-secondary hover:bg-secondary/5 dark:hover:bg-secondary/10 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Log Out
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
