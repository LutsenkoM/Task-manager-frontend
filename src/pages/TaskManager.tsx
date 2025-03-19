import React from "react";
import { Typography } from "@mui/material";
import TodoList from "../components/TodoList";

const TaskManager: React.FC = () => {
    return (
        <>
            <Typography variant="h4">Task Manager Page</Typography>
            <TodoList />
        </>
    );
};

export default TaskManager;