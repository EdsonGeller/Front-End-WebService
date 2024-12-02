import React, { useState, useEffect } from 'react';
import Button1 from '../../components/buttons/button-1/Button_1';
import './task.css';
import api from '../../utils/axiosConfig';

const TaskPageCreate = () => {
    const [taskName, setTaskName] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('');
    const [durationDays, setDurationDays] = useState('');
    const [durationHours, setDurationHours] = useState('');
    const [durationMinutes, setDurationMinutes] = useState('');
    const [categories, setCategories] = useState<{ categoryId: string, categoryName: string }[]>([]); // Ajuste para um array de objetos com id e nome
    const [newCategory, setNewCategory] = useState('');
    const [isCreatingCategory, setIsCreatingCategory] = useState(false);
    const [errors, setErrors] = useState({
        taskName: '',
        category: '',
        priority: '',
        duration: '',
    });

    // Buscar categorias ao carregar o componente
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories');
                setCategories(response.data); // Ajuste para garantir que a resposta contém categoriaId e categoryName
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleSave = async () => {
        const newErrors = {
            taskName: taskName ? '' : 'Titulo é obrigatório',
            category: category ? '' : 'Categoria é obrigatória',
            priority: priority ? '' : 'Prioridade é obrigatória',
            duration: (durationDays || durationHours || durationMinutes) ? '' : 'Duração é obrigatória',
        };

        if (Object.values(newErrors).some(error => error !== '')) {
            setErrors(newErrors);
            return;
        }

        const task = {
            taskName,
            categoryName: category,
            priority,
            durationDays: parseInt(durationDays || "0", 10),
            durationHours: parseInt(durationHours || "0", 10),
            durationMinutes: parseInt(durationMinutes || "0", 10),
        };

        try {
            const response = await api.post('/tasks', task);
            console.log('Tarefa salva com sucesso:', response.data);
            setTaskName('');
            setCategory('');
            setPriority('');
            setDurationDays('');
            setDurationHours('');
            setDurationMinutes('');
            setErrors({
                taskName: '',
                category: '',
                priority: '',
                duration: '',
            });
        } catch (error) {
            console.error('Erro ao salvar a tarefa:', error);
        }
    };

    const handleCreateCategory = async () => {
        if (newCategory.trim() === '') {
            alert('Digite o nome da categoria');
            return;
        }

        try {
            await api.post('/categories', { categoryName: newCategory });
            setCategories([...categories, { categoryId: newCategory, categoryName: newCategory }]); // Adiciona a nova categoria
            setNewCategory('');
            setIsCreatingCategory(false);
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
        }
    };

    return (
        <div className='task_container'>
            <table className='task_table'>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Categoria</th>
                        <th>Prioridade</th>
                        <th>Duração</th>
                        <th>
                            <Button1 action="y" text="Salvar" design='submit' onClick={handleSave} />
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
                            {errors.taskName && <span className="error">{errors.taskName}</span>}
                        </td>
                        <td>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Selecione uma categoria</option>
                                {categories.map((cat) => (
                                    <option key={cat.categoryId} value={cat.categoryName}>
                                        {cat.categoryName}
                                    </option>
                                ))}
                            </select>
                            {errors.category && <span className="error">{errors.category}</span>}
                            <button
                                type="button"
                                onClick={() => setIsCreatingCategory(!isCreatingCategory)}
                            >
                                {isCreatingCategory ? '-' : '+'} Criar Nova Categoria
                            </button>
                            {isCreatingCategory && (
                                <div>
                                    <input
                                        type="text"
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                        placeholder="Nova categoria"
                                    />
                                    <button onClick={handleCreateCategory}>Salvar Categoria</button>
                                </div>
                            )}
                        </td>
                        <td>
                            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option value="">Selecione</option>
                                <option value="NORMAL">Normal</option>
                                <option value="IMPORTANTE">Importante</option>
                                <option value="PRIORIDADE">Prioridade</option>
                                <option value="URGENTE">Urgente</option>
                            </select>
                            {errors.priority && <span className="error">{errors.priority}</span>}
                        </td>
                        <td>
                            <div>
                                <input
                                    type="number"
                                    placeholder="Dias"
                                    value={durationDays}
                                    onChange={(e) => setDurationDays(e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="Horas"
                                    value={durationHours}
                                    onChange={(e) => setDurationHours(e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="Minutos"
                                    value={durationMinutes}
                                    onChange={(e) => setDurationMinutes(e.target.value)}
                                />
                                {errors.duration && <span className="error">{errors.duration}</span>}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TaskPageCreate;
