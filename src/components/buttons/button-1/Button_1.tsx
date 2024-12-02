import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../buttons.module.scss';
interface Button1Props {
    action: 'home' | 'tasks' | 'y' | 'create' | 'delete' | 'update' | 'start' | 'finish';
    text?: string;
    design?: string;
    onClick?: () => void;
    taskId?: number;
    updatedTaskData?: { [key: string]: any };
}

const Button1: React.FC<Button1Props> = ({ action, text, design, onClick, taskId, updatedTaskData }) => {
    const navigate = useNavigate();

    const buttonStyle = 
        design === 'submit' ? styles.homeButton : 
        design === 'edit' ? styles.editButton : 
        design === 'delete' ? styles.deleteButton : 
        design === 'start' ? styles.startButton : 
        design === 'finish' ? styles.finishButton : styles.genButton;

    const handleClick = async () => {
        if (onClick) {
            onClick();
        } else if (action === 'create') {
            navigate('/tasks/create');
        } else if (action === 'tasks') {
            navigate('/tasks');
        } else if (action === 'home') {
            navigate('/home');
        } else if (action === 'delete' && taskId !== undefined) {
        } else if (action === 'update' && taskId !== undefined && updatedTaskData !== undefined) {
        } else if (action === 'start' && taskId !== undefined) {
        } else if (action === 'finish' && taskId !== undefined) {
        }
    };

    return (
        <div>
            <button className={buttonStyle} type={action === 'y' ? 'submit' : 'button'} onClick={handleClick}>
                {text}
            </button>
        </div>
    );
};

export default Button1;