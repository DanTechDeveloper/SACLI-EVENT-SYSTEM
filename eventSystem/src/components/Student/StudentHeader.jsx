import SacliLogo from "../../assets/logo.jpg";
export default function StudentHeader() {
  return (
    <>
      <header class="fixed w-full flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-700/60 px-4 md:px-8 lg:px-10 py-3 bg-white dark:bg-background-dark/50 backdrop-blur-sm top-0 z-10">
        <div class="flex items-center gap-4 text-gray-900 dark:text-white">
          <div class="size-6 text-primary">
            <img src={SacliLogo} alt=""/>
          </div>
          <h2 class="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            SACLIEventSys
          </h2>
        </div>
        <div class="flex flex-1 justify-end items-center gap-4">
          <nav class="hidden lg:flex items-center gap-9">
            <div class="relative">
              <button
                onclick="toggleProfileMenu()"
                class="flex items-center gap-2 text-sm font-bold text-[#111318] dark:text-white hover:text-primary transition-colors group focus:outline-none"
              >
                <div class="size-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 group-hover:text-primary transition-colors overflow-hidden">
                  {/* <?php if (!empty($profilePicture)): ?>
                                        <img src="<?php echo htmlspecialchars($profilePicture); ?>" alt="Profile" class="w-full h-full object-cover">
                                    <?php else: ?>
                                        <span class="material-symbols-outlined text-[20px]">person</span>
                                    <?php endif; ?> */}
                </div>
                {/* <span class="truncate"><?php echo isset($_SESSION['fullName']) ? htmlspecialchars($_SESSION['fullName']) : 'Admin'; ?></span> */}
                <span class="material-symbols-outlined text-[20px] text-gray-400 group-hover:text-primary transition-colors">
                  expand_more
                </span>
              </button>
              <div
                id="profileMenu"
                class="hidden absolute right-0 mt-2 w-56 bg-white dark:bg-[#1a202c] rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50 transform transition-all origin-top-right"
              >
                <div class="px-4 py-2 border-b border-gray-100 dark:border-gray-700 mb-1">
                  {/* <p class="text-sm font-bold text-gray-900 dark:text-white truncate"><?php echo isset($_SESSION['fullName']) ? htmlspecialchars($_SESSION['fullName']) : 'Admin'; ?></p> */}
                  {/* <p class="text-xs text-gray-500 dark:text-gray-400 truncate"><?php echo isset($_SESSION['email']) ? htmlspecialchars($_SESSION['email']) : ''; ?></p> */}
                </div>

                <a
                  href="login.php"
                  class="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <span class="material-symbols-outlined text-[18px]">
                    logout
                  </span>
                  Log Out
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
