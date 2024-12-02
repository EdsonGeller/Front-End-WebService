import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button1 from '../../components/buttons/button-1/Button_1';
import './task.css';
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

const UpdateTaskForm: React.FC = () => {
    const { taskId } = useParams<{ taskId?: string }>();
    const navigate = useNavigate();
    const [task, setTask] = useState<Task | null>(null);
    const [taskName, setTaskName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [priority, setPriority] = useState('');
    const [durationDays, setDurationDays] = useState('0');
    const [durationHours, setDurationHours] = useState('0');
    const [durationMinutes, setDurationMinutes] = useState('0');

    useEffect(() => {
        console.log("taskId:", taskId);
        const fetchTask = async () => {
            try {
                const response = await api.get<Task>(`/tasks/${taskId}`);
                console.log("Task Response:", response.data);
                const taskToEdit = response.data;
                setTask(taskToEdit);
                console.log("Task state after setTask:", taskToEdit);
                setTaskName(taskToEdit.taskName);
                setCategoryName(taskToEdit.categoryName);
                setPriority(taskToEdit.priority);
                setDurationDays(String(taskToEdit.durationDays));
                setDurationHours(String(taskToEdit.durationHours));
                setDurationMinutes(String(taskToEdit.durationMinutes));
            } catch (error) {
                console.error('Erro ao buscar a tarefa:', error);
            }
        };

        if (taskId) {
            fetchTask();
        }
    }, [taskId]);

    const handleUpdate = async () => {
        if (task) {
            const updatedTaskData = {
                taskName,
                categoryName,
                priority,
                durationDays: parseInt(durationDays || "0", 10),
                durationHours: parseInt(durationHours || "0", 10),
                durationMinutes: parseInt(durationMinutes || "0", 10),
            };

            try {
                await api.put(`/tasks/${task.taskId}`, updatedTaskData);
                navigate('/tasks');
            } catch (error) {
                console.error('Erro ao atualizar a tarefa:', error);
            }
        }
    };

    return (
        <div className='task_container'>
            {task && (
                <form onSubmit={(e) => e.preventDefault()}>
                    <table className='task_table'>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Categoria</th>
                                <th>Prioridade</th>
                                <th>Duração</th>
                                <th>
                                    <Button1
                                        action="update"
                                        text="Atualizar Tarefa"
                                        onClick={handleUpdate}
                                        design='submit'
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        value={taskName}
                                        onChange={(e) => setTaskName(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                        <option value="NORMAL">Normal</option>
                                        <option value="IMPORTANTE">Importante</option>
                                        <option value="PRIORIDADE">Prioridade</option>
                                        <option value="URGENTE">Urgente</option>
                                    </select>
                                </td>
                                <td>
                                    <div>
                                        <input
                                            type="number"
                                            value={durationDays}
                                            onChange={(e) => setDurationDays(e.target.value)}
                                            placeholder="Dias"
                                        />
                                        <input
                                            type="number"
                                            value={durationHours}
                                            onChange={(e) => setDurationHours(e.target.value)}
                                            placeholder="Horas"
                                        />
                                        <input
                                            type="number"
                                            value={durationMinutes}
                                            onChange={(e) => setDurationMinutes(e.target.value)}
                                            placeholder="Minutos"
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            )}
        </div>
    );
};

export default UpdateTaskForm;
