import { useState } from "react";
import SacliLogo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../services/apiRequest";

export default function StudentHeader({ user }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  const handleAnnouncement = () => navigate("/studentAnnouncement");

  const handleLogout = async () => {
    const response = await apiRequest(
      "http://localhost/IPTFINALPROJECT/eventSystem/src/backend/logout.php",
      "POST",
    );
    if (response.success) {
      navigate("/");
    }
  };

  return (
    <>
      <header class="fixed w-full flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-700/60 px-4 md:px-8 lg:px-10 py-3 bg-white dark:bg-background-dark/50 backdrop-blur-sm top-0 z-10">
        <div class="flex items-center gap-4 text-gray-900 dark:text-white">
          <div class="size-6 text-primary">
            <img src={SacliLogo} alt="" />
          </div>
          <h2 class="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            SACLIEventSys
          </h2>
        </div>
        <div class="flex flex-1 justify-end items-center gap-4">
          <nav class="hidden lg:flex items-center gap-9">
            <span
              onClick={handleAnnouncement}
              class="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white hover:text-primary cursor-pointer transition-colors"
            >
              <span class="material-symbols-outlined">campaign</span>
              Announcements
            </span>
            <span class="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white hover:text-primary cursor-pointer transition-colors">
              <span class="material-symbols-outlined">history</span>
              My Recently Joined
            </span>
            <div class="relative">
              <button
                onClick={toggleProfileMenu}
                class="flex items-center gap-2 text-sm font-bold text-[#111318] dark:text-white hover:text-primary transition-colors group focus:outline-none"
              >
                <div class="size-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 group-hover:text-primary transition-colors overflow-hidden">
                  <img
                    src={user?.profile_picture}
                    alt="Profile"
                    class="w-full h-full object-cover"
                  />
                </div>
                <span className="truncate">
                  {user ? user.fullName : "Student"}
                </span>
                <span class="material-symbols-outlined text-[20px] text-gray-400 group-hover:text-primary transition-colors">
                  expand_more
                </span>
              </button>
              <div
                id="profileMenu"
                className={`${
                  isProfileMenuOpen ? "" : "hidden"
                } absolute right-0 mt-2 w-56 bg-white dark:bg-[#1a202c] rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50 transform transition-all origin-top-right`}
              >
                <div class="px-4 py-2 border-b border-gray-100 dark:border-gray-700 mb-1">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                    {user ? user.fullName : "Student"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user ? user.email : ""}
                  </p>
                </div>

                <a
                  onClick={handleLogout}
                  class="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <span class="material-symbols-outlined text-[18px]">
                    logout
                  </span>
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
