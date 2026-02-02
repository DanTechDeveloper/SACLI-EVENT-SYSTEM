export default function AuthHeader(){
    return <>
      <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#dbdee6] dark:border-gray-800 bg-white dark:bg-background-dark px-6 md:px-10 py-3 z-10">
        <div class="flex items-center gap-3 text-[#111318] dark:text-white">
            <div class="size-6 text-primary">
                <span class="material-symbols-outlined text-3xl">school</span>
            </div>
            <h2 class="text-[#111318] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">SACLI EVENT SYSTEM</h2>
        </div>
        {/* <!-- Add Login as admin button with span --> */}
        <button class="text-sm text-primary font-bold hover:underline cursor-pointer flex items-center gap-1">
            <span class="material-symbols-outlined">admin_panel_settings</span>
            <span>Login as admin</span>
        </button>
    </header>
    </>
}