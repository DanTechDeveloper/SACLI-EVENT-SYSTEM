import { Outlet } from "react-router-dom";
import StudentHeader from "../components/Student/StudentHeader";
export default function StudentLayout() {
  return (
    <>
      <div className="font-display bg-background-light dark:bg-background-dark">
        <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
          <div className="layout-container flex h-full grow flex-col">
            <StudentHeader />
            <main class="flex flex-1 justify-center py-5 sm:py-8 lg:py-10">
              <div class="layout-content-container flex flex-col w-full max-w-4xl px-4 md:px-0">
                {/* <!-- PageHeading --> */}
                <div class="flex flex-wrap justify-between items-center gap-4 p-4">
                  <h1 class="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
                    Notices &amp; Events
                  </h1>
                </div>
                {/* <!-- Toolbar & Filters --> */}
                <div class="flex flex-col sm:flex-row justify-between gap-3 px-4 py-3">
                  <div class="flex gap-2 items-center flex-wrap">
                    <button class="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-primary pl-4 pr-3 text-white text-sm font-medium leading-normal">
                      <span>All</span>
                      <span class="material-symbols-outlined !text-xl">
                        expand_more
                      </span>
                    </button>
                    <button class="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 pl-4 pr-3 text-gray-800 dark:text-gray-300">
                      <p class="text-sm font-medium leading-normal">Academic</p>
                    </button>
                    <button class="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 pl-4 pr-3 text-gray-800 dark:text-gray-300">
                      <p class="text-sm font-medium leading-normal">Events</p>
                    </button>
                    <button class="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 pl-4 pr-3 text-gray-800 dark:text-gray-300">
                      <p class="text-sm font-medium leading-normal">Admin</p>
                    </button>
                    <button class="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 pl-4 pr-3 text-gray-800 dark:text-gray-300">
                      <p class="text-sm font-medium leading-normal">Holidays</p>
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
                        class="block w-full h-10 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-10 pr-3 text-sm text-gray-900 dark:text-gray-200 focus:border-primary focus:ring-primary"
                        placeholder="Search notices..."
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                {/* <!-- Notices List --> */}
                <div class="flex flex-col gap-4 p-4">
                  {/* <!-- Card 1 --> */}
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
                          The official schedule for the upcoming midterm
                          examinations for all departments has been released.
                          Please review the dates and venues carefully.
                        </p>
                      </div>
                      <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal w-fit">
                        <span class="truncate">Read More</span>
                      </button>
                    </div>
                    <div
                      class="w-full sm:w-1/3 flex-shrink-0 bg-center bg-no-repeat aspect-video sm:aspect-square bg-cover rounded-lg"
                      data-alt="Illustration of books and a graduation cap"
                      // style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAHYAOsyDROWm_hdzss25wPojlncLSxTriPVZD0b0M2bifMm6uW0Oc3Zt48QC3sr4aq_hLUk61OeWUzdYzKRjBSptWisBBoPLLPc4jYXqAHy8sSXxxxcFA87J8l_b-6bXldeigaLFPvl_TtneC5dslp4AWBnbnBKBhCDE-oAU4nKxnAfCR-xakWg7dePRQlV3AgqrFoEp5_rjsmjWTZoYxJG7YokpoIyc9WJPw6ZZgg5OA1gHBokKPIzdHfJcIDoseK5SV1QWtwiF6V");'
                    ></div>
                  </div>
                  {/* <!-- Card 2 --> */}
                  <div class="flex flex-col sm:flex-row items-stretch justify-between gap-6 rounded-xl bg-white dark:bg-gray-800/50 p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div class="flex flex-[2_2_0px] flex-col gap-3">
                      <div class="flex flex-col gap-1.5">
                        <div class="flex items-center gap-3">
                          <p class="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">
                            OCT 22
                          </p>
                          <span class="inline-flex items-center rounded-full bg-red-100 dark:bg-red-900/40 px-2.5 py-0.5 text-xs font-semibold text-red-800 dark:text-red-200">
                            Campus Events
                          </span>
                        </div>
                        <p class="text-gray-900 dark:text-white text-lg font-bold leading-tight">
                          University Foundation Day Celebration
                        </p>
                        <p class="text-gray-600 dark:text-gray-300 text-sm font-normal leading-normal">
                          Join us for a week-long celebration of our
                          university's founding anniversary. Various activities
                          and competitions are lined up for everyone!
                        </p>
                      </div>
                      <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal w-fit">
                        <span class="truncate">View Program</span>
                      </button>
                    </div>
                    <div
                      class="w-full sm:w-1/3 flex-shrink-0 bg-center bg-no-repeat aspect-video sm:aspect-square bg-cover rounded-lg"
                      data-alt="Colorful confetti celebrating an event"
                      // style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDAJ7hkQt_Uh241Y9Fu4MwsgVkuPe3kTmm4AncHo57elGrB0SHhySkualpP0I7zplHK9d20uBk_w37J02y8Paxk92j8bCD-_Rjol40JC7v4WutVd4MxtQ77MbWFZBE5ANWkvfYhd4i-OEUTWBNtB0-hye_foZpwf3xFpN6vny77ygejzUAMzvaKoHABD_K87y-PSiWd-lIWT2vfGjN4KryEX3IDNcp5xntBHC4ucEBPwVooG_3bH_5-NBfoBDIWECG6YYE3w-D8doKH");'
                    ></div>
                  </div>
                  {/* <!-- Card 3 --> */}
                  <div class="flex flex-col sm:flex-row items-stretch justify-between gap-6 rounded-xl bg-white dark:bg-gray-800/50 p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div class="flex flex-[2_2_0px] flex-col gap-3">
                      <div class="flex flex-col gap-1.5">
                        <div class="flex items-center gap-3">
                          <p class="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">
                            OCT 20
                          </p>
                          <span class="inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-900/40 px-2.5 py-0.5 text-xs font-semibold text-yellow-800 dark:text-yellow-200">
                            Administration
                          </span>
                        </div>
                        <p class="text-gray-900 dark:text-white text-lg font-bold leading-tight">
                          Enrollment for Second Semester AY 2023-2024
                        </p>
                        <p class="text-gray-600 dark:text-gray-300 text-sm font-normal leading-normal">
                          The enrollment period for the second semester will be
                          from November 6 to 17, 2023. Please settle all
                          accounts before proceeding with enrollment.
                        </p>
                      </div>
                      <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal w-fit">
                        <span class="truncate">See Guidelines</span>
                      </button>
                    </div>
                    <div
                      class="w-full sm:w-1/3 flex-shrink-0 bg-center bg-no-repeat aspect-video sm:aspect-square bg-cover rounded-lg"
                      data-alt="A person filling out a form on a clipboard"
                      // style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAsVriGXHsMU2cibZvIMMXeJla-A1uwiweYUF3-t59VTT8wRk74aLXyZw_N5dXMe696QzvSWzG_A51b9eoNfPZvv51qYWWCTQDP57uk4rGLpZzvZF1NLPynn-TuqtSZ58VwYrPqZlGRDW3L_0c3QoAIf0AMsn1QNUxg2Bm0hLn3-2euBqtJ02r7TRSfeQs11u9UVrboKK9GYP5mUn7ZOIxVXECHAVM-18jSYdaWIa3tq_afUbW7BRNgKM0e-DcYOnp5BXzrO0Y4he3H");'
                    ></div>
                  </div>
                  {/* <!-- Card 4 --> */}
                  <div class="flex flex-col sm:flex-row items-stretch justify-between gap-6 rounded-xl bg-white dark:bg-gray-800/50 p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div class="flex flex-[2_2_0px] flex-col gap-3">
                      <div class="flex flex-col gap-1.5">
                        <div class="flex items-center gap-3">
                          <p class="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">
                            OCT 18
                          </p>
                          <span class="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/40 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:text-green-200">
                            Sports
                          </span>
                        </div>
                        <p class="text-gray-900 dark:text-white text-lg font-bold leading-tight">
                          Intramurals 2023 Schedule and Venues
                        </p>
                        <p class="text-gray-600 dark:text-gray-300 text-sm font-normal leading-normal">
                          Get ready for this year's Intramurals! Check out the
                          full schedule of games, venues, and team brackets.
                          Show your support for your department!
                        </p>
                      </div>
                      <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal w-fit">
                        <span class="truncate">Download Schedule</span>
                      </button>
                    </div>
                    <div
                      class="w-full sm:w-1/3 flex-shrink-0 bg-center bg-no-repeat aspect-video sm:aspect-square bg-cover rounded-lg"
                      data-alt="Basketball on a court floor"
                      // style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCTnUjKrsg4eaHzZhIb9Tra4ivPnTXEsEB4TU5BHDbQOefiC_Q8x9DvUywQkWNqHGpx56zwWKLxSSNxuhAceXiOk63ZKcrPokBuLKh_RavgIeXw63zqnNiciFt5PjqSzZ4bO-jMsLSPq1rc9YLkuvYrIENHu5Pfjxh4314Mx03GuN4M0UY_y3dVt7ewRj4X7OhBxIKyLvASEqkpRIQvXR03uErGDoSAPhPnex9YEx42I4MMWkXLyPi2D5EBIAQTmk5QldVN1CRkMlES");'
                    ></div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
