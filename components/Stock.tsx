import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType, StockItem } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';

type StockFormState = {
    name: string;
    category: string;
    quantity: string;
    price: string;
    lowStockThreshold: string;
};

const Stock: React.FC = () => {
    const { stock, addStockItem, updateStockItem, deleteStockItem } = useContext(AppContext) as AppContextType;
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
    const [editingItem, setEditingItem] = useState<StockItem | null>(null);

    const initialFormState: StockFormState = { name: '', category: '', quantity: '', price: '', lowStockThreshold: '10' };
    const [formState, setFormState] = useState<StockFormState>(initialFormState);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name !== 'name' && name !== 'category') {
            const numericValue = value.replace(/\D/g, '');
            setFormState(prev => ({ ...prev, [name]: numericValue }));
        } else {
            setFormState(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (formState.name && formState.category && Number(formState.price) > 0 && Number(formState.quantity) >= 0) {
            addStockItem({
                name: formState.name,
                category: formState.category,
                quantity: Number(formState.quantity) || 0,
                price: Number(formState.price) || 0,
                lowStockThreshold: Number(formState.lowStockThreshold) || 0,
            });
            setIsAddModalOpen(false);
            setFormState(initialFormState);
        }
    };

    const handleEditClick = (item: StockItem) => {
        setEditingItem(item);
        setFormState({
            name: item.name,
            category: item.category,
            quantity: String(item.quantity),
            price: String(item.price),
            lowStockThreshold: String(item.lowStockThreshold),
        });
        setIsEditModalOpen(true);
    };

    const handleUpdateItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            updateStockItem({
                ...editingItem,
                name: formState.name,
                category: formState.category,
                quantity: Number(formState.quantity) || 0,
                price: Number(formState.price) || 0,
                lowStockThreshold: Number(formState.lowStockThreshold) || 0,
            });
            setIsEditModalOpen(false);
            setEditingItem(null);
            setFormState(initialFormState);
        }
    };

    const handleDeleteClick = (id: string) => {
        setDeletingItemId(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (deletingItemId) {
            deleteStockItem(deletingItemId);
            setIsDeleteModalOpen(false);
            setDeletingItemId(null);
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
            <td colSpan={6} className="text-center p-8 text-gray-500">
                <div className="flex flex-col items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                    <span>No items in stock. Add one to get started.</span>
                </div>
            </td>
        </tr>
    );

  return (
    <>
    <Card className="animate-fade-in">
        <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl text-white">Stock Inventory</h2>
            <Button onClick={() => { setFormState(initialFormState); setIsAddModalOpen(true); }}>Add Item</Button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-dark-border text-sm text-gray-400">
                        <th className="p-3">Item Name</th>
                        <th className="p-3">Category</th>
                        <th className="p-3 text-right">Quantity</th>
                        <th className="p-3 text-right">Price</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stock.length > 0 ? stock.map(item => {
                        const isLowStock = item.quantity <= item.lowStockThreshold;
                        return (
                            <tr 
                                key={item.id} 
                                className={`border-b border-dark-border transition-colors ${
                                    isLowStock 
                                    ? 'bg-red-500/10 hover:bg-red-500/20' 
                                    : 'hover:bg-dark-border/50'
                                }`}
                            >
                                <td className="p-3 font-medium text-white">{item.name}</td>
                                <td className="p-3 text-gray-400">{item.category}</td>
                                <td className={`p-3 text-right font-mono ${isLowStock ? 'text-red-300 font-extrabold animate-pulse' : ''}`}>{item.quantity}</td>
                                <td className="p-3 text-right font-mono">{formatCurrency(item.price)}</td>
                                <td className="p-3">
                                    {isLowStock ? (
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-100 bg-red-600/80 shadow-md shadow-red-500/50">
                                            Low Stock
                                        </span>
                                    ) : (
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-100 bg-green-600/70">
                                            In Stock
                                        </span>
                                    )}
                                </td>
                                <td className="p-3">
                                    <div className="flex gap-2">
                                        <Button variant="secondary" className="text-xs py-1 px-2" onClick={() => handleEditClick(item)}>Edit</Button>
                                        <Button variant="secondary" className="bg-red-900/50 hover:bg-red-800/60 border-red-800/80 active:border-red-700 text-xs py-1 px-2" onClick={() => handleDeleteClick(item.id)}>Delete</Button>
                                    </div>
                                </td>
                            </tr>
                        );
                    }) : <EmptyState />}
                </tbody>
            </table>
        </div>
    </Card>

    <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Stock Item">
        <form onSubmit={handleAddItem} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Item Name</label>
                    <input type="text" name="name" value={formState.name} onChange={handleFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                    <input type="text" name="category" value={formState.category} onChange={handleFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Quantity</label>
                    <input type="text" inputMode="numeric" name="quantity" value={formState.quantity} onChange={handleFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Price (UGX)</label>
                    <input type="text" inputMode="numeric" name="price" value={formState.price} onChange={handleFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Threshold</label>
                    <input type="text" inputMode="numeric" name="lowStockThreshold" value={formState.lowStockThreshold} onChange={handleFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                </div>
            </div>
            <div className="flex justify-end pt-2">
                <Button type="submit">Save Item</Button>
            </div>
        </form>
    </Modal>

    <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Stock Item">
        <form onSubmit={handleUpdateItem} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Item Name</label>
                    <input type="text" name="name" value={formState.name} onChange={handleFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                    <input type="text" name="category" value={formState.category} onChange={handleFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Quantity</label>
                    <input type="text" inputMode="numeric" name="quantity" value={formState.quantity} onChange={handleFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Price (UGX)</label>
                    <input type="text" inputMode="numeric" name="price" value={formState.price} onChange={handleFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Threshold</label>
                    <input type="text" inputMode="numeric" name="lowStockThreshold" value={formState.lowStockThreshold} onChange={handleFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                </div>
            </div>
            <div className="flex justify-end pt-2">
                <Button type="submit">Save Changes</Button>
            </div>
        </form>
    </Modal>
    
    <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion">
        <div className="space-y-4">
            <p>Are you sure you want to delete this stock item? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
                <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                <Button className="bg-red-600 hover:bg-red-500 border-red-800 active:border-red-700" onClick={confirmDelete}>Delete</Button>
            </div>
        </div>
    </Modal>
    </>
  );
};

export default Stock;