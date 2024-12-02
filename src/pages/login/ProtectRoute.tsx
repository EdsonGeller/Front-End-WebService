import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectRoute: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken"));

    useEffect(() => {
        // Listener para mudanças no localStorage
        const onStorageChange = () => {
            setIsAuthenticated(!!localStorage.getItem("authToken"));
        };

        window.addEventListener("storage", onStorageChange);

        return () => {
            window.removeEventListener("storage", onStorageChange);
        };
    }, []);

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectRoute;
