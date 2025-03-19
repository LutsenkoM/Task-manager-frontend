import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    Paper,
    List,
    ListItem,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

interface Task {
    _id: string;
    title: string;
    description: string;
    status: 'new' | 'in progress' | 'done';
}

interface TaskInput {
    title: string;
    description: string;
    status: 'new' | 'in progress' | 'done';
}

const TodoList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<TaskInput>({ title: '', description: '', status: 'new' });
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editingTask, setEditingTask] = useState<TaskInput>({ title: '', description: '', status: 'new' });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get<Task[]>(`${process.env.REACT_APP_BACKEND_URI}/api/tasks`);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleNewTaskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    const handleNewTaskSelectChange = (e: SelectChangeEvent<'new' | 'in progress' | 'done'>) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value as 'new' | 'in progress' | 'done' });
    };

    const createTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post<Task>(`${process.env.REACT_APP_BACKEND_URI}/api/tasks`, newTask);
            setTasks([...tasks, response.data]);
            setNewTask({ title: '', description: '', status: 'new' });
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const deleteTask = async (id: string) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URI}/api/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const startEditing = (task: Task) => {
        setEditingTaskId(task._id);
        setEditingTask({ title: task.title, description: task.description, status: task.status });
    };

    const handleEditingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditingTask({ ...editingTask, [name]: value });
    };

    const handleEditingSelectChange = (e: SelectChangeEvent<'new' | 'in progress' | 'done'>) => {
        const { name, value } = e.target;
        setEditingTask({ ...editingTask, [name]: value as 'new' | 'in progress' | 'done' });
    };

    const saveEditing = async (id: string) => {
        try {
            const response = await axios.put<Task>(`${process.env.REACT_APP_BACKEND_URI}/api/tasks/${id}`, editingTask);
            setTasks(tasks.map(task => (task._id === id ? response.data : task)));
            setEditingTaskId(null);
        } catch (error) {
            console.error('Error editing task:', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Box my={4}>
                <List>
                    {tasks.map(task => (
                        <ListItem
                            key={task._id}
                            component={Paper}
                            elevation={3}
                            sx={{ mb: 2, p: 2, display: 'flex', flexDirection: 'column' }}
                        >
                            {editingTaskId === task._id ? (
                                <Box width="100%">
                                    <TextField
                                        label="Title"
                                        name="title"
                                        value={editingTask.title}
                                        onChange={handleEditingChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Description"
                                        name="description"
                                        value={editingTask.description}
                                        onChange={handleEditingChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel id={`status-label-${task._id}`}>Status</InputLabel>
                                        <Select
                                            labelId={`status-label-${task._id}`}
                                            name="status"
                                            value={editingTask.status}
                                            label="Status"
                                            onChange={handleEditingSelectChange}
                                        >
                                            <MenuItem value="new">New</MenuItem>
                                            <MenuItem value="in progress">In Progress</MenuItem>
                                            <MenuItem value="done">Done</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Box mt={2} display="flex" justifyContent="flex-end">
                                        <IconButton color="primary" onClick={() => saveEditing(task._id)}>
                                            <SaveIcon />
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => setEditingTaskId(null)}>
                                            <CancelIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            ) : (
                                <Box width="100%">
                                    <Typography variant="h5">{task.title}</Typography>
                                    <Typography variant="body1" sx={{ mt: 1 }}>
                                        {task.description}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                                        Status: {task.status}
                                    </Typography>
                                    <Box mt={2} display="flex" justifyContent="flex-end">
                                        <IconButton color="primary" onClick={() => startEditing(task)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => deleteTask(task._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            )}
                        </ListItem>
                    ))}
                </List>

                <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        New Task
                    </Typography>
                    <form onSubmit={createTask}>
                        <TextField
                            label="Title"
                            name="title"
                            value={newTask.title}
                            onChange={handleNewTaskChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Description"
                            name="description"
                            value={newTask.description}
                            onChange={handleNewTaskChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="new-task-status-label">Status</InputLabel>
                            <Select
                                labelId="new-task-status-label"
                                name="status"
                                value={newTask.status}
                                label="Status"
                                onChange={handleNewTaskSelectChange}
                            >
                                <MenuItem value="new">New</MenuItem>
                                <MenuItem value="in progress">In Progress</MenuItem>
                                <MenuItem value="done">Done</MenuItem>
                            </Select>
                        </FormControl>
                        <Box mt={2} display="flex" justifyContent="flex-end">
                            <Button type="submit" variant="contained" color="primary">
                                Add Task
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default TodoList;