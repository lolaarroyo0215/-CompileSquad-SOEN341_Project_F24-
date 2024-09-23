
-- 1. Create the Database
CREATE DATABASE IF NOT EXISTS peer_assessment_db;
USE peer_assessment_db;

-- 2. Create the 'students' Table
CREATE TABLE IF NOT EXISTS students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    team_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- 2.1 Add students (after table is created)
INSERT INTO students (first_name, last_name, email, password_hash)
VALUES 
('Elie', 'John', 'elie.john@example.ca', SHA2('password123', 256)),
('Alex', 'Smith', 'alex.smith@example.com', SHA2('password123', 256)),
('Emily', 'Johnson', 'emily.johnson@example.com', SHA2('password123', 256)),
('Michael', 'Williams', 'michael.williams@example.com', SHA2('password123', 256)),
('Sophia', 'Jones', 'sophia.jones@example.com', SHA2('password123', 256)),
('James', 'Brown', 'james.brown@example.com', SHA2('password123', 256)),
('Olivia', 'Davis', 'olivia.davis@example.com', SHA2('password123', 256)),
('Liam', 'Miller', 'liam.miller@example.com', SHA2('password123', 256)),
('Ava', 'Wilson', 'ava.wilson@example.com', SHA2('password123', 256)),
('Noah', 'Moore', 'noah.moore@example.com', SHA2('password123', 256));

-- 3. Create the 'instructors' Table
CREATE TABLE IF NOT EXISTS instructors (
    instructor_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- 3.1 Add an instructor (after table is created)
INSERT INTO instructors (first_name, last_name, email, password_hash)
VALUES 
('Joumana', 'Dargham', 'joumana.dargham@concordia.ca', SHA2('password123', 256)),
('Michael', 'Taylor', 'michael.taylor@example.com', SHA2('password123', 256)),
('Sophia', 'Nguyen', 'sophia.nguyen@example.com', SHA2('password123', 256));

-- 4 The table to put the instructor
SELECT * FROM instructors -- Select operator allows to see the selected instructor to be into the data base
