import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EventGrid({ events, userSession }) {
  const categoryColors = {
    Technology:       "bg-indigo-500",
    Social:           "bg-pink-500",
    Business:         "bg-amber-500",
    Outdoors:         "bg-emerald-500",
    Arts:             "bg-purple-500",
    Programming:      "bg-blue-500",
    Community:        "bg-rose-500",
    Health:           "bg-cyan-500",
    "School Activity":"bg-orange-500",
    "Campus Program": "bg-teal-500",
  };

  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  const activeClass =
    "px-5 py-2.5 rounded-xl bg-primary text-white font-semibold shadow-glow-primary flex items-center gap-2 transition-all text-sm";
  const inactiveClass =
    "px-5 py-2.5 rounded-xl bg-white dark:bg-surface-dark text-slate-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary-light transition-all flex items-center gap-2 border border-violet-100 dark:border-violet-900/40 text-sm font-medium";

  const filters = [
    { id: "all",                label: "All Events",     icon: "explore" },
    { id: "ongoingEvents",     label: "Ongoing",         icon: "timer" },
    { id: "pastEvents",        label: "Past Events",     icon: "history" },
    { id: "free",              label: "Free",            icon: "payments" },
    { id: "online",            label: "Online",          icon: "videocam" },
    { id: "upcoming_week",     label: "This Week",       icon: "today" },
    { id: "upcoming_this_year",label: "This Month",      icon: "calendar_month" },
    { id: "upcoming_next_year",label: "Next Year",       icon: "event_upcoming" },
  ];

  const [fetchedEvents, setFetchedEvents] = useState([]);

  useEffect(() => {
    if (events?.tableRows) {
      setFetchedEvents(events.tableRows);
    }
  }, [events]);

  const handleFilterClick = async (filterId) => {
    setActiveFilter(filterId);
    try {
      const res = await fetch(
        `http://localhost/IPTFINALPROJECT/eventSystem/src/backend/Student/Event.php?filter=${filterId}`,
        { credentials: "include" },
      );
      const data = await res.json();
      if (data.success) {
        setFetchedEvents(data.data.tableRows);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {/* ── Filter bar ── */}
      <section className="mb-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Discover Events
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={activeFilter === filter.id ? activeClass : inactiveClass}
                onClick={() => handleFilterClick(filter.id)}
              >
                <span className="material-icons-round text-[18px]">{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Event cards grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {fetchedEvents && fetchedEvents.map((event, index) => (
          <div
            key={index}
            className="group bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-violet-100 dark:border-violet-900/40 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 flex flex-col card-hover"
          >
            {/* Image */}
            <div className="relative aspect-video overflow-hidden">
              <img
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZCyRuFu3jLTrcPY9td1ZKHtS5atPcDqpZycgL7_RfL5XnC69Nhz1hWdoIJxeHqdO05Ughv7B43IbJafbHTX6XJSqSB3lWxG7HEqJ2RjQAcxvuSfi4Xe6iMVDmNzW8i3YFtXu2ItGtnj8RO4nKy4oyQNWitZO7zt68qE6shJ-qX6fdPHaa6tlFfFQpvEiWmSQV8QB3mb7xSyLZQ_2nu2HY7uVv9V12dq0LceBC2jw-T-e87Kvs_uqGq9A0TwxIiLveNfAWfpxgSjU"
              />
              <div className="absolute top-3 left-3">
                <span
                  className={`${
                    categoryColors[event.category] || "bg-gray-500"
                  } text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow`}
                >
                  {event.category}
                </span>
              </div>
              <button className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-secondary transition-all">
                <span className="material-icons-round text-lg">favorite_border</span>
              </button>
            </div>

            {/* Body */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-base font-bold mb-3 line-clamp-2 leading-tight text-slate-900 dark:text-white">
                {event.title}
              </h3>
              <div className="space-y-1.5 mt-auto">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
                  <span className="material-icons-round text-sm text-primary">schedule</span>
                  <span>{event.date} • {event.time} - {event.time_end}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
                  <span className="material-icons-round text-sm text-primary">location_on</span>
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 pt-4 border-t border-violet-100 dark:border-violet-900/30 flex items-center justify-between gap-2">
                <button
                  onClick={() => navigate("/viewDetails", { state: { event, userSession } })}
                  className="text-sm font-semibold text-primary dark:text-primary-light hover:underline"
                >
                  View Details
                </button>
                <button
                  onClick={() => navigate("/eventRegistration", { state: { event, userSession } })}
                  disabled={event.timing_status === "Past" || event.joined === "joined"}
                  className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${
                    event.joined === "joined" || event.timing_status === "Past"
                      ? "bg-success/20 text-success cursor-not-allowed"
                      : "bg-primary text-white hover:brightness-110 active:scale-95 shadow-glow-primary"
                  }`}
                >
                  {event.timing_status === "Past"
                    ? "Event Ended"
                    : event.joined === "joined"
                      ? "✓ Registered"
                      : "Register"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
