import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    user: any;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: RegisterData) => Promise<void>;
    logout: () => void;
}

interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user") || "null");
    });
    const [token, setToken] = useState(() => localStorage.getItem("token"));

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }, [token]);

    const login = async (email: string, password: string) => {
        try {
            const res = await axios.post("http://localhost:4000/api/auth/login", { email, password }, { withCredentials: true });

            const authHeader = res.headers.authorization;
            const extractedToken = authHeader?.split("Bearer ")[1];

            if (extractedToken) {
                setToken(extractedToken);
                localStorage.setItem("token", extractedToken);
                setUser(res.data.user);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                navigate("/");
            } else {
                console.error("JWT token not found in response headers");
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const register = async (userData: RegisterData) => {
        try {
            await axios.post("http://localhost:4000/api/auth/register", userData);
            navigate("/auth");
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        navigate("/auth");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};