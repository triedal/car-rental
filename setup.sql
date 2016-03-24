DROP DATABASE IF EXISTS CarRental;
CREATE DATABASE CarRental;
USE CarRental;

CREATE TABLE Vehicles (
	vehicle_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  type ENUM('coupe', 'sedan', 'suv', 'truck', 'other'),
  status ENUM('available', 'unavailable') DEFAULT 'available',
	vin_num INT(17) UNSIGNED NOT NULL,
  meter_reading INT(6) UNSIGNED NOT NULL,
  cost_per_mile INT UNSIGNED NOT NULL
);

CREATE TABLE Customers (
  cust_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(10),
  lastname VARCHAR(10)
);

CREATE TABLE RentalContracts (
  contract_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  cust_id INT UNSIGNED REFERENCES Customers(cust_id),
  vehicle_id INT UNSIGNED REFERENCES Vehicles(vehicle_id),
  meter_out INT(6) UNSIGNED,
  meter_in INT(6) UNSIGNED,
  cost_per_mile INT,
  reg_date DATETIME NOT NULL
);