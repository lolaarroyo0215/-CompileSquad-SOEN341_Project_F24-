These are the steps that need to be followed to set up the database environment on your machine.
These steps are for macOS but can be adapted for different Operating Systems

In your terminal: 

1. Install Python
    brew install python

2. Install MySQL
    brew install mysql

3. Start MySQL
    brew services start mysql

4. Install django REST Framework 
    pip install django djangorestframework

5. Install MySQL Client
    brew install mysql-client
    pip install mysqlclient

6. Create and Configure MySQL Database
    CREATE DATABASE user_info_db;
    CREATE USER 'compilesquad'@'localhost' IDENTIFIED BY 'compilesquad';
    GRANT ALL PRIVILEGES ON user_info_db.* TO 'compilesquad'@'localhost';
    FLUSH PRIVILEGES;

7. Migrate the Database
    python manage.py migrate
    *This step is done in the termianl with the database folder opened


Once this is done, to check the contents of the database tables you can:

1. Open MySQL in your terminal
    mysql -u root -p
    enter your computer password when prompted

2. Check the list of databases
    SHOW DATABASES;
    * user_info_db should be there

3. Select our Database
    USE user_info_db;

4. Check the list of tables in the database
    SHOW TABLES;

5. Select the database you would like to see
    SELECT * FROM {enter table name};
    ex. SELECT * FROM userRegApi_student;

The data you used during testing should appear here.




