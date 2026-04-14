import { useState } from "react";
export default function EventFilter() {
  const [activeFilter, setActiveFilter] = useState("all");
  const activeClass =
    "px-5 py-2.5 rounded-xl bg-primary text-white font-medium shadow-lg shadow-primary/20 flex items-center gap-2 transition-all";
  const inactiveClass =
    "px-5 py-2.5 rounded-xl bg-white dark:bg-primary/10 text-slate-600 dark:text-slate-300 hover:bg-primary/5 dark:hover:bg-primary/20 transition-all flex items-center gap-2 border border-transparent hover:border-primary/20";

  const filters = [
    { id: "all", label: "All Events", icon: "explore" },
    { id: "weekend", label: "This Weekend", icon: "calendar_today" },
    { id: "free", label: "Free", icon: "payments" },
    { id: "online", label: "Online", icon: "videocam" },
  ];

  return (
    <>
      <section class="mb-10">
        <div class="flex flex-col gap-6">
          <div class="flex items-center justify-between">
            <h2 class="text-3xl font-bold">Discover Events</h2>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                class={activeFilter === filter.id ? activeClass : inactiveClass}
                onClick={() => setActiveFilter(filter.id)}
              >
                <span class="material-icons-round text-lg">{filter.icon}</span>{" "}
                {filter.label}
              </button>
            ))}
            <div class="h-6 w-px bg-slate-300 dark:bg-slate-700 mx-2"></div>
            <button class={inactiveClass}>
              <span class="material-icons-round text-lg">filter_list</span>{" "}
              Advanced Filters
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
