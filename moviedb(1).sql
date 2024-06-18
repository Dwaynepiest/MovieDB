-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 18 jun 2024 om 11:22
-- Serverversie: 10.4.32-MariaDB
-- PHP-versie: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `moviedb`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `genres`
--

CREATE TABLE `genres` (
  `id` int(11) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `genres`
--

INSERT INTO `genres` (`id`, `genre`) VALUES
(1, 'Drama'),
(2, 'Unknown'),
(3, 'Comedy'),
(4, 'Documentary'),
(5, 'Game-Show'),
(6, 'Reality-TV');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `movies`
--

CREATE TABLE `movies` (
  `id` int(11) DEFAULT NULL,
  `movie_type` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `minutes` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `movies`
--

INSERT INTO `movies` (`id`, `movie_type`, `title`, `year`, `minutes`) VALUES
(375282, 1, 'La comadre', 1981, 45),
(375284, 1, 'Comer es un placer', 1986, 120),
(375289, 1, 'Computer control alt delete', 1994, 50);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `movie_types`
--

CREATE TABLE `movie_types` (
  `id` int(11) DEFAULT NULL,
  `movie_type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `movie_types`
--

INSERT INTO `movie_types` (`id`, `movie_type`) VALUES
(1, 'TV MiniSeries'),
(2, 'TV Series'),
(3, 'Movie'),
(4, 'Short'),
(5, 'TV Movie'),
(6, 'TV Episode'),
(7, 'TV Special'),
(8, 'Video'),
(9, 'Videogame');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `created_at`) VALUES
(1, 'jordy', '$2y$10$y3TY7hxJ0qYwvFQIJicuxeeWp6.5dnSFHD0.qH.z5wNBDlH640eLm', '2024-06-18 11:10:13'),
(2, 'hondje', '$2y$10$xBLH.Xg2U9OxrAU.4p4HFOaoX/lnTPBRgCFUAkVUhnOEDKCMmHxcC', '2024-06-18 11:16:04'),
(3, 'dikkeboktor', '$2y$10$wnDfxNmfIIOip6l5EQuXXuq2V4zVXxPOOYW2xVOyGBYxq7i1gFUWa', '2024-06-18 11:17:24');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
