-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 02, 2024 at 02:37 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `listelligent`
--

-- --------------------------------------------------------

--
-- Table structure for table `agent_zipcode`
--

CREATE TABLE `agent_zipcode` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `zip_id` int(11) NOT NULL,
  `start_date` datetime NOT NULL DEFAULT current_timestamp(),
  `end_date` datetime NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `zip_code` int(11) NOT NULL,
  `city` varchar(155) NOT NULL,
  `validity` int(1) NOT NULL DEFAULT 0,
  `zip_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lead`
--

CREATE TABLE `lead` (
  `id` int(11) NOT NULL,
  `name` varchar(155) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(155) DEFAULT NULL,
  `zip_code` int(11) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lead`
--

INSERT INTO `lead` (`id`, `name`, `phone`, `email`, `address`, `zip_code`, `status`, `created_at`, `updated_at`) VALUES
(1, 'test user', '123547', '6cmbgrndmx@skygazerhub.com', '232, parlk avenue road', 362265, 0, '2023-12-27 13:31:04', '2024-01-01 18:26:39'),
(2, 'test user', '123547', '6cmbgrndmx@skygazerhub.com', '232, parlk avenue road', 362265, 0, '2023-12-27 13:42:33', '2024-01-01 18:15:52'),
(3, 'User from front side', '14565445   ', '6cmbgrndmx@skygazerhub.com', '232, Junagadh Raod', 362265, 0, '2024-01-02 10:48:01', '2024-01-02 11:15:36'),
(4, 'Jayesh Naghera', '14565445   ', 'jayesh@skygazerhub.com', '232, Junagadh Raod', 362001, 0, '2024-01-02 12:25:28', '2024-01-02 12:25:28'),
(5, 'Jayesh Naghera', '09033389733', 'rjnaghera@gmail.com', 'Test', 0, 0, '2024-01-02 13:31:23', '2024-01-02 13:31:23'),
(6, 'Jayesh Naghera', '9033389733', 'rjnaghera@gmail.com', 'Test', 0, 0, '2024-01-02 13:34:15', '2024-01-02 13:34:15'),
(7, 'Jayesh Naghera', '09033389733', 'rjnaghera@gmail.com', 'Test', 362268, 0, '2024-01-02 13:44:53', '2024-01-02 13:44:53'),
(8, 'Jayesh Naghera', '09033389733', 'rjnaghera@gmail.com', 'Test', 362001, 0, '2024-01-02 15:29:06', '2024-01-02 15:29:06'),
(9, 'Jayesh Naghera', '09033389733', 'rjnaghera@gmail.com', 'Test', 362001, 0, '2024-01-02 15:33:07', '2024-01-02 15:33:07'),
(10, 'Jayesh Naghera', '09033389733', 'rjnaghera@gmail.com', 'Test', 362001, 0, '2024-01-02 15:34:21', '2024-01-02 15:34:21'),
(11, 'Jayesh Naghera', '09033389733', 'rjnaghera@gmail.com', 'Test', 362001, 0, '2024-01-02 15:36:56', '2024-01-02 15:36:56'),
(12, 'Jayesh Naghera', '09033389733', 'rjnaghera@gmail.com', 'Test', 362268, 0, '2024-01-02 15:43:28', '2024-01-02 15:43:28'),
(13, 'Jayesh Naghera', '09033389733', 'rjnaghera@gmail.com', 'Test', 362268, 0, '2024-01-02 15:44:45', '2024-01-02 15:44:45'),
(14, 'Jayesh Naghera', '09033389733', 'rjnaghera@gmail.com', 'Test', 362001, 0, '2024-01-02 15:57:20', '2024-01-02 15:57:20'),
(15, 'Jayesh Naghera', '09033389733', 'rjnaghera@gmail.com', 'Test', 362268, 0, '2024-01-02 16:24:24', '2024-01-02 16:24:24'),
(16, 'Jayesh Naghera', '09033389733', 'rjnaghera@gmail.com', 'Test', 362268, 0, '2024-01-02 16:26:24', '2024-01-02 16:26:24'),
(17, 'Jayesh Naghera', '09033389733', 'rjnaghera@gmail.com', 'Test', 362268, 0, '2024-01-02 16:28:18', '2024-01-02 16:28:18'),
(18, 'User test form', '1236549870', 'test@mail.com', 'Testing address', 362730, 0, '2024-01-02 18:22:02', '2024-01-02 18:22:02'),
(19, 'Dev', '12328554', 'jayesh@besticoder.com', 'Test', 362268, 0, '2024-01-02 18:58:48', '2024-01-02 18:58:48'),
(20, 'Jayesh Naghera', '09033389733', 'rjnaghera@gmail.com', 'Test', 362268, 0, '2024-01-02 19:03:50', '2024-01-02 19:03:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `license` varchar(255) NOT NULL,
  `license_date` date NOT NULL,
  `mls_id` varchar(255) NOT NULL,
  `brokerage` varchar(255) NOT NULL,
  `office_address` varchar(255) NOT NULL,
  `building` varchar(255) NOT NULL,
  `zip_code` int(11) NOT NULL DEFAULT 0,
  `hp_address` varchar(255) NOT NULL,
  `hp_zip_code` varchar(255) NOT NULL,
  `hp_sales_price` varchar(10) NOT NULL,
  `realtor_profile` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` int(1) NOT NULL DEFAULT 0,
  `status` int(1) NOT NULL DEFAULT 0,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `license`, `license_date`, `mls_id`, `brokerage`, `office_address`, `building`, `zip_code`, `hp_address`, `hp_zip_code`, `hp_sales_price`, `realtor_profile`, `email`, `role`, `status`, `password`, `created_at`, `updated_at`) VALUES
(1, 'Vishal Ghodadara', '123456', '2023-12-05', '123456', 'Vishal', '199 Street', 'Swaraj Building', 362225, 'Address Two', '362222', '4922', 'name', 'vishal.besticoder@gmail.com', 1, 1, '$2a$11$fCg11cAgOk7RvVCffz7TuulHBoIYOMATc6iq6PjtlbbB5ieju4dG2', '2023-12-26 13:14:42', '0000-00-00 00:00:00'),
(2, 'Kandarp Gareja', '986321', '2023-12-20', '53197', 'Testing Porpose', 'Address 1', 'Street Road', 362240, 'Address 2', '362154', '3665', 'Profile Link', 'kano.gareja84@gmail.com', 1, 1, '$2b$10$v7uDQ0pfT8oZZNeQQ0jtC.TeKQu9SEfl8dbGED1xJy8mp17easnU.', '2023-12-26 13:14:42', '0000-00-00 00:00:00'),
(3, 'admin', '', '0000-00-00', '', '', '', '', 0, '', '', '', '', 'admin@gmail.com', 0, 0, '$2a$11$RV2U2FZxI2y1W8CYD/IjC.RVvyhMoAOk9A70xX3c.dqsOo5fDSCLy', '2023-12-26 13:14:42', '2023-12-26 15:45:47'),
(4, 'Vijay Dodiya', '15243634', '2023-12-06', '13675', 'Testing Perposer', 'Address 1', 'Street Road', 235796, 'Address 2', '135546', '1204', 'Testing Link', 'vishal.besticoder@gmail.com', 1, 0, '', '2023-12-26 13:14:42', '0000-00-00 00:00:00'),
(5, 'fsdf', 'sfsf', '2023-12-22', 'adad', 'adad', 'adad', 'adad', 0, 'daad', 'adad', 'adad', 'adad', 'vishal.besticoder@gmail.com', 1, 0, '', '2023-12-26 13:14:42', '0000-00-00 00:00:00'),
(8, 'Jayesh Naghera', 'ABC123', '2023-01-01', 'MLS123', 'XYZ Realty', '123 Main St', 'Building A', 12345, '456 Side St', '67890', '500000', 'Lorem ipsum...', 'jayesh.besticoder@gmail.com', 1, 1, '$2a$11$RV2U2FZxI2y1W8CYD/IjC.RVvyhMoAOk9A70xX3c.dqsOo5fDSCLy', '2023-12-26 15:16:46', '2023-12-27 09:45:35'),
(18, 'Test agent', '123456', '2025-12-12', '1232', '4546545', '12232', '4545', 212121, '12121', '21212', '212121', '1212', '6cmbgrndmx@skygazerhub.com', 1, 1, '$2a$11$3rIZvvL3IC7OR5OwHC/5Ou2Z.3ZEvxXzkBKrALP6uoCQWIIk0VMAO', '2023-12-28 15:14:17', '2024-01-01 13:42:05'),
(19, 'Agent test 2', '12345', '2024-12-12', '123', '12123', '123', '113', 362001, '3662', '362001', '122', '155', 'ziylgchhs7@sfolkar.com', 1, 1, '$2a$11$XGZ5QFLLUUAYSWOZLEwvCOpfpkQkK9RSimA6FO4CuI9hJYzWWx8lq', '2024-01-02 12:12:21', '2024-01-02 12:12:51');

-- --------------------------------------------------------

--
-- Table structure for table `zip_codes`
--

CREATE TABLE `zip_codes` (
  `id` int(11) NOT NULL,
  `city` varchar(100) DEFAULT NULL,
  `zip_code` int(15) NOT NULL DEFAULT 0,
  `prize` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zip_codes`
--

INSERT INTO `zip_codes` (`id`, `city`, `zip_code`, `prize`, `status`) VALUES
(1, 'Veraval', 362265, '1500.00', 1),
(2, 'Patan', 362266, '850.00', 1),
(3, 'Bhalpara', 362268, '850.00', 1),
(4, 'Junagadh', 362001, '1800.00', 1),
(8, 'Kodinar', 456789, '1111.00', 1),
(10, 'Amreli', 362730, '850.00', 0),
(12, 'Rajokt', 356789, '2800.00', 1),
(13, 'Baroda', 147852, '3500.00', 1),
(14, 'Surat', 369852, '2300.00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `zip_orders`
--

CREATE TABLE `zip_orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zip_orders`
--

INSERT INTO `zip_orders` (`id`, `user_id`, `total`, `transaction_id`, `created_at`, `updated_at`) VALUES
(1, 18, '1500.00', 'just test', '2024-01-01 18:03:00', '2024-01-01 18:03:00'),
(2, 18, '1500.00', 'just test', '2024-01-01 18:03:16', '2024-01-01 18:03:16'),
(5, 18, '1500.00', 'just test', '2024-01-01 18:06:22', '2024-01-01 18:06:22'),
(6, 18, '850.00', 'just test', '2024-01-01 18:39:07', '2024-01-01 18:39:07'),
(7, 19, '1800.00', 'just test', '2024-01-02 12:23:41', '2024-01-02 12:23:41'),
(8, 18, '4350.00', 'just test', '2024-01-02 13:48:06', '2024-01-02 13:48:06');

-- --------------------------------------------------------

--
-- Table structure for table `zip_orders_product`
--

CREATE TABLE `zip_orders_product` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `zip_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `zip_code` int(11) NOT NULL,
  `city` varchar(150) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zip_orders_product`
--

INSERT INTO `zip_orders_product` (`id`, `order_id`, `zip_id`, `user_id`, `zip_code`, `city`, `price`, `start_date`, `end_date`, `status`) VALUES
(1, 1, 1, 18, 362265, 'Veraval', '1500.00', '2024-01-01', '2024-02-01', 1),
(2, 2, 1, 18, 362265, 'Veraval', '1500.00', '2024-01-01', '2024-02-01', 1),
(5, 5, 1, 18, 362265, 'Veraval', '1500.00', '2024-01-01', '2024-02-01', 1),
(6, 6, 2, 18, 362266, 'Patan', '850.00', '2024-01-01', '2024-02-01', 1),
(7, 7, 4, 19, 362001, 'Junagadh', '1800.00', '2024-01-02', '2024-02-02', 1),
(8, 8, 3, 18, 362268, 'Bhalpara', '850.00', '2024-01-02', '2024-02-02', 1),
(9, 8, 2, 18, 362266, 'Patan', '850.00', '2024-01-02', '2024-02-02', 1),
(10, 8, 4, 18, 362001, 'Junagadh', '1800.00', '2024-01-02', '2024-02-02', 1),
(11, 8, 10, 18, 362730, 'Amreli', '850.00', '2024-01-02', '2024-02-02', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agent_zipcode`
--
ALTER TABLE `agent_zipcode`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lead`
--
ALTER TABLE `lead`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zip_codes`
--
ALTER TABLE `zip_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zip_orders`
--
ALTER TABLE `zip_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zip_orders_product`
--
ALTER TABLE `zip_orders_product`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agent_zipcode`
--
ALTER TABLE `agent_zipcode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `lead`
--
ALTER TABLE `lead`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `zip_codes`
--
ALTER TABLE `zip_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `zip_orders`
--
ALTER TABLE `zip_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `zip_orders_product`
--
ALTER TABLE `zip_orders_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
