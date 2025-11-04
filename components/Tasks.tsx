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

type TaskFormState = {
    title: string;
    dueDate: string;
    reminderTime: string;
}

const Tasks: React.FC = () => {
    const { tasks, addTask, updateTaskStatus, updateTask } = useContext(AppContext) as AppContextType;
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Task | null>(null);

    const initialFormState: TaskFormState = { title: '', dueDate: new Date().toISOString().split('T')[0], reminderTime: '' };
    const [formState, setFormState] = useState<TaskFormState>(initialFormState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (formState.title && formState.dueDate) {
            addTask({
                title: formState.title,
                dueDate: formState.dueDate,
                reminderTime: formState.reminderTime || undefined,
            });
            setIsAddModalOpen(false);
            setFormState(initialFormState);
        }
    };

    const handleEditClick = (task: Task) => {
        setEditingItem(task);
        setFormState({
            title: task.title,
            dueDate: task.dueDate,
            reminderTime: task.reminderTime || '',
        });
        setIsEditModalOpen(true);
    };

    const handleUpdateItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem && formState.title && formState.dueDate) {
            updateTask({
                ...editingItem,
                title: formState.title,
                dueDate: formState.dueDate,
                reminderTime: formState.reminderTime || undefined,
            });
            setIsEditModalOpen(false);
            setEditingItem(null);
        }
    };
    
    const EmptyState = () => (
         <div className="text-center p-8 text-gray-500">
            <div className="flex flex-col items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                <span>No tasks yet. Click "Add Task" to get started.</span>
            </div>
        </div>
    );

    const TaskForm: React.FC = () => (
        <>
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Task Title</label>
                <input type="text" name="title" value={formState.title} onChange={handleInputChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Due Date</label>
                    <input type="date" name="dueDate" value={formState.dueDate} onChange={handleInputChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Reminder Time (Optional)</label>
                    <input type="time" name="reminderTime" value={formState.reminderTime} onChange={handleInputChange} className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                </div>
            </div>
        </>
    );

    return (
        <>
            <Card className="animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-xl text-white">Task Management</h2>
                    <Button onClick={() => { setFormState(initialFormState); setIsAddModalOpen(true); }}>Add Task</Button>
                </div>
                {tasks.length > 0 ? (
                <ul className="space-y-3">
                    {tasks.map(task => (
                        <li key={task.id} className="flex items-center justify-between p-3 bg-dark-bg/50 rounded-lg">
                            <div className="flex items-center gap-4">
                                <div>
                                    <p className={`text-white ${task.status === 'Completed' ? 'line-through text-gray-500' : ''}`}>
                                        {task.title}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <span>Due: {task.dueDate}</span>
                                        {task.reminderTime && (
                                            <span className="flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                {task.reminderTime}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                 <Button variant="secondary" className="text-xs py-1 px-2" onClick={() => handleEditClick(task)}>
                                     Edit
                                 </Button>
                                <select
                                    value={task.status}
                                    onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskStatus)}
                                    className={`text-xs font-semibold rounded-full px-2 py-1 border-0 outline-none appearance-none cursor-pointer ${statusStyles[task.status]}`}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </li>
                    ))}
                </ul>
                ) : <EmptyState />}
            </Card>

            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Task">
                <form onSubmit={handleAddItem} className="space-y-4">
                    <TaskForm />
                    <div className="flex justify-end">
                        <Button type="submit">Save Task</Button>
                    </div>
                </form>
            </Modal>

             <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Task">
                <form onSubmit={handleUpdateItem} className="space-y-4">
                    <TaskForm />
                    <div className="flex justify-end">
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default Tasks;