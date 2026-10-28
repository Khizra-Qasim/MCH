CREATE DATABASE mch;
USE mch;
CREATE TABLE categories(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) UNIQUE,
is_default BOOLEAN DEFAULT FALSE 
);
INSERT INTO categories( name, is_default) VALUES
('LAWN',TRUE),
('VELVET',TRUE),
('CHIFFON',TRUE),
('READY TO WEAR',TRUE);
CREATE TABLE products(
id INT AUTO_INCREMENT PRIMARY KEY,
category_id INT,
name VARCHAR(100),
price DECIMAL(10,2),
sizes VARCHAR(50),
colors VARCHAR(100),
type VARCHAR(50),
image_url VARCHAR(255),
description TEXT,
FOREIGN KEY (category_id) REFERENCES categories(id)
);
-- Example: Insert 10 products for each category
INSERT INTO products (category_id, name, price, sizes, colors, type, image_url, description)
VALUES
(1, 'Elegant Lawn Design 1', 4500, 'S, M, L', 'Pink, Yellow', '3PC', 'image/lawn1.jpg', 'Floral lawn outfit'),
(1, 'Elegant Lawn Design 2', 4600, 'M, L', 'Blue, Green', '3PC', 'image/lawn2.jpg', 'Printed lawn suit'),
(1, 'Elegant Lawn Design 3', 4600, 'M, L', 'Blue, Green', '3PC', 'image/lawn3.jpg', 'Printed lawn suit'),
(1, 'Elegant Lawn Design 4', 4600, 'M, L', 'Blue, Green', '3PC', 'image/lawn4.jpg', 'Printed lawn suit'),
(1, 'Elegant Lawn Design 5', 4600, 'M, L', 'Blue, Green', '3PC', 'image/lawn5.jpg', 'Printed lawn suit'),
(1, 'Elegant Lawn Design 6', 4600, 'M, L', 'Blue, Green', '3PC', 'image/lawn6.jpg', 'Printed lawn suit'),
(1, 'Elegant Lawn Design 7', 4600, 'M, L', 'Blue, Green', '3PC', 'image/lawn7.jpg', 'Printed lawn suit'),
(3, 'Elegant Chiffon Design 1', 5000, 'S, M, L', 'Red', '3PC', 'image/chiffon1.jpg', 'Embroidered chiffon suit'),
(3, 'Elegant Chiffon Design 2', 5200, 'M, L', 'White, Pink', '3PC', 'image/chiffon2.jpg', 'Light chiffon embroidery'),
CREATE TABLE users(
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(100) UNIQUE,
password VARCHAR(255)
);
DROP TABLE IF EXISTS cart;
CREATE TABLE cart(
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
product_id INT,
quantity INT DEFAULT 1,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (product_id) REFERENCES products(id)
);


