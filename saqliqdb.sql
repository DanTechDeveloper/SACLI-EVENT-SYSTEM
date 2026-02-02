-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 03, 2026 at 02:29 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
-- Table structure for table `saqliqdb`
--

CREATE TABLE `saqliqdb` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `subtype` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `status` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `saqliqdb`
--

INSERT INTO `saqliqdb` (`id`, `title`, `category`, `content`, `subtype`, `date`, `location`, `type`, `status`) VALUES
(90, 'SACLI 40TH ANNIVERSARY', NULL, 'sgsfgsfg', 'School Activity', '2025-12-27', 'SACLI GYMNASIUM', 'Event', 'Upcoming Event'),
(92, 'sgfdfgdfgdfgddf', 'Holiday', 'gdfgdfgdfg', NULL, '2025-12-31', NULL, 'Announcement', NULL),
(94, 'v cvv', 'Holiday', 'bvbvbvbvbv', NULL, '2025-12-25', NULL, 'Announcement', NULL),
(95, 'Et quam deserunt aut', 'Academic', 'Duis omnis expedita ', NULL, '1979-01-02', NULL, 'Announcement', NULL),
(96, 'Consequat Corrupti', 'Sports', 'Occaecat ipsa simil', NULL, '1971-04-01', NULL, 'Announcement', NULL),
(97, 'Quod eaque tenetur d', 'Holiday', 'Blanditiis dolore ve', NULL, '2000-01-27', NULL, 'Announcement', NULL),
(98, 'Aperiam cupidatat ne', 'Academic', 'Laborum totam ad vol', NULL, '1983-02-17', NULL, 'Announcement', NULL),
(99, 'Amet illo dolorum n', 'Sports', 'Sunt nihil exercita', NULL, '2009-11-18', NULL, 'Announcement', NULL),
(100, 'Lorem recusandae At', 'Holiday', 'Voluptatem tempore ', NULL, '1988-06-05', NULL, 'Announcement', NULL),
(101, 'Cum impedit eum qui', NULL, 'Magna esse ipsam rep', 'School Activity', '1983-11-02', 'Aut iure quisquam do', 'Event', 'Completed Event'),
(102, 'Voluptas animi ut t', NULL, 'Aut inventore sit a', 'School Activity', '2015-09-19', 'Sit consequatur Na', 'Event', 'Completed Event'),
(103, 'Et accusamus culpa ', NULL, 'Exercitationem sunt ', 'General Event', '1975-06-08', 'Natus modi explicabo', 'Event', 'Completed Event'),
(104, 'Repudiandae vel quib', NULL, 'Omnis rem modi praes', 'School Activity', '2025-05-02', 'Qui irure ut eius et', 'Event', 'Completed Event'),
(105, 'Aut id repudiandae ', NULL, 'Quis pariatur Sit a', 'Campus Program', '2017-04-04', 'Neque eu ea nisi rep', 'Event', 'Completed Event'),
(106, 'Quis quo perspiciati', NULL, 'Enim velit voluptas', 'Campus Program', '1986-05-12', 'Consequuntur porro v', 'Event', 'Completed Event'),
(107, 'Doloribus libero off', NULL, 'Adipisci et et qui a', 'School Activity', '2003-10-24', 'Nisi quia tempor aut', 'Event', 'Completed Event');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `saqliqdb`
--
ALTER TABLE `saqliqdb`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `saqliqdb`
--
ALTER TABLE `saqliqdb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
