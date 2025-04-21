CREATE DATABASE designer_social_network;
USE designer_social_network;

CREATE TABLE designer (
  designer_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  designer_name VARCHAR(40) NOT NULL,
  lastname VARCHAR(60) NOT NULL,
  password VARCHAR(100) NOT NULL,
  designer_description VARCHAR(200),
  city VARCHAR(60),
  phone_number VARCHAR(20),
  email VARCHAR(100) NOT NULL UNIQUE,
  designer_img VARCHAR(100),
  designer_is_deleted BOOLEAN NOT NULL DEFAULT 0
);

CREATE TABLE design (
  design_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  designer_id INT UNSIGNED NOT NULL,
  design_name VARCHAR(100) NOT NULL,
  orientation VARCHAR(60) NOT NULL,
  main_fabric VARCHAR(50),
  main_color VARCHAR(50),
  garment_type VARCHAR(50),
  design_description VARCHAR(200),
  design_img VARCHAR(100),
  design_is_deleted BOOLEAN NOT NULL DEFAULT 0,
  CONSTRAINT Fk_designer_id FOREIGN KEY (designer_id)
    REFERENCES designer(designer_id) ON DELETE CASCADE ON UPDATE CASCADE
);
