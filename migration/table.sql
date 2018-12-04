# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.22)
# Database: gita_dev
# Generation Time: 2018-12-03 17:05:44 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Comments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Comments`;

CREATE TABLE `Comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text COLLATE utf8_unicode_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `ProjectId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `ProjectId` (`ProjectId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`ProjectId`) REFERENCES `Projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table FAQForms
# ------------------------------------------------------------

DROP TABLE IF EXISTS `FAQForms`;

CREATE TABLE `FAQForms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8_unicode_ci,
  `finished` tinyint(1) DEFAULT '0',
  `memo` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table FormSchemas
# ------------------------------------------------------------

DROP TABLE IF EXISTS `FormSchemas`;

CREATE TABLE `FormSchemas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `schema` text COLLATE utf8_unicode_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `FormSchemas` WRITE;
/*!40000 ALTER TABLE `FormSchemas` DISABLE KEYS */;

INSERT INTO `FormSchemas` (`id`, `schema`, `createdAt`, `updatedAt`)
VALUES
  (1,'[{\"type\":\"header\",\"subtype\":\"h1\",\"hType\":\"step\",\"label\":\"Project Description/Business Model\"},{\"label\":\"Project Icon\",\"name\":\"project_icon\",\"required\":true,\"type\":\"file\",\"subtype\":\"file\",\"fileLimit\":\"image\",\"multiple\":false},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Project Name\",\"name\":\"project_name\",\"required\":true,\"isGitaStandard\":true},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Digital asset full name (e.g., Ether)\",\"name\":\"digital_asset_name\",\"required\":false,\"isGitaStandard\":false},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Digital asset ticker (e.g., ETH)\",\"name\":\"digital_asset_ticker\",\"required\":false,\"isGitaStandard\":false},{\"type\":\"text\",\"subtype\":\"url\",\"label\":\"Project URL (URL of project website)\",\"name\":\"project_url\",\"required\":true,\"isGitaStandard\":false},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Project Goals (Describe your project in a sentence.)\",\"name\":\"project_goal\",\"isGitaStandard\":false,\"rows\":3,\"maxlength\":100},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"object\",\"label\":\"Project Roadmap/Project Plan/Milestones (detailed description of concrete project time frame) \",\"name\":\"project_milestone\",\"isGitaStandard\":true},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Description of Milestones and respective start and end date:\",\"hType\":\"object\",\"name\":\"brief\",\"rows\":3},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Technical details\",\"hType\":\"object\",\"name\":\"technical\",\"rows\":3},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Business details\",\"hType\":\"object\",\"name\":\"business\",\"rows\":3},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Other details\",\"hType\":\"object\",\"name\":\"other\",\"rows\":3},{\"type\":\"header\",\"subtype\":\"h3\",\"hType\":\"complexTokenType\",\"label\":\"Type of Token to be issued (Multiple selections accepted)\",\"name\":\"token_type\",\"isGitaStandard\":true},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Is there a Minimum Viable Product on release of tokens?\",\"name\":\"mvp_function\",\"isGitaStandard\":true},{\"type\":\"radio-group\",\"hType\":\"radio\",\"className\":\"inline\",\"label\":\"Is there a Minimum Viable Product on release of tokens?\",\"name\":\"mvp_function\",\"isGitaStandard\":true,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Link for reference\",\"name\":\"yes_1\",\"className\":\"\",\"rows\":3},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"array\",\"label\":\"Biographies and resumes of the management team\",\"name\":\"biography_team\",\"isGitaStandard\":true},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Name\",\"hType\":\"array\",\"name\":\"name\",\"required\":true},{\"type\":\"text\",\"subtype\":\"email\",\"label\":\"Email\",\"hType\":\"array\",\"name\":\"email\",\"required\":true},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Title / Position\",\"hType\":\"array\",\"name\":\"title\"},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Biography / Profile\",\"hType\":\"array\",\"name\":\"biography\",\"rows\":3},{\"type\":\"text\",\"subtype\":\"url\",\"label\":\"Linkedin URL\",\"hType\":\"array\",\"name\":\"url\"},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"array\",\"label\":\"Biographies and resumes of advisors\",\"name\":\"biography_advisor\",\"isGitaStandard\":true},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Name\",\"hType\":\"array\",\"name\":\"name\",\"required\":true},{\"type\":\"text\",\"subtype\":\"email\",\"label\":\"Email\",\"hType\":\"array\",\"name\":\"email\",\"required\":true},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Title / Position\",\"hType\":\"array\",\"name\":\"title\"},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Biography / Profile\",\"hType\":\"array\",\"name\":\"biography\",\"rows\":3},{\"type\":\"text\",\"subtype\":\"url\",\"label\":\"Linkedin URL\",\"hType\":\"array\",\"name\":\"url\"},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"array\",\"label\":\"Biographies and resumes of developers\",\"name\":\"biography_developer\",\"isGitaStandard\":true},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Name\",\"hType\":\"array\",\"name\":\"name\",\"required\":true},{\"type\":\"text\",\"subtype\":\"email\",\"label\":\"Email\",\"hType\":\"array\",\"name\":\"email\",\"required\":true},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Title / Position\",\"hType\":\"array\",\"name\":\"title\"},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Biography / Profile\",\"hType\":\"array\",\"name\":\"biography\",\"rows\":3},{\"type\":\"text\",\"subtype\":\"url\",\"label\":\"Linkedin URL\",\"hType\":\"array\",\"name\":\"url\"},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"array\",\"label\":\"Roles of the Advisors and involvement in the project (Detailed description of terms and conditions under which advisors provide their services)\",\"name\":\"advisor_role\",\"isGitaStandard\":true},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Name\",\"hType\":\"array\",\"name\":\"name\",\"required\":true},{\"type\":\"text\",\"subtype\":\"email\",\"label\":\"Email\",\"hType\":\"array\",\"name\":\"email\",\"required\":true},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Biography / Profile\",\"hType\":\"array\",\"name\":\"biography\",\"rows\":3},{\"type\":\"text\",\"subtype\":\"url\",\"label\":\"Linkedin URL\",\"hType\":\"array\",\"name\":\"url\"},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"object\",\"label\":\"Information about the technologies to be used (Including distributed ledger technology, ICO smart contract code and tech specs used; are new or existing technologies used; etc.)\",\"name\":\"tech_used\",\"isGitaStandard\":true},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Brief Description of above technologies functions in your project\",\"hType\":\"object\",\"name\":\"desc\",\"rows\":3,\"maxlength\":500},{\"type\":\"text\",\"subtype\":\"url\",\"label\":\"Github/GitLab URL\",\"hType\":\"object\",\"name\":\"url\"},{\"hType\":\"object\",\"label\":\"Supplementary Document\",\"name\":\"file\",\"type\":\"file\",\"subtype\":\"file\",\"fileLimit\":\"document\",\"multiple\":false},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Are smart contracts used in the token sale?\",\"name\":\"smart_contract\",\"isGitaStandard\":false},{\"type\":\"radio-group\",\"hType\":\"radio\",\"label\":\"Are smart contracts used in the token sale?\",\"name\":\"smart_contract\",\"isGitaStandard\":false,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Who is the provider?\",\"name\":\"yes_provider\"},{\"hType\":\"radio\",\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Who audits the contracts?\",\"name\":\"yes_audits\"},{\"type\":\"header\",\"subtype\":\"h1\",\"hType\":\"step\",\"label\":\"ICO Information\"},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Will tokens be created before fundraising?\",\"name\":\"token_creation\",\"isGitaStandard\":true},{\"type\":\"radio-group\",\"hType\":\"radio\",\"className\":\"inline\",\"label\":\"Will tokens be created before fundraising?\",\"name\":\"token_creation\",\"isGitaStandard\":true,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Please provide relevant links to token emission and crowdsale smart contracts for verification \",\"name\":\"yes_1\",\"className\":\"\",\"rows\":3},{\"type\":\"number\",\"label\":\"Total amount to be raised in USD (hardcap)\",\"name\":\"usd_raise\",\"className\":\"price-block\",\"isGitaStandard\":true},{\"type\":\"number\",\"label\":\"Amount of softcap in USD\",\"name\":\"softcap\",\"className\":\"price-block\",\"isGitaStandard\":false},{\"type\":\"number\",\"label\":\"What percentage of the tokens are being sold in the ICO?\",\"name\":\"sold_token_percentage\",\"className\":\"percent-block\",\"isGitaStandard\":false},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Type of ICO\",\"name\":\"ico_type\",\"isGitaStandard\":false},{\"type\":\"radio-group\",\"hType\":\"radio\",\"label\":\"Type of ICO\",\"name\":\"ico_type\",\"isGitaStandard\":false,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"Capped Sales\",\"value\":\"capped\"},{\"label\":\"Uncapped Sales\",\"value\":\"uncapped\"},{\"label\":\"Dutch Auction\",\"value\":\"dutch_auction\"},{\"label\":\"Other:\",\"value\":\"other\"}]},{\"hType\":\"radio\",\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Label\",\"name\":\"other_text\",\"className\":\"inline\"},{\"type\":\"number\",\"label\":\"What is the price of the token at the launch of the ICO?\",\"name\":\"token_price_at_launch\",\"isGitaStandard\":true,\"className\":\"price-block\"},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Does the price of the token change during the ICO period?\",\"name\":\"token_price_in_period\",\"isGitaStandard\":true},{\"type\":\"radio-group\",\"hType\":\"radio\",\"className\":\"inline\",\"label\":\"Does the price of the token change during the ICO period?\",\"name\":\"token_price_in_period\",\"isGitaStandard\":true,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Please describe the method used to determine the prices changes.\",\"name\":\"yes_1\",\"className\":\"\",\"rows\":3},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"object\",\"label\":\"Contribution audit report\",\"name\":\"contribution_audit\",\"isGitaStandard\":true},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Label\",\"hType\":\"object\",\"name\":\"textarea\",\"rows\":3},{\"hType\":\"object\",\"label\":\"Label\",\"name\":\"file\",\"type\":\"file\",\"subtype\":\"file\",\"fileLimit\":\"document\",\"multiple\":false},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Please describe the fundraising structure and stages of the ICO (e.g., seed round, private sale 1, private sale 2, pre-sale, and public sale).\",\"name\":\"raising_process\",\"isGitaStandard\":true,\"rows\":3},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"object\",\"label\":\"Total Allocation Available\",\"name\":\"total_allocation\",\"isGitaStandard\":true},{\"type\":\"number\",\"label\":\"Team\",\"hType\":\"object\",\"name\":\"team_percent\",\"className\":\"percent-block\",\"min\":0},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Label\",\"hType\":\"object\",\"name\":\"team_txt\"},{\"type\":\"number\",\"label\":\"Advisor\",\"hType\":\"object\",\"name\":\"advisor_percent\",\"className\":\"percent-block\",\"min\":0},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Label\",\"hType\":\"object\",\"name\":\"advisor_txt\"},{\"type\":\"number\",\"label\":\"Marketing\",\"hType\":\"object\",\"name\":\"marketing_percent\",\"className\":\"percent-block\",\"min\":0},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Label\",\"hType\":\"object\",\"name\":\"marketing_txt\"},{\"type\":\"number\",\"label\":\"Legal\",\"hType\":\"object\",\"name\":\"legal_percent\",\"className\":\"percent-block\",\"min\":0},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Label\",\"hType\":\"object\",\"name\":\"legal_txt\"},{\"type\":\"number\",\"label\":\"Development\",\"hType\":\"object\",\"name\":\"development_percent\",\"className\":\"percent-block\",\"min\":0},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Label\",\"hType\":\"object\",\"name\":\"development_txt\"},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Stages completed as of the date specified\",\"name\":\"stage_date\",\"isGitaStandard\":true},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Will unsold tokens be burned?\",\"name\":\"remain_unsold_result\",\"isGitaStandard\":true},{\"type\":\"radio-group\",\"hType\":\"radio\",\"label\":\"Will unsold tokens be burned?\",\"name\":\"remain_unsold_result\",\"isGitaStandard\":true,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No (Please specify how you manage those tokens)\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Label\",\"name\":\"no_1\",\"row\":3},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"object\",\"label\":\"With which cryptocurrencies (or legal tender) will the ICO be financed and how?\",\"name\":\"financed_crypto\",\"isGitaStandard\":true},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Cryptocurrencies\",\"hType\":\"object\",\"name\":\"cryptocurrencies\",\"rows\":3},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Legal tender\",\"hType\":\"object\",\"name\":\"legal_tender\",\"rows\":3},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Is there a Lock-up Period?\",\"name\":\"lockup_period\",\"isGitaStandard\":true},{\"type\":\"radio-group\",\"hType\":\"radio\",\"label\":\"Is there a Lock-up Period?\",\"name\":\"lockup_period\",\"isGitaStandard\":true,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes (Please specify how the lockup will be stipulated)\",\"value\":\"yes\"},{\"label\":\"Other: Specify\",\"value\":\"other\"}]},{\"type\":\"select\",\"label\":\"Label\",\"hType\":\"radio\",\"name\":\"yes_1\",\"isGitaStandard\":true,\"className\":\"inline\",\"values\":[{\"label\":\"an ICO smart contract\",\"value\":\"ico_smart_contract\"},{\"label\":\"in a separate vesting contract\",\"value\":\"vesting_contract\"},{\"label\":\"in a physical option agreement with teammembers\",\"value\":\"physical_options\"}]},{\"hType\":\"radio\",\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Label\",\"name\":\"other_1\",\"className\":\"inline\"},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"If there’s any discounts provided in the private sale?\",\"name\":\"discounts_private_sale\",\"isGitaStandard\":true},{\"type\":\"radio-group\",\"hType\":\"radio\",\"className\":\"inline\",\"label\":\"If there’s any discounts provided in the private sale?\",\"name\":\"discounts_private_sale\",\"isGitaStandard\":true,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Label\",\"name\":\"yes_1\",\"className\":\"inline\",\"rows\":3},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Is the token pegged to forms of payment in the private sale?\",\"name\":\"pegged_private_sale\",\"isGitaStandard\":false},{\"type\":\"radio-group\",\"hType\":\"radio\",\"className\":\"inline\",\"label\":\"Is the token pegged to forms of payment in the private sale?\",\"name\":\"pegged_private_sale\",\"isGitaStandard\":false,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Label\",\"name\":\"yes_1\",\"className\":\"inline\",\"rows\":3},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Are there any restrictions or any investment conditions regarding investors? If so, please list below\",\"name\":\"investor_restriction\",\"isGitaStandard\":false},{\"type\":\"radio-group\",\"hType\":\"radio\",\"className\":\"inline\",\"label\":\"Are there any restrictions or any investment conditions regarding investors? If so, please list below\",\"name\":\"investor_restriction\",\"isGitaStandard\":false,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Label\",\"name\":\"yes_1\",\"className\":\"\",\"rows\":3},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Is there any process of cryptocurrency proceeds restitution in case the ICO target amount is not reached\",\"name\":\"restitution_process\",\"isGitaStandard\":true},{\"type\":\"radio-group\",\"hType\":\"radio\",\"className\":\"inline\",\"label\":\"Is there any process of cryptocurrency proceeds restitution in case the ICO target amount is not reached\",\"name\":\"restitution_process\",\"isGitaStandard\":true,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Label\",\"name\":\"yes_1\",\"className\":\"inline\",\"rows\":3},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Is there a ‘Wallet,’ which is real-time traceability of collected cryptocurrency (and Fiat currencies) for the ICO?\",\"name\":\"wallet_traceability\",\"isGitaStandard\":false},{\"type\":\"radio-group\",\"hType\":\"radio\",\"className\":\"inline\",\"label\":\"Is there a ‘Wallet,’ which is real-time traceability of collected cryptocurrency (and Fiat currencies) for the ICO?\",\"name\":\"wallet_traceability\",\"isGitaStandard\":false,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Links to all relevant wallets:\",\"name\":\"yes_1\",\"className\":\"\",\"rows\":3},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"object\",\"label\":\"At which point, by whom and in which manner will the token be transferred to the investors?\",\"name\":\"token_transfer\",\"isGitaStandard\":true},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Date\",\"hType\":\"object\",\"name\":\"date\"},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Issuer\",\"hType\":\"object\",\"name\":\"issuer\"},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Manner\",\"hType\":\"object\",\"name\":\"manner\"},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Others\",\"hType\":\"object\",\"name\":\"others\"},{\"type\":\"header\",\"subtype\":\"h1\",\"hType\":\"step\",\"label\":\"General Whitepaper\"},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Are there any means for tracking the progress of key milestones indicated in white papers\",\"name\":\"milestone_checking\",\"isGitaStandard\":true},{\"type\":\"radio-group\",\"hType\":\"radio\",\"className\":\"inline\",\"label\":\"Are there any means for tracking the progress of key milestones indicated in white papers\",\"name\":\"milestone_checking\",\"isGitaStandard\":true,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Please provide links or contact windows for investors tracking the progress of key milestones of the project at any time\",\"name\":\"yes_1\",\"className\":\"\",\"rows\":3},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"If there’s a standard procedure for any revision of whitepaper?\",\"name\":\"revise_procedure\",\"isGitaStandard\":false},{\"type\":\"radio-group\",\"hType\":\"radio\",\"className\":\"inline\",\"label\":\"If there’s a standard procedure for any revision of whitepaper?\",\"name\":\"revise_procedure\",\"isGitaStandard\":false,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Please provide the procedure\",\"name\":\"yes_1\",\"className\":\"\",\"rows\":3},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"object\",\"label\":\"Risk Disclosure\",\"name\":\"risk_disclosure\",\"isGitaStandard\":true},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Label\",\"hType\":\"object\",\"name\":\"textarea\",\"rows\":3},{\"hType\":\"object\",\"label\":\"Label\",\"name\":\"file\",\"type\":\"file\",\"subtype\":\"file\",\"fileLimit\":\"document\",\"multiple\":false},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"object\",\"label\":\"Warning and Disclaimer\",\"name\":\"warning\",\"isGitaStandard\":true},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Label\",\"hType\":\"object\",\"name\":\"textarea\",\"rows\":3},{\"hType\":\"object\",\"label\":\"Label\",\"name\":\"file\",\"type\":\"file\",\"subtype\":\"file\",\"fileLimit\":\"document\",\"multiple\":false},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"object\",\"label\":\"Governing law and jurisdiction for dispute resolution of the ICO\",\"name\":\"governing_law\",\"isGitaStandard\":true},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Label\",\"hType\":\"object\",\"name\":\"textarea\",\"rows\":3},{\"hType\":\"object\",\"label\":\"Label\",\"name\":\"file\",\"type\":\"file\",\"subtype\":\"file\",\"fileLimit\":\"document\",\"multiple\":false},{\"type\":\"header\",\"subtype\":\"h1\",\"hType\":\"step\",\"label\":\"Company Information\"},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Company Name\",\"name\":\"company_name\",\"isGitaStandard\":true},{\"type\":\"select\",\"label\":\"Jurisdiction\",\"name\":\"jurisdiction\",\"isGitaStandard\":true,\"dataFrom\":\"country\",\"values\":[]},{\"type\":\"number\",\"label\":\"Company Registration Number\",\"name\":\"company_registration_number\",\"isGitaStandard\":true},{\"type\":\"radio-group\",\"label\":\"Industry\",\"name\":\"company_industry\",\"other\":true,\"dataFrom\":\"industry\",\"values\":[],\"isGitaStandard\":true},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Email Address\",\"name\":\"company_email\",\"isGitaStandard\":true},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"object\",\"label\":\"Recent Financial Report\",\"name\":\"financial_report\",\"isGitaStandard\":false},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Label\",\"hType\":\"object\",\"name\":\"textarea\",\"rows\":3},{\"hType\":\"object\",\"label\":\"Label\",\"name\":\"file\",\"type\":\"file\",\"subtype\":\"file\",\"fileLimit\":\"document\",\"multiple\":false},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"object\",\"label\":\"Articles of Association\",\"name\":\"aoa\",\"isGitaStandard\":false},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Label\",\"hType\":\"object\",\"name\":\"textarea\",\"rows\":3},{\"hType\":\"object\",\"label\":\"Label\",\"name\":\"file\",\"type\":\"file\",\"subtype\":\"file\",\"fileLimit\":\"document\",\"multiple\":false},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"object\",\"label\":\"Shareholders\' Resolution Regarding the ICO\",\"name\":\"shareholder\",\"isGitaStandard\":false},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Label\",\"hType\":\"object\",\"name\":\"textarea\",\"rows\":3},{\"hType\":\"object\",\"label\":\"Label\",\"name\":\"file\",\"type\":\"file\",\"subtype\":\"file\",\"fileLimit\":\"document\",\"multiple\":false},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"object\",\"label\":\"Director\'s Resolutions Regarding the ICO\",\"name\":\"director\",\"isGitaStandard\":false},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Label\",\"hType\":\"object\",\"name\":\"textarea\",\"rows\":3},{\"hType\":\"object\",\"label\":\"Label\",\"name\":\"file\",\"type\":\"file\",\"subtype\":\"file\",\"fileLimit\":\"document\",\"multiple\":false},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"object\",\"label\":\"Other Registry Filings regarding ICO\",\"name\":\"other_filing\",\"isGitaStandard\":false},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Label\",\"hType\":\"object\",\"name\":\"textarea\",\"rows\":3},{\"hType\":\"object\",\"label\":\"Label\",\"name\":\"file\",\"type\":\"file\",\"subtype\":\"file\",\"fileLimit\":\"document\",\"multiple\":false},{\"label\":\"Conflicts of Interests Disclosure\",\"name\":\"coi_disclosure\",\"type\":\"text\",\"subtype\":\"text\",\"descHtmlElm\":\"<div><p>Please provide links or contact windows for investors to track potential conflicts of interest, including:</p><ul> <li> The numbers of tokens held by the team members, advisors, employees and a major token holder by the fifteenth of each month</li>* A major token holder means an entity holding more than 10% of the total issued tokens <br/>* The aforementioned calculation of tokens shall include tokens held by their spouses and minor children, as well as those held under the names of other parties. <li> The token incentive schemes for employees and executives;</li><li>Self-dealing transactions; and </li><li> Others.</li></ul></div>\"},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"object\",\"label\":\"Licenses granted under the financial market law in any countries\",\"name\":\"license\",\"isGitaStandard\":false},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Label\",\"hType\":\"object\",\"name\":\"textarea\",\"rows\":3},{\"hType\":\"object\",\"label\":\"Label\",\"name\":\"file\",\"type\":\"file\",\"subtype\":\"file\",\"fileLimit\":\"document\",\"multiple\":false},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"object\",\"label\":\"Privacy policy\",\"name\":\"privacy_policy\",\"isGitaStandard\":false},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Label\",\"hType\":\"object\",\"name\":\"textarea\",\"rows\":3},{\"hType\":\"object\",\"label\":\"Label\",\"name\":\"file\",\"type\":\"file\",\"subtype\":\"file\",\"fileLimit\":\"document\",\"multiple\":false},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"object\",\"label\":\"Token sale agreement\",\"name\":\"sale_agreement\",\"isGitaStandard\":false},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Label\",\"hType\":\"object\",\"name\":\"textarea\",\"rows\":3},{\"hType\":\"object\",\"label\":\"Label\",\"name\":\"file\",\"type\":\"file\",\"subtype\":\"file\",\"fileLimit\":\"document\",\"multiple\":false},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"object\",\"label\":\"Terms of use\",\"name\":\"used_terms\",\"isGitaStandard\":false},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Label\",\"hType\":\"object\",\"name\":\"textarea\",\"rows\":3},{\"hType\":\"object\",\"label\":\"Label\",\"name\":\"file\",\"type\":\"file\",\"subtype\":\"file\",\"fileLimit\":\"document\",\"multiple\":false},{\"type\":\"header\",\"subtype\":\"h1\",\"hType\":\"step\",\"label\":\"Proceeds\"},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"object\",\"label\":\"Disclosure of all fees (each currency separately) incurred for and during the process of the Pre-ICO and actual ICO\",\"name\":\"fee_disclosure\",\"isGitaStandard\":true},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Pre-ICO (each currency separately)\",\"hType\":\"object\",\"name\":\"pre\",\"rows\":3},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Actual ICO (each currency separately)\",\"hType\":\"object\",\"name\":\"actual\",\"rows\":3},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"How will surplus funds be handled, e.g., if the funds raised exceed what is necessary for the development of the project?\",\"name\":\"surplus_handle\",\"isGitaStandard\":true},{\"type\":\"radio-group\",\"hType\":\"radio\",\"label\":\"How will surplus funds be handled, e.g., if the funds raised exceed what is necessary for the development of the project?\",\"name\":\"surplus_handle\",\"isGitaStandard\":true,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No surplus funds\",\"value\":\"no\"},{\"label\":\"The surplus is returned to the investors.\",\"value\":\"yes\"},{\"label\":\"Use for other purpose\",\"value\":\"other\"}]},{\"hType\":\"radio\",\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Label\",\"name\":\"other_used\",\"rows\":3},{\"type\":\"header\",\"subtype\":\"h1\",\"hType\":\"step\",\"label\":\"Exchange and Liquidity\"},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Is there a secondary platform for the tokens\",\"name\":\"secondary_platform\",\"isGitaStandard\":false},{\"type\":\"radio-group\",\"hType\":\"radio\",\"className\":\"inline\",\"label\":\"Is there a secondary platform for the tokens\",\"name\":\"secondary_platform\",\"isGitaStandard\":false,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Please provide the information of other secondary trading participants, eg. ICO secondary platform\",\"name\":\"yes_1\",\"className\":\"\",\"rows\":3},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Can the token be utilized when the token is transferred to the purchaser?\",\"name\":\"token_function_time\",\"isGitaStandard\":true},{\"type\":\"radio-group\",\"hType\":\"radio\",\"className\":\"inline\",\"label\":\"Can the token be utilized when the token is transferred to the purchaser?\",\"name\":\"token_function_time\",\"isGitaStandard\":true,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"text\",\"subtype\":\"text\",\"label\":\"When will the tokens be usable by the purchaser?\",\"name\":\"no_1\",\"className\":\"\",\"rows\":3},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Are there plans for the project operator/issuer to buy back tokens?\",\"name\":\"buyback_plan\",\"isGitaStandard\":true},{\"type\":\"radio-group\",\"hType\":\"radio\",\"className\":\"inline\",\"label\":\"Are there plans for the project operator/issuer to buy back tokens?\",\"name\":\"buyback_plan\",\"isGitaStandard\":true,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"What’s the buyback conditions?\",\"name\":\"yes_1\",\"className\":\"\",\"rows\":3},{\"type\":\"header\",\"subtype\":\"h1\",\"hType\":\"step\",\"label\":\"Security\"},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Will an ICO/ITO Escrow wallet for cryptocurrencies be created?\",\"name\":\"ico_escrow\",\"isGitaStandard\":false},{\"type\":\"radio-group\",\"hType\":\"radio\",\"label\":\"Will an ICO/ITO Escrow wallet for cryptocurrencies be created?\",\"name\":\"ico_escrow\",\"isGitaStandard\":false,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No (What’s the measures of security you provided instead of creating an Escrow Wallet)\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Label\",\"name\":\"no_1\",\"rows\":3},{\"hType\":\"radio\",\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Detailed description\",\"name\":\"yes_1\",\"rows\":3},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"If a digital wallet is involved?\",\"name\":\"involved_wallet\",\"isGitaStandard\":false},{\"type\":\"radio-group\",\"hType\":\"radio\",\"label\":\"If a digital wallet is involved?\",\"name\":\"involved_wallet\",\"isGitaStandard\":false,\"dataFrom\":\"options\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Is there a procedure for the token holder to recover access to funds if the key is lost?\",\"name\":\"lost_scenario\",\"isGitaStandard\":false},{\"type\":\"radio-group\",\"hType\":\"radio\",\"className\":\"inline\",\"label\":\"Is there a procedure for the token holder to recover access to funds if the key is lost?\",\"name\":\"lost_scenario\",\"isGitaStandard\":false,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Label\",\"name\":\"yes_1\",\"className\":\"\",\"rows\":3},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Has an Independent cybersecurity audit report been obtained?\",\"name\":\"cybersecurity_audit\",\"isGitaStandard\":false},{\"type\":\"radio-group\",\"hType\":\"radio\",\"label\":\"Has an Independent cybersecurity audit report been obtained?\",\"name\":\"cybersecurity_audit\",\"isGitaStandard\":false,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Cybersecurity audit provider\",\"name\":\"yes_provider\"},{\"hType\":\"radio\",\"label\":\"Please upload the audit report.\",\"name\":\"yes_files\",\"type\":\"file\",\"subtype\":\"file\",\"fileLimit\":\"document\",\"multiple\":false},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Is an investor account or a smart contract is used for fundraising?\",\"name\":\"safety_security\",\"isGitaStandard\":true},{\"type\":\"radio-group\",\"hType\":\"radio\",\"className\":\"inline\",\"label\":\"Is an investor account or a smart contract is used for fundraising?\",\"name\":\"safety_security\",\"isGitaStandard\":true,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Please provide the account characteristics and specify how that assure the ICO safety and security.\",\"name\":\"yes_1\",\"className\":\"\",\"rows\":3},{\"type\":\"header\",\"subtype\":\"h1\",\"hType\":\"step\",\"label\":\"Marketing Information\"},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Is there any bounty program terms?\",\"name\":\"bounty\",\"isGitaStandard\":false},{\"type\":\"radio-group\",\"hType\":\"radio\",\"className\":\"inline\",\"label\":\"Is there any bounty program terms?\",\"name\":\"bounty\",\"isGitaStandard\":false,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Please provide relevant information\",\"name\":\"yes_1\",\"className\":\"\",\"rows\":3},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"object\",\"label\":\"Airdrop terms\",\"name\":\"airdrop_terms\",\"isGitaStandard\":false},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Label\",\"hType\":\"object\",\"name\":\"textarea\",\"rows\":3},{\"hType\":\"object\",\"label\":\"Label\",\"name\":\"file\",\"type\":\"file\",\"subtype\":\"file\",\"fileLimit\":\"document\",\"multiple\":false},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"array\",\"label\":\"Please provide the name of your marketing partnerships\",\"name\":\"marketing_partnership\",\"isGitaStandard\":false},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Title\",\"hType\":\"array\",\"name\":\"title\",\"required\":true},{\"type\":\"text\",\"subtype\":\"email\",\"label\":\"Email\",\"hType\":\"array\",\"name\":\"email\",\"required\":true},{\"type\":\"text\",\"subtype\":\"url\",\"label\":\"Website\",\"hType\":\"array\",\"name\":\"url\"},{\"type\":\"header\",\"subtype\":\"h1\",\"hType\":\"step\",\"label\":\"Self-Compliance with regulatory Requirements Assessment\"},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"object\",\"label\":\"Please provide the independent legal compliance review (legal rules & competent court in involved jurisdictions)\",\"name\":\"legal_compliance\",\"isGitaStandard\":true},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Label\",\"hType\":\"object\",\"name\":\"textarea\",\"rows\":3},{\"hType\":\"object\",\"label\":\"Label\",\"name\":\"file\",\"type\":\"file\",\"subtype\":\"file\",\"fileLimit\":\"document\",\"multiple\":false},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Any other legal documents required to be disclosed under securities regulations if the token is qualified as security by your legal counsel?\",\"name\":\"other_legal_doc\",\"isGitaStandard\":false},{\"type\":\"radio-group\",\"hType\":\"radio\",\"label\":\"Any other legal documents required to be disclosed under securities regulations if the token is qualified as security by your legal counsel?\",\"name\":\"other_legal_doc\",\"isGitaStandard\":false,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"If there is an exemption, please indicate which exemption the project is relying on, e.g., accredited investor, private placement, etc\",\"name\":\"no_1\",\"rows\":3},{\"hType\":\"radio\",\"label\":\"Please upload requested documents\",\"name\":\"yes_files\",\"type\":\"file\",\"subtype\":\"file\",\"fileLimit\":\"document\",\"multiple\":true},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Does your legal counsel consider that you are subject to AML regulation in your jurisdiction?\",\"name\":\"kycaml_framework\",\"isGitaStandard\":true},{\"type\":\"radio-group\",\"hType\":\"radio\",\"className\":\"inline\",\"label\":\"Does your legal counsel consider that you are subject to AML regulation in your jurisdiction?\",\"name\":\"kycaml_framework\",\"isGitaStandard\":true,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Please provide detailed information about the relevant processes.\",\"name\":\"yes_1\",\"className\":\"\",\"rows\":3},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Who is the KYC Provider of the project?\",\"name\":\"kyc_provider\"},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Will the involved financial intermediary who is subject to AMLA in its jurisdiction be commissioned to meet the due diligence requirements under AML regulations?\",\"name\":\"amla\",\"isGitaStandard\":false},{\"type\":\"radio-group\",\"hType\":\"radio\",\"className\":\"inline\",\"label\":\"Will the involved financial intermediary who is subject to AMLA in its jurisdiction be commissioned to meet the due diligence requirements under AML regulations?\",\"name\":\"amla\",\"isGitaStandard\":false,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"The compliance situation\",\"name\":\"yes_1\",\"className\":\"\",\"rows\":3},{\"type\":\"text\",\"subtype\":\"text\",\"label\":\"Who is the legal counsel of the project?\",\"name\":\"legal_counsel\"},{\"type\":\"header\",\"subtype\":\"h1\",\"hType\":\"step\",\"label\":\"Investor Protections\"},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Are there any legal protections available in the event of fraud, a hack, malware, or a downturn in business prospects?\",\"name\":\"legal_protection\",\"isGitaStandard\":true},{\"type\":\"radio-group\",\"hType\":\"radio\",\"className\":\"inline\",\"label\":\"Are there any legal protections available in the event of fraud, a hack, malware, or a downturn in business prospects?\",\"name\":\"legal_protection\",\"isGitaStandard\":true,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Detailed description\",\"name\":\"yes_1\",\"className\":\"\",\"rows\":3},{\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Who will be responsible for refunding investor’s investment if something goes wrong?\",\"name\":\"refund_party\",\"rows\":3},{\"type\":\"header\",\"subtype\":\"h2\",\"hType\":\"radio\",\"label\":\"Will there be adequate funds to compensate the investors if their rights are violated?\",\"name\":\"adequate_fund\",\"isGitaStandard\":false},{\"type\":\"radio-group\",\"hType\":\"radio\",\"className\":\"inline\",\"label\":\"Will there be adequate funds to compensate the investors if their rights are violated?\",\"name\":\"adequate_fund\",\"isGitaStandard\":false,\"dataFrom\":\"mixin\",\"values\":[{\"label\":\"No\",\"value\":\"no\"},{\"label\":\"Yes\",\"value\":\"yes\"}]},{\"hType\":\"radio\",\"type\":\"textarea\",\"subtype\":\"textarea\",\"label\":\"Detailed description\",\"name\":\"yes_1\",\"className\":\"\",\"rows\":3}]','2018-12-04 01:04:39','2018-12-04 01:04:39');

/*!40000 ALTER TABLE `FormSchemas` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Messages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Messages`;

CREATE TABLE `Messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sendBy` enum('email','sms') COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` enum('requestMentionedPersonToVerified','greeting','checkForgotPassword','newPassword','verification','contactUs') COLLATE utf8_unicode_ci DEFAULT NULL,
  `from` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `to` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `toName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `subject` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `text` text COLLATE utf8_unicode_ci,
  `html` text COLLATE utf8_unicode_ci,
  `success` tinyint(1) DEFAULT NULL,
  `response` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `error` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bcc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table Passports
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Passports`;

CREATE TABLE `Passports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `protocol` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `accessToken` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `identifier` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tokens` text COLLATE utf8_unicode_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `passports_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `Passports` WRITE;
/*!40000 ALTER TABLE `Passports` DISABLE KEYS */;

INSERT INTO `Passports` (`id`, `protocol`, `password`, `accessToken`, `provider`, `identifier`, `tokens`, `createdAt`, `updatedAt`, `UserId`)
VALUES
  (1,'local','$2a$10$mUXSFTrPVpdxNcmJ.cSw8.STy8oFlqkLw6HGgFWJUN7wPCpssSjEu',NULL,NULL,NULL,NULL,'2018-12-04 01:04:39','2018-12-04 01:04:39',1);

/*!40000 ALTER TABLE `Passports` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table ProjectHistories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ProjectHistories`;

CREATE TABLE `ProjectHistories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8_unicode_ci DEFAULT '/img/logo_only.png',
  `items` text COLLATE utf8_unicode_ci,
  `status` enum('draft','review','publish') COLLATE utf8_unicode_ci DEFAULT 'draft',
  `isVerified` tinyint(1) DEFAULT '0',
  `isGitaStandard` tinyint(1) DEFAULT '0',
  `percent` int(11) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `ProjectId` int(11) DEFAULT NULL,
  `FormSchemaId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `AdminUserId` int(11) DEFAULT NULL,
  `ModifyUserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ProjectId` (`ProjectId`),
  KEY `FormSchemaId` (`FormSchemaId`),
  KEY `UserId` (`UserId`),
  KEY `AdminUserId` (`AdminUserId`),
  KEY `ModifyUserId` (`ModifyUserId`),
  CONSTRAINT `projecthistories_ibfk_1` FOREIGN KEY (`ProjectId`) REFERENCES `Projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `projecthistories_ibfk_2` FOREIGN KEY (`FormSchemaId`) REFERENCES `FormSchemas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `projecthistories_ibfk_3` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `projecthistories_ibfk_4` FOREIGN KEY (`AdminUserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `projecthistories_ibfk_5` FOREIGN KEY (`ModifyUserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table ProjectMentionedPeople
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ProjectMentionedPeople`;

CREATE TABLE `ProjectMentionedPeople` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `modelName` enum('biography_team','biography_advisor','biography_developer','advisor_role','marketing_partnership') COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` enum('PENDING','VERIFIED','REJECTED') COLLATE utf8_unicode_ci DEFAULT 'PENDING',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ProjectId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ProjectId` (`ProjectId`),
  CONSTRAINT `projectmentionedpeople_ibfk_1` FOREIGN KEY (`ProjectId`) REFERENCES `Projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table Projects
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Projects`;

CREATE TABLE `Projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identity` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8_unicode_ci DEFAULT '/img/logo_only.png',
  `items` text COLLATE utf8_unicode_ci,
  `status` enum('draft','review','publish') COLLATE utf8_unicode_ci DEFAULT 'draft',
  `isVerified` tinyint(1) DEFAULT '0',
  `isGitaStandard` tinyint(1) DEFAULT '0',
  `percent` int(11) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `AdminUserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `AdminUserId` (`AdminUserId`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`AdminUserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table Users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fullName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `role` enum('user','node','supernode','admin') COLLATE utf8_unicode_ci DEFAULT 'user',
  `type` enum('personal','entity') COLLATE utf8_unicode_ci DEFAULT 'entity',
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `contact` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `company` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `isPaid` tinyint(1) DEFAULT '0',
  `isVerified` tinyint(1) DEFAULT '0',
  `isDisabled` tinyint(1) DEFAULT '0',
  `isPrivacyTermsAgreed` tinyint(1) DEFAULT '1',
  `forgotToken` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `NodeId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `NodeId` (`NodeId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`NodeId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;

INSERT INTO `Users` (`id`, `username`, `fullName`, `role`, `type`, `email`, `contact`, `company`, `title`, `phone`, `avatar`, `country`, `address`, `comment`, `isPaid`, `isVerified`, `isDisabled`, `isPrivacyTermsAgreed`, `forgotToken`, `createdAt`, `updatedAt`, `deletedAt`, `NodeId`)
VALUES
  (1,'admin','admin','admin','personal','admin@gita.foundation','admin','admin','Admin','0900000000',NULL,'Taiwan','',NULL,0,1,0,1,NULL,'2018-12-04 01:04:39','2018-12-04 01:04:39',NULL,NULL);

/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
