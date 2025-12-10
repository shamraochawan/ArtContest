-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2025 at 06:40 AM
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
-- Database: `artecert`
--

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `whatsapp` varchar(20) NOT NULL,
  `artwork_path` varchar(255) DEFAULT NULL,
  `formatted_time` varchar(255) NOT NULL DEFAULT current_timestamp(),
  `submission_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`id`, `name`, `email`, `whatsapp`, `artwork_path`, `formatted_time`, `submission_date`) VALUES
(3, 'Omkar Chawan', 'omkar@gmail.com', '1234567890', 'uploads/6937964417037_Screenshot 2025-11-04 115534.png', '2025-12-09 08:53:48', '2025-12-09 08:53:48'),
(4, 'Omkar Chawan', 'omkar@123', '7821846387', 'uploads/693798e47554b_Screenshot 2025-11-04 122742.png', '2025-12-09 09:05:00', '2025-12-09 09:05:00'),
(5, 'Omkar Chawan', 'Sham@gmail.com', '3214567890', 'uploads/6937cfcb43e5e_Screenshot 2025-11-04 115534.png', '2025-12-09 12:59:15', '2025-12-09 12:59:15'),
(6, 'Omkar Chawan', 'omkar@gmail.com', '7821846387', 'uploads/6938f0e1189bf_Screenshot 2025-11-04 115534.png', '2025-12-10 09:32:41', '2025-12-10 09:32:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
