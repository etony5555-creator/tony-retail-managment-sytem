import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType, BorrowRecord, BorrowStatus } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';

const statusStyles: Record<BorrowStatus, string> = {
    Paid: 'text-green-100 bg-green-600/70',
    'Partially Paid': 'text-yellow-100 bg-yellow-500/70',
    Unpaid: 'text-red-100 bg-red-600/80',
};

type BorrowFormState = {
    lender: string;
    amount: string;
    amountPaid: string;
    date: string;
    dueDate: string;
    status: BorrowStatus;
}

const Borrow: React.FC = () => {
    const { borrows, addBorrow, updateBorrow } = useContext(AppContext) as AppContextType;
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingBorrow, setEditingBorrow] = useState<BorrowRecord | null>(null);
    
    const initialFormState: Omit<BorrowFormState, 'amountPaid' | 'status'> = {
        lender: '', amount: '', date: new Date().toISOString().split('T')[0], dueDate: ''
    };
    const [addForm, setAddForm] = useState(initialFormState);
    const [editForm, setEditForm] = useState<BorrowFormState | null>(null);

    const handleAddFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'amount' && value && !/^\d*$/.test(value)) return;
        setAddForm(prev => ({ ...prev, [name]: value }));
    };

    const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (editForm) {
            const { name, value } = e.target;
            const isNumeric = name === 'amount' || name === 'amountPaid';
            if (isNumeric && value && !/^\d*$/.test(value)) return;
            setEditForm(prev => ({ ...prev!, [name]: value }));
        }
    };

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (addForm.lender && Number(addForm.amount) > 0 && addForm.date && addForm.dueDate) {
            addBorrow({
                lender: addForm.lender,
                amount: Number(addForm.amount),
                date: addForm.date,
                dueDate: addForm.dueDate,
            });
            setIsAddModalOpen(false);
            setAddForm(initialFormState);
        }
    };
    
    const handleUpdateItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingBorrow && editForm) {
            updateBorrow({
                ...editingBorrow,
                ...editForm,
                amount: Number(editForm.amount) || 0,
                amountPaid: Number(editForm.amountPaid) || 0,
            });
            setIsEditModalOpen(false);
        }
    };

    const handleEditClick = (item: BorrowRecord) => {
        setEditingBorrow(item);
        setEditForm({
            lender: item.lender,
            amount: String(item.amount),
            amountPaid: String(item.amountPaid),
            date: item.date,
            dueDate: item.dueDate,
            status: item.status,
        });
        setIsEditModalOpen(true);
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'UGX',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(val).replace('UGX', 'UGX ');
    };
    
    const EmptyState = () => (
        <tr>
            <td colSpan={7} className="text-center p-8 text-gray-500">
                <div className="flex flex-col items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>No borrow records found.</span>
                </div>
            </td>
        </tr>
    );

    return (
        <>
            <Card className="animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-xl text-white">Borrow & Loan Management</h2>
                    <Button onClick={() => setIsAddModalOpen(true)}>Add Borrow Record</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-dark-border text-sm text-gray-400">
                                <th className="p-3">Lender</th>
                                <th className="p-3 text-right">Total Amount</th>
                                <th className="p-3 text-right">Amount Paid</th>
                                <th className="p-3 text-right">Remaining Bal.</th>
                                <th className="p-3">Due Date</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {borrows.length > 0 ? borrows.map(item => {
                                const remaining = item.amount - item.amountPaid;
                                return(
                                <tr key={item.id} className="border-b border-dark-border hover:bg-dark-border/50 transition-colors">
                                    <td className="p-3 font-medium text-white">{item.lender}</td>
                                    <td className="p-3 text-right font-mono">{formatCurrency(item.amount)}</td>
                                    <td className="p-3 text-right font-mono text-green-400">{formatCurrency(item.amountPaid)}</td>
                                    <td className="p-3 text-right font-mono text-red-400">{formatCurrency(remaining)}</td>
                                    <td className="p-3">{item.dueDate}</td>
                                    <td className="p-3">
                                        <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${statusStyles[item.status]}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <Button variant="secondary" className="text-xs py-1 px-2" onClick={() => handleEditClick(item)}>
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            )}) : <EmptyState />}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Borrow Record">
                <form onSubmit={handleAddItem} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Lender Name</label>
                        <input type="text" name="lender" value={addForm.lender} onChange={handleAddFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Amount (UGX)</label>
                            <input type="text" inputMode="numeric" name="amount" value={addForm.amount} onChange={handleAddFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Date Borrowed</label>
                            <input type="date" name="date" value={addForm.date} onChange={handleAddFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Due Date</label>
                        <input type="date" name="dueDate" value={addForm.dueDate} onChange={handleAddFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit">Save Record</Button>
                    </div>
                </form>
            </Modal>
            
            {editingBorrow && editForm && (
                 <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Borrow Record">
                    <form onSubmit={handleUpdateItem} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Lender Name</label>
                            <input type="text" name="lender" value={editForm.lender} onChange={handleEditFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Total Amount (UGX)</label>
                                <input type="text" inputMode="numeric" name="amount" value={editForm.amount} onChange={handleEditFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Amount Paid (UGX)</label>
                                <input type="text" inputMode="numeric" name="amountPaid" value={editForm.amountPaid} onChange={handleEditFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Date Borrowed</label>
                                <input type="date" name="date" value={editForm.date} onChange={handleEditFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Due Date</label>
                                <input type="date" name="dueDate" value={editForm.dueDate} onChange={handleEditFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                             <select
                                name="status"
                                value={editForm.status}
                                onChange={handleEditFormChange}
                                className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none"
                            >
                                <option value="Unpaid">Unpaid</option>
                                <option value="Partially Paid">Partially Paid</option>
                                <option value="Paid">Paid</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">Save Changes</Button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    );
};

export default Borrow;
