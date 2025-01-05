# To-Do List Application

## Overview

This is a To-Do List application designed with a React frontend, using Material-UI (MUI) for the UI components, and a Spring Boot backend connected to a MySQL database. The application allows users to manage their daily tasks efficiently with features such as adding, editing, deleting, completing tasks, sorting, and searching.

## Demo Video

Below is a demo video showing the functionality of the To-Do List application:

<video width="100%" controls>
  <source src="assets/todoapp.wmv" type="video/wmv">
  Your browser does not support the video tag.
</video>

## Features

- **Add New Tasks**: Users can create new tasks.
- **View All Tasks**: All tasks are listed with the ability to toggle their completion status.
- **Edit Tasks**: Users can modify the title of existing tasks.
- **Delete Tasks**: Tasks can be removed from the list.
- **Complete Tasks**: Tasks can be marked as completed or pending.
- **Search Tasks**: Users can filter tasks by title.
- **Sort Tasks**: Pending tasks are shown first, followed by completed tasks.

## Technologies Used

### Frontend:
- React.js (JavaScript)
- Material-UI (MUI)
- Axios (for API calls)
- Vite (for fast development environment)

### Backend:
- Spring Boot (Java)
- MySQL (Database)

### Other:
- Axios for HTTP requests in React
- Spring Data JPA for database operations

## Full Setup (Frontend & Backend)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/gurska10028/todoapp.git
    cd todoapp
    ```

2. Install dependencies for both frontend and backend:
    - For the **frontend**:
      ```bash
      cd frontend
      npm install
      ```
    - For the **backend**:
      ```bash
      cd backend
      ./mvnw clean install
      ```

3. **MySQL Database Setup**:
   - Install MySQL and create a new database called `todo_app`.
   - Configure your MySQL connection settings in `backend/src/main/resources/application.properties`:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/todo_app
     spring.datasource.username=root
     spring.datasource.password=SYSTEM
     spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
     spring.jpa.hibernate.ddl-auto=update
     server.port=8081
     ```

4. Start the backend (Spring Boot):
    ```bash
    mvn spring-boot:run
    ```
   The backend will be available at [http://localhost:8081](http://localhost:8081).

5. Start the frontend (Vite):
    ```bash
    cd frontend
    npm run dev
    ```
   The frontend will be available at [http://localhost:5173](http://localhost:5173).

### Features Implementation

- **Add Task**: Users can add new tasks using the input field at the top. The task is then sent to the backend via a POST request and added to the list.
- **Task List**: All tasks are displayed in a list. Users can mark tasks as completed, edit their titles, or delete them.
- **Task Editing**: Users can click the "Edit" button to change the task title.
- **Task Completion**: Click the checkbox next to a task to mark it as completed or pending.
- **Search**: A search bar allows users to filter tasks by their title.
- **Delete Task**: Clicking the "Delete" button opens a dialog for confirmation, allowing users to remove a task from the list.

## API Endpoints

- **GET /task**: Retrieve all tasks.
- **GET /task/{id}**: Get a specific task by its ID.
- **POST /task**: Create a new task.
- **PUT /task/{id}**: Update an existing task by ID.
- **DELETE /task/{id}**: Delete a task by ID.
- **PUT /task/{id}/toggle**: Toggle the completion status of a task.

### Database Schema

The backend uses MySQL to store task data. The database table `tasks` contains the following columns:

- **id**: Unique identifier for each task (auto-generated).
- **title**: The title of the task.
- **completed**: Boolean indicating if the task is completed.

---

By following these instructions, both the frontend (React + Vite) and backend (Spring Boot) will be set up to work together, with MySQL as the database.
