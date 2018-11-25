-- NOTES: I commented out Fk's for now as I would have to create the databases individually before correlating items. 

DROP DATABASE IF EXISTS `project_db`;
CREATE DATABASE project_db;
USE project_db;

-- logins
CREATE TABLE logins
(
	id int NOT NULL AUTO_INCREMENT,
	related_user_id int NOT NULL,
    password_hash varchar(300) NOT NULL, -- requires review
    password_salt varchar(300) NOT NULL, -- requires review
	PRIMARY KEY (id)
    -- FOREIGN KEY (related_user_id) REFERENCES memberships(related_user_id)
);

-- users
CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	username varchar(300) NOT NULL,
    first_name varchar(300) NOT NULL, 
    last_name varchar(300) NOT NULL,
    street_address1 varchar(300) NOT NULL, 
    street_address2 varchar(300),
    city varchar(300) NOT NULL,
    _state varchar(300) NOT NULL,
    zip int NOT NULL,
    email_address varchar(300) NOT NULL,
    phone1 varchar(300) NOT NULL, 
    phone2 varchar(300),
	PRIMARY KEY (id)
);

-- memberships
CREATE TABLE memberships
(
	id int NOT NULL AUTO_INCREMENT,
    related_user_id int NOT NULL, 
    related_account_id int, 
    -- FOREIGN KEY (related_user_id) REFERENCES logins(related_user_id), -- requires review
    -- FOREIGN KEY (related_account_id) REFERENCES somewhere(somewhere) --where is this FK going?
	PRIMARY KEY (id)
);

-- accounts
CREATE TABLE accounts
(
	id int NOT NULL AUTO_INCREMENT,
    _name varchar(300) NOT NULL, 
    plan_level varchar(10) NOT NULL, -- eg: 'admin', 'employee', 'consignors', 'buyers'
	PRIMARY KEY (id)
);

-- inventory table
CREATE TABLE inventory
(
	id int NOT NULL AUTO_INCREMENT,
	product_name varchar(300) NOT NULL,
    product_description varchar(300) NOT NULL,
    quantity int NOT NULL, 
    received_date DATE NOT NULL, 
    requested_sales_price int NOT NULL,
    sold_at_price int, 
    date_sold DATE, 
    commission_rate DECIMAL(5,2),
    consignor_paid_checkbox BOOLEAN,
    consignor_user_id int NOT NULL, 
	PRIMARY KEY (id)
    -- FOREIGN KEY (consignor_user_id) REFERENCES purchase_orders(related_purchase_order_detail)
);


-- purchase orders
CREATE TABLE purchase_orders
(
	id int NOT NULL AUTO_INCREMENT,
    related_purchase_order_detail varchar(300),
    PRIMARY KEY (id)
    -- FOREIGN KEY (related_purchase_order_detail) REFERENCES inventory(consignor_user_id)
);


-- purchase order details
CREATE TABLE purchase_order_details
(
	id int NOT NULL AUTO_INCREMENT,
    related_inventory_id int NOT NULL,
    quantity int NOT NULL, 
    PRIMARY KEY (id)
);

