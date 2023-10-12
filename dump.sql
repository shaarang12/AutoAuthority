-- --------------------------------------------------------
-- Host:                         autoauthority.cikjgc7xrldu.ap-south-1.rds.amazonaws.com
-- Server version:               8.0.33 - Source distribution
-- Server OS:                    Linux
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table AutoAuthority.fast_tag
CREATE TABLE IF NOT EXISTS `fast_tag` (
  `fast_tag_id` varchar(15) NOT NULL DEFAULT '',
  `balance` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`fast_tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table AutoAuthority.fast_tag: ~6 rows (approximately)
INSERT INTO `fast_tag` (`fast_tag_id`, `balance`) VALUES
	('01KL1234', 300),
	('01KS1234', 400),
	('01MD5678', 600),
	('01MN5678', 200),
	('01WX5678', 500),
	('02AB2345', 200);

-- Dumping structure for table AutoAuthority.fines
CREATE TABLE IF NOT EXISTS `fines` (
  `fine_id` tinyint unsigned NOT NULL,
  `offence` varchar(100) NOT NULL,
  `fine_amount` smallint unsigned NOT NULL,
  PRIMARY KEY (`fine_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table AutoAuthority.fines: ~83 rows (approximately)
INSERT INTO `fines` (`fine_id`, `offence`, `fine_amount`) VALUES
	(1, 'RECKLESS/DANGEROUS DRIVING TWO WHEELER', 1000),
	(2, 'OVER SPEEDING', 2000),
	(3, 'REF.GO FOR HIRE', 500),
	(4, 'DEM.EXCESSFARE', 500),
	(5, 'DEF.SILENCER', 500),
	(6, 'SHRILL HORN', 500),
	(7, 'WRONG PARKING', 1000),
	(8, 'WITHOUT D.L TWO WHEELERS', 1000),
	(9, 'JUMPING TR.SIGNAL', 500),
	(10, 'CUTT.YELLOW LINE', 500),
	(11, 'LANE DISCIPLINE', 500),
	(12, 'OVERTAKING FROM LEFT', 500),
	(13, 'DEF.REG.NO PLATE', 500),
	(14, 'WITHOUT UNIFORM', 500),
	(15, 'WIHTOUT INSURANCE', 2000),
	(16, 'USING HIGH BEAM LIGHT', 500),
	(17, 'DEF.HEADLIGHT', 500),
	(18, 'DEF.TAILLIGHT', 500),
	(19, 'BALDTYRES', 500),
	(20, 'FOOT BOARD TRAVEL', 500),
	(21, 'USING MOBILE PHONE', 1000),
	(22, 'NOT WEARING SEAT BELT', 500),
	(23, 'CARRYING LENGTH MATERIAL', 500),
	(24, 'CARR.EXCESS SCHOOL CHILDREN', 200),
	(25, 'TRIPPLE RIDING', 500),
	(26, 'NO ENTRY', 500),
	(27, 'ZIG ZAG DRIVING', 500),
	(28, 'PARKED AT INTERSECTION', 1000),
	(29, 'RIDING ON FOOTPATH', 500),
	(30, 'RIDING WITHOUT HELMET', 500),
	(31, 'HTV PROHIBITED', 500),
	(32, 'NOT PRODUCE DOCUMENTS', 500),
	(33, 'WITHOUT NUMBER PLATE', 500),
	(34, 'CARRYING PASSENGER ON THE TOP', 500),
	(35, 'CARRYING EXTRA PASSENGER', 500),
	(36, 'CARRYING EXTRA PASSENGER - BUS/TRANSPORT', 200),
	(37, 'DRIVING WHEN MENTALLY/PHYSICALLY UNFIT TO DRIVE', 1000),
	(38, 'CARRYING MORE THAN 5 PERSONS IN HTV', 200),
	(39, 'CARRYING MORE THAN 2 PERSONS IN LMV', 200),
	(40, 'MISBEHAVIOUR WITH POLICE OFFICER', 2000),
	(41, 'RECKLESS/DANGEROUS DRIVING - TRANSPORT', 1000),
	(42, 'MINOR DRIVING', 5000),
	(43, 'DRIVING DURING DISQUALIFICATION', 10000),
	(44, 'RACING AND TRIALS OF SPEED', 5000),
	(45, 'DISOBEDIENCE/ OBSTRUCTION/ REFUSAL/ FALSE INFORMATION', 1000),
	(46, 'RECKLESS/DANGEROUS DRIVING - NON TRANSPORT', 1000),
	(47, 'RECKLESS/DANGEROUS DRIVING AUTO', 1000),
	(48, 'AIR/NOISE POLLUTION - 2/3 WHEELER', 1000),
	(49, 'AIR/NOISE POLLUTION - 4 WHEELER', 1000),
	(50, 'AIR/NOISE POLLUTION - HTV/CARRIAGE', 1000),
	(51, 'OBSTRUCTING TRAFFIC', 500),
	(52, 'REFUSE TO STOP AT POLICE SIGNAL', 500),
	(53, 'CHASE AND CAUGHT', 500),
	(54, 'U TURN PROHIBITED', 500),
	(55, 'FREE WHEELING', 5000),
	(56, 'OWNER TO BE PROSECUTED', 5000),
	(57, 'PARKING NEAR TRAFFIC LIGHT OR ZEBRA CROSS', 1000),
	(58, 'PARKING 0PP.TO ANOTHER PARKED VECHICLE', 1000),
	(59, 'DOUBLE PARKING', 1000),
	(60, 'STOPING ON WHITE/STOP LINE', 1000),
	(61, 'PARKING NEAR BUS STOP/SCHOOL/HOSPITAL ETC', 1000),
	(62, 'PARKING ON FOOTPATH', 1000),
	(63, 'PARKING NEAR ROAD CROSSING OR BENDTOP OF HILL ETC', 1000),
	(64, 'CARRYING EXTRA PASSENGER IN AUTO', 200),
	(65, 'NO PARKING', 1000),
	(66, 'CROSSING MEDIAN LINE & GOING AGAINST FLOW OF TRAFFIC', 500),
	(67, 'AGAINST ONE WAY', 500),
	(68, 'USE OF BLACK FILM/OTHER MATERIALS', 500),
	(69, 'BUSES STOPS OTHER THAN BUS-STOP', 500),
	(70, 'NOT WEARING HELMET-PILLION RIDER', 500),
	(71, 'WITHOUT INSURANCE TWO WHEELERS', 1000),
	(72, 'WITHOUT INSURANCE LMV', 2000),
	(73, 'WITHOUT INSURANCE LGV & OTHERS', 4000),
	(74, 'USE OF HORN AT PROHIBITED PLACES 2W / 3WHEELERS', 500),
	(75, 'USE OF HORN AT PROHIBITED PLACES FOUR WHEELERS AND OTHERS', 1000),
	(76, 'OVER SPEEDING 2W / 3 WHEELER & LMV', 1000),
	(77, 'OVER SPEEDING LGV/HGV & OTHERS', 2000),
	(78, 'OWNER TO BE PROSECUTED 2W / 3 WHEELERS', 1000),
	(79, 'OWNER TO BE PROSECUTED LMV', 2000),
	(80, 'OWNER TO BE PROSECUTED HGV / OTHERS', 5000),
	(81, 'WITHOUT D.L THREE WHEELERS', 1000),
	(82, 'WITHOUT D.L LMV', 2000),
	(83, 'WITHOUT D.L OTHERS', 5000),
	(84, 'WIHTOUT INSURANCE THREE WHEELERS', 1000),
	(85, 'RIGHT TURN PROHIBITED', 500),
	(86, 'DRUNK AND DRIVE', 12000),
	(87, 'AUTO/CAB/TAXI DISPLAYCARD', 4500),
	(88, 'JAY WALKING', 1500),
	(89, 'WITH OUT PERMIT/VIOLATION OF PERMIT', 4500),
	(90, 'WITHOUT EMMISSION CERTIFICATE', 5000),
	(91, 'VEHICLE WITHOUT REGISTRATION', 5000),
	(92, 'ALTERATION OF VEHICLE', 5000),
	(93, 'WITHOUT CERTIFICATE OF FITNESS', 2000);

-- Dumping structure for table AutoAuthority.impose_fine#######################################
CREATE TABLE IF NOT EXISTS `impose_fine` (
  `veh_reg_no` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `fine_id` tinyint unsigned NOT NULL,
  `doi` date NOT NULL,
  `payableby` date DEFAULT NULL,
  KEY `veh_to_fine` (`veh_reg_no`),
  KEY `fine_to_fineid` (`fine_id`),
  CONSTRAINT `fine_to_fineid` FOREIGN KEY (`fine_id`) REFERENCES `fines` (`fine_id`),
  CONSTRAINT `veh_to_fine` FOREIGN KEY (`veh_reg_no`) REFERENCES `user_vehicle` (`reg_plate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table AutoAuthority.impose_fine: ~5 rows (approximately)##################
AutoAuthority

-- Dumping structure for table AutoAuthority.info_update_user
CREATE TABLE IF NOT EXISTS `info_update_user` (
  `f_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `l_name` varchar(30) DEFAULT NULL,
  `phone` bigint unsigned DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `doc` mediumblob,
  `user_pass` varchar(75) DEFAULT NULL,
  `user_id` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table AutoAuthority.info_update_user: ~0 rows (approximately)

-- Dumping structure for table AutoAuthority.info_update_vehicle
CREATE TABLE IF NOT EXISTS `info_update_vehicle` (
  `colour` varchar(50) DEFAULT NULL,
  `reg_no` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table AutoAuthority.info_update_vehicle: ~0 rows (approximately)

-- Dumping structure for table AutoAuthority.ownership_transfer######################
CREATE TABLE IF NOT EXISTS `ownership_transfer` (
  `license` varchar(50) NOT NULL,
  `reg_no` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  PRIMARY KEY (`reg_no`),
  KEY `license` (`license`),
  KEY `user` (`user_id`),
  CONSTRAINT `license` FOREIGN KEY (`license`) REFERENCES `user_license` (`license`),
  CONSTRAINT `user` FOREIGN KEY (`user_id`) REFERENCES `user_register` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table AutoAuthority.ownership_transfer: ~0 rows (approximately)

-- Dumping structure for table AutoAuthority.reject_user_update
CREATE TABLE IF NOT EXISTS `reject_user_update` (
  `user_id` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table AutoAuthority.reject_user_update: ~0 rows (approximately)

-- Dumping structure for table AutoAuthority.reject_vehicle_update
CREATE TABLE IF NOT EXISTS `reject_vehicle_update` (
  `reg_plate` varchar(10) NOT NULL,
  PRIMARY KEY (`reg_plate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table AutoAuthority.reject_vehicle_update: ~0 rows (approximately)

-- Dumping structure for table AutoAuthority.rto_login
CREATE TABLE IF NOT EXISTS `rto_login` (
  `rto_id` varchar(20) NOT NULL DEFAULT '',
  `rto_pass` varchar(50) DEFAULT '',
  `f_name` varchar(50) NOT NULL DEFAULT '',
  `l_name` varchar(50) NOT NULL DEFAULT '',
  `dob` date NOT NULL,
  `address` varchar(250) NOT NULL DEFAULT '',
  `phone` bigint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`rto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table AutoAuthority.rto_login: ~14 rows (approximately)
INSERT INTO `rto_login` (`rto_id`, `rto_pass`, `f_name`, `l_name`, `dob`, `address`, `phone`) VALUES
	('1001', 'rto123', 'John', 'Doe', '1990-05-12', '123 Main St, Anytown, USA', 1234567890),
	('1002', 'rto456', 'Jane', 'Smith', '1995-07-23', '456 Oak St, Anytown, USA', 2345678901),
	('1003', 'rto789', 'David', 'Jones', '1987-11-01', '789 Maple St, Anytown, USA', 3456789012),
	('1004', 'rtoabc', 'Sarah', 'Taylor', '1992-02-15', '321 Elm St, Anytown, USA', 4567890123),
	('1005', 'rtodef', 'Michael', 'Johnson', '1984-09-07', '543 Pine St, Anytown, USA', 5678901234),
	('1006', 'rtoxyz', 'Emily', 'Wilson', '1998-12-25', '876 Cedar St, Anytown, USA', 6789012345),
	('1007', 'rto111', 'Daniel', 'Lee', '1993-03-18', '234 Birch St, Anytown, USA', 7890123456),
	('1008', 'rto222', 'Amanda', 'Martin', '1989-08-02', '987 Spruce St, Anytown, USA', 8901234567),
	('1009', 'rto333', 'Christopher', 'Clark', '1991-04-30', '654 Fir St, Anytown, USA', 9012345678),
	('1010', 'rto444', 'Stephanie', 'Brown', '1986-06-11', '321 Acorn St, Anytown, USA', 1234567890),
	('1011', 'rto555', 'Anthony', 'Davis', '1997-10-24', '987 Walnut St, Anytown, USA', 2345678901),
	('1012', 'rto666', 'Olivia', 'Garcia', '1994-01-08', '456 Pineapple St, Anytown, USA', 3456789012),
	('1013', 'rto777', 'Andrew', 'Rodriguez', '1988-12-03', '789 Mango St, Anytown, USA', 4567890123),
	('1014', 'rto888', 'Jessica', 'Hernandez', '1999-05-17', '654 Papaya St, Anytown, USA', 5678901234);

-- Dumping structure for table AutoAuthority.transfer_temp##############
CREATE TABLE IF NOT EXISTS `transfer_temp` (
  `from_license` varchar(50) NOT NULL,
  `to_license` varchar(50) NOT NULL,
  `reg_no` varchar(50) NOT NULL,
  KEY `license1` (`from_license`),
  KEY `license2` (`to_license`),
  KEY `vehicle` (`reg_no`),
  CONSTRAINT `license1` FOREIGN KEY (`from_license`) REFERENCES `user_license` (`license`),
  CONSTRAINT `license2` FOREIGN KEY (`to_license`) REFERENCES `user_license` (`license`),
  CONSTRAINT `vehicle` FOREIGN KEY (`reg_no`) REFERENCES `user_vehicle` (`reg_plate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table AutoAuthority.transfer_temp: ~2 rows (approximately)###########
INSERT INTO `transfer_temp` (`from_license`, `to_license`, `reg_no`) VALUES
	('KA18217212121', 'GA0897276271', 'GJ01WX5678');

-- Dumping structure for table AutoAuthority.user_docs
CREATE TABLE IF NOT EXISTS `user_docs` (
  `user_id` varchar(20) NOT NULL DEFAULT '',
  `license` varchar(20) NOT NULL,
  `aadhaar` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pan` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `voter` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table AutoAuthority.user_docs: ~0 rows (approximately)

-- Dumping structure for table AutoAuthority.user_docs_proof
CREATE TABLE IF NOT EXISTS `user_docs_proof` (
  `user_id` varchar(20) NOT NULL DEFAULT '',
  `user_doc` mediumblob NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table AutoAuthority.user_docs_proof: ~0 rows (approximately)

-- Dumping structure for table AutoAuthority.user_docs_temp
CREATE TABLE IF NOT EXISTS `user_docs_temp` (
  `user_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `license` varchar(20) NOT NULL,
  `aadhaar` varchar(20) NOT NULL DEFAULT '',
  `pan` varchar(20) DEFAULT NULL,
  `voter` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table AutoAuthority.user_docs_temp: ~0 rows (approximately)

-- Dumping structure for table AutoAuthority.user_license#############
CREATE TABLE IF NOT EXISTS `user_license` (
  `user_id` varchar(20) NOT NULL DEFAULT '',
  `license` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `validity` date NOT NULL,
  PRIMARY KEY (`license`),
  KEY `user_license` (`user_id`),
  CONSTRAINT `user_license` FOREIGN KEY (`user_id`) REFERENCES `user_register` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table AutoAuthority.user_license: ~18 rows (approximately)#####################
INSERT INTO `user_license` (`user_id`, `license`, `validity`) VALUES
	('7', 'DL0987655543', '2023-03-20'),
	('911', 'DL564349910', '2024-10-21'),
	('hp', 'GA08183877182', '2034-09-09'),
	('243116', 'GA0897276271', '2023-03-31'),
	('333', 'GA701234880', '2024-09-15'),
	('420', 'GJ964399765', '2024-10-09'),
	('sb', 'KA18217212121', '2023-04-25'),
	('111', 'KA564712889', '2023-06-15'),
	('11024', 'KA7896363798', '2024-05-22'),
	('3', 'KA8979694520', '2024-10-10'),
	('69', 'KL32198744', '2024-07-10'),
	('11111', 'MH34512939', '2023-05-24'),
	('123', 'MH9080876651', '2023-05-19'),
	('1234', 'MP560098714', '2023-11-11'),
	('6789', 'PB7891237578', '2024-12-13'),
	('45678', 'TN1230987234', '2024-01-30'),
	('101', 'TN123459988', '2024-01-14'),
	('999666999', 'UP436670911', '2024-04-12'),
	('78', 'UP784320192', '2024-08-22'),
	('9088', 'WB9038450123', '2023-06-07');

-- Dumping structure for table AutoAuthority.user_register
CREATE TABLE IF NOT EXISTS `user_register` (
  `user_id` varchar(20) NOT NULL DEFAULT '',
  `f_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `l_name` varchar(30) DEFAULT NULL,
  `dob` date NOT NULL,
  `age` tinyint unsigned NOT NULL,
  `gender` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` bigint unsigned NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `address_p` varchar(300) NOT NULL,
  `address_s` varchar(300) DEFAULT NULL,
  `user_pass` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table AutoAuthority.user_register: ~35 rows (approximately)
INSERT INTO `user_register` (`user_id`, `f_name`, `l_name`, `dob`, `age`, `gender`, `phone`, `email`, `address_p`, `address_s`, `user_pass`) VALUES
	('0516', 'Sagnik', 'Mukhopadhyay', '2000-08-20', 22, 'M', 9073891499, 'sag.lssstate@gmail.com', 'qhfuohf', 'efuifufh3ufhu', '$2b$12$QG3Tp.SvQo/vpDRKzZF4nOcC9NvchUFGxqix60ZsdQxkdny4I35Vu'),
	('100', 'Aditi', 'Khurana', '2000-04-12', 22, 'F', 9639611149, 'khuranaaditi1204@gmail.com', 'House no: B-32', 'House no: B-32', '$2b$12$L2bQJzYVQfbcoBCcGEEB2O/wS0udpsCs.WYq0aXDSG6bH636cpIuC'),
	('1001', 'asdf', 'eyfeuhf', '2000-03-21', 22, 'M', 8264869392, 'aditi.khurana@mca.christuniversity.in', 'Delhi, India', 'Delhi, India', '$2b$12$Jcj.W3alC47fLhAb3aFYEOCQSqvOaHuGMvA5ZLno9uqUB40JkmVsi'),
	('101', 'hello', 'world', '2001-10-10', 21, 'F', 1, 'ss@d.d', 'oooop\r\n', '', '$2b$12$iDcZ1OGpss4ctgrI5rKgmOOxukOuNtg2fLRJnqWbBXOCoaHYXOoLa'),
	('11024', 'Anu', 'Khurana', '1996-03-22', 27, 'F', 8977566389, 'anu22@gmail.com', 'F-47, ranka heights', 'F-47, ranka heights', '$2b$12$k42l6jWbzBCEdt9pDm8zyO38MKZcsIFYSPv3rwkVtMsNHUsj2oFdq'),
	('111', 'abc', 'abc', '2001-03-14', 21, 'M', 12, 'shaarang12@gmail.com', 'Fatorda, Goa, India', 'Fatorda, Goa, India', '$2b$12$k12OUXmbmyR18ve.9Mykr.KanZKSBPzahy3yQHG98CwsBROOdLe4u'),
	('11111', 's', 's', '1999-10-10', 23, 'M', 33, 'nhn@ff.f', 'mmdm', '', '$2b$12$EcI.jEuFBtOZ.K4Ann8WJuUPDab3yxOLthG3W9ix6FP9geN9DYe1W'),
	('123', 'aaa', 'bbb', '1999-12-12', 23, 'F', 22, 'ss@dd.d', 'sss', '', '$2b$12$SUvzx7jBuoCiawS3PRQnK.MKO22N0nhu0RBuCdrPpgBRYKY0AV1BK'),
	('1234', 'hello', 'world', '2010-10-10', 12, 'F', 986, 'aa.cc@c.c', 'bangalore', '', '$2b$12$X1JF0yiRKiDaTC66FnbjT.OYUd8oZ9vYzfL4fa1PCmdyzFMH9q5PC'),
	('2000', 'aditi', 'khurana', '2000-04-12', 23, 'F', 9639611149, 'khuranaaditi1204@gmail.com', 'House no B-32', 'House no B-32', '$2b$12$tX8X1U6.GMoLP/TgK3IKOO5ppJQ0heBUHR4yrsBAyc6yYASPKs1Yi'),
	('2247128', 'Sagnik', 'Mukhopadhyay', '2000-08-20', 22, 'M', 9073891499, 'sag.muk200800@gmail.com', 'njvjwefnewfh', 'kfgwegfuegf', '$2b$12$lZs08VG.K8SgDptiYjDiseHQT8KV.I/GM/LRbIGMEyIBF.F54agYu'),
	('243116', 'shaarang', 'prabhudesai', '1999-05-18', 23, 'M', 9764243116, 'shaarang.pd@gmail.com', 'Row House C-5, Grace Heritage\r\nFatorda, Margao', 'Row House C-5, Grace Heritage\r\nFatorda, Margao', '$2b$12$BUcP.ms/HpKcbxrlUhFI1OHwA1SL0XeXUqH5RLGnPOrp0.6jam3a2'),
	('3', 'g', 'g', '2222-03-03', 199, 'M', 0, '', 'f', '', '$2b$12$plrmV9xddtZqW.BplY9eg.aztQa6dAVMOFWEsyZ.taGc9bZ2LihnS'),
	('333', 'aaa', 'bbb', '1999-12-12', 23, 'F', 342, 'ddd@mm.gg', 'dddddd', '', '$2b$12$8t3YAp4puAOQifRTWg6uk.Fe4kc052PiWqezpV9fZls7E9NFHuk6O'),
	('420', 'shaarang', 'prabhudesai', '1999-05-18', 23, 'M', 9764243116, 'shaarang.pd@gmail.com', 'Row House C-5, Grace Heritage\r\nFatorda, Margao', 'Row House C-5, Grace Heritage\r\nFatorda, Margao', '$2b$12$RCOz74Kku76apprWRnWNB.93DQORiw08vhqsa6Pq4WPxGIe9c4U9i'),
	('456', '123', '456', '2001-01-01', 22, 'M', 123, '567@gmail.com', 'bengaluru', '', '$2b$12$a9t5DaH0QMY3Dwob0HePoOu1Gxq1Xm65/YYgcmsNiVpUNl5pyj0S2'),
	('45678', 'qwerty', 'jdinkjn', '1999-01-12', 24, 'M', 6733920892, 'qwerty12@gmail.com', 'Flat no: 89, bangalore', 'Flat no: 89, bangalore', '$2b$12$SXC4lvdaFZppA4GE2fmC/.tXxo3.HDCCJd8eG4v/GkwaIFomlX1Mi'),
	('6789', 'jasleen', 'kaur', '1997-02-21', 26, 'F', 7891234555, 'jasleen21@gmail.com', 'abc society, punjab', 'abc society, punjab', '$2b$12$YwIfjUb5AHl1HEBIU/g42eIA8OLLNUQlaV/12SbkGb.JCE/WQBtg6'),
	('69', 'nitendra', 'jaiswal', '2002-10-10', 20, 'M', 888, 'nit.jai@gm.c', 'mirzapur', '', '$2b$12$IjRb4cwnizT0RTL0sOKwsumjAUZtpR2.IQzIAvFXZVE/TZ/JR1pHa'),
	('696969', 'vivekio', 'muskanius', '1999-07-25', 23, 'M', 121787, 'v@ns.s', 'www', '', '$2b$12$ONs1Nt1ruQ/BZ60RP0Gxoeca95jNGrYIi3CE8eaQApcczIUiQnlMi'),
	('7', 'aaa', 'aaa', '2001-11-11', 21, 'F', 0, '', 'ddddd', '', '$2b$12$Txe1oDg/2CFlcMpZuWHohuls1iSEd/ywOR4IPpQKMbXhwt.jVSN0G'),
	('78', 'hvv', 'jhvh', '2000-08-20', 22, 'M', 9073891499, 'sag.muk200800@gmail.com', 'hgcghcgc', 'yyv', '$2b$12$qDoUFnHyRbXgbYNA/Iu.cuEPzNw62Zmo/1Isd87yRWblrtejpH4SK'),
	('9088', 'sagnik', 'mukhopadhyay', '2001-06-05', 21, 'M', 7088901549, 'sagnik05@gmail.com', 'house no:- 12, kolkata', 'house no:- 12, kolkata', '$2b$12$isGqVpMr4GbCEqusFJngteEjCBwgNhwRardLLe0ovq1G8kj21NUue'),
	('911', 'name', 'name', '2001-10-10', 21, 'M', 911, 'hdhd@mmd.dd', 'nsfjsnnjsf', '', '$2b$12$e9ZsCcYGHfz5KK4h0Xqenuq66dU8aV9gvMSLj7hA52n2X8fnUelwO'),
	('999666999', 'Voivek', 'Muskan', '2000-11-25', 22, 'M', 9835804536, 'viveklistenus@gmail.com', 'ljktgfhvn', 'jtgvnm', '$2b$12$nfkZVF5KovCS5vcDXWGYhOA4ahmBamDEmSZErJ87ELZLPyBvnV9uK'),
	('abcd123', 'p', 'p', '1999-01-01', 24, 'M', 10, 'g@m.s', 'blr', '', '$2b$12$iBucVx8jcbMqccbxvBnn4u/NA.xnIX79rSGBYtojxsOktRSByBGDe'),
	('ar', 'abhinav', 'rathi', '2002-10-10', 20, 'M', 9000, 'ar@ar.com', 'rajasthan', '', '$2b$12$2ADorgUK3xMIXcCTkq7cvOI1zqYqdk53TsOjRk6YQYG2DWbZUzslO'),
	('dj', 'dwayne', 'johnson', '2000-02-10', 23, 'M', 1011, 'dj@g.c', 'california', '', '$2b$12$U7hMUnxyxwmTrhDRcPTU8.grWNiF6jA/YaamPrdGx0GCcwj.gX/0u'),
	('hello', 'hello', 'world', '2001-10-10', 21, 'F', 1002, 'shaarang12@gmail.com', 'Fatorda, Goa, India', 'Fatorda, Goa, India', '$2b$12$iJ/yeZCLm3BOzvoczWDZW.qgN0oFRhL27sxgetHfrU1mfn7KlN9KO'),
	('hp', 'harry', 'potter', '1999-10-10', 23, 'M', 12671262816, 'harry.potter@hogwarts.edu', 'hogsmede', '', '$2b$12$deAEs8it7m0DUolEuk1EnOnNdsBhtTImGsctXOUJl0r3sjk9vDV3y'),
	('hw', 'hello', 'world', '1998-02-21', 25, 'F', 9000, 'hl@ms.a', 'jjaa', '', '$2b$12$o9YINVite27KmwhzpUlJEeilnZaNSjshX/KkOLXD8Irt40v/jwWlW'),
	('mm', 'mickey', 'mouse', '1999-10-10', 23, 'M', 1, 'mm@m.m', 'clubhouse\r\n', '', '$2b$12$MPyrTjHCcUxi7gIYaZVFxezzhHG/4IwvwIT6CZW0TbdcTZV8twTr.'),
	('nit', 'nit', 'nit', '2001-10-10', 21, 'M', 1111, 'hhh@s.s', 'mmsmm', '', '$2b$12$dOfe.yNFxzDwB2BT334hu.euXh5UgxMU7lSdgKxxcgX7RRWNTKa/K'),
	('rr', 'rahul', 'raj', '2001-10-10', 21, 'M', 161616, 'r.r@r.c', 'bangalore', 'bihar', '$2b$12$FKeRy0fH5.jgYISzCo3h0eh3HAMJz2RTZGEpQzZKvvE.EfsQJzFWW'),
	('sag123', 'Sagnik', 'Mukherjee', '2000-08-20', 22, 'M', 9073891499, 'sag.muk200800@gmail.com', 'asnfjafhf', 'jsnfs', '$2b$12$fevjCrA2QsUEE0z37cbLl.ZGYlvhvVc/FbLNmlRhQpsbvZAzijIhW'),
	('sb', 'sirius', 'black', '1987-10-10', 35, 'M', 9988776655, 'sirius.black@hogwarts.edu', 'azkaban', '', '$2b$12$KdWdj1cF3uZdJHnCyYZMJui8ZkkrD7uv.btLKjnAbRK7.8iiRf.ES'),
	('zb', 'z', 'z', '2001-10-10', 21, 'M', 1, 'h@s.s', 's\r\n\r\n', '', '$2b$12$EXqCniNgMIzRysjUCxgPB.byc3SAjb/AEEzIGM05VJiCEXE2LnyQK'),
	('zzz', 'abcd', 'abcd', '2000-10-10', 22, 'M', 126687, 'dgdg@d.d', 'hshs', '', '$2b$12$OVcldWosm3xUQ2D7C/XMles9z9I81k0rvI1WPfE7uO4.lSCPwaoRK');

-- Dumping structure for table AutoAuthority.user_vehicle
CREATE TABLE IF NOT EXISTS `user_vehicle` (
  `reg_plate` varchar(10) NOT NULL,
  `wheels` tinyint unsigned NOT NULL,
  `reg_date` date NOT NULL,
  `company` varchar(20) NOT NULL,
  `model` varchar(20) NOT NULL,
  `color` varchar(20) NOT NULL,
  `chassis` varchar(20) NOT NULL,
  `license` varchar(20) NOT NULL DEFAULT '0',
  `user_id` varchar(20) NOT NULL DEFAULT '',
  `state` varchar(20) NOT NULL,
  `fast_tag` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`reg_plate`),
  KEY `license_vehicle` (`license`) USING BTREE,
  KEY `user_vehicle` (`user_id`),
  KEY `vehicle_fasttag` (`fast_tag`),
  CONSTRAINT `user_vehicle` FOREIGN KEY (`user_id`) REFERENCES `user_register` (`user_id`),
  CONSTRAINT `vehicle_fasttag` FOREIGN KEY (`fast_tag`) REFERENCES `fast_tag` (`fast_tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table AutoAuthority.user_vehicle: ~43 rows (approximately)
INSERT INTO `user_vehicle` (`reg_plate`, `wheels`, `reg_date`, `company`, `model`, `color`, `chassis`, `license`, `user_id`, `state`, `fast_tag`) VALUES
	('DL01GH3456', 4, '2022-01-04', 'Ford', 'Ecosport', 'Black', 'MB890123456', 'DL0987655543', '7', 'Delhi', NULL),
	('DL01GP3456', 4, '2022-01-04', 'Ford', 'Ecosport', 'Black', 'MB890123456', 'DL0987655543', '7', 'Delhi', NULL),
	('DL01UV1134', 2, '2022-01-11', 'Maruti', 'Swift', 'Red', 'MB123456789', 'DL564349910', '911', 'Delhi', NULL),
	('DL01UV1234', 2, '2022-01-11', 'Maruti', 'Swift', 'Red', 'MB123456789', 'DL564349910', '911', 'Delhi', NULL),
	('DL04AB4567', 4, '2022-01-01', 'Toyota', 'Innova', 'Silver', 'MBJSA32CJ4C508573', 'DL0987655543', '7', 'Delhi', NULL),
	('GJ01IA7890', 2, '2022-01-05', 'Tata', 'Tiago', 'Silver', 'MB234567890', 'GJ964399765', '420', 'Gujarat', NULL),
	('GJ01IJ7890', 2, '2022-01-05', 'Tata', 'Tiago', 'Silver', 'MB234567890', 'GJ964399765', '420', 'Gujarat', NULL),
	('GJ01WX5678', 4, '2022-01-12', 'Hyundai', 'Creta', 'Blue', 'MB987654321', 'KA18217212121', 'sb', 'Gujarat', '01WX5678'),
	('GJ07AB7890', 2, '2022-01-01', 'Hero', 'Splendor', 'Green', 'MBLHA10APGMG12345', 'GJ964399765', '420', 'Gujarat', NULL),
	('KA01AB1034', 2, '2022-01-01', 'Maruti', 'Swift', 'Red', 'MB123456789', 'KA8979694520', '3', 'Karnataka', NULL),
	('KA01AB1234', 4, '2022-05-01', 'Maruti', 'Swift', 'Red', 'MA3EWDE1S00123456', 'KA8979694520', '3', 'Karnataka', NULL),
	('KA01BB1034', 2, '2022-01-01', 'Maruti', 'Swift', 'Red', 'MB123456789', 'KA8979694520', '3', 'Karnataka', NULL),
	('KA01KL1234', 2, '2022-01-06', 'Maruti', 'Alto', 'Grey', 'MB345678901', 'GA08183877182', 'hp', 'Karnataka', '01KL1234'),
	('KA01KS1234', 2, '2022-01-06', 'Maruti', 'Alto', 'Grey', 'MB345678901', 'GA0897276271', '243116', 'Karnataka', '01KS1234'),
	('KA01YZ9012', 2, '2022-01-13', 'Honda', 'Amaze', 'White', 'MB456789012', 'KA7896363798', '11024', 'Karnataka', NULL),
	('KA02AB1234', 4, '2022-01-01', 'Maruti', 'Swift', 'Red', 'MA3EZD81S00142368', 'KA8979694520', '3', 'Karnataka', NULL),
	('KA05AB5678', 2, '2022-01-01', 'TVS', 'Jupiter', 'White', 'MD625DB44J3C05557', 'GA0897276271', '243116', 'Karnataka', NULL),
	('KA08AB8901', 4, '2022-01-01', 'Mahindra', 'XUV500', 'Black', 'MA1YV4G2XG2A12345', 'KA7896363798', '11024', 'Karnataka', NULL),
	('KA11AC1234', 4, '2022-01-01', 'Ford', 'EcoSport', 'White', 'MAJAXXMRJADC01234', 'KA8979694520', '3', 'Karnataka', NULL),
	('KL03AB3456', 3, '2022-01-01', 'Honda', 'Activa', 'Blue', 'ME4JF504JCT412345', 'KL32198744', '69', 'Kerala', NULL),
	('MH01EF9012', 2, '2022-01-03', 'Honda', 'Amaze', 'White', 'MB456789012', 'MH9080876651', '123', 'Maharashtra', NULL),
	('MH01EP9012', 2, '2022-01-03', 'Honda', 'Amaze', 'White', 'MB456789012', 'MH9080876651', '123', 'Maharashtra', NULL),
	('MH01MD5678', 4, '2022-01-07', 'Toyota', 'Fortuner', 'Brown', 'MB678901234', 'MH34512939', '11111', 'Maharashtra', '01MD5678'),
	('MH01MN5678', 4, '2022-01-07', 'Toyota', 'Fortuner', 'Brown', 'MB678901234', 'MH34512939', '11111', 'Maharashtra', '01MN5678'),
	('MH01YZ9012', 2, '2022-01-13', 'Honda', 'Amaze', 'White', 'MB456789012', 'KA7896363798', '11024', 'Karnataka', NULL),
	('MH02AB2345', 2, '2022-01-01', 'Bajaj', 'Platina', 'Black', 'MD2DSJAZZNAZF3182', 'MH34512939', '11111', 'Maharashtra', '02AB2345'),
	('MH02CD5678', 2, '2023-01-15', 'Honda', 'Activa', 'Blue', 'ME4JF503CH8012345', 'MH9080876651', '123', 'Maharashtra', NULL),
	('MP09AB9012', 2, '2022-01-01', 'Yamaha', 'FZ', 'Blue', 'ME1RG0742E8365432', 'MP560098714', '1234', 'Madhya Pradesh', NULL),
	('PB01OP0012', 2, '2022-01-08', 'Mahindra', 'Scorpio', 'Maroon', 'MB012345678', 'PB7891237578', '6789', 'Punjab', NULL),
	('PB01OP9012', 2, '2022-01-08', 'Mahindra', 'Scorpio', 'Maroon', 'MB012345678', 'PB7891237578', '6789', 'Punjab', NULL),
	('PJ01WX5678', 4, '2022-01-12', 'Hyundai', 'Creta', 'Blue', 'MB987654321', 'GA0897276271', '243116', 'Gujarat', NULL),
	('TN01CD5678', 4, '2022-01-02', 'Hyundai', 'Creta', 'Blue', 'MB987654321', 'TN123459988', '101', 'Tamil Nadu', NULL),
	('TN03EF9012', 4, '2023-06-30', 'Hyundai', 'i20', 'White', 'MALBB51BLDM001234', 'TN1230987234', '45678', 'Tamil Nadu', NULL),
	('TN05CD5678', 4, '2022-01-02', 'Hyundai', 'Creta', 'Blue', 'MB987654321', 'TN123459988', '101', 'Tamil Nadu', NULL),
	('TN10AC0123', 3, '2022-01-01', 'Honda', 'CB Shine', 'Red', 'ME4JC489BF8001234', 'TN123459988', '101', 'Tamil Nadu', NULL),
	('UP01QR3456', 4, '2022-01-09', 'Renault', 'Kwid', 'Orange', 'MB345678901', 'UP436670911', '999666999', 'Uttar Pradesh', NULL),
	('UP01QR3856', 4, '2022-01-09', 'Renault', 'Kwid', 'Orange', 'MB345678901', 'UP436670911', '999666999', 'Uttar Pradesh', NULL),
	('UP04GH3456', 4, '2022-12-21', 'Tata', 'Nexon', 'Silver', 'MAT623008JDJ01234', 'UP436670911', '999666999', 'Uttar Pradesh', NULL),
	('UP06AB6789', 4, '2022-01-01', 'Hyundai', 'i20', 'Grey', 'MALBB51BLDM143708', 'UP436670911', '999666999', 'Uttar Pradesh', NULL),
	('UP12AC2345', 2, '2022-01-01', 'Bajaj', 'Discover', 'Black', 'MD2DSDJZZNAZF1234', 'UP784320192', '78', 'Uttar Pradesh', NULL),
	('WB01ST7190', 2, '2022-01-10', 'Kia', 'Seltos', 'Green', 'MB678901234', 'WB9038450123', '9088', 'West Bengal', NULL),
	('WB01ST7890', 2, '2022-01-10', 'Kia', 'Seltos', 'Green', 'MB678901234', 'WB9038450123', '9088', 'West Bengal', NULL),
	('WB05IJ7890', 2, '2023-09-05', 'Bajaj', 'Pulsar', 'Black', 'MD2DHDJZ6JBE01234', 'WB9038450123', '9088', 'West Bengal', NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
