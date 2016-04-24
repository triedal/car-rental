DROP DATABASE IF EXISTS CarRental;
CREATE DATABASE CarRental;
USE CarRental;

CREATE TABLE Vehicles (
	vehicle_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  type ENUM('coupe', 'sedan', 'suv', 'truck', 'other'),
  year INT(4) UNSIGNED NOT NULL,
  make VARCHAR(20) NOT NULL,
  model VARCHAR(20) NOT NULL,
  status ENUM('available', 'unavailable') DEFAULT 'available',
	vin_num VARCHAR(17) NOT NULL,
  odometer INT(6) UNSIGNED NOT NULL,
  cost_per_day INT UNSIGNED NOT NULL
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
  cost_per_day INT,
  pick_up DATETIME,
  drop_off DATETIME
);

INSERT INTO Vehicles (type, year, make, model, vin_num, odometer, cost_per_day) VALUES
('suv', 2013, 'Mercedes-Benz', 'GLK350', '1ZVBP8AMXC5265999', FLOOR(2000 + (RAND() * 5000)), 37),
('suv', 2013, 'Mercedes-Benz', 'GLK350', '1G3AJ81W8KG373851', FLOOR(2000 + (RAND() * 5000)), 37),
('suv', 2013, 'Mercedes-Benz', 'GLK350', 'JT4RN82P9L5091228', FLOOR(2000 + (RAND() * 5000)), 37),
('suv', 2013, 'Mercedes-Benz', 'GLK350', '1NKDLU0X16R999230', FLOOR(2000 + (RAND() * 5000)), 37),
('suv', 2013, 'Mercedes-Benz', 'GLK350', '11GDHK39F4SE51024', FLOOR(2000 + (RAND() * 5000)), 37),
('sedan', 2014, 'BMW', '320i', '3GCPKTE24CG115642', FLOOR(2000 + (RAND() * 5000)), 32),
('sedan', 2014, 'BMW', '320i', '2FWYHDYB9YAG09034', FLOOR(2000 + (RAND() * 5000)), 32),
('sedan', 2014, 'BMW', '320i', 'WAUDFAFC4CN157042', FLOOR(2000 + (RAND() * 5000)), 32),
('sedan', 2014, 'BMW', '320i', '3FRXF7FE3BV135771', FLOOR(2000 + (RAND() * 5000)), 32),
('other', 2015, 'Volkswagen', 'Golf', 'KNDMC5C10F6010589', FLOOR(2000 + (RAND() * 5000)), 15),
('other', 2015, 'Volkswagen', 'Golf', '1GBJK34J6XF010000', FLOOR(2000 + (RAND() * 5000)), 15),
('other', 2015, 'Volkswagen', 'Golf', '4F2CZ04113KM91676', FLOOR(2000 + (RAND() * 5000)), 15),
('other', 2015, 'Volkswagen', 'Golf', 'WDBHA23E7VF444868', FLOOR(2000 + (RAND() * 5000)), 15),
('other', 2015, 'Volkswagen', 'Golf', '1B3BD26KXHF109366', FLOOR(2000 + (RAND() * 5000)), 15),
('sedan', 2015, 'Toyota', 'Camry', '1GKEC13VX3J365380', FLOOR(2000 + (RAND() * 5000)), 15),
('sedan', 2015, 'Toyota', 'Camry', '1M2AG09C55M022634', FLOOR(2000 + (RAND() * 5000)), 15),
('sedan', 2015, 'Toyota', 'Camry', '1G6AB6985D9265138', FLOOR(2000 + (RAND() * 5000)), 15),
('sedan', 2015, 'Toyota', 'Camry', '1FMRU15W24LA27456', FLOOR(2000 + (RAND() * 5000)), 15),
('sedan', 2015, 'Toyota', 'Camry', '1HSHWSBN78J664928', FLOOR(2000 + (RAND() * 5000)), 15),
('sedan', 2015, 'Toyota', 'Camry', '3VWDX7AJ1BM058435', FLOOR(2000 + (RAND() * 5000)), 15);


-- faux vin numbers provided by www.randomvin.com