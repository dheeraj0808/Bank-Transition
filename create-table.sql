-- Create accounts table
CREATE TABLE IF NOT EXISTS accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    balance DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO accounts (name, email, balance) VALUES 
('Dheeraj Kumar', 'dheeraj@example.com', 10000.00),
('Ujjwal Pratap', 'ujjwal@example.com', 15000.00)
ON DUPLICATE KEY UPDATE name=name;
