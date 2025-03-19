import React, { useState, useContext } from "react";
import { Container, Tabs, Tab, Box, TextField, Button, MenuItem } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";

const roles = ["user", "admin"];

const AuthPage: React.FC = () => {
    const [tab, setTab] = useState(0);
    const authContext = useContext(AuthContext);

    const {
        control,
        handleSubmit,
        reset,
    } = useForm();

    const onLoginSubmit = async (data: any) => {
        console.log('{ email, password }', { email: data.email, password: data.password });
        await authContext?.login(data.email, data.password);
    };

    const onRegisterSubmit = async (data: any) => {
        await authContext?.register(data);
        setTab(0);
        reset();
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5, textAlign: "center" }}>
                <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>
                {tab === 0 ? (
                    <Box component="form" onSubmit={handleSubmit(onLoginSubmit)} sx={{ mt: 2 }}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField {...field} fullWidth label="Email" margin="normal" />}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField {...field} fullWidth label="Password" type="password" margin="normal" />}
                        />
                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                            Login
                        </Button>
                    </Box>
                ) : (
                    <Box component="form" onSubmit={handleSubmit(onRegisterSubmit)} sx={{ mt: 2 }}>
                        <Controller
                            name="firstName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField {...field} fullWidth label="First Name" margin="normal" />}
                        />
                        <Controller
                            name="lastName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField {...field} fullWidth label="Last Name" margin="normal" />}
                        />
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField {...field} fullWidth label="Email" margin="normal" />}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField {...field} fullWidth label="Password" type="password" margin="normal" />}
                        />
                        <Controller
                            name="role"
                            control={control}
                            defaultValue="user"
                            render={({ field }) => (
                                <TextField {...field} select fullWidth label="Role" margin="normal">
                                    {roles.map((role) => (
                                        <MenuItem key={role} value={role}>
                                            {role}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                            Register
                        </Button>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default AuthPage;