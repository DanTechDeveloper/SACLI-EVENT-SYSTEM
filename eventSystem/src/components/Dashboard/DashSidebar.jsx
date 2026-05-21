import { useNavigate, useLocation } from "react-router-dom";
import SacliLogo from "../../assets/logo.jpg";

export default function DashSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const sidebarLinks = [
    {
      type: "link",
      label: "Dashboard",
      icon: "dashboard",
      path: "/admin/dashboard",
    },
       {
      type: "section",
      label: "Events Management",
      items: [
        {
          label: "Event Approvals",
          icon: "event_available",
          path: "/admin/eventApprovals",
        },
        { label: "All Events", icon: "calendar_month", path: "/admin/events" },
        { label: "Upcoming Events", icon: "event", path: "/admin/upcomingEvents" },
        { label: "Add New", icon: "add_box", path: "/admin/newEvent" },
      ],
    },
    {
      type: "section",
      label: "Users Management",
      items: [
        {
          label: "Students",
          icon: "event_available",
          path: "/admin/students",
        }
      ],
    },
 
    {
      type: "section",
      label: "Announcements",
      items: [
        {
          label: "Announcement Approvals",
          icon: "campaign",
          path: "/admin/announcementApprovals",
        },
        { label: "All Posts", icon: "campaign", path: "/admin/announcements" },
        { label: "Add New", icon: "post_add", path: "/admin/newAnnouncement" },
      ],
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="size-10 rounded-full overflow-hidden ring-2 ring-primary/30 shrink-0">
            <img
              src={SacliLogo}
              alt="SACLI Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-slate-900 dark:text-white text-base font-bold leading-tight">
              SACLIEventSys
            </h1>
            <p className="text-primary text-xs font-semibold">Admin Portal</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-violet-100 dark:border-violet-900/30 my-1" />

        <nav className="flex flex-col gap-1">
          {sidebarLinks.map((item, index) =>
            item.type === "link" ? (
              <a
                key={index}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all font-semibold text-sm ${
                  isActive(item.path)
                    ? "bg-primary text-white shadow-glow-primary"
                    : "text-slate-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary-light"
                }`}
                onClick={() => navigate(item.path)}
              >
                <span className="material-symbols-outlined text-xl">
                  {item.icon}
                </span>
                <p>{item.label}</p>
              </a>
            ) : (
              <div key={index} className="mt-3">
                <div className="flex items-center justify-between px-3 py-1 mb-1">
                  <span className="text-[10px] font-black text-primary/60 dark:text-primary-light/60 uppercase tracking-widest">
                    {item.label}
                  </span>
                </div>
                <div className="space-y-0.5">
                  {item.items.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer text-sm ${
                        isActive(subItem.path)
                          ? "bg-primary text-white shadow-glow-primary font-semibold"
                          : "text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary-light font-medium"
                      }`}
                      onClick={() => navigate(subItem.path)}
                    >
                      <span
                        className={`material-symbols-outlined text-xl ${isActive(subItem.path) ? "text-white" : "text-primary/50 dark:text-primary-light/50"}`}
                      >
                        {subItem.icon}
                      </span>
                      <p>{subItem.label}</p>
                    </a>
                  ))}
                </div>
              </div>
            ),
          )}
        </nav>
      </div>
    </>
  );
}
