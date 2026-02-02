<!DOCTYPE html>

<html class="light" lang="en">

<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>Register</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&amp;display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
    <script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#1f5def",
                        "background-light": "#f6f6f8",
                        "background-dark": "#101522",
                    },
                    fontFamily: {
                        "display": ["Lexend", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.5rem",
                        "lg": "1rem",
                        "xl": "1.5rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
    <style>
        body {
            font-family: 'Lexend', sans-serif;
        }

        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
</head>

<body class="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
    <!-- Navigation Header -->
    <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#dbdee6] dark:border-gray-800 bg-white dark:bg-background-dark px-6 md:px-10 py-3 z-10">
        <div class="flex items-center gap-3 text-[#111318] dark:text-white">
            <div class="size-6 text-primary">
                <span class="material-symbols-outlined text-3xl">school</span>
            </div>
            <h2 class="text-[#111318] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">SACLI EVENT SYSTEM</h2>
        </div>

    </header>
    <main class="flex-grow flex flex-col md:flex-row">
        <!-- Right Side: Authentication Forms -->
        <div class="w-full flex items-center justify-center bg-background-light dark:bg-background-dark p-6 md:p-12">
            <div class="w-full max-w-md bg-white dark:bg-[#1a202c] shadow-xl rounded-xl p-8 space-y-6">
                <!-- Registration Form Section (Hidden by default) -->
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
                    <button type="submit" class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-primary/20 transition-all mt-4" type="submit">
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
        </div>
    </main>
    <footer class="bg-white dark:bg-background-dark border-t border-[#dbdee6] dark:border-gray-800 py-6 px-10 text-center text-gray-400 text-xs">
        © 2026 Philippine Digital Bulletin Board. All Rights Reserved. Authorized Access Only.
    </footer>
</body>
<script>
    function togglePasswordVisibility(fieldId) {
        const input = document.getElementById(fieldId);
        const icon = document.getElementById(fieldId + 'Icon');

        if (input.type === 'password') {
            input.type = 'text';
            icon.textContent = 'visibility_off';
        } else {
            input.type = 'password';
            icon.textContent = 'visibility';
        }
    }

    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener('submit', async (E) => {

        E.preventDefault();

        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("registerDatabase.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: "register",
                    fullName: fullName,
                    email: email,
                    password: password,
                }),
            });

            const result = await response.json();
            if (result.success) {
                alert("Registration successful! Please login.");
                window.location.href = "login.php";
            } else {
                alert("Registration failed: " + result.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred during registration.");
        }
    });
</script>

</html>