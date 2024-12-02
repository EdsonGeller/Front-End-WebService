import React, { useState } from 'react';
import '../login/login.css';
import Logo from '../../assets/images/1234.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';

type Errors = {
    username?: string;
    password?: string;
};

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<Errors>({});
    const [loginError, setLoginError] = useState<string | null>(null);
    const [isLoginMode, setIsLoginMode] = useState(true); // Estado para alternar entre login e criação
    const navigate = useNavigate();
    const { login } = useAuth();

    const validate = (): boolean => {
        const newErrors: Errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!username) {
            newErrors.username = 'O username é obrigatório';
        } else if (!emailRegex.test(username)) {
            newErrors.username = 'O formato do email é inválido';
        }

        if (!password) {
            newErrors.password = 'A senha é obrigatória';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validate()) {
            try {
                const response = await axios.post('http://localhost:8083/api/v1/auth', { username, password });

                if (response.status === 200 && response.data.token) {
                    const { token } = response.data;
                    localStorage.setItem('authToken', token);
                    login();
                    navigate('/home');
                } else {
                    throw new Error('Token não retornado pela API.');
                }
            } catch (error) {
                setLoginError('Erro ao fazer login. Verifique suas credenciais.');
            }
        }
    };

    const handleCreate = async () => {
        if(validate()){
            try{
                const response = await axios.post('http://localhost:8083/api/v1/usuarios', { username, password });

                if(response.status === 201){
                    setIsLoginMode(!isLoginMode)
                } else {
                    throw new Error('Conta não foi criada')
                }
            } catch(error){}
        }
    };

    return (
        <div className="background">
            <div className="login_container">
                
                <img src={Logo} alt="logo" />
                {isLoginMode && (
                    <div className='teste2'>
                        <div className="login_input">
                            <span>
                                <label htmlFor="username">Email<br /></label>
                                <input
                                    type="email"
                                    name="username"
                                    placeholder="Digite seu Email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                {errors.username && <div className="error">{errors.username}</div>}
                            </span>
                            <span>
                                <label htmlFor="password">Senha<br /></label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Digite sua Senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && <div className="error">{errors.password}</div>}
                            </span>
                        </div>
                        {loginError && <div className="error">{loginError}</div>}
                        <div className="login_access">
                            <span>
                                <h1>Esqueceu sua senha?</h1>
                            </span>
                            <span>
                                <button type="button" onClick={handleSubmit}>Entrar</button>
                            </span>
                            <span>
                                <button type="button" id="transition" onClick={() => setIsLoginMode(false)}>Primeiro Acesso</button>
                            </span>
                        </div>
                    </div>

                )}
                {!isLoginMode && (
                    <div className='teste'>
                        <div className="create_input">
                            <span>
                                <label htmlFor="username">Email<br /></label>
                                <input
                                    type="email"
                                    name="username"
                                    placeholder="Digite seu Email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                {errors.username && <div className="error">{errors.username}</div>}
                            </span>
                            <span>
                                <label htmlFor="password">Senha<br /></label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Digite sua Senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && <div className="error">{errors.password}</div>}
                            </span>
                        </div>
                        <div className="create_access">
                            <span>
                                <button type="button" onClick={handleCreate}>Criar Conta</button>
                            </span>
                            <span>
                                <button type="button" id="transition" onClick={() => setIsLoginMode(true)}>Voltar para o login</button>
                            </span>
                        </div>
                    </div>

                )}


            </div>
        </div>
    );
};

export default LoginPage;
