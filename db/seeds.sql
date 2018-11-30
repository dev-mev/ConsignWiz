/* */

use project2_db;
-- drop database if exists project2_db;
   create database if not exists project2_db;
-- DROP TABLE IF EXISTS inventory;
-- DROP TABLE  IF EXISTS users;
-- DROP TABLE IF EXISTS logins
-- DROP TABLE IF EXISTS purchase_orders;

INSERT INTO users (username, first_name, last_name, street_address1, city, _state, zip, email_address, phone1) 
VALUES ('jaxdot', 'jacqueline', 'gaherity', '15771 oxford way', 'sandwich', 'ma', '98012', 'jacquelne.gaherity@UW.edu', '508-888-9755');

INSERT INTO users (username, first_name, last_name, street_address1, city, _state, zip, email_address, phone1) 
VALUES ('edfeld', 'ed', 'einfeld', '3833 238th st SW', 'brier', 'WA', '98036', 'ed.einfeld@UW.edu', '425-780-0713');

INSERT INTO users (username, first_name, last_name, street_address1, city, _state, zip, email_address, phone1) 
VALUES ('bwoods', 'bob', 'woods', '777 238th st SW', 'charlotte', 'va', '90001', 'bob.woods@UW.edu', '428-780-0715');

INSERT INTO users (username, first_name, last_name, street_address1, city, _state, zip, email_address, phone1) 
VALUES ('bwoods', 'bob', 'woods', '777 238th st SW', 'charlotte', 'va', '90001', 'bob.woods@UW.edu', '428-780-0715');


USE project2_db;
insert into inventory (product_name, description, requested_sale_price, commision_rate, consignor_paid_checkbox, userId) values ('grass trimmer', 'husquevarna', '49.00', '.02', '0', '1');

insert into inventory (product_name, description, requested_sale_price, commision_rate, consignor_paid_checkbox, userId) VALUES ('electric trimmer', 'echo brand', '75.00', '.02', '0', '2');

INSERT INTO inventory (product_name, description, requested_sale_price, commision_rate, consignor_paid_checkbox, userId) VALUES ('bicycle', 'schwinn 10 speed', '149.00', '.02', '0', '3');


use project2_db;
INSERT INTO logins (passwordHash, passwordSalt, userId) VALUES ('Hashone', 'saltOne', '1');
INSERT INTO logins (passwordHash, passwordSalt, userId) VALUES ('Hastwo', 'salttwo', '2');
INSERT INTO logins (`passwordHash`, `passwordSalt`, `userId`) VALUES ('HasThree', 'Saltthree', '3');

