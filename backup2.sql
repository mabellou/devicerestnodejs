-- MySQL dump 10.13  Distrib 5.7.16, for osx10.12 (x86_64)
--
-- Host: vhw3t8e71xdz9k14.cbetxkdyhwsb.us-east-1.rds.amazonaws.com    Database: ah3dpz0d67278it9
-- ------------------------------------------------------
-- Server version	5.7.11-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `device` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `boxid` int(11) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `os` varchar(255) DEFAULT NULL,
  `osversion` varchar(255) DEFAULT NULL,
  `screensize` varchar(255) DEFAULT NULL,
  `companyid` varchar(255) DEFAULT NULL,
  `badgeid` varchar(255) DEFAULT NULL,
  `imei` varchar(255) DEFAULT NULL,
  `serialnumber` varchar(255) DEFAULT NULL,
  `profileid` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `wifiid` varchar(255) DEFAULT NULL,
  `wifipassword` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `comment` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `profileid` (`profileid`),
  CONSTRAINT `device_ibfk_1` FOREIGN KEY (`profileid`) REFERENCES `user_profile` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=486 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device`
--

LOCK TABLES `device` WRITE;
/*!40000 ALTER TABLE `device` DISABLE KEYS */;
INSERT INTO `device` VALUES (311,21,'Asus','Vivotab','Windows','RT - Windows 8','10','','obsolete','00186-50030-43581-AAOEM','D10kas056128',4,'T','xgen87','NASHEquv','device store','D, laadt niet op'),(312,37,'Blackberry ','Z10','Blackberry','BB10','4,2','','obsolete','357723050162029','0731-3101-8075',4,'S','---','---','device store','obsolete'),(313,45,'HTC','Nexus 9 ','Android','6','8,9','115-0100979-12','04D49A52144A80','','HT4CVJT02856',4,'T','xgen116','WhbkdeQE','device store','D, CODE 1111'),(314,52,'HTC','One X','Android','4.1.1','4,7','','obsolete','353995056895422','',4,'S','---','---','device store','obsolete'),(315,54,'HTC','One X+','Android','4.1.1','4,7','','obsolete','353567050989798','FA2B8W103171',4,'S','---','---','device store','D, afzetten lukt niet'),(316,65,'Huawei','Ascend Y330','Android','4.1.1','4','','obsolete','864298025392999','14B9681E8656',4,'S','---','---','device store','D'),(317,66,'Huawei ','Ascend G525','Android','4.1.2','4,5','','obsolete','862358028905262','D07AB542BB27',4,'S','---','---','device store','D'),(318,68,'Apple','iPad 1','iOS','5.1.1','9,7','','obsolete','12437009659731','',4,'T','---','---','device store','obsolete'),(319,78,'Apple','iPad 2','iOS','7.1','9,7','115-0023534-70','out','12800005800494','DN6G1DYWDFJ2',4,'T','---','---','device store','D'),(320,93,'Apple','iPad 4','iOS','9.3.4','9,7','115-0090409-15','?','990002361365149','DMPJH37SF18P',4,'T','---','---','device store','D, CODE 1111'),(321,94,'Apple','iPad 4','iOS','8.1.2','9,7','','out','','DMRJJBNUF182',4,'T','---','---','device store','D'),(322,111,'Apple','iPad mini 2 (Retina)','iOS','7.1.2','7,9','115-0083680-76','?','','DLXNF0L1FCMS',4,'T','---','---','device store',''),(323,122,'Apple','iPad mini 2 (Retina)','iOS','9.3.1','7,9','115-0097156-69','out','','DLXMH503FCM8',4,'T','---','---','device store','D'),(324,173,'Apple','iPhone 6 Plus','iOS','9.3.5','5,5','115-0099334-16','out','354441060828686','F2MNJ1TLG5QQ',4,'S','---','---','device store','D'),(325,182,'LG','L3 Dual','Android','2.3.6','3,2','','obsolete','353111054576135','',4,'S','---','---','device store','obsolete'),(326,198,'Apple','MacBook Pro 15','iOS','','15,4','115-0099183-59','?','','C02NK535G3QC',4,'','---','---','IWS test lab',''),(327,206,'Motorola','Nexus 6 ','Android','5.0','5,96','115-0100887-17','out','355470060528532','ZX1G422T3M',4,'S','---','---','device store','D, CODE 1111, tag kwijt, IMEI verondersteld'),(328,215,'Nokia','Lumia 625','Windows','8.0.10517.150','','','obsolete','353035067871219','',4,'S','xgen108','NpwF7cnJ','device store','D'),(329,228,'Samsung','Galaxy Ace plus','Android','2.3.6','3,65','','obsolete','358866047931573','',4,'S','---','---','device store','obsolete'),(330,249,'Samsung','Galaxy S2','Android','2.3.6','4,3','','obsolete','352944052489492','D C',4,'S','---','---','device store','obsolete'),(331,294,'Sony','Xperia tablet Z2','Android','6.0.1','','115-0097207-23','out','430101660001947','CB5126PF2F',4,'S','---','---','device store','D'),(332,295,'Sony','Xperia U','Android','2.3.7','3,7','','obsolete','355114050912823 ','',4,'S','---','---','device store','obsolete'),(333,363,'Blackberry ','Curve 8520','','','2,46','','obsolete','351802057265330 ','',4,'S','---','---','device store','obsolete'),(334,365,'Samsung','Galaxy S6','Android','6.0.1','5,1','115-0102658-42','out','359845065865573','RF8G41KPQ0P',4,'S','xgen127','SZmjZkKe','device store','D'),(335,388,'Apple','iPad Air 16 GB','iOS','9.3.5','','','?','352059061905857','DMPPR1FMF4YD',4,'S','---','---','device store','D, CODE 1111'),(336,393,'Samsung','Galaxy Tab S2 32 GB','Android','5.0.2','9,7','115-0106730-40','out','','RF2G80A28KW',4,'T','---','---','device store','D'),(337,394,'Apple','iphone 6s','iOS','9.0.2','4,7','115-0106973-89','disabled','353314074102094','F4GQJG66GRY5',4,'S','---','---','device store','D, Disabled'),(338,395,'Apple','iphone 6s Plus','iOS','9.3.2','5,5','115-0106986-05','disabled','353292075578076','C37QKB2RGRWF',4,'S','---','---','device store','D, Disabled'),(339,405,'Samsung','S7 Edge','Android','6.0.1','5,5','115-0117941-96','defect - in repair','359948076712295','RF8H52EBJWW',4,'S','xgen135','6ypjL6fq','device store','D'),(340,408,'SONY','XPERIA Z4','Android','6.0.1','10','115-0117933-88','out','359058060939233','CB5A2BSD8U',4,'T','---','---','device store','D'),(341,87,'Apple','iPad 3','iOS','7.1.2','9,7','115-0085480-33','broken','13309004483814','',4,'T','---','---','device store','broken'),(342,1000,'Apple ','iMac Core i5 3.5 27-Inch (Retina 5K, 2014)','MacOS','','27','115-0117702-51 ','','','C02P613XFY11',4,'','---','---','BB908.J11.09',''),(343,1001,'Apple ','iMac Core i5 3.5 27-Inch (Retina 5K, 2014)','MacOS','','27','115-0117682-31','','','C02P43JPFY11',4,'','---','---','BB908.H02.04',''),(344,1002,'Apple ','iMac Core i5 3.5 27-Inch (Retina 5K, 2014)','MacOS','','27','115-0117683-32','','','C02P640EFY11',4,'','---','---','BB908.J04.13',''),(345,1003,'Apple ','iMac Core i5 3.5 27-Inch (Retina 5K, 2014)','MacOS','','27','115-0117694-43','','','DGKP9153FY14',4,'','---','---','BB908.J04.11',''),(346,1004,'Apple ','iMac Core i5 3.5 27-Inch (Retina 5K, 2014)','MacOS','','27','115-0117689-38','','','C02P641FFY11',4,'','---','---','BB908.J06.05',''),(347,1005,'Apple ','iMac Core i5 3.5 27-Inch (Retina 5K, 2014)','MacOS','','27','115-0117696-45','','','C02P63ZTFY11',4,'','---','---','BB908.A07.06',''),(348,1006,'Apple','iMac 20/2/1Gb/250Gb/SD-bel','MacOS','','','115-0117704-53','','','VM746VNBX85',4,'S','---','---','BB908.A10.03',''),(349,1007,'Apple','iMac 21.5 inch Retina 4K 16GB','MacOS','','21,5','115-0117723-72','','','SDGKS108YGG7F',4,'','---','---','BB908.B13.01',''),(350,1008,'Apple','iMac 21.5 inch Retina 4K 16GB','MacOS','','21,5','115-0117720-69','','','SDGKS108HGG7F',4,'','---','---','BB908.B13.02',''),(351,1009,'Apple','iMac 21.5 inch Retina 4K 16GB','MacOS','','21,5','115-0117721-70','','','SDGKS108BGG7F',4,'','---','---','BB908.A09.06',''),(352,1010,'Apple','iMac 21.5 inch Retina 4K 16GB','MacOS','','21,5','115-0117960-18','','','DGKSDHLBGG7F',4,'','---','---','in repair since 25/10/16',''),(353,1011,'Apple','iMac 21.5 inch Retina 4K 16GB','MacOS','','21,5','115-0117806-58','','','DGKSCJ6UGG7F',4,'','---','---','BB908.A06.05',''),(354,1012,'Apple','iMac 21.5 inch Retina 4K 16GB','MacOS','','21,5','115-0117722-71','','','SDGKS10DDGG7F',4,'','---','---','BB908.J05.07',''),(355,1013,'Apple','iMac 21.5 inch Retina 4K 16GB','MacOS','','21,5','','','','',4,'','---','---','Ordered 27/10/2016',''),(356,1014,'HP','Compaq 8200 Elite PC','Windows','Neos','','115-0096888-92','','','',4,'S','---','---','BB908.H02.O4',''),(357,1015,'Apple','iMac Mini 8Gb 1Tb','MacOS','','','115-0118210-74','','','C07S61YMG1HW',4,'S','---','---','BB908.H02.O4',''),(358,0,'Google','Pixel C','','','','','','','',4,'S','---','---','Ordered 21/4/16',''),(359,0,'Google','Pixel 5','','','5','','','','',4,'S','---','---','Ordered 27/10/16',''),(360,0,'Google','Pixel 5,5','','','5,5','','','','',4,'S','---','---','Ordered 27/10/16',''),(361,0,'Sony','Xperia XA ultra - TEST','','','','','','','',4,'','---','---','Ordered 05/12/2016',''),(362,0,'Apple','iMac Mini 8Gb 1Tb','MacOS','','','','','','',4,'','','','Ordered 20/01/2017',''),(363,0,'Apple','iMac Mini 8Gb 1Tb','MacOS','','','','','','',4,'','','','Ordered 20/01/2017',''),(364,0,'Apple','iMac Mini 8Gb 1Tb','MacOS','','','','','','',4,'','','','Ordered 20/01/2017',''),(365,0,'Apple','iMac Mini 8Gb 1Tb','MacOS','','','','','','',4,'','','','Ordered 20/01/2017',''),(366,0,'OnePlus','3T','Android','','','','','','',4,'','','','Ordered 20/01/2017',''),(367,2,'Acer','Iconia Tab A200','Android','4.0.3','10,1','115-0085463-16','04B89A52144A80','','22109989415',4,'T','---','---','device store','D'),(368,4,'Acer','Iconia Tab A700','Android','4.1.1','10,1','','04A49A52144A80','','22904197615',4,'T','---','---','device store','D'),(369,10,'Asus','Memo Pad 10','Android','4.2.2','10,1','115-0097206-22','04A39A52144A80','','DBOKCT359475',4,'T','---','---','device store','D, CODE 1111'),(370,11,'Asus','Nexus 7','Android','5.0.2','7','','049F9A52144A80','354400054959238','015d43ece157ee12',4,'T','---','---','device store','D, CODE 1111'),(371,13,'Asus','Nexus 7','Android','4.4.3','7','115-0091500-39','04AC9A52144A80','','015d262e7623fa12',4,'T','---','---','device store','D'),(372,14,'Asus','Nexus 7','Android','4.4.4','7','115-0087144-48','04B19A52144A80','','087bbdab',4,'T','---','---','device store','D'),(373,16,'Asus','Transformer Pad TF300T','Android','4.2.1','10,1','115-0090699-14','04AE9A52144A80','','C9OKCT002034',4,'T','---','---','device store','D'),(374,22,'Asus ','Memo Pad ME302 (FHD 10)','Android','4.3','7','115-0097210-26','04AF9A52144A80','','E2OKCT088828',4,'T','---','---','device store','D'),(375,24,'Asus ','Transformer Book T100TA','Windows','10 v.14393.321','10,1','115-0103516-27','04D29A52144A80','','F1N0CX22713902C',4,'T','---','---','device store','D, Easybanking'),(376,42,'HTC','Nexus 9 ','Android','7.0','8,9','115-0100870-97','04BC9A52144A80','','HT4CVJT02936',4,'T','---','---','device store','D'),(377,44,'HTC','Nexus 9 ','Android','5.0.2','8,9','115-0100980-13','04BE9A52144A80','','HT4CVJT03374',4,'T','---','---','device store','D, CODE 1234'),(378,46,'HTC','One','Android','4.2.2','4,7','','04759A52144A80','354436058294156','FA35RW903161',4,'S','xgen111','AxRewmUG','device store','D'),(379,48,'HTC','One','Android','5.0.2','4,7','','04849A52144A80','354960060142632','HT488W900378',4,'S','xgen110','b9r4pFcv','device store','D'),(380,49,'HTC','One M8','Android','4.4.2','5','','04819A52144A80','358714054336809','SH44NWM13601',4,'S','xgen112','DXB2L8GB','device store','D'),(381,61,'Huawei','Ascend P7','Android','4.4.2','5','','047F9A52144A80','357456040668124','7N2NEF144U010661',4,'S','xgen118','fB9kGRmv','device store','D'),(382,64,'Huawei','Ascend Y330','Android','4.2.2','4','','048A9A52144A80','863962022913484','E6MJ7P6T4H4HPRAI',4,'S','xgen117','FvtKh2NE','device store','D'),(383,75,'Apple','iPad 2','iOS','6.1.3','9,7','101-0095563','04989A52144A80','12669007974718','DLXFNLVBDFJ2',4,'T','---','---','device store','D'),(384,80,'Apple','iPad 2','iOS','7.0.2','9,7','115-0023548-84','04979A52144A80','12803001262263','DN6G1CCCDFJ2',4,'T','---','---','device store','D'),(385,86,'Apple','iPad 3','iOS','7.0','9,7','115-0085481-34','04999A52144A80','13308001703596','DYTJ2EKCDVGH',4,'T','---','---','device store','D'),(386,88,'Apple','iPad 3','iOS','8.4.1','9,7','115-0085479-32','049C9A52144A80','13311005416462','DYTJ2BKEDVGH',4,'T','---','---','device store','D, difficulties charging'),(387,89,'Apple','iPad 3','iOS','9.3.3','9,7','','04A29A52144A80','','DYVHV9NJDVD1',4,'T','---','---','device store','D'),(388,90,'Apple','iPad 4','iOS','9.3.2','9,7','115-0090983-07','04D99A52144A80','990001325687226','DLXK1079F18P',4,'T','---','---','device store','D'),(389,91,'Apple','iPad 4','iOS','10.0.1','9,7','','04D39A52144A80','990001338319007','DMPK2GDDF18P',4,'T','---','---','device store','D, CODE 1234'),(390,96,'Apple','iPad Air','iOS','8.0','9,7','','04B39A52144A80','','DMPLKLH7FK10',4,'T','---','---','device store','D'),(391,105,'Apple','iPad Air 2','iOS','8.1','9,7','115-0100894-24','049D9A52144A80','','DMQNPM7EG5VJ',4,'T','---','---','device store','D'),(392,104,'Apple','iPad Air 2','iOS','8.1','9,7','115-0100889-19','04CF9A52144A80','','DMQNPR55G5VJ',4,'T','---','---','device store','D'),(393,107,'Apple','iPad mini','iOS','8.0.2','7,9','','04A19A52144A80','','F4KK5N1DF193',4,'T','---','---','device store','D'),(394,117,'Apple','iPad mini','iOS','7.0.2','7,9','','04959A52144A80','990001346549249','F4KK2GWXF19K',4,'T','---','---','device store','D'),(395,118,'Apple','iPad mini','iOS','7.0.4','7,9','','049B9A52144A80','990002401830946','F4KJV6GHF19M',4,'T','---','---','device store','D'),(396,121,'Apple','iPad mini 2 (Retina)','iOS','8','7,9','115-0096269-55','04A89A52144A80','358678051546290','DLXLTTFHFLMJ',4,'T','---','---','device store','D'),(397,123,'Apple','iPad mini 2 (Retina)','iOS','7.1','7,9','115-0097183-96','04949A52144A80','351979060345709','DLXMJ14LFLMJ',4,'T','---','---','device store','D'),(398,126,'Apple','iPhone 4','iOS','7.1.2','7,9','','04789A52144A80','12749009386788','841224CGA4S',4,'T','xgen107','ywZNhbvn','device store','D'),(399,127,'Apple','iPhone 4','iOS','7.0.4','3,5','','04799A52144A80','13264006121658','DX3K477CDP0N',4,'S','---','---','device store','D'),(400,133,'Apple','iPhone 5','iOS','7.1','4','','04719A52144A80','13348006128142','C39J9B3GDTWF',4,'S','xgen102','q4PkpBM4','device store','D'),(401,134,'Apple','iPhone 5','iOS','7.1.2','4','','04809A52144A80','13351009888381','C39JGXMTDTWF',4,'S','xgen101','GJcmpTKb','device store','D'),(402,135,'Apple','iPhone 5','iOS','7.0.4','4','','046F9A52144A80','13352002881928','C39JGYG4DTWF',4,'S','xgen100','cfT8B5Mu','device store','D'),(403,136,'Apple','iPhone 5','iOS','7.1.1','4','','047E9A52144A80','13405006816751','F2QJQRQ9DTWF',4,'S','---','---','device store','D'),(404,140,'Apple','iPhone 6','iOS','8.4','4,7','','04889A52144A80','352069063276496','F73NCYBYG5MQ',4,'S','---','---','device store','D'),(405,142,'Apple','iPhone 6','iOS','9.3.2','4,7','','046E9A52144A80','354429061233428','C32NH2NPG5MN',4,'S','xgen97','E7UXRUCz','device store','D'),(406,144,'Apple','iPhone 6','iOS','10.2.0','4,7','','04709A52144A80','354429061875244','C33NHZX5G5MN',4,'S','---','---','device store','D'),(407,145,'Apple','iPhone 6','iOS','8.1.3','4,7','','04C09A52144A80','354429061875723','C32NH2RJG5MN',4,'S','---','---','device store','D'),(408,155,'Apple','iPhone 4S (black)','iOS','5.0','3,5','','04729A52144A80','12748005171251','85122H17A4S',4,'S','xgen106','G9TXAjT3','device store','D'),(409,157,'Apple','iPhone 4S','iOS','8.0.2','3,5','','046C9A52144A80','13038006874932','DNPGWKAYDTC0',4,'S','xgen103','jCL23TVT','device store','D'),(410,158,'Apple','iPhone 4S','iOS','6.1.3','3,5','','04739A52144A80','13178001007748','DNRJDSEHDTD2',4,'S','xgen105','DDjpr4pV','device store','D'),(411,159,'Apple','iPhone 4S','iOS','8.1.3','3,5','','046D9A52144A80','13533002518681','C8WM71HKFMLD',4,'S','xgen104','XGMkG9K8','device store','D '),(412,163,'Apple','iPhone 5S','iOS','10.2.0','4','','047A9A52144A80','358762057104997','DNPLM67QFFG8',4,'S','xgen98','GDN6GLkP','device store','D'),(413,165,'Apple','iPhone 5S','iOS','10.2.0','4','','043769F2164A80','358762058036834','DNPLM6HKFFG8',4,'S','xgen96','eFsdGhtS','device store','D'),(414,166,'Apple','iPhone 6 Plus','iOS','9.2.0','5,5','','04C69A52144A80','354381060807977','FK1NFEK5G5QT',4,'S','---','---','device store','D'),(415,168,'Apple','iPhone 6 Plus','iOS','10.2.0','5,5','115-0099335-17','046B9A52144A80','354436060435169','F2MNJ2S5G5QQ',4,'S','---','---','device store','D, PIN CODE 1234'),(416,169,'Apple','iPhone 6 Plus','iOS','8.0.2','5,5','115-0099321-03','047C9A52144A80','354436060451786','F2MNJ4D3G5QQ',4,'S','---','---','device store','D'),(417,170,'Apple','iPhone 6 Plus','iOS','10.0.1','5,5','115-0099336-18','04C19A52144A80','354436060475017','F2MNJ4AWG5QQ',4,'S','---','---','device store','D'),(418,175,'Apple','iPhone 4','iOS','7.1.2','3,5','','04829A52144A80','13264003415970','DX3K5K92DP0N',4,'S','xgen99','74GQdRmp','device store','D'),(419,179,'LG','4X HD','Android','4.0.3','4,7','','04C39A52144A80','352967050291677','206KPVH029167',4,'S','xgen138','abcNUkWe','device store','D'),(420,183,'Samsung','Galaxy Nexus 4','Android','4.2.1','4,65','','048C9A52144A80','351554054869533','014E04DE1500B019',4,'S','xgen126','Jc2ePyC5','device store','D'),(421,184,'Samsung','Galaxy Nexus ','Android','4.2.1','4,65','','043469F2164A80','351554057354152','0149C7510A019005',4,'S','xgen125','T8rexGXm','device store','D'),(422,189,'LG','Nexus 5','Android','5.0.1','4,95','','04C59A52144A80','358240057628547','04ade8288291a3d0',4,'S','xgen109','vPnWAuRv','device store','D'),(423,194,'Apple','MacBook Pro Retina','iOS','','13,3','115-0117705-54','04D59A52144A80','','C02JK2NRDR53',4,'','---','---','device store',''),(424,195,'Apple','MacBook Pro Retina','iOS','','13,3','115-0022002-90','04D69A52144A80','','C02G8Z43DDRJ7',4,'','---','---','Run',''),(425,202,'Microsoft','Surface RT 32Gb','Windows','Windows RT','10,6','','04AD9A52144A80','','76118530552',4,'T','---','---','device store','D'),(426,204,'Motorola','moto G','Android','4.4.4','5','','042F69F2164A80','359308053229070','TA9300DYHD',4,'S','xgen114','baWZprXk','device store','D'),(427,207,'Motorola','Nexus 6 ','Android','6.0.1','5,96','115-0100877-07','04BF9A52144A80','355470060519291','ZX1G423CRD',4,'S','xgen115','NM9Kr6eY','device store','D'),(428,208,'Motorola','Nexus 6 ','Android','5.0','5,96','115-0100885-15','04869A52144A80','355470060514177','ZX1G422Z7K',4,'S','xgen113','D6nk38Mn','device store','D'),(429,209,'Motorola','Xoom2','Android','4.0.4','10,1','115-0085462-15','04B69A52144A80','','TA2740Y9GA',4,'T','---','---','device store','D'),(430,214,'Nokia','Lumia 520','Windows','8.10.12393.890','','','04CB9A52144A80','351737069386342','',4,'S','---','---','device store','D'),(431,218,'Nokia','Lumia 925','Windows','8.10.14226.359','','','043669F2164A80','351734064567851','',4,'S','---','---','device store','D'),(432,220,'Nokia ','Lumia 620 ','Windows','8.0.10328.78','3,8','','04CA9A52144A80','354636054181048','0023J50',4,'S','---','---','device store','D'),(433,221,'Nokia ','Lumia 710 ','Windows','7.10.8862.144','3,7','','04C79A52144A80','352843058669174','002Z8J1',4,'S','---','---','device store','D, CODE 1111'),(434,222,'Nokia ','Lumia 920 ','Windows','8.10.14234.375','3,7','','042B69F2164A80','356355053029250','',4,'S','---','---','device store','D'),(435,223,'Nokia','Lumia 930','Windows','10.0.10586.107','','115-0103511-22','04C99A52144A80','359734060885028','',4,'S','---','---','device store','D'),(436,225,'Samsung','Galaxy Ace 3','Android','4.2.2','','','047D9A52144A80','352318062689492','R28F40N4G9B',4,'S','xgen124','KZPAkv4c','device store','D'),(437,229,'Samsung','Galaxy Core Duos','Android','4.1.2','4,3','','048B9A52144A80','359705057661325','RF1F243BQPR',4,'S','xgen134','SnMFDuCj','device store','D'),(438,235,'Samsung','Galaxy Note','Android','4.0.3','5,3','','048D9A52144A80','352935051101831','RF1C63EK5XH',4,'S','xgen120','WhTXRwen','device store','D'),(439,238,'Samsung','Galaxy Note 10.1','Android','4.1.2','10,1','','04A99A52144A80','353346055659007','RF1CAE679FN',4,'T','---','---','device store','D'),(440,239,'Samsung','Galaxy Note 3','Android','4.4.2','5,7','','04909A52144A80','351776062392360','RF8DC0943F',4,'S','xgen129','xdFRQQuR','device store','D'),(441,243,'Samsung','Galaxy Note II','Android','4.4.2','5,5','','04879A52144A80','354666050551076','RF1C991VT3N',4,'S','xgen128','E5aRjs9s','device store','D'),(442,251,'Samsung','Galaxy S3','Android','4.3','4,8','','047B9A52144A80','355449050247345','RF1CC45LJHF',4,'S','xgen132','3JBTCuYj','device store','D'),(443,254,'Samsung','Galaxy S4','Android','4.4.2','5','','048F9A52144A80','355172058565324','R31DA0WWY3H',4,'S','xgen136','RTTbQYET','device store','D'),(444,257,'Samsung','Galaxy S4','Android','4.4.2','5','','042E69F2164A80','357377058715732','RF1D5872PSP',4,'S','xgen140','tGQfYxYC','device store','D'),(445,258,'Samsung','Galaxy S4','Android','5.0.1','5','','043269F2164A80 ','357377058715773','RF1D5872PXR',4,'S','xgen121','NQ6YayGW','device store','D'),(446,259,'Samsung','Galaxy S4 Mini','Android','4.4.2','4,3','','04779A52144A80','355960061431199','RF8F90MKVLZ',4,'S','xgen139','mDb93geZ','device store','D'),(447,261,'Samsung','Galaxy S5 mini','Android','4.4.2','4,5','','048E9A52144A80','356099060100395','R58F80MQG9D',4,'S','xgen137','ZDQW5G6z','device store','D'),(448,263,'Samsung','Galaxy S6 edge','Android','5.1.1','5,1','115-0102657-41','04749A52144A80','359521060417559','RF8G30N2TAD',4,'S','xgen122','55sGXagt','device store','D'),(449,274,'Samsung','Galaxy Tab 4','Android','5.0.2','10,1','115-0097576-04','04D19A52144A80','','R52F60G2A9B',4,'T','---','---','device store','D, CODE 1234'),(450,276,'Samsung','Galaxy Tab Pro 12.2','Android','4.4.2','','115-0088915-73','04AB9A52144A80','','RF2F30Z78HE',4,'S','---','---','device store','NO TAG ON DEVICE'),(451,278,'Samsung','Galaxy Tab2 10','Android','4.2.2','10,1','','04BA9A52144A80','354314054914749','RF1CB9YRE7P',4,'T','---','---','device store','D'),(452,279,'Samsung','Galaxy Tab2 7','Android','4.1.2','7','','04AA9A52144A80','352372055958000','RF1CB7RX1PR',4,'T','---','---','device store','D'),(453,282,'Samsung','Galaxy Tab3 10','Android','4.4.2','10,1','','04B59A52144A80','358263050320599','RF1D96HPXZZ',4,'T','---','---','device store','D, CODE 1234'),(454,283,'Samsung','Galaxy Tab3 8','Android','4.4.2','8','','04B09A52144A80','357393050921004','RF1D880H1RV',4,'T','---','---','device store','D'),(455,285,'Samsung','Galaxy S3','Android','4.1.2','4,8','','04859A52144A80','353719055633968','RF1C65JPECJ',4,'S','xgen130','jPeLvrkd','device store','D'),(456,286,'Samsung ','Galaxy S3 mini','Android','4.1.2','4','','04899A52144A80','355593050068332','R31CC0R4V5K',4,'S','xgen131','HxqvwbvQ','device store','D'),(457,287,'Samsung ','Galaxy tab Pro','Android','4.4.2','10,1','115-0097561-86','04B49A52144A80','','RF2F21DRZ6T',4,'T','---','---','device store','D, CODE 1234'),(458,298,'Sony','Xperia Z','Android','4.2.2','5','','04CC9A52144A80','355762056621747','CB5A1PZ0HT',4,'S','---','---','device store','D'),(459,300,'Sony','Xperia Z2','Android','4.4.2','10,1','115-0097667-95','04B29A52144A80','','CB5126S3W4',4,'T','---','---','device store','D'),(460,303,'Sony Ericsson','Xperia Z1 Compact','Android','4.4.2','','115-0100052-55','04D89A52144A80','353888065271893','',4,'S','---','---','Erdem Tokuc',''),(461,356,'Asus','Transformer Pad TF300T','Android','4.1.1.','10,1','','04B79A52144A80','','CCOKCT010253',4,'T','---','---','device store','D'),(462,358,'Apple','Ipad 1','iOS','5.1.1','9,7','','049A9A52144A80','','V5040D5LZ38',4,'T','---','---','device store','D'),(463,360,'Nokia ','Lumia 625','Windows','8.0.10517.150','','','042A69F2164A80','353035068103554','',4,'S','---','---','device store','D'),(464,361,'LG','Nexus 4','Android','4.4.4','4,7','','04C29A52144A80','356489053693490','026c936e9a52c5d0',4,'S','xgen119','6CPa6Zx7','device store','D'),(465,367,'Microsoft','Surface tablet','Windows','8 PRO','10,6','','04919A52144A80','','13578431653',4,'T','xgen88','QTHb3aVL','device store','D'),(466,372,'Samsung','Galaxy Tab A 16 GB','Android','6.0.1','9,7','115-0105709-86','04BD9A52144A80','359501065128419','R52G805HWXX',4,'T','---','---','device store','D'),(467,373,'Asus','Transformer Pad TF200T','Windows','8.1','10,1','115-0104967-23','04939A52144A80','F4N0CJ00261714624M','',4,'T','xgen89','kETSK6f4','device store','D, laadt niet op'),(468,376,'Microsoft','Surface 3 128 GB','Windows','10','10,8','115-0104953-09','04D79A52144A80','26503553052','',4,'T','---','---','device store','D, CODE 1111, Pascal De Groote'),(469,377,'Microsoft','Lumia 532','Windows','10.0.10586.11','4','115-0105590-64','04CD9A52144A80','357129063165076','',4,'S','---','---','device store','D'),(470,378,'Microsoft','Lumia 532','Windows','10.0.14393.67','4','115-0105522-93','04CE9A52144A80','357129061890535','',4,'S','---','---','device store','D'),(471,382,'Nokia','Lumia 635','Windows','8.10.14219.341','4,5','115-0105500-71','042C69F2164A80','359743060415025','',4,'S','---','---','device store','D'),(472,396,'Apple','ipad Pro','iOS','9.2.1','12,9','115-0107124-46','04D09A52144A80','','DLXQN3XTGMLD',4,'T','---','---','device store','D'),(473,397,'Huawei','Nexus 6P','Android','7.0','5,7','115-0107135-57','042D69F2164A80','867981022100492','ENU7N15B14001343',4,'S','---','---','device store','D, PIN CODE 1111'),(474,398,'LG','G4','Android','5.1','5,5','115-0106975-91','04C49A52144A80','359872063047582','506KPRW304758',4,'S','---','---','device store',''),(475,399,'Samsung','Samsung Galaxy Note 4','Android','6.0.1','5,7','115-0107003-22','04839A52144A80','357221065959703','RF8GB0JK3QA',4,'S','xgen123','DTeQqnjG','device store','D'),(476,403,'Samsung','S7','Android','6.0.1','5,1','115-0117940-95','088063D9','359467074350719','R58H4356XBR',4,'S','xgen133','w99p4Lgx','device store','D'),(477,404,'Samsung','S7 Edge','Android','6.0.1','5,5','115-0117943-01','046A9A52144A80','359948076308359','RF8H52AN7ZE',4,'S','xgen86','KKQp3CEj','device store','D, PIN CODE 1234'),(478,406,'Apple','iPhone SE','iOS','9.3.5','4','115-0117938-93','043569F2164A80','355794079112156','F17S2F65H2XJ',4,'S','---','---','device store','D'),(479,407,'Apple','iPhone SE','iOS','9.3.5','4','115-0117939-94','04C89A52144A80','355794079088554','F17S2ERBH2XJ',4,'S','---','---','device store','D'),(480,409,'HP','Pavilion x2 detachable','Windows','10','10,1','115-0117929-84','04B99A52144A80','','5CG61620XJ',4,'T','xgen91','4rXF26tc','device store',''),(481,410,'Microsoft','Surface 3 128 GB','Windows','10','10,8','115-0105507-78','04A69A52144A80','','28116353152',4,'T','xgen90','eSQWjexv','device store','D, Tester009'),(482,411,'Microsoft','Surface Pro 4','Windows','10 Pro','12,3','115-0121193-50','04BB9A52144A80','','40216154953',4,'T','xgen92','Je99bV44','device store','TO BE INSTALLED'),(483,412,'Samsung','Galaxy TabPro','Windows','10 Home','12','115-0121192-49','04A59A52144A80','','24C7RF2H2000E3A',4,'T','xgen93','GgqrzKbp','device store','TO BE INSTALLED'),(484,413,'Apple','iPhone 7','iOS','tbc','5','115-0121437-03','043169F2164A80','353844087324384','DNQSPKE3HG7F',4,'S','xgen95','75Zqwu2q','device store','TO BE INSTALLED'),(485,414,'Huawei','P9 lite','Android','tbc','5,5','115-0125184-64','043069F2164A80','8,63541E+14','FUH0216B18000640',4,'S','xgen94','qqGpaMRw','device store','TO BE INSTALLED');
/*!40000 ALTER TABLE `device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_status_user`
--

DROP TABLE IF EXISTS `device_status_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `device_status_user` (
  `deviceid` int(11) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `startdate` datetime NOT NULL,
  `enddate` datetime DEFAULT NULL,
  PRIMARY KEY (`deviceid`,`startdate`),
  KEY `userid` (`userid`),
  CONSTRAINT `device_status_user_ibfk_1` FOREIGN KEY (`deviceid`) REFERENCES `device` (`id`),
  CONSTRAINT `device_status_user_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_status_user`
--

LOCK TABLES `device_status_user` WRITE;
/*!40000 ALTER TABLE `device_status_user` DISABLE KEYS */;
INSERT INTO `device_status_user` VALUES (311,NULL,'unavailable','2017-01-25 16:39:06',NULL),(312,NULL,'unavailable','2017-01-25 16:39:06',NULL),(313,NULL,'unavailable','2017-01-25 16:39:06',NULL),(314,NULL,'unavailable','2017-01-25 16:39:06',NULL),(315,NULL,'unavailable','2017-01-25 16:39:06',NULL),(316,NULL,'unavailable','2017-01-25 16:39:06',NULL),(317,NULL,'unavailable','2017-01-25 16:39:06',NULL),(318,NULL,'unavailable','2017-01-25 16:39:06',NULL),(319,NULL,'unavailable','2017-01-25 16:39:06',NULL),(320,NULL,'unavailable','2017-01-25 16:39:06',NULL),(321,NULL,'unavailable','2017-01-25 16:39:06',NULL),(322,NULL,'unavailable','2017-01-25 16:39:06',NULL),(323,NULL,'unavailable','2017-01-25 16:39:06',NULL),(324,NULL,'unavailable','2017-01-25 16:39:06',NULL),(325,NULL,'unavailable','2017-01-25 16:39:06',NULL),(326,NULL,'unavailable','2017-01-25 16:39:06',NULL),(327,NULL,'unavailable','2017-01-25 16:39:06',NULL),(328,NULL,'unavailable','2017-01-25 16:39:06',NULL),(329,NULL,'unavailable','2017-01-25 16:39:06',NULL),(330,NULL,'unavailable','2017-01-25 16:39:06',NULL),(331,NULL,'unavailable','2017-01-25 16:39:06',NULL),(332,NULL,'unavailable','2017-01-25 16:39:06',NULL),(333,NULL,'unavailable','2017-01-25 16:39:06',NULL),(334,NULL,'unavailable','2017-01-25 16:39:06',NULL),(335,NULL,'unavailable','2017-01-25 16:39:06',NULL),(336,NULL,'unavailable','2017-01-25 16:39:06',NULL),(337,NULL,'unavailable','2017-01-25 16:39:06',NULL),(338,NULL,'unavailable','2017-01-25 16:39:06',NULL),(339,NULL,'unavailable','2017-01-25 16:39:06',NULL),(340,NULL,'unavailable','2017-01-25 16:39:06',NULL),(341,NULL,'unavailable','2017-01-25 16:39:06',NULL),(342,NULL,'unavailable','2017-01-25 16:39:06',NULL),(343,NULL,'unavailable','2017-01-25 16:39:06',NULL),(344,NULL,'unavailable','2017-01-25 16:39:06',NULL),(345,NULL,'unavailable','2017-01-25 16:39:06',NULL),(346,NULL,'unavailable','2017-01-25 16:39:06',NULL),(347,NULL,'unavailable','2017-01-25 16:39:06',NULL),(348,NULL,'unavailable','2017-01-25 16:39:06',NULL),(349,NULL,'unavailable','2017-01-25 16:39:06',NULL),(350,NULL,'unavailable','2017-01-25 16:39:06',NULL),(351,NULL,'unavailable','2017-01-25 16:39:06',NULL),(352,NULL,'unavailable','2017-01-25 16:39:06',NULL),(353,NULL,'unavailable','2017-01-25 16:39:06',NULL),(354,NULL,'unavailable','2017-01-25 16:39:06',NULL),(355,NULL,'unavailable','2017-01-25 16:39:06',NULL),(356,NULL,'unavailable','2017-01-25 16:39:06',NULL),(357,NULL,'unavailable','2017-01-25 16:39:06',NULL),(358,NULL,'unavailable','2017-01-25 16:39:06',NULL),(359,NULL,'unavailable','2017-01-25 16:39:06',NULL),(360,NULL,'unavailable','2017-01-25 16:39:06',NULL),(361,NULL,'unavailable','2017-01-25 16:39:06',NULL),(362,NULL,'unavailable','2017-01-25 16:39:06',NULL),(363,NULL,'unavailable','2017-01-25 16:39:06',NULL),(364,NULL,'unavailable','2017-01-25 16:39:06',NULL),(365,NULL,'unavailable','2017-01-25 16:39:06',NULL),(366,NULL,'unavailable','2017-01-25 16:39:06',NULL);
/*!40000 ALTER TABLE `device_status_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scan`
--

DROP TABLE IF EXISTS `scan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entityid` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `badgeid` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=479 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scan`
--

LOCK TABLES `scan` WRITE;
/*!40000 ALTER TABLE `scan` DISABLE KEYS */;
/*!40000 ALTER TABLE `scan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statistics`
--

DROP TABLE IF EXISTS `statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `statistics` (
  `type` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statistics`
--

LOCK TABLES `statistics` WRITE;
/*!40000 ALTER TABLE `statistics` DISABLE KEYS */;
INSERT INTO `statistics` VALUES ('DeviceBrand','Motorola','2017-01-16 14:57:32'),('DeviceBrand','Motorola','2017-01-18 13:59:48'),('DeviceBrand','Apple','2017-01-19 08:55:46'),('DeviceBrand','Apple','2017-01-19 08:56:44'),('DeviceBrand','Samsung','2017-01-19 08:57:45'),('DeviceBrand','Huawei','2017-01-19 09:21:30'),('DeviceBrand','Motorola','2017-01-19 09:22:05'),('DeviceBrand','Samsung','2017-01-19 09:23:48'),('DeviceBrand','Nokia','2017-01-19 09:29:00'),('DeviceBrand','Nokia ','2017-01-19 09:30:14'),('DeviceBrand','Nokia ','2017-01-19 09:31:17'),('DeviceBrand','Nokia','2017-01-19 09:33:29'),('DeviceBrand','Samsung','2017-01-19 10:33:02'),('DeviceBrand','Apple','2017-01-19 11:18:43'),('DeviceBrand','Motorola','2017-01-20 14:35:17'),('DeviceBrand','Motorola','2017-01-25 09:24:03'),('DeviceBrand','Test','2017-01-25 13:30:40'),('DeviceBrand','Test','2017-01-25 13:30:45'),('DeviceBrand','Apple','2017-01-25 13:43:51');
/*!40000 ALTER TABLE `statistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `profileid` int(11) DEFAULT NULL,
  `startdate` datetime DEFAULT NULL,
  `enddate` datetime DEFAULT NULL,
  `password` varchar(1023) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `profileid` (`profileid`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`profileid`) REFERENCES `user_profile` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (47,'Laura','Laura','De Smet',4,NULL,NULL,'azerty'),(48,'Naveen','Naveen','ANANDHAN',4,NULL,NULL,'azerty'),(49,'Archana','Archana','BALAN',4,NULL,NULL,'azerty'),(50,'Naven','Naven','BALASIVAM',4,NULL,NULL,'azerty'),(51,'Tim','Tim','Boerjan',4,NULL,NULL,'azerty'),(52,'Jonas','Jonas','Coenen',4,NULL,NULL,'azerty'),(53,'Nicolas','Nicolas','Cueto',4,NULL,NULL,'azerty'),(54,'Ismael','Ismael','Dahabi',4,NULL,NULL,'azerty'),(55,'Mani','Raja Manikanta','DIDDI',4,NULL,NULL,'azerty'),(56,'Anesh','Anesh','ERAMANGALATH',4,NULL,NULL,'azerty'),(57,'YuvarajE','Yuvaraj','ESWARAMOORTHI',4,NULL,NULL,'azerty'),(58,'KumarE','Yuvaraj Kumar','Eswaramoorthi',4,NULL,NULL,'azerty'),(59,'Pieterjan','Pieterjan','Eygenraam',4,NULL,NULL,'azerty'),(60,'Anthony','Anthony','Franssens',1,NULL,NULL,'azerty'),(61,'Tony','Anthony','Franssens',4,NULL,NULL,'azerty'),(62,'Enkthur','Enkhtur','Ganbold',4,NULL,NULL,'azerty'),(63,'Bavithra','Bavithra','GANESAN',4,NULL,NULL,'azerty'),(64,'Priyadarshini','Priyadarshini','GANESAN',4,NULL,NULL,'azerty'),(65,'YuvarajG','Yuvaraj','GANESAN',4,NULL,NULL,'azerty'),(66,'Sandeep','Sandeep','GHOSH',4,NULL,NULL,'azerty'),(67,'Robin','Robin','Jaupart',4,NULL,NULL,'azerty'),(68,'Saseendhiran','Saseendhiran','JEEVARATHINAM',4,NULL,NULL,'azerty'),(69,'Pallavi','Pallavi','JOSHI',4,NULL,NULL,'azerty'),(70,'Ananth','Ananth','KANIUTRAJA SANTHANA',4,NULL,NULL,'azerty'),(71,'Tharunkumar','Tharunkumar','KANTHASAMY',4,NULL,NULL,'azerty'),(72,'Tanay','Tanay','MATHPAL',4,NULL,NULL,'azerty'),(73,'Surendra','Surendra','MEKA',4,NULL,NULL,'azerty'),(74,'Mahabub','Mahabub Ali','MOHAMMAD',4,NULL,NULL,'azerty'),(75,'Dilip','Dilip Kumar','MOHANA SUNDARAM',4,NULL,NULL,'azerty'),(76,'Ishan','Ishan','PANDEY',4,NULL,NULL,'azerty'),(77,'Ram','Ramasubramanian','PITCHIAH',4,NULL,NULL,'azerty'),(78,'Yasvanth','Yashvanth','PONNALURU',4,NULL,NULL,'azerty'),(79,'Murali','Murali Sankar','PRABHAKARAN',4,NULL,NULL,'azerty'),(80,'Uday','Naga Venkata Uday Bhaskar','PULAVARTHI',4,NULL,NULL,'azerty'),(81,'Amir','Amirdhagadesan','RAJASEKAR',4,NULL,NULL,'azerty'),(82,'Ashokan','Ashokan','RAMAIYA',4,NULL,NULL,'azerty'),(83,'Rajanidevi','Rajanidevi','RAMANADHAM',4,NULL,NULL,'azerty'),(84,'YvarajR','Yuvaraj','RANGANATHAN',4,NULL,NULL,'azerty'),(85,'Giridaran','Giridaran','REGUNATHAN',4,NULL,NULL,'azerty'),(86,'Bruno','Bruno','Rochez',4,NULL,NULL,'azerty'),(87,'KumarS','Krishna Kumar','SEKAR',4,NULL,NULL,'azerty'),(88,'Bjorn','Bjorn','Somers',4,NULL,NULL,'azerty'),(89,'Girish','Girish','TANEJA',4,NULL,NULL,'azerty'),(90,'Thierry','Thierry','Therasse',4,NULL,NULL,'azerty'),(91,'Bernard','Bernard','Vanbelleghem',4,NULL,NULL,'azerty'),(92,'Pons','Ponsuyambu','VELLA DURAI',4,NULL,NULL,'azerty'),(93,'Tomas','Tomas','wellekens',4,NULL,NULL,'azerty'),(94,'Petra','Petra','Roks',4,NULL,NULL,'azerty'),(95,'Wendy','Wendy','Leclerq',4,NULL,NULL,'azerty'),(96,'Vijay','Vijay','KYAMA',4,NULL,NULL,'azerty'),(97,'admin','admin','admin',1,NULL,NULL,'edczsx');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_badge`
--

DROP TABLE IF EXISTS `user_badge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_badge` (
  `userid` int(11) NOT NULL,
  `badgeid` varchar(255) DEFAULT NULL,
  `startdate` datetime NOT NULL,
  PRIMARY KEY (`userid`,`startdate`),
  CONSTRAINT `user_badge_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_badge`
--

LOCK TABLES `user_badge` WRITE;
/*!40000 ALTER TABLE `user_badge` DISABLE KEYS */;
INSERT INTO `user_badge` VALUES (47,'6B665ED4','2017-01-25 16:43:01'),(49,'4697382744080','2017-01-25 16:44:19'),(53,'BEA33B2A','2017-01-25 16:43:21'),(54,'7A76F1EB','2017-01-25 16:43:31'),(58,'0EC22AA3','2017-01-25 16:43:54'),(60,'5BD39DA2','2017-01-25 16:44:10'),(62,'5A57E7EB','2017-01-25 16:44:32'),(86,'7695DA0D','2017-01-25 16:44:43'),(88,'665BDB0D','2017-01-25 16:44:52'),(90,'9B942F9D','2017-01-25 16:45:01'),(91,'0B0A329D','2017-01-25 16:45:12');
/*!40000 ALTER TABLE `user_badge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_profile` (
  `id` int(11) NOT NULL,
  `profile` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile`
--

LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
INSERT INTO `user_profile` VALUES (1,'administrator'),(2,'incubator'),(3,'business'),(4,'tester'),(5,'savi');
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-01-25 17:46:06
