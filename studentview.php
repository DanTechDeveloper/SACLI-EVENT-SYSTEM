<?php
session_start();
include 'connect.php';
include 'studentViewDatabase.php';

// Fetch user profile picture from database
$profilePicture = '';
if (isset($_SESSION['user_id'])) {
    $stmt = $conn->prepare("SELECT profile_picture FROM register WHERE id = ?");
    $stmt->execute([$_SESSION['user_id']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user && !empty($user['profile_picture'])) {
        $profilePicture = $user['profile_picture'];
    }
}
?>
<!DOCTYPE html>
<html class="light" lang="en">

<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>SACLIEventSys</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700;900&amp;display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
    <style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
    <script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#137fec",
                        "background-light": "#f6f7f8",
                        "background-dark": "#101922",
                    },
                    fontFamily: {
                        "display": ["Lexend", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
</head>

<body class="font-display bg-background-light dark:bg-background-dark">
    <div class="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div class="layout-container flex h-full grow flex-col">
            <!-- TopNavBar -->
            <header class="fixed w-full flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-700/60 px-4 md:px-8 lg:px-10 py-3 bg-white dark:bg-background-dark/50 backdrop-blur-sm top-0 z-10">
                <div class="flex items-center gap-4 text-gray-900 dark:text-white">
                    <div class="size-6 text-primary">
                        <img src="logo.jpg" alt="">
                    </div>
                    <h2 class="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">SACLIEventSys</h2>
                </div>
                <div class="flex flex-1 justify-end items-center gap-4">
                    <nav class="hidden lg:flex items-center gap-9">
                        <div class="relative">
                            <button onclick="toggleProfileMenu()" class="flex items-center gap-2 text-sm font-bold text-[#111318] dark:text-white hover:text-primary transition-colors group focus:outline-none">
                                <div class="size-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 group-hover:text-primary transition-colors overflow-hidden">
                                    <?php if (!empty($profilePicture)): ?>
                                        <img src="<?php echo htmlspecialchars($profilePicture); ?>" alt="Profile" class="w-full h-full object-cover">
                                    <?php else: ?>
                                        <span class="material-symbols-outlined text-[20px]">person</span>
                                    <?php endif; ?>
                                </div>
                                <span class="truncate"><?php echo isset($_SESSION['fullName']) ? htmlspecialchars($_SESSION['fullName']) : 'Admin'; ?></span>
                                <span class="material-symbols-outlined text-[20px] text-gray-400 group-hover:text-primary transition-colors">expand_more</span>
                            </button>
                            <div id="profileMenu" class="hidden absolute right-0 mt-2 w-56 bg-white dark:bg-[#1a202c] rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50 transform transition-all origin-top-right">
                                <div class="px-4 py-2 border-b border-gray-100 dark:border-gray-700 mb-1">
                                    <p class="text-sm font-bold text-gray-900 dark:text-white truncate"><?php echo isset($_SESSION['fullName']) ? htmlspecialchars($_SESSION['fullName']) : 'Admin'; ?></p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400 truncate"><?php echo isset($_SESSION['email']) ? htmlspecialchars($_SESSION['email']) : ''; ?></p>
                                </div>

                                <a href="login.php" class="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                    <span class="material-symbols-outlined text-[18px]">logout</span>
                                    Log Out
                                </a>
                            </div>
                        </div>
                    </nav>
            </header>
            <main class="flex flex-1 justify-center py-5 sm:py-8 lg:py-10 px-4" style="margin-top: 35px;">
                <div class="layout-content-container flex flex-col w-full max-w-7xl">
                    <!-- PageHeading -->
                    <div class="flex flex-wrap justify-between items-center gap-4 p-4">
                        <h1 class="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">Announcements &amp; Events</h1>
                    </div>
                    <!-- Toolbar & Filters -->
                    <form action="#" method="POST" class="flex flex-col gap-4">
                        <div class="flex flex-col sm:flex-row gap-3 px-4 py-3">
                            <div class="flex gap-2 items-center flex-wrap">
                                <?php

                                function getToggle($id)
                                {
                                    if (isset($_POST[$id])) {
                                        return 'flex h-10 items-center justify-center gap-x-2 rounded-lg bg-primary pl-4 pr-3 text-white text-sm font-medium leading-normal';
                                    }

                                    if ($id === 'all' && empty($_POST)) {
                                        return 'flex h-10 items-center justify-center gap-x-2 rounded-lg bg-primary pl-4 pr-3 text-white text-sm font-medium leading-normal';
                                    }


                                    return 'flex h-10 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 pl-4 pr-3 text-gray-800 dark:text-gray-300 leading-normal';
                                }

                                echo '  <button name="all" class="' . (getToggle("all")) . '">
                                    <span>All</span>
                                    <span class="material-symbols-outlined !text-xl"> </span>
                                </button>
                                <button name="allAcademics" class="' . (getToggle("allAcademics")) . '">
                                    <p class="text-sm font-medium leading-normal">Academic</p>
                                </button>
                                  <button name="allHolidays" class="' . (getToggle("allHolidays")) . '">
                                    <p class="text-sm font-medium leading-normal">Holiday</p>
                                </button>
                                <button name="allSports" class="' . getToggle("allSports") . '">
                                    <p class="text-sm font-medium leading-normal">Sports</p>
                                </button>
                                <button name="allCompletedEvent" class="' . getToggle("allCompletedEvent") . '">
                                    <p class="text-sm font-medium leading-normal">Completed Events</p>
                                </button>
                                <button name="allOngoingEvents" class="' . getToggle("allOngoingEvents") . '">
                                    <p class="text-sm font-medium leading-normal">Ongoing Events</p>
                                </button>
                                <div class="flex gap-2">
                                    <button name="allUpcomingEvent" class="' . getToggle("allUpcomingEvent") . '">
                                        <p class="text-sm font-medium leading-normal">Upcoming Events</p>
                                    </button>
                                
                                ';

                                ?>
                                <div class="flex gap-2">
                                    <div class="relative w-full max-w-xs">
                                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span class="material-symbols-outlined text-gray-500 dark:text-gray-400">search</span>
                                        </div>
                                        <input name="searchInput" id="searchBarInput" class="block w-full h-10 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-10 pr-3 text-sm text-gray-900 dark:text-gray-200 focus:border-primary focus:ring-primary" placeholder="Search...." type="text" />
                                    </div>
                                    <button name="searchButton" id="searchBarButton" class="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-[0.015em]">
                                        <span class="truncate">Search</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                </div>
                <div id="cardList" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    <?php
                    if (isset($_POST['all'])) { /// KUNG NAKA SET NA SI ALL BUTTON
                        readAll($conn); /// kapag pinindot si all BUTTON iprint lahat ng announcement at event
                    } else if (isset($_POST['allAcademics'])) {
                        readAllAcademics($conn);
                    } else if (isset($_POST['allHolidays'])) {
                        readAllHoliday($conn);
                    } else if (isset($_POST['allSports'])) {
                        readAllSports($conn);
                    } else if (isset($_POST['allOngoingEvents'])) {
                        readAllOngoingEvent($conn);
                    } else if (isset($_POST['allUpcomingEvent'])) {
                        readAllUpcomingEvents($conn);
                    } else if (isset($_POST['searchButton'])) {
                        readSearchResults($conn);
                    } else if (isset($_POST['allCompletedEvent'])) {
                        readAllCompletedEvent($conn);
                    } else {
                        readAll($conn);
                    }
                    ?>
                </div>
                </form>
        </div>
    </div>
    </main>
    </div>
    </div>
    <script>
        function toggleProfileMenu() {
            const menu = document.getElementById('profileMenu');
            menu.classList.toggle('hidden');
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            const menu = document.getElementById('profileMenu');
            const button = document.querySelector('button[onclick="toggleProfileMenu()"]');
            if (menu && button && !menu.contains(event.target) && !button.contains(event.target)) {
                menu.classList.add('hidden');
            }
        });
    </script>
</body>

</html>