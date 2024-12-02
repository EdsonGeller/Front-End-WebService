import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Menu from './components/header/Menu';
import HomePage from './pages/home/HomePage';
import { AuthProvider } from './pages/login/AuthContext';
import LoginPage from './pages/login/LoginPage';
import ProtectRoute from './pages/login/ProtectRoute';
import PublicRoute from './pages/login/PublicRoute';
import TaskPage from './pages/tasks/TaskPage';
import TaskPageCreate from './pages/tasks/TaskPageCreate';
import UpdateTaskForm from './pages/tasks/TaskPageEdit';


const AppRouter: React.FC = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Rotas públicas */}
                    <Route element={<PublicRoute />}>
                        <Route path="/" element={<LoginPage />} />
                    </Route>

                    {/* Rotas protegidas */}
                    <Route element={<ProtectRoute />}>
                        <Route path="/home" element={<ProtectedLayout><HomePage /></ProtectedLayout>} />
                        <Route path="/tasks" element={<ProtectedLayout><TaskPage /></ProtectedLayout>} />
                        <Route path="/tasks/edit/:taskId" element={<ProtectedLayout><UpdateTaskForm /></ProtectedLayout>} />
                        <Route path="/tasks/create" element={<ProtectedLayout><TaskPageCreate /></ProtectedLayout>} />
                    </Route>

                    {/* Rota padrão */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

/**
 * Layout protegido para exibir o menu apenas para usuários autenticados.
 */
const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Menu />
            {children}
        </>
    );
};

export default AppRouter;
