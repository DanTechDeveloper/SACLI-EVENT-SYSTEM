import { useState } from "react";

export default function AuthAdmin({ toggleModal }) {
  const [showPassword, setShowPassword] = useState(false);

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
            Admin Portal
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Secure access for system administrators
          </p>
        </div>

        <form className="space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#111318] dark:text-gray-200 ml-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400 text-[20px]">
                  mail
                </span>
              </div>
              <input
                type="email"
                placeholder="admin@sacli.edu.ph"
                className="w-full rounded-lg border border-[#dbdee6] dark:border-gray-700 dark:bg-gray-800 dark:text-white h-12 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#111318] dark:text-gray-200 ml-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400 text-[20px]">
                  lock
                </span>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-lg border border-[#dbdee6] dark:border-gray-700 dark:bg-gray-800 dark:text-white h-12 pl-10 pr-12 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? "visibility" : "visibility_off"}
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-6 rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 mt-4"
          >
            <span>Login to Dashboard</span>
            <span className="material-symbols-outlined text-lg">login</span>
          </button>
        </form>
      </div>
    </div>
  );
}
