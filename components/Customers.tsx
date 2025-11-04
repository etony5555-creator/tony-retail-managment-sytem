// Fix: Create the Customers component.
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType, Customer } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';

type CustomerFormState = {
    name: string;
    phone: string;
    creditLimit: string;
    creditUsed: string;
};

const Customers: React.FC = () => {
    const { customers, addCustomer, updateCustomer } = useContext(AppContext) as AppContextType;
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Customer | null>(null);

    const initialFormState: Omit<CustomerFormState, 'creditUsed'> = { name: '', phone: '', creditLimit: '0' };
    const [formState, setFormState] = useState<CustomerFormState>({...initialFormState, creditUsed: '0'});

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const isNumeric = name === 'creditLimit' || name === 'creditUsed';
        if (isNumeric) {
            const numericValue = value.replace(/\D/g, '');
            setFormState(prev => ({ ...prev, [name]: numericValue }));
        } else {
            setFormState(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (formState.name && formState.phone) {
            addCustomer({
                name: formState.name,
                phone: formState.phone,
                creditLimit: Number(formState.creditLimit) || 0,
            });
            setIsAddModalOpen(false);
            setFormState({...initialFormState, creditUsed: '0'});
        }
    };

    const handleEditClick = (item: Customer) => {
        setEditingItem(item);
        setFormState({
            name: item.name,
            phone: item.phone,
            creditLimit: String(item.creditLimit),
            creditUsed: String(item.creditUsed),
        });
        setIsEditModalOpen(true);
    };

    const handleUpdateItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            updateCustomer({
                ...editingItem,
                name: formState.name,
                phone: formState.phone,
                creditLimit: Number(formState.creditLimit) || 0,
                creditUsed: Number(formState.creditUsed) || 0,
            });
            setIsEditModalOpen(false);
            setEditingItem(null);
            setFormState({...initialFormState, creditUsed: '0'});
        }
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
            <td colSpan={5} className="text-center p-8 text-gray-500">
                <div className="flex flex-col items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.978 5.978 0 0112 13a5.979 5.979 0 012.121.303m-2.121-.303a4 4 0 100-5.292m0 5.292a4 4 0 010-5.292" /></svg>
                    <span>No customers added yet.</span>
                </div>
            </td>
        </tr>
    );

    return (
        <>
            <Card className="animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-xl text-white">Customer Management</h2>
                    <Button onClick={() => { setFormState({...initialFormState, creditUsed: '0'}); setIsAddModalOpen(true); }}>Add Customer</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-dark-border text-sm text-gray-400">
                                <th className="p-3">Name</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3 text-right">Credit Used</th>
                                <th className="p-3 text-right">Credit Limit</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.length > 0 ? customers.map(customer => {
                                const creditUsage = customer.creditLimit > 0 ? (customer.creditUsed / customer.creditLimit) * 100 : 0;
                                let usageColor = 'text-green-400';
                                if (creditUsage > 50) usageColor = 'text-yellow-400';
                                if (creditUsage > 85) usageColor = 'text-red-400';

                                return (
                                <tr key={customer.id} className="border-b border-dark-border hover:bg-dark-border/50 transition-colors">
                                    <td className="p-3 font-medium text-white">{customer.name}</td>
                                    <td className="p-3 font-mono">{customer.phone}</td>
                                    <td className={`p-3 text-right font-mono ${usageColor}`}>{formatCurrency(customer.creditUsed)}</td>
                                    <td className="p-3 text-right font-mono">{formatCurrency(customer.creditLimit)}</td>
                                    <td className="p-3">
                                        <Button variant="secondary" className="text-xs py-1 px-2" onClick={() => handleEditClick(customer)}>Edit</Button>
                                    </td>
                                </tr>
                            )}) : <EmptyState />}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Customer">
                <form onSubmit={handleAddItem} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Customer Name</label>
                        <input type="text" name="name" value={formState.name} onChange={handleFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                            <input type="text" name="phone" value={formState.phone} onChange={handleFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Credit Limit (UGX)</label>
                            <input type="text" inputMode="numeric" name="creditLimit" value={formState.creditLimit} onChange={handleFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit">Save Customer</Button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Customer Details">
                <form onSubmit={handleUpdateItem} className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Customer Name</label>
                        <input type="text" name="name" value={formState.name} onChange={handleFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                            <input type="text" name="phone" value={formState.phone} onChange={handleFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Credit Used (UGX)</label>
                            <input type="text" inputMode="numeric" name="creditUsed" value={formState.creditUsed} onChange={handleFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Credit Limit (UGX)</label>
                            <input type="text" inputMode="numeric" name="creditLimit" value={formState.creditLimit} onChange={handleFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default Customers;