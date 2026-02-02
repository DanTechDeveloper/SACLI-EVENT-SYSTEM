<?php
include 'dashboardDatabase.php';
?>
<!DOCTYPE html>
<html class="light" lang="en">

<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>SACLIEventSys - ADMIN DASHBOARD</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700;900&amp;display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@400;500;600;700" rel="stylesheet" />
    <!-- <script src="index.js"></script> -->
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
                    <a class="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary dark:bg-primary/20" href="dashboard.php">
                        <span class="material-symbols-outlined fill">dashboard</span>
                        <p class="text-sm font-semibold leading-normal">Dashboard</p>
                    </a>
                    <a class="flex items-center gap-3 px-3 py-2 text-[#212529] dark:text-slate-300 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg" href="createAnnouncementUI.php">
                        <span class="material-symbols-outlined">campaign</span>
                        <p class="text-sm font-medium leading-normal">Create Announcements</p>
                    </a>
                    <a class="flex items-center gap-3 px-3 py-2 text-[#212529] dark:text-slate-300 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg" href="createEventUI.php">
                        <span class="material-symbols-outlined">event</span>
                        <p class="text-sm font-medium leading-normal">Create Events</p>
                    </a>
                    <!-- <a href="studentView.php" class="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-[0.015em]">
                        <span class="truncate">Student View</span>
                        <a /> -->
                </nav>
            </div>
            <div class="mt-auto flex flex-col gap-1">

                <a href="login.php" class="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg" href="#">
                    <span class="material-symbols-outlined">logout</span>
                    <p class="text-sm font-medium leading-normal">Log Out</p>
                </a>
            </div>
        </aside>
        <!-- Main Content -->
        <main class="ml-64 flex flex-1 flex-col p-8">
            <form action="#" method="POST">
                <div class="flex flex-col gap-8">
                    <!-- PageHeading -->
                    <div class="flex flex-wrap justify-between items-center gap-3">
                        <div class="flex flex-col gap-1">
                            <p class="text-[#212529] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Admin Dashboard</p>
                            <p class="text-[#6C757D] dark:text-slate-400 text-base font-normal leading-normal">Welcome, Admin! Here's a summary of school announcements and events!.</p>
                        </div>

                    </div>

                    <!-- Stats -->
                    <div id="stats">
                        <?php
                        $selectedOption = $_POST['selectedOption'] ?? "allTypes";

                        if ($selectedOption === "allTypes" || !isset($_POST['applyChangesButton'])) {
                            getTotalPosts();
                        } else if ($selectedOption === "allAnnouncements") {
                            getTotalAnnouncementCategory();
                        } else if ($selectedOption === "allSubtypeEvents") {
                            getAllSubtypeEvent();
                        } else if ($selectedOption === "allEventsStatus") {
                            getAllEventStatus();
                        } else {
                            getTotalPosts();
                        }


                        ?>
                    </div>
                    <!-- Toolbar for filters -->
                    <div class="flex flex-col gap-5 py-3">
                        <div class="flex gap-2 items-center justify-between">
                            <div class='flex items-center gap-3'>
                                <h4 class="text-[#212529] dark:text-white text-[15px] font-bold leading-tight tracking-[-0.015em] whitespace-nowrap">Filter By</h4>
                                <!-- ToolBar -->
                                <select name="selectedOption" id="dashboardSelection" class="rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-primary focus:border-primary">
                                    <?php $currentSelectedOption = isset($_POST['selectedOption']) ? $_POST['selectedOption'] : 'allTypes'; ?>
                                    <option value="allTypes" <?php echo ($currentSelectedOption == 'allTypes') ? 'selected' : ''; ?>>All Types</option>
                                    <option value="allAnnouncements" <?php echo ($currentSelectedOption == 'allAnnouncements') ? 'selected' : ''; ?>>All Announcements</option>
                                    <option value="allSubtypeEvents" <?php echo ($currentSelectedOption == 'allSubtypeEvents') ? 'selected' : ''; ?>>Events Subtypes</option>
                                    <option value="allEventsStatus" <?php echo ($currentSelectedOption == 'allEventsStatus') ? 'selected' : ''; ?>>Event Status Overview</option>
                                </select>
                                <h4 class="text-[#212529] dark:text-white text-[15px] font-bold leading-tight tracking-[-0.015em] whitespace-nowrap">Sort By</h4>
                                <select id="selectedSort" name="selectedSort" class="rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-primary focus:border-primary">
                                    <!-- Use server-safe values (mapped on server) -->
                                    <?php
                                    $currentSelectedSort = isset($_POST['selectedSort']) ? $_POST['selectedSort'] : 'title';
                                    $currentSelectedOption = isset($_POST['selectedOption']) ? $_POST['selectedOption'] : 'allTypes';
                                    if ($currentSelectedOption === "allAnnouncements") {
                                        echo '
                                        <option value="title" ' . (($currentSelectedSort == 'title') ? 'selected' : '') . '>Title</option>
                                        <option value="date" ' . (($currentSelectedSort == 'date') ? 'selected' : '') . '>Date</option>
                                        <option value="category" ' . (($currentSelectedSort == 'category') ? '  selected' : '') . '>Category</option>
                                        ';
                                    } else if ($currentSelectedOption === "allSubtypeEvents") {
                                        echo '
                                        <option value="title" ' . (($currentSelectedSort == 'title') ? 'selected' : '') . '>Title</option>
                                        <option value="date" ' . (($currentSelectedSort == 'date') ? 'selected' : '') . '>Date</option>
                                        <option value="subtype" ' . (($currentSelectedSort == 'subtype') ? '  selected' : '') . '>Subtype</option>
                                        ';
                                    } else if ($currentSelectedOption === "allEventsStatus") {
                                        echo '
                                        <option value="title" ' . (($currentSelectedSort == 'title') ? 'selected' : '') . '>Title</option>
                                        <option value="date" ' . (($currentSelectedSort == 'date') ? 'selected' : '') . '>Date</option>
                                        ';
                                    } else {
                                        echo '
                                        <option value="title" ' . (($currentSelectedSort == 'title') ? 'selected' : '') . '>Title</option>
                                        <option value="date" ' . (($currentSelectedSort == 'date') ? 'selected' : '') . '>Date</option>
                                        <option value="category" ' . (($currentSelectedSort == 'category') ? 'selected' : '') . '>Category (Announcements)</option>
                                        <option value="subtype" ' . (($currentSelectedSort == 'subtype') ? 'selected' : '') . '>Subtype (Events)</option>
                                        <option value="location" ' . (($currentSelectedSort == 'location') ? 'selected' : '') . '>Location (Events)</option>
                                        ';
                                    }
                                    ?>



                                </select>
                                <h4 class="text-[#212529] dark:text-white text-[15px] font-bold leading-tight tracking-[-0.015em] whitespace-nowrap">Order By</h4>
                                <select id="selectedOrder" name="selectedOrder" class="rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-primary focus:border-primary">
                                    <?php $currentSelectedOrder = isset($_POST['selectedOrder']) ? $_POST['selectedOrder'] : 'ASC'; ?>
                                    <option value="ASC" <?php echo ($currentSelectedOrder == 'ASC') ? 'selected' : ''; ?>>Ascending</option>
                                    <option value="DESC" <?php echo ($currentSelectedOrder == 'DESC') ? 'selected' : ''; ?>>Descending</option>
                                </select>
                                <button type="submit" name="applyChangesButton" class="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-[0.010em]">
                                    <span class="truncate">Apply Changes</span>
                                </button>

                            </div>

                        </div>



                        <div class="flex flex-col gap-4">
                            <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
                                <table class="w-full text-left text-sm">
                                    <thead class="bg-slate-50 text-xs uppercase text-[#6C757D] dark:bg-slate-800 dark:text-slate-400">
                                        <tr>
                                            <th class="px-6 py-3 font-medium" scope="col whitespace-nowrap">Title</th>
                                            <th class="px-6 py-3 font-medium" scope="col">Type / Status</th>
                                            <th class="px-6 py-3 font-medium" scope="col">Date / Location</th>
                                            <th class="px-6 py-3 font-medium whitespace-nowrap" scope="col">Subtype / Category</th>
                                            <th class="px-6 py-3 text-right font-medium" scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody">
                                        <?php

                                        $selectedSort = isset($_POST['selectedSort']) ? $_POST['selectedSort'] : 'title'; // Default to 'title'
                                        $selectedOrder = isset($_POST['selectedOrder']) ? $_POST['selectedOrder'] : 'ASC'; // Default to 'ASC'
                                        if (isset($_POST['applyChangesButton'])) {
                                            $selectedOption = isset($_POST['selectedOption']) ? $_POST['selectedOption'] : 'allTypes';
                                            if ($selectedOption === 'allAnnouncements') {
                                                readAllTableAnnouncements($selectedSort, $selectedOrder);
                                            } else if ($selectedOption === 'allSubtypeEvents') {
                                                readAllSubtypeEvents($selectedSort, $selectedOrder);
                                            } else if ($selectedOption === "allEventsStatus") {
                                                readAllEventsStatus($selectedSort, $selectedOrder);
                                            } else if ($selectedOption === "Upcoming Events") {
                                                readUpcomingEventsTable($selectedSort, $selectedOrder);
                                            } else {
                                                readAllTypesTable($selectedSort, $selectedOrder);
                                            }
                                        } else {
                                            readAllTypesTable($selectedSort, $selectedOrder);
                                        }

                                        ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            </form>
        </main>

    </div>



</body>

</html>

<script>
    const tbody = document.getElementById('tbody');

    tbody.addEventListener('click', async (e) => {
        // Hanapin ang pinakamalapit na button na may class na 'editButton'
        const editButton = e.target.closest('.editButton');
        if (editButton) {

        }

        // Hanapin ang pinakamalapit na button na may class na 'deleteButton'
        const deleteButton = e.target.closest('.deleteButton');
        if (deleteButton) {
            const idToDelete = deleteButton.dataset.id;

            // Confirmation dialog
            if (!confirm(`Are you sure you want to delete item with ID: ${idToDelete}?`)) {
                return; // Stop if the user clicks "Cancel"
            }

            try {
                const response = await fetch('deleteButton.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: idToDelete
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log(result);

                if (result.success) {
                    // Remove the row from the table on successful deletion
                    deleteButton.closest('tr').remove();
                    alert(result.message);
                } else {
                    alert("Error: " + result.error);
                }

            } catch (error) {
                console.error('Error fetching or parsing data:', error);
            }
        }
    });
</script>

</body>

</html>