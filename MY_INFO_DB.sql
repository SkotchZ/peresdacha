-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 16 2017 г., 17:46
-- Версия сервера: 5.5.53
-- Версия PHP: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `MY_INFO_DB`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Team`
--

CREATE TABLE `Team` (
  `id` int(11) DEFAULT NULL,
  `name` char(50),
  `age` int(11) DEFAULT NULL,
  `work_exp_years` int(11) DEFAULT NULL,
  `describe` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `Team`
--

INSERT INTO `Team` (`id`, `name`, `age`, `work_exp_years`, `describe`) VALUES
(1, 'Tom Voronov', 21, 1, 'Makes videos'),
(2, 'Svetlana Kotova', 32, 7, 'Sound director'),
(3, 'Olesya Ishina', 27, 6, 'Programmer department maneger');

-- --------------------------------------------------------

--
-- Структура таблицы `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `login` char(50) NOT NULL,
  `pass` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `Users`
--

INSERT INTO `Users` (`id`, `login`, `pass`) VALUES
(1, 'admin', 'kek'),
(2, 'user1', '123'),
(3, 'user2', '456');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
