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
      path: "/dashboard",
    },
    {
      type: "section",
      label: "Events Management",
      items: [
        { label: "All Events", icon: "calendar_month", path: "/events" },
        {
          label: "Upcoming",
          icon: "upcoming",
          path: "/upcoming",
          iconClass: "pl-1",
        },
        { label: "Add New", icon: "add_box", path: "/newEvent" },
      ],
    },
    {
      type: "section",
      label: "Announcements",
      items: [
        { label: "All Posts", icon: "campaign", path: "/announcements" },
        {
          label: "Published",
          icon: "check_circle",
          path: "/announcements/published",
          iconClass: "pl-1",
        },
        { label: "Add New", icon: "post_add", path: "/newAnnouncement" },
      ],
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            data-alt="Official school crest"
          >
            <img src={SacliLogo} alt="" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-[#212529] dark:text-white text-base font-bold leading-normal">
              SACLIEventSys
            </h1>
            <p className="text-[#6C757D] dark:text-slate-400 text-sm font-normal leading-normal">
              Admin Portal
            </p>
          </div>
        </div>
        <nav className="flex flex-col gap-2 mt-4">
          {sidebarLinks.map((item, index) =>
            item.type === "link" ? (
              <a
                key={index}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  isActive(item.path)
                    ? "bg-primary/10 text-primary dark:bg-primary/20 font-semibold"
                    : "hover:bg-slate-800 hover:text-white transition-colors group"
                }`}
                onClick={() => navigate(item.path)}
              >
                <span className="material-symbols-outlined fill">
                  {item.icon}
                </span>
                <p className="text-sm font-semibold leading-normal">
                  {item.label}
                </p>
              </a>
            ) : (
              <div key={index}>
                <div className="flex items-center justify-between px-3 py-1 mb-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    {item.label}
                  </span>
                  <span className="material-symbols-outlined text-slate-500 text-xs">
                    expand_more
                  </span>
                </div>
                <div className="space-y-1">
                  {item.items.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group cursor-pointer ${
                        isActive(subItem.path)
                          ? "bg-primary/10 text-primary dark:bg-primary/20 font-semibold"
                          : "hover:bg-slate-800 hover:text-white"
                      }`}
                      onClick={() => navigate(subItem.path)}
                    >
                      <span
                        className={`material-symbols-outlined text-slate-500 group-hover:text-indigo-400 ${
                          subItem.iconClass || ""
                        }`}
                      >
                        {subItem.icon}
                      </span>
                      <p className="text-sm font-medium">{subItem.label}</p>
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
