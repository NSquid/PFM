-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2024 at 02:18 PM
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
-- Database: `pfm-web`
--

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `ID` int(11) NOT NULL,
  `Type` enum('income','outcome') NOT NULL,
  `Amount` int(11) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`ID`, `Type`, `Amount`, `Description`, `Date`) VALUES
(60, 'income', 150000, '-', '2024-04-27'),
(61, 'outcome', 100000, '-', '2024-04-27'),
(62, 'outcome', 100000, '-', '2024-04-27'),
(63, 'income', 11111, 'a', '2024-04-27'),
(64, 'income', 66666, '-', '2024-04-28'),
(65, 'income', 66666, '-', '2024-04-28'),
(66, 'income', 66666, '-', '2024-04-28'),
(67, 'income', 66666, '-', '2024-04-28'),
(68, 'income', 66666, '-', '2024-04-28'),
(69, 'income', 66666, '-', '2024-04-28'),
(70, 'income', 66666, '-', '2024-04-28'),
(71, 'income', 66666, '-', '2024-04-28'),
(72, 'income', 66666, '-', '2024-04-28'),
(73, 'income', 66666, '-', '2024-04-28'),
(74, 'income', 66666, '-', '2024-04-28'),
(75, 'income', 66666, '-', '2024-04-28'),
(76, 'income', 66666, '-', '2024-04-28'),
(77, 'income', 66666, '-', '2024-04-28'),
(78, 'income', 66666, '-', '2024-04-28'),
(79, 'income', 66666, '-', '2024-04-28'),
(80, 'income', 66666, '-', '2024-04-28'),
(81, 'income', 66666, '-', '2024-04-28'),
(82, 'income', 66666, '-', '2024-04-28'),
(83, 'income', 66666, '-', '2024-04-28'),
(84, 'income', 66666, '-', '2024-04-28'),
(85, 'income', 66666, '-', '2024-04-28');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `valueSett` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `valueSett`) VALUES
(1, 12345);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
