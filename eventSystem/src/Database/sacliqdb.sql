-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 28, 2026 at 04:41 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sacliqdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `author` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `title`, `description`, `category`, `created_at`, `author`, `status`) VALUES
(20, 'Ullam temporibus com', 'Dolore reprehenderit', 'REMINDER', '2026-04-21 02:15:13', 'Eu vel commodo quisq', 'approved'),
(21, 'Perferendis dolore d', 'Eius non alias adipi', 'REMINDER', '2026-04-21 13:58:20', 'Soluta voluptatibus ', 'approved'),
(22, 'Neque molestiae quia', 'Obcaecati et dolore ', 'ACHIEVEMENT', '2026-04-23 00:56:33', 'Quia exercitation vo', 'approved'),
(23, 'Cillum quia sunt sin', 'Aspernatur nobis et ', 'IMPORTANT', '2026-04-23 01:02:19', 'Aut voluptatem exce', 'approved');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(100) NOT NULL,
  `event_date` date NOT NULL,
  `event_time` time NOT NULL,
  `event_time_end` time DEFAULT NULL,
  `criteria` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `event_author` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `category`, `event_date`, `event_time`, `event_time_end`, `criteria`, `location`, `created_at`, `event_author`, `status`) VALUES
(36, 'Odit saepe dolore en', 'Ut nihil vitae quia ', 'Technology', '2026-04-23', '05:18:00', '23:31:00', 'Online', 'Occaecat quod repell', '2026-04-23 02:38:14', 'Eos voluptatem in l', 'approved'),
(37, 'Laboriosam possimus', 'Ut quia sit sint con', 'Programming', '2026-04-23', '01:52:00', '20:35:00', 'Free', 'Et esse dolore ullam', '2026-04-23 02:41:02', 'Pariatur Ad quia ob', 'approved'),
(38, 'Et libero neque eaqu', 'Et enim amet molest', 'Campus Program', '2026-04-30', '01:03:00', '13:11:00', 'Online', 'Exercitationem qui q', '2026-04-23 02:42:24', 'Non dolores error qu', 'approved'),
(39, 'Delectus minima ull', 'Facere sed ab laudan', 'Campus Program', '2026-04-30', '05:36:00', '05:39:00', 'Free', 'Qui quidem ut quod e', '2026-04-23 02:43:54', 'At sed eos quis ull', 'approved'),
(40, 'WOW', 'flsdjflskdjflk', 'WOW', '2026-04-01', '10:57:15', '10:57:15', 'WOW', 'adna,dsam', '2026-04-23 02:58:02', 'sdadasdasd', 'approved'),
(41, 'SACLI 40TH Anniversarry', 'slndlfjdsnfjsdfhl', 'sdjlfkdshlfkhsd', '2026-04-01', '17:33:11', '17:33:11', 'FREE', 'San Lorenzo Batangas', '2026-04-23 09:34:04', 's;fldfsd;flk', 'approved'),
(42, 'Non quia fugiat dol', 'In pariatur Magni c', 'Programming', '2026-03-04', '07:45:00', '15:27:00', 'Online', 'Voluptas amet enim ', '2026-04-23 12:06:59', 'Tempor esse sunt a', 'approved'),
(43, 'Ut provident est do', 'Vel ut ipsa repudia', 'Health', '2026-04-26', '05:49:00', '07:19:00', 'Online', 'Vel culpa incididun', '2026-04-26 14:47:25', 'Ab harum dolores in ', 'approved');

-- --------------------------------------------------------

--
-- Table structure for table `event_participants`
--

CREATE TABLE `event_participants` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `joined_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(255) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event_participants`
--

INSERT INTO `event_participants` (`id`, `student_id`, `event_id`, `joined_at`, `status`) VALUES
(4, 7, 39, '2026-04-25 01:49:25', 'joined'),
(5, 7, 43, '2026-04-26 14:47:53', 'joined'),
(6, 9, 39, '2026-04-27 06:05:02', 'joined'),
(7, 7, 38, '2026-04-27 06:06:27', 'joined');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `fullName` varchar(150) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `fullName`, `email`, `password`, `profile_picture`, `phone_number`) VALUES
(1, 'Kyra Marks', 'lijybyrufy@mailinator.com', '$2y$10$hWVoKMFby1plPG4YJVEzaOfCaCtDD3oAJ5bcs1ZnICCa3aVm4BB..', NULL, ''),
(2, 'Donna Wilkerson', 'tulyhamuly@mailinator.com', '$2y$10$QclfbvGN7z4U1hUgdnTA/OTHnM67kNy/ztKGKlRYKKrgFRLEx0TQa', NULL, ''),
(3, 'Herman Hatfield', 'jiqy@mailinator.com', '$2y$10$uOJ6Iy4uTa/XqaMYhP.xWuF1KDjLaYYwpgmtJNbb9Lh7H5KZYK5ry', NULL, ''),
(7, 'Dan Cedreck Monsalve', 'dancedreck456@gmail.com', '$2y$10$O869Dfcet68zy0.y6.GTNu.QtTe1.J90Cpt26VEBpTePq4hdFD6GW', 'https://lh3.googleusercontent.com/a/ACg8ocL3wNCLvrROFz_f_UkU5pzaEFYBkQ9m9AFp7lImVQPaQE_usp9E=s96-c', NULL),
(9, 'Juan Dela Cruz', 'dantemonsalve69@gmail.com', '$2y$10$vblzbdW0qAKaFiBfOjpS/uPsmkpFcPEy6otP7E59duU7I7Jb/tnR2', 'https://lh3.googleusercontent.com/a/ACg8ocLiOARCjUpQJb4AYKT7yB3a6syVzQJJiRZC9ECi2WcqOK7vOG4=s96-c', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users_comment`
--

CREATE TABLE `users_comment` (
  `id` int(11) NOT NULL,
  `pictures` text DEFAULT NULL,
  `videos` text DEFAULT NULL,
  `comment_description` text NOT NULL,
  `event_participant_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_comment`
--

INSERT INTO `users_comment` (`id`, `pictures`, `videos`, `comment_description`, `event_participant_id`, `created_at`) VALUES
(2, NULL, NULL, 'Voluptatem laboriosa', 5, '2026-04-27 05:57:56'),
(3, NULL, NULL, 'Voluptatem laboriosa', 5, '2026-04-27 05:57:56'),
(4, NULL, NULL, 'fgdfgfg', 4, '2026-04-27 05:57:56'),
(5, NULL, NULL, 'vxcvvxcv', 4, '2026-04-27 05:57:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event_participants`
--
ALTER TABLE `event_participants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`,`event_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users_comment`
--
ALTER TABLE `users_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_comment_ibfk_1` (`event_participant_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `event_participants`
--
ALTER TABLE `event_participants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users_comment`
--
ALTER TABLE `users_comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `event_participants`
--
ALTER TABLE `event_participants`
  ADD CONSTRAINT `event_participants_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
  ADD CONSTRAINT `event_participants_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

--
-- Constraints for table `users_comment`
--
ALTER TABLE `users_comment`
  ADD CONSTRAINT `users_comment_ibfk_1` FOREIGN KEY (`event_participant_id`) REFERENCES `event_participants` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
