import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button1 from '../../components/buttons/button-1/Button_1';
import api from '../../utils/axiosConfig';

interface Task {
    taskId: number;
    taskName: string;
    categoryName: string;
    priority: string;
    durationDays: number;
    durationHours: number;
    durationMinutes: number;
}

const TaskPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get<Task[]>('/tasks');
                setTasks(response.data);
            } catch (error) {
                console.error('Erro ao buscar tarefas:', error);
            }
        };

        fetchTasks();
    }, []);

    const handleEdit = (taskId: number) => {
        navigate(`/tasks/edit/${taskId}`);
    };

    const handleDelete = async (taskId: number) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            setTasks(tasks.filter((task) => task.taskId !== taskId));
        } catch (error) {
            console.error('Erro ao deletar tarefa:', error);
        }
    };
    const handleStart = async (taskId: number) => {
        try {
            await api.patch(`/tasks/${taskId}/start`);
            setTasks(tasks.filter((task) => task.taskId !== taskId));
        } catch (error) {
            console.error('Erro ao iniciar tarefa:', error);
        }
    };
    const handleFinish = async (taskId: number) => {
        try {
            await api.patch(`/tasks/${taskId}/finish`);
            setTasks(tasks.filter((task) => task.taskId !== taskId));
        } catch (error) {
            console.error('Erro ao iniciar tarefa:', error);
        }
    };

    return (
        <div className='task_container'>
            <table className='task_table'>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Categoria</th>
                        <th>Prioridade</th>
                        <th>Duração</th>
                        <th>Ações</th>
                        <th>
                            <Button1 action="create" text="Criar Tarefa" design='submit' />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <tr key={task.taskId}>
                                <td>{task.taskName}</td>
                                <td>{task.categoryName}</td>
                                <td>{task.priority}</td>
                                <td>{task.durationDays}d {task.durationHours}h {task.durationMinutes}m</td>
                                <td>
                                    <div className='buttonGroup'>
                                        <Button1 action="delete" onClick={() => handleDelete(task.taskId)} design='delete' />
                                        <Button1 action="finish" onClick={() => handleFinish(task.taskId)} design='finish' />
                                        <Button1 action="start" onClick={() => handleStart(task.taskId)} design='start' />
                                        <Button1 action="update" onClick={() => handleEdit(task.taskId)} design='edit' />
                                    </div>
                                </td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>Nenhuma tarefa salva</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TaskPage;
