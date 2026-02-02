<?php
include 'dashboardDatabase.php';
?>
<!DOCTYPE html>
<html class="light" lang="en">

<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>SACLIEventSys - CREATE ANNOUNCEMENTS</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700;900&amp;display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@400;500;600;700" rel="stylesheet" />
    <script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#005792",
                        "background-light": "#f4f6f8",
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
    <style>
        * {
            margin: 0;
            padding: 0
        }

        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            font-size: 24px;
        }

        .material-symbols-outlined.fill {
            font-variation-settings: 'FILL' 1;
        }
    </style>
</head>

<body class="font-display bg-background-light dark:bg-background-dark">
    <div class="relative flex w-full">
        <!-- SideNavBar -->
        <aside class="fixed h-screen flex w-64 flex-col bg-white p-4 dark:bg-background-dark dark:border-r dark:border-slate-800">
            <div class="flex flex-col gap-4">
                <div class="flex items-center gap-3">
                    <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="Official school crest">
                        <img src="logo.jpg" alt="">
                    </div>
                    <div class="flex flex-col">
                        <h1 class="text-[#212529] dark:text-white text-base font-bold leading-normal">SACLIEventSys</h1>
                        <p class="text-[#6C757D] dark:text-slate-400 text-sm font-normal leading-normal">Admin Portal</p>
                    </div>
                </div>
                <nav class="flex flex-col gap-2 mt-4">
                    <a class="flex items-center gap-3 px-3 py-2 text-[#212529] dark:text-slate-300 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg" href="dashboard.php">
                        <span class="material-symbols-outlined">dashboard</span>
                        <p class="text-sm font-medium leading-normal">Dashboard</p>
                    </a>
                    <a class="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary dark:bg-primary/20" href="createAnnouncementUI.php">
                        <span class="material-symbols-outlined fill">campaign</span>
                        <p class="text-sm font-semibold leading-normal">Create Announcements</p>
                    </a>
                    <a class="flex items-center gap-3 px-3 py-2 text-[#212529] dark:text-slate-300 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg" href="createEventUI.php">
                        <span class="material-symbols-outlined">event</span>
                        <p class="text-sm font-medium leading-normal">Create Events</p>
                    </a>
                    <!-- <a href="studentView.php" class="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-[0.015em]">
                        <span class="truncate">User View</span>
                    </a> -->
                </nav>
            </div>
            <div class="mt-auto flex flex-col gap-1">
                <a class="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg" href="#">
                    <span class="material-symbols-outlined">logout</span>
                    <p class="text-sm font-medium leading-normal">Log Out</p>
                </a>
            </div>
        </aside>
        <!-- Main Content -->
        <main class="ml-64 flex flex-1 flex-col p-8">
            <div class="flex flex-col gap-8">
                <!-- PageHeading -->
                <div class="flex flex-col gap-1">
                    <p class="text-[#212529] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Create Announcement</p>
                    <p class="text-[#6C757D] dark:text-slate-400 text-base font-normal leading-normal">Fill out the form below to publish a new announcement.</p>
                </div>

                <!-- Form Container -->
                <div class="w-full rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                    <form class="flex flex-col gap-6" action="#" method="POST" id="formID">

                        <div>
                            <label for="announcement_title" class="block text-sm font-medium text-gray-700 dark:text-slate-300">Announcement Title</label>
                            <input required type="text" id="title" name="title" class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary" placeholder="e.g., Midterm Examination Schedule">
                        </div>

                        <!-- Content -->
                        <div>
                            <label for="announcement_content" class="block text-sm font-medium text-gray-700 dark:text-slate-300">Content</p>
                                <textarea required id="content" name="content" rows="6" class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary" placeholder="Write the full details of the announcement here..."></textarea>
                        </div>

                        <!-- Category -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>
                                <label for="announcement_category" class="block text-sm font-medium text-gray-700 dark:text-slate-300">Category</label>
                                <select required id="category" name="category" class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary">
                                    <option value="" disabled selected>-- Select an Category --</option>
                                    <option value="Academic">Academic</option>
                                    <option value="Holiday">Holiday</option>
                                    <option value="Sports">Sports</option>
                                </select>
                            </div>

                            <div>
                                <label for="event_date" class="block text-sm font-medium text-gray-700 dark:text-slate-300">Event Date</label>
                                <input required type="date" id="date" name="date" class=" mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary">
                            </div>

                        </div>

                        <!-- Action Buttons -->
                        <div class="flex justify-end gap-4 mt-4">
                            <button name="publishAnnouncement" type="submit" class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">Publish Announcement</button>
                            <?php
                            if (isset($_POST['publishAnnouncement'])) {
                                publishAnnouncement();
                            }
                            ?>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </div>
</body>

</html>