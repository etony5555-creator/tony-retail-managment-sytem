import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType, BorrowRecord } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';

const Borrow: React.FC = () => {
    const { borrows, addBorrow } = useContext(AppContext) as AppContextType;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState<Omit<BorrowRecord, 'id' | 'status'>>({
        lender: '',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        dueDate: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewItem(prev => ({ ...prev, [name]: name === 'amount' ? Number(value) : value }));
    };

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (newItem.lender && newItem.amount > 0 && newItem.date && newItem.dueDate) {
            addBorrow(newItem);
            setIsModalOpen(false);
            setNewItem({ lender: '', amount: 0, date: new Date().toISOString().split('T')[0], dueDate: '' });
        }
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'UGX',
        }).format(val).replace('UGX', 'UGX ');
    };

    return (
        <>
            <Card className="animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-xl text-white">Borrow & Loan Management</h2>
                    <Button onClick={() => setIsModalOpen(true)}>Add Borrow Record</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-dark-border text-sm text-gray-400">
                                <th className="p-3">Lender</th>
                                <th className="p-3 text-right">Amount</th>
                                <th className="p-3">Date Borrowed</th>
                                <th className="p-3">Due Date</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {borrows.map(item => (
                                <tr key={item.id} className="border-b border-dark-border hover:bg-dark-border/50 transition-colors">
                                    <td className="p-3 font-medium text-white">{item.lender}</td>
                                    <td className="p-3 text-right font-mono">{formatCurrency(item.amount)}</td>
                                    <td className="p-3">{item.date}</td>
                                    <td className="p-3">{item.dueDate}</td>
                                    <td className="p-3">
                                        <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                                            item.status === 'Unpaid' 
                                            ? 'text-red-100 bg-red-600/80' 
                                            : 'text-green-600 bg-green-200/70'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Borrow Record">
                <form onSubmit={handleAddItem} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Lender Name</label>
                        <input type="text" name="lender" value={newItem.lender} onChange={handleInputChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Amount (UGX)</label>
                            <input type="number" name="amount" value={newItem.amount} onChange={handleInputChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Date Borrowed</label>
                            <input type="date" name="date" value={newItem.date} onChange={handleInputChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Due Date</label>
                        <input type="date" name="dueDate" value={newItem.dueDate} onChange={handleInputChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit">Save Record</Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default Borrow;