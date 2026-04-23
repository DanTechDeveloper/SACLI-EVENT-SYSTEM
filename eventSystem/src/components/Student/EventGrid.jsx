import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
export default function EventGrid({ events, userSession }) {
  const categoryColors = {
    Technology: "bg-indigo-500",
    Social: "bg-pink-500",
    Business: "bg-amber-500",
    Outdoors: "bg-emerald-500",
    Arts: "bg-purple-500",
    Programming: "bg-blue-500",
    Community: "bg-rose-500",
    Health: "bg-cyan-500",
    "School Activity": "bg-orange-500",
    "Campus Program": "bg-teal-500",
  };

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasBeenSelected, setHasBeenSelected] = useState(null);

  const selectedEventDetails = events?.tableRows.find(
    (event) => event.id === hasBeenSelected,
  ); // Replace with actual selected event logic

  const [activeFilter, setActiveFilter] = useState("all");
  const activeClass =
    "px-5 py-2.5 rounded-xl bg-primary text-white font-medium shadow-lg shadow-primary/20 flex items-center gap-2 transition-all";
  const inactiveClass =
    "px-5 py-2.5 rounded-xl bg-white dark:bg-primary/10 text-slate-600 dark:text-slate-300 hover:bg-primary/5 dark:hover:bg-primary/20 transition-all flex items-center gap-2 border border-transparent hover:border-primary/20";

  const filters = [
    { id: "all", label: "All Events", icon: "explore" },
    { id: "ongoingEvents", label: "Ongoing Events", icon: "timer" },
    { id: "pastEvents", label: "Past Events", icon: "history" },
    { id: "free", label: "Free", icon: "payments" },
    { id: "online", label: "Online", icon: "videocam" },
    { id: "upcoming_week", label: "This Week", icon: "today" },
    { id: "upcoming_this_year", label: "This Month", icon: "calendar_month" },
    { id: "upcoming_next_year", label: "Next Year", icon: "event_upcoming" },
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
              onClick={() => handleFilterClick(filter.id)}
              >
                <span class="material-icons-round text-lg">{filter.icon}</span>{" "}
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>
      <div>
        
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {fetchedEvents && (
          fetchedEvents.map((event, index) => (
            <div
            key={index}
            class="group bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 flex flex-col"
            >
              <div class="relative aspect-video overflow-hidden">
                <img
                  alt={event.title}
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZCyRuFu3jLTrcPY9td1ZKHtS5atPcDqpZycgL7_RfL5XnC69Nhz1hWdoIJxeHqdO05Ughv7B43IbJafbHTX6XJSqSB3lWxG7HEqJ2RjQAcxvuSfi4Xe6iMVDmNzW8i3YFtXu2ItGtnj8RO4nKy4oyQNWitZO7zt68qE6shJ-qX6fdPHaa6tlFfFQpvEiWmSQV8QB3mb7xSyLZQ_2nu2HY7uVv9V12dq0LceBC2jw-T-e87Kvs_uqGq9A0TwxIiLveNfAWfpxgSjU"
                  />
                <div class="absolute top-3 left-3">
                  <span
                    class={`${
                      categoryColors[event.category] || "bg-gray-500"
                    } text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider`}
                  >
                    {event.category}
                  </span>
                </div>
                <button class="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-all">
                  <span class="material-icons-round text-lg">
                    favorite_border
                  </span>
                </button>
              </div>
              <div class="p-5 flex-1 flex flex-col">
                <h3 class="text-xl font-bold mb-3 line-clamp-2 leading-tight">
                  {event.title}
                </h3>
                <div class="space-y-2 mt-auto">
                  <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                    <span class="material-icons-round text-base text-primary">
                      schedule
                    </span>
                    <span>
                      {event.date} • {event.time} - {event.time_end}
                    </span>
                  </div>
                  <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                    <span class="material-icons-round text-base text-primary">
                      location_on
                    </span>
                    <span>{event.location}</span>
                  </div>
                </div>
                <div class="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => {navigate('/viewDetails', {state: {event}})}}
                    class="text-sm font-semibold text-primary hover:underline"
                  >
                    
                    View Details
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/eventRegistration`, {
                        state: { event, userSession },
                      })
                    }
                    disabled={
                      event.timing_status === "Past" || Number(event.joined) === 1
                    }
                    class={`text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
                      Number(event.joined) === 1 || event.timing_status === "Past"
                        ? "bg-green-500 text-white cursor-not-allowed opacity-80"
                        : "bg-primary text-white hover:brightness-110 active:scale-95"
                    }`}
                  >
                    {event.timing_status === "Past"
                      ? "Event Ended"
                      : Number(event.joined) === 1
                        ? "Registered"
                        : "Register"}
                  </button>
                </div>
              </div>
            </div>
          ))
      )}
      </div>

     
    </>
  );
}
