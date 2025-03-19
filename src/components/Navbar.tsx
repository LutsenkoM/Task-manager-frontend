import React, {useContext} from "react";
import {AppBar, Toolbar, Typography, Button, Box} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const Navbar: React.FC = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        authContext?.logout();
        navigate("/auth");
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow: 1, width: "50%"}}>
                    <Button color="inherit" component={Link} to="/">
                        My App
                    </Button>
                </Typography>
                {authContext?.user && (
                    <Box sx={{display: "flex", alignItems: "center", justifyContent: 'space-between',  width: "50%", ml: 2}}>
                        <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>

                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>
                        <Button color="inherit" component={Link} to="/task-manager">
                            Task Manager
                        </Button>
                        <Button color="inherit" component={Link} to="/about">
                            About
                        </Button>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                            <Typography variant="body1" sx={{ mr: 2 }}>
                                {authContext.user.firstName} {authContext.user.lastName}
                            </Typography>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Box>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;