
DROP TABLE IF EXISTS `reviews`;

CREATE TABLE `reviews` (
  `id` INTEGER(15) NOT NULL AUTO_INCREMENT,
  `author` VARCHAR(30) NOT NULL,
  `icon_url` MEDIUMTEXT NOT NULL,
  `review_date` DATETIME NOT NULL,
  `review_content` MEDIUMTEXT NOT NULL,
  `reply_date` DATETIME NULL,
  `reply_content` MEDIUMTEXT NULL,
  `listings_id` INTEGER(15) NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `listings`;

CREATE TABLE `listings` (
  `id` INTEGER(15) NOT NULL AUTO_INCREMENT,
  `location_name` VARCHAR(50) NOT NULL,
  `owner_name` VARCHAR(30) NOT NULL,
  `owner_icon_url` MEDIUMTEXT NOT NULL,
  `review_score` DECIMAL NOT NULL,
  `accuracy_score` DECIMAL NOT NULL,
  `communication_score` DECIMAL NOT NULL,
  `cleanliness_score` DECIMAL NOT NULL,
  `location_score` DECIMAL NOT NULL,
  `check_in_score` DECIMAL NOT NULL,
  `value_score` DECIMAL NOT NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE `reviews` ADD FOREIGN KEY (listings_id) REFERENCES `listings` (`id`);
