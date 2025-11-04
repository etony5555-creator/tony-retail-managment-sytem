import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType, Wholesaler } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';

const Wholesalers: React.FC = () => {
  const { wholesalers, addWholesaler } = useContext(AppContext) as AppContextType;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<Omit<Wholesaler, 'id'>>({
      name: '',
      contact: '',
      productCategory: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = (e: React.FormEvent) => {
      e.preventDefault();
      if (newItem.name && newItem.contact && newItem.productCategory) {
          addWholesaler(newItem);
          setIsModalOpen(false);
          setNewItem({ name: '', contact: '', productCategory: '' });
      }
  };

  return (
    <>
      <Card className="animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-xl text-white">Wholesalers & Suppliers</h2>
          <Button onClick={() => setIsModalOpen(true)}>Add Wholesaler</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dark-border text-sm text-gray-400">
                <th className="p-3">Name</th>
                <th className="p-3">Contact Number</th>
                <th className="p-3">Product Category</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {wholesalers.map(wholesaler => (
                <tr key={wholesaler.id} className="border-b border-dark-border hover:bg-dark-border/50 transition-colors">
                  <td className="p-3 font-medium text-white">{wholesaler.name}</td>
                  <td className="p-3 font-mono">{wholesaler.contact}</td>
                  <td className="p-3">{wholesaler.productCategory}</td>
                  <td className="p-3">
                    <Button variant="secondary" className="text-xs py-1 px-2">
                      Call
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Wholesaler">
          <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Wholesaler Name</label>
                  <input type="text" name="name" value={newItem.name} onChange={handleInputChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Contact Number</label>
                  <input type="text" name="contact" value={newItem.contact} onChange={handleInputChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Product Category</label>
                  <input type="text" name="productCategory" value={newItem.productCategory} onChange={handleInputChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
              </div>
              <div className="flex justify-end">
                  <Button type="submit">Save Wholesaler</Button>
              </div>
          </form>
      </Modal>
    </>
  );
};

export default Wholesalers;