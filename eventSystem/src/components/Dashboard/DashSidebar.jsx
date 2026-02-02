import SacliLogo from "../../assets/logo.jpg"
export default function DashSidebar() {
  return (
    <>
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-3">
          <div
            class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            data-alt="Official school crest"
          >
            <img src={SacliLogo} alt="" />
          </div>
          <div class="flex flex-col">
            <h1 class="text-[#212529] dark:text-white text-base font-bold leading-normal">
              SACLIEventSys
            </h1>
            <p class="text-[#6C757D] dark:text-slate-400 text-sm font-normal leading-normal">
              Admin Portal
            </p>
          </div>
        </div>
        <nav class="flex flex-col gap-2 mt-4">
          <a
            class="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary dark:bg-primary/20"
            href="dashboard.php"
          >
            <span class="material-symbols-outlined fill">dashboard</span>
            <p class="text-sm font-semibold leading-normal">Dashboard</p>
          </a>
          <div class="">
            <div class="flex items-center justify-between px-3 py-1 mb-1">
              <span class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Events Management
              </span>
              <span class="material-symbols-outlined text-slate-500 text-xs">
                expand_more
              </span>
            </div>
            <div class="space-y-1">
              <a
                class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group"
                href="#"
              >
                <span class="material-symbols-outlined text-slate-500 group-hover:text-indigo-400">
                  calendar_month
                </span>
                <p class="text-sm font-medium">All Events</p>
              </a>
              <a
                class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group"
                href="#"
              >
                <span class="material-symbols-outlined text-slate-500 group-hover:text-indigo-400 pl-1">
                  upcoming
                </span>
                <p class="text-sm font-medium">Upcoming</p>
              </a>
              <a
                class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group"
                href="#"
              >
                <span class="material-symbols-outlined text-slate-500 group-hover:text-indigo-400">
                  add_box
                </span>
                <p class="text-sm font-medium">Add New</p>
              </a>
            </div>
          </div>
          <div class="">
            <div class="flex items-center justify-between px-3 py-1 mb-1">
              <span class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Announcements
              </span>
              <span class="material-symbols-outlined text-slate-500 text-xs">
                expand_more
              </span>
            </div>
            <div class="space-y-1">
              <a
                class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group"
                href="#"
              >
                <span class="material-symbols-outlined text-slate-500 group-hover:text-indigo-400">
                  campaign
                </span>
                <p class="text-sm font-medium">All Posts</p>
              </a>
              <a
                class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group"
                href="#"
              >
                <span class="material-symbols-outlined text-slate-500 group-hover:text-indigo-400 pl-1">
                  check_circle
                </span>
                <p class="text-sm font-medium">Published</p>
              </a>
              <a
                class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group"
                href="#"
              >
                <span class="material-symbols-outlined text-slate-500 group-hover:text-indigo-400">
                  post_add
                </span>
                <p class="text-sm font-medium">Add New</p>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
