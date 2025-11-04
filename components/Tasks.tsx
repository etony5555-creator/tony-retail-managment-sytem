import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType, Task } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';

const Tasks: React.FC = () => {
    const { tasks, addTask, toggleTask } = useContext(AppContext) as AppContextType;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState<Omit<Task, 'id' | 'completed'>>({
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
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                    className="h-5 w-5 rounded bg-dark-border border-gray-500 text-glow-cyan focus:ring-glow-cyan cursor-pointer"
                                />
                                <div>
                                    <p className={`text-white ${task.completed ? 'line-through text-gray-500' : ''}`}>
                                        {task.title}
                                    </p>
                                    <p className="text-xs text-gray-400">Due: {task.dueDate}</p>
                                </div>
                            </div>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                task.completed
                                ? 'bg-green-200/70 text-green-800'
                                : 'bg-yellow-200/70 text-yellow-800'
                            }`}>
                                {task.completed ? 'Completed' : 'Pending'}
                            </span>
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