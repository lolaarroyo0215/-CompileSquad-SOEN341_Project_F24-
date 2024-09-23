// This folder is for all the database building, PARTS E & F
# Database Setup for Peer Assessment Application

## Overview
This folder contains all the SQL scripts and related files necessary for setting up the database for the Peer Assessment Application. The database is designed to support the core functionalities of the application, including user authentication, team management, and peer assessments.

## Database Structure
The database is implemented using MySQL and includes the following core tables:

- **students**: Stores information about students who use the application.
- **instructors**: Stores information about instructors who manage teams and assessments.

## Files in This Folder

- **`create_database.sql`**: This script sets up the database schema, including the creation of the `students` and `instructors` tables. Additional tables and relationships will be added as the project progresses.

## Instructions

### 1. Setting Up the Database
To set up the database for the first time:

1. Ensure that MySQL is installed on your local machine or server.
2. Open your MySQL client or command line interface.
3. Run the `create_database.sql` script to create the database and the necessary tables:
   ```bash
   mysql -u your_username -p < path_to_this_folder/create_database.sql
