export default function ApprovalModel({ toggleModal }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={toggleModal}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-[#1a202c] p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
        <button
          onClick={toggleModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
            <span className="material-symbols-outlined text-3xl">
              admin_panel_settings
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[#111318] dark:text-white">
            Login with Phone Number
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Secure access for students
          </p>
        </div>

        <form className="space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#111318] dark:text-gray-200 ml-1">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400 text-[20px]">
                  phone
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="tel"
                  placeholder="09123456789"
                  className="w-full rounded-lg border border-[#dbdee6] dark:border-gray-700 dark:bg-gray-800 dark:text-white h-12 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-400"
                />
                <button
                  type="button"
                  className="text-sm text-primary font-bold hover:underline hover:text-primary/80 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:no-underline"
                
                >
                  SEND OTP
                </button>
              </div>
            </div>
          </div>{" "}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#111318] dark:text-gray-200 ml-1">
              OTP
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400 text-[20px]">
                  lock
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  className="w-full rounded-lg border border-[#dbdee6] dark:border-gray-700 dark:bg-gray-800 dark:text-white h-12 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-400"
                />
                <button
                  type="button"
                  className="text-sm text-primary font-bold hover:underline hover:text-primary/80 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:no-underline"
                >
                  VERIFY OTP
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#111318] dark:text-gray-200 ml-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400 text-[20px]">
                  person
                </span>
              </div>
              <input
               
                required
                placeholder="Juan Dela Cruz"
                className="w-full rounded-lg border border-[#dbdee6] dark:border-gray-700 dark:bg-gray-800 dark:text-white h-12 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-400"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}