export default function ModalEventDescription({ event, toggleModal }) {
  return (
    <div class="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center p-4">
      {/* <!-- Modal Overlay --> */}
      <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        {/* <!-- Modal Container --> */}
        <div class="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          {/* <!-- Header --> */}
          <header class="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <div class="flex items-center gap-3">
              <div class="bg-primary/10 p-2 rounded-lg text-primary">
                <span class="material-symbols-outlined text-2xl">
                  event_available
                </span>
              </div>
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">
                {event?.title}
              </h2>
            </div>
            <button
              onClick={() => toggleModal()}
              class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span class="material-symbols-outlined">close</span>
            </button>
          </header>
          {/* <!-- Modal Content (Scrollable) --> */}
          <div class="flex-1 overflow-y-auto px-6 py-4">
            {/* <!-- Section 1: Quick Info Strip --> */}
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-primary">
                  calendar_today
                </span>
                <div>
                  <p class="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                    Date
                  </p>
                  <p class="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {event?.date}
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-primary">
                  schedule
                </span>
                <div>
                  <p class="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                    Time
                  </p>
                  <p class="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {event?.time}
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-primary">
                  location_on
                </span>
                <div>
                  <p class="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                    Location
                  </p>
                  <p class="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {event?.location}
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- Section 2: Full Description --> */}
            <div class="space-y-6">
              <section>
                <h3 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                  About Event
                </h3>
                <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {event?.description}
                </p>
              </section>
            </div>

            {/* <!-- Footer --> */}
            <footer class="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => toggleModal()}
                class="px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all"
              >
                Close
              </button>
              <button class="px-6 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
                Go to Registration
                <span class="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
