<?php
////  READ ALL BUTTON LOGIC

function cardListStructure($column1, $column2, $column3, $column4, $column5)
{
    echo '<div class="flex flex-col items-stretch justify-between gap-6 rounded-xl bg-white dark:bg-gray-800/50 p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div class="flex flex-[2_2_0px] flex-col gap-3">
                                        <div class="flex flex-col gap-2.5">
                                            <div class="flex items-center gap-2">
                                                <p class="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">' . $column1 . '</p>
                                                <span class="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/40 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:text-blue-200">' . $column2 . '</span>
                                                <span class="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300"> <span class="size-1.5 rounded-full bg-green-600"></span>' . $column3 . '</span>
                                            </div>
                                             <p class="text-gray-900 dark:text-white text-lg font-bold leading-tight">' . $column4 . '</p>
                                            <p class="text-gray-600 dark:text-gray-300 text-sm font-normal leading-normal">' . $column5 . '</p>
                                        </div>
                                        <button type="button" name="readMore" class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary hover:bg-primary/90 text-white text-sm font-medium leading-normal w-fit">
                                            <span class="truncate">Read More</span>
                                        </button>

                                    </div>
                                </div>';
}

function readAll($conn)
{

    try {

        $sql = "SELECT * FROM saqliqdb";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (count($rows) === 0) {
            echo '<p class="text-gray-500 dark:text-gray-400 text-center py-4">No current announcements or events at this time.</p>';
        }


        $today = date('Y-m-d');
        foreach ($rows as $column) {

            if ($column['date'] > $today) {
                $column['status'] = "Upcoming Event";
            } elseif ($column['date'] === $today) {
                $column['status'] = "Ongoing Event";
            } else {
                $column['status'] = "Completed Event";
            }


            /// Announcement CardList
            $announcementDate = $column['date'];
            $announcementType = $column['type'];
            $announcementCategory = $column['category'];
            $announcementTitle = $column['title'];
            $announcementContent = $column['content'];

            $eventDate = $column['date'];
            $eventLocation = $column['location'];
            $eventTitle = $column['title'];
            $eventContent = $column['content'];
            $eventStatus = $column['status'];
            ($column['type'] === "Announcement") ?
                cardListStructure($announcementDate, $announcementType, $announcementCategory, $announcementTitle, $announcementContent)
                : cardListStructure($eventDate, $eventStatus, $eventLocation, $eventTitle, $eventContent);
        }
    } catch (Exception $th) {
        echo "Error: " . $th->getMessage();
    }
}
////  END OF READ ALL BUTTON LOGIC



/// READ ALL ACADEMIC BUTTON LOGIC
function readAllAcademics($conn)
{
    try {
        $sql = "SELECT * from saqliqdb WHERE category='Academic'";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (count($rows) === 0) {
            echo '<p class="text-gray-500 dark:text-gray-400 text-center py-4">No results found for Academic Announcement.</p>';
        }
        foreach ($rows as $totalAcademic) {
            $date = $totalAcademic['date'];
            $type = $totalAcademic['type'];
            $category = $totalAcademic['category'];
            $title = $totalAcademic['title'];
            $content = $totalAcademic['content'];
            cardListStructure($date, $type, $category, $title, $content);
        }
    } catch (Exception $th) {
        echo $th;
    }
}

/// END OF ALL ACADEMIC BUTTON LOGIC



/// READ ALL HOLIDAY BUTTON LOGIC
function readAllHoliday($conn)
{
    $sql = "SELECT * from saqliqdb WHERE category='Holiday'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (count($rows) === 0) {
        echo '<p class="text-gray-500 dark:text-gray-400 text-center py-4">No results found for Holiday Announcement.</p>';
    }
    foreach ($rows as $totalHoliday) {
        $date = $totalHoliday['date'];
        $type = $totalHoliday['type'];
        $category = $totalHoliday['category'];
        $title = $totalHoliday['title'];
        $content = $totalHoliday['content'];
        cardListStructure($date, $type, $category, $title, $content);
    }
}
/// END OF READ ALL HOLIDAY BUTTON LOGIC



/// READ ALL SPORTS BUTTON LOGIC

function readAllSports($conn)
{
    $sql = "SELECT * from saqliqdb WHERE category='Sports'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (count($rows) === 0) {
        echo '<p class="text-gray-500 dark:text-gray-400 text-center py-4">No results found for Sports Announcement.</p>';
    }
    foreach ($rows as $totalSports) {
        $date = $totalSports['date'];
        $type = $totalSports['type'];
        $category = $totalSports['category'];
        $title = $totalSports['title'];
        $content = $totalSports['content'];
        cardListStructure($date, $type, $category, $title, $content);
    }
}
/// END OF ALL HOLIDAY BUTTON LOGIC


/// READ ALL COMPLETED EVENT BUTTON LOGIC

function readAllCompletedEvent($conn)
{
    $today = date('Y-m-d');
    // Select events where the date is in the past and type is 'Event'
    $sql = "SELECT * from saqliqdb WHERE type='Event' AND date < :today";
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(":today", $today);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($rows) === 0) {
        echo '<p class="text-gray-500 dark:text-gray-400 text-center py-4">No results found for Completed Event.</p>';
        return;
    }

    foreach ($rows as $event) {
        cardListStructure($event['date'], "Completed Event", $event['location'], $event['title'], $event['content']);
    }
}
/// END OF READ ALL COMPLETED EVENT BUTTON LOGIC


/// READ ALL ONGOING EVENT BUTTON LOGIC
function readAllOngoingEvent($conn)
{
    $today = date('Y-m-d');
    $sql = "SELECT * from saqliqdb WHERE type='Event' AND date = :today";
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(":today", $today);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($rows) === 0) {
        echo '<p class="text-gray-500 dark:text-gray-400 text-center py-4">No results found for Ongoing Event.</p>';
        return;
    }

    foreach ($rows as $event) {
        $location = $event['location'];
        $title = $event['title'];
        $content = $event['content'];
        cardListStructure($event['date'], "Ongoing Event", $location, $title, $content);
    }
}
/// END OF READ ALL ONGOING EVENT BUTTON LOGIC



/// READ ALL UPCOMING EVENT BUTTON LOGIC
function readAllUpcomingEvents($conn)
{
    $today = date('Y-m-d');
    // Select events where the date is in the future and type is 'Event'
    $sql = "SELECT * from saqliqdb WHERE type='Event' AND date > :today";
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(":today", $today);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($rows) === 0) {
        echo '<p class="text-gray-500 dark:text-gray-400 text-center py-4">No results found for Upcoming Event.</p>';
        return;
    }

    foreach ($rows as $event) {
        $date = $event['date'];
        $location = $event['location'];
        $category = $event['subtype']; // Assuming subtype is the category for upcoming events
        $title = $event['title'];
        $content = $event['content'];
        cardListStructure($date, "Upcoming Event", $location, $title, $content);
    }
}
/// END OF READ ALL UPCOMING EVENT BUTTON LOGIC



/// READ ALL SEARCH RESULTS BUTTON LOGIC
function readSearchResults($conn)
{
    $searchBarResult = isset($_POST['searchInput']) ? $_POST['searchInput'] : "";
    $searchPattern = '%' . $searchBarResult . '%';
    $sql = 'SELECT * FROM saqliqdb WHERE title LIKE :searchPattern';
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(":searchPattern", $searchPattern);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($rows) === 0) {
        echo "<p class='text-gray-500 dark:text-gray-400 text-center py-4'>Sorry, no results were found for {$searchBarResult} .</p>";
        return;
    }


    foreach ($rows as $column) {

        /// Announcement CardList
        $announcementDate = $column['date'];
        $announcementType = $column['type'];
        $announcementCategory = $column['category'];
        $announcementTitle = $column['title'];
        $announcementContent = $column['content'];

        $eventDate = $column['date'];
        $eventLocation = $column['location'];
        $eventTitle = $column['title'];
        $eventContent = $column['content'];
        $eventStatus = $column['status'];
        ($column['type'] === "Announcement") ?
            cardListStructure($announcementDate, $announcementType, $announcementCategory, $announcementTitle, $announcementContent)
            : cardListStructure($eventDate, $eventStatus, $eventLocation, $eventTitle, $eventContent);
    }
}

///END OF READ ALL SEARCH RESULTS BUTTON LOGIC
