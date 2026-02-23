export default function Announcement(){
    return (
      <>
        <div class="flex flex-col gap-8">
          <div class="flex flex-wrap justify-between items-center gap-3">
            <div class="flex flex-col gap-1">
              <p class="text-[#212529] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                Announcement Posts
              </p>
              <p class="text-[#6C757D] dark:text-slate-400 text-base font-normal leading-normal">
                Welcome, Admin! Here's a summary of school activities.
              </p>
            </div>
          </div>
          {/* <!-- Stats --> */}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
              <p class="text-[#6C757D] dark:text-slate-400 text-base font-medium leading-normal">
                Total Academic
              </p>
              <p class="text-[#212529] dark:text-white tracking-light text-3xl font-bold leading-tight">
                {/* {data?.totalPosts} */}
              </p>
            </div>
            <div class="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
              <p class="text-[#6C757D] dark:text-slate-400 text-base font-medium leading-normal">
                Total Holidays
              </p>
              <p class="text-[#212529] dark:text-white tracking-light text-3xl font-bold leading-tight">
                {/* {data?.totalAnnouncement} */}
              </p>
            </div>
            <div class="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
              <p class="text-[#6C757D] dark:text-slate-400 text-base font-medium leading-normal">
                Total Sports
              </p>
              <p class="text-[#212529] dark:text-white tracking-light text-3xl font-bold leading-tight">
                {/* {data?.totalEvents} */}
              </p>
            </div>
          </div>
         
        </div>
      </>
    );
}