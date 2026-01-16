-- MySQL Database Schema for React Native Bakery App
-- Generated from cleaned frontend codebase (no reviews/ratings)
-- Compatible with phpMyAdmin import

-- Create database
CREATE DATABASE IF NOT EXISTS bakery_app;
USE bakery_app;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category_id INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    liked BOOLEAN DEFAULT FALSE,
    image_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    INDEX idx_category (category_id),
    INDEX idx_name (name)
);

-- Cart items table
CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_cart_item (user_id, product_id),
    INDEX idx_user (user_id)
);

-- Orders table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled') DEFAULT 'pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_status (user_id, status),
    INDEX idx_order_date (order_date)
);

-- Order items table
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_order (order_id)
);

-- Insert sample data based on mock data

-- Categories
INSERT INTO categories (name) VALUES
('Croissant'),
('Dessert'),
('Drink');

-- Sample user (Patrick from HomeScreen)
INSERT INTO users (name, email, password) VALUES
('Patrick', 'patrick@example.com', '$2b$10$hashedpasswordhere');

-- Products based on menuData
INSERT INTO products (name, category_id, price, liked, image_path) VALUES
('Croissant au Chocolat', 1, 83000.00, false, 'croissant_chocolate-removebg-preview.png'),
('Éclair au Chocolat', 2, 65000.00, false, 'eclair_chocolat-removebg-preview.png'),
('Choux à la Crème', 2, 70000.00, true, 'choux_fix-removebg-preview.png'),
('Caramel Latte', 3, 45000.00, true, 'caramel_latte-removebg-preview.png'),
('Pistachio Croissant', 1, 85000.00, false, 'croissant_chocolate-removebg-preview.png'),
('Le Macaron', 2, 85000.00, false, 'macaroon-removebg-preview.png');

-- Sample cart items
INSERT INTO cart_items (user_id, product_id, quantity) VALUES
(1, 1, 2),
(1, 4, 1);

-- Sample order
INSERT INTO orders (user_id, total_amount, status) VALUES
(1, 211000.00, 'confirmed');

-- Sample order items
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 2, 83000.00),
(1, 4, 1, 45000.00);