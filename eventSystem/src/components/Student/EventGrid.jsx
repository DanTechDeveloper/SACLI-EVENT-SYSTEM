export default function EventGrid({ events }) {
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

  return (
    <>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event, index) => (
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
                    class={`${categoryColors[event.category] || "bg-gray-500"
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
                      {event.date} • {event.time}
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
                  <button class="text-sm font-semibold text-primary hover:underline">
                    View Details
                  </button>
                  <button class="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:brightness-110 active:scale-95 transition-all">
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            No events available.
          </div>
        )}
      </div>
    </>
  );
}
