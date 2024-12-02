import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute: React.FC = () => {
    const token = localStorage.getItem('authToken');

    // Verifica se o token está presente
    return token ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;