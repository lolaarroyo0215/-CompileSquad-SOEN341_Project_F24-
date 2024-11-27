# -CompileSquad-SOEN341_Project_F24-
# Peer Assessment Application

## Project Overview
This project is part of the SOEN 341 course at Concordia University, aimed at developing a Peer Assessment System for university team projects. The system is designed to facilitate peer evaluations among students, allowing them to rate their teammates on key dimensions such as cooperation, conceptual contribution, practical contribution, and work ethic. The project is being developed using Agile methodologies over the course of 10 weeks, divided into four sprints.

## Team Members and Roles
Our team consists of six members, each contributing to different aspects of the project:

1. **[Maria]** - Project Manager & Backend Developer
   - Manages project timelines, meetings, and ensures smooth communication among the team.
   - Works on the bridge of frontend & backend, also focusing on design, development and the database.

2. **[Lola and Ishika and Lilia]** - Frontend Developers
   - Designs and implements the user interface using modern web technologies.
   - Ensures that the application is responsive and user-friendly.

3. **[Sofia and Arman]** - Backend Developers
   - Collaborates on the backend, focusing on database and structure.
   - Bridge the frontend and backend, ensuring seamless integration.


## Project Structure
The project is organized into the following subfolders within the GitHub repository:

- **/sprints**: Contains deliverables for each sprint, including sprint plans and user stories.
- **/docs**: Contains project documentation such as meeting minutes and individual contribution logs.
- **/src**: Contains the source code for the application, organized by frontend and backend components.
- **/tests**: Contains automated tests for various components of the application.

## Development Process
We are following an adapted Agile methodology with 4 iterations (sprints) of 3 to 4 weeks each. The first sprint focuses on setting up the development environment, user authentication, and team management features.

### Sprint 1 Goals:
- Set up the GitHub repository and project structure.
- Implement the login system for both students and instructors.
- Develop the functionality for instructors to create teams and assign students to groups.
- Draft initial task breakdown.

### Sprint 2 Goals:
- Enable instructors to create teams and assign students, either by selecting them directly or by importing a CSV file. Ensure that both students and instructors can view team assignments.
- Design an interface where students can select their teammates and provide peer assessments, establishing the foundation for team evaluation.
- Allow students to rate teammates on the "Cooperation" dimension using a 5-point scale. Implement a submission confirmation step to finalize their assessments.
- Begin work on adding additional assessment dimensions (e.g., Conceptual Contribution, Practical Contribution, Work Ethic), with optional comment boxes. This setup will be completed in Sprint 3.

### Sprint 3 Goals:
- Add the remaining assessment dimensions: **Conceptual Contribution**, **Practical Contribution**, and **Work Ethic**.
- Include optional comment boxes for each dimension to allow students to provide qualitative feedback.
- Develop a dashboard that allows instructors to view assessment results in two formats: **summary view** and **detailed view**
- Incorporate additional features that enhance the instructor dashboard and improve system usability.

## Sprint 4 Goals: 
- Finalize user stories, linking them to tasks and acceptance tests.
- Complete the development and implementation of all team features.
- Create unit tests for all code and run them via a continuous integration pipeline.
- Reorganize project files in GitHub into structured directories (e.g., tests, UI, utility classes).
- Use a linter to identify and fix bugs, documenting maintenance efforts.
