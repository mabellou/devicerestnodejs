SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+01:00";

--
-- Table structure for table `user_profile`
--

CREATE TABLE IF NOT EXISTS `user_profile` (
  `id` int NOT NULL,
  `profile` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 ;

--
-- Table structure for table `device`
--

CREATE TABLE IF NOT EXISTS `device` (
  `id` int NOT NULL AUTO_INCREMENT,
  `boxid` int,
  `brand` varchar(255),
  `model` varchar(255),
  `os` varchar(255),
  `osversion` varchar(255),
  `screensize` varchar(255),
  `companyid` varchar(255),
  `badgeid` varchar(255),
  `imei` varchar(255),
  `serialnumber` varchar(255),
  `profileid` int,
  `type` varchar(255),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`profileid`) REFERENCES user_profile(`id`)
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
  `password` varchar(1023),
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
-- Table structure for table `scan`
--

CREATE TABLE IF NOT EXISTS `scan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entityid` int,
  `type` varchar(255),
  `badgeid` varchar(255),
  `date` datetime,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 ;

--
-- Table structure for table `device_status_user`
--

CREATE TABLE IF NOT EXISTS `device_status_user` (
  `deviceid` int,
  `userid` int NULL,
  `status` varchar(255),
  `startdate` datetime,
  `enddate` datetime,
  PRIMARY KEY (`deviceid`, `startdate`),
  FOREIGN KEY (`deviceid`) REFERENCES device(`id`),
  FOREIGN KEY (`userid`) REFERENCES user(`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 ;



--
-- Dumping data for tables
--

DELETE FROM `device_status_user`;
DELETE FROM `user_badge`;
DELETE FROM `device`;
DELETE FROM `user`;
DELETE FROM `user_profile`;

INSERT INTO `user_profile` (`id`, `profile`) VALUES
('1', 'administrator'),
('2', 'incubator'),
('3', 'business'),
('4', 'tester');

INSERT INTO `device` (`id`, `boxid`, `brand`, `model`, `os`, `osversion`, `screensize`, `companyid`, `badgeid`, `imei`, `serialnumber`, `profileid`, `type`) VALUES
('1', '121','Apple', 'Iphone 6', 'IOS', '10.1.1', '4 inch', '405061', '1031', '102030405061', 'D9101011', '1', 'smartphone'),
('2', '122','Samsung', 'Galaxy 3', 'Android', '9.1.2', '5 inch', '405062', '1032', '102030405062', 'D9101012', '2', 'smartphone'),
('3', '123','Microsoft', 'Surface', 'Windows phone', '8.4.1', '2 inch', '405063', '1033', '102030405063', 'D9101013', '3', 'tablet');

INSERT INTO `user` (`id`, `username`, `firstname`, `lastname`, `profileid`, `startdate`, `enddate`, `password`) VALUES
('1', 'benoit01', 'Benoit', 'Craigh', '1', '2016-01-01 08:32:22', null, 'azerty'),
('2', 'caroline01', 'Caroline', 'Lopse', '3', '2016-01-01 08:32:22', null, 'azerty'),
('3', 'vincent01', 'Vincent', 'Ipsum', '2', '2016-01-01 08:32:22', null, 'azerty');

INSERT INTO `user_badge` (`userid`, `badgeid`, `startdate`) VALUES
('1', 'U9101011', '2016-01-01 08:32:22'),
('2', 'U9101012', '2016-01-01 08:32:22'),
('3', 'U9101013', '2016-01-01 08:32:22');

INSERT INTO `device_status_user` (`deviceid`, `userid`, `status`, `startdate`, `enddate`) VALUES
('1', '2', 'locked', '2016-03-01 11:22:22', null),
('1', '2', 'inuse', '2016-03-01 11:32:22', null),
('2', '1', 'locked', '2016-02-01 10:22:22', null),
('2', '1', 'inuse', '2016-02-01 10:32:22', null);

commit;
