import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType, StockItem } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';

const Stock: React.FC = () => {
    const { stock, addStockItem } = useContext(AppContext) as AppContextType;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState<Omit<StockItem, 'id'>>({
        name: '',
        quantity: 0,
        price: 0,
        lowStockThreshold: 10
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewItem(prev => ({ ...prev, [name]: name === 'name' ? value : Number(value) }));
    };

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (newItem.name && newItem.price > 0 && newItem.quantity >= 0) {
            addStockItem(newItem);
            setIsModalOpen(false);
            setNewItem({ name: '', quantity: 0, price: 0, lowStockThreshold: 10 });
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
            <h2 className="font-bold text-xl text-white">Stock Inventory</h2>
            <Button onClick={() => setIsModalOpen(true)}>Add Item</Button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-dark-border text-sm text-gray-400">
                        <th className="p-3">Item Name</th>
                        <th className="p-3 text-right">Quantity</th>
                        <th className="p-3 text-right">Price</th>
                        <th className="p-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {stock.map(item => (
                        <tr key={item.id} className="border-b border-dark-border hover:bg-dark-border/50 transition-colors">
                            <td className="p-3 font-medium text-white">{item.name}</td>
                            <td className="p-3 text-right font-mono">{item.quantity}</td>
                            <td className="p-3 text-right font-mono">{formatCurrency(item.price)}</td>
                            <td className="p-3">
                                {item.quantity <= item.lowStockThreshold ? (
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200/70">
                                        Low Stock
                                    </span>
                                ) : (
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200/70">
                                        In Stock
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Card>

    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Stock Item">
        <form onSubmit={handleAddItem} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Item Name</label>
                <input type="text" name="name" value={newItem.name} onChange={handleInputChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Quantity</label>
                    <input type="number" name="quantity" value={newItem.quantity} onChange={handleInputChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Price (UGX)</label>
                    <input type="number" name="price" value={newItem.price} onChange={handleInputChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Low Stock Threshold</label>
                <input type="number" name="lowStockThreshold" value={newItem.lowStockThreshold} onChange={handleInputChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
            </div>
            <div className="flex justify-end">
                <Button type="submit">Save Item</Button>
            </div>
        </form>
    </Modal>
    </>
  );
};

export default Stock;
