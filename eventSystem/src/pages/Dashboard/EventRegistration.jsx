import { use } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EventRegistration() {
  const location = useLocation();
  const event = location.state?.event;
  const navigate = useNavigate();

  return (
    <div class="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100">
      {/* <!-- Top Navigation Bar --> */}
      <nav class="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center gap-2">
              <a
                class="flex items-center gap-2 text-primary font-semibold hover:opacity-80 transition-opacity"
                onClick={() => navigate("/studentView")}
              >

                  <span class="cursor-pointer material-symbols-outlined">
                    arrow_back
                  </span>
                  <span class="cursor-pointer">Back to Events</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main class="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* <!-- Header Section --> */}
        <div class="text-center mb-12">
          <h1 class="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
            {event?.title}
          </h1>
          <div class="flex flex-wrap justify-center items-center gap-4 text-slate-600 dark:text-slate-400 font-medium">
            <div class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-lg">
                calendar_today
              </span>
              <span>{event?.date}</span>
            </div>
            <span class="hidden sm:inline text-slate-300">|</span>
            <div class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-lg">schedule</span>
              <span>{event?.time}</span>
            </div>
            <span class="hidden sm:inline text-slate-300">|</span>
            <div class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-lg">location_on</span>
              <span>{event?.location}</span>
            </div>
          </div>
        </div>
        {/* <!-- Progress Indicator --> */}
        <div class="mb-10 max-w-xl mx-auto">
          <div class="flex justify-between items-end mb-3">
            <div>
              <span class="text-xs font-bold uppercase tracking-widest text-primary">
                Registration Status
              </span>
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">
                Step 1 of 2: Your Information
              </h2>
            </div>
            <span class="text-sm font-bold text-primary">50% Complete</span>
          </div>
          <div class="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              class="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: "50%" }}
            ></div>
          </div>
        </div>
        {/* <!-- Form Container --> */}
        <div class="bg-white dark:bg-slate-900/50 rounded-xl shadow-xl shadow-primary/5 border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div class="p-8 sm:p-10">
            <form class="space-y-6">
              {/* <!-- Full Name --> */}
              <div class="space-y-2">
                <label
                  class="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  for="full-name"
                >
                  Full Name
                </label>
                <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                    <span class="material-symbols-outlined text-xl">
                      person
                    </span>
                  </div>
                  <input
                    class="block w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400 opacity-75 cursor-not-allowed bg-slate-100"
                    id="full-name"
                    name="full-name"
                    placeholder="e.g. John Doe"
                    readonly="readonly"
                    type="text"
                    value="John Doe"
                  />
                </div>
              </div>
              {/* <!-- Email Address --> */}
              <div class="space-y-2">
                <label
                  class="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  for="email"
                >
                  Email Address
                </label>
                <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                    <span class="material-symbols-outlined text-xl">mail</span>
                  </div>
                  <input
                    class="block w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400 opacity-75 cursor-not-allowed bg-slate-100"
                    id="email"
                    name="email"
                    placeholder="e.g. john@example.com"
                    readonly="readonly"
                    type="email"
                    value="john@email.com"
                  />
                </div>
              </div>
              {/* <!-- Phone Number --> */}

              {/* <!-- Terms & Conditions --> */}
              <div class="pt-6 border-t border-slate-100 dark:border-slate-800">
                <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-6">
                  Additional Info (Optional)
                </h3>
                <div class="space-y-6">
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                      for="phone"
                    >
                      Phone Number
                    </label>
                    <div class="relative group">
                      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                        <span class="material-symbols-outlined text-xl">
                          call
                        </span>
                      </div>
                      <input
                        class="block w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                        id="phone"
                        name="phone"
                        placeholder="e.g. +1 (555) 000-0000"
                        type="tel"
                      />
                    </div>
                  </div>
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                      for="organization"
                    >
                      Organization
                    </label>
                    <div class="relative group">
                      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                        <span class="material-symbols-outlined text-xl">
                          corporate_fare
                        </span>
                      </div>
                      <input
                        class="block w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                        id="organization"
                        name="organization"
                        placeholder="e.g. Tech Corp"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                      for="notes"
                    >
                      Notes / Remarks
                    </label>
                    <textarea
                      class="block w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400 min-h-[120px]"
                      id="notes"
                      name="notes"
                      placeholder="Any special requirements or comments..."
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="pt-4">
                <label class="flex items-start gap-3 cursor-pointer group">
                  <div class="relative flex items-center mt-1">
                    <input
                      class="peer h-5 w-5 rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary/20 transition-all cursor-pointer bg-white dark:bg-slate-800"
                      type="checkbox"
                    />
                  </div>
                  <span class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                    I agree to the{" "}
                    <a
                      class="text-primary font-medium underline underline-offset-4 decoration-primary/30 hover:decoration-primary"
                      href="#"
                    >
                      Terms &amp; Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      class="text-primary font-medium underline underline-offset-4 decoration-primary/30 hover:decoration-primary"
                      href="#"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
              </div>
            </form>
          </div>
          {/* <!-- Action Buttons Footer --> */}
          <div class="px-8 py-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row-reverse gap-3 items-center">
            <button class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-white font-bold text-sm tracking-wide hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all">
              Next Step
              <span class="material-symbols-outlined ml-2 text-lg">
                arrow_forward
              </span>
            </button>
            <button class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-lg bg-white dark:bg-transparent border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all">
              Cancel
            </button>
          </div>
        </div>
        {/* <!-- Decorative Elements --> */}
        <div class="mt-12 text-center">
          <p class="text-xs text-slate-400 dark:text-slate-600 font-medium">
            Need help? Contact support at{" "}
            <a
              class="text-primary hover:underline"
              href="mailto:events@techinnovation.com"
            >
              events@techinnovation.com
            </a>
          </p>
        </div>
      </main>
      {/* <!-- Background Decoration --> */}
      <div class="fixed top-0 right-0 -z-10 opacity-20 pointer-events-none overflow-hidden">
        <div class="w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -mr-48 -mt-48"></div>
      </div>
      <div class="fixed bottom-0 left-0 -z-10 opacity-20 pointer-events-none overflow-hidden">
        <div class="w-[400px] h-[400px] bg-primary/30 rounded-full blur-[100px] -ml-32 -mb-32"></div>
      </div>
    </div>
  );
}
