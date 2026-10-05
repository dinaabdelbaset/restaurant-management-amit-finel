import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Configure Axios Defaults
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
axios.defaults.withCredentials = false;
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            if (localStorage.getItem('token')) {
                try {
                    const response = await axios.get('/me');
                    setUser(response.data);
                } catch (error) {
                    console.error("Auth check failed:", error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const login = async (email, password) => {
        const response = await axios.post('/login', { email, password });
        localStorage.setItem('token', response.data.access_token);
        setUser(response.data.user);
        return response.data;
    };

    const register = async (name, email, password, phone) => {
        const response = await axios.post('/register', { name, email, password, phone });
        localStorage.setItem('token', response.data.access_token);
        setUser(response.data.user);
        return response.data;
    };

    const logout = async () => {
        try {
            await axios.post('/logout');
        } catch {}
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
