
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType, Task, TaskStatus } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';

const statusStyles: Record<TaskStatus, string> = {
    Pending: 'bg-yellow-200/70 text-yellow-800',
    'In Progress': 'bg-blue-200/70 text-blue-800',
    Completed: 'bg-green-200/70 text-green-800',
};

const Tasks: React.FC = () => {
    const { tasks, addTask, updateTaskStatus } = useContext(AppContext) as AppContextType;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState<Omit<Task, 'id' | 'status'>>({
        title: '',
        dueDate: new Date().toISOString().split('T')[0],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewItem(prev => ({ ...prev, [name]: value }));
    };

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (newItem.title && newItem.dueDate) {
            addTask(newItem);
            setIsModalOpen(false);
            setNewItem({ title: '', dueDate: new Date().toISOString().split('T')[0] });
        }
    };

    return (
        <>
            <Card className="animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-xl text-white">Task Management</h2>
                    <Button onClick={() => setIsModalOpen(true)}>Add Task</Button>
                </div>
                <ul className="space-y-3">
                    {tasks.map(task => (
                        <li key={task.id} className="flex items-center justify-between p-3 bg-dark-bg/50 rounded-lg">
                            <div>
                                <p className={`text-white ${task.status === 'Completed' ? 'line-through text-gray-500' : ''}`}>
                                    {task.title}
                                </p>
                                <p className="text-xs text-gray-400">Due: {task.dueDate}</p>
                            </div>
                            <select
                                value={task.status}
                                onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskStatus)}
                                className={`text-xs font-semibold rounded-full px-2 py-1 border-0 outline-none appearance-none cursor-pointer ${statusStyles[task.status]}`}
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </li>
                    ))}
                </ul>
            </Card>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Task">
                <form onSubmit={handleAddItem} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Task Title</label>
                        <input type="text" name="title" value={newItem.title} onChange={handleInputChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Due Date</label>
                        <input type="date" name="dueDate" value={newItem.dueDate} onChange={handleInputChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit">Save Task</Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default Tasks;