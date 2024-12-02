import React from 'react';
import Button1 from '../buttons/button-1/Button_1';
import '../header/menu.css'
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axiosConfig';
const Menu = () => {
    const navigate = useNavigate();

    async function logout() {
        try {
            await api.post(
                "/logout",
                {}, // Corpo da requisição vazio
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
                    }
                }
            );

            // Remove o token do armazenamento local
            localStorage.removeItem("authToken");
            // Redireciona para a página de login
            navigate("/login");
        } catch (error: any) {
            console.error("Erro ao deslogar:", error.response || error.message);
        }
    }

    return (
        <div className='menu_container'>
            <table>
                <thead>
                    <tr>
                        <th><Button1 action='home' text='Inicio' /></th>
                        <th><Button1 action='tasks' text='Tarefas' /></th>
                        <th><Button1 action='home' text='Sobre' /></th>
                        <th><Button1 action='home' text='Suporte' /></th>
                        <th><button onClick={logout}>DESLOG</button></th>
                    </tr>
                </thead>
            </table>
        </div>
    );
};

export default Menu;