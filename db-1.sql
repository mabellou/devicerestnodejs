SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Table structure for table `user_profile`
--

CREATE TABLE IF NOT EXISTS `user_profile` (
  `id` int NOT NULL,
  `profile` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 ;

--
-- Table structure for table `device_type`
--

CREATE TABLE IF NOT EXISTS `device_type` (
  `id` int NOT NULL,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 ;

--
-- Table structure for table `device_status`
--

CREATE TABLE IF NOT EXISTS `device_status` (
  `id` int NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 ;


--
-- Table structure for table `device`
--

CREATE TABLE IF NOT EXISTS `device` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brand` varchar(255),
  `model` varchar(255),
  `os` varchar(255),
  `osversion` varchar(255),
  `screensize` varchar(255),
  `companyid` varchar(255),
  `deviceid` varchar(255),
  `imei` varchar(255),
  `serialnumber` varchar(255),
  `profileid` int,
  `typeid` int,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`profileid`) REFERENCES user_profile(`id`),
  FOREIGN KEY (`typeid`) REFERENCES device_type(`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 ;


--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255),
  `firstname` varchar(255),
  `lastname` varchar(255),
  `profileid` int,
  `startdate` datetime,
  `enddate` datetime,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`profileid`) REFERENCES user_profile(`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 ;


--
-- Table structure for table `user_badge`
--

CREATE TABLE IF NOT EXISTS `user_badge` (
  `userid` int,
  `badgeid` varchar(255),
  `startdate` datetime,
  PRIMARY KEY (`userid`, `startdate`),
  FOREIGN KEY (`userid`) REFERENCES user(`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 ;


--
-- Table structure for table `device_status_user`
--

CREATE TABLE IF NOT EXISTS `device_status_user` (
  `deviceid` int,
  `userid` int NULL,
  `statusid` int,
  `startdate` datetime,
  PRIMARY KEY (`deviceid`, `startdate`),
  FOREIGN KEY (`deviceid`) REFERENCES device(`id`),
  FOREIGN KEY (`userid`) REFERENCES user(`id`),
  FOREIGN KEY (`statusid`) REFERENCES device_status(`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 ;



--
-- Dumping data for tables
--

DELETE FROM `device_status_user`;
DELETE FROM `user_badge`;
DELETE FROM `device`;
DELETE FROM `user`;
DELETE FROM `user_profile`;
DELETE FROM `device_type`;
DELETE FROM `device_status`;

INSERT INTO `user_profile` (`id`, `profile`) VALUES
('1', 'administrator'),
('2', 'incubator'),
('3', 'business'),
('4', 'tester');

INSERT INTO `device_type` (`id`, `type`) VALUES
('1', 'smartphone'),
('2', 'tablet');

INSERT INTO `device_status` (`id`, `status`) VALUES
('1', 'available'),
('2', 'inuse'),
('3', 'locked'),
('4', 'unavailable');

INSERT INTO `device` (`id`, `brand`, `model`, `os`, `osversion`, `screensize`, `companyid`, `deviceid`, `imei`, `serialnumber`, `profileid`, `typeid`) VALUES
('1', 'Apple', 'Iphone 6', 'IOS', '10.1.1', '4 inch', '405061', '1031', '102030405061', 'D9101011', '1', '1'),
('2', 'Samsung', 'Galaxy 3', 'Android', '9.1.2', '5 inch', '405062', '1032', '102030405062', 'D9101012', '2', '1'),
('3', 'Microsoft', 'Surface', 'Windows phone', '8.4.1', '2 inch', '405063', '1033', '102030405063', 'D9101013', '3', '2');

INSERT INTO `user` (`id`, `username`, `firstname`, `lastname`, `profileid`, `startdate`, `enddate`) VALUES
('1', 'benoit01', 'Benoit', 'Craigh', '1', '2016-01-01 08:32:22', ''),
('2', 'caroline01', 'Caroline', 'Lopse', '3', '2016-01-01 08:32:22', ''),
('3', 'vincent01', 'Vincent', 'Ipsum', '2', '2016-01-01 08:32:22', '');

INSERT INTO `user_badge` (`userid`, `badgeid`, `startdate`) VALUES
('1', 'U9101011', '2016-01-01 08:32:22'),
('2', 'U9101012', '2016-01-01 08:32:22'),
('3', 'U9101013', '2016-01-01 08:32:22');

INSERT INTO `device_status_user` (`deviceid`, `userid`, `statusid`, `startdate`) VALUES
('1', '2', '3', '2016-03-01 11:22:22'),
('1', '2', '2', '2016-03-01 11:32:22'),
('2', '1', '3', '2016-02-01 10:22:22'),
('2', '1', '2', '2016-02-01 10:32:22'),
('2', NULL, '1', '2016-08-01 09:32:22');

commit;
