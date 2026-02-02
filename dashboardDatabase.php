<?php
/// START DASHBOARD LOGIC

/// GETTING ALL TOTAL POSTS, TOTAL ANNOUNCEMENT, TOTAL EVENTS
/// IN ALL TYPES CATEGORY (DASHBOARD)


function countAllPosts($conn)
{
    $sql = "SELECT COUNT(*) As 'totalPosts' FROM saqliqdb";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetch(PDO::FETCH_ASSOC);
    return $rows['totalPosts'];
}
function countAllAnnouncement($conn)
{
    $sql = "SELECT COUNT(*) As 'totalAnnouncement' FROM saqliqdb WHERE type ='Announcement'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetch(PDO::FETCH_ASSOC);
    return $rows['totalAnnouncement'];
}
function countAllEvent($conn)
{
    $sql = "SELECT COUNT(*) As 'totalEvents' FROM saqliqdb WHERE type = 'Event'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetch(PDO::FETCH_ASSOC);
    return $rows['totalEvents'];
}

function getTotalPosts()
{


    include 'connect.php';


    dashboardStructure(
        countAllPosts($conn),
        countAllAnnouncement($conn),
        countAllEvent($conn),
        "Total Posts",
        "Total Announcements",
        "Total Events"
    );
}

/// GETTING ALL TOTAL ANNOUNCEMENT
/// AND TOTAL ANNOUNCEMENT CATEGORY 
/// HOLIDAY,ACADEMIC,
// AT ALL ANNOUNCEMENT CATEGORY (DASHBOARD)

function dashboardStructure($totalPost, $category1, $category2, $title1, $title2, $title3)
{
    echo '
         <div id="stats" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div class="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
    <p class="text-[#6C757D] dark:text-slate-400 text-base font-medium leading-normal">' . $title1 . '</p>
    <p id="totalPost" class="text-[#212529] dark:text-white tracking-light text-3xl font-bold leading-tight">' . $totalPost . '</p>
                    </div>
    <div class="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
    <p class="text-[#6C757D] dark:text-slate-400 text-base font-medium leading-normal whitespace-nowrap">' . $title2 . '</p>
    <p id="totalPost" class="text-[#212529] dark:text-white tracking-light text-3xl font-bold leading-tight">' . $category1 . '</p>
                    </div>
                    <div class="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
                        <p class="text-[#6C757D] dark:text-slate-400 text-base font-medium leading-normal">' . $title3 . '</p>
                        <p id="totalAnnouncement" class="text-[#212529] dark:text-white tracking-light text-3xl font-bold leading-tight">' . $category2 . '</p>
                    </div>
                        </div>';
}

function getTotalAnnouncementCategory()
{

    include 'connect.php';
    $sql = "SELECT category, COUNT(*) as total FROM saqliqdb GROUP BY category";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($rows as $row) {
        $totals[$row['category']] = $row['total'];
    }

    if (count($rows) === 0) {
    }

    $totalAcademic = (isset($totals['Academic']) ? $totals['Academic'] : 0);
    $totalSports = (isset($totals['Sports']) ? $totals['Sports'] : 0);
    $totalHoliday = (isset($totals['Holiday']) ? $totals['Holiday'] : 0);
    dashboardStructure(
        $totalAcademic,
        $totalHoliday,
        $totalSports,
        "Total Academics",
        "Total Holidays",
        "Total Sports"
    );
}

/// GETTING ALL TOTAL EVENTS
/// AND TOTAL EVENT CATEGORY 
// AT ALL ANNOUNCEMENT CATEGORY (DASHBOARD)
function getAllSubtypeEvent()
{
    include 'connect.php';
    $sql = "SELECT subtype, COUNT(*) as total FROM saqliqdb GROUP BY subtype";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($rows as $row) {
        $totals[$row['subtype']] = $row['total'];
    }

    $totalSeminar = (isset($totals['General Event']) ? $totals['General Event'] : 0);
    $totalCompetition = (isset($totals['School Activity']) ? $totals['School Activity'] : 0);
    $totalSpecialEvent = (isset($totals['Campus Program']) ? $totals['Campus Program'] : 0);
    dashboardStructure(
        $totalSeminar,
        $totalCompetition,
        $totalSpecialEvent,
        "Total General Events",
        "Total School Activity",
        "Total Campus Program"
    );
}


function getAllEventStatus()
{
    include 'connect.php';

    $sql = "SELECT date FROM saqliqdb WHERE type='Event'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $totalUpcoming = 0;
    $totalOngoing = 0;
    $totalCompleted = 0;

    $today = date('Y-m-d');

    foreach ($rows as $row) {
        $eventDate = date('Y-m-d', strtotime($row['date'])); // ensure proper format

        if ($eventDate > $today) {
            $row['status'] = $totalUpcoming++;
        } elseif ($eventDate == $today) {
            $row['status'] = $totalOngoing++;
        } else {
            $row['status'] =  $totalCompleted++;
        }
    }

    dashboardStructure(
        $totalUpcoming,
        $totalOngoing,
        $totalCompleted,
        "Total Upcoming Events",
        "Total Ongoing Events",
        "Total Completed Events",
    );

    $countAllFurtherEvents = "
        SELECT
    SUM(CASE WHEN YEARWEEK(`date`, 1) = YEARWEEK(CURDATE(), 1) THEN 1 ELSE 0 END) AS upcoming_this_week,
    SUM(CASE WHEN YEAR(`date`) = YEAR(CURDATE()) AND MONTH(`date`) = MONTH(CURDATE()) THEN 1 ELSE 0 END) AS upcoming_this_month,
    SUM(CASE WHEN YEAR(`date`) = YEAR(CURDATE()) THEN 1 ELSE 0 END) AS upcoming_this_year
FROM saqliqdb
WHERE status = 'Upcoming Event' AND `date` IS NOT NULL;
    ";

    $statement = $conn->prepare($countAllFurtherEvents);
    $statement->execute();
    $row = $statement->fetch(PDO::FETCH_ASSOC);

    $week = $row['upcoming_this_week'] ?? 0;
    $month = $row['upcoming_this_month'] ?? 0;
    $year = $row['upcoming_this_year'] ?? 0;


    echo '
    <div class="flex flex-col gap-6 mt-6">
         <p class="text-[#212529] dark:text-white text-2xl font-black leading-tight tracking-[-0.033em]">This Week, Month, & Year’s Upcoming Events</p>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div class="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
                    <p class="text-[#6C757D] dark:text-slate-400 text-base font-medium leading-normal">Upcoming Event This Week</p>
                    <p class="text-[#212529] dark:text-white tracking-light text-3xl font-bold leading-tight">' . $week . '</p>
                </div>
                <div class="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
                    <p class="text-[#6C757D] dark:text-slate-400 text-base font-medium leading-normal whitespace-nowrap">Upcoming Event This Month</p>
                    <p class="text-[#212529] dark:text-white tracking-light text-3xl font-bold leading-tight">' . $month . '</p>
                </div>
                <div class="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
                        <p class="text-[#6C757D] dark:text-slate-400 text-base font-medium leading-normal">Upcoming Event This Year</p>
                        <p class="text-[#212529] dark:text-white tracking-light text-3xl font-bold leading-tight">' . $year . '</p>
                </div>
              </div>
        </div>';
}

// function getUpcomingEvents()
// {
//     include 'connect.php';

//     $countAllFurtherEvents = "
//         SELECT
//     SUM(CASE WHEN YEARWEEK(`date`, 1) = YEARWEEK(CURDATE(), 1) THEN 1 ELSE 0 END) AS upcoming_this_week,
//     SUM(CASE WHEN YEAR(`date`) = YEAR(CURDATE()) AND MONTH(`date`) = MONTH(CURDATE()) THEN 1 ELSE 0 END) AS upcoming_this_month,
//     SUM(CASE WHEN YEAR(`date`) = YEAR(CURDATE()) THEN 1 ELSE 0 END) AS upcoming_this_year
// FROM saqliqdb
// WHERE status = 'Upcoming Event' AND `date` IS NOT NULL;
//     ";

//     $stmt = $conn->prepare($countAllFurtherEvents);
//     $stmt->execute();
//     $row = $stmt->fetch(PDO::FETCH_ASSOC);

//     $week = $row['upcoming_this_week'] ?? 0;
//     $month = $row['upcoming_this_month'] ?? 0;
//     $year = $row['upcoming_this_year'] ?? 0;

//     // dashboardStructure(
//     //     $week,
//     //     $month,
//     //     $year,
//     //     "Total Upcoming Events This Week",
//     //     "Total Upcoming Events This Month",
//     //     "Total Upcoming Events This Year"
//     // );
// }


function rowTableStructure($rows, $message)
{

    if (count($rows) === 0) {
        /// message sa table kung walang post na announcement at event
        echo '<th colspan="5" class="text-gray-500 dark:text-gray-400 text-center py-4 w-full text-center text-sm">No ' . $message . ' have been added yet</th>';
        return;
    }
    foreach ($rows as $values) {

        $today = date('Y-m-d');

        if ($values['date'] > $today) {
            $values['status'] = "Upcoming Event";
        } elseif ($values['date'] == $today) {
            $values['status'] = "Ongoing Event";
        } else {
            $values['status'] = "Completed Event";
        }

        if ($values['type'] === "Event") {
            echo '<tr class="border-b dark:border-slate-800 text-[#212529] dark:text-white">
        <td class="px-6 py-4 font-semibold">' . $values['title'] . '</td>
        <td class="px-6 py-4 whitespace-nowrap"><span class="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2 py-1 whitespace-nowrap text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300"><span class=" size-1.5 rounded-full bg-green-600"></span>' . $values["type"] . '  [' . $values['status'] . ']</span></td>
                                    <td class="px-6 py-4 whitespace-nowrap">' . $values['date'] . ' [<b>' . $values['location'] . '</b>]</td>
                                    <td class="px-6 py-4 whitespace-nowrap">' . $values['subtype'] . '</td>
                                    <td class="px-6 py-4 text-right">
                                        <div class="flex items-center justify-end gap-2">
                                    
                                     <button type="submit" name="editButton" data-id=' . $values['id'] . ' class="editButton p-1.5 text-[#6C757D] dark:text-slate-400 hover:text-red-500">
                                     <span class="material-symbols-outlined">edit</span>
                                     </button>
                                     <button type="submit" name="deleteButton" data-id=' . $values['id'] . ' class="deleteButton p-1.5 text-[#6C757D] dark:text-slate-400 hover:text-red-500">
                                     <span class="material-symbols-outlined">delete</span>
                                     </button>
                                        </div>
                                    </td>
                                    </tr>';
        } else if ($values['type'] === "Announcement") {
            echo '<tr class="border-b dark:border-slate-800 text-[#212529] dark:text-white">
        <td class="px-6 py-4 font-semibold">' . $values['title'] . '</td>
        <td class="px-6 py-4 whitespace-nowrap"><span class="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-2 py-1 whitespace-nowrap text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300"><span class=" size-1.5 rounded-full bg-green-600"></span>' . $values["type"] . '</span></td>
                                    <td class="px-6 py-4 whitespace-nowrap">' . $values['date'] . '</td>
                                    <td class="px-6 py-4 whitespace-nowrap">' . $values['category'] . '</td>
                                    <td class="px-6 py-4 text-right">
                                        <div class="flex items-center justify-end gap-2">
                                           
                                       
                                   <button type="submit" name="editButton" data-id=' . $values['id'] . ' class="editButton p-1.5 text-[#6C757D] dark:text-slate-400 hover:text-red-500">
                                     <span class="material-symbols-outlined">edit</span>
                                     </button>
                                     <button type="submit" name="deleteButton"   data-id=' . $values['id'] . ' class="deleteButton p-1.5 text-[#6C757D] dark:text-slate-400 hover:text-red-500">
                                     <span class="material-symbols-outlined">delete</span>
                                     </button>
                                        </div>
                                    </td>
                                    </tr>';
        }
    }
}


/// START TABLE ROW LOGIC
function readAllTypesTable($selectedSort, $selectedOrder)
{
    try {
        include 'connect.php';

        $sql = "SELECT * FROM saqliqdb ORDER BY $selectedSort $selectedOrder";

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        rowTableStructure($rows, "announcements and events");
    } catch (Exception $th) {
        echo "Error in" . $th->getMessage();
    }
}

function readAllTableAnnouncements($selectedSort, $selectedOrder)
{


    try {
        include 'connect.php';
        if ($selectedSort === 'category') {
            $sql = "SELECT * FROM saqliqdb 
            WHERE type='Announcement' AND category IS NOT NULL 
            ORDER BY category $selectedOrder";
        } else {
            $sql = "SELECT * FROM saqliqdb 
            WHERE type='Announcement' 
            ORDER BY $selectedSort $selectedOrder";
        }
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        rowTableStructure($rows, "announcements");
    } catch (Exception $th) {
        echo "Error in " . $th->getMessage();
    }
}

function readAllSubtypeEvents($selectedSort, $selectedOrder)
{

    try {
        include 'connect.php';
        $sql = "SELECT * FROM saqliqdb WHERE type='Event' ORDER BY $selectedSort $selectedOrder";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        rowTableStructure($rows, "events");
    } catch (Exception $th) {
        echo "Error in " . $th->getMessage();
    }
}


function readAllSearchResultsTable()
{
    try {
        include 'connect.php';

        // Kunin ang search term, siguraduhing hindi ito null
        $searchBarResult = isset($_POST['adminSearchInput']) ? $_POST['adminSearchInput'] : '';
        $searchPattern = '%' . $searchBarResult . '%';

        // Ihanda at isagawa ang query
        $sql = 'SELECT * FROM saqliqdb WHERE title LIKE :searchPattern';
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(":searchPattern", $searchPattern);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Gamitin ang existing function para i-display ang resulta o "no results" message
        rowTableStructure($rows, $searchBarResult);
    } catch (Exception $th) {
        echo "Error in " . $th->getMessage();
    }
}

function readAllEventsStatus($selectedSort, $selectedOrder)
{

    try {
        include 'connect.php';
        $sql = "SELECT * FROM saqliqdb WHERE type='Event' ORDER BY $selectedSort $selectedOrder";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        rowTableStructure($rows, "events");
    } catch (Exception $th) {
        echo "Error in" . $th->getMessage();
    }
}

function readUpcomingEventsTable($selectedSort, $selectedOrder)
{

    include 'connect.php';
    // This query now correctly filters for upcoming events ONLY within the current year.
    $sql = "SELECT * FROM saqliqdb 
            WHERE type = 'Event' AND date > CURDATE() AND YEAR(date) = YEAR(CURDATE()) 
            ORDER BY $selectedSort $selectedOrder";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    try {
        rowTableStructure($rows, "upcoming events for the current year");
    } catch (Exception $th) {
        echo "Error in " . $th->getMessage();
    }
}

/// END TABLE ROW LOGIC








/// CREATE ANNOUNCEMENT LOGIC
function publishAnnouncement()
{
    try {

        include 'connect.php';

        if (isset($_POST['publishAnnouncement'])) {
            $title = $_POST['title'];
            $content = $_POST['content'];
            $category = $_POST['category'] ?? "";
            $date = $_POST['date'];

            $sql = "INSERT INTO saqliqdb (title,content,category,date,type)
            VALUES(:title, :content, :category, :date, :type)";
            $stmt = $conn->prepare($sql);
            $stmt->bindValue(":title", $title);
            $stmt->bindValue(":content", $content);
            $stmt->bindValue(":category", $category);
            $stmt->bindValue(":date", $date);
            $stmt->bindValue(":type", "Announcement");
            $stmt->execute();
        }
    } catch (Exception $th) {
        echo "Error in " . __FUNCTION__ . ": " . $th->getMessage();
    }
}
/// END ANNOUNCEMENT LOGIC



/// START EVENT LOGIC
function publishEvent()
{

    try {
        include "connect.php";

        if (isset($_POST['publishEvent'])) {

            $title = $_POST['title'];
            $content = $_POST['content'];
            $subtype = $_POST['subtype'];
            $date = $_POST['date'];
            $location = $_POST['location'];
            $status = $_POST['status'] ?? "";

            $today = date('Y-m-d');
            if ($date > $today) {
                $status = 'Upcoming Event';
            } elseif ($date === $today) {
                $status = 'Ongoing Event';
            } else {
                $status = 'Completed Event';
            }

            $sql = "INSERT INTO saqliqdb (title,content,subtype,date,location,type,status) VALUES(:title, :content, :subtype, :date, :location, :type, :status)";
            $stmt = $conn->prepare($sql);
            $stmt->bindValue(":title", $title);
            $stmt->bindValue(":content", $content);
            $stmt->bindValue(":subtype", $subtype);
            $stmt->bindValue(":date", $date);
            $stmt->bindValue(":type", "Event");
            $stmt->bindValue(":location", $location);
            $stmt->bindValue(":status", $status);
            $stmt->execute();
        }
    } catch (Exception $th) {
        echo "Error in " . $th->getMessage();
    }
}
/// END EVENT LOGIC
