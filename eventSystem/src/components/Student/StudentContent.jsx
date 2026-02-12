import { useState } from "react";

export function StudentContent({event}) {
  // debugger;
  const [eventFilter, setEventFilter] = useState("Ongoing Event");

  return (
    <>
      <div class="flex p-4 flex-col mt-[20px] ml-[30px] w-full gap-3">
        <h1 class="text-gray-900 text-4xl font-black">Events</h1>
        <div class="flex flex-col sm:flex-row justify-between gap-3 px- py-3">
          {/* <div class="flex gap-2 items-center flex-wrap">
            <button onClick={} class={`flex h-10 items-center justify-center gap-x-2 rounded-lg pl-4 pr-3 text-sm font-medium leading-normal transition-colors ${eventFilter === "Ongoing Event" ? "bg-primary text-white" : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300"}`}>
              <p class="text-sm font-medium leading-normal">Ongoing</p>
            </button>
            <button onClick={} class={`flex h-10 items-center justify-center gap-x-2 rounded-lg pl-4 pr-3 text-sm font-medium leading-normal transition-colors ${eventFilter === "Upcoming Event" ? "bg-primary text-white" : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300"}`}>
              <p class="text-sm font-medium leading-normal">Upcoming</p>
            </button>
            <button onClick={} class={`flex h-10 items-center justify-center gap-x-2 rounded-lg pl-4 pr-3 text-sm font-medium leading-normal transition-colors ${eventFilter === "Completed Event" ? "bg-primary text-white" : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300"}`}>
              <p class="text-sm font-medium leading-normal">Finished</p>
            </button>
          </div> */}
          <div class="flex gap-2">
            <div class="relative w-full max-w-xs">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span class="material-symbols-outlined text-gray-500 dark:text-gray-400">
                  search
                </span>
              </div>
              <input
                placeholder="Search events..."
                type="text"
                class="block w-full h-10 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-10 pr-3 text-sm text-gray-900 dark:text-gray-200 focus:border-primary focus:ring-primary ml-"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* {filteredEvents?.map((values, key) => (
            <div
              key={key}
              className="flex flex-col justify-between gap-6 rounded-xl bg-white dark:bg-gray-800/50 p-4 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col gap-3 h-full">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-3">
                      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">
                        {values.date || "OCT 25"}
                      </p>
                      <span class="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/40 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:text-blue-200">
                        {values.subtype}
                      </span>
                    </div>
                    <p className="text-gray-900 dark:text-white text-lg font-bold leading-tight">
                      {values.title}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm font-normal leading-normal">
                      {values.content}
                    </p>
                  </div>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal w-fit mt-auto">
                    <span className="truncate">Read More</span>
                  </button>
                </div>
              </div>
          ))} */}
        </div>
      </div>
    </>
  );
}
