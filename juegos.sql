-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 18-07-2025 a las 21:02:23
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbjuegos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juegos`
--

CREATE TABLE `juegos` (
  `idjuego` int NOT NULL,
  `idestatus` int NOT NULL,
  `idgenero` int NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` text,
  `fechapublicacion` date DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `valoracion` int DEFAULT NULL,
  `imagen` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `juegos`
--

INSERT INTO `juegos` (`idjuego`, `idestatus`, `idgenero`, `nombre`, `descripcion`, `fechapublicacion`, `precio`, `valoracion`, `imagen`) VALUES
(1, 1, 1, 'Call of Duty: Modern Warfare', 'Juego de disparos en primera persona con una historia intensa.', '2019-10-25', 59.99, 5, 'call-of-duty-modern-warfare-2-remastered_cjat.jpg'),
(2, 1, 1, 'Grand Theft Auto V', 'Juego de mundo abierto con misiones de acción y crimen.', '2013-09-17', 29.99, 2, 'HD-wallpaper-pin-de-lord-tyler-em-gta-art-gta-online-grand-theft-auto-gta-gta-5-money.jpg'),
(3, 1, 1, 'DOOM Eternal', 'Juego de acción rápida con demonios y armas poderosas.', '2020-03-20', 49.99, 4, 'E-DKRE1XMAE_jvC.jpg'),
(4, 1, 2, 'The Legend of Zelda: Breath of the Wild', 'Explora un vasto mundo abierto lleno de secretos.', '2017-03-03', 59.99, 5, '8437192-the-legend-of-zelda-breath-of-the-wild-nintendo-switch-front-cov.jpg'),
(5, 1, 2, 'Uncharted 4: A Thief\'s End', 'Aventura narrativa con exploración y combate.', '2016-05-10', 19.99, 1, '10095064-uncharted-4-a-thiefs-end-playstation-4-front-cover.jpg'),
(6, 1, 2, 'Red Dead Redemption 2', 'Historia épica del viejo oeste con un mundo abierto detallado.', '2018-10-26', 39.99, 3, '358976.jpg'),
(7, 1, 3, 'The Witcher 3: Wild Hunt', 'RPG de mundo abierto con una historia profunda.', '2015-05-19', 29.99, 4, 'the-witcher-3-wild-hunt-blood-and-wine_wzqf.jpg'),
(8, 1, 3, 'Final Fantasy VII Remake', 'Remake del clásico RPG con gráficos modernos.', '2020-04-10', 59.99, 5, 'final-fantasy-vii-remake_ye81.jpg'),
(9, 1, 3, 'Cyberpunk 2077', 'RPG futurista con un mundo abierto detallado.', '2020-12-10', 49.99, 2, 'dg2emwc-77b883c9-3b8a-4e74-a70f-bd377b552c1d.jpg'),
(10, 1, 4, 'FIFA 23', 'Simulador de fútbol con equipos reales y jugadores.', '2022-09-30', 69.99, 1, 'HD-wallpaper-fifa-23-paris-saint-germain-games-fifa23.jpg'),
(11, 1, 4, 'NBA 2K23', 'Simulador de baloncesto con jugadores profesionales.', '2022-09-09', 59.99, 4, '11107059-nba-2k23-arcade-edition-iphone-front-cover.jpg'),
(12, 1, 4, 'Rocket League', 'Combina deportes de coches con fútbol.', '2015-07-07', 26.00, 2, 'rocket-league_csqn.jpg'),
(13, 1, 5, 'Civilization VI', 'Construye un imperio y domina el mundo.', '2016-10-21', 39.99, 1, 'sid-meiers-civilization-vi_h5wc.jpg'),
(14, 1, 5, 'Starcraft II', 'Estrategia en tiempo real con razas únicas.', '2010-07-27', 5.00, 5, 'd1eh8uv-870d132f-3bd4-4850-a37b-c7bb8dc3911a.jpg'),
(15, 1, 5, 'Age of Empires IV', 'Estrategia histórica con civilizaciones icónicas.', '2021-10-28', 49.99, 2, 'AgeofEmpiresIV.png'),
(16, 1, 6, 'Portal 2', 'Resuelve puzzles con portales en un laboratorio.', '2011-04-19', 9.99, 1, 'Portal2.png'),
(17, 1, 6, 'Tetris Effect', 'Versión moderna del clásico Tetris.', '2018-11-09', 29.99, 5, 'TetrisEffect.png'),
(18, 1, 6, 'The Witness', 'Explora una isla llena de puzzles desafiantes.', '2016-01-26', 39.99, 3, 'TheWitness.png'),
(19, 1, 7, 'Counter-Strike: Global Offensive', 'Juego de disparos tácticos en equipo.', '2012-08-21', 8.00, 2, 'Counter-StrikeGlobalOffensive.png'),
(20, 1, 7, 'Rainbow Six Siege', 'Tácticas de equipo en un entorno destructible.', '2015-12-01', 19.99, 4, ''),
(21, 1, 7, 'Apex Legends', 'Battle Royale con héroes únicos.', '2019-02-04', 0.00, 1, ''),
(22, 1, 8, 'The Sims 4', 'Simulador de vida donde creas y controlas personas.', '2014-09-02', 39.99, 1, ''),
(23, 1, 8, 'Microsoft Flight Simulator', 'Simulador de vuelo ultrarrealista.', '2020-08-18', 59.99, 5, 'MicrosoftFlightSimulator.png'),
(24, 1, 8, 'Euro Truck Simulator 2', 'Simula conducir camiones por Europa.', '2012-10-19', 19.99, 5, 'EuroTruckSimulator2.png'),
(25, 1, 9, 'Super Mario Odyssey', 'Aventura de plataformas con Mario.', '2017-10-27', 49.99, 4, ''),
(26, 1, 9, 'Hollow Knight', 'Metroidvania con plataformas y combate.', '2017-02-24', 14.99, 2, ''),
(27, 1, 9, 'Celeste', 'Plataformas desafiantes con una historia emocional.', '2018-01-25', 19.99, 4, ''),
(28, 1, 10, 'Resident Evil Village', 'Supervivencia en un pueblo lleno de horrores.', '2021-05-07', 59.99, 1, ''),
(29, 1, 10, 'Outlast', 'Explora un asilo abandonado mientras escapas de peligros.', '2013-09-04', 19.99, 3, ''),
(30, 1, 10, 'Alien: Isolation', 'Supervivencia en una nave espacial infestada de alienígenas.', '2014-10-07', 29.99, 4, ''),
(31, 1, 11, 'World of Warcraft', 'MMORPG masivo con un mundo persistente.', '2004-11-23', 14.99, 1, ''),
(32, 1, 11, 'Final Fantasy XIV Online', 'MMORPG con una historia épica y expansiva.', '2010-09-30', 12.99, 5, 'FinalFantasyXIVOnline.png'),
(33, 1, 11, 'Guild Wars 2', 'MMORPG gratuito con eventos dinámicos.', '2012-08-28', 0.00, 4, ''),
(34, 1, 12, 'Minecraft', 'Crea y explora mundos generados proceduralmente.', '2011-11-18', 29.99, 2, ''),
(35, 1, 12, 'Terraria', 'Explora y construye en un mundo 2D inspirado en Minecraft.', '2011-05-16', 9.99, 3, ''),
(36, 1, 12, 'No Man\'s Sky', 'Explora un universo infinito con planetas únicos.', '2016-08-09', 29.99, 5, 'NoMansSky.png'),
(37, 1, 13, 'Forza Horizon 5', 'Carreras en un mundo abierto de México.', '2021-11-09', 59.99, 4, ''),
(38, 1, 13, 'Gran Turismo 7', 'Simulador de carreras con coches reales.', '2022-03-04', 69.99, 2, ''),
(39, 1, 13, 'Mario Kart 8 Deluxe', 'Carreras divertidas con personajes de Nintendo.', '2017-04-28', 59.99, 3, ''),
(40, 1, 14, 'Hades', 'Roguelike con una narrativa rica y mecánicas fluidas.', '2020-09-17', 24.99, 4, ''),
(41, 1, 14, 'Dead Cells', 'Roguelike con plataformas y combate rápido.', '2018-08-07', 24.99, 4, ''),
(42, 1, 14, 'Slay the Spire', 'Roguelike mezclado con cartas estratégicas.', '2019-01-23', 24.99, 4, ''),
(43, 1, 15, 'Fortnite', 'Battle Royale con construcción y personalización.', '2017-07-25', 3.00, 1, 'img_680cff3d3b22f2.16339260.png'),
(44, 1, 15, 'PUBG: Battlegrounds', 'Battle Royale táctico con supervivencia.', '2017-12-20', 29.99, 3, ''),
(45, 1, 15, 'Fall Guys', 'Battle Royale estilo minijuegos.', '2020-08-04', 19.99, 5, 'FallGuys.png'),
(46, 1, 16, 'Ori and the Blind Forest', 'Explora un mundo hermoso con plataformas.', '2015-03-11', 19.99, 1, ''),
(47, 1, 16, 'Guacamelee!', 'Metroidvania con humor y lucha.', '2013-04-09', 14.99, 1, ''),
(48, 1, 16, 'Axiom Verge', 'Explora un mundo retro con mecánicas modernas.', '2015-03-31', 19.99, 3, ''),
(49, 1, 17, 'Doki Doki Literature Club!', 'Visual novel con giros inesperados.', '2017-09-22', 2.50, 4, ''),
(50, 1, 17, 'Phoenix Wright: Ace Attorney', 'Resuelve casos legales como abogado.', '2001-10-12', 29.99, 5, 'PhoenixWrightAceAttorney.png'),
(51, 1, 17, 'Steins;Gate', 'Visual novel de ciencia ficción con viajes en el tiempo.', '2009-10-15', 29.99, 3, ''),
(52, 1, 18, 'Resident Evil 2 Remake', 'Remake del clásico de supervivencia.', '2019-01-25', 39.99, 1, ''),
(53, 1, 18, 'Dead by Daylight', 'Supervivencia asimétrica con un asesino.', '2016-06-14', 19.99, 1, ''),
(54, 1, 18, 'The Evil Within', 'Horror psicológico con recursos limitados.', '2014-10-14', 19.99, 4, ''),
(55, 1, 19, 'AdVenture Capitalist', 'Juego idle donde administras negocios.', '2015-04-01', 10.00, 3, ''),
(56, 1, 19, 'Clicker Heroes', 'Juego idle con héroes y monstruos.', '2014-06-10', 3.00, 1, ''),
(57, 1, 19, 'Cookie Clicker', 'Haz clic para hornear galletas infinitamente.', '2013-08-08', 5.00, 2, ''),
(58, 1, 20, 'Street Fighter V', 'Combates uno contra uno con personajes icónicos.', '2016-02-16', 39.99, 5, 'StreetFighterV.png'),
(59, 1, 20, 'Mortal Kombat 11', 'Combates brutales con fatalities.', '2019-04-23', 59.99, 2, ''),
(60, 1, 20, 'Tekken 7', 'Combates 3D con una historia épica.', '2015-03-18', 49.99, 2, ''),
(61, 1, 2, 'God of War', 'Aventura de acción con mitología nórdica.', '2018-04-20', 49.99, 1, ''),
(62, 1, 2, 'Horizon Zero Dawn', 'Explora un mundo post-apocalíptico lleno de máquinas.', '2017-02-28', 39.99, 5, ''),
(63, 1, 3, 'Dark Souls III', 'RPG de acción desafiante.', '2016-03-24', 59.99, 2, ''),
(64, 1, 3, 'Elden Ring', 'RPG de acción y mundo abierto.', '2022-02-25', 59.99, 4, ''),
(65, 1, 4, 'F1 2023', 'Simulador oficial de Fórmula 1.', '2023-06-16', 69.99, 4, 'F12023.png'),
(66, 1, 4, 'Tony Hawk\'s Pro Skater 1 + 2', 'Colección remasterizada de los clásicos de skateboarding.', '2020-09-04', 39.99, 1, 'TonyHawksProSkater1+2.png'),
(67, 1, 8, 'Stardew Valley', 'Simulador de granja y vida rural.', '2016-02-26', 14.99, 2, ''),
(68, 1, 20, 'Among Us', 'Juego multijugador de deducción social.', '2018-11-16', 3.50, 3, ''),
(69, 1, 16, 'Hollow Knight: Silksong', 'Secuela del popular Metroidvania Hollow Knight.', '2024-01-01', 24.99, 5, ''),
(70, 1, 1, 'Sekiro: Shadows Die Twice', 'Acción y sigilo en el Japón feudal.', '2019-03-22', 59.99, 4, 'SekiroShadowsDieTwice.png'),
(71, 1, 3, 'Monster Hunter: World', 'Caza monstruos gigantes en un mundo abierto.', '2018-01-26', 49.99, 5, ''),
(72, 1, 7, 'Overwatch 2', 'Hero shooter en equipo con héroes únicos.', '2022-10-04', 2.80, 4, ''),
(73, 1, 2, 'Assassin\'s Creed Valhalla', 'Explora la era vikinga en Inglaterra.', '2020-11-10', 59.99, 3, ''),
(74, 1, 1, 'Borderlands 3', 'Looter shooter con tono humorístico.', '2019-09-13', 59.99, 1, 'Borderlands3.png'),
(75, 1, 1, 'Minecraft Dungeons', 'Acción y aventuras inspiradas en Minecraft.', '2020-05-26', 19.99, 1, 'MinecraftDungeons.png'),
(76, 1, 10, 'Little Nightmares II', 'Plataformas y terror en un mundo oscuro.', '2021-02-11', 29.99, 3, ''),
(77, 1, 2, 'It Takes Two', 'Aventura cooperativa con mecánicas únicas.', '2021-03-26', 39.99, 5, ''),
(78, 1, 1, 'Control', 'Acción y poderes sobrenaturales en un edificio misterioso.', '2019-08-27', 29.99, 5, 'control.png'),
(79, 1, 2, 'Death Stranding', 'Entrega paquetes en un mundo post-apocalíptico.', '2019-11-08', 59.99, 1, ''),
(80, 1, 2, 'Ghost of Tsushima', 'Conviértete en un samurái en la isla de Tsushima.', '2020-07-17', 59.99, 2, ''),
(81, 1, 3, 'Persona 5 Royal', 'RPG de turno con elementos sociales.', '2019-10-31', 49.99, 4, ''),
(82, 1, 7, 'Halo Infinite', 'Regresa a la saga Halo con un nuevo capítulo.', '2021-12-08', 59.99, 2, ''),
(83, 1, 14, 'Returnal', 'Roguelike con mecánicas de disparos.', '2021-04-30', 69.99, 4, ''),
(84, 1, 1, 'Spider-Man: Miles Morales', 'Asume el papel de Miles Morales como Spider-Man.', '2020-11-12', 49.99, 4, 'Spider-ManMilesMorales.png'),
(85, 1, 2, 'Immortals Fenyx Rising', 'Aventura inspirada en la mitología griega.', '2020-12-03', 59.99, 3, ''),
(86, 1, 1, 'Watch Dogs: Legion', 'Hackea y lucha en una versión futurista de Londres.', '2020-10-29', 59.99, 5, 'WatchDogsLegion.png'),
(87, 1, 17, 'Life is Strange: True Colors', 'Aventura narrativa con poderes emocionales.', '2021-09-10', 39.99, 1, ''),
(88, 1, 1, 'Far Cry 6', 'Rebélde contra un dictador en un mundo abierto.', '2021-10-07', 59.99, 5, 'FarCry6.png'),
(89, 1, 7, 'Back 4 Blood', 'Cooperativo de zombies con mecánicas tácticas.', '2021-10-12', 59.99, 1, ''),
(90, 1, 10, 'Resident Evil Village', 'Supervivencia en un pueblo lleno de horrores.', '2021-05-07', 59.99, 3, ''),
(91, 1, 7, 'Hitman 3', 'Sigilo y asesinatos en ubicaciones icónicas.', '2021-01-20', 59.99, 5, ''),
(92, 1, 9, 'Ratchet & Clank: Rift Apart', 'Aventura interdimensional con plataformas.', '2021-06-11', 69.99, 3, ''),
(93, 1, 2, 'Kena: Bridge of Spirits', 'Acción y aventura con espíritus y combate.', '2021-09-21', 39.99, 1, ''),
(94, 1, 20, 'Chivalry 2', 'Combates medievales multijugador.', '2021-06-08', 39.99, 1, ''),
(95, 1, 9, 'Psychonauts 2', 'Plataformas y aventuras en un mundo mental.', '2021-08-25', 39.99, 4, ''),
(96, 1, 3, 'Diablo II: Resurrected', 'Remake del clásico RPG de acción.', '2021-09-23', 39.99, 1, ''),
(97, 1, 5, 'Age of Empires II: Definitive Edition', 'Estrategia histórica con civilizaciones icónicas.', '2019-11-14', 19.99, 4, ''),
(98, 1, 8, 'Microsoft Flight Simulator', 'Simulador de vuelo ultrarrealista.', '2020-08-18', 59.99, 2, ''),
(99, 1, 12, 'Valheim', 'Supervivencia y exploración en un mundo vikingo.', '2021-02-02', 19.99, 2, ''),
(100, 1, 3, 'Baldur\'s Gate III', 'RPG de fantasía épica basado en D&D.', '2023-08-03', 59.99, 4, ''),
(101, 1, 19, 'PRUEBA DANIEL', 'Juego .', '2015-04-01', 10.00, NULL, ''),
(102, 1, 1, 'xxxxxx', 'ddddd', '2025-04-26', 12.00, 1, 'img_680cfcde7f48f1.26611527.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `juegos`
--
ALTER TABLE `juegos`
  ADD PRIMARY KEY (`idjuego`),
  ADD KEY `idgenero` (`idgenero`),
  ADD KEY `idestatus` (`idestatus`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `juegos`
--
ALTER TABLE `juegos`
  MODIFY `idjuego` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `juegos`
--
ALTER TABLE `juegos`
  ADD CONSTRAINT `juegos_ibfk_1` FOREIGN KEY (`idgenero`) REFERENCES `generos` (`idgenero`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
