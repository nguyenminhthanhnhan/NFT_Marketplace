import React, { createContext, useContext, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const token = localStorage.getItem('token');

    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    if (!token) {
        delete axios.defaults.headers.common['Authorization'];
    }

    const logout = () => {
        localStorage.removeItem('token');
    };

    const getUser = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not found in localStorage');
                return null;
            }

            const { data } = await axios.get('/api/v1/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(data);

            return data;
        } catch (error) {
            console.error('Error in getUser:', error);
            throw error;
        }
    };

    useEffect(() => {
        // Example: Call getUser when the component mounts
        getUser()
            .then((userData) => {
                console.log('User data:', userData);
            })
            .catch((error) => {
                console.error('Error in getUser:', error);
            });
    }, []); // Empty dependency array ensures the effect runs once on mount

    const contextValue = {
        logout,
        getUser,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};