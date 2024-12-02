import React from 'react';
import '../home/home.css'
import Click from '../../assets/images/Polygon 1.png';
import Button1 from '../../components/buttons/button-1/Button_1';
const HomePage = () => {
    return (
        <div>
            <div className='home_container'>
                <div className='home_title'>
                    <h1>TaskMasters</h1>
                    <h5>Ajudando a organizar e gerenciar seus projetos</h5>
                </div>
                <div className='home_link'>
                    <Button1 action='tasks' text='Comece seu projeto aqui'/>
                    <button type='submit'><img src={Click} alt="Botao" /></button>

                </div>
            </div>
        </div>
    );
};

export default HomePage;