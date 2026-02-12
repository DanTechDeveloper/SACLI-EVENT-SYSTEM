export default function EventFilter() {
  return (
    <>
      <section class="mb-10">
        <div class="flex flex-col gap-6">
          <div class="flex items-center justify-between">
            <h2 class="text-3xl font-bold">Discover Events</h2>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <button class="px-5 py-2.5 rounded-xl bg-primary text-white font-medium shadow-lg shadow-primary/20 flex items-center gap-2 transition-all">
              <span class="material-icons-round text-lg">explore</span> All
              Events
            </button>
            <button class="px-5 py-2.5 rounded-xl bg-white dark:bg-primary/10 text-slate-600 dark:text-slate-300 hover:bg-primary/5 dark:hover:bg-primary/20 transition-all flex items-center gap-2 border border-transparent hover:border-primary/20">
              <span class="material-icons-round text-lg">calendar_today</span>{" "}
              This Weekend
            </button>
            <button class="px-5 py-2.5 rounded-xl bg-white dark:bg-primary/10 text-slate-600 dark:text-slate-300 hover:bg-primary/5 dark:hover:bg-primary/20 transition-all flex items-center gap-2 border border-transparent hover:border-primary/20">
              <span class="material-icons-round text-lg">payments</span> Free
            </button>
            <button class="px-5 py-2.5 rounded-xl bg-white dark:bg-primary/10 text-slate-600 dark:text-slate-300 hover:bg-primary/5 dark:hover:bg-primary/20 transition-all flex items-center gap-2 border border-transparent hover:border-primary/20">
              <span class="material-icons-round text-lg">videocam</span> Online
            </button>
            <div class="h-6 w-px bg-slate-300 dark:bg-slate-700 mx-2"></div>
            <button class="px-5 py-2.5 rounded-xl bg-white dark:bg-primary/10 text-slate-600 dark:text-slate-300 hover:bg-primary/5 dark:hover:bg-primary/20 transition-all flex items-center gap-2 border border-transparent hover:border-primary/20">
              <span class="material-icons-round text-lg">filter_list</span>{" "}
              Advanced Filters
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
