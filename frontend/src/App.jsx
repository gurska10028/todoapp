import { useState, useEffect } from "react";
import "./App.css";
import Task from "./components/Task";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function App() {

    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    // Updates taskInput when the user types into the input field
    const onTaskInputChange = (e) => {
        setTaskInput(e.target.value);
    };

    // Adds a new task by sending it to the backend
    const addTask = async (e) => {
        e.preventDefault();
        if (!taskInput.trim()) {
            console.error("Task input is empty");
            return;
        }
        try {
            const res = await axios.post("http://localhost:8081/task", {
                title: taskInput,
                completed: false,
            });
            setTasks([...tasks, res.data]); // Update the task list with the new task
            setTaskInput(""); // Clear the input field
        } catch (error) {
            console.error("Failed to add task", error);
        }
    };

    // Fetches all tasks from the backend when the component mounts
    const fetchTasks = async () => {
        try {
            const res = await axios.get("http://localhost:8081/task");
            setTasks(res.data); // Set fetched tasks to state
        } catch (error) {
            console.error("Failed to fetch tasks", error);
        }
    };

    // Opens the delete confirmation dialog and sets the task to delete
    const openDeleteDialog = (id) => {
        setTaskToDelete(id);
        setDeleteDialogOpen(true);
    };

    // Closes the delete confirmation dialog
    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setTaskToDelete(null);
    };

    // Confirms and deletes the selected task from the backend
    const confirmDeleteTask = async () => {
        try {
            await axios.delete(`http://localhost:8081/task/${taskToDelete}`);
            // Remove the deleted task from state
            const newTasks = tasks.filter((task) => task.id !== taskToDelete);
            setTasks(newTasks);
        } catch (error) {
            console.error("Failed to delete task", error);
        } finally {
            closeDeleteDialog(); // Close the dialog after deletion
        }
    };

    // Toggles the completion status of a task
    const toggleTaskById = async (id) => {
        try {
            const task = tasks.find((task) => task.id === id);
            const res = await axios.put(`http://localhost:8081/task/${id}`, {
                title: task.title,
                completed: !task.completed,
            });
            setTasks(tasks.map((task) => (task.id === id ? res.data : task))); // Update the task list
        } catch (error) {
            console.error("Failed to toggle task", error);
        }
    };

    // Edits the title of a task
    const editTask = async (id, newTitle) => {
        try {
            const task = tasks.find((task) => task.id === id);
            const res = await axios.put(`http://localhost:8081/task/${id}`, {
                title: newTitle,
                completed: task.completed,
            });
            setTasks(tasks.map((task) => (task.id === id ? res.data : task))); // Update the task list
        } catch (error) {
            console.error("Failed to edit task", error);
        }
    };

    // Filters tasks based on the search query and sorts them by completion status
    const filteredTasks = tasks
        .filter((task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => a.completed - b.completed);

    // Fetch tasks on the first render
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div
            style={{
                background: "linear-gradient(to right, #6a11cb, #2575fc)", // Background gradient
                minHeight: "100vh",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Top navigation bar */}
            <AppBar position="static" style={{ backgroundColor: "#1a237e" }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        To Do List
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Main container */}
            <Container maxWidth="md" style={{ padding: "2rem 0", flex: 1 }}>
                {/* Add task input */}
                <form
                    onSubmit={addTask}
                >
                    <TextField
                        label="What do you need to do?"
                        fullWidth
                        value={taskInput}
                        onChange={onTaskInputChange}
                    />
                    <Button type="submit">Add Task</Button>
                </form>

                {/* Search input */}
                <TextField
                    label="Search tasks..."
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Display filtered tasks */}
                <div>
                    {filteredTasks.map((task) => (
                        <Task
                            key={task.id}
                            title={task.title}
                            isCompleted={task.completed}
                            onDelete={() => openDeleteDialog(task.id)}
                            onToggle={() => toggleTaskById(task.id)}
                            onEdit={(newTitle) => editTask(task.id, newTitle)}
                        />
                    ))}
                </div>
            </Container>

            {/* Delete confirmation dialog */}
            <Dialog open={deleteDialogOpen}>
                <DialogTitle>Delete Task</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this task?
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog}>Cancel</Button>
                    <Button onClick={confirmDeleteTask}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default App;
