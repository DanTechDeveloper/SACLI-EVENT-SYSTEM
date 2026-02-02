export default function AuthRegister(){
    return <>
        <div class="w-full flex items-center justify-center bg-background-light dark:bg-background-dark p-6 md:p-12">
            <div class="w-full max-w-md bg-white dark:bg-[#1a202c] shadow-xl rounded-xl p-8 space-y-6">
                {/* <!-- Registration Form Section (Hidden by default) --> */}
                <form class="space-y-4" id="registerForm">
                    <h2 class="text-2xl font-bold text-[#111318] dark:text-white">Register</h2>

                    <div class="grid grid-cols-1 gap-4">
                        <label class="block">
                            <span class="text-[#111318] dark:text-gray-200 text-sm font-semibold mb-1 block">Full Name</span>
                            <input class="w-full rounded-lg border border-[#dbdee6] dark:border-gray-700 dark:bg-gray-800 dark:text-white h-11 px-4 focus:ring-2 focus:ring-primary outline-none" type="text" id="fullName" />
                        </label>
                        <label class="block">
                            <span class="text-[#111318] dark:text-gray-200 text-sm font-semibold mb-1 block">Email</span>
                            <input class="w-full rounded-lg border border-[#dbdee6] dark:border-gray-700 dark:bg-gray-800 dark:text-white h-11 px-4 focus:ring-2 focus:ring-primary outline-none" type="email" id="email" />
                        </label>
                        <label class="block relative">
                            <span class="text-[#111318] dark:text-gray-200 text-sm font-semibold mb-1 block">Password</span>
                            <div class="relative">
                                <input class="w-full rounded-lg border border-[#dbdee6] dark:border-gray-700 dark:bg-gray-800 dark:text-white h-11 px-4 pr-10 focus:ring-2 focus:ring-primary outline-none" type="password" id="password" />
                                <button class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary" type="button" onclick="togglePasswordVisibility('password')">
                                    <span class="material-symbols-outlined text-[18px]" id="passwordIcon">visibility</span>
                                </button>
                            </div>
                        </label>
                    </div>
                    <button type="submit" class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-primary/20 transition-all mt-4">
                        Register Account
                    </button>
                </form>
                <div class="text-center mt-6">
                    <p class="text-sm text-gray-500">Already have an account?</p>
                    <a href="login.php" class="mt-2 text-primary font-bold hover:underline">
                        Return to Login
                    </a>
                </div>
            </div>
        </div>
    </>
}