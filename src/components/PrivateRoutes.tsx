import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoutes: React.FC = () => {
    const authContext = useContext(AuthContext);
    return authContext?.user ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoutes;