import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// Task component: Represents an individual task in the To-Do list.
// Props: 
// - title: The title of the task
// - isCompleted: Boolean indicating if the task is completed
// - onDelete: Function to handle task deletion
// - onToggle: Function to toggle task completion
// - onEdit: Function to handle task title updates
function Task({ title, isCompleted, onDelete, onToggle, onEdit }) {
    // Local state to determine if the task is in "edit mode"
    const [isEditing, setIsEditing] = useState(false);

    // Local state to store the updated title while editing
    const [editInput, setEditInput] = useState(title);

    // Handle saving changes to the task title
    const handleEdit = () => {
        if (!editInput.trim()) return; // Prevent saving empty titles
        onEdit(editInput); // Call the onEdit function with the new title
        setIsEditing(false); // Exit edit mode
    };

    return (
        <div 
            className="task-container" 
            style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}
        >
            {/* Checkbox to toggle task completion */}
            <Checkbox
                checked={isCompleted} // Reflects current completion status
                onChange={onToggle} // Toggles completion state when clicked
                color="primary"
            />

            {/* Task title or editable text field */}
            {isEditing ? (
                // Editable input for updating the task title
                <TextField
                    value={editInput} // Current title in edit mode
                    onChange={(e) => setEditInput(e.target.value)} // Update state as user types
                    variant="outlined"
                    size="small"
                    style={{ marginRight: '8px', flex: 1 }} // Make input take up remaining space
                />
            ) : (
                // Display task title with a strikethrough if completed
                <span 
                    className={`task-text ${isCompleted ? "line-through" : ""}`} 
                    style={{ flex: 1 }}
                >
                    {title}
                </span>
            )}

            {/* Action buttons: Save, Edit, and Delete */}
            <div 
                className="task-actions" 
                style={{ display: 'flex', alignItems: 'center' }}
            >
                {isEditing ? (
                    // Save button for edit mode
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleEdit} // Save changes and exit edit mode
                        style={{
                            backgroundColor: "#4caf50", // Green color for save button
                            color: "#fff", // White text
                            marginLeft: '8px', // Add space between elements
                        }}
                    >
                        Save
                    </Button>
                ) : (
                    <>
                        {/* Edit button to enter edit mode */}
                        <IconButton
                            color="secondary"
                            onClick={() => setIsEditing(true)} // Enable edit mode
                            style={{ marginRight: '8px' }} // Add space between buttons
                        >
                            <EditIcon />
                        </IconButton>

                        {/* Delete button to remove the task */}
                        <IconButton
                            color="error"
                            onClick={onDelete} // Call onDelete to delete the task
                        >
                            <DeleteIcon />
                        </IconButton>
                    </>
                )}
            </div>
        </div>
    );
}

export default Task;