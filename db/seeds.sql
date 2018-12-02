/*  project2_db*/


-- drop database if exists project2_db;
--  create database if not exists project2_db;
-- DROP TABLE IF EXISTS inventory;
-- DROP TABLE  IF EXISTS users;
-- DROP TABLE IF EXISTS logins
-- DROP TABLE IF EXISTS purchase_orders;

use project2_db;
INSERT INTO users (username, first_name, last_name, street_address1, city, _state, zip, email_address, phone1, passwordHashSalt) 
VALUES ('jaxdot', 'jacqueline', 'gaherity', '15771 oxford way', 'sandwich', 'ma', '98012', 'jacquelne.gaherity@UW.edu', '508-888-9755', '$2b$10$T6OI5x67dgj.mtujeJJulupH5G47xr5ZrVnnFKSIZxi.cjFs3/hty'),
               ('edfeld', 'ed', 'einfeld', '3833 238th st SW', 'brier', 'WA', '98036', 'ed.einfeld@UW.edu', '425-780-0713', '$2b$10$j9ncLVxmfGN1bC21S0u4cOjQXskhuRVPeGYVjt5iLkXEss.gPpIAa'),
			   ('mev', 'molly', 'vinson', '800 238th st SW', 'port orchard', 'WA', '98732', 'mollyV@UW.edu', '477-780-0733', '$2b$10$v/4t8KWidAgu00Gohl/rquFFP9D9T./oJsmt6ezljV/auBGcqbj3q'),
               ('bwoods', 'bob', 'woods', '777 238th st SW', 'charlotte', 'va', '90001', 'bob.woods@UW.edu', '428-780-0715', '$2b$10$YNBwxg413hPJeuIXTck/suUGO9n82GsMwjWK5lvY2/pCaqAJP.x/a');


USE project2_db;
insert into inventory (product_name, description, requested_sale_price, commision_rate, consignor_paid_checkbox, userId) 
values ('grass trimmer', 'husquevarna', '49.00', '.02', '0', '1'),
            ('electric trimmer', 'echo brand', '75.00', '.02', '0', '2'),
            ('bicycle', 'schwinn 10 speed', '149.00', '.02', '0', '3');


