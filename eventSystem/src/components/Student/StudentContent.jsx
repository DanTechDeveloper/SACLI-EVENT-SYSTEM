export function StudentContent({ content }) {
  return (
    <>
      <div class="flex p-4 flex-col mt-[20px] ml-[30px] w-full gap-3">
        <h1 class="text-gray-900 text-4xl font-black">Announcement</h1>
        <div class="flex flex-col sm:flex-row justify-between gap-3 px- py-3">
          <div class="flex gap-2 items-center flex-wrap">
            <button class="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 pl-4 pr-3 text-gray-800 dark:text-gray-300">
              <p class="text-sm font-medium leading-normal">All Announcement</p>
            </button>
            <button class="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 pl-4 pr-3 text-gray-800 dark:text-gray-300">
              <p class="text-sm font-medium leading-normal">Academic</p>
            </button>
            <button class="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 pl-4 pr-3 text-gray-800 dark:text-gray-300">
              <p class="text-sm font-medium leading-normal">Holiday</p>
            </button>
            <button class="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 pl-4 pr-3 text-gray-800 dark:text-gray-300">
              <p class="text-sm font-medium leading-normal">Sports</p>
            </button>
          </div>
          <div class="flex gap-2">
            <div class="relative w-full max-w-xs">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span class="material-symbols-outlined text-gray-500 dark:text-gray-400">
                  search
                </span>
              </div>
              <input
                placeholder="Search notices..."
                type="text"
                class="block w-full h-10 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-10 pr-3 text-sm text-gray-900 dark:text-gray-200 focus:border-primary focus:ring-primary ml-"
              />
            </div>
          </div>
        </div>
         {content?.data?.map((values,key) => (
           <div key={key} class="mb-3 group bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark p-3 shadow-sm hover:shadow-md transition-all">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-3">
                  <span class="px-3 py-1 bg-primary text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                    {values.category || "Announcement"}
                  </span>
                </div>
                <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {values.title}
                </h3>
                <p class="whitenowrap text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-2xl">
                  {values.content}
                </p>
              </div>
            </div>
          </div>
          ))}
  
      
        <h1 class="text-gray-900 text-4xl font-black">Events</h1>
        <div class="flex flex-col sm:flex-row justify-between gap-3 px- py-3">
          <div class="flex gap-2 items-center flex-wrap">
            <button class="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 pl-4 pr-3 text-gray-800 dark:text-gray-300">
              <p class="text-sm font-medium leading-normal">All Events</p>
            </button>
            <button class="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 pl-4 pr-3 text-gray-800 dark:text-gray-300">
              <p class="text-sm font-medium leading-normal">Ongoing</p>
            </button>
            <button class="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 pl-4 pr-3 text-gray-800 dark:text-gray-300">
              <p class="text-sm font-medium leading-normal">Upcoming</p>
            </button>
            <button class="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 pl-4 pr-3 text-gray-800 dark:text-gray-300">
              <p class="text-sm font-medium leading-normal">Finished</p>
            </button>
          </div>
          <div class="flex gap-2">
            <div class="relative w-full max-w-xs">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span class="material-symbols-outlined text-gray-500 dark:text-gray-400">
                  search
                </span>
              </div>
              <input
                placeholder="Search notices..."
                type="text"
                class="block w-full h-10 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-10 pr-3 text-sm text-gray-900 dark:text-gray-200 focus:border-primary focus:ring-primary ml-"
              />
            </div>
          </div>
        </div>
        <div class="grid-cols-3 gap-4 grid">
          <div id="ia1uf">
            <div class="flex flex-col sm:flex-row items-stretch justify-between gap-6 rounded-xl bg-white dark:bg-gray-800/50 p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div class="flex flex-[2_2_0px] flex-col gap-3">
                <div class="flex flex-col gap-1.5">
                  <div class="flex items-center gap-3">
                    <p class="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">
                      OCT 25
                    </p>
                    <span class="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/40 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:text-blue-200">
                      Academics
                    </span>
                  </div>
                  <p class="text-gray-900 dark:text-white text-lg font-bold leading-tight">
                    Midterm Examination Schedule
                  </p>
                  <p class="text-gray-600 dark:text-gray-300 text-sm font-normal leading-normal">
                    The official schedule for the upcoming midterm examinations
                    for all departments has been released. Please review the
                    dates and venues carefully.
                  </p>
                </div>
                <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal w-fit">
                  <span class="truncate">Read More</span>
                </button>
              </div>
            </div>
          </div>
          <div id="iydec">
            <div class="flex flex-col sm:flex-row items-stretch justify-between gap-6 rounded-xl bg-white dark:bg-gray-800/50 p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div class="flex flex-[2_2_0px] flex-col gap-3">
                <div class="flex flex-col gap-1.5">
                  <div class="flex items-center gap-3">
                    <p class="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">
                      OCT 25
                    </p>
                    <span class="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/40 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:text-blue-200">
                      Academics
                    </span>
                  </div>
                  <p class="text-gray-900 dark:text-white text-lg font-bold leading-tight">
                    Midterm Examination Schedule
                  </p>
                  <p class="text-gray-600 dark:text-gray-300 text-sm font-normal leading-normal">
                    The official schedule for the upcoming midterm examinations
                    for all departments has been released. Please review the
                    dates and venues carefully.
                  </p>
                </div>
                <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal w-fit">
                  <span class="truncate">Read More</span>
                </button>
              </div>
            </div>
          </div>
          <div id="iwkfq">
            <div class="flex flex-col sm:flex-row items-stretch justify-between gap-6 rounded-xl bg-white dark:bg-gray-800/50 p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div class="flex flex-[2_2_0px] flex-col gap-3">
                <div class="flex flex-col gap-1.5">
                  <div class="flex items-center gap-3">
                    <p class="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">
                      OCT 25
                    </p>
                    <span class="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/40 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:text-blue-200">
                      Academics
                    </span>
                  </div>
                  <p class="text-gray-900 dark:text-white text-lg font-bold leading-tight">
                    Midterm Examination Schedule
                  </p>
                  <p class="text-gray-600 dark:text-gray-300 text-sm font-normal leading-normal">
                    The official schedule for the upcoming midterm examinations
                    for all departments has been released. Please review the
                    dates and venues carefully.
                  </p>
                </div>
                <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal w-fit">
                  <span class="truncate">Read More</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
