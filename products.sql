-- will override the database if one exists and will create and use the specified database --
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

-- create table to hold the products --
CREATE TABLE products(
-- create a unique id for each row --
    id INTEGER NOT NULL AUTO_INCREMENT,
-- create columns for the following product information -- 
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2),
    stock_quantity INTEGER (10),
-- make the unique id the primary key --
    PRIMARY KEY (id)
);

-- insert products --

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Secret History", "Books", 12.79, 100), ("Milk and Honey", "Books", 13.99, 100), ("The Order of Time", "Books", 11.99, 100), ("Powerhouse", "Music", 12.89, 100), ("Golden Hour", "Music", 10.72, 100), ("iPad Pro", "Electronics", 1069.92, 100), ("Galaxy Tab", "Electronics", 529.99, 100), ("Sunglasses", "Accessories", 112.99, 100), ("Scarves", "Accessories", 15.99, 100), ("Watches", "Accessories", 75.26, 100);

-- display the rows -- 
SELECT * FROM products;
