# Database Environment Setup for Project

This guide provides detailed instructions to set up the database environment for the project on **macOS** and **Windows**.

---
## Prerequisites

Before proceeding, ensure the following tools are installed:

- **Python** (version >= 3.x)
- **MySQL** (Community Edition is sufficient)
- **pip** (Python package manager, included with Python)

---

## Setup Instructions

### macOS

1. **Install Python**
   ```bash
   brew install python
2. **Install MySQL**
   ```bash
   brew install mysql
3. **Start MySQL**
   ```bash
   brew services start mysql

4. **Install Django REST Framework**
   ```bash
   pip install django djangorestframework

5. **Install MySQL Client**
   ```bash
   brew install mysql-client
   pip install mysqlclient

6. **Create and Configure MySQL Database Open the MySQL terminal and execute the following commands:**
    ```bash
    CREATE DATABASE user_info_db;
    CREATE USER 'compilesquad'@'localhost' IDENTIFIED BY 'compilesquad';
    GRANT ALL PRIVILEGES ON user_info_db.* TO 'compilesquad'@'localhost';
    FLUSH PRIVILEGES;
     
7. **Migrate the Database Navigate to your project folder (where manage.py is located) in your terminal and run:**
   ```bash
   python manage.py migrate

8. **Verify Database Tables Open the MySQL terminal:**
   ```bash
   mysql -u root -p
  a. Enter your MySQL root password and replace {table_name} with the name of the table you want to view (e.g., userRegApi_student)
  ```bash
    SHOW DATABASES;
    USE user_info_db;
    SHOW TABLES;
    SELECT * FROM {table_name};

     
